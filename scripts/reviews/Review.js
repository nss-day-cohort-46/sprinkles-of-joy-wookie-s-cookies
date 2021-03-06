import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector("#container")

export const Review = (review, customer) => {
    let button = ""
    //if the review belongs to the logged in user, put up a delete button
    if (authHelper.isUserLoggedIn()) {
        let customerId = parseInt(authHelper.getCurrentUserId())
        if (customerId === customer.id) {
            button = `<button id="deleteReviewButton--${review.id}">Delete</button>`
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


//sends out an event if the delete review button is clicked
eventHub.addEventListener("click", evt => {
    //Goes back to the login screen
    if (evt.target.id.startsWith("deleteReviewButton--")) {
        const [prefix, reviewId] = evt.target.id.split("--")
        const reviewWasDeleted = new CustomEvent("deleteReviewClicked", {
            detail: {
                deletedReview: parseInt(reviewId)
            }
        })
        eventHub.dispatchEvent(reviewWasDeleted)
    }
})