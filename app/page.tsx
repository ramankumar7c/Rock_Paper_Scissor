import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Swords, Heart, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto mb-4">
        <div className="w-full text-center space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <Swords className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Rock Paper Scissors</h1>
            <p className="text-muted-foreground">
              Challenge your friends to a classic game of Rock Paper Scissors!
            </p>
          </div>

          <div className="space-y-4">
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

          <div className="text-sm text-muted-foreground">
            <p>Create a game and invite a friend using the game ID.</p>
          </div>

          <div className="mt-10 pt-20 border-t border-border/40">
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <p>Developed with</p>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <p>by</p>
              <Link 
                href="https://github.com/ramankumar7c/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 hover:underline transition-colors flex items-center gap-1"
              >
                Raman
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}