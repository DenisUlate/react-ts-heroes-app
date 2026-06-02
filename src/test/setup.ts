import { beforeEach, vi } from 'vitest';

type StorageState = Record<string, string>;

let storageState: StorageState = {};

const localStorageMock = {
  get length() {
    return Object.keys(storageState).length;
  },
  clear: vi.fn(() => {
    storageState = {};
  }),
  getItem: vi.fn((key: string) => {
    return key in storageState ? storageState[key] : null;
  }),
  key: vi.fn((index: number) => {
    return Object.keys(storageState)[index] ?? null;
  }),
  removeItem: vi.fn((key: string) => {
    delete storageState[key];
  }),
  setItem: vi.fn((key: string, value: string) => {
    storageState[key] = String(value);
  }),
} as Storage;

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
});

beforeEach(() => {
  storageState = {};
  vi.clearAllMocks();
});