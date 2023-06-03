import React from 'react';
import { Divider, Form, Input, Select, Typography } from 'antd'
import '../../Style/CreateThread/CreateThreadContent.css'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'

function CreateThreadContent ({ threadType, handleThreadTypeUpdate }) {
  const onThreadTypeChange = (e) => {
    console.log("see change type of thread change: ", e);
    handleThreadTypeUpdate(e);
  }


  return (
    <Form.Item className='create-thread-content'>
      <Form.Item name='select-thread-type'
                 label='Alter The Type of Thread You Are Creating'>
        <Select onChange={onThreadTypeChange}>
          <Select.Option value="lost-pet-thread">
            Lost Pet Thread
          </Select.Option>
          <Select.Option value="witness-thread">
            Witness Thread
          </Select.Option>
        </Select>
      </Form.Item>

      <Divider className='between-title-content'/>

      <Typography.Title level={5}>Create Your Thread Content</Typography.Title>

      <Form.Item name='thread-title'
                 label="Thread Title">
        <Input placeholder='Please enter thread title'/>
      </Form.Item>

      <Form.Item className='thread-main-content'
                 name='thread-main-content'
                 label="Thread Content">
        <Input.TextArea rows={3}
                        placeholder={useThreadTypeKeywordSwitch(threadType)('threadContent')}/>
      </Form.Item>

    </Form.Item>
  )
}

export default CreateThreadContent
