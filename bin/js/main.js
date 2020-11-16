#!/usr/bin/env node

var fm = require("./formality.js");
var fs = require("fs");
var {fmc_to_js} = require("FormCore-lang");

if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log("# Formality");
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("  fmfm            # type-checks");
  console.log("  fmfm fmc <name> # compiles to FormCore");
  console.log("  fmfm js  <name> # compiles to JavaScript");
  console.log("  fmfm run <name> # runs with JavaScript");
  console.log("");
  console.log("Examples:");
  console.log("");
  console.log("  # Check all types on 'example.fmfm':");
  console.log("  fmfm example.fmfm");
  process.exit();
}

function has_opt(opt) {
  return process.argv[2] === opt;
};

function get_opt(opt) {
  return process.argv[3];
};

(async () => {
  var files = fs.readdirSync(".").filter(x => x.slice(-3) === ".fm");
  var codes = await Promise.all(files.map(file => fs.promises.readFile(file)));
  var code = codes.join("\n");
  if (code.length === "0") {
    console.log("No .fm files.");
    return;
  }

  if (has_opt("fmc")) {
    console.log(fm["Fm.to_core"](code));
  } else if (has_opt("js")) {
    var name = get_opt("js") || "main";
    try {
      var fmcc = fm["Fm.to_core"](code);
      console.log(fmc_to_js.compile(fmcc, name, {}));
    } catch (e) {
      console.log("Compilation error.");
    }
  } else if (has_opt("run")) {
    var name = get_opt("run") || "main";
    try {
      var fmcc = fm["Fm.to_core"](code);
      eval(fmc_to_js.compile(fmcc, name, {}));
    } catch (e) {
      console.log("Compilation error.");
    }
  } else {
    console.log(fm["Fm.report"](code));
  }
})();
