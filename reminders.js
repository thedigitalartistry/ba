const functions = require("@google-cloud/functions-framework");
// Import necessary libraries
const axios = require("axios");
const moment = require("moment");
const twilio = require("twilio");
require("dotenv").config();

// Function to process each form response
async function processFormResponses() {
  try {
    // Fetch form responses from Webflow API
    let counter_active_users = 0;
    let offset = 0;
    let submissions = [];
    const forms = [
      "65b9528e143d975f4ff59ac6",
      "665a17750afdfeb7504f3128",
      "665a17750afdfeb7504f3139",
    ];

    for (const form_id of forms) {
      offset = 0;
      while (true) {
        console.log("Fetching submissions for form: " + form_id);
        const response = await axios.get(
          "https://api.webflow.com/v2/forms/" +
            form_id +
            "/submissions?limit=100&offset=" +
            offset,
          {
            headers: {
              Authorization: "Bearer " + process.env.WEBFLOW_API_KEY,
            },
          }
        );

        const pagination = response.data.pagination;
        offset += pagination.limit;

        if (response.data.formSubmissions.length == 0) {
          break;
        }

        submissions = submissions.concat(response.data.formSubmissions);
      }
    }

    console.log("Number of submissions: " + submissions.length);
    const now = moment();

    // Process each form submission
    submissions.forEach(async (submission) => {
      const submitted = moment(submission.dateSubmitted).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );

      const days_diff = now.diff(submitted, "days");
      if (days_diff == 31) {
        await sendConfirmationEmail(submission);
        return;
      }

      if (days_diff > 30) {
        return;
      }
      counter_active_users++;
      // Get the selected time from the form submission
      // let submission = formSubmissions[2];

      const selectedTime = submission.formResponse.time;
      const phone =
      submission.formResponse.phone ??
      submission.formResponse["Phone number (For text notifications．)"];
      const email = submission.formResponse.Email;
      const timezone = submission.formResponse.timezone;

      // Schedule a reminder using Twilio API
      try {
        await scheduleReminder(selectedTime, timezone, phone, days_diff, email);
      } catch (error) {}
    });

    // update zapier counter
    await axios.post(
      "https://store.zapier.com/api/records?secret=72745ce5-710e-450f-be72-3b0523cb0106",
      {
        active_users: counter_active_users,
      }
    );

    console.log("All form responses processed successfully.");
  } catch (error) {
    console.error("Error processing form responses:", error);
  }
}

// Function to schedule a reminder using Twilio API
async function scheduleReminder(time, timezone, phone, days_diff, email) {
  try {
    // Create a Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Format the time using Moment.js
    const formattedTime = moment()
      .add(1, "days")
      .hours(parseInt(time.split(":")[0]) + parseInt(timezone) * -1)
      .minutes(parseInt(time.split(":")[1]))
      .subtract(2, "minutes")
      .seconds(0)
      .toISOString();
    console.log("====================================");
    console.log(time, timezone, formattedTime);
    console.log("====================================");

    // // Schedule a reminder SMS
    await client.messages.create({
      body:
        "Get ready! Your B'Shaa Achas Torah minute is approaching in 2 minutes at " +
        time +
        ". 🌟 #TorahEveryMinute\n\nReply STOP to unsubscribe",
      messagingServiceSid: "MG079dbf917872ef9ce0191f67715a86a0",
      sendAt: formattedTime,
      scheduleType: "fixed",
      to: phone,
    });

    // sendReminderEmail(email, time, formattedTime, days_diff);

    console.log("Reminder scheduled successfully.");
  } catch (error) {
    console.error("Error scheduling reminder:", error);
  }
}

function sendReminderEmail(email, time, formattedTime, days_diff) {
  // send email with mailchimp
  const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
    process.env.MAILCHIMP_API_KEY
  );

  const template = days_diff <= 1 ? "reminder" : "reminder_2";

  const run = async () => {
    const response = await mailchimpClient.messages.sendTemplate({
      template_name: template,
      template_content: [{}],
      message: {
        to: [
          {
            email: email,
            type: "to",
          },
        ],
        subject: "Your B'Shaa Achas minute begins now!",
        text: "Your B'Shaa Achas minute begins now! ",
        from_email: "no-reply@bshaaachas.com",
      },
      send_at: formattedTime,
    });
    console.log(response);
  };

  run();
}

// Function to send a confirmation email using Postmark API
async function sendConfirmationEmail(submission) {
  try {
    const submitted = moment(submission.dateSubmitted).format(
      "YYYY-MM-DDTHH:mm:ssZ"
    );
    const now = moment();

    if (now.diff(submitted, "days") < 30) {
      return;
    }

    const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
      process.env.MAILCHIMP_API_KEY
    );

    const email = submission.formResponse.Email;

    const run = async () => {
      const response = await mailchimpClient.messages.sendTemplate({
        template_name: "completed",
        template_content: [{}],
        message: {
          to: [
            {
              email: email,
              type: "to",
            },
          ],
          subject: "Congrats on completing a full month of Torah Learning!",
          text: "Congrats on completing a full month of Torah Learning! ",
          from_email: "no-reply@bshaaachas.com",
        },
      });
      console.log(response);
    };

    run();
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent("reminderSub", (cloudEvent) => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  processFormResponses();
});
