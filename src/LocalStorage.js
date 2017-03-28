const fs = require('fs');

class LocalStorage {
  constructor(fileName) {
    this.fileName = fileName;
    try {
      this.storage = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }

      this.storage = {};
    }
  }

  persist() {
    fs.writeFileSync(this.fileName, JSON.stringify(this.storage));
  }

  setItem(key, value) {
    this.storage[key] = value;
    this.persist();
  }
  
  getItem(key) {
    return this.storage[key] || null;
  }

  clear() {
    this.storage = {};
    this.persist();
  }

  removeItem(key) {
    delete this.storage[key];
    this.persist();
  }
}

module.exports = LocalStorage;
