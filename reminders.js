// Import necessary libraries
const axios = require("axios");
const moment = require("moment");
const twilio = require("twilio");
const postmark = require("postmark");
require("dotenv").config();

// Function to process each form response
async function processFormResponses() {
  try {
    // Fetch form responses from Webflow API
    const response = await axios.get(
      "https://api.webflow.com/v2/forms/65b9528e143d975f4ff59ac6/submissions",
      {
        headers: {
          Authorization: "Bearer " + process.env.WEBFLOW_API_KEY,
        },
      }
    );

    // Extract form submissions
    const formSubmissions = response.data.formSubmissions;

    // Process each form submission
    formSubmissions.forEach(async (submission) => {
      // Get the selected time from the form submission
      // let submission = formSubmissions[2];

      const selectedTime = submission.formResponse.time;
      const phone = submission.formResponse.phone;
      const email = submission.formResponse.Email;
      const timezone = submission.formResponse.timezone;

      // Schedule a reminder using Twilio API
      try {
        await scheduleReminder(selectedTime, timezone, phone);
      } catch (error) {}

      // Send a confirmation email using Postmark API
      await sendConfirmationEmail(submission);
    });

    console.log("All form responses processed successfully.");
  } catch (error) {
    console.error("Error processing form responses:", error);
  }
}

// Function to schedule a reminder using Twilio API
async function scheduleReminder(time, timezone, phone) {
  try {
    // Create a Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Format the time using Moment.js
    const formattedTime = moment()
      .utc()
      .add(1, "days")
      .hours(parseInt(time.split(":")[0]) + parseInt(timezone))
      .minutes(parseInt(time.split(":")[1]))
      .subtract(5, "minutes")
      .seconds(0)
      .format("YYYY-MM-DDTHH:mm:ssZ");
    console.log("====================================");
    console.log(time, timezone, formattedTime);
    console.log("====================================");

    // // Schedule a reminder SMS
    await client.messages.create({
      body:
        "Get ready! Your sacred Torah minute is approaching with B’Shaa Achas. Prepare to embrace wisdom in 60 seconds at " +
        time +
        ". 🌟 #TorahEveryMinute",
      messagingServiceSid: "MGfe010ecd12145dfa1483af92c7e3a1e2",
      sendAt: formattedTime,
      scheduleType: "fixed",
      to: phone,
    });

    console.log("Reminder scheduled successfully.");
  } catch (error) {
    console.error("Error scheduling reminder:", error);
  }
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

    // Create a Postmark client
    const client = new postmark.ServerClient("YOUR_POSTMARK_API_TOKEN");

    // Send a confirmation email
    await client.sendEmail({
      From: "YOUR_EMAIL_ADDRESS",
      To: email,
      Subject: "Confirmation Email",
      TextBody: "Thank you for submitting the form.",
    });

    console.log("Confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

// Call the function to process form responses
processFormResponses();
