const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies because Express doesn't parse JSON by default
//request body is undefined without this middleware
//resquest.body express by default can't parse json data thats why we need to use this middleware

const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("Note Created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

//can we write something else instead of /notes in app.get in this case?
//yes we can write anything but it should be same in client side also to fetch the data
//so it means both should be same to communicate properly otherwise it will give 404 not found error
//becase server won't be able to find the route
//why the routes should be same in client and server side?
//because the client side is making a request to the server side and the server side is listening for that request on a specific route

app.listen(port, () => {
  console.log(`server is started on http://localhost:${port}`);
});
