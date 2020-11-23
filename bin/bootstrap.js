var {execSync} = require("child_process");
var fs = require("fs");
var path = require("path");
var {fmc_to_js, fmc} = require("formcore-lang"); // FormCore, which has the JS compiler

var breaking = false;

if (breaking) {
  // TODO: remove last line
  console.log("Using old Formality to generate formality.js");
  execSync("rm "+path.join(__dirname, "js/formality.js"));
  execSync("rm "+path.join(__dirname, "js/tmp.js"));
  execSync("fmjs Fm.exports | js-beautify >> "+path.join(__dirname, "js/formality.js"));
} else {
  console.log("Loading formality.js (last boostrap)...");
  var fm = require(path.join(__dirname, "js/formality.js"));

  console.log("Loading formality.fm (origin source)...");
  var formality_fm = fs.readFileSync(path.join(__dirname, "../formality.fm"), "utf8");

  var formality_fmc = fm["Fm.to_core_one"](formality_fm)("Fm.exports");
  fs.writeFileSync(path.join(__dirname, "../formality.fmc"), formality_fmc);

  console.log("Compiling formality.fmc to formality.js...");
  var formality_js = fmc_to_js.compile(formality_fmc, "Fm.exports", {module: true});
  fs.writeFileSync(path.join(__dirname, "js/formality.js"), formality_js);

  // TODO: avoid execSync
  execSync("js-beautify "+path.join(__dirname, "js/formality.js >> tmp.js"));
  execSync("mv tmp.js "+path.join(__dirname, "js/formality.js"));
}
