const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', { ai: (payload) => ipcRenderer.invoke('etow:ai', payload) });
