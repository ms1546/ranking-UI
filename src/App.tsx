import React, { useEffect, useState } from 'react';
import { fetchRankings } from './api';
import { Benchmark } from './types';

const App: React.FC = () => {
  const [rankings, setRankings] = useState<Benchmark[]>([]);

  useEffect(() => {
    fetchRankings().then(setRankings);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Benchmark Rankings</h1>
      <ul className="list-decimal pl-6">
        {rankings.map((item, index) => (
          <li key={`${item.branch}-${item.timestamp}`}>
            {index + 1}. Branch: {item.branch}, Time: {item.executionTime.toFixed(2)} ms,
            Date: {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
