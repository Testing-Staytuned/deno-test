import { opine, json } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;

// Middleware to log "Hello" for all requests to the "/" endpoint
app.use("/", (req, res, next) => {
  console.log("Hello");
  next();
});

// Middleware to parse JSON body for POST requests
app.use(json()); // Use Opine's json middleware

// Middleware to log parsed body
app.use("/", (req, res, next) => {
  console.log("Parsed body:", req.body);
  next();
});

// Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
app.post("/", (req, res) => {
  const payload = req.body; // Access parsed body with req.body
  
  // Your logic to handle GitHub webhook events goes here
  console.log("Received GitHub webhook payload:", payload);

  res.send("POST request to /webhook endpoint\n");
});

app.listen(port, () => {
  console.log(`Server is running`);
});