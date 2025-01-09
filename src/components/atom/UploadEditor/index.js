import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import { useMemo, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import AXIOS from '@/api/axios/axios';
import { useDispatch } from 'react-redux';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { updateUsingImageList } from '@/store/reducers/pickupGuideReducer';
import { AXIOS_FILE_UPLOAD, AXIOS_POST } from '@/api/axios/useAxios';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardRef, ...props }) {
      return <RQ ref={forwardRef} {...props} />;
    };
  },
  { ssr: false },
);

const UploadEditor = ({ customHeight = '500px', border = true, addFiles = true, handleEditorImages, apiUrl, ...props }) => {
  const forwardRef = useRef(null);

  const dispatch = useDispatch();
  const [theme, setTheme] = useState('snow');

  const imageHandler = () => {
    try {
      dispatch(startLoading());
      const input = document.createElement('input');

      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      document.body.appendChild(input);

      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await AXIOS_FILE_UPLOAD(apiUrl, formData);
        if (response?.data?.result[0]?.imgUrl) {
          const imageUrl = response?.data?.result[0]?.imgUrl;
          const id = response?.data?.result[0]?.id;

          const editor = forwardRef.current.getEditor();
          const range = editor.getSelection();
          const newImage = {
            id,
            imgUrl: imageUrl,
          };
          handleEditorImages(newImage);

          if (imageUrl) {
            editor.insertEmbed(range.index + 1, 'image', imageUrl);
            // 이미지 아래에 빈 줄 추가
            editor.insertText(range.index + 2, '\n'); // 이미지 바로 아래에 줄바꿈 추가
            // 커서를 이미지 아래로 이동
            editor.setSelection(range.index + 3); // 추가된 줄바꿈 위치로 커서 이동
          }
        } else {
          dispatch(
            errorSnackOpen({
              message: '이미지 업로드 실패. 서버에서 이미지를 반환하지 않았습니다.',
            }),
          );
        }
        document.body.querySelector(':scope > input').remove();
        dispatch(endLoading());
      };
    } catch (e) {
      dispatch(
        errorSnackOpen({
          message: '에디터 이미지 업로드 실패',
        }),
      );
      dispatch(endLoading());
      console.debug('Editor imageHandler Error :: ', e);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          addFiles ? ['image'] : [],
        ],
        clipboard: {
          matchVisual: false,
        },
        handlers: { image: imageHandler },
        imageDrop: true, // imageDrop 등록
        imageResize: {}, // imageResize 등록
      },
    }),
    [addFiles],
  );
  return (
    <ReactQuill
      forwardRef={forwardRef}
      theme={theme}
      modules={modules}
      formats={formats}
      bounds={'.app'}
      css={quillStyle(customHeight, border)}
      {...props}
    />
  );
};
const formats = [
  'header',
  'font',
  'size',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
  'code-block',
];

export default UploadEditor;

const quillStyle = (customHeight, border) => css`
  width: 100%;

  .ql-editor {
    min-height: 300px;
  }
  .ql-container {
    max-height: ${customHeight ? customHeight : '500px'};
    overflow-y: auto;
    /* border: none; */
  }

  ${!border &&
  css`
    .ql-toolbar {
      border-width: 0 0 1px 0;
      border-color: ${'#dcdcdc'};
    }

    .ql-container {
      min-height: 300px;
      border: none;
    }
  `}
`;
