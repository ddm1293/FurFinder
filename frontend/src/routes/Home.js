import '../style/Home.css'
import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div id="split">
        <div className="split__sides split__sides--lost">
          <div className="split__image split__image--lost">
            <Link to="/threads" state={{ filterOptions: "lost", shouldOpenCreateThreadForm: true, threadType: 'lost-pet-thread' }}>
              <Button className="split__button" type="primary" size="large">
                Report Lost Pet
              </Button>
            </Link>
          </div>
        </div>
        <div className="split__sides split__sides--witness">
          <div className="split__image split__image--witness">
            <Link to="/threads" state={{ filterOptions: "witness", shouldOpenCreateThreadForm: true, threadType: 'witness-thread' }}>
              <Button className="split__button" type="primary" size="large">Report Witness</Button>
            </Link>
          </div>
        </div>
      </div>
      <div id="about">
        <h1>About</h1>
        <p><strong>FurFinder</strong> is a web-based platform designed to help pet owners to locate their lost pets (only cats and dogs for now). It provides a centralized space for creating lost-pet threads, reporting sightings, and accessing resources to aid in the search effort. The platform offers user authentication, enabling secure login with options like Facebook accounts for increased credibility. Key features include automatic thread updates, notification system for potential witnesses, a thread map with marked locations, and (hopefully) a missing pet flyer generator. FurFinder aims to leverage community engagement and self-designed algorithms to maximize the chances of reuniting lost pets with their owners.</p>
      </div>
      <div id="contact-us">
        <h1>Contact Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
};
