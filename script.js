const categories = [
   "𝑭𝒐𝒄𝒖𝒔 𝑫𝒖𝒓𝒊𝒏𝒈 𝑺𝒆𝒔𝒔𝒊𝒐𝒏",
    "𝑬𝒎𝒐𝒕𝒊𝒐𝒏𝒂𝒍 𝒔𝒄𝒂𝒍𝒆",
    "𝑹𝒆𝒔𝒑𝒆𝒄𝒕 𝑳𝒆𝒗𝒆𝒍",
    "𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒄𝒂𝒕𝒊𝒐𝒏 𝑪𝒍𝒂𝒓𝒊𝒕𝒚",
    "𝑯𝒖𝒎𝒐𝒓",
    "𝑶𝒗𝒆𝒓 𝒂𝒍𝒍"
];

const ratingContainer = document.getElementById("rating-container");
const sessionsDiv = document.getElementById("sessions");
const addSessionBtn = document.getElementById("addSessionBtn");


let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

function getComment(score) {
    if (score >= 4.1) {
        return "Certified Green Flag🌱˚✧!";
    } 
    else if (score >= 3.2) {
        return "Strong progress 💪";
    } 
    else if (score >= 2.7) {
        return "₊˚ʚ 🌵₊Behave Yourself early˚✧ﾟᵇᵉᶠᵒʳᵉ ⁱᵗˢ ᵗᵒᵒ ˡᵃᵗᵉ.!";
    } 
    else {
        return "🥊𝘀𝗼𝗳𝘁𝘄𝗮𝗿𝗲 𝘂𝗽𝗱𝗮𝘁𝗲 𝗿𝗲𝗾𝘂𝗶𝗿𝗲𝗱💥👅";
    }
}

if (ratingContainer) {

    let ratings = {};

    categories.forEach(category => {

        ratings[category] = 0;

        const group = document.createElement("div");
        group.classList.add("rating-group");

        const label = document.createElement("p");
        label.textContent = category;

        const starsDiv = document.createElement("div");
        starsDiv.classList.add("stars");

        for (let i = 1; i <= 5; i++) {

            const star = document.createElement("span");
            star.innerHTML = "★";
            star.dataset.value = i;
            star.classList.add("star");

            star.addEventListener("click", () => {
                ratings[category] = i;

                Array.from(starsDiv.children).forEach(s => {
                    s.classList.remove("selected");
                    if (s.dataset.value <= i) {
                        s.classList.add("selected");
                    }
                });
            });

            starsDiv.appendChild(star);
        }

        group.appendChild(label);
        group.appendChild(starsDiv);
        ratingContainer.appendChild(group);
    });

    addSessionBtn.addEventListener("click", () => {

        for (let key in ratings) {
            if (ratings[key] === 0) {
                alert("Rate all categories!");
                return;
            }
        }

        let total = 0;
        for (let key in ratings) {
            total += ratings[key];
        }

        const average = (total / categories.length).toFixed(2);

        const newSession = {
            id: Date.now(), 
            score: average
        };

        sessions.push(newSession);

        localStorage.setItem("sessions", JSON.stringify(sessions));

        alert("Session Saved Successfully!");
        location.reload();
    });
}


if (sessionsDiv) {

    function renderSessions() {

        sessionsDiv.innerHTML = "";

        if (sessions.length === 0) {
            sessionsDiv.innerHTML = "<p>No sessions yet.</p>";
            return;
        }

        sessions.forEach((session, index) => {

            const card = document.createElement("div");
            card.classList.add("session-card");

            card.innerHTML = `
                <h3>Session ${index + 1}</h3>
                <div class="score">Overall Score: ${session.score} / 5</div>
                <p>${getComment(parseFloat(session.score))}</p>
                <button onclick="deleteSession(${session.id})">Delete</button>
            `;

            sessionsDiv.appendChild(card);
        });
    }

    window.deleteSession = function(id) {

        sessions = sessions.filter(session => session.id !== id);

        localStorage.setItem("sessions", JSON.stringify(sessions));

        renderSessions();
    };

    renderSessions();
}