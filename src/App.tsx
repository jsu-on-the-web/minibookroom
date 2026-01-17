import { useEffect, useState } from 'react'
import './styles/App.scss'
import Card from './ui-elements/Card/Card'
import { fetchBook } from './SearchFunctions';

// Interfaces for prototyping
interface Book {
  title: string,
  author_name: string[],
  cover_i?: number
}

const App = () => {
  // Run a test fetch to grab a single book from OpenLibrary
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    // Search with currentSearch as a param
    fetchBook(currentSearch).then(setCurrentBooks);
  }, [currentSearch]);


  return (
    <>
      <h1>Hello world!</h1>
      <input type="text" placeholder="Search for books..." id='searchbar'/>
      <button className="mt-auto" onClick={() => {setCurrentSearch((document.getElementById('searchbar') as HTMLInputElement)?.value || '')}}>Search</button>
      <div className="flex flex-wrap justify-center gap-4 mt-4 card-container">
      {currentBooks && currentBooks.map((book, index) => (
        <Card
          key={index}
          title={book.title || "TITLE MISSING"}
          author={book.author_name?.[0] || "AUTHOR MISSING"}
          cover={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          onClick={() => {console.log(`Clicked on ${book.title}`)}}
        />
      ))};
      </div>
    </>
  )
}

export default App
