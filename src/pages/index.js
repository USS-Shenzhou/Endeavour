import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
//import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CurseForgeMods from "@site/src/components/CurseForgeMods/CurseForgeMods";
import NewMods from "@site/src/components/NewMods/NewMods";

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">欢迎</h1>
                <text style={{
                    "font-size": "1.5rem"
                }}>
                    <br/>在上方导航栏选择想要查看的子项目。
                </text>
                <text style={{
                    "font-size": "1 rem"
                }}>
                    <br/>
                    <br/>这是一个非公开项目。
                </text>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Endeavour`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader/>
            <main>
                <div className={styles.uss_shenzhou_info}>
                    <img
                        src={require("@site/static/img/head.png").default}
                        alt="USS_Shenzhou head"
                    />
                    <text className={styles.text}>
                        你好！Endeavour是一个实验性的自动化信息收集项目。
                        <br/>
                        你可以在页面底端找到我的其他赛博刷新点。
                    </text>
                </div>
            </main>
        </Layout>
    );
}
