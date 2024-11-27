const express = require("express");
const app = express();
const port = 3002;
require("dotenv").config();

// utilise body-parser
const bodyParser = require("body-parser");

// utilise le middleware body-parser
app.use(bodyParser.json());

const db = require("./config/db");

// get all avec le querie
app.get("/api/personnel", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM personne");
  res.send(rows);
});

// Post personnel
app.post("/api/personnel", async (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO personne (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)",
      [nom, prenom, email, telephone]
    );
    res.send({
      message: "Personne ajoutée avec succès !",
      personne: {
        id: result.insertId,
        nom,
        prenom,
        email,
        telephone,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la personne." + error });
  }
});

app.listen(port, () => {
  console.log(` Server is running on port ${port} `);
});
