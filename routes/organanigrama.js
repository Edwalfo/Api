const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());


const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getOrganigrama = (request, response) => {
    connection.query("SELECT * FROM nodes", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/organigrama")
.get(getOrganigrama);


const postOrganigrama = (request, response) => {
    const {name, parent_id} = request.body;
    connection.query("INSERT INTO nodes(name, parent_id) VALUES (?,?) ", 
    [name, parent_id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Nodo añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/organigrama")
.post(postOrganigrama);


const delOrganigrama = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from nodes where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Nodo eliminado":results.affectedRows});
    });
};

//ruta
app.route("/organigrama/:id")
.delete(delOrganigrama);

const putOrganigrama = (request, response) => {
    const id = request.params.id;
    const {name, parent_id} = request.body;
    connection.query("UPDATE nodes SET name = ?, parent_id = ? WHERE id = ?", 
    [name, parent_id, id],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json({"Nodo actualizado": results.affectedRows});
    });
};

//ruta
app.route("/organigrama/:id")
.put(putOrganigrama);


module.exports = app;