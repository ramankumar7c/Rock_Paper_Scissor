"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Swords } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type GameState, type Player } from "@/lib/game-utils";

interface GameHeaderProps {
  game: GameState;
  playerRole: "player1" | "player2";
  opponentRole: "player1" | "player2";
  gameId: string;
}

export default function GameHeader({
  game,
  playerRole,
  opponentRole,
  gameId,
}: GameHeaderProps) {
  const { toast } = useToast();
  
  const player: Player | null = playerRole === "player1" ? game.player1 : game.player2;
  const opponent: Player | null = opponentRole === "player1" ? game.player1 : game.player2;
  
  const copyGameId = () => {
    navigator.clipboard.writeText(gameId);
    toast({
      title: "Game ID copied!",
      description: "Share this with your friend so they can join.",
    });
  };

  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <Swords className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-2xl font-bold">Rock Paper Scissors</h1>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Badge variant="outline" className="font-mono">
          {gameId}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={copyGameId}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center space-x-6 md:space-x-12">
        <div className="text-center">
          <div className="font-medium">{player?.name || "You"}</div>
          <div className="text-sm text-muted-foreground">You</div>
        </div>
        
        <div className="flex items-center">
          <Badge className="mr-2">{game.scores.player1}</Badge>
          <span className="text-muted-foreground">vs</span>
          <Badge className="ml-2">{game.scores.player2}</Badge>
        </div>
        
        <div className="text-center">
          <div className="font-medium">{opponent?.name || "Opponent"}</div>
          <div className="text-sm text-muted-foreground">Opponent</div>
        </div>
      </div>
    </div>
  );
}