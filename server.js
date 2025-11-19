require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const nocache = require('nocache');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

// Middleware to remove all caching headers and add Pragma
app.use((req, res, next) => {
  res.setHeader('Pragma', 'no-cache');
  
  res.removeHeader = function(name) {
    delete this._headers[name.toLowerCase()];
    return this;
  };
  
  const originalSend = res.send;
  const originalSendFile = res.sendFile;
  const originalJson = res.json;
  
  res.send = function(...args) {
    res.removeHeader('ETag');
    res.removeHeader('Last-Modified');
    return originalSend.apply(res, args);
  };
  
  res.sendFile = function(...args) {
    const options = args[1] || {};
    options.etag = false;
    options.lastModified = false;
    options.cacheControl = false;
    args[1] = options;
    
    const callback = args[2] || function(err) {
      if (err) next(err);
    };
    args[2] = function(err) {
      res.removeHeader('ETag');
      res.removeHeader('Last-Modified');
      callback(err);
    };
    
    return originalSendFile.apply(res, args);
  };
  
  res.json = function(...args) {
    res.removeHeader('ETag');
    res.removeHeader('Last-Modified');
    return originalJson.apply(res, args);
  };
  
  next();
});

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));
app.use(nocache());

app.set('etag', false);

app.use('/public', express.static(process.cwd() + '/public', {
  etag: false,
  lastModified: false,
  cacheControl: false
}));
app.use('/assets', express.static(process.cwd() + '/assets', {
  etag: false,
  lastModified: false,
  cacheControl: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 5000;

// Set up server and tests
const server = app.listen(portNum, '0.0.0.0', () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Initialize Socket.IO
const io = socket(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

module.exports = app; // For testing
