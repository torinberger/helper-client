# helper-client
## Install
```bash
npm i -s helper-client
```
## Usage
```javascript
var helper = require('helper-client')('HELPER_IP', 'HELPER_PORT', 'PROJECT_NAME')
// e.g
var helper = require('helper-client')('127.0.0.1', '3000', 'testproject')

// when project in only (only call once)
helper.deploy()

// when project encounters an error
helper.catch(err)

// when project dies/when you want to stop pinging temporarily
helper.goOffline()

// when project comes back online/when you want to start pinging again
helper.goOnline()
```
