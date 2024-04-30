const http = require("http");

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(data, null, 3));
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


const data = [
  {
    name: "ReadFile",
    displayName: "Read File",
    in: 1,
    out: 1,
    model: {
      default: {
        access:"",
        documentLocation: [
          {
            filePath: "",
            description: ""
          }
        ]
      }
    }
  }
]