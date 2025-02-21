import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataArray = inputData.split(",").map((item) => item.trim());

    try {
      const res = await axios.post(
        "https://bajaj-finserv-backend-lemon.vercel.app/bfhl",
        { data: dataArray }
      );
      setResponse(res.data);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">BFHL API Client</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-full max-w-md">
        <label className="block mb-2 text-gray-700">Enter comma-separated values:</label>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. 1,2,a,b,c,3"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {response && (
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Response:</h2>
          <pre className="text-sm mt-2 p-2 bg-gray-200 rounded">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
