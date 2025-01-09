import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { Buttons, CardContainer, ColGrid, DividingLine, Editor, Inputs, RowGrid, SelectBox } from '@/components/atom';
import { DatePicker, Descriptions, Modal, Select, Upload } from 'antd';
import { css } from '@emotion/react';
import { Controller, useForm } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useCommonCode from '@/hooks/useCommonCode';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { eventInterestProductAction, registerEventAction, updateUsingImageListAction } from '@/store/reducers/eventReducer';
import { transDate } from '@/common/utiles';
import Meta from 'antd/lib/card/Meta';

const { RangePicker } = DatePicker;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const EventCreateTemplate = () => {
  const eventData = useSelector(state => state.event);
  const interestSelectData = useSelector(state => state.event.eventSelectList);

  const dispatch = useDispatch();
  const router = useRouter();

  // 이벤트 노출 코드
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

  // 이벤트 텍스트 에디터에 사용된 이미지 ID
  const [editorImageId, setEditorImageId] = useState(null);

  const editorRef = useRef(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const handleSendData = data => {
    const registerData = {
      ...data,
      startDate: data?.event_date && transDate(data?.event_date[0], 'YYYY-MM-DD'),
      //origin : endDate: data?.event_date && transDate(data?.event_date[0], 'YYYY-MM-DD'),
      endDate: data?.event_date && transDate(data?.event_date[1], 'YYYY-MM-DD'),
    };

    const file = fileList[0]?.originFileObj;

    const usingImage = eventData?.usingImage.filter(id => data.event_content.includes(id));
    const deleteImage = eventData?.usingImage.filter(id => !data.event_content.includes(id));

    const formData = new FormData();
    formData.append('image', file);
    formData.append('event_title', data.event_title);
    formData.append('product_info_ids', JSON.stringify(data.product_info_ids));
    formData.append('event_content', data.event_content);
    formData.append('event_start_date', registerData.startDate);
    formData.append('event_end_date', registerData.endDate);
    formData.append('event_show_status', data.event_show_status);
    formData.append('usingImage', JSON.stringify(usingImage));
    formData.append('deleteImage', JSON.stringify(deleteImage));

    dispatch(registerEventAction({ sendObject: formData, callback: router }));
  };

  const handleCancel = () => setPreviewOpen(false);

  // 셀렉트
  const selectOption = interestSelectData?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.sku_product_name,
        id: cur.product_info_id,
        value: cur.product_info_id,
      }),
    [],
  );

  // 썸네일 이미지 미리보기
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // 썸네일 이미지 등록
  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };

  function getInitData() {
    if (interestSelectData.length < 1) {
      dispatch(eventInterestProductAction());
    }
  }

  useEffect(() => {
    getInitData();
  }, [getInitData]);

  useEffect(() => {
    if (editorImageId) {
      dispatch(updateUsingImageListAction({ usingImageId: editorImageId }));
      setEditorImageId(null);
    }

    return () => setEditorImageId(null);
  }, [editorImageId]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContainer>
          <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
            <Descriptions.Item span={3} label="제목">
              <Controller
                name="event_title"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => <Inputs type="text" placeholder={'제품명을 입력해주세요.'} {...rest} />}
              />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="관련상품">
              <Controller
                name="product_info_ids"
                control={control}
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                  return (
                    <Select
                      options={selectOption}
                      mode="multiple"
                      style={{ width: '100%' }}
                      value={value || []}
                      onChange={onChange}
                      placeholder="이벤트 관련 상품을 선택해주세요."
                      {...rest}
                    />
                  );
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="내용">
              <Controller
                name="event_content"
                control={control}
                render={({ field: { ref, value, onChange, ...rest } }) => (
                  <Editor
                    border={false}
                    value={value || ''}
                    onChange={onChange}
                    isError={errors?.content}
                    forwardRef={editorRef}
                    saveEditorImageID={saveEditorImageID}
                    // customHeight={'auto'}
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="썸네일 이미지">
              <Meta description="업로드 권장 사이즈는 1024(너비) × 576(높이)px입니다." style={{ paddingBottom: '10px' }} />
              <>
                <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleUpload} beforeUpload={() => false}>
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  width={800}
                  centered={true}
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                  style={{ position: 'relative' }}>
                  <Image
                    src={previewImage}
                    width={1000}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    alt={'previewImage'}
                    layout="responsive"
                  />
                </Modal>
              </>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="기간">
              <Controller
                name="event_date"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <RangePicker placeholder={['시작일', '종료일']} value={value} format="YYYY-MM-DD" style={{ width: '100%' }} {...rest} />
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="노출 여부">
              <Controller
                name="event_show_status"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={showStatusCode} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={24} css={buttonRowStyle}>
            <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/events')} />
            <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </Form>
    </>
  );
};

export default EventCreateTemplate;

const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
