import { authHelper } from "../auth/authHelper.js"
import { customerLogin } from "./CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__login")


export const LoginForm = () => {
  render()
}


const render = () => {
  //if the user is not logged in, render login HTML
  if (!authHelper.isUserLoggedIn()) {
    contentTarget.innerHTML = `
      <h3>Login</h3>
      <p>Don't have an account? Click <a href="#" id="link__register">here</a> to register.</p>
      <form>
        <fieldset>
          <label for="login-email">Email: </label>
          <input type="text" id="login-email" name="login-email">
        </fieldset>
        <fieldset>
          <label for="login-password">Password: </label>
          <input type="password" id="login-password" name="login-password">
        </fieldset>
        <button id="customerLogin">Login</button>
      </form>
    `
  }
}

//listens for click on customer login button, stores user info, 
//or sends to register form, or back to login form
eventHub.addEventListener("click", e => {
  //if id matches customer login button
  if (e.target.id === "customerLogin") {
    e.preventDefault()
    //grab inputs 
    const loginEmail = document.querySelector(".login-email").value
    const loginPassword = document.querySelector(".login-password").value
    //sends email and password to API to fetch customer data
    customerLogin(loginEmail, loginPassword)
      .then(user => {
        //user = user object with data info
        if (user) {
          //empties content target to fill with new data
          contentTarget.innerHTML = ""
          //passes user id into function that stores user login info
          authHelper.storeUserInSessionStorage(user.id)
          //dispatches event that the user is logged in
          const customEvent = new CustomEvent("userLoggedIn")
          eventHub.dispatchEvent(customEvent)
        } else {
        //if the login info doesn't match anything in the API, 
        //the alert message is called
          alert("Invalid email and/or password. Please try again.")
        }
      })
  //if the target id matches register button
  } else if (e.target.id === "link__register") {
    //empty content target for new data
    contentTarget.innerHTML = ""
    //dispatch event that register button was clicked
    const customEvent = new CustomEvent("showRegisterForm")
    eventHub.dispatchEvent(customEvent)
  }
})

//listens for "showLoginform" and renders login form
eventHub.addEventListener("showLoginForm", event => {
  LoginForm()
})
