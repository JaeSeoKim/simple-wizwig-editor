import Editor from '../../editor';

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
      document.body.removeChild(container);
      editor.destory();
    });

    test('constructor', () => {
      const editableElement = container.querySelector('div');
      expect(editableElement).not.toBeNull();
      expect(editableElement?.contentEditable).toBe('true');
      const placeholder = `<h1>Hello World!</h1>`;
      expect(editableElement?.innerHTML).toBe(placeholder);
    });
  });
});
