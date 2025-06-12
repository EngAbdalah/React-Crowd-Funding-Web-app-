import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function RegisterPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });

    const initialValues = {
        email: '',
        password1: '',
        password2: '',
        first_name: '',
        last_name: '',
        phone: '',
        pic: null,
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password1: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        password2: Yup.string()
            .oneOf([Yup.ref('password1'), null], 'Passwords must match')
            .required('Confirm password is required'),
        first_name: Yup.string()
            .required('First name is required')
            .max(30, 'First name too long'),
        last_name: Yup.string()
            .required('Last name is required')
            .max(30, 'Last name too long'),
        phone: Yup.string()
            .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
            .required('Phone number is required'),
        pic: Yup.mixed()
            .nullable()
            .test("fileSize", "File too large (max 5MB)", 
                value => !value || value.size <= 5 * 1024 * 1024)
            .test("fileFormat", "Unsupported format (JPEG, PNG, GIF)", 
                value => !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            await authService.register(formData);

            setNotification({
                show: true,
                message: 'Registration successful! Please check your email to verify your account.',
                type: 'success'
            });

            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setNotification({
                show: true,
                message: error.message || 'Registration failed. Please try again.',
                type: 'danger'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = useCallback((event, setFieldValue) => {
        setFieldValue("pic", event.currentTarget.files[0] || null);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Create Your Account</h2>

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
                    {({ isSubmitting, isValid, setFieldValue, values }) => (
                        <Form noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <Field 
                                        type="text" 
                                        name="first_name" 
                                        className="form-control" 
                                        placeholder="John" 
                                    />
                                    <ErrorMessage name="first_name" className="text-danger small mt-1" component="div" />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <Field 
                                        type="text" 
                                        name="last_name" 
                                        className="form-control" 
                                        placeholder="Doe" 
                                    />
                                    <ErrorMessage name="last_name" className="text-danger small mt-1" component="div" />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    placeholder="you@example.com" 
                                />
                                <ErrorMessage name="email" className="text-danger small mt-1" component="div" />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <Field 
                                    type="tel" 
                                    name="phone" 
                                    className="form-control" 
                                    placeholder="+201234567890" 
                                />
                                <ErrorMessage name="phone" className="text-danger small mt-1" component="div" />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password1" className="form-label">Password</label>
                                    <Field 
                                        type="password" 
                                        name="password1" 
                                        className="form-control" 
                                        placeholder="Minimum 8 characters" 
                                    />
                                    <ErrorMessage name="password1" className="text-danger small mt-1" component="div" />
                                </div>
                                
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                                    <Field 
                                        type="password" 
                                        name="password2" 
                                        className="form-control" 
                                        placeholder="Confirm your password" 
                                    />
                                    <ErrorMessage name="password2" className="text-danger small mt-1" component="div" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pic" className="form-label">Profile Picture (Optional)</label>
                                <input
                                    id="pic"
                                    name="pic"
                                    type="file"
                                    className="form-control"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                />
                                <ErrorMessage name="pic" className="text-danger small mt-1" component="div" />
                                {values.pic && (
                                    <small className="text-muted mt-2 d-block">
                                        Selected: {values.pic.name} ({(values.pic.size / 1024).toFixed(1)} KB)
                                    </small>
                                )}
                            </div>

                            <div className="d-grid gap-2">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg" 
                                    disabled={isSubmitting || !isValid}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                                            Creating Account...
                                        </>
                                    ) : 'Create Account'}
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="mb-0">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-none fw-medium">Sign In</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default RegisterPage;