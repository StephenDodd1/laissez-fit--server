const express = require("express");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const createAuthToken = require("./auth-token");

usersRouter.route("/api/user").post(jsonBodyParser, (req, res, next) => {
  console.log("route ran")
  const knex = req.app.get('db')
  const authToken = req.get("Authorization") || "";
  console.log("route ran")
  let basicToken;
  if (!authToken.toLowerCase().startsWith("basic")) {
    return res.status(401).json({ error: "Missing basic token" });
  } else {
    basicToken = authToken.slice(6, authToken.length /*indexOf(",")*/);
  }
  console.log(basicToken)
  const [tokenUsername, tokenPassword] = Buffer.from(basicToken, "base64")
    .toString()
    .split(":");
  if (!tokenUsername || !tokenPassword) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }
  UsersService.authenticateUser(knex, tokenUsername, tokenPassword)
    .then((user) => {
      if (!user || user.password !== tokenPassword) {
        return res.status(401).json({ error: "Unauthorized request" });
      } else {const jwtToken = createAuthToken(user);
      const data = {jwtToken, user}
      return res.json({ data })};
    })
    .then((data) => {
      return res.status(202).json(data);
    })
    .catch(next)
});

usersRouter.route("/api/users").post(jsonBodyParser, (req, res, next) => {
  const { email, username, password, name, dob } = req.body;
  const newUser = {
    email,
    username,
    password,
    name,
    dob,
  };
  UsersService.createUser(req.app.get("db"), newUser)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: { message: "user was not created" },
        });
      }
      res.json(user);
    })
    .catch(next);
});
module.exports = usersRouter;