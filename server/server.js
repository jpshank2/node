const express = require("express");
const fs = require("fs");
const reddit = require("../reddit.js")
const app = express();

let chirps = [
    {chirp: "hello"}, 
    {chirp: "hola"}, 
    {chirp: "prevyet"}, 
    {chirp: "ne chur le mao"}, 
    {chirp: "ciao"}
]

let json = JSON.stringify(chirps)

fs.writeFile("../chirps.json", json, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file has been saved")
})

fs.readFile("../chirps.json", "utf8", (err, data) => {
    if (err) {
        throw err;
    }
    let obj = JSON.parse(data)
    obj.forEach(object => {
        console.log(object.chirp)
    })
})

reddit.reddit();

app.listen(3000)