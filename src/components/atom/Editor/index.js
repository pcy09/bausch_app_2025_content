import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import 'react-quill/dist/quill.snow.css';
import { useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import AXIOS from '@/api/axios/axios';
import { useDispatch } from 'react-redux';
import { errorSnackOpen } from '@/store/reducers/snackReducer';
import { endLoading, startLoading } from '@/store/reducers/loadingReducer';
import { updateUsingImageList } from '@/store/reducers/pickupGuideReducer';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardRef, ...props }) {
      return <RQ ref={forwardRef} {...props} />;
    };
  },
  { ssr: false },
);
const Editor = ({ path = '', forwardRef, border = true, customHeight, addFiles = true, saveEditorImageID, usingImagesId, ...props }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('snow');

  const imageHandler = usingImagesId => {
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
        formData.append('image', file);

        // Image Upload
        const cookies = new Cookies();
        const token = cookies.get('accessToken');

        const headers = {
          Authorization: token ? `Bearer ${token}` : null,
          'Content-Type': 'multipart/form-data;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        };

        const { data } = await AXIOS.post('/upload/image', formData, { headers });

        if (data?.data?.imageId) {
          const imageUrl = data?.data?.imageUrl;

          // 내부 사용 이미지 id state 업데이트
          saveEditorImageID(data?.data?.imageId);

          let range = forwardRef?.current?.getEditorSelection();

          let delta = forwardRef?.current?.getEditor()?.insertEmbed(range.index, 'image', imageUrl);
          forwardRef?.current?.getEditor().removeFormat(range.index, range.index + 1);

          //TODO: 이미지 alt 추가
          const newOps = delta.ops?.map(op => {
            if (op.insert && typeof op.insert === 'object' && op.insert.image) {
              const imageAttributes = {
                ...op.attributes,
                alt: 'your alt text',
              };
              return {
                ...op,
                attributes: imageAttributes,
              };
            }
            return op;
          });
          delta.ops = newOps;

          forwardRef?.current?.getEditor()?.updateContents(delta);
          forwardRef?.current?.getEditor()?.setSelection(range.index + 1);

          const selector = document.body.querySelector(':scope > input');

          selector.remove();
        } else {
          dispatch(
            errorSnackOpen({
              message: '에디터 이미지 업로드 실패',
            }),
          );
        }
      };

      dispatch(endLoading());
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
          // [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          // addFiles ? ['link', 'image', 'video'] : [],
          addFiles ? ['image'] : [],

          // ['clean'],
          // [{ align: [] }],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
        handlers: { image: () => imageHandler(usingImagesId) },
        imageDrop: true, // imageDrop 등록
        imageResize: {}, // imageResize 등록
      },
    }),
    [addFiles, imageHandler, usingImagesId],
  );
  return (
    <ReactQuill
      forwardRef={forwardRef}
      theme={theme}
      // onChange={handleChangeEditor}
      // value={editorHtml}
      modules={modules}
      formats={formats}
      bounds={'.app'}
      css={quillStyle(customHeight, border)}
      // css={css`
      //   width: 100%;
      //
      //   .ql-editor {
      //     min-height: 300px;
      //   }
      //   .ql-container {
      //     height: ${customHeight ? customHeight : '300px'};
      //     /* border: none; */
      //   }
      //
      //   ${!border &&
      //   css`
      //     .ql-toolbar {
      //       border-width: 0 0 1px 0;
      //       border-color: ${'#dcdcdc'};
      //     }
      //
      //     .ql-container {
      //       min-height: 300px;
      //       border: none;
      //     }
      //   `}
      // `}
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

export default Editor;

const quillStyle = (customHeight, border) => css`
  width: 100%;

  .ql-editor {
    min-height: 300px;
  }
  .ql-container {
    height: ${customHeight ? customHeight : '500px'};
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