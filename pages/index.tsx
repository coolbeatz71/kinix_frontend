import Layout from '@components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => {
    return (
        <Layout title="Home">
            <main>
                <h1>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p>
                    Get started by editing <code>pages/index.js</code>
                </p>
            </main>
        </Layout>
    );
};

export default Home;
