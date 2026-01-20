
// Little helper interface that matches the form of the response but only the bits we need
interface GoogleBook {
    volumeInfo?: {
        title?: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
    };
}

export async function fetchBook(currentSearch: string, currentSearchParam: string) {
    let result = [];
    const queryURL = constructSearchURL(currentSearch, currentSearchParam);
    // TODO: Add option to allow the user to specify how many books they want per "page"?
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(queryURL)}&maxResults=10`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            // Now we grab the relevant details from the search results and map them to our interface in App.tsx (consider moving it to a dedicated
            // interface file?)
            // Look at the JSON response in console to see
            result = data.items.map((item: GoogleBook) => ({
                title: item.volumeInfo?.title || "TITLE MISSING",
                author_name: item.volumeInfo?.authors || [],
                imageUrl: item.volumeInfo?.imageLinks?.thumbnail
            }));
            console.log(result);
            return result;
        } else {
            console.warn(`No books found for "${currentSearch}"`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
        return [];
    }
}

/**--------------------------------------------
 *    URL constructor based on params
 *---------------------------------------------**/

export const constructSearchURL = (searchTerm: string, searchParam: string): string => {
    let queryUrl = '';
    switch (searchParam) {
        case 'all':
            queryUrl = searchTerm; // Same as default case, but in the UI we need to give the user a way to specify they want the default case
            break;
        case 'title':
            queryUrl = `intitle:${searchTerm}`;
            break;
        case 'author':
            queryUrl = `inauthor:${searchTerm}`;
            break;
        case 'isbn':
            queryUrl = `isbn:${searchTerm}`;
            break;
        case 'subject':
            queryUrl = `subject:${searchTerm}`;
            break;
        case 'publisher':
            queryUrl = `inpublisher:${searchTerm}`;
            break;
        default:
            queryUrl = searchTerm; // Default to a general search if no specific param is provided
    }
    return queryUrl;
}