const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const invoiceRoutes = require('./routes/invoiceRoutes');
const formPostsRoutes = require("./routes/formPostsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const regulatoryUpdateRoutes = require("./routes/regulatoryUpdateRoutes");
const errorHandler = require("./middleware/errorHandler");
const queriesRoutes = require("./routes/queriesRoutes")
const http = require('http');
const initializeWebSocket = require('./socket');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/form-posts', formPostsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/query', queriesRoutes);
app.use('/api/regulatory-updates', regulatoryUpdateRoutes);

const server = http.createServer(app);

// Initialize WebSocket server
const io = initializeWebSocket(server);

// Error handling middleware
app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
