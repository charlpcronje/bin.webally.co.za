/* backend/src/controllers/BaseController.js */
/**
 * @file backend/src/controllers/BaseController.js
 * Base controller class for handling errors via Proxy.
 */
export class BaseController {
    /**
     * Create a proxy to intercept and handle errors.
     * @param {Object} instance - The instance of the child controller.
     * @returns {Proxy} - A proxy-wrapped instance with error handling.
     */
    static createProxy(instance) {
      return new Proxy(instance, {
        get(target, prop) {
          if (typeof target[prop] === "function") {
            return async (...args) => {
              try {
                return await target[prop](...args);
              } catch (error) {
                console.error(`[BaseController Error]: ${error.message}`);
                throw error;
              }
            };
          }
          return target[prop];
        },
      });
    }
  }
  