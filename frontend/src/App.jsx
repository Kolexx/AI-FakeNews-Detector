import { useEffect, useState } from "react";
import { detectFakeNews } from "./api"; // Import the correct function name

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Data from Backend:</h1>
      {data ? (
        <pre className="bg-gray-800 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
