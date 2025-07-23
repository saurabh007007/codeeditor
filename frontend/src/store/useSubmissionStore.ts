import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: 0,

  // ✅ Get all submissions for the logged-in user
  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/submissions/get-all-submissions");

      set({
        submissions: res.data?.submissions || [],
      });

      toast.success(res.data?.message || "Fetched all submissions");
    } catch (error) {
      console.error("Error getting all submissions:", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Get the latest submission for a specific problem
  getSubmissionForProblem: async (problemId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/submissions/get-submission/${problemId}`);

      set({
        submission: res.data?.submission || null,
      });

      toast.success(res.data?.message || "Fetched submission");
    } catch (error) {
      console.error("Error getting submission for problem:", error);
      toast.error("Error getting submission for problem");
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Get count of all submissions for a specific problem
  getSubmissionCountForProblem: async (problemId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/submissions/get-submissions-count/${problemId}`);

      set({
        submissionCount: res.data?.count || 0,
      });

      toast.success(res.data?.message || "Fetched submission count");
    } catch (error) {
      console.error("Error getting submission count:", error);
      toast.error("Error getting submission count");
    } finally {
      set({ isLoading: false });
    }
  },
}));
