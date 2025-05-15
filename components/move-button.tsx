"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Move } from "@/lib/game-utils";

interface MoveButtonProps {
  move: Move;
  icon: ReactNode;
  onClick: () => void;
  disabled: boolean;
  selected: boolean;
}

export default function MoveButton({
  move,
  icon,
  onClick,
  disabled,
  selected,
}: MoveButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  // Different styles based on move type
  const getMoveColorClasses = () => {
    if (move === "Rock") {
      return "bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400";
    }
    if (move === "Paper") {
      return "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    }
    if (move === "Scissors") {
      return "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    }
    return "";
  };
  
  const getSelectedClasses = () => {
    if (!selected) return "";
    
    if (move === "Rock") {
      return "ring-2 ring-red-500 dark:ring-red-400";
    }
    if (move === "Paper") {
      return "ring-2 ring-blue-500 dark:ring-blue-400";
    }
    if (move === "Scissors") {
      return "ring-2 ring-amber-500 dark:ring-amber-400";
    }
    return "";
  };

  return (
    <div className="text-center">
      <Button
        variant="ghost"
        className={cn(
          "w-full h-24 flex flex-col items-center justify-center transition-all duration-200",
          getMoveColorClasses(),
          getSelectedClasses(),
          isHovering && !disabled ? "scale-105" : "",
          selected ? "scale-105" : "",
          disabled && !selected ? "opacity-50 cursor-not-allowed" : ""
        )}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="mb-2">{icon}</div>
        <span>{move}</span>
      </Button>
    </div>
  );
}