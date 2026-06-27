// models/convocatoriaModel.js
import pool from '../db/connection';

const ConvocatoriaModel = {

  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT
        c.Id_Convocatoria,
        c.Convocatoria,
        COUNT(m.Id) AS Total_Beneficiarios
      FROM convocatoria c
      LEFT JOIN matriz m ON c.Id_Convocatoria = m.Id_Convocatoria
      GROUP BY c.Id_Convocatoria, c.Convocatoria
      ORDER BY c.Id_Convocatoria
    `);
    return rows;
  }
};

export default ConvocatoriaModel;