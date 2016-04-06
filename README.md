React Please !
===================

This CLI tool will help you generating react classes quickly, avoiding you to repeat code. Save Time right now !

----------

How to install
-------------
Use npm to install it globally
```bash
npm install -g reactplease
```

----------


How to use
-------------
You can create a config file at the root of the project to avoid using flags on CLI.
Simply create a ```.reactpleaserc``` file, and using JSON syntax, add options as follow

*Example*
```JSON
{
	"es6": true,
	"import": ["lodash", "classnames"],
	"extension": "jsx"
}
```
###Options
**ignore**

```--ignore``` if you provide this flag on CLI, the program will ignore ```.reactpleaserc``` file

**es6**

```--es6``` this will generate your javascript file with ES6 syntax

**extension**

```-e/--ext``` To specify the file extension

**import**

```--import <packages>``` this can import packages top of the React file for you

*Example*
```--import lodash,classnames```

will output top of the file
```javascript
const lodash = require('lodash');
const classnames = require('classnames');
```

**ClassName**

```MyClassName``` this this simply the last argument and the **required** one, that is the class name of your component appearing in the ```displayName``` prop of the class name, and on the output file name

*Examples*
```bash
reactplease --es6 --import lodash,classnames HeaderMenu
reactplease --ignore --es6 --import lodash my/path/to/MyFancyReactClass
reactplease -e react Avatar
```

The file will be generated on the folder relative to the current working directory

*type reactplease -h* to display help

```javascript
return enjoy;
```


