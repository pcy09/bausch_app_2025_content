import { Fragment, useEffect } from 'react';
import { alignCenter, buttonFlexEndRowStyle, contentsContainerStyle, marginLeftStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';
import { Buttons, CardContainer, ColGrid, DividingLine, Form, Inputs, RowGrid } from '@/components/atom';
import { Switch, Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { PlusCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import Card from '@/components/atom/Card';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '@/store/reducers/modalReducer';
import Image from 'next/image';
import { bannerReset, deleteBannerAction, getBannerListAction, updateBannerAction, updateThumbnailAction } from '@/store/reducers/bannerReducer';
import { transDate } from '@/common/utiles';
// 테스트 팝업 추가

const BannerTemplate = () => {
  const bannerList = useSelector(state => state.banner.bannerList);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => console.log(data);
  const onError = e => console.log(e);
  // 이미지 제외한 정보 api 호출
  const handleUpdateBanner = item => {
    const banner_page_link = getValues(`banner_page_link-${item.id}`);
    const banner_open_new_page = getValues(`banner_open_new_page-${item.id}`);
    const banner_order = parseInt(getValues(`banner_order-${item.id}`));
    const sendObject = {
      banner_page_link: !banner_page_link ? null : banner_page_link,
      banner_open_new_page: banner_open_new_page === true ? 'Y' : 'N',
      banner_order,
      banner_title: item.banner_title,
      id: item.id,
    };
    dispatch(updateBannerAction({ sendObject }));
  };

  // 썸네일 이미지 변경
  const handleUpload = ({ fileList: newFileList }, item) => {
    // 썸네일 이미지는 여기서 바로 변경 api 호출
    const file = newFileList[0].originFileObj;
    const past_image_path = item.banner_img_path.split(`${process.env.NEXT_PUBLIC_IMAGE_URL}/`)[1];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('past_image_path', past_image_path);
    formData.append('id', item.id);
    // dispatch로 api 호출 부분
    // console.log(file, past_image_path);
    dispatch(updateThumbnailAction({ sendObject: formData }));
  };

  // 배너 삭제
  const handleDeleteBanner = id => {
    const sendObject = { id };
    dispatch(deleteBannerAction({ sendObject }));
  };

  const handleAddBanner = () => {
    // 배너 추가화면 호출
    const updateData = {
      show: true,
      type: 'drawer-root',
      name: 'createBanner',
      items: [],
    };
    dispatch(openDrawer(updateData));
  };
  useEffect(() => {
    if (bannerList) {
      bannerList.forEach((el, index) => {
        const isNewTab = el?.banner_open_new_page === 'Y';
        setValue(`banner_page_link-${el.id}`, el.banner_page_link);
        setValue(`banner_open_new_page-${el.id}`, isNewTab);
        setValue(`banner_order-${el.id}`, el.banner_order);
      });
    }
  }, [bannerList, setValue]);

  useEffect(() => {
    dispatch(getBannerListAction());

    return () => {
      dispatch(bannerReset());
    };
  }, [dispatch]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)} css={cardWrapperStyle}>
        {bannerList?.map(item => {
          const bannerDate = item?.banner_modify_date
            ? `수정일 : ${transDate(item?.banner_modify_date, 'YYYY.MM.DD')}`
            : `등록일 : ${transDate(item?.banner_register_date, 'YYYY.MM.DD')}`;

          return (
            <Fragment key={item.id}>
              <Card
                size="default"
                title={item?.banner_title}
                extra={bannerDate}
                bordered={false}
                style={{
                  width: 900,
                }}>
                <RowGrid>
                  <ColGrid span={10}>
                    <div css={renderImageStyle}>
                      <Image src={item?.banner_img_path} alt={'배너 이미지'} layout="fill" />
                      <Upload
                        css={uploadBoxStyle}
                        listType="picture-card"
                        fileList={[]}
                        maxCount={1}
                        onChange={fileList => handleUpload(fileList, item)}>
                        <div css={[uploadStyle, alignCenter]}>
                          <RetweetOutlined />
                        </div>
                      </Upload>
                    </div>
                  </ColGrid>
                  <ColGrid span={2} />
                  <ColGrid span={12}>
                    <RowGrid>
                      <ColGrid span={2} css={alignCenter}>
                        <span>링크</span>
                      </ColGrid>
                      <ColGrid span={22}>
                        <Controller
                          name={`banner_page_link-${item.id}`}
                          control={control}
                          defaultValue=""
                          render={({ field: { ref, value, ...rest }, fieldState }) => (
                            <Inputs type="text" value={value || null} placeholder={'https://'} {...rest} />
                          )}
                        />
                      </ColGrid>
                    </RowGrid>

                    <DividingLine border={false} />

                    <RowGrid>
                      <ColGrid span={16} />
                      <ColGrid span={5} css={buttonFlexEndRowStyle}>
                        <span>새창 적용</span>
                      </ColGrid>
                      <ColGrid span={3} css={buttonFlexEndRowStyle}>
                        <Controller
                          name={`banner_open_new_page-${item.id}`}
                          control={control}
                          defaultValue=""
                          render={({ field: { ref, value, ...rest }, fieldState }) => <Switch checked={value || null} {...rest} />}
                        />
                      </ColGrid>
                    </RowGrid>

                    <DividingLine border={false} />

                    <RowGrid>
                      <ColGrid span={24} css={buttonFlexEndRowStyle}>
                        <Controller
                          name={`banner_order-${item.id}`}
                          control={control}
                          defaultValue=""
                          render={({ field: { ref, value, ...rest }, fieldState }) => (
                            <Inputs
                              type="number"
                              value={value || item?.banner_order}
                              placeholder={'1 ~ 10'}
                              {...rest}
                              css={css`
                                width: 100px;
                              `}
                            />
                          )}
                        />
                      </ColGrid>
                    </RowGrid>

                    <DividingLine border={false} />

                    <RowGrid>
                      <ColGrid span={24} css={buttonFlexEndRowStyle}>
                        <Buttons type={'danger'} name={'삭제하기'} htmlType={'button'} onClick={() => handleDeleteBanner(item.id)} />
                        <Buttons
                          type={'primary'}
                          name={'수정하기'}
                          htmlType={'button'}
                          onClick={() => handleUpdateBanner(item)}
                          css={marginLeftStyle(5)}
                        />
                      </ColGrid>
                    </RowGrid>
                  </ColGrid>
                </RowGrid>
              </Card>
              <DividingLine border={false} />
            </Fragment>
          );
        })}
      </Form>

      <RowGrid>
        <ColGrid
          span={24}
          css={css`
            display: flex;
            justify-content: center;
          `}>
          <button className="btn" css={[addBtnStyle, marginTopStyle(20)]} onClick={handleAddBanner}>
            <p className="paragraph">추가하기</p>
            <span className="icon-wrapper">
              <PlusCircleOutlined className={'icon'} size={30} />
            </span>
          </button>
        </ColGrid>
      </RowGrid>
    </>
  );
};

export default BannerTemplate;

const cardWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const renderImageStyle = css`
  width: 100%;
  height: 200px;
  position: relative;
  cursor: pointer;
`;

const uploadBoxStyle = css`
  .ant-upload {
    width: 100%;
    height: 200px;
    margin: 0;
    border: none;
  }
`;
const uploadStyle = css`
  width: 100%;
  height: 200px;
  z-index: 5;
  background: rgba(0, 0, 0, 0);
  justify-content: center;
  span {
    opacity: 0;
    font-size: 46px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transition: all 1ms ease-in;
  }
  &:hover > span {
    opacity: 0.6;
    color: #f4f2f6;
  }
`;

const addBtnStyle = css`
  cursor: pointer;
  height: 50px;
  border: none;
  position: relative;
  border-radius: 10px;
  background-color: #14bd7e;
  -webkit-box-shadow: 1px 1px 5px 0.2px #00000035;
  box-shadow: 1px 1px 5px 0.2px #00000035;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-between;
  width: 150px;

  .paragraph {
    color: #fff;
    font-size: 18px;
    margin-bottom: 0;
    padding-left: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background-color: #14bd7e;
    border-radius: 8px;
  }

  .icon {
    color: #fff;
    font-size: 30px;
  }
`;
