"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskParam } from "@/types/task";
import { useId } from "react";

export const StringParam = ({ param } : { param: TaskParam}) => {
    const id = useId();
    return (
        <div className="space-y-1 w-full">
            <Label htmlFor={id} className="text-xs flex">
                {param.name}
                {param.required && <p className="text-red-500">*</p>}
            </Label>
            <Input id={id} />
            {param.helperText && (
                <p className="text-muted-foreground px-2">{param.helperText}</p>
            )}
        </div>
    )
}