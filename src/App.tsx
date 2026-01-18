import { useEffect, useState } from 'react'
import './styles/App.scss'
import Card from './ui-elements/Card/Card'
import { fetchBook } from './SearchFunctions';
import CoverPlaceholder from './assets/cover-placeholder.svg';

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
      <section className="flex flex-col items-center p-4 app-container">
        <h1>Hello world!</h1>
        <section className='flex flex-row gap-2 items-between searchbar-container'>
          <input type="text" placeholder="Search for books..." id='searchbar-books' className="px-4 py-2 rounded-lg searchbar-input border-1" />
          <button className="searchbutton" onClick={() => { setCurrentSearch((document.getElementById('searchbar-books') as HTMLInputElement)?.value || '') }}>Search</button>
        </section>
        <div className="flex flex-wrap justify-center gap-4 mt-4 card-container">
          {currentBooks && currentBooks.map((book, index) => (
            <Card
              key={index}
              title={book.title || "TITLE MISSING"}
              author={book.author_name?.[0] || "AUTHOR MISSING"}
              cover={book.cover_i != null ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : CoverPlaceholder}
              onClick={() => { console.log(`Clicked on ${book.title}`) }}
            />
          ))};
        </div>
      </section>
    </>
  )
}

export default App
