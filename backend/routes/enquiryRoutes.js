const express = require("express");
const router = express.Router();

const db = require("../db");


router.post("/", async (req, res) => {

    console.log("POST /api/enquiries received");
    console.log("Request body:", req.body);

    try {

        const {
            name,
            company,
            email,
            phone,
            service,
            message
        } = req.body;


        if (
            !name ||
            !email ||
            !phone ||
            !service ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please complete all required fields."

            });

        }


        const sql = `
            INSERT INTO enquiries
            (
                full_name,
                company_name,
                email,
                phone,
                service_required,
                message
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        const values = [

            name.trim(),

            company
                ? company.trim()
                : null,

            email.trim(),

            phone.trim(),

            service.trim(),

            message.trim()

        ];


        console.log(
            "Executing enquiry insert..."
        );


        const [result] =
            await db.execute(sql, values);


        console.log(
            "Enquiry saved successfully. ID:",
            result.insertId
        );


        return res.status(201).json({

            success: true,

            message:
                "Thank you. Your enquiry has been submitted successfully.",

            enquiryId:
                result.insertId

        });


    } catch (error) {

        console.error(
            "========== ENQUIRY ERROR =========="
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Code:",
            error.code
        );

        console.error(
            "SQL Message:",
            error.sqlMessage
        );

        console.error(
            "==================================="
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to submit enquiry. Please try again."

        });

    }

});


module.exports = router;