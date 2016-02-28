# tumblr-dncngrl
**Tumblr theme of Dancing Girl.**

* Tumblr API v2
* Vue.js + Vuex + Vueify (with ES6)
* Jade
* Stylus


## Require
* Node.js
* Gulp


## Setup
### Clone repository

    $ git clone https://github.com/ryonakae/tumblr-dncngrl.git
    $ cd tumblr-dncngrl

### Install npm packages

    $ npm i

### Create config.js

    $ touch source/assets/javascripts/config.js

Then, edit `source/assets/javascripts/config.js`.

    module.exports = {
      tumblrUrl: 'http://api.tumblr.com/v2/blog/your-blog-domain/posts',
      apiKey: 'your-tumblr-api-key'
    };


## Development
### Develop & Watch

    $ npm start

### Build

    $ npm build