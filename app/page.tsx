import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Swords } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-md w-full mx-auto text-center space-y-8">
        <div className="space-y-2">
          <div className="flex justify-center">
            <Swords className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Rock Paper Scissors</h1>
          <p className="text-muted-foreground">
            Challenge your friends to a classic game of Rock Paper Scissors!
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Link href="/create">
              <Button size="lg" className="w-full group">
                Create Game
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            <Link href="/join">
              <Button variant="outline" size="lg" className="w-full">
                Join Game
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Create a game and invite a friend using the game ID.</p>
        </div>
      </div>
    </main>
  );
}