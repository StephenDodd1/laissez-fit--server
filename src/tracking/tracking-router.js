const express = require("express");
const TrackingService = require("./tracking-service");
const trackingRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

trackingRouter.route("/api/tracking/:user_id/:tracking_date").get((req, res, next) => {
  const knex = req.app.get("db");
  const date = req.params.tracking_date.toString();
  console.log(date)
  const user_id = req.params.user_id;
  TrackingService.getTrackingByDate(knex, date, user_id)
  .then(tracking => {
    if(!tracking[0]) {
      console.log(tracking)
      return res.status(404).json({
        error: { message: "Tracking not available" }
      })
    }
    console.log(tracking)
    return res.status(200).json(tracking)
  })
  .catch(next)
});
//post to new day
trackingRouter
  .route("/api/tracking/:user_id/:tracking_date")
  .post(jsonBodyParser, (req, res, next) => {
    const knex = req.app.get('db')
    const user_id = req.params.user_id
    const tracking_date = req.params.tracking_date;
    const { rhr, mhr, bps, bpd, bls, 
      ins, lbs, cal, fat, car, fib, pro, stp, 
      slp, act, men, dia } = req.body;
    const data = {
      tracking_date,
      user_id,
      rhr, // resting heart rate
      mhr, // max heart rate
      bps, // systolic blood pressure
      bpd, // diastolic blood pressure
      bls, // blood sugar
      ins, // height in inches
      lbs, // weight in pounds
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
    const dataArr = Object.keys(data)
    const filteredArr = dataArr.filter((stat, i) => data[stat] != "" && data[stat] != undefined)
    const updated = {};
    for(let i = 0; i<filteredArr.length; i++){
      updated[filteredArr[i]] = data[filteredArr[i]]
    }
    console.log('******',Object.keys(updated))
    if(Object.values(updated).length < 3){
      console.log(Object.values(updated))
      return status(204).json({
        error: { message: "No data in tracking form"}
      })
    }
    TrackingService.createTrackingByDate(knex, updated)
      .then(tracking => {
      if(!tracking) {
        console.log('tracking not found', tracking)
        return res.status(204).json({
          error: { message: "Tracking not available" }
        })
      }
      console.log(tracking)
      return res.status(200).json(tracking)
    })
    .catch(next)
  });
  //update current or past day
  trackingRouter.route("/api/tracking/:user_id/:tracking_date").patch(jsonBodyParser, (req,res,next) => {
    const knex = req.app.get('db');
    const { tracking_id, rhr, mhr, bps, bpd, bls, 
      ins, lbs, cal, fat, car, fib, pro, stp, 
      slp, act, men, dia } = req.body;
    const trackingId = tracking_id;
    const data = { rhr, mhr, bps, bpd, bls, 
      ins, lbs, cal, fat, car, fib, pro,
      stp, slp, act, men, dia 
    };
    console.log(data)
    const dataArr = Object.keys(data)
    const filteredArr = dataArr.filter((stat, i) => data[stat] != null && data[stat] != "")
    const updated = {};
    for(let i = 0; i<filteredArr.length; i++){
      updated[filteredArr[i]] = data[filteredArr[i]]
    }
    TrackingService.updateTrackingByDate(knex, trackingId, updated)
    .then(tracking => {
      if(!tracking) {
        return res.status(204).json({
          error: { message: "Tracking not available" }
        })
      }
      return res.status(200).json(tracking)
    })
    .catch(next)
  }),
  trackingRouter.route("/api/tracking/:user_id/:tracking_date").delete(jsonBodyParser, (req,res,next) => {
    const knex = req.app.get('db');
    const tracking_id = req.body.tracking_id;
    console.log('trackingId is: ', tracking_id)
    TrackingService.deleteTrackingById(knex, tracking_id)
    .then(item => {
      return res.status(200).json(item)
    })
  .catch(next)
  })
  module.exports = trackingRouter;