// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress User',
      username: 'cyUser',
      password: 'cyPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
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
      cy.get('#username-input').type('cyUser')
      cy.get('#password-input').type('cyPassword')
      cy.get('#login-button').click()
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
  })
})