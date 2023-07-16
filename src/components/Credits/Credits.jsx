const IMAGE_URL = 'https://image.tmdb.org/t/p/w185/'

export const Credits = ({credits}) => {
    const cast = credits.cast
    // const getPhoto = credits.profile_path !== null ? `${IMAGE_URL}${credits.profile_path}` : 'https://placehold.jp/185x278.png' 
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