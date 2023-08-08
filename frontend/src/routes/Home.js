import '../style/Home.css'
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import Footer from '../components/Navbar/Footer'

export default function Home() {
  return (
    <div>
      <div id="split">
        <div className="split__sides split__sides--lost">
          <div className="split__image split__image--lost">
            <Link to="/threads/create" state={{ initialType: 'lostPetThread' }}>
              <Button className="split__button" type="primary" size="large">
                Report Lost Pet
              </Button>
            </Link>
          </div>
        </div>
        <div className="split__sides split__sides--witness">
          <div className="split__image split__image--witness">
            <Link to="/threads/create" state={{ initialType: 'witnessThread' }}>
              <Button className="split__button" type="primary" size="large">Report Witness</Button>
            </Link>
          </div>
        </div>
      </div>
      <div >
        <Footer/>
      </div>
    </div>
  );
};
