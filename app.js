require('dotenv').config();

const express = require('express'); //Framework
const pool = require('./db'); //Acceso BD

//Framework
const app = express();

//Configuración comunicación JSON
app.use(express.json());

//Configuración puerto
const port = process.env.PORT || 3000;

//Middleware gestionar los errores
const handDbError = (res, error) => {
  console.error('Error en la base de datos: ', error);
  res.status(500).json({error: 'Error interno en el servicio'})
};

//Verbos:
//ENDPOINT

//GET - CONSULTA TODOS LOS DATOS
app.get('/vehiculos', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM vehiculos ORDER BY id DESC');
    res.status(200).json(rows);
  }catch(error){
    handDbError(res, error);
  }
});

//*** PENDIENTE *** //
//GET - BUSCADOR POR ID
app.get('/vehiculos', async (req, res) => {

});

//POST (registrar)
app.post('/vehiculos', async (req, res) => {   
  const {marca, modelo, color, placa} = req.body;

  if (!marca || !modelo || !color || !placa){
    return res.status(400).json({error: "Todos los campos son obligatorios"});
  }

  //Insertar nuevo registro
  try{
    const [result] = await pool.query("INSERT INTO vehiculos (marca, modelo, color, placa) VALUES (?,?,?,?)", [marca, modelo, color, placa]);
    const nuevoRegistro = { id: result.insertId };
    res.status(201).json(nuevoRegistro);
  }catch(error){
    //Error por UNIQUE (duplicado)
    if (error.code === "ER_DUP_ENTRY"){
      return res.status(409).json({error: "La placa ya existe"});
    }
    handDbError(res, error);
  }
});

//PUT
app.put('/vehiculos/:id', async (req, res) => {
  //ID (PK) viene como parte del ENDPOINT
  const { id } = req.params;
  
  //Campos viene en JSON
  const { marca, modelo, color, placa } = req.body;

  if (!marca || !modelo || !color || !placa){
    return res.status(400).json({error: "Todos los campos son obligatorios"});
  }

  try{
    const [result] = await pool.query(
      "UPDATE vehiculos SET marca = ?, modelo = ?, color = ?, placa = ? WHERE id = ?", 
      [marca, modelo, color, placa, id]);
    
    //No hubo cambios en la BD 
    if (result.affectedRows === 0){
      return res.status(404).json({message: "Vehículo no encontrado"});
    }

    //Si llegamos hasta aquí, se logró realizar un cambio
    return res.status(200).json({message:"Vehículo actualizado correctamente"});

  }catch(error){
    if (error.code === "ER_DUP_ENTRY"){
      return res.status(409).json({error: "La placa ya existe"});
    }
    handDbError(res, error);
  }

});

//DELETE (eliminación física)
app.delete('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;

  try{
    const [result] = await pool.query("DELETE FROM vehiculos WHERE id = ?", [id]);

    if (result.affectedRows === 0){
      return res.status(404).json({message: "Vehiculo no encontrado para eliminar"});
    }

    return res.status(200).json({message: "Vehiculo eliminado correctamente"})
  }catch(error){
    handDbError(res, error);
  }

});

//Ejecutar
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});