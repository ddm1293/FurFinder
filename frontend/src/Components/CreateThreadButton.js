import React, { useState, useEffect } from 'react'
import '../Style/CreaeteThreadButton.css'
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message } from 'antd'
import CreateThreadForm from './CreateThreadForm'

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

function CreateThreadButton () {
  const [open, setOpen] = useState(false);
  const [threadType, updateThreadType] = useState('unsetThreadType');

  const onCreate = (values) => {
    console.log('clicked, open thread', values);
    setOpen(false);
  }

  const onCancel = () => {
    setOpen(false)
  }

  const handleCreateClick = (e) => {
    if (e.key === 'create-lost-pet') {
      updateThreadType('lost-pet-thread');
    } else {
      updateThreadType('witness-thread');
    }
    setOpen(true);
  };

  return (
    <div className='create-thread'>
      <Dropdown
        menu={{
          items: items,
          onClick: handleCreateClick,
        }}
        autoAdjustOverflow>
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
  )
}

export default CreateThreadButton
