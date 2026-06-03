'use client';
import React from 'react';

//Example roadmap component to outline future plans for the platform. This is a static component for now, but we can make it dynamic later by fetching roadmap items from an API or CMS.
const chapters = [
    {id: 1, title: 'Basics', status: 'completed'},
    {id: 2, title: 'Intermediate Concepts', status: 'in-progress'},
    {id: 3, title: 'Advanced Techniques', status: 'locked'},
]
export default function Roadmap() {
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Roadmap</h1>
      <p className="text-gray-700 mb-4">
        This is where we will outline the future plans and features for our gamified learning platform. 
        Stay tuned for updates and new functionalities!
      </p>
      <ul className="list-disc list-inside text-gray-700">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <span className={`font-medium ${chapter.status === 'completed' ? 'text-green-600' : chapter.status === 'in-progress' ? 'text-yellow-600' : 'text-gray-500'}`}>
              {chapter.title}
            </span>
            <span className="ml-2 text-sm">
              ({chapter.status})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}