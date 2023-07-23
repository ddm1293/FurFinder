import { useState, useEffect } from 'react';
import { getCatDogDataAsync } from '../../thunk/formThunk';
import { Form, Select, Space, Button, Modal, Radio, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux'

function BreedSelector ({ required }) {
  const dispatch = useDispatch();

  const catBreeds = useSelector((state) => state.form.catBreeds);
  const dogBreeds = useSelector((state) => state.form.dogBreeds);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [url, setUrl] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (catBreeds.length === 0) {
      dispatch(getCatDogDataAsync()).then(() => {
      });
    }
  }, [catBreeds.length, dispatch]);

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

          {/* <Form.Item name='breed'> */}
          {/*   <Button type="primary" onClick={showModal}> */}
          {/*     Open Modal */}
          {/*   </Button> */}
          {/*   <Modal title="Select Breed" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}
          {/*     <Radio.Group onChange={onChange} value={value}> */}
          {/*       <Radio value={1}>A</Radio> */}
          {/*       <Radio value={2}>B</Radio> */}
          {/*       <Radio value={3}>C</Radio> */}
          {/*       <Radio value={4}>D</Radio> */}
          {/*     </Radio.Group> */}
          {/*   </Modal> */}
          {/* </Form.Item> */}

          {getFieldValue('species') === 'Dog'
            ? (
              <Form.Item name='breed'>
                <Select placeholder="Select a dog breed" showSearch
                        dropdownRender={(menu) => (
                          <>
                            {menu}
                            <Divider
                              style={{
                                margin: '8px 0',
                              }}
                            />
                            <img src={url} style={{ borderRadius: '6px 6px 6px 6px', width: '100%', height: '200px', }}/>
                          </>
                        )}
                >
                  {dogBreeds.map((breed) => (
                    <Select.Option key={breed.name} value={breed.name} onMouseOver={(() => setUrl(breed.url) )}>{breed.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )
            : (
              <Form.Item name='breed'>
                <Select placeholder="Select a cat breed" showSearch>
                  {catBreeds.map((breed) => (
                    <Select.Option key={breed.name} value={breed.name}>{breed.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )
          }
          {/* <img src={url} style={{ borderRadius: '0 6px 6px 6px', height: '150px', }}/> */}
        </Space.Compact>
      }
    </Form.Item>
  )
}

export default BreedSelector
