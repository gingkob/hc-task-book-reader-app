import React from 'react'
import SuggestionContainer from '../components/Suggestion/SuggestionContainer'
import { Search } from '../components/UI'

function Home() {
  return (
    <div>
      <Search />
      <SuggestionContainer />
    </div>
  )
}

export default Home
