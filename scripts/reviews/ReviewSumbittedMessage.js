const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".disappearingMessages")

const ReviewSubmitted = () => {
    render()
}

const render = () => {
    contentContainer.innerHTML = `
    <div id="reviewSubmittedMessage__modal" class="modal--parent">
        <div class="modal--content">
        <h3 class="reviewConfirmationMessage">Your Review Has Been Submitted</h3>
        </div>
    </div>
    `
}

eventHub.addEventListener("newReviewAdded", event => {
    ReviewSubmitted()
    setTimeout(closeModal, 1000)
})

//clears modal HTML
const closeModal = () => {
    contentContainer.innerHTML = ""
}
