import { Form, Select, Space } from 'antd'

function BreedSelector ({ required }) {
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
              <Select.Option value="cat">Cat</Select.Option>
              <Select.Option value="dog">Dog</Select.Option>
            </Select>
          </Form.Item>

          {getFieldValue('species') === 'cat' ? (
            <Form.Item name='breed'>
              <Select placeholder="Select a cat breed">
                <Select.Option value="persian-cat">Persian Cat</Select.Option>
                <Select.Option value="ragdoll">Ragdoll</Select.Option>
                <Select.Option value="bengal">Bengal</Select.Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item name='breed'>
              <Select placeholder="Select a dog breed">
                <Select.Option value="beagle">Beagle</Select.Option>
                <Select.Option value="golden_retrievers">Golden Retrievers</Select.Option>
              </Select>
            </Form.Item>
          )}
        </Space.Compact>
      }
    </Form.Item>
  )
}

export default BreedSelector
