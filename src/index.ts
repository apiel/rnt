
import { sync as globSync } from 'glob';
import { execSync } from 'child_process';
import { sync as rimrafSync } from 'rimraf';

import { loadConfig, Config } from './loadConfig';

const projectPath = '/home/alex/dev/test/e2e/eg-app';

const config: Config = loadConfig(projectPath);
console.log('config', config);

rimrafSync(`${__dirname}/../data/*`);

const files: string[] = globSync(`${projectPath}/**/*.test.e2e.js`);

const loopTimer = 'loop files';
console.time(loopTimer);
files.forEach((file: string) => {
    const timer = `file: ${file}`;
    console.time(timer);
    const ENVVAR = `RNT_BASE_URL=${config.baseUrl} RNT_FILE=${file}`;
    const result = execSync(`${ENVVAR} jest -f ${file} -c ${projectPath}/jest-e2e.config.js`, {
        stdio: 'ignore', // disable output
    });
    // console.log('result', result);
    console.timeEnd(timer);
});
console.timeEnd(loopTimer);
