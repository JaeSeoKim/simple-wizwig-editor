/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Editor from '@/editor';

describe('editor', () => {
  describe('constructor', () => {
    let container: HTMLElement;
    let editor: Editor;

    beforeEach(() => {
      container = document.createElement('div');
      editor = new Editor(container);

      document.body.appendChild(container);
    });

    afterEach(() => {
      editor.destory();
      document.body.removeChild(container);
    });

    test('constructor', () => {
      const editableElement = container.querySelector('#editor')!;
      expect(editableElement).not.toBeNull();

      const toolboxElement = editableElement.querySelector('.toolbox')!;
      expect(toolboxElement).not.toBeNull();
    });
  });
});
