#!/usr/bin/env node

var fm = require("./formality.js");
var fs = require("fs");

if (!process.argv[2] || process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log("# Formality");
  console.log("");
  console.log("Type-checking:");
  console.log("");
  console.log("  fmfm <file>");
  console.log("");
  console.log("Examples:");
  console.log("");
  console.log("  # Check all types on 'example.fmfm':");
  console.log("  fmfm example.fmfm");
  process.exit();
}

(async () => {
  var file = process.argv[2] || "";
  try {
    var code = fs.readFileSync(file, "utf8");
    var args = [].slice.call(process.argv, 3);
  } catch (e) {
    console.log("File not found.");
    process.exit();
  }
  console.log(fm["Fm.report"](code));
})();
