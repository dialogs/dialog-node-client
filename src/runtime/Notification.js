class Notification {
  static requestPermission(callback) {
    if (callback) {
      callback('denied')
    } else {
      return Promise.resolve('denied');
    }
  }
}

Notification.permission = 'denied';

module.exports = Notification;
