import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    language_id,
    stdinArray,
    expected_outputsArray,
    problemId
  ) => {
    try {
      set({ isExecuting: true });

      // Format inputs correctly for the backend
      const formattedStdin = Array.isArray(stdinArray)
        ? stdinArray.map(String)
        : [String(stdinArray)];

      const formattedExpectedOutputs = Array.isArray(expected_outputsArray)
        ? expected_outputsArray.map(String)
        : [String(expected_outputsArray)];

      const payload = {
        source_code,
        language_id,
        stdin: formattedStdin,
        expected_output: formattedExpectedOutputs, // 👈 correct key name!
        problemId,
      };

      console.log("Payload being sent:", payload);

      const res = await axiosInstance.post("/execute-code", payload);

      set({ submission: res.data.submission });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
