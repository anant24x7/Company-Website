const express = require("express");
const cors = require("cors");
require("dotenv").config();

const enquiryRoutes = require("./routes/enquiryRoutes");
const db = require("./db");

const app = express();


/* ================================
   MIDDLEWARE
================================ */

app.use(cors());
app.use(express.json());


/* ================================
   ROUTES
================================ */

app.use(
    "/api/enquiries",
    enquiryRoutes
);


app.get("/", (req, res) => {

    res.json({
        message: "Dataweb Solutions API is running."
    });

});


/* ================================
   DATABASE TEST
================================ */

async function testDatabase() {

    try {

        const connection = await db.getConnection();

        console.log(
            "MySQL connected successfully."
        );

        connection.release();

    } catch (error) {

        console.error(
            "MySQL connection failed:",
            error.message
        );

    }

}


/* ================================
   START SERVER
================================ */

const PORT =
    process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});


testDatabase();
