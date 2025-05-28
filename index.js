import express from "express";

const app = express();
const port = 6000;

app.listen(port, () => {
  console.log(`
    Hello there!...
    Server running on port: ${port}
    `);
});
