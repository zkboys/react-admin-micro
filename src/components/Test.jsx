import React, { useState } from 'react';
import { Button } from 'antd';
import c from '@emp/react-base/configs/index';
import bg from './bg.jpg';
import util from './util';
import cfg from '../../config';
import ColorRed from './ColorRed';
import Home from 'src/pages/home';
import User from 'src/pages/user';

console.log('util', util);

console.log('cfg', cfg);

console.log('c', c);
// const config = await import('@emp/react-base/configs/index');
// console.log(123123, config);
export default function Test() {
    const [visible, setVisible] = useState(true);
    return (
        <div>
            <User />
            <Home />
            <Button type="primary" onClick={() => setVisible(!visible)}>Test</Button>
            <img src={bg} style={{ width: 100, height: 100 }} alt="" />
            {visible ? <ColorRed /> : null}
        </div>
    );
}
