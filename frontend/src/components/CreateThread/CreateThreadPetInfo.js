import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Upload, Image, Button, InputNumber, Space, Select } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import '../../style/CreateThread/CreateThreadPetInfo.css'
import BreedSelector from './BreedSelector'
import Map from '../Map/Map'
import { CustomDatePicker } from '../CustomDatePicker'
import ColorPickerWrapper from './ColorPickerWrapper'

function CreateThreadPetInfo ({ threadType, form }) {
  const [originalName, setOriginalName] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (threadType === 'witnessThread') {
      setOriginalName(form.getFieldValue('name'));
      form.setFieldsValue({ 'name': 'Unknown' });
    } else if (originalName) {
      form.setFieldsValue({ 'name': originalName });
    }
  }, [threadType, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
     return e?.fileList;
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImages((prevImages) => [...prevImages, reader.result]);
    };
    return false;
  };

  const handleRemovePreview = (index) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  function dummyRequest({ onSuccess }) {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  }

  const setLastSeenLocation = (latLng) => {
    form.setFieldsValue({ lastSeenLocation: latLng });
  }

  const setHomeAddress = (latLng) => {
    form.setFieldsValue({ homeAddress: latLng });
  }

  const setDominantColor = (color) => {
    console.log('Dominant Color:', color);
    form.setFieldsValue({ dominantColor: color });
  };

  const setSecondaryColor = (color) => {
    console.log('Secondary Color:', color);
    form.setFieldsValue({ secondaryColor: color })
  }

  const setSizeNumber = (number) => {
    form.setFieldsValue({ sizeNumber: number })
  }

  return (
    <Form.Item className="create-thread-petInfo">
      <Form.Item
        name='name'
        label='Name'
        rules={[{
          required: true,
          message: 'Please enter the pet name'
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item className='pet-type'
                 label='Breed'
                 required
      >
        <BreedSelector form={form} required={true} />
      </Form.Item>

      <Form.Item name='sex'
                 label='Sex'
                 rules={[{
                   required: true,
                   message: 'Please enter the pet sex'
                 }]}
      >
        <Radio.Group>
          <Radio value="female"> Female </Radio>
          <Radio value="male"> Male </Radio>
          <Radio value="unknown"> Not Sure </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name='dominantColor'
                 label='Dominant color'
                 rules={[{
                   required: true,
                   message: 'Please enter the pet\'s dominant color'
                 }]}>
        <ColorPickerWrapper colorCategory='dominant' setColor={setDominantColor} initialColor={form.getFieldValue('dominantColor')} />
      </Form.Item>
      <Form.Item name='secondaryColor'
                 label='Secondary color'>
        <ColorPickerWrapper colorCategory='secondary' setColor={setSecondaryColor} initialColor={form.getFieldValue('secondaryColor')} />
      </Form.Item>

      <Form.Item
        name='Size'
        label='Size'
      >
        <Space.Compact>
          <Form.Item
            name='sizeCategory'
            rules={[{
              required: true,
              message: 'Please select the pet\'s size category'
            }]}>
            <Select
              style={{
                width: '100px',
              }}
              options={[
              { value: 0, label: 'small' },
              { value: 1, label: 'medium' },
              { value: 2, label: 'large' }
            ]} />
          </Form.Item>
            <Form.Item name='sizeNumber'>
              <InputNumber min={1} max={30} onChange={setSizeNumber} defaultValue={form.getFieldValue('sizeNumber')}/>
              <span style={{ marginLeft: 8, }}>inches</span>
            </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item name='lastSeenTime'
                 label="Last Seen Time"
                 rules={[{
                   required: true,
                   message: 'Please enter the last time of seeing the pet'
                 }]}
      >
        <CustomDatePicker />
      </Form.Item>

      <Form.Item label='Upload Pet Picture'>
        <Form.Item name='pic'
                   valuePropName='fileList'
                   getValueFromEvent={normFile}
                   noStyle>
          <Upload.Dragger name="pet-pic-dragger" customRequest={dummyRequest} accept=".jpg"
                          maxCount={5} beforeUpload={beforeUpload}>
            <p className="pet-pic-drag-icon"><InboxOutlined /></p>
            <p className="pet-pic-upload-text">Click or drag file to this area to upload</p>
            <p className="pet-pic-upload-hint">Support for maximum 5 pictures.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>


      {previewImages.length > 0 &&
        <div className="preview-images">
          {previewImages.map((image, index) => (
            <div key={index} className="preview-image">
              <Image src={image} width={200} />
              <Button icon={<DeleteOutlined />} onClick={() => handleRemovePreview(index)} />
            </div>
          ))}
        </div>
      }

      <Form.Item name='lastSeenLocation'
                 label='Last Seen Location'
                 rules={[{
                   required: true,
                   message: 'Please enter the last seen location of the pet'
                 }]}
      >
        <Map handleMapInfo={setLastSeenLocation} initialPosition={form.getFieldValue('lastSeenLocation')} />
      </Form.Item>

      <Form.Item name='homeAddress'
                 label='Home Address'>
        <Map handleMapInfo={setHomeAddress} initialPosition={form.getFieldValue('homeAddress')} />
      </Form.Item>

      <Form.Item name='description'
                 label={useThreadTypeKeywordSwitch(threadType)('petDescription')}>
        <Input.TextArea rows={3} />
      </Form.Item>

    </Form.Item>
  )
}

export default CreateThreadPetInfo
