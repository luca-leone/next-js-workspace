## Workspace for Modern Javascript Development

This is a minimal **workspace** designed to develop JavaScript applications with the **latest ECMAScript** features in order to making them suitables both **browser** or **Node.js** environment.

It is made on **[Babel](https://babeljs.io/)** which compiles modern JavaScript to ECMAScript 5 and uses **[GulpJS](https://gulpjs.com/)** to automate and enhance the workflow. In addition, **configuration files** for **compiler**, **code linter**, **bundler** and IDE settings are provided. 

It's recommended to use **[Visual Studio Code](https://code.visualstudio.com/download)** for better development experience. Code **linter** uses **Google's style** recommendations with some little changes that can be found in **.eslintrc** within "rules" object.

One of workspace's most relevant features is "**hot reload**": everytime a file is saved it will be authomatically compiled and a new build will be available within dist/ folder without run manually any build command from terminal.

This workspace is suitable for everyone are looking for a minimal ready to use JavaScript development envirnoment. It's is perfect to develop JS libraries but can be also used as starting tool for any particular needs. It can be customized in according to developers needs adding other software as such as broserify or sass compiler.


## Table of contents

- [Download](#quick-start)
- [Requirements](#requirements)
- [Install dependencies](#install-dependencies)
- [Get started](#get-started)
- [What's included](#whats-included)
- [ECMAScript features](#ECMAScript-features)
- [Creator](#creator)
- [Copyright and license](#copyright-and-license)


## Download

- [Download the latest release.](https://github.com/luca-leone/workspace/archive/master.zip)
- Clone the repo: `git clone https://github.com/luca-leone/workspace.git`


## Requirements

- Download and install Node.js. **[Node.js v4+](https://nodejs.org/en/)** is required.
- Use a **package manager**. **[npm](https://www.npmjs.com/)** is provided together with Node.js . Alternatively **[yarn](https://yarnpkg.com/lang/en/)** is also considered a good choice.


## Install dependencies

Run **one** of the following command:

* `npm install`


## Get started

- Let's start coding creating **new files** within **src/** folder. 
**index.js** represents the **entry point** of the application workspace and **must always** be under **src/ folder**. **All public files must be imported within index.js**. Generated **bundle** can be found within **dist/** (it's default name is "**index.js**"). It has also a **commented header** which takes info from **package.json** . Feel free to **replace default info** with the new ones.

- Start compiler: `npm run build` 


## What's included

Within the download you'll find the following directories and files

```
workspace/
  |--- node_modules/
  |
  |--- src/
  |     |--- <your-file-1>.js
  |     |--- <your-file-2>.js
  |     |--- <your-file-3>.js 
  |
  |--- .babelrc
  |--- .eslintignore
  |--- .eslintrc
  |--- .gitignore
  |--- .jshintrc
  |--- gulpfile.js
  |--- index.js
  |--- jsconfig.json
  |--- package-lock.json
  |--- package.json
  |--- LICENSE.md
  |--- README.md
```


## ECMAScript features

* decorators
* classes
* class properties
* constants
* arrow functions
* block scoped functions
* block scoping
* computed properties
* destructuring
* duplicate keys
* for of
* function name
* literals
* modules umd
* object super
* parameters
* shorthand properties
* spread
* sticky regex
* template literals
* typeof symbol
* unicode regex
* transform regenerator


## Creator

**Luca Leone**

- <https://twitter.com/lucaleone__>
- <https://github.com/luca-leone>


## Copyright and license

Copyright 2018 **Luca Leone**. Code released under the [MIT License](https://github.com/luca-leone/workspace/blob/master/LICENSE).