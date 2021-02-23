export const Review = (review, customer) => {
    return `
        <article class="productReview">
            <h3>${review.rating} out of 5 stars</h3>
            <p>"${review.reviewText}"</p>
            <p>-${customer.name}</p>
        </article>
`
}