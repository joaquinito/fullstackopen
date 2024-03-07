describe('Bloglist app', function () {

  beforeEach(function () {
    cy.clean_db()
    cy.add_user_to_db({
      username: 'cyUser',
      name: 'Cypress User',
      password: 'cyPassword'
    })
  })

  describe('Initial page', function () {

    it('Login form is shown', function () {
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
    })
  })

  describe('Login', function () {
    it('Login succeeds with correct credentials', function () {

      // Check if login form is shown
      cy.contains('log in to application')

      // Fill in username and password, click 'login' button
      cy.get('#username-input').type('cyUser')
      cy.get('#password-input').type('cyPassword')
      cy.get('#login-button').click()

      // Check if bloglist is shown
      cy.contains('blogs')
    })

    it('Login fails with wrong credentials', function () {

      // Check if login form is shown
      cy.contains('log in to application')

      // Fill in username and password, click 'login' button
      cy.get('#username-input').type('wrongUser')
      cy.get('#password-input').type('wrongPassword')
      cy.get('#login-button').click()

      // Check if error message is shown
      cy.get('.errorNotification').contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user
      cy.app_login({ username: 'cyUser', password: 'cyPassword' })
    })

    it('A blog can be created', function () {

      // Open new blog form, fill in details, click 'create' button
      cy.contains('new blog').click()
      cy.get('#title-input').type('Cypress blog')
      cy.get('#author-input').type('Cypress')
      cy.get('#url-input').type('https://www.cypress.io/blog/')
      cy.get('#create-blog-button').click()

      // Check if blog is shown
      cy.get('.infoNotification').contains('Blog \'Cypress blog\' by Cypress added')
      cy.contains('Cypress blog, by Cypress')
    })

    it('A blog can be liked', function () {

      // Add a blog to the database (using the backend API)
      cy.add_blog_to_db({
        title: 'Cypress blog',
        author: 'Cypress',
        url: 'https://www.cypress.io/blog/'
      })

      // Open blog detailed view
      cy.get('.view-blog-details-button').click()

      // Click 'like' button
      cy.get('.like-blog-button').click()

      // Check if blog's number of likes has increased to 1
      cy.contains('likes 1')
    })

    it('A blog can be deleted by the user who added it', function () {

      // Add a blog to the database (using the backend API)
      cy.add_blog_to_db({
        title: 'Cypress blog',
        author: 'Cypress',
        url: 'https://www.cypress.io/blog/'
      })

      // Open blog detailed view
      cy.get('.view-blog-details-button').click()

      // Click 'remove' button
      cy.get('.remove-blog-button').click()

      // Check if blog is no longer shown
      cy.contains('Cypress blog, by Cypress').should('not.exist')
    })

    it('A blog cannot be deleted by a user who did not add it', function () {

      // Add a blog to the database (using the backend API)
      cy.add_blog_to_db({
        title: 'Cypress blog',
        author: 'Cypress',
        url: 'https://www.cypress.io/blog/'
      })

      // Log out user
      cy.get('#logout-button').click()

      // Add another user to the database (using the backend API)
      cy.add_user_to_db({
        username: 'cyUser2',
        name: 'Cypress User 2',
        password: 'cyPassword2'
      })

      // Log in with the new user credentials
      cy.app_login({
        username: 'cyUser2',
        password: 'cyPassword2'
      })

      // Open blog detailed view
      cy.get('.view-blog-details-button').click()

      // Check if 'remove' button is not shown
      cy.get('.remove-blog-button').should('not.exist')
    })
  })

  describe('When multiple blogs exist', function () {

    beforeEach(function () {
      // log in user
      cy.app_login({ username: 'cyUser', password: 'cyPassword' })

      // Add a blogs to the database (using the backend API)
      cy.add_blog_to_db({
        title: 'Cypress blog',
        author: 'Cypress',
        url: 'https://www.cypress.io/blog/',
        likes: 1
      })
      cy.add_blog_to_db({
        title: 'React blog',
        author: 'React',
        url: 'https://react.dev/blog',
        likes: 4
      })
      cy.add_blog_to_db({
        title: 'MongoDB blog',
        author: 'MongoDB',
        url: 'https://www.mongodb.com/blog',
        likes: 2
      })
    })

    it('Blogs are ordered according to the number of likes', function () {

      // Check if blogs are shown in the correct order
      cy.get('.blog').eq(0).contains('React blog, by React')
      cy.get('.blog').eq(1).contains('MongoDB blog, by MongoDB')
      cy.get('.blog').eq(2).contains('Cypress blog, by Cypress')
    })

    it('Order of the blogs changes if one of the blogs gets more likes', function () {

      // Open blog detailed view
      cy.get('.view-blog-details-button').eq(2).click()

      // Click 'like' button two times, confirming that the number of likes is updated
      cy.get('.like-blog-button').click()
      cy.contains('likes 2').should('exist')
      cy.get('.like-blog-button').click()
      cy.contains('likes 3').should('exist')

      // Check if blogs are shown in the correct order (Cypress blog should be second)
      cy.get('.blog').eq(0).contains('React blog, by React')
      cy.get('.blog').eq(1).contains('Cypress blog, by Cypress')
      cy.get('.blog').eq(2).contains('MongoDB blog, by MongoDB')

      // Click 'like' button two times, confirming that the number of likes is updated
      cy.get('.like-blog-button').click()
      cy.contains('likes 4').should('exist')
      cy.get('.like-blog-button').click()
      cy.contains('likes 5').should('exist')

      // Check if blogs are shown in the correct order (Cypress blog should be first)
      cy.get('.blog').eq(0).contains('Cypress blog, by Cypress')
      cy.get('.blog').eq(1).contains('React blog, by React')
      cy.get('.blog').eq(2).contains('MongoDB blog, by MongoDB')
    })
  })
})