const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
require("dotenv").config();

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false })
      .sort({ dateSent: "desc" });

    res.send(surveys);
  });

  app.get("/api/survey/:surveyId/:choice", (req, res) => {
    res.send("Thanks for your feedback");
  });

  app.post("/api/survey/webhooks", (req, res) => {
    // Events processing pipeline
    const pattern = new Path("/api/survey/:surveyId/:choice");
    const events = _.chain(req.body)
      // Filtering only click events
      .filter(({ event }) => event === "click")
      // Extracting the data from the events and making it into an object
      .map(({ email, url }) => {
        const match = pattern.test(new URL(url).pathname);
        // console.log(match);
        // Output: { surveyId: '63d96924ff', choice: 'yes' }
        if (match) return { email, ...match };
      })
      // Removing all null/undefined values
      .compact()
      // Removing duplicate events
      .uniqBy("email", "surveyId")
      // Running a query on database to update survey
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, clicked: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.clicked": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: new Date(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
