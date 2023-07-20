import React from 'react';
import { Divider, Form, Input, Select, Typography } from 'antd'
import '../../style/CreateThread/CreateThreadContent.css'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'

function CreateThreadContent ({ threadType, handleThreadTypeUpdate }) {
  const onThreadTypeChange = (e) => {
    console.log("see change type of thread change: ", e);
    handleThreadTypeUpdate(e);
  }

  return (
    <Form.Item className='create-thread-content'>
      <Form.Item name='threadType'
                 label='Alter The Type of Thread You Are Creating'>
        <Select onChange={onThreadTypeChange}>
          <Select.Option value="lostPetThread">
            Lost Pet Thread
          </Select.Option>
          <Select.Option value="witnessThread">
            Witness Thread
          </Select.Option>
        </Select>
      </Form.Item>

      <Divider className='between-title-content'/>

      <Typography.Title level={5}>Create Your Thread Content</Typography.Title>

      <Form.Item name='title'
                 label="Thread Title"
                 rules={[{
                   required: true,
                   message: 'Please enter a thread title'
                 }]}
      >
        <Input placeholder='Please enter thread title'/>
      </Form.Item>

      <Form.Item className='thread-main-content'
                 name='content'
                 label="Thread Content">
        <Input.TextArea rows={3}
                        placeholder={useThreadTypeKeywordSwitch(threadType)('threadContent')}/>
      </Form.Item>

    </Form.Item>
  )
}

export default CreateThreadContent
