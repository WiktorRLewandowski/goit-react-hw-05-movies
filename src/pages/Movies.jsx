import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Movies ({ onSubmit, movies }) {
    const location = useLocation()
    return (
        <>
        <form className="form" onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="searchQuery"
                    autoComplete="off" 
                    placeholder="Search for movies..."
                    required
                    />
                <button className="searchBtn" type="submit">Search</button>
            </form>
            <ul>
             {movies.map(({id, title}) => {
                    return(
                        <li key={id}>
                            <Link to={`/movies/${id}`} state={{ from: location }}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}