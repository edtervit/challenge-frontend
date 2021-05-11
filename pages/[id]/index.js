import Link from "next/Link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function SportPage({ currentName, currentID, currentLeagues }) {
  return (
    <div className=" bg-gradient-to-tr from-pink-400 to-purple-400 text-white min-h-screen">
      <Header />

      <main className="cont">
        <h2 className="text-3xl mb-4">{currentName} Leagues</h2>
        <p>Click a league to view it's teams.</p>
        <div className="flex flex-wrap">
          {currentLeagues &&
            currentLeagues.map((league, index) => (
              <Link
                key={league.leagueID}
                href={`/${currentID}/${league.leagueID}`}
              >
                <a className="w-full  text-purple-400 cursor-pointer hover:scale-105 transform transition-all ">
                  <div
                    className={`bg-white m-2 rounded-md py-4 shadow-lg max-w-sm mx-auto ${
                      index % 2 == 0 && "bg-gray-100"
                    }`}
                  >
                    <h3 className="font-bold">
                      {index + 1}. {league.leagueName}
                    </h3>
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

export async function getStaticPaths() {
  // Fetch data from laravel API
  const url = `${process.env.BACKEND_URL}api/sports`;
  const res = await fetch(url);
  const data = await res.json();
  //for each sport return it's id which as used as the dyanmically generated url
  const paths = data.map((sport) => {
    return {
      params: { id: sport.sportID.toString() },
    };
  });

  return {
    paths: paths,
    //fallback can be set here to show a custom page if can't find a sport with the id
    //false will just show a generic 404 page
    fallback: false,
  };
}

// This gets called on every request
export async function getStaticProps(context) {
  //get the id of the sport from path
  const currentID = context.params.id;

  //get the list of sports
  const url = `${process.env.BACKEND_URL}api/sports`;
  const res = await fetch(url);
  const sportsData = await res.json();

  //from the list of sports find the current sport via id.
  const currentSport = sportsData.find((e) => e.sportID == currentID);

  //get the sports name
  const currentName = currentSport.sportName;

  // call the league endpoint in the laravel api
  const url2 = `${process.env.BACKEND_URL}api/league`;
  const res2 = await fetch(url2);
  const leagueData = await res2.json();

  //from the list of all leagues, find leagues that have the current sport
  const currentLeagues = leagueData.filter((e) => e.sportName == currentName);

  // Pass data to the page via props
  return { props: { currentName, currentID, currentLeagues }, revalidate: 60 };
}
