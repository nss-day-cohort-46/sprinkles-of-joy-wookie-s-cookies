import { authHelper } from "../auth/authHelper.js"

export const Review = (review, customer) => {
    let button = ""
    if (authHelper.isUserLoggedIn()) {
        let customerId = parseInt(authHelper.getCurrentUserId())
        if (customerId === customer.id) {
            button = `<button id="deleteReviewButton">Delete</button>`
        }
    }
    return `
        <article class="productReview">
            <h3>${review.rating} out of 5 stars</h3>
            <p>"${review.reviewText}"</p>
            <p>-${customer.name}</p>
            ${button}
        </article>
`
}