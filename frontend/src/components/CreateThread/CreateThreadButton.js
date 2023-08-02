import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import '../../style/CreateThread/CreateThreadButton.css'

const items = [
  {
    key: 'create-lost-pet',
    label: 'Create A Lost Pet Thread',
  },
  {
    key: 'create-witness',
    label: 'Create A Witness Thread',
  }
];

function CreateThreadButton (props) {
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    if (e.key === 'create-lost-pet') {
      navigate('/threads/create', { state: { initialType: 'lostPetThread' } });
    } else {
      navigate('/threads/create', { state: { initialType: 'witnessThread' } });
    }
  };

  return (
    <div className='create-button'>
      <Dropdown
        menu={{
          items: items,
          onClick: handleCreateClick,
        }}
        autoAdjustOverflow
      >
        <Button type="primary">
          <Space>
            <span className='create-button-text'>Create</span>
            <CaretDownOutlined className='create-button-icon'/>
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}

export default CreateThreadButton
