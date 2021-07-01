import { API } from '../constants'

const getBooks = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetch(`${API.urlTitle}${title}&limit=${API.limit}&offset=${API.offset}`, { mode: 'cors' })
      let parsedResult = await result.json();
      let desiredData = []
      parsedResult.docs.forEach(doc => {
        const { key, title, first_publish_year: year, author_key: authorKey, author_name: authorName, author_alternative_name: authorAlternativeName, person, place, subject } = doc;
        desiredData.push({ key, title, year, authorKey, authorName, authorAlternativeName, person, place, subject })
      })
      if (!desiredData.length) {
        desiredData.push({ key: "no-book-search-result", title: "" })
      }
      resolve(desiredData)

    } catch (error) {
      reject(error)
    }
  })
}

const getBookDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetch(`${API.urlDetail}${id}.json`)
      let parsedResult = await result.json()
      console.log(parsedResult)
      let desiredData = null
      const { key: bookId, title, links, description, covers, subject_places: subjectPlaces, subject_people: subjectPeople, authors, excerpts, subjects } = parsedResult;
      desiredData = { bookId, title, links, description, covers, subjectPlaces, subjectPeople, authors, excerpts, subjects }
      console.log(desiredData)
      resolve(desiredData)
    } catch (error) {
      reject(error)
    }
  })
}

const getAuthorDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetch(`${API.urlDetail}${id}.json`)
      let parsedResult = await result.json()
      console.log('author', parsedResult)
      let desiredData = null
      const { key: authorId, bio, birth_date: birthDate, death_date: deathDate, fuller_name: fullName, links, name } = parsedResult;
      desiredData = { authorId, bio, birthDate, deathDate, fullName, links, name }
      console.log(desiredData)
      resolve(desiredData)
    } catch (error) {
      reject(error)
    }
  })
}

export { getBooks, getBookDetails, getAuthorDetails }