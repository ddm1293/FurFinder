import './Home.css';

export default function Home() {
  return (
    <div>
      <div id="split">
        <div className="split__sides split__sides--lost">
          <div className="split__image split__image--lost">
            <a className="split__button" href="#">I Lost A Pet</a>
          </div>
        </div>
        <div className="split__sides split__sides--witness">
          <div className="split__image split__image--witness">
            <a className="split__button" href="#">I Found A Pet</a>
          </div>
        </div>
      </div> 
      <div id="about">
        <h1>About</h1>
        <p>FurFinder is a web-based platform designed to help pet owners to locate their lost pets (only cats and dogs for now). It provides a centralized space for creating lost-pet threads, reporting sightings, and accessing resources to aid in the search effort. The platform offers user authentication, enabling secure login with options like Facebook accounts for increased credibility. Key features include automatic thread updates, notification system for potential witnesses, a thread map with marked locations, and (hopefully) a missing pet flyer generator. FurFinder aims to leverage community engagement and self-designed algorithms to maximize the chances of reuniting lost pets with their owners.</p>
      </div>
    </div>
  );
};
