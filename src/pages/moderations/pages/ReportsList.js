// src/pages/ReportsList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../api/axios';

const ReportsList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await API.get('moderations/api/reports/');
                setReports(response.data.results);
                setPagination({
                    count: response.data.count,
                    next: response.data.next,
                    previous: response.data.previous,
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch reports');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleRowClick = (reportId) => {
        navigate(`/reports/${reportId}`);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'reviewed':
                return 'primary';
            case 'dismissed':
                return 'danger';
            default:
                return 'dark';
        }
    };

    if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary" role="status" /></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Reports Management</h2>
            <p className="text-muted">Total Reports: {pagination.count}</p>

            {pagination.count === 0 ? (
                <p>No reports found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Comment ID</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Reviewed</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.id}</td>
                                    <td>{report.comment}</td>
                                    <td>{report.reason}</td>
                                    <td>
                                        <span className={`badge bg-${getStatusBadge(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td>{report.is_reviewed ? 'Yes' : 'No'}</td>
                                    <td>{new Date(report.created_at).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleRowClick(report.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportsList;
