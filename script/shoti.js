const axios = require("axios");
const fs = require("fs");
const request = require('request');

module.exports.config = {
		name: "shoti",
		version: "1.0.0",
		credits: "libyzxy0",
		description: "Generate random tiktok girl videos",
		role: 0,
		usage: "[shoti]",
		cooldown: 5,
		hasPrefix: true,
		aliases: ["shot", "Shoti"]
};

module.exports.run = async function ({ api, event }) {
		const apiUrl = "http://eu4.diresnode.com:3185/shoti?apikey=omsimnida";
		try {
				const response = await axios.get(apiUrl);
				const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
				const rqs = request(response.data.data.url);
				rqs.pipe(file);
				file.on('finish', () => {
						api.sendMessage({
								body: `@${response.data.user.username}`,
								attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
						}, event.threadID, (error, info) => {
								if (error) console.error('Error sending message:', error);
								if (info) console.log('Message sent:', info);
								fs.unlinkSync(__dirname + '/cache/shoti.mp4'); // Delete the temporary file after sending
						});
				});
				file.on('error', (err) => {
						api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
				});
		} catch (error) {
				api.sendMessage(`Shoti Error: ${error.message}`, event.threadID, event.messageID);
		}
};
