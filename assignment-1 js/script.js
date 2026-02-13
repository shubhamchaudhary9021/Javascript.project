const form = document.getElementById("eventForm");
const eventContainer = document.getElementById("eventContainer");
const emptyState = document.querySelector(".empty-state");
const clearBtn = document.getElementById("clearAllBtn");
const sampleBtn = document.getElementById("addSampleBtn");


// ================= LOAD FROM LOCAL STORAGE =================
window.onload = function () {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    if (savedEvents.length > 0) {
        emptyState.style.display = "none";
        savedEvents.forEach(event => createEventCard(event));
    }
};


// ================= FORM SUBMIT =================
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


// ================= SAVE TO LOCAL STORAGE =================
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}


// ================= CREATE EVENT CARD =================
function createEventCard(event) {

    emptyState.style.display = "none";

    const div = document.createElement("div");
    div.classList.add("event-card");

    div.innerHTML = `
        <button class="delete-btn">❌</button>
        <div class="event-title">${event.title}</div>
        <div>Date: ${event.date}</div>
        <div>Category: ${event.category}</div>
        <div>${event.description}</div>
    `;

    eventContainer.appendChild(div);
}


// ================= DELETE EVENT =================
eventContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {

        const card = e.target.closest(".event-card");
        const title = card.querySelector(".event-title").textContent;

        card.remove();
        removeFromStorage(title);

        if (eventContainer.children.length === 0) {
            eventContainer.innerHTML =
                '<div class="empty-state">No events yet. Add your first event!</div>';
        }
    }
});


// ================= REMOVE FROM STORAGE =================
function removeFromStorage(title) {

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events = events.filter(event => event.title !== title);
    localStorage.setItem("events", JSON.stringify(events));
}


// ================= CLEAR ALL =================
clearBtn.addEventListener("click", function () {
    localStorage.removeItem("events");
    eventContainer.innerHTML =
        '<div class="empty-state">No events yet. Add your first event!</div>';
});


// ================= ADD SAMPLE EVENTS =================
sampleBtn.addEventListener("click", function () {

    const sampleEvents = [
        { title: "Tech Conference", date: "2026-02-20", category: "Conference", description: "AI & Tech Trends" },
        { title: "Web Dev Workshop", date: "2026-02-25", category: "Workshop", description: "Frontend Basics" },
        { title: "Startup Meetup", date: "2026-03-01", category: "Meetup", description: "Networking Event" }
    ];

    sampleEvents.forEach(event => {
        saveEvent(event);
        createEventCard(event);
    });
});
// ================= DEMO BOX =================

const demoBox = document.getElementById("demoBox");

// Key press event
document.addEventListener("keydown", function (e) {
    demoBox.innerHTML = "<strong>You Pressed:</strong> " + e.key;
});

// Click event
demoBox.addEventListener("click", function () {
    demoBox.innerHTML = "Box Clicked 🎉";
});

