// models/matrizModel.js
import pool from '../db/connection';

const MatrizModel = {
getAll: async () => {
    const [rows] = await pool.query(`
      SELECT
        m.Id,
        c.Convocatoria,
        l.Localidad,
        u.Nombre_IES,
        n.Nucleo,
        mo.Modalidad,
        s11.Percentil AS Saber11,
        sx.Sexo,
        e.Rango_Edad AS Edad,
        ge.Grupo_Etnico,
        vc.Victima,
        d.Discapacidad,
        si.Grupo_Sisben,
        m.Beneficiarios_Programa
      FROM matriz m
      JOIN convocatoria c ON m.Id_Convocatoria = c.Id_Convocatoria
      JOIN localidad l ON m.Id_Localidad = l.Id_Localidad
      JOIN universidades u ON m.Id_Universidades = u.Id_Universidades
      JOIN nucleo_conocimiento n ON m.Id_Nucleo = n.Id_Nucleo
      JOIN modalidad mo ON m.Id_Modalidad = mo.Id_Modalidad
      JOIN saber_11 s11 ON m.Id_Saber11 = s11.Id_Saber11
      JOIN sexo sx ON m.Id_Sexo = sx.Id_Sexo
      JOIN edad e ON m.Id_Edad = e.Id_Edad
      JOIN grupo_etnico ge ON m.Id_GrupoEtnico = ge.Id_GrupoEtnico
      JOIN victima_conflicto vc ON m.Id_Victima = vc.Id_Victima
      JOIN discapacidad d ON m.Id_Discapacidad = d.Id_Discapacidad
      JOIN sisben si ON m.Id_Sisben = si.Id_Sisben
      ORDER BY m.Id
    `);
    return rows;
  },

  getCatalogos: async () => {
    const [convocatorias] = await pool.query('SELECT * FROM convocatoria');
    const [localidades] = await pool.query('SELECT * FROM localidad');
    const [universidades] = await pool.query('SELECT * FROM universidades ORDER BY Nombre_IES');
    const [nucleos] = await pool.query('SELECT * FROM nucleo_conocimiento ORDER BY Nucleo');
    const [modalidades] = await pool.query('SELECT * FROM modalidad');
    const [saber11] = await pool.query('SELECT * FROM saber_11');
    const [sexos] = await pool.query('SELECT * FROM sexo');
    const [edades] = await pool.query('SELECT * FROM edad');
    const [etnicos] = await pool.query('SELECT * FROM grupo_etnico');
    const [victimas] = await pool.query('SELECT * FROM victima_conflicto');
    const [discapacidades] = await pool.query('SELECT * FROM discapacidad');
    const [sisbenes] = await pool.query('SELECT * FROM sisben');
    return {
      convocatorias, localidades, universidades, nucleos,
      modalidades, saber11, sexos, edades, etnicos,
      victimas, discapacidades, sisbenes
    };
  },

  create: async (data) => {
    const { Id_Convocatoria, Id_Localidad, Id_Universidades, Id_Nucleo,
            Id_Modalidad, Id_Sector, Id_Zona, Id_Saber11, Id_Sexo,
            Id_Edad, Id_GrupoEtnico, Id_Victima, Id_Discapacidad,
            Id_Sisben, Beneficiarios_Programa } = data;
    const [result] = await pool.query(
      `INSERT INTO matriz (Id_Convocatoria, Id_Localidad, Id_Universidades,
        Id_Nucleo, Id_Modalidad, Id_Sector, Id_Zona, Id_Saber11, Id_Sexo,
        Id_Edad, Id_GrupoEtnico, Id_Victima, Id_Discapacidad, Id_Sisben,
        Beneficiarios_Programa)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [Id_Convocatoria, Id_Localidad, Id_Universidades, Id_Nucleo,
       Id_Modalidad, Id_Sector, Id_Zona, Id_Saber11, Id_Sexo,
       Id_Edad, Id_GrupoEtnico, Id_Victima, Id_Discapacidad,
       Id_Sisben, Beneficiarios_Programa]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM matriz WHERE Id = ?', [id]
    );
    return result;
  }
};

export default MatrizModel;