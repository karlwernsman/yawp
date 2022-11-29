const pool = require('../utils/pool.js');

class Review {
  id;
  user_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }
  static async insert({ stars, detail }) {
    const { rows } = await pool.query(
      `
    INSERT INTO reviews (stars, detail)
    VALUES ($1, $2)
    RETURNING *
    `,
      [stars, detail]
    );
    return new Review(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from reviews
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Review(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from reviews WHERE id = $1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
}

module.exports = { Review };
