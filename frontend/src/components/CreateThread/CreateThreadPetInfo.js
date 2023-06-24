import React, { useEffect } from 'react'
import { Form, Input, Radio, Select, DatePicker, Upload} from 'antd';
import { InboxOutlined } from '@ant-design/icons'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import '../../style/CreateThread/CreateThreadPetInfo.css'

function CreateThreadPetInfo ({ threadType, form }) {

  useEffect(() => {
    if (threadType === 'witness-thread') {
      form.setFieldsValue({ 'pet-name': 'Unknown' });
    } else {
      form.setFieldsValue({ 'pet-name': '' });
    }
  }, [threadType, form]);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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

      <Form.Item name='id' label='ID'>
        <Input placeholder='Enter the pet ID (optional)' />
      </Form.Item>

      {/* <Form.Item name='pet-type' */}
      {/*            className='pet-type' */}
      {/*            label='Breed'> */}
      {/*   <Space.Compact block> */}
      {/*     <Form.Item className='pet-species' */}
      {/*                name='pet-species' */}
      {/*                rules={[{ */}
      {/*                  required: true, */}
      {/*                  message: 'Please choose the pet species' }]}> */}
      {/*       <Select placeholder="Select pet species"> */}
      {/*         <Select.Option value="cat">Cat</Select.Option> */}
      {/*         <Select.Option value="dog">Dog</Select.Option> */}
      {/*       </Select> */}
      {/*     </Form.Item> */}

      {/*     <Form.Item className='pet-breed' */}
      {/*                name='pet-breed'> */}
      {/*       <Form.Item shouldUpdate={(prevValues, currentValues) => */}
      {/*         prevValues['pet-species'] !== currentValues['pet-species'] */}
      {/*       }> */}
      {/*         {({ getFieldValue }) => getFieldValue('pet-species') === 'cat' ? ( */}
      {/*           <Form.Item name='cat-breed'> */}
      {/*             <Select placeholder="Select a cat breed"> */}
      {/*               <Select.Option value="cat">Persian Cat</Select.Option> */}
      {/*               <Select.Option value="dog">Ragdoll</Select.Option> */}
      {/*             </Select> */}
      {/*           </Form.Item> */}
      {/*         ) : ( */}
      {/*           <Form.Item name='dog-breed'> */}
      {/*             <Select placeholder="Select a dog breed"> */}
      {/*               <Select.Option value="cat">Beagle</Select.Option> */}
      {/*               <Select.Option value="dog">Golden Retrievers</Select.Option> */}
      {/*             </Select> */}
      {/*           </Form.Item> */}
      {/*         )} */}
      {/*       </Form.Item> */}
      {/*     </Form.Item> */}
      {/*   </Space.Compact> */}
      {/* </Form.Item> */}
      <Form.Item className='pet-breed' label='Breed'>
        <Form.Item name='pet-species'
                   rules={[{ required: true, message: 'Please choose the pet species' }]}>
          <Select placeholder="Select pet species">
            <Select.Option value="cat">Cat</Select.Option>
            <Select.Option value="dog">Dog</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={(prevValues, currentValues) =>
          prevValues['pet-species'] !== currentValues['pet-species']
        }>
          {({ getFieldValue }) => getFieldValue('pet-species') === 'cat' ? (
            <Form.Item name='pet-breed'>
              <Select placeholder="Select a cat breed">
                <Select.Option value="persian">Persian Cat</Select.Option>
                <Select.Option value="ragdoll">Ragdoll</Select.Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item name='pet-breed'>
              <Select placeholder="Select a dog breed">
                <Select.Option value="beagle">Beagle</Select.Option>
                <Select.Option value="golden">Golden Retrievers</Select.Option>
              </Select>
            </Form.Item>
          )}
        </Form.Item>
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
        <DatePicker showTime/>
      </Form.Item>

      <Form.Item label='Upload Pet Picture'>
        <Form.Item name='pet-pic'
                   valuePropName='fileList'
                   getValueFromEvent={normFile}
                   noStyle>
          <Upload.Dragger name="pet-pic-dragger" action="/upload.do">
            <p className="pet-pic-drag-icon"><InboxOutlined /></p>
            <p className="pet-pic-upload-text">Click or drag file to this area to upload</p>
            <p className="pet-pic-upload-hint">Support for a single or bulk upload.</p>
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
