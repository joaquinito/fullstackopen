
const BACKEND_BASE_URL = 'http://localhost:3003/api/'
const FRONTEND_BASE_URL = 'http://localhost:5173/'

/*
Command to remove all data from the database.
*/
Cypress.Commands.add('clean_db', () => {
  cy.request('POST', BACKEND_BASE_URL + 'testing/reset')
})

/*
Command to add a user to the database.
Parameters:
  username: username of the user to add
  name: name of the user to add
  password: password of the user to add
*/
Cypress.Commands.add('add_user_to_db', ({ username, name, password }) => {
  cy.request('POST', BACKEND_BASE_URL + 'users', { username, name, password }
  ).then(() => {
    cy.visit(FRONTEND_BASE_URL)
  })
})

/*
Command to add a blog to the database.
Parameters:
  title: title of the blog to add
  author: author of the blog to add
  url: url of the blog to add
*/
Cypress.Commands.add('add_blog_to_db', ({ title, author, url, likes }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInAppUser'))
  cy.request(
    {
      method: 'POST',
      url: BACKEND_BASE_URL + 'blogs',
      headers: { 'Authorization': `Bearer ${loggedInUser.token}` },
      body: { title, author, url, likes },
    }
  ).then(() => {
    cy.visit(FRONTEND_BASE_URL)
  })
})

/*
Command to login a user.
Parameters:
  username: username of the user to login
  password: password of the user to login
*/
Cypress.Commands.add('app_login', ({ username, password }) => {
  cy.request('POST', BACKEND_BASE_URL + 'login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInAppUser', JSON.stringify(body))
    cy.visit(FRONTEND_BASE_URL)
  })
})