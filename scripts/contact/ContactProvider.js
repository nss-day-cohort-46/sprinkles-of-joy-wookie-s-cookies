import { bakeryAPI } from "../Settings.js"

//saves contact info to API---------------------------------------
export const saveContact = (contacts) => {
    return fetch(`${bakeryAPI.baseURL}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contacts)
    })
}