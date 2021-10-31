---
title: "Add API Properties"
---

## Add an API Property

API properties are used to define the properties of the api-side of this service.

So far I've come up against the following problem and this is how I solved it.  I have a [rule](/docs/api/rules) that emails users when they create an account.  I don't want to email users when I'm working on my fork, so I'm going to add a property to the rule that will prevent it from being sent.

### Disable emailing

1.  Update the `./api/src/lib/apiProperties.js` file.
    
    ```js/2-4/
    export const apiProperties = (() => {
      return {
        email: {
          active: false,
        },
      }
    })()
    ```

2.  Update the `./api/src/rule/users/emailUserWelcome.js` file.

    ```js/1,9,13-15/
    import { logger } from 'src/lib/logger'
    import { apiProperties } from 'src/lib/apiProperties'
    let Mailgun = require('mailgun-js')
    module.exports = {
      command: async function (incomingData) {
        try {
          if (
            process.env.MAILGUN_API_KEY &&
            process.env.MAILGUN_DOMAIN &&
            apiProperties.email.active
          ) {
              // ... email them
          } else {
            logger.error(
              `__filename mail not sent apiProperties.email.action=${systemProperties.email.active}`
            )
          }
        } catch (e) {
            logger.error(e)
        }
        return await incomingData
      },
      // properties of rule
    }
    ```