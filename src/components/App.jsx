import { Routes, Route, NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Notify } from "notiflix";
import { Home } from "pages/Home";
import { Movies } from "pages/Movies";
import { fetchSearch, fetchTrending } from "services";
import { MoviePage } from "pages/MoviePage";
import { Reviews } from "./Reviews";
import { Credits } from "./Credits";

export default function App() {
  const [movies, setMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useSearchParams()

  useEffect(()=> {
    fetchTrending()
    .then(movies => setMovies(movies))
    .catch(error => setError(error))
    .then(()=> setIsLoading(false))
  }, [error])

  const handleSubmit = async e => {
    e.preventDefault()
    
    const value = e.target.searchQuery.value
    setIsLoading(true)
    setParams(value || params)
    await fetchSearch(value)
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
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/movies">Movies</NavLink></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" index element={<Home movies={movies}/>}/>
      <Route path='/movies' element={<Movies movies={searchMovies} onSubmit={handleSubmit}/>}/>
        <Route path='/movies/:id/*' element={<MoviePage/>}>
          <Route path='reviews' element={<Reviews />}/>
          <Route path='cast' element={<Credits />}/>
        </Route>
      <Route/>                     
    </Routes>
    </>
  );
};
