import { Descriptions, Radio, Tag, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import useCommonCodeBatch from '@/hooks/useCommonCodeBatch';
import { transSelectBox } from '@/common/utiles';

const ProductBauschSection = ({ tags, handleDelete, handleAddition, control }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [newProductStatusOption, setNewProductStatusOption] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    handleDelete(newTags); // 새로운 태그 배열로 상태 업데이트
  };

  const showInput = () => setInputVisible(true);

  const handleInputChange = e => setInputValue(e.target.value);

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      handleAddition(inputValue);
      setInputVisible(false);
      setInputValue('');
    }
  };

  // 공통코드 호출
  const { newProductStatus } = useCommonCodeBatch(['newProductStatus']);

  useEffect(() => {
    if (newProductStatus) {
      const options = transSelectBox(newProductStatus);
      setNewProductStatusOption(options);
    }
  }, [newProductStatus]);

  return (
    <Descriptions column={4} title="태그 상세 정보" bordered labelStyle={{ width: '250px' }}>
      <Descriptions.Item span={4} label="제품 옵션">
        {tags.map((tag, index) => (
          <Tag key={index} closable onClose={() => handleClose(tag)}>
            {tag}
          </Tag>
        ))}
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Descriptions.Item>

      <Descriptions.Item span={4} label="심의 번호">
        <Controller
          name="productApprovalNumber"
          control={control}
          defaultValue=""
          render={({ field: { ref, value, ...rest } }) => (
            <Input type="text" value={value || null} placeholder={'심의번호를 입력해 주세요.'} {...rest} />
          )}
        />
      </Descriptions.Item>

      <Descriptions.Item span={4} label="신제품 여부 ⭐️">
        <Controller
          name="newProductStatus"
          control={control}
          defaultValue="NEW"
          render={({ field: { ref, value, ...rest } }) => <Radio.Group options={newProductStatusOption} value={value} {...rest} />}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProductBauschSection;
