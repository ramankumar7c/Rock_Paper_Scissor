// Game types
export type Move = "Rock" | "Paper" | "Scissors";
export type GameResult = "win" | "lose" | "tie";

export interface Player {
  id: string;
  name: string;
  currentMove: Move | null;
  ready: boolean;
}

export interface Round {
  player1Move: Move | null;
  player2Move: Move | null;
  winner: string | null; // player ID or null for tie
  completed: boolean;
}

export interface GameState {
  id: string;
  player1: Player;
  player2: Player | null;
  rounds: Round[];
  currentRound: number;
  status: "waiting" | "playing" | "completed";
  scores: {
    player1: number;
    player2: number;
    ties: number;
  };
}

// Generate a random 6-character game ID
export function generateGameId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate a random player ID
export function generatePlayerId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Determine the winner of a round
export function determineWinner(player1Move: Move, player2Move: Move): GameResult {
  if (player1Move === player2Move) {
    return "tie";
  }
  
  if (
    (player1Move === "Rock" && player2Move === "Scissors") ||
    (player1Move === "Paper" && player2Move === "Rock") ||
    (player1Move === "Scissors" && player2Move === "Paper")
  ) {
    return "win";
  }
  
  return "lose";
}

// Create a new game state
export function createNewGame(playerId: string, playerName: string): GameState {
  return {
    id: generateGameId(),
    player1: {
      id: playerId,
      name: playerName,
      currentMove: null,
      ready: true
    },
    player2: null,
    rounds: [],
    currentRound: 0,
    status: "waiting",
    scores: {
      player1: 0,
      player2: 0,
      ties: 0
    }
  };
}

// Create a new round
export function createNewRound(): Round {
  return {
    player1Move: null,
    player2Move: null,
    winner: null,
    completed: false
  };
}

// Get game state from API
export async function getGameFromStorage(gameId: string): Promise<GameState | null> {
  try {
    const response = await fetch(`/api/games?id=${gameId}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching game:', error);
    return null;
  }
}

// Save game state to API
export async function saveGameToStorage(game: GameState): Promise<void> {
  try {
    const response = await fetch('/api/games', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save game');
    }
  } catch (error) {
    console.error('Error saving game:', error);
  }
}