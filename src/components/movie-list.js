import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./movie-card";
import { useHomeStore } from "../store/globalStore";

const DEFAULT_MOVIE_YEAR = 2012;

const MovieList = () => {

    const { selectedCategory, } = useHomeStore((state) => ({
        selectedCategory: state.selectedCategory,
    }))
    const [movies, setMovie] = useState([]);
    const [oldYear, setOldYear] = useState(DEFAULT_MOVIE_YEAR);
    const [newYear, setNewYear] = useState(DEFAULT_MOVIE_YEAR);
    const [year, setYear] = useState(DEFAULT_MOVIE_YEAR);
    const debounceTimeout = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const hasScrolled = useRef(false); // Track if the user has scrolled

    const getMoviewsList = async () => {
        await fetch(`https://api.themoviedb.org/3/discover/movie?` +
            new URLSearchParams({
                api_key: '2dca580c2a14b55200e784d157207b4d',
                sort_by: 'popularity.desc',
                primary_release_year: year, page: 1,
                "vote_count.gte": 100,
                with_genres: selectedCategory.join('|')
            }),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
        ).then(async data => {
            let res = await data.json();
            if (year < DEFAULT_MOVIE_YEAR) { //To set movies from previous year
                setMovie(prev => [{ year: year, movies: res.results }, ...prev])
            } else {
                setMovie(prev => [...prev, { year: year, movies: res.results }]) //To set movies from next year
            }
        })
    }
    useEffect(() => {
        getMoviewsList();
    }, [year, selectedCategory]); // Get movie list according to year or selected genre

    useEffect(() => {
        //Reset all states to store latest data as per selected genre
        setMovie([])
        setNewYear(DEFAULT_MOVIE_YEAR)
        setOldYear(DEFAULT_MOVIE_YEAR)
        setYear(DEFAULT_MOVIE_YEAR)
        setScrollPosition(0)
        hasScrolled.current = false

    }, [selectedCategory])

    useEffect(() => {
        //Get position of scroll vertically
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            hasScrolled.current = true; // Mark that the user has scrolled
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        //Get content height
        setContentHeight(document.getElementsByClassName('movie-wrapper')[0]?.clientHeight ?? 0);
    }, [scrollPosition, movies])

    //Function to delay api calls 
    const debouncedUpdateYear = useCallback(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        if (hasScrolled.current) { // Check if the user has scrolled
            if (scrollPosition && contentHeight && scrollPosition > contentHeight - 900) {
                debounceTimeout.current = setTimeout(() => {
                    // update year when scroll down
                    setNewYear((prev) => {
                        setYear(prev + 1)
                        return prev + 1
                    });
                }, 200);

            } else if (scrollPosition === 0) {

                debounceTimeout.current = setTimeout(() => {
                    // year when scroll up
                    setOldYear((prev) => {
                        setYear(prev - 1)
                        return prev - 1
                    });
                    window.scrollTo({ top: 100, behavior: "smooth" })
                    setScrollPosition(100)
                }, 200);
            }
        }
    }, [scrollPosition, contentHeight]);

    useEffect(() => {
        debouncedUpdateYear();
    }, [debouncedUpdateYear]);

    return (
        <>
            <div className="movie-wrapper">
                {movies ? movies.map((ele, i) => (
                    <div key={i} className="list-movie">
                        <span className="titleYear"><strong>{ele.year}</strong></span>

                        <div className="container" key={'item' + i}>
                            {ele.movies ? ele.movies.map((item, j) => (
                                <div className="item" key={j}> <MovieCard data={item} /></div>
                            ))
                                : ''}
                        </div>

                    </div>
                )
                ) : ''}
            </div>

            <style >
                {`
                .movie-wrapper{
                    padding-top: 175px;
                    background: black;

                }
                .titleYear{
                    font-size: 30px;
                    margin-left: 15px;
                }
                .list-movie{
                    padding-top: 30px;
                    background: black;
                    color: white;
                }
                .item {
                    width: 100%
                      }

                .container {
                    display: flex;
                    flex-wrap: wrap;
                 }
                      
                .container > div {
                    flex: 50%; 
                    box-shadow: 0 0 0 1px black;
                    margin-bottom: 10px;
                    color: white;
                }
                .card {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    padding: 15px;
                    background: dimgrey;
                    height: 100%
                }
                
                .container-chld {
                    padding: 2px 16px;
                }
`}
            </style>
        </>
    )
}

export default MovieList