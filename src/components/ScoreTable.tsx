'use client';

import { School } from '@/types';
import { JSX } from 'react';

interface ScoreTableProps {
  schools: School[];
}

export default function ScoreTable({ schools }: ScoreTableProps): JSX.Element {
  const sortedSchools = [...schools].sort((a, b) => b.totalScore - a.totalScore);

  const getRankColor = (index: number): string => {
    if (index === 0) return 'bg-amber-100 border-amber-400';
    if (index === 1) return 'bg-slate-100 border-slate-400';
    if (index === 2) return 'bg-orange-100 border-orange-400';
    return 'bg-white border-gray-200';
  };

  const getRankBadge = (index: number): string => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="py-4 px-4 text-left font-display text-sm font-semibold text-primary uppercase tracking-wider">
              Rank
            </th>
            <th className="py-4 px-4 text-left font-display text-sm font-semibold text-primary uppercase tracking-wider">
              School Name
            </th>
            <th className="py-4 px-4 text-left font-display text-sm font-semibold text-primary uppercase tracking-wider">
              Country
            </th>
            <th className="py-4 px-4 text-right font-display text-sm font-semibold text-primary uppercase tracking-wider">
              Total Score
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSchools.map((school, index) => (
            <tr
              key={school.id}
              className={`border-b border-l-4 transition-all duration-200 hover:shadow-md ${getRankColor(
                index
              )}`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <span className="font-display text-lg font-bold text-gray-700">
                    {index + 1}
                  </span>
                  {getRankBadge(index) && (
                    <span className="text-xl">{getRankBadge(index)}</span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-body text-gray-900 font-medium">
                  {school.name}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-body text-gray-600">{school.country}</span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="inline-flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="font-display text-2xl font-bold text-primary">
                      {school.totalScore.toFixed(1)}
                    </span>
                    <span className="font-body text-sm text-gray-500 ml-1">
                      / 5.0
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}