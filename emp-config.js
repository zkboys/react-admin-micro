const path = require('path');
const cfg = require(path.join(path.resolve('./'), 'config'));

const { TITLE, PORT, PUBLIC_PATH, EMP, EXTERNALS } = cfg;

module.exports = ({ config, env, empEnv, webpack }) => {
    console.log(EXTERNALS.reduce((prev, curr) => {
        const { name, root } = curr;
        prev[name] = root;
        return prev;
    }, {}));
    config.externals(EXTERNALS.reduce((prev, curr) => {
        const { name, root } = curr;
        prev[name] = root;
        return prev;
    }, {}));

    // 设置项目URL
    config.output.publicPath(PUBLIC_PATH);
    // 设置项目端口
    config.devServer.port(PORT);
    // 别名配置
    config.resolve.alias
        .set('@', path.resolve('./', 'src'))
        .set('src', path.resolve('./', 'src'));

    /*
    *
    {
        test: /page-routes\.js$/,
        enforce: 'pre',
        use: path.resolve(__dirname, 'route-loader.js'),
        include: paths.appSrc,
    },

    * */
    // 路由抓取
    config.module
        .rule('page-routes')
        .test(/page-routes\.js$/)
        .pre()
        .enforce('pre')
        .include
        .add(path.resolve('./', 'src'))
        .end()
        .use('route')
        .loader(path.resolve('./', 'route-loader.js'));

    // const localIdentName = '[local]-[hash:base64:5]';
    const localIdentName = '[path][name]__[local]';
    // const localIdentName = '[hash:base64]';
    ['cssModule', 'lessModule', 'sassModule'].forEach(rule => {
        config.module
            .rule(rule)
            .use('css')
            .tap(options => {
                options.modules = {
                    localIdentName,
                };
                return options;
            });
    });

    // antd 不使用按需加载
    config.module
        .rule('scripts')
        .use('babel')
        .tap(options => {
            options.plugins = options.plugins.filter(item => item[0] !== 'import');

            options.plugins.push([
                'react-css-modules',
                {
                    // 'generateScopedName': '_[hash:base64]',
                    'generateScopedName': localIdentName,
                    'webpackHotModuleReloading': true,
                    'filetypes': {
                        '.less': {
                            'syntax': 'postcss-less',
                        },
                    },
                    'handleMissingStyleName': 'throw',
                    'autoResolveMultipleImports': true,
                },
            ]);
            options.plugins.push(['@babel/plugin-proposal-export-default-from']);

            return options;
        });

    // module federation 配置
    config.plugin('mf').tap(args => {
        args[0] = {
            ...args[0],
            ...{
                ...EMP,
                // 被远程引入的文件名
                filename: 'emp.js',
            },
        };
        return args;
    });

    // 配置 index.html
    config.plugin('html').tap(args => {
        args[0] = {
            ...args[0],
            ...{
                // head 的 title
                title: TITLE,
                // eslint-disable-next-line no-undef
                template: `${resolveApp('public')}/index.ejs`,
                // 远程调用项目的文件链接
                files: {
                    css: EXTERNALS.filter(item => !!item.css).map(item => item.css).flat(),
                    js: EXTERNALS.filter(item => !!item.js).map(item => item.js).flat(),
                },
            },
        };
        return args;
    });

    // DefinePlugin 配置

    config.plugin('DefinePlugin')
        .use(webpack.DefinePlugin, [{
            'process.env': Object.keys(process.env).reduce((prev, key) => {
                prev[key] = JSON.stringify(process.env[key]);
                return prev;
            }, {}),
        }]);
};
