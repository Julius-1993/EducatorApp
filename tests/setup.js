// Browser APIs jsdom lacks. These stand in for the real browser in tests only.
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
if (!window.matchMedia) window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
afterEach(() => { cleanup(); localStorage.clear(); });
