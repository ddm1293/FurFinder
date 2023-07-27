import { useLocation } from 'react-router-dom';
import CreateThreadForm from '../components/CreateThread/CreateThreadForm';
import '../style/CreateThread.css';

function CreateThread() {
  const location = useLocation();

  let initialType;
  if (location.state) {
    initialType = location.state.initialType;
  } else {
    initialType = 'lostPetThread';
  }

  return (
    <div className="create-thread">
      <h1>Create Thread</h1>
      <CreateThreadForm initialType={initialType} />
    </div>
  )
}

export default CreateThread
