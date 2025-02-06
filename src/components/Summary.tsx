import React from 'react';
import { SKSMinima } from "../types/types";

export default function Summary({ minima }: { minima: SKSMinima[] }) {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Progress SKS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {minima.map(cat => (
          <div key={cat.category} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between mb-2">
              <span>{cat.category}</span>
              <span className={`font-semibold ${
                cat.current >= cat.minimum ? 'text-green-600' : 'text-red-600'
              }`}>
                {cat.current}/{cat.minimum}
              </span>
            </div>
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${Math.min((cat.current / cat.minimum) * 100, 100)}%` }}
              />
          </div>
        ))}
      </div>
    </div>
  );
}