import React, { useEffect, useState } from 'react';
import {API} from '../../api/axios';

function ProjectTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTagName, setNewTagName] = useState('');
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState('');

  // Get all tags
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await API.get('/api/project-tags/');
      setTags(res.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create tag
  const handleCreate = async () => {
    if (!newTagName.trim()) return alert('اسم التاج مطلوب');
    try {
      await API.post('/api/project-tags/create/', { name: newTagName });
      setNewTagName('');
      fetchTags();
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  // Start editing
  const startEdit = (tag) => {
    setEditTagId(tag.id);
    setEditTagName(tag.name);
  };

  // Save update
  const handleUpdate = async () => {
    if (!editTagName.trim()) return alert('اسم التاج مطلوب');
    try {
      await API.put(`/api/project-tags/${editTagId}/update/`, { name: editTagName });
      setEditTagId(null);
      setEditTagName('');
      fetchTags();
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  // Delete tag
  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف التاج؟')) return;
    try {
      await API.delete(`/api/project-tags/${id}/delete/`);
      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>إدارة الـ Project Tags</h2>

      {/* Create new tag */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="اسم التاج الجديد"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button onClick={handleCreate}>إضافة</button>
      </div>

      {/* List tags */}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <ul>
          {tags.map(tag => (
            <li key={tag.id} style={{ marginBottom: '0.5rem' }}>
              {editTagId === tag.id ? (
                <>
                  <input
                    type="text"
                    value={editTagName}
                    onChange={(e) => setEditTagName(e.target.value)}
                  />
                  <button onClick={handleUpdate}>حفظ</button>
                  <button onClick={() => setEditTagId(null)}>إلغاء</button>
                </>
              ) : (
                <>
                  {tag.name}
                  <button onClick={() => startEdit(tag)} style={{ marginLeft: '0.5rem' }}>تعديل</button>
                  <button onClick={() => handleDelete(tag.id)} style={{ marginLeft: '0.5rem' }}>حذف</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectTagsPage;
