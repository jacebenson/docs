---
title: Add Web Properties
---

## Add an Web Property

Sometimes we want to change how components work for Tskr.  To do this, we can add a new property to the web properties and then import them into the components.

I have a use case where I want to allow administrators to control avatars.  After spending far too much time, I went with either you can "allow" avatars, then you can say here's the calculated link to the avatar image.

### Controlling Avatars

1.  Update the `./web/src/lib/webProperties.js` file to add the new property.

    ```js/2-3,14-15/
    export const webProperties = (() => {
      return {
        avatars: {
          active: false,
          /**
           * @param {*} hash
           * @returns image
           * YOu could swap out the image function here to use things like
           * https://unicornify.pictures/avatar/{hash}?s=128
           * https://avatars.dicebear.com/v2/jdenticon/{hash}.svg
           * https://www.gravatar.com/avatar/${hash}?s=260&d=retro
           */
          //image: (hash) => `https://www.gravatar.com/avatar/${hash}?s=260&d=retro`,
          //image: (hash) => `https://avatars.dicebear.com/v2/jdenticon/${hash}.svg`,
          image: (hash) => `https://unicornify.pictures/avatar/${hash}?s=128`,
        },
      }
    })()
    ```
2.  Update the components (`./web/src/components/User/UsersCell/UsersCell.js`) that use it.  
    
    ```js/1,6,9,12/
    // imports ...
    import { webProperties } from 'src/lib/webProperties'
    // exports ...
    export const Success ({ users }) = {
        return (
        {/* bunch of html*/}
        {webProperties.avatars.active && (
          <img
              className="w-full h-full rounded-full"
              src={webProperties.avatars.image(user.md5Email)}
              alt={user.name}
          />
        )}
        {/* bunch of html*/}
        )
    }
    ```