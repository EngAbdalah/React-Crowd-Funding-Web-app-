import React from 'react';

const TagList = ({ tags }) => (
  <div className="flex flex-wrap">
    {tags.map(tag => (
      <span key={tag.id} className="bg-gray-300 rounded px-2 py-1 text-xs mr-1 mb-1">
        {tag.tagname}
      </span>
    ))}
  </div>
);

export default TagList;
