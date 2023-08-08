import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function CreateThreadButton () {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/threads/create', { state: { initialType: 'lostPetThread' } });
  };

  return (
    <Button type="primary" onClick={handleCreateClick}>
      Create&nbsp;
    </Button>
  )
}

export default CreateThreadButton
