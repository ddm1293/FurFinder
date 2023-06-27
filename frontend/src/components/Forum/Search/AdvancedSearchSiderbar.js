import { Form, Radio, DatePicker, Input, Button } from 'antd'
import '../../../style/Forum/AdvancedSearchSideBar.css'
import BreedSelector from '../../CreateThread/BreedSelector'

function AdvancedSearchSiderBar ({ onClose }) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className='advanced-search-main-content'>
      <Form
        className='advanced-search-form'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item name='petName' label='Name'>
          <Input placeholder="Pet Name" />
        </Form.Item>

        <Form.Item name='sex' label='Sex'>
          <Radio.Group>
            <Radio value="female"> Female </Radio>
            <Radio value="male"> Male </Radio>
            <Radio value="unknown"> Not Sure</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='last-seen-time-range' label='Last Seen Time'>
          <DatePicker.RangePicker showTime />
        </Form.Item>

        <Form.Item label='Breed' >
          <BreedSelector required={false} />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button htmlType="button" onClick={onClose}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdvancedSearchSiderBar
