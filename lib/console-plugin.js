'use babel';

import ConsolePluginView from './console-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  consolePluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.consolePluginView = new ConsolePluginView(state.consolePluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.consolePluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'console-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.consolePluginView.destroy();
  },

  serialize() {
    return {
      consolePluginViewState: this.consolePluginView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      console.log('sel', selection);
      var openParFound = false;
      var label = '';
      var newText = '';
      selection.split('').forEach((item, index) => {
        console.log("LJFLSDKFJSLDKFJKLSDF");
        if (item === '(') {
          openParFound = true;
          newText += '(';
        } else if (item === ')') {
          openParFound = false;
          newText += '"' + label + '", ' + label + ')';
        } else if (openParFound) {
          label += item;
        } else {
          newText += item;
        }
      })
      console.log('label', label);
      console.log('openParIndex', openParIndex);
      var newText = selection.slice(0, openParIndex + 1) + '"' + label + '", ' + selection.slice(openParIndex + 1, selection.length)
      console.log('newText', newText);
      editor.insertText(newText)
    }
  }

};
