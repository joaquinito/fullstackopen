import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Component \'Blog\': ', () => {

  const blog = {
    title: 'The test blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      username: 'testUser',
      name: 'Test User',
      id: '000011112222333344445555'
    },
  }

  const localStorageData = {
    token: null,
    username: 'testUser',
    name: 'Test User',
  }

  const mockFunction = jest.fn()

  test('Default content is correct', () => {

    const component = render(
      <Blog blogData={blog}
        incrementLikesHandler={mockFunction}
        removeBlogHandler={mockFunction} />)

    // Check if the component renders the title and author
    screen.getByText('The test blog, by Test Author', { exact: false })

    // Check if the component does not render the url and likes
    expect(component.container.querySelector('#blog-details')).toBeNull()
  })

  test('Clicking the button shows the url and likes', async () => {

    render(<Blog blogData={blog}
      incrementLikesHandler={mockFunction}
      removeBlogHandler={mockFunction} />)

    // Create a key-value pair in Local Storage to simulate that the test user is logged in
    window.localStorage.setItem(
      'loggedInAppUser', JSON.stringify(localStorageData))

    // Start a user session to interact with the rendered component, and click the button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Check if the component renders the url and likes after the button is clicked
    screen.getByText('http://testurl.com', { exact: false })
    screen.getByText(/likes+\s+\d/) // regex for 'likes' followed by one or more spaces and a digit
  })

  test('Clicking the button twice calls the event handler twice', async () => {

    render(<Blog blogData={blog}
      incrementLikesHandler={mockFunction}
      removeBlogHandler={mockFunction} />)

    // Create a key-value pair in Local Storage to simulate that the test user is logged in
    window.localStorage.setItem(
      'loggedInAppUser', JSON.stringify(localStorageData))

    // Start a user session to interact with the rendered component, and click the 'view' button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Click the 'like' button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Check if the event handler function is called twice
    expect(mockFunction.mock.calls).toHaveLength(2)
  })
})