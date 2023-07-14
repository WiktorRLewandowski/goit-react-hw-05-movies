import { Reviews } from "components/Reviews"
import { Credits } from "components/Credits"
import { useLayoutEffect, useState } from "react"
import { Routes, useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { fetchById } from "services"
import { refs } from "services/refs"
import { Route } from "react-router-dom"

const IMG_URL = 'https://image.tmdb.org/t/p/w300'



export const MoviePage = () => {
    const [movie, setMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [credits, setCredits] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    // const [searchParams, setSearchParams] = useSearchParams()

    // setSearchParams(667538)

    useLayoutEffect(()=> {
        setIsLoading(true)
        fetchById(id)
        .then(movie => setMovie(movie))
        .catch(error => console.log(error))
        .then(()=> setIsLoading(false))
    }, [id])

    fetchById(id, refs.reviews)
    .then(review => setReviews(review))
    .catch(error => console.log(error))

    fetchById(id, refs.credits)
    .then(credit => setCredits(credit))
    .catch(error => console.log(error))

    const calculateScore = (score) => {
        const userScore = Math.round(score*10)
        return `${userScore}%`
    }

    // function spliceYear(year) {
    //     return year.splice(4,0)
    // }

    if(isLoading) {
        return 'Loading...'
    }

    return (
        <>
        <h1>{`${movie.title} (${movie.release_date})`}</h1>
        <img src={`${IMG_URL}${movie.poster_path}`} alt={`${movie.title} official poster`} />
        <p>User score: {calculateScore(movie.vote_average)}</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h2>Genres</h2>
        {/* <p>{movie.genres.map(genre => genre.name + ' ')}</p> */}
        <hr/>
        <p>Additional information</p>
        <ul>
            <li><NavLink to='cast'>Cast</NavLink></li>
            <li><NavLink to='reviews'>Reviews</NavLink></li>
        </ul>
        <Routes>
            <Route path='reviews' element={<Reviews reviews={reviews} />}/>
            <Route path='cast' element={<Credits credits={credits} />}/>
        </Routes>
        </>
    )
}