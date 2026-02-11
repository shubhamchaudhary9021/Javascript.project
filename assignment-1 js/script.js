const form = document.getElementById("eventForm");
const eventContainer = document.getElementById("eventContainer");
const emptyState = document.querySelector(".empty-state");
const clearBtn = document.getElementById("clearAllBtn");

// Load events from localStorage
window.onload = function () {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.forEach(event => createEventCard(event));
};

// Form Submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const category = document.getElementById("eventCategory").value;
    const description = document.getElementById("eventDescription").value;

    const eventData = { title, date, category, description };

    saveEvent(eventData);
    createEventCard(eventData);

    form.reset();
});

// Save to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

// Create Event Card
function createEventCard(event) {

    emptyState.style.display = "none";

    const div = document.createElement("div");
    div.classList.add("event-item");

    div.innerHTML = `
        <div class="event-title">${event.title}</div>
        <div>Date: ${event.date}</div>
        <div>Category: ${event.category}</div>
        <div>${event.description}</div>
    `;

    // Click to remove single event
    div.addEventListener("click", function () {
        div.remove();
        removeFromStorage(event.title);
    });

    eventContainer.appendChild(div);
}

// Remove from localStorage
function removeFromStorage(title) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.title !== title);
    localStorage.setItem("events", JSON.stringify(events));
}

// Clear All
clearBtn.addEventListener("click", function () {
    localStorage.removeItem("events");
    eventContainer.innerHTML = '<div class="empty-state">No events yet. Add your first event!</div>';
})
const demoBox = document.getElementById("demoBox");

document.addEventListener("keydown", function(e) {
    demoBox.innerHTML = "<strong>You Pressed:</strong> " + e.key;
});

demoBox.addEventListener("click", function() {
    demoBox.innerHTML = "Box Clicked! 🎉";
});