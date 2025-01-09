import { Checkbox, Descriptions, Radio, Upload } from 'antd';
import { Buttons, CardContainer, Editor, Inputs, SelectBox, TextAreas } from '@/components/atom';
import { UploadOutlined } from '@ant-design/icons';
import { cardTitle } from '@/common/utiles';
import { Controller } from 'react-hook-form';
import { brandArray } from '@/common/dummyArrary';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import useCommonCode from '@/hooks/useCommonCode';

const ProductDetailInfoSection = ({ productDetailData, control, errors, getValues, watch, setValue }) => {
  const { colorLineInfo, colorInfo, diameterInfo } = useSelector(state => state.commonCode);
  // 컬러라인 선택에 따른 컬러선택 select option
  const [colorSelectOption, setColorSelectOption] = useState([]);

  // 컬러라인 선택 select option
  const colorLineSelectOption = colorLineInfo?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.colorline_name,
        id: cur.id,
        value: cur.id,
      }),
    [],
  );
  const diameterSelectOption = diameterInfo?.reduce(
    (acc, cur) =>
      acc.concat({
        label: cur.diameter,
        id: cur.id,
        value: cur.id,
      }),
    [],
  );

  // 사용 구분
  const [lensCycleCode, findLensCycleCode] = useCommonCode('lensCycleCode');
  // 도수 구분 ( 근시, 난시 )
  const [sightTypeCode, findSightTypeCode] = useCommonCode('sightTypeCode');

  const handleSaveDetailInfo = () => {
    console.log(getValues());
  };

  // 컬러라인에 따른 컬러값 필터링
  useEffect(() => {
    if (colorInfo) {
      const transformOption = colorInfo?.reduce(
        (acc, cur) =>
          acc.concat({
            label: cur.color_name,
            id: cur.id,
            value: cur.id,
            colorline_id: cur.colorline_id,
          }),
        [],
      );
      const option = transformOption.filter(el => el.colorline_id === watch('colorline_id'));
      setColorSelectOption(option);
    }
  }, [colorInfo, watch(['colorline_id'])]);

  useEffect(() => {
    const {
      base_curve,
      center_thickness,
      color_id,
      colorline_id,
      pieces,
      cycle_code,
      diameter_id,
      product_event,
      show_status,
      sight_code,
      water_content,
      texture,
    } = productDetailData;
    if (
      base_curve &&
      center_thickness &&
      color_id &&
      colorline_id &&
      pieces &&
      cycle_code &&
      diameter_id &&
      product_event &&
      show_status &&
      sight_code &&
      water_content &&
      texture
    ) {
      setValue('base_curve', base_curve);
      setValue('center_thickness', center_thickness);
      setValue('color_id', color_id);
      setValue('colorline_id', colorline_id);
      setValue('pieces', pieces);
      setValue('cycle_code', cycle_code);
      setValue('diameter_id', diameter_id);
      setValue('product_event', product_event !== 'N');
      setValue('show_status', show_status);
      setValue('sight_code', sight_code);
      setValue('water_content', water_content);
      setValue('texture', texture);
    }
  }, [productDetailData, setValue]);

  return (
    <CardContainer size="default" title={'제품 상세 정보'} bordered={false}>
      <Descriptions labelStyle={{ width: '250px' }} bordered={true}>
        <Descriptions.Item span={1} label="도수구분">
          <Controller
            name="sight_code"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={sightTypeCode} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="사용구분">
          <Controller
            name="cycle_code"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={lensCycleCode} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={1} label="컬러라인">
          <Controller
            name="colorline_id"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={colorLineSelectOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="컬러">
          <Controller
            name="color_id"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={colorSelectOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={1} label="직경">
          <Controller
            name="diameter_id"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <SelectBox options={diameterSelectOption} value={value || null} placeholder={'선택해주세요'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="BC(곡률)">
          <Controller
            name="base_curve"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" value={value || null} placeholder={'BC(곡률)를 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={1} label="중심 두께">
          <Controller
            name="center_thickness"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" value={value || null} placeholder={'중심두께를 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="함수율">
          <Controller
            name="water_content"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" value={value || null} placeholder={'함수율을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={1} label="노출 여부">
          <Controller
            name="show_status"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Radio.Group
                options={[
                  { label: '노출', value: 'Y' },
                  { label: '비노출', value: 'N' },
                ]}
                onChange={target => console.log(target)}
                value={value || null}
                {...rest}
              />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="이벤트 제품">
          <Controller
            name="product_event"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Checkbox checked={value} onChange={target => console.log(value)} {...rest}>
                이벤트 상품 등록
              </Checkbox>
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={1} label="개입">
          <Controller
            name="pieces"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="number" value={value || null} placeholder={'개입을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label="재질">
          <Controller
            name="texture"
            control={control}
            defaultValue=""
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <Inputs type="text" value={value || null} placeholder={'재질을 입력해주세요.'} {...rest} />
            )}
          />
        </Descriptions.Item>
      </Descriptions>
    </CardContainer>
  );
};

export default ProductDetailInfoSection;
