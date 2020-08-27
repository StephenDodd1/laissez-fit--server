const TrackingService = {
  getTrackingByDate(knex, selectedDate, user_id) {
    return knex("tracking")
      .join("users", "tracking.user_id", "=", "users.id")
      .select(
        "tracking.id",
        "tracking_date",
        "user_id",
        "rhr",
        "mhr",
        "bps",
        "bpd",
        "bls",
        "ins",
        "lbs",
        "cal",
        "fat",
        "car",
        "fib",
        "pro",
        "stp",
        "slp",
        "act",
        "men",
        "dia"
      )
      .where("tracking_date", selectedDate)
      .andWhere("users.id", user_id);
  },
  createTrackingByDate(knex, data) {
    console.log("server receives", data)
    return knex.into("tracking").insert(data);
  },
  updateTrackingByDate(knex, tracking_id, data) {
    console.log("server receives ", data);
    return knex("tracking").where("id", "=", tracking_id).update(data);
  },
  deleteTrackingById(knex, tracking_id) {
    console.log('***...tracking_id is:',tracking_id)
    return knex('tracking').where("id", tracking_id).del()
  }
}; /*{ rhr: data.rhr, mhr: data.mhr, bps: data.bps, 
bpd: data.bpd, bls: data.bls, ins: data.ins, 
lbs: data.lbs, cal: data.cal, fat: data.fat, 
car: data.car, fib: data.fib, pro: data.pro, 
stp: data.stp, slp: data.slp, act: data.act, 
men: data.men, dia: data.dia
}*/
module.exports = TrackingService;
