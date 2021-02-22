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
