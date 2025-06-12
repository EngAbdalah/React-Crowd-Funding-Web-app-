import { useEffect } from 'react';

const Notification = ({ message, type, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div 
            className={`alert alert-${type} alert-dismissible fade show mb-4`}
            role="alert"
        >
            {message}
            <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
            />
        </div>
    );
};

export default Notification;