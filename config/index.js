const defaultConfig = require('./default');
const devConfig = require('./development');
const proConfig = require('./production');
const testConfig = require('./test');

let env = process.env.CONFIG_ENV || process.env.NODE_ENV;

if (env === 'dev') env = 'development';

const envConfigMap = {
    development: devConfig,
    production: proConfig,
    test: testConfig,
};

const envConfig = envConfigMap[env] || devConfig;

// 简单的第一层覆盖
module.exports = Object.assign({}, defaultConfig, envConfig);
