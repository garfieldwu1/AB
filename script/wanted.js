const Canvacord = require("canvacord");
const fs = require('fs');

module.exports.config = {
  name: "wanted",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: 'rip [mention]',
  description: "Edit someone or your own avatar to a 'WANTED' image",
  credits: 'Developer',
  cooldown: 0
};

module.exports.run = async function ({ api, event }) {
  const id = Object.keys(event.mentions)[0] || event.senderID;
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const pathPic = __dirname + '/cache/' + `${timestamp}_wanted.png`;
let image = `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  const data = await Canvacord.canvacord.wanted(image);

  fs.writeFileSync(pathPic, data, { encoding: 'binary' });

  api.sendMessage({ body: '', attachment: fs.createReadStream(pathPic) }, event.threadID, () => fs.unlinkSync(pathPic), event.messageID);
};
