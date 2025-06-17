import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../api/axios';
import authService from '../../api/users';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateButton = styled.button`
  background-color: ${props => props.theme.colors.primary?.main || '#007bff'};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing?.md || '16px'};
  border-radius: ${props => props.theme.borderRadius?.sm || '4px'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primary?.dark || '#0056b3'};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray?.light || '#e9ecef'};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error?.main || '#dc3545'};
  font-size: ${props => props.theme.typography?.h6?.fontSize || '0.875rem'};
`;

const ProjectUpdate = ({ projectId: initialProjectId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState({
    category: '',
    title: '',
    details: '',
    total_target: '',
    start_date: '',
    end_date: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const projectId = initialProjectId || id;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/api/projects/${projectId}/`);
        setProject({
          category: res.data.category || '',
          title: res.data.title || '',
          details: res.data.details || '',
          total_target: res.data.total_target || '',
          start_date: res.data.start_date?.split('T')[0] || '',
          end_date: res.data.end_date?.split('T')[0] || '',
        });
      } catch (error) {
        console.error('Error fetching project:', error.message);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (project.total_target && parseFloat(project.total_target) < 1000) {
      newErrors.total_target = ['القيمة يجب أن تكون أكبر من أو تساوي 1000.'];
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await API.patch(`/api/projects/${projectId}/update/`, {
        category: project.category,
        title: project.title,
        details: project.details,
        total_target: project.total_target,
        start_date: project.start_date,
        end_date: project.end_date,
      });
      navigate(`/projects/${projectId}`); // توجيه إلى صفحة تفاصيل المشروعprojects/${projectId}
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Error updating project:', error.message);
        alert('فشل في تحديث المشروع. حاول مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authService.isLoggedIn()) return null;

  return (
    <div>
      <UpdateButton onClick={() => setShowModal(true)} disabled={loading}>
        تحديث المشروع
      </UpdateButton>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تحديث المشروع</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>الفئة</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={project.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.category?.[0] || 'هذا الحقل مطلوب.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.[0] || 'هذا الحقل مطلوب.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDetails">
              <Form.Label>التفاصيل</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                value={project.details}
                onChange={handleChange}
                isInvalid={!!errors.details}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.details?.[0] || 'هذا الحقل مطلوب.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTotalTarget">
              <Form.Label>الهدف الإجمالي</Form.Label>
              <Form.Control
                type="number"
                name="total_target"
                value={project.total_target}
                onChange={handleChange}
                isInvalid={!!errors.total_target}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.total_target?.[0] || 'القيمة يجب أن تكون أكبر من أو تساوي 1000.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>تاريخ البداية</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={project.start_date}
                onChange={handleChange}
                isInvalid={!!errors.start_date}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.start_date?.[0] || 'هذا الحقل مطلوب.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>تاريخ النهاية</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={project.end_date}
                onChange={handleChange}
                isInvalid={!!errors.end_date}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.end_date?.[0] || 'هذا الحقل مطلوب.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'جاري التحديث...' : 'حفظ التغييرات'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectUpdate;