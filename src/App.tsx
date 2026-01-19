import { useEffect, useState } from 'react'
import './styles/App.scss'
import Card from './ui-elements/Card/Card'
import { fetchBook } from './SearchFunctions';
import CoverPlaceholder from './assets/cover-placeholder.svg';
import { Header } from './ui-elements/Header/Header';
import { MainMenu } from './ui-elements/MainMenu/MainMenu';

// Interfaces for prototyping
interface Book {
  title: string,
  author_name: string[],
  imageUrl?: string
}

const App = () => {
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Search with currentSearch as a param
    const searchBooks = async () => {
      try {
        const books = await fetchBook(currentSearch);
        setIsAnimatingOut(false);
        setCurrentBooks(books);
      } catch (error) {
        console.error(error);
        setIsAnimatingOut(false);
      }
    };

    if (currentSearch) searchBooks();
  }, [currentSearch, setCurrentBooks]);

  return (
    <>
      <section className="min-h-screen app bg-stone-200">
        <Header title="Mini Bookroom" onMenuClick={() => setMenuOpen(!isMenuOpen)} />
        <MainMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
        <section className="flex flex-col items-center p-4 app-container">
          <h2 className="searchbar-title text-2xl pb-4 font-bold font-[Lora]">Search For Your Next Read</h2>
          {/*  ===== Search Bar ===== */}
          <section className='flex md:flex-row md:gap-2 md:items-between searchbar-container'>
            <input type="text" placeholder="Search for books..." id='searchbar-books' className="px-4 py-2 rounded-lg searchbar-input border-1" />
            <button className="rounded-lg searchbar__button bg-stone-400 hover:bg-stone-500 hover:border-2" onClick={() => {
              setIsAnimatingOut(true);
              setTimeout(() => setCurrentBooks([]), 300); // Setting a timeout to clear current books so the new details can come in. 
              setCurrentSearch((document.getElementById('searchbar-books') as HTMLInputElement)?.value || '')
            }}>Search</button>
          </section>
          <div className={`flex flex-wrap justify-center gap-4 mt-4 card-container ${isAnimatingOut ? 'card-container--animating-out' : ''}`}>
              {currentBooks && currentBooks.map((book, index) => (
              <Card
                key={index}
                title={book.title || "TITLE MISSING"}
                author={book.author_name?.[0] || "AUTHOR MISSING"}
                cover={book.imageUrl || CoverPlaceholder}
                onClick={() => { console.log(`Clicked on ${book.title}`) }}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  )
}

export default App
