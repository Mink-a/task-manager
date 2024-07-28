const fs = require('fs');

const USERS = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+1 ${i + 1} 123 4567`,
}));

const DB = {
  users: [...USERS],
};

fs.writeFileSync(__dirname + '/db.json', JSON.stringify(DB, null, 2));
