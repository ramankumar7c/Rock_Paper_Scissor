"use client";

import { Hand as HandRock, HandPlatter as HandPaper, Scissors as HandScissors, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type GameState, type Round } from "@/lib/game-utils";
import { cn } from "@/lib/utils";

interface RoundResultProps {
  round: Round;
  game: GameState;
  playerId: string;
  onNextRound: () => void;
  onEndGame: () => void;
}

export default function RoundResult({
  round,
  game,
  playerId,
  onNextRound,
  onEndGame,
}: RoundResultProps) {
  const isPlayer1 = game.player1.id === playerId;
  const playerMove = isPlayer1 ? round.player1Move : round.player2Move;
  const opponentMove = isPlayer1 ? round.player2Move : round.player1Move;
  
  const getMoveIcon = (move: string | null) => {
    switch (move) {
      case "Rock":
        return <HandRock className="h-10 w-10" />;
      case "Paper":
        return <HandPaper className="h-10 w-10" />;
      case "Scissors":
        return <HandScissors className="h-10 w-10" />;
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
  
  const isPlayerWinner = round.winner === playerId;
  const isTie = round.winner === null;
  
  let resultText = "It's a tie!";
  let resultClass = "text-muted-foreground";
  
  if (isPlayerWinner) {
    resultText = "You won this round!";
    resultClass = "text-green-500 dark:text-green-400";
  } else if (!isTie) {
    resultText = "You lost this round";
    resultClass = "text-red-500 dark:text-red-400";
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Round {game.currentRound + 1} Result</CardTitle>
        <CardDescription className="text-center">
          {resultText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-8">
          <div className={cn("transform transition-all duration-300", isPlayerWinner ? "scale-110" : "")}>
            <div className={cn("text-center", getMoveColorClass(playerMove))}>
              <div className="flex justify-center mb-2">
                {getMoveIcon(playerMove)}
              </div>
              <div className="font-medium">{playerMove}</div>
              <div className="text-sm text-muted-foreground">You</div>
            </div>
          </div>
          
          <div className="mx-6 text-muted-foreground text-2xl">vs</div>
          
          <div className={cn("transform transition-all duration-300", !isPlayerWinner && !isTie ? "scale-110" : "")}>
            <div className={cn("text-center", getMoveColorClass(opponentMove))}>
              <div className="flex justify-center mb-2">
                {getMoveIcon(opponentMove)}
              </div>
              <div className="font-medium">{opponentMove}</div>
              <div className="text-sm text-muted-foreground">Opponent</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className={cn("text-xl font-bold mb-2", resultClass)}>
            {resultText}
          </div>
          <div className="text-sm text-muted-foreground">
            Current score: {game.scores.player1} - {game.scores.player2} - {game.scores.ties}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onNextRound}>
          Next Round
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button variant="destructive" onClick={onEndGame}>
          <Trophy className="mr-2 h-4 w-4" />
          End Game
        </Button>
      </CardFooter>
    </Card>
  );
}