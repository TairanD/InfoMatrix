# How to start runing the project?

1. Use the terminal to run `npm install` to install all the packages for the website.
2. After install, add the code below to the file `node_modules\react-scripts\config\webpack.config.js`, after the statement `'use strict';` in that file:
3. ```
   const crypto = require("crypto");
   const crypto_orig_createHash = crypto.createHash;
   crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);
   ```

### Finally, use terminal to run `npm start` to start the application.
