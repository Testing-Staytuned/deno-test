import { opine } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;

// Middleware to log "Hello" for all requests to the "/" endpoint
app.use("/", (req, res, next) => {
  console.log("Hello");
  next();
});

// Respond with "Hello, Deno!" for requests to the "/" endpoint
app.get("/", (req, res) => {
  res.send("Hello, Deno!\n");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});