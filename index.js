import { opine, json } from "https://deno.land/x/opine/mod.ts";
const tokn = Deno.env.get("MY_VAR");
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
setInterval(function(){ console.log("Hello"); 
console.log(clear());
}
, 2000);

// Middleware to parse JSON body for POST requests
app.use(json()); // Use Opine's json middleware

// Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
app.post("/", (req, res) => {
  const payload = req.body; // Access parsed body with req.body
  const pull_branch=payload.ref.toString().split('/');
  console.log("Baranch:",pull_branch[2]);
  const pull_Title=payload.commits[0].message;
  console.log("Title:",pull_Title);
  createPullRequest(tokn, "Testing-Staytuned", "test", pull_Title, pull_branch[2], "main");
  // console.log("Token:",tokn);
  // Your logic to handle GitHub webhook events goes here
  // console.log("Received GitHub webhook payload:", payload);

  res.send("POST request to /webhook endpoint\n");
});

app.listen(port, () => {
  console.log(`Server is running`);
});