const { AkairoClient } = require('discord-akairo');

const SettingsProvider = require('./SettingsProviders');
const Setting = require('../models/settings');

class HoshiClient extends AkairoClient {
	constructor(config) {
		super({
			prefix: message => this.settings.get(message.guild, 'prefix', '*'),
			allowMention: true,
			handleEdits: true,
			ownerID: config.owner,
			commandDirectory: './src/commands',
			listenerDirectory: './src/listeners'
		}, {
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.config = config;
		this.settings = new SettingsProvider(Setting);
	}

	async start() {
		await this.settings.init();
		return this.login(this.config.token);
	}
}

module.exports = HoshiClient;
