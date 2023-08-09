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
import { getApiUrl } from '../../utils/getApiUrl'

function UpdateThreadForm ({ open, onUpdate, onCancel, threadId }) {
  const [threadType, updateThreadType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getThreadAsync(threadId)).then((res) => {
      const thread = res.payload.thread;

      axios
        .get(getApiUrl(`/pet/${thread.pet}`))
        .then((response) => {
          const pet = response.data;
          if (!pet) return;
          const homeAddressCoordinates = pet.homeAddress
            ? {
              lat: pet.homeAddress.coordinates[1],
              lng: pet.homeAddress.coordinates[0],
            }
            : null;

          updateThreadType(thread.threadType);
          form.setFieldsValue({
            'threadType': thread.threadType,
            'title': thread.title,
            'content': thread.content,
            'name': pet.name,
            'species': pet.species,
            'breed': pet.breed,
            'id': pet.id,
            'description': pet.description,
            'dominantColor': pet.color.dominantColor,
            'secondaryColor': pet.color.secondaryColor,
            'sizeCategory': pet.sizeCategory,
            'sizeNumber': pet.sizeNumber,
            'sex': pet.sex,
            'lastSeenTime': dayjs(pet.lastSeenTime),
            'pic': pet.pic,
            'lastSeenLocation': {
              lat: pet.lastSeenLocation.coordinates[1],
              lng: pet.lastSeenLocation.coordinates[0]
            },
            'homeAddress' : homeAddressCoordinates
          });
        })
        .catch((error) => {
          console.error('Error fetching pet data', error);
        });
    });
  }, [dispatch, form, threadId]);

  const onFinish = (values) => {
    const valuesWithPoster = { ...values, poster: user.id };
    dispatch(updateThreadAsync({ threadId: threadId, updateData: valuesWithPoster }))
      .then(action => {
        if (updateThreadAsync.fulfilled.match(action)) {
          dispatch(refresh());
          navigate(`/threads/${threadId}`);
          window.location.reload();
          onUpdate();
        } else {
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
                 console.log('Form Validate Failed:', reason);
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
