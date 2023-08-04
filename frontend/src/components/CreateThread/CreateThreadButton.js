import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function CreateThreadButton () {
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    navigate('/threads/create', { state: { initialType: 'lostPetThread' } });
  };

  return ( // &nbsp; is needed to prevent pushing this button into ellipse
    <Button type="primary" onClick={handleCreateClick}>
      Create&nbsp;
    </Button>
  )
}

export default CreateThreadButton
