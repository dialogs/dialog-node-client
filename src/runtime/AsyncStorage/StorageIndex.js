/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

class StorageIndex {
  constructor(json) {
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

module.exports = StorageIndex;
