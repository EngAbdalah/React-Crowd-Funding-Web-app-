import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function LoginPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ 
        show: false, 
        message: '', 
        type: '' 
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await authService.login(values.email, values.password);
            
            setNotification({
                show: true,
                message: 'Logged in successfully! Redirecting...',
                type: 'success'
            });
            
            setTimeout(() => navigate('/profile'), 1500);
        } catch (err) {
            if (err.message.includes('credentials')) {
                setErrors({
                    email: ' ',
                    password: 'Invalid credentials. Please try again.'
                });
            } else {
                setNotification({
                    show: true,
                    message: err.message || 'Login failed. Please try again.',
                    type: 'danger'
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>

                <Notification
                    show={notification.show}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage
                                    name="password"
                                    render={msg => (
                                        <div className="text-danger small mt-1">{msg}</div>
                                    )}
                                />
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            Logging in...
                                        </>
                                    ) : 'Log In'}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <Link to="/forgot-password" className="text-decoration-none">
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="mt-3 text-center">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-medium">
                                    Sign Up
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
