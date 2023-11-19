const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const cartAndCartItemsScript = `
  INSERT INTO carts (id, user_id, created_at, updated_at, status)
  VALUES
    ('fcc6dcc0-a634-4df5-a236-a74d7c8da225', 'e35aa9db-6e6e-4d07-af3e-336b5cfbe1e1', '2023-10-24', '2023-10-24', 'OPEN'),
    ('4ea16b44-db80-416f-8958-94c81b6474a7', 'e35aa9db-6e6e-4d07-af3e-336b5cfbe1e1', '2023-10-23', '2023-10-23', 'OPEN'),
    ('15cbe7aa-4189-42ba-b4fe-836c1bf443cc', 'f00f0121-7c00-4d20-8f01-2071e991bf5e', '2023-10-22', '2023-10-22', 'ORDERED'),
    ('78d03dc7-d29c-4a62-91e9-d3c172462c1f', 'f00f0121-7c00-4d20-8f01-2071e991bf5e', '2023-10-21', '2023-10-21', 'OPEN'),
    ('8e295ada-0f4c-4fd8-a155-ac22a3497d6f', 'a152a4ea-3e08-4d5d-8a5d-50e86d45a021', '2023-10-20', '2023-10-20', 'ORDERED'),
    ('64e1dab3-7a60-46e6-8b03-2e1f17e3bb40', 'a152a4ea-3e08-4d5d-8a5d-50e86d45a021', '2023-10-19', '2023-10-19', 'OPEN'),
    ('a72f0972-64b3-4c70-bff7-179c753d2b35', '8b7b0e7e-ff13-4eef-9ce4-80e7efcf741b', '2023-10-18', '2023-10-18', 'OPEN'),
    ('94354c25-6eb7-47cc-8c3c-38f3c0b07a79', '8b7b0e7e-ff13-4eef-9ce4-80e7efcf741b', '2023-10-17', '2023-10-17', 'ORDERED'),
    ('017b5b6e-509e-43c5-9f5a-e8a2bb19ce97', 'd5ce4c10-9e35-40d7-9326-1aa21f3c6eb8', '2023-10-16', '2023-10-16', 'OPEN'),
    ('db6b26b1-c4ce-462c-8b0a-22b4bf42f2b0', 'd5ce4c10-9e35-40d7-9326-1aa21f3c6eb8', '2023-10-15', '2023-10-15', 'ORDERED');

  INSERT INTO cart_items (cart_id, product_id, count)
  VALUES
    ('fcc6dcc0-a634-4df5-a236-a74d7c8da225', '11111112-1122-3332-4455-333333333333', 1),
    ('4ea16b44-db80-416f-8958-94c81b6474a7', '11111113-1122-3332-4455-333333333333', 2),
    ('15cbe7aa-4189-42ba-b4fe-836c1bf443cc', '11111114-1122-3332-4455-333333333333', 3),
    ('78d03dc7-d29c-4a62-91e9-d3c172462c1f', '11111115-1122-3332-4455-333333333333', 4),
    ('8e295ada-0f4c-4fd8-a155-ac22a3497d6f', '11111116-1122-3332-4455-333333333333', 5),
    ('64e1dab3-7a60-46e6-8b03-2e1f17e3bb40', '11111117-1122-3332-4455-333333333333', 6),
    ('a72f0972-64b3-4c70-bff7-179c753d2b35', '11111118-1122-3332-4455-333333333333', 7),
    ('94354c25-6eb7-47cc-8c3c-38f3c0b07a79', '11111110-1122-3332-4455-333333333333', 8),
    ('017b5b6e-509e-43c5-9f5a-e8a2bb19ce97', '11111119-1122-3332-4455-333333333333', 9),
    ('db6b26b1-c4ce-462c-8b0a-22b4bf42f2b0', '11111132-1122-3332-4455-333333333333', 10);
`;

async function initializeDatabase() {
  console.log("🚀 ~ file: feed.js:38 ~ initializeDatabase ~ process.env.DB_USER:", process.env.DB_USER)

  const client = new Client({
    user: process.env.DB_USER || 'your_username',
    host: process.env.HOST || 'localhost',
    database: process.env.DB_NAME || 'your_database_name',
    password: process.env.DB_PASS || 'your_password',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();

    await client.query(cartAndCartItemsScript);

    console.log('Test data inserted successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await client.end();
    console.log('Database connection closed')}}


    initializeDatabase()