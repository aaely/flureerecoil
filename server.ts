//const io = require('socket.io');
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
//const process = require('process');
const http = require("http");
const { send } = require('process');
const cookieSession = require('cookie-session');
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;  // switch out to xhr2 https://stackoverflow.com/questions/32604460/xmlhttprequest-module-not-defined-found/46081151#46081151
global.WebSocket = require('ws');  // https://flaviocopes.com/node-websockets/
require('@fluree/flureenjs');
//require('./Services/passport-google/googlePassport')
require('./spotifyStrategy')



const server = express();
const PORT = 5000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);

/*var flureeDbConn;
var njsConnections = [];
var flureeIsAvailable = false;
var isShuttingDown = false;
let listener; // defined by listener function*/

//------------------------
// Passport oAuth Services
//------------------------
server.use(passport.initialize());
server.use(passport.session());

server.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-top-read', 'ugc-image-upload',
        'playlist-modify-public', 'user-modify-playback-state', 'user-follow-modify', 'user-read-currently-playing', 
        'user-follow-read', 'user-library-modify', 'user-read-playback-position', 'playlist-read-private', 'streaming', 
        'user-read-playback-state', 'user-library-read'],
        showDialog: true,
    })
  );
  
  // GET /auth/spotify/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request. If authentication fails, the user will be redirected back to the
  //   login page. Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.

  server.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', {failureRedirect: '/'}),
    function (req, res) {
      console.log(req.user)
      res.redirect('http://localhost:3000/');
    }
  );
  
  server.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  server.get('/api/current_user', async (req, res) => {
    console.log(req.user)
    res.send(req.user);
  });

  server.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));


//------------------------
// Handlers for shut-down
//------------------------
/*function shutDownHandler() {
    isShuttingDown = true;
    console.log('Received kill signal, shutting down gracefully');
    listener.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    njsConnections.forEach(curr => curr.end());
    setTimeout(() => njsConnections.forEach(curr => curr.destroy()), 5000);

    if (flureeDbConn !== undefined)
    {
        try {
            flureenjs.close(flureeDbConn);
            flureeIsAvailable = false;
        }
        catch (error) {
            console.warn("error closing connection: ", error);
        }
    }
}
process.on('SIGTERM', shutDownHandler);
process.on('SIGINT', shutDownHandler);*/

//------------------------
// Fluree Logging
//------------------------
//flureenjs.set_logging({level: "config"});


//-----------------------
// Socket.IO WebSocket Server
//-----------------------

/*const wsServer = http.createServer();

io(wsServer, {
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on("connection", socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    socket.on("send-message", ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
  });

io.listen(7777)*/

//-----------------------
//  Websocket Connections
//-----------------------

const wss = new WebSocket.Server({
    port: 5555,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.
    }
  });

wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;
    const ip = req.socket.remoteAddress;
    console.log(ip)
    ws.on('message', function incoming(data) {
        console.log((JSON.parse(data)))
        switch ((JSON.parse(data)).type) {
            
            case 'msg.new': 
                ws.send(data)
                break;

            case 'add.to.cart':
                ws.send(data)
                break;
            
            case 'deleteItem':
                ws.send(data)
                break;

            case 'decreaseQuantity':
                ws.send(data)
                break;

            case 'increaseQuantity': 
                ws.send(data)
                break;

            case 'filter.name': {
                ws.send(data)
                break;
            }
            case 'filter.cat': {
                ws.send(data)
            }
            case 'filter.terpene': {
                ws.send(data)
                break;
            }
            case 'filter.cannabinoid': {
                ws.send(data)
                break;
            }
        }
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    },
    ws.on('open', function incoming(data) {
        ws.send('hello')
    }));
  });

//------------------------
// Connection to Fluree
//------------------------
/*function flureeConnect(url, options){
    if (!url) {
        throw "Unable to connect to Fluree: Missing url. "
    }

    var cOpts = {};
    if (options && options.keepAlive && options.keepAlive === true) {
        cOpts = {"keep-alive-fn": function(){ flureeConnect(url,options); }}
    }

    console.info("Connecting to Fluree instance @", url, " options: ", cOpts);
    flureenjs.connect_p(url, cOpts)
    .then(conn => {
        flureeDbConn = conn;
        flureeIsAvailable = true;
    })
    .catch(error => {
        console.error("Error connecting to Fluree DB", error);
        //  [  1.771s] [server] "Server contact error: " 
        //  "xhttp error - http://localhost:8080/fdb/health" 
        //  {:url "http://localhost:8080/fdb/health", :error :xhttp/http-error}
        // -> gracefully shutdown NodeJS server
        // -> or add re-try logic
    })   
}

//------------------------
// Start-up query instance
//------------------------
const flureeUrl = "http://localhost:8080";
const connectOpts = { keepAlive: true }
// flureeConnect(flureeUrl);  // without client-side keep-alive
flureeConnect(flureeUrl, connectOpts);  // with client-side keep-alive


//------------------------
// Listener
//------------------------
listener = server.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));


//-------------------------
// Handlers for connections
//-------------------------
listener.on('connection', connection => {
    njsConnections.push(connection);
    connection.on('close', () => njsConnections = njsConnections.filter(curr => curr !== connection));
});


//------------------------
// Routes
//------------------------
server.post('/api/db/:network/:db/:action', (request, response) => {

    const network = request.params.network;
    const dbId    = request.params.db;
    const action  = request.params.action.toLowerCase();
    const params  = request.params;
    const body    = request.body || {};
    const ledger  = network + '/' + dbId;

    // "shared" variable names
    var db = null;
    var opts = null;
    var query = null;
    var txn = null;
    var user = undefined;
    var pwd = undefined;
    var token = undefined;
    var expire = undefined;
    var auth = undefined;

    console.log(action)

    switch (action) {

        case 'password_login':
            if (body.user) user = body.user;
            if (body.password) pwd = body.password;
            if (body.expire) expire = body.expire;
            flureenjs.password_login(flureeDbConn, ledger, pwd, user, auth, expire)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'password_generate':
            if (body.user) user = body.user;
            if (body.password) pwd = body.password;
            if (body.opts)  opts = body.opts;
            flureenjs.password_generate(flureeDbConn, ledger, pwd, user, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;
            
        case 'renew_token':
            if (body.jwt) token = body.jwt; 
            if (body.expire) expire = body.expire;
            flureenjs.renew_token(flureeDbConn, token)
                .then (results => {
                    response.send(results);
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).send(error);
                });
                break;

        case 'block_query':
            if (body.query) query = body.query;
            if (body.opts)  opts = body.opts;
            flureenjs.block_query(flureeDbConn, ledger, query, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'block_range':
            const start = (body.start ? Number(body.start) : null);
            const end = (body.end ? Number(body.end) : null);
            if (body.opts)  opts = body.opts;
            flureenjs.block_range(flureeDbConn, ledger, start, end, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'delete_ledger':
            if (body.opts)  opts = body.opts;
            flureenjs.delete_ledger(flureeDbConn, ledger, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'db_schema':
            db = flureenjs.db(flureeDbConn, ledger);
            flureenjs.db_schema(db)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;
                            
        case 'graphql':
            if (body.graphql) query = JSON.stringify(body.graphql);
            if (body.opts)  opts = body.opts;
             flureenjs.graphql(flureeDbConn, ledger, query, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;    

        case 'history':
            if (body.query) query = body.query;
            if (body.opts)  opts = body.opts;
            db = flureenjs.db(flureeDbConn, ledger, opts);
            flureenjs.history_query(db, query, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;    
            
        case 'multi_query':
            if (body.query) query = body.query;
            if (body.opts)  opts = body.opts;
            db = flureenjs.db(flureeDbConn, ledger, opts);
            flureenjs.multi_query(db, query, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;    
        
        case 'monitor_tx':
            // retrieve txid and timeout from body
            const txid = body.txid;
            const timeout = (body.timeout ? Number(body.timeout) : 0);
            flureenjs.monitor_tx(flureeDbConn, ledger, txid, timeout)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'new_ledger':
            if (body.opts)  opts = body.opts;
            flureenjs.new_ledger(flureeDbConn, ledger, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;
        
        case 'query':
            query = body;
            if (body.opts)  opts = body.opts;
            db = flureenjs.db(flureeDbConn, ledger, opts);
            flureenjs.q(db, query, opts)
            .then (results => {
                response.send(JSON.stringify(results));
                console.log(response.send(JSON.stringify(results)))
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;
                            
        case 'signed_query':
            if (body.query) query = body.query;
            if (body.opts)  opts = body.opts;
            flureenjs.signed_query(flureeDbConn, ledger, query, opts)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        case 'sparql':
            if (body.query) query = JSON.stringify(body.query);
            if (body.opts)  opts = body.opts;
            db = flureenjs.db(flureeDbConn, ledger, opts);
            flureenjs.sparql(db, query)
            .then (results => {
                response.send(results);
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;    
                    
        case 'transact':
            txn = body;
            if (body.opts)  opts = body.opts;
            console.log(txn)
            flureenjs.transact(flureeDbConn, ledger, txn, opts)
            .then (results => {
                response.send(JSON.stringify(results));
            })
            .catch(error => {
                console.log(error);
                response.status(500).send(error);
            });
            break;

        default:
            response.status(404).send('Invalid action requested');
            break;
    }
});


//// Code to open a connection specifically for one request 
// server.post('/api/db/:network/:db/:action', (request, response) => {
//     var   flureeDbConn;
//     const network = request.params.network;
//     const dbId    = request.params.db;
//     const action  = request.params.action.toLowerCase();
//     const params  = request.params;
//     const body    = request.body;
//     const ledger  = network + '/' + dbId;
//     switch (action) {
//         case 'query':
//             flureenjs.connect_p(flureedbUrl)
//             .then(conn =>
//                 {
//                     flureeDbConn = conn;
//                     db = flureenjs.db(conn, ledger);
//                     flureenjs.q(db, body)
//                     .then (results => {
//                         response.send(results);
//                     })
//                     .catch(error => 
//                         {
//                             console.log(error);
//                             response.status(500).send(error);
//                     })
//                     .finally(() => { if (flureeDbConn !== undefined) flureenjs.close(flureeDbConn); });
//                 })
//             .catch(error => 
//                 {
//                     console.log(error);
//                     response.status(500).send(error);
//                 })
//             break;

//         default:
//             response.status(404).send('Invalid action requested');
//             break;
//     }
// });*/