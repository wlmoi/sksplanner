import React from "react";
import { Course } from "../types/types";

export default function SemesterCard({ 
  semester, 
  courses,
  onAssign 
}: {
  semester: number;
  courses: Course[];
  onAssign: (course: Course) => void;
}) {
  const totalSKS = courses.reduce((sum, c) => sum + c.sks, 0);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Semester {semester}</h2>
        <span className={`px-2 py-1 rounded ${
          totalSKS > 4 ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {totalSKS}/4 SKS
        </span>
      </div>
      
      <div className="space-y-2">
        {courses.map(course => (
          <div key={course.code} className="bg-gray-50 p-2 rounded flex justify-between">
            <div>
              <div className="font-medium">{course.code}</div>
              <div className="text-sm text-gray-600">{course.name}</div>
              <div className="text-xs text-blue-600">{course.category}</div>
            </div>
            <button 
              onClick={() => onAssign({ ...course, semester: undefined })}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}