#!/usr/bin/env node

var fm = require("./formality.js");
var fs = require("fs");
var {fmc_to_js} = require("FormCore-lang");

if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log("# Formality");
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("  fmfm            # type-checks all local files");
  console.log("  fmfm <name>     # type-checks one definition");
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
  var files = fs.readdirSync(".").filter(x => x.slice(-3) === ".fm" || x.slice(-5) === ".fmfm");
  var codes = await Promise.all(files.map(file => fs.promises.readFile(file)));
  var code = codes.join("\n");
  if (code.length === "0") {
    console.log("No .fm files.");
    return;
  }

  // FormCore compilation
  if (has_opt("fmc")) {
    var name = get_opt("--js");
    if (name) {
      console.log(fm["Fm.to_core_one"](code, name));
    } else {
      console.log(fm["Fm.to_core_all"](code));
    }

  // JavaScript compilation
  } else if (has_opt("--js")) {
    var name = get_opt("--js") || "main";
    try {
      var fmcc = fm["Fm.to_core_one"](code)(name);
      console.log(fmc_to_js.compile(fmcc, name, {}));
    } catch (e) {
      console.log(e);
      console.log("Compilation error.");
    }

  // JavaScript execution
  } else if (has_opt("--run")) {
    var name = get_opt("--run") || "main";
    try {
      var fmcc = fm["Fm.to_core_one"](code)(name);
      eval(fmc_to_js.compile(fmcc, name, {}));
    } catch (e) {
      console.log("Compilation error.");
    }

  // Type-Checking
  } else {
    var name = process.argv[2];
    if (name && name.slice(-3) !== ".fm" && name.slice(-5) !== ".fmfm") {
      console.log(fm["Fm.check_one"](code)(name));
    } else {
      console.log(fm["Fm.check_all"](code));
    }
  }
})();
