const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");

const router = express.Router();


/* =========================================
   ADMIN LOGIN
========================================= */

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required."

            });

        }


        const [rows] =
            await db.execute(
                `
                SELECT
                    admin_id,
                    full_name,
                    email,
                    password_hash,
                    role,
                    is_active
                FROM admin_users
                WHERE email = ?
                LIMIT 1
                `,
                [
                    email.trim().toLowerCase()
                ]
            );


        if (rows.length === 0) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        const admin =
            rows[0];


        if (!admin.is_active) {

            return res.status(403).json({

                success: false,

                message:
                    "This admin account is disabled."

            });

        }


        const passwordMatches =
            await bcrypt.compare(
                password,
                admin.password_hash
            );


        if (!passwordMatches) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        const token =
            jwt.sign(
                {
                    adminId:
                        admin.admin_id,

                    email:
                        admin.email,

                    role:
                        admin.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN
                        || "8h"
                }
            );


        return res.json({

            success: true,

            message:
                "Login successful.",

            token,

            admin: {

                adminId:
                    admin.admin_id,

                fullName:
                    admin.full_name,

                email:
                    admin.email,

                role:
                    admin.role

            }

        });


    } catch (error) {

        console.error(
            "Admin login error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to login."

        });

    }

});


module.exports =
    router;