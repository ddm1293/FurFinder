import { Form, Radio, DatePicker, Input, Button } from 'antd'
import '../../../style/Forum/AdvancedSearchSideBar.css'
import BreedSelector from '../../CreateThread/BreedSelector'
import dayjs from 'dayjs'
import { produce } from 'immer'
import { useDispatch } from 'react-redux'
import { searchThreadsAsync } from '../../../thunk/forumThunk'

function AdvancedSearchSiderBar ({ onClose, threadType }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    let lastSeenStart, lastSeenEnd;
    if (values.lastSeenRange) {
      lastSeenStart = values.lastSeenRange[0];
      lastSeenEnd = values.lastSeenRange[1];

      if (lastSeenStart) {
        lastSeenStart = lastSeenStart.format();
      }
      if (lastSeenEnd) {
        lastSeenEnd = lastSeenEnd.format();
      }
    }

    const params = produce(values, (draft) => {
      if (values.lastSeenRange) {
        delete draft.lastSeenRange;
      }
      draft.threadType = threadType;
      if (lastSeenStart) {
        draft.lastSeenStart = lastSeenStart;
      }
      if (lastSeenEnd) {
        draft.lastSeenEnd = lastSeenEnd;
      }
    });
    dispatch(searchThreadsAsync(params));
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

        <Form.Item name='lastSeenRange' label='Last Seen Time'>
          <DatePicker.RangePicker
            showTime={{
            format: 'HH:mm'
          }}
            allowEmpty={[true, true]}
            format="YYYY-MM-DD HH:mm"
          />
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
