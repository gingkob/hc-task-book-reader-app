import React, { useRef, useState, useEffect } from 'react';

import { useDebounceEffect, getBooks, /* getBookDetails */ } from '../../../helpers'
// import BookPreview from '../../BookPreview/BookPreview';
import AutoCompleteBox from './AutoCompleteBox';
import './Search.css'
import SearchIcon from './SearchIcon';
import Spinner from './Spinner';

function Search() {

  const searchInput = useRef(null)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // const [interestingBook, setInterestingBook] = useState(null)

  const handleClick = () => {
    searchInput.current.focus()
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value)
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = (e) => {
    setTimeout(() => setFocused(false), 250); // not the ideal solution, need to clear timeout somehow ==> some suggestions ==> onMouseDown instead onClick | to find on which element focus lost <== **sec solution**
    // setFocused(false)
  }

  // const previewBook = (id) => {
  //   getBookDetails(id)
  //     .then(res => {
  //       setInterestingBook(res)
  //       localStorage.setItem("database", "ok")
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       setError('Communication error. Please try again later.')
  //     })
  // }

  const debouncedSearch = useDebounceEffect(search, 950) // this has some glitch maybe better to try with lodash

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setResult([])
      return
    }
    (() => {
      setLoading(true)
      getBooks(debouncedSearch.trim())
        .then(res => {
          setResult(res)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setError('Communication error. Please try again later.')
          setLoading(false)
        })
    })()
  }, [debouncedSearch])

  return (
    <>
      <div className={focused && !!result.length ? "custom-search expanded" : "custom-search"}>
        <SearchIcon className="search-icon" onClick={handleClick} />
        <input
          type="text"
          aria-label="Search box"
          name="custom-search"
          ref={searchInput}
          title="Search books..."
          role="combobox"
          aria-controls="S"
          aria-expanded
          value={search}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {loading && <Spinner />}

        {focused && !!result.length && <AutoCompleteBox books={result} /* onClick={previewBook}  */ />}
      </div>
      {!!error && <div className='error'>{error}</div>}
      {/* {!!interestingBook && <BookPreview book={interestingBook} />} */}
    </>
  )
}

export default Search
