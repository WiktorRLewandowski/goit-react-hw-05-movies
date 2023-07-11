export const Home = ({movies}) => {
    return (
        <>
        <h1>This a homa</h1>
        <ul>
        {movies.map(movie => {
            return(
            <li key={crypto.randomUUID()}>
                {movie.title}
            </li>)
        })}
        </ul>
        </>
    )
}