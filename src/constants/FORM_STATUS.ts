import { StatusType } from "@/types/FormStatus.type";

type FormStatusKeys = 'init' | 'in_progress' | 'success' | 'error'

export const FORM_STATUS: {[key in FormStatusKeys]: StatusType} = {
    init: {
        label: "Init",
        variant: "hidden"
    },
    in_progress: {
        label: "In progress",
        variant: "warning"
    },
    success: {
        label: "success",
        variant: "success"
    },
    error: {
        label: "error",
        variant: "error"
    },
} as const