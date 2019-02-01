import { existsSync } from 'fs';

export interface Config {
    baseUrl: string;
}

const defaultConfig: Config = {
    baseUrl: 'http://localhost:3000',
};

export const loadConfig = (projectPath: string): Config => {
    const configFile = `${projectPath}/rend-and-test.config.js`;
    if (existsSync(configFile)) {
        const loadedConfig = require(configFile); // tslint:disable-line
        return { ...defaultConfig, ...loadedConfig };
    }
}
