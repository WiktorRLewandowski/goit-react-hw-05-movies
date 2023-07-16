import { useEffect, useState} from "react"
import { Link, Routes, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { fetchById } from "services"
import { refs } from "services"
import { Route } from "react-router-dom"

import  MovieDetails  from "components/MovieDetails/MovieDetails"
import  Credits from "components/Credits/Credits"
import  Reviews from "components/Reviews/Reviews"

export default function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState(() => {
        return (
        fetchById(id)
        .then(movie => setMovie(movie))
        .catch(error => console.log(error))
        )
    }) 
    const [reviews, setReviews] = useState(()=> {
        return (
        fetchById(id, refs.reviews)
        .then(review => setReviews(review))
        .catch(error => console.log(error))   
        )
    })
    const [credits, setCredits] = useState(() => {
        return (
            fetchById(id, refs.credits)
            .then(credit => setCredits(credit))
            .catch(error => console.log(error))
            
        )
    })
    const [isLoading, setIsLoading] = useState(false)    
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
        <Link className="btnBack" to={backLinkHref}>{`<<`} Back to movies</Link>
        
        <MovieDetails movie={movie}/>
        <Routes>
            <Route path='reviews' element={!reviews.total_results ? "No reviews yet" : <Reviews reviews={reviews} />}/>
            <Route path='cast' element={!credits.cast ? 'No cast listed' : <Credits credits={credits}/> }/>
        </Routes>
        
        </>
    )
}
