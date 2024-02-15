const os = require('os');

module.exports.config = {
		name: "uptime",
		version: "1.0.2",
		role: 0,
		credits: "cliff",
		description: "uptime",
		hasPrefix: false,
		cooldowns: 5,
		aliases: ["up"]
};

function byte2mb(bytes) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);
		const cores = `Cores: ${os.cpus().length}`;

		return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports.run = async ({ api, event }) => {
		const time = process.uptime(),
				hours = Math.floor(time / (60 * 60)),
				minutes = Math.floor((time % (60 * 60)) / 60),
				seconds = Math.floor(time % 60);

		const pidusage = await global.nodemodule["pidusage"](process.pid);

		const osInfo = {
				platform: os.platform(),
				architecture: os.arch()
		};

		const timeStart = Date.now();
		const returnResult = `BOT has been working for ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s).\n\n❖ Total users: ${global.data.allUserID.length}\n❖ Total Threads: ${global.data.allThreadID.length}\n❖ Cpu usage: ${pidusage.cpu.toFixed(1)}%\n❖ RAM usage: ${byte2mb(pidusage.memory)}\n❖ Cores: 8\n❖ Ping: ${Date.now() - timeStart}ms\n❖ Operating System Platform: ${osInfo.platform}\n❖ System CPU Architecture: ${osInfo.architecture}\n\n𝗔𝗗𝗠𝗜𝗡: www.facebook.com/mark.dev69`;

		return api.sendMessage(returnResult, event.threadID, event.messageID);
};
