// import { opine, json } from "https://deno.land/x/opine/mod.ts";
const tokn = Deno.env.get("MY_VAR");
// const app = opine();
// const port = 3000;
// const createPullRequest = async (accessToken, owner, repo, title, head, base) => {
//     const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`;

//     const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${accessToken}`,
//             "Accept": "application/vnd.github.v3+json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             title,
//             head,
//             base,
//         }),
//     });

//     if (!response.ok) {
//         const responseBody = await response.text();
        
//         console.error(`Failed to create pull request: ${response.status} - ${responseBody}`);
//     } else {
//         const pullRequestData = await response.json();
//         console.log(`Pull request created successfully: ${pullRequestData.html_url}`);
//     }
// };

// // setInterval(function(){ console.log("Hello"); 
// // console.clear();
// // }
// // , 2000);

// // Middleware to parse JSON body for POST requests
// app.use(json()); // Use Opine's json middleware

// // Respond to POST requests to the "/webhook" endpoint (GitHub webhook events)
// app.post("/", (req, res) => {
//   const payload = req.body; // Access parsed body with req.body
//   const pull_branch=payload.ref.toString().split('/');
//   console.log("Baranch:",pull_branch[2]);
//   const pull_Title=payload.commits[0].message;
//   console.log("Title:",pull_Title);
//   createPullRequest(tokn, "Testing-Staytuned", "test", pull_Title, pull_branch[2], "main");
//   // console.log("Token:",tokn);
//   // Your logic to handle GitHub webhook events goes here
//   // console.log("Received GitHub webhook payload:", payload);

//   res.send("POST request to /webhook endpoint\n");
// });

// app.listen(port, () => {
//   console.log(`Server is running`);
// });










import { serve } from "https://deno.land/std/http/server.ts";
// import { BufReader } from "https://deno.land/std/io/bufio.ts";

const port = 3000; // Change to your desired port
const server = serve({ port });

console.log(`Webhook server listening `);

async function processWebhook(payload) {
  const event = payload.headers.get("x-github-event");
  const body = new TextDecoder("utf-8").decode(await Deno.readAll(payload.body));
  const data = JSON.parse(body);

  if (event === "issues" && data.action === "opened") {
    const issueTitle = data.issue.title;
    const issueBody = data.issue.body;

    if (issueBody && issueBody.toLowerCase().trim() === "start-coding") {
      const branchName = `feature/${issueTitle.toLowerCase().replace(/\s+/g, "-")}`;

      // Call the function to create a new branch here
      createBranch(branchName);
    }
  }
}

function createBranch(branchName) {
    
  // Implement branch creation logic here (use the previous examples)
  console.log(`Creating branch: ${branchName}`);
}

for await (const req of server) {
  if (req.method === "POST" && req.url === "/") {
    await processWebhook(req);
    req.respond({ status: 200, body: "OK" });
  } else {
    req.respond({ status: 404, body: "Not Found" });
  }
}
