import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Notify } from "notiflix";
import { Home } from "pages/Home";
import { Movies } from "pages/Movies";
import { fetchSearch, fetchTrending } from "services";
import { MoviePage } from "pages/MoviePage";

export default function App() {
  const [movies, setMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=> {
    fetchTrending()
    .then(movies => setMovies(movies))
    .catch(error => setError(error))
    .then(()=> setIsLoading(false))
  }, [error])

  // console.log(movies)
  // console.log(error)
  // console.log(isLoading)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const value = e.target.searchQuery.value
    console.log(value)
    if (value)
    await fetchSearch(value)
    .then(movies=> movies.results.length === 0
      ? Notify.failure("Check 'em typos. No such movies!")
      : setSearchMovies(movies.results))
    .catch(error=> setError(error))
    .then(()=> setIsLoading(false))
  }


  return (
    <>
    {/* something lika header component? With children as links? */}
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/movies">Movies</NavLink></li>
        <li><NavLink to="/moviepage">Movies Page</NavLink></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/' element={<Home movies={movies}/>}/>
      <Route path='/Movies' element={<Movies movies={searchMovies} onSubmit={handleSubmit}/>}/>         
      
      <Route path='/MoviePage' element={<MoviePage/>}/>
    </Routes>
    </>
  );
};
