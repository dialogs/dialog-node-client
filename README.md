Dialog Node.js client
=====================

Installation
------------

```
yarn add @dlghq/dialog-node-client
````

Usage
-----

```js
const path = require('path');
const createClient = require('@dlghq/dialog-node-client');

createClient({
  endpoints: ['wss://ws1.dlg.im'],
  storageFileName: path.join(__dirname, 'storage.json')
}).then((messenger) => {
  console.log({ isLoggedIn: messenger.isLoggedIn() });
}).catch((error) => {
  console.trace(error);
});
```
