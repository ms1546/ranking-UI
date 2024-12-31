import React, { useEffect, useState } from 'react';
import { fetchRankings } from './api';
import { Benchmark } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import './index.css';

const App: React.FC = () => {
  const [rankings, setRankings] = useState<Benchmark[]>([]);

  useEffect(() => {
    fetchRankings().then(setRankings);
  }, []);

  const githubBaseUrl = 'https://github.com/ms1546/benchmark-test/blob';
  const fileName = 'index.js';

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Benchmark Rankings
        </h1>
        <div className="space-y-4">
          {rankings.map((item, index) => (
            <Card key={`${item.branch}-${item.timestamp}`} className="shadow-md">
              <CardHeader>
                <CardTitle>
                  #{index + 1} {item.branch}
                </CardTitle>
                <span className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </CardHeader>
              <CardContent>
                <div className="mt-2 text-gray-600">
                  <strong>処理時間:</strong> {item.executionTime.toFixed(2)} ms
                </div>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="link"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    <a
                      href={`${githubBaseUrl}/${item.commitHash}/${fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      コードを見る
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
