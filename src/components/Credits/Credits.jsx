import css from './Credits.module.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w185/'

export default function Credits({credits}) {
    const cast = credits.cast
    return (
        <ul className={css.creditsGrid}>
            {cast.map(credits => {
                return(
                    <li key={credits.id}>
                        <img className={css.photo} 
                            src={credits.profile_path !== null 
                                ? `${IMAGE_URL}${credits.profile_path}` 
                                : 'https://placehold.jp/185x278.png'} 
                            alt={`${credits.name}`} />
                        <p>Name: {credits.name}</p>
                        <p>Character: {credits.character}</p>
                    </li>
                )
            })}
        </ul>
    )
} 