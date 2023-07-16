import { NavLink, useLocation, useParams } from "react-router-dom"
import { useState } from "react"
import { fetchById } from "services"
import css from './MovieDetails.module.css'

const IMG_URL = 'https://image.tmdb.org/t/p/w300'

export default function MovieDetails() {
    const { id } = useParams()
    const location = useLocation()
    const [movie, setMovie] = useState(() => {
        return (
        fetchById(id)
        .then(movie => setMovie(movie))
        .catch(error => console.log(error))
        )
    }) 
    const {
        title, 
        release_date, 
        poster_path,
        vote_average,
        overview,
        genres,    
    } = movie
    
    const calculateScore = (score) => {
        const userScore = Math.round(score*10)
        return `${userScore}%`
    }  

    return(
        <>
        <div className={css.wrapper}>
                <img src={`${IMG_URL}${poster_path}`} alt={`${title} official poster`} />
            <div className={css.details}>
                <h2>{title} {release_date ? `(${release_date.slice(0,4)})` : ''}</h2>
                <p>User score: {calculateScore(vote_average)}</p>
                <h3>Overview</h3>
                <p>{overview}</p>
                <h3>Genres</h3>
                <ul>
                    {genres ? genres.map(genre => {
                        return (
                            <li key={crypto.randomUUID()}>{genre.name + ' '}</li>
                            )
                        }):''}
                </ul>
            </div>    
        </div>
        <div className={css.additional}>
                <hr/>
                <p>Additional information</p>
                <ul>
                    <li><NavLink to='cast' state={{ from: location.state?.from }}>Cast</NavLink></li>
                    <li><NavLink to='reviews' state={{ from: location.state?.from }}>Reviews</NavLink></li>
                </ul>
        </div>
    </>
    )
}
