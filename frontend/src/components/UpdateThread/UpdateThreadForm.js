import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Modal, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import CreateThreadContent from '../CreateThread/CreateThreadContent'
import CreateThreadPetInfo from '../CreateThread/CreateThreadPetInfo'
import { useDispatch, useSelector} from 'react-redux';
import { updateThreadAsync, getThreadAsync} from '../../thunk/threadThunk';
import dayjs from 'dayjs';
import { refresh } from '../../store/forumSlice';

function UpdateThreadForm ({ open, onUpdate, onCancel, threadId }) {
  const [threadType, updateThreadType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getThreadAsync(threadId)).then((res) => {
      // console.log("Got thread data: ", res);
      const thread = res.payload.thread;
      // console.log('thread from update: ', thread);
      // if (!thread.pet || !thread.kind) return; // some checks, shouldn't be triggered at all

      axios
        .get(`https://furfinder-server.onrender.com/pet/${thread.pet}`)
        .then((response) => {
          // console.log("Got pet data: ", response);
          const pet = response.data;
          // console.log('pet from update: ', pet);
          if (!pet) return; // Add check here

          // console.log("moment: ", dayjs(pet.lastSeenTime));

          updateThreadType(thread.kind);
          form.setFieldsValue({
            'threadType': thread.threadType,
            'title': thread.title,
            'content': thread.content,
            'name': pet.name,
            'species': pet.species,
            'breed': pet.breed,
            'id': pet.id,
            'description': pet.description,
            'sex': pet.sex,
            'lastSeenTime': dayjs(pet.lastSeenTime),
            'pic': pet.pic,
            'lastSeenLocation': {
              lat: pet.lastSeenLocation.coordinates[1],
              lng: pet.lastSeenLocation.coordinates[0]
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching pet data', error);
        });
    });
  }, [dispatch, form, threadId]);

  const onFinish = (values) => {
    const valuesWithPoster = { ...values, poster: user.id };
    // console.log('threadID: ', threadId);
    // console.log('form got submitted:', valuesWithPoster);
    dispatch(updateThreadAsync({ threadId: threadId, updateData: valuesWithPoster }))
      .then(action => {
        // check if the action completed successfully
        // console.log('Action:', action);
        if (updateThreadAsync.fulfilled.match(action)) {
          // const threadId = action.payload._id;
          dispatch(refresh());
          navigate(`/threads/${threadId}`);
          window.location.reload();
          onUpdate();
        } else {
          // handle the error
          console.log('Cannot open the new Thread.' + action.error.message);
        }
      });
  };


  return (
    <Modal className='update-thread-modal'
           open={open}
           title={`Update Your Thread`}
           okText='Update'
           onOk={() => {
             form.validateFields()
               .then(() => {
                 form.submit();
               })
               .catch((reason) => {
                 console.log('Validate Failed:', reason);
               });
           }}
           cancelText='Cancel'
           onCancel={() => {
             onCancel();
           }}>
      <Form layout='vertical'
            name='update-thread-form'
            form={form}
            onFinish={onFinish}
            scrollToFirstError>
        <CreateThreadContent threadType={threadType}
                             handleThreadTypeUpdate={updateThreadType}
                             />
        <Divider />
        <CreateThreadPetInfo threadType={threadType} form={form}/>
      </Form>
    </Modal>
  )
}

export default UpdateThreadForm
