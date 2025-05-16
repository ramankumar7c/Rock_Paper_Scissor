import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('id');
  if (!gameId) {
    return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const game = await db.collection('games').findOne({ id: gameId });
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }
  return NextResponse.json(game);
}

export async function POST(request: Request) {
  const game = await request.json();
  const client = await clientPromise;
  const db = client.db();
  await db.collection('games').insertOne(game);
  return NextResponse.json(game);
}

export async function PUT(request: Request) {
  const game = await request.json();
  const client = await clientPromise;
  const db = client.db();

  // Remove _id if present
  if ('_id' in game) {
    delete game._id;
  }

  const result = await db.collection('games').updateOne(
    { id: game.id },
    { $set: game }
  );
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }
  return NextResponse.json(game);
} 