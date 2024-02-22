const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "removebg",
  version: "2.7",
  hasPermission: 0,
  credits: "Mark Hitsuraan",
  description: "Remove background",
  commandCategory: "no prefix",
  usages: "photo without background",
  cooldown: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("removebg") === 0 || event.body.indexOf("Removebg") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  try {
    const response = await axios.get("https://allinoneapis.onrender.com");
    if (response.data.hasOwnProperty("error")) {
      return api.sendMessage(response.data.error, event.threadID, event.messageID);
    }

    let pathie = __dirname + `/cache/removed_bg.jpg`;
    const { threadID, messageID } = event;

    let photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

    if (!photoUrl) {
      api.sendMessage("Please reply to photo.", threadID, messageID);
      return;
    }

    api.sendMessage("Removing Background, Please wait...", threadID, async () => {
      try {
        const response = await axios.get(`https://allinoneapis.onrender.com/api/try/removebg?url=${encodeURIComponent(photoUrl)}`);
        const processedImageURL = response.data.image_data;

        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "Here's your image without background.",
          attachment: fs.createReadStream(pathie)
        }, threadID, () => fs.unlinkSync(pathie), messageID);
      } catch (error) {
        api.sendMessage(`error: ${error}`, threadID, messageID);
      }
    });
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {};
