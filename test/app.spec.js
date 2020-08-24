const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const config = require("../src/config");
const knex = require("knex");

describe("App", () => {
  let db;
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  }),
    before("make knex instance", () => {
      db = knex({
        client: "pg",
        connection: config.DATABASE_URL_TEST,
      });
      app.set("db", db);
    }),
    it("Login returns JWT Key", () => {
      const cred = 'user1:abc'
      return supertest(app)
        .post("/api/user")
        .auth(cred, { type: "basic" })
        .expect(202);
    });
});
