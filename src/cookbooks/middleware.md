---
title: "Middleware / Automation"
---

Middleware is a way to run code before or after a request is processed.

This example below is a middleware that proper cases the first letter of the
the user's first name.

It run's before the user is saved to the database at order 30 on all `create` and `update` transactions.

```js
import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    try {
      if (incomingData.name) {
        console.log('incomingData', incomingData)
        let name = incomingData.name
        let firstCharacter = name.charAt(0);
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          incomingData.name = name[0].toUpperCase() + name.substring(1)
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 30,
  when: ['before'],
  type: ['create','update'],
  name: 'properCaseName',
  file: __filename,
}
```