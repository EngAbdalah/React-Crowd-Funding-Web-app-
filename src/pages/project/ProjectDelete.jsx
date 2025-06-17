import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/axios';
import authService from '../../api/users';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const DeleteButton = styled.button`
  background-color: ${props => props.theme.colors.error?.main || '#dc3545'};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing?.md || '16px'};
  border-radius: ${props => props.theme.borderRadius?.sm || '4px'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.error?.dark || '#c82333'};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray?.light || '#e9ecef'};
    cursor: not-allowed;
  }
`;

const ProjectDelete = ({ projectId, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const handleDelete = async () => {
    try {
      await API.delete(`/api/projects/${projectId}/delete/`);
      if (onDeleteSuccess) onDeleteSuccess();
      navigate('/');
    } catch (error) {
      console.error('Error deleting project:', error.message);
      alert('فشل في حذف المشروع. حاول مرة أخرى.');
    } finally {
      setShowModal(false);
    }
  };

  if (!authService.isLoggedIn()) return null;

  return (
    <div>
      <DeleteButton onClick={() => setShowModal(true)}>
        حذف المشروع
      </DeleteButton>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد من حذف هذا المشروع؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            لا، إلغاء
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            نعم، احذف
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectDelete;