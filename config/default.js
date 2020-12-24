const PORT = 8002;
const {
    AJAX_PREFIX,
    BASE_NAME,
    MOCK,
    NODE_ENV,
    PUBLIC_URL,
} = process.env;

const IS_DEV = NODE_ENV === 'development';

module.exports = {
    PORT,
    PUBLIC_PATH: `http://localhost:${PORT}/`,
    AJAX_PREFIX: '/api',
    AJAX_TIMEOUT: 1000 * 60,
    BASE_NAME: '',
    TITLE: 'React Project Pro',
    IS_DEV,
    EMP: {
        name: 'empReactProject',
        remotes: {
            '@emp/react-base': 'empReactBase@http://localhost:8001/emp.js',
        },
        exposes: {
            './src/components/Hello': 'src/components/Hello',
            './src/pages/home': 'src/pages/home',
            './src/pages/user': 'src/pages/user',
            './src/helper': 'src/helper',
        },
        shared: [
            'react',
            'react-dom',
            'antd',
        ],
    },
    EXTERNALS: [
        {
            name: 'moment',
            root: 'moment',
            js: [
                '/externals/js/moment.2.29.1.min.js',
                '/externals/js/moment.2.29.1.zh-cn.js',
            ],
        },
        {
            name: 'react',
            root: 'React',
            js: '/externals/js/react.production.17.0.1min.js',
        },
        {
            name: 'react-dom',
            root: 'ReactDOM',
            js: '/externals/js/react-dom.production.17.0.1.min.js',
        },
        {
            name: 'antd',
            root: 'antd',
            js: '/externals/js/antd.4.9.4.min.js',
            css: '/externals/css/antd.4.9.4.min.css',
        },
    ],
};


