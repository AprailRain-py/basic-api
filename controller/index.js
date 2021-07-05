const moment = require("moment");
const Ajv = require("ajv");
const ajv = new Ajv();
const mainsSchema = require("../schema");
const redisClient = require("../service/redis");

exports.helloFn = async (req, res, next) => {
  try {
    const valid = ajv.validate(mainsSchema.userSchema, req.body);
    if (!valid) {
      return res.status(400).send(ajv.errors);
    }

    // destructure create user name from request
    const { userName, dateOfBirth } = req.body;

    // inset in db
    await redisClient.set(
      `${userName}`,
      JSON.stringify({ user: userName, dob: dateOfBirth })
    );

    res.status(200).send({ userName, dateOfBirth });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.wishBirthDay = async (req, res, next) => {
  // create user name from request
  const userName = req.query.userName;

  // get from  db
  const resp = await redisClient.get(userName);

  const { dob } = JSON.parse(resp);
  const userDOB = moment(dob).format("YYYY-MM-DD");
  const today = moment(Date.now()).format("YYYY-MM-DD");
  let days;

  let wishBirthDay;
  switch (true) {
    case userDOB === today:
      wishBirthDay = `Hello ${userName}, Happy Birthday!`;
      break;
    default:
      days = userDOB.diff(today, "days");
      wishBirthDay = `Hello ${userName}, Your birthday is in ${days} days(s)`;
      break;
  }
  res.status(200).send(wishBirthDay);
};
