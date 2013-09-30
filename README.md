# What is it?
A simple `POST` request gatherer. `POST` requests sent to the backend are echoed to **all** clients connected.

There is currently no permanent storage. Requests are displayed as pretty-formatted JSON in the browser as they come in,
to remove a data-frame just click on it.

# Why?
Because I couldn't find anything of the sort. There are a bunch of hosted solutions, e.g.,
[postcatcher](http://postcatcher.in) or [RequestBin](http://requestb.in/) which provide temporary storage, but
nothing that you could get as a permanent end-point.

# Installing
Clone the repo, then run `npm install` and `bower install` to install dependencies.

# Running
Once installed, run with `node app.js`. The default port is `3000`, but can be changed in `config.js`.

# License

 Copyright 2013 Emils Solmanis

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.