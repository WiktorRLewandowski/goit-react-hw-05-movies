import { Reviews } from "components/Reviews"
import { Credits } from "components/Credits"
import { useEffect, useState } from "react"
import { Link, Routes, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { fetchById } from "services"
import { refs } from "services/refs"
import { Route } from "react-router-dom"
import { MovieDetails } from "components/MovieDetails"


export const MoviePage = () => {
    const [movie, setMovie] = useState([]) 
    const [reviews, setReviews] = useState([])
    const [credits, setCredits] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/movies";

    useEffect(()=> {
        setIsLoading(true)
        fetchById(id)
        .then(movie => setMovie(movie))
        .catch(error => console.log(error))
          

        fetchById(id, refs.reviews)
        .then(review => setReviews(review))
        .catch(error => console.log(error))

        fetchById(id, refs.credits)
        .then(credit => setCredits(credit))
        .catch(error => console.log(error))
        .then(()=> setIsLoading(false))
    }, [id])

    if(isLoading) {
        return 'Loading...'
    }

    return (
        <>
        <Link to={backLinkHref}>{`<<`} Back to movies</Link>
        <MovieDetails movie={movie}/>
        <Routes>
            <Route path='reviews' element={<Reviews reviews={reviews} />}/>
            <Route path='cast' element={<Credits credits={credits} />}/>
        </Routes>
        </>
    )
}