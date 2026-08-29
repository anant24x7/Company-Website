const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const enquiryRoutes =
    require("./routes/enquiryRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const authRoutes =
    require("./routes/authRoutes");


const app = express();


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message:
            "Dataweb Solutions API is running."
    });

});


/* =========================================
   API ROUTES
========================================= */

app.use(
    "/api/enquiries",
    enquiryRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);


/* =========================================
   DATABASE TEST
========================================= */

async function testDatabase() {

    try {

        const connection =
            await db.getConnection();

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


/* =========================================
   START SERVER
========================================= */

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    "127.0.0.1",
    () => {

        console.log(
            `Server running on http://127.0.0.1:${PORT}`
        );

    }
);


testDatabase();