export const Review = (review) => {
    return `
        <article class="productReview">
            <h5>${review.rating} out of 5 stars</h5>
            <p>${review.reviewText}</p>
        </article>
`
}