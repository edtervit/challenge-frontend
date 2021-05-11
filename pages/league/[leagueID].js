import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

export default function LeaguePage({ currentName, teamsData }) {
  //I seemed to have a made a mistake when importing the data into the laravel database as I have found duplicates
  //I don't have time to re-import all the data but thought I could use this as an example of handling data that may be out of my control
  //the following code prevents duplicates of the same team
  const niceTeams = [];

  //go through all the teams from data source
  teamsData.map((team) => {
    //if this team hasn't already been added
    if (!niceTeams.find((e) => e.teamID == team.teamID)) {
      //add the team
      niceTeams.push(team);
    }
  });

  //create some state for the modals
  const [showModal, setShowModal] = useState(false);

  //disables page scrolling when modal is active
  //code is triggered everytime the showModal state changes
  useEffect(() => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
  }, [showModal]);

  return (
    <div className=" bg-gradient-to-tr from-pink-400 to-purple-400 text-white min-h-screen">
      <Header />

      <main className="cont">
        <h2 className="text-3xl mb-4">{currentName} Teams</h2>
        <p>Click a team to view it's info.</p>
        <div className="flex flex-wrap">
          {niceTeams &&
            niceTeams.map((team, index) => (
              <>
                <a
                  key={team.teamID}
                  onClick={() => setShowModal(index + 1)}
                  className="w-full  text-purple-400 cursor-pointer hover:scale-105 transform transition-all"
                >
                  <div
                    className={`bg-white m-2 rounded-md py-4 shadow-lg max-w-sm mx-auto ${
                      index % 2 == 0 && "bg-gray-100"
                    }`}
                  >
                    <h3 className="font-bold">
                      {index + 1}. {team.teamName}
                    </h3>
                  </div>
                </a>
                {showModal && showModal === index + 1 && (
                  <>
                    <div
                      className=" bg-black bg-opacity-30 top-0 left-0 h-full w-full  fixed z-10 overflow-y-auto flex pt-4"
                      onClick={() => setShowModal(false)}
                    >
                      <div
                        className="bg-white block m-auto w-11/12 md:w-10/12 text-purple-400 p-5 space-y-4 relative max-w-screen-lg"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <p
                          onClick={() => setShowModal(false)}
                          className="md:hidden cursor-pointer border border-purple-400 p-2"
                        >
                          Close Popup
                        </p>
                        <h4 className="text-2xl mb-4 ">
                          {team.teamName} - ({team.teamID})
                        </h4>
                        {/* not every team had all of this info so I'm using && statements to check it exists before trying to display it to prevent errors */}
                        {team.website && (
                          <a
                            href={`http://${team.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website: {team.website}
                          </a>
                        )}
                        {team.stadiumName && <p>Stadium: {team.stadiumName}</p>}
                        {team.rank && (
                          <p>
                            Rank in league: {team.rank} / {niceTeams.length}
                          </p>
                        )}
                        {team.points && <p>Points: {team.points}</p>}
                        {team.wins && <p>Wins: {team.wins}</p>}
                        {team.losses && <p>Losses: {team.losses}</p>}
                        {team.draws && <p>Draws: {team.draws}</p>}
                        {team.goalsFor && <p>Goals For: {team.goalsFor}</p>}
                        {team.goalsAgainst && (
                          <p>Goals Against: {team.goalsAgainst}</p>
                        )}
                        {team.goalsDiff && (
                          <p>Goals Difference: {team.goalsDiff}</p>
                        )}

                        {team.desc && <p>Description: {team.desc}</p>}
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch data from laravel API
  const url = `${process.env.BACKEND_URL}api/teams`;
  const res = await fetch(url);
  const data = await res.json();
  //for each league return it's id which as used as the dyanmically generated url
  let paths = data.map((league) => {
    return {
      params: { leagueID: league.leagueID.toString() },
    };
  });

  return {
    paths: paths,
    //fallback can be set here to show a custom page if can't find a league with the id
    //false will just show a generic 404 page
    fallback: false,
  };
}

// This gets called on every request
export async function getStaticProps(context) {
  //get the id of the sport from path
  const currentID = context.params.leagueID;

  //get the list of teams in this league
  const url = `${process.env.BACKEND_URL}api/teams/${currentID}`;
  const res = await fetch(url);
  const teamsData = await res.json();

  //use the first team in the list of teams in the league to get the currentLeagues name
  const currentName = teamsData[0].leagueName;

  // Pass data to the page via props
  return { props: { currentName, currentID, teamsData }, revalidate: 60 };
}
