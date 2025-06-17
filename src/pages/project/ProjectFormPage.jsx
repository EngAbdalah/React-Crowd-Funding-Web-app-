import React, { useState, useEffect } from 'react';
import {API} from '../../api/axios';  

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    details: '',
    total_target: '',
    start_date: '',
    end_date: ''
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get('/api/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    API.get('/api/project-tags/')
      .then(res => setTags(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTagChange = e => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setSelectedTags(selected);
  };

  const handleImageChange = e => {
    setImages(Array.from(e.target.files));
  };

  const uploadImages = async (id) => {
    const promises = images.map(image => {
      const form = new FormData();
      form.append('project', id);
      form.append('pic', image);
      return API.post('/api/project-pics/create/', form, {
        headers: {

        }
      });
    });
    await Promise.all(promises);
  };

  const uploadTags = async (projectId) => {
    const promises = selectedTags.map(tagId => {
      return API.post('/api/project-tags/create/', {
        project: projectId,
        tag: tagId
      });
    });
    await Promise.all(promises);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await API.post('/api/projects/create/', formData);
      const projectId = res.data.id;

      if (images.length > 0) {
        await uploadImages(projectId);
      }

      if (selectedTags.length > 0) {
        await uploadTags(projectId);
      }

      alert('Project created successfully!');
      setFormData({
        category: '',
        title: '',
        details: '',
        total_target: '',
        start_date: '',
        end_date: ''
      });
      setSelectedTags([]);
      setImages([]);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea
            name="details"
            className={`form-control ${errors.details ? 'is-invalid' : ''}`}
            value={formData.details}
            onChange={handleChange}
          />
          {errors.details && <div className="invalid-feedback">{errors.details[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Total Target</label>
          <input
            type="number"
            name="total_target"
            className={`form-control ${errors.total_target ? 'is-invalid' : ''}`}
            value={formData.total_target}
            onChange={handleChange}
          />
          {errors.total_target && <div className="invalid-feedback">{errors.total_target[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="start_date"
            className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
            value={formData.start_date}
            onChange={handleChange}
          />
          {errors.start_date && <div className="invalid-feedback">{errors.start_date[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="end_date"
            className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
            value={formData.end_date}
            onChange={handleChange}
          />
          {errors.end_date && <div className="invalid-feedback">{errors.end_date[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <select
            multiple
            className="form-select"
            value={selectedTags}
            onChange={handleTagChange}
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
