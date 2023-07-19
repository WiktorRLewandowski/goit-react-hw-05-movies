import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Notify } from "notiflix";
import { fetchSearch, fetchTrending } from "services";
import { Loader } from "./Loader";

import  SharedLayout  from "./SharedLayout/SharedLayout";
import NotFound from "pages/NotFound";

const Home = lazy(()=> import('pages/Home'))
const Movies = lazy(()=> import('pages/Movies'))
const MoviePage = lazy(()=> import('pages/MoviePage'))

export default function App() {
  const [movies, setMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useSearchParams()
  const query = params.get('q')

  useEffect(()=> {
    fetchTrending()
    .then(movies => setMovies(movies))
    .catch(error => setError(error))
    .then(()=> setIsLoading(false))

    fetchSearch(query)
    .then(movies=> movies.results.length === 0 && query
      ? Notify.failure("Check 'em typos. No such movies!")
      : setSearchMovies(movies.results))
    .catch(error=> setError(error))
    .then(()=> setIsLoading(false))
  }, [error, query])

  const setSearchQuery = (value) => {
    const nextParams = value !== "" ? {q: value} : {}
    setParams(nextParams)
  }
    

  const handleSubmit = async e => {
    e.preventDefault()   
    const value = e.target.searchQuery.value
    if (value) setIsLoading(true)
    setSearchQuery(value)
  }

  if(isLoading) {
    return <Loader/>
  }


  return (
    <>

    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<SharedLayout/>}>
        <Route index element={<Home movies={movies}/>}/>
        <Route path='/movies' element={<Movies movies={searchMovies} onSubmit={handleSubmit}/>}/>
        <Route path='movies/:id/*' element={<MoviePage />} />
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
    </Suspense>
    </>
  );
};
