import { Link, useLocation } from "react-router-dom"

export default function Home({movies}) {
    const location = useLocation()
    return (
        <div className="wrapper">
        <h1 className="header">Trending this week:</h1>
        <ul>
        {movies.map(({id, title}) => {
            return(
            <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>{title}</Link>
            </li>)
        })}
        </ul>
        </div>
    )
}