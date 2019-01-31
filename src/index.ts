
import { sync as globSync } from 'glob';
import { execSync, spawn, fork } from 'child_process';
import { sync as rimrafSync } from 'rimraf';

import { loadConfig, Config } from './loadConfig';
import * as log from 'npmlog';

const pre = 'rnd';
const projectPath = '/home/alex/dev/test/e2e/eg-app';

const config: Config = loadConfig(projectPath);
log.info('config', config);

const child = spawn('jest', ['-c', `${projectPath}/jest-e2e.config.js`], {
    env: { ...process.env, RNT_START: 'RNT_START' },
    stdio: ['pipe', 'pipe', 'pipe'],
});

let data = '';
child.stdout.on('data', (buffer: Buffer) => {
    data += buffer.toString();
    while (data.indexOf('\n') !== -1) {
        if (data.indexOf('[rnt] ') === 0) {
            const payload = JSON.parse(data.substring(6, data.indexOf('\n')));
            // console.log('### payload', payload);
            doUrl(payload);
        } else {
            log.info('stdout', data);
        }
        data = data.substring(data.indexOf('\n') + 1);
    }
});

child.stderr.on('data', (buffer: Buffer) => {
    log.error('stderr', buffer.toString());
});

// child.on('message', message => {
//     log.info('message', message);
//     // child.send('Hi');
// });

child.on('close', (code) => {
    log.info('close', 'child process exited with code', code);
});

function doUrl(payload: any) {
    console.log('run test against', payload.dataUrl.url);
    const runTest = spawn('jest', ['-c', `${projectPath}/jest-e2e.config.js`, payload.file], {
        env: { ...process.env, RNT_URL: payload.url },
        stdio: ['pipe', 'pipe', 'pipe'],
    });
    runTest.stdout.on('data', (buffer: Buffer) => {
        log.info('runTest', 'stdout', buffer.toString());
    });
    runTest.stderr.on('data', (buffer: Buffer) => {
        log.error('runTest', 'stderr', buffer.toString());
    });
    runTest.on('close', (code) => {
        log.info('runTest', 'close', 'runTest process exited with code', code);
    });
}
