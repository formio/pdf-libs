'use strict';

/* eslint-disable no-console */

require('dotenv').config();
const superagent = require('superagent');

// Config
const apiUrl = `http://localhost:${process.env.PORT}`;
const requestsCount = 500;
const pdfPath = 'C:\\Users\\Aliaksei.Nikipelau\\Desktop\\pdfs\\fw4.pdf';

const requests = [];
const times = [];
for (let reqNumber = 1; reqNumber <= requestsCount; reqNumber += 1) {
  requests.push(
    (async () => {
      console.log(`Sending request number ${reqNumber}`);
      const startTime = Date.now();

      const response = await superagent
        .post(apiUrl)
        .set('Content-Type', 'multipart/form-data')
        .attach('pdf', pdfPath);

      console.log(`Request number ${reqNumber} received`);
      const elapsedTime = Date.now() - startTime;
      times.push(elapsedTime);
      console.log(`${reqNumber}:${elapsedTime / 1000}s`);

      return typeof response;
    })()
  );
}

Promise.all(requests)
  .then((res) => {
    console.log(`Sended: ${requestsCount}`);
    console.log(`Received: ${res.length}`);
    console.log(`Loss: ${((requestsCount - res.length) / requestsCount) * 100}%`);

    const avgTime = times.reduce((t1, t2) => t1 + t2, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    console.log(`Average time: ${avgTime / 1000}s`);
    console.log(`Min time: ${minTime / 1000}s`);
    console.log(`Max time: ${maxTime / 1000}s`);

    // console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
