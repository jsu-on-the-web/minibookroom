import { useEffect, useState } from 'react'
import './styles/App.scss'
import Card from './ui-elements/Card/Card'
import { fetchBook } from './SearchFunctions';
import CoverPlaceholder from './assets/cover-placeholder.svg';
import { Header } from './ui-elements/Header/Header';
import { MainMenu } from './ui-elements/MainMenu/MainMenu';
import { Button } from './ui-elements/Button/Button';
import { RadioButton } from './ui-elements/RadioButton/RadioButton';

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
  const [currentSearchParam, setCurrentSearchParam] = useState("all");

  /**--------------------------------------------
   *     useEffect for performing a search
   *---------------------------------------------**/
  useEffect(() => {
    // Search with currentSearch as a param
    const searchBooks = async () => {
      try {
        const books = await fetchBook(currentSearch, currentSearchParam);
        setIsAnimatingOut(false);
        setCurrentBooks(books);
      } catch (error) {
        console.error(error);
        setIsAnimatingOut(false);
      }
    };

    if (currentSearch) searchBooks();
  }, [currentSearch, currentSearchParam, setCurrentBooks]);


  return (
    <>
      <section className="min-h-screen app bg-stone-200">
        <Header title="Mini Bookroom" onMenuClick={() => setMenuOpen(!isMenuOpen)} />
        <MainMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
        <section className="flex flex-col items-center p-4 app-container">
          <h2 className="searchbar-title text-2xl mb-4 font-bold font-[Lora]">Search For Your Next Read</h2>

          {/*  ====================================================== Search Bar ====================================================== */}
          <section className="flex flex-col items-center w-full search-container md:w-2/3 lg:w-1/2">
            <section className='flex h-8 md:flex-row items-between md:gap-2 md:items-center searchbar-container'>
              <input type="text" placeholder="Search for books..." id='searchbar-books' className="px-4 py-2 rounded-lg searchbar-input border-1" />
              <Button className="searchbar__button" text='Search' onClick={() => {
                setIsAnimatingOut(true);
                setTimeout(() => setCurrentBooks([]), 300); // Setting a timeout to clear current books so the new details can come in.
                setCurrentSearch((document.getElementById('searchbar-books') as HTMLInputElement)?.value || '')
              }} />
            </section>
            <section className='flex flex-row items-center justify-center w-full mt-4 search-options-container'>
              {/* ==== Search Options ==== */}
              {/* TODO: Consider creating a RadioButtonGroup for this for extra cleanliness */}

              <RadioButton
                label="All"
                name="search-option"
                value="all"
                checked={currentSearchParam === "all"}
                onChange={() => { setCurrentSearchParam("all"); }}
                className="mr-4"
              />
              <RadioButton
                label="Title"
                name="search-option"
                value="title"
                checked={currentSearchParam === "title"}
                onChange={() => { setCurrentSearchParam("title"); }}
                className="mr-4"
              />
              <RadioButton
                label="Author"
                name="search-option"
                value="author"
                checked={currentSearchParam === "author"}
                onChange={() => { setCurrentSearchParam("author"); }}
                className="mr-4"
              />
              <RadioButton
                label="ISBN"
                name="search-option"
                value="isbn"
                checked={currentSearchParam === "isbn"}
                onChange={() => { setCurrentSearchParam("isbn"); }}
                className="mr-4"
              />
              <RadioButton
                label="Subject"
                name="search-option"
                value="subject"
                checked={currentSearchParam === "subject"}
                onChange={() => { setCurrentSearchParam("subject"); }}
                className="mr-4"
              />
              <RadioButton
                label="Publisher"
                name="search-option"
                value="publisher"
                checked={currentSearchParam === "publisher"}
                onChange={() => { setCurrentSearchParam("publisher"); }}
              />
            </section>
          </section>

          {/*  ====================================================== Card Container ====================================================== */}
          <section className={`flex flex-wrap justify-center gap-4 mt-4 card-container ${isAnimatingOut ? 'card-container--animating-out' : ''}`}>
              {currentBooks && currentBooks.map((book, index) => (
              <Card
                key={index}
                title={book.title || "TITLE MISSING"}
                author={book.author_name?.[0] || "AUTHOR MISSING"}
                cover={book.imageUrl || CoverPlaceholder}
                onClick={() => { console.log(`Clicked on ${book.title}`) }}
              />
            ))}
          </section>
        </section>
      </section>
    </>
  )
}

export default App
