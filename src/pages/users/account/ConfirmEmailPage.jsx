import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

function ConfirmEmailPage() {
    const { key } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const confirmEmail = async () => {
            if (!key) {
                setNotification({
                    show: true,
                    message: 'Invalid confirmation link. No key provided.',
                    type: 'danger'
                });
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                await authService.confirmEmail(key);
                setNotification({
                    show: true,
                    message: 'Email verified successfully! You can now login to your account.',
                    type: 'success'
                });
            } catch (error) {
                setNotification({
                    show: true,
                    message: error.message || 'Failed to verify email. The link may have expired or is invalid.',
                    type: 'danger'
                });
            } finally {
                setIsLoading(false);
            }
        };

        confirmEmail();
    }, [key, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow rounded-4 p-4 text-center" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Email Confirmation</h2>
                
                <Notification
                    show={notification.show}
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />

                {isLoading ? (
                    <div className="d-flex justify-content-center my-5 py-4">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="my-4 py-2">
                        <p className="lead mb-4">
                            {notification.type === 'success' 
                                ? 'Your email has been successfully verified!' 
                                : 'There was a problem verifying your email.'}
                        </p>
                        <button
                            className="btn btn-primary btn-lg px-5"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConfirmEmailPage;