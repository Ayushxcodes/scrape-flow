import { TaskParamType, TaskType } from "@/types/task";
import { WorkFlowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask ={
    type:TaskType.LAUNCH_BROWSER,
    label:"Launch browser",
    icon:(props:LucideProps) => (<GlobeIcon className="stroke-pink-400"{...props}/>
    ),
    isEntryPoint:true,
    credits:5,
    inputs :[{
        name:"Website URL",
        type:TaskParamType.STRING,
        helperText:"eg:https://www.google.com",
        required:true,
        hideHandle:true,
    },
] as const,
    outputs:[{
        name:"Webpage", type:TaskParamType.BROWSER_INSTANCE
    }] as const,
}satisfies WorkFlowTask;

