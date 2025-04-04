// const apiUrl = "https://api.cricapi.com/v1/match_info?apikey=27311824-fd10-45da-b305-97cf09f6c440&id=5dc7a22f-5057-4895-bb98-965d9a1f004e"; 
// let t1 = document.querySelector("#teamA");
// let t2 = document.querySelector("#teamB");
// let btname = document.querySelector("#battingTeam");
// let run = document.querySelector("#runs");
// let wicket = document.querySelector("#wickets");
// let over = document.querySelector("#overs");
// let matchStatus = document.querySelector("#matchStatus");
// let venue = document.querySelector("#venue");
// let matchDate = document.querySelector("#matchDate");
// let inn = document.querySelector("#inning");
// let err=document.querySelector('#error');
// let matchtype=document.querySelector('#matchType');
// // Function to fetch and update live scores
// const getLiveScores = async () => {
//     try {
//         let response = await fetch(apiUrl);
//         let data = await response.json();
//         console.log(data);

//         // Check if there's a match and update the UI
//         if (data.status === "success" && data.data.length > 0) {
//             let match = data.data[0]; // Get first match

//             // Update the match details using the fetched data
//             t1.innerText = match.teams[0];
//             t2.innerText = match.teams[1];
//             matchStatus.innerText = match.status;
//             venue.innerText = match.venue;
//             matchDate.innerText = match.date;
//             matchtype.innerText=match.matchType;
//             // Update the score details
//             if (match.score && match.score.length > 0) {
//                 btname.innerText = match.score[0].inning;
//                 run.innerText = match.score[0].r || "N/A";
//                 wicket.innerText = match.score[0].w || "N/A";
//                 over.innerText = match.score[0].o || "N/A";
//             } else {
//                 run.innerText = "N/A";
//                 wicket.innerText = "N/A";
//                 over.innerText = "N/A";
//             }
//             err.innerText="Live Match Going ON!";
//         } 
//     } catch (error) {
//         console.error("Error fetching live scores:", error);
//     }
// };
// document.addEventListener("DOMContentLoaded", getLiveScores);
//   setInterval(getLiveScores, 30000); 


const apiUrl = "https://api.cricapi.com/v1/match_info?apikey=27311824-fd10-45da-b305-97cf09f6c440&id=5dc7a22f-5057-4895-bb98-965d9a1f004e";

let t1 = document.querySelector("#teamA");
let t2 = document.querySelector("#teamB");
let btname = document.querySelector("#battingTeam");
let run = document.querySelector("#runs");
let wicket = document.querySelector("#wickets");
let over = document.querySelector("#overs");
let matchStatus = document.querySelector("#matchStatus");
let venue = document.querySelector("#venue");
let matchDate = document.querySelector("#matchDate");
let inn = document.querySelector("#inning");
let err = document.querySelector("#error");
let matchtype = document.querySelector("#matchType");

const getLiveScores = async () => {
    try {
        let response = await fetch(apiUrl);
        let result = await response.json();
        console.log(result);

        if (result.status === "success" && result.data) {
            let match = result.data;

            // Update team names
            t1.innerText = match.teams[0];
            t2.innerText = match.teams[1];

            // Match Info
            matchStatus.innerText = match.status;
            venue.innerText = match.venue;
            matchDate.innerText = match.date;
            matchtype.innerText = match.matchType;

            // Score Info
            if (match.score && match.score.length > 0) {
                let currentScore = match.score[0];
                btname.innerText = currentScore.inning;
                run.innerText = currentScore.r || "N/A";
                wicket.innerText = currentScore.w || "0";
                over.innerText = currentScore.o || "N/A";
            } else {
                btname.innerText = "N/A";
                run.innerText = "N/A";
                wicket.innerText = "N/A";
                over.innerText = "N/A";
            }

            // Optional: Show which team won the toss
            err.innerText = `${match.tossWinner} won the toss and chose to ${match.tossChoice}`;
        } else {
            err.innerText = "No live match data found.";
        }

    } catch (error) {
        console.error("Error fetching live scores:", error);
        err.innerText = "Something went wrong fetching match data!";
    }
};
document.addEventListener("DOMContentLoaded", getLiveScores);
setInterval(getLiveScores, 60000);
