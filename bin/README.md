Bootstrap
=========

This generates all implementations from the `formality.fm` file. In order for it
to work, it must load the last bootstrapped version (`formality.js`). Moreover,
since `formality.fm` doesn't implement the JS compiler, it must also import
`FormCoreJS`, which has an efficient `FormCore -> JavaScript` compiler. Then it
works as follows:

```
formality.js compiles formality.fm to formality.fmc
FormCore compiles formality.fmc to formality.js
... other langs to be generated soon ...
```
