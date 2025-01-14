import React, { useEffect, useState } from 'react';
import { fetchRankings } from './api';
import { Benchmark } from './types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import './index.css';

const App: React.FC = () => {
  const [rankings, setRankings] = useState<Benchmark[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRankings()
      .then((data) => setRankings(data))
      .finally(() => setIsLoading(false));
  }, []);

  const githubBaseUrl = 'https://github.com/ms1546/benchmark-test/blob';
  const fileName = 'index.js';

  const getMedal = (index: number): string | null => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="container max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Benchmark Rankings
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">ロード中...</p>
        ) : rankings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            ランキングデータがありません。
          </p>
        ) : (
          <div className="space-y-4">
            {rankings.map((item, index) => {
              const medal = getMedal(index);
              const displayRank = medal ? `#${medal}` : `#${index + 1}`;
              return (
                <Card
                  key={`${item.branch}-${item.timestamp}`}
                  className={`shadow-md border border-gray-200 rounded-lg ${
                    index === 0
                      ? 'bg-yellow-100' // 金メダル用
                      : index === 1
                      ? 'bg-gray-200' // 銀メダル用
                      : index === 2
                      ? 'bg-orange-100' // 銅メダル用
                      : 'bg-white' // 4位以降
                  }`}
                >
                  <CardHeader className="flex justify-between w-full p-4 border-b border-gray-100">
                    <div className="text-lg font-medium text-gray-800">
                      {displayRank} {item.branch}
                    </div>
                    <div className="text-sm text-gray-500 ml-auto">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <div className="text-gray-700">
                      <strong>処理時間:</strong> {item.executionTime.toFixed(2)} ms
                    </div>
                    <Button
                      asChild
                      variant="link"
                      className="text-blue-500 underline hover:text-blue-700 p-0"
                    >
                      <a
                        href={`${githubBaseUrl}/${item.commitHash}/${fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        コードを見る
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
