var {execSync} = require("child_process");
var fs = require("fs");
var {fmc_to_js, fmc} = require("formcore-lang"); // FormCore, which has the JS compiler

console.log("Loading formality.js (last boostrap)...");
var fm = require("./../bin/js/formality.js");

console.log("Loading formality.fm (origin source)...");
var formality_fm = fs.readFileSync("./../formality.fm", "utf8");

console.log("Compiling formality.fm to formality.fmc...");
var formality_fmc = fm["Fm.to_core"](formality_fm);
fs.writeFileSync("./../formality.fmc", formality_fmc);

console.log("Compiling formality.fmc to formality.js...");
var formality_js = fmc_to_js.compile(formality_fmc, "Fm.exports", {module: true});
fs.writeFileSync("./../bin/js/formality.js", formality_js);

// TODO: avoid execSync
execSync("js-beautify ./../bin/js/formality.js >> tmp.js");
execSync("mv tmp.js ./../bin/js/formality.js");
