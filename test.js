const axios = require("axios");
const twilio = require("twilio");
const moment = require("moment");
require("dotenv").config();

async function test() {
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

        console.log(
          "Number of submissions: " + response.data.formSubmissions.length
        );
        if (response.data.formSubmissions.length == 0) {
          break;
        }

        submissions = submissions.concat(response.data.formSubmissions);
      }
    }

    console.log("Number of submissions: " + submissions.length);

    // Extract form submissions
    const now = moment();

    // Process each form submission
    submissions.forEach(async (submission) => {
      const submitted = moment(submission.dateSubmitted).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      const email = submission.formResponse.Email;
      const time = submission.formResponse.time;
      const timezone = submission.formResponse.timezone;

      const days_diff = now.diff(submitted, "days");
      if (days_diff > 30) {
        console.log(
          "Days diff is greater than 30 for " +
            email +
            " days_diff: " +
            days_diff
        );
        return;
      }

      const phone =
        submission.formResponse.phone ??
        submission.formResponse["Phone number (For text notifications．)"];
      // console.log("****************************************");
      // console.log(email + " " + days_diff + " " + time + " " + timezone);
      console.log(email + " " + days_diff);
      // console.log("****************************************");
    });
  } catch (error) {
    console.error(error);
  }
}

test().then(() => {
  console.log("Test completed");
});
