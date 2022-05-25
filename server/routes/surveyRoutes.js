const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");
const authenticated = require("../middlewares/Authentication");
const requireCredit = require("../middlewares/requireCredit");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// response on the survey after creating survey ...
router.get("/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for Voting !");
});

// Get User Surveys ....
router.get("/surveys", authenticated, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });
  res.send(surveys);
});

// Sendgrid Webhook ...
router.post("/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })

    .value();
  res.send({});
});
// creating (Sending ) Survey ...
router.post("/surveys", authenticated, requireCredit, async (req, res) => {
  const { title, body, subject, recipients } = req.body;
  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(",").map((email) => ({
      email,
    })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // Send An Email to user when survey is created !
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    console.log("** Error ** :", err);
    res.status(422).send(err);
  }
});

module.exports = router;
