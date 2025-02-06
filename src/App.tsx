import { useState, useEffect } from 'react';
import React from 'react';
import { Course, CourseCategory, SKSMinima } from './types/types';
import CourseForm from './components/CourseForm';
import SemesterCard from './components/SemesterCard';
import Summary from './components/Summary';

const SKS_MINIMA: SKSMinima[] = [
  { category: 'MK wajib ITB', minimum: 12, current: 0 },
  { category: 'MK Wajib Prodi', minimum: 48, current: 0 },
  { category: 'MK Pilihan Dalam Prodi', minimum: 16, current: 0 },
  { category: 'MK Pilihan Luar Prodi', minimum: 8, current: 0 },
  { category: 'MK Pilihan Bebas', minimum: 4, current: 0 },
];

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [semesters, setSemesters] = useState<number[]>([1]);
  const [minima, setMinima] = useState<SKSMinima[]>(SKS_MINIMA);

  useEffect(() => {
    calculateMinima();
  }, [courses]);

  const calculateMinima = () => {
    setMinima(prev => prev.map(cat => ({
      ...cat,
      current: courses.filter(c => c.category === cat.category)
                     .reduce((sum, c) => sum + c.sks, 0)
    })));
  };

  const addSemester = () => setSemesters(prev => [...prev, prev.length + 1]);

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        SKSPlanner - ITB Course Planner
      </h1>
      
      <CourseForm onAddCourse={addCourse} />
      
      <div className="my-8">
        <button 
          onClick={addSemester}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tambah Semester
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {semesters.map(sem => (
          <SemesterCard 
            semester={sem}
            courses={courses.filter(c => c.semester === sem)}
            onAssign={course => setCourses(prev => 
              prev.map(c => c.code === course.code ? {...c, semester: sem} : c)
            )}
          />
        ))}
      </div>

      <Summary minima={minima} />
    </div>
  );
}

export default App;