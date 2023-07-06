import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, DatePicker, Upload, Space} from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import '../../style/CreateThread/CreateThreadPetInfo.css'
import BreedSelector from './BreedSelector'

function CreateThreadPetInfo ({ threadType, form }) {
  const [originalName, setOriginalName] = useState('');



  useEffect(() => {
    if (threadType === 'witnessThread') {
      form.setFieldsValue({ 'pet-name': 'Unknown' });
    } else if (originalName) {
      form.setFieldsValue({ 'pet-name': originalName });
    }
  }, [threadType, form]);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  }

  return (
    <Form.Item className="create-thread-petInfo">
      <Form.Item
        name='pet-name'
        label='Name'
        rules={[{
          required: true,
          message: 'Please enter the pet name'
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='pet-type'
                 className='pet-type'
                 label='Breed'>
        <BreedSelector required={true} />
      </Form.Item>

      <Form.Item name='id' label='ID'>
        <Input placeholder='Enter the pet ID (optional)' />
      </Form.Item>

      <Form.Item name='pet-sex' label='Sex'>
        <Radio.Group>
          <Radio value="female"> Female </Radio>
          <Radio value="male"> Male </Radio>
          <Radio value="enby"> Non-binary </Radio>
          <Radio value="not-sure-sex"> Not Sure </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name='missing-date' label="Last Seen Time">
        <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
      </Form.Item>

      <Form.Item label='Upload Pet Picture'>
        <Form.Item name='pet-pic'
                   valuePropName='fileList'
                   getValueFromEvent={normFile}
                   noStyle>
          <Upload.Dragger name="pet-pic-dragger" customRequest={dummyRequest} accept=".jpg" maxCount={1}>
            <p className="pet-pic-drag-icon"><InboxOutlined /></p>
            <p className="pet-pic-upload-text">Click or drag file to this area to upload</p>
            <p className="pet-pic-upload-hint">Support for a single upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item name='description'
                 label={useThreadTypeKeywordSwitch(threadType)('petDescription')}>
        <Input.TextArea rows={3} />
      </Form.Item>

    </Form.Item>
  )
}

export default CreateThreadPetInfo
