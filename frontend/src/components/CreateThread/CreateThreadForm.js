import React, { useEffect,  useState } from 'react'
import { Form, Modal, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import CreateThreadContent from './CreateThreadContent'
import '../../style/CreateThread/CreateThreadForm.css'
import CreateThreadPetInfo from './CreateThreadPetInfo'
import useThreadTypeKeywordSwitch from './useThreadTypeKeywordSwitch'
import { useDispatch, useSelector} from 'react-redux';
import { createThreadAsync } from '../../thunk/threadThunk';

function CreateThreadForm ({ open, onCreate, onCancel, initialType }) {
  const [threadType, updateThreadType] = useState(initialType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    updateThreadType(initialType);
  }, [initialType])

  const onFinish = (values) => {
    const valuesWithPoster = { ...values, poster: user.id };
    console.log('form got submitted:', valuesWithPoster);
    dispatch(createThreadAsync(valuesWithPoster))
      .then(action => {
        // check if the action completed successfully
        if (createThreadAsync.fulfilled.match(action)) {
          const threadId = action.payload._id;
          navigate(`/threads/${threadId}`);
          onCreate();
        } else {
          // handle the error
          console.log('Cannot open the new Thread.' + action.error.message);
        }
      });
  };

  const [form] = Form.useForm();

  return (
    <Modal className='create-thread-modal'
           open={open}
           title={`Create A New ${useThreadTypeKeywordSwitch(threadType)('threadType')} Thread`}
           okText='Create'
           onOk={() => {
             form.validateFields()
               .then((values) => {
                 form.submit();
               })
               .catch((reason) => {
                 console.log('Validate Failed:', reason);
               })
           }}
           cancelText='Cancel'
           onCancel={() => {
             form.resetFields();
             onCancel();
           }}>
      <Form layout='vertical'
            name='create-thread-form'
            form={form}
            initialValues={{
              ['threadType']: initialType,
            }}
            onFinish={onFinish}
            scrollToFirstError>
        <CreateThreadContent threadType={threadType}
                             handleThreadTypeUpdate={updateThreadType}/>
        <Divider />
        <CreateThreadPetInfo threadType={threadType} form={form}/>
      </Form>
    </Modal>
  )
}

export default CreateThreadForm
