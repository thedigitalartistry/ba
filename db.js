const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  createTableIfNotExists(tableName, columns) {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
    this.db.run(query);
  }

  insert(tableName, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    this.db.run(query, values);
  }

  delete(tableName, condition) {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.db.run(query);
  }

  update(tableName, data, condition) {
    const setValues = Object.keys(data).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(data);
    const query = `UPDATE ${tableName} SET ${setValues} WHERE ${condition}`;
    this.db.run(query, values);
  }
}

module.exports = Database;
