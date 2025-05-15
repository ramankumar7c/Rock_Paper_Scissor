import { NextResponse } from 'next/server';
import { GameState } from '@/lib/game-utils';

// In-memory storage for games (in a real app, you'd use a database)
const games = new Map<string, GameState>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('id');

  if (!gameId) {
    return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
  }

  const game = games.get(gameId);
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }

  return NextResponse.json(game);
}

export async function POST(request: Request) {
  const game = await request.json();
  games.set(game.id, game);
  return NextResponse.json(game);
}

export async function PUT(request: Request) {
  const game = await request.json();
  if (!games.has(game.id)) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }
  games.set(game.id, game);
  return NextResponse.json(game);
} 