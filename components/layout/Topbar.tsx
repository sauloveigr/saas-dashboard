"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 border-y border-r border-border">
      <div className="flex w-full items-center">
        <Button
          onClick={onMenuClick}
          variant="ghost"
          className="lg:hidden p-2"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
