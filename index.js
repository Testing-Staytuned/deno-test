import { opine, json } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;
const createPullRequest = async (accessToken, owner, repo, title, head, base) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title,
          head,
          base,
      }),
  });

  if (!response.ok) {
      const responseBody = await response.text();
      
      console.error(`Failed to create pull request: ${response.status} - ${responseBody}`);
  } else {
      const pullRequestData = await response.json();
      console.log(`Pull request created successfully: ${pullRequestData.html_url}`);
  }
};

// Middleware to log "Hello" for all requests to the "/" endpoint

// Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
app.post("/", (req, res) => {
  console.log("hello");
  const payload = req.body; // Access parsed body with req.body
  console.log(payload);
  // Your logic to handle GitHub webhook events goes here
  // console.log("Received GitHub webhook payload:", payload);

  res.send("POST request to / endpoint\n");
});

app.listen(port, () => {
  console.log(`Server is running`);
});