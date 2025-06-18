// Store all the leads here
let myLeads = []

// Grab all the elements we need from the page
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const toastEl = document.getElementById("toast")

// If there are leads saved from before, load them up!
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Save the current tab when the button is clicked
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const url = tabs[0].url
        // Only save if it's not already in the list
        if (!myLeads.includes(url)) {
            myLeads.push(url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
            showToast("Tab saved!")
        } else {
            showToast("This tab is already saved.")
        }
    })
})

// Show all the leads on the page
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
        localStorage.clear()
        myLeads = []
        render(myLeads)
        showToast("All leads deleted.")
    }
})

// Save whatever is in the input box when you click the button or press Enter
inputBtn.addEventListener("click", saveInput)
inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") saveInput()
})

function saveInput() {
    const url = inputEl.value.trim()
    // Make sure it's a real URL and not already saved
    if (url && url.startsWith("http")) {
        if (!myLeads.includes(url)) {
            myLeads.push(url)
            inputEl.value = ""
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
            showToast("Lead saved!")
        } else {
            showToast("This link is already saved.")
        }
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