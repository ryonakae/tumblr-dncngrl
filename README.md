# tumblr-dncngrl
**Tumblr theme of Dancing GIrl.**

* Gulp
* React
* Webpack
* Jade
* Stylus


## Require
* Node.js


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
### Watch

    $ gulp watch
    
### Build

    $ gulp build