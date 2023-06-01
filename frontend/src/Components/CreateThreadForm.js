import React from 'react';
import { useFormik } from 'formik';
import { Form, Modal, Input, Radio, Select, Divider, DatePicker, Upload, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function CreateThreadForm ({ open, onCreate, onCancel, initialType }) {
  const formik = useFormik({
    initialValues: {

    },
    onSubmit: {

    }
  })

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal className='create-thread-modal'
           open={open}
           title='Create A New Thread'
           okText='Create'
           cancelText='Cancel'
           onCancel={onCancel}>
      <Form layout='vertical'
            name='create-thread-form'>
        <Form.Item name='select-thread-type'
                   label='Choose The Type of Thread You Are Creating'>
          <Select>
            <Select.Option value="missing-pet">
              Missing Pet Thread
            </Select.Option>
            <Select.Option value="witness">
              Witness Thread
            </Select.Option>
          </Select>
        </Form.Item>

        <Divider />

        <Form.Item name='thread-title'
                   label="Thread Title">
          <Input />
        </Form.Item>

        <Form.Item name='pet-name'
                   label='Name'
                   rules={[{
                       required: true,
                       message: 'Please enter the pet name'
                   }]}>
          <Input />
        </Form.Item>

        <Form.Item name='pet-type'
                   label='Breed'>
          <Space.Compact block>
            <Form.Item name={['pet-type', 'species']}
                       style={{width: '50%'}}
                       rules={[{
                         required: true,
                         message: 'Please choose the pet species' }]}>
              <Select placeholder="Select pet species">
                <Select.Option value="Cat">Cat</Select.Option>
                <Select.Option value="Dog">Dog</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name={['pet-type', 'breed']}
                       style={{width: '100%'}}>
              <Input placeholder="Please select pet species" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item name='pet-sex' label='Sex'>
          <Radio.Group>
            <Radio value="female"> Female </Radio>
            <Radio value="male"> Male </Radio>
            <Radio value="enby"> Non-binary </Radio>
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
                   label='Details of the Missing Pet'>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateThreadForm
