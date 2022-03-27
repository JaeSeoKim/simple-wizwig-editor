export type EditorBlock = EditorSpinBoxBlock;

export type EditorSpinBoxBlock = EditorBaseBlock & {
  type: 'spinbox';
  speed: number;
};

export type EditorBlockType = 'text' | 'spinbox';

export type EditorBaseBlock = HasId;

export interface HasId {
  id: string;
}
