// Electron main process. AI requests from the renderer are forwarded here (ipcMain) to the EdTek server.
// No API key exists in the desktop app: the server holds it.
// Server URL (first match wins): env ETOW_API_URL, then <userData>/config.json { "apiUrl": "https://..." }.
// Must be https:// (http:// is allowed only for localhost).
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;

function getApiBase() {
  let url = process.env.ETOW_API_URL || '';
  if (!url) { try { url = String(JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'config.json'), 'utf8')).apiUrl || ''); } catch { /* no config file */ } }
  if (!url && isDev) url = 'http://localhost:3001';
  try {
    const u = new URL(url);
    const local = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    if (u.protocol !== 'https:' && !(local && u.protocol === 'http:')) return null;
    return u.origin;
  } catch { return null; }
}

ipcMain.handle('etow:ai', async (_event, payload) => {
  const base = getApiBase();
  if (!base) return { status: 503, body: { error: { message: 'AI server is not configured. Set ETOW_API_URL or userData/config.json {"apiUrl":"https://..."}.' } } };
  const body = JSON.stringify({ operation: payload?.operation, messages: payload?.messages, context: payload?.context });   // forward only the allowed fields
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 35_000);
  try {
    const r = await fetch(base + '/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal: controller.signal });
    let data; try { data = await r.json(); } catch { data = { error: { message: 'Invalid server response.' } }; }
    return { status: r.status, body: data };
  } catch (e) {
    return { status: 504, body: { error: { message: e?.name === 'AbortError' ? 'AI request timed out.' : 'Could not reach the AI server.' } } };
  } finally { clearTimeout(timer); }
});

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 1024, height: 768, minWidth: 375, minHeight: 667, backgroundColor: '#0a0f1e', show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'preload.cjs') } });
  isDev ? win.loadURL('http://localhost:5173') : win.loadFile(path.join(__dirname, '../dist/index.html'));
  win.once('ready-to-show', () => win.show());
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
