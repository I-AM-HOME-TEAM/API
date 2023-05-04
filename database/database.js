const mysql = require('mysql2/promise');

async function main() {
    // create a connection to the MySQL server
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodedb',
        port: 3306
    });

    try {
        // execute the SQL statement to create the users table
        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            restoration_token VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        console.log('Table created successfully!');
    } catch (error) {
        console.error(error);
    } finally {
        // close the connection
        connection.end();
    }
}

main();
