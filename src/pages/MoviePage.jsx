import { useState } from "react"
import { fetchById } from "services"

const IMG_URL = 'https://image.tmdb.org/t/p/w300'



export const MoviePage = () => {
    const [movie, setMovie] = useState([])

    fetchById(667538)
    .then(movie => setMovie(movie))
    .catch(error => console.log(error))

    // const year = movie.release_date

    const calculateScore = (score) => {
        const userScore = Math.round(score*10)
        return `${userScore}%`
    }

    // function spliceYear(year) {
    //     return year.splice(4,0)
    // }
    // console.log(calculateScore(movie.user.vote_average))
    
    return (
        <>
        <h1>{`${movie.title} (${movie.release_date})`}</h1>
        <img src={`${IMG_URL}${movie.poster_path}`} alt={`${movie.title} official poster`} />
        <p>User score: {calculateScore(movie.vote_average)}</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h2>Genres</h2>
        {/* <p>{movie.genres.map(genre => genre.name + ' ')}</p> */}
        </>
    )
}