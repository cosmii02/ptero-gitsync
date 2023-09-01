const core = require("@actions/core");
const request = require("request");

try {
  const panelURL = core.getInput("panel-url");
  const apiKey = core.getInput("api-key");
  const serverID = core.getInput("server-id");

  // Sending 'restart' signal
  request.post(`${panelURL}/api/client/servers/${serverID}/power`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    json: {
      signal: "kill",
    },
  }, (error, response, body) => {
    if (error) {
      console.error("Error sending restart:", error);
    } else {
      console.log("Successfully sent restart:", body);
    }
  });

  // Sending 'kill' signal after 5 seconds
  setTimeout(() => {
    request.post(`${panelURL}/api/client/servers/${serverID}/power`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      json: {
        signal: "start",
      },
    }, (error, response, body) => {
      if (error) {
        console.error("Error sending kill:", error);
      } else {
        console.log("Successfully sent kill:", body);
      }
    });
  }, 5000);  // 5 seconds delay

} catch (error) {
  core.setFailed(error.message);
  console.error("Caught exception:", error);
}
