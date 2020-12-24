import React from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import { util } from 'ra-lib';
import { getLoginUser, setLoginUser } from 'src/commons';
import { connect } from 'src/models'; // 解决 antd 日期组件国际化问题
import { TITLE } from '../config';
import getMenus from './menus';
import AppRouter from './router/AppRouter';
import theme from './theme.less';

const { getMenuTreeDataAndPermissions } = util;

// 设置语言
moment.locale('zh-cn');

@connect()
export default class App extends React.Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        const { action: { layout } } = this.props;

        // 从Storage中获取出需要同步到redux的数据
        this.props.action.getStateFromStorage();

        const loginUser = getLoginUser();
        if (!loginUser) {
            this.setState({ loading: false });
            return;
        }

        const userId = loginUser?.id;

        // 获取系统菜单 和 随菜单携带过来的权限
        this.setState({ loading: true });

        getMenus(userId)
            .then(res => {
                const plainMenus = res || [];
                const permissions = [];
                const userPaths = [];

                const { menuTreeData } = getMenuTreeDataAndPermissions(plainMenus);

                plainMenus.forEach(({ type, path, code }) => {
                    if (type === '2' && code) permissions.push(code);

                    if (path) userPaths.push(path);
                });

                if (loginUser) {
                    loginUser.permissions = permissions;
                    setLoginUser(loginUser);
                }

                layout.setMenus(menuTreeData);
                layout.setPlainMenus(plainMenus);
                layout.setUserPaths(userPaths);
                layout.setPermissions(permissions);
                layout.setLoginUser(loginUser);
                layout.setAppName(TITLE);
                layout.setPrimaryColor(theme.primaryColor);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { subLoading, subAppError } = this.props;
        const { loading } = this.state;
        return (
            <ConfigProvider locale={zhCN}>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: '100vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Spin spinning tip="加载中..." />
                    </div>
                ) : (
                    <AppRouter subLoading={subLoading} subAppError={subAppError} />
                )}
            </ConfigProvider>
        );
    }
}
