document.addEventListener("DOMContentLoaded", fetchLiveScores);

async function fetchLiveScores() {
    const apiUrl = "https://www.thesportsdb.com/api/v1/json/1/eventsday.php?d=20240323&s=Soccer";
    
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        let scoresContainer = document.getElementById("scores");
        scoresContainer.innerHTML = "";

        data.events.forEach(event => {
            let matchCard = document.createElement("div");
            matchCard.classList.add("card");
            matchCard.innerHTML = `
                <h3>${event.strEvent}</h3>
                <p>${event.strLeague}</p>
                <p>Score: ${event.intHomeScore || "N/A"} - ${event.intAwayScore || "N/A"}</p>
            `;
            scoresContainer.appendChild(matchCard);
        });
    } catch (error) {
        console.error("Error fetching live scores:", error);
    }
}

async function fetchSportsChannels() {
    const apiUrl = "https://www.thesportsdb.com/api/v1/json/1/search_all_tv.php?s=Soccer";

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        let channelsContainer = document.getElementById("channels");
        channelsContainer.innerHTML = "";

        data.tvevents.forEach(channel => {
            let channelCard = document.createElement("div");
            channelCard.classList.add("card");
            channelCard.innerHTML = `
                <h3>${channel.strChannel}</h3>
                <p>${channel.strCountry}</p>
            `;
            channelsContainer.appendChild(channelCard);
        });
    } catch (error) {
        console.error("Error fetching sports channels:", error);
    }
}
function searchSports() {
    let query = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
}

// Fetch sports channels when the page loads
document.addEventListener("DOMContentLoaded", fetchSportsChannels);
