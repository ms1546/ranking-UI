import React, { useEffect, useState } from 'react';
import { fetchRankings } from './api';
import { Benchmark } from './types';
import './index.css';

const App: React.FC = () => {
  const [rankings, setRankings] = useState<Benchmark[]>([]);

  useEffect(() => {
    fetchRankings().then(setRankings);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Benchmark Rankings
        </h1>
        <ul className="space-y-4">
          {rankings.map((item, index) => (
            <li
              key={`${item.branch}-${item.timestamp}`}
              className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-white transition duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  #{index + 1} - Branch: {item.branch}
                </span>
                <span className="text-sm text-gray-500">
                  {/* {new Date(item.timestamp).toLocaleString()} */}
                  {item.timestamp}
                </span>
              </div>
              <div className="mt-2 text-gray-600">
                <strong>Execution Time:</strong> {item.executionTime.toFixed(2)} ms
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
