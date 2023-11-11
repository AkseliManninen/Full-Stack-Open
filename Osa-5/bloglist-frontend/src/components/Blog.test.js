import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content (before view)', () => {
  const blog = {
    title: 'Component testing title',
    author: 'Component testing author',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing title'
  )
})

test('renders content (after view)', async () => {
  const blog = {
    title: 'Component testing title',
    author: 'Component testing author',
    url: 'url.fi',
    likes: '20',
    user: { name: 'Component testing user' }
  }

  const { container } = render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blogMoreInfo')
  expect(div).toHaveTextContent(
    'url.fi'
  )
  expect(div).toHaveTextContent(
    'likes 20'
  )

  expect(div).toHaveTextContent(
    'Component testing user'
  )
})


test('test like twice', async () => {
  const blog = {
    title: 'Component testing title',
    author: 'Component testing author',
    url: 'url.fi',
    likes: '20',
    user: { name: 'Component testing user' }
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike = {mockHandler}/>)

  const user = userEvent.setup()

  const viewButton =  screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})