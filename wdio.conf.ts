import type { Options } from '@wdio/types';

require('dotenv').config();

export const config: Options.Testrunner = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    before: async function (capabilities, specs) {
        await browser.url('/');
        await browser.maximizeWindow();

        require('dotenv').config();
    },

    specs: ['./test/specs/**/*.ts'],

    exclude: [],

    maxInstances: 10,

    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['headless', 'disable-gpu'],
            },
            acceptInsecureCerts: true,
        },
    ],

    logLevel: 'info',

    bail: 0,

    baseUrl: process.env.BASE_URL,
    waitforTimeout: 10000,

    connectionRetryTimeout: 60000,

    connectionRetryCount: 3,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 150000,
    },

    reporters: [
        'spec',
        [
            'mochawesome',
            {
                outputDir: './mochawesome-reports',
                mochawesomeOpts: {
                    reportDir: 'mochawesome-report',
                    reportFilename: 'wdio-mochawesome',
                    html: true,
                    json: true,
                },
            },
        ],
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
};
