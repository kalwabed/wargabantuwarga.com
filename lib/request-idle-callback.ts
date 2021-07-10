/** From https://github.com/vercel/next.js/blob/0af3b526408bae26d6b3f8cab75c4229998bf7cb/packages/next/client/request-idle-callback.ts */

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (id: RequestIdleCallbackHandle) => void;
  }
}

export const requestIdleCallback =
  (typeof self !== "undefined" && self.requestIdleCallback) ||
  function (
    cb: (deadline: RequestIdleCallbackDeadline) => void
  ): NodeJS.Timeout {
    let start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

export const cancelIdleCallback =
  (typeof self !== "undefined" && self.cancelIdleCallback) ||
  function (id: RequestIdleCallbackHandle) {
    return clearTimeout(id);
  };
