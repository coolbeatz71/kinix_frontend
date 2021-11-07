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
                {Array.from(Array(100).keys()).map((item) => (
                    <p key={item}>
                        Get started by editing <code>pages/index.js</code>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem molestias est nemo! Nemo,
                        delectus. Neque officiis ab deleniti earum minima repellendus excepturi voluptas? Incidunt
                        maxime excepturi eum ut laboriosam eaque. Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Omnis vel vitae, impedit, magni ab ullam veniam, sapiente iste tempore consectetur ea.
                        Sequi quisquam error accusamus, explicabo nisi dolorem. Esse, voluptatum!
                    </p>
                ))}
            </main>
        </Layout>
    );
};

export default Home;
