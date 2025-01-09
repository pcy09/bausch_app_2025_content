import { buttonFlexEndRowStyle, buttonFlexStartRowStyle, marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
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
import {
  deleteEventAction,
  eventInterestProductAction,
  eventReset,
  getEventDetailAction,
  updateEventDetailAction,
  updateUsingImageListAction,
} from '@/store/reducers/eventReducer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const EventDetailTemplate = () => {
  const dispatch = useDispatch();
  // 이벤트 상세 정보
  const eventDetailData = useSelector(state => state.event.eventDetail);
  const eventUsingImage = useSelector(state => state.event.usingImage);
  const eventSelect = useSelector(state => state.event.eventSelectDetailList);
  const eventOriginSelect = useSelector(state => state.event.eventSelectList);

  // const eventDetailData = useSelector(state => state.event.eventDetail);

  const router = useRouter();

  // 노출 여부 상태 코드
  const [showStatusCode, findShowStatusCode] = useCommonCode('opticianShowStatusCode');

  const editorRef = useRef(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  // 이벤트 기간
  const [eventDate, setEventDate] = useState(null);
  // 이벤트 기간 선택 시 달려 open 유무
  const [open, setOpen] = useState(false);

  // 이벤트 텍스트 에디터에 사용된 이미지 ID
  const [editorImageId, setEditorImageId] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => handleSendData(data);
  const onError = errors => console.log('fail', errors);

  const handleSendData = data => {
    const startDate = dayjs(eventDate[0]).format('YYYY-MM-DD');
    const endDate = dayjs(eventDate[1]).format('YYYY-MM-DD');

    const usingImageList = eventUsingImage.filter(id => data.event_content.includes(id));
    const deleteImageList = eventUsingImage.filter(id => !data.event_content.includes(id));

    const isChangeImage = fileList[0].name === eventDetailData.event_img_uuid_name;
    const formData = new FormData();

    // 썸네일 변경의 경우
    if (!isChangeImage) {
      const file = fileList[0].originFileObj;
      formData.append('image', file);
      formData.append('event_img_path', eventDetailData.event_img_path);
    }
    formData.append('event_title', data?.event_title);
    formData.append('event_content', data?.event_content);
    // TODO: 성욱님 api 추가시 붙일 예정
    formData.append('product_info_ids', JSON.stringify(data?.related_product));

    formData.append('event_start_date', startDate);
    formData.append('event_end_date', endDate);
    formData.append('event_show_status', data.event_show_status);
    formData.append('usingImage', JSON.stringify(usingImageList));
    formData.append('deleteImage', JSON.stringify(deleteImageList));

    dispatch(updateEventDetailAction({ sendObject: formData, id: router.query?.id, callback: router }));
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  // 이벤트 삭제
  const handleDeleteEvent = () => {
    if (router.query?.id) {
      dispatch(deleteEventAction({ id: router.query?.id, callback: router }));
    }
  };

  // 상세 데이터 불러오기
  useEffect(() => {
    if (router.query?.id) {
      dispatch(eventInterestProductAction());
      dispatch(getEventDetailAction({ id: router.query?.id, callback: router }));
    }
    return () => {
      dispatch(eventReset());
    };
  }, [router.query]);

  // 상세 데이터 넣어주기
  useEffect(() => {
    if (eventDetailData?.id) {
      const { event_title, event_content, event_start_date, event_end_date, event_img_uuid_name, event_img_path, event_show_status } =
        eventDetailData;

      setValue('event_title', event_title);
      setValue('event_content', event_content);
      setValue('event_show_status', event_show_status);

      const selectOption = eventSelect?.reduce(
        (acc, cur) =>
          acc.concat({
            label: cur.sku_product_name,

            value: cur.product_info_id,
          }),
        [],
      );

      setValue('related_product', selectOption);
      const thumbnailImgPath = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${event_img_path}`;
      // process.env.NODE_ENV === 'production'
      //   ? `${process.env.NEXT_PUBLIC_API}/${event_img_path}`
      // : `http://localhost:7070/editor/image/${event_img_uuid_name}?path=uploadTest/event/`;

      const start_date = dayjs(event_start_date).format('YYYY-MM-DD');
      const end_date = dayjs(event_end_date).format('YYYY-MM-DD');

      setEventDate([dayjs(start_date, 'YYYY-MM-DD'), dayjs(end_date, 'YYYY-MM-DD')]);

      setFileList([
        {
          uid: event_img_uuid_name,
          name: event_img_uuid_name,
          status: 'done',
          url: thumbnailImgPath,
        },
      ]);
    }
  }, [eventDetailData]);

  // 날짜 변경 함수
  const handleCalendarChange = (dates, dateStrings) => {
    if (dateStrings.length >= 2) {
      setEventDate(dates);
    }
  };

  // 셀렉트

  // 셀렉트 오리지널
  const selectOriginOption = eventOriginSelect?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.sku_product_name,
        id: cur.product_info_id,
        value: cur.product_info_id,
      }),
    [],
  );

  // 셀렉트 상세 value
  // let selectV = selectOption?.reduce(
  //   (acc, cur) =>
  //     acc.concat({
  //       value: cur['label'],
  //     }),
  //   [],
  // );

  // 달력 열 때, 기존 값 삭제
  const handleCalendarOpenChange = open => {
    if (open) {
      setEventDate(null);
    }

    setOpen(open);
  };

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };

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
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <Inputs type="text" value={value || ''} placeholder={'제품명을 입력해주세요.'} {...rest} />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={3} label="관련상품">
              <Controller
                name="related_product"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, onChange, ...rest }, fieldState }) => {
                  return (
                    <Select
                      options={selectOriginOption}
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
                  />
                )}
                rules={{ required: true }}
              />
            </Descriptions.Item>

            <Descriptions.Item span={3} label="썸네일 이미지">
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
                render={({ field: { onCalendarChange, ref, value, onChange, ...rest }, fieldState }) => (
                  <RangePicker
                    // defaultValue={value}
                    placeholder={['시작일', '종료일']}
                    value={eventDate}
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                    onOpenChange={handleCalendarOpenChange}
                    onChange={handleCalendarChange}
                    open={open}
                    // onChange={(date, dateStrings, info) => onChange(date ? dateStrings : info)}
                    {...rest}
                  />
                )}
              />
            </Descriptions.Item>

            <Descriptions.Item span={2} label="노출 여부">
              <Controller
                name="event_show_status"
                control={control}
                defaultValue=""
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <SelectBox options={showStatusCode} value={value || null} placeholder={'선택해주세요'} {...rest} />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </CardContainer>

        <DividingLine border={false} />

        <RowGrid>
          <ColGrid span={2} css={buttonFlexStartRowStyle}>
            <Buttons type={'danger'} name={'삭제'} htmlType={'button'} onClick={handleDeleteEvent} />
          </ColGrid>

          <ColGrid span={23} css={buttonFlexEndRowStyle}>
            <Buttons type={'default'} name={'목록으로'} htmlType={'button'} css={marginRightStyle(5)} onClick={() => router.push('/events')} />
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </ColGrid>
        </RowGrid>
      </Form>
    </>
  );
};

export default EventDetailTemplate;
const buttonRowStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const glassesContainer = css`
  .ant-descriptions-extra {
    position: absolute;
    left: 100px;
  }
`;

const brandSelectBox = css`
  width: 30%;
`;
