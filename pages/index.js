import Head from "next/head";
import Link from "next/Link";

export default function Home({ data }) {
  console.log(data);

  return (
    <div className=" bg-gradient-to-tr from-pink-400 to-purple-400 text-white min-h-screen">
      <Head>
        <title>Ed's Sports List</title>
        <meta name="description" content="Sports leagues and standings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="cont">
        <h1 className="text-5xl font-bold mb-8">Ed's Sport List</h1>
        <h2 className="text-3xl mb-4">The Sports</h2>
        <div className="flex flex-wrap">
          {data &&
            data.map((sport, index) => (
              <Link key={sport.sportID} href={`/sports/${sport.sportID}`}>
                <a className="w-1/2  text-purple-400 cursor-pointer hover:scale-105 transform transition-all ">
                  <div className="bg-white m-4 rounded-md py-4 shadow-lg ">
                    <h3 className="font-bold">
                      {index + 1}. {sport.sportName}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </main>

      <footer className="text-center">
        <a href="https://edtervit.co.uk" target="_blank">
          Created by Ed Tervit - Portfolio EdTervit.co.uk
        </a>
      </footer>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const url = `${process.env.BACKEND_URL}api/sports`;
  const res = await fetch(url);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
