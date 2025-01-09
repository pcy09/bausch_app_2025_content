// components
import { Buttons, CardContainer, ColGrid, DividingLine, Label, RowGrid, Tables } from '@/components/atom';
import { BasicSearchAtom } from '@/components/atom/SearchAtoms';
import Form from '../../atom/Form';
import NoticeLabel from '@/components/atom/Notice';
import { Cascader, Descriptions, Modal, Tabs } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// lib
import { Controller, useForm } from 'react-hook-form';
import useCommonCode from '@/hooks/useCommonCode';
// css
import { alignEnd, marginLeftStyle, searchAtomContainer, tableRowStyle } from '@/styles/components/atomCommonStyle';
import { css } from '@emotion/react';
//redux
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import {
  createProductBauschGiftAction,
  deleteProductBauschGiftAction,
  getProductBauschGiftListAction,
} from '@/store/reducers/admin/productGiftReducer';
import MultiSelectTabArea from '@/components/atom/MultiSelectTabArea';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transProductOption } from '@/common/utiles';

// 탭 메뉴 배열 만들기
const tabMenuList = () => [
  { label: 'BAUSCH', key: 'bausch' },
  { label: 'LENSLY', key: 'lensly' },
];

export default function ProductManageGiftTemplate() {
  const dispatch = useDispatch();
  const { router, query } = useRouter();

  const { id } = query;

  const [activeTab, setActiveTab] = useState('bausch'); // 현재 활성화된 탭 상태

  const productBauschGiftList = useSelector(state => state.productGift.productBauschGiftList);

  const productLenslyGiftList = useSelector(state => state.productGift.productGiftLenslyList);

  const [optionLists, setOptionLists] = useState([]);

  const prevActiveTab = useRef(activeTab);

  const { productBauschDrop: giftGroupOption, productLenslyDrop: giftLenslyGroupOption } = useCommonCodeBatch([
    'productBauschDrop',
    'productLenslyDrop',
  ]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'giftProductId',
      align: 'center',
    },
    {
      title: '증정 제품명',
      dataIndex: 'productName',
      align: 'center',
    },
    {
      title: '설명',
      dataIndex: 'productDescription',
      align: 'center',
    },
    {
      title: '삭제',
      dataIndex: 'data5',
      align: 'center',
      render: (text, record) => {
        return (
          <Buttons
            type={'danger'}
            name={'삭제'}
            htmlType={'button'}
            onClick={e => {
              e.stopPropagation();
              deleteConfirmHandler(record.giftProductId, activeTab);
            }}
          />
        );
      },
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm({});

  const onSubmit = data => addConfirmHandler(data);
  const onError = errors => handleError(errors);

  // 등록 confirm
  const addConfirmHandler = data => {
    Modal.confirm({
      title: '증정제품 등록',
      icon: <ExclamationCircleOutlined />,
      content: '등록하시겠습니까?',
      okText: '등록',
      cancelText: '취소',
      onOk: () => handleSendData(data),
    });
  };

  const deleteConfirmHandler = id => {
    Modal.confirm({
      title: '증정 제품 그룹 삭제',
      icon: <ExclamationCircleOutlined />,
      content: '증정 제품을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = id => {
    dispatch(deleteProductBauschGiftAction({ id, activeTab }));
  };

  const handleSendData = data => {
    const { productDrop, giftDescription } = data;

    if (productDrop === '') {
      dispatch(
        errorSnackOpen({
          message: '증정제품 등록 에러',
          description: '증정 제품을 선택해 주세요',
        }),
      );
    } else {
      const sendObject = {
        productGroupId: productDrop[0],
        productId: productDrop[1],
        giftDescription,
      };

      dispatch(createProductBauschGiftAction({ sendObject, activeTab }));
      reset();
    }
  };

  const handleError = errors => {};

  // 탭 메뉴 변경
  const handleChangeTabMenu = (key, e, url) => {
    setActiveTab(key);
  };

  useEffect(() => {
    reset();
    dispatch(getProductBauschGiftListAction({ tabType: activeTab }));
  }, [activeTab, dispatch]);

  // 공통 코드 옵션 정제
  useEffect(() => {
    if (activeTab === 'bausch' && giftGroupOption) {
      const options = transProductOption(giftGroupOption);
      setOptionLists(options);
    } else if (activeTab === 'lensly' && giftLenslyGroupOption) {
      const options = transProductOption(giftLenslyGroupOption);
      setOptionLists(options);
    }
  }, [activeTab, giftGroupOption, giftLenslyGroupOption]);

  // 현재 활성화된 탭에 따라 데이터를 선택
  const activeData = activeTab === 'bausch' ? productBauschGiftList : productLenslyGiftList;

  return (
    <>
      <NoticeLabel title={'👉🏼 바슈롬의 증정 제품을 등록하는 페이지입니다. 바슈롬의 새로운 제품을 등록하세요.'} />
      <DividingLine border={false} />
      <Tabs onTabClick={(key, e, url) => handleChangeTabMenu(key, e, url)} type="line" centered size={'smail'} items={tabMenuList()} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContainer size="default">
          <Descriptions title={'증정 제품'}></Descriptions>
          <RowGrid>
            <ColGrid span={5}>
              <div css={searchAtomContainer}>
                <Label title={'증정 제품명'} />
                <Controller
                  name="productDrop"
                  control={control}
                  render={({ field: { ref, value, ...rest }, fieldState }) => (
                    <Cascader style={{ width: '100%' }} control={control} placeholder={'제품 선택'} options={optionLists} value={value} {...rest} />
                  )}
                />
              </div>
            </ColGrid>

            <ColGrid span={1} />

            <ColGrid span={6}>
              <BasicSearchAtom
                type={'text'}
                name="giftDescription"
                title={'설명'}
                placeholder={'증정 제품에 대한 설명을 기입해주세요.'}
                control={control}
              />
            </ColGrid>

            <ColGrid span={2} css={alignEnd}>
              <Buttons type={'primary'} name={'등록'} htmlType={'submit'} css={marginLeftStyle(20)}></Buttons>
            </ColGrid>
          </RowGrid>
        </CardContainer>

        <DividingLine border={false} />

        <CardContainer>
          <RowGrid css={tableRowStyle(12, 'center')}></RowGrid>
          <Tables
            rowKey={'giftProductId'}
            selectedRowKeys={'selectedRowKeys'}
            listData={activeTab === 'bausch' ? productBauschGiftList : productLenslyGiftList}
            columns={columns}
            detail={false}
          />
        </CardContainer>
      </Form>
    </>
  );
}

const alignStyle = css`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;

const buttonRowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
