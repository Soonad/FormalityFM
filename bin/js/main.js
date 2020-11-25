#!/usr/bin/env node

var fm = require("./formality.js");
var fs = require("fs");
var path = require("path");
var {fmc_to_js} = require("FormCore-lang");

if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log("# Formality");
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("  fmfm              # type-checks all local files");
  console.log("  fmfm <name>       # type-checks one definition");
  console.log("  fmfm --fmc <name> # compiles to FormCore");
  console.log("  fmfm --js  <name> # compiles to JavaScript");
  console.log("  fmfm --run <name> # runs with JavaScript");
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
  var files = await Promise.all(files.map(file => fs.promises.readFile(file,"utf8").then(code => ({name:file,code}))));
  if (files.length === 0) {
    console.log("No .fm files.");
    return;
  }
  var files_list = {_:"List.nil"};
  for (var i = 0; i < files.length; ++i) {
    files_list = {_:"List.cons",
      head: {_:"Fm.File.new", name: files[i].name, code: files[i].code},
      tail: files_list,
    };
  }
  var files = files_list;

  // FormCore compilation
  if (has_opt("fmc")) {
    var name = get_opt("--js");
    if (name) {
      console.log(fm["Fm.to_core_one"](files, name));
    } else {
      console.log(fm["Fm.to_core_all"](files));
    }

  // JavaScript compilation
  } else if (has_opt("--js")) {
    var name = get_opt("--js") || "main";
    var module = process.argv[4] === "--module";
    try {
      var fmcc = fm["Fm.to_core_one"](files)(name);
      console.log(fmc_to_js.compile(fmcc, name, {module}));
    } catch (e) {
      console.log("Compilation error.");
      //console.log(e);
    }

  // JavaScript execution
  } else if (has_opt("--run")) {
    var name = get_opt("--run") || "main";
    try {
      var fmcc = fm["Fm.to_core_one"](files)(name);
      var asjs = fmc_to_js.compile(fmcc, name, {});
      var js_path = path.join(__dirname,"_formality_tmp_.js");
      try { fs.unlinkSync(js_path); } catch (e) {};
      fs.writeFileSync(js_path, asjs);
      require(js_path);
      fs.unlinkSync(js_path);
    } catch (e) {
      console.log("Compilation error.");
      //console.log(e);
    }

  // Type-Checking
  } else {
    var name = process.argv[2];
    if (name && name.slice(-3) !== ".fm" && name.slice(-5) !== ".fmfm") {
      console.log(fm["Fm.check_one"](files)(name));
    } else if (name) {
      console.log(fm["Fm.check_file"](files)(name));
    } else {
      console.log(fm["Fm.check_all"](files));
    }
  }
})();
