import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export const dynamic = "force-dynamic"; // Ensure API runs at runtime

export async function GET(req: Request) {
  try {
    const now = new Date();
    const workflows = await prisma.workflow.findMany({
      select: { id: true },
      where: {
        status: WorkflowStatus.PUBLISHED,
        cron: { not: null },
        nextRunAt: { lte: now },
      },
    });

    console.log("@@WORKFLOW TO RUN", workflows.length);
    for (const workflow of workflows) {
      await triggerWorkflow(workflow.id);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function triggerWorkflow(workflowId: string) {
  try {
    const triggerApiUrl = getAppUrl(
      `api/workflows/execute?workflowId=${workflowId}`
    );

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    await fetch(triggerApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET!}`,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch (error) {
    console.error("Error triggering workflow with id", workflowId, ": error->");
  }
}
