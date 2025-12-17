"use client";

import { useEffect, useState } from "react";

export default function IoTTestPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://aluna-backend.up.railway.app/api/iot/state")
      .then((res) => res.json())
      .then((json) => {
        console.log("IOT RAW RESPONSE:", json);
        setData(json);
      })
      .catch((err) => {
        console.error(" IOT ERROR:", err);
        setError("Error fetching IoT data");
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>IoT RAW TEST</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!data && <p>Loading...</p>}

      {data && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: 16,
            borderRadius: 8,
            overflow: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
