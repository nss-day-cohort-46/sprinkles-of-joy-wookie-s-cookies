import { bakeryAPI } from "../Settings.js"

let reviews = []

export const useReviews = () => {
    return reviews.slice()
}

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/reviews`)
        .then(response => response.json())
        .then(reviewsArray => {
            reviews = reviewsArray
        })
}

export const saveReview = (reviewObj) => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
    })
    .then(getReviews)
}

const deleteReview = reviewIdent => {
    //deletes a specified review from the API
    return fetch(`${bakeryAPI.baseURL}/reviews/${reviewIdent}`, {
        method: "DELETE",
    })
    .then(getReviews)
    //need to tell the reviews to render again
    .then(() => {
        const newEvent = new CustomEvent("reviewStateChanged")
        eventHub.dispatchEvent(newEvent)
    })
}

const eventHub = document.querySelector("#container")

//listens for the button click on a specific review
eventHub.addEventListener("deleteReviewClicked", evt => {
    deleteReview(evt.detail.deletedReview)
})
