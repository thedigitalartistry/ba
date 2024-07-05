const axios = require("axios");
const twilio = require("twilio");
const moment = require("moment");
require("dotenv").config();

async function test() {
  var worldData = [];
  var respone = await fetch(
    "https://store.zapier.com/api/records?secret=13e5804f-c4a4-446d-84d8-17b5c3415054",
    {
      method: "GET",
    }
  );
  var data = await respone.json();

  data.earthDate.list.map((item) => {
    try {
      var item_parsed = JSON.parse(item);
      var index = worldData.findIndex((x) => {
        return x.long == item_parsed.long && x.lat == item_parsed.lat;
      });
      if (index !== -1) {
        var item_existing = worldData[index];
        item_existing.r += 1;
        worldData[index] = item_existing;
      } else {
        worldData.push(JSON.parse(item));
      }
    } catch (error) {}
  });

  console.log("World data: " + worldData.length);
}

test().then(() => {
  console.log("Test completed");
});
