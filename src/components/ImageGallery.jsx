import React from 'react';

const ImageGallery = ({ pictures }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    {pictures.map(pic => (
      <img key={pic.id} src={pic.pic} alt="Project pic" className="w-full h-32 object-cover rounded" />
    ))}
  </div>
);

export default ImageGallery;
