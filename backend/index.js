import express from "express";
import 'dotenv/config';

const app = express();

// app.use(express.static('dist'));
app.get("/", (req, res) => {
   res.send("Home page");
});

const port = process.env.PORT;
app.listen(port, () => {
   console.log(`Server running on port http://localhost:${port}`);
})