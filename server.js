const app = require('./app');

const port = 8000;

// START SERVER
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
