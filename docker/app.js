const express = require('express');
const appRouter = require('./src/router.js');

const app = express();

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


app.get("/api/health", (req, res) => {
  res.sendStatus(200);
});

appRouter(app);
