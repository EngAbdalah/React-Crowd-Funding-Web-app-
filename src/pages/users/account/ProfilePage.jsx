import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../api/users';
import Notification from '../../../components/Notification';

// Date formatter helpers
const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState({ 
        show: false, 
        message: '', 
        type: '' 
    });

    // Using useRef to maintain stable notification function
    const notificationRef = useRef();
    notificationRef.current = (message, type) => {
        setNotification({
            show: true,
            message,
            type
        });
    };

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!authService.isLoggedIn()) {
                    navigate('/login');
                    return;
                }
                
                const data = await authService.getCurrentUser();
                setUserData(data);
                setFormData(data);
            } catch (error) {
                notificationRef.current(
                    error.message || 'Failed to load profile data', 
                    'danger'
                );
            }
        };

        fetchUserData();
    }, [navigate]);

    // Handle input changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            // Create update payload (exclude email)
            const { email, ...updatePayload } = formData;
            
            // Send update request
            const updatedUser = await authService.updateUser(updatePayload);
            
            setUserData(updatedUser);
            setIsEditing(false);
            notificationRef.current('Profile updated successfully!', 'success');
        } catch (error) {
            notificationRef.current(
                error.message || 'Failed to update profile', 
                'danger'
            );
        } finally {
            setIsSaving(false);
        }
    }, [formData]);

    // Handle logout
    const handleLogout = useCallback(async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            notificationRef.current('Logout failed. Please try again.', 'danger');
        }
    }, [navigate]);

    // Reset form to original data
    const handleCancel = useCallback(() => {
        setFormData(userData || {});
        setIsEditing(false);
    }, [userData]);

    // Loading state
    if (!userData) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow rounded-4">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <h2>User Profile</h2>
                                <p className="text-muted">Manage your account details</p>
                            </div>

                            <Notification 
                                show={notification.show}
                                message={notification.message}
                                type={notification.type}
                                onClose={() => setNotification({...notification, show: false})}
                            />

                            <div className="d-flex align-items-center mb-4">
                                {formData.pic ? (
                                    <img 
                                        src={formData.pic} 
                                        alt="Profile" 
                                        className="rounded-circle me-4"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div 
                                        className="bg-light rounded-circle d-flex align-items-center justify-content-center me-4"
                                        style={{ width: '80px', height: '80px' }}
                                    >
                                        <span className="fs-4 text-muted">
                                            {formData.first_name?.charAt(0)}{formData.last_name?.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <h4 className="mb-0">{formData.first_name} {formData.last_name}</h4>
                                    <p className="text-muted mb-0">{formData.email}</p>
                                </div>
                            </div>

                            {/* Move the form inside the editing section only */}
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <h5>Account Details</h5>
                                        <hr className="mt-2" />
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="first_name"
                                                    value={formData.first_name || ''}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="last_name"
                                                    value={formData.last_name || ''}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Email</label>
                                                <p className="fw-medium">{userData.email}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Phone</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    name="phone"
                                                    value={formData.phone || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Birthdate</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="birthdate"
                                                    value={formData.birthdate ? formatDateForInput(formData.birthdate) : ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Country</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="country"
                                                    value={formData.country || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <label className="form-label text-muted">Facebook Profile</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="facebook_profile"
                                                    value={formData.facebook_profile || ''}
                                                    onChange={handleInputChange}
                                                    placeholder="https://facebook.com/username"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <label className="form-label text-muted">Profile Picture URL</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="pic"
                                                    value={formData.pic || ''}
                                                    onChange={handleInputChange}
                                                    placeholder="https://example.com/profile.jpg"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-5">
                                        <div>
                                            <button 
                                                type="button"
                                                className="btn btn-outline-secondary me-2"
                                                onClick={handleCancel}
                                                disabled={isSaving}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div>
                                            <button 
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isSaving}
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                        Saving...
                                                    </>
                                                ) : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                // View mode content
                                <div>
                                    <div className="mb-4">
                                        <h5>Account Details</h5>
                                        <hr className="mt-2" />
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">First Name</label>
                                                <p className="fw-medium">{userData.first_name}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Last Name</label>
                                                <p className="fw-medium">{userData.last_name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Email</label>
                                                <p className="fw-medium">{userData.email}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Phone</label>
                                                <p className="fw-medium">{userData.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Birthdate</label>
                                                <p className="fw-medium">
                                                    {userData.birthdate ? formatDateDisplay(userData.birthdate) : 'Not provided'}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label text-muted">Country</label>
                                                <p className="fw-medium">{userData.country || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <label className="form-label text-muted">Facebook Profile</label>
                                                <p className="fw-medium">
                                                    {userData.facebook_profile ? (
                                                        <a 
                                                            href={userData.facebook_profile} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none"
                                                        >
                                                            View Profile
                                                        </a>
                                                    ) : 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <label className="form-label text-muted">Profile Picture URL</label>
                                                <p className="fw-medium text-truncate">
                                                    {userData.pic || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-5">
                                        <div>
                                            <button 
                                                type="button"
                                                className="btn btn-outline-primary me-2"
                                                onClick={() => navigate('/change-password')}
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                        <div>
                                            <button 
                                                type="button"
                                                className="btn btn-outline-primary me-2"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                Edit Profile
                                            </button>
                                            <button 
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;