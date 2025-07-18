export const dynamic = "force-dynamic";
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardErrorFallback from "./_component/dashboard-error-fallback";

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
    return <DashboardErrorFallback error={error} />;
  }
}
