
import { sync } from 'glob';
import { execSync } from 'child_process';

const files: string[] = sync('/home/alex/dev/test/e2e/eg-app/**/*.test.e2e.js');

files.forEach((file: string) => {
    // console.log('load file', file);
    // const load = require(file);
    // console.log('load', load);
    const result = execSync(`jest -f ${file} -c /home/alex/dev/test/e2e/eg-app/jest-e2e.config.js`);
    console.log('result', result);
});
