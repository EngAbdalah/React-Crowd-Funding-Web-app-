// src/pages/auth/ForgotPasswordPage.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ 
        show: false, 
        message: '', 
        type: '' 
    });

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await authService.requestPasswordReset(values.email);
            
            setNotification({
                show: true,
                message: 'Password reset instructions sent to your email',
                type: 'success'
            });
            
            resetForm();
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setNotification({
                show: true,
                message: error.message || 'Failed to send reset instructions',
                type: 'danger'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center mb-4">Reset Password</h2>

                {notification.show && (
                    <Notification 
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({...notification, show: false})}
                    />
                )}

                <p className="text-center text-muted mb-4">
                    Enter your email to receive password reset instructions
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="form-label">Email Address</label>
                                <Field 
                                    name="email" 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" className="text-danger small mt-1" component="div" />
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
                                            Sending...
                                        </>
                                    ) : 'Send Reset Instructions'}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <Link to="/login" className="text-decoration-none">
                                    Back to Login
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;