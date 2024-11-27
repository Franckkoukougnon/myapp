const db = require("../config/db");
const personModel = require("../model/personModel");

class personnelRepository {
  constructor() {
    this.db = db;
  }

  async getAll() {
    const [rows] = await this.db.execute("SELECT * FROM personne");
    return rows;
  }

  async create(person) {
    if (person instanceof personModel) {
      const [result] = await this.db.execute(
        "INSERT INTO personne (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)",
        [person.nom, person.prenom, person.email, person.telephone]
      );
      return result.insertId;
    }
    return null;
  }

  async update(person) {
    if (person instanceof personModel) {
      const [result] = await this.db.execute(
        "UPDATE personne SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?",
        [person.nom, person.prenom, person.email, person.telephone, person.id]
      );
      return result.affectedRows > 0;
    }
    return false;
  }

  async delete(id) {
    const [result] = await this.db.execute(
      "DELETE FROM personne WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
