/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const sharp = require('sharp');

function getPhotoSize(fileName) {
  return sharp(fileName)
    .metadata()
    .then(({ width, height }) => {
      return { width, height };
    });
}

module.exports = getPhotoSize;
