import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

const formatter = new Intl.DateTimeFormat("en-us", {
  month: "short",
  year: "numeric",
});

const blogs = [
  {
    title: "One Step Forward",
    leadInText:
      "Accepting the reality; your skill sets are not in demand right now, and it's time for new skills.",
    date: formatter.format(new Date(2024, 10)),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Stuck in a Rut",
    leadInText:
      "What is it like losing your income, but your rent and utilities still goes on.",
    date: formatter.format(new Date(2024, 3)),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "4 Years in Fortune 500 Company",
    leadInText: "It's good money, but is it happy soul?",
    date: formatter.format(new Date(2023, 7)),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "3 Years in Fortune 500 Company",
    leadInText:
      "The higher you go, the heavier your responsibilities. You wonder, how long can you carry this load?",
    date: formatter.format(new Date(2022, 7)),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "2 Years in Fortune 500 Company",
    leadInText:
      "Finally you able to catch your breath, but you know your respite is temporary.",
    date: formatter.format(new Date(2021, 7)),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

var opts = {
  blogs: blogs,
  isAuth: false,
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("home.ejs", opts);
});

app.get("/write", (req, res) => {
  res.render("write.ejs", opts);
});

app.post("/write", (req, res) => {
  const body = req.body;

  // Check if values in body are empty. Return true if even 1 data is missing.
  const isEmpty = Object.values(body).some((value) => {
    return value === "" || value === null || value === undefined;
  });

  if (isEmpty) {
    res.status(400).send("Request body is missing one (or more) data");
  } else {
    blogs.unshift({
      title: body.title,
      leadInText: body.leadInText,
      date: formatter.format(new Date()),
      body: body.body,
    });

    res.render("home.ejs", opts);
  }
});

app.get("/blog/:id", (req, res) => {
  res.render("blog.ejs", { blog: blogs[req.params.id], isAuth: opts.isAuth });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  if (
    req.body["email"] == "writer@myblog.xyz" &&
    req.body["password"] == "password"
  ) {
    opts.isAuth = true;
  }

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  opts.isAuth = false;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
