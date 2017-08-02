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
    console.log('ConsolePlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
