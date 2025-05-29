const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = "e170440b4ebd95c0eca0f8cc03238a97";

router.get("/matches", async (req, res) => {
    try {
        const date = new Date().toISOString().slice(0, 10);
        console.log(date);
        const url = `https://v3.football.api-sports.io/fixtures`;
        const headers = {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': API_KEY,
        }
        const params = {
            date: date,
        }
        const response = await axios.get(url, { headers , params });  // Corrected here
        console.log("Matches fetched successfully... ");
        const data = response.data.response.map(match => ({
            date: match.fixture.date,
            venueName: match.fixture.venue.name,
            venueCity: match.fixture.venue.city,
            matchStatus: match.fixture.status.long,
            leagueName: match.league.name,
            leagueSeason: match.league.season,
            leagueRound: match.league.round,
            teamHome: match.teams.home.name,
            teamAway: match.teams.away.name,
            teamHomeLogo: match.teams.home.logo,
            teamAwayLogo: match.teams.away.logo, 
            teamHomeWinner: match.teams.home.winner,
            teamAwayWinner: match.teams.away.winner,
            homeGoals: match.goals.home,
            awayGoals: match.goals.away,
        }));
        return res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching matches: ", err.message);
        return res.status(500).json({ message: "Server error while fetching matches" });
    }
});

module.exports = router;
