const viewQuery = `SELECT * FROM TEST_ORDER_123 LIMIT 10;`;
const viewSimpleQuery = `SELECT ROLE_NAME, PAGE_NAME,HAS_ACCESS FROM ROLE_PERMISSIONS;`;
const viewGroupByQuery =
        `SELECT 
            PAGE_NAME,
            MAX(CASE WHEN ROLE_NAME = 'RAISE_ADMIN' THEN HAS_ACCESS END) AS RAISE_ADMIN,
            MAX(CASE WHEN ROLE_NAME = 'RAISE_DEVELOPER' THEN HAS_ACCESS END) AS RAISE_DEVELOPER,
            MAX(CASE WHEN ROLE_NAME = 'RAISE_USER' THEN HAS_ACCESS END) AS RAISE_USER
        FROM ROLE_PERMISSIONS
        GROUP BY PAGE_NAME
        ORDER BY PAGE_NAME;`;
const createTableQuery = 'CREATE TABLE TEST_ORDER_RAISE (order_id INT AUTOINCREMENT, customer_id INT, product_name VARCHAR(255), price DECIMAL(10, 2));';
const insertDataQuery = `INSERT INTO TEST_ORDER_RAISE (customer_id, product_name, price) VALUES 
            (8001, 'Product A', 19.99), 
            (8002, 'Product B', 29.99), 
            (8003, 'Product C', 39.99), 
            (8004, 'Product D', 49.99);`;
const createTableQueryOld = 'CREATE TABLE TEST_ORDER_123 (order_id INT AUTOINCREMENT, customer_id INT, product_name VARCHAR(255), price DECIMAL(10, 2));';
const insertDataQueryOld = 'INSERT INTO TEST_ORDER_123 (customer_id) VALUES (9001);';

export default {
    viewQuery,
    viewSimpleQuery,
    viewGroupByQuery,
    createTableQuery,
    insertDataQuery,
    createTableQueryOld,
    insertDataQueryOld,
};