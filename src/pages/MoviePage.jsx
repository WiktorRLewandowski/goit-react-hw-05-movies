import { useEffect, useState, lazy, Suspense} from "react"
import { Link, Routes, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { fetchById } from "services"
import { refs } from "services"
import { Route } from "react-router-dom"
import { Loader } from "components/Loader"

import MovieDetails from "components/MovieDetails/MovieDetails"

const Credits = lazy(()=> import('components/Credits/Credits'))
const Reviews = lazy(()=> import('components/Reviews/Reviews'))

export default function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState([]) 
    const [reviews, setReviews] = useState([])
    const [credits, setCredits] = useState([])
    const [isLoading, setIsLoading] = useState(false)    
    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/movies";

    useEffect(()=> {

        setIsLoading(true)
        fetchById(id)
        .then(movie => setMovie(movie))
        .catch(error => console.log(error))
        .then(()=> setIsLoading(false))
          
        fetchById(id, refs.reviews)
        .then(review => setReviews(review))
        .catch(error => console.log(error))

        fetchById(id, refs.credits)
        .then(credit => setCredits(credit))
        .catch(error => console.log(error))
    }, [id]) 

    if(isLoading) {
        return <Loader/>
    }

    return (
        <>
        
        <Link className="btnBack" to={backLinkHref}>{`<<`} Back to movies</Link>
        
        <MovieDetails movie={movie}/>
        
        <Suspense fallback={<Loader/>}>
        <Routes>
            <Route path='reviews' element={!reviews.total_results ? "No reviews yet" : <Reviews reviews={reviews} />}/>
            <Route path='cast' element={!credits.cast ? 'No cast listed' : <Credits credits={credits}/> }/>
        </Routes>
        </Suspense>
        
        </>
    )
}
