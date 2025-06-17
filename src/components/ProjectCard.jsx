import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg shadow p-4" onClick={() => navigate(`/project/${project.id}`)}>
      <img 
        src={project.pictures[0]?.pic || 'https://via.placeholder.com/300x200'} 
        alt={project.title} 
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-sm text-gray-500">{project.category.name}</p>
      <p className="text-sm">Funding: {project.funding_percentage.toFixed(1)}%</p>
      <p className="text-sm">Rating: {project.average_rating}</p>
      <div className="flex flex-wrap mt-2">
        {project.tags.map(tag => (
          <span key={tag.id} className="text-xs bg-gray-200 rounded px-2 py-1 mr-1">{tag.tagname}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
