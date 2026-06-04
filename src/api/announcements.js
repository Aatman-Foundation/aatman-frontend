import apiClient from "./client.js";

export const fetchAnnouncements = async () => {
  const { data: payload } = await apiClient.get("/public/announcements");
  return Array.isArray(payload?.data) ? payload.data : [];
};

export const fetchAnnouncementById = async (id) => {
  const { data: payload } = await apiClient.get(`/public/announcements/${id}`);
  return payload?.data || null;
};
