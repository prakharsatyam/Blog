/* eslint-disable react/prop-types */
import { useState } from 'react';

function Video({ video }) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Watch video', checked: false },
    { id: 2, text: 'Practice', checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allChecked = checklist.every(item => item.checked);

  return (
    <div className="p-4 w-full">
      <div className={`bg-gray-800 shadow-lg rounded-lg overflow-hidden flex ${allChecked ? 'border-4 border-white ' : ''} bg-opacity-30 backdrop-blur-md`}>
        <div className="w-2/3">
          <iframe
            className="w-full"
            height="200"
            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>
        <div className="w-1/3 p-4">
          <h2 className="font-bold text-lg mb-2 text-gray-200">{video.snippet.title}</h2>
          <ul className="list-none">
            {checklist.map((item) => (
              <li key={item.id} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-2"
                />
                <span className={item.checked ? "line-through text-gray-500" : "text-gray-200"}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Video;
