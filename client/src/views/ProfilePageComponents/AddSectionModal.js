import React from 'react';

const sections = [
  "Publications",
  "Personal Projects",
  "Awards and Achievements",
  "Positions of Responsibility",
  "Competitions",
  "Extra-curricular Activities"
];

export default function AddSectionModal({ isOpen, onClose, onAddSection }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add More Sections</h2>
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                onAddSection(section);
                onClose();
              }}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {section}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}