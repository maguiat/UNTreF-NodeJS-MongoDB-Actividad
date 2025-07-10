const { connect, disconnect } = require("./db/connection");
const { ObjectId } = require("mongodb");
const express = require("express");
const { validarFruta, validarFrutaParcialmente } = require("./schema/frutas.js");
const app = express();
const port = process.env.PORT || 3000;

// Agregamos middleware de parseo de json
app.use(express.json());
// Agregamos middleware para la conexion y desconexión con la DB
app.use("/frutas", async (req, res, next) => {
  try {
    const client = await connect();
    req.db = client.db("frutasDB").collection("frutas");
    console.log("conectado a frutas");
    next();
  } catch (error) {
    console.error({ error });
  }
  res.on("finish", async () => {
    await disconnect();
  });
});
// Ruta raiz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de/frutas 🎞");
});
// Mostrar todas las/frutas
app.get("/frutas", async (req, res) => {
  try {
    const frutas = await req.db.find({}).toArray();
    if (frutas.length === 0) {
      res.status(404).json({ error: "No se encontraron frutas" });
    } else {
      res.json(frutas);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las/frutas" });
  }
});
// Mostrar/frutas por id
app.get("/frutas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fruta = await req.db.findOne({ _id: new ObjectId(id) });
    if (!fruta) {
      res.status(404).json({ error: "No se encontró la fruta" });
    } else {
      res.json(fruta);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la fruta" });
  }
});
// Mostrar/frutas por nombre
app.get("/frutas/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const frutas = await req.db.find({nombre: { $regex: `^${nombre}$`, $options: "i" }}).toArray();
    if (frutas.length === 0) {
      res.status(404).json({ error: "Fruta no encontrada" });
    } else {
      res.json(frutas);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las/frutas" });
  }
});
// Mostrar frutas por su precio
app.get("/frutas/importe/:precio", async (req, res) => {
  const precio = parseFloat(req.params.precio);
  try {
    const frutas = await req.db.find({ precio }).toArray();
    if (frutas.length === 0) {
      res.status(404).json({ error: "No se encontraron frutas" });
    } else {
      res.json(frutas);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las/frutas" });
  }
});
// Agregar frutas
app.post("/frutas", async (req, res) => {
  const resultado = validarFruta(req.body);
  if (!resultado.success) {
    res.status(400).json({ error: JSON.parse(resultado.error.message) });
  }
  try {
    await req.db.insertOne(resultado.data);
    res.status(201).json(resultado.data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear fruta" });
  }
});
// Borrar frutas
app.delete("/frutas/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido'})
  }
  try {
    const { deletedCount } = await req.db.deleteOne({ _id: new ObjectId(id) });
    res
      .status(deletedCount === 0 ? 404 : 204)
      .json(
        deletedCount === 0
          ? { error: "fruta no encontrada" }
          : { message: "fruta borrada" }
      );
  } catch (error) {
    res.status(500).json({ error: "Error al borrar fruta" });
  }
});
// Modificar frutas
app.patch("/frutas/:id", async (req, res) => {
  const resultado = validarFrutaParcialmente(req.body);

  if (!resultado.success) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) });
  }

  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const updateResult = await req.db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: resultado.data }, // Usar resultado.data es más seguro
      { returnDocument: "after" }
    );

    if (!updateResult) {
      // Correcto: si no devuelve nada, no se encontró.
      return res.status(404).json({ message: "Fruta no encontrada para actualizar" });
    }

    // ¡Bien! Devuelves el documento actualizado.
    return res.json({
      message: "Fruta actualizada con éxito",
      updatedFruta: updateResult, // Cambié el nombre de la propiedad para consistencia
    });

  } catch (error) {
    // SUGERENCIA: Mensaje de error consistente.
    res.status(500).json({ error: "Error al actualizar la fruta" });
  }
});
// Escuchar el servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});