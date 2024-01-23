// webhook.ts

import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 3000 });
console.log("Server is running on http://localhost:3000/webhook");

for await (const req of server) {
  const body = new TextDecoder().decode(await Deno.readAll(req.body));

  // Handle GitHub webhook events here
  console.log("Received GitHub webhook event:", body);

  req.respond({ status: 200, body: "Webhook received successfully" });
}
