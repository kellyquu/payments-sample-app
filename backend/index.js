const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// Start server
app.listen(process.env.PORT || 5001);

// Connect to Mongoose DB
mongoose.connect("mongodb://127.0.0.1:27017/technovaDB");

// Expense collection
const expenseSchema = {
    value: Number,
    date: Date
};
const expense = mongoose.model("expense", expenseSchema);

// People collection
const personSchema = {
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    groups: [Number],
    expenses: [expenseSchema]
};
const person = mongoose.model("person", personSchema);
