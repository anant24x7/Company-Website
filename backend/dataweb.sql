CREATE DATABASE dataweb_website;

USE dataweb_website;

CREATE TABLE enquiries (
    enquiry_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),

    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,

    service_required VARCHAR(100) NOT NULL,

    message TEXT NOT NULL,

    enquiry_source VARCHAR(50) DEFAULT 'Website',

    status ENUM(
        'New',
        'Contacted',
        'Qualified',
        'Converted',
        'Closed'
    ) DEFAULT 'New',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM enquiries;
use dataweb_website;

DESCRIBE enquiries;

SHOW GRANTS FOR 'dataweb_app'@'localhost';

USE dataweb_website;

INSERT INTO enquiries
(
    full_name,
    company_name,
    email,
    phone,
    service_required,
    message
)
VALUES
(
    'Test User',
    'Dataweb Solutions',
    'test@example.com',
    '9999746866',
    'ERP Consulting',
    'This is a test enquiry.'
);

USE dataweb_website;

SELECT * FROM enquiries;

USE dataweb_website;

CREATE TABLE admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'SuperAdmin',
        'Admin',
        'Viewer'
    ) DEFAULT 'Admin',

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

DESCRIBE admin_users;
