const axios = require('axios');

module.exports.config = {
  name: "tokenget",
  version: "1.8.7",
  hasPermission: 0,
  credits: "Mark Hitsuraan",
  description: "Token getter",
  commandCategory: "no prefix",
  usages: "Token and cookies generator",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const message = event.body;
  const command = "tokenget";

  if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {
    const args = message.split(/\s+/);
    args.shift();

    if (args.length === 2) {
      const username = args[0];
      const password = args[1];

      api.sendMessage(`Getting token for user: '${username}', Please wait...`, event.threadID);

      try {
        const response = await axios.get('https://allinoneapis.onrender.com/api/token', {
          params: {
            username: username,
            password: password,
          },
        });

        if (response.data.status) {
          const token = response.data.data.access_token;
          const token2 = response.data.data.access_token_eaad6v7;
          const cookies = response.data.data.cookies; 

          api.sendMessage(`Token Generated\n\n𝗘𝗔𝗔𝗔𝗔𝗨 𝗧𝗢𝗞𝗘𝗡\n${token}\n\n𝗘𝗔𝗔𝗗6𝗩7 𝗧𝗢𝗞𝗘𝗡\n${token2}\n\n𝗖𝗢𝗢𝗞𝗜𝗘 🍪\n ${cookies}`, event.threadID);
        } else {
          api.sendMessage(`Error: ${response.data.message}`, event.threadID);
        }
      } catch (error) {
        api.sendMessage("error", event.threadID);
      }
    } else {
      api.sendMessage("Usage: tokenget [ username ] [ password ]", event.threadID);
    }
  }
};

module.exports.run = async function ({ api, event }) {};
