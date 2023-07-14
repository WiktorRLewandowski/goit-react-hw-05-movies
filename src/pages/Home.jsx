import { Link } from "react-router-dom"

export const Home = ({movies}) => {
    return (
        <>
        <h1>This a homa</h1>
        <ul>
        {movies.map(movie => {
            return(
            <li key={crypto.randomUUID()}>
                <Link to={`/movies/${movie.id}}`}>{movie.title}</Link>
            </li>)
        })}
        </ul>
        </>
    )
}