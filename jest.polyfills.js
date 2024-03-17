/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

import { TextDecoder, TextEncoder } from "node:util";

import { Blob, File } from "node:buffer";
import { fireEvent } from "@testing-library/dom";
import fetch, {
  FormData,
  Headers,
  Request,
  Response,
} from "node-fetch-commonjs";

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

Object.defineProperties(HTMLMediaElement.prototype, {
  play: {
    value() {
      if (Number.isNaN(this.duration)) {
        this.duration = 10;
      }
      this._timer = setInterval(() => {
        if (this._currentTime === undefined) this._currentTime = 0;
        this._currentTime += 0.01;
        if (this.currentTime >= this.duration) {
          fireEvent(this, new Event("ended"));
          clearInterval(this._timer);
        }
      }, 10);
      fireEvent(this, new Event("play"));
      return Promise.resolve();
    },
  },
  pause: {
    value() {
      clearInterval(this._timer);
      fireEvent(this, new Event("pause"));
    },
  },
  currentTime: {
    get() {
      return this._currentTime ?? 0;
    },
    set(time) {
      this._currentTime = time;
      fireEvent(this, new Event("seeking"));
      fireEvent(this, new Event("seeked"));
    },
  },
  duration: {
    get() {
      return this._duration ?? NaN;
    },
    set(time) {
      this._duration = time;
    },
  },
});

window.PointerEvent = class PointerEvent extends MouseEvent {};
