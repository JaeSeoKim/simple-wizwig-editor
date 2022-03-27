import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { EditorBlock, EditorSpinBoxBlock } from '../../types/block';
import { v4 as uuid } from 'uuid';
import ToolBox from '../ToolBox';
import SpinBox from '../SpinBox';

export interface EditorProps {}

const Editor: React.VFC<EditorProps> = () => {
  const [data, setData] = useState<EditorBlock[]>([]);

  const onSpinBoxBtnClick = useCallback(() => {
    setData(prev => {
      return [
        ...prev,
        {
          id: uuid(),
          type: 'spinbox',
          speed: 1000,
        },
      ];
    });
  }, []);

  const onSpinBocChange = useCallback((block: EditorSpinBoxBlock) => {
    setData(prev => {
      const target = prev.findIndex(value => value.id === block.id);
      if (target === -1) return prev;
      return [...prev.slice(0, target), block, ...prev.slice(target + 1)];
    });
  }, []);

  const onDelete = useCallback((block: EditorBlock) => {
    setData(prev => {
      const target = prev.findIndex(value => value.id === block.id);
      if (target === -1) return prev;
      return [...prev.slice(0, target), ...prev.slice(target + 1)];
    });
  }, []);

  return (
    <div
      id="editor"
      style={{
        width: '100%',
        height: '540px',
        padding: '0px',
        margin: '0px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        border: 'solid 1px #4242',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <ToolBox onSpinBoxBtnClick={onSpinBoxBtnClick} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 100%;
          height: fit-content;
          overflow: auto;
          padding: 12px;
          box-sizing: border-box;
        `}
      >
        {data.map(block => (
          <SpinBox key={block.id} block={block} onChange={onSpinBocChange} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Editor;
