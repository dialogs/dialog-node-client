/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

/**
 * In-memory local/session-storage implementation.
 * @private
 */
class WebStorage<T> {
  storage: { [key: string]: T };

  constructor() {
    this.storage = {};
  }

  setItem(key, value) {
    this.storage[key] = value;
  }

  getItem(key, defaultValue = null) {
    return this.storage[key] || defaultValue;
  }

  clear() {
    this.storage = {};
  }

  removeItem(key) {
    delete this.storage[key];
  }
}

export default WebStorage;
