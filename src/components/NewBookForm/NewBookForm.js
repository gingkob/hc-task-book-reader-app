import React from 'react'
import { observer } from 'mobx-react'
import Store from '../../store/Store'
import "./NewBookForm.css"


const NewBookForm = observer(() => {

  console.log("store")
  console.log(Store)

  const onSubmit = (e) => {
    e.preventDefault()
    const { title, author } = e.target
    console.log(title.value, author.value)
    Store.saveBook(title.value, author.value)
  }
  return (
    <form className="new-book-form" onSubmit={onSubmit}>
      <div className="new-book-form__row" >
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
      </div>
      <div className="new-book-form__row" >
        <label htmlFor="author">Author</label>
        <input id="author" name="author" type="text" />
      </div>
      <button className="new-book-form__btn" type="submit">Add Book</button>

    </form>
  )
})

export default NewBookForm
