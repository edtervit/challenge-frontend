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
      <header className="flex justify-between p-5 bg-black bg-opacity-10 items-center">
        <a href="/">
          <h1 className=" text-lg md:text-4xl font-bold  text-center">
            Ed's Sport List
          </h1>
        </a>
        <a
          href="/"
          className=" text-lg md:text-2xl font-bold p-2 rounded-md  text-center border border-white"
        >
          Home
        </a>
      </header>
    </>
  );
}

export default Header;
