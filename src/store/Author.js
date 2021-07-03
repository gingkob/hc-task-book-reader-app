import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

class Author {
  _id
  authorId //this is the id from API
  authorName
  bio
  birthDate
  deathDate
  fullName
  links

  constructor(authorId, name, bio, birthDate, deathDate, fullName, links) {
    makeAutoObservable(this)
    this._id = uuid()
    this.authorId = authorId
    this.authorName = name
    this.bio = bio
    this.birthDate = birthDate
    this.deathDate = deathDate
    this.fullName = fullName
    this.links = links
  }
}

export default Author
