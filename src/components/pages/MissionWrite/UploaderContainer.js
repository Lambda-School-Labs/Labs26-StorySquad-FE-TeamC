// Uploader logic

import React, { useState } from 'react';
import RenderUploader from './RenderUploader';
import { useLocalStorage } from '../../../utils/hooks';
import { LoadingComponent } from '../../common';
import { useHistory } from 'react-router-dom';

// api
import { uploadSubmissionData, getData } from '../../../api';

const Uploader = () => {
  const { push } = useHistory();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState({
    success: null,
    error: null,
  });

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [userId] = useLocalStorage('curUserId');
  const [curUserToken] = useLocalStorage('curUserToken');
  let missionId = '';

  getData(`child/${userId}/mission`, curUserToken)
    .then(res => {
      missionId = res.data.mission_id;
      console.log('getDataRes: ', res);
    })
    .catch(err => {
      console.log('getData error: ', err.message);
    });

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onSubmit = e => {
    setIsLoading(true);
    e.preventDefault();
    // build formData
    const formData = new FormData();

    // 'child/userId/mission'
    const endpoint = `child/${userId}/mission/write`;
    fileList.forEach(file => {
      formData.append('images: ', file);
    });
    // endpoint, payload, userToken
    uploadSubmissionData(endpoint, formData, curUserToken)
      .then(res => {
        console.log('submisisonRes: ', res);
        setValidationMessage({ success: res.data.message, error: null });
        setTimeout(() => {
          setIsLoading(false);
          push('/mission');
        }, 2000);
      })
      .catch(err => {
        setValidationMessage({ success: null, error: err.message });
        console.log('Upload Failed: ', err.message);
      });
  };

  return (
    <>
      <RenderUploader
        validationMessage={validationMessage}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        onSubmit={onSubmit}
      />
      {isLoading && <LoadingComponent />}
    </>
  );
};

export default Uploader;
