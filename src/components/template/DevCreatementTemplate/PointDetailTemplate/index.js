import { Buttons, CardContainer, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';

import { PointInfoSection } from '@/components/molecules/DevCreatement';
import { useEffect, useState } from 'react';
import useCommonCode from '@/hooks/useCommonCode';
import { useDispatch, useSelector } from 'react-redux';
import { getSavingPointDetailAction, resetSavingPointAction, updateSavingPointDetailAction } from '@/store/reducers/admin/savingPointReducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { errorSnackOpen } from '@/store/reducers/snackReducer';

const PointDetailTemplate = ({}) => {
  const [productList, setProductList] = useState([['bamboo', 'fish']]);

  const savingPointDetail = useSelector(state => state.savingPoint.pointProductDetail);

  // 제품 그룹 공통 데이터
  const pointProductOptionGroup = useCommonCode('productBauschDrop')[0];
  // 제품 그룹 정제 데이터
  const [optionGroupLists, setOptionGroupLists] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();
  const { query } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = data => updateConfirm(data);
  const onError = errors => handleError(errors);

  // 상세 confirm
  const updateConfirm = data => {
    Modal.confirm({
      title: '제품 상세 수정',
      icon: <ExclamationCircleOutlined />,
      content: '수정하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      onOk: () => handleUpdateData(data),
    });
  };

  const handleUpdateData = data => {
    const { pointGroupName, pointProductReqDto } = data;

    const groupedData = pointProductReqDto.reduce((acc, [groupName, productId]) => {
      const groupId = parseInt(groupName.split('_')[1], 10);
      if (!acc[groupId]) {
        acc[groupId] = [];
      }
      acc[groupId].push(productId);
      return acc;
    }, {});

    const pointProductReqDtoList = Object.entries(groupedData).map(([groupId, productIds]) => ({
      productGroupId: parseInt(groupId, 10),
      productIds,
    }));

    const sendObject = {
      pointGroupName,
      pointProductReqDtoList,
    };

    dispatch(updateSavingPointDetailAction({ sendObject, id: query.id, callback: router }));
  };

  const handleError = errors => {
    // 적립금명 누락 에러
    if (errors?.pointGroupName) {
      dispatch(
        errorSnackOpen({
          message: '적립금 명 누락',
          description: '적립금 명을 입력해 주세요.',
        }),
      );
    }
  };

  // 데이터 호출 함수
  useEffect(() => {
    if (query?.id) {
      dispatch(getSavingPointDetailAction({ id: query.id }));
    }
    return () => {
      dispatch(resetSavingPointAction());
    };
  }, [query]);

  // 데이터 넣어주는 함수
  useEffect(() => {
    if (savingPointDetail) {
      const { pointGroupId, pointGroupName, pointProductResDtoList } = savingPointDetail;
      setValue('pointGroupName', pointGroupName);

      let result = [];
      if (pointProductResDtoList) {
        pointProductResDtoList.forEach(group => {
          // 그룹에 속한 제품 정보 추가
          group.productInfoList.forEach(product => {
            result.push([`group_${group.productGroupId}`, product.productId]);
          });
        });
      }
      setValue('pointProductReqDto', result);
    }
  }, [savingPointDetail, setValue]);

  // 공통 코드 옵션 정제
  useEffect(() => {
    if (pointProductOptionGroup) {
      const options = pointProductOptionGroup.map(group => ({
        label: group.productGroupName,
        value: `group_${group.productGroupId}`,
        originValue: group.productGroupId,
        children: group.dropProductInfoList.map(product => ({
          label: product.productName,
          value: product.productId,
        })),
      }));
      setOptionGroupLists(options);
    }
  }, [pointProductOptionGroup]);

  return (
    <>
      <NoticeLabel title={'👉🏼 적립금의 상세 페이지입니다. 해당 적립금으로 구매가능한 제품을 확인 및 수정가능합니다.  '} />
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 설정 섹션 */}
        <PointInfoSection control={control} options={optionGroupLists} point_name={'기타 적립금'} product_list={productList} />
        <DividingLine border={false} />

        {/* 하단 버튼 */}
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons
              type={'default'}
              name={'이전'}
              htmlType={'button'}
              css={marginRightStyle(5)}
              onClick={() => router.push('/admin/point/manage')}
            />
            <Buttons type={'primary'} name={'수정하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default PointDetailTemplate;
