const express = require("express");
const TrackingService = require("./tracking-service");
const trackingRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

trackingRouter.route("/api/tracking/:tracking_date").get((req, res, next) => {
  const knex = req.app.get("db");
  const date = req.params.tracking_date;
  TrackingService.getTracking(knex, date);
});
//post to new day
trackingRouter
  .route("/api/tracking/:tracking_date")
  .post(jsonBodyParser, (req, res, next) => {
    const tracking_date = this.params.tracking_date;
    const { user_id, rhr, mhr, bps, bpd, bls, 
      ins, lbs, cal, fat, car, fib, pro, stp, 
      slp, act, men, dia } = req.body;
    const stats = {
      tracking_date,
      user_id,
      rhr, // resting heart rate
      mhr, // max heart rate
      bps, // systolic blood pressure
      bpd, // diastolic blood pressure
      bls, // blood sugar
      ins, // height in inches
      lbs, // weight in inches
      cal, // calories consumed
      fat, // fat consumed
      car, // carbohydrates consumed
      fib, // fiber consumed
      pro, // protein consumed
      stp, // steps for the day
      slp, // sleep in minutes
      act, // activities
      men, // mental/emotional/physical state
      dia  // diary of day 
    }
    TrackingService.postTracking(knex, stats)
  });
  //update current or past day
  trackingRouter.route("/api/tracking/:tracking_date").patch((req,res,next) => {
    const tracking_date = this.params.tracking_date;
    const { user_id, rhr, mhr, bps, bpd, bls, 
      ins, lbs, cal, fat, car, fib, pro, stp, 
      slp, act, men, dia } = req.body;
    const stats = { tracking_date, user_id, rhr, 
      mhr, bps, bpd, bls, ins, lbs, cal, fat, 
      car, fib, pro, stp, slp, act, men, dia };
    TrackingService.trackingUpdate(knex, stats)
  })
  