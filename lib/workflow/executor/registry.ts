import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkFlowTask } from "@/types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecuterFn<T extends WorkFlowTask> = (environment:ExecutionEnvironment<T>) => Promise<boolean>;

type RegistryType ={
  [K in TaskType]:ExecuterFn<WorkFlowTask & {type:K}>;
};

export const ExecutorRegistry: RegistryType= {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};