module.exports = (function() {
    function word_to_u16(w) {
        var u = 0;
        for (var i = 0; i < 16; ++i) {
            u = u | (w._ === 'Word.1' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u16_to_word(u) {
        var w = {
            _: 'Word.nil'
        };
        for (var i = 0; i < 16; ++i) {
            w = {
                _: (u >>> (16 - i - 1)) & 1 ? 'Word.1' : 'Word.0',
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
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return c0;
            case '0':
                var $1 = self.slice(0, -1);
                return c1($1);
            case '1':
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
                switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                    case 'nil':
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
                    case '0':
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
                    case '1':
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
    var Bits$nil = '';
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
            case 'Word.nil':
                return (_b$5 => _c$4);
            case 'Word.0':
                var $23 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $24 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($24)(_c$4));
                        case 'Word.1':
                            var $25 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($25)(Cmp$ltn));
                    }
                })()($23));
            case 'Word.1':
                var $26 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $27 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($27)(Cmp$gtn));
                        case 'Word.1':
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
    var Word$nil = ({
        _: 'Word.nil'
    });
    var Word = (_size$1 => null);
    var Word$1 = (_pred$2 => ({
        _: 'Word.1',
        'pred': _pred$2
    }));
    var Word$0 = (_pred$2 => ({
        _: 'Word.0',
        'pred': _pred$2
    }));
    var Word$subber = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => Word$nil);
            case 'Word.0':
                var $29 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $30 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($30)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($30)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $31 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($31)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($31)(Bool$true));
                                }
                            })());
                    }
                })()($29));
            case 'Word.1':
                var $32 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $33 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($33)(Bool$false));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($33)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $34 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($34)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($34)(Bool$false));
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
            case 'Word.nil':
                return Word$nil;
            case 'Word.0':
                var $36 = self.pred;
                return Word$1($36);
            case 'Word.1':
                var $37 = self.pred;
                return Word$0(Word$inc($37));
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
                return Word$nil;
            case 'succ':
                var $39 = (self - 1n);
                return Word$0(Word$zero($39));
        }
    })());
    var U16$zero = U16$new(Word$zero(16n));
    var Nat$to_u16 = a0 => (Number(a0));
    var Word$adder = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => Word$nil);
            case 'Word.0':
                var $40 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $41 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($41)(Bool$false));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($41)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $42 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($42)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($42)(Bool$false));
                                }
                            })());
                    }
                })()($40));
            case 'Word.1':
                var $43 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $44 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($44)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($44)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $45 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($45)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($45)(Bool$true));
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
    var Bits$0 = (_pred$1 => _pred$1 + '0');
    var Bits$1 = (_pred$1 => _pred$1 + '1');
    var Word$to_bits = (_a$2 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return Bits$nil;
            case 'Word.0':
                var $46 = self.pred;
                return Bits$0(Word$to_bits($46));
            case 'Word.1':
                var $47 = self.pred;
                return Bits$1(Word$to_bits($47));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $48 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.nil':
                            return Word$0(Word$trim($48)(Word$nil));
                        case 'Word.0':
                            var $49 = self.pred;
                            return Word$0(Word$trim($48)($49));
                        case 'Word.1':
                            var $50 = self.pred;
                            return Word$1(Word$trim($48)($50));
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
                switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                    case 'nil':
                        return _r$2;
                    case '0':
                        var $51 = self.slice(0, -1);
                        return Bits$reverse$tco($51)(Bits$0(_r$2));
                    case '1':
                        var $52 = self.slice(0, -1);
                        return Bits$reverse$tco($52)(Bits$1(_r$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$reverse = (_a$1 => Bits$reverse$tco(_a$1)(Bits$nil));
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
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$hol(Bits$nil));
        var _term$16 = Fm$Term$app(_term$15)(_list$8);
        var _term$17 = Fm$Term$app(_term$16)(Fm$Term$hol(Bits$nil));
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
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$lam("")((_x$10 => Fm$Term$hol(Bits$nil))));
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
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$nil));
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$hol(Bits$nil));
        var _term$11 = Fm$Term$app(_term$10)(_val0$3);
        var _term$12 = Fm$Term$app(_term$11)(_val1$5);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$7)(_term$12))
    })()))))))))))))));
    var Fm$Name$read = (_str$1 => _str$1);
    var Fm$Parser$list = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("["))((_$2 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("]"))(Fm$Parser$item(Fm$Parser$term)))((_vals$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => Monad$pure(Parser$monad)(List$fold(_vals$3)(Fm$Term$app(Fm$Term$ref(Fm$Name$read("List.nil")))(Fm$Term$hol(Bits$nil)))((_x$5 => (_xs$6 => (() => {
        var _term$7 = Fm$Term$ref(Fm$Name$read("List.cons"));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$hol(Bits$nil));
        var _term$9 = Fm$Term$app(_term$8)(_x$5);
        var _term$10 = Fm$Term$app(_term$9)(_xs$6);
        return Fm$Term$ori(_orig$4)(_term$10)
    })()))))))))))));
    var Fm$Parser$forin = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("for "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$3 => Monad$bind(Parser$monad)(Fm$Parser$text("in"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$5 => Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$7 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$9 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$10 => (() => {
        var _term$11 = Fm$Term$ref("List.for");
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$hol(Bits$nil));
        var _term$13 = Fm$Term$app(_term$12)(_list$5);
        var _term$14 = Fm$Term$app(_term$13)(Fm$Term$hol(Bits$nil));
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$ref(_name$7));
        var _lamb$16 = Fm$Term$lam(_elem$3)((_i$16 => Fm$Term$lam(_name$7)((_x$17 => _loop$9))));
        var _term$17 = Fm$Term$app(_term$15)(_lamb$16);
        var _term$18 = Fm$Term$let(_name$7)(_term$17)((_x$18 => Fm$Term$ref(_name$7)));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$10)(_term$18))
    })()))))))))))))))))))));
    var Fm$Parser$do$statements = (_monad_name$1 => Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("var "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => (() => {
        var _term$10 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$11 = Fm$Term$app(_term$10)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$hol(Bits$nil));
        var _term$13 = Fm$Term$app(_term$12)(Fm$Term$hol(Bits$nil));
        var _term$14 = Fm$Term$app(_term$13)(_expr$6);
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$lam(_name$4)((_x$15 => _body$8)));
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$9)(_term$15))
    })())))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$9)(Fm$Term$let(_name$4)(_expr$6)((_x$10 => _body$8)))))))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("return "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$4 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$app(Fm$Term$ref("Monad.pure"))(Fm$Term$ref(_monad_name$1));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$nil));
        var _term$10 = Fm$Term$app(_term$9)(_expr$4);
        return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$6)(_term$10))
    })())))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$3 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$app(_term$8)(Fm$Term$hol(Bits$nil));
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$hol(Bits$nil));
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
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Fm$Term$ref(Fm$Name$read("Bits.nil"));
            case '0':
                var $176 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($176));
            case '1':
                var $177 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($177));
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
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
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
            case '0':
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
            case '1':
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
            return Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$11 => Fm$Parser$term))))((_moti$11 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$12 => (() => {
                var _moti$13 = (() => {
                    var self = _moti$11;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$hol(Bits$nil);
                        case 'Maybe.some':
                            var $312 = self.value;
                            return $312;
                    }
                })();
                return Monad$pure(Parser$monad)(Fm$Term$ori(_orig$12)(Fm$Term$cse(Bits$nil)(_expr$4)(_name$6)(_with$7)(_cses$10)(_moti$13)))
            })()))))
        })()))))))
    })()))))))))));
    var Parser$digit = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Not a digit.");
            case 'cons':
                var $313 = self.charCodeAt(0);
                var $314 = self.slice(1);
                return (() => {
                    var _sidx$5 = Nat$succ(_idx$1);
                    return (() => {
                        var self = ($313 === 48);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Parser$Reply$value(_sidx$5)($314)(0n);
                            case 'false':
                                return (() => {
                                    var self = ($313 === 49);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return Parser$Reply$value(_sidx$5)($314)(1n);
                                        case 'false':
                                            return (() => {
                                                var self = ($313 === 50);
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return Parser$Reply$value(_sidx$5)($314)(2n);
                                                    case 'false':
                                                        return (() => {
                                                            var self = ($313 === 51);
                                                            switch (self ? 'true' : 'false') {
                                                                case 'true':
                                                                    return Parser$Reply$value(_sidx$5)($314)(3n);
                                                                case 'false':
                                                                    return (() => {
                                                                        var self = ($313 === 52);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return Parser$Reply$value(_sidx$5)($314)(4n);
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var self = ($313 === 53);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Parser$Reply$value(_sidx$5)($314)(5n);
                                                                                        case 'false':
                                                                                            return (() => {
                                                                                                var self = ($313 === 54);
                                                                                                switch (self ? 'true' : 'false') {
                                                                                                    case 'true':
                                                                                                        return Parser$Reply$value(_sidx$5)($314)(6n);
                                                                                                    case 'false':
                                                                                                        return (() => {
                                                                                                            var self = ($313 === 55);
                                                                                                            switch (self ? 'true' : 'false') {
                                                                                                                case 'true':
                                                                                                                    return Parser$Reply$value(_sidx$5)($314)(7n);
                                                                                                                case 'false':
                                                                                                                    return (() => {
                                                                                                                        var self = ($313 === 56);
                                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                                            case 'true':
                                                                                                                                return Parser$Reply$value(_sidx$5)($314)(8n);
                                                                                                                            case 'false':
                                                                                                                                return (() => {
                                                                                                                                    var self = ($313 === 57);
                                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                                        case 'true':
                                                                                                                                            return Parser$Reply$value(_sidx$5)($314)(9n);
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
                        var $315 = self.head;
                        var $316 = self.tail;
                        return Nat$from_base$go(_b$1)($316)((_b$1 * _p$3))((($315 * _p$3) + _res$4));
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
                        var $317 = self.head;
                        var $318 = self.tail;
                        return List$reverse$go($318)(List$cons($317)(_res$3));
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
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$nil;
            case '0':
                var $319 = self.slice(0, -1);
                return $319;
            case '1':
                var $320 = self.slice(0, -1);
                return $320;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$1(Bits$nil);
            case '0':
                var $321 = self.slice(0, -1);
                return Bits$1($321);
            case '1':
                var $322 = self.slice(0, -1);
                return Bits$0(Bits$inc($322));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $323 = self.value;
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
    var Fm$Parser$hole = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("_"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$ori(_orig$3)(Fm$Term$hol(Bits$nil)))))))));
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
                                            var self = (_name$2 === "then");
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Parser$fail("Reserved keyword.");
                                                case 'false':
                                                    return (() => {
                                                        var self = (_name$2 === "else");
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
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$nil));
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
                            var $324 = self.idx;
                            var $325 = self.code;
                            var $326 = self.err;
                            return Parser$Reply$value(_idx$3)(_code$4)(_term$2);
                        case 'Parser.Reply.value':
                            var $327 = self.idx;
                            var $328 = self.code;
                            var $329 = self.val;
                            return Fm$Parser$suffix(_init$1)($329)($327)($328);
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$term = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$type)(List$cons(Fm$Parser$forall)(List$cons(Fm$Parser$lambda)(List$cons(Fm$Parser$lambda$erased)(List$cons(Fm$Parser$parenthesis)(List$cons(Fm$Parser$letforin)(List$cons(Fm$Parser$let)(List$cons(Fm$Parser$def)(List$cons(Fm$Parser$if)(List$cons(Fm$Parser$char)(List$cons(Fm$Parser$string)(List$cons(Fm$Parser$pair)(List$cons(Fm$Parser$list)(List$cons(Fm$Parser$forin)(List$cons(Fm$Parser$do)(List$cons(Fm$Parser$case)(List$cons(Fm$Parser$goal)(List$cons(Fm$Parser$hole)(List$cons(Fm$Parser$nat)(List$cons(Fm$Parser$reference)(List$nil))))))))))))))))))))))((_term$2 => Fm$Parser$suffix(_init$1)(_term$2)))));
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
                var $330 = self.fst;
                var $331 = self.snd;
                return Fm$Binder$new(_eras$1)($330)($331);
        }
    })()))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $332 = self.head;
                var $333 = self.tail;
                return List$cons($332)(List$concat($333)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $334 = self.head;
                var $335 = self.tail;
                return List$concat($334)(List$flatten($335));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $336 = self.head;
                var $337 = self.tail;
                return (() => {
                    var self = $336;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $338 = self.eras;
                            var $339 = self.name;
                            var $340 = self.term;
                            return Fm$Term$all($338)("")($339)($340)((_s$8 => (_x$9 => Fm$Parser$make_forall($337)(_body$2))));
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
                        var $341 = self.head;
                        var $342 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($341);
                                case 'succ':
                                    var $343 = (self - 1n);
                                    return List$at($343)($342);
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
                var $344 = self.fst;
                var $345 = self.snd;
                return $345;
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
                        var $346 = self.head;
                        var $347 = self.tail;
                        return (() => {
                            var self = $346;
                            switch (self._) {
                                case 'Pair.new':
                                    var $348 = self.fst;
                                    var $349 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($348);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($349);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($347);
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
                        var $350 = self.head;
                        var $351 = self.tail;
                        return List$length$go($351)(Nat$succ(_n$3));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$length = (_xs$2 => List$length$go(_xs$2)(0n));
    var Fm$Path$0 = (_path$1 => (_x$2 => _path$1(Bits$0(_x$2))));
    var Fm$Path$1 = (_path$1 => (_x$2 => _path$1(Bits$1(_x$2))));
    var Fm$Path$to_bits = (_path$1 => _path$1(Bits$nil));
    var Fm$Term$bind = (_vars$1 => (_path$2 => (_term$3 => (() => {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $352 = self.name;
                var $353 = self.indx;
                return (() => {
                    var self = List$at_last($353)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($352)($353);
                        case 'Maybe.some':
                            var $354 = self.value;
                            return Pair$snd($354);
                    }
                })();
            case 'Fm.Term.ref':
                var $355 = self.name;
                return (() => {
                    var self = Fm$Context$find($355)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($355);
                        case 'Maybe.some':
                            var $356 = self.value;
                            return $356;
                    }
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $357 = self.eras;
                var $358 = self.self;
                var $359 = self.name;
                var $360 = self.xtyp;
                var $361 = self.body;
                return (() => {
                    var _vlen$9 = List$length(_vars$1);
                    return Fm$Term$all($357)($358)($359)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($360))((_s$10 => (_x$11 => Fm$Term$bind(List$cons(Pair$new($359)(_x$11))(List$cons(Pair$new($358)(_s$10))(_vars$1)))(Fm$Path$1(_path$2))($361(Fm$Term$var($358)(_vlen$9))(Fm$Term$var($359)(Nat$succ(_vlen$9)))))))
                })();
            case 'Fm.Term.lam':
                var $362 = self.name;
                var $363 = self.body;
                return (() => {
                    var _vlen$6 = List$length(_vars$1);
                    return Fm$Term$lam($362)((_x$7 => Fm$Term$bind(List$cons(Pair$new($362)(_x$7))(_vars$1))(Fm$Path$0(_path$2))($363(Fm$Term$var($362)(_vlen$6)))))
                })();
            case 'Fm.Term.app':
                var $364 = self.func;
                var $365 = self.argm;
                return Fm$Term$app(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($364))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($365));
            case 'Fm.Term.let':
                var $366 = self.name;
                var $367 = self.expr;
                var $368 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$let($366)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($367))((_x$8 => Fm$Term$bind(List$cons(Pair$new($366)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($368(Fm$Term$var($366)(_vlen$7)))))
                })();
            case 'Fm.Term.def':
                var $369 = self.name;
                var $370 = self.expr;
                var $371 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$def($369)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($370))((_x$8 => Fm$Term$bind(List$cons(Pair$new($369)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($371(Fm$Term$var($369)(_vlen$7)))))
                })();
            case 'Fm.Term.ann':
                var $372 = self.done;
                var $373 = self.term;
                var $374 = self.type;
                return Fm$Term$ann($372)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($373))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($374));
            case 'Fm.Term.gol':
                var $375 = self.name;
                var $376 = self.dref;
                var $377 = self.verb;
                return Fm$Term$gol($375)($376)($377);
            case 'Fm.Term.hol':
                var $378 = self.path;
                return Fm$Term$hol(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $379 = self.natx;
                return Fm$Term$nat($379);
            case 'Fm.Term.chr':
                var $380 = self.chrx;
                return Fm$Term$chr($380);
            case 'Fm.Term.str':
                var $381 = self.strx;
                return Fm$Term$str($381);
            case 'Fm.Term.cse':
                var $382 = self.path;
                var $383 = self.expr;
                var $384 = self.name;
                var $385 = self.with;
                var $386 = self.cses;
                var $387 = self.moti;
                return (() => {
                    var _expr$10 = Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($383);
                    var _name$11 = $384;
                    var _wyth$12 = $385;
                    var _cses$13 = $386;
                    var _moti$14 = $387;
                    return Fm$Term$cse(Fm$Path$to_bits(_path$2))(_expr$10)(_name$11)(_wyth$12)(_cses$13)(_moti$14)
                })();
            case 'Fm.Term.ori':
                var $388 = self.orig;
                var $389 = self.expr;
                return Fm$Term$ori($388)(Fm$Term$bind(_vars$1)(_path$2)($389));
        }
    })())));
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$Parser$file$def = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$4 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$5 => (() => {
        var _args$6 = List$flatten(_args$5);
        return Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$9 => (() => {
            var _type$10 = Fm$Parser$make_forall(_args$6)(_type$8);
            var _term$11 = Fm$Parser$make_lambda(List$mapped(_args$6)((_x$11 => (() => {
                var self = _x$11;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $390 = self.eras;
                        var $391 = self.name;
                        var $392 = self.term;
                        return $391;
                }
            })())))(_term$9);
            var _type$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$1(_x$12)))(_type$10);
            var _term$13 = Fm$Term$bind(List$nil)((_x$13 => Bits$0(_x$13)))(_term$11);
            var _defs$14 = Fm$set(_name$4)(Fm$Def$new(_file$1)(_code$2)(_name$4)(_term$13)(_type$12)(Fm$Status$init))(_defs$3);
            return Monad$pure(Parser$monad)(_defs$14)
        })()))))))
    })())))))));
    var Maybe$default = (_a$2 => (_m$3 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return _a$2;
            case 'Maybe.some':
                var $393 = self.value;
                return $393;
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
                            var $394 = self.name;
                            var $395 = self.pars;
                            var $396 = self.inds;
                            var $397 = self.ctrs;
                            return (() => {
                                var _slf$8 = Fm$Term$ref(_name$2);
                                var _slf$9 = (list_for($395)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$app(_slf$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $398 = self.eras;
                                            var $399 = self.name;
                                            var $400 = self.term;
                                            return $399;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($396)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$app(_slf$11)(Fm$Term$ref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $401 = self.eras;
                                            var $402 = self.name;
                                            var $403 = self.term;
                                            return $402;
                                    }
                                })()))))));
                                return Fm$Term$all(Bool$false)("")("")(_slf$10)((_s$11 => (_x$12 => Fm$Term$typ)))
                            })();
                    }
                })();
            case 'List.cons':
                var $404 = self.head;
                var $405 = self.tail;
                return (() => {
                    var self = $404;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $406 = self.eras;
                            var $407 = self.name;
                            var $408 = self.term;
                            return Fm$Term$all($406)("")($407)($408)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($405))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $409 = self.name;
                var $410 = self.pars;
                var $411 = self.inds;
                var $412 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($409)($411);
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
                            var $413 = self.name;
                            var $414 = self.pars;
                            var $415 = self.inds;
                            var $416 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $417 = self.name;
                                        var $418 = self.args;
                                        var $419 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$ref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($419)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$app(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $420 = self.eras;
                                                        var $421 = self.name;
                                                        var $422 = self.term;
                                                        return $422;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($413)(List$cons(Fm$Name$read("."))(List$cons($417)(List$nil))));
                                            var _slf$14 = Fm$Term$ref(_ctr$13);
                                            var _slf$15 = (list_for($414)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$app(_slf$16)(Fm$Term$ref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $423 = self.eras;
                                                        var $424 = self.name;
                                                        var $425 = self.term;
                                                        return $424;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($418)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$app(_slf$17)(Fm$Term$ref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $426 = self.eras;
                                                        var $427 = self.name;
                                                        var $428 = self.term;
                                                        return $427;
                                                }
                                            })()))))));
                                            return Fm$Term$app(_ret$12)(_slf$16)
                                        })();
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $429 = self.head;
                var $430 = self.tail;
                return (() => {
                    var self = $429;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $431 = self.eras;
                            var $432 = self.name;
                            var $433 = self.term;
                            return (() => {
                                var _eras$9 = $431;
                                var _name$10 = $432;
                                var _xtyp$11 = $433;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($430);
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
                var $434 = self.name;
                var $435 = self.args;
                var $436 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($435);
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
                            var $437 = self.name;
                            var $438 = self.pars;
                            var $439 = self.inds;
                            var $440 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$ref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($439)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$app(_ret$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $441 = self.eras;
                                            var $442 = self.name;
                                            var $443 = self.term;
                                            return $442;
                                    }
                                })()))))));
                                return Fm$Term$app(_ret$9)(Fm$Term$ref((_name$2 + ".Self")))
                            })();
                    }
                })();
            case 'List.cons':
                var $444 = self.head;
                var $445 = self.tail;
                return (() => {
                    var self = $444;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $446 = self.name;
                            var $447 = self.args;
                            var $448 = self.inds;
                            return Fm$Term$all(Bool$false)("")($446)(Fm$Datatype$build_term$constructor(_type$1)($444))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($445))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $449 = self.name;
                var $450 = self.pars;
                var $451 = self.inds;
                var $452 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($449)($452);
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
                            var $453 = self.head;
                            var $454 = self.tail;
                            return (() => {
                                var self = $453;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $455 = self.eras;
                                        var $456 = self.name;
                                        var $457 = self.term;
                                        return Fm$Term$lam($456)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($454)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $458 = self.head;
                var $459 = self.tail;
                return (() => {
                    var self = $458;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $460 = self.eras;
                            var $461 = self.name;
                            var $462 = self.term;
                            return Fm$Term$lam($461)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($459)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $463 = self.name;
                var $464 = self.pars;
                var $465 = self.inds;
                var $466 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($463)($464)($465);
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
                            var $467 = self.head;
                            var $468 = self.tail;
                            return (() => {
                                var self = $467;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $469 = self.eras;
                                        var $470 = self.name;
                                        var $471 = self.term;
                                        return Fm$Term$all(Bool$false)("")($470)($471)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($468))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $472 = self.head;
                var $473 = self.tail;
                return (() => {
                    var self = $472;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $474 = self.eras;
                            var $475 = self.name;
                            var $476 = self.term;
                            return Fm$Term$all(Bool$false)("")($475)($476)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($473)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $477 = self.name;
                var $478 = self.pars;
                var $479 = self.inds;
                var $480 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($477)($478)($479);
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
                            var $481 = self.name;
                            var $482 = self.args;
                            var $483 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$ref($481);
                                var _ret$8 = (list_for($482)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$app(_ret$9)(Fm$Term$ref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $484 = self.eras;
                                            var $485 = self.name;
                                            var $486 = self.term;
                                            return $485;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $487 = self.head;
                var $488 = self.tail;
                return (() => {
                    var self = $487;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $489 = self.name;
                            var $490 = self.args;
                            var $491 = self.inds;
                            return Fm$Term$lam($489)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($488)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $492 = self.name;
                var $493 = self.pars;
                var $494 = self.inds;
                var $495 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($495);
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
                            var $496 = self.head;
                            var $497 = self.tail;
                            return (() => {
                                var self = $496;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $498 = self.eras;
                                        var $499 = self.name;
                                        var $500 = self.term;
                                        return Fm$Term$lam($499)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($497)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $501 = self.head;
                var $502 = self.tail;
                return (() => {
                    var self = $501;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $503 = self.eras;
                            var $504 = self.name;
                            var $505 = self.term;
                            return Fm$Term$lam($504)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($502)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $506 = self.name;
                var $507 = self.pars;
                var $508 = self.inds;
                var $509 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $510 = self.name;
                            var $511 = self.args;
                            var $512 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($506)($507)($511);
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
                                        var $513 = self.name;
                                        var $514 = self.pars;
                                        var $515 = self.inds;
                                        var $516 = self.ctrs;
                                        return (() => {
                                            var self = _ctor$2;
                                            switch (self._) {
                                                case 'Fm.Constructor.new':
                                                    var $517 = self.name;
                                                    var $518 = self.args;
                                                    var $519 = self.inds;
                                                    return (() => {
                                                        var _type$13 = Fm$Term$ref(_name$3);
                                                        var _type$14 = (list_for($514)(_type$13)((_var$14 => (_type$15 => Fm$Term$app(_type$15)(Fm$Term$ref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $520 = self.eras;
                                                                    var $521 = self.name;
                                                                    var $522 = self.term;
                                                                    return $521;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($519)(_type$14)((_var$15 => (_type$16 => Fm$Term$app(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $523 = self.eras;
                                                                    var $524 = self.name;
                                                                    var $525 = self.term;
                                                                    return $525;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $526 = self.head;
                            var $527 = self.tail;
                            return (() => {
                                var self = $526;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $528 = self.eras;
                                        var $529 = self.name;
                                        var $530 = self.term;
                                        return Fm$Term$all($528)("")($529)($530)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($527))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $531 = self.head;
                var $532 = self.tail;
                return (() => {
                    var self = $531;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $533 = self.eras;
                            var $534 = self.name;
                            var $535 = self.term;
                            return Fm$Term$all($533)("")($534)($535)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($532)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $536 = self.name;
                var $537 = self.pars;
                var $538 = self.inds;
                var $539 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $540 = self.name;
                            var $541 = self.args;
                            var $542 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($536)($537)($541);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$adt = (_file$1 => (_code$2 => (_defs$3 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$4 => (() => {
        var self = _adt$4;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $543 = self.name;
                var $544 = self.pars;
                var $545 = self.inds;
                var $546 = self.ctrs;
                return (() => {
                    var _term$9 = Fm$Datatype$build_term(_adt$4);
                    var _term$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$1(_x$10)))(_term$9);
                    var _type$11 = Fm$Datatype$build_type(_adt$4);
                    var _type$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$0(_x$12)))(_type$11);
                    var _defs$13 = Fm$set($543)(Fm$Def$new(_file$1)(_code$2)($543)(_term$10)(_type$12)(Fm$Status$init))(_defs$3);
                    var _defs$14 = List$fold($546)(_defs$13)((_ctr$14 => (_defs$15 => (() => {
                        var _typ_name$16 = $543;
                        var _ctr_name$17 = String$flatten(List$cons(_typ_name$16)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $547 = self.name;
                                    var $548 = self.args;
                                    var $549 = self.inds;
                                    return $547;
                            }
                        })())(List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term(_adt$4)(_ctr$14);
                        var _ctr_term$19 = Fm$Term$bind(List$nil)((_x$19 => Bits$1(_x$19)))(_ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type(_adt$4)(_ctr$14);
                        var _ctr_type$21 = Fm$Term$bind(List$nil)((_x$21 => Bits$0(_x$21)))(_ctr_type$20);
                        return Fm$set(_ctr_name$17)(Fm$Def$new(_file$1)(_code$2)(_ctr_name$17)(_ctr_term$19)(_ctr_type$21)(Fm$Status$init))(_defs$15)
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
                var $550 = self.charCodeAt(0);
                var $551 = self.slice(1);
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
                var $552 = self.head;
                var $553 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($552)(List$cons(String$join$go(_sep$1)($553)(Bool$false))(List$nil))));
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
                var $554 = self.value;
                return _f$5($554);
        }
    })())));
    var Nat$is_zero = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Bool$true;
            case 'succ':
                var $555 = (self - 1n);
                return Bool$false;
        }
    })());
    var Nat$double = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $556 = (self - 1n);
                return Nat$succ(Nat$succ(Nat$double($556)));
        }
    })());
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $557 = (self - 1n);
                return $557;
        }
    })());
    var List$take = (_n$2 => (_xs$3 => (() => {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $558 = self.head;
                var $559 = self.tail;
                return (() => {
                    var self = _n$2;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return List$nil;
                        case 'succ':
                            var $560 = (self - 1n);
                            return List$cons($558)(List$take($560)($559));
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
                        var $561 = self.charCodeAt(0);
                        var $562 = self.slice(1);
                        return String$reverse$go($562)(String$cons($561)(_res$2));
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
                var $563 = (self - 1n);
                return (() => {
                    var self = _str$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return String$cons(_chr$2)(String$pad_right($563)(_chr$2)(""));
                        case 'cons':
                            var $564 = self.charCodeAt(0);
                            var $565 = self.slice(1);
                            return String$cons($564)(String$pad_right($563)(_chr$2)($565));
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
                        var $566 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($566));
                                case 'succ':
                                    var $567 = (self - 1n);
                                    return Nat$sub_rem($567)($566);
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
                        var $568 = self.value;
                        return Nat$div_mod$go($568)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $569 = self.value;
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
                        var $570 = self.fst;
                        var $571 = self.snd;
                        return (() => {
                            var self = $570;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($571)(_res$3);
                                case 'succ':
                                    var $572 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($570)(List$cons($571)(_res$3));
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
                                var $573 = self.value;
                                return $573;
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
                        var $574 = self.charCodeAt(0);
                        var $575 = self.slice(1);
                        return (() => {
                            var self = ($574 === 10);
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
                                                                                var $576 = self.value;
                                                                                return Maybe$some(Nat$pred($576));
                                                                        }
                                                                    })();
                                                                case 'succ':
                                                                    var $577 = (self - 1n);
                                                                    return _lft$6;
                                                            }
                                                        })();
                                                        var _ix0$15 = Nat$pred(_ix0$2);
                                                        var _ix1$16 = Nat$pred(_ix1$3);
                                                        var _col$17 = 0n;
                                                        var _row$18 = Nat$succ(_row$5);
                                                        var _res$19 = List$take(_siz$13)(List$cons(String$reverse(_lin$7))(_res$8));
                                                        var _lin$20 = String$reverse(String$flatten(List$cons(String$pad_left(4n)(32)(Nat$show(_row$18)))(List$cons(" | ")(List$nil))));
                                                        return Fm$highlight$tc($575)(_ix0$15)(_ix1$16)(_col$17)(_row$18)(_lft$14)(_lin$20)(_res$19)
                                                    })();
                                            }
                                        })()
                                    })();
                                case 'false':
                                    return (() => {
                                        var _chr$11 = String$cons($574)(String$nil);
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
                                        return Fm$highlight$tc($575)(_ix0$13)(_ix1$14)(_col$15)(_row$5)(_lft$6)(_lin$16)(_res$8)
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
                var $578 = self.idx;
                var $579 = self.code;
                var $580 = self.err;
                return (() => {
                    var _err$7 = $580;
                    var _hig$8 = Fm$highlight(_code$2)($578)(Nat$succ($578));
                    var _str$9 = String$flatten(List$cons(_err$7)(List$cons("\u{a}")(List$cons(_hig$8)(List$nil))));
                    return Either$left(_str$9)
                })();
            case 'Parser.Reply.value':
                var $581 = self.idx;
                var $582 = self.code;
                var $583 = self.val;
                return Either$right($583);
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
                        var $584 = self.value;
                        return Monad$pure(IO$monad)(Maybe$none);
                    case 'Either.right':
                        var $585 = self.value;
                        return (() => {
                            var _defs$7 = $585;
                            return (() => {
                                var self = Fm$get(_name$1)(_defs$7);
                                switch (self._) {
                                    case 'Maybe.none':
                                        return Monad$pure(IO$monad)(Maybe$none);
                                    case 'Maybe.some':
                                        var $586 = self.value;
                                        return Monad$pure(IO$monad)(Maybe$some(_defs$7));
                                }
                            })()
                        })();
                }
            })()
        })()))
    })()));
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
                var $587 = self.value;
                var $588 = self.errors;
                return (() => {
                    var self = $587;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($588);
                        case 'Maybe.some':
                            var $589 = self.value;
                            return (() => {
                                var self = _f$4($589);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $590 = self.value;
                                        var $591 = self.errors;
                                        return Fm$Check$result($590)(List$concat($588)($591));
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
                var $592 = self.value;
                return Maybe$some(_f$4($592));
        }
    })()));
    var Fm$MPath$0 = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$0));
    var Fm$MPath$1 = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$1));
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
    var Fm$Term$desugar_cse$motive = (_wyth$1 => (_moti$2 => (() => {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                return _moti$2;
            case 'List.cons':
                var $593 = self.head;
                var $594 = self.tail;
                return (() => {
                    var self = $593;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $595 = self.file;
                            var $596 = self.code;
                            var $597 = self.name;
                            var $598 = self.term;
                            var $599 = self.type;
                            var $600 = self.stat;
                            return Fm$Term$all(Bool$false)("")($597)($599)((_s$11 => (_x$12 => Fm$Term$desugar_cse$motive($594)(_moti$2))));
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
                var $601 = self.charCodeAt(0);
                var $602 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $603 = self.name;
                var $604 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $605 = self.head;
                            var $606 = self.tail;
                            return (() => {
                                var self = $605;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $607 = self.file;
                                        var $608 = self.code;
                                        var $609 = self.name;
                                        var $610 = self.term;
                                        var $611 = self.type;
                                        var $612 = self.stat;
                                        return Fm$Term$lam($609)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($606)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $613 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $614 = self.head;
                            var $615 = self.tail;
                            return (() => {
                                var self = $614;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $616 = self.file;
                                        var $617 = self.code;
                                        var $618 = self.name;
                                        var $619 = self.term;
                                        var $620 = self.type;
                                        var $621 = self.stat;
                                        return Fm$Term$lam($618)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($615)(_type$3)(_body$4)(_defs$5)));
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
                            var $622 = self.head;
                            var $623 = self.tail;
                            return (() => {
                                var self = $622;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $624 = self.file;
                                        var $625 = self.code;
                                        var $626 = self.name;
                                        var $627 = self.term;
                                        var $628 = self.type;
                                        var $629 = self.stat;
                                        return Fm$Term$lam($626)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($623)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $630 = self.eras;
                var $631 = self.self;
                var $632 = self.name;
                var $633 = self.xtyp;
                var $634 = self.body;
                return Fm$Term$lam((() => {
                    var self = String$is_empty($632);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($632)(List$nil))));
                    }
                })())((_x$11 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($634(Fm$Term$var($631)(0n))(Fm$Term$var($632)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $635 = self.name;
                var $636 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $637 = self.head;
                            var $638 = self.tail;
                            return (() => {
                                var self = $637;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $639 = self.file;
                                        var $640 = self.code;
                                        var $641 = self.name;
                                        var $642 = self.term;
                                        var $643 = self.type;
                                        var $644 = self.stat;
                                        return Fm$Term$lam($641)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($638)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $645 = self.func;
                var $646 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $647 = self.head;
                            var $648 = self.tail;
                            return (() => {
                                var self = $647;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $649 = self.file;
                                        var $650 = self.code;
                                        var $651 = self.name;
                                        var $652 = self.term;
                                        var $653 = self.type;
                                        var $654 = self.stat;
                                        return Fm$Term$lam($651)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($648)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $655 = self.name;
                var $656 = self.expr;
                var $657 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $658 = self.head;
                            var $659 = self.tail;
                            return (() => {
                                var self = $658;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $660 = self.file;
                                        var $661 = self.code;
                                        var $662 = self.name;
                                        var $663 = self.term;
                                        var $664 = self.type;
                                        var $665 = self.stat;
                                        return Fm$Term$lam($662)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($659)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $666 = self.name;
                var $667 = self.expr;
                var $668 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $669 = self.head;
                            var $670 = self.tail;
                            return (() => {
                                var self = $669;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $671 = self.file;
                                        var $672 = self.code;
                                        var $673 = self.name;
                                        var $674 = self.term;
                                        var $675 = self.type;
                                        var $676 = self.stat;
                                        return Fm$Term$lam($673)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($670)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $677 = self.done;
                var $678 = self.term;
                var $679 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $680 = self.head;
                            var $681 = self.tail;
                            return (() => {
                                var self = $680;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $682 = self.file;
                                        var $683 = self.code;
                                        var $684 = self.name;
                                        var $685 = self.term;
                                        var $686 = self.type;
                                        var $687 = self.stat;
                                        return Fm$Term$lam($684)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($681)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $688 = self.name;
                var $689 = self.dref;
                var $690 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $691 = self.head;
                            var $692 = self.tail;
                            return (() => {
                                var self = $691;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $693 = self.file;
                                        var $694 = self.code;
                                        var $695 = self.name;
                                        var $696 = self.term;
                                        var $697 = self.type;
                                        var $698 = self.stat;
                                        return Fm$Term$lam($695)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($692)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $699 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $700 = self.head;
                            var $701 = self.tail;
                            return (() => {
                                var self = $700;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $702 = self.file;
                                        var $703 = self.code;
                                        var $704 = self.name;
                                        var $705 = self.term;
                                        var $706 = self.type;
                                        var $707 = self.stat;
                                        return Fm$Term$lam($704)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($701)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $708 = self.natx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $709 = self.head;
                            var $710 = self.tail;
                            return (() => {
                                var self = $709;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $711 = self.file;
                                        var $712 = self.code;
                                        var $713 = self.name;
                                        var $714 = self.term;
                                        var $715 = self.type;
                                        var $716 = self.stat;
                                        return Fm$Term$lam($713)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($710)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $717 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $718 = self.head;
                            var $719 = self.tail;
                            return (() => {
                                var self = $718;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $720 = self.file;
                                        var $721 = self.code;
                                        var $722 = self.name;
                                        var $723 = self.term;
                                        var $724 = self.type;
                                        var $725 = self.stat;
                                        return Fm$Term$lam($722)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($719)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $726 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $727 = self.head;
                            var $728 = self.tail;
                            return (() => {
                                var self = $727;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $729 = self.file;
                                        var $730 = self.code;
                                        var $731 = self.name;
                                        var $732 = self.term;
                                        var $733 = self.type;
                                        var $734 = self.stat;
                                        return Fm$Term$lam($731)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($728)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $735 = self.path;
                var $736 = self.expr;
                var $737 = self.name;
                var $738 = self.with;
                var $739 = self.cses;
                var $740 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $741 = self.head;
                            var $742 = self.tail;
                            return (() => {
                                var self = $741;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $743 = self.file;
                                        var $744 = self.code;
                                        var $745 = self.name;
                                        var $746 = self.term;
                                        var $747 = self.type;
                                        var $748 = self.stat;
                                        return Fm$Term$lam($745)((_x$20 => Fm$Term$desugar_cse$argument(_name$1)($742)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ori':
                var $749 = self.orig;
                var $750 = self.expr;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $751 = self.head;
                            var $752 = self.tail;
                            return (() => {
                                var self = $751;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $753 = self.file;
                                        var $754 = self.code;
                                        var $755 = self.name;
                                        var $756 = self.term;
                                        var $757 = self.type;
                                        var $758 = self.stat;
                                        return Fm$Term$lam($755)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($752)(_type$3)(_body$4)(_defs$5)));
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
                var $759 = self.value;
                return Maybe$some($759);
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
                        var $760 = self.name;
                        var $761 = self.indx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $762 = self.file;
                                        var $763 = self.code;
                                        var $764 = self.name;
                                        var $765 = self.term;
                                        var $766 = self.type;
                                        var $767 = self.stat;
                                        return $765;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.ref':
                        var $768 = self.name;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $769 = self.file;
                                        var $770 = self.code;
                                        var $771 = self.name;
                                        var $772 = self.term;
                                        var $773 = self.type;
                                        var $774 = self.stat;
                                        return $772;
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
                                        var $775 = self.file;
                                        var $776 = self.code;
                                        var $777 = self.name;
                                        var $778 = self.term;
                                        var $779 = self.type;
                                        var $780 = self.stat;
                                        return $778;
                                }
                            })())))));
                            return _expr$8
                        })();
                    case 'Fm.Term.all':
                        var $781 = self.eras;
                        var $782 = self.self;
                        var $783 = self.name;
                        var $784 = self.xtyp;
                        var $785 = self.body;
                        return (() => {
                            var _got$13 = Maybe$or(Fm$get($783)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => (() => {
                                                var self = _defn$14;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $786 = self.file;
                                                        var $787 = self.code;
                                                        var $788 = self.name;
                                                        var $789 = self.term;
                                                        var $790 = self.type;
                                                        var $791 = self.stat;
                                                        return Fm$Term$app(_expr$15)($789);
                                                }
                                            })()))));
                                            return _expr$14
                                        })();
                                    case 'Maybe.some':
                                        var $792 = self.value;
                                        return (() => {
                                            var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($784)($792)(_defs$6);
                                            var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                                            var _type$17 = $785(Fm$Term$var($782)(0n))(Fm$Term$var($783)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_wyth$3)(_cses$4)(_type$17)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $793 = self.name;
                        var $794 = self.body;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $795 = self.file;
                                        var $796 = self.code;
                                        var $797 = self.name;
                                        var $798 = self.term;
                                        var $799 = self.type;
                                        var $800 = self.stat;
                                        return $798;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.app':
                        var $801 = self.func;
                        var $802 = self.argm;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $803 = self.file;
                                        var $804 = self.code;
                                        var $805 = self.name;
                                        var $806 = self.term;
                                        var $807 = self.type;
                                        var $808 = self.stat;
                                        return $806;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.let':
                        var $809 = self.name;
                        var $810 = self.expr;
                        var $811 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $812 = self.file;
                                        var $813 = self.code;
                                        var $814 = self.name;
                                        var $815 = self.term;
                                        var $816 = self.type;
                                        var $817 = self.stat;
                                        return $815;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.def':
                        var $818 = self.name;
                        var $819 = self.expr;
                        var $820 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $821 = self.file;
                                        var $822 = self.code;
                                        var $823 = self.name;
                                        var $824 = self.term;
                                        var $825 = self.type;
                                        var $826 = self.stat;
                                        return $824;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ann':
                        var $827 = self.done;
                        var $828 = self.term;
                        var $829 = self.type;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $830 = self.file;
                                        var $831 = self.code;
                                        var $832 = self.name;
                                        var $833 = self.term;
                                        var $834 = self.type;
                                        var $835 = self.stat;
                                        return $833;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.gol':
                        var $836 = self.name;
                        var $837 = self.dref;
                        var $838 = self.verb;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $839 = self.file;
                                        var $840 = self.code;
                                        var $841 = self.name;
                                        var $842 = self.term;
                                        var $843 = self.type;
                                        var $844 = self.stat;
                                        return $842;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.hol':
                        var $845 = self.path;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $846 = self.file;
                                        var $847 = self.code;
                                        var $848 = self.name;
                                        var $849 = self.term;
                                        var $850 = self.type;
                                        var $851 = self.stat;
                                        return $849;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.nat':
                        var $852 = self.natx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $853 = self.file;
                                        var $854 = self.code;
                                        var $855 = self.name;
                                        var $856 = self.term;
                                        var $857 = self.type;
                                        var $858 = self.stat;
                                        return $856;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.chr':
                        var $859 = self.chrx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $860 = self.file;
                                        var $861 = self.code;
                                        var $862 = self.name;
                                        var $863 = self.term;
                                        var $864 = self.type;
                                        var $865 = self.stat;
                                        return $863;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.str':
                        var $866 = self.strx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $867 = self.file;
                                        var $868 = self.code;
                                        var $869 = self.name;
                                        var $870 = self.term;
                                        var $871 = self.type;
                                        var $872 = self.stat;
                                        return $870;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.cse':
                        var $873 = self.path;
                        var $874 = self.expr;
                        var $875 = self.name;
                        var $876 = self.with;
                        var $877 = self.cses;
                        var $878 = self.moti;
                        return (() => {
                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => Fm$Term$app(_expr$15)((() => {
                                var self = _defn$14;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $879 = self.file;
                                        var $880 = self.code;
                                        var $881 = self.name;
                                        var $882 = self.term;
                                        var $883 = self.type;
                                        var $884 = self.stat;
                                        return $882;
                                }
                            })())))));
                            return _expr$14
                        })();
                    case 'Fm.Term.ori':
                        var $885 = self.orig;
                        var $886 = self.expr;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $887 = self.file;
                                        var $888 = self.code;
                                        var $889 = self.name;
                                        var $890 = self.term;
                                        var $891 = self.type;
                                        var $892 = self.stat;
                                        return $890;
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
                var $893 = self.name;
                var $894 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $895 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $896 = self.eras;
                var $897 = self.self;
                var $898 = self.name;
                var $899 = self.xtyp;
                var $900 = self.body;
                return (() => {
                    var _moti$14 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($899)(_moti$14)(_defs$7);
                    var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                    var _type$17 = $900(Fm$Term$var($897)(0n))(Fm$Term$var($898)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_with$3)(_cses$4)(_type$17)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $901 = self.name;
                var $902 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $903 = self.func;
                var $904 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $905 = self.name;
                var $906 = self.expr;
                var $907 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $908 = self.name;
                var $909 = self.expr;
                var $910 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $911 = self.done;
                var $912 = self.term;
                var $913 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $914 = self.name;
                var $915 = self.dref;
                var $916 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $917 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $918 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $919 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $920 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $921 = self.path;
                var $922 = self.expr;
                var $923 = self.name;
                var $924 = self.with;
                var $925 = self.cses;
                var $926 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $927 = self.orig;
                var $928 = self.expr;
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
                return Bits$nil;
            case 'Maybe.some':
                var $929 = self.value;
                return $929(Bits$nil);
        }
    })());
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
                var $930 = self.name;
                var $931 = self.indx;
                return (() => {
                    var self = ($931 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $931 <= 0n ? 0n : _depth$2 - $931)))));
                                return Bits$0(Bits$0(Bits$1(_name$7(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits($931)));
                                return Bits$0(Bits$1(Bits$0(_name$7(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $932 = self.name;
                return (() => {
                    var _name$6 = a1 => (a1 + Fm$Term$serialize$name($932));
                    return Bits$0(Bits$0(Bits$0(_name$6(_x$4))))
                })();
            case 'Fm.Term.typ':
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $933 = self.eras;
                var $934 = self.self;
                var $935 = self.name;
                var $936 = self.xtyp;
                var $937 = self.body;
                return (() => {
                    var _eras$10 = (() => {
                        var self = $933;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$11 = a1 => (a1 + (fm_name_to_bits($934)));
                    var _xtyp$12 = Fm$Term$serialize($936)(_depth$2)(_init$3);
                    var _body$13 = Fm$Term$serialize($937(Fm$Term$var($934)(_depth$2))(Fm$Term$var($935)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $938 = self.name;
                var $939 = self.body;
                return (() => {
                    var _body$7 = Fm$Term$serialize($939(Fm$Term$var($938)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$7(_x$4))))
                })();
            case 'Fm.Term.app':
                var $940 = self.func;
                var $941 = self.argm;
                return (() => {
                    var _func$7 = Fm$Term$serialize($940)(_depth$2)(_init$3);
                    var _argm$8 = Fm$Term$serialize($941)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$7(_argm$8(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $942 = self.name;
                var $943 = self.expr;
                var $944 = self.body;
                return (() => {
                    var _expr$8 = Fm$Term$serialize($943)(_depth$2)(_init$3);
                    var _body$9 = Fm$Term$serialize($944(Fm$Term$var($942)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$8(_body$9(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $945 = self.name;
                var $946 = self.expr;
                var $947 = self.body;
                return Fm$Term$serialize($947($946))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $948 = self.done;
                var $949 = self.term;
                var $950 = self.type;
                return Fm$Term$serialize($949)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $951 = self.name;
                var $952 = self.dref;
                var $953 = self.verb;
                return (() => {
                    var _name$8 = a1 => (a1 + (fm_name_to_bits($951)));
                    return Bits$0(Bits$0(Bits$0(_name$8(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $954 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $955 = self.natx;
                return Fm$Term$serialize(Fm$Term$unroll_nat($955))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.chr':
                var $956 = self.chrx;
                return Fm$Term$serialize(Fm$Term$unroll_chr($956))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.str':
                var $957 = self.strx;
                return Fm$Term$serialize(Fm$Term$unroll_str($957))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $958 = self.path;
                var $959 = self.expr;
                var $960 = self.name;
                var $961 = self.with;
                var $962 = self.cses;
                var $963 = self.moti;
                return _x$4;
            case 'Fm.Term.ori':
                var $964 = self.orig;
                var $965 = self.expr;
                return Fm$Term$serialize($965)(_depth$2)(_init$3)(_x$4);
        }
    })()))));
    var Bits$eql = a0 => a1 => (a1 === a0);
    var Set$has = (_bits$1 => (_set$2 => (() => {
        var self = Map$get(_bits$1)(_set$2);
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $966 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $967 = self.name;
                var $968 = self.indx;
                return Fm$Term$var($967)($968);
            case 'Fm.Term.ref':
                var $969 = self.name;
                return Fm$Term$ref($969);
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $970 = self.eras;
                var $971 = self.self;
                var $972 = self.name;
                var $973 = self.xtyp;
                var $974 = self.body;
                return Fm$Term$all($970)($971)($972)(Fm$Term$normalize($973)(_defs$2))((_s$8 => (_x$9 => Fm$Term$normalize($974(_s$8)(_x$9))(_defs$2))));
            case 'Fm.Term.lam':
                var $975 = self.name;
                var $976 = self.body;
                return Fm$Term$lam($975)((_x$5 => Fm$Term$normalize($976(_x$5))(_defs$2)));
            case 'Fm.Term.app':
                var $977 = self.func;
                var $978 = self.argm;
                return Fm$Term$app(Fm$Term$normalize($977)(_defs$2))(Fm$Term$normalize($978)(_defs$2));
            case 'Fm.Term.let':
                var $979 = self.name;
                var $980 = self.expr;
                var $981 = self.body;
                return Fm$Term$let($979)(Fm$Term$normalize($980)(_defs$2))((_x$6 => Fm$Term$normalize($981(_x$6))(_defs$2)));
            case 'Fm.Term.def':
                var $982 = self.name;
                var $983 = self.expr;
                var $984 = self.body;
                return Fm$Term$def($982)(Fm$Term$normalize($983)(_defs$2))((_x$6 => Fm$Term$normalize($984(_x$6))(_defs$2)));
            case 'Fm.Term.ann':
                var $985 = self.done;
                var $986 = self.term;
                var $987 = self.type;
                return Fm$Term$ann($985)(Fm$Term$normalize($986)(_defs$2))(Fm$Term$normalize($987)(_defs$2));
            case 'Fm.Term.gol':
                var $988 = self.name;
                var $989 = self.dref;
                var $990 = self.verb;
                return Fm$Term$gol($988)($989)($990);
            case 'Fm.Term.hol':
                var $991 = self.path;
                return Fm$Term$hol($991);
            case 'Fm.Term.nat':
                var $992 = self.natx;
                return Fm$Term$nat($992);
            case 'Fm.Term.chr':
                var $993 = self.chrx;
                return Fm$Term$chr($993);
            case 'Fm.Term.str':
                var $994 = self.strx;
                return Fm$Term$str($994);
            case 'Fm.Term.cse':
                var $995 = self.path;
                var $996 = self.expr;
                var $997 = self.name;
                var $998 = self.with;
                var $999 = self.cses;
                var $1000 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $1001 = self.orig;
                var $1002 = self.expr;
                return Fm$Term$normalize($1002)(_defs$2);
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
        var _ah$6 = Fm$Term$serialize(_a$1)(_lv$4)(_lv$4)(Bits$nil);
        var _bh$7 = Fm$Term$serialize(_b$2)(_lv$4)(_lv$4)(Bits$nil);
        return (() => {
            var self = (_bh$7 === _ah$6);
            switch (self ? 'true' : 'false') {
                case 'true':
                    return Monad$pure(Fm$Check$monad)(Bool$true);
                case 'false':
                    return (() => {
                        var _a1$8 = Fm$Term$reduce(_a$1)(_defs$3);
                        var _b1$9 = Fm$Term$reduce(_b$2)(_defs$3);
                        var _ah$10 = Fm$Term$serialize(_a1$8)(_lv$4)(_lv$4)(Bits$nil);
                        var _bh$11 = Fm$Term$serialize(_b1$9)(_lv$4)(_lv$4)(Bits$nil);
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
                                                                var $1003 = self.name;
                                                                var $1004 = self.indx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1005 = self.name;
                                                                            var $1006 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1007 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1008 = self.eras;
                                                                            var $1009 = self.self;
                                                                            var $1010 = self.name;
                                                                            var $1011 = self.xtyp;
                                                                            var $1012 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1013 = self.name;
                                                                            var $1014 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1015 = self.func;
                                                                            var $1016 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1017 = self.name;
                                                                            var $1018 = self.expr;
                                                                            var $1019 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1020 = self.name;
                                                                            var $1021 = self.expr;
                                                                            var $1022 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1023 = self.done;
                                                                            var $1024 = self.term;
                                                                            var $1025 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1026 = self.name;
                                                                            var $1027 = self.dref;
                                                                            var $1028 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1029 = self.path;
                                                                            return Fm$Term$equal$patch($1029)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1030 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1031 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1032 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1033 = self.path;
                                                                            var $1034 = self.expr;
                                                                            var $1035 = self.name;
                                                                            var $1036 = self.with;
                                                                            var $1037 = self.cses;
                                                                            var $1038 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1039 = self.orig;
                                                                            var $1040 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ref':
                                                                var $1041 = self.name;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1042 = self.name;
                                                                            var $1043 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1044 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1045 = self.eras;
                                                                            var $1046 = self.self;
                                                                            var $1047 = self.name;
                                                                            var $1048 = self.xtyp;
                                                                            var $1049 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1050 = self.name;
                                                                            var $1051 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1052 = self.func;
                                                                            var $1053 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1054 = self.name;
                                                                            var $1055 = self.expr;
                                                                            var $1056 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1057 = self.name;
                                                                            var $1058 = self.expr;
                                                                            var $1059 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1060 = self.done;
                                                                            var $1061 = self.term;
                                                                            var $1062 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1063 = self.name;
                                                                            var $1064 = self.dref;
                                                                            var $1065 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1066 = self.path;
                                                                            return Fm$Term$equal$patch($1066)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1067 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1068 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1069 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1070 = self.path;
                                                                            var $1071 = self.expr;
                                                                            var $1072 = self.name;
                                                                            var $1073 = self.with;
                                                                            var $1074 = self.cses;
                                                                            var $1075 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1076 = self.orig;
                                                                            var $1077 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.typ':
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1078 = self.name;
                                                                            var $1079 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1080 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1081 = self.eras;
                                                                            var $1082 = self.self;
                                                                            var $1083 = self.name;
                                                                            var $1084 = self.xtyp;
                                                                            var $1085 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1086 = self.name;
                                                                            var $1087 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1088 = self.func;
                                                                            var $1089 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1090 = self.name;
                                                                            var $1091 = self.expr;
                                                                            var $1092 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1093 = self.name;
                                                                            var $1094 = self.expr;
                                                                            var $1095 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1096 = self.done;
                                                                            var $1097 = self.term;
                                                                            var $1098 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1099 = self.name;
                                                                            var $1100 = self.dref;
                                                                            var $1101 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1102 = self.path;
                                                                            return Fm$Term$equal$patch($1102)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1103 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1104 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1105 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1106 = self.path;
                                                                            var $1107 = self.expr;
                                                                            var $1108 = self.name;
                                                                            var $1109 = self.with;
                                                                            var $1110 = self.cses;
                                                                            var $1111 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1112 = self.orig;
                                                                            var $1113 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.all':
                                                                var $1114 = self.eras;
                                                                var $1115 = self.self;
                                                                var $1116 = self.name;
                                                                var $1117 = self.xtyp;
                                                                var $1118 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1119 = self.name;
                                                                            var $1120 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1121 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1122 = self.eras;
                                                                            var $1123 = self.self;
                                                                            var $1124 = self.name;
                                                                            var $1125 = self.xtyp;
                                                                            var $1126 = self.body;
                                                                            return (() => {
                                                                                var _seen$23 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$24 = $1118(Fm$Term$var($1115)(_lv$4))(Fm$Term$var($1116)(Nat$succ(_lv$4)));
                                                                                var _b1_body$25 = $1126(Fm$Term$var($1123)(_lv$4))(Fm$Term$var($1124)(Nat$succ(_lv$4)));
                                                                                var _eq_self$26 = ($1115 === $1123);
                                                                                var _eq_eras$27 = Bool$eql($1114)($1122);
                                                                                return (() => {
                                                                                    var self = (_eq_self$26 && _eq_eras$27);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1117)($1125)(_defs$3)(_lv$4)(_seen$23))((_eq_type$28 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$24)(_b1_body$25)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$23))((_eq_body$29 => Monad$pure(Fm$Check$monad)((_eq_type$28 && _eq_body$29))))));
                                                                                        case 'false':
                                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                                    }
                                                                                })()
                                                                            })();
                                                                        case 'Fm.Term.lam':
                                                                            var $1127 = self.name;
                                                                            var $1128 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1129 = self.func;
                                                                            var $1130 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1131 = self.name;
                                                                            var $1132 = self.expr;
                                                                            var $1133 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1134 = self.name;
                                                                            var $1135 = self.expr;
                                                                            var $1136 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1137 = self.done;
                                                                            var $1138 = self.term;
                                                                            var $1139 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1140 = self.name;
                                                                            var $1141 = self.dref;
                                                                            var $1142 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1143 = self.path;
                                                                            return Fm$Term$equal$patch($1143)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1144 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1145 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1146 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1147 = self.path;
                                                                            var $1148 = self.expr;
                                                                            var $1149 = self.name;
                                                                            var $1150 = self.with;
                                                                            var $1151 = self.cses;
                                                                            var $1152 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1153 = self.orig;
                                                                            var $1154 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.lam':
                                                                var $1155 = self.name;
                                                                var $1156 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1157 = self.name;
                                                                            var $1158 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1159 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1160 = self.eras;
                                                                            var $1161 = self.self;
                                                                            var $1162 = self.name;
                                                                            var $1163 = self.xtyp;
                                                                            var $1164 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1165 = self.name;
                                                                            var $1166 = self.body;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$18 = $1156(Fm$Term$var($1155)(_lv$4));
                                                                                var _b1_body$19 = $1166(Fm$Term$var($1165)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$20 => Monad$pure(Fm$Check$monad)(_eq_body$20)))
                                                                            })();
                                                                        case 'Fm.Term.app':
                                                                            var $1167 = self.func;
                                                                            var $1168 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1169 = self.name;
                                                                            var $1170 = self.expr;
                                                                            var $1171 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1172 = self.name;
                                                                            var $1173 = self.expr;
                                                                            var $1174 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1175 = self.done;
                                                                            var $1176 = self.term;
                                                                            var $1177 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1178 = self.name;
                                                                            var $1179 = self.dref;
                                                                            var $1180 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1181 = self.path;
                                                                            return Fm$Term$equal$patch($1181)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1182 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1183 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1184 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1185 = self.path;
                                                                            var $1186 = self.expr;
                                                                            var $1187 = self.name;
                                                                            var $1188 = self.with;
                                                                            var $1189 = self.cses;
                                                                            var $1190 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1191 = self.orig;
                                                                            var $1192 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.app':
                                                                var $1193 = self.func;
                                                                var $1194 = self.argm;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1195 = self.name;
                                                                            var $1196 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1197 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1198 = self.eras;
                                                                            var $1199 = self.self;
                                                                            var $1200 = self.name;
                                                                            var $1201 = self.xtyp;
                                                                            var $1202 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1203 = self.name;
                                                                            var $1204 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1205 = self.func;
                                                                            var $1206 = self.argm;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1193)($1205)(_defs$3)(_lv$4)(_seen$17))((_eq_func$18 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1194)($1206)(_defs$3)(_lv$4)(_seen$17))((_eq_argm$19 => Monad$pure(Fm$Check$monad)((_eq_func$18 && _eq_argm$19))))))
                                                                            })();
                                                                        case 'Fm.Term.let':
                                                                            var $1207 = self.name;
                                                                            var $1208 = self.expr;
                                                                            var $1209 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1210 = self.name;
                                                                            var $1211 = self.expr;
                                                                            var $1212 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1213 = self.done;
                                                                            var $1214 = self.term;
                                                                            var $1215 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1216 = self.name;
                                                                            var $1217 = self.dref;
                                                                            var $1218 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1219 = self.path;
                                                                            return Fm$Term$equal$patch($1219)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1220 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1221 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1222 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1223 = self.path;
                                                                            var $1224 = self.expr;
                                                                            var $1225 = self.name;
                                                                            var $1226 = self.with;
                                                                            var $1227 = self.cses;
                                                                            var $1228 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1229 = self.orig;
                                                                            var $1230 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.let':
                                                                var $1231 = self.name;
                                                                var $1232 = self.expr;
                                                                var $1233 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1234 = self.name;
                                                                            var $1235 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1236 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1237 = self.eras;
                                                                            var $1238 = self.self;
                                                                            var $1239 = self.name;
                                                                            var $1240 = self.xtyp;
                                                                            var $1241 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1242 = self.name;
                                                                            var $1243 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1244 = self.func;
                                                                            var $1245 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1246 = self.name;
                                                                            var $1247 = self.expr;
                                                                            var $1248 = self.body;
                                                                            return (() => {
                                                                                var _seen$19 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$20 = $1233(Fm$Term$var($1231)(_lv$4));
                                                                                var _b1_body$21 = $1248(Fm$Term$var($1246)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1232)($1247)(_defs$3)(_lv$4)(_seen$19))((_eq_expr$22 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$20)(_b1_body$21)(_defs$3)(Nat$succ(_lv$4))(_seen$19))((_eq_body$23 => Monad$pure(Fm$Check$monad)((_eq_expr$22 && _eq_body$23))))))
                                                                            })();
                                                                        case 'Fm.Term.def':
                                                                            var $1249 = self.name;
                                                                            var $1250 = self.expr;
                                                                            var $1251 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1252 = self.done;
                                                                            var $1253 = self.term;
                                                                            var $1254 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1255 = self.name;
                                                                            var $1256 = self.dref;
                                                                            var $1257 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1258 = self.path;
                                                                            return Fm$Term$equal$patch($1258)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1259 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1260 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1261 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1262 = self.path;
                                                                            var $1263 = self.expr;
                                                                            var $1264 = self.name;
                                                                            var $1265 = self.with;
                                                                            var $1266 = self.cses;
                                                                            var $1267 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1268 = self.orig;
                                                                            var $1269 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.def':
                                                                var $1270 = self.name;
                                                                var $1271 = self.expr;
                                                                var $1272 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1273 = self.name;
                                                                            var $1274 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1275 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1276 = self.eras;
                                                                            var $1277 = self.self;
                                                                            var $1278 = self.name;
                                                                            var $1279 = self.xtyp;
                                                                            var $1280 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1281 = self.name;
                                                                            var $1282 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1283 = self.func;
                                                                            var $1284 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1285 = self.name;
                                                                            var $1286 = self.expr;
                                                                            var $1287 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1288 = self.name;
                                                                            var $1289 = self.expr;
                                                                            var $1290 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1291 = self.done;
                                                                            var $1292 = self.term;
                                                                            var $1293 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1294 = self.name;
                                                                            var $1295 = self.dref;
                                                                            var $1296 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1297 = self.path;
                                                                            return Fm$Term$equal$patch($1297)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1298 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1299 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1300 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1301 = self.path;
                                                                            var $1302 = self.expr;
                                                                            var $1303 = self.name;
                                                                            var $1304 = self.with;
                                                                            var $1305 = self.cses;
                                                                            var $1306 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1307 = self.orig;
                                                                            var $1308 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ann':
                                                                var $1309 = self.done;
                                                                var $1310 = self.term;
                                                                var $1311 = self.type;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1312 = self.name;
                                                                            var $1313 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1314 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1315 = self.eras;
                                                                            var $1316 = self.self;
                                                                            var $1317 = self.name;
                                                                            var $1318 = self.xtyp;
                                                                            var $1319 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1320 = self.name;
                                                                            var $1321 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1322 = self.func;
                                                                            var $1323 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1324 = self.name;
                                                                            var $1325 = self.expr;
                                                                            var $1326 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1327 = self.name;
                                                                            var $1328 = self.expr;
                                                                            var $1329 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1330 = self.done;
                                                                            var $1331 = self.term;
                                                                            var $1332 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1333 = self.name;
                                                                            var $1334 = self.dref;
                                                                            var $1335 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1336 = self.path;
                                                                            return Fm$Term$equal$patch($1336)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1337 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1338 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1339 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1340 = self.path;
                                                                            var $1341 = self.expr;
                                                                            var $1342 = self.name;
                                                                            var $1343 = self.with;
                                                                            var $1344 = self.cses;
                                                                            var $1345 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1346 = self.orig;
                                                                            var $1347 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.gol':
                                                                var $1348 = self.name;
                                                                var $1349 = self.dref;
                                                                var $1350 = self.verb;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1351 = self.name;
                                                                            var $1352 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1353 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1354 = self.eras;
                                                                            var $1355 = self.self;
                                                                            var $1356 = self.name;
                                                                            var $1357 = self.xtyp;
                                                                            var $1358 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1359 = self.name;
                                                                            var $1360 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1361 = self.func;
                                                                            var $1362 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1363 = self.name;
                                                                            var $1364 = self.expr;
                                                                            var $1365 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1366 = self.name;
                                                                            var $1367 = self.expr;
                                                                            var $1368 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1369 = self.done;
                                                                            var $1370 = self.term;
                                                                            var $1371 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1372 = self.name;
                                                                            var $1373 = self.dref;
                                                                            var $1374 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1375 = self.path;
                                                                            return Fm$Term$equal$patch($1375)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1376 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1377 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1378 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1379 = self.path;
                                                                            var $1380 = self.expr;
                                                                            var $1381 = self.name;
                                                                            var $1382 = self.with;
                                                                            var $1383 = self.cses;
                                                                            var $1384 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1385 = self.orig;
                                                                            var $1386 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.hol':
                                                                var $1387 = self.path;
                                                                return Fm$Term$equal$patch($1387)(_b$2);
                                                            case 'Fm.Term.nat':
                                                                var $1388 = self.natx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1389 = self.name;
                                                                            var $1390 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1391 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1392 = self.eras;
                                                                            var $1393 = self.self;
                                                                            var $1394 = self.name;
                                                                            var $1395 = self.xtyp;
                                                                            var $1396 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1397 = self.name;
                                                                            var $1398 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1399 = self.func;
                                                                            var $1400 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1401 = self.name;
                                                                            var $1402 = self.expr;
                                                                            var $1403 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1404 = self.name;
                                                                            var $1405 = self.expr;
                                                                            var $1406 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1407 = self.done;
                                                                            var $1408 = self.term;
                                                                            var $1409 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1410 = self.name;
                                                                            var $1411 = self.dref;
                                                                            var $1412 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1413 = self.path;
                                                                            return Fm$Term$equal$patch($1413)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1414 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1415 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1416 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1417 = self.path;
                                                                            var $1418 = self.expr;
                                                                            var $1419 = self.name;
                                                                            var $1420 = self.with;
                                                                            var $1421 = self.cses;
                                                                            var $1422 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1423 = self.orig;
                                                                            var $1424 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.chr':
                                                                var $1425 = self.chrx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1426 = self.name;
                                                                            var $1427 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1428 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1429 = self.eras;
                                                                            var $1430 = self.self;
                                                                            var $1431 = self.name;
                                                                            var $1432 = self.xtyp;
                                                                            var $1433 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1434 = self.name;
                                                                            var $1435 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1436 = self.func;
                                                                            var $1437 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1438 = self.name;
                                                                            var $1439 = self.expr;
                                                                            var $1440 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1441 = self.name;
                                                                            var $1442 = self.expr;
                                                                            var $1443 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1444 = self.done;
                                                                            var $1445 = self.term;
                                                                            var $1446 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1447 = self.name;
                                                                            var $1448 = self.dref;
                                                                            var $1449 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1450 = self.path;
                                                                            return Fm$Term$equal$patch($1450)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1451 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1452 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1453 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1454 = self.path;
                                                                            var $1455 = self.expr;
                                                                            var $1456 = self.name;
                                                                            var $1457 = self.with;
                                                                            var $1458 = self.cses;
                                                                            var $1459 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1460 = self.orig;
                                                                            var $1461 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.str':
                                                                var $1462 = self.strx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1463 = self.name;
                                                                            var $1464 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1465 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1466 = self.eras;
                                                                            var $1467 = self.self;
                                                                            var $1468 = self.name;
                                                                            var $1469 = self.xtyp;
                                                                            var $1470 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1471 = self.name;
                                                                            var $1472 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1473 = self.func;
                                                                            var $1474 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1475 = self.name;
                                                                            var $1476 = self.expr;
                                                                            var $1477 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1478 = self.name;
                                                                            var $1479 = self.expr;
                                                                            var $1480 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1481 = self.done;
                                                                            var $1482 = self.term;
                                                                            var $1483 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1484 = self.name;
                                                                            var $1485 = self.dref;
                                                                            var $1486 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1487 = self.path;
                                                                            return Fm$Term$equal$patch($1487)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1488 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1489 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1490 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1491 = self.path;
                                                                            var $1492 = self.expr;
                                                                            var $1493 = self.name;
                                                                            var $1494 = self.with;
                                                                            var $1495 = self.cses;
                                                                            var $1496 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1497 = self.orig;
                                                                            var $1498 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.cse':
                                                                var $1499 = self.path;
                                                                var $1500 = self.expr;
                                                                var $1501 = self.name;
                                                                var $1502 = self.with;
                                                                var $1503 = self.cses;
                                                                var $1504 = self.moti;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1505 = self.name;
                                                                            var $1506 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1507 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1508 = self.eras;
                                                                            var $1509 = self.self;
                                                                            var $1510 = self.name;
                                                                            var $1511 = self.xtyp;
                                                                            var $1512 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1513 = self.name;
                                                                            var $1514 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1515 = self.func;
                                                                            var $1516 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1517 = self.name;
                                                                            var $1518 = self.expr;
                                                                            var $1519 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1520 = self.name;
                                                                            var $1521 = self.expr;
                                                                            var $1522 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1523 = self.done;
                                                                            var $1524 = self.term;
                                                                            var $1525 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1526 = self.name;
                                                                            var $1527 = self.dref;
                                                                            var $1528 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1529 = self.path;
                                                                            return Fm$Term$equal$patch($1529)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1530 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1531 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1532 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1533 = self.path;
                                                                            var $1534 = self.expr;
                                                                            var $1535 = self.name;
                                                                            var $1536 = self.with;
                                                                            var $1537 = self.cses;
                                                                            var $1538 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1539 = self.orig;
                                                                            var $1540 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ori':
                                                                var $1541 = self.orig;
                                                                var $1542 = self.expr;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1543 = self.name;
                                                                            var $1544 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1545 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1546 = self.eras;
                                                                            var $1547 = self.self;
                                                                            var $1548 = self.name;
                                                                            var $1549 = self.xtyp;
                                                                            var $1550 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1551 = self.name;
                                                                            var $1552 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1553 = self.func;
                                                                            var $1554 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1555 = self.name;
                                                                            var $1556 = self.expr;
                                                                            var $1557 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1558 = self.name;
                                                                            var $1559 = self.expr;
                                                                            var $1560 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1561 = self.done;
                                                                            var $1562 = self.term;
                                                                            var $1563 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1564 = self.name;
                                                                            var $1565 = self.dref;
                                                                            var $1566 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1567 = self.path;
                                                                            return Fm$Term$equal$patch($1567)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1568 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1569 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1570 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1571 = self.path;
                                                                            var $1572 = self.expr;
                                                                            var $1573 = self.name;
                                                                            var $1574 = self.with;
                                                                            var $1575 = self.cses;
                                                                            var $1576 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1577 = self.orig;
                                                                            var $1578 = self.expr;
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
                var $1579 = self.name;
                var $1580 = self.indx;
                return (() => {
                    var self = List$at_last($1580)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1579))(List$nil));
                        case 'Maybe.some':
                            var $1581 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1581;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1582 = self.fst;
                                        var $1583 = self.snd;
                                        return $1583;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1584 = self.name;
                return (() => {
                    var self = Fm$get($1584)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1584))(List$nil));
                        case 'Maybe.some':
                            var $1585 = self.value;
                            return (() => {
                                var self = $1585;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1586 = self.file;
                                        var $1587 = self.code;
                                        var $1588 = self.name;
                                        var $1589 = self.term;
                                        var $1590 = self.type;
                                        var $1591 = self.stat;
                                        return (() => {
                                            var _ref_name$15 = $1588;
                                            var _ref_type$16 = $1590;
                                            var _ref_term$17 = $1589;
                                            var _ref_stat$18 = $1591;
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
                                                        var $1592 = self.errors;
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
                var $1593 = self.eras;
                var $1594 = self.self;
                var $1595 = self.name;
                var $1596 = self.xtyp;
                var $1597 = self.body;
                return (() => {
                    var _ctx_size$12 = List$length(_ctx$4);
                    var _self_var$13 = Fm$Term$var($1594)(_ctx_size$12);
                    var _body_var$14 = Fm$Term$var($1595)(Nat$succ(_ctx_size$12));
                    var _body_ctx$15 = List$cons(Pair$new($1595)($1596))(List$cons(Pair$new($1594)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1596)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_$16 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1597(_self_var$13)(_body_var$14))(Maybe$some(Fm$Term$typ))(_defs$3)(_body_ctx$15)(Fm$MPath$1(_path$5))(_orig$6))((_$17 => Monad$pure(Fm$Check$monad)(Fm$Term$typ)))))
                })();
            case 'Fm.Term.lam':
                var $1598 = self.name;
                var $1599 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1600 = self.value;
                            return (() => {
                                var _typv$10 = Fm$Term$reduce($1600)(_defs$3);
                                return (() => {
                                    var self = _typv$10;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1601 = self.name;
                                            var $1602 = self.indx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1603 = self.name;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1604 = self.eras;
                                            var $1605 = self.self;
                                            var $1606 = self.name;
                                            var $1607 = self.xtyp;
                                            var $1608 = self.body;
                                            return (() => {
                                                var _ctx_size$16 = List$length(_ctx$4);
                                                var _self_var$17 = _term$1;
                                                var _body_var$18 = Fm$Term$var($1598)(_ctx_size$16);
                                                var _body_typ$19 = $1608(_self_var$17)(_body_var$18);
                                                var _body_ctx$20 = List$cons(Pair$new($1598)($1607))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1599(_body_var$18))(Maybe$some(_body_typ$19))(_defs$3)(_body_ctx$20)(Fm$MPath$0(_path$5))(_orig$6))((_$21 => Monad$pure(Fm$Check$monad)($1600)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1609 = self.name;
                                            var $1610 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1611 = self.func;
                                            var $1612 = self.argm;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1613 = self.name;
                                            var $1614 = self.expr;
                                            var $1615 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1616 = self.name;
                                            var $1617 = self.expr;
                                            var $1618 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1619 = self.done;
                                            var $1620 = self.term;
                                            var $1621 = self.type;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1622 = self.name;
                                            var $1623 = self.dref;
                                            var $1624 = self.verb;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1625 = self.path;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1626 = self.natx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1627 = self.chrx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1628 = self.strx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1629 = self.path;
                                            var $1630 = self.expr;
                                            var $1631 = self.name;
                                            var $1632 = self.with;
                                            var $1633 = self.cses;
                                            var $1634 = self.moti;
                                            return (() => {
                                                var _expected$17 = Either$left("Function");
                                                var _detected$18 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ori':
                                            var $1635 = self.orig;
                                            var $1636 = self.expr;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1600);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1637 = self.func;
                var $1638 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1637)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_func_typ$9 => (() => {
                    var _func_typ$10 = Fm$Term$reduce(_func_typ$9)(_defs$3);
                    return (() => {
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1639 = self.name;
                                var $1640 = self.indx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1641 = self.name;
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
                                var $1642 = self.eras;
                                var $1643 = self.self;
                                var $1644 = self.name;
                                var $1645 = self.xtyp;
                                var $1646 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1638)(Maybe$some($1645))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5))(_orig$6))((_$16 => Monad$pure(Fm$Check$monad)($1646($1637)($1638))));
                            case 'Fm.Term.lam':
                                var $1647 = self.name;
                                var $1648 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1649 = self.func;
                                var $1650 = self.argm;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $1651 = self.name;
                                var $1652 = self.expr;
                                var $1653 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $1654 = self.name;
                                var $1655 = self.expr;
                                var $1656 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $1657 = self.done;
                                var $1658 = self.term;
                                var $1659 = self.type;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $1660 = self.name;
                                var $1661 = self.dref;
                                var $1662 = self.verb;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $1663 = self.path;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $1664 = self.natx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $1665 = self.chrx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $1666 = self.strx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $1667 = self.path;
                                var $1668 = self.expr;
                                var $1669 = self.name;
                                var $1670 = self.with;
                                var $1671 = self.cses;
                                var $1672 = self.moti;
                                return (() => {
                                    var _expected$17 = Either$left("Function");
                                    var _detected$18 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ori':
                                var $1673 = self.orig;
                                var $1674 = self.expr;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $1675 = self.name;
                var $1676 = self.expr;
                var $1677 = self.body;
                return (() => {
                    var _ctx_size$10 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1676)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_expr_typ$11 => (() => {
                        var _body_val$12 = $1677(Fm$Term$var($1675)(_ctx_size$10));
                        var _body_ctx$13 = List$cons(Pair$new($1675)(_expr_typ$11))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$12)(_type$2)(_defs$3)(_body_ctx$13)(Fm$MPath$1(_path$5))(_orig$6))((_body_typ$14 => Monad$pure(Fm$Check$monad)(_body_typ$14)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $1678 = self.name;
                var $1679 = self.expr;
                var $1680 = self.body;
                return Fm$Term$check($1680($1679))(_type$2)(_defs$3)(_ctx$4)(_path$5)(_orig$6);
            case 'Fm.Term.ann':
                var $1681 = self.done;
                var $1682 = self.term;
                var $1683 = self.type;
                return (() => {
                    var self = $1681;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1683);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($1682)(Maybe$some($1683))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_$10 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1683)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5))(_orig$6))((_$11 => Monad$pure(Fm$Check$monad)($1683)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $1684 = self.name;
                var $1685 = self.dref;
                var $1686 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($1684)($1685)($1686)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $1687 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $1688 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Nat"));
            case 'Fm.Term.chr':
                var $1689 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Char"));
            case 'Fm.Term.str':
                var $1690 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("String"));
            case 'Fm.Term.cse':
                var $1691 = self.path;
                var $1692 = self.expr;
                var $1693 = self.name;
                var $1694 = self.with;
                var $1695 = self.cses;
                var $1696 = self.moti;
                return (() => {
                    var _expr$13 = $1692;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$13)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_etyp$14 => (() => {
                        var _dsug$15 = Fm$Term$desugar_cse($1692)($1693)($1694)($1695)($1696)(_etyp$14)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$15;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $1697 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($1697))(List$nil));
                            }
                        })()
                    })()))
                })();
            case 'Fm.Term.ori':
                var $1698 = self.orig;
                var $1699 = self.expr;
                return Fm$Term$check($1699)(_type$2)(_defs$3)(_ctx$4)(_path$5)(Maybe$some($1698));
        }
    })())((_infr$7 => (() => {
        var self = _type$2;
        switch (self._) {
            case 'Maybe.none':
                return Fm$Check$result(Maybe$some(_infr$7))(List$nil);
            case 'Maybe.some':
                var $1700 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1700)(_infr$7)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$9 => (() => {
                    var self = _eqls$9;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1700);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(Either$right($1700))(Either$right(_infr$7))(_ctx$4))(List$nil));
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
                var $1701 = self.head;
                var $1702 = self.tail;
                return Bool$false;
        }
    })());
    var Fm$Status$done = ({
        _: 'Fm.Status.done'
    });
    var Fm$Term$patch_at = (_path$1 => (_term$2 => (_fn$3 => (() => {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $1703 = self.name;
                var $1704 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1705 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1706 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $1707 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1708 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1709 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.typ':
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1710 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1711 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $1712 = self.eras;
                var $1713 = self.self;
                var $1714 = self.name;
                var $1715 = self.xtyp;
                var $1716 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1717 = self.slice(0, -1);
                            return Fm$Term$all($1712)($1713)($1714)(Fm$Term$patch_at($1717)($1715)(_fn$3))($1716);
                        case '1':
                            var $1718 = self.slice(0, -1);
                            return Fm$Term$all($1712)($1713)($1714)($1715)((_s$10 => (_x$11 => Fm$Term$patch_at($1718)($1716(_s$10)(_x$11))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $1719 = self.name;
                var $1720 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1721 = self.slice(0, -1);
                            return Fm$Term$lam($1719)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1720(_x$7))(_fn$3)));
                        case '1':
                            var $1722 = self.slice(0, -1);
                            return Fm$Term$lam($1719)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1720(_x$7))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $1723 = self.func;
                var $1724 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1725 = self.slice(0, -1);
                            return Fm$Term$app(Fm$Term$patch_at($1725)($1723)(_fn$3))($1724);
                        case '1':
                            var $1726 = self.slice(0, -1);
                            return Fm$Term$app($1723)(Fm$Term$patch_at($1726)($1724)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $1727 = self.name;
                var $1728 = self.expr;
                var $1729 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1730 = self.slice(0, -1);
                            return Fm$Term$let($1727)(Fm$Term$patch_at($1730)($1728)(_fn$3))($1729);
                        case '1':
                            var $1731 = self.slice(0, -1);
                            return Fm$Term$let($1727)($1728)((_x$8 => Fm$Term$patch_at($1731)($1729(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $1732 = self.name;
                var $1733 = self.expr;
                var $1734 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1735 = self.slice(0, -1);
                            return Fm$Term$def($1732)(Fm$Term$patch_at($1735)($1733)(_fn$3))($1734);
                        case '1':
                            var $1736 = self.slice(0, -1);
                            return Fm$Term$def($1732)($1733)((_x$8 => Fm$Term$patch_at($1736)($1734(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $1737 = self.done;
                var $1738 = self.term;
                var $1739 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1740 = self.slice(0, -1);
                            return Fm$Term$ann($1737)(Fm$Term$patch_at(_path$1)($1738)(_fn$3))($1739);
                        case '1':
                            var $1741 = self.slice(0, -1);
                            return Fm$Term$ann($1737)(Fm$Term$patch_at(_path$1)($1738)(_fn$3))($1739);
                    }
                })();
            case 'Fm.Term.gol':
                var $1742 = self.name;
                var $1743 = self.dref;
                var $1744 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1745 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1746 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $1747 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1748 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1749 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $1750 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1751 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1752 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $1753 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1754 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1755 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $1756 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1757 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1758 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $1759 = self.path;
                var $1760 = self.expr;
                var $1761 = self.name;
                var $1762 = self.with;
                var $1763 = self.cses;
                var $1764 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1765 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1766 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ori':
                var $1767 = self.orig;
                var $1768 = self.expr;
                return Fm$Term$patch_at(_path$1)($1768)(_fn$3);
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
                                var _type$9 = Fm$Term$bind(List$nil)((_x$9 => Bits$1(_x$9)))(_type$5);
                                var _term$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$0(_x$10)))(_term$4);
                                var _defs$11 = Fm$set(_name$3)(Fm$Def$new(_file$1)(_code$2)(_name$3)(_term$10)(_type$9)(Fm$Status$init))(_defs$6);
                                return Monad$pure(IO$monad)(Maybe$some(_defs$11))
                            })();
                        case 'false':
                            return Monad$pure(IO$monad)(Maybe$none);
                    }
                })();
            case 'List.cons':
                var $1769 = self.head;
                var $1770 = self.tail;
                return (() => {
                    var self = $1769;
                    switch (self._) {
                        case 'Fm.Error.type_mismatch':
                            var $1771 = self.origin;
                            var $1772 = self.expected;
                            var $1773 = self.detected;
                            var $1774 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1770)(_fixd$8);
                        case 'Fm.Error.show_goal':
                            var $1775 = self.name;
                            var $1776 = self.dref;
                            var $1777 = self.verb;
                            var $1778 = self.goal;
                            var $1779 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1770)(_fixd$8);
                        case 'Fm.Error.waiting':
                            var $1780 = self.name;
                            return Monad$bind(IO$monad)(Fm$Synth$one($1780)(_defs$6))((_defs$12 => Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$12)($1770)(Bool$true)));
                        case 'Fm.Error.indirect':
                            var $1781 = self.name;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1770)(_fixd$8);
                        case 'Fm.Error.patch':
                            var $1782 = self.path;
                            var $1783 = self.term;
                            return (() => {
                                var self = $1782;
                                switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                    case 'nil':
                                        return Monad$pure(IO$monad)(Maybe$none);
                                    case '0':
                                        var $1784 = self.slice(0, -1);
                                        return (() => {
                                            var _term$14 = Fm$Term$patch_at($1784)(_term$4)((_x$14 => $1783));
                                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$14)(_type$5)(_defs$6)($1770)(Bool$true)
                                        })();
                                    case '1':
                                        var $1785 = self.slice(0, -1);
                                        return (() => {
                                            var _type$14 = Fm$Term$patch_at($1785)(_type$5)((_x$14 => $1783));
                                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$14)(_defs$6)($1770)(Bool$true)
                                        })();
                                }
                            })();
                        case 'Fm.Error.undefined_reference':
                            var $1786 = self.origin;
                            var $1787 = self.name;
                            return Monad$bind(IO$monad)(Fm$Synth$load($1787)(_defs$6))((_loaded$13 => (() => {
                                var self = _loaded$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1770)(_fixd$8);
                                    case 'Maybe.some':
                                        var $1788 = self.value;
                                        return Monad$bind(IO$monad)(Fm$Synth$one($1787)(_defs$6))((_defs$15 => Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$15)($1770)(Bool$true)));
                                }
                            })()));
                        case 'Fm.Error.cant_infer':
                            var $1789 = self.origin;
                            var $1790 = self.term;
                            var $1791 = self.context;
                            return Fm$Synth$fix(_file$1)(_code$2)(_name$3)(_term$4)(_type$5)(_defs$6)($1770)(_fixd$8);
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
                            return Monad$pure(IO$monad)(_defs$2);
                        case 'Maybe.some':
                            var $1792 = self.value;
                            return Fm$Synth$one(_name$1)($1792);
                    }
                })()));
            case 'Maybe.some':
                var $1793 = self.value;
                return (() => {
                    var self = $1793;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $1794 = self.file;
                            var $1795 = self.code;
                            var $1796 = self.name;
                            var $1797 = self.term;
                            var $1798 = self.type;
                            var $1799 = self.stat;
                            return (() => {
                                var _file$10 = $1794;
                                var _code$11 = $1795;
                                var _name$12 = $1796;
                                var _term$13 = $1797;
                                var _type$14 = $1798;
                                var _stat$15 = $1799;
                                return (() => {
                                    var self = _stat$15;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            return (() => {
                                                var _defs$16 = Fm$set(_name$12)(Fm$Def$new(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(Fm$Status$wait))(_defs$2);
                                                var _checked$17 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$14)(Maybe$some(Fm$Term$typ))(_defs$16)(List$nil)(Fm$MPath$1(Fm$MPath$nil))(Maybe$none))((_chk_type$17 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$13)(Maybe$some(_type$14))(_defs$16)(List$nil)(Fm$MPath$0(Fm$MPath$nil))(Maybe$none))((_chk_term$18 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                return (() => {
                                                    var self = _checked$17;
                                                    switch (self._) {
                                                        case 'Fm.Check.result':
                                                            var $1800 = self.value;
                                                            var $1801 = self.errors;
                                                            return (() => {
                                                                var self = List$is_empty($1801);
                                                                switch (self ? 'true' : 'false') {
                                                                    case 'true':
                                                                        return (() => {
                                                                            var _defs$20 = Fm$set(_name$12)(Fm$Def$new(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(Fm$Status$done))(_defs$16);
                                                                            return Monad$pure(IO$monad)(_defs$20)
                                                                        })();
                                                                    case 'false':
                                                                        return Monad$bind(IO$monad)(Fm$Synth$fix(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(_defs$16)($1801)(Bool$false))((_fixed$20 => (() => {
                                                                            var self = _fixed$20;
                                                                            switch (self._) {
                                                                                case 'Maybe.none':
                                                                                    return (() => {
                                                                                        var _stat$21 = Fm$Status$fail($1801);
                                                                                        var _defs$22 = Fm$set(_name$12)(Fm$Def$new(_file$10)(_code$11)(_name$12)(_term$13)(_type$14)(_stat$21))(_defs$16);
                                                                                        return Monad$pure(IO$monad)(_defs$22)
                                                                                    })();
                                                                                case 'Maybe.some':
                                                                                    var $1802 = self.value;
                                                                                    return Fm$Synth$one(_name$12)($1802);
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
                                            var $1803 = self.errors;
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
                var $1804 = self.val;
                var $1805 = self.lft;
                var $1806 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $1804;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $1807 = self.value;
                                return List$cons($1807)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($1805)(_list0$7);
                    var _list2$9 = Map$values$go($1806)(_list1$8);
                    return _list2$9
                })();
        }
    })()));
    var Map$values = (_xs$2 => Map$values$go(_xs$2)(List$nil));
    var Fm$Name$show = (_name$1 => _name$1);
    var Bits$to_nat = (_b$1 => (() => {
        var self = _b$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return 0n;
            case '0':
                var $1808 = self.slice(0, -1);
                return (2n * Bits$to_nat($1808));
            case '1':
                var $1809 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($1809)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $1810 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($1810)));
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
                var $1811 = self.charCodeAt(0);
                var $1812 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($1811);
                    var _tail$5 = Fm$escape($1812);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1813 = self.name;
                var $1814 = self.indx;
                return Fm$Name$show($1813);
            case 'Fm.Term.ref':
                var $1815 = self.name;
                return Fm$Name$show($1815);
            case 'Fm.Term.typ':
                return "*";
            case 'Fm.Term.all':
                var $1816 = self.eras;
                var $1817 = self.self;
                var $1818 = self.name;
                var $1819 = self.xtyp;
                var $1820 = self.body;
                return (() => {
                    var _eras$7 = $1816;
                    var _init$8 = (() => {
                        var self = _eras$7;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$9 = Fm$Name$show($1817);
                    var _name$10 = Fm$Name$show($1818);
                    var _xtyp$11 = Fm$Term$core($1819);
                    var _body$12 = Fm$Term$core($1820(Fm$Term$var($1817)(0n))(Fm$Term$var($1818)(0n)));
                    return String$flatten(List$cons(_init$8)(List$cons(_self$9)(List$cons("(")(List$cons(_name$10)(List$cons(":")(List$cons(_xtyp$11)(List$cons(") ")(List$cons(_body$12)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $1821 = self.name;
                var $1822 = self.body;
                return (() => {
                    var _name$4 = Fm$Name$show($1821);
                    var _body$5 = Fm$Term$core($1822(Fm$Term$var($1821)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$4)(List$cons(" ")(List$cons(_body$5)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $1823 = self.func;
                var $1824 = self.argm;
                return (() => {
                    var _func$4 = Fm$Term$core($1823);
                    var _argm$5 = Fm$Term$core($1824);
                    return String$flatten(List$cons("(")(List$cons(_func$4)(List$cons(" ")(List$cons(_argm$5)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $1825 = self.name;
                var $1826 = self.expr;
                var $1827 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($1825);
                    var _expr$6 = Fm$Term$core($1826);
                    var _body$7 = Fm$Term$core($1827(Fm$Term$var($1825)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $1828 = self.name;
                var $1829 = self.expr;
                var $1830 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($1828);
                    var _expr$6 = Fm$Term$core($1829);
                    var _body$7 = Fm$Term$core($1830(Fm$Term$var($1828)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $1831 = self.done;
                var $1832 = self.term;
                var $1833 = self.type;
                return (() => {
                    var _term$5 = Fm$Term$core($1832);
                    var _type$6 = Fm$Term$core($1833);
                    return String$flatten(List$cons("{")(List$cons(_term$5)(List$cons(":")(List$cons(_type$6)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $1834 = self.name;
                var $1835 = self.dref;
                var $1836 = self.verb;
                return "<GOL>";
            case 'Fm.Term.hol':
                var $1837 = self.path;
                return "<HOL>";
            case 'Fm.Term.nat':
                var $1838 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($1838))(List$nil)));
            case 'Fm.Term.chr':
                var $1839 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($1839))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $1840 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($1840))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $1841 = self.path;
                var $1842 = self.expr;
                var $1843 = self.name;
                var $1844 = self.with;
                var $1845 = self.cses;
                var $1846 = self.moti;
                return "<CSE>";
            case 'Fm.Term.ori':
                var $1847 = self.orig;
                var $1848 = self.expr;
                return Fm$Term$core($1848);
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_defn$3 => (_result$4 => (() => {
            var self = _defn$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $1849 = self.file;
                    var $1850 = self.code;
                    var $1851 = self.name;
                    var $1852 = self.term;
                    var $1853 = self.type;
                    var $1854 = self.stat;
                    return (() => {
                        var self = $1854;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$11 = $1851;
                                    var _term$12 = Fm$Term$core($1852);
                                    var _type$13 = Fm$Term$core($1853);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$11)(List$cons(" : ")(List$cons(_type$13)(List$cons(" = ")(List$cons(_term$12)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $1855 = self.errors;
                                return _result$4;
                        }
                    })();
            }
        })()))));
        return _result$3
    })());
    var Fm$to_core$io$one = (_name$1 => Monad$bind(IO$monad)(Fm$Synth$one(_name$1)(Map$new))((_defs$2 => Monad$pure(IO$monad)(Fm$Defs$core(_defs$2)))));
    var IO$print = (_text$1 => IO$ask("print")(_text$1)((_skip$2 => IO$end(Unit$new))));
    var Maybe$bind = (_m$3 => (_f$4 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $1856 = self.value;
                return _f$4($1856);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1857 = self.name;
                var $1858 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1859 = self.name;
                return (() => {
                    var self = ($1859 === "Nat.zero");
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
                var $1860 = self.eras;
                var $1861 = self.self;
                var $1862 = self.name;
                var $1863 = self.xtyp;
                var $1864 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $1865 = self.name;
                var $1866 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1867 = self.func;
                var $1868 = self.argm;
                return (() => {
                    var self = $1867;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $1869 = self.name;
                            var $1870 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $1871 = self.name;
                            return (() => {
                                var self = ($1871 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($1868))((_pred$5 => Monad$pure(Maybe$monad)(Nat$succ(_pred$5))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $1872 = self.eras;
                            var $1873 = self.self;
                            var $1874 = self.name;
                            var $1875 = self.xtyp;
                            var $1876 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $1877 = self.name;
                            var $1878 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $1879 = self.func;
                            var $1880 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $1881 = self.name;
                            var $1882 = self.expr;
                            var $1883 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $1884 = self.name;
                            var $1885 = self.expr;
                            var $1886 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $1887 = self.done;
                            var $1888 = self.term;
                            var $1889 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $1890 = self.name;
                            var $1891 = self.dref;
                            var $1892 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $1893 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $1894 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $1895 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $1896 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $1897 = self.path;
                            var $1898 = self.expr;
                            var $1899 = self.name;
                            var $1900 = self.with;
                            var $1901 = self.cses;
                            var $1902 = self.moti;
                            return Maybe$none;
                        case 'Fm.Term.ori':
                            var $1903 = self.orig;
                            var $1904 = self.expr;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $1905 = self.name;
                var $1906 = self.expr;
                var $1907 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1908 = self.name;
                var $1909 = self.expr;
                var $1910 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1911 = self.done;
                var $1912 = self.term;
                var $1913 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1914 = self.name;
                var $1915 = self.dref;
                var $1916 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1917 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1918 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1919 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1920 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1921 = self.path;
                var $1922 = self.expr;
                var $1923 = self.name;
                var $1924 = self.with;
                var $1925 = self.cses;
                var $1926 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $1927 = self.orig;
                var $1928 = self.expr;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1929 = self.name;
                var $1930 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $1931 = self.name;
                return (_name$2 === $1931);
            case 'Fm.Term.typ':
                return Bool$false;
            case 'Fm.Term.all':
                var $1932 = self.eras;
                var $1933 = self.self;
                var $1934 = self.name;
                var $1935 = self.xtyp;
                var $1936 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $1937 = self.name;
                var $1938 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $1939 = self.func;
                var $1940 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $1941 = self.name;
                var $1942 = self.expr;
                var $1943 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $1944 = self.name;
                var $1945 = self.expr;
                var $1946 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $1947 = self.done;
                var $1948 = self.term;
                var $1949 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $1950 = self.name;
                var $1951 = self.dref;
                var $1952 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $1953 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $1954 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $1955 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $1956 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $1957 = self.path;
                var $1958 = self.expr;
                var $1959 = self.name;
                var $1960 = self.with;
                var $1961 = self.cses;
                var $1962 = self.moti;
                return Bool$false;
            case 'Fm.Term.ori':
                var $1963 = self.orig;
                var $1964 = self.expr;
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
                        var $1965 = self.name;
                        var $1966 = self.indx;
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
                                                        var $1967 = self.charCodeAt(0);
                                                        var $1968 = self.slice(1);
                                                        return ($1967 === 40);
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
                        var $1969 = self.name;
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
                                                        var $1970 = self.charCodeAt(0);
                                                        var $1971 = self.slice(1);
                                                        return ($1970 === 40);
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
                                                        var $1972 = self.charCodeAt(0);
                                                        var $1973 = self.slice(1);
                                                        return ($1972 === 40);
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
                        var $1974 = self.eras;
                        var $1975 = self.self;
                        var $1976 = self.name;
                        var $1977 = self.xtyp;
                        var $1978 = self.body;
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
                                                        var $1979 = self.charCodeAt(0);
                                                        var $1980 = self.slice(1);
                                                        return ($1979 === 40);
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
                        var $1981 = self.name;
                        var $1982 = self.body;
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
                                                        var $1983 = self.charCodeAt(0);
                                                        var $1984 = self.slice(1);
                                                        return ($1983 === 40);
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
                        var $1985 = self.func;
                        var $1986 = self.argm;
                        return (() => {
                            var _argm$6 = Fm$Term$show$go($1986)(Fm$MPath$1(_path$2));
                            return Fm$Term$show$app($1985)(Fm$MPath$0(_path$2))(List$cons(_argm$6)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $1987 = self.name;
                        var $1988 = self.expr;
                        var $1989 = self.body;
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
                                                        var $1990 = self.charCodeAt(0);
                                                        var $1991 = self.slice(1);
                                                        return ($1990 === 40);
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
                        var $1992 = self.name;
                        var $1993 = self.expr;
                        var $1994 = self.body;
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
                                                        var $1995 = self.charCodeAt(0);
                                                        var $1996 = self.slice(1);
                                                        return ($1995 === 40);
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
                        var $1997 = self.done;
                        var $1998 = self.term;
                        var $1999 = self.type;
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
                                                        var $2000 = self.charCodeAt(0);
                                                        var $2001 = self.slice(1);
                                                        return ($2000 === 40);
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
                        var $2002 = self.name;
                        var $2003 = self.dref;
                        var $2004 = self.verb;
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
                                                        var $2005 = self.charCodeAt(0);
                                                        var $2006 = self.slice(1);
                                                        return ($2005 === 40);
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
                        var $2007 = self.path;
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
                                                        var $2008 = self.charCodeAt(0);
                                                        var $2009 = self.slice(1);
                                                        return ($2008 === 40);
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
                        var $2010 = self.natx;
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
                                                        var $2011 = self.charCodeAt(0);
                                                        var $2012 = self.slice(1);
                                                        return ($2011 === 40);
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
                        var $2013 = self.chrx;
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
                                                        var $2014 = self.charCodeAt(0);
                                                        var $2015 = self.slice(1);
                                                        return ($2014 === 40);
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
                        var $2016 = self.strx;
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
                                                        var $2017 = self.charCodeAt(0);
                                                        var $2018 = self.slice(1);
                                                        return ($2017 === 40);
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
                        var $2019 = self.path;
                        var $2020 = self.expr;
                        var $2021 = self.name;
                        var $2022 = self.with;
                        var $2023 = self.cses;
                        var $2024 = self.moti;
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
                                                        var $2025 = self.charCodeAt(0);
                                                        var $2026 = self.slice(1);
                                                        return ($2025 === 40);
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
                        var $2027 = self.orig;
                        var $2028 = self.expr;
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
                                                        var $2029 = self.charCodeAt(0);
                                                        var $2030 = self.slice(1);
                                                        return ($2029 === 40);
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
                var $2031 = self.val;
                var $2032 = self.lft;
                var $2033 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2031;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2034 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($2034))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($2032)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($2033)(Bits$1(_key$3))(_list1$9);
                    return _list2$10
                })();
        }
    })())));
    var Map$to_list = (_xs$2 => List$reverse(Map$to_list$go(_xs$2)(Bits$nil)(List$nil)));
    var Bits$chunks_of$go = (_len$1 => (_bits$2 => (_need$3 => (_chunk$4 => (() => {
        var self = _bits$2;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return List$cons(Bits$reverse(_chunk$4))(List$nil);
            case '0':
                var $2035 = self.slice(0, -1);
                return (() => {
                    var self = _need$3;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return (() => {
                                var _head$6 = Bits$reverse(_chunk$4);
                                var _tail$7 = Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$nil);
                                return List$cons(_head$6)(_tail$7)
                            })();
                        case 'succ':
                            var $2036 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2035)($2036)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $2037 = self.slice(0, -1);
                return (() => {
                    var self = _need$3;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return (() => {
                                var _head$6 = Bits$reverse(_chunk$4);
                                var _tail$7 = Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$nil);
                                return List$cons(_head$6)(_tail$7)
                            })();
                        case 'succ':
                            var $2038 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2037)($2038)(_chunk$7)
                            })();
                    }
                })();
        }
    })()))));
    var Bits$chunks_of = (_len$1 => (_bits$2 => Bits$chunks_of$go(_len$1)(_bits$2)(_len$1)(Bits$nil)));
    var Word$from_bits = (_size$1 => (_bits$2 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $2039 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($2039)(Bits$nil));
                        case '0':
                            var $2040 = self.slice(0, -1);
                            return Word$0(Word$from_bits($2039)($2040));
                        case '1':
                            var $2041 = self.slice(0, -1);
                            return Word$1(Word$from_bits($2039)($2041));
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
                var $2042 = self.fst;
                var $2043 = self.snd;
                return $2042;
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
                            var $2044 = self.name;
                            var $2045 = self.indx;
                            return Fm$Name$show($2044);
                        case 'Fm.Term.ref':
                            var $2046 = self.name;
                            return (() => {
                                var _name$4 = Fm$Name$show($2046);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$4;
                                        case 'Maybe.some':
                                            var $2047 = self.value;
                                            return (() => {
                                                var _path_val$6 = (Bits$1(Bits$nil) + Fm$Path$to_bits($2047));
                                                var _path_str$7 = Nat$show(Bits$to_nat(_path_val$6));
                                                return String$flatten(List$cons(_name$4)(List$cons(Fm$color("2")(("-" + _path_str$7)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            return "Type";
                        case 'Fm.Term.all':
                            var $2048 = self.eras;
                            var $2049 = self.self;
                            var $2050 = self.name;
                            var $2051 = self.xtyp;
                            var $2052 = self.body;
                            return (() => {
                                var _eras$8 = $2048;
                                var _self$9 = Fm$Name$show($2049);
                                var _name$10 = Fm$Name$show($2050);
                                var _type$11 = Fm$Term$show$go($2051)(Fm$MPath$0(_path$2));
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
                                var _body$14 = Fm$Term$show$go($2052(Fm$Term$var($2049)(0n))(Fm$Term$var($2050)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$9)(List$cons(_open$12)(List$cons(_name$10)(List$cons(":")(List$cons(_type$11)(List$cons(_clos$13)(List$cons(" ")(List$cons(_body$14)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $2053 = self.name;
                            var $2054 = self.body;
                            return (() => {
                                var _name$5 = Fm$Name$show($2053);
                                var _body$6 = Fm$Term$show$go($2054(Fm$Term$var($2053)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$5)(List$cons(") ")(List$cons(_body$6)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $2055 = self.func;
                            var $2056 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $2057 = self.name;
                            var $2058 = self.expr;
                            var $2059 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2057);
                                var _expr$7 = Fm$Term$show$go($2058)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($2059(Fm$Term$var($2057)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $2060 = self.name;
                            var $2061 = self.expr;
                            var $2062 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2060);
                                var _expr$7 = Fm$Term$show$go($2061)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($2062(Fm$Term$var($2060)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $2063 = self.done;
                            var $2064 = self.term;
                            var $2065 = self.type;
                            return (() => {
                                var _term$6 = Fm$Term$show$go($2064)(Fm$MPath$0(_path$2));
                                var _type$7 = Fm$Term$show$go($2065)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$6)(List$cons("::")(List$cons(_type$7)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $2066 = self.name;
                            var $2067 = self.dref;
                            var $2068 = self.verb;
                            return (() => {
                                var _name$6 = Fm$Name$show($2066);
                                return String$flatten(List$cons("?")(List$cons(_name$6)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $2069 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $2070 = self.natx;
                            return String$flatten(List$cons(Nat$show($2070))(List$nil));
                        case 'Fm.Term.chr':
                            var $2071 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2071))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $2072 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($2072))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $2073 = self.path;
                            var $2074 = self.expr;
                            var $2075 = self.name;
                            var $2076 = self.with;
                            var $2077 = self.cses;
                            var $2078 = self.moti;
                            return (() => {
                                var _expr$9 = Fm$Term$show$go($2074)(Fm$MPath$0(_path$2));
                                var _name$10 = Fm$Name$show($2075);
                                var _wyth$11 = String$join("")(List$mapped($2076)((_defn$11 => (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2079 = self.file;
                                            var $2080 = self.code;
                                            var $2081 = self.name;
                                            var $2082 = self.term;
                                            var $2083 = self.type;
                                            var $2084 = self.stat;
                                            return (() => {
                                                var _name$18 = Fm$Name$show($2081);
                                                var _type$19 = Fm$Term$show$go($2083)(Maybe$none);
                                                var _term$20 = Fm$Term$show$go($2082)(Maybe$none);
                                                return String$flatten(List$cons(_name$18)(List$cons(": ")(List$cons(_type$19)(List$cons(" = ")(List$cons(_term$20)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$12 = Map$to_list($2077);
                                var _cses$13 = String$join("")(List$mapped(_cses$12)((_x$13 => (() => {
                                    var _name$14 = Fm$Name$from_bits(Pair$fst(_x$13));
                                    var _term$15 = Fm$Term$show$go(Pair$snd(_x$13))(Maybe$none);
                                    return String$flatten(List$cons(_name$14)(List$cons(": ")(List$cons(_term$15)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$14 = Fm$Term$show$go($2078)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$9)(List$cons(" as ")(List$cons(_name$10)(List$cons(_wyth$11)(List$cons(" { ")(List$cons(_cses$13)(List$cons("} : ")(List$cons(_moti$14)(List$nil))))))))))
                            })();
                        case 'Fm.Term.ori':
                            var $2085 = self.orig;
                            var $2086 = self.expr;
                            return Fm$Term$show$go($2086)(_path$2);
                    }
                })();
            case 'Maybe.some':
                var $2087 = self.value;
                return $2087;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Error$relevant = (_errors$1 => (_got$2 => (() => {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $2088 = self.head;
                var $2089 = self.tail;
                return (() => {
                    var _keep$5 = (() => {
                        var self = $2088;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2090 = self.origin;
                                var $2091 = self.expected;
                                var $2092 = self.detected;
                                var $2093 = self.context;
                                return (!_got$2);
                            case 'Fm.Error.show_goal':
                                var $2094 = self.name;
                                var $2095 = self.dref;
                                var $2096 = self.verb;
                                var $2097 = self.goal;
                                var $2098 = self.context;
                                return Bool$true;
                            case 'Fm.Error.waiting':
                                var $2099 = self.name;
                                return Bool$false;
                            case 'Fm.Error.indirect':
                                var $2100 = self.name;
                                return Bool$false;
                            case 'Fm.Error.patch':
                                var $2101 = self.path;
                                var $2102 = self.term;
                                return Bool$false;
                            case 'Fm.Error.undefined_reference':
                                var $2103 = self.origin;
                                var $2104 = self.name;
                                return (!_got$2);
                            case 'Fm.Error.cant_infer':
                                var $2105 = self.origin;
                                var $2106 = self.term;
                                var $2107 = self.context;
                                return (!_got$2);
                        }
                    })();
                    var _got$6 = (() => {
                        var self = $2088;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2108 = self.origin;
                                var $2109 = self.expected;
                                var $2110 = self.detected;
                                var $2111 = self.context;
                                return Bool$true;
                            case 'Fm.Error.show_goal':
                                var $2112 = self.name;
                                var $2113 = self.dref;
                                var $2114 = self.verb;
                                var $2115 = self.goal;
                                var $2116 = self.context;
                                return _got$2;
                            case 'Fm.Error.waiting':
                                var $2117 = self.name;
                                return _got$2;
                            case 'Fm.Error.indirect':
                                var $2118 = self.name;
                                return _got$2;
                            case 'Fm.Error.patch':
                                var $2119 = self.path;
                                var $2120 = self.term;
                                return _got$2;
                            case 'Fm.Error.undefined_reference':
                                var $2121 = self.origin;
                                var $2122 = self.name;
                                return Bool$true;
                            case 'Fm.Error.cant_infer':
                                var $2123 = self.origin;
                                var $2124 = self.term;
                                var $2125 = self.context;
                                return _got$2;
                        }
                    })();
                    var _tail$7 = Fm$Error$relevant($2089)(_got$6);
                    return (() => {
                        var self = _keep$5;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return List$cons($2088)(_tail$7);
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
                var $2126 = self.head;
                var $2127 = self.tail;
                return (() => {
                    var self = $2126;
                    switch (self._) {
                        case 'Pair.new':
                            var $2128 = self.fst;
                            var $2129 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($2128);
                                var _type$7 = Fm$Term$show($2129);
                                var _rest$8 = Fm$Context$show($2127);
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
                var $2130 = self.name;
                var $2131 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $2132 = self.name;
                return (() => {
                    var self = Fm$get($2132)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($2132);
                        case 'Maybe.some':
                            var $2133 = self.value;
                            return (() => {
                                var self = $2133;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $2134 = self.file;
                                        var $2135 = self.code;
                                        var $2136 = self.name;
                                        var $2137 = self.term;
                                        var $2138 = self.type;
                                        var $2139 = self.stat;
                                        return $2137;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$4;
            case 'Fm.Term.all':
                var $2140 = self.eras;
                var $2141 = self.self;
                var $2142 = self.name;
                var $2143 = self.xtyp;
                var $2144 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $2145 = self.name;
                var $2146 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $2147 = self.func;
                var $2148 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $2149 = self.name;
                var $2150 = self.expr;
                var $2151 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $2152 = self.name;
                var $2153 = self.expr;
                var $2154 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $2155 = self.done;
                var $2156 = self.term;
                var $2157 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $2158 = self.name;
                var $2159 = self.dref;
                var $2160 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $2161 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $2162 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $2163 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $2164 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $2165 = self.path;
                var $2166 = self.expr;
                var $2167 = self.name;
                var $2168 = self.with;
                var $2169 = self.cses;
                var $2170 = self.moti;
                return _term$4;
            case 'Fm.Term.ori':
                var $2171 = self.orig;
                var $2172 = self.expr;
                return _term$4;
        }
    })())))));
    var Bool$or = a0 => a1 => (a0 || a1);
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2173 = self.name;
                var $2174 = self.indx;
                return Fm$Term$var($2173)($2174);
            case 'Fm.Term.ref':
                var $2175 = self.name;
                return (() => {
                    var _expand$5 = Bool$false;
                    var _expand$6 = ((($2175 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                    var _expand$7 = ((($2175 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                    var _expand$8 = ((($2175 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($2175 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                    return (() => {
                        var self = _expand$9;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($2175)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($2175);
                                        case 'Maybe.some':
                                            var $2176 = self.value;
                                            return (() => {
                                                var self = $2176;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $2177 = self.file;
                                                        var $2178 = self.code;
                                                        var $2179 = self.name;
                                                        var $2180 = self.term;
                                                        var $2181 = self.type;
                                                        var $2182 = self.stat;
                                                        return $2180;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($2175);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $2183 = self.eras;
                var $2184 = self.self;
                var $2185 = self.name;
                var $2186 = self.xtyp;
                var $2187 = self.body;
                return Fm$Term$all($2183)($2184)($2185)(Fm$Term$expand_ct($2186)(_defs$2)(0n))((_s$9 => (_x$10 => Fm$Term$expand_ct($2187(_s$9)(_x$10))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $2188 = self.name;
                var $2189 = self.body;
                return Fm$Term$lam($2188)((_x$6 => Fm$Term$expand_ct($2189(_x$6))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $2190 = self.func;
                var $2191 = self.argm;
                return Fm$Term$app(Fm$Term$expand_ct($2190)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($2191)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $2192 = self.name;
                var $2193 = self.expr;
                var $2194 = self.body;
                return Fm$Term$let($2192)(Fm$Term$expand_ct($2193)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2194(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $2195 = self.name;
                var $2196 = self.expr;
                var $2197 = self.body;
                return Fm$Term$def($2195)(Fm$Term$expand_ct($2196)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2197(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $2198 = self.done;
                var $2199 = self.term;
                var $2200 = self.type;
                return Fm$Term$ann($2198)(Fm$Term$expand_ct($2199)(_defs$2)(0n))(Fm$Term$expand_ct($2200)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $2201 = self.name;
                var $2202 = self.dref;
                var $2203 = self.verb;
                return Fm$Term$gol($2201)($2202)($2203);
            case 'Fm.Term.hol':
                var $2204 = self.path;
                return Fm$Term$hol($2204);
            case 'Fm.Term.nat':
                var $2205 = self.natx;
                return Fm$Term$nat($2205);
            case 'Fm.Term.chr':
                var $2206 = self.chrx;
                return Fm$Term$chr($2206);
            case 'Fm.Term.str':
                var $2207 = self.strx;
                return Fm$Term$str($2207);
            case 'Fm.Term.cse':
                var $2208 = self.path;
                var $2209 = self.expr;
                var $2210 = self.name;
                var $2211 = self.with;
                var $2212 = self.cses;
                var $2213 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $2214 = self.orig;
                var $2215 = self.expr;
                return Fm$Term$ori($2214)($2215);
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
                var $2216 = self.origin;
                var $2217 = self.expected;
                var $2218 = self.detected;
                var $2219 = self.context;
                return (() => {
                    var _expected$7 = (() => {
                        var self = $2217;
                        switch (self._) {
                            case 'Either.left':
                                var $2220 = self.value;
                                return $2220;
                            case 'Either.right':
                                var $2221 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2221)(Map$new));
                        }
                    })();
                    var _detected$8 = (() => {
                        var self = $2218;
                        switch (self._) {
                            case 'Either.left':
                                var $2222 = self.value;
                                return $2222;
                            case 'Either.right':
                                var $2223 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2223)(Map$new));
                        }
                    })();
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$7)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$8)(List$cons("\u{a}")(List$cons((() => {
                        var self = $2219;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2224 = self.head;
                                var $2225 = self.tail;
                                return String$flatten(List$cons("With context:\u{a}")(List$cons(Fm$Context$show($2219))(List$nil)));
                        }
                    })())(List$nil)))))))))
                })();
            case 'Fm.Error.show_goal':
                var $2226 = self.name;
                var $2227 = self.dref;
                var $2228 = self.verb;
                var $2229 = self.goal;
                var $2230 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($2226))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $2229;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $2231 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($2227)($2231)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $2228;
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
                        var self = $2230;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2232 = self.head;
                                var $2233 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($2230))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $2234 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($2234)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $2235 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($2235)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $2236 = self.path;
                var $2237 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($2237))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2238 = self.origin;
                var $2239 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2239))(List$cons("\u{a}")(List$nil))));
            case 'Fm.Error.cant_infer':
                var $2240 = self.origin;
                var $2241 = self.term;
                var $2242 = self.context;
                return (() => {
                    var _term$6 = Fm$Term$show($2241);
                    var _context$7 = Fm$Context$show($2242);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$6)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$7)(List$nil))))))
                })();
        }
    })()));
    var Fm$Error$origin = (_error$1 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2243 = self.origin;
                var $2244 = self.expected;
                var $2245 = self.detected;
                var $2246 = self.context;
                return $2243;
            case 'Fm.Error.show_goal':
                var $2247 = self.name;
                var $2248 = self.dref;
                var $2249 = self.verb;
                var $2250 = self.goal;
                var $2251 = self.context;
                return Maybe$none;
            case 'Fm.Error.waiting':
                var $2252 = self.name;
                return Maybe$none;
            case 'Fm.Error.indirect':
                var $2253 = self.name;
                return Maybe$none;
            case 'Fm.Error.patch':
                var $2254 = self.path;
                var $2255 = self.term;
                return Maybe$none;
            case 'Fm.Error.undefined_reference':
                var $2256 = self.origin;
                var $2257 = self.name;
                return $2256;
            case 'Fm.Error.cant_infer':
                var $2258 = self.origin;
                var $2259 = self.term;
                var $2260 = self.context;
                return $2258;
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
                                    var $2261 = self.charCodeAt(0);
                                    var $2262 = self.slice(1);
                                    return _errs$3;
                            }
                        })())(List$nil))));
                    case 'List.cons':
                        var $2263 = self.head;
                        var $2264 = self.tail;
                        return (() => {
                            var _name$7 = $2263;
                            return (() => {
                                var self = Fm$get(_name$7)(_defs$1);
                                switch (self._) {
                                    case 'Maybe.none':
                                        return Fm$Defs$report$go(_defs$1)($2264)(_errs$3)(_typs$4);
                                    case 'Maybe.some':
                                        var $2265 = self.value;
                                        return (() => {
                                            var self = $2265;
                                            switch (self._) {
                                                case 'Fm.Def.new':
                                                    var $2266 = self.file;
                                                    var $2267 = self.code;
                                                    var $2268 = self.name;
                                                    var $2269 = self.term;
                                                    var $2270 = self.type;
                                                    var $2271 = self.stat;
                                                    return (() => {
                                                        var _typs$15 = String$flatten(List$cons(_typs$4)(List$cons(_name$7)(List$cons(": ")(List$cons(Fm$Term$show($2270))(List$cons("\u{a}")(List$nil))))));
                                                        return (() => {
                                                            var self = $2271;
                                                            switch (self._) {
                                                                case 'Fm.Status.init':
                                                                    return Fm$Defs$report$go(_defs$1)($2264)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.wait':
                                                                    return Fm$Defs$report$go(_defs$1)($2264)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.done':
                                                                    return Fm$Defs$report$go(_defs$1)($2264)(_errs$3)(_typs$15);
                                                                case 'Fm.Status.fail':
                                                                    var $2272 = self.errors;
                                                                    return (() => {
                                                                        var self = $2272;
                                                                        switch (self._) {
                                                                            case 'List.nil':
                                                                                return Fm$Defs$report$go(_defs$1)($2264)(_errs$3)(_typs$15);
                                                                            case 'List.cons':
                                                                                var $2273 = self.head;
                                                                                var $2274 = self.tail;
                                                                                return (() => {
                                                                                    var _name_str$19 = Fm$Name$show($2268);
                                                                                    var _rel_errs$20 = Fm$Error$relevant($2272)(Bool$false);
                                                                                    var _rel_msgs$21 = List$mapped(_rel_errs$20)((_err$21 => String$flatten(List$cons(Fm$Error$show(_err$21)(_defs$1))(List$cons((() => {
                                                                                        var self = Fm$Error$origin(_err$21);
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return "";
                                                                                            case 'Maybe.some':
                                                                                                var $2275 = self.value;
                                                                                                return (() => {
                                                                                                    var self = $2275;
                                                                                                    switch (self._) {
                                                                                                        case 'Fm.Origin.new':
                                                                                                            var $2276 = self.file;
                                                                                                            var $2277 = self.from;
                                                                                                            var $2278 = self.upto;
                                                                                                            return String$flatten(List$cons("Inside \'")(List$cons($2266)(List$cons("\':\u{a}")(List$cons(Fm$highlight($2267)($2277)($2278))(List$cons("\u{a}")(List$nil))))));
                                                                                                    }
                                                                                                })();
                                                                                        }
                                                                                    })())(List$nil)))));
                                                                                    var _errs$22 = String$flatten(List$cons(_errs$3)(List$cons(String$join("\u{a}")(_rel_msgs$21))(List$cons("\u{a}")(List$nil))));
                                                                                    return Fm$Defs$report$go(_defs$1)($2264)(_errs$22)(_typs$15)
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
                var $2279 = self.val;
                var $2280 = self.lft;
                var $2281 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2279;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2282 = self.value;
                                return List$cons(Bits$reverse(_key$3))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$keys$go($2280)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$keys$go($2281)(Bits$1(_key$3))(_list1$9);
                    return _list2$10
                })();
        }
    })())));
    var Map$keys = (_xs$2 => List$reverse(Map$keys$go(_xs$2)(Bits$nil)(List$nil)));
    var Fm$Synth$many = (_names$1 => (_defs$2 => (() => {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                return Monad$pure(IO$monad)(_defs$2);
            case 'List.cons':
                var $2283 = self.head;
                var $2284 = self.tail;
                return Monad$bind(IO$monad)(Fm$Synth$one($2283)(_defs$2))((_defs$5 => Fm$Synth$many($2284)(_defs$5)));
        }
    })()));
    var Fm$Synth$file = (_file$1 => (_defs$2 => Monad$bind(IO$monad)(IO$get_file(_file$1))((_code$3 => (() => {
        var _read$4 = Fm$Defs$read(_file$1)(_code$3)(_defs$2);
        return (() => {
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $2285 = self.value;
                    return Monad$pure(IO$monad)(Either$left($2285));
                case 'Either.right':
                    var $2286 = self.value;
                    return (() => {
                        var _file_defs$6 = $2286;
                        var _file_keys$7 = Map$keys(_file_defs$6);
                        var _file_nams$8 = List$mapped(_file_keys$7)(Fm$Name$from_bits);
                        return Monad$bind(IO$monad)(Fm$Synth$many(_file_nams$8)(_defs$2))((_defs$9 => Monad$pure(IO$monad)(Either$right(Pair$new(_file_nams$8)(_defs$9)))))
                    })();
            }
        })()
    })()))));
    var Fm$checker$io$file = (_file$1 => Monad$bind(IO$monad)(Fm$Synth$file(_file$1)(Map$new))((_loaded$2 => (() => {
        var self = _loaded$2;
        switch (self._) {
            case 'Either.left':
                var $2287 = self.value;
                return Monad$bind(IO$monad)(IO$print(String$flatten(List$cons("On \'")(List$cons(_file$1)(List$cons("\':")(List$nil))))))((_$4 => IO$print($2287)));
            case 'Either.right':
                var $2288 = self.value;
                return (() => {
                    var self = $2288;
                    switch (self._) {
                        case 'Pair.new':
                            var $2289 = self.fst;
                            var $2290 = self.snd;
                            return (() => {
                                var _nams$6 = $2289;
                                var _defs$7 = $2290;
                                return IO$print(Fm$Defs$report(_defs$7)(_nams$6))
                            })();
                    }
                })();
        }
    })())));
    var Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        return Fm$checker$io$file("U32.fm")
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
        'Bits.nil': Bits$nil,
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
        'Word.nil': Word$nil,
        'Word': Word,
        'Word.1': Word$1,
        'Word.0': Word$0,
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
        'Bits.0': Bits$0,
        'Bits.1': Bits$1,
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
        'Fm.Path.0': Fm$Path$0,
        'Fm.Path.1': Fm$Path$1,
        'Fm.Path.to_bits': Fm$Path$to_bits,
        'Fm.Term.bind': Fm$Term$bind,
        'Fm.set': Fm$set,
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
        'Fm.MPath.0': Fm$MPath$0,
        'Fm.MPath.1': Fm$MPath$1,
        'Fm.Error.cant_infer': Fm$Error$cant_infer,
        'Fm.Error.type_mismatch': Fm$Error$type_mismatch,
        'Fm.Error.show_goal': Fm$Error$show_goal,
        'Fm.Term.desugar_cse.motive': Fm$Term$desugar_cse$motive,
        'String.is_empty': String$is_empty,
        'Fm.Term.desugar_cse.argument': Fm$Term$desugar_cse$argument,
        'Maybe.or': Maybe$or,
        'Fm.Term.desugar_cse.cases': Fm$Term$desugar_cse$cases,
        'Fm.Term.desugar_cse': Fm$Term$desugar_cse,
        'Fm.Error.patch': Fm$Error$patch,
        'Fm.MPath.to_bits': Fm$MPath$to_bits,
        'Cmp.as_gte': Cmp$as_gte,
        'Nat.gte': Nat$gte,
        'Nat.sub': Nat$sub,
        'Fm.Term.serialize.name': Fm$Term$serialize$name,
        'Fm.Term.serialize': Fm$Term$serialize,
        'Bits.eql': Bits$eql,
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
        'Fm.Status.done': Fm$Status$done,
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
        'IO.print': IO$print,
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
        'Fm': Fm,
    };
})();