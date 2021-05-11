import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home({ data }) {
  // console.log(data);

  return (
    <div className=" bg-gradient-to-tr from-pink-400 to-purple-400 text-white min-h-screen">
      <Header />

      <main className="cont">
        <h2 className="text-3xl mb-4">The Sports</h2>
        <p>Click a sport to view it's leagues.</p>
        <div className="flex flex-wrap">
          {data &&
            data.map((sport, index) => (
              <Link key={sport.sportID} href={`/${sport.sportID}`}>
                <a className="w-full md:w-1/2  text-purple-400 cursor-pointer hover:scale-105 transform transition-all ">
                  <div className="bg-white m-4 rounded-md py-4 shadow-lg ">
                    <h3 className="font-bold">{sport.sportName}</h3>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from laravel API
  const url = `${process.env.BACKEND_URL}api/sports`;
  const res = await fetch(url);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
