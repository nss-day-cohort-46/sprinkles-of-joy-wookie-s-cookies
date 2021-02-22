import { saveContact } from "./ContactProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".contact")

export const ContactForm = () => {
    render()
}

const render = () => {
    contentTarget.innerHTML = `
    <h3We'd love to hear from you!</h3>
    <form>
        <fieldset>
        <label for="contact-fullName">Full Name: </label>
        <input type="text" id="contact-fullName" name="contact-fullName">
        </fieldset>

        <fieldset>
        <label for="contact-email">Email: </label>
        <input type="text" id="contact-email" name="contact-email">
        </fieldset>
        
        <fieldset>
        <label for="contact-message">Write message below</label>
        <input type="text" id="contact-message" name="contact-message">
        </fieldset>
        <button id="contactSubmit">Submit</button>
    </form>
    `
}

//Renders the contact Form when the contact button is clicked from the Login menu
eventHub.addEventListener("click", event => {
    if(event.target.id === "showContactForm") {
        render()
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id === "contactSubmit"){
        const name = document.getElementById("contact-fullName").value
        const email = document.getElementById("contact-email").value
        const message = document.getElementById("contact-message").value
        
        const newContact = {
            name: name,
            email: email,
            message: message
        }
        saveContact(newContact)
    }
})