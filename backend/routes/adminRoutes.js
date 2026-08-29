const express = require("express");
const router = express.Router();

const db = require("../db");


/* =========================================
   GET ALL ENQUIRIES
========================================= */

router.get("/enquiries", async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                enquiry_id,
                full_name,
                company_name,
                email,
                phone,
                service_required,
                message,
                enquiry_source,
                status,
                created_at,
                updated_at
            FROM enquiries
            ORDER BY created_at DESC
        `);

        return res.json({
            success: true,
            data: rows
        });

    } catch (error) {

        console.error(
            "Admin enquiry fetch error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Unable to load enquiries."
        });

    }

});


/* =========================================
   GET DASHBOARD COUNTS
========================================= */

router.get("/stats", async (req, res) => {

    try {

        const [rows] = await db.execute(`
            SELECT
                COUNT(*) AS total,
                SUM(status = 'New') AS new_count,
                SUM(status = 'Contacted') AS contacted_count,
                SUM(status = 'Qualified') AS qualified_count,
                SUM(status = 'Converted') AS converted_count
            FROM enquiries
        `);

        return res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {

        console.error(
            "Dashboard stats error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Unable to load statistics."
        });

    }

});


/* =========================================
   UPDATE ENQUIRY STATUS
========================================= */

router.patch(
    "/enquiries/:id/status",
    async (req, res) => {

        try {

            const enquiryId =
                Number(req.params.id);

            const { status } =
                req.body;


            const allowedStatuses = [
                "New",
                "Contacted",
                "Qualified",
                "Converted",
                "Closed"
            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid enquiry status."
                });

            }


            const [result] =
                await db.execute(
                    `
                    UPDATE enquiries
                    SET status = ?
                    WHERE enquiry_id = ?
                    `,
                    [
                        status,
                        enquiryId
                    ]
                );


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Enquiry not found."
                });

            }


            return res.json({
                success: true,
                message:
                    "Enquiry status updated successfully."
            });


        } catch (error) {

            console.error(
                "Status update error:",
                error.message
            );

            return res.status(500).json({
                success: false,
                message:
                    "Unable to update enquiry status."
            });

        }

    }
);


module.exports = router;