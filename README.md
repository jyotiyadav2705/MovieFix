# Movie Listing App

A React application that lists movies and implements smooth scrolling behavior to load more movies as the user scrolls. The app loads movies of the previous year when the user scrolls up and movies of the next year when the user scrolls down until the current year. The app uses Zustand for state management and fetches movie data from [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/discover-movie).

## Features
- Load movies of the previous year when scrolling up.
- Load movies of the next year when scrolling down.
- Select movie genres to filter the movie list.

## Technologies Used
- React 18.3.1
- Zustand 4.5.2
- Node.js 19.9.0

## Prerequisites
- Node.js 19.9.0 or later
- npm 

## Getting Started

### Steps to Run the Project
1. Clone the repository:
    ```sh
    git clone https://github.com/jyotiyadav2705/MovieFix.git
    ```
2. Navigate to the project directory:
    ```sh
    cd MovieFix
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```
5. Open your browser and go to `http://localhost:3000`.

## State Management
This project uses Zustand for state management. Zustand is a small, fast, and scalable state-management solution for React.

## Scrolling Behavior
- **Scroll Down**: When the user scrolls down, movies from the next year are loaded until the current year is reached.
- **Scroll Up**: When the user scrolls up, movies from the previous year are loaded.
- The API calls are debounced to avoid excessive requests.

## Genre Selection
- The user can select one or more genres to filter the movie list.
- When a genre is selected, the movie list is reset and movies are fetched based on the selected genres.

## API
This project uses [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/discover-movie) to fetch movie data. Ensure you have a valid API key from TMDb.

## Repository
[GitHub Repository](https://github.com/jyotiyadav2705/MovieFix.git)

