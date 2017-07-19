/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const sharp = require('sharp');

function getPhotoPreview(fileName) {
  return new Promise((resolve, reject) => {
    sharp(fileName)
      .resize(100, 100)
      .embed()
      .toFormat(sharp.format.jpeg)
      .toBuffer((error, data, info) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            width: info.width,
            height: info.height,
            base64: `data:${info.format};base64,${data.toString('base64')}`
          });
        }
      });
  });
}

module.exports = getPhotoPreview;
