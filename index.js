import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});