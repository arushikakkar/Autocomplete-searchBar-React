import { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [input, setInput] = useState(""); // State to hold the input value
  const [results, setResults] = useState([]); // State to hold the fetched results
  const [showResults, setShowResults] = useState(false); // State to control the visibility of results

  const fetchData = async () => {
    console.log("api call", input); // Log the input to see the API call
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input); // Fetch data from the API
    const json = await data.json(); // Parse the JSON response
    setResults(json?.recipes); // Update the results state with the fetched recipes
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 400); //debounce the API call
    return () => {
      clearTimeout(timer); // cleanup function to clear the timer
    };
  }, [input]);

  return (
    <>
      <h1>AutoComplete Search Bar</h1>
      <input
        type="text"
        className="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)} // Show results when input is focused
        onBlur={() => setShowResults(false)} // Hide results when input loses focus
      />

      {showResults && (  // Render results only when showResults is true
        <div className="result-container">
          {results.map((r) => (  // Map through the results and display each one
            <span className="result" key={r.id}>  
              {r.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
