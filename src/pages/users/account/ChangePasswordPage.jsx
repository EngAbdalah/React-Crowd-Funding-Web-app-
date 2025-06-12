// src/pages/auth/ChangePasswordPage.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ 
        show: false, 
        message: '', 
        type: '' 
    });

    const initialValues = {
        old_password: '',
        new_password1: '',
        new_password2: '',
    };

    const validationSchema = Yup.object({
        old_password: Yup.string()
            .required('Current password is required'),
        new_password1: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New password is required'),
        new_password2: Yup.string()
            .oneOf([Yup.ref('new_password1'), null], 'Passwords must match')
            .required('Confirm new password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await authService.changePassword(
                values.new_password1, 
                values.new_password2, 
                values.old_password
            );
            
            setNotification({
                show: true,
                message: 'Password changed successfully!',
                type: 'success'
            });
            
            resetForm();
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error) {
            setNotification({
                show: true,
                message: error.message || 'Failed to change password. Please try again.',
                type: 'danger'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Change Password</h2>

                {notification.show && (
                    <Notification 
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({...notification, show: false})}
                    />
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Current Password</label>
                                <Field 
                                    name="old_password" 
                                    type="password" 
                                    className="form-control" 
                                />
                                <ErrorMessage name="old_password" className="text-danger small mt-1" component="div" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <Field 
                                    name="new_password1" 
                                    type="password" 
                                    className="form-control" 
                                />
                                <ErrorMessage name="new_password1" className="text-danger small mt-1" component="div" />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Confirm New Password</label>
                                <Field 
                                    name="new_password2" 
                                    type="password" 
                                    className="form-control" 
                                />
                                <ErrorMessage name="new_password2" className="text-danger small mt-1" component="div" />
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting || !isValid}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            Changing Password...
                                        </>
                                    ) : 'Change Password'}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-link text-decoration-none"
                                    onClick={() => navigate('/profile')}
                                >
                                    Back to Profile
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ChangePasswordPage;