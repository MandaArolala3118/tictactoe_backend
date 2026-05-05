-- Create moves table
CREATE TABLE moves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK (position >= 0 AND position <= 8),
  move_number INTEGER NOT NULL CHECK (move_number > 0),
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for foreign keys and game ordering
CREATE INDEX idx_moves_game ON moves(game_id);
CREATE INDEX idx_moves_player ON moves(player_id);
CREATE INDEX idx_moves_game_number ON moves(game_id, move_number);
