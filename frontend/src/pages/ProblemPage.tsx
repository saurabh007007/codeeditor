import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../utils/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

export const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-100">
        <div className="card bg-emerald-50 p-8 shadow-2xl rounded-2xl">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
          <p className="mt-4 text-emerald-600">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none text-emerald-800">
            <p className="text-lg mb-6">{problem.description}</p>
            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4 text-emerald-700">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, example], idx) => (
                  <div
                    key={lang}
                    className="bg-emerald-100 p-6 rounded-xl mb-6 font-mono"
                  >
                    <div className="mb-4">
                      <div className="text-emerald-600 mb-2 font-semibold">Input:</div>
                      <span className="bg-emerald-800 text-white px-4 py-1 rounded-lg">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="text-emerald-600 mb-2 font-semibold">Output:</div>
                      <span className="bg-emerald-800 text-white px-4 py-1 rounded-lg">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-500 mb-2 font-semibold">Explanation:</div>
                        <p className="text-emerald-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4 text-emerald-700">Constraints:</h3>
                <div className="bg-emerald-100 p-6 rounded-xl mb-6">
                  <span className="bg-emerald-800 text-white px-4 py-1 rounded-lg text-lg font-semibold">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList submissions={submissions} isLoading={isSubmissionsLoading} />
        );
      case "discussion":
        return <div className="p-4 text-center text-emerald-600">No discussions yet</div>;
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-emerald-100 p-6 rounded-xl">
                <span className="bg-emerald-800 text-white px-4 py-1 rounded-lg text-lg font-semibold">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-emerald-600">No hints available</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-emerald-100 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <nav className="navbar bg-emerald-50 shadow-md px-4">
          <div className="flex-1 gap-2">
            <Link to="/" className="flex items-center gap-2 text-emerald-600">
              <Home className="w-6 h-6" />
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div className="mt-2">
              <h1 className="text-xl font-bold text-emerald-700">{problem.title}</h1>
              <div className="flex items-center gap-2 text-sm text-emerald-600 mt-3">
                <Clock className="w-4 h-4" />
                <span>
                  Updated {new Date(problem.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-emerald-400">•</span>
                <Users className="w-4 h-4" />
                <span>{submissionCount} Submissions</span>
                <span className="text-emerald-400">•</span>
                <ThumbsUp className="w-4 h-4" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
          <div className="flex-none gap-4">
            <button
              className={`btn btn-ghost btn-circle ${
                isBookmarked ? "text-emerald-600" : "text-emerald-400"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-circle text-emerald-500">
              <Share2 className="w-5 h-5" />
            </button>
            <select
              className="select select-bordered select-success w-40"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {Object.keys(problem.codeSnippets || {}).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </nav>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-emerald-50 shadow-xl">
              <div className="card-body p-0">
                <div className="tabs tabs-bordered">
                  {["description", "submissions", "discussion", "hints"].map((tab) => {
                    const Icon = {
                      description: FileText,
                      submissions: Code2,
                      discussion: MessageSquare,
                      hints: Lightbulb,
                    }[tab];
                    return (
                      <button
                        key={tab}
                        className={`tab gap-2 ${
                          activeTab === tab ? "tab-active text-emerald-600" : ""
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    );
                  })}
                </div>
                <div className="p-6">{renderTabContent()}</div>
              </div>
            </div>

            <div className="card bg-emerald-50 shadow-xl">
              <div className="card-body p-0">
                <div className="tabs tabs-bordered">
                  <button className="tab tab-active gap-2 text-emerald-600">
                    <Terminal className="w-4 h-4" />
                    Code Editor
                  </button>
                </div>
                <div className="h-[600px] w-full">
                  <Editor
                    height="100%"
                    language={selectedLanguage.toLowerCase()}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 20,
                      lineNumbers: "on",
                      automaticLayout: true,
                    }}
                  />
                </div>
                <div className="p-4 border-t border-emerald-200 bg-emerald-100">
                  <div className="flex justify-between items-center">
                    <button
                      className={`btn btn-success gap-2 transition ${
                        isExecuting ? "loading" : "hover:bg-emerald-600"
                      }`}
                      onClick={handleRunCode}
                      disabled={isExecuting}
                    >
                      {!isExecuting && <Play className="w-4 h-4" />}
                      Run Code
                    </button>
                    <button className="btn btn-accent hover:bg-emerald-500 text-white">
                      Submit Solution
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-emerald-50 shadow-xl mt-6">
            <div className="card-body">
              {submission ? (
                <Submission submission={submission} />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-emerald-700">Test Cases</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-emerald-700">
                      <thead>
                        <tr>
                          <th>Input</th>
                          <th>Expected Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testcases.map((testCase, index) => (
                          <tr key={index}>
                            <td className="font-mono whitespace-nowrap">{testCase.input}</td>
                            <td className="font-mono whitespace-nowrap">{testCase.output}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};