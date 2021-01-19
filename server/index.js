const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { readData, writeData } = require('./utils');

const port = 4321;
const hostname = 'localhost';

let sessions = [];

app.use(bodyParser.json());

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware для логирования запросов
app.use((request, response, next) => {
  console.log(new Date().toISOString(), request.method, request.originalUrl);
  next();
});

// Middleware для правильного представления request.body
app.use(express.json());

// ----------- Роуты ----------------

app.options('/', (request, response) => {
  response.statusCode = 200;
  response.send('OK');
});

app.get('/sessions', async (request, response) => {
  sessions = await readData();
  response.setHeader('Content-Type', 'application/json');
  response.json(sessions);
});

app.post('/sessions', async (request, response) => {
  sessions.push(request.body);
  await writeData(sessions);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Tasklist '${request.body.name}' was successfully added`,
  });
});

app.post('/sessions/:sessionId/bookings', async (request, response) => {
  const { row, number } = request.body;
  const sessionId = Number(request.params.sessionId);

  sessions[sessionId].bookings.push({ row, number });
  await writeData(sessions);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: sessions[sessionId],
  });
});

app.patch('/sessions/:sessionId', async (request, response) => {
  const { newName, newTime } = request.body;
  const sessionId = Number(request.params.sessionId);

  sessions[sessionId].name = newName;
  sessions[sessionId].time = newTime;

  await writeData(sessions);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: sessions[sessionId],
  });
});

app.delete('/sessions/:sessionId', async (request, response) => {
  const sessionId = Number(request.params.sessionId);

  sessions = sessions.filter((session, index) => index !== sessionId);
  await writeData(sessions);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({ info: sessionId });
});

app.delete(
  '/sessions/:sessionId/bookings/:bookingId',
  async (request, response) => {
    const sessionId = Number(request.params.sessionId);
    const bookingId = Number(request.params.bookingId);

    const removedBooking = sessions[sessionId].bookings[bookingId];
    sessions[sessionId].bookings = sessions[sessionId].bookings.filter(
      (task, index) => index !== bookingId
    );
    await writeData(sessions);

    response.setHeader('Content-Type', 'application/json');
    response
      .status(200)
      .json({ info: `Client '${removedBooking}' was successfully deleted` });
  }
);

app.listen(port, hostname, (err) => {
  if (err) {
    console.log('Error: ', err);
  }

  console.log(`server is working on ${hostname}:${port}`);
});
