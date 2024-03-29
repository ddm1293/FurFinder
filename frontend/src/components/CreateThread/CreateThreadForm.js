import React, { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateThreadContent from './CreateThreadContent';
import CreateThreadPetInfo from './CreateThreadPetInfo';
import { refresh } from '../../store/forumSlice';
import { createThreadAsync } from '../../thunk/threadThunk';
import { Form, Divider, Button } from 'antd';
import { sendGroupNotification } from '../../notification/sendGroupNotification'

function CreateThreadForm ({ initialType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const [threadType, updateThreadType] = useState(initialType);

  const [form] = Form.useForm();

  const validateForm = () => {
    form.validateFields()
      .then(() => {
        form.submit();
      })
      .catch((reason) => {
        console.log('Form Validate Failed:', reason);
    });
  }

  const onFinish = (values) => {
    const valuesWithPoster = { ...values, poster: user.id };
    dispatch(createThreadAsync(valuesWithPoster))
      .then(async action => {
        if (createThreadAsync.fulfilled.match(action)) {
          const threadId = action.payload._id;
          navigate(`/threads/${threadId}`);
          dispatch(refresh());
          await sendGroupNotification(threadId, "Relevant Thread", "relevantThread");
        } else {
          console.log('Cannot open the new Thread.' + action.error.message);
        }
      });
  };

  useEffect(() => {
    updateThreadType(initialType);
  }, [initialType]);

  return (
    <Form layout='horizontal'
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
      <Form.Item>
        <Button type="primary" onClick={validateForm}>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateThreadForm
