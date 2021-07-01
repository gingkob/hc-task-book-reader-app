import React from 'react';
import { observer } from 'mobx-react';
import Store from '../../store/Store';
import BookItem from './BookItem';

const BookList = observer(() => {
  // let myReadings = Store.books.filter(book => !book.finished)
  // let authors = Store.authors.map(author => ({ [author.authorId]: author.authorName })) //this is nice but doesn't work

  const onFinished = (_id) => Store.bookRead(_id);

  return (
    <div>
      {Store.myReadings.map(book => (<BookItem key={book._id} book={book} onFinished={onFinished} />))}
    </div>
  )
})

export default BookList
