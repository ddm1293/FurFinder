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

  const onCreate = (values) => {
    console.log('clicked, open thread', values);
    setOpen(false);
  }

  const onCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log('open state: ', open);
  }, [open])


  const handleCreateClick = (e) => {
    setOpen(true);
    message.info('Click on menu item.');
    console.log('click', e);
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
                        onCancel={onCancel}/>
    </div>
  )
}

export default CreateThreadButton
