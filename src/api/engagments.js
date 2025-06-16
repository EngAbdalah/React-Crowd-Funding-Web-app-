import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const fetchComments = async () => {
  const res = await axios.get(`${API_BASE}/comments/`);
  return res.data;
};

export const fetchReplies = async () => {
  const res = await axios.get(`${API_BASE}/replies/`);
  return res.data;
};

export const fetchRates = async () => {
  const res = await axios.get(`${API_BASE}/rates/`);
  return res.data;
};
