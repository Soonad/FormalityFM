var {execSync} = require("child_process");
var fs = require("fs");
var path = require("path");
var {fmc_to_js, fmc} = require("formcore-lang"); // FormCore, which has the JS compiler

var use_old = false;

var file = path.join(__dirname, "js/formality.js");
process.chdir(path.join(__dirname, "../src"));
if (use_old) {
  console.log("Using old Formality to generate formality.js");
  execSync("rm "+file);
  execSync("fmjs Fm.exports | js-beautify >> "+file);
  fs.writeFileSync(file,fs.readFileSync(file,"utf8").split("\n").slice(0,-6).join("\n")); // removes module.exports lines
} else {
  console.log("Generating formality.js");
  execSync("git checkout "+file);
  execSync("fmfm --js Fm.exports --module | js-beautify >> "+file+".tmp");
  execSync("mv "+file+".tmp "+file);
}
