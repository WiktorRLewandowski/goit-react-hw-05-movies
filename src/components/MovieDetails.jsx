import { NavLink } from "react-router-dom"


const IMG_URL = 'https://image.tmdb.org/t/p/w300'



export const MovieDetails = ({ movie }) => {

    const {
        title, 
        release_date, 
        poster_path,
        vote_average,
        overview,
        // genres,    
    } = movie

    // const Genres = ({genres}) => {
    //     const genresList = async () => await genres
    //     return (
            
    //     )
    // }
    
    const calculateScore = (score) => {
        const userScore = Math.round(score*10)
        return `${userScore}%`
    }   

    return(
        <>
        <h1>{title} ({release_date})</h1>
        <img src={`${IMG_URL}${poster_path}`} alt={`${title} official poster`} />
        <p>User score: {calculateScore(vote_average)}</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        <ul>
            {/* {genres.map(genre => {
                return (
                    <li >{genre.name + ' '}</li>
                )
            })} */}
        </ul>
        <hr/>
        <p>Additional information</p>
        <ul>
            <li><NavLink to='cast'>Cast</NavLink></li>
            <li><NavLink to='reviews'>Reviews</NavLink></li>
        </ul>
        </>
    )
}