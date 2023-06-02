import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Form, Modal, Input, Radio, Select, Divider, DatePicker, Upload, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function CreateThreadForm ({ open, onCreate, onCancel, initialType }) {
  const [threadType, updateThreadType] = useState(initialType);

  useEffect(() => {
    updateThreadType(initialType);
  }, [initialType])

  const formik = useFormik({
    initialValues: {

    },
    onSubmit: {

    }
  });

  const onThreadTypeChange = (e) => {
    console.log("see change type of thread change: ", e);
    updateThreadType(e);
  }

  const threadTypeKeyWord = () => {
    if (threadType === 'lost-pet-thread') return 'Lost Pet';
    if (threadType === 'witness-thread') return 'Witness';
    return 'Error';
  }

  const descriptionLabel = () => {
    if (threadType === 'lost-pet-thread') return 'Details of the Missing Pet';
    if (threadType === 'witness-thread') return 'Details of the Witness';
    return 'Error';
  }

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
           title={`Create A New ${threadTypeKeyWord()} Thread`}
           okText='Create'
           cancelText='Cancel'
           onCancel={onCancel}>
      <Form layout='vertical'
            name='create-thread-form' initialValues={{
              ['select-thread-type']: initialType,
      }}>
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
                   label='Breed' style={{ marginBottom: 0 }}>
          <Space.Compact block>
            <Form.Item name='pet-species'
                       style={{width: '50%'}}
                       rules={[{
                         required: true,
                         message: 'Please choose the pet species' }]}>
              <Select placeholder="Select pet species">
                <Select.Option value="cat">Cat</Select.Option>
                <Select.Option value="dog">Dog</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name='pet-breed' style={{width: '100%', marginBottom: 0}}>
              <Form.Item shouldUpdate={(prevValues, currentValues) =>
                           prevValues['pet-species'] !== currentValues['pet-species']
                         }>
                {({ getFieldValue }) => getFieldValue('pet-species') === 'cat' ? (
                  <Form.Item name='cat-breed'>
                    <Select placeholder="Select a cat breed">
                      <Select.Option value="cat">Persian Cat</Select.Option>
                      <Select.Option value="dog">Ragdoll</Select.Option>
                    </Select>
                  </Form.Item>
                ) : (
                  <Form.Item name='dog-breed'>
                    <Select placeholder="Select a dog breed">
                      <Select.Option value="cat">Beagle</Select.Option>
                      <Select.Option value="dog">Golden Retrievers</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
            </Form.Item>
          </Space.Compact>
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
                   label={descriptionLabel()}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateThreadForm
