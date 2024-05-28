import { useEffect } from 'react';
import { useHomeStore } from "../store/globalStore";

const Category = () => {
    const { genre, setGenre, selectedCategory, setSelectedCategory } = useHomeStore((state) => ({
        genre: state.genre,
        setGenre: state.setGenre,
        selectedCategory: state.selectedCategory,
        setSelectedCategory: state.setSelectedCategory
    }))
    const genreList = async () => {
        await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
        )
            .then(async data => {
                let res = await data.json()
                setGenre(res.genres)
            })
    }
    useEffect(() => {
        genreList(); //Get genre list
    }, []);

    const setSelectedGenre = (id) => { // Add/ remove selected genre
        const idx = selectedCategory.findIndex(ele => ele === id);
        if (idx === -1) {
            setSelectedCategory([...selectedCategory, id])
        } else {
            setSelectedCategory(selectedCategory.filter(ele => ele !== id))
        }
    }
    return (
        <>
            <div className='outer'>
                <span className='title'>MOVIEFIX</span>

                <div className="scrollmenu">
                    {
                        genre ? genre.map((ele) => {
                            return (
                                <button key={ele.id} className={selectedCategory.includes(ele.id) ? 'active' : 'btn'}
                                    onClick={() => setSelectedGenre(ele.id)}
                                >{ele.name}</button>
                            )
                        })
                            : ''
                    }
                </div>
            </div>

            <style>
                {`
                .active {
                    padding: 5px 10px;
                    margin: 5px;
                    border: none;
                    background-color: orangered; 
                    color: #fff; 
                  }
                .outer{
                    background-color: #333;
                    position: fixed;
                    width: 100%;
                }
                .title{
                    display: block;
                    color: orangered;
                    font-weight: 700;
                    margin: 10px;
                    left: 10%;
                    font-size: 30px;
                    position: relative;
                }
                div.scrollmenu {
                    background-color: #333;
                    overflow: auto;
                    white-space: nowrap;
                    position: fixed;
                    overflow-x: scroll;
                    width: 100%;
                    padding: 5px;
                    }

                    div.scrollmenu a {
                    display: inline-block;
                    color: white;
                    text-align: center;
                    padding: 14px;
                    text-decoration: none;
                    }

                    div.scrollmenu a:hover {
                    background-color: #777;
                }
                .btn {
                    padding: 5px 10px;
                    margin: 5px;
                    border: none;
                    background-color: dimgrey;
                    color: white;
                }
                `}
            </style>
        </>
    )
}

export default Category