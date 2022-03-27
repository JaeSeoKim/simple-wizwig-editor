import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { default as EditorComponent } from './components/Editor';

export declare interface EditorOption {}
/**
 * Wizwig-Editor
 */
class Editor {
  element: HTMLElement;

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

    ReactDOM.render(<EditorComponent />, element);
  }

  destory() {
    ReactDOM.unmountComponentAtNode(this.element);

    Object.keys(this).forEach(prop => {
      delete this[prop as keyof this];
    });
  }
}

export default Editor;
