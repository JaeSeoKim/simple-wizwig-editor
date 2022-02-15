export declare interface EditorOption {}

/**
 * Wizwig-Editor
 */
class Editor {
  private element: HTMLElement;

  constructor(
    /**
     * Target element to create an editor
     */
    element: HTMLElement,
    /**
     * Additional options needed to create an editor
     */
    _option?: EditorOption
  ) {
    this.element = element;

    const wwEditor = document.createElement('div');
    wwEditor.contentEditable = 'true';
    wwEditor.innerHTML = '<h1>Hello World!</h1>';

    this.element.appendChild(wwEditor);
  }

  destory() {
    Object.keys(this).forEach(prop => {
      delete this[prop as keyof this];
    });
  }
}

export default Editor;
