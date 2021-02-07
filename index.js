const axios = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

let latestLiveTime = new Date();

app.get("/", (req, res) => {
  const offset = new Date().getTimezoneOffset() + 420;
  const time = new Date(latestLiveTime.getTime() + offset * 60000);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`${latestLiveTime.getTime()}<br/><br/>`);
  res.write(`${latestLiveTime.toString()}<br/><br/>`);
  res.write(`${format(time)} GMT+7<br/><br/><br/><br/>`);
  res.write(`Updated at: 20:41 08/12/2020`);
  res.end();
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

setInterval(() => {
  axios({
    method: "get",
    url: "https://youtuberealtimeview001.herokuapp.com/",
  })
    .then(() => {
      latestLiveTime = new Date();
    })
    .catch((err) => console.log(err));
}, 1000 * 60 * 5);

const format = (time) => {
  const hours = `0${time.getHours()}`.slice(-2);
  const minutes = `0${time.getMinutes()}`.slice(-2);
  const seconds = `0${time.getSeconds()}`.slice(-2);

  const date = `0${time.getDate()}`.slice(-2);
  const month = `0${time.getMonth() + 1}`.slice(-2);
  const year = time.getFullYear();

  return `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
};
