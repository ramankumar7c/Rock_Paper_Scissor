"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, HandPlatter as HandPaper, Hand as HandRock, Scissors as HandScissors, Home, RotateCcw } from "lucide-react";
import { type GameState } from "@/lib/game-utils";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface FinalResultsProps {
  game: GameState;
  playerId: string;
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function FinalResults({
  game,
  playerId,
  onPlayAgain,
  onHome,
}: FinalResultsProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  
  const isPlayer1 = game.player1.id === playerId;
  const player = isPlayer1 ? game.player1 : game.player2;
  const opponent = isPlayer1 ? game.player2 : game.player1;
  
  const playerScore = isPlayer1 ? game.scores.player1 : game.scores.player2;
  const opponentScore = isPlayer1 ? game.scores.player2 : game.scores.player1;
  
  const totalRounds = game.scores.player1 + game.scores.player2 + game.scores.ties;
  
  // Count move usage
  const moveStats = {
    player: { Rock: 0, Paper: 0, Scissors: 0 },
    opponent: { Rock: 0, Paper: 0, Scissors: 0 }
  };
  
  game.rounds.forEach(round => {
    if (round.completed) {
      const playerMove = isPlayer1 ? round.player1Move : round.player2Move;
      const opponentMove = isPlayer1 ? round.player2Move : round.player1Move;
      
      if (playerMove === "Rock") moveStats.player.Rock += 1;
      if (playerMove === "Paper") moveStats.player.Paper += 1;
      if (playerMove === "Scissors") moveStats.player.Scissors += 1;
      
      if (opponentMove === "Rock") moveStats.opponent.Rock += 1;
      if (opponentMove === "Paper") moveStats.opponent.Paper += 1;
      if (opponentMove === "Scissors") moveStats.opponent.Scissors += 1;
    }
  });
  
  const getMovePercentage = (count: number) => {
    return totalRounds > 0 ? (count / totalRounds) * 100 : 0;
  };
  
  const isWinner = playerScore > opponentScore;
  const isTie = playerScore === opponentScore;
  
  const resultClass = isWinner 
    ? "text-green-500 dark:text-green-400" 
    : isTie 
      ? "text-yellow-500 dark:text-yellow-400" 
      : "text-red-500 dark:text-red-400";
  
  const resultText = isWinner 
    ? "You Won!" 
    : isTie 
      ? "It's a Tie!" 
      : "You Lost";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/20">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Final Results
          </CardTitle>
          <CardDescription className="text-center">
            Game completed with {totalRounds} rounds played
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center mb-6">
            <div className={cn("text-3xl font-bold", resultClass)}>
              {resultText}
            </div>
            <div className="text-lg mt-2">
              {playerScore} - {opponentScore} - {game.scores.ties}
            </div>
            <div className="text-xs text-muted-foreground">
              Win - Loss - Tie
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Score Distribution</div>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(playerScore / totalRounds) * 100}%`, float: 'left' }}
              ></div>
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${(game.scores.ties / totalRounds) * 100}%`, float: 'left' }}
              ></div>
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${(opponentScore / totalRounds) * 100}%`, float: 'left' }}
              ></div>
            </div>
            <div className="flex text-xs justify-between text-muted-foreground">
              <div>Wins: {playerScore}</div>
              <div>Ties: {game.scores.ties}</div>
              <div>Losses: {opponentScore}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="text-sm font-medium">Your Move Choices</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <HandRock className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-xs w-12">Rock</span>
                <Progress value={getMovePercentage(moveStats.player.Rock)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.player.Rock}</span>
              </div>
              <div className="flex items-center">
                <HandPaper className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-xs w-12">Paper</span>
                <Progress value={getMovePercentage(moveStats.player.Paper)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.player.Paper}</span>
              </div>
              <div className="flex items-center">
                <HandScissors className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-xs w-12">Scissors</span>
                <Progress value={getMovePercentage(moveStats.player.Scissors)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.player.Scissors}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm font-medium">Opponent's Move Choices</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <HandRock className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-xs w-12">Rock</span>
                <Progress value={getMovePercentage(moveStats.opponent.Rock)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.opponent.Rock}</span>
              </div>
              <div className="flex items-center">
                <HandPaper className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-xs w-12">Paper</span>
                <Progress value={getMovePercentage(moveStats.opponent.Paper)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.opponent.Paper}</span>
              </div>
              <div className="flex items-center">
                <HandScissors className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-xs w-12">Scissors</span>
                <Progress value={getMovePercentage(moveStats.opponent.Scissors)} className="h-2" />
                <span className="text-xs ml-2 w-6 text-right">{moveStats.opponent.Scissors}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onHome}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button onClick={onPlayAgain}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}