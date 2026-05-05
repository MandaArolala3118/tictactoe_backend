// Mock database pour les tests - remplace Supabase temporairement
const mockUsers = [
  { id: '1', username: 'player1', created_at: new Date(), updated_at: new Date() },
  { id: '2', username: 'player2', created_at: new Date(), updated_at: new Date() }
];

const mockInvitations = [
  { 
    id: 'inv1', 
    from_user_id: '1', 
    game_id: 'game1', 
    game_key: 'ABC123', 
    status: 'pending', 
    expires_at: new Date(Date.now() + 60 * 60 * 1000), 
    created_at: new Date(), 
    updated_at: new Date() 
  },
  { 
    id: 'inv2', 
    from_user_id: '2', 
    game_id: 'game2', 
    game_key: 'XYZ789', 
    status: 'accepted', 
    expires_at: new Date(Date.now() + 60 * 60 * 1000), 
    created_at: new Date(), 
    updated_at: new Date() 
  }
];

const mockGames = [
  {
    id: 'game1',
    player_x_id: '1',
    player_o_id: '2',
    state: {
      board: [null, null, null, null, null, null, null, null, null],
      winner: null,
      isDraw: false
    },
    current_turn: 'X',
    status: 'waiting',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'game2',
    player_x_id: '2',
    player_o_id: null,
    state: {
      board: ['X', null, null, null, 'O', null, null, null, null],
      winner: null,
      isDraw: false
    },
    current_turn: 'X',
    status: 'playing',
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockMoves = [
  {
    id: 'move1',
    game_id: 'game2',
    player_id: '2',
    position: 0,
    move_number: 1,
    played_at: new Date(Date.now() - 10 * 60 * 1000),
    created_at: new Date(Date.now() - 10 * 60 * 1000),
    updated_at: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 'move2',
    game_id: 'game2',
    player_id: '1',
    position: 4,
    move_number: 2,
    played_at: new Date(Date.now() - 5 * 60 * 1000),
    created_at: new Date(Date.now() - 5 * 60 * 1000),
    updated_at: new Date(Date.now() - 5 * 60 * 1000)
  }
];

class MockSupabase {
  from(table) {
    const getData = () => {
      if (table === 'users') return mockUsers;
      if (table === 'invitations') return mockInvitations;
      if (table === 'games') return mockGames;
      if (table === 'moves') return mockMoves;
      return [];
    };
    
    return {
      select: (columns = '*') => ({
        eq: (column, value) => ({
          single: () => Promise.resolve({
            data: getData().find(item => item[column] === value) || null,
            error: null
          }),
          then: (resolve) => resolve({
            data: getData().filter(item => item[column] === value),
            error: null
          })
        }),
        limit: (count) => Promise.resolve({
          data: getData().slice(0, count),
          error: null
        }),
        order: (column, options) => {
          const sorted = [...getData()].sort((a, b) => {
            if (options.ascending) {
              return a[column] - b[column];
            } else {
              return b[column] - a[column];
            }
          });
          return Promise.resolve({
            data: sorted,
            error: null
          });
        },
        then: (resolve) => resolve({
          data: getData(),
          error: null
        })
      }),
      insert: (data) => ({
        select: () => ({
          single: () => {
            const newItem = { ...data, id: Date.now().toString(), created_at: new Date(), updated_at: new Date() };
            // Ajouter au tableau mock correspondant
            if (table === 'users') mockUsers.push(newItem);
            else if (table === 'games') mockGames.push(newItem);
            else if (table === 'moves') mockMoves.push(newItem);
            else if (table === 'invitations') mockInvitations.push(newItem);
            
            return Promise.resolve({
              data: newItem,
              error: null
            });
          }
        })
      }),
      update: (data) => ({
        eq: (column, value) => ({
          select: () => ({
            single: () => Promise.resolve({
              data: { ...mockData.find(item => item[column] === value), ...data },
              error: null
            })
          })
        })
      }),
      delete: () => ({
        eq: (column, value) => Promise.resolve({
          error: null
        })
      })
    };
  }
}

module.exports = new MockSupabase();
