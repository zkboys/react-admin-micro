import React from 'react';
import s from './ColorRed.module.less';

export default function Test() {
    return (
        <>
            <div styleName="box">
                style name
            </div>
            <div className={s.box}>

            </div>
        </>
    );
}
