import { opine, json } from "https://deno.land/x/opine/mod.ts";
const tokn = Deno.env.get("MY_VAR");
const app = opine();
const port = 3000;


// Middleware to parse JSON body for POST requests
app.use(json()); // Use Opine's json middleware

// Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
app.post("/", (req, res) => {
  const payload = req.body; // Access parsed body with req.body
  const pull_branch=payload.ref.toString().split('/');
  console.log("Baranch:",pull_branch[2]);
  const pull_Title=payload.commits[0].message;
  console.log("Title:",pull_Title);
  console.log("Token:",tokn);
  // Your logic to handle GitHub webhook events goes here
  // console.log("Received GitHub webhook payload:", payload);

  res.send("POST request to /webhook endpoint\n");
});

app.listen(port, () => {
  console.log(`Server is running`);
});