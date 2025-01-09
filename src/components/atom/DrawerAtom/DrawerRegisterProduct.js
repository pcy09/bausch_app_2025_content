import { Collapse, Divider, Drawer, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '@/store/reducers/modalReducer';
import { Buttons, ColGrid, DividingLine, RowGrid } from '@/components/atom';
import Card from '@/components/atom/Card';
import { css } from '@emotion/react';
import { buttonFlexEndRowStyle, marginBottomStyle } from '@/styles/components/atomCommonStyle';
import { CaretRightOutlined } from '@ant-design/icons';
import Tables from '../Tables';
import useCommonCode from '@/hooks/useCommonCode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { publishProductAction } from '@/store/reducers/admin/productReducer';

const columns = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    width: 100,
    align: 'center',
  },
  {
    title: '근시',
    dataIndex: 'shortSight',
    align: 'center',
  },
  {
    title: '난시',
    dataIndex: 'astigmatism',
    align: 'center',
  },
];

const DrawerRegisterProduct = ({ open }) => {
  const dispatch = useDispatch();
  const { skuInfo, productDetail, thumbnailImageList, lensImageList } = useSelector(state => state.product);

  const { brandInfo, colorLineInfo, colorInfo, diameterInfo } = useSelector(state => state.commonCode);

  // 사용 구분
  const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');
  // 도수 구분 ( 근시, 난시 )
  const [sightTypeCode, findSightTypeCode] = useCommonCode('sightTypeCode');

  const router = useRouter();

  const {
    id,
    brand_id,
    colorline_id,
    color_id,
    product_name,
    product_sub_description,
    product_description,
    cycle_code,
    pieces,
    sight_code,
    diameter_id,
    base_curve,
    store_price,
    sale_price,
    product_price,
    store_discount,
    user_discount,
    product_register_date,
    show_status,
    reservation_count,
    best_count,
    step,
    center_thickness,
    water_content,
    discount_applicable,
    product_event,
    product_lens_img_id,
    product_thumbnail_img_id,
    product_point_expire_year,
    payment_points,
    texture,
  } = productDetail;

  const onClose = () => {
    dispatch(closeDrawer());
  };

  // 최종 등록
  const registerProduct = () => {
    const sendObject = {
      step: 'E',
      published: 'Y',
    };

    dispatch(publishProductAction({ id: router.query.id, sendObject, callback: router }));
  };

  // 배열에서 이름 가져오는 함수
  const getName = (arr, condition, option, name) => {
    const findItem = arr.filter(el => el[condition] === option);
    return findItem[0][name];
  };

  // 썸네일 이미지 렌더 컴포넌트
  const getThumbnail = () => {
    return thumbnailImageList.map(item => {
      const imagePath =
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API}/${item?.thum_uuid_name}`
          : `http://localhost:7070/editor/image/${item?.thum_uuid_name}?path=uploadTest/product/thumbnail/`;

      return (
        <ColGrid
          key={item.thum_uuid_name}
          span={12}
          css={css`
            width: 300px;
            height: 200px;
          `}>
          <Image src={imagePath} alt={imagePath} width={1000} height={500} style={{ width: '100%', height: 'auto' }} layout="responsive" />
        </ColGrid>
      );
    });
  };

  // 렌즈 이미지 렌더 컴포넌트
  const getLensImage = () => {
    return lensImageList.map(item => {
      const imagePath =
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API}/${item?.image_uuid_name}`
          : `http://localhost:7070/editor/image/${item?.image_uuid_name}?path=uploadTest/product/lensImage/`;

      return (
        <ColGrid key={item.image_uuid_name} span={24}>
          <Image src={imagePath} alt={imagePath} width={1000} height={500} style={{ width: '100%', height: 'auto' }} layout="responsive" />
        </ColGrid>
      );
    });
  };

  return (
    <Drawer
      title="제품 정보 확인"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}>
      <Card title={'SKU'} bordered={false} size="default" hoverable css={cardBodyStyle}>
        <Typography.Text css={[marginBottomStyle(10), blockStyle]}>
          등록된 SKU는{' '}
          <strong
            css={css`
              color: #14bd7e;
            `}>
            {skuInfo?.length}개
          </strong>{' '}
          입니다.
        </Typography.Text>
        <Collapse>
          <Collapse.Panel header={'SKU 보기'} key={'sku'}>
            <Tables listData={skuInfo} columns={columns} pagination={false} />
          </Collapse.Panel>
        </Collapse>
      </Card>

      <DividingLine border={false} />

      <Card title={'제품 기본 정보'} bordered={false} size="default" hoverable css={cardBodyStyle}>
        <Collapse>
          <Collapse.Panel header={'제품 기본 정보 보기'} key={'basic'}>
            <Typography.Title level={5}>브랜드 명</Typography.Title>
            <Typography.Text>{getName(brandInfo, 'id', brand_id, 'brand_name')}</Typography.Text>

            <Typography.Title level={5}>제품 명</Typography.Title>
            <Typography.Text>{product_name}</Typography.Text>

            <Typography.Title level={5}>제품 설명</Typography.Title>
            <Typography.Text>{product_sub_description}</Typography.Text>

            <Typography.Title level={5}>제품 상세 설명</Typography.Title>
            <div css={controllerImageStyle} dangerouslySetInnerHTML={{ __html: product_description }} />
          </Collapse.Panel>
        </Collapse>
      </Card>

      <DividingLine border={false} />

      <Card title={'제품 상세 정보'} bordered={false} size="default" hoverable css={cardBodyStyle}>
        <Collapse>
          <Collapse.Panel header={'제품 상세 정보 보기'} key={'detail'}>
            <Typography.Title level={5}>도수 구분</Typography.Title>
            <Typography.Text>{findSightTypeCode?.[sight_code]}</Typography.Text>

            <Typography.Title level={5}>사용 구분</Typography.Title>
            <Typography.Text>{findLensCycleCode?.[cycle_code]}</Typography.Text>

            <Typography.Title level={5}>컬러 라인</Typography.Title>
            <Typography.Text>{getName(colorLineInfo, 'id', colorline_id, 'colorline_name')}</Typography.Text>

            <Typography.Title level={5}>컬러</Typography.Title>
            <Typography.Text>{getName(colorInfo, 'id', color_id, 'color_name')}</Typography.Text>

            <Typography.Title level={5}>직경</Typography.Title>
            <Typography.Text>{getName(diameterInfo, 'id', diameter_id, 'diameter')}</Typography.Text>

            <Typography.Title level={5}>BC</Typography.Title>
            <Typography.Text>{base_curve}mm</Typography.Text>

            <Typography.Title level={5}>중심 두께</Typography.Title>
            <Typography.Text>{center_thickness}mm</Typography.Text>

            <Typography.Title level={5}>함수율</Typography.Title>
            <Typography.Text>{water_content}%</Typography.Text>

            <Typography.Title level={5}>노출 여부</Typography.Title>
            <Typography.Text>{show_status === 'Y' ? '노출' : '미노출'}</Typography.Text>

            <Typography.Title level={5}>이벤트 제품</Typography.Title>
            <Typography.Text>{product_event === 'Y' ? '이벤트 제품' : '-'}</Typography.Text>

            <Typography.Title level={5}>개입</Typography.Title>
            <Typography.Text>1box/{pieces}개입</Typography.Text>

            <Typography.Title level={5}>재질</Typography.Title>
            <Typography.Text>{texture}</Typography.Text>
          </Collapse.Panel>
        </Collapse>
      </Card>

      <DividingLine border={false} />

      <Card title={'제품 이미지 정보'} bordered={false} size="default" hoverable css={cardBodyStyle}>
        <Collapse>
          <Collapse.Panel header={'썸네일 이미지 보기'} key={'detail'}>
            <Typography.Title level={5}>썸네일 이미지</Typography.Title>
            <RowGrid gutter={16}>{getThumbnail()}</RowGrid>
          </Collapse.Panel>
        </Collapse>

        <DividingLine border={false} />

        <Collapse>
          <Collapse.Panel header={'제품 렌즈 이미지 보기'} key={'detail'}>
            <Typography.Title level={5}>렌즈 이미지</Typography.Title>
            <RowGrid>{getLensImage()}</RowGrid>
          </Collapse.Panel>
        </Collapse>
      </Card>

      <DividingLine border={false} />

      <Card title={'제품 가격 정보'} bordered={false} size="default" hoverable css={cardBodyStyle}>
        <Collapse>
          <Collapse.Panel header={'제품 가격 정보 보기'} key={'basic'}>
            <Typography.Title level={5}>권장 소비자가</Typography.Title>
            <Typography.Text>{product_price ? product_price.toLocaleString() : 0}원</Typography.Text>

            <Typography.Title level={5}>할인 적용</Typography.Title>
            <Typography.Text>{user_discount ? '할인 적용' : '할인 미적용'}</Typography.Text>

            <Typography.Title level={5}>회원 할인율</Typography.Title>
            <Typography.Text>{user_discount ?? 0}%</Typography.Text>

            <Typography.Title level={5}>안경원 할인율</Typography.Title>
            <Typography.Text>{store_discount ?? 0}%</Typography.Text>

            <Typography.Title level={5}>안경원 공금 금액</Typography.Title>
            <Typography.Text>{store_price ? store_price.toLocaleString() : 0}원</Typography.Text>

            <Typography.Title level={5}>최종 판매가</Typography.Title>
            <Typography.Text>{sale_price ? sale_price.toLocaleString() : 0}원</Typography.Text>
          </Collapse.Panel>
        </Collapse>
      </Card>

      <DividingLine border={false} />

      <RowGrid>
        <ColGrid span={24} css={buttonFlexEndRowStyle}>
          <Buttons type={'primary'} name={'등록하기'} htmlType={'button'} onClick={registerProduct} />
        </ColGrid>
      </RowGrid>
    </Drawer>
  );
};
export default DrawerRegisterProduct;

const blockStyle = css`
  display: block;
`;

const controllerImageStyle = css`
  & img {
    width: 100%;
  }
`;

const cardBodyStyle = css`
  .ant-card-head {
    border-bottom: 0;
  }
  .ant-card-body {
    padding: 0 24px 24px;
  }
`;
