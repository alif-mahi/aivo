"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentsDialog } from "./new-agents-dialog";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentsListHeader;
