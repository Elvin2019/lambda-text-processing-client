import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://dcgp1brqlh.execute-api.us-east-1.amazonaws.com/dev/count-words",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
        }),
      }
    )
      .then((res) => res.json())
      .finally(() => {
        setIsLoading(false);
      });
    setResult(response.message);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <>
          <div className="input-container">
            <textarea
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea className="input-field" value={result} />
          </div>
        </>
      )}

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
