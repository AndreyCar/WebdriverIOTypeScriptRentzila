import { config } from './wdio.conf';

config.capabilities[0]['goog:chromeOptions'].args = ['disable-gpu'];

exports.config = config;
