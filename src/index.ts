
import { sync as globSync } from 'glob';
import { execSync } from 'child_process';
import { sync as rimrafSync } from 'rimraf';

import { loadConfig, Config } from './loadConfig';

const projectPath = '/home/alex/dev/test/e2e/eg-app';

const config: Config = loadConfig(projectPath);
console.log('config', config);

rimrafSync(`${__dirname}/../data/*`);

const files: string[] = globSync(`${projectPath}/**/*.test.e2e.js`);

files.forEach((file: string) => {
    // console.log('load file', file);
    // const load = require(file);
    // console.log('load', load);
    const ENVVAR = `BASE_URL=${config.baseUrl}`;
    const result = execSync(`${ENVVAR} jest -f ${file} -c ${projectPath}/jest-e2e.config.js`);
    console.log('result', result);
});
