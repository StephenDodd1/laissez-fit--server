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
    describe("Users endpoints", () => {
      it("Delete user deletes user", () => {
        return supertest(app).delete("/api/users/1").expect(200);
      }),
        it("Login returns JWT Key", () => {
          const cred = "user2:def";
          return supertest(app)
            .post("/api/user")
            .auth(cred, { type: "basic" })
            .expect(202);
        }),
        it("Create user creates a user", () => {
          const user = {
            email: "user@user.com",
            username: "user4",
            password: "jkl",
            name: "user",
            dob: "01/01/1901",
          };
          return supertest(app).post("/api/users").send(user).expect(200);
        });
    }),
    describe("Tracking endpoints", () => {
      it("get an entry", () => {
        return supertest(app).get("/api/tracking/3/2020-08-27").expect(200);
      }),
        it("delete an entry", () => {
          const data = {
            tracking_id: 1,
          };
          return supertest(app)
            .delete("/api/tracking/3/2020-08-27")
            .send(data)
            .expect(200);
        }),
        it("post new data to all boxes", () => {
          const data = {
            slp: "456",
            men: "testi",
            act: "made some tests",
            stp: "204",
            dia: "I updated tests today for my code.",
            cal: "3456",
            fat: "56",
            car: "123",
            fib: "12",
            pro: "89",
            rhr: "78",
            mhr: "89",
            bps: "90",
            bpd: "89",
            bls: "90",
            lbs: "123",
            ins: "78",
          };
          return supertest(app)
            .post("/api/tracking/3/2020-08-25")
            .send(data)
            .expect(200);
        }),
        it("patch new data to all boxes", () => {
          const data = {
            tracking_id: "2",
            slp: "456",
            men: "testi",
            act: "made some tests",
            stp: "204",
            dia: "I updated tests today for my code.",
            cal: "3456",
            fat: "56",
            car: "123",
            fib: "12",
            pro: "89",
            rhr: "78",
            mhr: "89",
            bps: "90",
            bpd: "89",
            bls: "90",
            lbs: "123",
            ins: "78",
          };
          return supertest(app)
            .patch("/api/tracking/3/2020-08-27")
            .send(data)
            .expect(200);
        }),
    }),
    after("disconnect from db", () => db.destroy());
});
