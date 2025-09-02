"use client"

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string
}

export default function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: Props) {
    const [confirmText, setConfirmText] = useState("")
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", { id: workflowId });
            setConfirmText("")
        },
        onError: () => {
            toast.error("Something went wrong", { id: workflowId })

        }
    })


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this workflow, you will not be able to recover it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-2">
                    <p className="text-muted-foreground text-sm">If you are sure, enter <b>{workflowName}</b> to confirm:</p>
                    <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setConfirmText("")
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmText !== workflowName || deleteMutation.isPending}
                        onClick={(e) => {
                            e.stopPropagation();
                            toast.loading("Deleting workflow...", { id: workflowId })
                            deleteMutation.mutate(workflowId)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}