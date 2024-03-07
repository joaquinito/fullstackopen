import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('Component \'AddBlogForm\': ', () => {

  const mockFunction = jest.fn()

  test('Event handler is called with the right data when a new blog is created', async () => {

    const component = render(<AddBlogForm submitEventHandler={mockFunction} />)

    const title_input = component.container.querySelector('#title-input')
    const author_input = component.container.querySelector('#author-input')
    const url_input = component.container.querySelector('#url-input')
    const createButton = screen.getByText('create')

    // Start a user session to interact with the rendered component, fill in the form
    // and click the 'create' button
    const user = userEvent.setup()
    await user.type(title_input, 'The new test blog')
    await user.type(author_input, 'New Test Author')
    await user.type(url_input, 'http://newtesturl.com')
    await user.click(createButton)

    // Check if the event handler is called with the right data
    expect(mockFunction.mock.calls).toHaveLength(1)
    expect(mockFunction.mock.calls[0][0].title).toBe('The new test blog')
    expect(mockFunction.mock.calls[0][0].author).toBe('New Test Author')
    expect(mockFunction.mock.calls[0][0].url).toBe('http://newtesturl.com')
  })
})