#!/usr/bin/env node

'use strict';

/**
 * Sorts object keys ~alphabetically
 *
 * @param  {Object} obj The object to be sorted
 * @return {Object}     An sorted copy of `obj`
 */

function sortObject(obj) {
  var out = Object.create(null)

  Object.keys(obj).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  }).forEach(function (key) {
    out[key] = obj[key]
  })

  return out
}

(function () {


  if(process.argv.length < 3){
    console.error('Must include a filename to sort');
  }
  else {
    var filename = process.argv[2];
    if(filename.substr(-5) !== '.json'){
      filename = filename + '.json';
    }

    var save = require('fs').writeFileSync
    var pkgPath = process.cwd() + '/' + filename;
    var pkg = require(pkgPath)

    if (pkg.dependencies) {
      console.log(' > Sorting dependencies...')
      pkg.dependencies = sortObject(pkg.dependencies)
      console.log(JSON.stringify(pkg.dependencies, null, '  '))
    }

    if (pkg.devDependencies) {
      console.log(' > Sorting devDependencies...')
      pkg.devDependencies = sortObject(pkg.devDependencies)
      console.log(JSON.stringify(pkg.devDependencies, null, '  '))
    }

    if (pkg.optionalDependencies) {
      console.log(' > Sorting optionalDependencies...')
      pkg.optionalDependencies = sortObject(pkg.optionalDependencies)
      console.log(JSON.stringify(pkg.optionalDependencies, null, '  '))
    }

    console.log(' > Writing package.json...')
    save(pkgPath, JSON.stringify(pkg, null, '  '))

    console.log(' > Done')

  }

})()