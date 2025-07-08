export const dynamic = "force-dynamic";

import ResumeBuilder from "./_components/resume-builder";
import { getResume } from "@/actions/resume";

export default async function ResumePage() {
  try {
    const resume = await getResume();

    return (
      <div className="container mx-auto py-6">
        <ResumeBuilder initialContent={resume?.content} />
      </div>
    );
  } catch (error) {
    console.error("Resume page error:", error);
    return (
      <div className="container mx-auto py-10">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            {error.message || "Failed to load resume data"}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
} 