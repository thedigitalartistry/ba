const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

require("dotenv").config();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/minutes", (req, res) => {
  // get current user timezone
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  console.log(timeZone);

  //   res.send(timeZone);
  //   return;
  // Use JotForm API to retrieve submissions
  // Replace YOUR_JOTFORM_API_KEY with your actual JotForm API key
  const jotformApiKey = process.env.JOTFORM_API_KEY;
  const jotformFormId = "233396772484065";

  // Make a request to JotForm API to get submissions
  // You can use any HTTP library of your choice, such as axios or node-fetch
  // Here's an example using axios:
  axios
    .get(`https://api.jotform.com/form/${jotformFormId}/submissions`, {
      headers: {
        APIKEY: jotformApiKey,
      },
    })
    .then((response) => {
      // Extract the submission data from the response
      const submissions = response.data.content;

      // Display the submission data on the screen
      res.send(submissions.map((submission) => submission.answers));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving submissions");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
