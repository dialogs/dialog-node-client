/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import WebStorage from '../WebStorage';
import StorageIndex from './StorageIndex';

/**
 * @private
 */
class AsyncStorage<T> {
  private storage: WebStorage<T>;

  constructor(storage: WebStorage<T>) {
    this.storage = storage;
  }

  transaction(type, keyspace, resolve, reject, callback) {
    try {
      const storageKey = `ngkv_${keyspace}`;
      const index = new StorageIndex(this.storage.getItem(storageKey, {}));

      resolve(callback(index));

      if (type === 'readwrite') {
        this.storage.setItem(storageKey, index.toJSON());
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  }

  addOrUpdateItem(keyspace, value, resolve, reject) {
    this.transaction('readwrite', keyspace, resolve, reject, (index) => {
      index.set(value.id, value.data);
    });
  }

  addOrUpdateItems(keyspace, values, resolve, reject) {
    this.transaction('readwrite', keyspace, resolve, reject, (index) => {
      values.forEach((value) => {
        index.set(value.id, value.data);
      });
    });
  }

  removeItem(keyspace, key, resolve, reject) {
    this.transaction('readwrite', keyspace, resolve, reject, (index) => {
      index.delete(key);
    });
  }

  removeItems(keyspace, keys, resolve, reject) {
    this.transaction('readwrite', keyspace, resolve, reject, (index) => {
      keys.forEach((key) => {
        index.delete(key);
      });
    });
  }

  loadItem(keyspace, key, resolve, reject) {
    this.transaction('readonly', keyspace, resolve, reject, (index) => {
      return index.get(key);
    });
  }

  loadItems(keyspace, keys, resolve, reject) {
    this.transaction('readonly', keyspace, resolve, reject, (index) => {
      const result = [];
      keys.forEach((id) => {
        const data = index.get(id);
        if (data) {
          result.push({ id, data });
        }
      });

      return result;
    });
  }

  loadAllItems(keyspace, resolve, reject) {
    this.transaction('readonly', keyspace, resolve, reject, (index) => {
      const result = [];
      index.forEach((id, data) => {
        result.push({ id, data });
      });

      return result;
    });
  }

  exists(keyspace, key, resolve, reject) {
    this.transaction('readonly', keyspace, resolve, reject, (index) => {
      return index.has(key);
    });
  }

  clear(keyspace, resolve, reject) {
    this.transaction('readwrite', keyspace, resolve, reject, (index) => {
      index.clear();
    });
  }
}

export default AsyncStorage;
