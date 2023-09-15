// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Bloglist app', function () {
  beforeEach(function () {
    cy.clean_db()
    cy.add_user_to_db({ username: 'cyUser', name: 'Cypress User', password: 'cyPassword' })
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {

      // Check if login form is shown
      cy.contains('log in to application')

      // Fill in username and password, click 'login' button
      cy.get('#username-input').type('cyUser')
      cy.get('#password-input').type('cyPassword')
      cy.get('#login-button').click()

      // Check if bloglist is shown
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {

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
      cy.get('#url-input').type('https://www.cypress.io/')
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
        url: 'https://www.cypress.io/'
      })

      // Open blog detailed view
      cy.get('.view-blog-details-button').click()

      // Click 'like' button
      cy.get('.like-blog-button').click()

      // Check if blog's number of likes has increased to 1
      cy.contains('likes 1')
    })
  })
})