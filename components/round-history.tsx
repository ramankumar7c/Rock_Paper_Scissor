"use client";

import { Card } from "@/components/ui/card";
import { Hand as HandRock, HandPlatter as HandPaper, Scissors as HandScissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Round, type GameState } from "@/lib/game-utils";

interface RoundHistoryProps {
  rounds: Round[];
  game: GameState;
  playerId: string;
}

export default function RoundHistory({
  rounds,
  game,
  playerId,
}: RoundHistoryProps) {
  const isPlayer1 = game.player1.id === playerId;
  
  if (rounds.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No completed rounds yet
      </div>
    );
  }
  
  const getMoveIcon = (move: string | null) => {
    switch (move) {
      case "Rock":
        return <HandRock className="h-4 w-4" />;
      case "Paper":
        return <HandPaper className="h-4 w-4" />;
      case "Scissors":
        return <HandScissors className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getMoveColorClass = (move: string | null) => {
    switch (move) {
      case "Rock":
        return "text-red-500 dark:text-red-400";
      case "Paper":
        return "text-blue-500 dark:text-blue-400";
      case "Scissors":
        return "text-amber-500 dark:text-amber-400";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-3 pt-4">
      {rounds.map((round, index) => {
        const playerMove = isPlayer1 ? round.player1Move : round.player2Move;
        const opponentMove = isPlayer1 ? round.player2Move : round.player1Move;
        const isWinner = isPlayer1 ? 
          round.winner === game.player1.id : 
          round.winner === game.player2?.id;
        const isTie = round.winner === null;
        
        return (
          <Card 
            key={index} 
            className={cn(
              "p-3 border",
              isWinner ? "border-l-4 border-l-green-500" : isTie ? "border-l-4 border-l-yellow-500" : "border-l-4 border-l-red-500"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Round {index + 1}</div>
              <div className="text-xs text-muted-foreground">
                {isWinner ? "Win" : isTie ? "Tie" : "Loss"}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <div className={cn("mr-2", getMoveColorClass(playerMove))}>
                  {getMoveIcon(playerMove)}
                </div>
                <span className="text-xs">{playerMove}</span>
              </div>
              
              <div className="text-xs text-muted-foreground">vs</div>
              
              <div className="flex items-center">
                <span className="text-xs">{opponentMove}</span>
                <div className={cn("ml-2", getMoveColorClass(opponentMove))}>
                  {getMoveIcon(opponentMove)}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}