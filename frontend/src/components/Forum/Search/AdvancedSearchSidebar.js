import { Form, Radio, Input, Button, Modal } from 'antd'
import '../../../style/Forum/AdvancedSearchSideBar.css'
import BreedSelector from '../../CreateThread/BreedSelector'
import dayjs from 'dayjs'
import { produce } from 'immer'
import { useDispatch } from 'react-redux'
import { searchThreadsAsync } from '../../../thunk/forumThunk'
import { useState } from 'react'
import { CustomRangePicker } from '../../CustomDatePicker'

function AdvancedSearchSidebar ({ onClose, threadType, form }) {
  const dispatch = useDispatch();
  const [showNoMatchedThreadsModal, setShowNoMatchedThreadsModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
      } else {
        lastSeenEnd = dayjs().format();
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

    if (params.breed || params.lastSeenRange || params.lastSeenStart || params.lastSeenEnd || params.petName || params.sex || params.species) {
      dispatch(searchThreadsAsync(params))
        .then((results) => {
          setSearchResults(results.payload);
          setShowNoMatchedThreadsModal(results.payload.length === 0);
        })
        .catch((error) => {
          console.error("Search Error - failed to fetch data:", error);
        });
    }
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
          <CustomRangePicker />
        </Form.Item>

        <Form.Item label='Breed'>
          <BreedSelector form={form} required={false} />
        </Form.Item>

        <Form.Item>
          <Button className="form-buttons" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="form-buttons" htmlType="button" onClick={onClose}>
            Close
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="No Matched Threads"
        visible={showNoMatchedThreadsModal}
        onOk={() => setShowNoMatchedThreadsModal(false)}
        onCancel={() => setShowNoMatchedThreadsModal(false)}
      >
        No matched threads.
      </Modal>
    </div>
  )
}

export default AdvancedSearchSidebar
