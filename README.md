# API Server Boilerplate

Ready-made API Server Boilerplate / Starter Kit that uses ES6, Passport JWT for user auth, Express, Mongoose, and more.

Created for internal uses to be able to rapidly build multiple prototypes.

Includes [Paw App](https://paw.cloud/), _a Mac OS application for API development like [Postman](https://www.getpostman.com/), file called `api-client-definitions.paw` to test API right out of the gate.



## Installation

```
$ git clone git@bitbucket.org:swiftblue/api-server-boilerplate.git
$ cd api-server-boilerplate
$ npm install
$ touch .env
```

The contents of the .env file (or you can se environment variables)

```
PORT=3000
API_PREFIX=/v1

SECRET_KEY=d3v3l0pm3nt!k3y

MONGODB_URI=mongodb://localhost:27017/my-api-server

STATUS_PAGE_URL=/status
STATUS_PAGE_USER=admin
STATUS_PAGE_PASS=password
STATUS_PAGE_TITLE=API Service Status Monitor
STATUS_PAGE_REALM=API Service Monitoring Area
```

## Usage

Development: `$ npm run dev`

## Credits

David Berube ([GitHub](https://github.com/SwiftBlue/api-server-boilerplate)/[Homepage](https://berube.co))

## License

> MIT License

> **Copyright © 2017 SwiftBlue, LLC & David Berube**

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
