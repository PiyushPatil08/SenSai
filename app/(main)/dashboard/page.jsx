import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const { isOnboarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    if (!isOnboarded) {
      redirect("/onboarding");
    }

    const insights = await getIndustryInsights();

    return (
      <div className="container mx-auto">
        <DashboardView insights={insights} />
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="container mx-auto py-10">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            {error.message || "Failed to load dashboard data"}
          </p>
          <div className="text-sm text-red-500 bg-red-50 p-4 rounded-md">
            <strong>Error Details:</strong><br/>
            {error.stack || error.message}
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Try Again
            </button>
            <a 
              href="/api/debug" 
              target="_blank"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
            >
              Debug Info
            </a>
          </div>
        </div>
      </div>
    );
  }
}
