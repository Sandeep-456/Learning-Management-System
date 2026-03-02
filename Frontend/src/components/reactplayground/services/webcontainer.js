import { WebContainer } from "@webcontainer/api";

/** @type {Promise<WebContainer> | undefined} */
let bootPromise;

/**
 * Boots the WebContainer and returns a promise that resolves to the instance.
 * This is a singleton promise, ensuring WebContainer.boot() is only called once.
 * @returns {Promise<WebContainer>}
 */
export function bootWebContainer() {
  if (bootPromise) {
    return bootPromise;
  }

  bootPromise = WebContainer.boot();
  return bootPromise;
}
