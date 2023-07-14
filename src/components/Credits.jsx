const IMAGE_URL = 'https://image.tmdb.org/t/p/w185/'

export const Credits = ({credits}) => {
    const cast = credits.cast
    return (
        <ul>
            {cast.map(credits => {
                return(
                    <li key={credits.id}>
                        <img src={`${IMAGE_URL}${credits.profile_path}`} alt={`${credits.name}`} />
                        <p>Name: {credits.name}</p>
                        <p>Character: {credits.character}</p>
                    </li>
                )
            })}
        </ul>
    )
} 