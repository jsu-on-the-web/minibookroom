
export async function fetchBook(currentSearch: string) {
    let result = [];
    try {
          // For now we return 10 results
          // TODO: Code in way to adjust the limit or enable pagination
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(currentSearch)}&limit=10`);
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            console.log(data.docs);
            result = data.docs;
            return result;
        } else {
            console.warn(`No book found for {currentSearch}`);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        return [];
      }
    }