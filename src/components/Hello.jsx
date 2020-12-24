import React from 'react';
import { Button, Alert } from 'antd';
import Test from './Test';

const Hello = (props) => (
    <>
        <Button type="primary">按钮啊</Button>
        <Alert message="就是啊" />
        <Test />
        <h1>
            Hello from {props.compiler} and {props.framework}!
        </h1>
    </>
);

export default Hello;
