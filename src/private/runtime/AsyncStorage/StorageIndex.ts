/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

/**
 * @private
 */
class StorageIndex<T> {
  private json: { [key: string]: T };

  constructor(json: { [key: string]: T }) {
    this.json = json;
  }

  get(id) {
    return this.json[id];
  }

  has(id) {
    return Boolean(this.json[id]);
  }

  set(id, value) {
    this.json[id] = value;
  }

  delete(id) {
    delete this.json[id];
  }

  forEach(callback) {
    Object.keys(this.json).forEach((key) => {
      callback(key, this.get(key));
    });
  }

  clear() {
    Object.keys(this.json).forEach((key) => {
      delete this.json[key];
    });
  }

  toJSON() {
    return this.json;
  }
}

export default StorageIndex;
