const dotenv = require("dotenv").config();
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};


console.log(config);

const argumentos = process.argv.slice(2)
let opcion = argumentos[0];
let dato1 = argumentos[1];
let dato2 = argumentos[2];
let dato3 = argumentos[3];
let dato4 = Number(argumentos[4]);
//console.log(process.argv);

/** 
 1. Realizar la conexión con PostgreSQL con la clase Client.
 */
 const { Client } = require('pg');
 

     const client = new Client(config);

     client.connect();


/** 
2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
*/

if (opcion == "nuevo"){
    console.log("entrando en nuevo");
async function ingresar(dato1,dato2,dato3,dato4) {
    // Paso 2
    const res = await client.query(
    `insert into estudiantes (nombre,rut, curso, nivel) values ('${dato1}','${dato2}','${dato3}','${dato4}') RETURNING *;`
    );
    console.log(`Estudiante ${dato1} agregado con exito`)
    //console.log(res);
    client.end();
    }
    ingresar(dato1,dato2,dato3,dato4);
}

/**  
3. Crear una función asíncrona para obtener por consola el registro de un estudiante
por medio de su rut.
*/

if (opcion == "rut"){

async function consultarRut(rut) {
    
    const res = await client.query(
    `SELECT * FROM estudiantes WHERE rut='${rut}'`
    );
    console.log(res.rows);
    client.end();
    }
    consultarRut(dato1);
}

/** 
4. Crear una función asíncrona para obtener por consola todos los estudiantes
registrados.
*/

if (opcion == "consulta"){

async function consulta() {
 
    const res = await client.query(
    "SELECT * FROM estudiantes"
    );
     console.log(res.rows);
    client.end();
    }
    consulta();

}

/** 
5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
datos.
*/

if (opcion == "editar"){
async function editar(nombre,rut,curso,nivel) {
    const res = await client.query(
    `UPDATE estudiantes SET rut = '${rut}', curso = '${curso}', nivel = '${nivel}' WHERE nombre = '${nombre}' RETURNING *;`
    );
    console.log(res.rows);
     console.log(`Estudiante ${nombre} editado con éxito`);
    client.end();
    }
    editar(dato1,dato2,dato3,dato4);
    
}

/**  
6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
datos.
 */

if (opcion == "eliminar"){
async function eliminar(rut) {
    
    const res = await client.query(
    `DELETE FROM estudiantes WHERE rut='${rut}'`
    );
    //console.log(res);
    console.log(`Registro de estudiante con rut ${rut} eliminado`);
    client.end();
    }
    eliminar(dato1);
}