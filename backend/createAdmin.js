require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("./db");


async function createAdmin() {

    try {

        const fullName =
            "Administrator";

        const email =
            "director@dataweb.tech";

        const plainPassword =
            "Infotech#2026";


        const saltRounds = 12;


        const passwordHash =
            await bcrypt.hash(
                plainPassword,
                saltRounds
            );


        const sql = `
            INSERT INTO admin_users
            (
                full_name,
                email,
                password_hash,
                role
            )
            VALUES (?, ?, ?, ?)
        `;


        await db.execute(
            sql,
            [
                fullName,
                email,
                passwordHash,
                "SuperAdmin"
            ]
        );


        console.log(
            "Admin user created successfully."
        );


        process.exit(0);


    } catch (error) {

        console.error(
            "Admin creation failed:",
            error.message
        );


        process.exit(1);

    }

}


createAdmin();