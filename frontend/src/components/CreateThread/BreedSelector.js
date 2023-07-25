import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCatDogDataAsync } from '../../thunk/formThunk';
import { Form, Select, Space, Button, Modal, Radio } from 'antd';
import '../../style/CreateThread/BreedSelector.css';

function BreedSelector ({ form, required }) {
  const dispatch = useDispatch();

  const catBreeds = useSelector((state) => state.form.catBreeds);
  const dogBreeds = useSelector((state) => state.form.dogBreeds);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(undefined); // must be undefined for searchThreadsAsync

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const onRadio = (e) => {
    setSelectedBreed(e.target.value);
  };

  useEffect(() => {
    if (catBreeds.length === 0) {
      dispatch(getCatDogDataAsync()).then(() => {
      });
    }
  }, [catBreeds.length, dispatch]);

  useEffect(() => {
    form.setFieldsValue({ breed: selectedBreed });
  }, [selectedBreed]); // set form breed field

  return (
    <Form.Item shouldUpdate={(prevValues, currentValues) =>
      prevValues['species'] !== currentValues['species']
    }>
      {({ getFieldValue }) =>
        <Space.Compact block>
          <Form.Item className='pet-species'
                     name='species'
                     rules={[{
                       required: required,
                       message: 'Please choose the pet species' }]}>
            <Select placeholder="Select pet species">
              <Select.Option value="Cat">Cat</Select.Option>
              <Select.Option value="Dog">Dog</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name='breed'>
            <Button type="primary" onClick={showModal}>
              Select Breed
            </Button>
            <Modal title="Select Breed" open={isModalOpen} onOk={hideModal} onCancel={hideModal}>
              <div style={{ height: '65vh', overflow: 'auto', border: '1px solid #ccc', borderRadius: '3px', padding: '10px' }}>
                <Radio.Group onChange={onRadio} value={selectedBreed}>
                  <Space direction="vertical">
                    {
                      getFieldValue('species') === 'Dog'
                        ? dogBreeds.map((breed) => (
                            <Radio key={breed.name} value={breed.name}>
                              <img src={breed.url} alt="pet pic" className="pet-pic" />
                              {breed.name}
                            </Radio>
                          ))
                        : catBreeds.map((breed) => (
                          <Radio key={breed.name} value={breed.name}>
                            <img src={breed.url} alt="pet pic" className="pet-pic" />
                            {breed.name}
                          </Radio>
                        ))
                    }
                  </Space>
                </Radio.Group>
              </div>
            </Modal>
          </Form.Item>
        </Space.Compact>
      }
    </Form.Item>
  )
}

export default BreedSelector
