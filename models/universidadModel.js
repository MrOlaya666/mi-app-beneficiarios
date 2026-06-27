// models/universidadModel.js
import pool from '../db/connection';

const UniversidadModel = {

  getAll: async () => {
    const [rows] = await pool.query(
      'SELECT * FROM universidades ORDER BY Nombre_IES'
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      'SELECT * FROM universidades WHERE Id_Universidades = ?', [id]
    );
    return rows[0];
  },

  create: async (Codigo_SNIES, Nombre_IES) => {
    const [result] = await pool.query(
      'INSERT INTO universidades (Codigo_SNIES, Nombre_IES) VALUES (?, ?)',
      [Codigo_SNIES, Nombre_IES]
    );
    return result;
  },

  update: async (id, Codigo_SNIES, Nombre_IES) => {
    const [result] = await pool.query(
      'UPDATE universidades SET Codigo_SNIES = ?, Nombre_IES = ? WHERE Id_Universidades = ?',
      [Codigo_SNIES, Nombre_IES, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM universidades WHERE Id_Universidades = ?', [id]
    );
    return result;
  }
};

export default UniversidadModel;