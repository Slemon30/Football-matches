import { useState, useEffect } from 'react'
import './App.css'
import API from "./api";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("match/matches");
        console.log("Fetched:", res.data);
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Array.isArray(matches) && matches.length > 0 ? (
        matches.map((match, idx) => (
          <div key={idx}>
            <p>Date: <b>{match.date}</b></p>
            <p>Venue: <b>{match.venueName}, {match.venueCity}</b></p>
            <p>Status: <b>{match.matchStatus}</b></p>
            <p>League: <b>{match.leagueName}</b> ({match.leagueSeason})</p>
            <p>Match: <b>{match.teamHome}</b> vs <b>{match.teamAway}</b></p>
            <p>Score: <b>{match.homeGoals} - {match.awayGoals} </b></p>
            <hr />
          </div>
        ))
      ) : (
        <p>No matches available.</p>
      )}
    </div>
  );
}

export default App;
