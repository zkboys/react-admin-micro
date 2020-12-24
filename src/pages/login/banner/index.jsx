import React, { Component } from 'react';
import './style.module.less';
import logo from './logo.png';
import star from './star.png';
import { TITLE } from '../../../../config';

export default class index extends Component {
    state = {
        isMount: false,
    };

    componentDidMount() {
        this.setState({ isMount: true });
    }

    render() {
        const { isMount } = this.state;

        return (
            <div styleName={isMount ? 'root active' : 'root'}>
                <div styleName="star">
                    <img src={star} alt="星星" />
                </div>
                <div styleName="logo">
                    <img src={logo} alt="图标" />
                    <span>{TITLE}</span>
                </div>
            </div>
        );
    }
}
