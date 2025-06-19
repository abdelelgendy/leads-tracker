import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, 
    ref,
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-14586-default-rtdb.firebaseio.com/",
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")
// Grab all the elements we need from the page
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const toastEl = document.getElementById("toast")

// Show all the leads on the page
onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
});

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
    // If there are no leads, show a little message
    if (leads.length === 0) {
        ulEl.classList.add("empty")
        ulEl.innerHTML = `<div class="placeholder">No leads saved yet.</div>`
    } else {
        ulEl.classList.remove("empty")
    }
}

// Double-click the delete button to clear everything
deleteBtn.addEventListener("dblclick", function() {
    if (confirm("Are you sure you want to delete all leads?")) {
        showToast("All leads deleted.")
        // Remove all leads from the database
        remove(referenceInDB)
        // Clear the input box
        ulEl.innerHTML = ""
    }
})

// Save whatever is in the input box when you click the button or press Enter
inputBtn.addEventListener("click", saveInput)
inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") saveInput()
})

function saveInput() {
    const url = inputEl.value.trim()
    // Make sure it's a real URL
    if (url && url.startsWith("http")) {
        // Push the new lead to the Firebase database
        push(referenceInDB,inputEl.value)
        // Clear the input box after saving
        inputEl.value = ""
        showToast("Lead saved!")
        // Optionally, re-fetch and render leads from the database here
    } else {
        showToast("Please enter a valid URL starting with http or https.")
    }
}

// Show a little popup message at the bottom
function showToast(msg) {
    toastEl.textContent = msg
    toastEl.classList.add("show")
    setTimeout(() => {
        toastEl.classList.remove("show")
    }, 1800)
}
