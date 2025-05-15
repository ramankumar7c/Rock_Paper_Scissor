"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { generatePlayerId, createNewGame } from "@/lib/game-utils";

export default function CreateGame() {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");
  const [isCreating, setIsCreating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to create a game.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const playerId = generatePlayerId();
      const newGame = createNewGame(playerId, playerName);
      
      // Create game on the server
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create game');
      }
      
      // Store player info in localStorage
      localStorage.setItem("playerId", playerId);
      localStorage.setItem("playerName", playerName);
      
      setGameId(newGame.id);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating game:', error);
      toast({
        title: "Error",
        description: "Failed to create game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyGameId = () => {
    navigator.clipboard.writeText(gameId);
    toast({
      title: "Game ID copied!",
      description: "Share this with your friend so they can join.",
    });
  };

  const startGame = () => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/20">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>
          <CardTitle className="text-2xl">
            {isCreating ? "Create a new game" : "Game created!"}
          </CardTitle>
          <CardDescription>
            {isCreating
              ? "Enter your name to create a new Rock Paper Scissors game"
              : "Share this game ID with your friend to start playing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCreating ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameId">Game ID</Label>
                <div className="flex">
                  <Input
                    id="gameId"
                    value={gameId}
                    readOnly
                    className="rounded-r-none font-mono text-center text-lg tracking-widest"
                  />
                  <Button
                    onClick={copyGameId}
                    variant="secondary"
                    className="rounded-l-none"
                    type="button"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p>Waiting for another player to join...</p>
                <p className="text-muted-foreground mt-1">Share the Game ID with your friend so they can join.</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {isCreating ? (
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Game"}
            </Button>
          ) : (
            <Button onClick={startGame}>
              Enter Game Room
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}