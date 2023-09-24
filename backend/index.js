const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));

// Start server
app.listen(process.env.PORT || 5001, () => {
    console.log("Server started");
});


// Connect to Mongoose DB
mongoose.connect("mongodb://127.0.0.1:27017/technovaDB");

// Expense collection
const expenseSchema = {
    price: Number,
    currency: String,
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

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/testing/user.html");
});

app.get("/users", function(req, res) {

})

app.post("/addUser", function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const group = req.body.group;
    const newPerson = new person ({
        fname: fname,
        lname: lname,
        groups: [group],
        expenses: []
    });
    newPerson.save();
    res.sendFile(__dirname + "/testing/expense.html");
});

app.post("/addExpense", function(req, res) {
    const price = req.body.price;
    const currency = req.body.currency;
    const today = new Date().toLocaleDateString("fr-CA", {timeZone: "America/Toronto"});
    const newExpense = new expense ({
        price: price,
        currency: currency,
        date: today
    });
    
})
