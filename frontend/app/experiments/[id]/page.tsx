"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";
import { PageLayout } from "../../community/PageLayout";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import BackButton from "../../components/BackButton";
import Button from "@/app/components/ui/Button";
import ChartHistogramIcon from "@/components/ui/chart-histogram-icon";

interface Experiment {
    id: number;
    title: string;
    description: string;
    status: "planned" | "in-progress" | "completed";
}

interface Outcome {
    id: number;
    experimentId: number;
    result: string;
    notes: string;
    createdAt: string;
}

interface Reflection {
    id: number;
    outcomeId: number;
    content: string;
    createdAt: string;
}

export default function ExperimentDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [experiment, setExperiment] = useState<Experiment | null>(null);
    const [outcome, setOutcome] = useState<Outcome | null>(null);
    const [reflections, setReflections] = useState<Reflection[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isCompleting, setIsCompleting] = useState(false);
    const [reflectionResult, setReflectionResult] = useState("");
    const [reflectionNotes, setReflectionNotes] = useState("");
    const [reflectionContent, setReflectionContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch Experiment
                const expData = await apiFetch<Experiment>(`/experiments/${id}`);
                setExperiment(expData);

                // 2. Fetch associated Outcome
                try {
                    const outcomesData = await apiFetch<Outcome[]>(`/outcomes/${id}`);
                    if (outcomesData && outcomesData.length > 0) {
                        const currentOutcome = outcomesData[0];
                        setOutcome(currentOutcome);

                        // 3. Fetch Reflections for this Outcome
                        const reflectionsData = await apiFetch<Reflection[]>(
                            `/reflections/${currentOutcome.id}`
                        );
                        setReflections(reflectionsData || []);
                    }
                } catch (e) {
                    // It's okay if outcomes don't exist yet
                    console.log("No outcomes found for experiment");
                }
            } catch (err: any) {
                setError(err.message || "Failed to load experiment details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleCompleteExperiment = async () => {
        if (!reflectionResult || !reflectionContent) {
            alert("Please provide both a final result and your key learnings (reflection).");
            return;
        }

        try {
            setIsCompleting(true);

            // 1. Update Experiment Status to completed
            await apiFetch(`/experiments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            });

            // 2. Create Outcome
            const newOutcome = await apiFetch<Outcome>("/outcomes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    experimentId: Number(id),
                    result: reflectionResult,
                    notes: reflectionNotes,
                }),
            });

            // 3. Create Reflection for the new Outcome
            const newReflection = await apiFetch<Reflection>("/reflections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    outcomeId: newOutcome.id,
                    content: reflectionContent,
                }),
            });

            // Update Local State
            setExperiment((prev) => (prev ? { ...prev, status: "completed" } : prev));
            setOutcome(newOutcome);
            setReflections([newReflection]);

        } catch (err: any) {
            alert("Failed to complete experiment: " + err.message);
        } finally {
            setIsCompleting(false);
        }
    };

    if (loading) {
        return (
            <PageLayout>
                <LoadingState message="Loading experiment details..." />
            </PageLayout>
        );
    }

    if (error || !experiment) {
        return (
            <PageLayout>
                <ErrorState message={error || "Experiment not found."} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="section max-w-4xl mx-auto">
                <div className="mb-6">
                    <BackButton />
                </div>

                {/* Experiment Details Card */}
                <div className="card mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <ChartHistogramIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {experiment.title}
                        </h1>
                    </div>

                    <div className="mb-6">
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${experiment.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : experiment.status === "in-progress"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                        >
                            Status: {experiment.status.replace("-", " ")}
                        </span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {experiment.description}
                        </p>
                    </div>
                </div>

                {/* Outcome and Reflection Area */}
                {experiment.status === "completed" && outcome ? (
                    <div className="card border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10">
                        <h2 className="text-2xl font-bold mb-6 text-green-800 dark:text-green-400 flex items-center gap-2">
                            <span className="text-3xl">✨</span> Experiment Conclusion
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Final Result</h3>
                            <p className="text-lg font-medium text-black dark:text-white">{outcome.result}</p>
                            {outcome.notes && (
                                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{outcome.notes}</p>
                            )}
                        </div>

                        {reflections.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Key Learnings & Reflection</h3>
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {reflections[0].content}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : experiment.status !== "completed" ? (
                    <div className="card border-blue-100 dark:border-blue-900/30">
                        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Conclude Experiment</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Ready to wrap up this experiment? Record your final outcome, what you learned, and mark it as completed to share with the community.
                        </p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Final Result (Verdict) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Idea Validated, Required Pivot, Invalidated..."
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black dark:text-white"
                                    value={reflectionResult}
                                    onChange={(e) => setReflectionResult(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Result Notes (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Additional context on the result..."
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black dark:text-white"
                                    value={reflectionNotes}
                                    onChange={(e) => setReflectionNotes(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Key Learnings & Reflection <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    placeholder="What did you learn? What surprised you? What are the next steps based on this experiment?..."
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y text-black dark:text-white"
                                    value={reflectionContent}
                                    onChange={(e) => setReflectionContent(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button
                                    onClick={handleCompleteExperiment}
                                    disabled={isCompleting || !reflectionResult || !reflectionContent}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {isCompleting ? "Concluding..." : "Complete Experiment & Post Reflection"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </PageLayout>
    );
}
