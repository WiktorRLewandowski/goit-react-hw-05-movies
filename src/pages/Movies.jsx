import { Link } from "react-router-dom"

export default function Movies ({ onSubmit, movies }) {
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
                            <Link to={`/movies/${id}`}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}