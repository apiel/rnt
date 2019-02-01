import { info } from 'fancy-log';
import { execSync } from 'child_process';
import { sync as rimrafSync } from 'rimraf';

import { loadConfig, Config } from './loadConfig';

const projectPath = '/home/alex/dev/test/e2e/eg-app';

const config: Config = loadConfig(projectPath);
info('config', config);

rimrafSync(`${__dirname}/../data/*`); // we could put the rimraf in init file of jest

const result = execSync(`jest -c ${projectPath}/jest-e2e.config.js`, {
    stdio: 'ignore', // disable output
    env: {
        ...process.env,
        RNT_BASE_URL: config.baseUrl,
    },
});
info('result', result);
