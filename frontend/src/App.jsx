// frontend/src/App.jsx
import React, { useEffect, useState } from "react";

export default function App() {
  const [series, setSeries] = useState([]);
  const [events, setEvents] = useState([]);
  const [cps, setCps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/timeseries").then(r => r.json()).then(setSeries);
    fetch("http://localhost:8000/api/events").then(r => r.json()).then(setEvents);
    fetch("http://localhost:8000/api/change_points").then(r => r.json()).then(setCps);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Brent Oil — Change Points Dashboard</h1>

      <section>
        <h2>Change Points</h2>
        <ul>
          {cps.map((cp, i) => (
            <li key={i}>
              <b>{cp.cp_date_mode}</b> — μ_before={cp.mu_before_mean?.toFixed?.(4)} → μ_after={cp.mu_after_mean?.toFixed?.(4)} |
              σ_before={cp.sigma_before_mean?.toFixed?.(4)} → σ_after={cp.sigma_after_mean?.toFixed?.(4)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Events (first 10)</h2>
        <ul>
          {events.slice(0,10).map((e, i) => (
            <li key={i}><b>{e.date}</b> — {e.event}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Timeseries (first 10 rows)</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(series.slice(0,10), null, 2)}
        </pre>
      </section>
    </div>
  );
}
