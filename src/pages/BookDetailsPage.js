import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BookPreview } from '../components/BookPreview'
import { getBookDetails, getAuthorDetails } from '../helpers'

function BookDetailsPage() {

  const [book, setBook] = useState(null)
  const [author, setAuthor] = useState(null)
  const [error, setError] = useState('')

  const { type, bookId } = useParams()

  useEffect(() => {
    getBookDetails(`/${type}/${bookId}`)
      .then(res => {
        setBook(res)
        getAuthorDetails(res.authors[0].author.key) // this should be refactored!!!
          .then(res => {
            setAuthor(res)
          })
          .catch(err => {
            console.error(err)
            setError('Communication error. Please try again later.')
          })
      })
      .catch(err => {
        console.error(err)
        setError('Communication error. Please try again later.')
      })
  }, [type, bookId])

  if (!!error) {
    return (<div className='error'>{error}</div>)
  }

  if (!book) {
    return <p>waiting...</p>
  }

  return (
    <BookPreview book={book} author={author} />
  )
}

export default BookDetailsPage
