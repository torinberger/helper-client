
const axios = require('axios');

module.exports = (ip, port, name, interval) => {
  return {
    online: false,
    deploy() {
      if (!interval) {
        interval = 15000
      }
      let time = new Date()
      this.online = false
      axios
        .post(`http://${ip}:${port}/ping`, {
          name: name,
          deploy: `[${String(time).substr(0, 10)}] ${name} Deployed!`
        })
        .then((res) => {
          console.log('[Helper Client] Deploy Report Sent!');
        })
        .catch(console.log)
      this.delayInterval(interval)
    },
    delayInterval(interval) {
      let self = this
      setTimeout(function () {
        if (self.online) {
          axios
            .post(`http://${ip}:${port}/ping`, {
              name: name
            })
            .then((res) => {})
            .catch(console.log)
        }
        self.delayInterval(interval)
      }, interval);
    },
    catch(err) {
      axios
        .post(`http://${ip}:${port}/ping`, {
          name: name,
          err: String(err)
        })
        .then((res) => {
          console.log('[Helper Client] Error Report Sent!');
        })
        .catch((err) => {
          console.log(err);
        })
    },
    goOffline() {
      this.online = false
    },
    goOnline() {
      this.online = true
    }
  }
}
