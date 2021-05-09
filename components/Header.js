import React from "react";
import Head from "next/head";

function Header() {
  return (
    <>
      <Head>
        <title>Ed's Sports List</title>
        <meta name="description" content="Sports leagues and standings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-5xl font-bold p-8 text-center">Ed's Sport List</h1>
    </>
  );
}

export default Header;
