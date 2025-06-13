import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/users'; // Adjust the path as needed

function Navbar() {
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (authService.isLoggedIn()) {
                try {
                    const user = await authService.getCurrentUser();
                    setUserEmail(user.email);
                } catch (error) {
                    console.error("Failed to fetch user:", error.message);
                    setUserEmail(null);
                    navigate('/login');
                }
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authService.logout();
            setUserEmail(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">صدقة</Link>
                <div className="d-flex ms-auto">
                    {userEmail ? (
                        <>
                            <Link to="/profile" className="btn btn-outline-primary me-2">
                                {userEmail}
                            </Link>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
