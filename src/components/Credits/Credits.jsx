import css from './Credits.module.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w185/'

export default function Credits({credits}) {
    const cast = credits.cast
    return (
        <ul className={css.creditsGrid}>
            {cast.map(({id, profile_path, name, character}) => {
                return(
                    <li key={id}>
                        <img className={css.photo} 
                            src={profile_path !== null 
                                ? `${IMAGE_URL}${profile_path}` 
                                : 'https://placehold.jp/185x278.png'} 
                            alt={`${name}`} />
                        <p>Name: {name}</p>
                        <p>Character: {character}</p>
                    </li>
                )
            })}
        </ul>
    )
} 