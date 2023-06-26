import { Form, Radio, DatePicker } from 'antd'
import '../../../style/Forum/AdvancedSearchSideBar.css'

function AdvancedSearchSiderBar ({ }) {
  return (
    <div className='advanced-search-main-content'>
      <Form className='advanced-search-form' >
        <Form.Item name='pet-sex' label='Sex'>
          <Radio.Group>
            <Radio value="female"> Female </Radio>
            <Radio value="male"> Male </Radio>
            <Radio value="unknown"> Not Sure</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='last-seen-time-range' label='Last Seen Time Range'>
          <DatePicker.RangePicker showTime />
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdvancedSearchSiderBar
