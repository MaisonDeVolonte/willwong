const STORAGE_KEY = "app-state";

interface AppState {
  openFolders?: string[];
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveState(patch: Partial<AppState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...loadState(), ...patch }));
  } catch {}
}

export function loadOpenFolders(): Set<string> {
  return new Set(loadState().openFolders ?? []);
}

export function saveOpenFolders(open: Set<string>) {
  saveState({ openFolders: [...open] });
}
