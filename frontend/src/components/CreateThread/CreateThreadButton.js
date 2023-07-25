import React, { useState, useEffect } from 'react'
import '../../style/CreateThread/CreateThreadButton.css'
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd'
import CreateThreadForm from './CreateThreadForm'
import { useSelector } from 'react-redux'

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
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [threadType, updateThreadType] = useState('unsetThreadType');

  const onCreate = (values) => {
    setOpen(false);
  }

  const onCancel = () => {
    setOpen(false)
  }

  const handleCreateClick = (e) => {
    if (e.key === 'create-lost-pet') {
      updateThreadType('lostPetThread');
    } else {
      updateThreadType('witnessThread');
    }
    setOpen(true);
  };

  useEffect(() => {
    if (props.shouldOpenCreateThreadForm) {
      updateThreadType(props.threadType);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.shouldOpenCreateThreadForm]);

  return (
    <>
      {user.username &&
        <div className='create-thread'>
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
          <CreateThreadForm open={open}
                        onCreate={onCreate}
                        onCancel={onCancel}
                        initialType={threadType}/>
        </div>
        }
    </>
  )
}

export default CreateThreadButton
