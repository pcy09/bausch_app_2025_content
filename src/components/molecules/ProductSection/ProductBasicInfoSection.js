import { Descriptions, Upload } from 'antd';
import { Buttons, CardContainer, Editor, Inputs, SelectBox, TextAreas } from '@/components/atom';
import { UploadOutlined } from '@ant-design/icons';
import { cardTitle } from '@/common/utiles';
import { Controller } from 'react-hook-form';
import { brandArray } from '@/common/dummyArrary';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsingImageList } from '@/store/reducers/pickupGuideReducer';
import { insertUsingImage } from '@/store/reducers/admin/productReducer';

const ProductBasicInfoSection = ({ productDetailData, control, errors, setValue }) => {
  const dispatch = useDispatch();
  const { brandInfo } = useSelector(state => state.commonCode);
  const editorRef = useRef(null);

  // 픽업가이드에 사용된 이미지 ID
  const [editorImageId, setEditorImageId] = useState(null);

  // 브랜드 선택 select option
  const selectOption = brandInfo?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.brand_name,
        id: cur.id,
        value: cur.id,
      }),
    [],
  );

  // 텍스트 에디터에 추가된 이미지 update
  const saveEditorImageID = id => {
    setEditorImageId(id);
  };
  useEffect(() => {
    if (editorImageId) {
      dispatch(insertUsingImage({ usingImage: editorImageId }));
      setEditorImageId(null);
    }
    return () => setEditorImageId(null);
  }, [editorImageId, dispatch]);

  // 데이터 있을 경우 세팅
  useEffect(() => {
    const { brand_id, product_name, product_sub_description, product_description } = productDetailData;
    if (brand_id && product_name && product_sub_description && product_description) {
      setValue('brand_id', brand_id);
      setValue('product_name', product_name);
      setValue('product_sub_description', product_sub_description);
      setValue('product_description', product_description);
    }
  }, [productDetailData, setValue]);

  return (
    <CardContainer size="default" title={'제품 기본 정보'} bordered={false}>
      <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
        <Descriptions.Item span={1} label="브랜드명">
          <Controller
            name="brand_id"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={selectOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={2} label="제품명">
          <Controller
            name="product_name"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" value={value || null} placeholder={'제품명을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={3} label="제품 설명">
          <Controller
            name="product_sub_description"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <TextAreas value={value || null} placeholder={'제품 설명을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>

        <Descriptions.Item span={3} label="제품 상세 내용">
          <Controller
            name="product_description"
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
      </Descriptions>
    </CardContainer>
  );
};

export default ProductBasicInfoSection;
