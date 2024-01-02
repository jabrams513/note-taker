const express = require('express');
const path = require('path');
const fs = require('fs')

// Used to create unique IDs
const uuid = require("./helper/uuid.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
