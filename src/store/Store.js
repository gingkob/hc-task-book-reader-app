import { makeAutoObservable, toJS } from 'mobx'
import Book from './Book'
import Author from './Author'
import Comment from './Comment'

class Store {
  books = []
  authors = []

  constructor() {
    makeAutoObservable(this)
    this.getData()
  }

  saveBook = (bookId, title, authorId, description, subject, coverURLs, excerpts, links, subjectPeople, subjectPlaces, subjects, authors) => {
    let book = new Book(bookId, title, authorId, description, subject, coverURLs, excerpts, links, subjectPeople, subjectPlaces, subjects, authors);
    this.books.unshift(book);
    localStorage.setItem('books', JSON.stringify(toJS(this.books)))
  }

  saveAuthor = (authorId, name, bio, birthDate, deathDate, fullName, links) => {
    let author = new Author(authorId, name, bio, birthDate, deathDate, fullName, links);
    this.authors.unshift(author);
    localStorage.setItem('authors', JSON.stringify(toJS(this.authors)))
  }

  getData() {
    let books = localStorage.getItem('books')
    let authors = localStorage.getItem('authors')

    if (books) {
      this.books = JSON.parse(books)
    } else {
      console.log("no books yet")
    }

    if (authors) {
      this.authors = JSON.parse(authors)
    } else {
      console.log("no authors yet")
    }
  }

  bookExists(bookId) {
    if (!!this.books.length) {
      return !!this.books.find(book => book.bookId === bookId)
    }
    return false;
  }

  authorExists(authorId) {
    if (!!this.authors.length) {
      return !!this.authors.find(author => author.authorId === authorId)
    }
    return false;
  }

  get myReadings() {
    return this.books.filter(book => !book.finished)
  }

  getBook(_id) {
    return this.books.find(book => book._id === _id)
  }

  saveComment(_id, comment) {
    let bookIndex = this.books.findIndex(book => book._id === _id)
    this.books[bookIndex].comments.unshift(new Comment(_id, comment))
    localStorage.setItem('books', JSON.stringify(toJS(this.books)))
  }

  bookRead(_id) {
    let bookIndex = this.books.findIndex(book => book._id === _id)
    this.books[bookIndex].finished = true;
    localStorage.setItem('books', JSON.stringify(toJS(this.books)))
  }

}

export default new Store();