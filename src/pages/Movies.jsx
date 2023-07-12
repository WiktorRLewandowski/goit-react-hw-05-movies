
export const Movies = ({ onSubmit, movies }) => {
    return (
        <>
        <h1>This a mobie</h1>
        <form onSubmit={onSubmit}>
                <input 
                    // className={css.input} 
                    type="text" 
                    name="searchQuery"
                    autoComplete="off" 
                    placeholder="Search movies..." />
                <button type="submit">Search</button>
            </form>
            <ul>
             {movies.map(movie => {
                    return(
                        <li key={crypto.randomUUID()}>
                            {movie.title}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}