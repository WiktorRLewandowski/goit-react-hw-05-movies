import { Link, useLocation } from "react-router-dom"

export const Home = ({movies}) => {
    const location = useLocation()
    return (
        <div className="wrapper">
        <h1 className="header">Trending this week:</h1>
        <ul>
        {movies.map(movie => {
            return(
            <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>{movie.title}</Link>
            </li>)
        })}
        </ul>
        </div>
    )
}