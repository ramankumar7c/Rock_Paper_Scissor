"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { generatePlayerId, getGameFromStorage, saveGameToStorage } from "@/lib/game-utils";

export default function JoinGame() {
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!gameId.trim() || !playerName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both Game ID and your name.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to find the game with provided ID
      const game = await getGameFromStorage(gameId);
      
      if (!game) {
        toast({
          title: "Game not found",
          description: "Please check the Game ID and try again.",
          variant: "destructive",
        });
        return;
      }
      
      if (game.player2) {
        toast({
          title: "Game is full",
          description: "This game already has two players.",
          variant: "destructive",
        });
        return;
      }
      
      // Generate player ID for player 2
      const playerId = generatePlayerId();
      
      // Update game with player 2 information
      game.player2 = {
        id: playerId,
        name: playerName,
        currentMove: null,
        ready: true
      };
      
      game.status = "playing";
      game.rounds.push({
        player1Move: null,
        player2Move: null,
        winner: null,
        completed: false
      });
      
      // Save updated game
      await saveGameToStorage(game);
      
      // Store player info in localStorage
      localStorage.setItem("playerId", playerId);
      localStorage.setItem("playerName", playerName);
      
      // Redirect to game
      router.push(`/game/${gameId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join the game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/20">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>
          <CardTitle className="text-2xl">Join a game</CardTitle>
          <CardDescription>
            Enter the Game ID shared by your friend and your name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gameId">Game ID</Label>
              <Input
                id="gameId"
                value={gameId}
                onChange={(e) => setGameId(e.target.value.toUpperCase())}
                placeholder="Enter Game ID"
                className="w-full font-mono tracking-widest"
                required
                maxLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerName">Your Name</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Joining..." : "Join Game"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}