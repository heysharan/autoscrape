"use client"

import { Workflow } from "@/lib/generated/prisma"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import React from "react"
import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";


const nodeTypes = {
    AutoScrapeNode: NodeComponent
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2 }

export default function FlowEditor({ workflow }: { workflow: Workflow }) {
    const proOptions = { hideAttribution: true }; //for hiding the water mark
    const [ nodes, setNodes, onNodesChange ] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER),
    ]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
    return(
        <main className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                proOptions={proOptions}
                className="dark:text-white dark:bg-muted-foreground"
                nodeTypes={nodeTypes}
                snapToGrid
                snapGrid={snapGrid} //gives a grid-like feel so nodes don’t move smoothly everywhere but instead jump to fixed points
                fitView //aligns correctly to fit the view
                fitViewOptions={fitViewOptions} //gives padding
            >
                <Controls position="top-left" className="dark:bg-white dark:text-black" fitViewOptions={fitViewOptions}/>
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}