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
    return fetch(`${bakeryAPI.baseURL}/reviews/${reviewIdent}`, {
        method: "DELETE",
    })
    .then(getReviews)
    .then(() => {
        const newEvent = new CustomEvent("reviewStateChanged")
        eventHub.dispatchEvent(newEvent)
    })
}

const eventHub = document.querySelector("#container")

eventHub.addEventListener("deleteReviewClicked", evt => {
    deleteReview(evt.detail.deletedReview)
})
