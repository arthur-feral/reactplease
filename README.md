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
You can create a config file at the root of the project to avoid using args on CLI.
Simply create a ```.reactpleaserc``` file, and using JSON syntax, add options as follow

*Example*
```JSON
{
	"es6": true,
	"import": ["lodash", "classnames"]
}
```
###Options
**ignore**

```--ignore``` if you provide this flag on CLI, the program will ignore ```.reactpleaserc``` file

**es6**

```--es6``` flag will generate your JSX class file with ECMAScript2015 syntax

**import**

```--import <packages>``` you can automaticly import packages top of the React file

*Example*
```--import lodash,classnames```
and The last argument expected by command is the class name

*Example*
```bash
reactplease --es6 ---import lodash,classnames MyFancyReactClass
reactplease --ignore --es6 ---import lodash my/path/to/MyFancyReactClass
```

will output a file in the current working directory named ```MyFancyReactClass.jsx```



