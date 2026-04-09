import React, { useEffect, useState, useRef } from 'react';

export default function DisasterEvents() {
  const [eventData, setEventData] = useState(null);
  const [status, setStatus] = useState('connecting'); // 'connecting', 'connected', 'error'
  const eventSourceRef = useRef(null);

  useEffect(() => {
    let reconnectTimeout;

    const connectSSE = () => {
      setStatus('connecting');
      // 1. Initialize SSE Connection
      eventSourceRef.current = new EventSource('http://localhost:8000/stream');

      // 2. Handle successful connection opening
      eventSourceRef.current.onopen = () => {
        console.log("✅ SSE Connection established.");
        setStatus('connected');
      };

      // 3. Listen for incoming messages
      eventSourceRef.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          // Only log the initial messages or you can leave this out to prevent console spam
          console.log("📥 Received Event:", parsedData);
          setEventData(parsedData);
        } catch (error) {
          console.error("❌ Failed to parse SSE data:", error);
        }
      };

      // 4. Handle errors and disconnections
      eventSourceRef.current.onerror = (error) => {
        console.error("⚠️ SSE Error or disconnection string:", error);
        setStatus('error');
        
        // Ensure we close the errored connection before it attempts native retry
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

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Live Disaster Feed</h2>
        
        {/* Connection Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            status === 'connected' ? 'bg-green-500 animate-pulse' : 
            status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-600 capitalize">
            {status}
          </span>
        </div>
      </div>

      {/* Render Incoming Events */}
      {status === 'connected' && eventData ? (
        <div className="space-y-4 text-left">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-800 font-bold text-lg">{eventData.disaster_type} Alert</span>
              <span className="text-sm text-blue-600 font-semibold">{eventData.time}</span>
            </div>
            <p className="text-gray-700 mt-2"><strong>Location:</strong> {eventData.location}</p>
            <p className="text-gray-700"><strong>Confidence:</strong> {eventData.confidence}</p>
          </div>
          
          {eventData.alerts && eventData.alerts.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-red-600">Critical Alerts:</h3>
              <ul className="list-disc pl-5 mt-1 text-gray-700">
                {eventData.alerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-400">
          {status === 'connecting' ? 'Establishing connection...' : 'Waiting for real-time events...'}
        </div>
      )}
    </div>
  );
}
