export const Reviews = ({ reviews }) => {
    const results = reviews.results
    return (
        <ul>
            {results.map(review => {
                return (
                    <li key={review.id}>
                        <strong>Author: {review.author}</strong>
                        <p>{review.content}</p>
                    </li>
                )
            })}
        </ul>
    )
}