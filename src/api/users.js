import {API} from './axios';

const authService = {
    login: async (email, password) => {
        try {
            const response = await API.post('api/token/', { email, password });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            return { success: true, message: "Logged in successfully!" };
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "Login failed. Please check your credentials.";
            throw new Error(errorMsg);
        }
    },

    logout: async () => {
        try {
            await API.post('users/api/dj-rest-auth/logout/');
        } catch (error) {
            console.warn("Logout request failed:", error);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    },

    changePassword: async (new_password1, new_password2, old_password = null) => {
        try {
            const payload = { new_password1, new_password2 };
            if (old_password !== null) payload.old_password = old_password;

            await API.post('users/api/dj-rest-auth/password/change/', payload);
            return { success: true, message: "Password changed successfully." };
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "Failed to change password. Please check your old password.";
            throw new Error(errorMsg);
        }
    },

    requestPasswordReset: async (email) => {
        try {
            await API.post('users/api/dj-rest-auth/password/reset/', { email });
            return {
                success: true,
                message: "Password reset email sent. Please check your inbox."
            };
        } catch (error) {
            // Handle Django-style error responses
            const errorData = error.response?.data || {};
            let errorMsg = "Failed to send reset instructions.";

            if (errorData.email) {
                errorMsg = errorData.email[0]; 
            } else if (errorData.non_field_errors) {
                errorMsg = errorData.non_field_errors[0];  
            }

            throw new Error(errorMsg);
        }
    },

    confirmEmail: async (key) => {
        try {
            await API.post('users/api/dj-rest-auth/registration/verify-email/', { key });
            return {
                success: true,
                message: "Email verified successfully! You can now log in."
            };
        } catch (error) {
            const errorMsg = error.response?.data?.detail || "Failed to verify email. The link may be invalid or expired.";
            throw new Error(errorMsg);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await API.get('users/api/user/');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
            throw new Error("Failed to fetch user profile. Please log in again.");
        }
    },

    updateUser: async (userData) => {
        try {
            const response = await API.patch('users/api/user/', userData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                throw new Error("Session expired. Please log in again.");
            }

            const errorDetails = error.response?.data || {};
            let errorMessage = 'Failed to update profile.';

            if (errorDetails.email) {
                errorMessage = `Email: ${errorDetails.email.join(' ')}`;
            } else if (errorDetails.non_field_errors) {
                errorMessage = errorDetails.non_field_errors.join(' ');
            }

            throw new Error(errorMessage);
        }
    },

    deleteAccount: async (password) => {
        try {
            await API.post('users/api/delete-account/', { password });
            return { success: true, message: "Account deleted successfully." };
        } catch (error) {
            let errorMsg = "Failed to delete account. Please try again.";

            if (error.response?.data?.password) {
                errorMsg = error.response.data.password[0];
            } else if (error.response?.data?.detail) {
                errorMsg = error.response.data.detail;
            }

            throw new Error(errorMsg);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    },

    register: async (formData) => {
        try {
            await API.post('users/api/register/', formData);
            return {
                success: true,
                message: "Registration successful! Please check your email to verify your account."
            };
        } catch (error) {
            const errorData = error.response?.data || {};
            let errorMessage = 'Registration failed. Please try again.';

            // Prioritize specific field errors from Django serializer
            if (errorData.email) {
                errorMessage = `Email: ${errorData.email.join(' ')}`;
            } else if (errorData.phone) { // Added specific handling for phone errors
                errorMessage = `Phone: ${errorData.phone.join(' ')}`;
            } else if (errorData.password1) {
                errorMessage = `Password: ${errorData.password1.join(' ')}`;
            } else if (errorData.password2) { // Added specific handling for password2 (e.g., passwords mismatch)
                errorMessage = `Confirm Password: ${errorData.password2.join(' ')}`;
            } else if (errorData.non_field_errors) {
                errorMessage = errorData.non_field_errors.join(' ');
            } else if (errorData.detail) { // Catch all for general detail messages
                errorMessage = errorData.detail;
            } else {
                // Fallback for any other unexpected error structure or generic message
                errorMessage = 'Registration failed. Please try again with valid data.';
            }

            throw new Error(errorMessage);
        }
    },

    isLoggedIn: () => !!localStorage.getItem("access_token")
};

export default authService;
