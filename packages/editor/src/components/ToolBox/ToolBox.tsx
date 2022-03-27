import React from 'react';

export interface ToolBoxProps {
  onSpinBoxBtnClick: () => void;
}

const ToolBox: React.VFC<ToolBoxProps> = ({ onSpinBoxBtnClick }) => {
  return (
    <div
      className="toolbox"
      style={{
        width: '100%',
        height: '42px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: 'solid 1px #4242',
      }}
    >
      <button
        className="spinbox-btn"
        style={{
          boxSizing: 'border-box',
          width: '42px',
          height: '42px',
          border: '1px',
          borderColor: '#4242',
          borderRadius: '8px',
        }}
        onClick={onSpinBoxBtnClick}
      >
        🌀
      </button>
    </div>
  );
};

export default ToolBox;
