require('dotenv').config()
const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const { PORT } = process.env

app.use(express.json())
app.use(cors())


app.listen(PORT || 5000, console.log("¡Hola Mundo con expres!"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.get("/home", (req, res) => {
    res.send("Hello World Express Js")
})

app.get("/perfil", (req, res) => {
    res.send("Alonao Trina Zavala")
})

app.get("/fecha", (req, res) => {
    const fecha = new Date()
    res.send(fecha)
})


app.get("/usuarios", (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"))
    res.json(usuarios)
})

app.post("/usuarios", (req, res) => {
    // 1
    const usuario = req.body
    // 2
    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"))
    // 3
    usuarios.push(usuario)
    // 4
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios))
    // 5
    res.send("Usuario agregado con éxito!")
})

app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params
    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"))
    const eliminarUsuarios = usuarios.filter((item) => item.id != id)
    fs.writeFileSync("usuarios.json", JSON.stringify(eliminarUsuarios))
    res.send("Usuarios eliminado con éxito")
})

app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params
    const usuario = req.body

    const usuarios = JSON.parse(fs.readFileSync("productos.json"))
    const index = usuarios.findIndex(p => p.id == id)

    usuarios[index] = usuario
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios))
    res.send("usuario modificado con éxito")
})



// -------------------------------------
app.get("/productos", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    res.json(productos)
})

app.post("/productos", (req, res) => {
    const producto = req.body
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    productos.push(producto)
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto agregado con éxito!")
})

app.delete("/productos/:id", (req, res) => {
    const { id } = req.params
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index, 1)
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto eliminado con éxito")
})


app.put("/productos/:id", (req, res) => {
    const { id } = req.params
    const producto = req.body

    const productos = JSON.parse(fs.readFileSync("productos.json"))
    const index = productos.findIndex(p => p.id == id)

    productos[index] = producto
    fs.writeFileSync("productos.json", JSON.stringify(productos))
    res.send("Producto modificado con éxito")
})
