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
      signal: "restart",
    },
  });

  // Sending 'kill' signal after 5 seconds
  setTimeout(() => {
    request.post(`${panelURL}/api/client/servers/${serverID}/power`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      json: {
        signal: "kill",
      },
    });
  }, 5000);  // 5 seconds delay

} catch (error) {
  core.setFailed(error.message);
}
