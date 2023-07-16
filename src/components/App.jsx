import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Notify } from "notiflix";
import { fetchSearch, fetchTrending } from "services";

import  SharedLayout  from "./SharedLayout/SharedLayout";

const Home = lazy(()=> import('pages/Home'))
const Movies = lazy(()=> import('pages/Movies'))
const MoviePage = lazy(()=> import('pages/MoviePage'))

export default function App() {
  const [movies, setMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useSearchParams()
  const query = params.get('query')

  useEffect(()=> {
    fetchTrending()
    .then(movies => setMovies(movies))
    .catch(error => setError(error))
    .then(()=> setIsLoading(false))
  }, [error, query])

  const handleSubmit = async e => {
    e.preventDefault()
    
    const value = e.target.searchQuery.value
    setIsLoading(true)
    setParams(value)
    let searchValue = query ? query : value

    await fetchSearch(searchValue)
    .then(movies=> movies.results.length === 0 && value
      ? Notify.failure("Check 'em typos. No such movies!")
      : setSearchMovies(movies.results))
    .catch(error=> setError(error))
    .then(()=> setIsLoading(false))
  }

  if(isLoading) {
    return 'Loading...'
  }


  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <SharedLayout/>
    <Routes>
      <Route index element={<Home movies={movies}/>}/>
      <Route path='movies' element={<Movies movies={searchMovies} onSubmit={handleSubmit}/>}/>
        <Route path='movies/:id/*' element={<MoviePage />} />
      <Route/>                     
    </Routes>
    </Suspense>
    </>
  );
};
