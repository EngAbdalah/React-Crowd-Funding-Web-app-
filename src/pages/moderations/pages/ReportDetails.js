// src/pages/ReportDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../api/axios';

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await API.get(`moderations/api/reports/${id}/`);
                setReport(response.data);
                setStatus(response.data.status);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch report');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleStatusChange = async () => {
        try {
            await API.patch(`moderations/api/reports/${id}/`, { status });
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
            const response = await API.get(`moderations/api/reports/${id}/`);
            setReport(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update report');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            try {
                await API.delete(`moderations/api/reports/${id}/`);
                navigate('/reports', { replace: true });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete report');
            }
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-secondary';
            case 'reviewed':
                return 'bg-primary';
            case 'dismissed':
                return 'bg-danger';
            default:
                return 'bg-dark';
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;
    if (error) return <div className="alert alert-danger mt-3">{error}</div>;
    if (!report) return <div className="alert alert-warning">Report not found</div>;

    return (
        <div className="container mt-4">
            <h2>Report Details</h2>
            <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/reports')}>
                Back to Reports
            </button>

            {updateSuccess && (
                <div className="alert alert-success">Report status updated successfully!</div>
            )}

            <div className="card p-4 mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Basic Information</h5>
                        <p><strong>Report ID:</strong> {report.id}</p>
                        <p><strong>Comment ID:</strong> {report.comment}</p>
                        <p><strong>Reason:</strong> {report.reason}</p>

                        <hr />
                        <h5>Status Information</h5>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={`badge ${getStatusClass(report.status)}`}>{report.status}</span>
                        </p>
                        <p>
                            <strong>Reviewed:</strong>{' '}
                            <span className={`badge ${report.is_reviewed ? 'bg-success' : 'bg-danger'}`}>
                                {report.is_reviewed ? 'Yes' : 'No'}
                            </span>
                        </p>
                    </div>

                    <div className="col-md-6">
                        <h5>Timestamps</h5>
                        <p><strong>Created At:</strong> {new Date(report.created_at).toLocaleString()}</p>

                        <hr />
                        <h5>Update Status</h5>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="dismissed">Dismissed</option>
                            </select>
                        </div>

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-primary"
                                onClick={handleStatusChange}
                                disabled={status === report.status}
                            >
                                Update Status
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;
