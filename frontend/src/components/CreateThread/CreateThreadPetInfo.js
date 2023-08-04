import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, DatePicker, Upload, Image, Button} from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import '../../style/CreateThread/CreateThreadPetInfo.css'
import BreedSelector from './BreedSelector'
import Map from '../Map/Map'
import dayjs from 'dayjs';

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
    console.log('Upload event:', e);
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
    return false; // Prevent default upload behavior
  };

  const handleRemovePreview = (index) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  }

  const handleMapInfo = (latLng) => {
    form.setFieldsValue({ lastSeenLocation: latLng });
  }
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate = (currentDate) => {
    return currentDate && currentDate.isAfter(dayjs().endOf('day'));
  };

  const disabledTime = (selectedDate) => {
    if (selectedDate && selectedDate.isSame(dayjs(), 'day')) {
      const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();
      return {
        disabledHours: () => range(currentHour + 1, 24),
        disabledMinutes: () => range(currentMinute + 1, 60),
      };
    }
    return {};
  };

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

      <Form.Item name='lastSeenTime'
                 label="Last Seen Time"
                 rules={[{
                   required: true,
                   message: 'Please enter the last time of seeing the pet'
                 }]}
      >
        <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledDate}
          disabledTime={disabledTime}
        />
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
              <Image src={image} width={100} />
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
        <Map handleMapInfo={handleMapInfo} initialPosition={form.getFieldValue('lastSeenLocation')} />
      </Form.Item>

      <Form.Item name='description'
                 label={useThreadTypeKeywordSwitch(threadType)('petDescription')}>
        <Input.TextArea rows={3} />
      </Form.Item>

    </Form.Item>
  )
}

export default CreateThreadPetInfo
