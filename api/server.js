const express = require("express");
const app = express();
const path = require("path");

// app.use(express.static(path.resolve(__dirname, "..", "client")));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Contoh query ke database
function rand(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}

const createData = async (nama, email) => {
    const response = await prisma.kakel.create({
        data: {
            name: nama,
            email: email,
            code: rand(0,9999).toString()
        }
    })
    return response
}


app.use(express.static(path.resolve(__dirname, "..", "client")));

app.get("/qr", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
})

app.get("/", (req, res) => {
    res.json({
        message: "Hayya yg benr dong"
    });
})

app.get("/api/add/:nama/:email", async (req, res) => {
    try {
        
        res.json(await createData(req.params.nama, req.params.email));

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

app.get("/api", async (req, res) => {
    try {
        const users = await prisma.kakel.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

app.listen(80);