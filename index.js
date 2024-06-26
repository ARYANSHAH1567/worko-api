const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./src/config/dbConfig');

connectDB(); // Ensure database is connected before starting the server

const app = require('./src');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
