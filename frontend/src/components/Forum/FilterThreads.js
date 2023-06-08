import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterThread } from '../../store/forumSlice'
import { DatePicker, Form, Radio } from 'antd'
import { Button } from 'antd'

function FilterThreads () {
  const [option, setOption] = useState('all')
  const dispatch = useDispatch()

  return (
    <div className="filter-container">

      <h3>Threads</h3>
      <div className="filter-thread-type">
        <Radio.Group
          onChange={(event) => {setOption(event.target.value)}}
          value={option}>
          <Radio value={'all'}>All</Radio>
          <Radio value={'lost'}>Lost</Radio>
          <Radio value={'witness'}>Witness</Radio>
        </Radio.Group>
        <Button
          type="primary"
          onClick={() => {dispatch(filterThread(option))}}
        >Search</Button>
      </div>

      <h3>Filter</h3>
      <div>
        <Form
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 12 }} // width of form: 12 -> 50% of container space
          layout="horizontal"
          // disabled={componentDisabled}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Type">
            <Radio.Group>
              <Radio value="dog"> Dog </Radio>
              <Radio value="cat"> Cat </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Sex">
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Last Seen Time">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default FilterThreads