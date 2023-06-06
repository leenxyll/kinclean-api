// KINCLEAN-API BY LAINEY
var express = require('express')
var cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

var app = express()

app.use(cors())
app.use(express.json())

// MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

/*============================= POST =============================*/
// Create FoodType form postman
app.post("/createFoodType", (req, res, next) => {
    const { FoodTypeName } = req.body;

    try {
        pool.query(
            "INSERT INTO foodtype(FoodTypeName) VALUES(?)",
            [FoodTypeName],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a foodtype into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New FoodType successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Create Food form postman
app.post("/createFood", (req, res, next) => {
    const { FoodName, FoodPrice, FoodTypeID, FoodPic, FoodSig } = req.body;
    try {
        pool.query(
            "INSERT INTO food(FoodName, FoodPrice, FoodTypeID, FoodPic, FoodSig) VALUES(?, ?, ?, ?, ?)",
            [FoodName, FoodPrice, FoodTypeID, FoodPic, FoodSig],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a food into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New Food successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }

})

// Create OrderList form Project Android 
app.post("/createOrderList/RecptNo=:RecptNo/Seq=:Seq/FoodName=:FoodName/Qty=:Qty", (req, res, next) => {
    // const { RecptNo, FoodID, Qty } = req.body;
    const RecptNo = req.params.RecptNo;
    const Seq = req.params.Seq;
    const FoodName = req.params.FoodName;
    const Qty = req.params.Qty;
    try {
        pool.query(
            "INSERT INTO orderlist(Seq, RecptNo, FoodID, Qty, Amount) VALUES (?, ?, (SELECT FoodID FROM food WHERE FoodName = ?), ?, (SELECT FoodPrice FROM food WHERE FoodName = ?)*?)", 
            [Seq, RecptNo, FoodName, Qty, FoodName, Qty],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a orderlist into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New OrderList successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Create Receipt form Project Android 
app.post("/createReceipt/TableNo=:TableNo/Date=:RecptDate", (req, res, next) => {
    const TableNo = req.params.TableNo;
    const RecptDate = req.params.RecptDate;
    const TotalAmt = 0;
    try {
        pool.query(
            "INSERT INTO receipt(TableNo, RecptDate, TotalAmt) VALUES(?, ?, ?)", 
            [TableNo, RecptDate, TotalAmt],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a receipt into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New Receipt successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

/*============================= GET =============================*/
app.get('/helloworld', function(req, res, next) {
    res.json({msg: 'helloworld'})
})

// Read Receipt from db
app.get("/ReadReceipt/all", function (req, res, next) {
    try {
        pool.query(
            "SELECT * FROM receipt", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read this ReceiptNo from db
app.get("/ReadAReceipt", function (req, res, next) {
    try {
        pool.query(
            "SELECT RecptNo FROM receipt ORDER BY RecptNo DESC LIMIT 1", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read History by ReceiptNo from db
app.get("/History/RecptNo=:RecptNo", function (req, res, next) {
    const RecptNo = req.params.RecptNo;
    try {
        pool.query(
            "SELECT receipt.RecptNo ,receipt.TableNo, receipt.RecptDate, orderlist.Seq, food.FoodName, orderlist.Qty, orderlist.Amount, receipt.TotalAmt FROM receipt INNER JOIN orderlist ON (receipt.RecptNo = orderlist.RecptNo) INNER JOIN food ON (orderlist.FoodID = food.FoodID) WHERE receipt.RecptNo = ?", 
            [RecptNo], (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read Bill by ReceiptNo from db
app.get("/Bill/RecptNo=:RecptNo", function (req, res, next) {
    const RecptNo = req.params.RecptNo;
    try {
        pool.query(
            "SELECT * FROM receipt WHERE RecptNo = ?", [RecptNo],
            (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read all OrderList from db
app.get("/ReadOrderList/all", function (req, res, next) {
    const RecptNo = req.params.RecptNo;
    try {
        pool.query(
            "SELECT * FROM orderlist", [RecptNo],
            (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read all FoodType from db
app.get("/ReadFoodType/all", function (req, res, next) {
    try {
        pool.query(
            "SELECT * FROM foodtype", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read single FoodType by FoodTypeName from db 
app.get("/ReadFoodType/single/TypeName=:FoodTypeName", function (req, res, next) {
    const FoodTypeName = req.params.FoodTypeName
    try {
        pool.query(
            "SELECT * FROM foodtype WHERE FoodTypeName = ?", [FoodTypeName], (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read all Food from db
app.get("/ReadFood/all", function (req, res, next) {
    try {
        pool.query(
            "SELECT * FROM food", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read single Food by FoodName from db
app.get("/ReadFood/single/FoodName=:FoodName", function (req, res, next) {
    const FoodName = req.params.FoodName
    try {
        pool.query(
            "SELECT * FROM food WHERE FoodName = ?", [FoodName], (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Read Food by FoodTypeName from db
app.get("/ReadFood/TypeName=:FoodTypeName", function (req, res, next) {
    const FoodTypeName = req.params.FoodTypeName
    try {
        pool.query(
            "SELECT * FROM `food` WHERE (SELECT FoodTypeID FROM foodtype WHERE FoodTypeName = ?)", [FoodTypeName], (err, rows, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(rows)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

/*============================= PATCH =============================*/
// Update TotalAmt by ReceiptNo
app.patch("/updateTotalAmt/RecptNo=:RecptNo", async (req, res) => {
    const Receipt = req.params.RecptNo;
    // const TotalAmt = req.params.TotalAmt;

    try {
        pool.query(
            "UPDATE receipt SET TotalAmt = (SELECT SUM(Amount) From orderlist WHERE RecptNo = ?) WHERE RecptNo = ?", [Receipt, Receipt],
            (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "Total Amount updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// Run server
app.listen(3000, function(){
    console.log('web server listening on port 3000')
})