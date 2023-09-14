import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Default Blog content', () => {
  const blog = {
    title: 'The test blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0
  }

  const dummyFunction = () => { }

  const component = render(
    <Blog blogData={blog}
      incrementLikesHandler={dummyFunction}
      removeBlogHandler={dummyFunction} />)

  // Check if the component renders the title and author
  screen.getByText('The test blog, by Test Author', { exact: false })

  // Check if the component does not render the url and likes
  expect(component.container.querySelector('#blog-details')).toBeNull()
})
