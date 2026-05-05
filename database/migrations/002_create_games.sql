-- Create games table
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_x_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_o_id UUID REFERENCES users(id) ON DELETE SET NULL,
  state JSONB DEFAULT '{"board": [null, null, null, null, null, null, null, null, null], "winner": null, "isDraw": false}',
  current_turn VARCHAR(1) DEFAULT 'X' CHECK (current_turn IN ('X', 'O')),
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished', 'abandoned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for foreign keys and status
CREATE INDEX idx_games_player_x ON games(player_x_id);
CREATE INDEX idx_games_player_o ON games(player_o_id);
CREATE INDEX idx_games_status ON games(status);
