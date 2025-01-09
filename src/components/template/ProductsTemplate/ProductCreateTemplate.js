import { flexCenterStyle, marginTopStyle } from '@/styles/components/atomCommonStyle';
import Form from '../../atom/Form';
import { ColGrid, DividingLine, RowGrid } from '@/components/atom';
import { Button, Card, Steps } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductSkuUploadSection } from '@/components/molecules';
import { uploadSkuAction } from '@/store/reducers/admin/productReducer';
import { useRouter } from 'next/router';

const ProductCreateTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [skuFileList, setSkuFileList] = useState([]);

  // 등록 다음 단계 함수
  const nextStep = () => {
    const formData = new FormData();

    const file = skuFileList[0]?.file;

    formData.append('file', file);
    dispatch(uploadSkuAction({ sendObject: formData, callback: router }));
  };

  // 실제로 주입입시켜 줄 배열
  const steps = [
    {
      title: 'SKU 등록',
      content: <ProductSkuUploadSection pageId={router.query.id} skuFileList={skuFileList} setSkuFileList={setSkuFileList} />,
    },
    {
      title: '기본 정보',
      content: null,
    },
    {
      title: '상세 정보',
      content: null,
    },
    {
      title: '이미지 등록',
      content: null,
    },
    {
      title: '가격 설정',
      content: null,
    },
  ];
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  // 단계 이동 버튼
  const stepsButton = () => {
    return (
      <RowGrid css={marginTopStyle(30)}>
        <ColGrid span={24} css={flexCenterStyle()}>
          <Button type="primary" onClick={() => nextStep()}>
            다음 단계
            <SwapRightOutlined />
          </Button>
        </ColGrid>
      </RowGrid>
    );
  };

  return (
    <>
      <DividingLine border={false} />

      <Card>
        <Steps current={0} items={items} />
      </Card>

      <DividingLine border={false} />
      <Form>
        {/* --------------------------- 단계별 컴포넌트 렌더링 --------------------------- */}
        {steps[0].content}

        {/* --------------------------- 단계별 저장 버튼 --------------------------- */}
        {stepsButton()}
      </Form>
    </>
  );
};

export default ProductCreateTemplate;
