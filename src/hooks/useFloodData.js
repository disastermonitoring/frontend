import { useEffect, useState, useRef } from "react";

export default function useFloodData() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("connecting"); // 'connecting', 'connected', 'error'
  const eventSourceRef = useRef(null);

  useEffect(() => {
    let reconnectTimeout;

    const connectSSE = () => {
      setStatus("connecting");
      // 1. Initialize SSE Connection
      eventSourceRef.current = new EventSource("http://localhost:8000/stream");

      // 2. Handle successful connection opening
      eventSourceRef.current.onopen = () => {
        console.log("✅ SSE Connection established.");
        setStatus("connected");
      };

      // 3. Listen for incoming messages
      eventSourceRef.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log("📥 Received Event:", parsedData);
          setData(parsedData); // Update state dynamically
        } catch (error) {
          console.error("❌ Failed to parse SSE data:", error);
        }
      };

      // 4. Handle errors and disconnections properly
      eventSourceRef.current.onerror = (error) => {
        console.error("⚠️ SSE Error or disconnection.", error);
        setStatus("error");

        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }

        // Reconnection logic (Retry after 3 seconds)
        clearTimeout(reconnectTimeout);
        reconnectTimeout = setTimeout(() => {
          console.log("🔁 Attempting to reconnect...");
          connectSSE();
        }, 3000);
      };
    };

    connectSSE();

    // 5. Clean up connection when the component unmounts
    return () => {
      clearTimeout(reconnectTimeout);
      if (eventSourceRef.current) {
        console.log("🔌 Closing SSE Connection.");
        eventSourceRef.current.close();
      }
    };
  }, []);

  return { data, status };
}