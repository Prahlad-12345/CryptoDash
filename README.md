Crypto Dashboard This is a single-file, responsive crypto dashboard built with HTML, CSS (Tailwind), and vanilla JavaScript. It fetches and displays live cryptocurrency market data from the CoinGecko API.

The project demonstrates a clean, maintainable, and well-documented approach to building a small-scale, production-like web application.

==> Setup and Run Instructions This project is a single .html file and does not require a complex build process or server to run.

Clone the repository:

git clone https://github.com/Prahlad-12345/Cryto-DashBoard cd Cryto-DashBoard

Open the file: Simply open the index.html file in your web browser. You can drag and drop the file into your browser window, or right-click and select "Open with...".

==> API Key (Not Required for this Version): The CoinGecko API v3 used in this project does not require an API key for the basic endpoints used. However, if a key becomes necessary for increased rate limits or future features, you would set it up as an environment variable.

For a Node.js-based project (e.g., React or Next.js), this would typically involve a .env.local file:

.env.local
NEXT_PUBLIC_COINGECKO_API_KEY=YOUR_API_KEY_HERE

An .env.example file would be committed to the repository, but not the .env.local file itself.

==> Tech Stack and Architecture Overview Tech Stack:

HTML5: The core structure of the web page.

CSS3 (Tailwind CSS): Used for all styling, including responsive design and layout. This is loaded via a CDN for simplicity.

JavaScript (ES6+): Vanilla JavaScript is used for all dynamic functionality, including data fetching, DOM manipulation, and event handling.

CoinGecko API: The data source for cryptocurrency information.

Architecture: The application follows a simple, monolithic client-side architecture contained within a single HTML file. The JavaScript logic is self-contained and manages the entire application lifecycle, from data fetching to rendering UI components. This approach was chosen to meet the constraint of a single file, while still maintaining logical separation within the script.

==> Design Patterns Used While a single-file approach limits the use of traditional component-based patterns, the JavaScript code adheres to the following principles:

Modular Functions: The JavaScript is broken down into small, single-purpose functions (e.g., fetchCryptoData, renderTable, filterAndRenderTable) to improve readability and maintainability, preventing a "god function" anti-pattern.

Data/UI Separation: The renderTable function takes a data array as input, ensuring that the rendering logic is separate from the data fetching logic. This prevents direct coupling of the UI to the API response format.

State Management: Application state (allCoinsData, filteredCoinsData, currentPage) is managed using simple global variables within the script, which are then mutated by event handlers and render functions.

==> Assumptions, Limitations, and Future Improvements Assumptions:

A live internet connection is available to fetch data from the CoinGecko API.

The CoinGecko API endpoints used will remain stable.

Limitations:

Single-File Monolith: The entire application resides in one file, which is not scalable for larger projects. This makes code reuse and complex feature development difficult.

No Framework State Management: The state management is basic and prone to bugs in a more complex application. A framework like React with useState/useEffect or a state management library would be superior.

Client-Side Filtering: All filtering is done client-side on the initial 100 coins fetched. For a larger dataset, this would be inefficient, and server-side filtering would be required.

Basic Caching: No advanced caching or data validation is implemented beyond the browser's default behavior.

Future Improvements:

Migrate to a Modern Framework: Rebuild the application using React or Next.js to leverage component-based architecture and robust state management.

Implement Server-Side Rendering (SSR): Use a framework like Next.js to improve SEO and initial page load performance.

Advanced Filtering and Sorting: Implement server-side filtering, sorting, and pagination for better performance with large datasets.

Add "Highlights" Section: Fetch and display data from the CoinGecko trending endpoint, as required by the assignment.

Unit and Integration Tests: Add tests to ensure code quality and prevent regressions.

CSS Preprocessor: Use a CSS preprocessor like Sass to manage styles more effectively.

TypeScript: Add TypeScript for type safety and better developer experience.
