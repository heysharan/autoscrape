import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";

export default function Logo ({ fontSize = "text-2xl", iconSize = 20}: {fontSize?: string, iconSize?: number}){
    return(
        <Link href="/" className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}>
            <div className="rounded-xl bg-gradient-to-r from-neutral-500 to-neutral-600 p-2">
                <SquareDashedMousePointer size={iconSize} className="stroke-white" />
            </div>
            <div>
                <span className="bg-gradient-to-r from-neutral-500 to-neutral-600 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-neutral-300 dark:to-neutral-400 ">Auto</span>
                <span className="bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text font-bold">Scrape</span>
            </div>
        </Link>
    )
}