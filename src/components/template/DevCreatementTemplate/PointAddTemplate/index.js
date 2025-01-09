import { Buttons, CardContainer, DividingLine, Form, RowGrid } from '@/components/atom';
import { useForm } from 'react-hook-form';
import NoticeLabel from '@/components/atom/Notice';
import { marginLeftStyle, marginRightStyle } from '@/styles/components/atomCommonStyle';
import { useRouter } from 'next/router';

import { PointInfoSection } from '@/components/molecules/DevCreatement';
import { useEffect, useState } from 'react';
import useCommonCode from '@/hooks/useCommonCode';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { createSavingPointAction } from '@/store/reducers/admin/savingPointReducer';

const PointAddTemplate = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 제품 그룹 공통 데이터
  const pointProductOptionGroup = useCommonCode('productBauschDrop')[0];

  // 제품 그룹 정제 데이터
  const [optionGroupLists, setOptionGroupLists] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = data => addConfirmHandler(data);
  const onError = errors => handleError(errors);

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

  // 등록 confirm
  const addConfirmHandler = data => {
    Modal.confirm({
      title: '적립금 등록',
      icon: <ExclamationCircleOutlined />,
      content: '등록하시겠습니까?',
      okText: '등록',
      cancelText: '취소',
      onOk: () => handleSendData(data),
    });
  };

  const handleSendData = data => {
    const { pointGroupName, pointProductReqDto } = data;

    if (!pointGroupName || !pointProductReqDto) {
      dispatch(
        errorSnackOpen({
          message: '제품 정보 누락 에러',
          description: '적립금명과 적립금 구매가능 제품을 등록해 주세요',
        }),
      );
    } else {
      const transformData = productDrop => {
        if (productDrop) {
          const selectedValues = optionGroupLists
            .map(option => {
              const filteredChildren = option.children.filter(child =>
                productDrop.some(([groupName, productId]) => groupName === option.value && child.value === productId),
              );
              return filteredChildren.length > 0 ? { ...option, children: filteredChildren } : null;
            })
            .filter(option => option !== null);
          return selectedValues;
        }
      };

      const transformListToReqDto = list => {
        return list.map(group => ({
          productGroupId: group.originValue,
          productIds: group.children.map(product => product.value),
        }));
      };

      const transformedData = transformData(pointProductReqDto);

      const transformedList = {
        pointGroupName,
        pointProductReqDto: transformListToReqDto(transformedData),
      };

      dispatch(createSavingPointAction({ sendObject: transformedList, callback: router }));
    }
  };

  return (
    <>
      <NoticeLabel title={'👉🏼 새로운 유형의 적립금 등록 페이지입니다. 적립금으로 구매 가능한 제품을 적용할 수 있습니다.  '} />
      <DividingLine border={false} />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 설정 섹션 */}
        <PointInfoSection control={control} options={optionGroupLists} point_name={''} />
        <DividingLine border={false} />

        {/* 하단 버튼 */}
        <CardContainer>
          <RowGrid justify="space-between">
            <Buttons
              type={'default'}
              name={'취소'}
              htmlType={'button'}
              css={marginRightStyle(5)}
              onClick={() => router.push('/admin/point/manage')}
            />
            <Buttons type={'primary'} name={'등록하기'} htmlType={'submit'} css={marginLeftStyle(5)} />
          </RowGrid>
        </CardContainer>
      </Form>
    </>
  );
};

export default PointAddTemplate;
