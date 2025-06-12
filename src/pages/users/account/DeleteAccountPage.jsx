// src/pages/auth/DeleteAccountPage.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function DeleteAccountPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });

    const initialValues = {
        password: '',
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required to confirm account deletion'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Call deleteAccount with the password entered by the user
            const response = await authService.deleteAccount(values.password);

            setNotification({
                show: true,
                message: response.message || 'Account deleted successfully. Sorry to see you go!',
                type: 'success'
            });

            setTimeout(() => navigate('/'), 2000); // Redirect to home or login page
        } catch (error) {
            setNotification({
                show: true,
                message: error.message || 'Failed to delete account. Please check your password.',
                type: 'danger'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4 text-danger">Delete Account</h2>
                <Notification
                    show={notification.show}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
                <p className="text-center text-muted mb-4">
                    This action is irreversible. Please confirm your password to proceed.
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" className="text-danger small mt-1" component="div" />
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    disabled={isSubmitting || !isValid}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            Deleting Account...
                                        </>
                                    ) : 'Permanently Delete Account'}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none"
                                    onClick={() => navigate('/profile')}
                                >
                                    Cancel and go back
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default DeleteAccountPage;