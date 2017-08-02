'use babel';

import SourcetoggleView from './sourcetoggle-view';
import { CompositeDisposable } from 'atom';
import request from 'request'

export default {

  sourcetoggleView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sourcetoggleView = new SourcetoggleView(state.sourcetoggleViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sourcetoggleView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sourcetoggle:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sourcetoggleView.destroy();
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log('sel', selection);
      var openParFound = false;
      var openParIndex = null;
      var label = '';
      selection.split('').forEach((item, index) => {
        console.log('item', item);
        if (item === '(') {
          openParFound = true;
          openParIndex = index;
          return;
        } else if (item === ')') {
          openParFound = false;
        } else if (openParFound) {
          label += item;
        }
      })
      console.log('label', label);
      console.log('openParIndex', openParIndex);
      var newText = selection.slice(0, openParIndex + 1) + '"' + label + '", ' + selection.slice(openParIndex + 1, selection.length)
      console.log('newText', newText);
      editor.insertText(newText)
    }
  },

};
