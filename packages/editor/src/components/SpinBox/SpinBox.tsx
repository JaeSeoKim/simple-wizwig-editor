import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { EditorSpinBoxBlock } from '../../types/block';

const PressButton: React.FC<{
  onPressing: (time: number) => void;
  onPressEnd: () => void;
}> = ({ children, onPressing, onPressEnd }) => {
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (isPressing) {
      const startAt = Date.now();

      const timer = setInterval(() => {
        onPressing(Date.now() - startAt);
      });

      return () => {
        clearInterval(timer);
      };
    }
  }, [isPressing, onPressing]);

  return (
    <button
      onMouseDown={() => {
        setIsPressing(true);
        const handleMouseUp = () => {
          setIsPressing(false);
          onPressEnd();
          document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mouseup', handleMouseUp);
      }}
    >
      {children}
    </button>
  );
};

export interface SpinBoxProps {
  block: EditorSpinBoxBlock;
  onChange: (block: EditorSpinBoxBlock) => void;
  onDelete?: (block: EditorSpinBoxBlock) => void;
}

const SpinBox: React.VFC<SpinBoxProps> = ({ block, onChange, onDelete }) => {
  const [speed, setSpeed] = useState(block.speed);

  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const filterSpeed = (duration: number) => {
    if (duration < 0) return 0;
    else if (duration > 10000) return 10000;
    return Math.floor(duration);
  };

  const onPressingPlus = useCallback(time => {
    setSpeed(prev => filterSpeed(prev + time / 10));
  }, []);
  const onPressingMinus = useCallback(time => {
    setSpeed(prev => filterSpeed(prev - time / 10));
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const speed = filterSpeed(parseInt(e.target.value));
      setSpeed(speed);
      onChange({ ...block, speed });
    },
    [block]
  );

  const onPressEnd = useCallback(() => {
    onChange({ ...block, speed });
  }, [block, speed]);

  return (
    <div
      data-block-id={block.id}
      css={css`
        display: flex;
        gap: 8px;
        margin-top: 10px;
        margin-bottom: 10px;
        justify-content: center;
      `}
    >
      <span
        css={css`
          animation: ${spin} ${10200 - speed}ms linear infinite;
          font-size: xx-large;
        `}
      >
        🌀
      </span>
      <input type={'number'} value={speed} onChange={onInputChange} />
      <PressButton onPressEnd={onPressEnd} onPressing={onPressingPlus}>
        +
      </PressButton>
      <PressButton onPressEnd={onPressEnd} onPressing={onPressingMinus}>
        -
      </PressButton>
      {onDelete && <button onClick={() => onDelete(block)}>🗑</button>}
    </div>
  );
};

export default React.memo(SpinBox);
