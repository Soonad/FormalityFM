module.exports = (function() {
    function word_to_u16(w) {
        var u = 0;
        for (var i = 0; i < 16; ++i) {
            u = u | (w._ === 'Word.i' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u16_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0; i < 16; ++i) {
            w = {
                _: (u >>> (16 - i - 1)) & 1 ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };
    var list_for = list => nil => cons => {
        while (list._ !== 'List.nil') {
            nil = cons(list.head)(nil);
            list = list.tail;
        }
        return nil;
    };
    var nat_to_bits = n => {
        return n === 0n ? '' : n.toString(2);
    };
    var fm_name_to_bits = name => {
        const TABLE = {
            'A': '000000',
            'B': '100000',
            'C': '010000',
            'D': '110000',
            'E': '001000',
            'F': '101000',
            'G': '011000',
            'H': '111000',
            'I': '000100',
            'J': '100100',
            'K': '010100',
            'L': '110100',
            'M': '001100',
            'N': '101100',
            'O': '011100',
            'P': '111100',
            'Q': '000010',
            'R': '100010',
            'S': '010010',
            'T': '110010',
            'U': '001010',
            'V': '101010',
            'W': '011010',
            'X': '111010',
            'Y': '000110',
            'Z': '100110',
            'a': '010110',
            'b': '110110',
            'c': '001110',
            'd': '101110',
            'e': '011110',
            'f': '111110',
            'g': '000001',
            'h': '100001',
            'i': '010001',
            'j': '110001',
            'k': '001001',
            'l': '101001',
            'm': '011001',
            'n': '111001',
            'o': '000101',
            'p': '100101',
            'q': '010101',
            'r': '110101',
            's': '001101',
            't': '101101',
            'u': '011101',
            'v': '111101',
            'w': '000011',
            'x': '100011',
            'y': '010011',
            'z': '110011',
            '0': '001011',
            '1': '101011',
            '2': '011011',
            '3': '111011',
            '4': '000111',
            '5': '100111',
            '6': '010111',
            '7': '110111',
            '8': '001111',
            '9': '101111',
            '.': '011111',
            '_': '111111',
        }
        var a = '';
        for (var i = name.length - 1; i >= 0; --i) {
            a += TABLE[name[i]];
        }
        return a;
    };
    var inst_unit = x => x(1);
    var elim_unit = (x => (() => c0 => {
        var self = x;
        switch ("unit") {
            case 'unit':
                return c0;
        }
    })());
    var inst_bool = x => x(true)(false);
    var elim_bool = (x => (() => c0 => c1 => {
        var self = x;
        switch (self ? 'true' : 'false') {
            case 'true':
                return c0;
            case 'false':
                return c1;
        }
    })());
    var inst_nat = x => x(0n)(x0 => 1n + x0);
    var elim_nat = (x => (() => c0 => c1 => {
        var self = x;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return c0;
            case 'succ':
                var $0 = (self - 1n);
                return c1($0);
        }
    })());
    var inst_bits = x => x('')(x0 => x0 + '0')(x0 => x0 + '1');
    var elim_bits = (x => (() => c0 => c1 => c2 => {
        var self = x;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return c0;
            case 'o':
                var $1 = self.slice(0, -1);
                return c1($1);
            case 'i':
                var $2 = self.slice(0, -1);
                return c2($2);
        }
    })());
    var inst_u16 = x => x(x0 => word_to_u16(x0));
    var elim_u16 = (x => (() => c0 => {
        var self = x;
        switch ('u16') {
            case 'u16':
                var $3 = u16_to_word(self);
                return c0($3);
        }
    })());
    var inst_string = x => x('')(x0 => x1 => (String.fromCharCode(x0) + x1));
    var elim_string = (x => (() => c0 => c1 => {
        var self = x;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return c0;
            case 'cons':
                var $4 = self.charCodeAt(0);
                var $5 = self.slice(1);
                return c1($4)($5);
        }
    })());
    var run = (p) => {
        var rdl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        return run_io(rdl, p).then((x) => {
            rdl.close();
            return x;
        });
    };
    var run_io = (rdl, p) => {
        switch (p._) {
            case 'IO.end':
                return Promise.resolve(p.value);
            case 'IO.ask':
                return new Promise((res, _) => {
                    switch (p.query) {
                        case 'print':
                            console.log(p.param);
                            run_io(rdl, p.then(1)).then(res);
                            break;
                        case 'get_line':
                            rdl.question('', (line) => run_io(rdl, p.then(line)).then(res));
                            break;
                        case 'get_file':
                            try {
                                run_io(rdl, p.then(require('fs').readFileSync(p.param, 'utf8'))).then(res);
                            } catch (e) {
                                console.log('File not found: "' + p.param + '"');
                                process.exit();
                            };
                            break;
                        case 'get_args':
                            run_io(rdl, p.then(process.argv[2] || '')).then(res);
                            break;
                    }
                });
        }
    };
    var Monad$bind = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $6 = self.bind;
                var $7 = self.pure;
                return $6;
        }
    })());
    var IO = (_A$1 => null);
    var Monad$new = (_bind$2 => (_pure$3 => ({
        _: 'Monad.new',
        'bind': _bind$2,
        'pure': _pure$3
    })));
    var IO$ask = (_query$2 => (_param$3 => (_then$4 => ({
        _: 'IO.ask',
        'query': _query$2,
        'param': _param$3,
        'then': _then$4
    }))));
    var IO$bind = (_a$3 => (_f$4 => (() => {
        var self = _a$3;
        switch (self._) {
            case 'IO.end':
                var $8 = self.value;
                return _f$4($8);
            case 'IO.ask':
                var $9 = self.query;
                var $10 = self.param;
                var $11 = self.then;
                return IO$ask($9)($10)((_x$8 => IO$bind($11(_x$8))(_f$4)));
        }
    })()));
    var IO$end = (_value$2 => ({
        _: 'IO.end',
        'value': _value$2
    }));
    var IO$monad = Monad$new(IO$bind)(IO$end);
    var Map = (_A$1 => null);
    var Maybe = (_A$1 => null);
    var Maybe$none = ({
        _: 'Maybe.none'
    });
    var Map$get = _bits$2 => _map$3 => {
        var Map$get = _bits$2 => _map$3 => ({
            ctr: 'TCO',
            arg: [_bits$2, _map$3]
        });
        var arg = [_bits$2, _map$3];
        while (true) {
            let [_bits$2, _map$3] = arg;
            var R = (() => {
                var self = _bits$2;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $12 = self.val;
                                    var $13 = self.lft;
                                    var $14 = self.rgt;
                                    return $12;
                            }
                        })();
                    case 'o':
                        var $15 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $16 = self.val;
                                    var $17 = self.lft;
                                    var $18 = self.rgt;
                                    return Map$get($15)($17);
                            }
                        })();
                    case 'i':
                        var $19 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $20 = self.val;
                                    var $21 = self.lft;
                                    var $22 = self.rgt;
                                    return Map$get($19)($22);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$e = '';
    var Bool$false = false;
    var Bool$and = a0 => a1 => (a0 && a1);
    var Bool$true = true;
    var Cmp$as_lte = (_cmp$1 => (() => {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                return Bool$true;
            case 'Cmp.eql':
                return Bool$true;
            case 'Cmp.gtn':
                return Bool$false;
        }
    })());
    var Cmp$ltn = ({
        _: 'Cmp.ltn'
    });
    var Cmp$gtn = ({
        _: 'Cmp.gtn'
    });
    var Word$cmp$go = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                return (_b$5 => _c$4);
            case 'Word.o':
                var $23 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => _c$4);
                        case 'Word.o':
                            var $24 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($24)(_c$4));
                        case 'Word.i':
                            var $25 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($25)(Cmp$ltn));
                    }
                })()($23));
            case 'Word.i':
                var $26 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => _c$4);
                        case 'Word.o':
                            var $27 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($27)(Cmp$gtn));
                        case 'Word.i':
                            var $28 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($28)(_c$4));
                    }
                })()($26));
        }
    })()(_b$3))));
    var Cmp$eql = ({
        _: 'Cmp.eql'
    });
    var Word$cmp = (_a$2 => (_b$3 => Word$cmp$go(_a$2)(_b$3)(Cmp$eql)));
    var Word$lte = (_a$2 => (_b$3 => Cmp$as_lte(Word$cmp(_a$2)(_b$3))));
    var Nat$succ = (_pred$1 => 1n + _pred$1);
    var Nat$zero = 0n;
    var U16$lte = a0 => a1 => (a0 <= a1);
    var U16$btw = (_a$1 => (_b$2 => (_c$3 => ((_a$1 <= _b$2) && (_b$2 <= _c$3)))));
    var U16$new = (_value$1 => word_to_u16(_value$1));
    var Word$e = ({
        _: 'Word.e'
    });
    var Word = (_size$1 => null);
    var Word$i = (_pred$2 => ({
        _: 'Word.i',
        'pred': _pred$2
    }));
    var Word$o = (_pred$2 => ({
        _: 'Word.o',
        'pred': _pred$2
    }));
    var Word$subber = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                return (_b$5 => Word$e);
            case 'Word.o':
                var $29 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => Word$e);
                        case 'Word.o':
                            var $30 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$i(Word$subber(_a$pred$10)($30)(Bool$true));
                                    case 'false':
                                        return Word$o(Word$subber(_a$pred$10)($30)(Bool$false));
                                }
                            })());
                        case 'Word.i':
                            var $31 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$o(Word$subber(_a$pred$10)($31)(Bool$true));
                                    case 'false':
                                        return Word$i(Word$subber(_a$pred$10)($31)(Bool$true));
                                }
                            })());
                    }
                })()($29));
            case 'Word.i':
                var $32 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => Word$e);
                        case 'Word.o':
                            var $33 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$o(Word$subber(_a$pred$10)($33)(Bool$false));
                                    case 'false':
                                        return Word$i(Word$subber(_a$pred$10)($33)(Bool$false));
                                }
                            })());
                        case 'Word.i':
                            var $34 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$i(Word$subber(_a$pred$10)($34)(Bool$true));
                                    case 'false':
                                        return Word$o(Word$subber(_a$pred$10)($34)(Bool$false));
                                }
                            })());
                    }
                })()($32));
        }
    })()(_b$3))));
    var Word$sub = (_a$2 => (_b$3 => Word$subber(_a$2)(_b$3)(Bool$false)));
    var U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));
    var Nat$apply = _n$2 => _f$3 => _x$4 => {
        var Nat$apply = _n$2 => _f$3 => _x$4 => ({
            ctr: 'TCO',
            arg: [_n$2, _f$3, _x$4]
        });
        var arg = [_n$2, _f$3, _x$4];
        while (true) {
            let [_n$2, _f$3, _x$4] = arg;
            var R = (() => {
                var self = _n$2;
                switch (self === 0n ? 'zero' : 'succ') {
                    case 'zero':
                        return _x$4;
                    case 'succ':
                        var $35 = (self - 1n);
                        return Nat$apply($35)(_f$3)(_f$3(_x$4));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Word$inc = (_word$2 => (() => {
        var self = _word$2;
        switch (self._) {
            case 'Word.e':
                return Word$e;
            case 'Word.o':
                var $36 = self.pred;
                return Word$i($36);
            case 'Word.i':
                var $37 = self.pred;
                return Word$o(Word$inc($37));
        }
    })());
    var U16$inc = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $38 = u16_to_word(self);
                return U16$new(Word$inc($38));
        }
    })());
    var Word$zero = (_size$1 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$e;
            case 'succ':
                var $39 = (self - 1n);
                return Word$o(Word$zero($39));
        }
    })());
    var U16$zero = U16$new(Word$zero(16n));
    var Nat$to_u16 = a0 => (Number(a0));
    var Word$adder = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                return (_b$5 => Word$e);
            case 'Word.o':
                var $40 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => Word$e);
                        case 'Word.o':
                            var $41 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$i(Word$adder(_a$pred$10)($41)(Bool$false));
                                    case 'false':
                                        return Word$o(Word$adder(_a$pred$10)($41)(Bool$false));
                                }
                            })());
                        case 'Word.i':
                            var $42 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$o(Word$adder(_a$pred$10)($42)(Bool$true));
                                    case 'false':
                                        return Word$i(Word$adder(_a$pred$10)($42)(Bool$false));
                                }
                            })());
                    }
                })()($40));
            case 'Word.i':
                var $43 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            return (_a$pred$8 => Word$e);
                        case 'Word.o':
                            var $44 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$o(Word$adder(_a$pred$10)($44)(Bool$true));
                                    case 'false':
                                        return Word$i(Word$adder(_a$pred$10)($44)(Bool$false));
                                }
                            })());
                        case 'Word.i':
                            var $45 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$i(Word$adder(_a$pred$10)($45)(Bool$true));
                                    case 'false':
                                        return Word$o(Word$adder(_a$pred$10)($45)(Bool$true));
                                }
                            })());
                    }
                })()($43));
        }
    })()(_b$3))));
    var Word$add = (_a$2 => (_b$3 => Word$adder(_a$2)(_b$3)(Bool$false)));
    var U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);
    var Cmp$as_eql = (_cmp$1 => (() => {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                return Bool$false;
            case 'Cmp.eql':
                return Bool$true;
            case 'Cmp.gtn':
                return Bool$false;
        }
    })());
    var Word$eql = (_a$2 => (_b$3 => Cmp$as_eql(Word$cmp(_a$2)(_b$3))));
    var U16$eql = a0 => a1 => (a0 === a1);
    var Bits$o = (_pred$1 => _pred$1 + '0');
    var Bits$i = (_pred$1 => _pred$1 + '1');
    var Word$to_bits = (_a$2 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                return Bits$e;
            case 'Word.o':
                var $46 = self.pred;
                return Bits$o(Word$to_bits($46));
            case 'Word.i':
                var $47 = self.pred;
                return Bits$i(Word$to_bits($47));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$e;
            case 'succ':
                var $48 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.e':
                            return Word$o(Word$trim($48)(Word$e));
                        case 'Word.o':
                            var $49 = self.pred;
                            return Word$o(Word$trim($48)($49));
                        case 'Word.i':
                            var $50 = self.pred;
                            return Word$i(Word$trim($48)($50));
                    }
                })();
        }
    })()));
    var Bits$concat = a0 => a1 => (a1 + a0);
    var Bits$reverse$tco = _a$1 => _r$2 => {
        var Bits$reverse$tco = _a$1 => _r$2 => ({
            ctr: 'TCO',
            arg: [_a$1, _r$2]
        });
        var arg = [_a$1, _r$2];
        while (true) {
            let [_a$1, _r$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        return _r$2;
                    case 'o':
                        var $51 = self.slice(0, -1);
                        return Bits$reverse$tco($51)(Bits$o(_r$2));
                    case 'i':
                        var $52 = self.slice(0, -1);
                        return Bits$reverse$tco($52)(Bits$i(_r$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$reverse = (_a$1 => Bits$reverse$tco(_a$1)(Bits$e));
    var Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));
    var Fm$get = (_name$2 => (_map$3 => Map$get((fm_name_to_bits(_name$2)))(_map$3)));
    var String$cons = (_head$1 => (_tail$2 => (String.fromCharCode(_head$1) + _tail$2)));
    var Fm$Synth$file_of = (_name$1 => (() => {
        var self = _name$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return ".fm";
            case 'cons':
                var $53 = self.charCodeAt(0);
                var $54 = self.slice(1);
                return (() => {
                    var self = ($53 === 46);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return ".fm";
                        case 'false':
                            return String$cons($53)(Fm$Synth$file_of($54));
                    }
                })();
        }
    })());
    var IO$get_file = (_name$1 => IO$ask("get_file")(_name$1)((_file$2 => IO$end(_file$2))));
    var Parser = (_V$1 => null);
    var Parser$Reply = (_V$1 => null);
    var Parser$Reply$error = (_idx$2 => (_code$3 => (_err$4 => ({
        _: 'Parser.Reply.error',
        'idx': _idx$2,
        'code': _code$3,
        'err': _err$4
    }))));
    var Parser$bind = (_parse$3 => (_next$4 => (_idx$5 => (_code$6 => (() => {
        var self = _parse$3(_idx$5)(_code$6);
        switch (self._) {
            case 'Parser.Reply.error':
                var $55 = self.idx;
                var $56 = self.code;
                var $57 = self.err;
                return Parser$Reply$error($55)($56)($57);
            case 'Parser.Reply.value':
                var $58 = self.idx;
                var $59 = self.code;
                var $60 = self.val;
                return _next$4($60)($58)($59);
        }
    })()))));
    var Parser$Reply$value = (_idx$2 => (_code$3 => (_val$4 => ({
        _: 'Parser.Reply.value',
        'idx': _idx$2,
        'code': _code$3,
        'val': _val$4
    }))));
    var Parser$pure = (_value$2 => (_idx$3 => (_code$4 => Parser$Reply$value(_idx$3)(_code$4)(_value$2))));
    var Parser$monad = Monad$new(Parser$bind)(Parser$pure);
    var Parser$is_eof = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$1)(_code$2)(Bool$true);
            case 'cons':
                var $61 = self.charCodeAt(0);
                var $62 = self.slice(1);
                return Parser$Reply$value(_idx$1)(_code$2)(Bool$false);
        }
    })()));
    var Monad$pure = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $63 = self.bind;
                var $64 = self.pure;
                return $64;
        }
    })());
    var Maybe$some = (_value$2 => ({
        _: 'Maybe.some',
        'value': _value$2
    }));
    var Parser$ErrorAt$new = (_idx$1 => (_code$2 => (_err$3 => ({
        _: 'Parser.ErrorAt.new',
        'idx': _idx$1,
        'code': _code$2,
        'err': _err$3
    }))));
    var Cmp$as_gtn = (_cmp$1 => (() => {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                return Bool$false;
            case 'Cmp.eql':
                return Bool$false;
            case 'Cmp.gtn':
                return Bool$true;
        }
    })());
    var Nat$cmp = _a$1 => _b$2 => {
        var Nat$cmp = _a$1 => _b$2 => ({
            ctr: 'TCO',
            arg: [_a$1, _b$2]
        });
        var arg = [_a$1, _b$2];
        while (true) {
            let [_a$1, _b$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self === 0n ? 'zero' : 'succ') {
                    case 'zero':
                        return (() => {
                            var self = _b$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Cmp$eql;
                                case 'succ':
                                    var $65 = (self - 1n);
                                    return Cmp$ltn;
                            }
                        })();
                    case 'succ':
                        var $66 = (self - 1n);
                        return (() => {
                            var self = _b$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Cmp$gtn;
                                case 'succ':
                                    var $67 = (self - 1n);
                                    return Nat$cmp($66)($67);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Nat$gtn = a0 => a1 => (a0 > a1);
    var Parser$ErrorAt$combine = (_a$1 => (_b$2 => (() => {
        var self = _a$1;
        switch (self._) {
            case 'Maybe.none':
                return _b$2;
            case 'Maybe.some':
                var $68 = self.value;
                return (() => {
                    var self = _b$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return _a$1;
                        case 'Maybe.some':
                            var $69 = self.value;
                            return (() => {
                                var self = $68;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $70 = self.idx;
                                        var $71 = self.code;
                                        var $72 = self.err;
                                        return (() => {
                                            var self = $69;
                                            switch (self._) {
                                                case 'Parser.ErrorAt.new':
                                                    var $73 = self.idx;
                                                    var $74 = self.code;
                                                    var $75 = self.err;
                                                    return (() => {
                                                        var self = ($70 > $73);
                                                        switch (self ? 'true' : 'false') {
                                                            case 'true':
                                                                return _a$1;
                                                            case 'false':
                                                                return _b$2;
                                                        }
                                                    })();
                                            }
                                        })();
                                }
                            })();
                    }
                })();
        }
    })()));
    var Parser$first_of$go = _pars$2 => _err$3 => _idx$4 => _code$5 => {
        var Parser$first_of$go = _pars$2 => _err$3 => _idx$4 => _code$5 => ({
            ctr: 'TCO',
            arg: [_pars$2, _err$3, _idx$4, _code$5]
        });
        var arg = [_pars$2, _err$3, _idx$4, _code$5];
        while (true) {
            let [_pars$2, _err$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _pars$2;
                switch (self._) {
                    case 'List.nil':
                        return (() => {
                            var self = _err$3;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Parser$Reply$error(_idx$4)(_code$5)("No parse.");
                                case 'Maybe.some':
                                    var $76 = self.value;
                                    return (() => {
                                        var self = $76;
                                        switch (self._) {
                                            case 'Parser.ErrorAt.new':
                                                var $77 = self.idx;
                                                var $78 = self.code;
                                                var $79 = self.err;
                                                return Parser$Reply$error($77)($78)($79);
                                        }
                                    })();
                            }
                        })();
                    case 'List.cons':
                        var $80 = self.head;
                        var $81 = self.tail;
                        return (() => {
                            var _parsed$8 = $80(_idx$4)(_code$5);
                            return (() => {
                                var self = _parsed$8;
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $82 = self.idx;
                                        var $83 = self.code;
                                        var $84 = self.err;
                                        return (() => {
                                            var _neo$12 = Maybe$some(Parser$ErrorAt$new($82)($83)($84));
                                            var _err$13 = Parser$ErrorAt$combine(_neo$12)(_err$3);
                                            return Parser$first_of$go($81)(_err$13)(_idx$4)(_code$5)
                                        })();
                                    case 'Parser.Reply.value':
                                        var $85 = self.idx;
                                        var $86 = self.code;
                                        var $87 = self.val;
                                        return Parser$Reply$value($85)($86)($87);
                                }
                            })()
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$first_of = (_pars$2 => Parser$first_of$go(_pars$2)(Maybe$none));
    var List$cons = (_head$2 => (_tail$3 => ({
        _: 'List.cons',
        'head': _head$2,
        'tail': _tail$3
    })));
    var List = (_A$1 => null);
    var List$nil = ({
        _: 'List.nil'
    });
    var Parser$many$go = _parse$2 => _values$3 => _idx$4 => _code$5 => {
        var Parser$many$go = _parse$2 => _values$3 => _idx$4 => _code$5 => ({
            ctr: 'TCO',
            arg: [_parse$2, _values$3, _idx$4, _code$5]
        });
        var arg = [_parse$2, _values$3, _idx$4, _code$5];
        while (true) {
            let [_parse$2, _values$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _parse$2(_idx$4)(_code$5);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $88 = self.idx;
                        var $89 = self.code;
                        var $90 = self.err;
                        return Parser$Reply$value(_idx$4)(_code$5)(_values$3(List$nil));
                    case 'Parser.Reply.value':
                        var $91 = self.idx;
                        var $92 = self.code;
                        var $93 = self.val;
                        return Parser$many$go(_parse$2)((_xs$9 => _values$3(List$cons($93)(_xs$9))))($91)($92);
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$many = (_parser$2 => Parser$many$go(_parser$2)((_x$3 => _x$3)));
    var Unit$new = 1;
    var String$concat = a0 => a1 => (a0 + a1);
    var String$flatten$go = _xs$1 => _res$2 => {
        var String$flatten$go = _xs$1 => _res$2 => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                switch (self._) {
                    case 'List.nil':
                        return _res$2;
                    case 'List.cons':
                        var $94 = self.head;
                        var $95 = self.tail;
                        return String$flatten$go($95)((_res$2 + $94));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var String$flatten = (_xs$1 => String$flatten$go(_xs$1)(""));
    var String$nil = '';
    var Parser$text$go = (_text$1 => (_idx$2 => (_code$3 => (() => {
        var self = _text$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$2)(_code$3)(Unit$new);
            case 'cons':
                var $96 = self.charCodeAt(0);
                var $97 = self.slice(1);
                return (() => {
                    var self = _code$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return (() => {
                                var _error$6 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found end of file.")(List$nil))));
                                return Parser$Reply$error(_idx$2)(_code$3)(_error$6)
                            })();
                        case 'cons':
                            var $98 = self.charCodeAt(0);
                            var $99 = self.slice(1);
                            return (() => {
                                var self = ($96 === $98);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Parser$text($97)(Nat$succ(_idx$2))($99);
                                    case 'false':
                                        return (() => {
                                            var _error$8 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found \'")(List$cons(String$cons($98)(String$nil))(List$cons("\'.")(List$nil))))));
                                            return Parser$Reply$error(_idx$2)(_code$3)(_error$8)
                                        })();
                                }
                            })();
                    }
                })();
        }
    })())));
    var Parser$text = (_text$1 => (_idx$2 => (_code$3 => (() => {
        var self = Parser$text$go(_text$1)(_idx$2)(_code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $100 = self.idx;
                var $101 = self.code;
                var $102 = self.err;
                return Parser$Reply$error(_idx$2)(_code$3)($102);
            case 'Parser.Reply.value':
                var $103 = self.idx;
                var $104 = self.code;
                var $105 = self.val;
                return Parser$Reply$value($103)($104)($105);
        }
    })())));
    var Parser$until$go = _until$2 => _parse$3 => _values$4 => _idx$5 => _code$6 => {
        var Parser$until$go = _until$2 => _parse$3 => _values$4 => _idx$5 => _code$6 => ({
            ctr: 'TCO',
            arg: [_until$2, _parse$3, _values$4, _idx$5, _code$6]
        });
        var arg = [_until$2, _parse$3, _values$4, _idx$5, _code$6];
        while (true) {
            let [_until$2, _parse$3, _values$4, _idx$5, _code$6] = arg;
            var R = (() => {
                var _until_reply$7 = _until$2(_idx$5)(_code$6);
                return (() => {
                    var self = _until_reply$7;
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $106 = self.idx;
                            var $107 = self.code;
                            var $108 = self.err;
                            return (() => {
                                var _reply$11 = _parse$3(_idx$5)(_code$6);
                                return (() => {
                                    var self = _reply$11;
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $109 = self.idx;
                                            var $110 = self.code;
                                            var $111 = self.err;
                                            return Parser$Reply$error($109)($110)($111);
                                        case 'Parser.Reply.value':
                                            var $112 = self.idx;
                                            var $113 = self.code;
                                            var $114 = self.val;
                                            return Parser$until$go(_until$2)(_parse$3)((_xs$15 => _values$4(List$cons($114)(_xs$15))))($112)($113);
                                    }
                                })()
                            })();
                        case 'Parser.Reply.value':
                            var $115 = self.idx;
                            var $116 = self.code;
                            var $117 = self.val;
                            return Parser$Reply$value($115)($116)(_values$4(List$nil));
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$until = (_until$2 => (_parse$3 => Parser$until$go(_until$2)(_parse$3)((_x$4 => _x$4))));
    var Parser$one = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Unexpected end of file.");
            case 'cons':
                var $118 = self.charCodeAt(0);
                var $119 = self.slice(1);
                return Parser$Reply$value(Nat$succ(_idx$1))($119)($118);
        }
    })()));
    var Fm$Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$cons(Monad$bind(Parser$monad)(Parser$text("//"))((_$1 => Monad$bind(Parser$monad)(Parser$until(Parser$text("\u{a}"))(Parser$one))((_$2 => Monad$pure(Parser$monad)(Unit$new))))))(List$nil)))));
    var Fm$Parser$text = (_text$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Parser$many1 = (_parser$2 => Monad$bind(Parser$monad)(_parser$2)((_head$3 => Monad$bind(Parser$monad)(Parser$many(_parser$2))((_tail$4 => Monad$pure(Parser$monad)(List$cons(_head$3)(_tail$4)))))));
    var Fm$Name$is_letter = (_chr$1 => (() => {
        var self = U16$btw(65)(_chr$1)(90);
        switch (self ? 'true' : 'false') {
            case 'true':
                return Bool$true;
            case 'false':
                return (() => {
                    var self = U16$btw(97)(_chr$1)(122);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Bool$true;
                        case 'false':
                            return (() => {
                                var self = U16$btw(48)(_chr$1)(57);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Bool$true;
                                    case 'false':
                                        return (() => {
                                            var self = (46 === _chr$1);
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Bool$true;
                                                case 'false':
                                                    return (() => {
                                                        var self = (95 === _chr$1);
                                                        switch (self ? 'true' : 'false') {
                                                            case 'true':
                                                                return Bool$true;
                                                            case 'false':
                                                                return Bool$false;
                                                        }
                                                    })();
                                            }
                                        })();
                                }
                            })();
                    }
                })();
        }
    })());
    var Fm$Parser$letter = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Unexpected eof.");
            case 'cons':
                var $120 = self.charCodeAt(0);
                var $121 = self.slice(1);
                return (() => {
                    var self = Fm$Name$is_letter($120);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value(Nat$succ(_idx$1))($121)($120);
                        case 'false':
                            return Parser$Reply$error(_idx$1)(_code$2)("Expected letter.");
                    }
                })();
        }
    })()));
    var List$fold = (_list$2 => (_nil$4 => (_cons$5 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return _nil$4;
            case 'List.cons':
                var $122 = self.head;
                var $123 = self.tail;
                return _cons$5($122)(List$fold($123)(_nil$4)(_cons$5));
        }
    })())));
    var Fm$Parser$name1 = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
    var Fm$Parser$name = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
    var Pair = (_A$1 => (_B$2 => null));
    var Parser$until1 = (_cond$2 => (_parser$3 => Monad$bind(Parser$monad)(_parser$3)((_head$4 => Monad$bind(Parser$monad)(Parser$until(_cond$2)(_parser$3))((_tail$5 => Monad$pure(Parser$monad)(List$cons(_head$4)(_tail$5))))))));
    var Parser$maybe = (_parse$2 => (_idx$3 => (_code$4 => (() => {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $124 = self.idx;
                var $125 = self.code;
                var $126 = self.err;
                return Parser$Reply$value(_idx$3)(_code$4)(Maybe$none);
            case 'Parser.Reply.value':
                var $127 = self.idx;
                var $128 = self.code;
                var $129 = self.val;
                return Parser$Reply$value($127)($128)(Maybe$some($129));
        }
    })())));
    var Fm$Parser$item = (_parser$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$3 => Monad$bind(Parser$monad)(_parser$2)((_value$4 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(",")))((_$5 => Monad$pure(Parser$monad)(_value$4))))))));
    var Parser$get_index = (_idx$1 => (_code$2 => Parser$Reply$value(_idx$1)(_code$2)(_idx$1)));
    var Fm$Parser$init = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$get_index)((_from$2 => Monad$pure(Parser$monad)(_from$2)))));
    var Fm$Origin$new = (_file$1 => (_from$2 => (_upto$3 => ({
        _: 'Fm.Origin.new',
        'file': _file$1,
        'from': _from$2,
        'upto': _upto$3
    }))));
    var Fm$Parser$stop = (_from$1 => Monad$bind(Parser$monad)(Parser$get_index)((_upto$2 => (() => {
        var _orig$3 = Fm$Origin$new("")(_from$1)(_upto$2);
        return Monad$pure(Parser$monad)(_orig$3)
    })())));
    var Fm$Term$ori = (_orig$1 => (_expr$2 => ({
        _: 'Fm.Term.ori',
        'orig': _orig$1,
        'expr': _expr$2
    })));
    var Fm$Term$typ = ({
        _: 'Fm.Term.typ'
    });
    var Fm$Parser$type = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("Type"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$3)(Fm$Term$typ))))))));
    var Fm$Term$all = (_eras$1 => (_self$2 => (_name$3 => (_xtyp$4 => (_body$5 => ({
        _: 'Fm.Term.all',
        'eras': _eras$1,
        'self': _self$2,
        'name': _name$3,
        'xtyp': _xtyp$4,
        'body': _body$5
    }))))));
    var Fm$Parser$forall = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_self$2 => Monad$bind(Parser$monad)(Fm$Parser$binder)((_bind$3 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text("->")))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$5 => (() => {
        var _term$6 = List$fold(_bind$3)(_body$5)((_x$6 => (_t$7 => (() => {
            var self = _x$6;
            switch (self._) {
                case 'Fm.Binder.new':
                    var $130 = self.eras;
                    var $131 = self.name;
                    var $132 = self.term;
                    return Fm$Term$all($130)("")($131)($132)((_s$11 => (_x$12 => _t$7)));
            }
        })())));
        return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$7 => Monad$pure(Parser$monad)((() => {
            var self = _term$6;
            switch (self._) {
                case 'Fm.Term.var':
                    var $133 = self.name;
                    var $134 = self.indx;
                    return _term$6;
                case 'Fm.Term.ref':
                    var $135 = self.name;
                    return _term$6;
                case 'Fm.Term.typ':
                    return _term$6;
                case 'Fm.Term.all':
                    var $136 = self.eras;
                    var $137 = self.self;
                    var $138 = self.name;
                    var $139 = self.xtyp;
                    var $140 = self.body;
                    return Fm$Term$ori(_orig$7)(Fm$Term$all($136)(_self$2)($138)($139)($140));
                case 'Fm.Term.lam':
                    var $141 = self.name;
                    var $142 = self.body;
                    return _term$6;
                case 'Fm.Term.app':
                    var $143 = self.func;
                    var $144 = self.argm;
                    return _term$6;
                case 'Fm.Term.let':
                    var $145 = self.name;
                    var $146 = self.expr;
                    var $147 = self.body;
                    return _term$6;
                case 'Fm.Term.def':
                    var $148 = self.name;
                    var $149 = self.expr;
                    var $150 = self.body;
                    return _term$6;
                case 'Fm.Term.ann':
                    var $151 = self.done;
                    var $152 = self.term;
                    var $153 = self.type;
                    return _term$6;
                case 'Fm.Term.gol':
                    var $154 = self.name;
                    var $155 = self.dref;
                    var $156 = self.verb;
                    return _term$6;
                case 'Fm.Term.hol':
                    var $157 = self.path;
                    return _term$6;
                case 'Fm.Term.nat':
                    var $158 = self.natx;
                    return _term$6;
                case 'Fm.Term.chr':
                    var $159 = self.chrx;
                    return _term$6;
                case 'Fm.Term.str':
                    var $160 = self.strx;
                    return _term$6;
                case 'Fm.Term.cse':
                    var $161 = self.path;
                    var $162 = self.expr;
                    var $163 = self.name;
                    var $164 = self.with;
                    var $165 = self.cses;
                    var $166 = self.moti;
                    return _term$6;
                case 'Fm.Term.ori':
                    var $167 = self.orig;
                    var $168 = self.expr;
                    return _term$6;
            }
        })())))
    })()))))))))));
    var Fm$Term$lam = (_name$1 => (_body$2 => ({
        _: 'Fm.Term.lam',
        'name': _name$1,
        'body': _body$2
    })));
    var Fm$Parser$make_lambda = (_names$1 => (_body$2 => (() => {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $169 = self.head;
                var $170 = self.tail;
                return Fm$Term$lam($169)((_x$5 => Fm$Parser$make_lambda($170)(_body$2)));
        }
    })()));
    var Fm$Parser$lambda = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("("))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(")"))(Fm$Parser$item(Fm$Parser$name1)))((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _expr$6 = Fm$Parser$make_lambda(_name$3)(_body$4);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(_expr$6))
    })()))))))))));
    var Fm$Parser$lambda$erased = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("<"))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(">"))(Fm$Parser$item(Fm$Parser$name1)))((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _expr$6 = Fm$Parser$make_lambda(_name$3)(_body$4);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(_expr$6))
    })()))))))))));
    var Fm$Parser$lambda$nameless = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("()"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => (() => {
        var _expr$5 = Fm$Term$lam("")((_x$5 => _body$3));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$4)(_expr$5))
    })()))))))));
    var Fm$Parser$parenthesis = Monad$bind(Parser$monad)(Fm$Parser$text("("))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$2 => Monad$bind(Parser$monad)(Fm$Parser$text(")"))((_$3 => Monad$pure(Parser$monad)(_term$2)))))));
    var Fm$Term$ref = (_name$1 => ({
        _: 'Fm.Term.ref',
        'name': _name$1
    }));
    var Fm$Term$app = (_func$1 => (_argm$2 => ({
        _: 'Fm.Term.app',
        'func': _func$1,
        'argm': _argm$2
    })));
    var Fm$Term$hol = (_path$1 => ({
        _: 'Fm.Term.hol',
        'path': _path$1
    }));
    var Fm$Term$let = (_name$1 => (_expr$2 => (_body$3 => ({
        _: 'Fm.Term.let',
        'name': _name$1,
        'expr': _expr$2,
        'body': _body$3
    }))));
    var Fm$Parser$letforin = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$text("for "))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$6 => Monad$bind(Parser$monad)(Fm$Parser$text("in"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$8 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$9 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$10 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$11 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$12 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$13 => (() => {
        var _term$14 = Fm$Term$ref("List.for");
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$hol(Bits$e));
        var _term$16 = Fm$Term$app(_term$15)(_list$8);
        var _term$17 = Fm$Term$app(_term$16)(Fm$Term$hol(Bits$e));
        var _term$18 = Fm$Term$app(_term$17)(Fm$Term$ref(_name$3));
        var _lamb$19 = Fm$Term$lam(_elem$6)((_i$19 => Fm$Term$lam(_name$3)((_x$20 => _loop$10))));
        var _term$20 = Fm$Term$app(_term$18)(_lamb$19);
        var _term$21 = Fm$Term$let(_name$3)(_term$20)((_x$21 => _body$12));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$13)(_term$21))
    })()))))))))))))))))))))))))));
    var Fm$Parser$let = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$8)(Fm$Term$let(_name$3)(_expr$5)((_x$9 => _body$7))))))))))))))))))));
    var Fm$Term$def = (_name$1 => (_expr$2 => (_body$3 => ({
        _: 'Fm.Term.def',
        'name': _name$1,
        'expr': _expr$2,
        'body': _body$3
    }))));
    var Fm$Parser$def = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("def "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$8)(Fm$Term$def(_name$3)(_expr$5)((_x$9 => _body$7))))))))))))))))))));
    var Fm$Parser$if = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("if "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_cond$3 => Monad$bind(Parser$monad)(Fm$Parser$text("then"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_tcse$5 => Monad$bind(Parser$monad)(Fm$Parser$text("else"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_fcse$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => (() => {
        var _term$9 = _cond$3;
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$lam("")((_x$10 => Fm$Term$hol(Bits$e))));
        var _term$11 = Fm$Term$app(_term$10)(_tcse$5);
        var _term$12 = Fm$Term$app(_term$11)(_fcse$7);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$8)(_term$12))
    })()))))))))))))))));
    var List$mapped = (_as$2 => (_f$4 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $171 = self.head;
                var $172 = self.tail;
                return List$cons(_f$4($171))(List$mapped($172)(_f$4));
        }
    })()));
    var Pair$new = (_fst$3 => (_snd$4 => ({
        _: 'Pair.new',
        'fst': _fst$3,
        'snd': _snd$4
    })));
    var Fm$backslash = 92;
    var Fm$escapes = List$cons(Pair$new("\\b")(8))(List$cons(Pair$new("\\f")(12))(List$cons(Pair$new("\\n")(10))(List$cons(Pair$new("\\r")(13))(List$cons(Pair$new("\\t")(9))(List$cons(Pair$new("\\v")(11))(List$cons(Pair$new(String$cons(Fm$backslash)(String$cons(Fm$backslash)(String$nil)))(Fm$backslash))(List$cons(Pair$new("\\\"")(34))(List$cons(Pair$new("\\0")(0))(List$cons(Pair$new("\\\'")(39))(List$nil))))))))));
    var Fm$Parser$char$single = Parser$first_of(List$cons(Parser$first_of(List$mapped(Fm$escapes)((_esc$1 => (() => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $173 = self.fst;
                var $174 = self.snd;
                return Monad$bind(Parser$monad)(Parser$text($173))((_$4 => Monad$pure(Parser$monad)($174)));
        }
    })()))))(List$cons(Parser$one)(List$nil)));
    var Fm$Term$chr = (_chrx$1 => ({
        _: 'Fm.Term.chr',
        'chrx': _chrx$1
    }));
    var Fm$Parser$char = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("\'"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => Monad$bind(Parser$monad)(Parser$text("\'"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(Fm$Term$chr(_chrx$3)))))))))))));
    var Fm$Term$str = (_strx$1 => ({
        _: 'Fm.Term.str',
        'strx': _strx$1
    }));
    var Fm$Parser$string = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => (() => {
        var _quot$2 = String$cons(34)(String$nil);
        return Monad$bind(Parser$monad)(Fm$Parser$text(_quot$2))((_$3 => Monad$bind(Parser$monad)(Parser$until(Parser$text(_quot$2))(Fm$Parser$char$single))((_chrs$4 => (() => {
            var _strx$5 = List$fold(_chrs$4)(String$nil)(String$cons);
            return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$6 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(Fm$Term$str(_strx$5)))))
        })()))))
    })()));
    var Fm$Parser$pair = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val0$3 => Monad$bind(Parser$monad)(Fm$Parser$text(","))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$5 => Monad$bind(Parser$monad)(Fm$Parser$text("}"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$7 => (() => {
        var _term$8 = Fm$Term$ref("Pair.new");
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$e));
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$hol(Bits$e));
        var _term$11 = Fm$Term$app(_term$10)(_val0$3);
        var _term$12 = Fm$Term$app(_term$11)(_val1$5);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$7)(_term$12))
    })()))))))))))))));
    var Fm$Name$read = (_str$1 => _str$1);
    var Fm$Parser$list = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("["))((_$2 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("]"))(Fm$Parser$item(Fm$Parser$term)))((_vals$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => Monad$pure(Parser$monad)(List$fold(_vals$3)(Fm$Term$app(Fm$Term$ref(Fm$Name$read("List.nil")))(Fm$Term$hol(Bits$e)))((_x$5 => (_xs$6 => (() => {
        var _term$7 = Fm$Term$ref(Fm$Name$read("List.cons"));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$hol(Bits$e));
        var _term$9 = Fm$Term$app(_term$8)(_x$5);
        var _term$10 = Fm$Term$app(_term$9)(_xs$6);
        return Fm$Term$ori(_orig$4)(_term$10)
    })()))))))))))));
    var Fm$Parser$forin = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("for "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$3 => Monad$bind(Parser$monad)(Fm$Parser$text("in"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$5 => Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$7 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$9 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$10 => (() => {
        var _term$11 = Fm$Term$ref("List.for");
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$hol(Bits$e));
        var _term$13 = Fm$Term$app(_term$12)(_list$5);
        var _term$14 = Fm$Term$app(_term$13)(Fm$Term$hol(Bits$e));
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$ref(_name$7));
        var _lamb$16 = Fm$Term$lam(_elem$3)((_i$16 => Fm$Term$lam(_name$7)((_x$17 => _loop$9))));
        var _term$17 = Fm$Term$app(_term$15)(_lamb$16);
        var _term$18 = Fm$Term$let(_name$7)(_term$17)((_x$18 => Fm$Term$ref(_name$7)));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$10)(_term$18))
    })()))))))))))))))))))));
    var Fm$Parser$do$statements = (_monad_name$1 => Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("var "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => (() => {
        var _term$10 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$11 = Fm$Term$app(_term$10)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$hol(Bits$e));
        var _term$13 = Fm$Term$app(_term$12)(Fm$Term$hol(Bits$e));
        var _term$14 = Fm$Term$app(_term$13)(_expr$6);
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$lam(_name$4)((_x$15 => _body$8)));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$9)(_term$15))
    })())))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$9)(Fm$Term$let(_name$4)(_expr$6)((_x$10 => _body$8)))))))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("return "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$4 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$app(Fm$Term$ref("Monad.pure"))(Fm$Term$ref(_monad_name$1));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$e));
        var _term$10 = Fm$Term$app(_term$9)(_expr$4);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(_term$10))
    })())))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$3 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$e));
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$hol(Bits$e));
        var _term$11 = Fm$Term$app(_term$10)(_expr$3);
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$lam("")((_x$12 => _body$5)));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(_term$12))
    })())))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$2 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$3 => Monad$pure(Parser$monad)(_expr$2))))))(List$nil)))))));
    var Fm$Parser$do = Monad$bind(Parser$monad)(Fm$Parser$text("do "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_name$2))((_term$4 => Monad$bind(Parser$monad)(Fm$Parser$text("}"))((_$5 => Monad$pure(Parser$monad)(_term$4)))))))))));
    var Fm$Term$nat = (_natx$1 => ({
        _: 'Fm.Term.nat',
        'natx': _natx$1
    }));
    var Fm$Term$unroll_nat = (_natx$1 => (() => {
        var self = _natx$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Fm$Term$ref(Fm$Name$read("Nat.zero"));
            case 'succ':
                var $175 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$ref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$nat($175);
                    return Fm$Term$app(_func$3)(_argm$4)
                })();
        }
    })());
    var Fm$Term$unroll_chr$bits = (_bits$1 => (() => {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return Fm$Term$ref(Fm$Name$read("Bits.e"));
            case 'o':
                var $176 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.o")))(Fm$Term$unroll_chr$bits($176));
            case 'i':
                var $177 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.i")))(Fm$Term$unroll_chr$bits($177));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $178 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$ref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$app(_term$3)(Fm$Term$nat(16n));
                    var _term$5 = Fm$Term$app(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($178)));
                    var _term$6 = Fm$Term$app(Fm$Term$ref(Fm$Name$read("U16.new")))(_term$5);
                    return _term$6
                })();
        }
    })());
    var Fm$Term$unroll_str = (_strx$1 => (() => {
        var self = _strx$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Fm$Term$ref(Fm$Name$read("String.nil"));
            case 'cons':
                var $179 = self.charCodeAt(0);
                var $180 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$chr($179);
                    var _term$5 = Fm$Term$ref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$app(_term$5)(_char$4);
                    var _term$7 = Fm$Term$app(_term$6)(Fm$Term$str($180));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $181 = self.name;
                var $182 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $183 = self.name;
                return (() => {
                    var self = Fm$get($183)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($183);
                        case 'Maybe.some':
                            var $184 = self.value;
                            return (() => {
                                var self = $184;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $185 = self.file;
                                        var $186 = self.code;
                                        var $187 = self.name;
                                        var $188 = self.term;
                                        var $189 = self.type;
                                        var $190 = self.stat;
                                        return Fm$Term$reduce($188)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$1;
            case 'Fm.Term.all':
                var $191 = self.eras;
                var $192 = self.self;
                var $193 = self.name;
                var $194 = self.xtyp;
                var $195 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $196 = self.name;
                var $197 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $198 = self.func;
                var $199 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$reduce($198)(_defs$2);
                    return (() => {
                        var self = _func$5;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $200 = self.name;
                                var $201 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $202 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                return _term$1;
                            case 'Fm.Term.all':
                                var $203 = self.eras;
                                var $204 = self.self;
                                var $205 = self.name;
                                var $206 = self.xtyp;
                                var $207 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $208 = self.name;
                                var $209 = self.body;
                                return Fm$Term$reduce($209($199))(_defs$2);
                            case 'Fm.Term.app':
                                var $210 = self.func;
                                var $211 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $212 = self.name;
                                var $213 = self.expr;
                                var $214 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $215 = self.name;
                                var $216 = self.expr;
                                var $217 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $218 = self.done;
                                var $219 = self.term;
                                var $220 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $221 = self.name;
                                var $222 = self.dref;
                                var $223 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $224 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $225 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $226 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $227 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $228 = self.path;
                                var $229 = self.expr;
                                var $230 = self.name;
                                var $231 = self.with;
                                var $232 = self.cses;
                                var $233 = self.moti;
                                return _term$1;
                            case 'Fm.Term.ori':
                                var $234 = self.orig;
                                var $235 = self.expr;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $236 = self.name;
                var $237 = self.expr;
                var $238 = self.body;
                return Fm$Term$reduce($238($237))(_defs$2);
            case 'Fm.Term.def':
                var $239 = self.name;
                var $240 = self.expr;
                var $241 = self.body;
                return Fm$Term$reduce($241($240))(_defs$2);
            case 'Fm.Term.ann':
                var $242 = self.done;
                var $243 = self.term;
                var $244 = self.type;
                return Fm$Term$reduce($243)(_defs$2);
            case 'Fm.Term.gol':
                var $245 = self.name;
                var $246 = self.dref;
                var $247 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $248 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $249 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($249))(_defs$2);
            case 'Fm.Term.chr':
                var $250 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($250))(_defs$2);
            case 'Fm.Term.str':
                var $251 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($251))(_defs$2);
            case 'Fm.Term.cse':
                var $252 = self.path;
                var $253 = self.expr;
                var $254 = self.name;
                var $255 = self.with;
                var $256 = self.cses;
                var $257 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $258 = self.orig;
                var $259 = self.expr;
                return Fm$Term$reduce($259)(_defs$2);
        }
    })()));
    var Map$new = ({
        _: 'Map.new'
    });
    var Fm$Def$new = (_file$1 => (_code$2 => (_name$3 => (_term$4 => (_type$5 => (_stat$6 => ({
        _: 'Fm.Def.new',
        'file': _file$1,
        'code': _code$2,
        'name': _name$3,
        'term': _term$4,
        'type': _type$5,
        'stat': _stat$6
    })))))));
    var Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    var Fm$Parser$case$with = Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$6 => Monad$pure(Parser$monad)(Fm$Def$new("")("")(_name$2)(_term$6)(_type$4)(Fm$Status$init))))))))))))));
    var Fm$Parser$case$case = Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$1 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$3 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(",")))((_$4 => Monad$pure(Parser$monad)(Pair$new(_name$1)(_term$3))))))))));
    var Map$tie = (_val$2 => (_lft$3 => (_rgt$4 => ({
        _: 'Map.tie',
        'val': _val$2,
        'lft': _lft$3,
        'rgt': _rgt$4
    }))));
    var Map$set = (_bits$2 => (_val$3 => (_map$4 => (() => {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$some(_val$3))(Map$new)(Map$new);
                        case 'Map.tie':
                            var $260 = self.val;
                            var $261 = self.lft;
                            var $262 = self.rgt;
                            return Map$tie(Maybe$some(_val$3))($261)($262);
                    }
                })();
            case 'o':
                var $263 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$set($263)(_val$3)(Map$new))(Map$new);
                        case 'Map.tie':
                            var $264 = self.val;
                            var $265 = self.lft;
                            var $266 = self.rgt;
                            return Map$tie($264)(Map$set($263)(_val$3)($265))($266);
                    }
                })();
            case 'i':
                var $267 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$new)(Map$set($267)(_val$3)(Map$new));
                        case 'Map.tie':
                            var $268 = self.val;
                            var $269 = self.lft;
                            var $270 = self.rgt;
                            return Map$tie($268)($269)(Map$set($267)(_val$3)($270));
                    }
                })();
        }
    })())));
    var Map$from_list = (_f$3 => (_xs$4 => (() => {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                return Map$new;
            case 'List.cons':
                var $271 = self.head;
                var $272 = self.tail;
                return (() => {
                    var self = $271;
                    switch (self._) {
                        case 'Pair.new':
                            var $273 = self.fst;
                            var $274 = self.snd;
                            return Map$set(_f$3($273))($274)(Map$from_list(_f$3)($272));
                    }
                })();
        }
    })()));
    var Fm$Term$cse = (_path$1 => (_expr$2 => (_name$3 => (_with$4 => (_cses$5 => (_moti$6 => ({
        _: 'Fm.Term.cse',
        'path': _path$1,
        'expr': _expr$2,
        'name': _name$3,
        'with': _with$4,
        'cses': _cses$5,
        'moti': _moti$6
    })))))));
    var Fm$Parser$case = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("case "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$4 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text("as"))((_$5 => Fm$Parser$name1))))((_name$5 => (() => {
        var _name$6 = (() => {
            var self = _name$5;
            switch (self._) {
                case 'Maybe.none':
                    return (() => {
                        var self = Fm$Term$reduce(_expr$4)(Map$new);
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $275 = self.name;
                                var $276 = self.indx;
                                return $275;
                            case 'Fm.Term.ref':
                                var $277 = self.name;
                                return $277;
                            case 'Fm.Term.typ':
                                return Fm$Name$read("self");
                            case 'Fm.Term.all':
                                var $278 = self.eras;
                                var $279 = self.self;
                                var $280 = self.name;
                                var $281 = self.xtyp;
                                var $282 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.lam':
                                var $283 = self.name;
                                var $284 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.app':
                                var $285 = self.func;
                                var $286 = self.argm;
                                return Fm$Name$read("self");
                            case 'Fm.Term.let':
                                var $287 = self.name;
                                var $288 = self.expr;
                                var $289 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.def':
                                var $290 = self.name;
                                var $291 = self.expr;
                                var $292 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ann':
                                var $293 = self.done;
                                var $294 = self.term;
                                var $295 = self.type;
                                return Fm$Name$read("self");
                            case 'Fm.Term.gol':
                                var $296 = self.name;
                                var $297 = self.dref;
                                var $298 = self.verb;
                                return Fm$Name$read("self");
                            case 'Fm.Term.hol':
                                var $299 = self.path;
                                return Fm$Name$read("self");
                            case 'Fm.Term.nat':
                                var $300 = self.natx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.chr':
                                var $301 = self.chrx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.str':
                                var $302 = self.strx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.cse':
                                var $303 = self.path;
                                var $304 = self.expr;
                                var $305 = self.name;
                                var $306 = self.with;
                                var $307 = self.cses;
                                var $308 = self.moti;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ori':
                                var $309 = self.orig;
                                var $310 = self.expr;
                                return Fm$Name$read("self");
                        }
                    })();
                case 'Maybe.some':
                    var $311 = self.value;
                    return $311;
            }
        })();
        return Monad$bind(Parser$monad)(Parser$many(Fm$Parser$case$with))((_with$7 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$8 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("}"))(Fm$Parser$case$case))((_cses$9 => (() => {
            var _cses$10 = Map$from_list(Fm$Name$to_bits)(_cses$9);
            return Monad$bind(Parser$monad)(Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$11 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$12 => Monad$pure(Parser$monad)(Maybe$some(_term$12)))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$text("!"))((_$11 => Monad$pure(Parser$monad)(Maybe$none))))(List$cons(Monad$pure(Parser$monad)(Maybe$some(Fm$Term$hol(Bits$e))))(List$nil)))))((_moti$11 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$12 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$12)(Fm$Term$cse(Bits$e)(_expr$4)(_name$6)(_with$7)(_cses$10)(_moti$11)))))))
        })()))))))
    })()))))))))));
    var Parser$digit = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Not a digit.");
            case 'cons':
                var $312 = self.charCodeAt(0);
                var $313 = self.slice(1);
                return (() => {
                    var _sidx$5 = Nat$succ(_idx$1);
                    return (() => {
                        var self = ($312 === 48);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Parser$Reply$value(_sidx$5)($313)(0n);
                            case 'false':
                                return (() => {
                                    var self = ($312 === 49);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return Parser$Reply$value(_sidx$5)($313)(1n);
                                        case 'false':
                                            return (() => {
                                                var self = ($312 === 50);
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return Parser$Reply$value(_sidx$5)($313)(2n);
                                                    case 'false':
                                                        return (() => {
                                                            var self = ($312 === 51);
                                                            switch (self ? 'true' : 'false') {
                                                                case 'true':
                                                                    return Parser$Reply$value(_sidx$5)($313)(3n);
                                                                case 'false':
                                                                    return (() => {
                                                                        var self = ($312 === 52);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return Parser$Reply$value(_sidx$5)($313)(4n);
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var self = ($312 === 53);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Parser$Reply$value(_sidx$5)($313)(5n);
                                                                                        case 'false':
                                                                                            return (() => {
                                                                                                var self = ($312 === 54);
                                                                                                switch (self ? 'true' : 'false') {
                                                                                                    case 'true':
                                                                                                        return Parser$Reply$value(_sidx$5)($313)(6n);
                                                                                                    case 'false':
                                                                                                        return (() => {
                                                                                                            var self = ($312 === 55);
                                                                                                            switch (self ? 'true' : 'false') {
                                                                                                                case 'true':
                                                                                                                    return Parser$Reply$value(_sidx$5)($313)(7n);
                                                                                                                case 'false':
                                                                                                                    return (() => {
                                                                                                                        var self = ($312 === 56);
                                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                                            case 'true':
                                                                                                                                return Parser$Reply$value(_sidx$5)($313)(8n);
                                                                                                                            case 'false':
                                                                                                                                return (() => {
                                                                                                                                    var self = ($312 === 57);
                                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                                        case 'true':
                                                                                                                                            return Parser$Reply$value(_sidx$5)($313)(9n);
                                                                                                                                        case 'false':
                                                                                                                                            return Parser$Reply$error(_idx$1)(_code$2)("Not a digit.");
                                                                                                                                    }
                                                                                                                                })();
                                                                                                                        }
                                                                                                                    })();
                                                                                                            }
                                                                                                        })();
                                                                                                }
                                                                                            })();
                                                                                    }
                                                                                })();
                                                                        }
                                                                    })();
                                                            }
                                                        })();
                                                }
                                            })();
                                    }
                                })();
                        }
                    })()
                })();
        }
    })()));
    var Nat$add = a0 => a1 => (a0 + a1);
    var Nat$mul = a0 => a1 => (a0 * a1);
    var Nat$from_base$go = _b$1 => _ds$2 => _p$3 => _res$4 => {
        var Nat$from_base$go = _b$1 => _ds$2 => _p$3 => _res$4 => ({
            ctr: 'TCO',
            arg: [_b$1, _ds$2, _p$3, _res$4]
        });
        var arg = [_b$1, _ds$2, _p$3, _res$4];
        while (true) {
            let [_b$1, _ds$2, _p$3, _res$4] = arg;
            var R = (() => {
                var self = _ds$2;
                switch (self._) {
                    case 'List.nil':
                        return _res$4;
                    case 'List.cons':
                        var $314 = self.head;
                        var $315 = self.tail;
                        return Nat$from_base$go(_b$1)($315)((_b$1 * _p$3))((($314 * _p$3) + _res$4));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$reverse$go = _xs$2 => _res$3 => {
        var List$reverse$go = _xs$2 => _res$3 => ({
            ctr: 'TCO',
            arg: [_xs$2, _res$3]
        });
        var arg = [_xs$2, _res$3];
        while (true) {
            let [_xs$2, _res$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        return _res$3;
                    case 'List.cons':
                        var $316 = self.head;
                        var $317 = self.tail;
                        return List$reverse$go($317)(List$cons($316)(_res$3));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$reverse = (_xs$2 => List$reverse$go(_xs$2)(List$nil));
    var Nat$from_base = (_base$1 => (_ds$2 => Nat$from_base$go(_base$1)(List$reverse(_ds$2))(1n)(0n)));
    var Parser$nat = Monad$bind(Parser$monad)(Parser$many1(Parser$digit))((_digits$1 => Monad$pure(Parser$monad)(Nat$from_base(10n)(_digits$1))));
    var Bits$tail = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return Bits$e;
            case 'o':
                var $318 = self.slice(0, -1);
                return $318;
            case 'i':
                var $319 = self.slice(0, -1);
                return $319;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return Bits$i(Bits$e);
            case 'o':
                var $320 = self.slice(0, -1);
                return Bits$i($320);
            case 'i':
                var $321 = self.slice(0, -1);
                return Bits$o(Bits$inc($321));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $322 = self.value;
                return Bool$true;
        }
    })());
    var Fm$Term$gol = (_name$1 => (_dref$2 => (_verb$3 => ({
        _: 'Fm.Term.gol',
        'name': _name$1,
        'dref': _dref$2,
        'verb': _verb$3
    }))));
    var Fm$Parser$goal = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("?"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Parser$many(Monad$bind(Parser$monad)(Fm$Parser$text("-"))((_$4 => Monad$bind(Parser$monad)(Parser$nat)((_nat$5 => (() => {
        var _bits$6 = Bits$reverse(Bits$tail(Bits$reverse((nat_to_bits(_nat$5)))));
        return Monad$pure(Parser$monad)(_bits$6)
    })()))))))((_dref$4 => Monad$bind(Parser$monad)(Monad$bind(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => Monad$pure(Parser$monad)(Maybe$to_bool(_verb$5)))))((_verb$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$6 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(Fm$Term$gol(_name$3)(_dref$4)(_verb$5)))))))))))))));
    var Fm$Parser$hole = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("_"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$3)(Fm$Term$hol(Bits$e)))))))));
    var Fm$Parser$nat = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Parser$nat)((_natx$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$4)(Fm$Term$nat(_natx$3)))))))))));
    var String$eql = a0 => a1 => (a0 === a1);
    var Parser$fail = (_error$2 => (_idx$3 => (_code$4 => Parser$Reply$error(_idx$3)(_code$4)(_error$2))));
    var Fm$Parser$reference = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => (() => {
        var self = (_name$2 === "case");
        switch (self ? 'true' : 'false') {
            case 'true':
                return Parser$fail("Reserved keyword.");
            case 'false':
                return (() => {
                    var self = (_name$2 === "do");
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$fail("Reserved keyword.");
                        case 'false':
                            return (() => {
                                var self = (_name$2 === "if");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Parser$fail("Reserved keyword.");
                                    case 'false':
                                        return (() => {
                                            var self = (_name$2 === "let");
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Parser$fail("Reserved keyword.");
                                                case 'false':
                                                    return (() => {
                                                        var self = (_name$2 === "def");
                                                        switch (self ? 'true' : 'false') {
                                                            case 'true':
                                                                return Parser$fail("Reserved keyword.");
                                                            case 'false':
                                                                return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$3)(Fm$Term$ref(_name$2)))));
                                                        }
                                                    })();
                                            }
                                        })();
                                }
                            })();
                    }
                })();
        }
    })()))));
    var List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));
    var Fm$Parser$application = (_init$1 => (_func$2 => Monad$bind(Parser$monad)(Parser$text("("))((_$3 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(")"))(Fm$Parser$item(Fm$Parser$term)))((_args$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _expr$6 = (list_for(_args$4)(_func$2)((_x$6 => (_f$7 => Fm$Term$app(_f$7)(_x$6)))));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(_expr$6))
    })()))))))));
    var Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$nil))));
    var Parser$spaces_text = (_text$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Fm$Parser$application$erased = (_init$1 => (_func$2 => Monad$bind(Parser$monad)(Parser$get_index)((_init$3 => Monad$bind(Parser$monad)(Parser$text("<"))((_$4 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(">"))(Fm$Parser$item(Fm$Parser$term)))((_args$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$3))((_orig$6 => (() => {
        var _expr$7 = (list_for(_args$5)(_func$2)((_x$7 => (_f$8 => Fm$Term$app(_f$8)(_x$7)))));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(_expr$7))
    })()))))))))));
    var Fm$Parser$arrow = (_init$1 => (_xtyp$2 => Monad$bind(Parser$monad)(Fm$Parser$text("->"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(Fm$Term$all(Bool$false)("")("")(_xtyp$2)((_s$6 => (_x$7 => _body$4)))))))))))));
    var Fm$Parser$equality = (_init$1 => (_val0$2 => Monad$bind(Parser$monad)(Fm$Parser$text("=="))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _term$6 = Fm$Term$ref("Equal");
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$e));
        var _term$8 = Fm$Term$app(_term$7)(_val0$2);
        var _term$9 = Fm$Term$app(_term$8)(_val1$4);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(_term$9))
    })()))))))));
    var Fm$Term$ann = (_done$1 => (_term$2 => (_type$3 => ({
        _: 'Fm.Term.ann',
        'done': _done$1,
        'term': _term$2,
        'type': _type$3
    }))));
    var Fm$Parser$annotation = (_init$1 => (_term$2 => Monad$bind(Parser$monad)(Fm$Parser$text("::"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$5)(Fm$Term$ann(Bool$false)(_term$2)(_type$4)))))))))));
    var Fm$Parser$suffix = _init$1 => _term$2 => _idx$3 => _code$4 => {
        var Fm$Parser$suffix = _init$1 => _term$2 => _idx$3 => _code$4 => ({
            ctr: 'TCO',
            arg: [_init$1, _term$2, _idx$3, _code$4]
        });
        var arg = [_init$1, _term$2, _idx$3, _code$4];
        while (true) {
            let [_init$1, _term$2, _idx$3, _code$4] = arg;
            var R = (() => {
                var _suffix_parser$5 = Parser$first_of(List$cons(Fm$Parser$application(_init$1)(_term$2))(List$cons(Fm$Parser$application$erased(_init$1)(_term$2))(List$cons(Fm$Parser$arrow(_init$1)(_term$2))(List$cons(Fm$Parser$equality(_init$1)(_term$2))(List$cons(Fm$Parser$annotation(_init$1)(_term$2))(List$nil))))));
                return (() => {
                    var self = _suffix_parser$5(_idx$3)(_code$4);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $323 = self.idx;
                            var $324 = self.code;
                            var $325 = self.err;
                            return Parser$Reply$value(_idx$3)(_code$4)(_term$2);
                        case 'Parser.Reply.value':
                            var $326 = self.idx;
                            var $327 = self.code;
                            var $328 = self.val;
                            return Fm$Parser$suffix(_init$1)($328)($326)($327);
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$term = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$type)(List$cons(Fm$Parser$forall)(List$cons(Fm$Parser$lambda)(List$cons(Fm$Parser$lambda$erased)(List$cons(Fm$Parser$lambda$nameless)(List$cons(Fm$Parser$parenthesis)(List$cons(Fm$Parser$letforin)(List$cons(Fm$Parser$let)(List$cons(Fm$Parser$def)(List$cons(Fm$Parser$if)(List$cons(Fm$Parser$char)(List$cons(Fm$Parser$string)(List$cons(Fm$Parser$pair)(List$cons(Fm$Parser$list)(List$cons(Fm$Parser$forin)(List$cons(Fm$Parser$do)(List$cons(Fm$Parser$case)(List$cons(Fm$Parser$goal)(List$cons(Fm$Parser$hole)(List$cons(Fm$Parser$nat)(List$cons(Fm$Parser$reference)(List$nil)))))))))))))))))))))))((_term$2 => Fm$Parser$suffix(_init$1)(_term$2)))));
    var Fm$Parser$name_term = Monad$bind(Parser$monad)(Fm$Parser$name)((_name$1 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$3 => Monad$pure(Parser$monad)(Pair$new(_name$1)(_type$3))))))));
    var Fm$Binder$new = (_eras$1 => (_name$2 => (_term$3 => ({
        _: 'Fm.Binder.new',
        'eras': _eras$1,
        'name': _name$2,
        'term': _term$3
    }))));
    var Fm$Parser$binder$homo = (_eras$1 => Monad$bind(Parser$monad)(Fm$Parser$text((() => {
        var self = _eras$1;
        switch (self ? 'true' : 'false') {
            case 'true':
                return "<";
            case 'false':
                return "(";
        }
    })()))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text((() => {
        var self = _eras$1;
        switch (self ? 'true' : 'false') {
            case 'true':
                return ">";
            case 'false':
                return ")";
        }
    })()))(Fm$Parser$item(Fm$Parser$name_term)))((_bind$3 => Monad$pure(Parser$monad)(List$mapped(_bind$3)((_pair$4 => (() => {
        var self = _pair$4;
        switch (self._) {
            case 'Pair.new':
                var $329 = self.fst;
                var $330 = self.snd;
                return Fm$Binder$new(_eras$1)($329)($330);
        }
    })()))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $331 = self.head;
                var $332 = self.tail;
                return List$cons($331)(List$concat($332)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $333 = self.head;
                var $334 = self.tail;
                return List$concat($333)(List$flatten($334));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $335 = self.head;
                var $336 = self.tail;
                return (() => {
                    var self = $335;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $337 = self.eras;
                            var $338 = self.name;
                            var $339 = self.term;
                            return Fm$Term$all($337)("")($338)($339)((_s$8 => (_x$9 => Fm$Parser$make_forall($336)(_body$2))));
                    }
                })();
        }
    })()));
    var List$at = _index$2 => _list$3 => {
        var List$at = _index$2 => _list$3 => ({
            ctr: 'TCO',
            arg: [_index$2, _list$3]
        });
        var arg = [_index$2, _list$3];
        while (true) {
            let [_index$2, _list$3] = arg;
            var R = (() => {
                var self = _list$3;
                switch (self._) {
                    case 'List.nil':
                        return Maybe$none;
                    case 'List.cons':
                        var $340 = self.head;
                        var $341 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($340);
                                case 'succ':
                                    var $342 = (self - 1n);
                                    return List$at($342)($341);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$at_last = (_index$2 => (_list$3 => List$at(_index$2)(List$reverse(_list$3))));
    var Fm$Term$var = (_name$1 => (_indx$2 => ({
        _: 'Fm.Term.var',
        'name': _name$1,
        'indx': _indx$2
    })));
    var Pair$snd = (_pair$3 => (() => {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $343 = self.fst;
                var $344 = self.snd;
                return $344;
        }
    })());
    var Fm$Name$eql = (_a$1 => (_b$2 => (_a$1 === _b$2)));
    var Fm$Context$find = _name$1 => _ctx$2 => {
        var Fm$Context$find = _name$1 => _ctx$2 => ({
            ctr: 'TCO',
            arg: [_name$1, _ctx$2]
        });
        var arg = [_name$1, _ctx$2];
        while (true) {
            let [_name$1, _ctx$2] = arg;
            var R = (() => {
                var self = _ctx$2;
                switch (self._) {
                    case 'List.nil':
                        return Maybe$none;
                    case 'List.cons':
                        var $345 = self.head;
                        var $346 = self.tail;
                        return (() => {
                            var self = $345;
                            switch (self._) {
                                case 'Pair.new':
                                    var $347 = self.fst;
                                    var $348 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($347);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($348);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($346);
                                        }
                                    })();
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$length$go = _xs$2 => _n$3 => {
        var List$length$go = _xs$2 => _n$3 => ({
            ctr: 'TCO',
            arg: [_xs$2, _n$3]
        });
        var arg = [_xs$2, _n$3];
        while (true) {
            let [_xs$2, _n$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        return _n$3;
                    case 'List.cons':
                        var $349 = self.head;
                        var $350 = self.tail;
                        return List$length$go($350)(Nat$succ(_n$3));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$length = (_xs$2 => List$length$go(_xs$2)(0n));
    var Fm$Path$o = (_path$1 => (_x$2 => _path$1(Bits$o(_x$2))));
    var Fm$Path$i = (_path$1 => (_x$2 => _path$1(Bits$i(_x$2))));
    var Fm$Path$to_bits = (_path$1 => _path$1(Bits$e));
    var Fm$Term$bind = (_vars$1 => (_path$2 => (_term$3 => (() => {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $351 = self.name;
                var $352 = self.indx;
                return (() => {
                    var self = List$at_last($352)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($351)($352);
                        case 'Maybe.some':
                            var $353 = self.value;
                            return Pair$snd($353);
                    }
                })();
            case 'Fm.Term.ref':
                var $354 = self.name;
                return (() => {
                    var self = Fm$Context$find($354)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($354);
                        case 'Maybe.some':
                            var $355 = self.value;
                            return $355;
                    }
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $356 = self.eras;
                var $357 = self.self;
                var $358 = self.name;
                var $359 = self.xtyp;
                var $360 = self.body;
                return (() => {
                    var _vlen$9 = List$length(_vars$1);
                    return Fm$Term$all($356)($357)($358)(Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($359))((_s$10 => (_x$11 => Fm$Term$bind(List$cons(Pair$new($358)(_x$11))(List$cons(Pair$new($357)(_s$10))(_vars$1)))(Fm$Path$i(_path$2))($360(Fm$Term$var($357)(_vlen$9))(Fm$Term$var($358)(Nat$succ(_vlen$9)))))))
                })();
            case 'Fm.Term.lam':
                var $361 = self.name;
                var $362 = self.body;
                return (() => {
                    var _vlen$6 = List$length(_vars$1);
                    return Fm$Term$lam($361)((_x$7 => Fm$Term$bind(List$cons(Pair$new($361)(_x$7))(_vars$1))(Fm$Path$o(_path$2))($362(Fm$Term$var($361)(_vlen$6)))))
                })();
            case 'Fm.Term.app':
                var $363 = self.func;
                var $364 = self.argm;
                return Fm$Term$app(Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($363))(Fm$Term$bind(_vars$1)(Fm$Path$i(_path$2))($364));
            case 'Fm.Term.let':
                var $365 = self.name;
                var $366 = self.expr;
                var $367 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$let($365)(Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($366))((_x$8 => Fm$Term$bind(List$cons(Pair$new($365)(_x$8))(_vars$1))(Fm$Path$i(_path$2))($367(Fm$Term$var($365)(_vlen$7)))))
                })();
            case 'Fm.Term.def':
                var $368 = self.name;
                var $369 = self.expr;
                var $370 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$def($368)(Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($369))((_x$8 => Fm$Term$bind(List$cons(Pair$new($368)(_x$8))(_vars$1))(Fm$Path$i(_path$2))($370(Fm$Term$var($368)(_vlen$7)))))
                })();
            case 'Fm.Term.ann':
                var $371 = self.done;
                var $372 = self.term;
                var $373 = self.type;
                return Fm$Term$ann($371)(Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($372))(Fm$Term$bind(_vars$1)(Fm$Path$i(_path$2))($373));
            case 'Fm.Term.gol':
                var $374 = self.name;
                var $375 = self.dref;
                var $376 = self.verb;
                return Fm$Term$gol($374)($375)($376);
            case 'Fm.Term.hol':
                var $377 = self.path;
                return Fm$Term$hol(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $378 = self.natx;
                return Fm$Term$nat($378);
            case 'Fm.Term.chr':
                var $379 = self.chrx;
                return Fm$Term$chr($379);
            case 'Fm.Term.str':
                var $380 = self.strx;
                return Fm$Term$str($380);
            case 'Fm.Term.cse':
                var $381 = self.path;
                var $382 = self.expr;
                var $383 = self.name;
                var $384 = self.with;
                var $385 = self.cses;
                var $386 = self.moti;
                return (() => {
                    var _expr$10 = Fm$Term$bind(_vars$1)(Fm$Path$o(_path$2))($382);
                    var _name$11 = $383;
                    var _wyth$12 = $384;
                    var _cses$13 = $385;
                    var _moti$14 = $386;
                    return Fm$Term$cse(Fm$Path$to_bits(_path$2))(_expr$10)(_name$11)(_wyth$12)(_cses$13)(_moti$14)
                })();
            case 'Fm.Term.ori':
                var $387 = self.orig;
                var $388 = self.expr;
                return Fm$Term$ori($387)(Fm$Term$bind(_vars$1)(_path$2)($388));
        }
    })())));
    var Fm$Status$done = ({
        _: 'Fm.Status.done'
    });
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$define = (_file$1 => (_code$2 => (_name$3 => (_term$4 => (_type$5 => (_done$6 => (_defs$7 => (() => {
        var _stat$8 = (() => {
            var self = _done$6;
            switch (self ? 'true' : 'false') {
                case 'true':
                    return Fm$Status$done;
                case 'false':
                    return Fm$Status$init;
            }
        })();
        return Fm$set(_name$3)(Fm$Def$new(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_stat$8))(_defs$7)
    })())))))));
    var Fm$Parser$file$def = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$4 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$5 => (() => {
        var _args$6 = List$flatten(_args$5);
        return Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$9 => (() => {
            var _type$10 = Fm$Parser$make_forall(_args$6)(_type$8);
            var _term$11 = Fm$Parser$make_lambda(List$mapped(_args$6)((_x$11 => (() => {
                var self = _x$11;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $389 = self.eras;
                        var $390 = self.name;
                        var $391 = self.term;
                        return $390;
                }
            })())))(_term$9);
            var _type$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$i(_x$12)))(_type$10);
            var _term$13 = Fm$Term$bind(List$nil)((_x$13 => Bits$o(_x$13)))(_term$11);
            var _defs$14 = Fm$define(_file$1)(_code$2)(_name$4)(_term$13)(_type$12)(Bool$false)(_defs$3);
            return Monad$pure(Parser$monad)(_defs$14)
        })()))))))
    })())))))));
    var Maybe$default = (_a$2 => (_m$3 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return _a$2;
            case 'Maybe.some':
                var $392 = self.value;
                return $392;
        }
    })()));
    var Fm$Constructor$new = (_name$1 => (_args$2 => (_inds$3 => ({
        _: 'Fm.Constructor.new',
        'name': _name$1,
        'args': _args$2,
        'inds': _inds$3
    }))));
    var Fm$Parser$constructor = (_namespace$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text("~"))((_$4 => Fm$Parser$binder))))((_inds$4 => (() => {
        var _args$5 = Maybe$default(List$nil)(_args$3);
        var _inds$6 = Maybe$default(List$nil)(_inds$4);
        return Monad$pure(Parser$monad)(Fm$Constructor$new(_name$2)(_args$5)(_inds$6))
    })())))))));
    var Fm$Datatype$new = (_name$1 => (_pars$2 => (_inds$3 => (_ctrs$4 => ({
        _: 'Fm.Datatype.new',
        'name': _name$1,
        'pars': _pars$2,
        'inds': _inds$3,
        'ctrs': _ctrs$4
    })))));
    var Fm$Parser$datatype = Monad$bind(Parser$monad)(Fm$Parser$text("type "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text("~"))((_$4 => Fm$Parser$binder))))((_inds$4 => (() => {
        var _pars$5 = Maybe$default(List$nil)(_pars$3);
        var _inds$6 = Maybe$default(List$nil)(_inds$4);
        return Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$7 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("}"))(Fm$Parser$item(Fm$Parser$constructor(_name$2))))((_ctrs$8 => Monad$pure(Parser$monad)(Fm$Datatype$new(_name$2)(_pars$5)(_inds$6)(_ctrs$8))))))
    })()))))))));
    var Fm$Datatype$build_term$motive$go = (_type$1 => (_name$2 => (_inds$3 => (() => {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _type$1;
                    switch (self._) {
                        case 'Fm.Datatype.new':
                            var $393 = self.name;
                            var $394 = self.pars;
                            var $395 = self.inds;
                            var $396 = self.ctrs;
                            return (() => {
                                var _slf$8 = Fm$Term$ref(_name$2);
                                var _slf$9 = (list_for($394)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$app(_slf$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $397 = self.eras;
                                            var $398 = self.name;
                                            var $399 = self.term;
                                            return $398;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($395)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$app(_slf$11)(Fm$Term$ref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $400 = self.eras;
                                            var $401 = self.name;
                                            var $402 = self.term;
                                            return $401;
                                    }
                                })()))))));
                                return Fm$Term$all(Bool$false)("")("")(_slf$10)((_s$11 => (_x$12 => Fm$Term$typ)))
                            })();
                    }
                })();
            case 'List.cons':
                var $403 = self.head;
                var $404 = self.tail;
                return (() => {
                    var self = $403;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $405 = self.eras;
                            var $406 = self.name;
                            var $407 = self.term;
                            return Fm$Term$all($405)("")($406)($407)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($404))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $408 = self.name;
                var $409 = self.pars;
                var $410 = self.inds;
                var $411 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($408)($410);
        }
    })());
    var Fm$Datatype$build_term$constructor$go = (_type$1 => (_ctor$2 => (_args$3 => (() => {
        var self = _args$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _type$1;
                    switch (self._) {
                        case 'Fm.Datatype.new':
                            var $412 = self.name;
                            var $413 = self.pars;
                            var $414 = self.inds;
                            var $415 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $416 = self.name;
                                        var $417 = self.args;
                                        var $418 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$ref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($418)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$app(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $419 = self.eras;
                                                        var $420 = self.name;
                                                        var $421 = self.term;
                                                        return $421;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($412)(List$cons(Fm$Name$read("."))(List$cons($416)(List$nil))));
                                            var _slf$14 = Fm$Term$ref(_ctr$13);
                                            var _slf$15 = (list_for($413)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$app(_slf$16)(Fm$Term$ref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $422 = self.eras;
                                                        var $423 = self.name;
                                                        var $424 = self.term;
                                                        return $423;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($417)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$app(_slf$17)(Fm$Term$ref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $425 = self.eras;
                                                        var $426 = self.name;
                                                        var $427 = self.term;
                                                        return $426;
                                                }
                                            })()))))));
                                            return Fm$Term$app(_ret$12)(_slf$16)
                                        })();
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $428 = self.head;
                var $429 = self.tail;
                return (() => {
                    var self = $428;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $430 = self.eras;
                            var $431 = self.name;
                            var $432 = self.term;
                            return (() => {
                                var _eras$9 = $430;
                                var _name$10 = $431;
                                var _xtyp$11 = $432;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($429);
                                return Fm$Term$all(_eras$9)("")(_name$10)(_xtyp$11)((_s$13 => (_x$14 => _body$12)))
                            })();
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructor = (_type$1 => (_ctor$2 => (() => {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $433 = self.name;
                var $434 = self.args;
                var $435 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($434);
        }
    })()));
    var Fm$Datatype$build_term$constructors$go = (_type$1 => (_name$2 => (_ctrs$3 => (() => {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _type$1;
                    switch (self._) {
                        case 'Fm.Datatype.new':
                            var $436 = self.name;
                            var $437 = self.pars;
                            var $438 = self.inds;
                            var $439 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$ref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($438)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$app(_ret$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $440 = self.eras;
                                            var $441 = self.name;
                                            var $442 = self.term;
                                            return $441;
                                    }
                                })()))))));
                                return Fm$Term$app(_ret$9)(Fm$Term$ref((_name$2 + ".Self")))
                            })();
                    }
                })();
            case 'List.cons':
                var $443 = self.head;
                var $444 = self.tail;
                return (() => {
                    var self = $443;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $445 = self.name;
                            var $446 = self.args;
                            var $447 = self.inds;
                            return Fm$Term$all(Bool$false)("")($445)(Fm$Datatype$build_term$constructor(_type$1)($443))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($444))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $448 = self.name;
                var $449 = self.pars;
                var $450 = self.inds;
                var $451 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($448)($451);
        }
    })());
    var Fm$Datatype$build_term$go = (_type$1 => (_name$2 => (_pars$3 => (_inds$4 => (() => {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _inds$4;
                    switch (self._) {
                        case 'List.nil':
                            return Fm$Term$all(Bool$true)((_name$2 + ".Self"))(Fm$Name$read("P"))(Fm$Datatype$build_term$motive(_type$1))((_s$5 => (_x$6 => Fm$Datatype$build_term$constructors(_type$1))));
                        case 'List.cons':
                            var $452 = self.head;
                            var $453 = self.tail;
                            return (() => {
                                var self = $452;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $454 = self.eras;
                                        var $455 = self.name;
                                        var $456 = self.term;
                                        return Fm$Term$lam($455)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($453)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $457 = self.head;
                var $458 = self.tail;
                return (() => {
                    var self = $457;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $459 = self.eras;
                            var $460 = self.name;
                            var $461 = self.term;
                            return Fm$Term$lam($460)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($458)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $462 = self.name;
                var $463 = self.pars;
                var $464 = self.inds;
                var $465 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($462)($463)($464);
        }
    })());
    var Fm$Datatype$build_type$go = (_type$1 => (_name$2 => (_pars$3 => (_inds$4 => (() => {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _inds$4;
                    switch (self._) {
                        case 'List.nil':
                            return Fm$Term$typ;
                        case 'List.cons':
                            var $466 = self.head;
                            var $467 = self.tail;
                            return (() => {
                                var self = $466;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $468 = self.eras;
                                        var $469 = self.name;
                                        var $470 = self.term;
                                        return Fm$Term$all(Bool$false)("")($469)($470)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($467))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $471 = self.head;
                var $472 = self.tail;
                return (() => {
                    var self = $471;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $473 = self.eras;
                            var $474 = self.name;
                            var $475 = self.term;
                            return Fm$Term$all(Bool$false)("")($474)($475)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($472)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $476 = self.name;
                var $477 = self.pars;
                var $478 = self.inds;
                var $479 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($476)($477)($478);
        }
    })());
    var Fm$Constructor$build_term$opt$go = (_type$1 => (_ctor$2 => (_ctrs$3 => (() => {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $480 = self.name;
                            var $481 = self.args;
                            var $482 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$ref($480);
                                var _ret$8 = (list_for($481)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$app(_ret$9)(Fm$Term$ref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $483 = self.eras;
                                            var $484 = self.name;
                                            var $485 = self.term;
                                            return $484;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $486 = self.head;
                var $487 = self.tail;
                return (() => {
                    var self = $486;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $488 = self.name;
                            var $489 = self.args;
                            var $490 = self.inds;
                            return Fm$Term$lam($488)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($487)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $491 = self.name;
                var $492 = self.pars;
                var $493 = self.inds;
                var $494 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($494);
        }
    })()));
    var Fm$Constructor$build_term$go = (_type$1 => (_ctor$2 => (_name$3 => (_pars$4 => (_args$5 => (() => {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _args$5;
                    switch (self._) {
                        case 'List.nil':
                            return Fm$Term$lam(Fm$Name$read("P"))((_x$6 => Fm$Constructor$build_term$opt(_type$1)(_ctor$2)));
                        case 'List.cons':
                            var $495 = self.head;
                            var $496 = self.tail;
                            return (() => {
                                var self = $495;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $497 = self.eras;
                                        var $498 = self.name;
                                        var $499 = self.term;
                                        return Fm$Term$lam($498)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($496)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $500 = self.head;
                var $501 = self.tail;
                return (() => {
                    var self = $500;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $502 = self.eras;
                            var $503 = self.name;
                            var $504 = self.term;
                            return Fm$Term$lam($503)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($501)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $505 = self.name;
                var $506 = self.pars;
                var $507 = self.inds;
                var $508 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $509 = self.name;
                            var $510 = self.args;
                            var $511 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($505)($506)($510);
                    }
                })();
        }
    })()));
    var Fm$Constructor$build_type$go = (_type$1 => (_ctor$2 => (_name$3 => (_pars$4 => (_args$5 => (() => {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _args$5;
                    switch (self._) {
                        case 'List.nil':
                            return (() => {
                                var self = _type$1;
                                switch (self._) {
                                    case 'Fm.Datatype.new':
                                        var $512 = self.name;
                                        var $513 = self.pars;
                                        var $514 = self.inds;
                                        var $515 = self.ctrs;
                                        return (() => {
                                            var self = _ctor$2;
                                            switch (self._) {
                                                case 'Fm.Constructor.new':
                                                    var $516 = self.name;
                                                    var $517 = self.args;
                                                    var $518 = self.inds;
                                                    return (() => {
                                                        var _type$13 = Fm$Term$ref(_name$3);
                                                        var _type$14 = (list_for($513)(_type$13)((_var$14 => (_type$15 => Fm$Term$app(_type$15)(Fm$Term$ref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $519 = self.eras;
                                                                    var $520 = self.name;
                                                                    var $521 = self.term;
                                                                    return $520;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($518)(_type$14)((_var$15 => (_type$16 => Fm$Term$app(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $522 = self.eras;
                                                                    var $523 = self.name;
                                                                    var $524 = self.term;
                                                                    return $524;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $525 = self.head;
                            var $526 = self.tail;
                            return (() => {
                                var self = $525;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $527 = self.eras;
                                        var $528 = self.name;
                                        var $529 = self.term;
                                        return Fm$Term$all($527)("")($528)($529)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($526))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $530 = self.head;
                var $531 = self.tail;
                return (() => {
                    var self = $530;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $532 = self.eras;
                            var $533 = self.name;
                            var $534 = self.term;
                            return Fm$Term$all($532)("")($533)($534)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($531)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $535 = self.name;
                var $536 = self.pars;
                var $537 = self.inds;
                var $538 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $539 = self.name;
                            var $540 = self.args;
                            var $541 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($535)($536)($540);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$adt = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$4 => (() => {
        var self = _adt$4;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $542 = self.name;
                var $543 = self.pars;
                var $544 = self.inds;
                var $545 = self.ctrs;
                return (() => {
                    var _term$9 = Fm$Datatype$build_term(_adt$4);
                    var _term$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$i(_x$10)))(_term$9);
                    var _type$11 = Fm$Datatype$build_type(_adt$4);
                    var _type$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$o(_x$12)))(_type$11);
                    var _defs$13 = Fm$define(_file$1)(_code$2)($542)(_term$10)(_type$12)(Bool$false)(_defs$3);
                    var _defs$14 = List$fold($545)(_defs$13)((_ctr$14 => (_defs$15 => (() => {
                        var _typ_name$16 = $542;
                        var _ctr_name$17 = String$flatten(List$cons(_typ_name$16)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $546 = self.name;
                                    var $547 = self.args;
                                    var $548 = self.inds;
                                    return $546;
                            }
                        })())(List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term(_adt$4)(_ctr$14);
                        var _ctr_term$19 = Fm$Term$bind(List$nil)((_x$19 => Bits$i(_x$19)))(_ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type(_adt$4)(_ctr$14);
                        var _ctr_type$21 = Fm$Term$bind(List$nil)((_x$21 => Bits$o(_x$21)))(_ctr_type$20);
                        return Fm$define(_file$1)(_code$2)(_ctr_name$17)(_ctr_term$19)(_ctr_type$21)(Bool$false)(_defs$15)
                    })())));
                    return Monad$pure(Parser$monad)(_defs$14)
                })();
        }
    })())))));
    var Parser$eof = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$1)(_code$2)(Unit$new);
            case 'cons':
                var $549 = self.charCodeAt(0);
                var $550 = self.slice(1);
                return Parser$Reply$error(_idx$1)(_code$2)("Expected end-of-file.");
        }
    })()));
    var Fm$Parser$file$end = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$4 => Monad$bind(Parser$monad)(Parser$eof)((_$5 => Monad$pure(Parser$monad)(_defs$3))))))));
    var Fm$Parser$file = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Parser$is_eof)((_stop$4 => (() => {
        var self = _stop$4;
        switch (self ? 'true' : 'false') {
            case 'true':
                return Monad$pure(Parser$monad)(_defs$3);
            case 'false':
                return Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$text("#"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_file$6 => Fm$Parser$file(_file$6)(_code$2)(_defs$3))))))(List$cons(Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$file$def(_file$1)(_code$2)(_defs$3))(List$cons(Fm$Parser$file$adt(_file$1)(_code$2)(_defs$3))(List$cons(Fm$Parser$file$end(_file$1)(_code$2)(_defs$3))(List$nil)))))((_defs$5 => Fm$Parser$file(_file$1)(_code$2)(_defs$5))))(List$nil)));
        }
    })())))));
    var Either = (_A$1 => (_B$2 => null));
    var String$join$go = (_sep$1 => (_list$2 => (_fst$3 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $551 = self.head;
                var $552 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($551)(List$cons(String$join$go(_sep$1)($552)(Bool$false))(List$nil))));
        }
    })())));
    var String$join = (_sep$1 => (_list$2 => String$join$go(_sep$1)(_list$2)(Bool$true)));
    var Fm$highlight$end = (_col$1 => (_row$2 => (_res$3 => String$join("\u{a}")(_res$3))));
    var Maybe$extract = (_m$2 => (_a$4 => (_f$5 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return _a$4;
            case 'Maybe.some':
                var $553 = self.value;
                return _f$5($553);
        }
    })())));
    var Nat$is_zero = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Bool$true;
            case 'succ':
                var $554 = (self - 1n);
                return Bool$false;
        }
    })());
    var Nat$double = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $555 = (self - 1n);
                return Nat$succ(Nat$succ(Nat$double($555)));
        }
    })());
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $556 = (self - 1n);
                return $556;
        }
    })());
    var List$take = (_n$2 => (_xs$3 => (() => {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $557 = self.head;
                var $558 = self.tail;
                return (() => {
                    var self = _n$2;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return List$nil;
                        case 'succ':
                            var $559 = (self - 1n);
                            return List$cons($557)(List$take($559)($558));
                    }
                })();
        }
    })()));
    var String$reverse$go = _xs$1 => _res$2 => {
        var String$reverse$go = _xs$1 => _res$2 => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                switch (self.length === 0 ? 'nil' : 'cons') {
                    case 'nil':
                        return _res$2;
                    case 'cons':
                        var $560 = self.charCodeAt(0);
                        var $561 = self.slice(1);
                        return String$reverse$go($561)(String$cons($560)(_res$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var String$reverse = (_xs$1 => String$reverse$go(_xs$1)(String$nil));
    var String$pad_right = (_size$1 => (_chr$2 => (_str$3 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return _str$3;
            case 'succ':
                var $562 = (self - 1n);
                return (() => {
                    var self = _str$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return String$cons(_chr$2)(String$pad_right($562)(_chr$2)(""));
                        case 'cons':
                            var $563 = self.charCodeAt(0);
                            var $564 = self.slice(1);
                            return String$cons($563)(String$pad_right($562)(_chr$2)($564));
                    }
                })();
        }
    })())));
    var String$pad_left = (_size$1 => (_chr$2 => (_str$3 => String$reverse(String$pad_right(_size$1)(_chr$2)(String$reverse(_str$3))))));
    var Either$left = (_value$3 => ({
        _: 'Either.left',
        'value': _value$3
    }));
    var Either$right = (_value$3 => ({
        _: 'Either.right',
        'value': _value$3
    }));
    var Nat$sub_rem = _n$1 => _m$2 => {
        var Nat$sub_rem = _n$1 => _m$2 => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2]
        });
        var arg = [_n$1, _m$2];
        while (true) {
            let [_n$1, _m$2] = arg;
            var R = (() => {
                var self = _m$2;
                switch (self === 0n ? 'zero' : 'succ') {
                    case 'zero':
                        return Either$left(_n$1);
                    case 'succ':
                        var $565 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($565));
                                case 'succ':
                                    var $566 = (self - 1n);
                                    return Nat$sub_rem($566)($565);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Nat$div_mod$go = _n$1 => _m$2 => _d$3 => {
        var Nat$div_mod$go = _n$1 => _m$2 => _d$3 => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _d$3]
        });
        var arg = [_n$1, _m$2, _d$3];
        while (true) {
            let [_n$1, _m$2, _d$3] = arg;
            var R = (() => {
                var self = Nat$sub_rem(_n$1)(_m$2);
                switch (self._) {
                    case 'Either.left':
                        var $567 = self.value;
                        return Nat$div_mod$go($567)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $568 = self.value;
                        return Pair$new(_d$3)(_n$1);
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Nat$div_mod = a0 => a1 => (({
        _: 'Pair.new',
        'fst': a0 / a1,
        'snd': a0 % a1
    }));
    var Nat$to_base$go = _base$1 => _nat$2 => _res$3 => {
        var Nat$to_base$go = _base$1 => _nat$2 => _res$3 => ({
            ctr: 'TCO',
            arg: [_base$1, _nat$2, _res$3]
        });
        var arg = [_base$1, _nat$2, _res$3];
        while (true) {
            let [_base$1, _nat$2, _res$3] = arg;
            var R = (() => {
                var self = (({
                    _: 'Pair.new',
                    'fst': _nat$2 / _base$1,
                    'snd': _nat$2 % _base$1
                }));
                switch (self._) {
                    case 'Pair.new':
                        var $569 = self.fst;
                        var $570 = self.snd;
                        return (() => {
                            var self = $569;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($570)(_res$3);
                                case 'succ':
                                    var $571 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($569)(List$cons($570)(_res$3));
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Nat$to_base = (_base$1 => (_nat$2 => Nat$to_base$go(_base$1)(_nat$2)(List$nil)));
    var Nat$mod = (_n$1 => (_m$2 => Pair$snd((({
        _: 'Pair.new',
        'fst': _n$1 / _m$2,
        'snd': _n$1 % _m$2
    })))));
    var Nat$lte = a0 => a1 => (a0 <= a1);
    var Nat$show_digit = (_base$1 => (_n$2 => (() => {
        var _m$3 = Nat$mod(_n$2)(_base$1);
        var _base64$4 = List$cons(48)(List$cons(49)(List$cons(50)(List$cons(51)(List$cons(52)(List$cons(53)(List$cons(54)(List$cons(55)(List$cons(56)(List$cons(57)(List$cons(65)(List$cons(66)(List$cons(67)(List$cons(68)(List$cons(69)(List$cons(70)(List$cons(71)(List$cons(72)(List$cons(73)(List$cons(74)(List$cons(75)(List$cons(76)(List$cons(77)(List$cons(78)(List$cons(79)(List$cons(80)(List$cons(81)(List$cons(82)(List$cons(83)(List$cons(84)(List$cons(85)(List$cons(86)(List$cons(87)(List$cons(88)(List$cons(89)(List$cons(90)(List$cons(97)(List$cons(98)(List$cons(99)(List$cons(100)(List$cons(101)(List$cons(102)(List$cons(103)(List$cons(104)(List$cons(105)(List$cons(106)(List$cons(107)(List$cons(108)(List$cons(109)(List$cons(110)(List$cons(111)(List$cons(112)(List$cons(113)(List$cons(114)(List$cons(115)(List$cons(116)(List$cons(117)(List$cons(118)(List$cons(119)(List$cons(120)(List$cons(121)(List$cons(122)(List$cons(43)(List$cons(47)(List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
        return (() => {
            var self = ((_base$1 > 0n) && (_base$1 <= 64n));
            switch (self ? 'true' : 'false') {
                case 'true':
                    return (() => {
                        var self = List$at(_m$3)(_base64$4);
                        switch (self._) {
                            case 'Maybe.none':
                                return 35;
                            case 'Maybe.some':
                                var $572 = self.value;
                                return $572;
                        }
                    })();
                case 'false':
                    return 35;
            }
        })()
    })()));
    var Nat$to_string_base = (_base$1 => (_nat$2 => List$fold(Nat$to_base(_base$1)(_nat$2))(String$nil)((_n$3 => (_str$4 => String$cons(Nat$show_digit(_base$1)(_n$3))(_str$4))))));
    var Nat$show = (_n$1 => Nat$to_string_base(10n)(_n$1));
    var Bool$not = a0 => (!a0);
    var Fm$color = (_col$1 => (_str$2 => String$cons(27)(String$cons(91)((_col$1 + String$cons(109)((_str$2 + String$cons(27)(String$cons(91)(String$cons(48)(String$cons(109)(String$nil)))))))))));
    var Fm$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => {
        var Fm$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => ({
            ctr: 'TCO',
            arg: [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8]
        });
        var arg = [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8];
        while (true) {
            let [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8] = arg;
            var R = (() => {
                var self = _code$1;
                switch (self.length === 0 ? 'nil' : 'cons') {
                    case 'nil':
                        return Fm$highlight$end(_col$4)(_row$5)(List$reverse(_res$8));
                    case 'cons':
                        var $573 = self.charCodeAt(0);
                        var $574 = self.slice(1);
                        return (() => {
                            var self = ($573 === 10);
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return (() => {
                                        var _stp$11 = Maybe$extract(_lft$6)(Bool$false)(Nat$is_zero);
                                        return (() => {
                                            var self = _stp$11;
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Fm$highlight$end(_col$4)(_row$5)(List$reverse(_res$8));
                                                case 'false':
                                                    return (() => {
                                                        var _spa$12 = 3n;
                                                        var _siz$13 = Nat$succ(Nat$double(_spa$12));
                                                        var _lft$14 = (() => {
                                                            var self = _ix1$3;
                                                            switch (self === 0n ? 'zero' : 'succ') {
                                                                case 'zero':
                                                                    return (() => {
                                                                        var self = _lft$6;
                                                                        switch (self._) {
                                                                            case 'Maybe.none':
                                                                                return Maybe$some(_spa$12);
                                                                            case 'Maybe.some':
                                                                                var $575 = self.value;
                                                                                return Maybe$some(Nat$pred($575));
                                                                        }
                                                                    })();
                                                                case 'succ':
                                                                    var $576 = (self - 1n);
                                                                    return _lft$6;
                                                            }
                                                        })();
                                                        var _ix0$15 = Nat$pred(_ix0$2);
                                                        var _ix1$16 = Nat$pred(_ix1$3);
                                                        var _col$17 = 0n;
                                                        var _row$18 = Nat$succ(_row$5);
                                                        var _res$19 = List$take(_siz$13)(List$cons(String$reverse(_lin$7))(_res$8));
                                                        var _lin$20 = String$reverse(String$flatten(List$cons(String$pad_left(4n)(32)(Nat$show(_row$18)))(List$cons(" | ")(List$nil))));
                                                        return Fm$highlight$tc($574)(_ix0$15)(_ix1$16)(_col$17)(_row$18)(_lft$14)(_lin$20)(_res$19)
                                                    })();
                                            }
                                        })()
                                    })();
                                case 'false':
                                    return (() => {
                                        var _chr$11 = String$cons($573)(String$nil);
                                        var _chr$12 = (() => {
                                            var self = (Nat$is_zero(_ix0$2) && (!Nat$is_zero(_ix1$3)));
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return String$reverse(Fm$color("31")(Fm$color("4")(_chr$11)));
                                                case 'false':
                                                    return _chr$11;
                                            }
                                        })();
                                        var _ix0$13 = Nat$pred(_ix0$2);
                                        var _ix1$14 = Nat$pred(_ix1$3);
                                        var _col$15 = Nat$succ(_col$4);
                                        var _lin$16 = String$flatten(List$cons(_chr$12)(List$cons(_lin$7)(List$nil)));
                                        return Fm$highlight$tc($574)(_ix0$13)(_ix1$14)(_col$15)(_row$5)(_lft$6)(_lin$16)(_res$8)
                                    })();
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$highlight = (_code$1 => (_idx0$2 => (_idx1$3 => Fm$highlight$tc(_code$1)(_idx0$2)(_idx1$3)(0n)(1n)(Maybe$none)(String$reverse("   1 | "))(List$nil))));
    var Fm$Defs$read = (_file$1 => (_code$2 => (_defs$3 => (() => {
        var self = Fm$Parser$file(_file$1)(_code$2)(_defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $577 = self.idx;
                var $578 = self.code;
                var $579 = self.err;
                return (() => {
                    var _err$7 = $579;
                    var _hig$8 = Fm$highlight(_code$2)($577)(Nat$succ($577));
                    var _str$9 = String$flatten(List$cons(_err$7)(List$cons("\u{a}")(List$cons(_hig$8)(List$nil))));
                    return Either$left(_str$9)
                })();
            case 'Parser.Reply.value':
                var $580 = self.idx;
                var $581 = self.code;
                var $582 = self.val;
                return Either$right($582);
        }
    })())));
    var Fm$Synth$load = (_name$1 => (_defs$2 => (() => {
        var _file$3 = Fm$Synth$file_of(_name$1);
        return Monad$bind(IO$monad)(IO$get_file(_file$3))((_code$4 => (() => {
            var _read$5 = Fm$Defs$read(_file$3)(_code$4)(_defs$2);
            return (() => {
                var self = _read$5;
                switch (self._) {
                    case 'Either.left':
                        var $583 = self.value;
                        return Monad$pure(IO$monad)(Maybe$none);
                    case 'Either.right':
                        var $584 = self.value;
                        return (() => {
                            var _defs$7 = $584;
                            return (() => {
                                var self = Fm$get(_name$1)(_defs$7);
                                switch (self._) {
                                    case 'Maybe.none':
                                        return Monad$pure(IO$monad)(Maybe$none);
                                    case 'Maybe.some':
                                        var $585 = self.value;
                                        return Monad$pure(IO$monad)(Maybe$some(_defs$7));
                                }
                            })()
                        })();
                }
            })()
        })()))
    })()));
    var IO$print = (_text$1 => IO$ask("print")(_text$1)((_skip$2 => IO$end(Unit$new))));
    var Fm$Status$wait = ({
        _: 'Fm.Status.wait'
    });
    var Fm$Check = (_V$1 => null);
    var Fm$Check$result = (_value$2 => (_errors$3 => ({
        _: 'Fm.Check.result',
        'value': _value$2,
        'errors': _errors$3
    })));
    var Fm$Check$bind = (_a$3 => (_f$4 => (() => {
        var self = _a$3;
        switch (self._) {
            case 'Fm.Check.result':
                var $586 = self.value;
                var $587 = self.errors;
                return (() => {
                    var self = $586;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($587);
                        case 'Maybe.some':
                            var $588 = self.value;
                            return (() => {
                                var self = _f$4($588);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $589 = self.value;
                                        var $590 = self.errors;
                                        return Fm$Check$result($589)(List$concat($587)($590));
                                }
                            })();
                    }
                })();
        }
    })()));
    var Fm$Check$pure = (_value$2 => Fm$Check$result(Maybe$some(_value$2))(List$nil));
    var Fm$Check$monad = Monad$new(Fm$Check$bind)(Fm$Check$pure);
    var Fm$Error$undefined_reference = (_origin$1 => (_name$2 => ({
        _: 'Fm.Error.undefined_reference',
        'origin': _origin$1,
        'name': _name$2
    })));
    var Fm$Error$waiting = (_name$1 => ({
        _: 'Fm.Error.waiting',
        'name': _name$1
    }));
    var Fm$Error$indirect = (_name$1 => ({
        _: 'Fm.Error.indirect',
        'name': _name$1
    }));
    var Maybe$mapped = (_m$2 => (_f$4 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $591 = self.value;
                return Maybe$some(_f$4($591));
        }
    })()));
    var Fm$MPath$o = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$o));
    var Fm$MPath$i = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$i));
    var Fm$Error$cant_infer = (_origin$1 => (_term$2 => (_context$3 => ({
        _: 'Fm.Error.cant_infer',
        'origin': _origin$1,
        'term': _term$2,
        'context': _context$3
    }))));
    var Fm$Error$type_mismatch = (_origin$1 => (_expected$2 => (_detected$3 => (_context$4 => ({
        _: 'Fm.Error.type_mismatch',
        'origin': _origin$1,
        'expected': _expected$2,
        'detected': _detected$3,
        'context': _context$4
    })))));
    var Fm$Error$show_goal = (_name$1 => (_dref$2 => (_verb$3 => (_goal$4 => (_context$5 => ({
        _: 'Fm.Error.show_goal',
        'name': _name$1,
        'dref': _dref$2,
        'verb': _verb$3,
        'goal': _goal$4,
        'context': _context$5
    }))))));
    var List$tail = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $592 = self.head;
                var $593 = self.tail;
                return $593;
        }
    })());
    var Fm$SmartMotive$vals$cont = _expr$1 => _term$2 => _args$3 => _defs$4 => {
        var Fm$SmartMotive$vals$cont = _expr$1 => _term$2 => _args$3 => _defs$4 => ({
            ctr: 'TCO',
            arg: [_expr$1, _term$2, _args$3, _defs$4]
        });
        var arg = [_expr$1, _term$2, _args$3, _defs$4];
        while (true) {
            let [_expr$1, _term$2, _args$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce(_term$2)(_defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $594 = self.name;
                        var $595 = self.indx;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.ref':
                        var $596 = self.name;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.typ':
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.all':
                        var $597 = self.eras;
                        var $598 = self.self;
                        var $599 = self.name;
                        var $600 = self.xtyp;
                        var $601 = self.body;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.lam':
                        var $602 = self.name;
                        var $603 = self.body;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.app':
                        var $604 = self.func;
                        var $605 = self.argm;
                        return Fm$SmartMotive$vals$cont(_expr$1)($604)(List$cons($605)(_args$3))(_defs$4);
                    case 'Fm.Term.let':
                        var $606 = self.name;
                        var $607 = self.expr;
                        var $608 = self.body;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.def':
                        var $609 = self.name;
                        var $610 = self.expr;
                        var $611 = self.body;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.ann':
                        var $612 = self.done;
                        var $613 = self.term;
                        var $614 = self.type;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.gol':
                        var $615 = self.name;
                        var $616 = self.dref;
                        var $617 = self.verb;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.hol':
                        var $618 = self.path;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.nat':
                        var $619 = self.natx;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.chr':
                        var $620 = self.chrx;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.str':
                        var $621 = self.strx;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.cse':
                        var $622 = self.path;
                        var $623 = self.expr;
                        var $624 = self.name;
                        var $625 = self.with;
                        var $626 = self.cses;
                        var $627 = self.moti;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                    case 'Fm.Term.ori':
                        var $628 = self.orig;
                        var $629 = self.expr;
                        return List$cons(_expr$1)(List$tail(List$reverse(_args$3)));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$SmartMotive$vals = _expr$1 => _type$2 => _defs$3 => {
        var Fm$SmartMotive$vals = _expr$1 => _type$2 => _defs$3 => ({
            ctr: 'TCO',
            arg: [_expr$1, _type$2, _defs$3]
        });
        var arg = [_expr$1, _type$2, _defs$3];
        while (true) {
            let [_expr$1, _type$2, _defs$3] = arg;
            var R = (() => {
                var self = Fm$Term$reduce(_type$2)(_defs$3);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $630 = self.name;
                        var $631 = self.indx;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.ref':
                        var $632 = self.name;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.typ':
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.all':
                        var $633 = self.eras;
                        var $634 = self.self;
                        var $635 = self.name;
                        var $636 = self.xtyp;
                        var $637 = self.body;
                        return Fm$SmartMotive$vals(_expr$1)($637(Fm$Term$typ)(Fm$Term$typ))(_defs$3);
                    case 'Fm.Term.lam':
                        var $638 = self.name;
                        var $639 = self.body;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.app':
                        var $640 = self.func;
                        var $641 = self.argm;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.let':
                        var $642 = self.name;
                        var $643 = self.expr;
                        var $644 = self.body;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.def':
                        var $645 = self.name;
                        var $646 = self.expr;
                        var $647 = self.body;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.ann':
                        var $648 = self.done;
                        var $649 = self.term;
                        var $650 = self.type;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.gol':
                        var $651 = self.name;
                        var $652 = self.dref;
                        var $653 = self.verb;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.hol':
                        var $654 = self.path;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.nat':
                        var $655 = self.natx;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.chr':
                        var $656 = self.chrx;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.str':
                        var $657 = self.strx;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.cse':
                        var $658 = self.path;
                        var $659 = self.expr;
                        var $660 = self.name;
                        var $661 = self.with;
                        var $662 = self.cses;
                        var $663 = self.moti;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                    case 'Fm.Term.ori':
                        var $664 = self.orig;
                        var $665 = self.expr;
                        return Fm$SmartMotive$vals$cont(_expr$1)(_type$2)(List$nil)(_defs$3);
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$SmartMotive$nams$cont = _name$1 => _term$2 => _binds$3 => _defs$4 => {
        var Fm$SmartMotive$nams$cont = _name$1 => _term$2 => _binds$3 => _defs$4 => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _binds$3, _defs$4]
        });
        var arg = [_name$1, _term$2, _binds$3, _defs$4];
        while (true) {
            let [_name$1, _term$2, _binds$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce(_term$2)(_defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $666 = self.name;
                        var $667 = self.indx;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.ref':
                        var $668 = self.name;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.typ':
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.all':
                        var $669 = self.eras;
                        var $670 = self.self;
                        var $671 = self.name;
                        var $672 = self.xtyp;
                        var $673 = self.body;
                        return Fm$SmartMotive$nams$cont(_name$1)($673(Fm$Term$ref($670))(Fm$Term$ref($671)))(List$cons(String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($671)(List$nil)))))(_binds$3))(_defs$4);
                    case 'Fm.Term.lam':
                        var $674 = self.name;
                        var $675 = self.body;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.app':
                        var $676 = self.func;
                        var $677 = self.argm;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.let':
                        var $678 = self.name;
                        var $679 = self.expr;
                        var $680 = self.body;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.def':
                        var $681 = self.name;
                        var $682 = self.expr;
                        var $683 = self.body;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.ann':
                        var $684 = self.done;
                        var $685 = self.term;
                        var $686 = self.type;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.gol':
                        var $687 = self.name;
                        var $688 = self.dref;
                        var $689 = self.verb;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.hol':
                        var $690 = self.path;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.nat':
                        var $691 = self.natx;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.chr':
                        var $692 = self.chrx;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.str':
                        var $693 = self.strx;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.cse':
                        var $694 = self.path;
                        var $695 = self.expr;
                        var $696 = self.name;
                        var $697 = self.with;
                        var $698 = self.cses;
                        var $699 = self.moti;
                        return List$cons(_name$1)(List$tail(_binds$3));
                    case 'Fm.Term.ori':
                        var $700 = self.orig;
                        var $701 = self.expr;
                        return List$cons(_name$1)(List$tail(_binds$3));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$SmartMotive$nams = (_name$1 => (_type$2 => (_defs$3 => (() => {
        var self = Fm$Term$reduce(_type$2)(_defs$3);
        switch (self._) {
            case 'Fm.Term.var':
                var $702 = self.name;
                var $703 = self.indx;
                return List$nil;
            case 'Fm.Term.ref':
                var $704 = self.name;
                return List$nil;
            case 'Fm.Term.typ':
                return List$nil;
            case 'Fm.Term.all':
                var $705 = self.eras;
                var $706 = self.self;
                var $707 = self.name;
                var $708 = self.xtyp;
                var $709 = self.body;
                return Fm$SmartMotive$nams$cont(_name$1)($708)(List$nil)(_defs$3);
            case 'Fm.Term.lam':
                var $710 = self.name;
                var $711 = self.body;
                return List$nil;
            case 'Fm.Term.app':
                var $712 = self.func;
                var $713 = self.argm;
                return List$nil;
            case 'Fm.Term.let':
                var $714 = self.name;
                var $715 = self.expr;
                var $716 = self.body;
                return List$nil;
            case 'Fm.Term.def':
                var $717 = self.name;
                var $718 = self.expr;
                var $719 = self.body;
                return List$nil;
            case 'Fm.Term.ann':
                var $720 = self.done;
                var $721 = self.term;
                var $722 = self.type;
                return List$nil;
            case 'Fm.Term.gol':
                var $723 = self.name;
                var $724 = self.dref;
                var $725 = self.verb;
                return List$nil;
            case 'Fm.Term.hol':
                var $726 = self.path;
                return List$nil;
            case 'Fm.Term.nat':
                var $727 = self.natx;
                return List$nil;
            case 'Fm.Term.chr':
                var $728 = self.chrx;
                return List$nil;
            case 'Fm.Term.str':
                var $729 = self.strx;
                return List$nil;
            case 'Fm.Term.cse':
                var $730 = self.path;
                var $731 = self.expr;
                var $732 = self.name;
                var $733 = self.with;
                var $734 = self.cses;
                var $735 = self.moti;
                return List$nil;
            case 'Fm.Term.ori':
                var $736 = self.orig;
                var $737 = self.expr;
                return List$nil;
        }
    })())));
    var List$zip = (_as$3 => (_bs$4 => (() => {
        var self = _as$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $738 = self.head;
                var $739 = self.tail;
                return (() => {
                    var self = _bs$4;
                    switch (self._) {
                        case 'List.nil':
                            return List$nil;
                        case 'List.cons':
                            var $740 = self.head;
                            var $741 = self.tail;
                            return List$cons(Pair$new($738)($740))(List$zip($739)($741));
                    }
                })();
        }
    })()));
    var Cmp$as_gte = (_cmp$1 => (() => {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                return Bool$false;
            case 'Cmp.eql':
                return Bool$true;
            case 'Cmp.gtn':
                return Bool$true;
        }
    })());
    var Nat$gte = a0 => a1 => (a0 >= a1);
    var Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);
    var Fm$Term$serialize$name = (_name$1 => (fm_name_to_bits(_name$1)));
    var Fm$Term$serialize = (_term$1 => (_depth$2 => (_init$3 => (_x$4 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $742 = self.name;
                var $743 = self.indx;
                return (() => {
                    var self = ($743 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $743 <= 0n ? 0n : _depth$2 - $743)))));
                                return Bits$o(Bits$o(Bits$i(_name$7(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits($743)));
                                return Bits$o(Bits$i(Bits$o(_name$7(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $744 = self.name;
                return (() => {
                    var _name$6 = a1 => (a1 + Fm$Term$serialize$name($744));
                    return Bits$o(Bits$o(Bits$o(_name$6(_x$4))))
                })();
            case 'Fm.Term.typ':
                return Bits$o(Bits$i(Bits$i(_x$4)));
            case 'Fm.Term.all':
                var $745 = self.eras;
                var $746 = self.self;
                var $747 = self.name;
                var $748 = self.xtyp;
                var $749 = self.body;
                return (() => {
                    var _eras$10 = (() => {
                        var self = $745;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$i;
                            case 'false':
                                return Bits$o;
                        }
                    })();
                    var _self$11 = a1 => (a1 + (fm_name_to_bits($746)));
                    var _xtyp$12 = Fm$Term$serialize($748)(_depth$2)(_init$3);
                    var _body$13 = Fm$Term$serialize($749(Fm$Term$var($746)(_depth$2))(Fm$Term$var($747)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$i(Bits$o(Bits$o(_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $750 = self.name;
                var $751 = self.body;
                return (() => {
                    var _body$7 = Fm$Term$serialize($751(Fm$Term$var($750)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$i(Bits$o(Bits$i(_body$7(_x$4))))
                })();
            case 'Fm.Term.app':
                var $752 = self.func;
                var $753 = self.argm;
                return (() => {
                    var _func$7 = Fm$Term$serialize($752)(_depth$2)(_init$3);
                    var _argm$8 = Fm$Term$serialize($753)(_depth$2)(_init$3);
                    return Bits$i(Bits$i(Bits$o(_func$7(_argm$8(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $754 = self.name;
                var $755 = self.expr;
                var $756 = self.body;
                return (() => {
                    var _expr$8 = Fm$Term$serialize($755)(_depth$2)(_init$3);
                    var _body$9 = Fm$Term$serialize($756(Fm$Term$var($754)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$i(Bits$i(Bits$i(_expr$8(_body$9(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $757 = self.name;
                var $758 = self.expr;
                var $759 = self.body;
                return Fm$Term$serialize($759($758))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $760 = self.done;
                var $761 = self.term;
                var $762 = self.type;
                return Fm$Term$serialize($761)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $763 = self.name;
                var $764 = self.dref;
                var $765 = self.verb;
                return (() => {
                    var _name$8 = a1 => (a1 + (fm_name_to_bits($763)));
                    return Bits$o(Bits$o(Bits$o(_name$8(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $766 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $767 = self.natx;
                return Fm$Term$serialize(Fm$Term$unroll_nat($767))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.chr':
                var $768 = self.chrx;
                return Fm$Term$serialize(Fm$Term$unroll_chr($768))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.str':
                var $769 = self.strx;
                return Fm$Term$serialize(Fm$Term$unroll_str($769))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $770 = self.path;
                var $771 = self.expr;
                var $772 = self.name;
                var $773 = self.with;
                var $774 = self.cses;
                var $775 = self.moti;
                return _x$4;
            case 'Fm.Term.ori':
                var $776 = self.orig;
                var $777 = self.expr;
                return Fm$Term$serialize($777)(_depth$2)(_init$3)(_x$4);
        }
    })()))));
    var Bits$eql = a0 => a1 => (a1 === a0);
    var Fm$Term$identical = (_a$1 => (_b$2 => (_lv$3 => (() => {
        var _ah$4 = Fm$Term$serialize(_a$1)(_lv$3)(_lv$3)(Bits$e);
        var _bh$5 = Fm$Term$serialize(_b$2)(_lv$3)(_lv$3)(Bits$e);
        return (_bh$5 === _ah$4)
    })())));
    var Fm$SmartMotive$replace = (_term$1 => (_from$2 => (_to$3 => (_lv$4 => (() => {
        var self = Fm$Term$identical(_term$1)(_from$2)(_lv$4);
        switch (self ? 'true' : 'false') {
            case 'true':
                return _to$3;
            case 'false':
                return (() => {
                    var self = _term$1;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $778 = self.name;
                            var $779 = self.indx;
                            return Fm$Term$var($778)($779);
                        case 'Fm.Term.ref':
                            var $780 = self.name;
                            return Fm$Term$ref($780);
                        case 'Fm.Term.typ':
                            return Fm$Term$typ;
                        case 'Fm.Term.all':
                            var $781 = self.eras;
                            var $782 = self.self;
                            var $783 = self.name;
                            var $784 = self.xtyp;
                            var $785 = self.body;
                            return (() => {
                                var _xtyp$10 = Fm$SmartMotive$replace($784)(_from$2)(_to$3)(_lv$4);
                                var _body$11 = $785(Fm$Term$ref($782))(Fm$Term$ref($783));
                                var _body$12 = Fm$SmartMotive$replace(_body$11)(_from$2)(_to$3)(Nat$succ(Nat$succ(_lv$4)));
                                return Fm$Term$all($781)($782)($783)(_xtyp$10)((_s$13 => (_x$14 => _body$12)))
                            })();
                        case 'Fm.Term.lam':
                            var $786 = self.name;
                            var $787 = self.body;
                            return (() => {
                                var _body$7 = $787(Fm$Term$ref($786));
                                var _body$8 = Fm$SmartMotive$replace(_body$7)(_from$2)(_to$3)(Nat$succ(_lv$4));
                                return Fm$Term$lam($786)((_x$9 => _body$8))
                            })();
                        case 'Fm.Term.app':
                            var $788 = self.func;
                            var $789 = self.argm;
                            return (() => {
                                var _func$7 = Fm$SmartMotive$replace($788)(_from$2)(_to$3)(_lv$4);
                                var _argm$8 = Fm$SmartMotive$replace($789)(_from$2)(_to$3)(_lv$4);
                                return Fm$Term$app(_func$7)(_argm$8)
                            })();
                        case 'Fm.Term.let':
                            var $790 = self.name;
                            var $791 = self.expr;
                            var $792 = self.body;
                            return (() => {
                                var _expr$8 = Fm$SmartMotive$replace($791)(_from$2)(_to$3)(_lv$4);
                                var _body$9 = $792(Fm$Term$ref($790));
                                var _body$10 = Fm$SmartMotive$replace(_body$9)(_from$2)(_to$3)(Nat$succ(_lv$4));
                                return Fm$Term$let($790)(_expr$8)((_x$11 => _body$10))
                            })();
                        case 'Fm.Term.def':
                            var $793 = self.name;
                            var $794 = self.expr;
                            var $795 = self.body;
                            return (() => {
                                var _expr$8 = Fm$SmartMotive$replace($794)(_from$2)(_to$3)(_lv$4);
                                var _body$9 = $795(Fm$Term$ref($793));
                                var _body$10 = Fm$SmartMotive$replace(_body$9)(_from$2)(_to$3)(Nat$succ(_lv$4));
                                return Fm$Term$def($793)(_expr$8)((_x$11 => _body$10))
                            })();
                        case 'Fm.Term.ann':
                            var $796 = self.done;
                            var $797 = self.term;
                            var $798 = self.type;
                            return (() => {
                                var _term$8 = Fm$SmartMotive$replace($797)(_from$2)(_to$3)(_lv$4);
                                var _type$9 = Fm$SmartMotive$replace($798)(_from$2)(_to$3)(_lv$4);
                                return Fm$Term$ann($796)(_term$8)(_type$9)
                            })();
                        case 'Fm.Term.gol':
                            var $799 = self.name;
                            var $800 = self.dref;
                            var $801 = self.verb;
                            return _term$1;
                        case 'Fm.Term.hol':
                            var $802 = self.path;
                            return _term$1;
                        case 'Fm.Term.nat':
                            var $803 = self.natx;
                            return _term$1;
                        case 'Fm.Term.chr':
                            var $804 = self.chrx;
                            return _term$1;
                        case 'Fm.Term.str':
                            var $805 = self.strx;
                            return _term$1;
                        case 'Fm.Term.cse':
                            var $806 = self.path;
                            var $807 = self.expr;
                            var $808 = self.name;
                            var $809 = self.with;
                            var $810 = self.cses;
                            var $811 = self.moti;
                            return _term$1;
                        case 'Fm.Term.ori':
                            var $812 = self.orig;
                            var $813 = self.expr;
                            return Fm$SmartMotive$replace($813)(_from$2)(_to$3)(_lv$4);
                    }
                })();
        }
    })()))));
    var Fm$SmartMotive$make = (_name$1 => (_expr$2 => (_type$3 => (_moti$4 => (_lv$5 => (_defs$6 => (() => {
        var _vals$7 = Fm$SmartMotive$vals(_expr$2)(_type$3)(_defs$6);
        var _nams$8 = Fm$SmartMotive$nams(_name$1)(_type$3)(_defs$6);
        var _subs$9 = List$zip(_nams$8)(_vals$7);
        var _moti$10 = List$fold(_subs$9)(_moti$4)((_sub$10 => (_moti$11 => (() => {
            var self = _sub$10;
            switch (self._) {
                case 'Pair.new':
                    var $814 = self.fst;
                    var $815 = self.snd;
                    return Fm$SmartMotive$replace(_moti$11)($815)(Fm$Term$ref($814))(_lv$5);
            }
        })())));
        return _moti$10
    })()))))));
    var Fm$Term$desugar_cse$motive = (_wyth$1 => (_moti$2 => (() => {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                return _moti$2;
            case 'List.cons':
                var $816 = self.head;
                var $817 = self.tail;
                return (() => {
                    var self = $816;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $818 = self.file;
                            var $819 = self.code;
                            var $820 = self.name;
                            var $821 = self.term;
                            var $822 = self.type;
                            var $823 = self.stat;
                            return Fm$Term$all(Bool$false)("")($820)($822)((_s$11 => (_x$12 => Fm$Term$desugar_cse$motive($817)(_moti$2))));
                    }
                })();
        }
    })()));
    var String$is_empty = (_str$1 => (() => {
        var self = _str$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Bool$true;
            case 'cons':
                var $824 = self.charCodeAt(0);
                var $825 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $826 = self.name;
                var $827 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $828 = self.head;
                            var $829 = self.tail;
                            return (() => {
                                var self = $828;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $830 = self.file;
                                        var $831 = self.code;
                                        var $832 = self.name;
                                        var $833 = self.term;
                                        var $834 = self.type;
                                        var $835 = self.stat;
                                        return Fm$Term$lam($832)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($829)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $836 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $837 = self.head;
                            var $838 = self.tail;
                            return (() => {
                                var self = $837;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $839 = self.file;
                                        var $840 = self.code;
                                        var $841 = self.name;
                                        var $842 = self.term;
                                        var $843 = self.type;
                                        var $844 = self.stat;
                                        return Fm$Term$lam($841)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($838)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $845 = self.head;
                            var $846 = self.tail;
                            return (() => {
                                var self = $845;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $847 = self.file;
                                        var $848 = self.code;
                                        var $849 = self.name;
                                        var $850 = self.term;
                                        var $851 = self.type;
                                        var $852 = self.stat;
                                        return Fm$Term$lam($849)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($846)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $853 = self.eras;
                var $854 = self.self;
                var $855 = self.name;
                var $856 = self.xtyp;
                var $857 = self.body;
                return Fm$Term$lam((() => {
                    var self = String$is_empty($855);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($855)(List$nil))));
                    }
                })())((_x$11 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($857(Fm$Term$var($854)(0n))(Fm$Term$var($855)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $858 = self.name;
                var $859 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $860 = self.head;
                            var $861 = self.tail;
                            return (() => {
                                var self = $860;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $862 = self.file;
                                        var $863 = self.code;
                                        var $864 = self.name;
                                        var $865 = self.term;
                                        var $866 = self.type;
                                        var $867 = self.stat;
                                        return Fm$Term$lam($864)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($861)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $868 = self.func;
                var $869 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $870 = self.head;
                            var $871 = self.tail;
                            return (() => {
                                var self = $870;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $872 = self.file;
                                        var $873 = self.code;
                                        var $874 = self.name;
                                        var $875 = self.term;
                                        var $876 = self.type;
                                        var $877 = self.stat;
                                        return Fm$Term$lam($874)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($871)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $878 = self.name;
                var $879 = self.expr;
                var $880 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $881 = self.head;
                            var $882 = self.tail;
                            return (() => {
                                var self = $881;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $883 = self.file;
                                        var $884 = self.code;
                                        var $885 = self.name;
                                        var $886 = self.term;
                                        var $887 = self.type;
                                        var $888 = self.stat;
                                        return Fm$Term$lam($885)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($882)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $889 = self.name;
                var $890 = self.expr;
                var $891 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $892 = self.head;
                            var $893 = self.tail;
                            return (() => {
                                var self = $892;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $894 = self.file;
                                        var $895 = self.code;
                                        var $896 = self.name;
                                        var $897 = self.term;
                                        var $898 = self.type;
                                        var $899 = self.stat;
                                        return Fm$Term$lam($896)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($893)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $900 = self.done;
                var $901 = self.term;
                var $902 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $903 = self.head;
                            var $904 = self.tail;
                            return (() => {
                                var self = $903;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $905 = self.file;
                                        var $906 = self.code;
                                        var $907 = self.name;
                                        var $908 = self.term;
                                        var $909 = self.type;
                                        var $910 = self.stat;
                                        return Fm$Term$lam($907)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($904)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $911 = self.name;
                var $912 = self.dref;
                var $913 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $914 = self.head;
                            var $915 = self.tail;
                            return (() => {
                                var self = $914;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $916 = self.file;
                                        var $917 = self.code;
                                        var $918 = self.name;
                                        var $919 = self.term;
                                        var $920 = self.type;
                                        var $921 = self.stat;
                                        return Fm$Term$lam($918)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($915)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $922 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $923 = self.head;
                            var $924 = self.tail;
                            return (() => {
                                var self = $923;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $925 = self.file;
                                        var $926 = self.code;
                                        var $927 = self.name;
                                        var $928 = self.term;
                                        var $929 = self.type;
                                        var $930 = self.stat;
                                        return Fm$Term$lam($927)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($924)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $931 = self.natx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $932 = self.head;
                            var $933 = self.tail;
                            return (() => {
                                var self = $932;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $934 = self.file;
                                        var $935 = self.code;
                                        var $936 = self.name;
                                        var $937 = self.term;
                                        var $938 = self.type;
                                        var $939 = self.stat;
                                        return Fm$Term$lam($936)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($933)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $940 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $941 = self.head;
                            var $942 = self.tail;
                            return (() => {
                                var self = $941;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $943 = self.file;
                                        var $944 = self.code;
                                        var $945 = self.name;
                                        var $946 = self.term;
                                        var $947 = self.type;
                                        var $948 = self.stat;
                                        return Fm$Term$lam($945)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($942)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $949 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $950 = self.head;
                            var $951 = self.tail;
                            return (() => {
                                var self = $950;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $952 = self.file;
                                        var $953 = self.code;
                                        var $954 = self.name;
                                        var $955 = self.term;
                                        var $956 = self.type;
                                        var $957 = self.stat;
                                        return Fm$Term$lam($954)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($951)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $958 = self.path;
                var $959 = self.expr;
                var $960 = self.name;
                var $961 = self.with;
                var $962 = self.cses;
                var $963 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $964 = self.head;
                            var $965 = self.tail;
                            return (() => {
                                var self = $964;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $966 = self.file;
                                        var $967 = self.code;
                                        var $968 = self.name;
                                        var $969 = self.term;
                                        var $970 = self.type;
                                        var $971 = self.stat;
                                        return Fm$Term$lam($968)((_x$20 => Fm$Term$desugar_cse$argument(_name$1)($965)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ori':
                var $972 = self.orig;
                var $973 = self.expr;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $974 = self.head;
                            var $975 = self.tail;
                            return (() => {
                                var self = $974;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $976 = self.file;
                                        var $977 = self.code;
                                        var $978 = self.name;
                                        var $979 = self.term;
                                        var $980 = self.type;
                                        var $981 = self.stat;
                                        return Fm$Term$lam($978)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($975)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
        }
    })())))));
    var Maybe$or = (_a$2 => (_b$3 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.none':
                return _b$3;
            case 'Maybe.some':
                var $982 = self.value;
                return Maybe$some($982);
        }
    })()));
    var Fm$Term$desugar_cse$cases = _expr$1 => _name$2 => _wyth$3 => _cses$4 => _type$5 => _defs$6 => _ctxt$7 => {
        var Fm$Term$desugar_cse$cases = _expr$1 => _name$2 => _wyth$3 => _cses$4 => _type$5 => _defs$6 => _ctxt$7 => ({
            ctr: 'TCO',
            arg: [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7]
        });
        var arg = [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7];
        while (true) {
            let [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7] = arg;
            var R = (() => {
                var self = Fm$Term$reduce(_type$5)(_defs$6);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $983 = self.name;
                        var $984 = self.indx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $985 = self.file;
                                        var $986 = self.code;
                                        var $987 = self.name;
                                        var $988 = self.term;
                                        var $989 = self.type;
                                        var $990 = self.stat;
                                        return $988;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.ref':
                        var $991 = self.name;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $992 = self.file;
                                        var $993 = self.code;
                                        var $994 = self.name;
                                        var $995 = self.term;
                                        var $996 = self.type;
                                        var $997 = self.stat;
                                        return $995;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.typ':
                        return (() => {
                            var _expr$8 = (list_for(_wyth$3)(_expr$1)((_defn$8 => (_expr$9 => Fm$Term$app(_expr$9)((() => {
                                var self = _defn$8;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $998 = self.file;
                                        var $999 = self.code;
                                        var $1000 = self.name;
                                        var $1001 = self.term;
                                        var $1002 = self.type;
                                        var $1003 = self.stat;
                                        return $1001;
                                }
                            })())))));
                            return _expr$8
                        })();
                    case 'Fm.Term.all':
                        var $1004 = self.eras;
                        var $1005 = self.self;
                        var $1006 = self.name;
                        var $1007 = self.xtyp;
                        var $1008 = self.body;
                        return (() => {
                            var _got$13 = Maybe$or(Fm$get($1006)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => (() => {
                                                var self = _defn$14;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $1009 = self.file;
                                                        var $1010 = self.code;
                                                        var $1011 = self.name;
                                                        var $1012 = self.term;
                                                        var $1013 = self.type;
                                                        var $1014 = self.stat;
                                                        return Fm$Term$app(_expr$15)($1012);
                                                }
                                            })()))));
                                            return _expr$14
                                        })();
                                    case 'Maybe.some':
                                        var $1015 = self.value;
                                        return (() => {
                                            var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($1007)($1015)(_defs$6);
                                            var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                                            var _type$17 = $1008(Fm$Term$var($1005)(0n))(Fm$Term$var($1006)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_wyth$3)(_cses$4)(_type$17)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $1016 = self.name;
                        var $1017 = self.body;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1018 = self.file;
                                        var $1019 = self.code;
                                        var $1020 = self.name;
                                        var $1021 = self.term;
                                        var $1022 = self.type;
                                        var $1023 = self.stat;
                                        return $1021;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.app':
                        var $1024 = self.func;
                        var $1025 = self.argm;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1026 = self.file;
                                        var $1027 = self.code;
                                        var $1028 = self.name;
                                        var $1029 = self.term;
                                        var $1030 = self.type;
                                        var $1031 = self.stat;
                                        return $1029;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.let':
                        var $1032 = self.name;
                        var $1033 = self.expr;
                        var $1034 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1035 = self.file;
                                        var $1036 = self.code;
                                        var $1037 = self.name;
                                        var $1038 = self.term;
                                        var $1039 = self.type;
                                        var $1040 = self.stat;
                                        return $1038;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.def':
                        var $1041 = self.name;
                        var $1042 = self.expr;
                        var $1043 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1044 = self.file;
                                        var $1045 = self.code;
                                        var $1046 = self.name;
                                        var $1047 = self.term;
                                        var $1048 = self.type;
                                        var $1049 = self.stat;
                                        return $1047;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ann':
                        var $1050 = self.done;
                        var $1051 = self.term;
                        var $1052 = self.type;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1053 = self.file;
                                        var $1054 = self.code;
                                        var $1055 = self.name;
                                        var $1056 = self.term;
                                        var $1057 = self.type;
                                        var $1058 = self.stat;
                                        return $1056;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.gol':
                        var $1059 = self.name;
                        var $1060 = self.dref;
                        var $1061 = self.verb;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1062 = self.file;
                                        var $1063 = self.code;
                                        var $1064 = self.name;
                                        var $1065 = self.term;
                                        var $1066 = self.type;
                                        var $1067 = self.stat;
                                        return $1065;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.hol':
                        var $1068 = self.path;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1069 = self.file;
                                        var $1070 = self.code;
                                        var $1071 = self.name;
                                        var $1072 = self.term;
                                        var $1073 = self.type;
                                        var $1074 = self.stat;
                                        return $1072;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.nat':
                        var $1075 = self.natx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1076 = self.file;
                                        var $1077 = self.code;
                                        var $1078 = self.name;
                                        var $1079 = self.term;
                                        var $1080 = self.type;
                                        var $1081 = self.stat;
                                        return $1079;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.chr':
                        var $1082 = self.chrx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1083 = self.file;
                                        var $1084 = self.code;
                                        var $1085 = self.name;
                                        var $1086 = self.term;
                                        var $1087 = self.type;
                                        var $1088 = self.stat;
                                        return $1086;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.str':
                        var $1089 = self.strx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1090 = self.file;
                                        var $1091 = self.code;
                                        var $1092 = self.name;
                                        var $1093 = self.term;
                                        var $1094 = self.type;
                                        var $1095 = self.stat;
                                        return $1093;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.cse':
                        var $1096 = self.path;
                        var $1097 = self.expr;
                        var $1098 = self.name;
                        var $1099 = self.with;
                        var $1100 = self.cses;
                        var $1101 = self.moti;
                        return (() => {
                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => Fm$Term$app(_expr$15)((() => {
                                var self = _defn$14;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1102 = self.file;
                                        var $1103 = self.code;
                                        var $1104 = self.name;
                                        var $1105 = self.term;
                                        var $1106 = self.type;
                                        var $1107 = self.stat;
                                        return $1105;
                                }
                            })())))));
                            return _expr$14
                        })();
                    case 'Fm.Term.ori':
                        var $1108 = self.orig;
                        var $1109 = self.expr;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1110 = self.file;
                                        var $1111 = self.code;
                                        var $1112 = self.name;
                                        var $1113 = self.term;
                                        var $1114 = self.type;
                                        var $1115 = self.stat;
                                        return $1113;
                                }
                            })())))));
                            return _expr$10
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Term$desugar_cse = (_expr$1 => (_name$2 => (_with$3 => (_cses$4 => (_moti$5 => (_type$6 => (_defs$7 => (_ctxt$8 => (() => {
        var self = Fm$Term$reduce(_type$6)(_defs$7);
        switch (self._) {
            case 'Fm.Term.var':
                var $1116 = self.name;
                var $1117 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1118 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $1119 = self.eras;
                var $1120 = self.self;
                var $1121 = self.name;
                var $1122 = self.xtyp;
                var $1123 = self.body;
                return (() => {
                    var _moti$14 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($1122)(_moti$14)(_defs$7);
                    var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                    var _type$17 = $1123(Fm$Term$var($1120)(0n))(Fm$Term$var($1121)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_with$3)(_cses$4)(_type$17)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $1124 = self.name;
                var $1125 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1126 = self.func;
                var $1127 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $1128 = self.name;
                var $1129 = self.expr;
                var $1130 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1131 = self.name;
                var $1132 = self.expr;
                var $1133 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1134 = self.done;
                var $1135 = self.term;
                var $1136 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1137 = self.name;
                var $1138 = self.dref;
                var $1139 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1140 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1141 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1142 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1143 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1144 = self.path;
                var $1145 = self.expr;
                var $1146 = self.name;
                var $1147 = self.with;
                var $1148 = self.cses;
                var $1149 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $1150 = self.orig;
                var $1151 = self.expr;
                return Maybe$none;
        }
    })()))))))));
    var Fm$Error$patch = (_path$1 => (_term$2 => ({
        _: 'Fm.Error.patch',
        'path': _path$1,
        'term': _term$2
    })));
    var Fm$MPath$to_bits = (_path$1 => (() => {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.none':
                return Bits$e;
            case 'Maybe.some':
                var $1152 = self.value;
                return $1152(Bits$e);
        }
    })());
    var Set$has = (_bits$1 => (_set$2 => (() => {
        var self = Map$get(_bits$1)(_set$2);
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $1153 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $1154 = self.name;
                var $1155 = self.indx;
                return Fm$Term$var($1154)($1155);
            case 'Fm.Term.ref':
                var $1156 = self.name;
                return Fm$Term$ref($1156);
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $1157 = self.eras;
                var $1158 = self.self;
                var $1159 = self.name;
                var $1160 = self.xtyp;
                var $1161 = self.body;
                return Fm$Term$all($1157)($1158)($1159)(Fm$Term$normalize($1160)(_defs$2))((_s$8 => (_x$9 => Fm$Term$normalize($1161(_s$8)(_x$9))(_defs$2))));
            case 'Fm.Term.lam':
                var $1162 = self.name;
                var $1163 = self.body;
                return Fm$Term$lam($1162)((_x$5 => Fm$Term$normalize($1163(_x$5))(_defs$2)));
            case 'Fm.Term.app':
                var $1164 = self.func;
                var $1165 = self.argm;
                return Fm$Term$app(Fm$Term$normalize($1164)(_defs$2))(Fm$Term$normalize($1165)(_defs$2));
            case 'Fm.Term.let':
                var $1166 = self.name;
                var $1167 = self.expr;
                var $1168 = self.body;
                return Fm$Term$let($1166)(Fm$Term$normalize($1167)(_defs$2))((_x$6 => Fm$Term$normalize($1168(_x$6))(_defs$2)));
            case 'Fm.Term.def':
                var $1169 = self.name;
                var $1170 = self.expr;
                var $1171 = self.body;
                return Fm$Term$def($1169)(Fm$Term$normalize($1170)(_defs$2))((_x$6 => Fm$Term$normalize($1171(_x$6))(_defs$2)));
            case 'Fm.Term.ann':
                var $1172 = self.done;
                var $1173 = self.term;
                var $1174 = self.type;
                return Fm$Term$ann($1172)(Fm$Term$normalize($1173)(_defs$2))(Fm$Term$normalize($1174)(_defs$2));
            case 'Fm.Term.gol':
                var $1175 = self.name;
                var $1176 = self.dref;
                var $1177 = self.verb;
                return Fm$Term$gol($1175)($1176)($1177);
            case 'Fm.Term.hol':
                var $1178 = self.path;
                return Fm$Term$hol($1178);
            case 'Fm.Term.nat':
                var $1179 = self.natx;
                return Fm$Term$nat($1179);
            case 'Fm.Term.chr':
                var $1180 = self.chrx;
                return Fm$Term$chr($1180);
            case 'Fm.Term.str':
                var $1181 = self.strx;
                return Fm$Term$str($1181);
            case 'Fm.Term.cse':
                var $1182 = self.path;
                var $1183 = self.expr;
                var $1184 = self.name;
                var $1185 = self.with;
                var $1186 = self.cses;
                var $1187 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $1188 = self.orig;
                var $1189 = self.expr;
                return Fm$Term$normalize($1189)(_defs$2);
        }
    })()));
    var Fm$Term$equal$patch = (_path$1 => (_term$2 => Fm$Check$result(Maybe$some(Bool$true))(List$cons(Fm$Error$patch(_path$1)(Fm$Term$normalize(_term$2)(Map$new)))(List$nil))));
    var Set$set = (_bits$1 => (_set$2 => Map$set(_bits$1)(Unit$new)(_set$2)));
    var Bool$eql = (_a$1 => (_b$2 => (() => {
        var self = _a$1;
        switch (self ? 'true' : 'false') {
            case 'true':
                return _b$2;
            case 'false':
                return (!_b$2);
        }
    })()));
    var Fm$Term$equal = (_a$1 => (_b$2 => (_defs$3 => (_lv$4 => (_seen$5 => (() => {
        var _ah$6 = Fm$Term$serialize(_a$1)(_lv$4)(_lv$4)(Bits$e);
        var _bh$7 = Fm$Term$serialize(_b$2)(_lv$4)(_lv$4)(Bits$e);
        return (() => {
            var self = (_bh$7 === _ah$6);
            switch (self ? 'true' : 'false') {
                case 'true':
                    return Monad$pure(Fm$Check$monad)(Bool$true);
                case 'false':
                    return (() => {
                        var _a1$8 = Fm$Term$reduce(_a$1)(_defs$3);
                        var _b1$9 = Fm$Term$reduce(_b$2)(_defs$3);
                        var _ah$10 = Fm$Term$serialize(_a1$8)(_lv$4)(_lv$4)(Bits$e);
                        var _bh$11 = Fm$Term$serialize(_b1$9)(_lv$4)(_lv$4)(Bits$e);
                        return (() => {
                            var self = (_bh$11 === _ah$10);
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return Monad$pure(Fm$Check$monad)(Bool$true);
                                case 'false':
                                    return (() => {
                                        var _id$12 = (_bh$11 + _ah$10);
                                        return (() => {
                                            var self = Set$has(_id$12)(_seen$5);
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Monad$pure(Fm$Check$monad)(Bool$true);
                                                case 'false':
                                                    return (() => {
                                                        var self = _a1$8;
                                                        switch (self._) {
                                                            case 'Fm.Term.var':
                                                                var $1190 = self.name;
                                                                var $1191 = self.indx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1192 = self.name;
                                                                            var $1193 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1194 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1195 = self.eras;
                                                                            var $1196 = self.self;
                                                                            var $1197 = self.name;
                                                                            var $1198 = self.xtyp;
                                                                            var $1199 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1200 = self.name;
                                                                            var $1201 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1202 = self.func;
                                                                            var $1203 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1204 = self.name;
                                                                            var $1205 = self.expr;
                                                                            var $1206 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1207 = self.name;
                                                                            var $1208 = self.expr;
                                                                            var $1209 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1210 = self.done;
                                                                            var $1211 = self.term;
                                                                            var $1212 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1213 = self.name;
                                                                            var $1214 = self.dref;
                                                                            var $1215 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1216 = self.path;
                                                                            return Fm$Term$equal$patch($1216)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1217 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1218 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1219 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1220 = self.path;
                                                                            var $1221 = self.expr;
                                                                            var $1222 = self.name;
                                                                            var $1223 = self.with;
                                                                            var $1224 = self.cses;
                                                                            var $1225 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1226 = self.orig;
                                                                            var $1227 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ref':
                                                                var $1228 = self.name;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1229 = self.name;
                                                                            var $1230 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1231 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1232 = self.eras;
                                                                            var $1233 = self.self;
                                                                            var $1234 = self.name;
                                                                            var $1235 = self.xtyp;
                                                                            var $1236 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1237 = self.name;
                                                                            var $1238 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1239 = self.func;
                                                                            var $1240 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1241 = self.name;
                                                                            var $1242 = self.expr;
                                                                            var $1243 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1244 = self.name;
                                                                            var $1245 = self.expr;
                                                                            var $1246 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1247 = self.done;
                                                                            var $1248 = self.term;
                                                                            var $1249 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1250 = self.name;
                                                                            var $1251 = self.dref;
                                                                            var $1252 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1253 = self.path;
                                                                            return Fm$Term$equal$patch($1253)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1254 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1255 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1256 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1257 = self.path;
                                                                            var $1258 = self.expr;
                                                                            var $1259 = self.name;
                                                                            var $1260 = self.with;
                                                                            var $1261 = self.cses;
                                                                            var $1262 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1263 = self.orig;
                                                                            var $1264 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.typ':
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1265 = self.name;
                                                                            var $1266 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1267 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1268 = self.eras;
                                                                            var $1269 = self.self;
                                                                            var $1270 = self.name;
                                                                            var $1271 = self.xtyp;
                                                                            var $1272 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1273 = self.name;
                                                                            var $1274 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1275 = self.func;
                                                                            var $1276 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1277 = self.name;
                                                                            var $1278 = self.expr;
                                                                            var $1279 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1280 = self.name;
                                                                            var $1281 = self.expr;
                                                                            var $1282 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1283 = self.done;
                                                                            var $1284 = self.term;
                                                                            var $1285 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1286 = self.name;
                                                                            var $1287 = self.dref;
                                                                            var $1288 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1289 = self.path;
                                                                            return Fm$Term$equal$patch($1289)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1290 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1291 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1292 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1293 = self.path;
                                                                            var $1294 = self.expr;
                                                                            var $1295 = self.name;
                                                                            var $1296 = self.with;
                                                                            var $1297 = self.cses;
                                                                            var $1298 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1299 = self.orig;
                                                                            var $1300 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.all':
                                                                var $1301 = self.eras;
                                                                var $1302 = self.self;
                                                                var $1303 = self.name;
                                                                var $1304 = self.xtyp;
                                                                var $1305 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1306 = self.name;
                                                                            var $1307 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1308 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1309 = self.eras;
                                                                            var $1310 = self.self;
                                                                            var $1311 = self.name;
                                                                            var $1312 = self.xtyp;
                                                                            var $1313 = self.body;
                                                                            return (() => {
                                                                                var _seen$23 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$24 = $1305(Fm$Term$var($1302)(_lv$4))(Fm$Term$var($1303)(Nat$succ(_lv$4)));
                                                                                var _b1_body$25 = $1313(Fm$Term$var($1310)(_lv$4))(Fm$Term$var($1311)(Nat$succ(_lv$4)));
                                                                                var _eq_self$26 = ($1302 === $1310);
                                                                                var _eq_eras$27 = Bool$eql($1301)($1309);
                                                                                return (() => {
                                                                                    var self = (_eq_self$26 && _eq_eras$27);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1304)($1312)(_defs$3)(_lv$4)(_seen$23))((_eq_type$28 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$24)(_b1_body$25)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$23))((_eq_body$29 => Monad$pure(Fm$Check$monad)((_eq_type$28 && _eq_body$29))))));
                                                                                        case 'false':
                                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                                    }
                                                                                })()
                                                                            })();
                                                                        case 'Fm.Term.lam':
                                                                            var $1314 = self.name;
                                                                            var $1315 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1316 = self.func;
                                                                            var $1317 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1318 = self.name;
                                                                            var $1319 = self.expr;
                                                                            var $1320 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1321 = self.name;
                                                                            var $1322 = self.expr;
                                                                            var $1323 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1324 = self.done;
                                                                            var $1325 = self.term;
                                                                            var $1326 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1327 = self.name;
                                                                            var $1328 = self.dref;
                                                                            var $1329 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1330 = self.path;
                                                                            return Fm$Term$equal$patch($1330)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1331 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1332 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1333 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1334 = self.path;
                                                                            var $1335 = self.expr;
                                                                            var $1336 = self.name;
                                                                            var $1337 = self.with;
                                                                            var $1338 = self.cses;
                                                                            var $1339 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1340 = self.orig;
                                                                            var $1341 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.lam':
                                                                var $1342 = self.name;
                                                                var $1343 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1344 = self.name;
                                                                            var $1345 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1346 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1347 = self.eras;
                                                                            var $1348 = self.self;
                                                                            var $1349 = self.name;
                                                                            var $1350 = self.xtyp;
                                                                            var $1351 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1352 = self.name;
                                                                            var $1353 = self.body;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$18 = $1343(Fm$Term$var($1342)(_lv$4));
                                                                                var _b1_body$19 = $1353(Fm$Term$var($1352)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$20 => Monad$pure(Fm$Check$monad)(_eq_body$20)))
                                                                            })();
                                                                        case 'Fm.Term.app':
                                                                            var $1354 = self.func;
                                                                            var $1355 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1356 = self.name;
                                                                            var $1357 = self.expr;
                                                                            var $1358 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1359 = self.name;
                                                                            var $1360 = self.expr;
                                                                            var $1361 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1362 = self.done;
                                                                            var $1363 = self.term;
                                                                            var $1364 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1365 = self.name;
                                                                            var $1366 = self.dref;
                                                                            var $1367 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1368 = self.path;
                                                                            return Fm$Term$equal$patch($1368)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1369 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1370 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1371 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1372 = self.path;
                                                                            var $1373 = self.expr;
                                                                            var $1374 = self.name;
                                                                            var $1375 = self.with;
                                                                            var $1376 = self.cses;
                                                                            var $1377 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1378 = self.orig;
                                                                            var $1379 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.app':
                                                                var $1380 = self.func;
                                                                var $1381 = self.argm;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1382 = self.name;
                                                                            var $1383 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1384 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1385 = self.eras;
                                                                            var $1386 = self.self;
                                                                            var $1387 = self.name;
                                                                            var $1388 = self.xtyp;
                                                                            var $1389 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1390 = self.name;
                                                                            var $1391 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1392 = self.func;
                                                                            var $1393 = self.argm;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1380)($1392)(_defs$3)(_lv$4)(_seen$17))((_eq_func$18 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1381)($1393)(_defs$3)(_lv$4)(_seen$17))((_eq_argm$19 => Monad$pure(Fm$Check$monad)((_eq_func$18 && _eq_argm$19))))))
                                                                            })();
                                                                        case 'Fm.Term.let':
                                                                            var $1394 = self.name;
                                                                            var $1395 = self.expr;
                                                                            var $1396 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1397 = self.name;
                                                                            var $1398 = self.expr;
                                                                            var $1399 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1400 = self.done;
                                                                            var $1401 = self.term;
                                                                            var $1402 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1403 = self.name;
                                                                            var $1404 = self.dref;
                                                                            var $1405 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1406 = self.path;
                                                                            return Fm$Term$equal$patch($1406)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1407 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1408 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1409 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1410 = self.path;
                                                                            var $1411 = self.expr;
                                                                            var $1412 = self.name;
                                                                            var $1413 = self.with;
                                                                            var $1414 = self.cses;
                                                                            var $1415 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1416 = self.orig;
                                                                            var $1417 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.let':
                                                                var $1418 = self.name;
                                                                var $1419 = self.expr;
                                                                var $1420 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1421 = self.name;
                                                                            var $1422 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1423 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1424 = self.eras;
                                                                            var $1425 = self.self;
                                                                            var $1426 = self.name;
                                                                            var $1427 = self.xtyp;
                                                                            var $1428 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1429 = self.name;
                                                                            var $1430 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1431 = self.func;
                                                                            var $1432 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1433 = self.name;
                                                                            var $1434 = self.expr;
                                                                            var $1435 = self.body;
                                                                            return (() => {
                                                                                var _seen$19 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$20 = $1420(Fm$Term$var($1418)(_lv$4));
                                                                                var _b1_body$21 = $1435(Fm$Term$var($1433)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1419)($1434)(_defs$3)(_lv$4)(_seen$19))((_eq_expr$22 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$20)(_b1_body$21)(_defs$3)(Nat$succ(_lv$4))(_seen$19))((_eq_body$23 => Monad$pure(Fm$Check$monad)((_eq_expr$22 && _eq_body$23))))))
                                                                            })();
                                                                        case 'Fm.Term.def':
                                                                            var $1436 = self.name;
                                                                            var $1437 = self.expr;
                                                                            var $1438 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1439 = self.done;
                                                                            var $1440 = self.term;
                                                                            var $1441 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1442 = self.name;
                                                                            var $1443 = self.dref;
                                                                            var $1444 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1445 = self.path;
                                                                            return Fm$Term$equal$patch($1445)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1446 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1447 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1448 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1449 = self.path;
                                                                            var $1450 = self.expr;
                                                                            var $1451 = self.name;
                                                                            var $1452 = self.with;
                                                                            var $1453 = self.cses;
                                                                            var $1454 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1455 = self.orig;
                                                                            var $1456 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.def':
                                                                var $1457 = self.name;
                                                                var $1458 = self.expr;
                                                                var $1459 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1460 = self.name;
                                                                            var $1461 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1462 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1463 = self.eras;
                                                                            var $1464 = self.self;
                                                                            var $1465 = self.name;
                                                                            var $1466 = self.xtyp;
                                                                            var $1467 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1468 = self.name;
                                                                            var $1469 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1470 = self.func;
                                                                            var $1471 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1472 = self.name;
                                                                            var $1473 = self.expr;
                                                                            var $1474 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1475 = self.name;
                                                                            var $1476 = self.expr;
                                                                            var $1477 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1478 = self.done;
                                                                            var $1479 = self.term;
                                                                            var $1480 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1481 = self.name;
                                                                            var $1482 = self.dref;
                                                                            var $1483 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1484 = self.path;
                                                                            return Fm$Term$equal$patch($1484)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1485 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1486 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1487 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1488 = self.path;
                                                                            var $1489 = self.expr;
                                                                            var $1490 = self.name;
                                                                            var $1491 = self.with;
                                                                            var $1492 = self.cses;
                                                                            var $1493 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1494 = self.orig;
                                                                            var $1495 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ann':
                                                                var $1496 = self.done;
                                                                var $1497 = self.term;
                                                                var $1498 = self.type;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1499 = self.name;
                                                                            var $1500 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1501 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1502 = self.eras;
                                                                            var $1503 = self.self;
                                                                            var $1504 = self.name;
                                                                            var $1505 = self.xtyp;
                                                                            var $1506 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1507 = self.name;
                                                                            var $1508 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1509 = self.func;
                                                                            var $1510 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1511 = self.name;
                                                                            var $1512 = self.expr;
                                                                            var $1513 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1514 = self.name;
                                                                            var $1515 = self.expr;
                                                                            var $1516 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1517 = self.done;
                                                                            var $1518 = self.term;
                                                                            var $1519 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1520 = self.name;
                                                                            var $1521 = self.dref;
                                                                            var $1522 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1523 = self.path;
                                                                            return Fm$Term$equal$patch($1523)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1524 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1525 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1526 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1527 = self.path;
                                                                            var $1528 = self.expr;
                                                                            var $1529 = self.name;
                                                                            var $1530 = self.with;
                                                                            var $1531 = self.cses;
                                                                            var $1532 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1533 = self.orig;
                                                                            var $1534 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.gol':
                                                                var $1535 = self.name;
                                                                var $1536 = self.dref;
                                                                var $1537 = self.verb;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1538 = self.name;
                                                                            var $1539 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1540 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1541 = self.eras;
                                                                            var $1542 = self.self;
                                                                            var $1543 = self.name;
                                                                            var $1544 = self.xtyp;
                                                                            var $1545 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1546 = self.name;
                                                                            var $1547 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1548 = self.func;
                                                                            var $1549 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1550 = self.name;
                                                                            var $1551 = self.expr;
                                                                            var $1552 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1553 = self.name;
                                                                            var $1554 = self.expr;
                                                                            var $1555 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1556 = self.done;
                                                                            var $1557 = self.term;
                                                                            var $1558 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1559 = self.name;
                                                                            var $1560 = self.dref;
                                                                            var $1561 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1562 = self.path;
                                                                            return Fm$Term$equal$patch($1562)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1563 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1564 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1565 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1566 = self.path;
                                                                            var $1567 = self.expr;
                                                                            var $1568 = self.name;
                                                                            var $1569 = self.with;
                                                                            var $1570 = self.cses;
                                                                            var $1571 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1572 = self.orig;
                                                                            var $1573 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.hol':
                                                                var $1574 = self.path;
                                                                return Fm$Term$equal$patch($1574)(_b$2);
                                                            case 'Fm.Term.nat':
                                                                var $1575 = self.natx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1576 = self.name;
                                                                            var $1577 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1578 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1579 = self.eras;
                                                                            var $1580 = self.self;
                                                                            var $1581 = self.name;
                                                                            var $1582 = self.xtyp;
                                                                            var $1583 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1584 = self.name;
                                                                            var $1585 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1586 = self.func;
                                                                            var $1587 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1588 = self.name;
                                                                            var $1589 = self.expr;
                                                                            var $1590 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1591 = self.name;
                                                                            var $1592 = self.expr;
                                                                            var $1593 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1594 = self.done;
                                                                            var $1595 = self.term;
                                                                            var $1596 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1597 = self.name;
                                                                            var $1598 = self.dref;
                                                                            var $1599 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1600 = self.path;
                                                                            return Fm$Term$equal$patch($1600)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1601 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1602 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1603 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1604 = self.path;
                                                                            var $1605 = self.expr;
                                                                            var $1606 = self.name;
                                                                            var $1607 = self.with;
                                                                            var $1608 = self.cses;
                                                                            var $1609 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1610 = self.orig;
                                                                            var $1611 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.chr':
                                                                var $1612 = self.chrx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1613 = self.name;
                                                                            var $1614 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1615 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1616 = self.eras;
                                                                            var $1617 = self.self;
                                                                            var $1618 = self.name;
                                                                            var $1619 = self.xtyp;
                                                                            var $1620 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1621 = self.name;
                                                                            var $1622 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1623 = self.func;
                                                                            var $1624 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1625 = self.name;
                                                                            var $1626 = self.expr;
                                                                            var $1627 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1628 = self.name;
                                                                            var $1629 = self.expr;
                                                                            var $1630 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1631 = self.done;
                                                                            var $1632 = self.term;
                                                                            var $1633 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1634 = self.name;
                                                                            var $1635 = self.dref;
                                                                            var $1636 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1637 = self.path;
                                                                            return Fm$Term$equal$patch($1637)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1638 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1639 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1640 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1641 = self.path;
                                                                            var $1642 = self.expr;
                                                                            var $1643 = self.name;
                                                                            var $1644 = self.with;
                                                                            var $1645 = self.cses;
                                                                            var $1646 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1647 = self.orig;
                                                                            var $1648 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.str':
                                                                var $1649 = self.strx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1650 = self.name;
                                                                            var $1651 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1652 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1653 = self.eras;
                                                                            var $1654 = self.self;
                                                                            var $1655 = self.name;
                                                                            var $1656 = self.xtyp;
                                                                            var $1657 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1658 = self.name;
                                                                            var $1659 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1660 = self.func;
                                                                            var $1661 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1662 = self.name;
                                                                            var $1663 = self.expr;
                                                                            var $1664 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1665 = self.name;
                                                                            var $1666 = self.expr;
                                                                            var $1667 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1668 = self.done;
                                                                            var $1669 = self.term;
                                                                            var $1670 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1671 = self.name;
                                                                            var $1672 = self.dref;
                                                                            var $1673 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1674 = self.path;
                                                                            return Fm$Term$equal$patch($1674)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1675 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1676 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1677 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1678 = self.path;
                                                                            var $1679 = self.expr;
                                                                            var $1680 = self.name;
                                                                            var $1681 = self.with;
                                                                            var $1682 = self.cses;
                                                                            var $1683 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1684 = self.orig;
                                                                            var $1685 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.cse':
                                                                var $1686 = self.path;
                                                                var $1687 = self.expr;
                                                                var $1688 = self.name;
                                                                var $1689 = self.with;
                                                                var $1690 = self.cses;
                                                                var $1691 = self.moti;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1692 = self.name;
                                                                            var $1693 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1694 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1695 = self.eras;
                                                                            var $1696 = self.self;
                                                                            var $1697 = self.name;
                                                                            var $1698 = self.xtyp;
                                                                            var $1699 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1700 = self.name;
                                                                            var $1701 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1702 = self.func;
                                                                            var $1703 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1704 = self.name;
                                                                            var $1705 = self.expr;
                                                                            var $1706 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1707 = self.name;
                                                                            var $1708 = self.expr;
                                                                            var $1709 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1710 = self.done;
                                                                            var $1711 = self.term;
                                                                            var $1712 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1713 = self.name;
                                                                            var $1714 = self.dref;
                                                                            var $1715 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1716 = self.path;
                                                                            return Fm$Term$equal$patch($1716)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1717 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1718 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1719 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1720 = self.path;
                                                                            var $1721 = self.expr;
                                                                            var $1722 = self.name;
                                                                            var $1723 = self.with;
                                                                            var $1724 = self.cses;
                                                                            var $1725 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1726 = self.orig;
                                                                            var $1727 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ori':
                                                                var $1728 = self.orig;
                                                                var $1729 = self.expr;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1730 = self.name;
                                                                            var $1731 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1732 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1733 = self.eras;
                                                                            var $1734 = self.self;
                                                                            var $1735 = self.name;
                                                                            var $1736 = self.xtyp;
                                                                            var $1737 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1738 = self.name;
                                                                            var $1739 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1740 = self.func;
                                                                            var $1741 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1742 = self.name;
                                                                            var $1743 = self.expr;
                                                                            var $1744 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1745 = self.name;
                                                                            var $1746 = self.expr;
                                                                            var $1747 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1748 = self.done;
                                                                            var $1749 = self.term;
                                                                            var $1750 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1751 = self.name;
                                                                            var $1752 = self.dref;
                                                                            var $1753 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1754 = self.path;
                                                                            return Fm$Term$equal$patch($1754)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1755 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1756 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1757 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1758 = self.path;
                                                                            var $1759 = self.expr;
                                                                            var $1760 = self.name;
                                                                            var $1761 = self.with;
                                                                            var $1762 = self.cses;
                                                                            var $1763 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1764 = self.orig;
                                                                            var $1765 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                        }
                                                    })();
                                            }
                                        })()
                                    })();
                            }
                        })()
                    })();
            }
        })()
    })())))));
    var Set$new = Map$new;
    var Fm$Term$check = (_term$1 => (_type$2 => (_defs$3 => (_ctx$4 => (_path$5 => (_orig$6 => Monad$bind(Fm$Check$monad)((() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1766 = self.name;
                var $1767 = self.indx;
                return (() => {
                    var self = List$at_last($1767)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1766))(List$nil));
                        case 'Maybe.some':
                            var $1768 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1768;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1769 = self.fst;
                                        var $1770 = self.snd;
                                        return $1770;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1771 = self.name;
                return (() => {
                    var self = Fm$get($1771)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1771))(List$nil));
                        case 'Maybe.some':
                            var $1772 = self.value;
                            return (() => {
                                var self = $1772;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1773 = self.file;
                                        var $1774 = self.code;
                                        var $1775 = self.name;
                                        var $1776 = self.term;
                                        var $1777 = self.type;
                                        var $1778 = self.stat;
                                        return (() => {
                                            var _ref_name$15 = $1775;
                                            var _ref_type$16 = $1777;
                                            var _ref_term$17 = $1776;
                                            var _ref_stat$18 = $1778;
                                            return (() => {
                                                var self = _ref_stat$18;
                                                switch (self._) {
                                                    case 'Fm.Status.init':
                                                        return Fm$Check$result(Maybe$some(_ref_type$16))(List$cons(Fm$Error$waiting(_ref_name$15))(List$nil));
                                                    case 'Fm.Status.wait':
                                                        return Fm$Check$result(Maybe$some(_ref_type$16))(List$nil);
                                                    case 'Fm.Status.done':
                                                        return Fm$Check$result(Maybe$some(_ref_type$16))(List$nil);
                                                    case 'Fm.Status.fail':
                                                        var $1779 = self.errors;
                                                        return Fm$Check$result(Maybe$some(_ref_type$16))(List$cons(Fm$Error$indirect(_ref_name$15))(List$nil));
                                                }
                                            })()
                                        })();
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return Monad$pure(Fm$Check$monad)(Fm$Term$typ);
            case 'Fm.Term.all':
                var $1780 = self.eras;
                var $1781 = self.self;
                var $1782 = self.name;
                var $1783 = self.xtyp;
                var $1784 = self.body;
                return (() => {
                    var _ctx_size$12 = List$length(_ctx$4);
                    var _self_var$13 = Fm$Term$var($1781)(_ctx_size$12);
                    var _body_var$14 = Fm$Term$var($1782)(Nat$succ(_ctx_size$12));
                    var _body_ctx$15 = List$cons(Pair$new($1782)($1783))(List$cons(Pair$new($1781)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1783)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$o(_path$5))(_orig$6))((_$16 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1784(_self_var$13)(_body_var$14))(Maybe$some(Fm$Term$typ))(_defs$3)(_body_ctx$15)(Fm$MPath$i(_path$5))(_orig$6))((_$17 => Monad$pure(Fm$Check$monad)(Fm$Term$typ)))))
                })();
            case 'Fm.Term.lam':
                var $1785 = self.name;
                var $1786 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1787 = self.value;
                            return (() => {
                                var _typv$10 = Fm$Term$reduce($1787)(_defs$3);
                                return (() => {
                                    var self = _typv$10;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1788 = self.name;
                                            var $1789 = self.indx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1790 = self.name;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1791 = self.eras;
                                            var $1792 = self.self;
                                            var $1793 = self.name;
                                            var $1794 = self.xtyp;
                                            var $1795 = self.body;
                                            return (() => {
                                                var _ctx_size$16 = List$length(_ctx$4);
                                                var _self_var$17 = _term$1;
                                                var _body_var$18 = Fm$Term$var($1785)(_ctx_size$16);
                                                var _body_typ$19 = $1795(_self_var$17)(_body_var$18);
                                                var _body_ctx$20 = List$cons(Pair$new($1785)($1794))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1786(_body_var$18))(Maybe$some(_body_typ$19))(_defs$3)(_body_ctx$20)(Fm$MPath$o(_path$5))(_orig$6))((_$21 => Monad$pure(Fm$Check$monad)($1787)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1796 = self.name;
                                            var $1797 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1798 = self.func;
                                            var $1799 = self.argm;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1800 = self.name;
                                            var $1801 = self.expr;
                                            var $1802 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1803 = self.name;
                                            var $1804 = self.expr;
                                            var $1805 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1806 = self.done;
                                            var $1807 = self.term;
                                            var $1808 = self.type;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1809 = self.name;
                                            var $1810 = self.dref;
                                            var $1811 = self.verb;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1812 = self.path;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1813 = self.natx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1814 = self.chrx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1815 = self.strx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1816 = self.path;
                                            var $1817 = self.expr;
                                            var $1818 = self.name;
                                            var $1819 = self.with;
                                            var $1820 = self.cses;
                                            var $1821 = self.moti;
                                            return (() => {
                                                var _expected$17 = Either$left("Function");
                                                var _detected$18 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ori':
                                            var $1822 = self.orig;
                                            var $1823 = self.expr;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1787);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1824 = self.func;
                var $1825 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1824)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$o(_path$5))(_orig$6))((_func_typ$9 => (() => {
                    var _func_typ$10 = Fm$Term$reduce(_func_typ$9)(_defs$3);
                    return (() => {
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1826 = self.name;
                                var $1827 = self.indx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1828 = self.name;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.typ':
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.all':
                                var $1829 = self.eras;
                                var $1830 = self.self;
                                var $1831 = self.name;
                                var $1832 = self.xtyp;
                                var $1833 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1825)(Maybe$some($1832))(_defs$3)(_ctx$4)(Fm$MPath$i(_path$5))(_orig$6))((_$16 => Monad$pure(Fm$Check$monad)($1833($1824)($1825))));
                            case 'Fm.Term.lam':
                                var $1834 = self.name;
                                var $1835 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1836 = self.func;
                                var $1837 = self.argm;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $1838 = self.name;
                                var $1839 = self.expr;
                                var $1840 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $1841 = self.name;
                                var $1842 = self.expr;
                                var $1843 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $1844 = self.done;
                                var $1845 = self.term;
                                var $1846 = self.type;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $1847 = self.name;
                                var $1848 = self.dref;
                                var $1849 = self.verb;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $1850 = self.path;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $1851 = self.natx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $1852 = self.chrx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $1853 = self.strx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $1854 = self.path;
                                var $1855 = self.expr;
                                var $1856 = self.name;
                                var $1857 = self.with;
                                var $1858 = self.cses;
                                var $1859 = self.moti;
                                return (() => {
                                    var _expected$17 = Either$left("Function");
                                    var _detected$18 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ori':
                                var $1860 = self.orig;
                                var $1861 = self.expr;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $1862 = self.name;
                var $1863 = self.expr;
                var $1864 = self.body;
                return (() => {
                    var _ctx_size$10 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1863)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$o(_path$5))(_orig$6))((_expr_typ$11 => (() => {
                        var _body_val$12 = $1864(Fm$Term$var($1862)(_ctx_size$10));
                        var _body_ctx$13 = List$cons(Pair$new($1862)(_expr_typ$11))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$12)(_type$2)(_defs$3)(_body_ctx$13)(Fm$MPath$i(_path$5))(_orig$6))((_body_typ$14 => Monad$pure(Fm$Check$monad)(_body_typ$14)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $1865 = self.name;
                var $1866 = self.expr;
                var $1867 = self.body;
                return Fm$Term$check($1867($1866))(_type$2)(_defs$3)(_ctx$4)(_path$5)(_orig$6);
            case 'Fm.Term.ann':
                var $1868 = self.done;
                var $1869 = self.term;
                var $1870 = self.type;
                return (() => {
                    var self = $1868;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1870);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($1869)(Maybe$some($1870))(_defs$3)(_ctx$4)(Fm$MPath$o(_path$5))(_orig$6))((_$10 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1870)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$i(_path$5))(_orig$6))((_$11 => Monad$pure(Fm$Check$monad)($1870)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $1871 = self.name;
                var $1872 = self.dref;
                var $1873 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($1871)($1872)($1873)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $1874 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $1875 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Nat"));
            case 'Fm.Term.chr':
                var $1876 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Char"));
            case 'Fm.Term.str':
                var $1877 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("String"));
            case 'Fm.Term.cse':
                var $1878 = self.path;
                var $1879 = self.expr;
                var $1880 = self.name;
                var $1881 = self.with;
                var $1882 = self.cses;
                var $1883 = self.moti;
                return (() => {
                    var _expr$13 = $1879;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$13)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$o(_path$5))(_orig$6))((_etyp$14 => (() => {
                        var _dsug$15 = (() => {
                            var self = $1883;
                            switch (self._) {
                                case 'Maybe.none':
                                    return (() => {
                                        var _moti$15 = (() => {
                                            var self = _type$2;
                                            switch (self._) {
                                                case 'Maybe.none':
                                                    return Fm$Term$hol(Bits$e);
                                                case 'Maybe.some':
                                                    var $1884 = self.value;
                                                    return (() => {
                                                        var _size$16 = List$length(_ctx$4);
                                                        var _moti$17 = Fm$SmartMotive$make($1880)($1879)(_etyp$14)($1884)(_size$16)(_defs$3);
                                                        return _moti$17
                                                    })();
                                            }
                                        })();
                                        return Maybe$some(Fm$Term$cse($1878)($1879)($1880)($1881)($1882)(Maybe$some(_moti$15)))
                                    })();
                                case 'Maybe.some':
                                    var $1885 = self.value;
                                    return Fm$Term$desugar_cse($1879)($1880)($1881)($1882)($1885)(_etyp$14)(_defs$3)(_ctx$4);
                            }
                        })();
                        return (() => {
                            var self = _dsug$15;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $1886 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($1886))(List$nil));
                            }
                        })()
                    })()))
                })();
            case 'Fm.Term.ori':
                var $1887 = self.orig;
                var $1888 = self.expr;
                return Fm$Term$check($1888)(_type$2)(_defs$3)(_ctx$4)(_path$5)(Maybe$some($1887));
        }
    })())((_infr$7 => (() => {
        var self = _type$2;
        switch (self._) {
            case 'Maybe.none':
                return Fm$Check$result(Maybe$some(_infr$7))(List$nil);
            case 'Maybe.some':
                var $1889 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1889)(_infr$7)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$9 => (() => {
                    var self = _eqls$9;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1889);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(Either$right($1889))(Either$right(_infr$7))(_ctx$4))(List$nil));
                    }
                })()));
        }
    })()))))))));
    var Fm$Path$nil = (_x$1 => _x$1);
    var Fm$MPath$nil = Maybe$some(Fm$Path$nil);
    var List$is_empty = (_list$2 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return Bool$true;
            case 'List.cons':
                var $1890 = self.head;
                var $1891 = self.tail;
                return Bool$false;
        }
    })());
    var Fm$Term$patch_at = (_path$1 => (_term$2 => (_fn$3 => (() => {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $1892 = self.name;
                var $1893 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1894 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1895 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $1896 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1897 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1898 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.typ':
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1899 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1900 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $1901 = self.eras;
                var $1902 = self.self;
                var $1903 = self.name;
                var $1904 = self.xtyp;
                var $1905 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1906 = self.slice(0, -1);
                            return Fm$Term$all($1901)($1902)($1903)(Fm$Term$patch_at($1906)($1904)(_fn$3))($1905);
                        case 'i':
                            var $1907 = self.slice(0, -1);
                            return Fm$Term$all($1901)($1902)($1903)($1904)((_s$10 => (_x$11 => Fm$Term$patch_at($1907)($1905(_s$10)(_x$11))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $1908 = self.name;
                var $1909 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1910 = self.slice(0, -1);
                            return Fm$Term$lam($1908)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1909(_x$7))(_fn$3)));
                        case 'i':
                            var $1911 = self.slice(0, -1);
                            return Fm$Term$lam($1908)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1909(_x$7))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $1912 = self.func;
                var $1913 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1914 = self.slice(0, -1);
                            return Fm$Term$app(Fm$Term$patch_at($1914)($1912)(_fn$3))($1913);
                        case 'i':
                            var $1915 = self.slice(0, -1);
                            return Fm$Term$app($1912)(Fm$Term$patch_at($1915)($1913)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $1916 = self.name;
                var $1917 = self.expr;
                var $1918 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1919 = self.slice(0, -1);
                            return Fm$Term$let($1916)(Fm$Term$patch_at($1919)($1917)(_fn$3))($1918);
                        case 'i':
                            var $1920 = self.slice(0, -1);
                            return Fm$Term$let($1916)($1917)((_x$8 => Fm$Term$patch_at($1920)($1918(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $1921 = self.name;
                var $1922 = self.expr;
                var $1923 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1924 = self.slice(0, -1);
                            return Fm$Term$def($1921)(Fm$Term$patch_at($1924)($1922)(_fn$3))($1923);
                        case 'i':
                            var $1925 = self.slice(0, -1);
                            return Fm$Term$def($1921)($1922)((_x$8 => Fm$Term$patch_at($1925)($1923(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $1926 = self.done;
                var $1927 = self.term;
                var $1928 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1929 = self.slice(0, -1);
                            return Fm$Term$ann($1926)(Fm$Term$patch_at(_path$1)($1927)(_fn$3))($1928);
                        case 'i':
                            var $1930 = self.slice(0, -1);
                            return Fm$Term$ann($1926)(Fm$Term$patch_at(_path$1)($1927)(_fn$3))($1928);
                    }
                })();
            case 'Fm.Term.gol':
                var $1931 = self.name;
                var $1932 = self.dref;
                var $1933 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1934 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1935 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $1936 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1937 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1938 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $1939 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1940 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1941 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $1942 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1943 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1944 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $1945 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1946 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1947 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $1948 = self.path;
                var $1949 = self.expr;
                var $1950 = self.name;
                var $1951 = self.with;
                var $1952 = self.cses;
                var $1953 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return _fn$3(_term$2);
                        case 'o':
                            var $1954 = self.slice(0, -1);
                            return _term$2;
                        case 'i':
                            var $1955 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ori':
                var $1956 = self.orig;
                var $1957 = self.expr;
                return Fm$Term$patch_at(_path$1)($1957)(_fn$3);
        }
    })())));
    var Fm$Synth$fix = (_file$1 => (_code$2 => (_name$3 => (_term$4 => (_type$5 => (_defs$6 => (_errs$7 => (_fixd$8 => (() => {
        var self = _errs$7;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _fixd$8;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _type$9 = Fm$Term$bind(List$nil)((_x$9 => Bits$i(_x$9)))(_type$5);
                                var _term$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$o(_x$10)))(_term$4);
                                var _defs$11 = Fm$set(_name$3)(Fm$Def$new(_file$1)(_code$2)(_name$3)(_term$10)(_type$9)(Fm$Status$init))(_defs$6);
                                return Monad$pure(IO$monad)(Maybe$some(_defs$11))
                            })();
                        case 'false':
                            return Monad$pure(IO$monad)(Maybe$none);
                    }
                })();
            case 'List.cons':
                var $1958 = self.head;
                var $1959 = self.tail;
                return (() => {
                    var self = $1958;
                    switch (self._) {
                        case 'Fm.Error.type_mismatch':
                            var $1960 = self.origin;
                            var $1961 = self.expected;
                            var $1962 = self.detected;
                            var $1963 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1959)(_fixd$8);
                        case 'Fm.Error.show_goal':
                            var $1964 = self.name;
                            var $1965 = self.dref;
                            var $1966 = self.verb;
                            var $1967 = self.goal;
                            var $1968 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1959)(_fixd$8);
                        case 'Fm.Error.waiting':
                            var $1969 = self.name;
                            return Monad$bind(IO$monad)(Fm$Synth$one($1969)(_defs$6))((_defs$12 => Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$12)($1959)(Bool$true)));
                        case 'Fm.Error.indirect':
                            var $1970 = self.name;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1959)(_fixd$8);
                        case 'Fm.Error.patch':
                            var $1971 = self.path;
                            var $1972 = self.term;
                            return (() => {
                                var self = $1971;
                                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                                    case 'e':
                                        return Monad$pure(IO$monad)(Maybe$none);
                                    case 'o':
                                        var $1973 = self.slice(0, -1);
                                        return (() => {
                                            var _term$14 = Fm$Term$patch_at($1973)(_term$4)((_x$14 => $1972));
                                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$14)(_type$5)(_defs$6)($1959)(Bool$true)
                                        })();
                                    case 'i':
                                        var $1974 = self.slice(0, -1);
                                        return (() => {
                                            var _type$14 = Fm$Term$patch_at($1974)(_type$5)((_x$14 => $1972));
                                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$14)(_defs$6)($1959)(Bool$true)
                                        })();
                                }
                            })();
                        case 'Fm.Error.undefined_reference':
                            var $1975 = self.origin;
                            var $1976 = self.name;
                            return Monad$bind(IO$monad)(Fm$Synth$one($1976)(_defs$6))((_defs$13 => Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$13)($1959)(Bool$true)));
                        case 'Fm.Error.cant_infer':
                            var $1977 = self.origin;
                            var $1978 = self.term;
                            var $1979 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1959)(_fixd$8);
                    }
                })();
        }
    })()))))))));
    var Fm$Status$fail = (_errors$1 => ({
        _: 'Fm.Status.fail',
        'errors': _errors$1
    }));
    var Fm$Synth$one = (_name$1 => (_defs$2 => (() => {
        var self = Fm$get(_name$1)(_defs$2);
        switch (self._) {
            case 'Maybe.none':
                return Monad$bind(IO$monad)(Fm$Synth$load(_name$1)(_defs$2))((_loaded$3 => (() => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.none':
                            return Monad$bind(IO$monad)(IO$print(String$flatten(List$cons("Undefined: ")(List$cons(_name$1)(List$nil)))))((_$4 => Monad$pure(IO$monad)(_defs$2)));
                        case 'Maybe.some':
                            var $1980 = self.value;
                            return Fm$Synth$one(_name$1)($1980);
                    }
                })()));
            case 'Maybe.some':
                var $1981 = self.value;
                return (() => {
                    var self = $1981;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $1982 = self.file;
                            var $1983 = self.code;
                            var $1984 = self.name;
                            var $1985 = self.term;
                            var $1986 = self.type;
                            var $1987 = self.stat;
                            return (() => {
                                var _file$10 = $1982;
                                var _code$11 = $1983;
                                var _name$12 = $1984;
                                var _term$13 = $1985;
                                var _type$14 = $1986;
                                var _stat$15 = $1987;
                                return (() => {
                                    var self = _stat$15;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            return (() => {
                                                var _defs$16 = Fm$set(_name$12)(Fm$Def$new(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(Fm$Status$wait))(_defs$2);
                                                var _checked$17 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$14)(Maybe$some(Fm$Term$typ))(_defs$16)(List$nil)(Fm$MPath$i(Fm$MPath$nil))(Maybe$none))((_chk_type$17 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$13)(Maybe$some(_type$14))(_defs$16)(List$nil)(Fm$MPath$o(Fm$MPath$nil))(Maybe$none))((_chk_term$18 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                return (() => {
                                                    var self = _checked$17;
                                                    switch (self._) {
                                                        case 'Fm.Check.result':
                                                            var $1988 = self.value;
                                                            var $1989 = self.errors;
                                                            return (() => {
                                                                var self = List$is_empty($1989);
                                                                switch (self ? 'true' : 'false') {
                                                                    case 'true':
                                                                        return (() => {
                                                                            var _defs$20 = Fm$define(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(Bool$true)(_defs$16);
                                                                            return Monad$pure(IO$monad)(_defs$20)
                                                                        })();
                                                                    case 'false':
                                                                        return Monad$bind(IO$monad)(Fm$Synth$fix(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(_defs$16)($1989)(Bool$false))((_fixed$20 => (() => {
                                                                            var self = _fixed$20;
                                                                            switch (self._) {
                                                                                case 'Maybe.none':
                                                                                    return (() => {
                                                                                        var _stat$21 = Fm$Status$fail($1989);
                                                                                        var _defs$22 = Fm$set(_name$12)(Fm$Def$new(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(_stat$21))(_defs$16);
                                                                                        return Monad$pure(IO$monad)(_defs$22)
                                                                                    })();
                                                                                case 'Maybe.some':
                                                                                    var $1990 = self.value;
                                                                                    return Fm$Synth$one(_name$12)($1990);
                                                                            }
                                                                        })()));
                                                                }
                                                            })();
                                                    }
                                                })()
                                            })();
                                        case 'Fm.Status.wait':
                                            return Monad$pure(IO$monad)(_defs$2);
                                        case 'Fm.Status.done':
                                            return Monad$pure(IO$monad)(_defs$2);
                                        case 'Fm.Status.fail':
                                            var $1991 = self.errors;
                                            return Monad$pure(IO$monad)(_defs$2);
                                    }
                                })()
                            })();
                    }
                })();
        }
    })()));
    var Map$values$go = (_xs$2 => (_list$3 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$3;
            case 'Map.tie':
                var $1992 = self.val;
                var $1993 = self.lft;
                var $1994 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $1992;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $1995 = self.value;
                                return List$cons($1995)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($1993)(_list0$7);
                    var _list2$9 = Map$values$go($1994)(_list1$8);
                    return _list2$9
                })();
        }
    })()));
    var Map$values = (_xs$2 => Map$values$go(_xs$2)(List$nil));
    var Fm$Name$show = (_name$1 => _name$1);
    var Bits$to_nat = (_b$1 => (() => {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return 0n;
            case 'o':
                var $1996 = self.slice(0, -1);
                return (2n * Bits$to_nat($1996));
            case 'i':
                var $1997 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($1997)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $1998 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($1998)));
        }
    })());
    var Fm$escape$char = (_chr$1 => (() => {
        var self = (_chr$1 === Fm$backslash);
        switch (self ? 'true' : 'false') {
            case 'true':
                return String$cons(Fm$backslash)(String$cons(_chr$1)(String$nil));
            case 'false':
                return (() => {
                    var self = (_chr$1 === 34);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return String$cons(Fm$backslash)(String$cons(_chr$1)(String$nil));
                        case 'false':
                            return (() => {
                                var self = (_chr$1 === 39);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return String$cons(Fm$backslash)(String$cons(_chr$1)(String$nil));
                                    case 'false':
                                        return (() => {
                                            var self = U16$btw(32)(_chr$1)(126);
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return String$cons(_chr$1)(String$nil);
                                                case 'false':
                                                    return String$flatten(List$cons(String$cons(Fm$backslash)(String$nil))(List$cons("u{")(List$cons(U16$show_hex(_chr$1))(List$cons("}")(List$cons(String$nil)(List$nil))))));
                                            }
                                        })();
                                }
                            })();
                    }
                })();
        }
    })());
    var Fm$escape = (_str$1 => (() => {
        var self = _str$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return String$nil;
            case 'cons':
                var $1999 = self.charCodeAt(0);
                var $2000 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($1999);
                    var _tail$5 = Fm$escape($2000);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2001 = self.name;
                var $2002 = self.indx;
                return Fm$Name$show($2001);
            case 'Fm.Term.ref':
                var $2003 = self.name;
                return Fm$Name$show($2003);
            case 'Fm.Term.typ':
                return "*";
            case 'Fm.Term.all':
                var $2004 = self.eras;
                var $2005 = self.self;
                var $2006 = self.name;
                var $2007 = self.xtyp;
                var $2008 = self.body;
                return (() => {
                    var _eras$7 = $2004;
                    var _init$8 = (() => {
                        var self = _eras$7;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$9 = Fm$Name$show($2005);
                    var _name$10 = Fm$Name$show($2006);
                    var _xtyp$11 = Fm$Term$core($2007);
                    var _body$12 = Fm$Term$core($2008(Fm$Term$var($2005)(0n))(Fm$Term$var($2006)(0n)));
                    return String$flatten(List$cons(_init$8)(List$cons(_self$9)(List$cons("(")(List$cons(_name$10)(List$cons(":")(List$cons(_xtyp$11)(List$cons(") ")(List$cons(_body$12)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $2009 = self.name;
                var $2010 = self.body;
                return (() => {
                    var _name$4 = Fm$Name$show($2009);
                    var _body$5 = Fm$Term$core($2010(Fm$Term$var($2009)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$4)(List$cons(" ")(List$cons(_body$5)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $2011 = self.func;
                var $2012 = self.argm;
                return (() => {
                    var _func$4 = Fm$Term$core($2011);
                    var _argm$5 = Fm$Term$core($2012);
                    return String$flatten(List$cons("(")(List$cons(_func$4)(List$cons(" ")(List$cons(_argm$5)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $2013 = self.name;
                var $2014 = self.expr;
                var $2015 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($2013);
                    var _expr$6 = Fm$Term$core($2014);
                    var _body$7 = Fm$Term$core($2015(Fm$Term$var($2013)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $2016 = self.name;
                var $2017 = self.expr;
                var $2018 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($2016);
                    var _expr$6 = Fm$Term$core($2017);
                    var _body$7 = Fm$Term$core($2018(Fm$Term$var($2016)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $2019 = self.done;
                var $2020 = self.term;
                var $2021 = self.type;
                return (() => {
                    var _term$5 = Fm$Term$core($2020);
                    var _type$6 = Fm$Term$core($2021);
                    return String$flatten(List$cons("{")(List$cons(_term$5)(List$cons(":")(List$cons(_type$6)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $2022 = self.name;
                var $2023 = self.dref;
                var $2024 = self.verb;
                return "<GOL>";
            case 'Fm.Term.hol':
                var $2025 = self.path;
                return "<HOL>";
            case 'Fm.Term.nat':
                var $2026 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($2026))(List$nil)));
            case 'Fm.Term.chr':
                var $2027 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2027))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $2028 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($2028))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $2029 = self.path;
                var $2030 = self.expr;
                var $2031 = self.name;
                var $2032 = self.with;
                var $2033 = self.cses;
                var $2034 = self.moti;
                return "<CSE>";
            case 'Fm.Term.ori':
                var $2035 = self.orig;
                var $2036 = self.expr;
                return Fm$Term$core($2036);
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_defn$3 => (_result$4 => (() => {
            var self = _defn$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2037 = self.file;
                    var $2038 = self.code;
                    var $2039 = self.name;
                    var $2040 = self.term;
                    var $2041 = self.type;
                    var $2042 = self.stat;
                    return (() => {
                        var self = $2042;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$11 = $2039;
                                    var _term$12 = Fm$Term$core($2040);
                                    var _type$13 = Fm$Term$core($2041);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$11)(List$cons(" : ")(List$cons(_type$13)(List$cons(" = ")(List$cons(_term$12)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $2043 = self.errors;
                                return _result$4;
                        }
                    })();
            }
        })()))));
        return _result$3
    })());
    var Fm$to_core$io$one = (_name$1 => Monad$bind(IO$monad)(Fm$Synth$one(_name$1)(Map$new))((_defs$2 => Monad$pure(IO$monad)(Fm$Defs$core(_defs$2)))));
    var Maybe$bind = (_m$3 => (_f$4 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $2044 = self.value;
                return _f$4($2044);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2045 = self.name;
                var $2046 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $2047 = self.name;
                return (() => {
                    var self = ($2047 === "Nat.zero");
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Maybe$some(0n);
                        case 'false':
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $2048 = self.eras;
                var $2049 = self.self;
                var $2050 = self.name;
                var $2051 = self.xtyp;
                var $2052 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $2053 = self.name;
                var $2054 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $2055 = self.func;
                var $2056 = self.argm;
                return (() => {
                    var self = $2055;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2057 = self.name;
                            var $2058 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $2059 = self.name;
                            return (() => {
                                var self = ($2059 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($2056))((_pred$5 => Monad$pure(Maybe$monad)(Nat$succ(_pred$5))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $2060 = self.eras;
                            var $2061 = self.self;
                            var $2062 = self.name;
                            var $2063 = self.xtyp;
                            var $2064 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $2065 = self.name;
                            var $2066 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $2067 = self.func;
                            var $2068 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $2069 = self.name;
                            var $2070 = self.expr;
                            var $2071 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $2072 = self.name;
                            var $2073 = self.expr;
                            var $2074 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $2075 = self.done;
                            var $2076 = self.term;
                            var $2077 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $2078 = self.name;
                            var $2079 = self.dref;
                            var $2080 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $2081 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $2082 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $2083 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $2084 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $2085 = self.path;
                            var $2086 = self.expr;
                            var $2087 = self.name;
                            var $2088 = self.with;
                            var $2089 = self.cses;
                            var $2090 = self.moti;
                            return Maybe$none;
                        case 'Fm.Term.ori':
                            var $2091 = self.orig;
                            var $2092 = self.expr;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $2093 = self.name;
                var $2094 = self.expr;
                var $2095 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $2096 = self.name;
                var $2097 = self.expr;
                var $2098 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $2099 = self.done;
                var $2100 = self.term;
                var $2101 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $2102 = self.name;
                var $2103 = self.dref;
                var $2104 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $2105 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $2106 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $2107 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $2108 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $2109 = self.path;
                var $2110 = self.expr;
                var $2111 = self.name;
                var $2112 = self.with;
                var $2113 = self.cses;
                var $2114 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $2115 = self.orig;
                var $2116 = self.expr;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2117 = self.name;
                var $2118 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $2119 = self.name;
                return (_name$2 === $2119);
            case 'Fm.Term.typ':
                return Bool$false;
            case 'Fm.Term.all':
                var $2120 = self.eras;
                var $2121 = self.self;
                var $2122 = self.name;
                var $2123 = self.xtyp;
                var $2124 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $2125 = self.name;
                var $2126 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $2127 = self.func;
                var $2128 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $2129 = self.name;
                var $2130 = self.expr;
                var $2131 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $2132 = self.name;
                var $2133 = self.expr;
                var $2134 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $2135 = self.done;
                var $2136 = self.term;
                var $2137 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $2138 = self.name;
                var $2139 = self.dref;
                var $2140 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $2141 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $2142 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $2143 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $2144 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $2145 = self.path;
                var $2146 = self.expr;
                var $2147 = self.name;
                var $2148 = self.with;
                var $2149 = self.cses;
                var $2150 = self.moti;
                return Bool$false;
            case 'Fm.Term.ori':
                var $2151 = self.orig;
                var $2152 = self.expr;
                return Bool$false;
        }
    })()));
    var Nat$eql = a0 => a1 => (a0 === a1);
    var Fm$Term$show$app = _term$1 => _path$2 => _args$3 => {
        var Fm$Term$show$app = _term$1 => _path$2 => _args$3 => ({
            ctr: 'TCO',
            arg: [_term$1, _path$2, _args$3]
        });
        var arg = [_term$1, _path$2, _args$3];
        while (true) {
            let [_term$1, _path$2, _args$3] = arg;
            var R = (() => {
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2153 = self.name;
                        var $2154 = self.indx;
                        return (() => {
                            var _arity$6 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$6 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$8 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$9 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$8)(List$cons(" == ")(List$cons(_eq_rgt$9)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$8 = (() => {
                                                var self = _func$7;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2155 = self.charCodeAt(0);
                                                        var $2156 = self.slice(1);
                                                        return ($2155 === 40);
                                                }
                                            })();
                                            var _args$9 = String$join(",")(_args$3);
                                            var _func$10 = (() => {
                                                var self = _wrap$8;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$7)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$7;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$10)(List$cons("(")(List$cons(_args$9)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.ref':
                        var $2157 = self.name;
                        return (() => {
                            var _arity$5 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$5 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$7 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$8 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$7)(List$cons(" == ")(List$cons(_eq_rgt$8)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$7 = (() => {
                                                var self = _func$6;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2158 = self.charCodeAt(0);
                                                        var $2159 = self.slice(1);
                                                        return ($2158 === 40);
                                                }
                                            })();
                                            var _args$8 = String$join(",")(_args$3);
                                            var _func$9 = (() => {
                                                var self = _wrap$7;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$6)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$6;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$9)(List$cons("(")(List$cons(_args$8)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.typ':
                        return (() => {
                            var _arity$4 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$4 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$5 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$6 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$7 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$6)(List$cons(" == ")(List$cons(_eq_rgt$7)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$5 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$6 = (() => {
                                                var self = _func$5;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2160 = self.charCodeAt(0);
                                                        var $2161 = self.slice(1);
                                                        return ($2160 === 40);
                                                }
                                            })();
                                            var _args$7 = String$join(",")(_args$3);
                                            var _func$8 = (() => {
                                                var self = _wrap$6;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$5)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$5;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$8)(List$cons("(")(List$cons(_args$7)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.all':
                        var $2162 = self.eras;
                        var $2163 = self.self;
                        var $2164 = self.name;
                        var $2165 = self.xtyp;
                        var $2166 = self.body;
                        return (() => {
                            var _arity$9 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$9 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$10 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$11 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$12 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$11)(List$cons(" == ")(List$cons(_eq_rgt$12)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$10 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$11 = (() => {
                                                var self = _func$10;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2167 = self.charCodeAt(0);
                                                        var $2168 = self.slice(1);
                                                        return ($2167 === 40);
                                                }
                                            })();
                                            var _args$12 = String$join(",")(_args$3);
                                            var _func$13 = (() => {
                                                var self = _wrap$11;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$10)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$10;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$13)(List$cons("(")(List$cons(_args$12)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $2169 = self.name;
                        var $2170 = self.body;
                        return (() => {
                            var _arity$6 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$6 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$8 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$9 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$8)(List$cons(" == ")(List$cons(_eq_rgt$9)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$8 = (() => {
                                                var self = _func$7;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2171 = self.charCodeAt(0);
                                                        var $2172 = self.slice(1);
                                                        return ($2171 === 40);
                                                }
                                            })();
                                            var _args$9 = String$join(",")(_args$3);
                                            var _func$10 = (() => {
                                                var self = _wrap$8;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$7)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$7;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$10)(List$cons("(")(List$cons(_args$9)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.app':
                        var $2173 = self.func;
                        var $2174 = self.argm;
                        return (() => {
                            var _argm$6 = Fm$Term$show$go($2174)(Fm$MPath$i(_path$2));
                            return Fm$Term$show$app($2173)(Fm$MPath$o(_path$2))(List$cons(_argm$6)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $2175 = self.name;
                        var $2176 = self.expr;
                        var $2177 = self.body;
                        return (() => {
                            var _arity$7 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$7 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$9 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$10 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$9)(List$cons(" == ")(List$cons(_eq_rgt$10)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$9 = (() => {
                                                var self = _func$8;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2178 = self.charCodeAt(0);
                                                        var $2179 = self.slice(1);
                                                        return ($2178 === 40);
                                                }
                                            })();
                                            var _args$10 = String$join(",")(_args$3);
                                            var _func$11 = (() => {
                                                var self = _wrap$9;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$8)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$8;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$11)(List$cons("(")(List$cons(_args$10)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.def':
                        var $2180 = self.name;
                        var $2181 = self.expr;
                        var $2182 = self.body;
                        return (() => {
                            var _arity$7 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$7 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$9 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$10 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$9)(List$cons(" == ")(List$cons(_eq_rgt$10)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$9 = (() => {
                                                var self = _func$8;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2183 = self.charCodeAt(0);
                                                        var $2184 = self.slice(1);
                                                        return ($2183 === 40);
                                                }
                                            })();
                                            var _args$10 = String$join(",")(_args$3);
                                            var _func$11 = (() => {
                                                var self = _wrap$9;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$8)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$8;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$11)(List$cons("(")(List$cons(_args$10)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.ann':
                        var $2185 = self.done;
                        var $2186 = self.term;
                        var $2187 = self.type;
                        return (() => {
                            var _arity$7 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$7 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$9 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$10 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$9)(List$cons(" == ")(List$cons(_eq_rgt$10)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$9 = (() => {
                                                var self = _func$8;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2188 = self.charCodeAt(0);
                                                        var $2189 = self.slice(1);
                                                        return ($2188 === 40);
                                                }
                                            })();
                                            var _args$10 = String$join(",")(_args$3);
                                            var _func$11 = (() => {
                                                var self = _wrap$9;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$8)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$8;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$11)(List$cons("(")(List$cons(_args$10)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.gol':
                        var $2190 = self.name;
                        var $2191 = self.dref;
                        var $2192 = self.verb;
                        return (() => {
                            var _arity$7 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$7 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$9 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$10 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$9)(List$cons(" == ")(List$cons(_eq_rgt$10)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$8 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$9 = (() => {
                                                var self = _func$8;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2193 = self.charCodeAt(0);
                                                        var $2194 = self.slice(1);
                                                        return ($2193 === 40);
                                                }
                                            })();
                                            var _args$10 = String$join(",")(_args$3);
                                            var _func$11 = (() => {
                                                var self = _wrap$9;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$8)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$8;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$11)(List$cons("(")(List$cons(_args$10)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.hol':
                        var $2195 = self.path;
                        return (() => {
                            var _arity$5 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$5 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$7 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$8 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$7)(List$cons(" == ")(List$cons(_eq_rgt$8)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$7 = (() => {
                                                var self = _func$6;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2196 = self.charCodeAt(0);
                                                        var $2197 = self.slice(1);
                                                        return ($2196 === 40);
                                                }
                                            })();
                                            var _args$8 = String$join(",")(_args$3);
                                            var _func$9 = (() => {
                                                var self = _wrap$7;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$6)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$6;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$9)(List$cons("(")(List$cons(_args$8)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.nat':
                        var $2198 = self.natx;
                        return (() => {
                            var _arity$5 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$5 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$7 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$8 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$7)(List$cons(" == ")(List$cons(_eq_rgt$8)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$7 = (() => {
                                                var self = _func$6;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2199 = self.charCodeAt(0);
                                                        var $2200 = self.slice(1);
                                                        return ($2199 === 40);
                                                }
                                            })();
                                            var _args$8 = String$join(",")(_args$3);
                                            var _func$9 = (() => {
                                                var self = _wrap$7;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$6)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$6;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$9)(List$cons("(")(List$cons(_args$8)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.chr':
                        var $2201 = self.chrx;
                        return (() => {
                            var _arity$5 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$5 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$7 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$8 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$7)(List$cons(" == ")(List$cons(_eq_rgt$8)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$7 = (() => {
                                                var self = _func$6;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2202 = self.charCodeAt(0);
                                                        var $2203 = self.slice(1);
                                                        return ($2202 === 40);
                                                }
                                            })();
                                            var _args$8 = String$join(",")(_args$3);
                                            var _func$9 = (() => {
                                                var self = _wrap$7;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$6)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$6;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$9)(List$cons("(")(List$cons(_args$8)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.str':
                        var $2204 = self.strx;
                        return (() => {
                            var _arity$5 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$5 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$7 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$8 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$7)(List$cons(" == ")(List$cons(_eq_rgt$8)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$6 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$7 = (() => {
                                                var self = _func$6;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2205 = self.charCodeAt(0);
                                                        var $2206 = self.slice(1);
                                                        return ($2205 === 40);
                                                }
                                            })();
                                            var _args$8 = String$join(",")(_args$3);
                                            var _func$9 = (() => {
                                                var self = _wrap$7;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$6)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$6;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$9)(List$cons("(")(List$cons(_args$8)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.cse':
                        var $2207 = self.path;
                        var $2208 = self.expr;
                        var $2209 = self.name;
                        var $2210 = self.with;
                        var $2211 = self.cses;
                        var $2212 = self.moti;
                        return (() => {
                            var _arity$10 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$10 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$11 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$12 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$13 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$12)(List$cons(" == ")(List$cons(_eq_rgt$13)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$11 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$12 = (() => {
                                                var self = _func$11;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2213 = self.charCodeAt(0);
                                                        var $2214 = self.slice(1);
                                                        return ($2213 === 40);
                                                }
                                            })();
                                            var _args$13 = String$join(",")(_args$3);
                                            var _func$14 = (() => {
                                                var self = _wrap$12;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$11)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$11;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$14)(List$cons("(")(List$cons(_args$13)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.ori':
                        var $2215 = self.orig;
                        var $2216 = self.expr;
                        return (() => {
                            var _arity$6 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$6 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$8 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$9 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$8)(List$cons(" == ")(List$cons(_eq_rgt$9)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$7 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$8 = (() => {
                                                var self = _func$7;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2217 = self.charCodeAt(0);
                                                        var $2218 = self.slice(1);
                                                        return ($2217 === 40);
                                                }
                                            })();
                                            var _args$9 = String$join(",")(_args$3);
                                            var _func$10 = (() => {
                                                var self = _wrap$8;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$7)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$7;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$10)(List$cons("(")(List$cons(_args$9)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Map$to_list$go = (_xs$2 => (_key$3 => (_list$4 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$4;
            case 'Map.tie':
                var $2219 = self.val;
                var $2220 = self.lft;
                var $2221 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2219;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2222 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($2222))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($2220)(Bits$o(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($2221)(Bits$i(_key$3))(_list1$9);
                    return _list2$10
                })();
        }
    })())));
    var Map$to_list = (_xs$2 => List$reverse(Map$to_list$go(_xs$2)(Bits$e)(List$nil)));
    var Bits$chunks_of$go = (_len$1 => (_bits$2 => (_need$3 => (_chunk$4 => (() => {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                return List$cons(Bits$reverse(_chunk$4))(List$nil);
            case 'o':
                var $2223 = self.slice(0, -1);
                return (() => {
                    var self = _need$3;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return (() => {
                                var _head$6 = Bits$reverse(_chunk$4);
                                var _tail$7 = Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$e);
                                return List$cons(_head$6)(_tail$7)
                            })();
                        case 'succ':
                            var $2224 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$o(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2223)($2224)(_chunk$7)
                            })();
                    }
                })();
            case 'i':
                var $2225 = self.slice(0, -1);
                return (() => {
                    var self = _need$3;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return (() => {
                                var _head$6 = Bits$reverse(_chunk$4);
                                var _tail$7 = Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$e);
                                return List$cons(_head$6)(_tail$7)
                            })();
                        case 'succ':
                            var $2226 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$i(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2225)($2226)(_chunk$7)
                            })();
                    }
                })();
        }
    })()))));
    var Bits$chunks_of = (_len$1 => (_bits$2 => Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$e)));
    var Word$from_bits = (_size$1 => (_bits$2 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$e;
            case 'succ':
                var $2227 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                        case 'e':
                            return Word$o(Word$from_bits($2227)(Bits$e));
                        case 'o':
                            var $2228 = self.slice(0, -1);
                            return Word$o(Word$from_bits($2227)($2228));
                        case 'i':
                            var $2229 = self.slice(0, -1);
                            return Word$i(Word$from_bits($2227)($2229));
                    }
                })();
        }
    })()));
    var Fm$Name$from_bits = (_bits$1 => (() => {
        var _list$2 = Bits$chunks_of(6n)(_bits$1);
        var _name$3 = List$fold(_list$2)(String$nil)((_bts$3 => (_name$4 => (() => {
            var _u16$5 = U16$new(Word$from_bits(16n)(Bits$reverse(_bts$3)));
            var _chr$6 = (() => {
                var self = U16$btw(0)(_u16$5)(25);
                switch (self ? 'true' : 'false') {
                    case 'true':
                        return ((_u16$5 + 65) & 0xFFFF);
                    case 'false':
                        return (() => {
                            var self = U16$btw(26)(_u16$5)(51);
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return ((_u16$5 + 71) & 0xFFFF);
                                case 'false':
                                    return (() => {
                                        var self = U16$btw(52)(_u16$5)(61);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return (Math.max(_u16$5 - 4, 0));
                                            case 'false':
                                                return (() => {
                                                    var self = (62 === _u16$5);
                                                    switch (self ? 'true' : 'false') {
                                                        case 'true':
                                                            return 46;
                                                        case 'false':
                                                            return 95;
                                                    }
                                                })();
                                        }
                                    })();
                            }
                        })();
                }
            })();
            return String$cons(_chr$6)(_name$4)
        })())));
        return _name$3
    })());
    var Pair$fst = (_pair$3 => (() => {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $2230 = self.fst;
                var $2231 = self.snd;
                return $2230;
        }
    })());
    var Fm$Term$show$go = (_term$1 => (_path$2 => (() => {
        var self = Fm$Term$show$as_nat(_term$1);
        switch (self._) {
            case 'Maybe.none':
                return (() => {
                    var self = _term$1;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2232 = self.name;
                            var $2233 = self.indx;
                            return Fm$Name$show($2232);
                        case 'Fm.Term.ref':
                            var $2234 = self.name;
                            return (() => {
                                var _name$4 = Fm$Name$show($2234);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$4;
                                        case 'Maybe.some':
                                            var $2235 = self.value;
                                            return (() => {
                                                var _path_val$6 = (Bits$i(Bits$e) + Fm$Path$to_bits($2235));
                                                var _path_str$7 = Nat$show(Bits$to_nat(_path_val$6));
                                                return String$flatten(List$cons(_name$4)(List$cons(Fm$color("2")(("-" + _path_str$7)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            return "Type";
                        case 'Fm.Term.all':
                            var $2236 = self.eras;
                            var $2237 = self.self;
                            var $2238 = self.name;
                            var $2239 = self.xtyp;
                            var $2240 = self.body;
                            return (() => {
                                var _eras$8 = $2236;
                                var _self$9 = Fm$Name$show($2237);
                                var _name$10 = Fm$Name$show($2238);
                                var _type$11 = Fm$Term$show$go($2239)(Fm$MPath$o(_path$2));
                                var _open$12 = (() => {
                                    var self = _eras$8;
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return "<";
                                        case 'false':
                                            return "(";
                                    }
                                })();
                                var _clos$13 = (() => {
                                    var self = _eras$8;
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return ">";
                                        case 'false':
                                            return ")";
                                    }
                                })();
                                var _body$14 = Fm$Term$show$go($2240(Fm$Term$var($2237)(0n))(Fm$Term$var($2238)(0n)))(Fm$MPath$i(_path$2));
                                return String$flatten(List$cons(_self$9)(List$cons(_open$12)(List$cons(_name$10)(List$cons(":")(List$cons(_type$11)(List$cons(_clos$13)(List$cons(" ")(List$cons(_body$14)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $2241 = self.name;
                            var $2242 = self.body;
                            return (() => {
                                var _name$5 = Fm$Name$show($2241);
                                var _body$6 = Fm$Term$show$go($2242(Fm$Term$var($2241)(0n)))(Fm$MPath$o(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$5)(List$cons(") ")(List$cons(_body$6)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $2243 = self.func;
                            var $2244 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $2245 = self.name;
                            var $2246 = self.expr;
                            var $2247 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2245);
                                var _expr$7 = Fm$Term$show$go($2246)(Fm$MPath$o(_path$2));
                                var _body$8 = Fm$Term$show$go($2247(Fm$Term$var($2245)(0n)))(Fm$MPath$i(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $2248 = self.name;
                            var $2249 = self.expr;
                            var $2250 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2248);
                                var _expr$7 = Fm$Term$show$go($2249)(Fm$MPath$o(_path$2));
                                var _body$8 = Fm$Term$show$go($2250(Fm$Term$var($2248)(0n)))(Fm$MPath$i(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $2251 = self.done;
                            var $2252 = self.term;
                            var $2253 = self.type;
                            return (() => {
                                var _term$6 = Fm$Term$show$go($2252)(Fm$MPath$o(_path$2));
                                var _type$7 = Fm$Term$show$go($2253)(Fm$MPath$i(_path$2));
                                return String$flatten(List$cons(_term$6)(List$cons("::")(List$cons(_type$7)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $2254 = self.name;
                            var $2255 = self.dref;
                            var $2256 = self.verb;
                            return (() => {
                                var _name$6 = Fm$Name$show($2254);
                                return String$flatten(List$cons("?")(List$cons(_name$6)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $2257 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $2258 = self.natx;
                            return String$flatten(List$cons(Nat$show($2258))(List$nil));
                        case 'Fm.Term.chr':
                            var $2259 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2259))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $2260 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($2260))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $2261 = self.path;
                            var $2262 = self.expr;
                            var $2263 = self.name;
                            var $2264 = self.with;
                            var $2265 = self.cses;
                            var $2266 = self.moti;
                            return (() => {
                                var _expr$9 = Fm$Term$show$go($2262)(Fm$MPath$o(_path$2));
                                var _name$10 = Fm$Name$show($2263);
                                var _wyth$11 = String$join("")(List$mapped($2264)((_defn$11 => (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2267 = self.file;
                                            var $2268 = self.code;
                                            var $2269 = self.name;
                                            var $2270 = self.term;
                                            var $2271 = self.type;
                                            var $2272 = self.stat;
                                            return (() => {
                                                var _name$18 = Fm$Name$show($2269);
                                                var _type$19 = Fm$Term$show$go($2271)(Maybe$none);
                                                var _term$20 = Fm$Term$show$go($2270)(Maybe$none);
                                                return String$flatten(List$cons(_name$18)(List$cons(": ")(List$cons(_type$19)(List$cons(" = ")(List$cons(_term$20)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$12 = Map$to_list($2265);
                                var _cses$13 = String$join("")(List$mapped(_cses$12)((_x$13 => (() => {
                                    var _name$14 = Fm$Name$from_bits(Pair$fst(_x$13));
                                    var _term$15 = Fm$Term$show$go(Pair$snd(_x$13))(Maybe$none);
                                    return String$flatten(List$cons(_name$14)(List$cons(": ")(List$cons(_term$15)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$14 = (() => {
                                    var self = $2266;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return "";
                                        case 'Maybe.some':
                                            var $2273 = self.value;
                                            return String$flatten(List$cons(": ")(List$cons(Fm$Term$show$go($2273)(Maybe$none))(List$nil)));
                                    }
                                })();
                                return String$flatten(List$cons("case ")(List$cons(_expr$9)(List$cons(" as ")(List$cons(_name$10)(List$cons(_wyth$11)(List$cons(" { ")(List$cons(_cses$13)(List$cons("}")(List$cons(_moti$14)(List$nil))))))))))
                            })();
                        case 'Fm.Term.ori':
                            var $2274 = self.orig;
                            var $2275 = self.expr;
                            return Fm$Term$show$go($2275)(_path$2);
                    }
                })();
            case 'Maybe.some':
                var $2276 = self.value;
                return $2276;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Error$relevant = (_errors$1 => (_got$2 => (() => {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $2277 = self.head;
                var $2278 = self.tail;
                return (() => {
                    var _keep$5 = (() => {
                        var self = $2277;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2279 = self.origin;
                                var $2280 = self.expected;
                                var $2281 = self.detected;
                                var $2282 = self.context;
                                return (!_got$2);
                            case 'Fm.Error.show_goal':
                                var $2283 = self.name;
                                var $2284 = self.dref;
                                var $2285 = self.verb;
                                var $2286 = self.goal;
                                var $2287 = self.context;
                                return Bool$true;
                            case 'Fm.Error.waiting':
                                var $2288 = self.name;
                                return Bool$false;
                            case 'Fm.Error.indirect':
                                var $2289 = self.name;
                                return Bool$false;
                            case 'Fm.Error.patch':
                                var $2290 = self.path;
                                var $2291 = self.term;
                                return Bool$false;
                            case 'Fm.Error.undefined_reference':
                                var $2292 = self.origin;
                                var $2293 = self.name;
                                return (!_got$2);
                            case 'Fm.Error.cant_infer':
                                var $2294 = self.origin;
                                var $2295 = self.term;
                                var $2296 = self.context;
                                return (!_got$2);
                        }
                    })();
                    var _got$6 = (() => {
                        var self = $2277;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2297 = self.origin;
                                var $2298 = self.expected;
                                var $2299 = self.detected;
                                var $2300 = self.context;
                                return Bool$true;
                            case 'Fm.Error.show_goal':
                                var $2301 = self.name;
                                var $2302 = self.dref;
                                var $2303 = self.verb;
                                var $2304 = self.goal;
                                var $2305 = self.context;
                                return _got$2;
                            case 'Fm.Error.waiting':
                                var $2306 = self.name;
                                return _got$2;
                            case 'Fm.Error.indirect':
                                var $2307 = self.name;
                                return _got$2;
                            case 'Fm.Error.patch':
                                var $2308 = self.path;
                                var $2309 = self.term;
                                return _got$2;
                            case 'Fm.Error.undefined_reference':
                                var $2310 = self.origin;
                                var $2311 = self.name;
                                return Bool$true;
                            case 'Fm.Error.cant_infer':
                                var $2312 = self.origin;
                                var $2313 = self.term;
                                var $2314 = self.context;
                                return _got$2;
                        }
                    })();
                    var _tail$7 = Fm$Error$relevant($2278)(_got$6);
                    return (() => {
                        var self = _keep$5;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return List$cons($2277)(_tail$7);
                            case 'false':
                                return _tail$7;
                        }
                    })()
                })();
        }
    })()));
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $2315 = self.head;
                var $2316 = self.tail;
                return (() => {
                    var self = $2315;
                    switch (self._) {
                        case 'Pair.new':
                            var $2317 = self.fst;
                            var $2318 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($2317);
                                var _type$7 = Fm$Term$show($2318);
                                var _rest$8 = Fm$Context$show($2316);
                                return String$flatten(List$cons(_rest$8)(List$cons("- ")(List$cons(_name$6)(List$cons(": ")(List$cons(_type$7)(List$cons("\u{a}")(List$nil)))))))
                            })();
                    }
                })();
        }
    })());
    var Fm$Term$expand_at = (_path$1 => (_term$2 => (_defs$3 => Fm$Term$patch_at(_path$1)(_term$2)((_term$4 => (() => {
        var self = _term$4;
        switch (self._) {
            case 'Fm.Term.var':
                var $2319 = self.name;
                var $2320 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $2321 = self.name;
                return (() => {
                    var self = Fm$get($2321)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($2321);
                        case 'Maybe.some':
                            var $2322 = self.value;
                            return (() => {
                                var self = $2322;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $2323 = self.file;
                                        var $2324 = self.code;
                                        var $2325 = self.name;
                                        var $2326 = self.term;
                                        var $2327 = self.type;
                                        var $2328 = self.stat;
                                        return $2326;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$4;
            case 'Fm.Term.all':
                var $2329 = self.eras;
                var $2330 = self.self;
                var $2331 = self.name;
                var $2332 = self.xtyp;
                var $2333 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $2334 = self.name;
                var $2335 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $2336 = self.func;
                var $2337 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $2338 = self.name;
                var $2339 = self.expr;
                var $2340 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $2341 = self.name;
                var $2342 = self.expr;
                var $2343 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $2344 = self.done;
                var $2345 = self.term;
                var $2346 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $2347 = self.name;
                var $2348 = self.dref;
                var $2349 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $2350 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $2351 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $2352 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $2353 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $2354 = self.path;
                var $2355 = self.expr;
                var $2356 = self.name;
                var $2357 = self.with;
                var $2358 = self.cses;
                var $2359 = self.moti;
                return _term$4;
            case 'Fm.Term.ori':
                var $2360 = self.orig;
                var $2361 = self.expr;
                return _term$4;
        }
    })())))));
    var Bool$or = a0 => a1 => (a0 || a1);
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2362 = self.name;
                var $2363 = self.indx;
                return Fm$Term$var($2362)($2363);
            case 'Fm.Term.ref':
                var $2364 = self.name;
                return (() => {
                    var _expand$5 = Bool$false;
                    var _expand$6 = ((($2364 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                    var _expand$7 = ((($2364 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                    var _expand$8 = ((($2364 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($2364 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                    return (() => {
                        var self = _expand$9;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($2364)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($2364);
                                        case 'Maybe.some':
                                            var $2365 = self.value;
                                            return (() => {
                                                var self = $2365;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $2366 = self.file;
                                                        var $2367 = self.code;
                                                        var $2368 = self.name;
                                                        var $2369 = self.term;
                                                        var $2370 = self.type;
                                                        var $2371 = self.stat;
                                                        return $2369;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($2364);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $2372 = self.eras;
                var $2373 = self.self;
                var $2374 = self.name;
                var $2375 = self.xtyp;
                var $2376 = self.body;
                return Fm$Term$all($2372)($2373)($2374)(Fm$Term$expand_ct($2375)(_defs$2)(0n))((_s$9 => (_x$10 => Fm$Term$expand_ct($2376(_s$9)(_x$10))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $2377 = self.name;
                var $2378 = self.body;
                return Fm$Term$lam($2377)((_x$6 => Fm$Term$expand_ct($2378(_x$6))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $2379 = self.func;
                var $2380 = self.argm;
                return Fm$Term$app(Fm$Term$expand_ct($2379)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($2380)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $2381 = self.name;
                var $2382 = self.expr;
                var $2383 = self.body;
                return Fm$Term$let($2381)(Fm$Term$expand_ct($2382)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2383(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $2384 = self.name;
                var $2385 = self.expr;
                var $2386 = self.body;
                return Fm$Term$def($2384)(Fm$Term$expand_ct($2385)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2386(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $2387 = self.done;
                var $2388 = self.term;
                var $2389 = self.type;
                return Fm$Term$ann($2387)(Fm$Term$expand_ct($2388)(_defs$2)(0n))(Fm$Term$expand_ct($2389)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $2390 = self.name;
                var $2391 = self.dref;
                var $2392 = self.verb;
                return Fm$Term$gol($2390)($2391)($2392);
            case 'Fm.Term.hol':
                var $2393 = self.path;
                return Fm$Term$hol($2393);
            case 'Fm.Term.nat':
                var $2394 = self.natx;
                return Fm$Term$nat($2394);
            case 'Fm.Term.chr':
                var $2395 = self.chrx;
                return Fm$Term$chr($2395);
            case 'Fm.Term.str':
                var $2396 = self.strx;
                return Fm$Term$str($2396);
            case 'Fm.Term.cse':
                var $2397 = self.path;
                var $2398 = self.expr;
                var $2399 = self.name;
                var $2400 = self.with;
                var $2401 = self.cses;
                var $2402 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $2403 = self.orig;
                var $2404 = self.expr;
                return Fm$Term$ori($2403)($2404);
        }
    })())));
    var Fm$Term$expand = (_dref$1 => (_term$2 => (_defs$3 => (() => {
        var _term$4 = Fm$Term$normalize(_term$2)(Map$new);
        var _term$5 = (list_for(_dref$1)(_term$4)((_path$5 => (_term$6 => (() => {
            var _term$7 = Fm$Term$expand_at(_path$5)(_term$6)(_defs$3);
            var _term$8 = Fm$Term$normalize(_term$7)(Map$new);
            var _term$9 = Fm$Term$expand_ct(_term$8)(_defs$3)(0n);
            var _term$10 = Fm$Term$normalize(_term$9)(Map$new);
            return _term$10
        })()))));
        return _term$5
    })())));
    var Fm$Error$show = (_error$1 => (_defs$2 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2405 = self.origin;
                var $2406 = self.expected;
                var $2407 = self.detected;
                var $2408 = self.context;
                return (() => {
                    var _expected$7 = (() => {
                        var self = $2406;
                        switch (self._) {
                            case 'Either.left':
                                var $2409 = self.value;
                                return $2409;
                            case 'Either.right':
                                var $2410 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2410)(Map$new));
                        }
                    })();
                    var _detected$8 = (() => {
                        var self = $2407;
                        switch (self._) {
                            case 'Either.left':
                                var $2411 = self.value;
                                return $2411;
                            case 'Either.right':
                                var $2412 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2412)(Map$new));
                        }
                    })();
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$7)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$8)(List$cons("\u{a}")(List$cons((() => {
                        var self = $2408;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2413 = self.head;
                                var $2414 = self.tail;
                                return String$flatten(List$cons("With context:\u{a}")(List$cons(Fm$Context$show($2408))(List$nil)));
                        }
                    })())(List$nil)))))))))
                })();
            case 'Fm.Error.show_goal':
                var $2415 = self.name;
                var $2416 = self.dref;
                var $2417 = self.verb;
                var $2418 = self.goal;
                var $2419 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($2415))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $2418;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $2420 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($2416)($2420)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $2417;
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Fm$Term$show$go(_goal$10)(Maybe$some((_x$11 => _x$11)));
                                            case 'false':
                                                return Fm$Term$show(_goal$10);
                                        }
                                    })())(List$cons("\u{a}")(List$nil))))
                                })();
                        }
                    })();
                    var _with_ctxt$10 = (() => {
                        var self = $2419;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2421 = self.head;
                                var $2422 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($2419))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $2423 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($2423)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $2424 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($2424)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $2425 = self.path;
                var $2426 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($2426))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2427 = self.origin;
                var $2428 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2428))(List$cons("\u{a}")(List$nil))));
            case 'Fm.Error.cant_infer':
                var $2429 = self.origin;
                var $2430 = self.term;
                var $2431 = self.context;
                return (() => {
                    var _term$6 = Fm$Term$show($2430);
                    var _context$7 = Fm$Context$show($2431);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$6)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$7)(List$nil))))))
                })();
        }
    })()));
    var Fm$Error$origin = (_error$1 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2432 = self.origin;
                var $2433 = self.expected;
                var $2434 = self.detected;
                var $2435 = self.context;
                return $2432;
            case 'Fm.Error.show_goal':
                var $2436 = self.name;
                var $2437 = self.dref;
                var $2438 = self.verb;
                var $2439 = self.goal;
                var $2440 = self.context;
                return Maybe$none;
            case 'Fm.Error.waiting':
                var $2441 = self.name;
                return Maybe$none;
            case 'Fm.Error.indirect':
                var $2442 = self.name;
                return Maybe$none;
            case 'Fm.Error.patch':
                var $2443 = self.path;
                var $2444 = self.term;
                return Maybe$none;
            case 'Fm.Error.undefined_reference':
                var $2445 = self.origin;
                var $2446 = self.name;
                return $2445;
            case 'Fm.Error.cant_infer':
                var $2447 = self.origin;
                var $2448 = self.term;
                var $2449 = self.context;
                return $2447;
        }
    })());
    var Fm$Defs$report$go = _defs$1 => _list$2 => _errs$3 => _typs$4 => {
        var Fm$Defs$report$go = _defs$1 => _list$2 => _errs$3 => _typs$4 => ({
            ctr: 'TCO',
            arg: [_defs$1, _list$2, _errs$3, _typs$4]
        });
        var arg = [_defs$1, _list$2, _errs$3, _typs$4];
        while (true) {
            let [_defs$1, _list$2, _errs$3, _typs$4] = arg;
            var R = (() => {
                var self = _list$2;
                switch (self._) {
                    case 'List.nil':
                        return String$flatten(List$cons(_typs$4)(List$cons("\u{a}")(List$cons((() => {
                            var self = _errs$3;
                            switch (self.length === 0 ? 'nil' : 'cons') {
                                case 'nil':
                                    return "All terms check.";
                                case 'cons':
                                    var $2450 = self.charCodeAt(0);
                                    var $2451 = self.slice(1);
                                    return _errs$3;
                            }
                        })())(List$nil))));
                    case 'List.cons':
                        var $2452 = self.head;
                        var $2453 = self.tail;
                        return (() => {
                            var _name$7 = $2452;
                            return (() => {
                                var self = Fm$get(_name$7)(_defs$1);
                                switch (self._) {
                                    case 'Maybe.none':
                                        return Fm$Defs$report$go(_defs$1)($2453)(_errs$3)(_typs$4);
                                    case 'Maybe.some':
                                        var $2454 = self.value;
                                        return (() => {
                                            var self = $2454;
                                            switch (self._) {
                                                case 'Fm.Def.new':
                                                    var $2455 = self.file;
                                                    var $2456 = self.code;
                                                    var $2457 = self.name;
                                                    var $2458 = self.term;
                                                    var $2459 = self.type;
                                                    var $2460 = self.stat;
                                                    return (() => {
                                                        var _typs$15 = String$flatten(List$cons(_typs$4)(List$cons(_name$7)(List$cons(": ")(List$cons(Fm$Term$show($2459))(List$cons("\u{a}")(List$nil))))));
                                                        return (() => {
                                                            var self = $2460;
                                                            switch (self._) {
                                                                case 'Fm.Status.init':
                                                                    return Fm$Defs$report$go(_defs$1)($2453)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.wait':
                                                                    return Fm$Defs$report$go(_defs$1)($2453)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.done':
                                                                    return Fm$Defs$report$go(_defs$1)($2453)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.fail':
                                                                    var $2461 = self.errors;
                                                                    return (() => {
                                                                        var self = $2461;
                                                                        switch (self._) {
                                                                            case 'List.nil':
                                                                                return Fm$Defs$report$go(_defs$1)($2453)(_errs$3)(_typs$15);
                                                                            case 'List.cons':
                                                                                var $2462 = self.head;
                                                                                var $2463 = self.tail;
                                                                                return (() => {
                                                                                    var _name_str$19 = Fm$Name$show($2457);
                                                                                    var _rel_errs$20 = Fm$Error$relevant($2461)(Bool$false);
                                                                                    var _rel_msgs$21 = List$mapped(_rel_errs$20)((_err$21 => String$flatten(List$cons(Fm$Error$show(_err$21)(_defs$1))(List$cons((() => {
                                                                                        var self = Fm$Error$origin(_err$21);
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return "";
                                                                                            case 'Maybe.some':
                                                                                                var $2464 = self.value;
                                                                                                return (() => {
                                                                                                    var self = $2464;
                                                                                                    switch (self._) {
                                                                                                        case 'Fm.Origin.new':
                                                                                                            var $2465 = self.file;
                                                                                                            var $2466 = self.from;
                                                                                                            var $2467 = self.upto;
                                                                                                            return String$flatten(List$cons("Inside \'")(List$cons($2455)(List$cons("\':\u{a}")(List$cons(Fm$highlight($2456)($2466)($2467))(List$cons("\u{a}")(List$nil))))));
                                                                                                    }
                                                                                                })();
                                                                                        }
                                                                                    })())(List$nil)))));
                                                                                    var _errs$22 = String$flatten(List$cons(_errs$3)(List$cons(String$join("\u{a}")(_rel_msgs$21))(List$cons("\u{a}")(List$nil))));
                                                                                    return Fm$Defs$report$go(_defs$1)($2453)(_errs$22)(_typs$15)
                                                                                })();
                                                                        }
                                                                    })();
                                                            }
                                                        })()
                                                    })();
                                            }
                                        })();
                                }
                            })()
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Defs$report = (_defs$1 => (_list$2 => Fm$Defs$report$go(_defs$1)(_list$2)("")("")));
    var Fm$checker$io$one = (_name$1 => Monad$bind(IO$monad)(Fm$Synth$one(_name$1)(Map$new))((_defs$2 => IO$print(Fm$Defs$report(_defs$2)(List$cons(_name$1)(List$nil))))));
    var Map$keys$go = (_xs$2 => (_key$3 => (_list$4 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$4;
            case 'Map.tie':
                var $2468 = self.val;
                var $2469 = self.lft;
                var $2470 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2468;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2471 = self.value;
                                return List$cons(Bits$reverse(_key$3))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$keys$go($2469)(Bits$o(_key$3))(_list0$8);
                    var _list2$10 = Map$keys$go($2470)(Bits$i(_key$3))(_list1$9);
                    return _list2$10
                })();
        }
    })())));
    var Map$keys = (_xs$2 => List$reverse(Map$keys$go(_xs$2)(Bits$e)(List$nil)));
    var Fm$Synth$many = (_names$1 => (_defs$2 => (() => {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                return Monad$pure(IO$monad)(_defs$2);
            case 'List.cons':
                var $2472 = self.head;
                var $2473 = self.tail;
                return Monad$bind(IO$monad)(Fm$Synth$one($2472)(_defs$2))((_defs$5 => Fm$Synth$many($2473)(_defs$5)));
        }
    })()));
    var Fm$Synth$file = (_file$1 => (_defs$2 => Monad$bind(IO$monad)(IO$get_file(_file$1))((_code$3 => (() => {
        var _read$4 = Fm$Defs$read(_file$1)(_code$3)(_defs$2);
        return (() => {
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $2474 = self.value;
                    return Monad$pure(IO$monad)(Either$left($2474));
                case 'Either.right':
                    var $2475 = self.value;
                    return (() => {
                        var _file_defs$6 = $2475;
                        var _file_keys$7 = Map$keys(_file_defs$6);
                        var _file_nams$8 = List$mapped(_file_keys$7)(Fm$Name$from_bits);
                        return Monad$bind(IO$monad)(Fm$Synth$many(_file_nams$8)(_file_defs$6))((_defs$9 => Monad$pure(IO$monad)(Either$right(Pair$new(_file_nams$8)(_defs$9)))))
                    })();
            }
        })()
    })()))));
    var Fm$checker$io$file = (_file$1 => Monad$bind(IO$monad)(Fm$Synth$file(_file$1)(Map$new))((_loaded$2 => (() => {
        var self = _loaded$2;
        switch (self._) {
            case 'Either.left':
                var $2476 = self.value;
                return Monad$bind(IO$monad)(IO$print(String$flatten(List$cons("On \'")(List$cons(_file$1)(List$cons("\':")(List$nil))))))((_$4 => IO$print($2476)));
            case 'Either.right':
                var $2477 = self.value;
                return (() => {
                    var self = $2477;
                    switch (self._) {
                        case 'Pair.new':
                            var $2478 = self.fst;
                            var $2479 = self.snd;
                            return (() => {
                                var _nams$6 = $2478;
                                var _defs$7 = $2479;
                                return IO$print(Fm$Defs$report(_defs$7)(_nams$6))
                            })();
                    }
                })();
        }
    })())));
    var Fm$Term$read = (_code$1 => (() => {
        var self = Fm$Parser$term(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2480 = self.idx;
                var $2481 = self.code;
                var $2482 = self.err;
                return Maybe$none;
            case 'Parser.Reply.value':
                var $2483 = self.idx;
                var $2484 = self.code;
                var $2485 = self.val;
                return Maybe$some($2485);
        }
    })());
    var Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        var __$4 = Fm$Term$read;
        return Fm$checker$io$file("Fm.fm")
    })();
    return {
        '$main$': () => run(Fm),
        'run': run,
        'Monad.bind': Monad$bind,
        'IO': IO,
        'Monad.new': Monad$new,
        'IO.ask': IO$ask,
        'IO.bind': IO$bind,
        'IO.end': IO$end,
        'IO.monad': IO$monad,
        'Map': Map,
        'Maybe': Maybe,
        'Maybe.none': Maybe$none,
        'Map.get': Map$get,
        'Bits.e': Bits$e,
        'Bool.false': Bool$false,
        'Bool.and': Bool$and,
        'Bool.true': Bool$true,
        'Cmp.as_lte': Cmp$as_lte,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Word.cmp.go': Word$cmp$go,
        'Cmp.eql': Cmp$eql,
        'Word.cmp': Word$cmp,
        'Word.lte': Word$lte,
        'Nat.succ': Nat$succ,
        'Nat.zero': Nat$zero,
        'U16.lte': U16$lte,
        'U16.btw': U16$btw,
        'U16.new': U16$new,
        'Word.e': Word$e,
        'Word': Word,
        'Word.i': Word$i,
        'Word.o': Word$o,
        'Word.subber': Word$subber,
        'Word.sub': Word$sub,
        'U16.sub': U16$sub,
        'Nat.apply': Nat$apply,
        'Word.inc': Word$inc,
        'U16.inc': U16$inc,
        'Word.zero': Word$zero,
        'U16.zero': U16$zero,
        'Nat.to_u16': Nat$to_u16,
        'Word.adder': Word$adder,
        'Word.add': Word$add,
        'U16.add': U16$add,
        'Cmp.as_eql': Cmp$as_eql,
        'Word.eql': Word$eql,
        'U16.eql': U16$eql,
        'Bits.o': Bits$o,
        'Bits.i': Bits$i,
        'Word.to_bits': Word$to_bits,
        'Word.trim': Word$trim,
        'Bits.concat': Bits$concat,
        'Bits.reverse.tco': Bits$reverse$tco,
        'Bits.reverse': Bits$reverse,
        'Fm.Name.to_bits': Fm$Name$to_bits,
        'Fm.get': Fm$get,
        'String.cons': String$cons,
        'Fm.Synth.file_of': Fm$Synth$file_of,
        'IO.get_file': IO$get_file,
        'Parser': Parser,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser.bind': Parser$bind,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.pure': Parser$pure,
        'Parser.monad': Parser$monad,
        'Parser.is_eof': Parser$is_eof,
        'Monad.pure': Monad$pure,
        'Maybe.some': Maybe$some,
        'Parser.ErrorAt.new': Parser$ErrorAt$new,
        'Cmp.as_gtn': Cmp$as_gtn,
        'Nat.cmp': Nat$cmp,
        'Nat.gtn': Nat$gtn,
        'Parser.ErrorAt.combine': Parser$ErrorAt$combine,
        'Parser.first_of.go': Parser$first_of$go,
        'Parser.first_of': Parser$first_of,
        'List.cons': List$cons,
        'List': List,
        'List.nil': List$nil,
        'Parser.many.go': Parser$many$go,
        'Parser.many': Parser$many,
        'Unit.new': Unit$new,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'String.nil': String$nil,
        'Parser.text.go': Parser$text$go,
        'Parser.text': Parser$text,
        'Parser.until.go': Parser$until$go,
        'Parser.until': Parser$until,
        'Parser.one': Parser$one,
        'Fm.Parser.spaces': Fm$Parser$spaces,
        'Fm.Parser.text': Fm$Parser$text,
        'Parser.many1': Parser$many1,
        'Fm.Name.is_letter': Fm$Name$is_letter,
        'Fm.Parser.letter': Fm$Parser$letter,
        'List.fold': List$fold,
        'Fm.Parser.name1': Fm$Parser$name1,
        'Fm.Parser.name': Fm$Parser$name,
        'Pair': Pair,
        'Parser.until1': Parser$until1,
        'Parser.maybe': Parser$maybe,
        'Fm.Parser.item': Fm$Parser$item,
        'Parser.get_index': Parser$get_index,
        'Fm.Parser.init': Fm$Parser$init,
        'Fm.Origin.new': Fm$Origin$new,
        'Fm.Parser.stop': Fm$Parser$stop,
        'Fm.Term.ori': Fm$Term$ori,
        'Fm.Term.typ': Fm$Term$typ,
        'Fm.Parser.type': Fm$Parser$type,
        'Fm.Term.all': Fm$Term$all,
        'Fm.Parser.forall': Fm$Parser$forall,
        'Fm.Term.lam': Fm$Term$lam,
        'Fm.Parser.make_lambda': Fm$Parser$make_lambda,
        'Fm.Parser.lambda': Fm$Parser$lambda,
        'Fm.Parser.lambda.erased': Fm$Parser$lambda$erased,
        'Fm.Parser.lambda.nameless': Fm$Parser$lambda$nameless,
        'Fm.Parser.parenthesis': Fm$Parser$parenthesis,
        'Fm.Term.ref': Fm$Term$ref,
        'Fm.Term.app': Fm$Term$app,
        'Fm.Term.hol': Fm$Term$hol,
        'Fm.Term.let': Fm$Term$let,
        'Fm.Parser.letforin': Fm$Parser$letforin,
        'Fm.Parser.let': Fm$Parser$let,
        'Fm.Term.def': Fm$Term$def,
        'Fm.Parser.def': Fm$Parser$def,
        'Fm.Parser.if': Fm$Parser$if,
        'List.mapped': List$mapped,
        'Pair.new': Pair$new,
        'Fm.backslash': Fm$backslash,
        'Fm.escapes': Fm$escapes,
        'Fm.Parser.char.single': Fm$Parser$char$single,
        'Fm.Term.chr': Fm$Term$chr,
        'Fm.Parser.char': Fm$Parser$char,
        'Fm.Term.str': Fm$Term$str,
        'Fm.Parser.string': Fm$Parser$string,
        'Fm.Parser.pair': Fm$Parser$pair,
        'Fm.Name.read': Fm$Name$read,
        'Fm.Parser.list': Fm$Parser$list,
        'Fm.Parser.forin': Fm$Parser$forin,
        'Fm.Parser.do.statements': Fm$Parser$do$statements,
        'Fm.Parser.do': Fm$Parser$do,
        'Fm.Term.nat': Fm$Term$nat,
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.unroll_str': Fm$Term$unroll_str,
        'Fm.Term.reduce': Fm$Term$reduce,
        'Map.new': Map$new,
        'Fm.Def.new': Fm$Def$new,
        'Fm.Status.init': Fm$Status$init,
        'Fm.Parser.case.with': Fm$Parser$case$with,
        'Fm.Parser.case.case': Fm$Parser$case$case,
        'Map.tie': Map$tie,
        'Map.set': Map$set,
        'Map.from_list': Map$from_list,
        'Fm.Term.cse': Fm$Term$cse,
        'Fm.Parser.case': Fm$Parser$case,
        'Parser.digit': Parser$digit,
        'Nat.add': Nat$add,
        'Nat.mul': Nat$mul,
        'Nat.from_base.go': Nat$from_base$go,
        'List.reverse.go': List$reverse$go,
        'List.reverse': List$reverse,
        'Nat.from_base': Nat$from_base,
        'Parser.nat': Parser$nat,
        'Bits.tail': Bits$tail,
        'Bits.inc': Bits$inc,
        'Nat.to_bits': Nat$to_bits,
        'Maybe.to_bool': Maybe$to_bool,
        'Fm.Term.gol': Fm$Term$gol,
        'Fm.Parser.goal': Fm$Parser$goal,
        'Fm.Parser.hole': Fm$Parser$hole,
        'Fm.Parser.nat': Fm$Parser$nat,
        'String.eql': String$eql,
        'Parser.fail': Parser$fail,
        'Fm.Parser.reference': Fm$Parser$reference,
        'List.for': List$for,
        'Fm.Parser.application': Fm$Parser$application,
        'Parser.spaces': Parser$spaces,
        'Parser.spaces_text': Parser$spaces_text,
        'Fm.Parser.application.erased': Fm$Parser$application$erased,
        'Fm.Parser.arrow': Fm$Parser$arrow,
        'Fm.Parser.equality': Fm$Parser$equality,
        'Fm.Term.ann': Fm$Term$ann,
        'Fm.Parser.annotation': Fm$Parser$annotation,
        'Fm.Parser.suffix': Fm$Parser$suffix,
        'Fm.Parser.term': Fm$Parser$term,
        'Fm.Parser.name_term': Fm$Parser$name_term,
        'Fm.Binder.new': Fm$Binder$new,
        'Fm.Parser.binder.homo': Fm$Parser$binder$homo,
        'List.concat': List$concat,
        'List.flatten': List$flatten,
        'Fm.Parser.binder': Fm$Parser$binder,
        'Fm.Parser.make_forall': Fm$Parser$make_forall,
        'List.at': List$at,
        'List.at_last': List$at_last,
        'Fm.Term.var': Fm$Term$var,
        'Pair.snd': Pair$snd,
        'Fm.Name.eql': Fm$Name$eql,
        'Fm.Context.find': Fm$Context$find,
        'List.length.go': List$length$go,
        'List.length': List$length,
        'Fm.Path.o': Fm$Path$o,
        'Fm.Path.i': Fm$Path$i,
        'Fm.Path.to_bits': Fm$Path$to_bits,
        'Fm.Term.bind': Fm$Term$bind,
        'Fm.Status.done': Fm$Status$done,
        'Fm.set': Fm$set,
        'Fm.define': Fm$define,
        'Fm.Parser.file.def': Fm$Parser$file$def,
        'Maybe.default': Maybe$default,
        'Fm.Constructor.new': Fm$Constructor$new,
        'Fm.Parser.constructor': Fm$Parser$constructor,
        'Fm.Datatype.new': Fm$Datatype$new,
        'Fm.Parser.datatype': Fm$Parser$datatype,
        'Fm.Datatype.build_term.motive.go': Fm$Datatype$build_term$motive$go,
        'Fm.Datatype.build_term.motive': Fm$Datatype$build_term$motive,
        'Fm.Datatype.build_term.constructor.go': Fm$Datatype$build_term$constructor$go,
        'Fm.Datatype.build_term.constructor': Fm$Datatype$build_term$constructor,
        'Fm.Datatype.build_term.constructors.go': Fm$Datatype$build_term$constructors$go,
        'Fm.Datatype.build_term.constructors': Fm$Datatype$build_term$constructors,
        'Fm.Datatype.build_term.go': Fm$Datatype$build_term$go,
        'Fm.Datatype.build_term': Fm$Datatype$build_term,
        'Fm.Datatype.build_type.go': Fm$Datatype$build_type$go,
        'Fm.Datatype.build_type': Fm$Datatype$build_type,
        'Fm.Constructor.build_term.opt.go': Fm$Constructor$build_term$opt$go,
        'Fm.Constructor.build_term.opt': Fm$Constructor$build_term$opt,
        'Fm.Constructor.build_term.go': Fm$Constructor$build_term$go,
        'Fm.Constructor.build_term': Fm$Constructor$build_term,
        'Fm.Constructor.build_type.go': Fm$Constructor$build_type$go,
        'Fm.Constructor.build_type': Fm$Constructor$build_type,
        'Fm.Parser.file.adt': Fm$Parser$file$adt,
        'Parser.eof': Parser$eof,
        'Fm.Parser.file.end': Fm$Parser$file$end,
        'Fm.Parser.file': Fm$Parser$file,
        'Either': Either,
        'String.join.go': String$join$go,
        'String.join': String$join,
        'Fm.highlight.end': Fm$highlight$end,
        'Maybe.extract': Maybe$extract,
        'Nat.is_zero': Nat$is_zero,
        'Nat.double': Nat$double,
        'Nat.pred': Nat$pred,
        'List.take': List$take,
        'String.reverse.go': String$reverse$go,
        'String.reverse': String$reverse,
        'String.pad_right': String$pad_right,
        'String.pad_left': String$pad_left,
        'Either.left': Either$left,
        'Either.right': Either$right,
        'Nat.sub_rem': Nat$sub_rem,
        'Nat.div_mod.go': Nat$div_mod$go,
        'Nat.div_mod': Nat$div_mod,
        'Nat.to_base.go': Nat$to_base$go,
        'Nat.to_base': Nat$to_base,
        'Nat.mod': Nat$mod,
        'Nat.lte': Nat$lte,
        'Nat.show_digit': Nat$show_digit,
        'Nat.to_string_base': Nat$to_string_base,
        'Nat.show': Nat$show,
        'Bool.not': Bool$not,
        'Fm.color': Fm$color,
        'Fm.highlight.tc': Fm$highlight$tc,
        'Fm.highlight': Fm$highlight,
        'Fm.Defs.read': Fm$Defs$read,
        'Fm.Synth.load': Fm$Synth$load,
        'IO.print': IO$print,
        'Fm.Status.wait': Fm$Status$wait,
        'Fm.Check': Fm$Check,
        'Fm.Check.result': Fm$Check$result,
        'Fm.Check.bind': Fm$Check$bind,
        'Fm.Check.pure': Fm$Check$pure,
        'Fm.Check.monad': Fm$Check$monad,
        'Fm.Error.undefined_reference': Fm$Error$undefined_reference,
        'Fm.Error.waiting': Fm$Error$waiting,
        'Fm.Error.indirect': Fm$Error$indirect,
        'Maybe.mapped': Maybe$mapped,
        'Fm.MPath.o': Fm$MPath$o,
        'Fm.MPath.i': Fm$MPath$i,
        'Fm.Error.cant_infer': Fm$Error$cant_infer,
        'Fm.Error.type_mismatch': Fm$Error$type_mismatch,
        'Fm.Error.show_goal': Fm$Error$show_goal,
        'List.tail': List$tail,
        'Fm.SmartMotive.vals.cont': Fm$SmartMotive$vals$cont,
        'Fm.SmartMotive.vals': Fm$SmartMotive$vals,
        'Fm.SmartMotive.nams.cont': Fm$SmartMotive$nams$cont,
        'Fm.SmartMotive.nams': Fm$SmartMotive$nams,
        'List.zip': List$zip,
        'Cmp.as_gte': Cmp$as_gte,
        'Nat.gte': Nat$gte,
        'Nat.sub': Nat$sub,
        'Fm.Term.serialize.name': Fm$Term$serialize$name,
        'Fm.Term.serialize': Fm$Term$serialize,
        'Bits.eql': Bits$eql,
        'Fm.Term.identical': Fm$Term$identical,
        'Fm.SmartMotive.replace': Fm$SmartMotive$replace,
        'Fm.SmartMotive.make': Fm$SmartMotive$make,
        'Fm.Term.desugar_cse.motive': Fm$Term$desugar_cse$motive,
        'String.is_empty': String$is_empty,
        'Fm.Term.desugar_cse.argument': Fm$Term$desugar_cse$argument,
        'Maybe.or': Maybe$or,
        'Fm.Term.desugar_cse.cases': Fm$Term$desugar_cse$cases,
        'Fm.Term.desugar_cse': Fm$Term$desugar_cse,
        'Fm.Error.patch': Fm$Error$patch,
        'Fm.MPath.to_bits': Fm$MPath$to_bits,
        'Set.has': Set$has,
        'Fm.Term.normalize': Fm$Term$normalize,
        'Fm.Term.equal.patch': Fm$Term$equal$patch,
        'Set.set': Set$set,
        'Bool.eql': Bool$eql,
        'Fm.Term.equal': Fm$Term$equal,
        'Set.new': Set$new,
        'Fm.Term.check': Fm$Term$check,
        'Fm.Path.nil': Fm$Path$nil,
        'Fm.MPath.nil': Fm$MPath$nil,
        'List.is_empty': List$is_empty,
        'Fm.Term.patch_at': Fm$Term$patch_at,
        'Fm.Synth.fix': Fm$Synth$fix,
        'Fm.Status.fail': Fm$Status$fail,
        'Fm.Synth.one': Fm$Synth$one,
        'Map.values.go': Map$values$go,
        'Map.values': Map$values,
        'Fm.Name.show': Fm$Name$show,
        'Bits.to_nat': Bits$to_nat,
        'U16.show_hex': U16$show_hex,
        'Fm.escape.char': Fm$escape$char,
        'Fm.escape': Fm$escape,
        'Fm.Term.core': Fm$Term$core,
        'Fm.Defs.core': Fm$Defs$core,
        'Fm.to_core.io.one': Fm$to_core$io$one,
        'Maybe.bind': Maybe$bind,
        'Maybe.monad': Maybe$monad,
        'Fm.Term.show.as_nat.go': Fm$Term$show$as_nat$go,
        'Fm.Term.show.as_nat': Fm$Term$show$as_nat,
        'Fm.Term.show.is_ref': Fm$Term$show$is_ref,
        'Nat.eql': Nat$eql,
        'Fm.Term.show.app': Fm$Term$show$app,
        'Map.to_list.go': Map$to_list$go,
        'Map.to_list': Map$to_list,
        'Bits.chunks_of.go': Bits$chunks_of$go,
        'Bits.chunks_of': Bits$chunks_of,
        'Word.from_bits': Word$from_bits,
        'Fm.Name.from_bits': Fm$Name$from_bits,
        'Pair.fst': Pair$fst,
        'Fm.Term.show.go': Fm$Term$show$go,
        'Fm.Term.show': Fm$Term$show,
        'Fm.Error.relevant': Fm$Error$relevant,
        'Fm.Context.show': Fm$Context$show,
        'Fm.Term.expand_at': Fm$Term$expand_at,
        'Bool.or': Bool$or,
        'Fm.Term.expand_ct': Fm$Term$expand_ct,
        'Fm.Term.expand': Fm$Term$expand,
        'Fm.Error.show': Fm$Error$show,
        'Fm.Error.origin': Fm$Error$origin,
        'Fm.Defs.report.go': Fm$Defs$report$go,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.checker.io.one': Fm$checker$io$one,
        'Map.keys.go': Map$keys$go,
        'Map.keys': Map$keys,
        'Fm.Synth.many': Fm$Synth$many,
        'Fm.Synth.file': Fm$Synth$file,
        'Fm.checker.io.file': Fm$checker$io$file,
        'Fm.Term.read': Fm$Term$read,
        'Fm': Fm,
    };
})();