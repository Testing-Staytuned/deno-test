import { opine } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;

// Middleware to log "Hello" for all requests to the "/" endpoint
app.use("/", (req, res, next) => {
  console.log("Hello");
  next();
});

// Middleware to parse JSON body for POST requests
app.use("/", async (req, res, next) => {
  console.log("Parsing JSON body");
  try {
    const body = await req.json();
    req.parsedBody = body;
    next();
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    res.status(400).send("Bad Request");
  }
});

// Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
app.post("/webhook", (req, res) => {
  const payload = req.parsedBody;
  
  // Your logic to handle GitHub webhook events goes here
  console.log("Received GitHub webhook payload:", payload);

  res.send("POST request to /webhook endpoint\n");
});

app.listen(port, () => {
  console.log(`Server is running`);
});
