const express = require("express");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const createAuthToken = require("./auth-token");

usersRouter.route("/api/user").post(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const authToken = req.get("Authorization") || "";
  let basicToken;
  if (!authToken.toLowerCase().startsWith("basic")) {
    return res.status(401).json({ error: "Missing basic token" });
  } else {
    basicToken = authToken.slice(6, authToken.length /*indexOf(",")*/);
  }
  const [tokenUsername, tokenPassword] = Buffer.from(basicToken, "base64")
    .toString()
    .split(":");
  if (!tokenUsername || !tokenPassword) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }
  UsersService.authenticateUser(knex, tokenUsername)
    .then((user) => {
      if (!user || user.password !== tokenPassword) {
        return res.status(401).json({ error: "Unauthorized request" });
      } else {
        const jwtToken = createAuthToken(user);
        const data = { jwtToken, user };
        return res.status(202).json({ data });
      }
    })
    .catch(next);
});

usersRouter.route("/api/users").post(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const { email, username, password, name, dob } = req.body;
  const newUser = {
    email,
    username,
    password,
    name,
    dob,
  };
  UsersService.createUser(knex, newUser)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: { message: "user was not created" },
        });
      }
      return res.status(200).json()
    })
    .catch(next);
});

usersRouter.route("/api/users/:user_id").delete((req,res,next) => {
  const knex = req.app.get('db');
  const user_id = req.params.user_id;
  UsersService.deleteUser(knex, user_id)
  .then(user => {
    return res.status(200).json()
  })
})
module.exports = usersRouter;
