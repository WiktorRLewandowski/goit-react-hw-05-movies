export const Reviews = ({ reviews }) => {
    const results = reviews.results
    return (
        <ul>
            {results.map(({id, author, content}) => {
                return (
                    <li key={id}>
                        <strong>Author: {author}</strong>
                        <p>{content}</p>
                    </li>
                )
            })}
        </ul>
    )
}