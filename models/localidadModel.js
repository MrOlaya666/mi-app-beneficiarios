// models/localidadModel.js
import pool from '../db/connection';

const LocalidadModel = {

  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM localidad ORDER BY Cod_Localidad');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM localidad WHERE Id_Localidad = ?', [id]);
    return rows[0];
  },

  create: async (Cod_Localidad, Localidad) => {
    const [result] = await pool.query(
      'INSERT INTO localidad (Cod_Localidad, Localidad) VALUES (?, ?)',
      [Cod_Localidad, Localidad]
    );
    return result;
  },

  update: async (id, Cod_Localidad, Localidad) => {
    const [result] = await pool.query(
      'UPDATE localidad SET Cod_Localidad = ?, Localidad = ? WHERE Id_Localidad = ?',
      [Cod_Localidad, Localidad, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM localidad WHERE Id_Localidad = ?', [id]
    );
    return result;
  }
};

export default LocalidadModel;