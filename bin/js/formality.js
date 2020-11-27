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

    function u16_to_bits(x) {
        var s = '';
        for (var i = 0; i < 16; ++i) {
            s = (x & 1 ? '1' : '0') + s;
            x = x >>> 1;
        }
        return s;
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
    const inst_unit = x => x(1);
    const elim_unit = (x => {
        var $1 = (() => c0 => {
            var self = x;
            switch ("unit") {
                case 'unit':
                    var $0 = c0;
                    return $0;
            };
        })();
        return $1;
    });
    const inst_bool = x => x(true)(false);
    const elim_bool = (x => {
        var $4 = (() => c0 => c1 => {
            var self = x;
            if (self) {
                var $2 = c2;
                return $2;
            } else {
                var $3 = c2;
                return $3;
            };
        })();
        return $4;
    });
    const inst_nat = x => x(0n)(x0 => 1n + x0);
    const elim_nat = (x => {
        var $8 = (() => c0 => c1 => {
            var self = x;
            if (self === 0n) {
                var $5 = c2;
                return $5;
            } else {
                var $6 = (self - 1n);
                var $7 = c2($6);
                return $7;
            };
        })();
        return $8;
    });
    const inst_bits = x => x('')(x0 => x0 + '0')(x0 => x0 + '1');
    const elim_bits = (x => {
        var $14 = (() => c0 => c1 => c2 => {
            var self = x;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $9 = c0;
                    return $9;
                case 'o':
                    var $10 = self.slice(0, -1);
                    var $11 = c1($10);
                    return $11;
                case 'i':
                    var $12 = self.slice(0, -1);
                    var $13 = c2($12);
                    return $13;
            };
        })();
        return $14;
    });
    const inst_u16 = x => x(x0 => word_to_u16(x0));
    const elim_u16 = (x => {
        var $17 = (() => c0 => {
            var self = x;
            switch ('u16') {
                case 'u16':
                    var $15 = u16_to_word(self);
                    var $16 = c0($15);
                    return $16;
            };
        })();
        return $17;
    });
    const inst_string = x => x('')(x0 => x1 => (String.fromCharCode(x0) + x1));
    const elim_string = (x => {
        var $22 = (() => c0 => c1 => {
            var self = x;
            if (self.length === 0) {
                var $18 = c2;
                return $18;
            } else {
                var $19 = self.charCodeAt(0);
                var $20 = self.slice(1);
                var $21 = c2($19)($20);
                return $21;
            };
        })();
        return $22;
    });
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

    function Monad$bind$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $24 = self.bind;
                var $25 = self.pure;
                var $26 = $24;
                var $23 = $26;
                break;
        };
        return $23;
    };
    const Monad$bind = x0 => Monad$bind$(x0);

    function IO$(_A$1) {
        var $27 = null;
        return $27;
    };
    const IO = x0 => IO$(x0);

    function Monad$new$(_bind$2, _pure$3) {
        var $28 = ({
            _: 'Monad.new',
            'bind': _bind$2,
            'pure': _pure$3
        });
        return $28;
    };
    const Monad$new = x0 => x1 => Monad$new$(x0, x1);

    function IO$ask$(_query$2, _param$3, _then$4) {
        var $29 = ({
            _: 'IO.ask',
            'query': _query$2,
            'param': _param$3,
            'then': _then$4
        });
        return $29;
    };
    const IO$ask = x0 => x1 => x2 => IO$ask$(x0, x1, x2);

    function IO$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'IO.end':
                var $31 = self.value;
                var $32 = _f$4($31);
                var $30 = $32;
                break;
            case 'IO.ask':
                var $33 = self.query;
                var $34 = self.param;
                var $35 = self.then;
                var $36 = IO$ask$($33, $34, (_x$8 => {
                    var $37 = IO$bind$($35(_x$8), _f$4);
                    return $37;
                }));
                var $30 = $36;
                break;
        };
        return $30;
    };
    const IO$bind = x0 => x1 => IO$bind$(x0, x1);

    function IO$end$(_value$2) {
        var $38 = ({
            _: 'IO.end',
            'value': _value$2
        });
        return $38;
    };
    const IO$end = x0 => IO$end$(x0);
    const IO$monad = Monad$new$(IO$bind, IO$end);

    function Map$(_A$1) {
        var $39 = null;
        return $39;
    };
    const Map = x0 => Map$(x0);

    function Maybe$(_A$1) {
        var $40 = null;
        return $40;
    };
    const Maybe = x0 => Maybe$(x0);
    const Maybe$none = ({
        _: 'Maybe.none'
    });

    function Map$get$(_bits$2, _map$3) {
        var Map$get$ = (_bits$2, _map$3) => ({
            ctr: 'TCO',
            arg: [_bits$2, _map$3]
        });
        var Map$get = _bits$2 => _map$3 => Map$get$(_bits$2, _map$3);
        var arg = [_bits$2, _map$3];
        while (true) {
            let [_bits$2, _map$3] = arg;
            var R = (() => {
                var self = _bits$2;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $42 = Maybe$none;
                                var $41 = $42;
                                break;
                            case 'Map.tie':
                                var $43 = self.val;
                                var $44 = self.lft;
                                var $45 = self.rgt;
                                var $46 = $43;
                                var $41 = $46;
                                break;
                        };
                        return $41;
                    case 'o':
                        var $47 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $49 = Maybe$none;
                                var $48 = $49;
                                break;
                            case 'Map.tie':
                                var $50 = self.val;
                                var $51 = self.lft;
                                var $52 = self.rgt;
                                var $53 = Map$get$($47, $51);
                                var $48 = $53;
                                break;
                        };
                        return $48;
                    case 'i':
                        var $54 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.new':
                                var $56 = Maybe$none;
                                var $55 = $56;
                                break;
                            case 'Map.tie':
                                var $57 = self.val;
                                var $58 = self.lft;
                                var $59 = self.rgt;
                                var $60 = Map$get$($54, $59);
                                var $55 = $60;
                                break;
                        };
                        return $55;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Map$get = x0 => x1 => Map$get$(x0, x1);
    const Bits$e = '';
    const Bool$false = false;
    const Bool$and = a0 => a1 => (a0 && a1);
    const Bool$true = true;

    function Cmp$as_lte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $62 = Bool$true;
                var $61 = $62;
                break;
            case 'Cmp.eql':
                var $63 = Bool$true;
                var $61 = $63;
                break;
            case 'Cmp.gtn':
                var $64 = Bool$false;
                var $61 = $64;
                break;
        };
        return $61;
    };
    const Cmp$as_lte = x0 => Cmp$as_lte$(x0);
    const Cmp$ltn = ({
        _: 'Cmp.ltn'
    });
    const Cmp$gtn = ({
        _: 'Cmp.gtn'
    });

    function Word$cmp$go$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $66 = (_b$5 => {
                    var $67 = _c$4;
                    return $67;
                });
                var $65 = $66;
                break;
            case 'Word.o':
                var $68 = self.pred;
                var $69 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $71 = (_a$pred$8 => {
                                var $72 = _c$4;
                                return $72;
                            });
                            var $70 = $71;
                            break;
                        case 'Word.o':
                            var $73 = self.pred;
                            var $74 = (_a$pred$10 => {
                                var $75 = Word$cmp$go$(_a$pred$10, $73, _c$4);
                                return $75;
                            });
                            var $70 = $74;
                            break;
                        case 'Word.i':
                            var $76 = self.pred;
                            var $77 = (_a$pred$10 => {
                                var $78 = Word$cmp$go$(_a$pred$10, $76, Cmp$ltn);
                                return $78;
                            });
                            var $70 = $77;
                            break;
                    };
                    var $70 = $70($68);
                    return $70;
                });
                var $65 = $69;
                break;
            case 'Word.i':
                var $79 = self.pred;
                var $80 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $82 = (_a$pred$8 => {
                                var $83 = _c$4;
                                return $83;
                            });
                            var $81 = $82;
                            break;
                        case 'Word.o':
                            var $84 = self.pred;
                            var $85 = (_a$pred$10 => {
                                var $86 = Word$cmp$go$(_a$pred$10, $84, Cmp$gtn);
                                return $86;
                            });
                            var $81 = $85;
                            break;
                        case 'Word.i':
                            var $87 = self.pred;
                            var $88 = (_a$pred$10 => {
                                var $89 = Word$cmp$go$(_a$pred$10, $87, _c$4);
                                return $89;
                            });
                            var $81 = $88;
                            break;
                    };
                    var $81 = $81($79);
                    return $81;
                });
                var $65 = $80;
                break;
        };
        var $65 = $65(_b$3);
        return $65;
    };
    const Word$cmp$go = x0 => x1 => x2 => Word$cmp$go$(x0, x1, x2);
    const Cmp$eql = ({
        _: 'Cmp.eql'
    });

    function Word$cmp$(_a$2, _b$3) {
        var $90 = Word$cmp$go$(_a$2, _b$3, Cmp$eql);
        return $90;
    };
    const Word$cmp = x0 => x1 => Word$cmp$(x0, x1);

    function Word$lte$(_a$2, _b$3) {
        var $91 = Cmp$as_lte$(Word$cmp$(_a$2, _b$3));
        return $91;
    };
    const Word$lte = x0 => x1 => Word$lte$(x0, x1);

    function Nat$succ$(_pred$1) {
        var $92 = 1n + _pred$1;
        return $92;
    };
    const Nat$succ = x0 => Nat$succ$(x0);
    const Nat$zero = 0n;
    const U16$lte = a0 => a1 => (a0 <= a1);

    function U16$btw$(_a$1, _b$2, _c$3) {
        var $93 = ((_a$1 <= _b$2) && (_b$2 <= _c$3));
        return $93;
    };
    const U16$btw = x0 => x1 => x2 => U16$btw$(x0, x1, x2);

    function U16$new$(_value$1) {
        var $94 = word_to_u16(_value$1);
        return $94;
    };
    const U16$new = x0 => U16$new$(x0);
    const Word$e = ({
        _: 'Word.e'
    });

    function Word$(_size$1) {
        var $95 = null;
        return $95;
    };
    const Word = x0 => Word$(x0);

    function Word$i$(_pred$2) {
        var $96 = ({
            _: 'Word.i',
            'pred': _pred$2
        });
        return $96;
    };
    const Word$i = x0 => Word$i$(x0);

    function Word$o$(_pred$2) {
        var $97 = ({
            _: 'Word.o',
            'pred': _pred$2
        });
        return $97;
    };
    const Word$o = x0 => Word$o$(x0);

    function Word$subber$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $99 = (_b$5 => {
                    var $100 = Word$e;
                    return $100;
                });
                var $98 = $99;
                break;
            case 'Word.o':
                var $101 = self.pred;
                var $102 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $104 = (_a$pred$8 => {
                                var $105 = Word$e;
                                return $105;
                            });
                            var $103 = $104;
                            break;
                        case 'Word.o':
                            var $106 = self.pred;
                            var $107 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $109 = Word$i$(Word$subber$(_a$pred$10, $106, Bool$true));
                                    var $108 = $109;
                                } else {
                                    var $110 = Word$o$(Word$subber$(_a$pred$10, $106, Bool$false));
                                    var $108 = $110;
                                };
                                return $108;
                            });
                            var $103 = $107;
                            break;
                        case 'Word.i':
                            var $111 = self.pred;
                            var $112 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $114 = Word$o$(Word$subber$(_a$pred$10, $111, Bool$true));
                                    var $113 = $114;
                                } else {
                                    var $115 = Word$i$(Word$subber$(_a$pred$10, $111, Bool$true));
                                    var $113 = $115;
                                };
                                return $113;
                            });
                            var $103 = $112;
                            break;
                    };
                    var $103 = $103($101);
                    return $103;
                });
                var $98 = $102;
                break;
            case 'Word.i':
                var $116 = self.pred;
                var $117 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $119 = (_a$pred$8 => {
                                var $120 = Word$e;
                                return $120;
                            });
                            var $118 = $119;
                            break;
                        case 'Word.o':
                            var $121 = self.pred;
                            var $122 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $124 = Word$o$(Word$subber$(_a$pred$10, $121, Bool$false));
                                    var $123 = $124;
                                } else {
                                    var $125 = Word$i$(Word$subber$(_a$pred$10, $121, Bool$false));
                                    var $123 = $125;
                                };
                                return $123;
                            });
                            var $118 = $122;
                            break;
                        case 'Word.i':
                            var $126 = self.pred;
                            var $127 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $129 = Word$i$(Word$subber$(_a$pred$10, $126, Bool$true));
                                    var $128 = $129;
                                } else {
                                    var $130 = Word$o$(Word$subber$(_a$pred$10, $126, Bool$false));
                                    var $128 = $130;
                                };
                                return $128;
                            });
                            var $118 = $127;
                            break;
                    };
                    var $118 = $118($116);
                    return $118;
                });
                var $98 = $117;
                break;
        };
        var $98 = $98(_b$3);
        return $98;
    };
    const Word$subber = x0 => x1 => x2 => Word$subber$(x0, x1, x2);

    function Word$sub$(_a$2, _b$3) {
        var $131 = Word$subber$(_a$2, _b$3, Bool$false);
        return $131;
    };
    const Word$sub = x0 => x1 => Word$sub$(x0, x1);
    const U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));

    function Nat$apply$(_n$2, _f$3, _x$4) {
        var Nat$apply$ = (_n$2, _f$3, _x$4) => ({
            ctr: 'TCO',
            arg: [_n$2, _f$3, _x$4]
        });
        var Nat$apply = _n$2 => _f$3 => _x$4 => Nat$apply$(_n$2, _f$3, _x$4);
        var arg = [_n$2, _f$3, _x$4];
        while (true) {
            let [_n$2, _f$3, _x$4] = arg;
            var R = (() => {
                var self = _n$2;
                if (self === 0n) {
                    var $132 = _x$4;
                    return $132;
                } else {
                    var $133 = (self - 1n);
                    var $134 = Nat$apply$($133, _f$3, _f$3(_x$4));
                    return $134;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$apply = x0 => x1 => x2 => Nat$apply$(x0, x1, x2);

    function Word$inc$(_word$2) {
        var self = _word$2;
        switch (self._) {
            case 'Word.e':
                var $136 = Word$e;
                var $135 = $136;
                break;
            case 'Word.o':
                var $137 = self.pred;
                var $138 = Word$i$($137);
                var $135 = $138;
                break;
            case 'Word.i':
                var $139 = self.pred;
                var $140 = Word$o$(Word$inc$($139));
                var $135 = $140;
                break;
        };
        return $135;
    };
    const Word$inc = x0 => Word$inc$(x0);

    function U16$inc$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $142 = u16_to_word(self);
                var $143 = U16$new$(Word$inc$($142));
                var $141 = $143;
                break;
        };
        return $141;
    };
    const U16$inc = x0 => U16$inc$(x0);

    function Word$zero$(_size$1) {
        var self = _size$1;
        if (self === 0n) {
            var $145 = Word$e;
            var $144 = $145;
        } else {
            var $146 = (self - 1n);
            var $147 = Word$o$(Word$zero$($146));
            var $144 = $147;
        };
        return $144;
    };
    const Word$zero = x0 => Word$zero$(x0);
    const U16$zero = U16$new$(Word$zero$(16n));
    const Nat$to_u16 = a0 => (Number(a0));

    function Word$adder$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $149 = (_b$5 => {
                    var $150 = Word$e;
                    return $150;
                });
                var $148 = $149;
                break;
            case 'Word.o':
                var $151 = self.pred;
                var $152 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $154 = (_a$pred$8 => {
                                var $155 = Word$e;
                                return $155;
                            });
                            var $153 = $154;
                            break;
                        case 'Word.o':
                            var $156 = self.pred;
                            var $157 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $159 = Word$i$(Word$adder$(_a$pred$10, $156, Bool$false));
                                    var $158 = $159;
                                } else {
                                    var $160 = Word$o$(Word$adder$(_a$pred$10, $156, Bool$false));
                                    var $158 = $160;
                                };
                                return $158;
                            });
                            var $153 = $157;
                            break;
                        case 'Word.i':
                            var $161 = self.pred;
                            var $162 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $164 = Word$o$(Word$adder$(_a$pred$10, $161, Bool$true));
                                    var $163 = $164;
                                } else {
                                    var $165 = Word$i$(Word$adder$(_a$pred$10, $161, Bool$false));
                                    var $163 = $165;
                                };
                                return $163;
                            });
                            var $153 = $162;
                            break;
                    };
                    var $153 = $153($151);
                    return $153;
                });
                var $148 = $152;
                break;
            case 'Word.i':
                var $166 = self.pred;
                var $167 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.e':
                            var $169 = (_a$pred$8 => {
                                var $170 = Word$e;
                                return $170;
                            });
                            var $168 = $169;
                            break;
                        case 'Word.o':
                            var $171 = self.pred;
                            var $172 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $174 = Word$o$(Word$adder$(_a$pred$10, $171, Bool$true));
                                    var $173 = $174;
                                } else {
                                    var $175 = Word$i$(Word$adder$(_a$pred$10, $171, Bool$false));
                                    var $173 = $175;
                                };
                                return $173;
                            });
                            var $168 = $172;
                            break;
                        case 'Word.i':
                            var $176 = self.pred;
                            var $177 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $179 = Word$i$(Word$adder$(_a$pred$10, $176, Bool$true));
                                    var $178 = $179;
                                } else {
                                    var $180 = Word$o$(Word$adder$(_a$pred$10, $176, Bool$true));
                                    var $178 = $180;
                                };
                                return $178;
                            });
                            var $168 = $177;
                            break;
                    };
                    var $168 = $168($166);
                    return $168;
                });
                var $148 = $167;
                break;
        };
        var $148 = $148(_b$3);
        return $148;
    };
    const Word$adder = x0 => x1 => x2 => Word$adder$(x0, x1, x2);

    function Word$add$(_a$2, _b$3) {
        var $181 = Word$adder$(_a$2, _b$3, Bool$false);
        return $181;
    };
    const Word$add = x0 => x1 => Word$add$(x0, x1);
    const U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);

    function Cmp$as_eql$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $183 = Bool$false;
                var $182 = $183;
                break;
            case 'Cmp.eql':
                var $184 = Bool$true;
                var $182 = $184;
                break;
            case 'Cmp.gtn':
                var $185 = Bool$false;
                var $182 = $185;
                break;
        };
        return $182;
    };
    const Cmp$as_eql = x0 => Cmp$as_eql$(x0);

    function Word$eql$(_a$2, _b$3) {
        var $186 = Cmp$as_eql$(Word$cmp$(_a$2, _b$3));
        return $186;
    };
    const Word$eql = x0 => x1 => Word$eql$(x0, x1);
    const U16$eql = a0 => a1 => (a0 === a1);
    const Bits$o = a0 => (a0 + '0');
    const Bits$i = a0 => (a0 + '1');

    function Word$to_bits$(_a$2) {
        var self = _a$2;
        switch (self._) {
            case 'Word.e':
                var $188 = Bits$e;
                var $187 = $188;
                break;
            case 'Word.o':
                var $189 = self.pred;
                var $190 = (Word$to_bits$($189) + '0');
                var $187 = $190;
                break;
            case 'Word.i':
                var $191 = self.pred;
                var $192 = (Word$to_bits$($191) + '1');
                var $187 = $192;
                break;
        };
        return $187;
    };
    const Word$to_bits = x0 => Word$to_bits$(x0);

    function Word$trim$(_new_size$2, _word$3) {
        var self = _new_size$2;
        if (self === 0n) {
            var $194 = Word$e;
            var $193 = $194;
        } else {
            var $195 = (self - 1n);
            var self = _word$3;
            switch (self._) {
                case 'Word.e':
                    var $197 = Word$o$(Word$trim$($195, Word$e));
                    var $196 = $197;
                    break;
                case 'Word.o':
                    var $198 = self.pred;
                    var $199 = Word$o$(Word$trim$($195, $198));
                    var $196 = $199;
                    break;
                case 'Word.i':
                    var $200 = self.pred;
                    var $201 = Word$i$(Word$trim$($195, $200));
                    var $196 = $201;
                    break;
            };
            var $193 = $196;
        };
        return $193;
    };
    const Word$trim = x0 => x1 => Word$trim$(x0, x1);
    const Bits$concat = a0 => a1 => (a1 + a0);

    function Bits$reverse$tco$(_a$1, _r$2) {
        var Bits$reverse$tco$ = (_a$1, _r$2) => ({
            ctr: 'TCO',
            arg: [_a$1, _r$2]
        });
        var Bits$reverse$tco = _a$1 => _r$2 => Bits$reverse$tco$(_a$1, _r$2);
        var arg = [_a$1, _r$2];
        while (true) {
            let [_a$1, _r$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $202 = _r$2;
                        return $202;
                    case 'o':
                        var $203 = self.slice(0, -1);
                        var $204 = Bits$reverse$tco$($203, (_r$2 + '0'));
                        return $204;
                    case 'i':
                        var $205 = self.slice(0, -1);
                        var $206 = Bits$reverse$tco$($205, (_r$2 + '1'));
                        return $206;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Bits$reverse$tco = x0 => x1 => Bits$reverse$tco$(x0, x1);

    function Bits$reverse$(_a$1) {
        var $207 = Bits$reverse$tco$(_a$1, Bits$e);
        return $207;
    };
    const Bits$reverse = x0 => Bits$reverse$(x0);
    const Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));

    function Fm$get$(_name$2, _map$3) {
        var $208 = Map$get$((fm_name_to_bits(_name$2)), _map$3);
        return $208;
    };
    const Fm$get = x0 => x1 => Fm$get$(x0, x1);

    function String$cons$(_head$1, _tail$2) {
        var $209 = (String.fromCharCode(_head$1) + _tail$2);
        return $209;
    };
    const String$cons = x0 => x1 => String$cons$(x0, x1);

    function Fm$Synth$file_of$(_name$1) {
        var self = _name$1;
        if (self.length === 0) {
            var $211 = ".fm";
            var $210 = $211;
        } else {
            var $212 = self.charCodeAt(0);
            var $213 = self.slice(1);
            var self = ($212 === 46);
            if (self) {
                var $215 = ".fm";
                var $214 = $215;
            } else {
                var $216 = String$cons$($212, Fm$Synth$file_of$($213));
                var $214 = $216;
            };
            var $210 = $214;
        };
        return $210;
    };
    const Fm$Synth$file_of = x0 => Fm$Synth$file_of$(x0);

    function IO$get_file$(_name$1) {
        var $217 = IO$ask$("get_file", _name$1, (_file$2 => {
            var $218 = IO$end$(_file$2);
            return $218;
        }));
        return $217;
    };
    const IO$get_file = x0 => IO$get_file$(x0);

    function Parser$(_V$1) {
        var $219 = null;
        return $219;
    };
    const Parser = x0 => Parser$(x0);

    function Parser$Reply$(_V$1) {
        var $220 = null;
        return $220;
    };
    const Parser$Reply = x0 => Parser$Reply$(x0);

    function Parser$Reply$error$(_idx$2, _code$3, _err$4) {
        var $221 = ({
            _: 'Parser.Reply.error',
            'idx': _idx$2,
            'code': _code$3,
            'err': _err$4
        });
        return $221;
    };
    const Parser$Reply$error = x0 => x1 => x2 => Parser$Reply$error$(x0, x1, x2);

    function Parser$bind$(_parse$3, _next$4, _idx$5, _code$6) {
        var self = _parse$3(_idx$5)(_code$6);
        switch (self._) {
            case 'Parser.Reply.error':
                var $223 = self.idx;
                var $224 = self.code;
                var $225 = self.err;
                var $226 = Parser$Reply$error$($223, $224, $225);
                var $222 = $226;
                break;
            case 'Parser.Reply.value':
                var $227 = self.idx;
                var $228 = self.code;
                var $229 = self.val;
                var $230 = _next$4($229)($227)($228);
                var $222 = $230;
                break;
        };
        return $222;
    };
    const Parser$bind = x0 => x1 => x2 => x3 => Parser$bind$(x0, x1, x2, x3);

    function Parser$Reply$value$(_idx$2, _code$3, _val$4) {
        var $231 = ({
            _: 'Parser.Reply.value',
            'idx': _idx$2,
            'code': _code$3,
            'val': _val$4
        });
        return $231;
    };
    const Parser$Reply$value = x0 => x1 => x2 => Parser$Reply$value$(x0, x1, x2);

    function Parser$pure$(_value$2, _idx$3, _code$4) {
        var $232 = Parser$Reply$value$(_idx$3, _code$4, _value$2);
        return $232;
    };
    const Parser$pure = x0 => x1 => x2 => Parser$pure$(x0, x1, x2);
    const Parser$monad = Monad$new$(Parser$bind, Parser$pure);

    function Parser$is_eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $234 = Parser$Reply$value$(_idx$1, _code$2, Bool$true);
            var $233 = $234;
        } else {
            var $235 = self.charCodeAt(0);
            var $236 = self.slice(1);
            var $237 = Parser$Reply$value$(_idx$1, _code$2, Bool$false);
            var $233 = $237;
        };
        return $233;
    };
    const Parser$is_eof = x0 => x1 => Parser$is_eof$(x0, x1);

    function Monad$pure$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $239 = self.bind;
                var $240 = self.pure;
                var $241 = $240;
                var $238 = $241;
                break;
        };
        return $238;
    };
    const Monad$pure = x0 => Monad$pure$(x0);

    function Maybe$some$(_value$2) {
        var $242 = ({
            _: 'Maybe.some',
            'value': _value$2
        });
        return $242;
    };
    const Maybe$some = x0 => Maybe$some$(x0);

    function Parser$ErrorAt$new$(_idx$1, _code$2, _err$3) {
        var $243 = ({
            _: 'Parser.ErrorAt.new',
            'idx': _idx$1,
            'code': _code$2,
            'err': _err$3
        });
        return $243;
    };
    const Parser$ErrorAt$new = x0 => x1 => x2 => Parser$ErrorAt$new$(x0, x1, x2);

    function Cmp$as_gtn$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $245 = Bool$false;
                var $244 = $245;
                break;
            case 'Cmp.eql':
                var $246 = Bool$false;
                var $244 = $246;
                break;
            case 'Cmp.gtn':
                var $247 = Bool$true;
                var $244 = $247;
                break;
        };
        return $244;
    };
    const Cmp$as_gtn = x0 => Cmp$as_gtn$(x0);

    function Nat$cmp$(_a$1, _b$2) {
        var Nat$cmp$ = (_a$1, _b$2) => ({
            ctr: 'TCO',
            arg: [_a$1, _b$2]
        });
        var Nat$cmp = _a$1 => _b$2 => Nat$cmp$(_a$1, _b$2);
        var arg = [_a$1, _b$2];
        while (true) {
            let [_a$1, _b$2] = arg;
            var R = (() => {
                var self = _a$1;
                if (self === 0n) {
                    var self = _b$2;
                    if (self === 0n) {
                        var $249 = Cmp$eql;
                        var $248 = $249;
                    } else {
                        var $250 = (self - 1n);
                        var $251 = Cmp$ltn;
                        var $248 = $251;
                    };
                    return $248;
                } else {
                    var $252 = (self - 1n);
                    var self = _b$2;
                    if (self === 0n) {
                        var $254 = Cmp$gtn;
                        var $253 = $254;
                    } else {
                        var $255 = (self - 1n);
                        var $256 = Nat$cmp$($252, $255);
                        var $253 = $256;
                    };
                    return $253;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$cmp = x0 => x1 => Nat$cmp$(x0, x1);
    const Nat$gtn = a0 => a1 => (a0 > a1);

    function Parser$ErrorAt$combine$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Maybe.none':
                var $258 = _b$2;
                var $257 = $258;
                break;
            case 'Maybe.some':
                var $259 = self.value;
                var self = _b$2;
                switch (self._) {
                    case 'Maybe.none':
                        var $261 = _a$1;
                        var $260 = $261;
                        break;
                    case 'Maybe.some':
                        var $262 = self.value;
                        var self = $259;
                        switch (self._) {
                            case 'Parser.ErrorAt.new':
                                var $264 = self.idx;
                                var $265 = self.code;
                                var $266 = self.err;
                                var self = $262;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $268 = self.idx;
                                        var $269 = self.code;
                                        var $270 = self.err;
                                        var self = ($264 > $268);
                                        if (self) {
                                            var $272 = _a$1;
                                            var $271 = $272;
                                        } else {
                                            var $273 = _b$2;
                                            var $271 = $273;
                                        };
                                        var $267 = $271;
                                        break;
                                };
                                var $263 = $267;
                                break;
                        };
                        var $260 = $263;
                        break;
                };
                var $257 = $260;
                break;
        };
        return $257;
    };
    const Parser$ErrorAt$combine = x0 => x1 => Parser$ErrorAt$combine$(x0, x1);

    function Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5) {
        var Parser$first_of$go$ = (_pars$2, _err$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_pars$2, _err$3, _idx$4, _code$5]
        });
        var Parser$first_of$go = _pars$2 => _err$3 => _idx$4 => _code$5 => Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5);
        var arg = [_pars$2, _err$3, _idx$4, _code$5];
        while (true) {
            let [_pars$2, _err$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _pars$2;
                switch (self._) {
                    case 'List.nil':
                        var self = _err$3;
                        switch (self._) {
                            case 'Maybe.none':
                                var $275 = Parser$Reply$error$(_idx$4, _code$5, "No parse.");
                                var $274 = $275;
                                break;
                            case 'Maybe.some':
                                var $276 = self.value;
                                var self = $276;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $278 = self.idx;
                                        var $279 = self.code;
                                        var $280 = self.err;
                                        var $281 = Parser$Reply$error$($278, $279, $280);
                                        var $277 = $281;
                                        break;
                                };
                                var $274 = $277;
                                break;
                        };
                        return $274;
                    case 'List.cons':
                        var $282 = self.head;
                        var $283 = self.tail;
                        var _parsed$8 = $282(_idx$4)(_code$5);
                        var self = _parsed$8;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $285 = self.idx;
                                var $286 = self.code;
                                var $287 = self.err;
                                var _neo$12 = Maybe$some$(Parser$ErrorAt$new$($285, $286, $287));
                                var _err$13 = Parser$ErrorAt$combine$(_neo$12, _err$3);
                                var $288 = Parser$first_of$go$($283, _err$13, _idx$4, _code$5);
                                var $284 = $288;
                                break;
                            case 'Parser.Reply.value':
                                var $289 = self.idx;
                                var $290 = self.code;
                                var $291 = self.val;
                                var $292 = Parser$Reply$value$($289, $290, $291);
                                var $284 = $292;
                                break;
                        };
                        return $284;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$first_of$go = x0 => x1 => x2 => x3 => Parser$first_of$go$(x0, x1, x2, x3);

    function Parser$first_of$(_pars$2) {
        var $293 = Parser$first_of$go(_pars$2)(Maybe$none);
        return $293;
    };
    const Parser$first_of = x0 => Parser$first_of$(x0);

    function List$cons$(_head$2, _tail$3) {
        var $294 = ({
            _: 'List.cons',
            'head': _head$2,
            'tail': _tail$3
        });
        return $294;
    };
    const List$cons = x0 => x1 => List$cons$(x0, x1);

    function List$(_A$1) {
        var $295 = null;
        return $295;
    };
    const List = x0 => List$(x0);
    const List$nil = ({
        _: 'List.nil'
    });

    function Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5) {
        var Parser$many$go$ = (_parse$2, _values$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_parse$2, _values$3, _idx$4, _code$5]
        });
        var Parser$many$go = _parse$2 => _values$3 => _idx$4 => _code$5 => Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5);
        var arg = [_parse$2, _values$3, _idx$4, _code$5];
        while (true) {
            let [_parse$2, _values$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _parse$2(_idx$4)(_code$5);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $296 = self.idx;
                        var $297 = self.code;
                        var $298 = self.err;
                        var $299 = Parser$Reply$value$(_idx$4, _code$5, _values$3(List$nil));
                        return $299;
                    case 'Parser.Reply.value':
                        var $300 = self.idx;
                        var $301 = self.code;
                        var $302 = self.val;
                        var $303 = Parser$many$go$(_parse$2, (_xs$9 => {
                            var $304 = _values$3(List$cons$($302, _xs$9));
                            return $304;
                        }), $300, $301);
                        return $303;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$many$go = x0 => x1 => x2 => x3 => Parser$many$go$(x0, x1, x2, x3);

    function Parser$many$(_parser$2) {
        var $305 = Parser$many$go(_parser$2)((_x$3 => {
            var $306 = _x$3;
            return $306;
        }));
        return $305;
    };
    const Parser$many = x0 => Parser$many$(x0);
    const Unit$new = 1;
    const String$concat = a0 => a1 => (a0 + a1);

    function String$flatten$go$(_xs$1, _res$2) {
        var String$flatten$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$flatten$go = _xs$1 => _res$2 => String$flatten$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                switch (self._) {
                    case 'List.nil':
                        var $307 = _res$2;
                        return $307;
                    case 'List.cons':
                        var $308 = self.head;
                        var $309 = self.tail;
                        var $310 = String$flatten$go$($309, (_res$2 + $308));
                        return $310;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$flatten$go = x0 => x1 => String$flatten$go$(x0, x1);

    function String$flatten$(_xs$1) {
        var $311 = String$flatten$go$(_xs$1, "");
        return $311;
    };
    const String$flatten = x0 => String$flatten$(x0);
    const String$nil = '';

    function Parser$text$go$(_text$1, _idx$2, _code$3) {
        var self = _text$1;
        if (self.length === 0) {
            var $313 = Parser$Reply$value$(_idx$2, _code$3, Unit$new);
            var $312 = $313;
        } else {
            var $314 = self.charCodeAt(0);
            var $315 = self.slice(1);
            var self = _code$3;
            if (self.length === 0) {
                var _error$6 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found end of file.", List$nil))));
                var $317 = Parser$Reply$error$(_idx$2, _code$3, _error$6);
                var $316 = $317;
            } else {
                var $318 = self.charCodeAt(0);
                var $319 = self.slice(1);
                var self = ($314 === $318);
                if (self) {
                    var $321 = Parser$text$($315, Nat$succ$(_idx$2), $319);
                    var $320 = $321;
                } else {
                    var _error$8 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found \'", List$cons$(String$cons$($318, String$nil), List$cons$("\'.", List$nil))))));
                    var $322 = Parser$Reply$error$(_idx$2, _code$3, _error$8);
                    var $320 = $322;
                };
                var $316 = $320;
            };
            var $312 = $316;
        };
        return $312;
    };
    const Parser$text$go = x0 => x1 => x2 => Parser$text$go$(x0, x1, x2);

    function Parser$text$(_text$1, _idx$2, _code$3) {
        var self = Parser$text$go$(_text$1, _idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $324 = self.idx;
                var $325 = self.code;
                var $326 = self.err;
                var $327 = Parser$Reply$error$(_idx$2, _code$3, $326);
                var $323 = $327;
                break;
            case 'Parser.Reply.value':
                var $328 = self.idx;
                var $329 = self.code;
                var $330 = self.val;
                var $331 = Parser$Reply$value$($328, $329, $330);
                var $323 = $331;
                break;
        };
        return $323;
    };
    const Parser$text = x0 => x1 => x2 => Parser$text$(x0, x1, x2);

    function Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6) {
        var Parser$until$go$ = (_until$2, _parse$3, _values$4, _idx$5, _code$6) => ({
            ctr: 'TCO',
            arg: [_until$2, _parse$3, _values$4, _idx$5, _code$6]
        });
        var Parser$until$go = _until$2 => _parse$3 => _values$4 => _idx$5 => _code$6 => Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6);
        var arg = [_until$2, _parse$3, _values$4, _idx$5, _code$6];
        while (true) {
            let [_until$2, _parse$3, _values$4, _idx$5, _code$6] = arg;
            var R = (() => {
                var _until_reply$7 = _until$2(_idx$5)(_code$6);
                var self = _until_reply$7;
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $333 = self.idx;
                        var $334 = self.code;
                        var $335 = self.err;
                        var _reply$11 = _parse$3(_idx$5)(_code$6);
                        var self = _reply$11;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $337 = self.idx;
                                var $338 = self.code;
                                var $339 = self.err;
                                var $340 = Parser$Reply$error$($337, $338, $339);
                                var $336 = $340;
                                break;
                            case 'Parser.Reply.value':
                                var $341 = self.idx;
                                var $342 = self.code;
                                var $343 = self.val;
                                var $344 = Parser$until$go$(_until$2, _parse$3, (_xs$15 => {
                                    var $345 = _values$4(List$cons$($343, _xs$15));
                                    return $345;
                                }), $341, $342);
                                var $336 = $344;
                                break;
                        };
                        var $332 = $336;
                        break;
                    case 'Parser.Reply.value':
                        var $346 = self.idx;
                        var $347 = self.code;
                        var $348 = self.val;
                        var $349 = Parser$Reply$value$($346, $347, _values$4(List$nil));
                        var $332 = $349;
                        break;
                };
                return $332;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$until$go = x0 => x1 => x2 => x3 => x4 => Parser$until$go$(x0, x1, x2, x3, x4);

    function Parser$until$(_until$2, _parse$3) {
        var $350 = Parser$until$go(_until$2)(_parse$3)((_x$4 => {
            var $351 = _x$4;
            return $351;
        }));
        return $350;
    };
    const Parser$until = x0 => x1 => Parser$until$(x0, x1);

    function Parser$one$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $353 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected end of file.");
            var $352 = $353;
        } else {
            var $354 = self.charCodeAt(0);
            var $355 = self.slice(1);
            var $356 = Parser$Reply$value$(Nat$succ$(_idx$1), $355, $354);
            var $352 = $356;
        };
        return $352;
    };
    const Parser$one = x0 => x1 => Parser$one$(x0, x1);
    const Fm$Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$cons$(Monad$bind$(Parser$monad)(Parser$text("//"))((_$1 => {
        var $357 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text("\u{a}"), Parser$one))((_$2 => {
            var $358 = Monad$pure$(Parser$monad)(Unit$new);
            return $358;
        }));
        return $357;
    })), List$nil)))));

    function Fm$Parser$text$(_text$1) {
        var $359 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $360 = Parser$text(_text$1);
            return $360;
        }));
        return $359;
    };
    const Fm$Parser$text = x0 => Fm$Parser$text$(x0);

    function Parser$many1$(_parser$2) {
        var $361 = Monad$bind$(Parser$monad)(_parser$2)((_head$3 => {
            var $362 = Monad$bind$(Parser$monad)(Parser$many$(_parser$2))((_tail$4 => {
                var $363 = Monad$pure$(Parser$monad)(List$cons$(_head$3, _tail$4));
                return $363;
            }));
            return $362;
        }));
        return $361;
    };
    const Parser$many1 = x0 => Parser$many1$(x0);

    function Fm$Name$is_letter$(_chr$1) {
        var self = U16$btw$(65, _chr$1, 90);
        if (self) {
            var $365 = Bool$true;
            var $364 = $365;
        } else {
            var self = U16$btw$(97, _chr$1, 122);
            if (self) {
                var $367 = Bool$true;
                var $366 = $367;
            } else {
                var self = U16$btw$(48, _chr$1, 57);
                if (self) {
                    var $369 = Bool$true;
                    var $368 = $369;
                } else {
                    var self = (46 === _chr$1);
                    if (self) {
                        var $371 = Bool$true;
                        var $370 = $371;
                    } else {
                        var self = (95 === _chr$1);
                        if (self) {
                            var $373 = Bool$true;
                            var $372 = $373;
                        } else {
                            var $374 = Bool$false;
                            var $372 = $374;
                        };
                        var $370 = $372;
                    };
                    var $368 = $370;
                };
                var $366 = $368;
            };
            var $364 = $366;
        };
        return $364;
    };
    const Fm$Name$is_letter = x0 => Fm$Name$is_letter$(x0);

    function Fm$Parser$letter$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $376 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected eof.");
            var $375 = $376;
        } else {
            var $377 = self.charCodeAt(0);
            var $378 = self.slice(1);
            var self = Fm$Name$is_letter$($377);
            if (self) {
                var $380 = Parser$Reply$value$(Nat$succ$(_idx$1), $378, $377);
                var $379 = $380;
            } else {
                var $381 = Parser$Reply$error$(_idx$1, _code$2, "Expected letter.");
                var $379 = $381;
            };
            var $375 = $379;
        };
        return $375;
    };
    const Fm$Parser$letter = x0 => x1 => Fm$Parser$letter$(x0, x1);

    function List$fold$(_list$2, _nil$4, _cons$5) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $383 = _nil$4;
                var $382 = $383;
                break;
            case 'List.cons':
                var $384 = self.head;
                var $385 = self.tail;
                var $386 = _cons$5($384)(List$fold$($385, _nil$4, _cons$5));
                var $382 = $386;
                break;
        };
        return $382;
    };
    const List$fold = x0 => x1 => x2 => List$fold$(x0, x1, x2);
    const Fm$Parser$name1 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $387 = Monad$bind$(Parser$monad)(Parser$many1$(Fm$Parser$letter))((_chrs$2 => {
            var $388 = Monad$pure$(Parser$monad)(List$fold$(_chrs$2, String$nil, String$cons));
            return $388;
        }));
        return $387;
    }));
    const Fm$Parser$name = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $389 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$letter))((_chrs$2 => {
            var $390 = Monad$pure$(Parser$monad)(List$fold$(_chrs$2, String$nil, String$cons));
            return $390;
        }));
        return $389;
    }));

    function Pair$(_A$1, _B$2) {
        var $391 = null;
        return $391;
    };
    const Pair = x0 => x1 => Pair$(x0, x1);

    function Parser$until1$(_cond$2, _parser$3) {
        var $392 = Monad$bind$(Parser$monad)(_parser$3)((_head$4 => {
            var $393 = Monad$bind$(Parser$monad)(Parser$until$(_cond$2, _parser$3))((_tail$5 => {
                var $394 = Monad$pure$(Parser$monad)(List$cons$(_head$4, _tail$5));
                return $394;
            }));
            return $393;
        }));
        return $392;
    };
    const Parser$until1 = x0 => x1 => Parser$until1$(x0, x1);

    function Parser$maybe$(_parse$2, _idx$3, _code$4) {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $396 = self.idx;
                var $397 = self.code;
                var $398 = self.err;
                var $399 = Parser$Reply$value$(_idx$3, _code$4, Maybe$none);
                var $395 = $399;
                break;
            case 'Parser.Reply.value':
                var $400 = self.idx;
                var $401 = self.code;
                var $402 = self.val;
                var $403 = Parser$Reply$value$($400, $401, Maybe$some$($402));
                var $395 = $403;
                break;
        };
        return $395;
    };
    const Parser$maybe = x0 => x1 => x2 => Parser$maybe$(x0, x1, x2);

    function Fm$Parser$item$(_parser$2) {
        var $404 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
            var $405 = Monad$bind$(Parser$monad)(_parser$2)((_value$4 => {
                var $406 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$5 => {
                    var $407 = Monad$pure$(Parser$monad)(_value$4);
                    return $407;
                }));
                return $406;
            }));
            return $405;
        }));
        return $404;
    };
    const Fm$Parser$item = x0 => Fm$Parser$item$(x0);

    function Parser$get_index$(_idx$1, _code$2) {
        var $408 = Parser$Reply$value$(_idx$1, _code$2, _idx$1);
        return $408;
    };
    const Parser$get_index = x0 => x1 => Parser$get_index$(x0, x1);
    const Fm$Parser$init = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $409 = Monad$bind$(Parser$monad)(Parser$get_index)((_from$2 => {
            var $410 = Monad$pure$(Parser$monad)(_from$2);
            return $410;
        }));
        return $409;
    }));

    function Fm$Origin$new$(_file$1, _from$2, _upto$3) {
        var $411 = ({
            _: 'Fm.Origin.new',
            'file': _file$1,
            'from': _from$2,
            'upto': _upto$3
        });
        return $411;
    };
    const Fm$Origin$new = x0 => x1 => x2 => Fm$Origin$new$(x0, x1, x2);

    function Fm$Parser$stop$(_from$1) {
        var $412 = Monad$bind$(Parser$monad)(Parser$get_index)((_upto$2 => {
            var _orig$3 = Fm$Origin$new$("", _from$1, _upto$2);
            var $413 = Monad$pure$(Parser$monad)(_orig$3);
            return $413;
        }));
        return $412;
    };
    const Fm$Parser$stop = x0 => Fm$Parser$stop$(x0);

    function Fm$Term$ori$(_orig$1, _expr$2) {
        var $414 = ({
            _: 'Fm.Term.ori',
            'orig': _orig$1,
            'expr': _expr$2
        });
        return $414;
    };
    const Fm$Term$ori = x0 => x1 => Fm$Term$ori$(x0, x1);
    const Fm$Term$typ = ({
        _: 'Fm.Term.typ'
    });
    const Fm$Parser$type = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $415 = Monad$bind$(Parser$monad)(Fm$Parser$text$("Type"))((_$2 => {
            var $416 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $417 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$typ));
                return $417;
            }));
            return $416;
        }));
        return $415;
    }));

    function Fm$Term$all$(_eras$1, _self$2, _name$3, _xtyp$4, _body$5) {
        var $418 = ({
            _: 'Fm.Term.all',
            'eras': _eras$1,
            'self': _self$2,
            'name': _name$3,
            'xtyp': _xtyp$4,
            'body': _body$5
        });
        return $418;
    };
    const Fm$Term$all = x0 => x1 => x2 => x3 => x4 => Fm$Term$all$(x0, x1, x2, x3, x4);
    const Fm$Parser$forall = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $419 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_self$2 => {
            var $420 = Monad$bind$(Parser$monad)(Fm$Parser$binder)((_bind$3 => {
                var $421 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$("->")))((_$4 => {
                    var $422 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$5 => {
                        var _term$6 = List$fold$(_bind$3, _body$5, (_x$6 => _t$7 => {
                            var self = _x$6;
                            switch (self._) {
                                case 'Fm.Binder.new':
                                    var $425 = self.eras;
                                    var $426 = self.name;
                                    var $427 = self.term;
                                    var $428 = Fm$Term$all$($425, "", $426, $427, (_s$11 => _x$12 => {
                                        var $429 = _t$7;
                                        return $429;
                                    }));
                                    var $424 = $428;
                                    break;
                            };
                            return $424;
                        }));
                        var $423 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                            var $430 = Monad$pure$(Parser$monad)((() => {
                                var self = _term$6;
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $431 = self.name;
                                        var $432 = self.indx;
                                        var $433 = _term$6;
                                        return $433;
                                    case 'Fm.Term.ref':
                                        var $434 = self.name;
                                        var $435 = _term$6;
                                        return $435;
                                    case 'Fm.Term.typ':
                                        var $436 = _term$6;
                                        return $436;
                                    case 'Fm.Term.all':
                                        var $437 = self.eras;
                                        var $438 = self.self;
                                        var $439 = self.name;
                                        var $440 = self.xtyp;
                                        var $441 = self.body;
                                        var $442 = Fm$Term$ori$(_orig$7, Fm$Term$all$($437, _self$2, $439, $440, $441));
                                        return $442;
                                    case 'Fm.Term.lam':
                                        var $443 = self.name;
                                        var $444 = self.body;
                                        var $445 = _term$6;
                                        return $445;
                                    case 'Fm.Term.app':
                                        var $446 = self.func;
                                        var $447 = self.argm;
                                        var $448 = _term$6;
                                        return $448;
                                    case 'Fm.Term.let':
                                        var $449 = self.name;
                                        var $450 = self.expr;
                                        var $451 = self.body;
                                        var $452 = _term$6;
                                        return $452;
                                    case 'Fm.Term.def':
                                        var $453 = self.name;
                                        var $454 = self.expr;
                                        var $455 = self.body;
                                        var $456 = _term$6;
                                        return $456;
                                    case 'Fm.Term.ann':
                                        var $457 = self.done;
                                        var $458 = self.term;
                                        var $459 = self.type;
                                        var $460 = _term$6;
                                        return $460;
                                    case 'Fm.Term.gol':
                                        var $461 = self.name;
                                        var $462 = self.dref;
                                        var $463 = self.verb;
                                        var $464 = _term$6;
                                        return $464;
                                    case 'Fm.Term.hol':
                                        var $465 = self.path;
                                        var $466 = _term$6;
                                        return $466;
                                    case 'Fm.Term.nat':
                                        var $467 = self.natx;
                                        var $468 = _term$6;
                                        return $468;
                                    case 'Fm.Term.chr':
                                        var $469 = self.chrx;
                                        var $470 = _term$6;
                                        return $470;
                                    case 'Fm.Term.str':
                                        var $471 = self.strx;
                                        var $472 = _term$6;
                                        return $472;
                                    case 'Fm.Term.cse':
                                        var $473 = self.path;
                                        var $474 = self.expr;
                                        var $475 = self.name;
                                        var $476 = self.with;
                                        var $477 = self.cses;
                                        var $478 = self.moti;
                                        var $479 = _term$6;
                                        return $479;
                                    case 'Fm.Term.ori':
                                        var $480 = self.orig;
                                        var $481 = self.expr;
                                        var $482 = _term$6;
                                        return $482;
                                };
                            })());
                            return $430;
                        }));
                        return $423;
                    }));
                    return $422;
                }));
                return $421;
            }));
            return $420;
        }));
        return $419;
    }));

    function Fm$Term$lam$(_name$1, _body$2) {
        var $483 = ({
            _: 'Fm.Term.lam',
            'name': _name$1,
            'body': _body$2
        });
        return $483;
    };
    const Fm$Term$lam = x0 => x1 => Fm$Term$lam$(x0, x1);

    function Fm$Parser$make_lambda$(_names$1, _body$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $485 = _body$2;
                var $484 = $485;
                break;
            case 'List.cons':
                var $486 = self.head;
                var $487 = self.tail;
                var $488 = Fm$Term$lam$($486, (_x$5 => {
                    var $489 = Fm$Parser$make_lambda$($487, _body$2);
                    return $489;
                }));
                var $484 = $488;
                break;
        };
        return $484;
    };
    const Fm$Parser$make_lambda = x0 => x1 => Fm$Parser$make_lambda$(x0, x1);
    const Fm$Parser$lambda = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $490 = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$2 => {
            var $491 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $492 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $493 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $494 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $494;
                    }));
                    return $493;
                }));
                return $492;
            }));
            return $491;
        }));
        return $490;
    }));
    const Fm$Parser$lambda$erased = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $495 = Monad$bind$(Parser$monad)(Fm$Parser$text$("<"))((_$2 => {
            var $496 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(">"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $497 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $498 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $499 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $499;
                    }));
                    return $498;
                }));
                return $497;
            }));
            return $496;
        }));
        return $495;
    }));
    const Fm$Parser$lambda$nameless = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $500 = Monad$bind$(Parser$monad)(Fm$Parser$text$("()"))((_$2 => {
            var $501 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$3 => {
                var $502 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var _expr$5 = Fm$Term$lam$("", (_x$5 => {
                        var $504 = _body$3;
                        return $504;
                    }));
                    var $503 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, _expr$5));
                    return $503;
                }));
                return $502;
            }));
            return $501;
        }));
        return $500;
    }));
    const Fm$Parser$parenthesis = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$1 => {
        var $505 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$2 => {
            var $506 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$3 => {
                var $507 = Monad$pure$(Parser$monad)(_term$2);
                return $507;
            }));
            return $506;
        }));
        return $505;
    }));

    function Fm$Term$ref$(_name$1) {
        var $508 = ({
            _: 'Fm.Term.ref',
            'name': _name$1
        });
        return $508;
    };
    const Fm$Term$ref = x0 => Fm$Term$ref$(x0);

    function Fm$Term$app$(_func$1, _argm$2) {
        var $509 = ({
            _: 'Fm.Term.app',
            'func': _func$1,
            'argm': _argm$2
        });
        return $509;
    };
    const Fm$Term$app = x0 => x1 => Fm$Term$app$(x0, x1);

    function Fm$Term$hol$(_path$1) {
        var $510 = ({
            _: 'Fm.Term.hol',
            'path': _path$1
        });
        return $510;
    };
    const Fm$Term$hol = x0 => Fm$Term$hol$(x0);

    function Fm$Term$let$(_name$1, _expr$2, _body$3) {
        var $511 = ({
            _: 'Fm.Term.let',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $511;
    };
    const Fm$Term$let = x0 => x1 => x2 => Fm$Term$let$(x0, x1, x2);
    const Fm$Parser$letforin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $512 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $513 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $514 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $515 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$5 => {
                        var $516 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$6 => {
                            var $517 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$7 => {
                                var $518 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$8 => {
                                    var $519 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$9 => {
                                        var $520 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$10 => {
                                            var $521 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$11 => {
                                                var $522 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$12 => {
                                                    var $523 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$13 => {
                                                        var _term$14 = Fm$Term$ref$("List.for");
                                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$hol$(Bits$e));
                                                        var _term$16 = Fm$Term$app$(_term$15, _list$8);
                                                        var _term$17 = Fm$Term$app$(_term$16, Fm$Term$hol$(Bits$e));
                                                        var _term$18 = Fm$Term$app$(_term$17, Fm$Term$ref$(_name$3));
                                                        var _lamb$19 = Fm$Term$lam$(_elem$6, (_i$19 => {
                                                            var $525 = Fm$Term$lam$(_name$3, (_x$20 => {
                                                                var $526 = _loop$10;
                                                                return $526;
                                                            }));
                                                            return $525;
                                                        }));
                                                        var _term$20 = Fm$Term$app$(_term$18, _lamb$19);
                                                        var _term$21 = Fm$Term$let$(_name$3, _term$20, (_x$21 => {
                                                            var $527 = _body$12;
                                                            return $527;
                                                        }));
                                                        var $524 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$13, _term$21));
                                                        return $524;
                                                    }));
                                                    return $523;
                                                }));
                                                return $522;
                                            }));
                                            return $521;
                                        }));
                                        return $520;
                                    }));
                                    return $519;
                                }));
                                return $518;
                            }));
                            return $517;
                        }));
                        return $516;
                    }));
                    return $515;
                }));
                return $514;
            }));
            return $513;
        }));
        return $512;
    }));
    const Fm$Parser$let = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $528 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $529 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $530 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $531 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $532 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $533 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $534 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $535 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$let$(_name$3, _expr$5, (_x$9 => {
                                        var $536 = _body$7;
                                        return $536;
                                    }))));
                                    return $535;
                                }));
                                return $534;
                            }));
                            return $533;
                        }));
                        return $532;
                    }));
                    return $531;
                }));
                return $530;
            }));
            return $529;
        }));
        return $528;
    }));

    function Fm$Term$def$(_name$1, _expr$2, _body$3) {
        var $537 = ({
            _: 'Fm.Term.def',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $537;
    };
    const Fm$Term$def = x0 => x1 => x2 => Fm$Term$def$(x0, x1, x2);
    const Fm$Parser$def = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $538 = Monad$bind$(Parser$monad)(Fm$Parser$text$("def "))((_$2 => {
            var $539 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $540 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $541 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $542 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $543 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $544 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $545 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$def$(_name$3, _expr$5, (_x$9 => {
                                        var $546 = _body$7;
                                        return $546;
                                    }))));
                                    return $545;
                                }));
                                return $544;
                            }));
                            return $543;
                        }));
                        return $542;
                    }));
                    return $541;
                }));
                return $540;
            }));
            return $539;
        }));
        return $538;
    }));
    const Fm$Parser$if = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $547 = Monad$bind$(Parser$monad)(Fm$Parser$text$("if "))((_$2 => {
            var $548 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cond$3 => {
                var $549 = Monad$bind$(Parser$monad)(Fm$Parser$text$("then"))((_$4 => {
                    var $550 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tcse$5 => {
                        var $551 = Monad$bind$(Parser$monad)(Fm$Parser$text$("else"))((_$6 => {
                            var $552 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_fcse$7 => {
                                var $553 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = _cond$3;
                                    var _term$10 = Fm$Term$app$(_term$9, Fm$Term$lam$("", (_x$10 => {
                                        var $555 = Fm$Term$hol$(Bits$e);
                                        return $555;
                                    })));
                                    var _term$11 = Fm$Term$app$(_term$10, _tcse$5);
                                    var _term$12 = Fm$Term$app$(_term$11, _fcse$7);
                                    var $554 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$12));
                                    return $554;
                                }));
                                return $553;
                            }));
                            return $552;
                        }));
                        return $551;
                    }));
                    return $550;
                }));
                return $549;
            }));
            return $548;
        }));
        return $547;
    }));

    function List$mapped$(_as$2, _f$4) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $557 = List$nil;
                var $556 = $557;
                break;
            case 'List.cons':
                var $558 = self.head;
                var $559 = self.tail;
                var $560 = List$cons$(_f$4($558), List$mapped$($559, _f$4));
                var $556 = $560;
                break;
        };
        return $556;
    };
    const List$mapped = x0 => x1 => List$mapped$(x0, x1);

    function Pair$new$(_fst$3, _snd$4) {
        var $561 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $561;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);
    const Fm$backslash = 92;
    const Fm$escapes = List$cons$(Pair$new$("\\b", 8), List$cons$(Pair$new$("\\f", 12), List$cons$(Pair$new$("\\n", 10), List$cons$(Pair$new$("\\r", 13), List$cons$(Pair$new$("\\t", 9), List$cons$(Pair$new$("\\v", 11), List$cons$(Pair$new$(String$cons$(Fm$backslash, String$cons$(Fm$backslash, String$nil)), Fm$backslash), List$cons$(Pair$new$("\\\"", 34), List$cons$(Pair$new$("\\0", 0), List$cons$(Pair$new$("\\\'", 39), List$nil))))))))));
    const Fm$Parser$char$single = Parser$first_of$(List$cons$(Parser$first_of$(List$mapped$(Fm$escapes, (_esc$1 => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $563 = self.fst;
                var $564 = self.snd;
                var $565 = Monad$bind$(Parser$monad)(Parser$text($563))((_$4 => {
                    var $566 = Monad$pure$(Parser$monad)($564);
                    return $566;
                }));
                var $562 = $565;
                break;
        };
        return $562;
    }))), List$cons$(Parser$one, List$nil)));

    function Fm$Term$chr$(_chrx$1) {
        var $567 = ({
            _: 'Fm.Term.chr',
            'chrx': _chrx$1
        });
        return $567;
    };
    const Fm$Term$chr = x0 => Fm$Term$chr$(x0);
    const Fm$Parser$char = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $568 = Monad$bind$(Parser$monad)(Fm$Parser$text$("\'"))((_$2 => {
            var $569 = Monad$bind$(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => {
                var $570 = Monad$bind$(Parser$monad)(Parser$text("\'"))((_$4 => {
                    var $571 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var $572 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$chr$(_chrx$3)));
                        return $572;
                    }));
                    return $571;
                }));
                return $570;
            }));
            return $569;
        }));
        return $568;
    }));

    function Fm$Term$str$(_strx$1) {
        var $573 = ({
            _: 'Fm.Term.str',
            'strx': _strx$1
        });
        return $573;
    };
    const Fm$Term$str = x0 => Fm$Term$str$(x0);
    const Fm$Parser$string = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var _quot$2 = String$cons$(34, String$nil);
        var $574 = Monad$bind$(Parser$monad)(Fm$Parser$text$(_quot$2))((_$3 => {
            var $575 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text(_quot$2), Fm$Parser$char$single))((_chrs$4 => {
                var _strx$5 = List$fold$(_chrs$4, String$nil, String$cons);
                var $576 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                    var $577 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$str$(_strx$5)));
                    return $577;
                }));
                return $576;
            }));
            return $575;
        }));
        return $574;
    }));
    const Fm$Parser$pair = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $578 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $579 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val0$3 => {
                var $580 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $581 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$5 => {
                        var $582 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $583 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Pair.new");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, _val0$3);
                                var _term$12 = Fm$Term$app$(_term$11, _val1$5);
                                var $584 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$12));
                                return $584;
                            }));
                            return $583;
                        }));
                        return $582;
                    }));
                    return $581;
                }));
                return $580;
            }));
            return $579;
        }));
        return $578;
    }));

    function Fm$Name$read$(_str$1) {
        var $585 = _str$1;
        return $585;
    };
    const Fm$Name$read = x0 => Fm$Name$read$(x0);
    const Fm$Parser$list = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $586 = Monad$bind$(Parser$monad)(Fm$Parser$text$("["))((_$2 => {
            var $587 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("]"), Fm$Parser$item$(Fm$Parser$term)))((_vals$3 => {
                var $588 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $589 = Monad$pure$(Parser$monad)(List$fold$(_vals$3, Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("List.nil")), Fm$Term$hol$(Bits$e)), (_x$5 => _xs$6 => {
                        var _term$7 = Fm$Term$ref$(Fm$Name$read$("List.cons"));
                        var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                        var _term$9 = Fm$Term$app$(_term$8, _x$5);
                        var _term$10 = Fm$Term$app$(_term$9, _xs$6);
                        var $590 = Fm$Term$ori$(_orig$4, _term$10);
                        return $590;
                    })));
                    return $589;
                }));
                return $588;
            }));
            return $587;
        }));
        return $586;
    }));
    const Fm$Parser$forin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $591 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $592 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $593 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$4 => {
                    var $594 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$5 => {
                        var $595 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$6 => {
                            var $596 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$7 => {
                                var $597 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$8 => {
                                    var $598 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$9 => {
                                        var $599 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                                            var _term$11 = Fm$Term$ref$("List.for");
                                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                            var _term$13 = Fm$Term$app$(_term$12, _list$5);
                                            var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                            var _term$15 = Fm$Term$app$(_term$14, Fm$Term$ref$(_name$7));
                                            var _lamb$16 = Fm$Term$lam$(_elem$3, (_i$16 => {
                                                var $601 = Fm$Term$lam$(_name$7, (_x$17 => {
                                                    var $602 = _loop$9;
                                                    return $602;
                                                }));
                                                return $601;
                                            }));
                                            var _term$17 = Fm$Term$app$(_term$15, _lamb$16);
                                            var _term$18 = Fm$Term$let$(_name$7, _term$17, (_x$18 => {
                                                var $603 = Fm$Term$ref$(_name$7);
                                                return $603;
                                            }));
                                            var $600 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$18));
                                            return $600;
                                        }));
                                        return $599;
                                    }));
                                    return $598;
                                }));
                                return $597;
                            }));
                            return $596;
                        }));
                        return $595;
                    }));
                    return $594;
                }));
                return $593;
            }));
            return $592;
        }));
        return $591;
    }));

    function Fm$Parser$do$statements$(_monad_name$1) {
        var $604 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $605 = Monad$bind$(Parser$monad)(Fm$Parser$text$("var "))((_$3 => {
                var $606 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $607 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $608 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $609 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$7 => {
                                var $610 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $611 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var _term$10 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                                        var _term$11 = Fm$Term$app$(_term$10, Fm$Term$ref$((_monad_name$1 + ".monad")));
                                        var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                        var _term$13 = Fm$Term$app$(_term$12, Fm$Term$hol$(Bits$e));
                                        var _term$14 = Fm$Term$app$(_term$13, _expr$6);
                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_name$4, (_x$15 => {
                                            var $613 = _body$8;
                                            return $613;
                                        })));
                                        var $612 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$15));
                                        return $612;
                                    }));
                                    return $611;
                                }));
                                return $610;
                            }));
                            return $609;
                        }));
                        return $608;
                    }));
                    return $607;
                }));
                return $606;
            }));
            return $605;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $614 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$3 => {
                var $615 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $616 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $617 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $618 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$7 => {
                                var $619 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $620 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var $621 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, Fm$Term$let$(_name$4, _expr$6, (_x$10 => {
                                            var $622 = _body$8;
                                            return $622;
                                        }))));
                                        return $621;
                                    }));
                                    return $620;
                                }));
                                return $619;
                            }));
                            return $618;
                        }));
                        return $617;
                    }));
                    return $616;
                }));
                return $615;
            }));
            return $614;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $623 = Monad$bind$(Parser$monad)(Fm$Parser$text$("return "))((_$3 => {
                var $624 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $625 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$5 => {
                        var $626 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.pure"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, _expr$4);
                            var $627 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$10));
                            return $627;
                        }));
                        return $626;
                    }));
                    return $625;
                }));
                return $624;
            }));
            return $623;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $628 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $629 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$4 => {
                    var $630 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$5 => {
                        var $631 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                            var _term$11 = Fm$Term$app$(_term$10, _expr$3);
                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$lam$("", (_x$12 => {
                                var $633 = _body$5;
                                return $633;
                            })));
                            var $632 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$12));
                            return $632;
                        }));
                        return $631;
                    }));
                    return $630;
                }));
                return $629;
            }));
            return $628;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$2 => {
            var $634 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$3 => {
                var $635 = Monad$pure$(Parser$monad)(_expr$2);
                return $635;
            }));
            return $634;
        })), List$nil))))));
        return $604;
    };
    const Fm$Parser$do$statements = x0 => Fm$Parser$do$statements$(x0);
    const Fm$Parser$do = Monad$bind$(Parser$monad)(Fm$Parser$text$("do "))((_$1 => {
        var $636 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $637 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $638 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_name$2))((_term$4 => {
                    var $639 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$5 => {
                        var $640 = Monad$pure$(Parser$monad)(_term$4);
                        return $640;
                    }));
                    return $639;
                }));
                return $638;
            }));
            return $637;
        }));
        return $636;
    }));

    function Fm$Term$nat$(_natx$1) {
        var $641 = ({
            _: 'Fm.Term.nat',
            'natx': _natx$1
        });
        return $641;
    };
    const Fm$Term$nat = x0 => Fm$Term$nat$(x0);

    function Fm$Term$unroll_nat$(_natx$1) {
        var self = _natx$1;
        if (self === 0n) {
            var $643 = Fm$Term$ref$(Fm$Name$read$("Nat.zero"));
            var $642 = $643;
        } else {
            var $644 = (self - 1n);
            var _func$3 = Fm$Term$ref$(Fm$Name$read$("Nat.succ"));
            var _argm$4 = Fm$Term$nat$($644);
            var $645 = Fm$Term$app$(_func$3, _argm$4);
            var $642 = $645;
        };
        return $642;
    };
    const Fm$Term$unroll_nat = x0 => Fm$Term$unroll_nat$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Fm$Term$unroll_chr$bits$(_bits$1) {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $647 = Fm$Term$ref$(Fm$Name$read$("Bits.e"));
                var $646 = $647;
                break;
            case 'o':
                var $648 = self.slice(0, -1);
                var $649 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.o")), Fm$Term$unroll_chr$bits$($648));
                var $646 = $649;
                break;
            case 'i':
                var $650 = self.slice(0, -1);
                var $651 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.i")), Fm$Term$unroll_chr$bits$($650));
                var $646 = $651;
                break;
        };
        return $646;
    };
    const Fm$Term$unroll_chr$bits = x0 => Fm$Term$unroll_chr$bits$(x0);

    function Fm$Term$unroll_chr$(_chrx$1) {
        var _bits$2 = (u16_to_bits(_chrx$1));
        var _term$3 = Fm$Term$ref$(Fm$Name$read$("Word.from_bits"));
        var _term$4 = Fm$Term$app$(_term$3, Fm$Term$nat$(16n));
        var _term$5 = Fm$Term$app$(_term$4, Fm$Term$unroll_chr$bits$(_bits$2));
        var _term$6 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("U16.new")), _term$5);
        var $652 = _term$6;
        return $652;
    };
    const Fm$Term$unroll_chr = x0 => Fm$Term$unroll_chr$(x0);

    function Fm$Term$unroll_str$(_strx$1) {
        var self = _strx$1;
        if (self.length === 0) {
            var $654 = Fm$Term$ref$(Fm$Name$read$("String.nil"));
            var $653 = $654;
        } else {
            var $655 = self.charCodeAt(0);
            var $656 = self.slice(1);
            var _char$4 = Fm$Term$chr$($655);
            var _term$5 = Fm$Term$ref$(Fm$Name$read$("String.cons"));
            var _term$6 = Fm$Term$app$(_term$5, _char$4);
            var _term$7 = Fm$Term$app$(_term$6, Fm$Term$str$($656));
            var $657 = _term$7;
            var $653 = $657;
        };
        return $653;
    };
    const Fm$Term$unroll_str = x0 => Fm$Term$unroll_str$(x0);

    function Fm$Term$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $659 = self.name;
                var $660 = self.indx;
                var $661 = _term$1;
                var $658 = $661;
                break;
            case 'Fm.Term.ref':
                var $662 = self.name;
                var self = Fm$get$($662, _defs$2);
                switch (self._) {
                    case 'Maybe.none':
                        var $664 = Fm$Term$ref$($662);
                        var $663 = $664;
                        break;
                    case 'Maybe.some':
                        var $665 = self.value;
                        var self = $665;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $667 = self.file;
                                var $668 = self.code;
                                var $669 = self.name;
                                var $670 = self.term;
                                var $671 = self.type;
                                var $672 = self.stat;
                                var $673 = Fm$Term$reduce$($670, _defs$2);
                                var $666 = $673;
                                break;
                        };
                        var $663 = $666;
                        break;
                };
                var $658 = $663;
                break;
            case 'Fm.Term.typ':
                var $674 = _term$1;
                var $658 = $674;
                break;
            case 'Fm.Term.all':
                var $675 = self.eras;
                var $676 = self.self;
                var $677 = self.name;
                var $678 = self.xtyp;
                var $679 = self.body;
                var $680 = _term$1;
                var $658 = $680;
                break;
            case 'Fm.Term.lam':
                var $681 = self.name;
                var $682 = self.body;
                var $683 = _term$1;
                var $658 = $683;
                break;
            case 'Fm.Term.app':
                var $684 = self.func;
                var $685 = self.argm;
                var _func$5 = Fm$Term$reduce$($684, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $687 = self.name;
                        var $688 = self.indx;
                        var $689 = _term$1;
                        var $686 = $689;
                        break;
                    case 'Fm.Term.ref':
                        var $690 = self.name;
                        var $691 = _term$1;
                        var $686 = $691;
                        break;
                    case 'Fm.Term.typ':
                        var $692 = _term$1;
                        var $686 = $692;
                        break;
                    case 'Fm.Term.all':
                        var $693 = self.eras;
                        var $694 = self.self;
                        var $695 = self.name;
                        var $696 = self.xtyp;
                        var $697 = self.body;
                        var $698 = _term$1;
                        var $686 = $698;
                        break;
                    case 'Fm.Term.lam':
                        var $699 = self.name;
                        var $700 = self.body;
                        var $701 = Fm$Term$reduce$($700($685), _defs$2);
                        var $686 = $701;
                        break;
                    case 'Fm.Term.app':
                        var $702 = self.func;
                        var $703 = self.argm;
                        var $704 = _term$1;
                        var $686 = $704;
                        break;
                    case 'Fm.Term.let':
                        var $705 = self.name;
                        var $706 = self.expr;
                        var $707 = self.body;
                        var $708 = _term$1;
                        var $686 = $708;
                        break;
                    case 'Fm.Term.def':
                        var $709 = self.name;
                        var $710 = self.expr;
                        var $711 = self.body;
                        var $712 = _term$1;
                        var $686 = $712;
                        break;
                    case 'Fm.Term.ann':
                        var $713 = self.done;
                        var $714 = self.term;
                        var $715 = self.type;
                        var $716 = _term$1;
                        var $686 = $716;
                        break;
                    case 'Fm.Term.gol':
                        var $717 = self.name;
                        var $718 = self.dref;
                        var $719 = self.verb;
                        var $720 = _term$1;
                        var $686 = $720;
                        break;
                    case 'Fm.Term.hol':
                        var $721 = self.path;
                        var $722 = _term$1;
                        var $686 = $722;
                        break;
                    case 'Fm.Term.nat':
                        var $723 = self.natx;
                        var $724 = _term$1;
                        var $686 = $724;
                        break;
                    case 'Fm.Term.chr':
                        var $725 = self.chrx;
                        var $726 = _term$1;
                        var $686 = $726;
                        break;
                    case 'Fm.Term.str':
                        var $727 = self.strx;
                        var $728 = _term$1;
                        var $686 = $728;
                        break;
                    case 'Fm.Term.cse':
                        var $729 = self.path;
                        var $730 = self.expr;
                        var $731 = self.name;
                        var $732 = self.with;
                        var $733 = self.cses;
                        var $734 = self.moti;
                        var $735 = _term$1;
                        var $686 = $735;
                        break;
                    case 'Fm.Term.ori':
                        var $736 = self.orig;
                        var $737 = self.expr;
                        var $738 = _term$1;
                        var $686 = $738;
                        break;
                };
                var $658 = $686;
                break;
            case 'Fm.Term.let':
                var $739 = self.name;
                var $740 = self.expr;
                var $741 = self.body;
                var $742 = Fm$Term$reduce$($741($740), _defs$2);
                var $658 = $742;
                break;
            case 'Fm.Term.def':
                var $743 = self.name;
                var $744 = self.expr;
                var $745 = self.body;
                var $746 = Fm$Term$reduce$($745($744), _defs$2);
                var $658 = $746;
                break;
            case 'Fm.Term.ann':
                var $747 = self.done;
                var $748 = self.term;
                var $749 = self.type;
                var $750 = Fm$Term$reduce$($748, _defs$2);
                var $658 = $750;
                break;
            case 'Fm.Term.gol':
                var $751 = self.name;
                var $752 = self.dref;
                var $753 = self.verb;
                var $754 = _term$1;
                var $658 = $754;
                break;
            case 'Fm.Term.hol':
                var $755 = self.path;
                var $756 = _term$1;
                var $658 = $756;
                break;
            case 'Fm.Term.nat':
                var $757 = self.natx;
                var $758 = Fm$Term$reduce$(Fm$Term$unroll_nat$($757), _defs$2);
                var $658 = $758;
                break;
            case 'Fm.Term.chr':
                var $759 = self.chrx;
                var $760 = Fm$Term$reduce$(Fm$Term$unroll_chr$($759), _defs$2);
                var $658 = $760;
                break;
            case 'Fm.Term.str':
                var $761 = self.strx;
                var $762 = Fm$Term$reduce$(Fm$Term$unroll_str$($761), _defs$2);
                var $658 = $762;
                break;
            case 'Fm.Term.cse':
                var $763 = self.path;
                var $764 = self.expr;
                var $765 = self.name;
                var $766 = self.with;
                var $767 = self.cses;
                var $768 = self.moti;
                var $769 = _term$1;
                var $658 = $769;
                break;
            case 'Fm.Term.ori':
                var $770 = self.orig;
                var $771 = self.expr;
                var $772 = Fm$Term$reduce$($771, _defs$2);
                var $658 = $772;
                break;
        };
        return $658;
    };
    const Fm$Term$reduce = x0 => x1 => Fm$Term$reduce$(x0, x1);
    const Map$new = ({
        _: 'Map.new'
    });

    function Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$6) {
        var $773 = ({
            _: 'Fm.Def.new',
            'file': _file$1,
            'code': _code$2,
            'name': _name$3,
            'term': _term$4,
            'type': _type$5,
            'stat': _stat$6
        });
        return $773;
    };
    const Fm$Def$new = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Def$new$(x0, x1, x2, x3, x4, x5);
    const Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    const Fm$Parser$case$with = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$1 => {
        var $774 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $775 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$3 => {
                var $776 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                    var $777 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $778 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$6 => {
                            var $779 = Monad$pure$(Parser$monad)(Fm$Def$new$("", "", _name$2, _term$6, _type$4, Fm$Status$init));
                            return $779;
                        }));
                        return $778;
                    }));
                    return $777;
                }));
                return $776;
            }));
            return $775;
        }));
        return $774;
    }));
    const Fm$Parser$case$case = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$1 => {
        var $780 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $781 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$3 => {
                var $782 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$4 => {
                    var $783 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _term$3));
                    return $783;
                }));
                return $782;
            }));
            return $781;
        }));
        return $780;
    }));

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $784 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $784;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $787 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $786 = $787;
                        break;
                    case 'Map.tie':
                        var $788 = self.val;
                        var $789 = self.lft;
                        var $790 = self.rgt;
                        var $791 = Map$tie$(Maybe$some$(_val$3), $789, $790);
                        var $786 = $791;
                        break;
                };
                var $785 = $786;
                break;
            case 'o':
                var $792 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $794 = Map$tie$(Maybe$none, Map$set$($792, _val$3, Map$new), Map$new);
                        var $793 = $794;
                        break;
                    case 'Map.tie':
                        var $795 = self.val;
                        var $796 = self.lft;
                        var $797 = self.rgt;
                        var $798 = Map$tie$($795, Map$set$($792, _val$3, $796), $797);
                        var $793 = $798;
                        break;
                };
                var $785 = $793;
                break;
            case 'i':
                var $799 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $801 = Map$tie$(Maybe$none, Map$new, Map$set$($799, _val$3, Map$new));
                        var $800 = $801;
                        break;
                    case 'Map.tie':
                        var $802 = self.val;
                        var $803 = self.lft;
                        var $804 = self.rgt;
                        var $805 = Map$tie$($802, $803, Map$set$($799, _val$3, $804));
                        var $800 = $805;
                        break;
                };
                var $785 = $800;
                break;
        };
        return $785;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);

    function Map$from_list$(_f$3, _xs$4) {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                var $807 = Map$new;
                var $806 = $807;
                break;
            case 'List.cons':
                var $808 = self.head;
                var $809 = self.tail;
                var self = $808;
                switch (self._) {
                    case 'Pair.new':
                        var $811 = self.fst;
                        var $812 = self.snd;
                        var $813 = Map$set$(_f$3($811), $812, Map$from_list$(_f$3, $809));
                        var $810 = $813;
                        break;
                };
                var $806 = $810;
                break;
        };
        return $806;
    };
    const Map$from_list = x0 => x1 => Map$from_list$(x0, x1);

    function Fm$Term$cse$(_path$1, _expr$2, _name$3, _with$4, _cses$5, _moti$6) {
        var $814 = ({
            _: 'Fm.Term.cse',
            'path': _path$1,
            'expr': _expr$2,
            'name': _name$3,
            'with': _with$4,
            'cses': _cses$5,
            'moti': _moti$6
        });
        return $814;
    };
    const Fm$Term$cse = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$cse$(x0, x1, x2, x3, x4, x5);
    const Fm$Parser$case = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $815 = Monad$bind$(Parser$monad)(Fm$Parser$text$("case "))((_$2 => {
            var $816 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $817 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $818 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $819 = Fm$Parser$name1;
                        return $819;
                    }))))((_name$5 => {
                        var self = _name$5;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = Fm$Term$reduce$(_expr$4, Map$new);
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $822 = self.name;
                                        var $823 = self.indx;
                                        var $824 = $822;
                                        var $821 = $824;
                                        break;
                                    case 'Fm.Term.ref':
                                        var $825 = self.name;
                                        var $826 = $825;
                                        var $821 = $826;
                                        break;
                                    case 'Fm.Term.typ':
                                        var $827 = Fm$Name$read$("self");
                                        var $821 = $827;
                                        break;
                                    case 'Fm.Term.all':
                                        var $828 = self.eras;
                                        var $829 = self.self;
                                        var $830 = self.name;
                                        var $831 = self.xtyp;
                                        var $832 = self.body;
                                        var $833 = Fm$Name$read$("self");
                                        var $821 = $833;
                                        break;
                                    case 'Fm.Term.lam':
                                        var $834 = self.name;
                                        var $835 = self.body;
                                        var $836 = Fm$Name$read$("self");
                                        var $821 = $836;
                                        break;
                                    case 'Fm.Term.app':
                                        var $837 = self.func;
                                        var $838 = self.argm;
                                        var $839 = Fm$Name$read$("self");
                                        var $821 = $839;
                                        break;
                                    case 'Fm.Term.let':
                                        var $840 = self.name;
                                        var $841 = self.expr;
                                        var $842 = self.body;
                                        var $843 = Fm$Name$read$("self");
                                        var $821 = $843;
                                        break;
                                    case 'Fm.Term.def':
                                        var $844 = self.name;
                                        var $845 = self.expr;
                                        var $846 = self.body;
                                        var $847 = Fm$Name$read$("self");
                                        var $821 = $847;
                                        break;
                                    case 'Fm.Term.ann':
                                        var $848 = self.done;
                                        var $849 = self.term;
                                        var $850 = self.type;
                                        var $851 = Fm$Name$read$("self");
                                        var $821 = $851;
                                        break;
                                    case 'Fm.Term.gol':
                                        var $852 = self.name;
                                        var $853 = self.dref;
                                        var $854 = self.verb;
                                        var $855 = Fm$Name$read$("self");
                                        var $821 = $855;
                                        break;
                                    case 'Fm.Term.hol':
                                        var $856 = self.path;
                                        var $857 = Fm$Name$read$("self");
                                        var $821 = $857;
                                        break;
                                    case 'Fm.Term.nat':
                                        var $858 = self.natx;
                                        var $859 = Fm$Name$read$("self");
                                        var $821 = $859;
                                        break;
                                    case 'Fm.Term.chr':
                                        var $860 = self.chrx;
                                        var $861 = Fm$Name$read$("self");
                                        var $821 = $861;
                                        break;
                                    case 'Fm.Term.str':
                                        var $862 = self.strx;
                                        var $863 = Fm$Name$read$("self");
                                        var $821 = $863;
                                        break;
                                    case 'Fm.Term.cse':
                                        var $864 = self.path;
                                        var $865 = self.expr;
                                        var $866 = self.name;
                                        var $867 = self.with;
                                        var $868 = self.cses;
                                        var $869 = self.moti;
                                        var $870 = Fm$Name$read$("self");
                                        var $821 = $870;
                                        break;
                                    case 'Fm.Term.ori':
                                        var $871 = self.orig;
                                        var $872 = self.expr;
                                        var $873 = Fm$Name$read$("self");
                                        var $821 = $873;
                                        break;
                                };
                                var _name$6 = $821;
                                break;
                            case 'Maybe.some':
                                var $874 = self.value;
                                var $875 = $874;
                                var _name$6 = $875;
                                break;
                        };
                        var $820 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$case$with))((_with$7 => {
                            var $876 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$8 => {
                                var $877 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$case$case))((_cses$9 => {
                                    var _cses$10 = Map$from_list$(Fm$Name$to_bits, _cses$9);
                                    var $878 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$11 => {
                                        var $879 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$12 => {
                                            var $880 = Monad$pure$(Parser$monad)(Maybe$some$(_term$12));
                                            return $880;
                                        }));
                                        return $879;
                                    })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("!"))((_$11 => {
                                        var $881 = Monad$pure$(Parser$monad)(Maybe$none);
                                        return $881;
                                    })), List$cons$(Monad$pure$(Parser$monad)(Maybe$some$(Fm$Term$hol$(Bits$e))), List$nil)))))((_moti$11 => {
                                        var $882 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                            var $883 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$6, _with$7, _cses$10, _moti$11)));
                                            return $883;
                                        }));
                                        return $882;
                                    }));
                                    return $878;
                                }));
                                return $877;
                            }));
                            return $876;
                        }));
                        return $820;
                    }));
                    return $818;
                }));
                return $817;
            }));
            return $816;
        }));
        return $815;
    }));

    function Parser$digit$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $885 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
            var $884 = $885;
        } else {
            var $886 = self.charCodeAt(0);
            var $887 = self.slice(1);
            var _sidx$5 = Nat$succ$(_idx$1);
            var self = ($886 === 48);
            if (self) {
                var $889 = Parser$Reply$value$(_sidx$5, $887, 0n);
                var $888 = $889;
            } else {
                var self = ($886 === 49);
                if (self) {
                    var $891 = Parser$Reply$value$(_sidx$5, $887, 1n);
                    var $890 = $891;
                } else {
                    var self = ($886 === 50);
                    if (self) {
                        var $893 = Parser$Reply$value$(_sidx$5, $887, 2n);
                        var $892 = $893;
                    } else {
                        var self = ($886 === 51);
                        if (self) {
                            var $895 = Parser$Reply$value$(_sidx$5, $887, 3n);
                            var $894 = $895;
                        } else {
                            var self = ($886 === 52);
                            if (self) {
                                var $897 = Parser$Reply$value$(_sidx$5, $887, 4n);
                                var $896 = $897;
                            } else {
                                var self = ($886 === 53);
                                if (self) {
                                    var $899 = Parser$Reply$value$(_sidx$5, $887, 5n);
                                    var $898 = $899;
                                } else {
                                    var self = ($886 === 54);
                                    if (self) {
                                        var $901 = Parser$Reply$value$(_sidx$5, $887, 6n);
                                        var $900 = $901;
                                    } else {
                                        var self = ($886 === 55);
                                        if (self) {
                                            var $903 = Parser$Reply$value$(_sidx$5, $887, 7n);
                                            var $902 = $903;
                                        } else {
                                            var self = ($886 === 56);
                                            if (self) {
                                                var $905 = Parser$Reply$value$(_sidx$5, $887, 8n);
                                                var $904 = $905;
                                            } else {
                                                var self = ($886 === 57);
                                                if (self) {
                                                    var $907 = Parser$Reply$value$(_sidx$5, $887, 9n);
                                                    var $906 = $907;
                                                } else {
                                                    var $908 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
                                                    var $906 = $908;
                                                };
                                                var $904 = $906;
                                            };
                                            var $902 = $904;
                                        };
                                        var $900 = $902;
                                    };
                                    var $898 = $900;
                                };
                                var $896 = $898;
                            };
                            var $894 = $896;
                        };
                        var $892 = $894;
                    };
                    var $890 = $892;
                };
                var $888 = $890;
            };
            var $884 = $888;
        };
        return $884;
    };
    const Parser$digit = x0 => x1 => Parser$digit$(x0, x1);
    const Nat$add = a0 => a1 => (a0 + a1);
    const Nat$mul = a0 => a1 => (a0 * a1);

    function Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4) {
        var Nat$from_base$go$ = (_b$1, _ds$2, _p$3, _res$4) => ({
            ctr: 'TCO',
            arg: [_b$1, _ds$2, _p$3, _res$4]
        });
        var Nat$from_base$go = _b$1 => _ds$2 => _p$3 => _res$4 => Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4);
        var arg = [_b$1, _ds$2, _p$3, _res$4];
        while (true) {
            let [_b$1, _ds$2, _p$3, _res$4] = arg;
            var R = (() => {
                var self = _ds$2;
                switch (self._) {
                    case 'List.nil':
                        var $909 = _res$4;
                        return $909;
                    case 'List.cons':
                        var $910 = self.head;
                        var $911 = self.tail;
                        var $912 = Nat$from_base$go$(_b$1, $911, (_b$1 * _p$3), (($910 * _p$3) + _res$4));
                        return $912;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$from_base$go = x0 => x1 => x2 => x3 => Nat$from_base$go$(x0, x1, x2, x3);

    function List$reverse$go$(_xs$2, _res$3) {
        var List$reverse$go$ = (_xs$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_xs$2, _res$3]
        });
        var List$reverse$go = _xs$2 => _res$3 => List$reverse$go$(_xs$2, _res$3);
        var arg = [_xs$2, _res$3];
        while (true) {
            let [_xs$2, _res$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $913 = _res$3;
                        return $913;
                    case 'List.cons':
                        var $914 = self.head;
                        var $915 = self.tail;
                        var $916 = List$reverse$go$($915, List$cons$($914, _res$3));
                        return $916;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $917 = List$reverse$go$(_xs$2, List$nil);
        return $917;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Nat$from_base$(_base$1, _ds$2) {
        var $918 = Nat$from_base$go$(_base$1, List$reverse$(_ds$2), 1n, 0n);
        return $918;
    };
    const Nat$from_base = x0 => x1 => Nat$from_base$(x0, x1);
    const Parser$nat = Monad$bind$(Parser$monad)(Parser$many1$(Parser$digit))((_digits$1 => {
        var $919 = Monad$pure$(Parser$monad)(Nat$from_base$(10n, _digits$1));
        return $919;
    }));

    function Bits$tail$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $921 = Bits$e;
                var $920 = $921;
                break;
            case 'o':
                var $922 = self.slice(0, -1);
                var $923 = $922;
                var $920 = $923;
                break;
            case 'i':
                var $924 = self.slice(0, -1);
                var $925 = $924;
                var $920 = $925;
                break;
        };
        return $920;
    };
    const Bits$tail = x0 => Bits$tail$(x0);

    function Bits$inc$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $927 = (Bits$e + '1');
                var $926 = $927;
                break;
            case 'o':
                var $928 = self.slice(0, -1);
                var $929 = ($928 + '1');
                var $926 = $929;
                break;
            case 'i':
                var $930 = self.slice(0, -1);
                var $931 = (Bits$inc$($930) + '0');
                var $926 = $931;
                break;
        };
        return $926;
    };
    const Bits$inc = x0 => Bits$inc$(x0);
    const Nat$to_bits = a0 => (nat_to_bits(a0));

    function Maybe$to_bool$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $933 = Bool$false;
                var $932 = $933;
                break;
            case 'Maybe.some':
                var $934 = self.value;
                var $935 = Bool$true;
                var $932 = $935;
                break;
        };
        return $932;
    };
    const Maybe$to_bool = x0 => Maybe$to_bool$(x0);

    function Fm$Term$gol$(_name$1, _dref$2, _verb$3) {
        var $936 = ({
            _: 'Fm.Term.gol',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3
        });
        return $936;
    };
    const Fm$Term$gol = x0 => x1 => x2 => Fm$Term$gol$(x0, x1, x2);
    const Fm$Parser$goal = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $937 = Monad$bind$(Parser$monad)(Fm$Parser$text$("?"))((_$2 => {
            var $938 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $939 = Monad$bind$(Parser$monad)(Parser$many$(Monad$bind$(Parser$monad)(Fm$Parser$text$("-"))((_$4 => {
                    var $940 = Monad$bind$(Parser$monad)(Parser$nat)((_nat$5 => {
                        var _bits$6 = Bits$reverse$(Bits$tail$(Bits$reverse$((nat_to_bits(_nat$5)))));
                        var $941 = Monad$pure$(Parser$monad)(_bits$6);
                        return $941;
                    }));
                    return $940;
                }))))((_dref$4 => {
                    var $942 = Monad$bind$(Parser$monad)(Monad$bind$(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => {
                        var $943 = Monad$pure$(Parser$monad)(Maybe$to_bool$(_verb$5));
                        return $943;
                    })))((_verb$5 => {
                        var $944 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                            var $945 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$gol$(_name$3, _dref$4, _verb$5)));
                            return $945;
                        }));
                        return $944;
                    }));
                    return $942;
                }));
                return $939;
            }));
            return $938;
        }));
        return $937;
    }));
    const Fm$Parser$hole = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $946 = Monad$bind$(Parser$monad)(Fm$Parser$text$("_"))((_$2 => {
            var $947 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $948 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$hol$(Bits$e)));
                return $948;
            }));
            return $947;
        }));
        return $946;
    }));
    const Fm$Parser$nat = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $949 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $950 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $951 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $952 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, Fm$Term$nat$(_natx$3)));
                    return $952;
                }));
                return $951;
            }));
            return $950;
        }));
        return $949;
    }));
    const String$eql = a0 => a1 => (a0 === a1);

    function Parser$fail$(_error$2, _idx$3, _code$4) {
        var $953 = Parser$Reply$error$(_idx$3, _code$4, _error$2);
        return $953;
    };
    const Parser$fail = x0 => x1 => x2 => Parser$fail$(x0, x1, x2);
    const Fm$Parser$reference = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $954 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var self = (_name$2 === "case");
            if (self) {
                var $956 = Parser$fail("Reserved keyword.");
                var $955 = $956;
            } else {
                var self = (_name$2 === "do");
                if (self) {
                    var $958 = Parser$fail("Reserved keyword.");
                    var $957 = $958;
                } else {
                    var self = (_name$2 === "if");
                    if (self) {
                        var $960 = Parser$fail("Reserved keyword.");
                        var $959 = $960;
                    } else {
                        var self = (_name$2 === "let");
                        if (self) {
                            var $962 = Parser$fail("Reserved keyword.");
                            var $961 = $962;
                        } else {
                            var self = (_name$2 === "def");
                            if (self) {
                                var $964 = Parser$fail("Reserved keyword.");
                                var $963 = $964;
                            } else {
                                var $965 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                                    var $966 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$ref$(_name$2)));
                                    return $966;
                                }));
                                var $963 = $965;
                            };
                            var $961 = $963;
                        };
                        var $959 = $961;
                    };
                    var $957 = $959;
                };
                var $955 = $957;
            };
            return $955;
        }));
        return $954;
    }));
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function Fm$Parser$application$(_init$1, _func$2) {
        var $967 = Monad$bind$(Parser$monad)(Parser$text("("))((_$3 => {
            var $968 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_args$4 => {
                var $969 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _expr$6 = (() => {
                        var $972 = _func$2;
                        var $973 = _args$4;
                        let _f$7 = $972;
                        let _x$6;
                        while ($973._ === 'List.cons') {
                            _x$6 = $973.head;
                            var $972 = Fm$Term$app$(_f$7, _x$6);
                            _f$7 = $972;
                            $973 = $973.tail;
                        }
                        return _f$7;
                    })();
                    var $970 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                    return $970;
                }));
                return $969;
            }));
            return $968;
        }));
        return $967;
    };
    const Fm$Parser$application = x0 => x1 => Fm$Parser$application$(x0, x1);
    const Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$nil))));

    function Parser$spaces_text$(_text$1) {
        var $974 = Monad$bind$(Parser$monad)(Parser$spaces)((_$2 => {
            var $975 = Parser$text(_text$1);
            return $975;
        }));
        return $974;
    };
    const Parser$spaces_text = x0 => Parser$spaces_text$(x0);

    function Fm$Parser$application$erased$(_init$1, _func$2) {
        var $976 = Monad$bind$(Parser$monad)(Parser$get_index)((_init$3 => {
            var $977 = Monad$bind$(Parser$monad)(Parser$text("<"))((_$4 => {
                var $978 = Monad$bind$(Parser$monad)(Parser$until1$(Parser$spaces_text$(">"), Fm$Parser$item$(Fm$Parser$term)))((_args$5 => {
                    var $979 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$3))((_orig$6 => {
                        var _expr$7 = (() => {
                            var $982 = _func$2;
                            var $983 = _args$5;
                            let _f$8 = $982;
                            let _x$7;
                            while ($983._ === 'List.cons') {
                                _x$7 = $983.head;
                                var $982 = Fm$Term$app$(_f$8, _x$7);
                                _f$8 = $982;
                                $983 = $983.tail;
                            }
                            return _f$8;
                        })();
                        var $980 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _expr$7));
                        return $980;
                    }));
                    return $979;
                }));
                return $978;
            }));
            return $977;
        }));
        return $976;
    };
    const Fm$Parser$application$erased = x0 => x1 => Fm$Parser$application$erased$(x0, x1);

    function Fm$Parser$arrow$(_init$1, _xtyp$2) {
        var $984 = Monad$bind$(Parser$monad)(Fm$Parser$text$("->"))((_$3 => {
            var $985 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                var $986 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $987 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$all$(Bool$false, "", "", _xtyp$2, (_s$6 => _x$7 => {
                        var $988 = _body$4;
                        return $988;
                    }))));
                    return $987;
                }));
                return $986;
            }));
            return $985;
        }));
        return $984;
    };
    const Fm$Parser$arrow = x0 => x1 => Fm$Parser$arrow$(x0, x1);

    function Fm$Parser$equality$(_init$1, _val0$2) {
        var $989 = Monad$bind$(Parser$monad)(Fm$Parser$text$("=="))((_$3 => {
            var $990 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $991 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Equal");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _val0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val1$4);
                    var $992 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$9));
                    return $992;
                }));
                return $991;
            }));
            return $990;
        }));
        return $989;
    };
    const Fm$Parser$equality = x0 => x1 => Fm$Parser$equality$(x0, x1);

    function Fm$Term$ann$(_done$1, _term$2, _type$3) {
        var $993 = ({
            _: 'Fm.Term.ann',
            'done': _done$1,
            'term': _term$2,
            'type': _type$3
        });
        return $993;
    };
    const Fm$Term$ann = x0 => x1 => x2 => Fm$Term$ann$(x0, x1, x2);

    function Fm$Parser$annotation$(_init$1, _term$2) {
        var $994 = Monad$bind$(Parser$monad)(Fm$Parser$text$("::"))((_$3 => {
            var $995 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                var $996 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $997 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$ann$(Bool$false, _term$2, _type$4)));
                    return $997;
                }));
                return $996;
            }));
            return $995;
        }));
        return $994;
    };
    const Fm$Parser$annotation = x0 => x1 => Fm$Parser$annotation$(x0, x1);

    function Fm$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4) {
        var Fm$Parser$suffix$ = (_init$1, _term$2, _idx$3, _code$4) => ({
            ctr: 'TCO',
            arg: [_init$1, _term$2, _idx$3, _code$4]
        });
        var Fm$Parser$suffix = _init$1 => _term$2 => _idx$3 => _code$4 => Fm$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4);
        var arg = [_init$1, _term$2, _idx$3, _code$4];
        while (true) {
            let [_init$1, _term$2, _idx$3, _code$4] = arg;
            var R = (() => {
                var _suffix_parser$5 = Parser$first_of$(List$cons$(Fm$Parser$application$(_init$1, _term$2), List$cons$(Fm$Parser$application$erased$(_init$1, _term$2), List$cons$(Fm$Parser$arrow$(_init$1, _term$2), List$cons$(Fm$Parser$equality$(_init$1, _term$2), List$cons$(Fm$Parser$annotation$(_init$1, _term$2), List$nil))))));
                var self = _suffix_parser$5(_idx$3)(_code$4);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $999 = self.idx;
                        var $1000 = self.code;
                        var $1001 = self.err;
                        var $1002 = Parser$Reply$value$(_idx$3, _code$4, _term$2);
                        var $998 = $1002;
                        break;
                    case 'Parser.Reply.value':
                        var $1003 = self.idx;
                        var $1004 = self.code;
                        var $1005 = self.val;
                        var $1006 = Fm$Parser$suffix$(_init$1, $1005, $1003, $1004);
                        var $998 = $1006;
                        break;
                };
                return $998;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Parser$suffix = x0 => x1 => x2 => x3 => Fm$Parser$suffix$(x0, x1, x2, x3);
    const Fm$Parser$term = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1007 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$type, List$cons$(Fm$Parser$forall, List$cons$(Fm$Parser$lambda, List$cons$(Fm$Parser$lambda$erased, List$cons$(Fm$Parser$lambda$nameless, List$cons$(Fm$Parser$parenthesis, List$cons$(Fm$Parser$letforin, List$cons$(Fm$Parser$let, List$cons$(Fm$Parser$def, List$cons$(Fm$Parser$if, List$cons$(Fm$Parser$char, List$cons$(Fm$Parser$string, List$cons$(Fm$Parser$pair, List$cons$(Fm$Parser$list, List$cons$(Fm$Parser$forin, List$cons$(Fm$Parser$do, List$cons$(Fm$Parser$case, List$cons$(Fm$Parser$goal, List$cons$(Fm$Parser$hole, List$cons$(Fm$Parser$nat, List$cons$(Fm$Parser$reference, List$nil)))))))))))))))))))))))((_term$2 => {
            var $1008 = Fm$Parser$suffix(_init$1)(_term$2);
            return $1008;
        }));
        return $1007;
    }));
    const Fm$Parser$name_term = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$1 => {
        var $1009 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $1010 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$3 => {
                var $1011 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _type$3));
                return $1011;
            }));
            return $1010;
        }));
        return $1009;
    }));

    function Fm$Binder$new$(_eras$1, _name$2, _term$3) {
        var $1012 = ({
            _: 'Fm.Binder.new',
            'eras': _eras$1,
            'name': _name$2,
            'term': _term$3
        });
        return $1012;
    };
    const Fm$Binder$new = x0 => x1 => x2 => Fm$Binder$new$(x0, x1, x2);

    function Fm$Parser$binder$homo$(_eras$1) {
        var $1013 = Monad$bind$(Parser$monad)(Fm$Parser$text$((() => {
            var self = _eras$1;
            if (self) {
                var $1014 = "<";
                return $1014;
            } else {
                var $1015 = "(";
                return $1015;
            };
        })()))((_$2 => {
            var $1016 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$((() => {
                var self = _eras$1;
                if (self) {
                    var $1017 = ">";
                    return $1017;
                } else {
                    var $1018 = ")";
                    return $1018;
                };
            })()), Fm$Parser$item$(Fm$Parser$name_term)))((_bind$3 => {
                var $1019 = Monad$pure$(Parser$monad)(List$mapped$(_bind$3, (_pair$4 => {
                    var self = _pair$4;
                    switch (self._) {
                        case 'Pair.new':
                            var $1021 = self.fst;
                            var $1022 = self.snd;
                            var $1023 = Fm$Binder$new$(_eras$1, $1021, $1022);
                            var $1020 = $1023;
                            break;
                    };
                    return $1020;
                })));
                return $1019;
            }));
            return $1016;
        }));
        return $1013;
    };
    const Fm$Parser$binder$homo = x0 => Fm$Parser$binder$homo$(x0);

    function List$concat$(_as$2, _bs$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $1025 = _bs$3;
                var $1024 = $1025;
                break;
            case 'List.cons':
                var $1026 = self.head;
                var $1027 = self.tail;
                var $1028 = List$cons$($1026, List$concat$($1027, _bs$3));
                var $1024 = $1028;
                break;
        };
        return $1024;
    };
    const List$concat = x0 => x1 => List$concat$(x0, x1);

    function List$flatten$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1030 = List$nil;
                var $1029 = $1030;
                break;
            case 'List.cons':
                var $1031 = self.head;
                var $1032 = self.tail;
                var $1033 = List$concat$($1031, List$flatten$($1032));
                var $1029 = $1033;
                break;
        };
        return $1029;
    };
    const List$flatten = x0 => List$flatten$(x0);
    const Fm$Parser$binder = Monad$bind$(Parser$monad)(Parser$many1$(Parser$first_of$(List$cons$(Fm$Parser$binder$homo$(Bool$true), List$cons$(Fm$Parser$binder$homo$(Bool$false), List$nil)))))((_lists$1 => {
        var $1034 = Monad$pure$(Parser$monad)(List$flatten$(_lists$1));
        return $1034;
    }));

    function Fm$Parser$make_forall$(_binds$1, _body$2) {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                var $1036 = _body$2;
                var $1035 = $1036;
                break;
            case 'List.cons':
                var $1037 = self.head;
                var $1038 = self.tail;
                var self = $1037;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1040 = self.eras;
                        var $1041 = self.name;
                        var $1042 = self.term;
                        var $1043 = Fm$Term$all$($1040, "", $1041, $1042, (_s$8 => _x$9 => {
                            var $1044 = Fm$Parser$make_forall$($1038, _body$2);
                            return $1044;
                        }));
                        var $1039 = $1043;
                        break;
                };
                var $1035 = $1039;
                break;
        };
        return $1035;
    };
    const Fm$Parser$make_forall = x0 => x1 => Fm$Parser$make_forall$(x0, x1);

    function List$at$(_index$2, _list$3) {
        var List$at$ = (_index$2, _list$3) => ({
            ctr: 'TCO',
            arg: [_index$2, _list$3]
        });
        var List$at = _index$2 => _list$3 => List$at$(_index$2, _list$3);
        var arg = [_index$2, _list$3];
        while (true) {
            let [_index$2, _list$3] = arg;
            var R = (() => {
                var self = _list$3;
                switch (self._) {
                    case 'List.nil':
                        var $1045 = Maybe$none;
                        return $1045;
                    case 'List.cons':
                        var $1046 = self.head;
                        var $1047 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $1049 = Maybe$some$($1046);
                            var $1048 = $1049;
                        } else {
                            var $1050 = (self - 1n);
                            var $1051 = List$at$($1050, $1047);
                            var $1048 = $1051;
                        };
                        return $1048;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function List$at_last$(_index$2, _list$3) {
        var $1052 = List$at$(_index$2, List$reverse$(_list$3));
        return $1052;
    };
    const List$at_last = x0 => x1 => List$at_last$(x0, x1);

    function Fm$Term$var$(_name$1, _indx$2) {
        var $1053 = ({
            _: 'Fm.Term.var',
            'name': _name$1,
            'indx': _indx$2
        });
        return $1053;
    };
    const Fm$Term$var = x0 => x1 => Fm$Term$var$(x0, x1);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $1055 = self.fst;
                var $1056 = self.snd;
                var $1057 = $1056;
                var $1054 = $1057;
                break;
        };
        return $1054;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Fm$Name$eql$(_a$1, _b$2) {
        var $1058 = (_a$1 === _b$2);
        return $1058;
    };
    const Fm$Name$eql = x0 => x1 => Fm$Name$eql$(x0, x1);

    function Fm$Context$find$(_name$1, _ctx$2) {
        var Fm$Context$find$ = (_name$1, _ctx$2) => ({
            ctr: 'TCO',
            arg: [_name$1, _ctx$2]
        });
        var Fm$Context$find = _name$1 => _ctx$2 => Fm$Context$find$(_name$1, _ctx$2);
        var arg = [_name$1, _ctx$2];
        while (true) {
            let [_name$1, _ctx$2] = arg;
            var R = (() => {
                var self = _ctx$2;
                switch (self._) {
                    case 'List.nil':
                        var $1059 = Maybe$none;
                        return $1059;
                    case 'List.cons':
                        var $1060 = self.head;
                        var $1061 = self.tail;
                        var self = $1060;
                        switch (self._) {
                            case 'Pair.new':
                                var $1063 = self.fst;
                                var $1064 = self.snd;
                                var self = Fm$Name$eql$(_name$1, $1063);
                                if (self) {
                                    var $1066 = Maybe$some$($1064);
                                    var $1065 = $1066;
                                } else {
                                    var $1067 = Fm$Context$find$(_name$1, $1061);
                                    var $1065 = $1067;
                                };
                                var $1062 = $1065;
                                break;
                        };
                        return $1062;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Context$find = x0 => x1 => Fm$Context$find$(x0, x1);

    function List$length$go$(_xs$2, _n$3) {
        var List$length$go$ = (_xs$2, _n$3) => ({
            ctr: 'TCO',
            arg: [_xs$2, _n$3]
        });
        var List$length$go = _xs$2 => _n$3 => List$length$go$(_xs$2, _n$3);
        var arg = [_xs$2, _n$3];
        while (true) {
            let [_xs$2, _n$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.nil':
                        var $1068 = _n$3;
                        return $1068;
                    case 'List.cons':
                        var $1069 = self.head;
                        var $1070 = self.tail;
                        var $1071 = List$length$go$($1070, Nat$succ$(_n$3));
                        return $1071;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$length$go = x0 => x1 => List$length$go$(x0, x1);

    function List$length$(_xs$2) {
        var $1072 = List$length$go$(_xs$2, 0n);
        return $1072;
    };
    const List$length = x0 => List$length$(x0);

    function Fm$Path$o$(_path$1, _x$2) {
        var $1073 = _path$1((_x$2 + '0'));
        return $1073;
    };
    const Fm$Path$o = x0 => x1 => Fm$Path$o$(x0, x1);

    function Fm$Path$i$(_path$1, _x$2) {
        var $1074 = _path$1((_x$2 + '1'));
        return $1074;
    };
    const Fm$Path$i = x0 => x1 => Fm$Path$i$(x0, x1);

    function Fm$Path$to_bits$(_path$1) {
        var $1075 = _path$1(Bits$e);
        return $1075;
    };
    const Fm$Path$to_bits = x0 => Fm$Path$to_bits$(x0);

    function Fm$Term$bind$(_vars$1, _path$2, _term$3) {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $1077 = self.name;
                var $1078 = self.indx;
                var self = List$at_last$($1078, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1080 = Fm$Term$var$($1077, $1078);
                        var $1079 = $1080;
                        break;
                    case 'Maybe.some':
                        var $1081 = self.value;
                        var $1082 = Pair$snd$($1081);
                        var $1079 = $1082;
                        break;
                };
                var $1076 = $1079;
                break;
            case 'Fm.Term.ref':
                var $1083 = self.name;
                var self = Fm$Context$find$($1083, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1085 = Fm$Term$ref$($1083);
                        var $1084 = $1085;
                        break;
                    case 'Maybe.some':
                        var $1086 = self.value;
                        var $1087 = $1086;
                        var $1084 = $1087;
                        break;
                };
                var $1076 = $1084;
                break;
            case 'Fm.Term.typ':
                var $1088 = Fm$Term$typ;
                var $1076 = $1088;
                break;
            case 'Fm.Term.all':
                var $1089 = self.eras;
                var $1090 = self.self;
                var $1091 = self.name;
                var $1092 = self.xtyp;
                var $1093 = self.body;
                var _vlen$9 = List$length$(_vars$1);
                var $1094 = Fm$Term$all$($1089, $1090, $1091, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1092), (_s$10 => _x$11 => {
                    var $1095 = Fm$Term$bind$(List$cons$(Pair$new$($1091, _x$11), List$cons$(Pair$new$($1090, _s$10), _vars$1)), Fm$Path$i(_path$2), $1093(Fm$Term$var$($1090, _vlen$9))(Fm$Term$var$($1091, Nat$succ$(_vlen$9))));
                    return $1095;
                }));
                var $1076 = $1094;
                break;
            case 'Fm.Term.lam':
                var $1096 = self.name;
                var $1097 = self.body;
                var _vlen$6 = List$length$(_vars$1);
                var $1098 = Fm$Term$lam$($1096, (_x$7 => {
                    var $1099 = Fm$Term$bind$(List$cons$(Pair$new$($1096, _x$7), _vars$1), Fm$Path$o(_path$2), $1097(Fm$Term$var$($1096, _vlen$6)));
                    return $1099;
                }));
                var $1076 = $1098;
                break;
            case 'Fm.Term.app':
                var $1100 = self.func;
                var $1101 = self.argm;
                var $1102 = Fm$Term$app$(Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1100), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1101));
                var $1076 = $1102;
                break;
            case 'Fm.Term.let':
                var $1103 = self.name;
                var $1104 = self.expr;
                var $1105 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1106 = Fm$Term$let$($1103, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1104), (_x$8 => {
                    var $1107 = Fm$Term$bind$(List$cons$(Pair$new$($1103, _x$8), _vars$1), Fm$Path$i(_path$2), $1105(Fm$Term$var$($1103, _vlen$7)));
                    return $1107;
                }));
                var $1076 = $1106;
                break;
            case 'Fm.Term.def':
                var $1108 = self.name;
                var $1109 = self.expr;
                var $1110 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1111 = Fm$Term$def$($1108, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1109), (_x$8 => {
                    var $1112 = Fm$Term$bind$(List$cons$(Pair$new$($1108, _x$8), _vars$1), Fm$Path$i(_path$2), $1110(Fm$Term$var$($1108, _vlen$7)));
                    return $1112;
                }));
                var $1076 = $1111;
                break;
            case 'Fm.Term.ann':
                var $1113 = self.done;
                var $1114 = self.term;
                var $1115 = self.type;
                var $1116 = Fm$Term$ann$($1113, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1114), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1115));
                var $1076 = $1116;
                break;
            case 'Fm.Term.gol':
                var $1117 = self.name;
                var $1118 = self.dref;
                var $1119 = self.verb;
                var $1120 = Fm$Term$gol$($1117, $1118, $1119);
                var $1076 = $1120;
                break;
            case 'Fm.Term.hol':
                var $1121 = self.path;
                var $1122 = Fm$Term$hol$(Fm$Path$to_bits$(_path$2));
                var $1076 = $1122;
                break;
            case 'Fm.Term.nat':
                var $1123 = self.natx;
                var $1124 = Fm$Term$nat$($1123);
                var $1076 = $1124;
                break;
            case 'Fm.Term.chr':
                var $1125 = self.chrx;
                var $1126 = Fm$Term$chr$($1125);
                var $1076 = $1126;
                break;
            case 'Fm.Term.str':
                var $1127 = self.strx;
                var $1128 = Fm$Term$str$($1127);
                var $1076 = $1128;
                break;
            case 'Fm.Term.cse':
                var $1129 = self.path;
                var $1130 = self.expr;
                var $1131 = self.name;
                var $1132 = self.with;
                var $1133 = self.cses;
                var $1134 = self.moti;
                var _expr$10 = Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1130);
                var _name$11 = $1131;
                var _wyth$12 = $1132;
                var _cses$13 = $1133;
                var _moti$14 = $1134;
                var $1135 = Fm$Term$cse$(Fm$Path$to_bits$(_path$2), _expr$10, _name$11, _wyth$12, _cses$13, _moti$14);
                var $1076 = $1135;
                break;
            case 'Fm.Term.ori':
                var $1136 = self.orig;
                var $1137 = self.expr;
                var $1138 = Fm$Term$ori$($1136, Fm$Term$bind$(_vars$1, _path$2, $1137));
                var $1076 = $1138;
                break;
        };
        return $1076;
    };
    const Fm$Term$bind = x0 => x1 => x2 => Fm$Term$bind$(x0, x1, x2);
    const Fm$Status$done = ({
        _: 'Fm.Status.done'
    });

    function Fm$set$(_name$2, _val$3, _map$4) {
        var $1139 = Map$set$((fm_name_to_bits(_name$2)), _val$3, _map$4);
        return $1139;
    };
    const Fm$set = x0 => x1 => x2 => Fm$set$(x0, x1, x2);

    function Fm$define$(_file$1, _code$2, _name$3, _term$4, _type$5, _done$6, _defs$7) {
        var self = _done$6;
        if (self) {
            var $1141 = Fm$Status$done;
            var _stat$8 = $1141;
        } else {
            var $1142 = Fm$Status$init;
            var _stat$8 = $1142;
        };
        var $1140 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$8), _defs$7);
        return $1140;
    };
    const Fm$define = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$define$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Parser$file$def$(_file$1, _code$2, _defs$3) {
        var $1143 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$4 => {
            var $1144 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$binder))((_args$5 => {
                var _args$6 = List$flatten$(_args$5);
                var $1145 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$7 => {
                    var $1146 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$8 => {
                        var $1147 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$9 => {
                            var _type$10 = Fm$Parser$make_forall$(_args$6, _type$8);
                            var _term$11 = Fm$Parser$make_lambda$(List$mapped$(_args$6, (_x$11 => {
                                var self = _x$11;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $1150 = self.eras;
                                        var $1151 = self.name;
                                        var $1152 = self.term;
                                        var $1153 = $1151;
                                        var $1149 = $1153;
                                        break;
                                };
                                return $1149;
                            })), _term$9);
                            var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                                var $1154 = (_x$12 + '1');
                                return $1154;
                            }), _type$10);
                            var _term$13 = Fm$Term$bind$(List$nil, (_x$13 => {
                                var $1155 = (_x$13 + '0');
                                return $1155;
                            }), _term$11);
                            var _defs$14 = Fm$define$(_file$1, _code$2, _name$4, _term$13, _type$12, Bool$false, _defs$3);
                            var $1148 = Monad$pure$(Parser$monad)(_defs$14);
                            return $1148;
                        }));
                        return $1147;
                    }));
                    return $1146;
                }));
                return $1145;
            }));
            return $1144;
        }));
        return $1143;
    };
    const Fm$Parser$file$def = x0 => x1 => x2 => Fm$Parser$file$def$(x0, x1, x2);

    function Maybe$default$(_a$2, _m$3) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $1157 = _a$2;
                var $1156 = $1157;
                break;
            case 'Maybe.some':
                var $1158 = self.value;
                var $1159 = $1158;
                var $1156 = $1159;
                break;
        };
        return $1156;
    };
    const Maybe$default = x0 => x1 => Maybe$default$(x0, x1);

    function Fm$Constructor$new$(_name$1, _args$2, _inds$3) {
        var $1160 = ({
            _: 'Fm.Constructor.new',
            'name': _name$1,
            'args': _args$2,
            'inds': _inds$3
        });
        return $1160;
    };
    const Fm$Constructor$new = x0 => x1 => x2 => Fm$Constructor$new$(x0, x1, x2);

    function Fm$Parser$constructor$(_namespace$1) {
        var $1161 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1162 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => {
                var $1163 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1164 = Fm$Parser$binder;
                    return $1164;
                }))))((_inds$4 => {
                    var _args$5 = Maybe$default$(List$nil, _args$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1165 = Monad$pure$(Parser$monad)(Fm$Constructor$new$(_name$2, _args$5, _inds$6));
                    return $1165;
                }));
                return $1163;
            }));
            return $1162;
        }));
        return $1161;
    };
    const Fm$Parser$constructor = x0 => Fm$Parser$constructor$(x0);

    function Fm$Datatype$new$(_name$1, _pars$2, _inds$3, _ctrs$4) {
        var $1166 = ({
            _: 'Fm.Datatype.new',
            'name': _name$1,
            'pars': _pars$2,
            'inds': _inds$3,
            'ctrs': _ctrs$4
        });
        return $1166;
    };
    const Fm$Datatype$new = x0 => x1 => x2 => x3 => Fm$Datatype$new$(x0, x1, x2, x3);
    const Fm$Parser$datatype = Monad$bind$(Parser$monad)(Fm$Parser$text$("type "))((_$1 => {
        var $1167 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1168 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => {
                var $1169 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1170 = Fm$Parser$binder;
                    return $1170;
                }))))((_inds$4 => {
                    var _pars$5 = Maybe$default$(List$nil, _pars$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1171 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$7 => {
                        var $1172 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$item$(Fm$Parser$constructor$(_name$2))))((_ctrs$8 => {
                            var $1173 = Monad$pure$(Parser$monad)(Fm$Datatype$new$(_name$2, _pars$5, _inds$6, _ctrs$8));
                            return $1173;
                        }));
                        return $1172;
                    }));
                    return $1171;
                }));
                return $1169;
            }));
            return $1168;
        }));
        return $1167;
    }));

    function Fm$Datatype$build_term$motive$go$(_type$1, _name$2, _inds$3) {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1176 = self.name;
                        var $1177 = self.pars;
                        var $1178 = self.inds;
                        var $1179 = self.ctrs;
                        var _slf$8 = Fm$Term$ref$(_name$2);
                        var _slf$9 = (() => {
                            var $1182 = _slf$8;
                            var $1183 = $1177;
                            let _slf$10 = $1182;
                            let _var$9;
                            while ($1183._ === 'List.cons') {
                                _var$9 = $1183.head;
                                var $1182 = Fm$Term$app$(_slf$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1184 = self.eras;
                                            var $1185 = self.name;
                                            var $1186 = self.term;
                                            var $1187 = $1185;
                                            return $1187;
                                    };
                                })()));
                                _slf$10 = $1182;
                                $1183 = $1183.tail;
                            }
                            return _slf$10;
                        })();
                        var _slf$10 = (() => {
                            var $1189 = _slf$9;
                            var $1190 = $1178;
                            let _slf$11 = $1189;
                            let _var$10;
                            while ($1190._ === 'List.cons') {
                                _var$10 = $1190.head;
                                var $1189 = Fm$Term$app$(_slf$11, Fm$Term$ref$((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1191 = self.eras;
                                            var $1192 = self.name;
                                            var $1193 = self.term;
                                            var $1194 = $1192;
                                            return $1194;
                                    };
                                })()));
                                _slf$11 = $1189;
                                $1190 = $1190.tail;
                            }
                            return _slf$11;
                        })();
                        var $1180 = Fm$Term$all$(Bool$false, "", "", _slf$10, (_s$11 => _x$12 => {
                            var $1195 = Fm$Term$typ;
                            return $1195;
                        }));
                        var $1175 = $1180;
                        break;
                };
                var $1174 = $1175;
                break;
            case 'List.cons':
                var $1196 = self.head;
                var $1197 = self.tail;
                var self = $1196;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1199 = self.eras;
                        var $1200 = self.name;
                        var $1201 = self.term;
                        var $1202 = Fm$Term$all$($1199, "", $1200, $1201, (_s$9 => _x$10 => {
                            var $1203 = Fm$Datatype$build_term$motive$go$(_type$1, _name$2, $1197);
                            return $1203;
                        }));
                        var $1198 = $1202;
                        break;
                };
                var $1174 = $1198;
                break;
        };
        return $1174;
    };
    const Fm$Datatype$build_term$motive$go = x0 => x1 => x2 => Fm$Datatype$build_term$motive$go$(x0, x1, x2);

    function Fm$Datatype$build_term$motive$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1205 = self.name;
                var $1206 = self.pars;
                var $1207 = self.inds;
                var $1208 = self.ctrs;
                var $1209 = Fm$Datatype$build_term$motive$go$(_type$1, $1205, $1207);
                var $1204 = $1209;
                break;
        };
        return $1204;
    };
    const Fm$Datatype$build_term$motive = x0 => Fm$Datatype$build_term$motive$(x0);

    function Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, _args$3) {
        var self = _args$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1212 = self.name;
                        var $1213 = self.pars;
                        var $1214 = self.inds;
                        var $1215 = self.ctrs;
                        var self = _ctor$2;
                        switch (self._) {
                            case 'Fm.Constructor.new':
                                var $1217 = self.name;
                                var $1218 = self.args;
                                var $1219 = self.inds;
                                var _ret$11 = Fm$Term$ref$(Fm$Name$read$("P"));
                                var _ret$12 = (() => {
                                    var $1222 = _ret$11;
                                    var $1223 = $1219;
                                    let _ret$13 = $1222;
                                    let _var$12;
                                    while ($1223._ === 'List.cons') {
                                        _var$12 = $1223.head;
                                        var $1222 = Fm$Term$app$(_ret$13, (() => {
                                            var self = _var$12;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1224 = self.eras;
                                                    var $1225 = self.name;
                                                    var $1226 = self.term;
                                                    var $1227 = $1226;
                                                    return $1227;
                                            };
                                        })());
                                        _ret$13 = $1222;
                                        $1223 = $1223.tail;
                                    }
                                    return _ret$13;
                                })();
                                var _ctr$13 = String$flatten$(List$cons$($1212, List$cons$(Fm$Name$read$("."), List$cons$($1217, List$nil))));
                                var _slf$14 = Fm$Term$ref$(_ctr$13);
                                var _slf$15 = (() => {
                                    var $1229 = _slf$14;
                                    var $1230 = $1213;
                                    let _slf$16 = $1229;
                                    let _var$15;
                                    while ($1230._ === 'List.cons') {
                                        _var$15 = $1230.head;
                                        var $1229 = Fm$Term$app$(_slf$16, Fm$Term$ref$((() => {
                                            var self = _var$15;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1231 = self.eras;
                                                    var $1232 = self.name;
                                                    var $1233 = self.term;
                                                    var $1234 = $1232;
                                                    return $1234;
                                            };
                                        })()));
                                        _slf$16 = $1229;
                                        $1230 = $1230.tail;
                                    }
                                    return _slf$16;
                                })();
                                var _slf$16 = (() => {
                                    var $1236 = _slf$15;
                                    var $1237 = $1218;
                                    let _slf$17 = $1236;
                                    let _var$16;
                                    while ($1237._ === 'List.cons') {
                                        _var$16 = $1237.head;
                                        var $1236 = Fm$Term$app$(_slf$17, Fm$Term$ref$((() => {
                                            var self = _var$16;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1238 = self.eras;
                                                    var $1239 = self.name;
                                                    var $1240 = self.term;
                                                    var $1241 = $1239;
                                                    return $1241;
                                            };
                                        })()));
                                        _slf$17 = $1236;
                                        $1237 = $1237.tail;
                                    }
                                    return _slf$17;
                                })();
                                var $1220 = Fm$Term$app$(_ret$12, _slf$16);
                                var $1216 = $1220;
                                break;
                        };
                        var $1211 = $1216;
                        break;
                };
                var $1210 = $1211;
                break;
            case 'List.cons':
                var $1242 = self.head;
                var $1243 = self.tail;
                var self = $1242;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1245 = self.eras;
                        var $1246 = self.name;
                        var $1247 = self.term;
                        var _eras$9 = $1245;
                        var _name$10 = $1246;
                        var _xtyp$11 = $1247;
                        var _body$12 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1243);
                        var $1248 = Fm$Term$all$(_eras$9, "", _name$10, _xtyp$11, (_s$13 => _x$14 => {
                            var $1249 = _body$12;
                            return $1249;
                        }));
                        var $1244 = $1248;
                        break;
                };
                var $1210 = $1244;
                break;
        };
        return $1210;
    };
    const Fm$Datatype$build_term$constructor$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructor$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructor$(_type$1, _ctor$2) {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $1251 = self.name;
                var $1252 = self.args;
                var $1253 = self.inds;
                var $1254 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1252);
                var $1250 = $1254;
                break;
        };
        return $1250;
    };
    const Fm$Datatype$build_term$constructor = x0 => x1 => Fm$Datatype$build_term$constructor$(x0, x1);

    function Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1257 = self.name;
                        var $1258 = self.pars;
                        var $1259 = self.inds;
                        var $1260 = self.ctrs;
                        var _ret$8 = Fm$Term$ref$(Fm$Name$read$("P"));
                        var _ret$9 = (() => {
                            var $1263 = _ret$8;
                            var $1264 = $1259;
                            let _ret$10 = $1263;
                            let _var$9;
                            while ($1264._ === 'List.cons') {
                                _var$9 = $1264.head;
                                var $1263 = Fm$Term$app$(_ret$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1265 = self.eras;
                                            var $1266 = self.name;
                                            var $1267 = self.term;
                                            var $1268 = $1266;
                                            return $1268;
                                    };
                                })()));
                                _ret$10 = $1263;
                                $1264 = $1264.tail;
                            }
                            return _ret$10;
                        })();
                        var $1261 = Fm$Term$app$(_ret$9, Fm$Term$ref$((_name$2 + ".Self")));
                        var $1256 = $1261;
                        break;
                };
                var $1255 = $1256;
                break;
            case 'List.cons':
                var $1269 = self.head;
                var $1270 = self.tail;
                var self = $1269;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1272 = self.name;
                        var $1273 = self.args;
                        var $1274 = self.inds;
                        var $1275 = Fm$Term$all$(Bool$false, "", $1272, Fm$Datatype$build_term$constructor$(_type$1, $1269), (_s$9 => _x$10 => {
                            var $1276 = Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, $1270);
                            return $1276;
                        }));
                        var $1271 = $1275;
                        break;
                };
                var $1255 = $1271;
                break;
        };
        return $1255;
    };
    const Fm$Datatype$build_term$constructors$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructors$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructors$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1278 = self.name;
                var $1279 = self.pars;
                var $1280 = self.inds;
                var $1281 = self.ctrs;
                var $1282 = Fm$Datatype$build_term$constructors$go$(_type$1, $1278, $1281);
                var $1277 = $1282;
                break;
        };
        return $1277;
    };
    const Fm$Datatype$build_term$constructors = x0 => Fm$Datatype$build_term$constructors$(x0);

    function Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1285 = Fm$Term$all$(Bool$true, (_name$2 + ".Self"), Fm$Name$read$("P"), Fm$Datatype$build_term$motive$(_type$1), (_s$5 => _x$6 => {
                            var $1286 = Fm$Datatype$build_term$constructors$(_type$1);
                            return $1286;
                        }));
                        var $1284 = $1285;
                        break;
                    case 'List.cons':
                        var $1287 = self.head;
                        var $1288 = self.tail;
                        var self = $1287;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1290 = self.eras;
                                var $1291 = self.name;
                                var $1292 = self.term;
                                var $1293 = Fm$Term$lam$($1291, (_x$10 => {
                                    var $1294 = Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, $1288);
                                    return $1294;
                                }));
                                var $1289 = $1293;
                                break;
                        };
                        var $1284 = $1289;
                        break;
                };
                var $1283 = $1284;
                break;
            case 'List.cons':
                var $1295 = self.head;
                var $1296 = self.tail;
                var self = $1295;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1298 = self.eras;
                        var $1299 = self.name;
                        var $1300 = self.term;
                        var $1301 = Fm$Term$lam$($1299, (_x$10 => {
                            var $1302 = Fm$Datatype$build_term$go$(_type$1, _name$2, $1296, _inds$4);
                            return $1302;
                        }));
                        var $1297 = $1301;
                        break;
                };
                var $1283 = $1297;
                break;
        };
        return $1283;
    };
    const Fm$Datatype$build_term$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_term$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_term$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1304 = self.name;
                var $1305 = self.pars;
                var $1306 = self.inds;
                var $1307 = self.ctrs;
                var $1308 = Fm$Datatype$build_term$go$(_type$1, $1304, $1305, $1306);
                var $1303 = $1308;
                break;
        };
        return $1303;
    };
    const Fm$Datatype$build_term = x0 => Fm$Datatype$build_term$(x0);

    function Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1311 = Fm$Term$typ;
                        var $1310 = $1311;
                        break;
                    case 'List.cons':
                        var $1312 = self.head;
                        var $1313 = self.tail;
                        var self = $1312;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1315 = self.eras;
                                var $1316 = self.name;
                                var $1317 = self.term;
                                var $1318 = Fm$Term$all$(Bool$false, "", $1316, $1317, (_s$10 => _x$11 => {
                                    var $1319 = Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, $1313);
                                    return $1319;
                                }));
                                var $1314 = $1318;
                                break;
                        };
                        var $1310 = $1314;
                        break;
                };
                var $1309 = $1310;
                break;
            case 'List.cons':
                var $1320 = self.head;
                var $1321 = self.tail;
                var self = $1320;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1323 = self.eras;
                        var $1324 = self.name;
                        var $1325 = self.term;
                        var $1326 = Fm$Term$all$(Bool$false, "", $1324, $1325, (_s$10 => _x$11 => {
                            var $1327 = Fm$Datatype$build_type$go$(_type$1, _name$2, $1321, _inds$4);
                            return $1327;
                        }));
                        var $1322 = $1326;
                        break;
                };
                var $1309 = $1322;
                break;
        };
        return $1309;
    };
    const Fm$Datatype$build_type$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_type$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_type$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1329 = self.name;
                var $1330 = self.pars;
                var $1331 = self.inds;
                var $1332 = self.ctrs;
                var $1333 = Fm$Datatype$build_type$go$(_type$1, $1329, $1330, $1331);
                var $1328 = $1333;
                break;
        };
        return $1328;
    };
    const Fm$Datatype$build_type = x0 => Fm$Datatype$build_type$(x0);

    function Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1336 = self.name;
                        var $1337 = self.args;
                        var $1338 = self.inds;
                        var _ret$7 = Fm$Term$ref$($1336);
                        var _ret$8 = (() => {
                            var $1341 = _ret$7;
                            var $1342 = $1337;
                            let _ret$9 = $1341;
                            let _arg$8;
                            while ($1342._ === 'List.cons') {
                                _arg$8 = $1342.head;
                                var $1341 = Fm$Term$app$(_ret$9, Fm$Term$ref$((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1343 = self.eras;
                                            var $1344 = self.name;
                                            var $1345 = self.term;
                                            var $1346 = $1344;
                                            return $1346;
                                    };
                                })()));
                                _ret$9 = $1341;
                                $1342 = $1342.tail;
                            }
                            return _ret$9;
                        })();
                        var $1339 = _ret$8;
                        var $1335 = $1339;
                        break;
                };
                var $1334 = $1335;
                break;
            case 'List.cons':
                var $1347 = self.head;
                var $1348 = self.tail;
                var self = $1347;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1350 = self.name;
                        var $1351 = self.args;
                        var $1352 = self.inds;
                        var $1353 = Fm$Term$lam$($1350, (_x$9 => {
                            var $1354 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1348);
                            return $1354;
                        }));
                        var $1349 = $1353;
                        break;
                };
                var $1334 = $1349;
                break;
        };
        return $1334;
    };
    const Fm$Constructor$build_term$opt$go = x0 => x1 => x2 => Fm$Constructor$build_term$opt$go$(x0, x1, x2);

    function Fm$Constructor$build_term$opt$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1356 = self.name;
                var $1357 = self.pars;
                var $1358 = self.inds;
                var $1359 = self.ctrs;
                var $1360 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1359);
                var $1355 = $1360;
                break;
        };
        return $1355;
    };
    const Fm$Constructor$build_term$opt = x0 => x1 => Fm$Constructor$build_term$opt$(x0, x1);

    function Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var $1363 = Fm$Term$lam$(Fm$Name$read$("P"), (_x$6 => {
                            var $1364 = Fm$Constructor$build_term$opt$(_type$1, _ctor$2);
                            return $1364;
                        }));
                        var $1362 = $1363;
                        break;
                    case 'List.cons':
                        var $1365 = self.head;
                        var $1366 = self.tail;
                        var self = $1365;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1368 = self.eras;
                                var $1369 = self.name;
                                var $1370 = self.term;
                                var $1371 = Fm$Term$lam$($1369, (_x$11 => {
                                    var $1372 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, $1366);
                                    return $1372;
                                }));
                                var $1367 = $1371;
                                break;
                        };
                        var $1362 = $1367;
                        break;
                };
                var $1361 = $1362;
                break;
            case 'List.cons':
                var $1373 = self.head;
                var $1374 = self.tail;
                var self = $1373;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1376 = self.eras;
                        var $1377 = self.name;
                        var $1378 = self.term;
                        var $1379 = Fm$Term$lam$($1377, (_x$11 => {
                            var $1380 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, $1374, _args$5);
                            return $1380;
                        }));
                        var $1375 = $1379;
                        break;
                };
                var $1361 = $1375;
                break;
        };
        return $1361;
    };
    const Fm$Constructor$build_term$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_term$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_term$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1382 = self.name;
                var $1383 = self.pars;
                var $1384 = self.inds;
                var $1385 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1387 = self.name;
                        var $1388 = self.args;
                        var $1389 = self.inds;
                        var $1390 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, $1382, $1383, $1388);
                        var $1386 = $1390;
                        break;
                };
                var $1381 = $1386;
                break;
        };
        return $1381;
    };
    const Fm$Constructor$build_term = x0 => x1 => Fm$Constructor$build_term$(x0, x1);

    function Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var self = _type$1;
                        switch (self._) {
                            case 'Fm.Datatype.new':
                                var $1394 = self.name;
                                var $1395 = self.pars;
                                var $1396 = self.inds;
                                var $1397 = self.ctrs;
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $1399 = self.name;
                                        var $1400 = self.args;
                                        var $1401 = self.inds;
                                        var _type$13 = Fm$Term$ref$(_name$3);
                                        var _type$14 = (() => {
                                            var $1404 = _type$13;
                                            var $1405 = $1395;
                                            let _type$15 = $1404;
                                            let _var$14;
                                            while ($1405._ === 'List.cons') {
                                                _var$14 = $1405.head;
                                                var $1404 = Fm$Term$app$(_type$15, Fm$Term$ref$((() => {
                                                    var self = _var$14;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1406 = self.eras;
                                                            var $1407 = self.name;
                                                            var $1408 = self.term;
                                                            var $1409 = $1407;
                                                            return $1409;
                                                    };
                                                })()));
                                                _type$15 = $1404;
                                                $1405 = $1405.tail;
                                            }
                                            return _type$15;
                                        })();
                                        var _type$15 = (() => {
                                            var $1411 = _type$14;
                                            var $1412 = $1401;
                                            let _type$16 = $1411;
                                            let _var$15;
                                            while ($1412._ === 'List.cons') {
                                                _var$15 = $1412.head;
                                                var $1411 = Fm$Term$app$(_type$16, (() => {
                                                    var self = _var$15;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1413 = self.eras;
                                                            var $1414 = self.name;
                                                            var $1415 = self.term;
                                                            var $1416 = $1415;
                                                            return $1416;
                                                    };
                                                })());
                                                _type$16 = $1411;
                                                $1412 = $1412.tail;
                                            }
                                            return _type$16;
                                        })();
                                        var $1402 = _type$15;
                                        var $1398 = $1402;
                                        break;
                                };
                                var $1393 = $1398;
                                break;
                        };
                        var $1392 = $1393;
                        break;
                    case 'List.cons':
                        var $1417 = self.head;
                        var $1418 = self.tail;
                        var self = $1417;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1420 = self.eras;
                                var $1421 = self.name;
                                var $1422 = self.term;
                                var $1423 = Fm$Term$all$($1420, "", $1421, $1422, (_s$11 => _x$12 => {
                                    var $1424 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, $1418);
                                    return $1424;
                                }));
                                var $1419 = $1423;
                                break;
                        };
                        var $1392 = $1419;
                        break;
                };
                var $1391 = $1392;
                break;
            case 'List.cons':
                var $1425 = self.head;
                var $1426 = self.tail;
                var self = $1425;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1428 = self.eras;
                        var $1429 = self.name;
                        var $1430 = self.term;
                        var $1431 = Fm$Term$all$($1428, "", $1429, $1430, (_s$11 => _x$12 => {
                            var $1432 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, $1426, _args$5);
                            return $1432;
                        }));
                        var $1427 = $1431;
                        break;
                };
                var $1391 = $1427;
                break;
        };
        return $1391;
    };
    const Fm$Constructor$build_type$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_type$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_type$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1434 = self.name;
                var $1435 = self.pars;
                var $1436 = self.inds;
                var $1437 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1439 = self.name;
                        var $1440 = self.args;
                        var $1441 = self.inds;
                        var $1442 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, $1434, $1435, $1440);
                        var $1438 = $1442;
                        break;
                };
                var $1433 = $1438;
                break;
        };
        return $1433;
    };
    const Fm$Constructor$build_type = x0 => x1 => Fm$Constructor$build_type$(x0, x1);

    function Fm$Parser$file$adt$(_file$1, _code$2, _defs$3) {
        var $1443 = Monad$bind$(Parser$monad)(Fm$Parser$datatype)((_adt$4 => {
            var self = _adt$4;
            switch (self._) {
                case 'Fm.Datatype.new':
                    var $1445 = self.name;
                    var $1446 = self.pars;
                    var $1447 = self.inds;
                    var $1448 = self.ctrs;
                    var _term$9 = Fm$Datatype$build_term$(_adt$4);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $1450 = (_x$10 + '1');
                        return $1450;
                    }), _term$9);
                    var _type$11 = Fm$Datatype$build_type$(_adt$4);
                    var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                        var $1451 = (_x$12 + '0');
                        return $1451;
                    }), _type$11);
                    var _defs$13 = Fm$define$(_file$1, _code$2, $1445, _term$10, _type$12, Bool$false, _defs$3);
                    var _defs$14 = List$fold$($1448, _defs$13, (_ctr$14 => _defs$15 => {
                        var _typ_name$16 = $1445;
                        var _ctr_name$17 = String$flatten$(List$cons$(_typ_name$16, List$cons$(Fm$Name$read$("."), List$cons$((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $1453 = self.name;
                                    var $1454 = self.args;
                                    var $1455 = self.inds;
                                    var $1456 = $1453;
                                    return $1456;
                            };
                        })(), List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term$(_adt$4, _ctr$14);
                        var _ctr_term$19 = Fm$Term$bind$(List$nil, (_x$19 => {
                            var $1457 = (_x$19 + '1');
                            return $1457;
                        }), _ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type$(_adt$4, _ctr$14);
                        var _ctr_type$21 = Fm$Term$bind$(List$nil, (_x$21 => {
                            var $1458 = (_x$21 + '0');
                            return $1458;
                        }), _ctr_type$20);
                        var $1452 = Fm$define$(_file$1, _code$2, _ctr_name$17, _ctr_term$19, _ctr_type$21, Bool$false, _defs$15);
                        return $1452;
                    }));
                    var $1449 = Monad$pure$(Parser$monad)(_defs$14);
                    var $1444 = $1449;
                    break;
            };
            return $1444;
        }));
        return $1443;
    };
    const Fm$Parser$file$adt = x0 => x1 => x2 => Fm$Parser$file$adt$(x0, x1, x2);

    function Parser$eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $1460 = Parser$Reply$value$(_idx$1, _code$2, Unit$new);
            var $1459 = $1460;
        } else {
            var $1461 = self.charCodeAt(0);
            var $1462 = self.slice(1);
            var $1463 = Parser$Reply$error$(_idx$1, _code$2, "Expected end-of-file.");
            var $1459 = $1463;
        };
        return $1459;
    };
    const Parser$eof = x0 => x1 => Parser$eof$(x0, x1);

    function Fm$Parser$file$end$(_file$1, _code$2, _defs$3) {
        var $1464 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$4 => {
            var $1465 = Monad$bind$(Parser$monad)(Parser$eof)((_$5 => {
                var $1466 = Monad$pure$(Parser$monad)(_defs$3);
                return $1466;
            }));
            return $1465;
        }));
        return $1464;
    };
    const Fm$Parser$file$end = x0 => x1 => x2 => Fm$Parser$file$end$(x0, x1, x2);

    function Fm$Parser$file$(_file$1, _code$2, _defs$3) {
        var $1467 = Monad$bind$(Parser$monad)(Parser$is_eof)((_stop$4 => {
            var self = _stop$4;
            if (self) {
                var $1469 = Monad$pure$(Parser$monad)(_defs$3);
                var $1468 = $1469;
            } else {
                var $1470 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("#"))((_$5 => {
                    var $1471 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_file$6 => {
                        var $1472 = Fm$Parser$file$(_file$6, _code$2, _defs$3);
                        return $1472;
                    }));
                    return $1471;
                })), List$cons$(Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$file$def$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$adt$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$end$(_file$1, _code$2, _defs$3), List$nil)))))((_defs$5 => {
                    var $1473 = Fm$Parser$file$(_file$1, _code$2, _defs$5);
                    return $1473;
                })), List$nil)));
                var $1468 = $1470;
            };
            return $1468;
        }));
        return $1467;
    };
    const Fm$Parser$file = x0 => x1 => x2 => Fm$Parser$file$(x0, x1, x2);

    function Either$(_A$1, _B$2) {
        var $1474 = null;
        return $1474;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function String$join$go$(_sep$1, _list$2, _fst$3) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $1476 = "";
                var $1475 = $1476;
                break;
            case 'List.cons':
                var $1477 = self.head;
                var $1478 = self.tail;
                var $1479 = String$flatten$(List$cons$((() => {
                    var self = _fst$3;
                    if (self) {
                        var $1480 = "";
                        return $1480;
                    } else {
                        var $1481 = _sep$1;
                        return $1481;
                    };
                })(), List$cons$($1477, List$cons$(String$join$go$(_sep$1, $1478, Bool$false), List$nil))));
                var $1475 = $1479;
                break;
        };
        return $1475;
    };
    const String$join$go = x0 => x1 => x2 => String$join$go$(x0, x1, x2);

    function String$join$(_sep$1, _list$2) {
        var $1482 = String$join$go$(_sep$1, _list$2, Bool$true);
        return $1482;
    };
    const String$join = x0 => x1 => String$join$(x0, x1);

    function Fm$highlight$end$(_col$1, _row$2, _res$3) {
        var $1483 = String$join$("\u{a}", _res$3);
        return $1483;
    };
    const Fm$highlight$end = x0 => x1 => x2 => Fm$highlight$end$(x0, x1, x2);

    function Maybe$extract$(_m$2, _a$4, _f$5) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1485 = _a$4;
                var $1484 = $1485;
                break;
            case 'Maybe.some':
                var $1486 = self.value;
                var $1487 = _f$5($1486);
                var $1484 = $1487;
                break;
        };
        return $1484;
    };
    const Maybe$extract = x0 => x1 => x2 => Maybe$extract$(x0, x1, x2);

    function Nat$is_zero$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1489 = Bool$true;
            var $1488 = $1489;
        } else {
            var $1490 = (self - 1n);
            var $1491 = Bool$false;
            var $1488 = $1491;
        };
        return $1488;
    };
    const Nat$is_zero = x0 => Nat$is_zero$(x0);

    function Nat$double$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1493 = Nat$zero;
            var $1492 = $1493;
        } else {
            var $1494 = (self - 1n);
            var $1495 = Nat$succ$(Nat$succ$(Nat$double$($1494)));
            var $1492 = $1495;
        };
        return $1492;
    };
    const Nat$double = x0 => Nat$double$(x0);

    function Nat$pred$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1497 = Nat$zero;
            var $1496 = $1497;
        } else {
            var $1498 = (self - 1n);
            var $1499 = $1498;
            var $1496 = $1499;
        };
        return $1496;
    };
    const Nat$pred = x0 => Nat$pred$(x0);

    function List$take$(_n$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                var $1501 = List$nil;
                var $1500 = $1501;
                break;
            case 'List.cons':
                var $1502 = self.head;
                var $1503 = self.tail;
                var self = _n$2;
                if (self === 0n) {
                    var $1505 = List$nil;
                    var $1504 = $1505;
                } else {
                    var $1506 = (self - 1n);
                    var $1507 = List$cons$($1502, List$take$($1506, $1503));
                    var $1504 = $1507;
                };
                var $1500 = $1504;
                break;
        };
        return $1500;
    };
    const List$take = x0 => x1 => List$take$(x0, x1);

    function String$reverse$go$(_xs$1, _res$2) {
        var String$reverse$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$reverse$go = _xs$1 => _res$2 => String$reverse$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                if (self.length === 0) {
                    var $1508 = _res$2;
                    return $1508;
                } else {
                    var $1509 = self.charCodeAt(0);
                    var $1510 = self.slice(1);
                    var $1511 = String$reverse$go$($1510, String$cons$($1509, _res$2));
                    return $1511;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$reverse$go = x0 => x1 => String$reverse$go$(x0, x1);

    function String$reverse$(_xs$1) {
        var $1512 = String$reverse$go$(_xs$1, String$nil);
        return $1512;
    };
    const String$reverse = x0 => String$reverse$(x0);

    function String$pad_right$(_size$1, _chr$2, _str$3) {
        var self = _size$1;
        if (self === 0n) {
            var $1514 = _str$3;
            var $1513 = $1514;
        } else {
            var $1515 = (self - 1n);
            var self = _str$3;
            if (self.length === 0) {
                var $1517 = String$cons$(_chr$2, String$pad_right$($1515, _chr$2, ""));
                var $1516 = $1517;
            } else {
                var $1518 = self.charCodeAt(0);
                var $1519 = self.slice(1);
                var $1520 = String$cons$($1518, String$pad_right$($1515, _chr$2, $1519));
                var $1516 = $1520;
            };
            var $1513 = $1516;
        };
        return $1513;
    };
    const String$pad_right = x0 => x1 => x2 => String$pad_right$(x0, x1, x2);

    function String$pad_left$(_size$1, _chr$2, _str$3) {
        var $1521 = String$reverse$(String$pad_right$(_size$1, _chr$2, String$reverse$(_str$3)));
        return $1521;
    };
    const String$pad_left = x0 => x1 => x2 => String$pad_left$(x0, x1, x2);

    function Either$left$(_value$3) {
        var $1522 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $1522;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $1523 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $1523;
    };
    const Either$right = x0 => Either$right$(x0);

    function Nat$sub_rem$(_n$1, _m$2) {
        var Nat$sub_rem$ = (_n$1, _m$2) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2]
        });
        var Nat$sub_rem = _n$1 => _m$2 => Nat$sub_rem$(_n$1, _m$2);
        var arg = [_n$1, _m$2];
        while (true) {
            let [_n$1, _m$2] = arg;
            var R = (() => {
                var self = _m$2;
                if (self === 0n) {
                    var $1524 = Either$left$(_n$1);
                    return $1524;
                } else {
                    var $1525 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $1527 = Either$right$(Nat$succ$($1525));
                        var $1526 = $1527;
                    } else {
                        var $1528 = (self - 1n);
                        var $1529 = Nat$sub_rem$($1528, $1525);
                        var $1526 = $1529;
                    };
                    return $1526;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$sub_rem = x0 => x1 => Nat$sub_rem$(x0, x1);

    function Nat$div_mod$go$(_n$1, _m$2, _d$3) {
        var Nat$div_mod$go$ = (_n$1, _m$2, _d$3) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _d$3]
        });
        var Nat$div_mod$go = _n$1 => _m$2 => _d$3 => Nat$div_mod$go$(_n$1, _m$2, _d$3);
        var arg = [_n$1, _m$2, _d$3];
        while (true) {
            let [_n$1, _m$2, _d$3] = arg;
            var R = (() => {
                var self = Nat$sub_rem$(_n$1, _m$2);
                switch (self._) {
                    case 'Either.left':
                        var $1530 = self.value;
                        var $1531 = Nat$div_mod$go$($1530, _m$2, Nat$succ$(_d$3));
                        return $1531;
                    case 'Either.right':
                        var $1532 = self.value;
                        var $1533 = Pair$new$(_d$3, _n$1);
                        return $1533;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$div_mod$go = x0 => x1 => x2 => Nat$div_mod$go$(x0, x1, x2);
    const Nat$div_mod = a0 => a1 => (({
        _: 'Pair.new',
        'fst': a0 / a1,
        'snd': a0 % a1
    }));

    function Nat$to_base$go$(_base$1, _nat$2, _res$3) {
        var Nat$to_base$go$ = (_base$1, _nat$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_base$1, _nat$2, _res$3]
        });
        var Nat$to_base$go = _base$1 => _nat$2 => _res$3 => Nat$to_base$go$(_base$1, _nat$2, _res$3);
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
                        var $1534 = self.fst;
                        var $1535 = self.snd;
                        var self = $1534;
                        if (self === 0n) {
                            var $1537 = List$cons$($1535, _res$3);
                            var $1536 = $1537;
                        } else {
                            var $1538 = (self - 1n);
                            var $1539 = Nat$to_base$go$(_base$1, $1534, List$cons$($1535, _res$3));
                            var $1536 = $1539;
                        };
                        return $1536;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $1540 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $1540;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);

    function Nat$mod$(_n$1, _m$2) {
        var $1541 = Pair$snd$((({
            _: 'Pair.new',
            'fst': _n$1 / _m$2,
            'snd': _n$1 % _m$2
        })));
        return $1541;
    };
    const Nat$mod = x0 => x1 => Nat$mod$(x0, x1);
    const Nat$lte = a0 => a1 => (a0 <= a1);

    function Nat$show_digit$(_base$1, _n$2) {
        var _m$3 = Nat$mod$(_n$2, _base$1);
        var _base64$4 = List$cons$(48, List$cons$(49, List$cons$(50, List$cons$(51, List$cons$(52, List$cons$(53, List$cons$(54, List$cons$(55, List$cons$(56, List$cons$(57, List$cons$(65, List$cons$(66, List$cons$(67, List$cons$(68, List$cons$(69, List$cons$(70, List$cons$(71, List$cons$(72, List$cons$(73, List$cons$(74, List$cons$(75, List$cons$(76, List$cons$(77, List$cons$(78, List$cons$(79, List$cons$(80, List$cons$(81, List$cons$(82, List$cons$(83, List$cons$(84, List$cons$(85, List$cons$(86, List$cons$(87, List$cons$(88, List$cons$(89, List$cons$(90, List$cons$(97, List$cons$(98, List$cons$(99, List$cons$(100, List$cons$(101, List$cons$(102, List$cons$(103, List$cons$(104, List$cons$(105, List$cons$(106, List$cons$(107, List$cons$(108, List$cons$(109, List$cons$(110, List$cons$(111, List$cons$(112, List$cons$(113, List$cons$(114, List$cons$(115, List$cons$(116, List$cons$(117, List$cons$(118, List$cons$(119, List$cons$(120, List$cons$(121, List$cons$(122, List$cons$(43, List$cons$(47, List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
        var self = ((_base$1 > 0n) && (_base$1 <= 64n));
        if (self) {
            var self = List$at$(_m$3, _base64$4);
            switch (self._) {
                case 'Maybe.none':
                    var $1544 = 35;
                    var $1543 = $1544;
                    break;
                case 'Maybe.some':
                    var $1545 = self.value;
                    var $1546 = $1545;
                    var $1543 = $1546;
                    break;
            };
            var $1542 = $1543;
        } else {
            var $1547 = 35;
            var $1542 = $1547;
        };
        return $1542;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $1548 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $1549 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $1549;
        }));
        return $1548;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function Nat$show$(_n$1) {
        var $1550 = Nat$to_string_base$(10n, _n$1);
        return $1550;
    };
    const Nat$show = x0 => Nat$show$(x0);
    const Bool$not = a0 => (!a0);

    function Fm$color$(_col$1, _str$2) {
        var $1551 = String$cons$(27, String$cons$(91, (_col$1 + String$cons$(109, (_str$2 + String$cons$(27, String$cons$(91, String$cons$(48, String$cons$(109, String$nil)))))))));
        return $1551;
    };
    const Fm$color = x0 => x1 => Fm$color$(x0, x1);

    function Fm$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) {
        var Fm$highlight$tc$ = (_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) => ({
            ctr: 'TCO',
            arg: [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8]
        });
        var Fm$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => Fm$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8);
        var arg = [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8];
        while (true) {
            let [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8] = arg;
            var R = (() => {
                var self = _code$1;
                if (self.length === 0) {
                    var $1552 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                    return $1552;
                } else {
                    var $1553 = self.charCodeAt(0);
                    var $1554 = self.slice(1);
                    var self = ($1553 === 10);
                    if (self) {
                        var _stp$11 = Maybe$extract$(_lft$6, Bool$false, Nat$is_zero);
                        var self = _stp$11;
                        if (self) {
                            var $1557 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                            var $1556 = $1557;
                        } else {
                            var _spa$12 = 3n;
                            var _siz$13 = Nat$succ$(Nat$double$(_spa$12));
                            var self = _ix1$3;
                            if (self === 0n) {
                                var self = _lft$6;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $1560 = Maybe$some$(_spa$12);
                                        var $1559 = $1560;
                                        break;
                                    case 'Maybe.some':
                                        var $1561 = self.value;
                                        var $1562 = Maybe$some$(Nat$pred$($1561));
                                        var $1559 = $1562;
                                        break;
                                };
                                var _lft$14 = $1559;
                            } else {
                                var $1563 = (self - 1n);
                                var $1564 = _lft$6;
                                var _lft$14 = $1564;
                            };
                            var _ix0$15 = Nat$pred$(_ix0$2);
                            var _ix1$16 = Nat$pred$(_ix1$3);
                            var _col$17 = 0n;
                            var _row$18 = Nat$succ$(_row$5);
                            var _res$19 = List$take$(_siz$13, List$cons$(String$reverse$(_lin$7), _res$8));
                            var _lin$20 = String$reverse$(String$flatten$(List$cons$(String$pad_left$(4n, 32, Nat$show$(_row$18)), List$cons$(" | ", List$nil))));
                            var $1558 = Fm$highlight$tc$($1554, _ix0$15, _ix1$16, _col$17, _row$18, _lft$14, _lin$20, _res$19);
                            var $1556 = $1558;
                        };
                        var $1555 = $1556;
                    } else {
                        var _chr$11 = String$cons$($1553, String$nil);
                        var self = (Nat$is_zero$(_ix0$2) && (!Nat$is_zero$(_ix1$3)));
                        if (self) {
                            var $1566 = String$reverse$(Fm$color$("31", Fm$color$("4", _chr$11)));
                            var _chr$12 = $1566;
                        } else {
                            var $1567 = _chr$11;
                            var _chr$12 = $1567;
                        };
                        var _ix0$13 = Nat$pred$(_ix0$2);
                        var _ix1$14 = Nat$pred$(_ix1$3);
                        var _col$15 = Nat$succ$(_col$4);
                        var _lin$16 = String$flatten$(List$cons$(_chr$12, List$cons$(_lin$7, List$nil)));
                        var $1565 = Fm$highlight$tc$($1554, _ix0$13, _ix1$14, _col$15, _row$5, _lft$6, _lin$16, _res$8);
                        var $1555 = $1565;
                    };
                    return $1555;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$highlight$tc = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$highlight$tc$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$highlight$(_code$1, _idx0$2, _idx1$3) {
        var $1568 = Fm$highlight$tc$(_code$1, _idx0$2, _idx1$3, 0n, 1n, Maybe$none, String$reverse$("   1 | "), List$nil);
        return $1568;
    };
    const Fm$highlight = x0 => x1 => x2 => Fm$highlight$(x0, x1, x2);

    function Fm$Defs$read$(_file$1, _code$2, _defs$3) {
        var self = Fm$Parser$file$(_file$1, _code$2, _defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1570 = self.idx;
                var $1571 = self.code;
                var $1572 = self.err;
                var _err$7 = $1572;
                var _hig$8 = Fm$highlight$(_code$2, $1570, Nat$succ$($1570));
                var _str$9 = String$flatten$(List$cons$(_err$7, List$cons$("\u{a}", List$cons$(_hig$8, List$nil))));
                var $1573 = Either$left$(_str$9);
                var $1569 = $1573;
                break;
            case 'Parser.Reply.value':
                var $1574 = self.idx;
                var $1575 = self.code;
                var $1576 = self.val;
                var $1577 = Either$right$($1576);
                var $1569 = $1577;
                break;
        };
        return $1569;
    };
    const Fm$Defs$read = x0 => x1 => x2 => Fm$Defs$read$(x0, x1, x2);

    function Fm$Synth$load$(_name$1, _defs$2) {
        var _file$3 = Fm$Synth$file_of$(_name$1);
        var $1578 = Monad$bind$(IO$monad)(IO$get_file$(_file$3))((_code$4 => {
            var _read$5 = Fm$Defs$read$(_file$3, _code$4, _defs$2);
            var self = _read$5;
            switch (self._) {
                case 'Either.left':
                    var $1580 = self.value;
                    var $1581 = Monad$pure$(IO$monad)(Maybe$none);
                    var $1579 = $1581;
                    break;
                case 'Either.right':
                    var $1582 = self.value;
                    var _defs$7 = $1582;
                    var self = Fm$get$(_name$1, _defs$7);
                    switch (self._) {
                        case 'Maybe.none':
                            var $1584 = Monad$pure$(IO$monad)(Maybe$none);
                            var $1583 = $1584;
                            break;
                        case 'Maybe.some':
                            var $1585 = self.value;
                            var $1586 = Monad$pure$(IO$monad)(Maybe$some$(_defs$7));
                            var $1583 = $1586;
                            break;
                    };
                    var $1579 = $1583;
                    break;
            };
            return $1579;
        }));
        return $1578;
    };
    const Fm$Synth$load = x0 => x1 => Fm$Synth$load$(x0, x1);

    function IO$print$(_text$1) {
        var $1587 = IO$ask$("print", _text$1, (_skip$2 => {
            var $1588 = IO$end$(Unit$new);
            return $1588;
        }));
        return $1587;
    };
    const IO$print = x0 => IO$print$(x0);
    const Fm$Status$wait = ({
        _: 'Fm.Status.wait'
    });

    function Fm$Check$(_V$1) {
        var $1589 = null;
        return $1589;
    };
    const Fm$Check = x0 => Fm$Check$(x0);

    function Fm$Check$result$(_value$2, _errors$3) {
        var $1590 = ({
            _: 'Fm.Check.result',
            'value': _value$2,
            'errors': _errors$3
        });
        return $1590;
    };
    const Fm$Check$result = x0 => x1 => Fm$Check$result$(x0, x1);

    function Fm$Check$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'Fm.Check.result':
                var $1592 = self.value;
                var $1593 = self.errors;
                var self = $1592;
                switch (self._) {
                    case 'Maybe.none':
                        var $1595 = Fm$Check$result$(Maybe$none, $1593);
                        var $1594 = $1595;
                        break;
                    case 'Maybe.some':
                        var $1596 = self.value;
                        var self = _f$4($1596);
                        switch (self._) {
                            case 'Fm.Check.result':
                                var $1598 = self.value;
                                var $1599 = self.errors;
                                var $1600 = Fm$Check$result$($1598, List$concat$($1593, $1599));
                                var $1597 = $1600;
                                break;
                        };
                        var $1594 = $1597;
                        break;
                };
                var $1591 = $1594;
                break;
        };
        return $1591;
    };
    const Fm$Check$bind = x0 => x1 => Fm$Check$bind$(x0, x1);

    function Fm$Check$pure$(_value$2) {
        var $1601 = Fm$Check$result$(Maybe$some$(_value$2), List$nil);
        return $1601;
    };
    const Fm$Check$pure = x0 => Fm$Check$pure$(x0);
    const Fm$Check$monad = Monad$new$(Fm$Check$bind, Fm$Check$pure);

    function Fm$Error$undefined_reference$(_origin$1, _name$2) {
        var $1602 = ({
            _: 'Fm.Error.undefined_reference',
            'origin': _origin$1,
            'name': _name$2
        });
        return $1602;
    };
    const Fm$Error$undefined_reference = x0 => x1 => Fm$Error$undefined_reference$(x0, x1);

    function Fm$Error$waiting$(_name$1) {
        var $1603 = ({
            _: 'Fm.Error.waiting',
            'name': _name$1
        });
        return $1603;
    };
    const Fm$Error$waiting = x0 => Fm$Error$waiting$(x0);

    function Fm$Error$indirect$(_name$1) {
        var $1604 = ({
            _: 'Fm.Error.indirect',
            'name': _name$1
        });
        return $1604;
    };
    const Fm$Error$indirect = x0 => Fm$Error$indirect$(x0);

    function Maybe$mapped$(_m$2, _f$4) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1606 = Maybe$none;
                var $1605 = $1606;
                break;
            case 'Maybe.some':
                var $1607 = self.value;
                var $1608 = Maybe$some$(_f$4($1607));
                var $1605 = $1608;
                break;
        };
        return $1605;
    };
    const Maybe$mapped = x0 => x1 => Maybe$mapped$(x0, x1);

    function Fm$MPath$o$(_path$1) {
        var $1609 = Maybe$mapped$(_path$1, Fm$Path$o);
        return $1609;
    };
    const Fm$MPath$o = x0 => Fm$MPath$o$(x0);

    function Fm$MPath$i$(_path$1) {
        var $1610 = Maybe$mapped$(_path$1, Fm$Path$i);
        return $1610;
    };
    const Fm$MPath$i = x0 => Fm$MPath$i$(x0);

    function Fm$Error$cant_infer$(_origin$1, _term$2, _context$3) {
        var $1611 = ({
            _: 'Fm.Error.cant_infer',
            'origin': _origin$1,
            'term': _term$2,
            'context': _context$3
        });
        return $1611;
    };
    const Fm$Error$cant_infer = x0 => x1 => x2 => Fm$Error$cant_infer$(x0, x1, x2);

    function Fm$Error$type_mismatch$(_origin$1, _expected$2, _detected$3, _context$4) {
        var $1612 = ({
            _: 'Fm.Error.type_mismatch',
            'origin': _origin$1,
            'expected': _expected$2,
            'detected': _detected$3,
            'context': _context$4
        });
        return $1612;
    };
    const Fm$Error$type_mismatch = x0 => x1 => x2 => x3 => Fm$Error$type_mismatch$(x0, x1, x2, x3);

    function Fm$Error$show_goal$(_name$1, _dref$2, _verb$3, _goal$4, _context$5) {
        var $1613 = ({
            _: 'Fm.Error.show_goal',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3,
            'goal': _goal$4,
            'context': _context$5
        });
        return $1613;
    };
    const Fm$Error$show_goal = x0 => x1 => x2 => x3 => x4 => Fm$Error$show_goal$(x0, x1, x2, x3, x4);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1615 = List$nil;
                var $1614 = $1615;
                break;
            case 'List.cons':
                var $1616 = self.head;
                var $1617 = self.tail;
                var $1618 = $1617;
                var $1614 = $1618;
                break;
        };
        return $1614;
    };
    const List$tail = x0 => List$tail$(x0);

    function Fm$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4) {
        var Fm$SmartMotive$vals$cont$ = (_expr$1, _term$2, _args$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_expr$1, _term$2, _args$3, _defs$4]
        });
        var Fm$SmartMotive$vals$cont = _expr$1 => _term$2 => _args$3 => _defs$4 => Fm$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4);
        var arg = [_expr$1, _term$2, _args$3, _defs$4];
        while (true) {
            let [_expr$1, _term$2, _args$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $1619 = self.name;
                        var $1620 = self.indx;
                        var $1621 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1621;
                    case 'Fm.Term.ref':
                        var $1622 = self.name;
                        var $1623 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1623;
                    case 'Fm.Term.typ':
                        var $1624 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1624;
                    case 'Fm.Term.all':
                        var $1625 = self.eras;
                        var $1626 = self.self;
                        var $1627 = self.name;
                        var $1628 = self.xtyp;
                        var $1629 = self.body;
                        var $1630 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1630;
                    case 'Fm.Term.lam':
                        var $1631 = self.name;
                        var $1632 = self.body;
                        var $1633 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1633;
                    case 'Fm.Term.app':
                        var $1634 = self.func;
                        var $1635 = self.argm;
                        var $1636 = Fm$SmartMotive$vals$cont$(_expr$1, $1634, List$cons$($1635, _args$3), _defs$4);
                        return $1636;
                    case 'Fm.Term.let':
                        var $1637 = self.name;
                        var $1638 = self.expr;
                        var $1639 = self.body;
                        var $1640 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1640;
                    case 'Fm.Term.def':
                        var $1641 = self.name;
                        var $1642 = self.expr;
                        var $1643 = self.body;
                        var $1644 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1644;
                    case 'Fm.Term.ann':
                        var $1645 = self.done;
                        var $1646 = self.term;
                        var $1647 = self.type;
                        var $1648 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1648;
                    case 'Fm.Term.gol':
                        var $1649 = self.name;
                        var $1650 = self.dref;
                        var $1651 = self.verb;
                        var $1652 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1652;
                    case 'Fm.Term.hol':
                        var $1653 = self.path;
                        var $1654 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1654;
                    case 'Fm.Term.nat':
                        var $1655 = self.natx;
                        var $1656 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1656;
                    case 'Fm.Term.chr':
                        var $1657 = self.chrx;
                        var $1658 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1658;
                    case 'Fm.Term.str':
                        var $1659 = self.strx;
                        var $1660 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1660;
                    case 'Fm.Term.cse':
                        var $1661 = self.path;
                        var $1662 = self.expr;
                        var $1663 = self.name;
                        var $1664 = self.with;
                        var $1665 = self.cses;
                        var $1666 = self.moti;
                        var $1667 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1667;
                    case 'Fm.Term.ori':
                        var $1668 = self.orig;
                        var $1669 = self.expr;
                        var $1670 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1670;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$vals$cont = x0 => x1 => x2 => x3 => Fm$SmartMotive$vals$cont$(x0, x1, x2, x3);

    function Fm$SmartMotive$vals$(_expr$1, _type$2, _defs$3) {
        var Fm$SmartMotive$vals$ = (_expr$1, _type$2, _defs$3) => ({
            ctr: 'TCO',
            arg: [_expr$1, _type$2, _defs$3]
        });
        var Fm$SmartMotive$vals = _expr$1 => _type$2 => _defs$3 => Fm$SmartMotive$vals$(_expr$1, _type$2, _defs$3);
        var arg = [_expr$1, _type$2, _defs$3];
        while (true) {
            let [_expr$1, _type$2, _defs$3] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_type$2, _defs$3);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $1671 = self.name;
                        var $1672 = self.indx;
                        var $1673 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1673;
                    case 'Fm.Term.ref':
                        var $1674 = self.name;
                        var $1675 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1675;
                    case 'Fm.Term.typ':
                        var $1676 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1676;
                    case 'Fm.Term.all':
                        var $1677 = self.eras;
                        var $1678 = self.self;
                        var $1679 = self.name;
                        var $1680 = self.xtyp;
                        var $1681 = self.body;
                        var $1682 = Fm$SmartMotive$vals$(_expr$1, $1681(Fm$Term$typ)(Fm$Term$typ), _defs$3);
                        return $1682;
                    case 'Fm.Term.lam':
                        var $1683 = self.name;
                        var $1684 = self.body;
                        var $1685 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1685;
                    case 'Fm.Term.app':
                        var $1686 = self.func;
                        var $1687 = self.argm;
                        var $1688 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1688;
                    case 'Fm.Term.let':
                        var $1689 = self.name;
                        var $1690 = self.expr;
                        var $1691 = self.body;
                        var $1692 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1692;
                    case 'Fm.Term.def':
                        var $1693 = self.name;
                        var $1694 = self.expr;
                        var $1695 = self.body;
                        var $1696 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1696;
                    case 'Fm.Term.ann':
                        var $1697 = self.done;
                        var $1698 = self.term;
                        var $1699 = self.type;
                        var $1700 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1700;
                    case 'Fm.Term.gol':
                        var $1701 = self.name;
                        var $1702 = self.dref;
                        var $1703 = self.verb;
                        var $1704 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1704;
                    case 'Fm.Term.hol':
                        var $1705 = self.path;
                        var $1706 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1706;
                    case 'Fm.Term.nat':
                        var $1707 = self.natx;
                        var $1708 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1708;
                    case 'Fm.Term.chr':
                        var $1709 = self.chrx;
                        var $1710 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1710;
                    case 'Fm.Term.str':
                        var $1711 = self.strx;
                        var $1712 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1712;
                    case 'Fm.Term.cse':
                        var $1713 = self.path;
                        var $1714 = self.expr;
                        var $1715 = self.name;
                        var $1716 = self.with;
                        var $1717 = self.cses;
                        var $1718 = self.moti;
                        var $1719 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1719;
                    case 'Fm.Term.ori':
                        var $1720 = self.orig;
                        var $1721 = self.expr;
                        var $1722 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1722;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$vals = x0 => x1 => x2 => Fm$SmartMotive$vals$(x0, x1, x2);

    function Fm$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4) {
        var Fm$SmartMotive$nams$cont$ = (_name$1, _term$2, _binds$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _binds$3, _defs$4]
        });
        var Fm$SmartMotive$nams$cont = _name$1 => _term$2 => _binds$3 => _defs$4 => Fm$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4);
        var arg = [_name$1, _term$2, _binds$3, _defs$4];
        while (true) {
            let [_name$1, _term$2, _binds$3, _defs$4] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $1723 = self.name;
                        var $1724 = self.indx;
                        var $1725 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1725;
                    case 'Fm.Term.ref':
                        var $1726 = self.name;
                        var $1727 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1727;
                    case 'Fm.Term.typ':
                        var $1728 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1728;
                    case 'Fm.Term.all':
                        var $1729 = self.eras;
                        var $1730 = self.self;
                        var $1731 = self.name;
                        var $1732 = self.xtyp;
                        var $1733 = self.body;
                        var $1734 = Fm$SmartMotive$nams$cont$(_name$1, $1733(Fm$Term$ref$($1730))(Fm$Term$ref$($1731)), List$cons$(String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($1731, List$nil)))), _binds$3), _defs$4);
                        return $1734;
                    case 'Fm.Term.lam':
                        var $1735 = self.name;
                        var $1736 = self.body;
                        var $1737 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1737;
                    case 'Fm.Term.app':
                        var $1738 = self.func;
                        var $1739 = self.argm;
                        var $1740 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1740;
                    case 'Fm.Term.let':
                        var $1741 = self.name;
                        var $1742 = self.expr;
                        var $1743 = self.body;
                        var $1744 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1744;
                    case 'Fm.Term.def':
                        var $1745 = self.name;
                        var $1746 = self.expr;
                        var $1747 = self.body;
                        var $1748 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1748;
                    case 'Fm.Term.ann':
                        var $1749 = self.done;
                        var $1750 = self.term;
                        var $1751 = self.type;
                        var $1752 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1752;
                    case 'Fm.Term.gol':
                        var $1753 = self.name;
                        var $1754 = self.dref;
                        var $1755 = self.verb;
                        var $1756 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1756;
                    case 'Fm.Term.hol':
                        var $1757 = self.path;
                        var $1758 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1758;
                    case 'Fm.Term.nat':
                        var $1759 = self.natx;
                        var $1760 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1760;
                    case 'Fm.Term.chr':
                        var $1761 = self.chrx;
                        var $1762 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1762;
                    case 'Fm.Term.str':
                        var $1763 = self.strx;
                        var $1764 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1764;
                    case 'Fm.Term.cse':
                        var $1765 = self.path;
                        var $1766 = self.expr;
                        var $1767 = self.name;
                        var $1768 = self.with;
                        var $1769 = self.cses;
                        var $1770 = self.moti;
                        var $1771 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1771;
                    case 'Fm.Term.ori':
                        var $1772 = self.orig;
                        var $1773 = self.expr;
                        var $1774 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1774;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$SmartMotive$nams$cont = x0 => x1 => x2 => x3 => Fm$SmartMotive$nams$cont$(x0, x1, x2, x3);

    function Fm$SmartMotive$nams$(_name$1, _type$2, _defs$3) {
        var self = Fm$Term$reduce$(_type$2, _defs$3);
        switch (self._) {
            case 'Fm.Term.var':
                var $1776 = self.name;
                var $1777 = self.indx;
                var $1778 = List$nil;
                var $1775 = $1778;
                break;
            case 'Fm.Term.ref':
                var $1779 = self.name;
                var $1780 = List$nil;
                var $1775 = $1780;
                break;
            case 'Fm.Term.typ':
                var $1781 = List$nil;
                var $1775 = $1781;
                break;
            case 'Fm.Term.all':
                var $1782 = self.eras;
                var $1783 = self.self;
                var $1784 = self.name;
                var $1785 = self.xtyp;
                var $1786 = self.body;
                var $1787 = Fm$SmartMotive$nams$cont$(_name$1, $1785, List$nil, _defs$3);
                var $1775 = $1787;
                break;
            case 'Fm.Term.lam':
                var $1788 = self.name;
                var $1789 = self.body;
                var $1790 = List$nil;
                var $1775 = $1790;
                break;
            case 'Fm.Term.app':
                var $1791 = self.func;
                var $1792 = self.argm;
                var $1793 = List$nil;
                var $1775 = $1793;
                break;
            case 'Fm.Term.let':
                var $1794 = self.name;
                var $1795 = self.expr;
                var $1796 = self.body;
                var $1797 = List$nil;
                var $1775 = $1797;
                break;
            case 'Fm.Term.def':
                var $1798 = self.name;
                var $1799 = self.expr;
                var $1800 = self.body;
                var $1801 = List$nil;
                var $1775 = $1801;
                break;
            case 'Fm.Term.ann':
                var $1802 = self.done;
                var $1803 = self.term;
                var $1804 = self.type;
                var $1805 = List$nil;
                var $1775 = $1805;
                break;
            case 'Fm.Term.gol':
                var $1806 = self.name;
                var $1807 = self.dref;
                var $1808 = self.verb;
                var $1809 = List$nil;
                var $1775 = $1809;
                break;
            case 'Fm.Term.hol':
                var $1810 = self.path;
                var $1811 = List$nil;
                var $1775 = $1811;
                break;
            case 'Fm.Term.nat':
                var $1812 = self.natx;
                var $1813 = List$nil;
                var $1775 = $1813;
                break;
            case 'Fm.Term.chr':
                var $1814 = self.chrx;
                var $1815 = List$nil;
                var $1775 = $1815;
                break;
            case 'Fm.Term.str':
                var $1816 = self.strx;
                var $1817 = List$nil;
                var $1775 = $1817;
                break;
            case 'Fm.Term.cse':
                var $1818 = self.path;
                var $1819 = self.expr;
                var $1820 = self.name;
                var $1821 = self.with;
                var $1822 = self.cses;
                var $1823 = self.moti;
                var $1824 = List$nil;
                var $1775 = $1824;
                break;
            case 'Fm.Term.ori':
                var $1825 = self.orig;
                var $1826 = self.expr;
                var $1827 = List$nil;
                var $1775 = $1827;
                break;
        };
        return $1775;
    };
    const Fm$SmartMotive$nams = x0 => x1 => x2 => Fm$SmartMotive$nams$(x0, x1, x2);

    function List$zip$(_as$3, _bs$4) {
        var self = _as$3;
        switch (self._) {
            case 'List.nil':
                var $1829 = List$nil;
                var $1828 = $1829;
                break;
            case 'List.cons':
                var $1830 = self.head;
                var $1831 = self.tail;
                var self = _bs$4;
                switch (self._) {
                    case 'List.nil':
                        var $1833 = List$nil;
                        var $1832 = $1833;
                        break;
                    case 'List.cons':
                        var $1834 = self.head;
                        var $1835 = self.tail;
                        var $1836 = List$cons$(Pair$new$($1830, $1834), List$zip$($1831, $1835));
                        var $1832 = $1836;
                        break;
                };
                var $1828 = $1832;
                break;
        };
        return $1828;
    };
    const List$zip = x0 => x1 => List$zip$(x0, x1);

    function Cmp$as_gte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $1838 = Bool$false;
                var $1837 = $1838;
                break;
            case 'Cmp.eql':
                var $1839 = Bool$true;
                var $1837 = $1839;
                break;
            case 'Cmp.gtn':
                var $1840 = Bool$true;
                var $1837 = $1840;
                break;
        };
        return $1837;
    };
    const Cmp$as_gte = x0 => Cmp$as_gte$(x0);
    const Nat$gte = a0 => a1 => (a0 >= a1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function Fm$Term$serialize$name$(_name$1) {
        var $1841 = (fm_name_to_bits(_name$1));
        return $1841;
    };
    const Fm$Term$serialize$name = x0 => Fm$Term$serialize$name$(x0);

    function Fm$Term$serialize$(_term$1, _depth$2, _init$3, _x$4) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1843 = self.name;
                var $1844 = self.indx;
                var self = ($1844 >= _init$3);
                if (self) {
                    var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred$((_depth$2 - $1844 <= 0n ? 0n : _depth$2 - $1844)))));
                    var $1846 = (((_name$7(_x$4) + '1') + '0') + '0');
                    var $1845 = $1846;
                } else {
                    var _name$7 = a1 => (a1 + (nat_to_bits($1844)));
                    var $1847 = (((_name$7(_x$4) + '0') + '1') + '0');
                    var $1845 = $1847;
                };
                var $1842 = $1845;
                break;
            case 'Fm.Term.ref':
                var $1848 = self.name;
                var _name$6 = a1 => (a1 + Fm$Term$serialize$name$($1848));
                var $1849 = (((_name$6(_x$4) + '0') + '0') + '0');
                var $1842 = $1849;
                break;
            case 'Fm.Term.typ':
                var $1850 = (((_x$4 + '1') + '1') + '0');
                var $1842 = $1850;
                break;
            case 'Fm.Term.all':
                var $1851 = self.eras;
                var $1852 = self.self;
                var $1853 = self.name;
                var $1854 = self.xtyp;
                var $1855 = self.body;
                var self = $1851;
                if (self) {
                    var $1857 = Bits$i;
                    var _eras$10 = $1857;
                } else {
                    var $1858 = Bits$o;
                    var _eras$10 = $1858;
                };
                var _self$11 = a1 => (a1 + (fm_name_to_bits($1852)));
                var _xtyp$12 = Fm$Term$serialize($1854)(_depth$2)(_init$3);
                var _body$13 = Fm$Term$serialize($1855(Fm$Term$var$($1852, _depth$2))(Fm$Term$var$($1853, Nat$succ$(_depth$2))))(Nat$succ$(Nat$succ$(_depth$2)))(_init$3);
                var $1856 = (((_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))) + '0') + '0') + '1');
                var $1842 = $1856;
                break;
            case 'Fm.Term.lam':
                var $1859 = self.name;
                var $1860 = self.body;
                var _body$7 = Fm$Term$serialize($1860(Fm$Term$var$($1859, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $1861 = (((_body$7(_x$4) + '1') + '0') + '1');
                var $1842 = $1861;
                break;
            case 'Fm.Term.app':
                var $1862 = self.func;
                var $1863 = self.argm;
                var _func$7 = Fm$Term$serialize($1862)(_depth$2)(_init$3);
                var _argm$8 = Fm$Term$serialize($1863)(_depth$2)(_init$3);
                var $1864 = (((_func$7(_argm$8(_x$4)) + '0') + '1') + '1');
                var $1842 = $1864;
                break;
            case 'Fm.Term.let':
                var $1865 = self.name;
                var $1866 = self.expr;
                var $1867 = self.body;
                var _expr$8 = Fm$Term$serialize($1866)(_depth$2)(_init$3);
                var _body$9 = Fm$Term$serialize($1867(Fm$Term$var$($1865, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $1868 = (((_expr$8(_body$9(_x$4)) + '1') + '1') + '1');
                var $1842 = $1868;
                break;
            case 'Fm.Term.def':
                var $1869 = self.name;
                var $1870 = self.expr;
                var $1871 = self.body;
                var $1872 = Fm$Term$serialize$($1871($1870), _depth$2, _init$3, _x$4);
                var $1842 = $1872;
                break;
            case 'Fm.Term.ann':
                var $1873 = self.done;
                var $1874 = self.term;
                var $1875 = self.type;
                var $1876 = Fm$Term$serialize$($1874, _depth$2, _init$3, _x$4);
                var $1842 = $1876;
                break;
            case 'Fm.Term.gol':
                var $1877 = self.name;
                var $1878 = self.dref;
                var $1879 = self.verb;
                var _name$8 = a1 => (a1 + (fm_name_to_bits($1877)));
                var $1880 = (((_name$8(_x$4) + '0') + '0') + '0');
                var $1842 = $1880;
                break;
            case 'Fm.Term.hol':
                var $1881 = self.path;
                var $1882 = _x$4;
                var $1842 = $1882;
                break;
            case 'Fm.Term.nat':
                var $1883 = self.natx;
                var $1884 = Fm$Term$serialize$(Fm$Term$unroll_nat$($1883), _depth$2, _init$3, _x$4);
                var $1842 = $1884;
                break;
            case 'Fm.Term.chr':
                var $1885 = self.chrx;
                var $1886 = Fm$Term$serialize$(Fm$Term$unroll_chr$($1885), _depth$2, _init$3, _x$4);
                var $1842 = $1886;
                break;
            case 'Fm.Term.str':
                var $1887 = self.strx;
                var $1888 = Fm$Term$serialize$(Fm$Term$unroll_str$($1887), _depth$2, _init$3, _x$4);
                var $1842 = $1888;
                break;
            case 'Fm.Term.cse':
                var $1889 = self.path;
                var $1890 = self.expr;
                var $1891 = self.name;
                var $1892 = self.with;
                var $1893 = self.cses;
                var $1894 = self.moti;
                var $1895 = _x$4;
                var $1842 = $1895;
                break;
            case 'Fm.Term.ori':
                var $1896 = self.orig;
                var $1897 = self.expr;
                var $1898 = Fm$Term$serialize$($1897, _depth$2, _init$3, _x$4);
                var $1842 = $1898;
                break;
        };
        return $1842;
    };
    const Fm$Term$serialize = x0 => x1 => x2 => x3 => Fm$Term$serialize$(x0, x1, x2, x3);
    const Bits$eql = a0 => a1 => (a1 === a0);

    function Fm$Term$identical$(_a$1, _b$2, _lv$3) {
        var _ah$4 = Fm$Term$serialize$(_a$1, _lv$3, _lv$3, Bits$e);
        var _bh$5 = Fm$Term$serialize$(_b$2, _lv$3, _lv$3, Bits$e);
        var $1899 = (_bh$5 === _ah$4);
        return $1899;
    };
    const Fm$Term$identical = x0 => x1 => x2 => Fm$Term$identical$(x0, x1, x2);

    function Fm$SmartMotive$replace$(_term$1, _from$2, _to$3, _lv$4) {
        var self = Fm$Term$identical$(_term$1, _from$2, _lv$4);
        if (self) {
            var $1901 = _to$3;
            var $1900 = $1901;
        } else {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $1903 = self.name;
                    var $1904 = self.indx;
                    var $1905 = Fm$Term$var$($1903, $1904);
                    var $1902 = $1905;
                    break;
                case 'Fm.Term.ref':
                    var $1906 = self.name;
                    var $1907 = Fm$Term$ref$($1906);
                    var $1902 = $1907;
                    break;
                case 'Fm.Term.typ':
                    var $1908 = Fm$Term$typ;
                    var $1902 = $1908;
                    break;
                case 'Fm.Term.all':
                    var $1909 = self.eras;
                    var $1910 = self.self;
                    var $1911 = self.name;
                    var $1912 = self.xtyp;
                    var $1913 = self.body;
                    var _xtyp$10 = Fm$SmartMotive$replace$($1912, _from$2, _to$3, _lv$4);
                    var _body$11 = $1913(Fm$Term$ref$($1910))(Fm$Term$ref$($1911));
                    var _body$12 = Fm$SmartMotive$replace$(_body$11, _from$2, _to$3, Nat$succ$(Nat$succ$(_lv$4)));
                    var $1914 = Fm$Term$all$($1909, $1910, $1911, _xtyp$10, (_s$13 => _x$14 => {
                        var $1915 = _body$12;
                        return $1915;
                    }));
                    var $1902 = $1914;
                    break;
                case 'Fm.Term.lam':
                    var $1916 = self.name;
                    var $1917 = self.body;
                    var _body$7 = $1917(Fm$Term$ref$($1916));
                    var _body$8 = Fm$SmartMotive$replace$(_body$7, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1918 = Fm$Term$lam$($1916, (_x$9 => {
                        var $1919 = _body$8;
                        return $1919;
                    }));
                    var $1902 = $1918;
                    break;
                case 'Fm.Term.app':
                    var $1920 = self.func;
                    var $1921 = self.argm;
                    var _func$7 = Fm$SmartMotive$replace$($1920, _from$2, _to$3, _lv$4);
                    var _argm$8 = Fm$SmartMotive$replace$($1921, _from$2, _to$3, _lv$4);
                    var $1922 = Fm$Term$app$(_func$7, _argm$8);
                    var $1902 = $1922;
                    break;
                case 'Fm.Term.let':
                    var $1923 = self.name;
                    var $1924 = self.expr;
                    var $1925 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($1924, _from$2, _to$3, _lv$4);
                    var _body$9 = $1925(Fm$Term$ref$($1923));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1926 = Fm$Term$let$($1923, _expr$8, (_x$11 => {
                        var $1927 = _body$10;
                        return $1927;
                    }));
                    var $1902 = $1926;
                    break;
                case 'Fm.Term.def':
                    var $1928 = self.name;
                    var $1929 = self.expr;
                    var $1930 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($1929, _from$2, _to$3, _lv$4);
                    var _body$9 = $1930(Fm$Term$ref$($1928));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1931 = Fm$Term$def$($1928, _expr$8, (_x$11 => {
                        var $1932 = _body$10;
                        return $1932;
                    }));
                    var $1902 = $1931;
                    break;
                case 'Fm.Term.ann':
                    var $1933 = self.done;
                    var $1934 = self.term;
                    var $1935 = self.type;
                    var _term$8 = Fm$SmartMotive$replace$($1934, _from$2, _to$3, _lv$4);
                    var _type$9 = Fm$SmartMotive$replace$($1935, _from$2, _to$3, _lv$4);
                    var $1936 = Fm$Term$ann$($1933, _term$8, _type$9);
                    var $1902 = $1936;
                    break;
                case 'Fm.Term.gol':
                    var $1937 = self.name;
                    var $1938 = self.dref;
                    var $1939 = self.verb;
                    var $1940 = _term$1;
                    var $1902 = $1940;
                    break;
                case 'Fm.Term.hol':
                    var $1941 = self.path;
                    var $1942 = _term$1;
                    var $1902 = $1942;
                    break;
                case 'Fm.Term.nat':
                    var $1943 = self.natx;
                    var $1944 = _term$1;
                    var $1902 = $1944;
                    break;
                case 'Fm.Term.chr':
                    var $1945 = self.chrx;
                    var $1946 = _term$1;
                    var $1902 = $1946;
                    break;
                case 'Fm.Term.str':
                    var $1947 = self.strx;
                    var $1948 = _term$1;
                    var $1902 = $1948;
                    break;
                case 'Fm.Term.cse':
                    var $1949 = self.path;
                    var $1950 = self.expr;
                    var $1951 = self.name;
                    var $1952 = self.with;
                    var $1953 = self.cses;
                    var $1954 = self.moti;
                    var $1955 = _term$1;
                    var $1902 = $1955;
                    break;
                case 'Fm.Term.ori':
                    var $1956 = self.orig;
                    var $1957 = self.expr;
                    var $1958 = Fm$SmartMotive$replace$($1957, _from$2, _to$3, _lv$4);
                    var $1902 = $1958;
                    break;
            };
            var $1900 = $1902;
        };
        return $1900;
    };
    const Fm$SmartMotive$replace = x0 => x1 => x2 => x3 => Fm$SmartMotive$replace$(x0, x1, x2, x3);

    function Fm$SmartMotive$make$(_name$1, _expr$2, _type$3, _moti$4, _lv$5, _defs$6) {
        var _vals$7 = Fm$SmartMotive$vals$(_expr$2, _type$3, _defs$6);
        var _nams$8 = Fm$SmartMotive$nams$(_name$1, _type$3, _defs$6);
        var _subs$9 = List$zip$(_nams$8, _vals$7);
        var _moti$10 = List$fold$(_subs$9, _moti$4, (_sub$10 => _moti$11 => {
            var self = _sub$10;
            switch (self._) {
                case 'Pair.new':
                    var $1961 = self.fst;
                    var $1962 = self.snd;
                    var $1963 = Fm$SmartMotive$replace$(_moti$11, $1962, Fm$Term$ref$($1961), _lv$5);
                    var $1960 = $1963;
                    break;
            };
            return $1960;
        }));
        var $1959 = _moti$10;
        return $1959;
    };
    const Fm$SmartMotive$make = x0 => x1 => x2 => x3 => x4 => x5 => Fm$SmartMotive$make$(x0, x1, x2, x3, x4, x5);

    function Fm$Term$desugar_cse$motive$(_wyth$1, _moti$2) {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                var $1965 = _moti$2;
                var $1964 = $1965;
                break;
            case 'List.cons':
                var $1966 = self.head;
                var $1967 = self.tail;
                var self = $1966;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $1969 = self.file;
                        var $1970 = self.code;
                        var $1971 = self.name;
                        var $1972 = self.term;
                        var $1973 = self.type;
                        var $1974 = self.stat;
                        var $1975 = Fm$Term$all$(Bool$false, "", $1971, $1973, (_s$11 => _x$12 => {
                            var $1976 = Fm$Term$desugar_cse$motive$($1967, _moti$2);
                            return $1976;
                        }));
                        var $1968 = $1975;
                        break;
                };
                var $1964 = $1968;
                break;
        };
        return $1964;
    };
    const Fm$Term$desugar_cse$motive = x0 => x1 => Fm$Term$desugar_cse$motive$(x0, x1);

    function String$is_empty$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $1978 = Bool$true;
            var $1977 = $1978;
        } else {
            var $1979 = self.charCodeAt(0);
            var $1980 = self.slice(1);
            var $1981 = Bool$false;
            var $1977 = $1981;
        };
        return $1977;
    };
    const String$is_empty = x0 => String$is_empty$(x0);

    function Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, _type$3, _body$4, _defs$5) {
        var self = Fm$Term$reduce$(_type$3, _defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $1983 = self.name;
                var $1984 = self.indx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $1986 = _body$4;
                        var $1985 = $1986;
                        break;
                    case 'List.cons':
                        var $1987 = self.head;
                        var $1988 = self.tail;
                        var self = $1987;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $1990 = self.file;
                                var $1991 = self.code;
                                var $1992 = self.name;
                                var $1993 = self.term;
                                var $1994 = self.type;
                                var $1995 = self.stat;
                                var $1996 = Fm$Term$lam$($1992, (_x$16 => {
                                    var $1997 = Fm$Term$desugar_cse$argument$(_name$1, $1988, _type$3, _body$4, _defs$5);
                                    return $1997;
                                }));
                                var $1989 = $1996;
                                break;
                        };
                        var $1985 = $1989;
                        break;
                };
                var $1982 = $1985;
                break;
            case 'Fm.Term.ref':
                var $1998 = self.name;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2000 = _body$4;
                        var $1999 = $2000;
                        break;
                    case 'List.cons':
                        var $2001 = self.head;
                        var $2002 = self.tail;
                        var self = $2001;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2004 = self.file;
                                var $2005 = self.code;
                                var $2006 = self.name;
                                var $2007 = self.term;
                                var $2008 = self.type;
                                var $2009 = self.stat;
                                var $2010 = Fm$Term$lam$($2006, (_x$15 => {
                                    var $2011 = Fm$Term$desugar_cse$argument$(_name$1, $2002, _type$3, _body$4, _defs$5);
                                    return $2011;
                                }));
                                var $2003 = $2010;
                                break;
                        };
                        var $1999 = $2003;
                        break;
                };
                var $1982 = $1999;
                break;
            case 'Fm.Term.typ':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2013 = _body$4;
                        var $2012 = $2013;
                        break;
                    case 'List.cons':
                        var $2014 = self.head;
                        var $2015 = self.tail;
                        var self = $2014;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2017 = self.file;
                                var $2018 = self.code;
                                var $2019 = self.name;
                                var $2020 = self.term;
                                var $2021 = self.type;
                                var $2022 = self.stat;
                                var $2023 = Fm$Term$lam$($2019, (_x$14 => {
                                    var $2024 = Fm$Term$desugar_cse$argument$(_name$1, $2015, _type$3, _body$4, _defs$5);
                                    return $2024;
                                }));
                                var $2016 = $2023;
                                break;
                        };
                        var $2012 = $2016;
                        break;
                };
                var $1982 = $2012;
                break;
            case 'Fm.Term.all':
                var $2025 = self.eras;
                var $2026 = self.self;
                var $2027 = self.name;
                var $2028 = self.xtyp;
                var $2029 = self.body;
                var $2030 = Fm$Term$lam$((() => {
                    var self = String$is_empty$($2027);
                    if (self) {
                        var $2031 = _name$1;
                        return $2031;
                    } else {
                        var $2032 = String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($2027, List$nil))));
                        return $2032;
                    };
                })(), (_x$11 => {
                    var $2033 = Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, $2029(Fm$Term$var$($2026, 0n))(Fm$Term$var$($2027, 0n)), _body$4, _defs$5);
                    return $2033;
                }));
                var $1982 = $2030;
                break;
            case 'Fm.Term.lam':
                var $2034 = self.name;
                var $2035 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2037 = _body$4;
                        var $2036 = $2037;
                        break;
                    case 'List.cons':
                        var $2038 = self.head;
                        var $2039 = self.tail;
                        var self = $2038;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2041 = self.file;
                                var $2042 = self.code;
                                var $2043 = self.name;
                                var $2044 = self.term;
                                var $2045 = self.type;
                                var $2046 = self.stat;
                                var $2047 = Fm$Term$lam$($2043, (_x$16 => {
                                    var $2048 = Fm$Term$desugar_cse$argument$(_name$1, $2039, _type$3, _body$4, _defs$5);
                                    return $2048;
                                }));
                                var $2040 = $2047;
                                break;
                        };
                        var $2036 = $2040;
                        break;
                };
                var $1982 = $2036;
                break;
            case 'Fm.Term.app':
                var $2049 = self.func;
                var $2050 = self.argm;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2052 = _body$4;
                        var $2051 = $2052;
                        break;
                    case 'List.cons':
                        var $2053 = self.head;
                        var $2054 = self.tail;
                        var self = $2053;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2056 = self.file;
                                var $2057 = self.code;
                                var $2058 = self.name;
                                var $2059 = self.term;
                                var $2060 = self.type;
                                var $2061 = self.stat;
                                var $2062 = Fm$Term$lam$($2058, (_x$16 => {
                                    var $2063 = Fm$Term$desugar_cse$argument$(_name$1, $2054, _type$3, _body$4, _defs$5);
                                    return $2063;
                                }));
                                var $2055 = $2062;
                                break;
                        };
                        var $2051 = $2055;
                        break;
                };
                var $1982 = $2051;
                break;
            case 'Fm.Term.let':
                var $2064 = self.name;
                var $2065 = self.expr;
                var $2066 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2068 = _body$4;
                        var $2067 = $2068;
                        break;
                    case 'List.cons':
                        var $2069 = self.head;
                        var $2070 = self.tail;
                        var self = $2069;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2072 = self.file;
                                var $2073 = self.code;
                                var $2074 = self.name;
                                var $2075 = self.term;
                                var $2076 = self.type;
                                var $2077 = self.stat;
                                var $2078 = Fm$Term$lam$($2074, (_x$17 => {
                                    var $2079 = Fm$Term$desugar_cse$argument$(_name$1, $2070, _type$3, _body$4, _defs$5);
                                    return $2079;
                                }));
                                var $2071 = $2078;
                                break;
                        };
                        var $2067 = $2071;
                        break;
                };
                var $1982 = $2067;
                break;
            case 'Fm.Term.def':
                var $2080 = self.name;
                var $2081 = self.expr;
                var $2082 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2084 = _body$4;
                        var $2083 = $2084;
                        break;
                    case 'List.cons':
                        var $2085 = self.head;
                        var $2086 = self.tail;
                        var self = $2085;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2088 = self.file;
                                var $2089 = self.code;
                                var $2090 = self.name;
                                var $2091 = self.term;
                                var $2092 = self.type;
                                var $2093 = self.stat;
                                var $2094 = Fm$Term$lam$($2090, (_x$17 => {
                                    var $2095 = Fm$Term$desugar_cse$argument$(_name$1, $2086, _type$3, _body$4, _defs$5);
                                    return $2095;
                                }));
                                var $2087 = $2094;
                                break;
                        };
                        var $2083 = $2087;
                        break;
                };
                var $1982 = $2083;
                break;
            case 'Fm.Term.ann':
                var $2096 = self.done;
                var $2097 = self.term;
                var $2098 = self.type;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2100 = _body$4;
                        var $2099 = $2100;
                        break;
                    case 'List.cons':
                        var $2101 = self.head;
                        var $2102 = self.tail;
                        var self = $2101;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2104 = self.file;
                                var $2105 = self.code;
                                var $2106 = self.name;
                                var $2107 = self.term;
                                var $2108 = self.type;
                                var $2109 = self.stat;
                                var $2110 = Fm$Term$lam$($2106, (_x$17 => {
                                    var $2111 = Fm$Term$desugar_cse$argument$(_name$1, $2102, _type$3, _body$4, _defs$5);
                                    return $2111;
                                }));
                                var $2103 = $2110;
                                break;
                        };
                        var $2099 = $2103;
                        break;
                };
                var $1982 = $2099;
                break;
            case 'Fm.Term.gol':
                var $2112 = self.name;
                var $2113 = self.dref;
                var $2114 = self.verb;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2116 = _body$4;
                        var $2115 = $2116;
                        break;
                    case 'List.cons':
                        var $2117 = self.head;
                        var $2118 = self.tail;
                        var self = $2117;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2120 = self.file;
                                var $2121 = self.code;
                                var $2122 = self.name;
                                var $2123 = self.term;
                                var $2124 = self.type;
                                var $2125 = self.stat;
                                var $2126 = Fm$Term$lam$($2122, (_x$17 => {
                                    var $2127 = Fm$Term$desugar_cse$argument$(_name$1, $2118, _type$3, _body$4, _defs$5);
                                    return $2127;
                                }));
                                var $2119 = $2126;
                                break;
                        };
                        var $2115 = $2119;
                        break;
                };
                var $1982 = $2115;
                break;
            case 'Fm.Term.hol':
                var $2128 = self.path;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2130 = _body$4;
                        var $2129 = $2130;
                        break;
                    case 'List.cons':
                        var $2131 = self.head;
                        var $2132 = self.tail;
                        var self = $2131;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2134 = self.file;
                                var $2135 = self.code;
                                var $2136 = self.name;
                                var $2137 = self.term;
                                var $2138 = self.type;
                                var $2139 = self.stat;
                                var $2140 = Fm$Term$lam$($2136, (_x$15 => {
                                    var $2141 = Fm$Term$desugar_cse$argument$(_name$1, $2132, _type$3, _body$4, _defs$5);
                                    return $2141;
                                }));
                                var $2133 = $2140;
                                break;
                        };
                        var $2129 = $2133;
                        break;
                };
                var $1982 = $2129;
                break;
            case 'Fm.Term.nat':
                var $2142 = self.natx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2144 = _body$4;
                        var $2143 = $2144;
                        break;
                    case 'List.cons':
                        var $2145 = self.head;
                        var $2146 = self.tail;
                        var self = $2145;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2148 = self.file;
                                var $2149 = self.code;
                                var $2150 = self.name;
                                var $2151 = self.term;
                                var $2152 = self.type;
                                var $2153 = self.stat;
                                var $2154 = Fm$Term$lam$($2150, (_x$15 => {
                                    var $2155 = Fm$Term$desugar_cse$argument$(_name$1, $2146, _type$3, _body$4, _defs$5);
                                    return $2155;
                                }));
                                var $2147 = $2154;
                                break;
                        };
                        var $2143 = $2147;
                        break;
                };
                var $1982 = $2143;
                break;
            case 'Fm.Term.chr':
                var $2156 = self.chrx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2158 = _body$4;
                        var $2157 = $2158;
                        break;
                    case 'List.cons':
                        var $2159 = self.head;
                        var $2160 = self.tail;
                        var self = $2159;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2162 = self.file;
                                var $2163 = self.code;
                                var $2164 = self.name;
                                var $2165 = self.term;
                                var $2166 = self.type;
                                var $2167 = self.stat;
                                var $2168 = Fm$Term$lam$($2164, (_x$15 => {
                                    var $2169 = Fm$Term$desugar_cse$argument$(_name$1, $2160, _type$3, _body$4, _defs$5);
                                    return $2169;
                                }));
                                var $2161 = $2168;
                                break;
                        };
                        var $2157 = $2161;
                        break;
                };
                var $1982 = $2157;
                break;
            case 'Fm.Term.str':
                var $2170 = self.strx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2172 = _body$4;
                        var $2171 = $2172;
                        break;
                    case 'List.cons':
                        var $2173 = self.head;
                        var $2174 = self.tail;
                        var self = $2173;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2176 = self.file;
                                var $2177 = self.code;
                                var $2178 = self.name;
                                var $2179 = self.term;
                                var $2180 = self.type;
                                var $2181 = self.stat;
                                var $2182 = Fm$Term$lam$($2178, (_x$15 => {
                                    var $2183 = Fm$Term$desugar_cse$argument$(_name$1, $2174, _type$3, _body$4, _defs$5);
                                    return $2183;
                                }));
                                var $2175 = $2182;
                                break;
                        };
                        var $2171 = $2175;
                        break;
                };
                var $1982 = $2171;
                break;
            case 'Fm.Term.cse':
                var $2184 = self.path;
                var $2185 = self.expr;
                var $2186 = self.name;
                var $2187 = self.with;
                var $2188 = self.cses;
                var $2189 = self.moti;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2191 = _body$4;
                        var $2190 = $2191;
                        break;
                    case 'List.cons':
                        var $2192 = self.head;
                        var $2193 = self.tail;
                        var self = $2192;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2195 = self.file;
                                var $2196 = self.code;
                                var $2197 = self.name;
                                var $2198 = self.term;
                                var $2199 = self.type;
                                var $2200 = self.stat;
                                var $2201 = Fm$Term$lam$($2197, (_x$20 => {
                                    var $2202 = Fm$Term$desugar_cse$argument$(_name$1, $2193, _type$3, _body$4, _defs$5);
                                    return $2202;
                                }));
                                var $2194 = $2201;
                                break;
                        };
                        var $2190 = $2194;
                        break;
                };
                var $1982 = $2190;
                break;
            case 'Fm.Term.ori':
                var $2203 = self.orig;
                var $2204 = self.expr;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2206 = _body$4;
                        var $2205 = $2206;
                        break;
                    case 'List.cons':
                        var $2207 = self.head;
                        var $2208 = self.tail;
                        var self = $2207;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2210 = self.file;
                                var $2211 = self.code;
                                var $2212 = self.name;
                                var $2213 = self.term;
                                var $2214 = self.type;
                                var $2215 = self.stat;
                                var $2216 = Fm$Term$lam$($2212, (_x$16 => {
                                    var $2217 = Fm$Term$desugar_cse$argument$(_name$1, $2208, _type$3, _body$4, _defs$5);
                                    return $2217;
                                }));
                                var $2209 = $2216;
                                break;
                        };
                        var $2205 = $2209;
                        break;
                };
                var $1982 = $2205;
                break;
        };
        return $1982;
    };
    const Fm$Term$desugar_cse$argument = x0 => x1 => x2 => x3 => x4 => Fm$Term$desugar_cse$argument$(x0, x1, x2, x3, x4);

    function Maybe$or$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.none':
                var $2219 = _b$3;
                var $2218 = $2219;
                break;
            case 'Maybe.some':
                var $2220 = self.value;
                var $2221 = Maybe$some$($2220);
                var $2218 = $2221;
                break;
        };
        return $2218;
    };
    const Maybe$or = x0 => x1 => Maybe$or$(x0, x1);

    function Fm$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) {
        var Fm$Term$desugar_cse$cases$ = (_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) => ({
            ctr: 'TCO',
            arg: [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7]
        });
        var Fm$Term$desugar_cse$cases = _expr$1 => _name$2 => _wyth$3 => _cses$4 => _type$5 => _defs$6 => _ctxt$7 => Fm$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7);
        var arg = [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7];
        while (true) {
            let [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7] = arg;
            var R = (() => {
                var self = Fm$Term$reduce$(_type$5, _defs$6);
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2222 = self.name;
                        var $2223 = self.indx;
                        var _expr$10 = (() => {
                            var $2226 = _expr$1;
                            var $2227 = _wyth$3;
                            let _expr$11 = $2226;
                            let _defn$10;
                            while ($2227._ === 'List.cons') {
                                _defn$10 = $2227.head;
                                var $2226 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2228 = self.file;
                                            var $2229 = self.code;
                                            var $2230 = self.name;
                                            var $2231 = self.term;
                                            var $2232 = self.type;
                                            var $2233 = self.stat;
                                            var $2234 = $2231;
                                            return $2234;
                                    };
                                })());
                                _expr$11 = $2226;
                                $2227 = $2227.tail;
                            }
                            return _expr$11;
                        })();
                        var $2224 = _expr$10;
                        return $2224;
                    case 'Fm.Term.ref':
                        var $2235 = self.name;
                        var _expr$9 = (() => {
                            var $2238 = _expr$1;
                            var $2239 = _wyth$3;
                            let _expr$10 = $2238;
                            let _defn$9;
                            while ($2239._ === 'List.cons') {
                                _defn$9 = $2239.head;
                                var $2238 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2240 = self.file;
                                            var $2241 = self.code;
                                            var $2242 = self.name;
                                            var $2243 = self.term;
                                            var $2244 = self.type;
                                            var $2245 = self.stat;
                                            var $2246 = $2243;
                                            return $2246;
                                    };
                                })());
                                _expr$10 = $2238;
                                $2239 = $2239.tail;
                            }
                            return _expr$10;
                        })();
                        var $2236 = _expr$9;
                        return $2236;
                    case 'Fm.Term.typ':
                        var _expr$8 = (() => {
                            var $2249 = _expr$1;
                            var $2250 = _wyth$3;
                            let _expr$9 = $2249;
                            let _defn$8;
                            while ($2250._ === 'List.cons') {
                                _defn$8 = $2250.head;
                                var $2249 = Fm$Term$app$(_expr$9, (() => {
                                    var self = _defn$8;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2251 = self.file;
                                            var $2252 = self.code;
                                            var $2253 = self.name;
                                            var $2254 = self.term;
                                            var $2255 = self.type;
                                            var $2256 = self.stat;
                                            var $2257 = $2254;
                                            return $2257;
                                    };
                                })());
                                _expr$9 = $2249;
                                $2250 = $2250.tail;
                            }
                            return _expr$9;
                        })();
                        var $2247 = _expr$8;
                        return $2247;
                    case 'Fm.Term.all':
                        var $2258 = self.eras;
                        var $2259 = self.self;
                        var $2260 = self.name;
                        var $2261 = self.xtyp;
                        var $2262 = self.body;
                        var _got$13 = Maybe$or$(Fm$get$($2260, _cses$4), Fm$get$("_", _cses$4));
                        var self = _got$13;
                        switch (self._) {
                            case 'Maybe.none':
                                var _expr$14 = (() => {
                                    var $2266 = _expr$1;
                                    var $2267 = _wyth$3;
                                    let _expr$15 = $2266;
                                    let _defn$14;
                                    while ($2267._ === 'List.cons') {
                                        _defn$14 = $2267.head;
                                        var self = _defn$14;
                                        switch (self._) {
                                            case 'Fm.Def.new':
                                                var $2268 = self.file;
                                                var $2269 = self.code;
                                                var $2270 = self.name;
                                                var $2271 = self.term;
                                                var $2272 = self.type;
                                                var $2273 = self.stat;
                                                var $2274 = Fm$Term$app$(_expr$15, $2271);
                                                var $2266 = $2274;
                                                break;
                                        };
                                        _expr$15 = $2266;
                                        $2267 = $2267.tail;
                                    }
                                    return _expr$15;
                                })();
                                var $2264 = _expr$14;
                                var $2263 = $2264;
                                break;
                            case 'Maybe.some':
                                var $2275 = self.value;
                                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, _wyth$3, $2261, $2275, _defs$6);
                                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                                var _type$17 = $2262(Fm$Term$var$($2259, 0n))(Fm$Term$var$($2260, 0n));
                                var $2276 = Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$6, _ctxt$7);
                                var $2263 = $2276;
                                break;
                        };
                        return $2263;
                    case 'Fm.Term.lam':
                        var $2277 = self.name;
                        var $2278 = self.body;
                        var _expr$10 = (() => {
                            var $2281 = _expr$1;
                            var $2282 = _wyth$3;
                            let _expr$11 = $2281;
                            let _defn$10;
                            while ($2282._ === 'List.cons') {
                                _defn$10 = $2282.head;
                                var $2281 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2283 = self.file;
                                            var $2284 = self.code;
                                            var $2285 = self.name;
                                            var $2286 = self.term;
                                            var $2287 = self.type;
                                            var $2288 = self.stat;
                                            var $2289 = $2286;
                                            return $2289;
                                    };
                                })());
                                _expr$11 = $2281;
                                $2282 = $2282.tail;
                            }
                            return _expr$11;
                        })();
                        var $2279 = _expr$10;
                        return $2279;
                    case 'Fm.Term.app':
                        var $2290 = self.func;
                        var $2291 = self.argm;
                        var _expr$10 = (() => {
                            var $2294 = _expr$1;
                            var $2295 = _wyth$3;
                            let _expr$11 = $2294;
                            let _defn$10;
                            while ($2295._ === 'List.cons') {
                                _defn$10 = $2295.head;
                                var $2294 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2296 = self.file;
                                            var $2297 = self.code;
                                            var $2298 = self.name;
                                            var $2299 = self.term;
                                            var $2300 = self.type;
                                            var $2301 = self.stat;
                                            var $2302 = $2299;
                                            return $2302;
                                    };
                                })());
                                _expr$11 = $2294;
                                $2295 = $2295.tail;
                            }
                            return _expr$11;
                        })();
                        var $2292 = _expr$10;
                        return $2292;
                    case 'Fm.Term.let':
                        var $2303 = self.name;
                        var $2304 = self.expr;
                        var $2305 = self.body;
                        var _expr$11 = (() => {
                            var $2308 = _expr$1;
                            var $2309 = _wyth$3;
                            let _expr$12 = $2308;
                            let _defn$11;
                            while ($2309._ === 'List.cons') {
                                _defn$11 = $2309.head;
                                var $2308 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2310 = self.file;
                                            var $2311 = self.code;
                                            var $2312 = self.name;
                                            var $2313 = self.term;
                                            var $2314 = self.type;
                                            var $2315 = self.stat;
                                            var $2316 = $2313;
                                            return $2316;
                                    };
                                })());
                                _expr$12 = $2308;
                                $2309 = $2309.tail;
                            }
                            return _expr$12;
                        })();
                        var $2306 = _expr$11;
                        return $2306;
                    case 'Fm.Term.def':
                        var $2317 = self.name;
                        var $2318 = self.expr;
                        var $2319 = self.body;
                        var _expr$11 = (() => {
                            var $2322 = _expr$1;
                            var $2323 = _wyth$3;
                            let _expr$12 = $2322;
                            let _defn$11;
                            while ($2323._ === 'List.cons') {
                                _defn$11 = $2323.head;
                                var $2322 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2324 = self.file;
                                            var $2325 = self.code;
                                            var $2326 = self.name;
                                            var $2327 = self.term;
                                            var $2328 = self.type;
                                            var $2329 = self.stat;
                                            var $2330 = $2327;
                                            return $2330;
                                    };
                                })());
                                _expr$12 = $2322;
                                $2323 = $2323.tail;
                            }
                            return _expr$12;
                        })();
                        var $2320 = _expr$11;
                        return $2320;
                    case 'Fm.Term.ann':
                        var $2331 = self.done;
                        var $2332 = self.term;
                        var $2333 = self.type;
                        var _expr$11 = (() => {
                            var $2336 = _expr$1;
                            var $2337 = _wyth$3;
                            let _expr$12 = $2336;
                            let _defn$11;
                            while ($2337._ === 'List.cons') {
                                _defn$11 = $2337.head;
                                var $2336 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2338 = self.file;
                                            var $2339 = self.code;
                                            var $2340 = self.name;
                                            var $2341 = self.term;
                                            var $2342 = self.type;
                                            var $2343 = self.stat;
                                            var $2344 = $2341;
                                            return $2344;
                                    };
                                })());
                                _expr$12 = $2336;
                                $2337 = $2337.tail;
                            }
                            return _expr$12;
                        })();
                        var $2334 = _expr$11;
                        return $2334;
                    case 'Fm.Term.gol':
                        var $2345 = self.name;
                        var $2346 = self.dref;
                        var $2347 = self.verb;
                        var _expr$11 = (() => {
                            var $2350 = _expr$1;
                            var $2351 = _wyth$3;
                            let _expr$12 = $2350;
                            let _defn$11;
                            while ($2351._ === 'List.cons') {
                                _defn$11 = $2351.head;
                                var $2350 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2352 = self.file;
                                            var $2353 = self.code;
                                            var $2354 = self.name;
                                            var $2355 = self.term;
                                            var $2356 = self.type;
                                            var $2357 = self.stat;
                                            var $2358 = $2355;
                                            return $2358;
                                    };
                                })());
                                _expr$12 = $2350;
                                $2351 = $2351.tail;
                            }
                            return _expr$12;
                        })();
                        var $2348 = _expr$11;
                        return $2348;
                    case 'Fm.Term.hol':
                        var $2359 = self.path;
                        var _expr$9 = (() => {
                            var $2362 = _expr$1;
                            var $2363 = _wyth$3;
                            let _expr$10 = $2362;
                            let _defn$9;
                            while ($2363._ === 'List.cons') {
                                _defn$9 = $2363.head;
                                var $2362 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2364 = self.file;
                                            var $2365 = self.code;
                                            var $2366 = self.name;
                                            var $2367 = self.term;
                                            var $2368 = self.type;
                                            var $2369 = self.stat;
                                            var $2370 = $2367;
                                            return $2370;
                                    };
                                })());
                                _expr$10 = $2362;
                                $2363 = $2363.tail;
                            }
                            return _expr$10;
                        })();
                        var $2360 = _expr$9;
                        return $2360;
                    case 'Fm.Term.nat':
                        var $2371 = self.natx;
                        var _expr$9 = (() => {
                            var $2374 = _expr$1;
                            var $2375 = _wyth$3;
                            let _expr$10 = $2374;
                            let _defn$9;
                            while ($2375._ === 'List.cons') {
                                _defn$9 = $2375.head;
                                var $2374 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2376 = self.file;
                                            var $2377 = self.code;
                                            var $2378 = self.name;
                                            var $2379 = self.term;
                                            var $2380 = self.type;
                                            var $2381 = self.stat;
                                            var $2382 = $2379;
                                            return $2382;
                                    };
                                })());
                                _expr$10 = $2374;
                                $2375 = $2375.tail;
                            }
                            return _expr$10;
                        })();
                        var $2372 = _expr$9;
                        return $2372;
                    case 'Fm.Term.chr':
                        var $2383 = self.chrx;
                        var _expr$9 = (() => {
                            var $2386 = _expr$1;
                            var $2387 = _wyth$3;
                            let _expr$10 = $2386;
                            let _defn$9;
                            while ($2387._ === 'List.cons') {
                                _defn$9 = $2387.head;
                                var $2386 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2388 = self.file;
                                            var $2389 = self.code;
                                            var $2390 = self.name;
                                            var $2391 = self.term;
                                            var $2392 = self.type;
                                            var $2393 = self.stat;
                                            var $2394 = $2391;
                                            return $2394;
                                    };
                                })());
                                _expr$10 = $2386;
                                $2387 = $2387.tail;
                            }
                            return _expr$10;
                        })();
                        var $2384 = _expr$9;
                        return $2384;
                    case 'Fm.Term.str':
                        var $2395 = self.strx;
                        var _expr$9 = (() => {
                            var $2398 = _expr$1;
                            var $2399 = _wyth$3;
                            let _expr$10 = $2398;
                            let _defn$9;
                            while ($2399._ === 'List.cons') {
                                _defn$9 = $2399.head;
                                var $2398 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2400 = self.file;
                                            var $2401 = self.code;
                                            var $2402 = self.name;
                                            var $2403 = self.term;
                                            var $2404 = self.type;
                                            var $2405 = self.stat;
                                            var $2406 = $2403;
                                            return $2406;
                                    };
                                })());
                                _expr$10 = $2398;
                                $2399 = $2399.tail;
                            }
                            return _expr$10;
                        })();
                        var $2396 = _expr$9;
                        return $2396;
                    case 'Fm.Term.cse':
                        var $2407 = self.path;
                        var $2408 = self.expr;
                        var $2409 = self.name;
                        var $2410 = self.with;
                        var $2411 = self.cses;
                        var $2412 = self.moti;
                        var _expr$14 = (() => {
                            var $2415 = _expr$1;
                            var $2416 = _wyth$3;
                            let _expr$15 = $2415;
                            let _defn$14;
                            while ($2416._ === 'List.cons') {
                                _defn$14 = $2416.head;
                                var $2415 = Fm$Term$app$(_expr$15, (() => {
                                    var self = _defn$14;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2417 = self.file;
                                            var $2418 = self.code;
                                            var $2419 = self.name;
                                            var $2420 = self.term;
                                            var $2421 = self.type;
                                            var $2422 = self.stat;
                                            var $2423 = $2420;
                                            return $2423;
                                    };
                                })());
                                _expr$15 = $2415;
                                $2416 = $2416.tail;
                            }
                            return _expr$15;
                        })();
                        var $2413 = _expr$14;
                        return $2413;
                    case 'Fm.Term.ori':
                        var $2424 = self.orig;
                        var $2425 = self.expr;
                        var _expr$10 = (() => {
                            var $2428 = _expr$1;
                            var $2429 = _wyth$3;
                            let _expr$11 = $2428;
                            let _defn$10;
                            while ($2429._ === 'List.cons') {
                                _defn$10 = $2429.head;
                                var $2428 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2430 = self.file;
                                            var $2431 = self.code;
                                            var $2432 = self.name;
                                            var $2433 = self.term;
                                            var $2434 = self.type;
                                            var $2435 = self.stat;
                                            var $2436 = $2433;
                                            return $2436;
                                    };
                                })());
                                _expr$11 = $2428;
                                $2429 = $2429.tail;
                            }
                            return _expr$11;
                        })();
                        var $2426 = _expr$10;
                        return $2426;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Term$desugar_cse$cases = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$Term$desugar_cse$cases$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Term$desugar_cse$(_expr$1, _name$2, _with$3, _cses$4, _moti$5, _type$6, _defs$7, _ctxt$8) {
        var self = Fm$Term$reduce$(_type$6, _defs$7);
        switch (self._) {
            case 'Fm.Term.var':
                var $2438 = self.name;
                var $2439 = self.indx;
                var $2440 = Maybe$none;
                var $2437 = $2440;
                break;
            case 'Fm.Term.ref':
                var $2441 = self.name;
                var $2442 = Maybe$none;
                var $2437 = $2442;
                break;
            case 'Fm.Term.typ':
                var $2443 = Maybe$none;
                var $2437 = $2443;
                break;
            case 'Fm.Term.all':
                var $2444 = self.eras;
                var $2445 = self.self;
                var $2446 = self.name;
                var $2447 = self.xtyp;
                var $2448 = self.body;
                var _moti$14 = Fm$Term$desugar_cse$motive$(_with$3, _moti$5);
                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, List$nil, $2447, _moti$14, _defs$7);
                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                var _type$17 = $2448(Fm$Term$var$($2445, 0n))(Fm$Term$var$($2446, 0n));
                var $2449 = Maybe$some$(Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _with$3, _cses$4, _type$17, _defs$7, _ctxt$8));
                var $2437 = $2449;
                break;
            case 'Fm.Term.lam':
                var $2450 = self.name;
                var $2451 = self.body;
                var $2452 = Maybe$none;
                var $2437 = $2452;
                break;
            case 'Fm.Term.app':
                var $2453 = self.func;
                var $2454 = self.argm;
                var $2455 = Maybe$none;
                var $2437 = $2455;
                break;
            case 'Fm.Term.let':
                var $2456 = self.name;
                var $2457 = self.expr;
                var $2458 = self.body;
                var $2459 = Maybe$none;
                var $2437 = $2459;
                break;
            case 'Fm.Term.def':
                var $2460 = self.name;
                var $2461 = self.expr;
                var $2462 = self.body;
                var $2463 = Maybe$none;
                var $2437 = $2463;
                break;
            case 'Fm.Term.ann':
                var $2464 = self.done;
                var $2465 = self.term;
                var $2466 = self.type;
                var $2467 = Maybe$none;
                var $2437 = $2467;
                break;
            case 'Fm.Term.gol':
                var $2468 = self.name;
                var $2469 = self.dref;
                var $2470 = self.verb;
                var $2471 = Maybe$none;
                var $2437 = $2471;
                break;
            case 'Fm.Term.hol':
                var $2472 = self.path;
                var $2473 = Maybe$none;
                var $2437 = $2473;
                break;
            case 'Fm.Term.nat':
                var $2474 = self.natx;
                var $2475 = Maybe$none;
                var $2437 = $2475;
                break;
            case 'Fm.Term.chr':
                var $2476 = self.chrx;
                var $2477 = Maybe$none;
                var $2437 = $2477;
                break;
            case 'Fm.Term.str':
                var $2478 = self.strx;
                var $2479 = Maybe$none;
                var $2437 = $2479;
                break;
            case 'Fm.Term.cse':
                var $2480 = self.path;
                var $2481 = self.expr;
                var $2482 = self.name;
                var $2483 = self.with;
                var $2484 = self.cses;
                var $2485 = self.moti;
                var $2486 = Maybe$none;
                var $2437 = $2486;
                break;
            case 'Fm.Term.ori':
                var $2487 = self.orig;
                var $2488 = self.expr;
                var $2489 = Maybe$none;
                var $2437 = $2489;
                break;
        };
        return $2437;
    };
    const Fm$Term$desugar_cse = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Term$desugar_cse$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Error$patch$(_path$1, _term$2) {
        var $2490 = ({
            _: 'Fm.Error.patch',
            'path': _path$1,
            'term': _term$2
        });
        return $2490;
    };
    const Fm$Error$patch = x0 => x1 => Fm$Error$patch$(x0, x1);

    function Fm$MPath$to_bits$(_path$1) {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.none':
                var $2492 = Bits$e;
                var $2491 = $2492;
                break;
            case 'Maybe.some':
                var $2493 = self.value;
                var $2494 = $2493(Bits$e);
                var $2491 = $2494;
                break;
        };
        return $2491;
    };
    const Fm$MPath$to_bits = x0 => Fm$MPath$to_bits$(x0);

    function Set$has$(_bits$1, _set$2) {
        var self = Map$get$(_bits$1, _set$2);
        switch (self._) {
            case 'Maybe.none':
                var $2496 = Bool$false;
                var $2495 = $2496;
                break;
            case 'Maybe.some':
                var $2497 = self.value;
                var $2498 = Bool$true;
                var $2495 = $2498;
                break;
        };
        return $2495;
    };
    const Set$has = x0 => x1 => Set$has$(x0, x1);

    function Fm$Term$normalize$(_term$1, _defs$2) {
        var self = Fm$Term$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $2500 = self.name;
                var $2501 = self.indx;
                var $2502 = Fm$Term$var$($2500, $2501);
                var $2499 = $2502;
                break;
            case 'Fm.Term.ref':
                var $2503 = self.name;
                var $2504 = Fm$Term$ref$($2503);
                var $2499 = $2504;
                break;
            case 'Fm.Term.typ':
                var $2505 = Fm$Term$typ;
                var $2499 = $2505;
                break;
            case 'Fm.Term.all':
                var $2506 = self.eras;
                var $2507 = self.self;
                var $2508 = self.name;
                var $2509 = self.xtyp;
                var $2510 = self.body;
                var $2511 = Fm$Term$all$($2506, $2507, $2508, Fm$Term$normalize$($2509, _defs$2), (_s$8 => _x$9 => {
                    var $2512 = Fm$Term$normalize$($2510(_s$8)(_x$9), _defs$2);
                    return $2512;
                }));
                var $2499 = $2511;
                break;
            case 'Fm.Term.lam':
                var $2513 = self.name;
                var $2514 = self.body;
                var $2515 = Fm$Term$lam$($2513, (_x$5 => {
                    var $2516 = Fm$Term$normalize$($2514(_x$5), _defs$2);
                    return $2516;
                }));
                var $2499 = $2515;
                break;
            case 'Fm.Term.app':
                var $2517 = self.func;
                var $2518 = self.argm;
                var $2519 = Fm$Term$app$(Fm$Term$normalize$($2517, _defs$2), Fm$Term$normalize$($2518, _defs$2));
                var $2499 = $2519;
                break;
            case 'Fm.Term.let':
                var $2520 = self.name;
                var $2521 = self.expr;
                var $2522 = self.body;
                var $2523 = Fm$Term$let$($2520, Fm$Term$normalize$($2521, _defs$2), (_x$6 => {
                    var $2524 = Fm$Term$normalize$($2522(_x$6), _defs$2);
                    return $2524;
                }));
                var $2499 = $2523;
                break;
            case 'Fm.Term.def':
                var $2525 = self.name;
                var $2526 = self.expr;
                var $2527 = self.body;
                var $2528 = Fm$Term$def$($2525, Fm$Term$normalize$($2526, _defs$2), (_x$6 => {
                    var $2529 = Fm$Term$normalize$($2527(_x$6), _defs$2);
                    return $2529;
                }));
                var $2499 = $2528;
                break;
            case 'Fm.Term.ann':
                var $2530 = self.done;
                var $2531 = self.term;
                var $2532 = self.type;
                var $2533 = Fm$Term$ann$($2530, Fm$Term$normalize$($2531, _defs$2), Fm$Term$normalize$($2532, _defs$2));
                var $2499 = $2533;
                break;
            case 'Fm.Term.gol':
                var $2534 = self.name;
                var $2535 = self.dref;
                var $2536 = self.verb;
                var $2537 = Fm$Term$gol$($2534, $2535, $2536);
                var $2499 = $2537;
                break;
            case 'Fm.Term.hol':
                var $2538 = self.path;
                var $2539 = Fm$Term$hol$($2538);
                var $2499 = $2539;
                break;
            case 'Fm.Term.nat':
                var $2540 = self.natx;
                var $2541 = Fm$Term$nat$($2540);
                var $2499 = $2541;
                break;
            case 'Fm.Term.chr':
                var $2542 = self.chrx;
                var $2543 = Fm$Term$chr$($2542);
                var $2499 = $2543;
                break;
            case 'Fm.Term.str':
                var $2544 = self.strx;
                var $2545 = Fm$Term$str$($2544);
                var $2499 = $2545;
                break;
            case 'Fm.Term.cse':
                var $2546 = self.path;
                var $2547 = self.expr;
                var $2548 = self.name;
                var $2549 = self.with;
                var $2550 = self.cses;
                var $2551 = self.moti;
                var $2552 = _term$1;
                var $2499 = $2552;
                break;
            case 'Fm.Term.ori':
                var $2553 = self.orig;
                var $2554 = self.expr;
                var $2555 = Fm$Term$normalize$($2554, _defs$2);
                var $2499 = $2555;
                break;
        };
        return $2499;
    };
    const Fm$Term$normalize = x0 => x1 => Fm$Term$normalize$(x0, x1);

    function Fm$Term$equal$patch$(_path$1, _term$2) {
        var $2556 = Fm$Check$result$(Maybe$some$(Bool$true), List$cons$(Fm$Error$patch$(_path$1, Fm$Term$normalize$(_term$2, Map$new)), List$nil));
        return $2556;
    };
    const Fm$Term$equal$patch = x0 => x1 => Fm$Term$equal$patch$(x0, x1);

    function Set$set$(_bits$1, _set$2) {
        var $2557 = Map$set$(_bits$1, Unit$new, _set$2);
        return $2557;
    };
    const Set$set = x0 => x1 => Set$set$(x0, x1);

    function Bool$eql$(_a$1, _b$2) {
        var self = _a$1;
        if (self) {
            var $2559 = _b$2;
            var $2558 = $2559;
        } else {
            var $2560 = (!_b$2);
            var $2558 = $2560;
        };
        return $2558;
    };
    const Bool$eql = x0 => x1 => Bool$eql$(x0, x1);

    function Fm$Term$equal$(_a$1, _b$2, _defs$3, _lv$4, _seen$5) {
        var _ah$6 = Fm$Term$serialize$(Fm$Term$reduce$(_a$1, Map$new), _lv$4, _lv$4, Bits$e);
        var _bh$7 = Fm$Term$serialize$(Fm$Term$reduce$(_b$2, Map$new), _lv$4, _lv$4, Bits$e);
        var self = (_bh$7 === _ah$6);
        if (self) {
            var $2562 = Monad$pure$(Fm$Check$monad)(Bool$true);
            var $2561 = $2562;
        } else {
            var _a1$8 = Fm$Term$reduce$(_a$1, _defs$3);
            var _b1$9 = Fm$Term$reduce$(_b$2, _defs$3);
            var _ah$10 = Fm$Term$serialize$(_a1$8, _lv$4, _lv$4, Bits$e);
            var _bh$11 = Fm$Term$serialize$(_b1$9, _lv$4, _lv$4, Bits$e);
            var self = (_bh$11 === _ah$10);
            if (self) {
                var $2564 = Monad$pure$(Fm$Check$monad)(Bool$true);
                var $2563 = $2564;
            } else {
                var _id$12 = (_bh$11 + _ah$10);
                var self = Set$has$(_id$12, _seen$5);
                if (self) {
                    var $2566 = Monad$pure$(Fm$Check$monad)(Bool$true);
                    var $2565 = $2566;
                } else {
                    var self = _a1$8;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2568 = self.name;
                            var $2569 = self.indx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2571 = self.name;
                                    var $2572 = self.indx;
                                    var $2573 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2573;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2574 = self.name;
                                    var $2575 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2575;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2576 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2576;
                                    break;
                                case 'Fm.Term.all':
                                    var $2577 = self.eras;
                                    var $2578 = self.self;
                                    var $2579 = self.name;
                                    var $2580 = self.xtyp;
                                    var $2581 = self.body;
                                    var $2582 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2582;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2583 = self.name;
                                    var $2584 = self.body;
                                    var $2585 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2585;
                                    break;
                                case 'Fm.Term.app':
                                    var $2586 = self.func;
                                    var $2587 = self.argm;
                                    var $2588 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2588;
                                    break;
                                case 'Fm.Term.let':
                                    var $2589 = self.name;
                                    var $2590 = self.expr;
                                    var $2591 = self.body;
                                    var $2592 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2592;
                                    break;
                                case 'Fm.Term.def':
                                    var $2593 = self.name;
                                    var $2594 = self.expr;
                                    var $2595 = self.body;
                                    var $2596 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2596;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2597 = self.done;
                                    var $2598 = self.term;
                                    var $2599 = self.type;
                                    var $2600 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2600;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2601 = self.name;
                                    var $2602 = self.dref;
                                    var $2603 = self.verb;
                                    var $2604 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2604;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2605 = self.path;
                                    var $2606 = Fm$Term$equal$patch$($2605, _a$1);
                                    var $2570 = $2606;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2607 = self.natx;
                                    var $2608 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2608;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2609 = self.chrx;
                                    var $2610 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2610;
                                    break;
                                case 'Fm.Term.str':
                                    var $2611 = self.strx;
                                    var $2612 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2612;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2613 = self.path;
                                    var $2614 = self.expr;
                                    var $2615 = self.name;
                                    var $2616 = self.with;
                                    var $2617 = self.cses;
                                    var $2618 = self.moti;
                                    var $2619 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2619;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2620 = self.orig;
                                    var $2621 = self.expr;
                                    var $2622 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2570 = $2622;
                                    break;
                            };
                            var $2567 = $2570;
                            break;
                        case 'Fm.Term.ref':
                            var $2623 = self.name;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2625 = self.name;
                                    var $2626 = self.indx;
                                    var $2627 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2627;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2628 = self.name;
                                    var $2629 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2629;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2630 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2630;
                                    break;
                                case 'Fm.Term.all':
                                    var $2631 = self.eras;
                                    var $2632 = self.self;
                                    var $2633 = self.name;
                                    var $2634 = self.xtyp;
                                    var $2635 = self.body;
                                    var $2636 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2636;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2637 = self.name;
                                    var $2638 = self.body;
                                    var $2639 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2639;
                                    break;
                                case 'Fm.Term.app':
                                    var $2640 = self.func;
                                    var $2641 = self.argm;
                                    var $2642 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2642;
                                    break;
                                case 'Fm.Term.let':
                                    var $2643 = self.name;
                                    var $2644 = self.expr;
                                    var $2645 = self.body;
                                    var $2646 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2646;
                                    break;
                                case 'Fm.Term.def':
                                    var $2647 = self.name;
                                    var $2648 = self.expr;
                                    var $2649 = self.body;
                                    var $2650 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2650;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2651 = self.done;
                                    var $2652 = self.term;
                                    var $2653 = self.type;
                                    var $2654 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2654;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2655 = self.name;
                                    var $2656 = self.dref;
                                    var $2657 = self.verb;
                                    var $2658 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2658;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2659 = self.path;
                                    var $2660 = Fm$Term$equal$patch$($2659, _a$1);
                                    var $2624 = $2660;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2661 = self.natx;
                                    var $2662 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2662;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2663 = self.chrx;
                                    var $2664 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2664;
                                    break;
                                case 'Fm.Term.str':
                                    var $2665 = self.strx;
                                    var $2666 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2666;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2667 = self.path;
                                    var $2668 = self.expr;
                                    var $2669 = self.name;
                                    var $2670 = self.with;
                                    var $2671 = self.cses;
                                    var $2672 = self.moti;
                                    var $2673 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2673;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2674 = self.orig;
                                    var $2675 = self.expr;
                                    var $2676 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2624 = $2676;
                                    break;
                            };
                            var $2567 = $2624;
                            break;
                        case 'Fm.Term.typ':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2678 = self.name;
                                    var $2679 = self.indx;
                                    var $2680 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2680;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2681 = self.name;
                                    var $2682 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2682;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2683 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2683;
                                    break;
                                case 'Fm.Term.all':
                                    var $2684 = self.eras;
                                    var $2685 = self.self;
                                    var $2686 = self.name;
                                    var $2687 = self.xtyp;
                                    var $2688 = self.body;
                                    var $2689 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2689;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2690 = self.name;
                                    var $2691 = self.body;
                                    var $2692 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2692;
                                    break;
                                case 'Fm.Term.app':
                                    var $2693 = self.func;
                                    var $2694 = self.argm;
                                    var $2695 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2695;
                                    break;
                                case 'Fm.Term.let':
                                    var $2696 = self.name;
                                    var $2697 = self.expr;
                                    var $2698 = self.body;
                                    var $2699 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2699;
                                    break;
                                case 'Fm.Term.def':
                                    var $2700 = self.name;
                                    var $2701 = self.expr;
                                    var $2702 = self.body;
                                    var $2703 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2703;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2704 = self.done;
                                    var $2705 = self.term;
                                    var $2706 = self.type;
                                    var $2707 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2707;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2708 = self.name;
                                    var $2709 = self.dref;
                                    var $2710 = self.verb;
                                    var $2711 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2711;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2712 = self.path;
                                    var $2713 = Fm$Term$equal$patch$($2712, _a$1);
                                    var $2677 = $2713;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2714 = self.natx;
                                    var $2715 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2715;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2716 = self.chrx;
                                    var $2717 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2717;
                                    break;
                                case 'Fm.Term.str':
                                    var $2718 = self.strx;
                                    var $2719 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2719;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2720 = self.path;
                                    var $2721 = self.expr;
                                    var $2722 = self.name;
                                    var $2723 = self.with;
                                    var $2724 = self.cses;
                                    var $2725 = self.moti;
                                    var $2726 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2726;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2727 = self.orig;
                                    var $2728 = self.expr;
                                    var $2729 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2677 = $2729;
                                    break;
                            };
                            var $2567 = $2677;
                            break;
                        case 'Fm.Term.all':
                            var $2730 = self.eras;
                            var $2731 = self.self;
                            var $2732 = self.name;
                            var $2733 = self.xtyp;
                            var $2734 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2736 = self.name;
                                    var $2737 = self.indx;
                                    var $2738 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2738;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2739 = self.name;
                                    var $2740 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2740;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2741 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2741;
                                    break;
                                case 'Fm.Term.all':
                                    var $2742 = self.eras;
                                    var $2743 = self.self;
                                    var $2744 = self.name;
                                    var $2745 = self.xtyp;
                                    var $2746 = self.body;
                                    var _seen$23 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$24 = $2734(Fm$Term$var$($2731, _lv$4))(Fm$Term$var$($2732, Nat$succ$(_lv$4)));
                                    var _b1_body$25 = $2746(Fm$Term$var$($2743, _lv$4))(Fm$Term$var$($2744, Nat$succ$(_lv$4)));
                                    var _eq_self$26 = ($2731 === $2743);
                                    var _eq_eras$27 = Bool$eql$($2730, $2742);
                                    var self = (_eq_self$26 && _eq_eras$27);
                                    if (self) {
                                        var $2748 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2733, $2745, _defs$3, _lv$4, _seen$23))((_eq_type$28 => {
                                            var $2749 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$24, _b1_body$25, _defs$3, Nat$succ$(Nat$succ$(_lv$4)), _seen$23))((_eq_body$29 => {
                                                var $2750 = Monad$pure$(Fm$Check$monad)((_eq_type$28 && _eq_body$29));
                                                return $2750;
                                            }));
                                            return $2749;
                                        }));
                                        var $2747 = $2748;
                                    } else {
                                        var $2751 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                        var $2747 = $2751;
                                    };
                                    var $2735 = $2747;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2752 = self.name;
                                    var $2753 = self.body;
                                    var $2754 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2754;
                                    break;
                                case 'Fm.Term.app':
                                    var $2755 = self.func;
                                    var $2756 = self.argm;
                                    var $2757 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2757;
                                    break;
                                case 'Fm.Term.let':
                                    var $2758 = self.name;
                                    var $2759 = self.expr;
                                    var $2760 = self.body;
                                    var $2761 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2761;
                                    break;
                                case 'Fm.Term.def':
                                    var $2762 = self.name;
                                    var $2763 = self.expr;
                                    var $2764 = self.body;
                                    var $2765 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2765;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2766 = self.done;
                                    var $2767 = self.term;
                                    var $2768 = self.type;
                                    var $2769 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2769;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2770 = self.name;
                                    var $2771 = self.dref;
                                    var $2772 = self.verb;
                                    var $2773 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2773;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2774 = self.path;
                                    var $2775 = Fm$Term$equal$patch$($2774, _a$1);
                                    var $2735 = $2775;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2776 = self.natx;
                                    var $2777 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2777;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2778 = self.chrx;
                                    var $2779 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2779;
                                    break;
                                case 'Fm.Term.str':
                                    var $2780 = self.strx;
                                    var $2781 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2781;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2782 = self.path;
                                    var $2783 = self.expr;
                                    var $2784 = self.name;
                                    var $2785 = self.with;
                                    var $2786 = self.cses;
                                    var $2787 = self.moti;
                                    var $2788 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2788;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2789 = self.orig;
                                    var $2790 = self.expr;
                                    var $2791 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2735 = $2791;
                                    break;
                            };
                            var $2567 = $2735;
                            break;
                        case 'Fm.Term.lam':
                            var $2792 = self.name;
                            var $2793 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2795 = self.name;
                                    var $2796 = self.indx;
                                    var $2797 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2797;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2798 = self.name;
                                    var $2799 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2799;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2800 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2800;
                                    break;
                                case 'Fm.Term.all':
                                    var $2801 = self.eras;
                                    var $2802 = self.self;
                                    var $2803 = self.name;
                                    var $2804 = self.xtyp;
                                    var $2805 = self.body;
                                    var $2806 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2806;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2807 = self.name;
                                    var $2808 = self.body;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$18 = $2793(Fm$Term$var$($2792, _lv$4));
                                    var _b1_body$19 = $2808(Fm$Term$var$($2807, _lv$4));
                                    var $2809 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$18, _b1_body$19, _defs$3, Nat$succ$(_lv$4), _seen$17))((_eq_body$20 => {
                                        var $2810 = Monad$pure$(Fm$Check$monad)(_eq_body$20);
                                        return $2810;
                                    }));
                                    var $2794 = $2809;
                                    break;
                                case 'Fm.Term.app':
                                    var $2811 = self.func;
                                    var $2812 = self.argm;
                                    var $2813 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2813;
                                    break;
                                case 'Fm.Term.let':
                                    var $2814 = self.name;
                                    var $2815 = self.expr;
                                    var $2816 = self.body;
                                    var $2817 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2817;
                                    break;
                                case 'Fm.Term.def':
                                    var $2818 = self.name;
                                    var $2819 = self.expr;
                                    var $2820 = self.body;
                                    var $2821 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2821;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2822 = self.done;
                                    var $2823 = self.term;
                                    var $2824 = self.type;
                                    var $2825 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2825;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2826 = self.name;
                                    var $2827 = self.dref;
                                    var $2828 = self.verb;
                                    var $2829 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2829;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2830 = self.path;
                                    var $2831 = Fm$Term$equal$patch$($2830, _a$1);
                                    var $2794 = $2831;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2832 = self.natx;
                                    var $2833 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2833;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2834 = self.chrx;
                                    var $2835 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2835;
                                    break;
                                case 'Fm.Term.str':
                                    var $2836 = self.strx;
                                    var $2837 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2837;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2838 = self.path;
                                    var $2839 = self.expr;
                                    var $2840 = self.name;
                                    var $2841 = self.with;
                                    var $2842 = self.cses;
                                    var $2843 = self.moti;
                                    var $2844 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2844;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2845 = self.orig;
                                    var $2846 = self.expr;
                                    var $2847 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2794 = $2847;
                                    break;
                            };
                            var $2567 = $2794;
                            break;
                        case 'Fm.Term.app':
                            var $2848 = self.func;
                            var $2849 = self.argm;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2851 = self.name;
                                    var $2852 = self.indx;
                                    var $2853 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2853;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2854 = self.name;
                                    var $2855 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2855;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2856 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2856;
                                    break;
                                case 'Fm.Term.all':
                                    var $2857 = self.eras;
                                    var $2858 = self.self;
                                    var $2859 = self.name;
                                    var $2860 = self.xtyp;
                                    var $2861 = self.body;
                                    var $2862 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2862;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2863 = self.name;
                                    var $2864 = self.body;
                                    var $2865 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2865;
                                    break;
                                case 'Fm.Term.app':
                                    var $2866 = self.func;
                                    var $2867 = self.argm;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var $2868 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2848, $2866, _defs$3, _lv$4, _seen$17))((_eq_func$18 => {
                                        var $2869 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2849, $2867, _defs$3, _lv$4, _seen$17))((_eq_argm$19 => {
                                            var $2870 = Monad$pure$(Fm$Check$monad)((_eq_func$18 && _eq_argm$19));
                                            return $2870;
                                        }));
                                        return $2869;
                                    }));
                                    var $2850 = $2868;
                                    break;
                                case 'Fm.Term.let':
                                    var $2871 = self.name;
                                    var $2872 = self.expr;
                                    var $2873 = self.body;
                                    var $2874 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2874;
                                    break;
                                case 'Fm.Term.def':
                                    var $2875 = self.name;
                                    var $2876 = self.expr;
                                    var $2877 = self.body;
                                    var $2878 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2878;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2879 = self.done;
                                    var $2880 = self.term;
                                    var $2881 = self.type;
                                    var $2882 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2882;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2883 = self.name;
                                    var $2884 = self.dref;
                                    var $2885 = self.verb;
                                    var $2886 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2886;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2887 = self.path;
                                    var $2888 = Fm$Term$equal$patch$($2887, _a$1);
                                    var $2850 = $2888;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2889 = self.natx;
                                    var $2890 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2890;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2891 = self.chrx;
                                    var $2892 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2892;
                                    break;
                                case 'Fm.Term.str':
                                    var $2893 = self.strx;
                                    var $2894 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2894;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2895 = self.path;
                                    var $2896 = self.expr;
                                    var $2897 = self.name;
                                    var $2898 = self.with;
                                    var $2899 = self.cses;
                                    var $2900 = self.moti;
                                    var $2901 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2901;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2902 = self.orig;
                                    var $2903 = self.expr;
                                    var $2904 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2850 = $2904;
                                    break;
                            };
                            var $2567 = $2850;
                            break;
                        case 'Fm.Term.let':
                            var $2905 = self.name;
                            var $2906 = self.expr;
                            var $2907 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2909 = self.name;
                                    var $2910 = self.indx;
                                    var $2911 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2911;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2912 = self.name;
                                    var $2913 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2913;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2914 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2914;
                                    break;
                                case 'Fm.Term.all':
                                    var $2915 = self.eras;
                                    var $2916 = self.self;
                                    var $2917 = self.name;
                                    var $2918 = self.xtyp;
                                    var $2919 = self.body;
                                    var $2920 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2920;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2921 = self.name;
                                    var $2922 = self.body;
                                    var $2923 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2923;
                                    break;
                                case 'Fm.Term.app':
                                    var $2924 = self.func;
                                    var $2925 = self.argm;
                                    var $2926 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2926;
                                    break;
                                case 'Fm.Term.let':
                                    var $2927 = self.name;
                                    var $2928 = self.expr;
                                    var $2929 = self.body;
                                    var _seen$19 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$20 = $2907(Fm$Term$var$($2905, _lv$4));
                                    var _b1_body$21 = $2929(Fm$Term$var$($2927, _lv$4));
                                    var $2930 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2906, $2928, _defs$3, _lv$4, _seen$19))((_eq_expr$22 => {
                                        var $2931 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$20, _b1_body$21, _defs$3, Nat$succ$(_lv$4), _seen$19))((_eq_body$23 => {
                                            var $2932 = Monad$pure$(Fm$Check$monad)((_eq_expr$22 && _eq_body$23));
                                            return $2932;
                                        }));
                                        return $2931;
                                    }));
                                    var $2908 = $2930;
                                    break;
                                case 'Fm.Term.def':
                                    var $2933 = self.name;
                                    var $2934 = self.expr;
                                    var $2935 = self.body;
                                    var $2936 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2936;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2937 = self.done;
                                    var $2938 = self.term;
                                    var $2939 = self.type;
                                    var $2940 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2940;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2941 = self.name;
                                    var $2942 = self.dref;
                                    var $2943 = self.verb;
                                    var $2944 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2944;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2945 = self.path;
                                    var $2946 = Fm$Term$equal$patch$($2945, _a$1);
                                    var $2908 = $2946;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2947 = self.natx;
                                    var $2948 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2948;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2949 = self.chrx;
                                    var $2950 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2950;
                                    break;
                                case 'Fm.Term.str':
                                    var $2951 = self.strx;
                                    var $2952 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2952;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2953 = self.path;
                                    var $2954 = self.expr;
                                    var $2955 = self.name;
                                    var $2956 = self.with;
                                    var $2957 = self.cses;
                                    var $2958 = self.moti;
                                    var $2959 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2959;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2960 = self.orig;
                                    var $2961 = self.expr;
                                    var $2962 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2908 = $2962;
                                    break;
                            };
                            var $2567 = $2908;
                            break;
                        case 'Fm.Term.def':
                            var $2963 = self.name;
                            var $2964 = self.expr;
                            var $2965 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2967 = self.name;
                                    var $2968 = self.indx;
                                    var $2969 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2969;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2970 = self.name;
                                    var $2971 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2971;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2972 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2972;
                                    break;
                                case 'Fm.Term.all':
                                    var $2973 = self.eras;
                                    var $2974 = self.self;
                                    var $2975 = self.name;
                                    var $2976 = self.xtyp;
                                    var $2977 = self.body;
                                    var $2978 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2978;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2979 = self.name;
                                    var $2980 = self.body;
                                    var $2981 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2981;
                                    break;
                                case 'Fm.Term.app':
                                    var $2982 = self.func;
                                    var $2983 = self.argm;
                                    var $2984 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2984;
                                    break;
                                case 'Fm.Term.let':
                                    var $2985 = self.name;
                                    var $2986 = self.expr;
                                    var $2987 = self.body;
                                    var $2988 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2988;
                                    break;
                                case 'Fm.Term.def':
                                    var $2989 = self.name;
                                    var $2990 = self.expr;
                                    var $2991 = self.body;
                                    var $2992 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2992;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2993 = self.done;
                                    var $2994 = self.term;
                                    var $2995 = self.type;
                                    var $2996 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $2996;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2997 = self.name;
                                    var $2998 = self.dref;
                                    var $2999 = self.verb;
                                    var $3000 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3000;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3001 = self.path;
                                    var $3002 = Fm$Term$equal$patch$($3001, _a$1);
                                    var $2966 = $3002;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3003 = self.natx;
                                    var $3004 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3004;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3005 = self.chrx;
                                    var $3006 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3006;
                                    break;
                                case 'Fm.Term.str':
                                    var $3007 = self.strx;
                                    var $3008 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3008;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3009 = self.path;
                                    var $3010 = self.expr;
                                    var $3011 = self.name;
                                    var $3012 = self.with;
                                    var $3013 = self.cses;
                                    var $3014 = self.moti;
                                    var $3015 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3015;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3016 = self.orig;
                                    var $3017 = self.expr;
                                    var $3018 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2966 = $3018;
                                    break;
                            };
                            var $2567 = $2966;
                            break;
                        case 'Fm.Term.ann':
                            var $3019 = self.done;
                            var $3020 = self.term;
                            var $3021 = self.type;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3023 = self.name;
                                    var $3024 = self.indx;
                                    var $3025 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3025;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3026 = self.name;
                                    var $3027 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3027;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3028 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3028;
                                    break;
                                case 'Fm.Term.all':
                                    var $3029 = self.eras;
                                    var $3030 = self.self;
                                    var $3031 = self.name;
                                    var $3032 = self.xtyp;
                                    var $3033 = self.body;
                                    var $3034 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3034;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3035 = self.name;
                                    var $3036 = self.body;
                                    var $3037 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3037;
                                    break;
                                case 'Fm.Term.app':
                                    var $3038 = self.func;
                                    var $3039 = self.argm;
                                    var $3040 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3040;
                                    break;
                                case 'Fm.Term.let':
                                    var $3041 = self.name;
                                    var $3042 = self.expr;
                                    var $3043 = self.body;
                                    var $3044 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3044;
                                    break;
                                case 'Fm.Term.def':
                                    var $3045 = self.name;
                                    var $3046 = self.expr;
                                    var $3047 = self.body;
                                    var $3048 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3048;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3049 = self.done;
                                    var $3050 = self.term;
                                    var $3051 = self.type;
                                    var $3052 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3052;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3053 = self.name;
                                    var $3054 = self.dref;
                                    var $3055 = self.verb;
                                    var $3056 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3056;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3057 = self.path;
                                    var $3058 = Fm$Term$equal$patch$($3057, _a$1);
                                    var $3022 = $3058;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3059 = self.natx;
                                    var $3060 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3060;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3061 = self.chrx;
                                    var $3062 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3062;
                                    break;
                                case 'Fm.Term.str':
                                    var $3063 = self.strx;
                                    var $3064 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3064;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3065 = self.path;
                                    var $3066 = self.expr;
                                    var $3067 = self.name;
                                    var $3068 = self.with;
                                    var $3069 = self.cses;
                                    var $3070 = self.moti;
                                    var $3071 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3071;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3072 = self.orig;
                                    var $3073 = self.expr;
                                    var $3074 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3022 = $3074;
                                    break;
                            };
                            var $2567 = $3022;
                            break;
                        case 'Fm.Term.gol':
                            var $3075 = self.name;
                            var $3076 = self.dref;
                            var $3077 = self.verb;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3079 = self.name;
                                    var $3080 = self.indx;
                                    var $3081 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3081;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3082 = self.name;
                                    var $3083 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3083;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3084 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3084;
                                    break;
                                case 'Fm.Term.all':
                                    var $3085 = self.eras;
                                    var $3086 = self.self;
                                    var $3087 = self.name;
                                    var $3088 = self.xtyp;
                                    var $3089 = self.body;
                                    var $3090 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3090;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3091 = self.name;
                                    var $3092 = self.body;
                                    var $3093 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3093;
                                    break;
                                case 'Fm.Term.app':
                                    var $3094 = self.func;
                                    var $3095 = self.argm;
                                    var $3096 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3096;
                                    break;
                                case 'Fm.Term.let':
                                    var $3097 = self.name;
                                    var $3098 = self.expr;
                                    var $3099 = self.body;
                                    var $3100 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3100;
                                    break;
                                case 'Fm.Term.def':
                                    var $3101 = self.name;
                                    var $3102 = self.expr;
                                    var $3103 = self.body;
                                    var $3104 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3104;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3105 = self.done;
                                    var $3106 = self.term;
                                    var $3107 = self.type;
                                    var $3108 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3108;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3109 = self.name;
                                    var $3110 = self.dref;
                                    var $3111 = self.verb;
                                    var $3112 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3112;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3113 = self.path;
                                    var $3114 = Fm$Term$equal$patch$($3113, _a$1);
                                    var $3078 = $3114;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3115 = self.natx;
                                    var $3116 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3116;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3117 = self.chrx;
                                    var $3118 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3118;
                                    break;
                                case 'Fm.Term.str':
                                    var $3119 = self.strx;
                                    var $3120 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3120;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3121 = self.path;
                                    var $3122 = self.expr;
                                    var $3123 = self.name;
                                    var $3124 = self.with;
                                    var $3125 = self.cses;
                                    var $3126 = self.moti;
                                    var $3127 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3127;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3128 = self.orig;
                                    var $3129 = self.expr;
                                    var $3130 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3078 = $3130;
                                    break;
                            };
                            var $2567 = $3078;
                            break;
                        case 'Fm.Term.hol':
                            var $3131 = self.path;
                            var $3132 = Fm$Term$equal$patch$($3131, _b$2);
                            var $2567 = $3132;
                            break;
                        case 'Fm.Term.nat':
                            var $3133 = self.natx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3135 = self.name;
                                    var $3136 = self.indx;
                                    var $3137 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3137;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3138 = self.name;
                                    var $3139 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3139;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3140 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3140;
                                    break;
                                case 'Fm.Term.all':
                                    var $3141 = self.eras;
                                    var $3142 = self.self;
                                    var $3143 = self.name;
                                    var $3144 = self.xtyp;
                                    var $3145 = self.body;
                                    var $3146 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3146;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3147 = self.name;
                                    var $3148 = self.body;
                                    var $3149 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3149;
                                    break;
                                case 'Fm.Term.app':
                                    var $3150 = self.func;
                                    var $3151 = self.argm;
                                    var $3152 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3152;
                                    break;
                                case 'Fm.Term.let':
                                    var $3153 = self.name;
                                    var $3154 = self.expr;
                                    var $3155 = self.body;
                                    var $3156 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3156;
                                    break;
                                case 'Fm.Term.def':
                                    var $3157 = self.name;
                                    var $3158 = self.expr;
                                    var $3159 = self.body;
                                    var $3160 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3160;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3161 = self.done;
                                    var $3162 = self.term;
                                    var $3163 = self.type;
                                    var $3164 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3164;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3165 = self.name;
                                    var $3166 = self.dref;
                                    var $3167 = self.verb;
                                    var $3168 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3168;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3169 = self.path;
                                    var $3170 = Fm$Term$equal$patch$($3169, _a$1);
                                    var $3134 = $3170;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3171 = self.natx;
                                    var $3172 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3172;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3173 = self.chrx;
                                    var $3174 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3174;
                                    break;
                                case 'Fm.Term.str':
                                    var $3175 = self.strx;
                                    var $3176 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3176;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3177 = self.path;
                                    var $3178 = self.expr;
                                    var $3179 = self.name;
                                    var $3180 = self.with;
                                    var $3181 = self.cses;
                                    var $3182 = self.moti;
                                    var $3183 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3183;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3184 = self.orig;
                                    var $3185 = self.expr;
                                    var $3186 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3134 = $3186;
                                    break;
                            };
                            var $2567 = $3134;
                            break;
                        case 'Fm.Term.chr':
                            var $3187 = self.chrx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3189 = self.name;
                                    var $3190 = self.indx;
                                    var $3191 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3191;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3192 = self.name;
                                    var $3193 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3193;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3194 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3194;
                                    break;
                                case 'Fm.Term.all':
                                    var $3195 = self.eras;
                                    var $3196 = self.self;
                                    var $3197 = self.name;
                                    var $3198 = self.xtyp;
                                    var $3199 = self.body;
                                    var $3200 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3200;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3201 = self.name;
                                    var $3202 = self.body;
                                    var $3203 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3203;
                                    break;
                                case 'Fm.Term.app':
                                    var $3204 = self.func;
                                    var $3205 = self.argm;
                                    var $3206 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3206;
                                    break;
                                case 'Fm.Term.let':
                                    var $3207 = self.name;
                                    var $3208 = self.expr;
                                    var $3209 = self.body;
                                    var $3210 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3210;
                                    break;
                                case 'Fm.Term.def':
                                    var $3211 = self.name;
                                    var $3212 = self.expr;
                                    var $3213 = self.body;
                                    var $3214 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3214;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3215 = self.done;
                                    var $3216 = self.term;
                                    var $3217 = self.type;
                                    var $3218 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3218;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3219 = self.name;
                                    var $3220 = self.dref;
                                    var $3221 = self.verb;
                                    var $3222 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3222;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3223 = self.path;
                                    var $3224 = Fm$Term$equal$patch$($3223, _a$1);
                                    var $3188 = $3224;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3225 = self.natx;
                                    var $3226 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3226;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3227 = self.chrx;
                                    var $3228 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3228;
                                    break;
                                case 'Fm.Term.str':
                                    var $3229 = self.strx;
                                    var $3230 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3230;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3231 = self.path;
                                    var $3232 = self.expr;
                                    var $3233 = self.name;
                                    var $3234 = self.with;
                                    var $3235 = self.cses;
                                    var $3236 = self.moti;
                                    var $3237 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3237;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3238 = self.orig;
                                    var $3239 = self.expr;
                                    var $3240 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3188 = $3240;
                                    break;
                            };
                            var $2567 = $3188;
                            break;
                        case 'Fm.Term.str':
                            var $3241 = self.strx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3243 = self.name;
                                    var $3244 = self.indx;
                                    var $3245 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3245;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3246 = self.name;
                                    var $3247 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3247;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3248 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3248;
                                    break;
                                case 'Fm.Term.all':
                                    var $3249 = self.eras;
                                    var $3250 = self.self;
                                    var $3251 = self.name;
                                    var $3252 = self.xtyp;
                                    var $3253 = self.body;
                                    var $3254 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3254;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3255 = self.name;
                                    var $3256 = self.body;
                                    var $3257 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3257;
                                    break;
                                case 'Fm.Term.app':
                                    var $3258 = self.func;
                                    var $3259 = self.argm;
                                    var $3260 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3260;
                                    break;
                                case 'Fm.Term.let':
                                    var $3261 = self.name;
                                    var $3262 = self.expr;
                                    var $3263 = self.body;
                                    var $3264 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3264;
                                    break;
                                case 'Fm.Term.def':
                                    var $3265 = self.name;
                                    var $3266 = self.expr;
                                    var $3267 = self.body;
                                    var $3268 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3268;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3269 = self.done;
                                    var $3270 = self.term;
                                    var $3271 = self.type;
                                    var $3272 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3272;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3273 = self.name;
                                    var $3274 = self.dref;
                                    var $3275 = self.verb;
                                    var $3276 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3276;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3277 = self.path;
                                    var $3278 = Fm$Term$equal$patch$($3277, _a$1);
                                    var $3242 = $3278;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3279 = self.natx;
                                    var $3280 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3280;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3281 = self.chrx;
                                    var $3282 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3282;
                                    break;
                                case 'Fm.Term.str':
                                    var $3283 = self.strx;
                                    var $3284 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3284;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3285 = self.path;
                                    var $3286 = self.expr;
                                    var $3287 = self.name;
                                    var $3288 = self.with;
                                    var $3289 = self.cses;
                                    var $3290 = self.moti;
                                    var $3291 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3291;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3292 = self.orig;
                                    var $3293 = self.expr;
                                    var $3294 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3242 = $3294;
                                    break;
                            };
                            var $2567 = $3242;
                            break;
                        case 'Fm.Term.cse':
                            var $3295 = self.path;
                            var $3296 = self.expr;
                            var $3297 = self.name;
                            var $3298 = self.with;
                            var $3299 = self.cses;
                            var $3300 = self.moti;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3302 = self.name;
                                    var $3303 = self.indx;
                                    var $3304 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3304;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3305 = self.name;
                                    var $3306 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3306;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3307 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3307;
                                    break;
                                case 'Fm.Term.all':
                                    var $3308 = self.eras;
                                    var $3309 = self.self;
                                    var $3310 = self.name;
                                    var $3311 = self.xtyp;
                                    var $3312 = self.body;
                                    var $3313 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3313;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3314 = self.name;
                                    var $3315 = self.body;
                                    var $3316 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3316;
                                    break;
                                case 'Fm.Term.app':
                                    var $3317 = self.func;
                                    var $3318 = self.argm;
                                    var $3319 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3319;
                                    break;
                                case 'Fm.Term.let':
                                    var $3320 = self.name;
                                    var $3321 = self.expr;
                                    var $3322 = self.body;
                                    var $3323 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3323;
                                    break;
                                case 'Fm.Term.def':
                                    var $3324 = self.name;
                                    var $3325 = self.expr;
                                    var $3326 = self.body;
                                    var $3327 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3327;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3328 = self.done;
                                    var $3329 = self.term;
                                    var $3330 = self.type;
                                    var $3331 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3331;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3332 = self.name;
                                    var $3333 = self.dref;
                                    var $3334 = self.verb;
                                    var $3335 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3335;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3336 = self.path;
                                    var $3337 = Fm$Term$equal$patch$($3336, _a$1);
                                    var $3301 = $3337;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3338 = self.natx;
                                    var $3339 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3339;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3340 = self.chrx;
                                    var $3341 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3341;
                                    break;
                                case 'Fm.Term.str':
                                    var $3342 = self.strx;
                                    var $3343 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3343;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3344 = self.path;
                                    var $3345 = self.expr;
                                    var $3346 = self.name;
                                    var $3347 = self.with;
                                    var $3348 = self.cses;
                                    var $3349 = self.moti;
                                    var $3350 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3350;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3351 = self.orig;
                                    var $3352 = self.expr;
                                    var $3353 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3301 = $3353;
                                    break;
                            };
                            var $2567 = $3301;
                            break;
                        case 'Fm.Term.ori':
                            var $3354 = self.orig;
                            var $3355 = self.expr;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3357 = self.name;
                                    var $3358 = self.indx;
                                    var $3359 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3359;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3360 = self.name;
                                    var $3361 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3361;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3362 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3362;
                                    break;
                                case 'Fm.Term.all':
                                    var $3363 = self.eras;
                                    var $3364 = self.self;
                                    var $3365 = self.name;
                                    var $3366 = self.xtyp;
                                    var $3367 = self.body;
                                    var $3368 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3368;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3369 = self.name;
                                    var $3370 = self.body;
                                    var $3371 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3371;
                                    break;
                                case 'Fm.Term.app':
                                    var $3372 = self.func;
                                    var $3373 = self.argm;
                                    var $3374 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3374;
                                    break;
                                case 'Fm.Term.let':
                                    var $3375 = self.name;
                                    var $3376 = self.expr;
                                    var $3377 = self.body;
                                    var $3378 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3378;
                                    break;
                                case 'Fm.Term.def':
                                    var $3379 = self.name;
                                    var $3380 = self.expr;
                                    var $3381 = self.body;
                                    var $3382 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3382;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3383 = self.done;
                                    var $3384 = self.term;
                                    var $3385 = self.type;
                                    var $3386 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3386;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3387 = self.name;
                                    var $3388 = self.dref;
                                    var $3389 = self.verb;
                                    var $3390 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3390;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3391 = self.path;
                                    var $3392 = Fm$Term$equal$patch$($3391, _a$1);
                                    var $3356 = $3392;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3393 = self.natx;
                                    var $3394 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3394;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3395 = self.chrx;
                                    var $3396 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3396;
                                    break;
                                case 'Fm.Term.str':
                                    var $3397 = self.strx;
                                    var $3398 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3398;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3399 = self.path;
                                    var $3400 = self.expr;
                                    var $3401 = self.name;
                                    var $3402 = self.with;
                                    var $3403 = self.cses;
                                    var $3404 = self.moti;
                                    var $3405 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3405;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3406 = self.orig;
                                    var $3407 = self.expr;
                                    var $3408 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3356 = $3408;
                                    break;
                            };
                            var $2567 = $3356;
                            break;
                    };
                    var $2565 = $2567;
                };
                var $2563 = $2565;
            };
            var $2561 = $2563;
        };
        return $2561;
    };
    const Fm$Term$equal = x0 => x1 => x2 => x3 => x4 => Fm$Term$equal$(x0, x1, x2, x3, x4);
    const Set$new = Map$new;

    function Fm$Term$check$(_term$1, _type$2, _defs$3, _ctx$4, _path$5, _orig$6) {
        var $3409 = Monad$bind$(Fm$Check$monad)((() => {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $3410 = self.name;
                    var $3411 = self.indx;
                    var self = List$at_last$($3411, _ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            var $3413 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $3410), List$nil));
                            var $3412 = $3413;
                            break;
                        case 'Maybe.some':
                            var $3414 = self.value;
                            var $3415 = Monad$pure$(Fm$Check$monad)((() => {
                                var self = $3414;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $3416 = self.fst;
                                        var $3417 = self.snd;
                                        var $3418 = $3417;
                                        return $3418;
                                };
                            })());
                            var $3412 = $3415;
                            break;
                    };
                    return $3412;
                case 'Fm.Term.ref':
                    var $3419 = self.name;
                    var self = Fm$get$($3419, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $3421 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $3419), List$nil));
                            var $3420 = $3421;
                            break;
                        case 'Maybe.some':
                            var $3422 = self.value;
                            var self = $3422;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $3424 = self.file;
                                    var $3425 = self.code;
                                    var $3426 = self.name;
                                    var $3427 = self.term;
                                    var $3428 = self.type;
                                    var $3429 = self.stat;
                                    var _ref_name$15 = $3426;
                                    var _ref_type$16 = $3428;
                                    var _ref_term$17 = $3427;
                                    var _ref_stat$18 = $3429;
                                    var self = _ref_stat$18;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            var $3431 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$waiting$(_ref_name$15), List$nil));
                                            var $3430 = $3431;
                                            break;
                                        case 'Fm.Status.wait':
                                            var $3432 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $3430 = $3432;
                                            break;
                                        case 'Fm.Status.done':
                                            var $3433 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $3430 = $3433;
                                            break;
                                        case 'Fm.Status.fail':
                                            var $3434 = self.errors;
                                            var $3435 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$indirect$(_ref_name$15), List$nil));
                                            var $3430 = $3435;
                                            break;
                                    };
                                    var $3423 = $3430;
                                    break;
                            };
                            var $3420 = $3423;
                            break;
                    };
                    return $3420;
                case 'Fm.Term.typ':
                    var $3436 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                    return $3436;
                case 'Fm.Term.all':
                    var $3437 = self.eras;
                    var $3438 = self.self;
                    var $3439 = self.name;
                    var $3440 = self.xtyp;
                    var $3441 = self.body;
                    var _ctx_size$12 = List$length$(_ctx$4);
                    var _self_var$13 = Fm$Term$var$($3438, _ctx_size$12);
                    var _body_var$14 = Fm$Term$var$($3439, Nat$succ$(_ctx_size$12));
                    var _body_ctx$15 = List$cons$(Pair$new$($3439, $3440), List$cons$(Pair$new$($3438, _term$1), _ctx$4));
                    var $3442 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3440, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$16 => {
                        var $3443 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3441(_self_var$13)(_body_var$14), Maybe$some$(Fm$Term$typ), _defs$3, _body_ctx$15, Fm$MPath$i$(_path$5), _orig$6))((_$17 => {
                            var $3444 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                            return $3444;
                        }));
                        return $3443;
                    }));
                    return $3442;
                case 'Fm.Term.lam':
                    var $3445 = self.name;
                    var $3446 = self.body;
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            var $3448 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                            var $3447 = $3448;
                            break;
                        case 'Maybe.some':
                            var $3449 = self.value;
                            var _typv$10 = Fm$Term$reduce$($3449, _defs$3);
                            var self = _typv$10;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3451 = self.name;
                                    var $3452 = self.indx;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3449);
                                    var $3453 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3450 = $3453;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3454 = self.name;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3449);
                                    var $3455 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3450 = $3455;
                                    break;
                                case 'Fm.Term.typ':
                                    var _expected$11 = Either$left$("Function");
                                    var _detected$12 = Either$right$($3449);
                                    var $3456 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                    var $3450 = $3456;
                                    break;
                                case 'Fm.Term.all':
                                    var $3457 = self.eras;
                                    var $3458 = self.self;
                                    var $3459 = self.name;
                                    var $3460 = self.xtyp;
                                    var $3461 = self.body;
                                    var _ctx_size$16 = List$length$(_ctx$4);
                                    var _self_var$17 = _term$1;
                                    var _body_var$18 = Fm$Term$var$($3445, _ctx_size$16);
                                    var _body_typ$19 = $3461(_self_var$17)(_body_var$18);
                                    var _body_ctx$20 = List$cons$(Pair$new$($3445, $3460), _ctx$4);
                                    var $3462 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3446(_body_var$18), Maybe$some$(_body_typ$19), _defs$3, _body_ctx$20, Fm$MPath$o$(_path$5), _orig$6))((_$21 => {
                                        var $3463 = Monad$pure$(Fm$Check$monad)($3449);
                                        return $3463;
                                    }));
                                    var $3450 = $3462;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3464 = self.name;
                                    var $3465 = self.body;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3449);
                                    var $3466 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3450 = $3466;
                                    break;
                                case 'Fm.Term.app':
                                    var $3467 = self.func;
                                    var $3468 = self.argm;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3449);
                                    var $3469 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3450 = $3469;
                                    break;
                                case 'Fm.Term.let':
                                    var $3470 = self.name;
                                    var $3471 = self.expr;
                                    var $3472 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3449);
                                    var $3473 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3450 = $3473;
                                    break;
                                case 'Fm.Term.def':
                                    var $3474 = self.name;
                                    var $3475 = self.expr;
                                    var $3476 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3449);
                                    var $3477 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3450 = $3477;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3478 = self.done;
                                    var $3479 = self.term;
                                    var $3480 = self.type;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3449);
                                    var $3481 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3450 = $3481;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3482 = self.name;
                                    var $3483 = self.dref;
                                    var $3484 = self.verb;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3449);
                                    var $3485 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3450 = $3485;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3486 = self.path;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3449);
                                    var $3487 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3450 = $3487;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3488 = self.natx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3449);
                                    var $3489 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3450 = $3489;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3490 = self.chrx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3449);
                                    var $3491 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3450 = $3491;
                                    break;
                                case 'Fm.Term.str':
                                    var $3492 = self.strx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3449);
                                    var $3493 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3450 = $3493;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3494 = self.path;
                                    var $3495 = self.expr;
                                    var $3496 = self.name;
                                    var $3497 = self.with;
                                    var $3498 = self.cses;
                                    var $3499 = self.moti;
                                    var _expected$17 = Either$left$("Function");
                                    var _detected$18 = Either$right$($3449);
                                    var $3500 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                    var $3450 = $3500;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3501 = self.orig;
                                    var $3502 = self.expr;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3449);
                                    var $3503 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3450 = $3503;
                                    break;
                            };
                            var $3447 = $3450;
                            break;
                    };
                    return $3447;
                case 'Fm.Term.app':
                    var $3504 = self.func;
                    var $3505 = self.argm;
                    var $3506 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3504, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_func_typ$9 => {
                        var _func_typ$10 = Fm$Term$reduce$(_func_typ$9, _defs$3);
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $3508 = self.name;
                                var $3509 = self.indx;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3510 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3507 = $3510;
                                break;
                            case 'Fm.Term.ref':
                                var $3511 = self.name;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3512 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3507 = $3512;
                                break;
                            case 'Fm.Term.typ':
                                var _expected$11 = Either$left$("Function");
                                var _detected$12 = Either$right$(_func_typ$10);
                                var $3513 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                var $3507 = $3513;
                                break;
                            case 'Fm.Term.all':
                                var $3514 = self.eras;
                                var $3515 = self.self;
                                var $3516 = self.name;
                                var $3517 = self.xtyp;
                                var $3518 = self.body;
                                var $3519 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3505, Maybe$some$($3517), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$16 => {
                                    var $3520 = Monad$pure$(Fm$Check$monad)($3518($3504)($3505));
                                    return $3520;
                                }));
                                var $3507 = $3519;
                                break;
                            case 'Fm.Term.lam':
                                var $3521 = self.name;
                                var $3522 = self.body;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3523 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3507 = $3523;
                                break;
                            case 'Fm.Term.app':
                                var $3524 = self.func;
                                var $3525 = self.argm;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3526 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3507 = $3526;
                                break;
                            case 'Fm.Term.let':
                                var $3527 = self.name;
                                var $3528 = self.expr;
                                var $3529 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3530 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3507 = $3530;
                                break;
                            case 'Fm.Term.def':
                                var $3531 = self.name;
                                var $3532 = self.expr;
                                var $3533 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3534 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3507 = $3534;
                                break;
                            case 'Fm.Term.ann':
                                var $3535 = self.done;
                                var $3536 = self.term;
                                var $3537 = self.type;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3538 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3507 = $3538;
                                break;
                            case 'Fm.Term.gol':
                                var $3539 = self.name;
                                var $3540 = self.dref;
                                var $3541 = self.verb;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3542 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3507 = $3542;
                                break;
                            case 'Fm.Term.hol':
                                var $3543 = self.path;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3544 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3507 = $3544;
                                break;
                            case 'Fm.Term.nat':
                                var $3545 = self.natx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3546 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3507 = $3546;
                                break;
                            case 'Fm.Term.chr':
                                var $3547 = self.chrx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3548 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3507 = $3548;
                                break;
                            case 'Fm.Term.str':
                                var $3549 = self.strx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3550 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3507 = $3550;
                                break;
                            case 'Fm.Term.cse':
                                var $3551 = self.path;
                                var $3552 = self.expr;
                                var $3553 = self.name;
                                var $3554 = self.with;
                                var $3555 = self.cses;
                                var $3556 = self.moti;
                                var _expected$17 = Either$left$("Function");
                                var _detected$18 = Either$right$(_func_typ$10);
                                var $3557 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                var $3507 = $3557;
                                break;
                            case 'Fm.Term.ori':
                                var $3558 = self.orig;
                                var $3559 = self.expr;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3560 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3507 = $3560;
                                break;
                        };
                        return $3507;
                    }));
                    return $3506;
                case 'Fm.Term.let':
                    var $3561 = self.name;
                    var $3562 = self.expr;
                    var $3563 = self.body;
                    var _ctx_size$10 = List$length$(_ctx$4);
                    var $3564 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3562, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_expr_typ$11 => {
                        var _body_val$12 = $3563(Fm$Term$var$($3561, _ctx_size$10));
                        var _body_ctx$13 = List$cons$(Pair$new$($3561, _expr_typ$11), _ctx$4);
                        var $3565 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_body_val$12, _type$2, _defs$3, _body_ctx$13, Fm$MPath$i$(_path$5), _orig$6))((_body_typ$14 => {
                            var $3566 = Monad$pure$(Fm$Check$monad)(_body_typ$14);
                            return $3566;
                        }));
                        return $3565;
                    }));
                    return $3564;
                case 'Fm.Term.def':
                    var $3567 = self.name;
                    var $3568 = self.expr;
                    var $3569 = self.body;
                    var $3570 = Fm$Term$check$($3569($3568), _type$2, _defs$3, _ctx$4, _path$5, _orig$6);
                    return $3570;
                case 'Fm.Term.ann':
                    var $3571 = self.done;
                    var $3572 = self.term;
                    var $3573 = self.type;
                    var self = $3571;
                    if (self) {
                        var $3575 = Monad$pure$(Fm$Check$monad)($3573);
                        var $3574 = $3575;
                    } else {
                        var $3576 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3572, Maybe$some$($3573), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$10 => {
                            var $3577 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3573, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$11 => {
                                var $3578 = Monad$pure$(Fm$Check$monad)($3573);
                                return $3578;
                            }));
                            return $3577;
                        }));
                        var $3574 = $3576;
                    };
                    return $3574;
                case 'Fm.Term.gol':
                    var $3579 = self.name;
                    var $3580 = self.dref;
                    var $3581 = self.verb;
                    var $3582 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$show_goal$($3579, $3580, $3581, _type$2, _ctx$4), List$nil));
                    return $3582;
                case 'Fm.Term.hol':
                    var $3583 = self.path;
                    var $3584 = Fm$Check$result$(_type$2, List$nil);
                    return $3584;
                case 'Fm.Term.nat':
                    var $3585 = self.natx;
                    var $3586 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Nat"));
                    return $3586;
                case 'Fm.Term.chr':
                    var $3587 = self.chrx;
                    var $3588 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Char"));
                    return $3588;
                case 'Fm.Term.str':
                    var $3589 = self.strx;
                    var $3590 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("String"));
                    return $3590;
                case 'Fm.Term.cse':
                    var $3591 = self.path;
                    var $3592 = self.expr;
                    var $3593 = self.name;
                    var $3594 = self.with;
                    var $3595 = self.cses;
                    var $3596 = self.moti;
                    var _expr$13 = $3592;
                    var $3597 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_expr$13, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_etyp$14 => {
                        var self = $3596;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = _type$2;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $3600 = Fm$Term$hol$(Bits$e);
                                        var _moti$15 = $3600;
                                        break;
                                    case 'Maybe.some':
                                        var $3601 = self.value;
                                        var _size$16 = List$length$(_ctx$4);
                                        var _moti$17 = Fm$SmartMotive$make$($3593, $3592, _etyp$14, $3601, _size$16, _defs$3);
                                        var $3602 = _moti$17;
                                        var _moti$15 = $3602;
                                        break;
                                };
                                var $3599 = Maybe$some$(Fm$Term$cse$($3591, $3592, $3593, $3594, $3595, Maybe$some$(_moti$15)));
                                var _dsug$15 = $3599;
                                break;
                            case 'Maybe.some':
                                var $3603 = self.value;
                                var $3604 = Fm$Term$desugar_cse$($3592, $3593, $3594, $3595, $3603, _etyp$14, _defs$3, _ctx$4);
                                var _dsug$15 = $3604;
                                break;
                        };
                        var self = _dsug$15;
                        switch (self._) {
                            case 'Maybe.none':
                                var $3605 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                                var $3598 = $3605;
                                break;
                            case 'Maybe.some':
                                var $3606 = self.value;
                                var $3607 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$patch$(Fm$MPath$to_bits$(_path$5), $3606), List$nil));
                                var $3598 = $3607;
                                break;
                        };
                        return $3598;
                    }));
                    return $3597;
                case 'Fm.Term.ori':
                    var $3608 = self.orig;
                    var $3609 = self.expr;
                    var $3610 = Fm$Term$check$($3609, _type$2, _defs$3, _ctx$4, _path$5, Maybe$some$($3608));
                    return $3610;
            };
        })())((_infr$7 => {
            var self = _type$2;
            switch (self._) {
                case 'Maybe.none':
                    var $3612 = Fm$Check$result$(Maybe$some$(_infr$7), List$nil);
                    var $3611 = $3612;
                    break;
                case 'Maybe.some':
                    var $3613 = self.value;
                    var $3614 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3613, _infr$7, _defs$3, List$length$(_ctx$4), Set$new))((_eqls$9 => {
                        var self = _eqls$9;
                        if (self) {
                            var $3616 = Monad$pure$(Fm$Check$monad)($3613);
                            var $3615 = $3616;
                        } else {
                            var $3617 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, Either$right$($3613), Either$right$(_infr$7), _ctx$4), List$nil));
                            var $3615 = $3617;
                        };
                        return $3615;
                    }));
                    var $3611 = $3614;
                    break;
            };
            return $3611;
        }));
        return $3409;
    };
    const Fm$Term$check = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$check$(x0, x1, x2, x3, x4, x5);

    function Fm$Path$nil$(_x$1) {
        var $3618 = _x$1;
        return $3618;
    };
    const Fm$Path$nil = x0 => Fm$Path$nil$(x0);
    const Fm$MPath$nil = Maybe$some$(Fm$Path$nil);

    function List$is_empty$(_list$2) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $3620 = Bool$true;
                var $3619 = $3620;
                break;
            case 'List.cons':
                var $3621 = self.head;
                var $3622 = self.tail;
                var $3623 = Bool$false;
                var $3619 = $3623;
                break;
        };
        return $3619;
    };
    const List$is_empty = x0 => List$is_empty$(x0);

    function Fm$Term$patch_at$(_path$1, _term$2, _fn$3) {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $3625 = self.name;
                var $3626 = self.indx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3628 = _fn$3(_term$2);
                        var $3627 = $3628;
                        break;
                    case 'o':
                        var $3629 = self.slice(0, -1);
                        var $3630 = _term$2;
                        var $3627 = $3630;
                        break;
                    case 'i':
                        var $3631 = self.slice(0, -1);
                        var $3632 = _term$2;
                        var $3627 = $3632;
                        break;
                };
                var $3624 = $3627;
                break;
            case 'Fm.Term.ref':
                var $3633 = self.name;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3635 = _fn$3(_term$2);
                        var $3634 = $3635;
                        break;
                    case 'o':
                        var $3636 = self.slice(0, -1);
                        var $3637 = _term$2;
                        var $3634 = $3637;
                        break;
                    case 'i':
                        var $3638 = self.slice(0, -1);
                        var $3639 = _term$2;
                        var $3634 = $3639;
                        break;
                };
                var $3624 = $3634;
                break;
            case 'Fm.Term.typ':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3641 = _fn$3(_term$2);
                        var $3640 = $3641;
                        break;
                    case 'o':
                        var $3642 = self.slice(0, -1);
                        var $3643 = _term$2;
                        var $3640 = $3643;
                        break;
                    case 'i':
                        var $3644 = self.slice(0, -1);
                        var $3645 = _term$2;
                        var $3640 = $3645;
                        break;
                };
                var $3624 = $3640;
                break;
            case 'Fm.Term.all':
                var $3646 = self.eras;
                var $3647 = self.self;
                var $3648 = self.name;
                var $3649 = self.xtyp;
                var $3650 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3652 = _fn$3(_term$2);
                        var $3651 = $3652;
                        break;
                    case 'o':
                        var $3653 = self.slice(0, -1);
                        var $3654 = Fm$Term$all$($3646, $3647, $3648, Fm$Term$patch_at$($3653, $3649, _fn$3), $3650);
                        var $3651 = $3654;
                        break;
                    case 'i':
                        var $3655 = self.slice(0, -1);
                        var $3656 = Fm$Term$all$($3646, $3647, $3648, $3649, (_s$10 => _x$11 => {
                            var $3657 = Fm$Term$patch_at$($3655, $3650(_s$10)(_x$11), _fn$3);
                            return $3657;
                        }));
                        var $3651 = $3656;
                        break;
                };
                var $3624 = $3651;
                break;
            case 'Fm.Term.lam':
                var $3658 = self.name;
                var $3659 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3661 = _fn$3(_term$2);
                        var $3660 = $3661;
                        break;
                    case 'o':
                        var $3662 = self.slice(0, -1);
                        var $3663 = Fm$Term$lam$($3658, (_x$7 => {
                            var $3664 = Fm$Term$patch_at$(Bits$tail$(_path$1), $3659(_x$7), _fn$3);
                            return $3664;
                        }));
                        var $3660 = $3663;
                        break;
                    case 'i':
                        var $3665 = self.slice(0, -1);
                        var $3666 = Fm$Term$lam$($3658, (_x$7 => {
                            var $3667 = Fm$Term$patch_at$(Bits$tail$(_path$1), $3659(_x$7), _fn$3);
                            return $3667;
                        }));
                        var $3660 = $3666;
                        break;
                };
                var $3624 = $3660;
                break;
            case 'Fm.Term.app':
                var $3668 = self.func;
                var $3669 = self.argm;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3671 = _fn$3(_term$2);
                        var $3670 = $3671;
                        break;
                    case 'o':
                        var $3672 = self.slice(0, -1);
                        var $3673 = Fm$Term$app$(Fm$Term$patch_at$($3672, $3668, _fn$3), $3669);
                        var $3670 = $3673;
                        break;
                    case 'i':
                        var $3674 = self.slice(0, -1);
                        var $3675 = Fm$Term$app$($3668, Fm$Term$patch_at$($3674, $3669, _fn$3));
                        var $3670 = $3675;
                        break;
                };
                var $3624 = $3670;
                break;
            case 'Fm.Term.let':
                var $3676 = self.name;
                var $3677 = self.expr;
                var $3678 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3680 = _fn$3(_term$2);
                        var $3679 = $3680;
                        break;
                    case 'o':
                        var $3681 = self.slice(0, -1);
                        var $3682 = Fm$Term$let$($3676, Fm$Term$patch_at$($3681, $3677, _fn$3), $3678);
                        var $3679 = $3682;
                        break;
                    case 'i':
                        var $3683 = self.slice(0, -1);
                        var $3684 = Fm$Term$let$($3676, $3677, (_x$8 => {
                            var $3685 = Fm$Term$patch_at$($3683, $3678(_x$8), _fn$3);
                            return $3685;
                        }));
                        var $3679 = $3684;
                        break;
                };
                var $3624 = $3679;
                break;
            case 'Fm.Term.def':
                var $3686 = self.name;
                var $3687 = self.expr;
                var $3688 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3690 = _fn$3(_term$2);
                        var $3689 = $3690;
                        break;
                    case 'o':
                        var $3691 = self.slice(0, -1);
                        var $3692 = Fm$Term$def$($3686, Fm$Term$patch_at$($3691, $3687, _fn$3), $3688);
                        var $3689 = $3692;
                        break;
                    case 'i':
                        var $3693 = self.slice(0, -1);
                        var $3694 = Fm$Term$def$($3686, $3687, (_x$8 => {
                            var $3695 = Fm$Term$patch_at$($3693, $3688(_x$8), _fn$3);
                            return $3695;
                        }));
                        var $3689 = $3694;
                        break;
                };
                var $3624 = $3689;
                break;
            case 'Fm.Term.ann':
                var $3696 = self.done;
                var $3697 = self.term;
                var $3698 = self.type;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3700 = _fn$3(_term$2);
                        var $3699 = $3700;
                        break;
                    case 'o':
                        var $3701 = self.slice(0, -1);
                        var $3702 = Fm$Term$ann$($3696, Fm$Term$patch_at$(_path$1, $3697, _fn$3), $3698);
                        var $3699 = $3702;
                        break;
                    case 'i':
                        var $3703 = self.slice(0, -1);
                        var $3704 = Fm$Term$ann$($3696, Fm$Term$patch_at$(_path$1, $3697, _fn$3), $3698);
                        var $3699 = $3704;
                        break;
                };
                var $3624 = $3699;
                break;
            case 'Fm.Term.gol':
                var $3705 = self.name;
                var $3706 = self.dref;
                var $3707 = self.verb;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3709 = _fn$3(_term$2);
                        var $3708 = $3709;
                        break;
                    case 'o':
                        var $3710 = self.slice(0, -1);
                        var $3711 = _term$2;
                        var $3708 = $3711;
                        break;
                    case 'i':
                        var $3712 = self.slice(0, -1);
                        var $3713 = _term$2;
                        var $3708 = $3713;
                        break;
                };
                var $3624 = $3708;
                break;
            case 'Fm.Term.hol':
                var $3714 = self.path;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3716 = _fn$3(_term$2);
                        var $3715 = $3716;
                        break;
                    case 'o':
                        var $3717 = self.slice(0, -1);
                        var $3718 = _term$2;
                        var $3715 = $3718;
                        break;
                    case 'i':
                        var $3719 = self.slice(0, -1);
                        var $3720 = _term$2;
                        var $3715 = $3720;
                        break;
                };
                var $3624 = $3715;
                break;
            case 'Fm.Term.nat':
                var $3721 = self.natx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3723 = _fn$3(_term$2);
                        var $3722 = $3723;
                        break;
                    case 'o':
                        var $3724 = self.slice(0, -1);
                        var $3725 = _term$2;
                        var $3722 = $3725;
                        break;
                    case 'i':
                        var $3726 = self.slice(0, -1);
                        var $3727 = _term$2;
                        var $3722 = $3727;
                        break;
                };
                var $3624 = $3722;
                break;
            case 'Fm.Term.chr':
                var $3728 = self.chrx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3730 = _fn$3(_term$2);
                        var $3729 = $3730;
                        break;
                    case 'o':
                        var $3731 = self.slice(0, -1);
                        var $3732 = _term$2;
                        var $3729 = $3732;
                        break;
                    case 'i':
                        var $3733 = self.slice(0, -1);
                        var $3734 = _term$2;
                        var $3729 = $3734;
                        break;
                };
                var $3624 = $3729;
                break;
            case 'Fm.Term.str':
                var $3735 = self.strx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3737 = _fn$3(_term$2);
                        var $3736 = $3737;
                        break;
                    case 'o':
                        var $3738 = self.slice(0, -1);
                        var $3739 = _term$2;
                        var $3736 = $3739;
                        break;
                    case 'i':
                        var $3740 = self.slice(0, -1);
                        var $3741 = _term$2;
                        var $3736 = $3741;
                        break;
                };
                var $3624 = $3736;
                break;
            case 'Fm.Term.cse':
                var $3742 = self.path;
                var $3743 = self.expr;
                var $3744 = self.name;
                var $3745 = self.with;
                var $3746 = self.cses;
                var $3747 = self.moti;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3749 = _fn$3(_term$2);
                        var $3748 = $3749;
                        break;
                    case 'o':
                        var $3750 = self.slice(0, -1);
                        var $3751 = _term$2;
                        var $3748 = $3751;
                        break;
                    case 'i':
                        var $3752 = self.slice(0, -1);
                        var $3753 = _term$2;
                        var $3748 = $3753;
                        break;
                };
                var $3624 = $3748;
                break;
            case 'Fm.Term.ori':
                var $3754 = self.orig;
                var $3755 = self.expr;
                var $3756 = Fm$Term$patch_at$(_path$1, $3755, _fn$3);
                var $3624 = $3756;
                break;
        };
        return $3624;
    };
    const Fm$Term$patch_at = x0 => x1 => x2 => Fm$Term$patch_at$(x0, x1, x2);

    function Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, _errs$7, _fixd$8) {
        var self = _errs$7;
        switch (self._) {
            case 'List.nil':
                var self = _fixd$8;
                if (self) {
                    var _type$9 = Fm$Term$bind$(List$nil, (_x$9 => {
                        var $3760 = (_x$9 + '1');
                        return $3760;
                    }), _type$5);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $3761 = (_x$10 + '0');
                        return $3761;
                    }), _term$4);
                    var _defs$11 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$10, _type$9, Fm$Status$init), _defs$6);
                    var $3759 = Monad$pure$(IO$monad)(Maybe$some$(_defs$11));
                    var $3758 = $3759;
                } else {
                    var $3762 = Monad$pure$(IO$monad)(Maybe$none);
                    var $3758 = $3762;
                };
                var $3757 = $3758;
                break;
            case 'List.cons':
                var $3763 = self.head;
                var $3764 = self.tail;
                var self = $3763;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $3766 = self.origin;
                        var $3767 = self.expected;
                        var $3768 = self.detected;
                        var $3769 = self.context;
                        var $3770 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3764, _fixd$8);
                        var $3765 = $3770;
                        break;
                    case 'Fm.Error.show_goal':
                        var $3771 = self.name;
                        var $3772 = self.dref;
                        var $3773 = self.verb;
                        var $3774 = self.goal;
                        var $3775 = self.context;
                        var $3776 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3764, _fixd$8);
                        var $3765 = $3776;
                        break;
                    case 'Fm.Error.waiting':
                        var $3777 = self.name;
                        var $3778 = Monad$bind$(IO$monad)(Fm$Synth$one$($3777, _defs$6))((_defs$12 => {
                            var $3779 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$12, $3764, Bool$true);
                            return $3779;
                        }));
                        var $3765 = $3778;
                        break;
                    case 'Fm.Error.indirect':
                        var $3780 = self.name;
                        var $3781 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3764, _fixd$8);
                        var $3765 = $3781;
                        break;
                    case 'Fm.Error.patch':
                        var $3782 = self.path;
                        var $3783 = self.term;
                        var self = $3782;
                        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                            case 'e':
                                var $3785 = Monad$pure$(IO$monad)(Maybe$none);
                                var $3784 = $3785;
                                break;
                            case 'o':
                                var $3786 = self.slice(0, -1);
                                var _term$14 = Fm$Term$patch_at$($3786, _term$4, (_x$14 => {
                                    var $3788 = $3783;
                                    return $3788;
                                }));
                                var $3787 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$14, _type$5, _defs$6, $3764, Bool$true);
                                var $3784 = $3787;
                                break;
                            case 'i':
                                var $3789 = self.slice(0, -1);
                                var _type$14 = Fm$Term$patch_at$($3789, _type$5, (_x$14 => {
                                    var $3791 = $3783;
                                    return $3791;
                                }));
                                var $3790 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$14, _defs$6, $3764, Bool$true);
                                var $3784 = $3790;
                                break;
                        };
                        var $3765 = $3784;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $3792 = self.origin;
                        var $3793 = self.name;
                        var $3794 = Monad$bind$(IO$monad)(Fm$Synth$one$($3793, _defs$6))((_defs$13 => {
                            var $3795 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$13, $3764, Bool$true);
                            return $3795;
                        }));
                        var $3765 = $3794;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $3796 = self.origin;
                        var $3797 = self.term;
                        var $3798 = self.context;
                        var $3799 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3764, _fixd$8);
                        var $3765 = $3799;
                        break;
                };
                var $3757 = $3765;
                break;
        };
        return $3757;
    };
    const Fm$Synth$fix = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Synth$fix$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Status$fail$(_errors$1) {
        var $3800 = ({
            _: 'Fm.Status.fail',
            'errors': _errors$1
        });
        return $3800;
    };
    const Fm$Status$fail = x0 => Fm$Status$fail$(x0);

    function Fm$Synth$one$(_name$1, _defs$2) {
        var self = Fm$get$(_name$1, _defs$2);
        switch (self._) {
            case 'Maybe.none':
                var $3802 = Monad$bind$(IO$monad)(Fm$Synth$load$(_name$1, _defs$2))((_loaded$3 => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.none':
                            var $3804 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("Undefined: ", List$cons$(_name$1, List$nil)))))((_$4 => {
                                var $3805 = Monad$pure$(IO$monad)(_defs$2);
                                return $3805;
                            }));
                            var $3803 = $3804;
                            break;
                        case 'Maybe.some':
                            var $3806 = self.value;
                            var $3807 = Fm$Synth$one$(_name$1, $3806);
                            var $3803 = $3807;
                            break;
                    };
                    return $3803;
                }));
                var $3801 = $3802;
                break;
            case 'Maybe.some':
                var $3808 = self.value;
                var self = $3808;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $3810 = self.file;
                        var $3811 = self.code;
                        var $3812 = self.name;
                        var $3813 = self.term;
                        var $3814 = self.type;
                        var $3815 = self.stat;
                        var _file$10 = $3810;
                        var _code$11 = $3811;
                        var _name$12 = $3812;
                        var _term$13 = $3813;
                        var _type$14 = $3814;
                        var _stat$15 = $3815;
                        var self = _stat$15;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var _defs$16 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, Fm$Status$wait), _defs$2);
                                var _checked$17 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_type$14, Maybe$some$(Fm$Term$typ), _defs$16, List$nil, Fm$MPath$i$(Fm$MPath$nil), Maybe$none))((_chk_type$17 => {
                                    var $3818 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_term$13, Maybe$some$(_type$14), _defs$16, List$nil, Fm$MPath$o$(Fm$MPath$nil), Maybe$none))((_chk_term$18 => {
                                        var $3819 = Monad$pure$(Fm$Check$monad)(Unit$new);
                                        return $3819;
                                    }));
                                    return $3818;
                                }));
                                var self = _checked$17;
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $3820 = self.value;
                                        var $3821 = self.errors;
                                        var self = List$is_empty$($3821);
                                        if (self) {
                                            var _defs$20 = Fm$define$(_file$10, _code$11, _name$12, _term$13, _type$14, Bool$true, _defs$16);
                                            var $3823 = Monad$pure$(IO$monad)(_defs$20);
                                            var $3822 = $3823;
                                        } else {
                                            var $3824 = Monad$bind$(IO$monad)(Fm$Synth$fix$(_file$10, _code$11, _name$12, _term$13, _type$14, _defs$16, $3821, Bool$false))((_fixed$20 => {
                                                var self = _fixed$20;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        var _stat$21 = Fm$Status$fail$($3821);
                                                        var _defs$22 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, _stat$21), _defs$16);
                                                        var $3826 = Monad$pure$(IO$monad)(_defs$22);
                                                        var $3825 = $3826;
                                                        break;
                                                    case 'Maybe.some':
                                                        var $3827 = self.value;
                                                        var $3828 = Fm$Synth$one$(_name$12, $3827);
                                                        var $3825 = $3828;
                                                        break;
                                                };
                                                return $3825;
                                            }));
                                            var $3822 = $3824;
                                        };
                                        var $3817 = $3822;
                                        break;
                                };
                                var $3816 = $3817;
                                break;
                            case 'Fm.Status.wait':
                                var $3829 = Monad$pure$(IO$monad)(_defs$2);
                                var $3816 = $3829;
                                break;
                            case 'Fm.Status.done':
                                var $3830 = Monad$pure$(IO$monad)(_defs$2);
                                var $3816 = $3830;
                                break;
                            case 'Fm.Status.fail':
                                var $3831 = self.errors;
                                var $3832 = Monad$pure$(IO$monad)(_defs$2);
                                var $3816 = $3832;
                                break;
                        };
                        var $3809 = $3816;
                        break;
                };
                var $3801 = $3809;
                break;
        };
        return $3801;
    };
    const Fm$Synth$one = x0 => x1 => Fm$Synth$one$(x0, x1);

    function Map$values$go$(_xs$2, _list$3) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $3834 = _list$3;
                var $3833 = $3834;
                break;
            case 'Map.tie':
                var $3835 = self.val;
                var $3836 = self.lft;
                var $3837 = self.rgt;
                var self = $3835;
                switch (self._) {
                    case 'Maybe.none':
                        var $3839 = _list$3;
                        var _list0$7 = $3839;
                        break;
                    case 'Maybe.some':
                        var $3840 = self.value;
                        var $3841 = List$cons$($3840, _list$3);
                        var _list0$7 = $3841;
                        break;
                };
                var _list1$8 = Map$values$go$($3836, _list0$7);
                var _list2$9 = Map$values$go$($3837, _list1$8);
                var $3838 = _list2$9;
                var $3833 = $3838;
                break;
        };
        return $3833;
    };
    const Map$values$go = x0 => x1 => Map$values$go$(x0, x1);

    function Map$values$(_xs$2) {
        var $3842 = Map$values$go$(_xs$2, List$nil);
        return $3842;
    };
    const Map$values = x0 => Map$values$(x0);

    function Fm$Name$show$(_name$1) {
        var $3843 = _name$1;
        return $3843;
    };
    const Fm$Name$show = x0 => Fm$Name$show$(x0);

    function Bits$to_nat$(_b$1) {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $3845 = 0n;
                var $3844 = $3845;
                break;
            case 'o':
                var $3846 = self.slice(0, -1);
                var $3847 = (2n * Bits$to_nat$($3846));
                var $3844 = $3847;
                break;
            case 'i':
                var $3848 = self.slice(0, -1);
                var $3849 = Nat$succ$((2n * Bits$to_nat$($3848)));
                var $3844 = $3849;
                break;
        };
        return $3844;
    };
    const Bits$to_nat = x0 => Bits$to_nat$(x0);

    function U16$show_hex$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $3851 = u16_to_word(self);
                var $3852 = Nat$to_string_base$(16n, Bits$to_nat$(Word$to_bits$($3851)));
                var $3850 = $3852;
                break;
        };
        return $3850;
    };
    const U16$show_hex = x0 => U16$show_hex$(x0);

    function Fm$escape$char$(_chr$1) {
        var self = (_chr$1 === Fm$backslash);
        if (self) {
            var $3854 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
            var $3853 = $3854;
        } else {
            var self = (_chr$1 === 34);
            if (self) {
                var $3856 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                var $3855 = $3856;
            } else {
                var self = (_chr$1 === 39);
                if (self) {
                    var $3858 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                    var $3857 = $3858;
                } else {
                    var self = U16$btw$(32, _chr$1, 126);
                    if (self) {
                        var $3860 = String$cons$(_chr$1, String$nil);
                        var $3859 = $3860;
                    } else {
                        var $3861 = String$flatten$(List$cons$(String$cons$(Fm$backslash, String$nil), List$cons$("u{", List$cons$(U16$show_hex$(_chr$1), List$cons$("}", List$cons$(String$nil, List$nil))))));
                        var $3859 = $3861;
                    };
                    var $3857 = $3859;
                };
                var $3855 = $3857;
            };
            var $3853 = $3855;
        };
        return $3853;
    };
    const Fm$escape$char = x0 => Fm$escape$char$(x0);

    function Fm$escape$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $3863 = String$nil;
            var $3862 = $3863;
        } else {
            var $3864 = self.charCodeAt(0);
            var $3865 = self.slice(1);
            var _head$4 = Fm$escape$char$($3864);
            var _tail$5 = Fm$escape$($3865);
            var $3866 = (_head$4 + _tail$5);
            var $3862 = $3866;
        };
        return $3862;
    };
    const Fm$escape = x0 => Fm$escape$(x0);

    function Fm$Term$core$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $3868 = self.name;
                var $3869 = self.indx;
                var $3870 = Fm$Name$show$($3868);
                var $3867 = $3870;
                break;
            case 'Fm.Term.ref':
                var $3871 = self.name;
                var $3872 = Fm$Name$show$($3871);
                var $3867 = $3872;
                break;
            case 'Fm.Term.typ':
                var $3873 = "*";
                var $3867 = $3873;
                break;
            case 'Fm.Term.all':
                var $3874 = self.eras;
                var $3875 = self.self;
                var $3876 = self.name;
                var $3877 = self.xtyp;
                var $3878 = self.body;
                var _eras$7 = $3874;
                var self = _eras$7;
                if (self) {
                    var $3880 = "%";
                    var _init$8 = $3880;
                } else {
                    var $3881 = "@";
                    var _init$8 = $3881;
                };
                var _self$9 = Fm$Name$show$($3875);
                var _name$10 = Fm$Name$show$($3876);
                var _xtyp$11 = Fm$Term$core$($3877);
                var _body$12 = Fm$Term$core$($3878(Fm$Term$var$($3875, 0n))(Fm$Term$var$($3876, 0n)));
                var $3879 = String$flatten$(List$cons$(_init$8, List$cons$(_self$9, List$cons$("(", List$cons$(_name$10, List$cons$(":", List$cons$(_xtyp$11, List$cons$(") ", List$cons$(_body$12, List$nil)))))))));
                var $3867 = $3879;
                break;
            case 'Fm.Term.lam':
                var $3882 = self.name;
                var $3883 = self.body;
                var _name$4 = Fm$Name$show$($3882);
                var _body$5 = Fm$Term$core$($3883(Fm$Term$var$($3882, 0n)));
                var $3884 = String$flatten$(List$cons$("#", List$cons$(_name$4, List$cons$(" ", List$cons$(_body$5, List$nil)))));
                var $3867 = $3884;
                break;
            case 'Fm.Term.app':
                var $3885 = self.func;
                var $3886 = self.argm;
                var _func$4 = Fm$Term$core$($3885);
                var _argm$5 = Fm$Term$core$($3886);
                var $3887 = String$flatten$(List$cons$("(", List$cons$(_func$4, List$cons$(" ", List$cons$(_argm$5, List$cons$(")", List$nil))))));
                var $3867 = $3887;
                break;
            case 'Fm.Term.let':
                var $3888 = self.name;
                var $3889 = self.expr;
                var $3890 = self.body;
                var _name$5 = Fm$Name$show$($3888);
                var _expr$6 = Fm$Term$core$($3889);
                var _body$7 = Fm$Term$core$($3890(Fm$Term$var$($3888, 0n)));
                var $3891 = String$flatten$(List$cons$("!", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $3867 = $3891;
                break;
            case 'Fm.Term.def':
                var $3892 = self.name;
                var $3893 = self.expr;
                var $3894 = self.body;
                var _name$5 = Fm$Name$show$($3892);
                var _expr$6 = Fm$Term$core$($3893);
                var _body$7 = Fm$Term$core$($3894(Fm$Term$var$($3892, 0n)));
                var $3895 = String$flatten$(List$cons$("$", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $3867 = $3895;
                break;
            case 'Fm.Term.ann':
                var $3896 = self.done;
                var $3897 = self.term;
                var $3898 = self.type;
                var _term$5 = Fm$Term$core$($3897);
                var _type$6 = Fm$Term$core$($3898);
                var $3899 = String$flatten$(List$cons$("{", List$cons$(_term$5, List$cons$(":", List$cons$(_type$6, List$cons$("}", List$nil))))));
                var $3867 = $3899;
                break;
            case 'Fm.Term.gol':
                var $3900 = self.name;
                var $3901 = self.dref;
                var $3902 = self.verb;
                var $3903 = "<GOL>";
                var $3867 = $3903;
                break;
            case 'Fm.Term.hol':
                var $3904 = self.path;
                var $3905 = "<HOL>";
                var $3867 = $3905;
                break;
            case 'Fm.Term.nat':
                var $3906 = self.natx;
                var $3907 = String$flatten$(List$cons$("+", List$cons$(Nat$show$($3906), List$nil)));
                var $3867 = $3907;
                break;
            case 'Fm.Term.chr':
                var $3908 = self.chrx;
                var $3909 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($3908), List$cons$("\'", List$nil))));
                var $3867 = $3909;
                break;
            case 'Fm.Term.str':
                var $3910 = self.strx;
                var $3911 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($3910), List$cons$("\"", List$nil))));
                var $3867 = $3911;
                break;
            case 'Fm.Term.cse':
                var $3912 = self.path;
                var $3913 = self.expr;
                var $3914 = self.name;
                var $3915 = self.with;
                var $3916 = self.cses;
                var $3917 = self.moti;
                var $3918 = "<CSE>";
                var $3867 = $3918;
                break;
            case 'Fm.Term.ori':
                var $3919 = self.orig;
                var $3920 = self.expr;
                var $3921 = Fm$Term$core$($3920);
                var $3867 = $3921;
                break;
        };
        return $3867;
    };
    const Fm$Term$core = x0 => Fm$Term$core$(x0);

    function Fm$Defs$core$(_defs$1) {
        var _result$2 = "";
        var _result$3 = (() => {
            var $3924 = _result$2;
            var $3925 = Map$values$(_defs$1);
            let _result$4 = $3924;
            let _defn$3;
            while ($3925._ === 'List.cons') {
                _defn$3 = $3925.head;
                var self = _defn$3;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $3926 = self.file;
                        var $3927 = self.code;
                        var $3928 = self.name;
                        var $3929 = self.term;
                        var $3930 = self.type;
                        var $3931 = self.stat;
                        var self = $3931;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var $3933 = _result$4;
                                var $3932 = $3933;
                                break;
                            case 'Fm.Status.wait':
                                var $3934 = _result$4;
                                var $3932 = $3934;
                                break;
                            case 'Fm.Status.done':
                                var _name$11 = $3928;
                                var _term$12 = Fm$Term$core$($3929);
                                var _type$13 = Fm$Term$core$($3930);
                                var $3935 = String$flatten$(List$cons$(_result$4, List$cons$(_name$11, List$cons$(" : ", List$cons$(_type$13, List$cons$(" = ", List$cons$(_term$12, List$cons$(";\u{a}", List$nil))))))));
                                var $3932 = $3935;
                                break;
                            case 'Fm.Status.fail':
                                var $3936 = self.errors;
                                var $3937 = _result$4;
                                var $3932 = $3937;
                                break;
                        };
                        var $3924 = $3932;
                        break;
                };
                _result$4 = $3924;
                $3925 = $3925.tail;
            }
            return _result$4;
        })();
        var $3922 = _result$3;
        return $3922;
    };
    const Fm$Defs$core = x0 => Fm$Defs$core$(x0);

    function Fm$to_core$io$one$(_name$1) {
        var $3938 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $3939 = Monad$pure$(IO$monad)(Fm$Defs$core$(_defs$2));
            return $3939;
        }));
        return $3938;
    };
    const Fm$to_core$io$one = x0 => Fm$to_core$io$one$(x0);

    function Maybe$bind$(_m$3, _f$4) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $3941 = Maybe$none;
                var $3940 = $3941;
                break;
            case 'Maybe.some':
                var $3942 = self.value;
                var $3943 = _f$4($3942);
                var $3940 = $3943;
                break;
        };
        return $3940;
    };
    const Maybe$bind = x0 => x1 => Maybe$bind$(x0, x1);
    const Maybe$monad = Monad$new$(Maybe$bind, Maybe$some);

    function Fm$Term$show$as_nat$go$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $3945 = self.name;
                var $3946 = self.indx;
                var $3947 = Maybe$none;
                var $3944 = $3947;
                break;
            case 'Fm.Term.ref':
                var $3948 = self.name;
                var self = ($3948 === "Nat.zero");
                if (self) {
                    var $3950 = Maybe$some$(0n);
                    var $3949 = $3950;
                } else {
                    var $3951 = Maybe$none;
                    var $3949 = $3951;
                };
                var $3944 = $3949;
                break;
            case 'Fm.Term.typ':
                var $3952 = Maybe$none;
                var $3944 = $3952;
                break;
            case 'Fm.Term.all':
                var $3953 = self.eras;
                var $3954 = self.self;
                var $3955 = self.name;
                var $3956 = self.xtyp;
                var $3957 = self.body;
                var $3958 = Maybe$none;
                var $3944 = $3958;
                break;
            case 'Fm.Term.lam':
                var $3959 = self.name;
                var $3960 = self.body;
                var $3961 = Maybe$none;
                var $3944 = $3961;
                break;
            case 'Fm.Term.app':
                var $3962 = self.func;
                var $3963 = self.argm;
                var self = $3962;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3965 = self.name;
                        var $3966 = self.indx;
                        var $3967 = Maybe$none;
                        var $3964 = $3967;
                        break;
                    case 'Fm.Term.ref':
                        var $3968 = self.name;
                        var self = ($3968 === "Nat.succ");
                        if (self) {
                            var $3970 = Monad$bind$(Maybe$monad)(Fm$Term$show$as_nat$go$($3963))((_pred$5 => {
                                var $3971 = Monad$pure$(Maybe$monad)(Nat$succ$(_pred$5));
                                return $3971;
                            }));
                            var $3969 = $3970;
                        } else {
                            var $3972 = Maybe$none;
                            var $3969 = $3972;
                        };
                        var $3964 = $3969;
                        break;
                    case 'Fm.Term.typ':
                        var $3973 = Maybe$none;
                        var $3964 = $3973;
                        break;
                    case 'Fm.Term.all':
                        var $3974 = self.eras;
                        var $3975 = self.self;
                        var $3976 = self.name;
                        var $3977 = self.xtyp;
                        var $3978 = self.body;
                        var $3979 = Maybe$none;
                        var $3964 = $3979;
                        break;
                    case 'Fm.Term.lam':
                        var $3980 = self.name;
                        var $3981 = self.body;
                        var $3982 = Maybe$none;
                        var $3964 = $3982;
                        break;
                    case 'Fm.Term.app':
                        var $3983 = self.func;
                        var $3984 = self.argm;
                        var $3985 = Maybe$none;
                        var $3964 = $3985;
                        break;
                    case 'Fm.Term.let':
                        var $3986 = self.name;
                        var $3987 = self.expr;
                        var $3988 = self.body;
                        var $3989 = Maybe$none;
                        var $3964 = $3989;
                        break;
                    case 'Fm.Term.def':
                        var $3990 = self.name;
                        var $3991 = self.expr;
                        var $3992 = self.body;
                        var $3993 = Maybe$none;
                        var $3964 = $3993;
                        break;
                    case 'Fm.Term.ann':
                        var $3994 = self.done;
                        var $3995 = self.term;
                        var $3996 = self.type;
                        var $3997 = Maybe$none;
                        var $3964 = $3997;
                        break;
                    case 'Fm.Term.gol':
                        var $3998 = self.name;
                        var $3999 = self.dref;
                        var $4000 = self.verb;
                        var $4001 = Maybe$none;
                        var $3964 = $4001;
                        break;
                    case 'Fm.Term.hol':
                        var $4002 = self.path;
                        var $4003 = Maybe$none;
                        var $3964 = $4003;
                        break;
                    case 'Fm.Term.nat':
                        var $4004 = self.natx;
                        var $4005 = Maybe$none;
                        var $3964 = $4005;
                        break;
                    case 'Fm.Term.chr':
                        var $4006 = self.chrx;
                        var $4007 = Maybe$none;
                        var $3964 = $4007;
                        break;
                    case 'Fm.Term.str':
                        var $4008 = self.strx;
                        var $4009 = Maybe$none;
                        var $3964 = $4009;
                        break;
                    case 'Fm.Term.cse':
                        var $4010 = self.path;
                        var $4011 = self.expr;
                        var $4012 = self.name;
                        var $4013 = self.with;
                        var $4014 = self.cses;
                        var $4015 = self.moti;
                        var $4016 = Maybe$none;
                        var $3964 = $4016;
                        break;
                    case 'Fm.Term.ori':
                        var $4017 = self.orig;
                        var $4018 = self.expr;
                        var $4019 = Maybe$none;
                        var $3964 = $4019;
                        break;
                };
                var $3944 = $3964;
                break;
            case 'Fm.Term.let':
                var $4020 = self.name;
                var $4021 = self.expr;
                var $4022 = self.body;
                var $4023 = Maybe$none;
                var $3944 = $4023;
                break;
            case 'Fm.Term.def':
                var $4024 = self.name;
                var $4025 = self.expr;
                var $4026 = self.body;
                var $4027 = Maybe$none;
                var $3944 = $4027;
                break;
            case 'Fm.Term.ann':
                var $4028 = self.done;
                var $4029 = self.term;
                var $4030 = self.type;
                var $4031 = Maybe$none;
                var $3944 = $4031;
                break;
            case 'Fm.Term.gol':
                var $4032 = self.name;
                var $4033 = self.dref;
                var $4034 = self.verb;
                var $4035 = Maybe$none;
                var $3944 = $4035;
                break;
            case 'Fm.Term.hol':
                var $4036 = self.path;
                var $4037 = Maybe$none;
                var $3944 = $4037;
                break;
            case 'Fm.Term.nat':
                var $4038 = self.natx;
                var $4039 = Maybe$none;
                var $3944 = $4039;
                break;
            case 'Fm.Term.chr':
                var $4040 = self.chrx;
                var $4041 = Maybe$none;
                var $3944 = $4041;
                break;
            case 'Fm.Term.str':
                var $4042 = self.strx;
                var $4043 = Maybe$none;
                var $3944 = $4043;
                break;
            case 'Fm.Term.cse':
                var $4044 = self.path;
                var $4045 = self.expr;
                var $4046 = self.name;
                var $4047 = self.with;
                var $4048 = self.cses;
                var $4049 = self.moti;
                var $4050 = Maybe$none;
                var $3944 = $4050;
                break;
            case 'Fm.Term.ori':
                var $4051 = self.orig;
                var $4052 = self.expr;
                var $4053 = Maybe$none;
                var $3944 = $4053;
                break;
        };
        return $3944;
    };
    const Fm$Term$show$as_nat$go = x0 => Fm$Term$show$as_nat$go$(x0);

    function Fm$Term$show$as_nat$(_term$1) {
        var $4054 = Maybe$mapped$(Fm$Term$show$as_nat$go$(_term$1), Nat$show);
        return $4054;
    };
    const Fm$Term$show$as_nat = x0 => Fm$Term$show$as_nat$(x0);

    function Fm$Term$show$is_ref$(_term$1, _name$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4056 = self.name;
                var $4057 = self.indx;
                var $4058 = Bool$false;
                var $4055 = $4058;
                break;
            case 'Fm.Term.ref':
                var $4059 = self.name;
                var $4060 = (_name$2 === $4059);
                var $4055 = $4060;
                break;
            case 'Fm.Term.typ':
                var $4061 = Bool$false;
                var $4055 = $4061;
                break;
            case 'Fm.Term.all':
                var $4062 = self.eras;
                var $4063 = self.self;
                var $4064 = self.name;
                var $4065 = self.xtyp;
                var $4066 = self.body;
                var $4067 = Bool$false;
                var $4055 = $4067;
                break;
            case 'Fm.Term.lam':
                var $4068 = self.name;
                var $4069 = self.body;
                var $4070 = Bool$false;
                var $4055 = $4070;
                break;
            case 'Fm.Term.app':
                var $4071 = self.func;
                var $4072 = self.argm;
                var $4073 = Bool$false;
                var $4055 = $4073;
                break;
            case 'Fm.Term.let':
                var $4074 = self.name;
                var $4075 = self.expr;
                var $4076 = self.body;
                var $4077 = Bool$false;
                var $4055 = $4077;
                break;
            case 'Fm.Term.def':
                var $4078 = self.name;
                var $4079 = self.expr;
                var $4080 = self.body;
                var $4081 = Bool$false;
                var $4055 = $4081;
                break;
            case 'Fm.Term.ann':
                var $4082 = self.done;
                var $4083 = self.term;
                var $4084 = self.type;
                var $4085 = Bool$false;
                var $4055 = $4085;
                break;
            case 'Fm.Term.gol':
                var $4086 = self.name;
                var $4087 = self.dref;
                var $4088 = self.verb;
                var $4089 = Bool$false;
                var $4055 = $4089;
                break;
            case 'Fm.Term.hol':
                var $4090 = self.path;
                var $4091 = Bool$false;
                var $4055 = $4091;
                break;
            case 'Fm.Term.nat':
                var $4092 = self.natx;
                var $4093 = Bool$false;
                var $4055 = $4093;
                break;
            case 'Fm.Term.chr':
                var $4094 = self.chrx;
                var $4095 = Bool$false;
                var $4055 = $4095;
                break;
            case 'Fm.Term.str':
                var $4096 = self.strx;
                var $4097 = Bool$false;
                var $4055 = $4097;
                break;
            case 'Fm.Term.cse':
                var $4098 = self.path;
                var $4099 = self.expr;
                var $4100 = self.name;
                var $4101 = self.with;
                var $4102 = self.cses;
                var $4103 = self.moti;
                var $4104 = Bool$false;
                var $4055 = $4104;
                break;
            case 'Fm.Term.ori':
                var $4105 = self.orig;
                var $4106 = self.expr;
                var $4107 = Bool$false;
                var $4055 = $4107;
                break;
        };
        return $4055;
    };
    const Fm$Term$show$is_ref = x0 => x1 => Fm$Term$show$is_ref$(x0, x1);
    const Nat$eql = a0 => a1 => (a0 === a1);

    function Fm$Term$show$app$(_term$1, _path$2, _args$3) {
        var Fm$Term$show$app$ = (_term$1, _path$2, _args$3) => ({
            ctr: 'TCO',
            arg: [_term$1, _path$2, _args$3]
        });
        var Fm$Term$show$app = _term$1 => _path$2 => _args$3 => Fm$Term$show$app$(_term$1, _path$2, _args$3);
        var arg = [_term$1, _path$2, _args$3];
        while (true) {
            let [_term$1, _path$2, _args$3] = arg;
            var R = (() => {
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $4108 = self.name;
                        var $4109 = self.indx;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4111 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4110 = $4111;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4113 = Bool$false;
                                var _wrap$8 = $4113;
                            } else {
                                var $4114 = self.charCodeAt(0);
                                var $4115 = self.slice(1);
                                var $4116 = ($4114 === 40);
                                var _wrap$8 = $4116;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4117 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4117;
                            } else {
                                var $4118 = _func$7;
                                var _func$10 = $4118;
                            };
                            var $4112 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4110 = $4112;
                        };
                        return $4110;
                    case 'Fm.Term.ref':
                        var $4119 = self.name;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4121 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4120 = $4121;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4123 = Bool$false;
                                var _wrap$7 = $4123;
                            } else {
                                var $4124 = self.charCodeAt(0);
                                var $4125 = self.slice(1);
                                var $4126 = ($4124 === 40);
                                var _wrap$7 = $4126;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4127 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4127;
                            } else {
                                var $4128 = _func$6;
                                var _func$9 = $4128;
                            };
                            var $4122 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4120 = $4122;
                        };
                        return $4120;
                    case 'Fm.Term.typ':
                        var _arity$4 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$4 === 3n));
                        if (self) {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$6 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$7 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4130 = String$flatten$(List$cons$(_eq_lft$6, List$cons$(" == ", List$cons$(_eq_rgt$7, List$nil))));
                            var $4129 = $4130;
                        } else {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$5;
                            if (self.length === 0) {
                                var $4132 = Bool$false;
                                var _wrap$6 = $4132;
                            } else {
                                var $4133 = self.charCodeAt(0);
                                var $4134 = self.slice(1);
                                var $4135 = ($4133 === 40);
                                var _wrap$6 = $4135;
                            };
                            var _args$7 = String$join$(",", _args$3);
                            var self = _wrap$6;
                            if (self) {
                                var $4136 = String$flatten$(List$cons$("(", List$cons$(_func$5, List$cons$(")", List$nil))));
                                var _func$8 = $4136;
                            } else {
                                var $4137 = _func$5;
                                var _func$8 = $4137;
                            };
                            var $4131 = String$flatten$(List$cons$(_func$8, List$cons$("(", List$cons$(_args$7, List$cons$(")", List$nil)))));
                            var $4129 = $4131;
                        };
                        return $4129;
                    case 'Fm.Term.all':
                        var $4138 = self.eras;
                        var $4139 = self.self;
                        var $4140 = self.name;
                        var $4141 = self.xtyp;
                        var $4142 = self.body;
                        var _arity$9 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$9 === 3n));
                        if (self) {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$11 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$12 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4144 = String$flatten$(List$cons$(_eq_lft$11, List$cons$(" == ", List$cons$(_eq_rgt$12, List$nil))));
                            var $4143 = $4144;
                        } else {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$10;
                            if (self.length === 0) {
                                var $4146 = Bool$false;
                                var _wrap$11 = $4146;
                            } else {
                                var $4147 = self.charCodeAt(0);
                                var $4148 = self.slice(1);
                                var $4149 = ($4147 === 40);
                                var _wrap$11 = $4149;
                            };
                            var _args$12 = String$join$(",", _args$3);
                            var self = _wrap$11;
                            if (self) {
                                var $4150 = String$flatten$(List$cons$("(", List$cons$(_func$10, List$cons$(")", List$nil))));
                                var _func$13 = $4150;
                            } else {
                                var $4151 = _func$10;
                                var _func$13 = $4151;
                            };
                            var $4145 = String$flatten$(List$cons$(_func$13, List$cons$("(", List$cons$(_args$12, List$cons$(")", List$nil)))));
                            var $4143 = $4145;
                        };
                        return $4143;
                    case 'Fm.Term.lam':
                        var $4152 = self.name;
                        var $4153 = self.body;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4155 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4154 = $4155;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4157 = Bool$false;
                                var _wrap$8 = $4157;
                            } else {
                                var $4158 = self.charCodeAt(0);
                                var $4159 = self.slice(1);
                                var $4160 = ($4158 === 40);
                                var _wrap$8 = $4160;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4161 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4161;
                            } else {
                                var $4162 = _func$7;
                                var _func$10 = $4162;
                            };
                            var $4156 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4154 = $4156;
                        };
                        return $4154;
                    case 'Fm.Term.app':
                        var $4163 = self.func;
                        var $4164 = self.argm;
                        var _argm$6 = Fm$Term$show$go$($4164, Fm$MPath$i$(_path$2));
                        var $4165 = Fm$Term$show$app$($4163, Fm$MPath$o$(_path$2), List$cons$(_argm$6, _args$3));
                        return $4165;
                    case 'Fm.Term.let':
                        var $4166 = self.name;
                        var $4167 = self.expr;
                        var $4168 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4170 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4169 = $4170;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4172 = Bool$false;
                                var _wrap$9 = $4172;
                            } else {
                                var $4173 = self.charCodeAt(0);
                                var $4174 = self.slice(1);
                                var $4175 = ($4173 === 40);
                                var _wrap$9 = $4175;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4176 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4176;
                            } else {
                                var $4177 = _func$8;
                                var _func$11 = $4177;
                            };
                            var $4171 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4169 = $4171;
                        };
                        return $4169;
                    case 'Fm.Term.def':
                        var $4178 = self.name;
                        var $4179 = self.expr;
                        var $4180 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4182 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4181 = $4182;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4184 = Bool$false;
                                var _wrap$9 = $4184;
                            } else {
                                var $4185 = self.charCodeAt(0);
                                var $4186 = self.slice(1);
                                var $4187 = ($4185 === 40);
                                var _wrap$9 = $4187;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4188 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4188;
                            } else {
                                var $4189 = _func$8;
                                var _func$11 = $4189;
                            };
                            var $4183 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4181 = $4183;
                        };
                        return $4181;
                    case 'Fm.Term.ann':
                        var $4190 = self.done;
                        var $4191 = self.term;
                        var $4192 = self.type;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4194 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4193 = $4194;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4196 = Bool$false;
                                var _wrap$9 = $4196;
                            } else {
                                var $4197 = self.charCodeAt(0);
                                var $4198 = self.slice(1);
                                var $4199 = ($4197 === 40);
                                var _wrap$9 = $4199;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4200 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4200;
                            } else {
                                var $4201 = _func$8;
                                var _func$11 = $4201;
                            };
                            var $4195 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4193 = $4195;
                        };
                        return $4193;
                    case 'Fm.Term.gol':
                        var $4202 = self.name;
                        var $4203 = self.dref;
                        var $4204 = self.verb;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4206 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4205 = $4206;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4208 = Bool$false;
                                var _wrap$9 = $4208;
                            } else {
                                var $4209 = self.charCodeAt(0);
                                var $4210 = self.slice(1);
                                var $4211 = ($4209 === 40);
                                var _wrap$9 = $4211;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4212 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4212;
                            } else {
                                var $4213 = _func$8;
                                var _func$11 = $4213;
                            };
                            var $4207 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4205 = $4207;
                        };
                        return $4205;
                    case 'Fm.Term.hol':
                        var $4214 = self.path;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4216 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4215 = $4216;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4218 = Bool$false;
                                var _wrap$7 = $4218;
                            } else {
                                var $4219 = self.charCodeAt(0);
                                var $4220 = self.slice(1);
                                var $4221 = ($4219 === 40);
                                var _wrap$7 = $4221;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4222 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4222;
                            } else {
                                var $4223 = _func$6;
                                var _func$9 = $4223;
                            };
                            var $4217 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4215 = $4217;
                        };
                        return $4215;
                    case 'Fm.Term.nat':
                        var $4224 = self.natx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4226 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4225 = $4226;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4228 = Bool$false;
                                var _wrap$7 = $4228;
                            } else {
                                var $4229 = self.charCodeAt(0);
                                var $4230 = self.slice(1);
                                var $4231 = ($4229 === 40);
                                var _wrap$7 = $4231;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4232 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4232;
                            } else {
                                var $4233 = _func$6;
                                var _func$9 = $4233;
                            };
                            var $4227 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4225 = $4227;
                        };
                        return $4225;
                    case 'Fm.Term.chr':
                        var $4234 = self.chrx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4236 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4235 = $4236;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4238 = Bool$false;
                                var _wrap$7 = $4238;
                            } else {
                                var $4239 = self.charCodeAt(0);
                                var $4240 = self.slice(1);
                                var $4241 = ($4239 === 40);
                                var _wrap$7 = $4241;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4242 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4242;
                            } else {
                                var $4243 = _func$6;
                                var _func$9 = $4243;
                            };
                            var $4237 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4235 = $4237;
                        };
                        return $4235;
                    case 'Fm.Term.str':
                        var $4244 = self.strx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4246 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4245 = $4246;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4248 = Bool$false;
                                var _wrap$7 = $4248;
                            } else {
                                var $4249 = self.charCodeAt(0);
                                var $4250 = self.slice(1);
                                var $4251 = ($4249 === 40);
                                var _wrap$7 = $4251;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4252 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4252;
                            } else {
                                var $4253 = _func$6;
                                var _func$9 = $4253;
                            };
                            var $4247 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4245 = $4247;
                        };
                        return $4245;
                    case 'Fm.Term.cse':
                        var $4254 = self.path;
                        var $4255 = self.expr;
                        var $4256 = self.name;
                        var $4257 = self.with;
                        var $4258 = self.cses;
                        var $4259 = self.moti;
                        var _arity$10 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$10 === 3n));
                        if (self) {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$12 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$13 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4261 = String$flatten$(List$cons$(_eq_lft$12, List$cons$(" == ", List$cons$(_eq_rgt$13, List$nil))));
                            var $4260 = $4261;
                        } else {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$11;
                            if (self.length === 0) {
                                var $4263 = Bool$false;
                                var _wrap$12 = $4263;
                            } else {
                                var $4264 = self.charCodeAt(0);
                                var $4265 = self.slice(1);
                                var $4266 = ($4264 === 40);
                                var _wrap$12 = $4266;
                            };
                            var _args$13 = String$join$(",", _args$3);
                            var self = _wrap$12;
                            if (self) {
                                var $4267 = String$flatten$(List$cons$("(", List$cons$(_func$11, List$cons$(")", List$nil))));
                                var _func$14 = $4267;
                            } else {
                                var $4268 = _func$11;
                                var _func$14 = $4268;
                            };
                            var $4262 = String$flatten$(List$cons$(_func$14, List$cons$("(", List$cons$(_args$13, List$cons$(")", List$nil)))));
                            var $4260 = $4262;
                        };
                        return $4260;
                    case 'Fm.Term.ori':
                        var $4269 = self.orig;
                        var $4270 = self.expr;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4272 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4271 = $4272;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4274 = Bool$false;
                                var _wrap$8 = $4274;
                            } else {
                                var $4275 = self.charCodeAt(0);
                                var $4276 = self.slice(1);
                                var $4277 = ($4275 === 40);
                                var _wrap$8 = $4277;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4278 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4278;
                            } else {
                                var $4279 = _func$7;
                                var _func$10 = $4279;
                            };
                            var $4273 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4271 = $4273;
                        };
                        return $4271;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Term$show$app = x0 => x1 => x2 => Fm$Term$show$app$(x0, x1, x2);

    function Map$to_list$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $4281 = _list$4;
                var $4280 = $4281;
                break;
            case 'Map.tie':
                var $4282 = self.val;
                var $4283 = self.lft;
                var $4284 = self.rgt;
                var self = $4282;
                switch (self._) {
                    case 'Maybe.none':
                        var $4286 = _list$4;
                        var _list0$8 = $4286;
                        break;
                    case 'Maybe.some':
                        var $4287 = self.value;
                        var $4288 = List$cons$(Pair$new$(Bits$reverse$(_key$3), $4287), _list$4);
                        var _list0$8 = $4288;
                        break;
                };
                var _list1$9 = Map$to_list$go$($4283, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$to_list$go$($4284, (_key$3 + '1'), _list1$9);
                var $4285 = _list2$10;
                var $4280 = $4285;
                break;
        };
        return $4280;
    };
    const Map$to_list$go = x0 => x1 => x2 => Map$to_list$go$(x0, x1, x2);

    function Map$to_list$(_xs$2) {
        var $4289 = List$reverse$(Map$to_list$go$(_xs$2, Bits$e, List$nil));
        return $4289;
    };
    const Map$to_list = x0 => Map$to_list$(x0);

    function Bits$chunks_of$go$(_len$1, _bits$2, _need$3, _chunk$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $4291 = List$cons$(Bits$reverse$(_chunk$4), List$nil);
                var $4290 = $4291;
                break;
            case 'o':
                var $4292 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $4294 = List$cons$(_head$6, _tail$7);
                    var $4293 = $4294;
                } else {
                    var $4295 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '0');
                    var $4296 = Bits$chunks_of$go$(_len$1, $4292, $4295, _chunk$7);
                    var $4293 = $4296;
                };
                var $4290 = $4293;
                break;
            case 'i':
                var $4297 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $4299 = List$cons$(_head$6, _tail$7);
                    var $4298 = $4299;
                } else {
                    var $4300 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '1');
                    var $4301 = Bits$chunks_of$go$(_len$1, $4297, $4300, _chunk$7);
                    var $4298 = $4301;
                };
                var $4290 = $4298;
                break;
        };
        return $4290;
    };
    const Bits$chunks_of$go = x0 => x1 => x2 => x3 => Bits$chunks_of$go$(x0, x1, x2, x3);

    function Bits$chunks_of$(_len$1, _bits$2) {
        var $4302 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
        return $4302;
    };
    const Bits$chunks_of = x0 => x1 => Bits$chunks_of$(x0, x1);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $4304 = Word$e;
            var $4303 = $4304;
        } else {
            var $4305 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $4307 = Word$o$(Word$from_bits$($4305, Bits$e));
                    var $4306 = $4307;
                    break;
                case 'o':
                    var $4308 = self.slice(0, -1);
                    var $4309 = Word$o$(Word$from_bits$($4305, $4308));
                    var $4306 = $4309;
                    break;
                case 'i':
                    var $4310 = self.slice(0, -1);
                    var $4311 = Word$i$(Word$from_bits$($4305, $4310));
                    var $4306 = $4311;
                    break;
            };
            var $4303 = $4306;
        };
        return $4303;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);

    function Fm$Name$from_bits$(_bits$1) {
        var _list$2 = Bits$chunks_of$(6n, _bits$1);
        var _name$3 = List$fold$(_list$2, String$nil, (_bts$3 => _name$4 => {
            var _u16$5 = U16$new$(Word$from_bits$(16n, Bits$reverse$(_bts$3)));
            var self = U16$btw$(0, _u16$5, 25);
            if (self) {
                var $4314 = ((_u16$5 + 65) & 0xFFFF);
                var _chr$6 = $4314;
            } else {
                var self = U16$btw$(26, _u16$5, 51);
                if (self) {
                    var $4316 = ((_u16$5 + 71) & 0xFFFF);
                    var $4315 = $4316;
                } else {
                    var self = U16$btw$(52, _u16$5, 61);
                    if (self) {
                        var $4318 = (Math.max(_u16$5 - 4, 0));
                        var $4317 = $4318;
                    } else {
                        var self = (62 === _u16$5);
                        if (self) {
                            var $4320 = 46;
                            var $4319 = $4320;
                        } else {
                            var $4321 = 95;
                            var $4319 = $4321;
                        };
                        var $4317 = $4319;
                    };
                    var $4315 = $4317;
                };
                var _chr$6 = $4315;
            };
            var $4313 = String$cons$(_chr$6, _name$4);
            return $4313;
        }));
        var $4312 = _name$3;
        return $4312;
    };
    const Fm$Name$from_bits = x0 => Fm$Name$from_bits$(x0);

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $4323 = self.fst;
                var $4324 = self.snd;
                var $4325 = $4323;
                var $4322 = $4325;
                break;
        };
        return $4322;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Fm$Term$show$go$(_term$1, _path$2) {
        var self = Fm$Term$show$as_nat$(_term$1);
        switch (self._) {
            case 'Maybe.none':
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $4328 = self.name;
                        var $4329 = self.indx;
                        var $4330 = Fm$Name$show$($4328);
                        var $4327 = $4330;
                        break;
                    case 'Fm.Term.ref':
                        var $4331 = self.name;
                        var _name$4 = Fm$Name$show$($4331);
                        var self = _path$2;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4333 = _name$4;
                                var $4332 = $4333;
                                break;
                            case 'Maybe.some':
                                var $4334 = self.value;
                                var _path_val$6 = ((Bits$e + '1') + Fm$Path$to_bits$($4334));
                                var _path_str$7 = Nat$show$(Bits$to_nat$(_path_val$6));
                                var $4335 = String$flatten$(List$cons$(_name$4, List$cons$(Fm$color$("2", ("-" + _path_str$7)), List$nil)));
                                var $4332 = $4335;
                                break;
                        };
                        var $4327 = $4332;
                        break;
                    case 'Fm.Term.typ':
                        var $4336 = "Type";
                        var $4327 = $4336;
                        break;
                    case 'Fm.Term.all':
                        var $4337 = self.eras;
                        var $4338 = self.self;
                        var $4339 = self.name;
                        var $4340 = self.xtyp;
                        var $4341 = self.body;
                        var _eras$8 = $4337;
                        var _self$9 = Fm$Name$show$($4338);
                        var _name$10 = Fm$Name$show$($4339);
                        var _type$11 = Fm$Term$show$go$($4340, Fm$MPath$o$(_path$2));
                        var self = _eras$8;
                        if (self) {
                            var $4343 = "<";
                            var _open$12 = $4343;
                        } else {
                            var $4344 = "(";
                            var _open$12 = $4344;
                        };
                        var self = _eras$8;
                        if (self) {
                            var $4345 = ">";
                            var _clos$13 = $4345;
                        } else {
                            var $4346 = ")";
                            var _clos$13 = $4346;
                        };
                        var _body$14 = Fm$Term$show$go$($4341(Fm$Term$var$($4338, 0n))(Fm$Term$var$($4339, 0n)), Fm$MPath$i$(_path$2));
                        var $4342 = String$flatten$(List$cons$(_self$9, List$cons$(_open$12, List$cons$(_name$10, List$cons$(":", List$cons$(_type$11, List$cons$(_clos$13, List$cons$(" ", List$cons$(_body$14, List$nil)))))))));
                        var $4327 = $4342;
                        break;
                    case 'Fm.Term.lam':
                        var $4347 = self.name;
                        var $4348 = self.body;
                        var _name$5 = Fm$Name$show$($4347);
                        var _body$6 = Fm$Term$show$go$($4348(Fm$Term$var$($4347, 0n)), Fm$MPath$o$(_path$2));
                        var $4349 = String$flatten$(List$cons$("(", List$cons$(_name$5, List$cons$(") ", List$cons$(_body$6, List$nil)))));
                        var $4327 = $4349;
                        break;
                    case 'Fm.Term.app':
                        var $4350 = self.func;
                        var $4351 = self.argm;
                        var $4352 = Fm$Term$show$app$(_term$1, _path$2, List$nil);
                        var $4327 = $4352;
                        break;
                    case 'Fm.Term.let':
                        var $4353 = self.name;
                        var $4354 = self.expr;
                        var $4355 = self.body;
                        var _name$6 = Fm$Name$show$($4353);
                        var _expr$7 = Fm$Term$show$go$($4354, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($4355(Fm$Term$var$($4353, 0n)), Fm$MPath$i$(_path$2));
                        var $4356 = String$flatten$(List$cons$("let ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $4327 = $4356;
                        break;
                    case 'Fm.Term.def':
                        var $4357 = self.name;
                        var $4358 = self.expr;
                        var $4359 = self.body;
                        var _name$6 = Fm$Name$show$($4357);
                        var _expr$7 = Fm$Term$show$go$($4358, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($4359(Fm$Term$var$($4357, 0n)), Fm$MPath$i$(_path$2));
                        var $4360 = String$flatten$(List$cons$("def ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $4327 = $4360;
                        break;
                    case 'Fm.Term.ann':
                        var $4361 = self.done;
                        var $4362 = self.term;
                        var $4363 = self.type;
                        var _term$6 = Fm$Term$show$go$($4362, Fm$MPath$o$(_path$2));
                        var _type$7 = Fm$Term$show$go$($4363, Fm$MPath$i$(_path$2));
                        var $4364 = String$flatten$(List$cons$(_term$6, List$cons$("::", List$cons$(_type$7, List$nil))));
                        var $4327 = $4364;
                        break;
                    case 'Fm.Term.gol':
                        var $4365 = self.name;
                        var $4366 = self.dref;
                        var $4367 = self.verb;
                        var _name$6 = Fm$Name$show$($4365);
                        var $4368 = String$flatten$(List$cons$("?", List$cons$(_name$6, List$nil)));
                        var $4327 = $4368;
                        break;
                    case 'Fm.Term.hol':
                        var $4369 = self.path;
                        var $4370 = "_";
                        var $4327 = $4370;
                        break;
                    case 'Fm.Term.nat':
                        var $4371 = self.natx;
                        var $4372 = String$flatten$(List$cons$(Nat$show$($4371), List$nil));
                        var $4327 = $4372;
                        break;
                    case 'Fm.Term.chr':
                        var $4373 = self.chrx;
                        var $4374 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($4373), List$cons$("\'", List$nil))));
                        var $4327 = $4374;
                        break;
                    case 'Fm.Term.str':
                        var $4375 = self.strx;
                        var $4376 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($4375), List$cons$("\"", List$nil))));
                        var $4327 = $4376;
                        break;
                    case 'Fm.Term.cse':
                        var $4377 = self.path;
                        var $4378 = self.expr;
                        var $4379 = self.name;
                        var $4380 = self.with;
                        var $4381 = self.cses;
                        var $4382 = self.moti;
                        var _expr$9 = Fm$Term$show$go$($4378, Fm$MPath$o$(_path$2));
                        var _name$10 = Fm$Name$show$($4379);
                        var _wyth$11 = String$join$("", List$mapped$($4380, (_defn$11 => {
                            var self = _defn$11;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4385 = self.file;
                                    var $4386 = self.code;
                                    var $4387 = self.name;
                                    var $4388 = self.term;
                                    var $4389 = self.type;
                                    var $4390 = self.stat;
                                    var _name$18 = Fm$Name$show$($4387);
                                    var _type$19 = Fm$Term$show$go$($4389, Maybe$none);
                                    var _term$20 = Fm$Term$show$go$($4388, Maybe$none);
                                    var $4391 = String$flatten$(List$cons$(_name$18, List$cons$(": ", List$cons$(_type$19, List$cons$(" = ", List$cons$(_term$20, List$cons$(";", List$nil)))))));
                                    var $4384 = $4391;
                                    break;
                            };
                            return $4384;
                        })));
                        var _cses$12 = Map$to_list$($4381);
                        var _cses$13 = String$join$("", List$mapped$(_cses$12, (_x$13 => {
                            var _name$14 = Fm$Name$from_bits$(Pair$fst$(_x$13));
                            var _term$15 = Fm$Term$show$go$(Pair$snd$(_x$13), Maybe$none);
                            var $4392 = String$flatten$(List$cons$(_name$14, List$cons$(": ", List$cons$(_term$15, List$cons$("; ", List$nil)))));
                            return $4392;
                        })));
                        var self = $4382;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4393 = "";
                                var _moti$14 = $4393;
                                break;
                            case 'Maybe.some':
                                var $4394 = self.value;
                                var $4395 = String$flatten$(List$cons$(": ", List$cons$(Fm$Term$show$go$($4394, Maybe$none), List$nil)));
                                var _moti$14 = $4395;
                                break;
                        };
                        var $4383 = String$flatten$(List$cons$("case ", List$cons$(_expr$9, List$cons$(" as ", List$cons$(_name$10, List$cons$(_wyth$11, List$cons$(" { ", List$cons$(_cses$13, List$cons$("}", List$cons$(_moti$14, List$nil))))))))));
                        var $4327 = $4383;
                        break;
                    case 'Fm.Term.ori':
                        var $4396 = self.orig;
                        var $4397 = self.expr;
                        var $4398 = Fm$Term$show$go$($4397, _path$2);
                        var $4327 = $4398;
                        break;
                };
                var $4326 = $4327;
                break;
            case 'Maybe.some':
                var $4399 = self.value;
                var $4400 = $4399;
                var $4326 = $4400;
                break;
        };
        return $4326;
    };
    const Fm$Term$show$go = x0 => x1 => Fm$Term$show$go$(x0, x1);

    function Fm$Term$show$(_term$1) {
        var $4401 = Fm$Term$show$go$(_term$1, Maybe$none);
        return $4401;
    };
    const Fm$Term$show = x0 => Fm$Term$show$(x0);

    function Fm$Error$relevant$(_errors$1, _got$2) {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                var $4403 = List$nil;
                var $4402 = $4403;
                break;
            case 'List.cons':
                var $4404 = self.head;
                var $4405 = self.tail;
                var self = $4404;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4407 = self.origin;
                        var $4408 = self.expected;
                        var $4409 = self.detected;
                        var $4410 = self.context;
                        var $4411 = (!_got$2);
                        var _keep$5 = $4411;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4412 = self.name;
                        var $4413 = self.dref;
                        var $4414 = self.verb;
                        var $4415 = self.goal;
                        var $4416 = self.context;
                        var $4417 = Bool$true;
                        var _keep$5 = $4417;
                        break;
                    case 'Fm.Error.waiting':
                        var $4418 = self.name;
                        var $4419 = Bool$false;
                        var _keep$5 = $4419;
                        break;
                    case 'Fm.Error.indirect':
                        var $4420 = self.name;
                        var $4421 = Bool$false;
                        var _keep$5 = $4421;
                        break;
                    case 'Fm.Error.patch':
                        var $4422 = self.path;
                        var $4423 = self.term;
                        var $4424 = Bool$false;
                        var _keep$5 = $4424;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4425 = self.origin;
                        var $4426 = self.name;
                        var $4427 = (!_got$2);
                        var _keep$5 = $4427;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4428 = self.origin;
                        var $4429 = self.term;
                        var $4430 = self.context;
                        var $4431 = (!_got$2);
                        var _keep$5 = $4431;
                        break;
                };
                var self = $4404;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4432 = self.origin;
                        var $4433 = self.expected;
                        var $4434 = self.detected;
                        var $4435 = self.context;
                        var $4436 = Bool$true;
                        var _got$6 = $4436;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4437 = self.name;
                        var $4438 = self.dref;
                        var $4439 = self.verb;
                        var $4440 = self.goal;
                        var $4441 = self.context;
                        var $4442 = _got$2;
                        var _got$6 = $4442;
                        break;
                    case 'Fm.Error.waiting':
                        var $4443 = self.name;
                        var $4444 = _got$2;
                        var _got$6 = $4444;
                        break;
                    case 'Fm.Error.indirect':
                        var $4445 = self.name;
                        var $4446 = _got$2;
                        var _got$6 = $4446;
                        break;
                    case 'Fm.Error.patch':
                        var $4447 = self.path;
                        var $4448 = self.term;
                        var $4449 = _got$2;
                        var _got$6 = $4449;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4450 = self.origin;
                        var $4451 = self.name;
                        var $4452 = Bool$true;
                        var _got$6 = $4452;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4453 = self.origin;
                        var $4454 = self.term;
                        var $4455 = self.context;
                        var $4456 = _got$2;
                        var _got$6 = $4456;
                        break;
                };
                var _tail$7 = Fm$Error$relevant$($4405, _got$6);
                var self = _keep$5;
                if (self) {
                    var $4457 = List$cons$($4404, _tail$7);
                    var $4406 = $4457;
                } else {
                    var $4458 = _tail$7;
                    var $4406 = $4458;
                };
                var $4402 = $4406;
                break;
        };
        return $4402;
    };
    const Fm$Error$relevant = x0 => x1 => Fm$Error$relevant$(x0, x1);

    function Fm$Context$show$(_context$1) {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                var $4460 = "";
                var $4459 = $4460;
                break;
            case 'List.cons':
                var $4461 = self.head;
                var $4462 = self.tail;
                var self = $4461;
                switch (self._) {
                    case 'Pair.new':
                        var $4464 = self.fst;
                        var $4465 = self.snd;
                        var _name$6 = Fm$Name$show$($4464);
                        var _type$7 = Fm$Term$show$($4465);
                        var _rest$8 = Fm$Context$show$($4462);
                        var $4466 = String$flatten$(List$cons$(_rest$8, List$cons$("- ", List$cons$(_name$6, List$cons$(": ", List$cons$(_type$7, List$cons$("\u{a}", List$nil)))))));
                        var $4463 = $4466;
                        break;
                };
                var $4459 = $4463;
                break;
        };
        return $4459;
    };
    const Fm$Context$show = x0 => Fm$Context$show$(x0);

    function Fm$Term$expand_at$(_path$1, _term$2, _defs$3) {
        var $4467 = Fm$Term$patch_at$(_path$1, _term$2, (_term$4 => {
            var self = _term$4;
            switch (self._) {
                case 'Fm.Term.var':
                    var $4469 = self.name;
                    var $4470 = self.indx;
                    var $4471 = _term$4;
                    var $4468 = $4471;
                    break;
                case 'Fm.Term.ref':
                    var $4472 = self.name;
                    var self = Fm$get$($4472, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4474 = Fm$Term$ref$($4472);
                            var $4473 = $4474;
                            break;
                        case 'Maybe.some':
                            var $4475 = self.value;
                            var self = $4475;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4477 = self.file;
                                    var $4478 = self.code;
                                    var $4479 = self.name;
                                    var $4480 = self.term;
                                    var $4481 = self.type;
                                    var $4482 = self.stat;
                                    var $4483 = $4480;
                                    var $4476 = $4483;
                                    break;
                            };
                            var $4473 = $4476;
                            break;
                    };
                    var $4468 = $4473;
                    break;
                case 'Fm.Term.typ':
                    var $4484 = _term$4;
                    var $4468 = $4484;
                    break;
                case 'Fm.Term.all':
                    var $4485 = self.eras;
                    var $4486 = self.self;
                    var $4487 = self.name;
                    var $4488 = self.xtyp;
                    var $4489 = self.body;
                    var $4490 = _term$4;
                    var $4468 = $4490;
                    break;
                case 'Fm.Term.lam':
                    var $4491 = self.name;
                    var $4492 = self.body;
                    var $4493 = _term$4;
                    var $4468 = $4493;
                    break;
                case 'Fm.Term.app':
                    var $4494 = self.func;
                    var $4495 = self.argm;
                    var $4496 = _term$4;
                    var $4468 = $4496;
                    break;
                case 'Fm.Term.let':
                    var $4497 = self.name;
                    var $4498 = self.expr;
                    var $4499 = self.body;
                    var $4500 = _term$4;
                    var $4468 = $4500;
                    break;
                case 'Fm.Term.def':
                    var $4501 = self.name;
                    var $4502 = self.expr;
                    var $4503 = self.body;
                    var $4504 = _term$4;
                    var $4468 = $4504;
                    break;
                case 'Fm.Term.ann':
                    var $4505 = self.done;
                    var $4506 = self.term;
                    var $4507 = self.type;
                    var $4508 = _term$4;
                    var $4468 = $4508;
                    break;
                case 'Fm.Term.gol':
                    var $4509 = self.name;
                    var $4510 = self.dref;
                    var $4511 = self.verb;
                    var $4512 = _term$4;
                    var $4468 = $4512;
                    break;
                case 'Fm.Term.hol':
                    var $4513 = self.path;
                    var $4514 = _term$4;
                    var $4468 = $4514;
                    break;
                case 'Fm.Term.nat':
                    var $4515 = self.natx;
                    var $4516 = _term$4;
                    var $4468 = $4516;
                    break;
                case 'Fm.Term.chr':
                    var $4517 = self.chrx;
                    var $4518 = _term$4;
                    var $4468 = $4518;
                    break;
                case 'Fm.Term.str':
                    var $4519 = self.strx;
                    var $4520 = _term$4;
                    var $4468 = $4520;
                    break;
                case 'Fm.Term.cse':
                    var $4521 = self.path;
                    var $4522 = self.expr;
                    var $4523 = self.name;
                    var $4524 = self.with;
                    var $4525 = self.cses;
                    var $4526 = self.moti;
                    var $4527 = _term$4;
                    var $4468 = $4527;
                    break;
                case 'Fm.Term.ori':
                    var $4528 = self.orig;
                    var $4529 = self.expr;
                    var $4530 = _term$4;
                    var $4468 = $4530;
                    break;
            };
            return $4468;
        }));
        return $4467;
    };
    const Fm$Term$expand_at = x0 => x1 => x2 => Fm$Term$expand_at$(x0, x1, x2);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Fm$Term$expand_ct$(_term$1, _defs$2, _arity$3) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4532 = self.name;
                var $4533 = self.indx;
                var $4534 = Fm$Term$var$($4532, $4533);
                var $4531 = $4534;
                break;
            case 'Fm.Term.ref':
                var $4535 = self.name;
                var _expand$5 = Bool$false;
                var _expand$6 = ((($4535 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                var _expand$7 = ((($4535 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                var _expand$8 = ((($4535 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                var _expand$9 = ((($4535 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                var self = _expand$9;
                if (self) {
                    var self = Fm$get$($4535, _defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4538 = Fm$Term$ref$($4535);
                            var $4537 = $4538;
                            break;
                        case 'Maybe.some':
                            var $4539 = self.value;
                            var self = $4539;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4541 = self.file;
                                    var $4542 = self.code;
                                    var $4543 = self.name;
                                    var $4544 = self.term;
                                    var $4545 = self.type;
                                    var $4546 = self.stat;
                                    var $4547 = $4544;
                                    var $4540 = $4547;
                                    break;
                            };
                            var $4537 = $4540;
                            break;
                    };
                    var $4536 = $4537;
                } else {
                    var $4548 = Fm$Term$ref$($4535);
                    var $4536 = $4548;
                };
                var $4531 = $4536;
                break;
            case 'Fm.Term.typ':
                var $4549 = Fm$Term$typ;
                var $4531 = $4549;
                break;
            case 'Fm.Term.all':
                var $4550 = self.eras;
                var $4551 = self.self;
                var $4552 = self.name;
                var $4553 = self.xtyp;
                var $4554 = self.body;
                var $4555 = Fm$Term$all$($4550, $4551, $4552, Fm$Term$expand_ct$($4553, _defs$2, 0n), (_s$9 => _x$10 => {
                    var $4556 = Fm$Term$expand_ct$($4554(_s$9)(_x$10), _defs$2, 0n);
                    return $4556;
                }));
                var $4531 = $4555;
                break;
            case 'Fm.Term.lam':
                var $4557 = self.name;
                var $4558 = self.body;
                var $4559 = Fm$Term$lam$($4557, (_x$6 => {
                    var $4560 = Fm$Term$expand_ct$($4558(_x$6), _defs$2, 0n);
                    return $4560;
                }));
                var $4531 = $4559;
                break;
            case 'Fm.Term.app':
                var $4561 = self.func;
                var $4562 = self.argm;
                var $4563 = Fm$Term$app$(Fm$Term$expand_ct$($4561, _defs$2, Nat$succ$(_arity$3)), Fm$Term$expand_ct$($4562, _defs$2, 0n));
                var $4531 = $4563;
                break;
            case 'Fm.Term.let':
                var $4564 = self.name;
                var $4565 = self.expr;
                var $4566 = self.body;
                var $4567 = Fm$Term$let$($4564, Fm$Term$expand_ct$($4565, _defs$2, 0n), (_x$7 => {
                    var $4568 = Fm$Term$expand_ct$($4566(_x$7), _defs$2, 0n);
                    return $4568;
                }));
                var $4531 = $4567;
                break;
            case 'Fm.Term.def':
                var $4569 = self.name;
                var $4570 = self.expr;
                var $4571 = self.body;
                var $4572 = Fm$Term$def$($4569, Fm$Term$expand_ct$($4570, _defs$2, 0n), (_x$7 => {
                    var $4573 = Fm$Term$expand_ct$($4571(_x$7), _defs$2, 0n);
                    return $4573;
                }));
                var $4531 = $4572;
                break;
            case 'Fm.Term.ann':
                var $4574 = self.done;
                var $4575 = self.term;
                var $4576 = self.type;
                var $4577 = Fm$Term$ann$($4574, Fm$Term$expand_ct$($4575, _defs$2, 0n), Fm$Term$expand_ct$($4576, _defs$2, 0n));
                var $4531 = $4577;
                break;
            case 'Fm.Term.gol':
                var $4578 = self.name;
                var $4579 = self.dref;
                var $4580 = self.verb;
                var $4581 = Fm$Term$gol$($4578, $4579, $4580);
                var $4531 = $4581;
                break;
            case 'Fm.Term.hol':
                var $4582 = self.path;
                var $4583 = Fm$Term$hol$($4582);
                var $4531 = $4583;
                break;
            case 'Fm.Term.nat':
                var $4584 = self.natx;
                var $4585 = Fm$Term$nat$($4584);
                var $4531 = $4585;
                break;
            case 'Fm.Term.chr':
                var $4586 = self.chrx;
                var $4587 = Fm$Term$chr$($4586);
                var $4531 = $4587;
                break;
            case 'Fm.Term.str':
                var $4588 = self.strx;
                var $4589 = Fm$Term$str$($4588);
                var $4531 = $4589;
                break;
            case 'Fm.Term.cse':
                var $4590 = self.path;
                var $4591 = self.expr;
                var $4592 = self.name;
                var $4593 = self.with;
                var $4594 = self.cses;
                var $4595 = self.moti;
                var $4596 = _term$1;
                var $4531 = $4596;
                break;
            case 'Fm.Term.ori':
                var $4597 = self.orig;
                var $4598 = self.expr;
                var $4599 = Fm$Term$ori$($4597, $4598);
                var $4531 = $4599;
                break;
        };
        return $4531;
    };
    const Fm$Term$expand_ct = x0 => x1 => x2 => Fm$Term$expand_ct$(x0, x1, x2);

    function Fm$Term$expand$(_dref$1, _term$2, _defs$3) {
        var _term$4 = Fm$Term$normalize$(_term$2, Map$new);
        var _term$5 = (() => {
            var $4602 = _term$4;
            var $4603 = _dref$1;
            let _term$6 = $4602;
            let _path$5;
            while ($4603._ === 'List.cons') {
                _path$5 = $4603.head;
                var _term$7 = Fm$Term$expand_at$(_path$5, _term$6, _defs$3);
                var _term$8 = Fm$Term$normalize$(_term$7, Map$new);
                var _term$9 = Fm$Term$expand_ct$(_term$8, _defs$3, 0n);
                var _term$10 = Fm$Term$normalize$(_term$9, Map$new);
                var $4602 = _term$10;
                _term$6 = $4602;
                $4603 = $4603.tail;
            }
            return _term$6;
        })();
        var $4600 = _term$5;
        return $4600;
    };
    const Fm$Term$expand = x0 => x1 => x2 => Fm$Term$expand$(x0, x1, x2);

    function Fm$Error$show$(_error$1, _defs$2) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $4605 = self.origin;
                var $4606 = self.expected;
                var $4607 = self.detected;
                var $4608 = self.context;
                var self = $4606;
                switch (self._) {
                    case 'Either.left':
                        var $4610 = self.value;
                        var $4611 = $4610;
                        var _expected$7 = $4611;
                        break;
                    case 'Either.right':
                        var $4612 = self.value;
                        var $4613 = Fm$Term$show$(Fm$Term$normalize$($4612, Map$new));
                        var _expected$7 = $4613;
                        break;
                };
                var self = $4607;
                switch (self._) {
                    case 'Either.left':
                        var $4614 = self.value;
                        var $4615 = $4614;
                        var _detected$8 = $4615;
                        break;
                    case 'Either.right':
                        var $4616 = self.value;
                        var $4617 = Fm$Term$show$(Fm$Term$normalize$($4616, Map$new));
                        var _detected$8 = $4617;
                        break;
                };
                var $4609 = String$flatten$(List$cons$("Type mismatch.\u{a}", List$cons$("- Expected: ", List$cons$(_expected$7, List$cons$("\u{a}", List$cons$("- Detected: ", List$cons$(_detected$8, List$cons$("\u{a}", List$cons$((() => {
                    var self = $4608;
                    switch (self._) {
                        case 'List.nil':
                            var $4618 = "";
                            return $4618;
                        case 'List.cons':
                            var $4619 = self.head;
                            var $4620 = self.tail;
                            var $4621 = String$flatten$(List$cons$("With context:\u{a}", List$cons$(Fm$Context$show$($4608), List$nil)));
                            return $4621;
                    };
                })(), List$nil)))))))));
                var $4604 = $4609;
                break;
            case 'Fm.Error.show_goal':
                var $4622 = self.name;
                var $4623 = self.dref;
                var $4624 = self.verb;
                var $4625 = self.goal;
                var $4626 = self.context;
                var _goal_name$8 = String$flatten$(List$cons$("Goal ?", List$cons$(Fm$Name$show$($4622), List$cons$(":\u{a}", List$nil))));
                var self = $4625;
                switch (self._) {
                    case 'Maybe.none':
                        var $4628 = "";
                        var _with_type$9 = $4628;
                        break;
                    case 'Maybe.some':
                        var $4629 = self.value;
                        var _goal$10 = Fm$Term$expand$($4623, $4629, _defs$2);
                        var $4630 = String$flatten$(List$cons$("With type: ", List$cons$((() => {
                            var self = $4624;
                            if (self) {
                                var $4631 = Fm$Term$show$go$(_goal$10, Maybe$some$((_x$11 => {
                                    var $4632 = _x$11;
                                    return $4632;
                                })));
                                return $4631;
                            } else {
                                var $4633 = Fm$Term$show$(_goal$10);
                                return $4633;
                            };
                        })(), List$cons$("\u{a}", List$nil))));
                        var _with_type$9 = $4630;
                        break;
                };
                var self = $4626;
                switch (self._) {
                    case 'List.nil':
                        var $4634 = "";
                        var _with_ctxt$10 = $4634;
                        break;
                    case 'List.cons':
                        var $4635 = self.head;
                        var $4636 = self.tail;
                        var $4637 = String$flatten$(List$cons$("With ctxt:\u{a}", List$cons$(Fm$Context$show$($4626), List$nil)));
                        var _with_ctxt$10 = $4637;
                        break;
                };
                var $4627 = String$flatten$(List$cons$(_goal_name$8, List$cons$(_with_type$9, List$cons$(_with_ctxt$10, List$nil))));
                var $4604 = $4627;
                break;
            case 'Fm.Error.waiting':
                var $4638 = self.name;
                var $4639 = String$flatten$(List$cons$("Waiting for \'", List$cons$($4638, List$cons$("\'.", List$nil))));
                var $4604 = $4639;
                break;
            case 'Fm.Error.indirect':
                var $4640 = self.name;
                var $4641 = String$flatten$(List$cons$("Error on dependency \'", List$cons$($4640, List$cons$("\'.", List$nil))));
                var $4604 = $4641;
                break;
            case 'Fm.Error.patch':
                var $4642 = self.path;
                var $4643 = self.term;
                var $4644 = String$flatten$(List$cons$("Patching: ", List$cons$(Fm$Term$show$($4643), List$nil)));
                var $4604 = $4644;
                break;
            case 'Fm.Error.undefined_reference':
                var $4645 = self.origin;
                var $4646 = self.name;
                var $4647 = String$flatten$(List$cons$("Undefined reference: ", List$cons$(Fm$Name$show$($4646), List$cons$("\u{a}", List$nil))));
                var $4604 = $4647;
                break;
            case 'Fm.Error.cant_infer':
                var $4648 = self.origin;
                var $4649 = self.term;
                var $4650 = self.context;
                var _term$6 = Fm$Term$show$($4649);
                var _context$7 = Fm$Context$show$($4650);
                var $4651 = String$flatten$(List$cons$("Can\'t infer type of: ", List$cons$(_term$6, List$cons$("\u{a}", List$cons$("With ctxt:\u{a}", List$cons$(_context$7, List$nil))))));
                var $4604 = $4651;
                break;
        };
        return $4604;
    };
    const Fm$Error$show = x0 => x1 => Fm$Error$show$(x0, x1);

    function Fm$Error$origin$(_error$1) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $4653 = self.origin;
                var $4654 = self.expected;
                var $4655 = self.detected;
                var $4656 = self.context;
                var $4657 = $4653;
                var $4652 = $4657;
                break;
            case 'Fm.Error.show_goal':
                var $4658 = self.name;
                var $4659 = self.dref;
                var $4660 = self.verb;
                var $4661 = self.goal;
                var $4662 = self.context;
                var $4663 = Maybe$none;
                var $4652 = $4663;
                break;
            case 'Fm.Error.waiting':
                var $4664 = self.name;
                var $4665 = Maybe$none;
                var $4652 = $4665;
                break;
            case 'Fm.Error.indirect':
                var $4666 = self.name;
                var $4667 = Maybe$none;
                var $4652 = $4667;
                break;
            case 'Fm.Error.patch':
                var $4668 = self.path;
                var $4669 = self.term;
                var $4670 = Maybe$none;
                var $4652 = $4670;
                break;
            case 'Fm.Error.undefined_reference':
                var $4671 = self.origin;
                var $4672 = self.name;
                var $4673 = $4671;
                var $4652 = $4673;
                break;
            case 'Fm.Error.cant_infer':
                var $4674 = self.origin;
                var $4675 = self.term;
                var $4676 = self.context;
                var $4677 = $4674;
                var $4652 = $4677;
                break;
        };
        return $4652;
    };
    const Fm$Error$origin = x0 => Fm$Error$origin$(x0);

    function Fm$Defs$report$go$(_defs$1, _list$2, _errs$3, _typs$4) {
        var Fm$Defs$report$go$ = (_defs$1, _list$2, _errs$3, _typs$4) => ({
            ctr: 'TCO',
            arg: [_defs$1, _list$2, _errs$3, _typs$4]
        });
        var Fm$Defs$report$go = _defs$1 => _list$2 => _errs$3 => _typs$4 => Fm$Defs$report$go$(_defs$1, _list$2, _errs$3, _typs$4);
        var arg = [_defs$1, _list$2, _errs$3, _typs$4];
        while (true) {
            let [_defs$1, _list$2, _errs$3, _typs$4] = arg;
            var R = (() => {
                var self = _list$2;
                switch (self._) {
                    case 'List.nil':
                        var $4678 = String$flatten$(List$cons$(_typs$4, List$cons$("\u{a}", List$cons$((() => {
                            var self = _errs$3;
                            if (self.length === 0) {
                                var $4679 = "All terms check.";
                                return $4679;
                            } else {
                                var $4680 = self.charCodeAt(0);
                                var $4681 = self.slice(1);
                                var $4682 = _errs$3;
                                return $4682;
                            };
                        })(), List$nil))));
                        return $4678;
                    case 'List.cons':
                        var $4683 = self.head;
                        var $4684 = self.tail;
                        var _name$7 = $4683;
                        var self = Fm$get$(_name$7, _defs$1);
                        switch (self._) {
                            case 'Maybe.none':
                                var $4686 = Fm$Defs$report$go$(_defs$1, $4684, _errs$3, _typs$4);
                                var $4685 = $4686;
                                break;
                            case 'Maybe.some':
                                var $4687 = self.value;
                                var self = $4687;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $4689 = self.file;
                                        var $4690 = self.code;
                                        var $4691 = self.name;
                                        var $4692 = self.term;
                                        var $4693 = self.type;
                                        var $4694 = self.stat;
                                        var _typs$15 = String$flatten$(List$cons$(_typs$4, List$cons$(_name$7, List$cons$(": ", List$cons$(Fm$Term$show$($4693), List$cons$("\u{a}", List$nil))))));
                                        var self = $4694;
                                        switch (self._) {
                                            case 'Fm.Status.init':
                                                var $4696 = Fm$Defs$report$go$(_defs$1, $4684, _errs$3, _typs$15);
                                                var $4695 = $4696;
                                                break;
                                            case 'Fm.Status.wait':
                                                var $4697 = Fm$Defs$report$go$(_defs$1, $4684, _errs$3, _typs$15);
                                                var $4695 = $4697;
                                                break;
                                            case 'Fm.Status.done':
                                                var $4698 = Fm$Defs$report$go$(_defs$1, $4684, _errs$3, _typs$15);
                                                var $4695 = $4698;
                                                break;
                                            case 'Fm.Status.fail':
                                                var $4699 = self.errors;
                                                var self = $4699;
                                                switch (self._) {
                                                    case 'List.nil':
                                                        var $4701 = Fm$Defs$report$go$(_defs$1, $4684, _errs$3, _typs$15);
                                                        var $4700 = $4701;
                                                        break;
                                                    case 'List.cons':
                                                        var $4702 = self.head;
                                                        var $4703 = self.tail;
                                                        var _name_str$19 = Fm$Name$show$($4691);
                                                        var _rel_errs$20 = Fm$Error$relevant$($4699, Bool$false);
                                                        var _rel_msgs$21 = List$mapped$(_rel_errs$20, (_err$21 => {
                                                            var $4705 = String$flatten$(List$cons$(Fm$Error$show$(_err$21, _defs$1), List$cons$((() => {
                                                                var self = Fm$Error$origin$(_err$21);
                                                                switch (self._) {
                                                                    case 'Maybe.none':
                                                                        var $4706 = "";
                                                                        return $4706;
                                                                    case 'Maybe.some':
                                                                        var $4707 = self.value;
                                                                        var self = $4707;
                                                                        switch (self._) {
                                                                            case 'Fm.Origin.new':
                                                                                var $4709 = self.file;
                                                                                var $4710 = self.from;
                                                                                var $4711 = self.upto;
                                                                                var $4712 = String$flatten$(List$cons$("Inside \'", List$cons$($4689, List$cons$("\':\u{a}", List$cons$(Fm$highlight$($4690, $4710, $4711), List$cons$("\u{a}", List$nil))))));
                                                                                var $4708 = $4712;
                                                                                break;
                                                                        };
                                                                        return $4708;
                                                                };
                                                            })(), List$nil)));
                                                            return $4705;
                                                        }));
                                                        var _errs$22 = String$flatten$(List$cons$(_errs$3, List$cons$(String$join$("\u{a}", _rel_msgs$21), List$cons$("\u{a}", List$nil))));
                                                        var $4704 = Fm$Defs$report$go$(_defs$1, $4684, _errs$22, _typs$15);
                                                        var $4700 = $4704;
                                                        break;
                                                };
                                                var $4695 = $4700;
                                                break;
                                        };
                                        var $4688 = $4695;
                                        break;
                                };
                                var $4685 = $4688;
                                break;
                        };
                        return $4685;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Defs$report$go = x0 => x1 => x2 => x3 => Fm$Defs$report$go$(x0, x1, x2, x3);

    function Fm$Defs$report$(_defs$1, _list$2) {
        var $4713 = Fm$Defs$report$go$(_defs$1, _list$2, "", "");
        return $4713;
    };
    const Fm$Defs$report = x0 => x1 => Fm$Defs$report$(x0, x1);

    function Fm$checker$io$one$(_name$1) {
        var $4714 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $4715 = IO$print$(Fm$Defs$report$(_defs$2, List$cons$(_name$1, List$nil)));
            return $4715;
        }));
        return $4714;
    };
    const Fm$checker$io$one = x0 => Fm$checker$io$one$(x0);

    function Map$keys$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $4717 = _list$4;
                var $4716 = $4717;
                break;
            case 'Map.tie':
                var $4718 = self.val;
                var $4719 = self.lft;
                var $4720 = self.rgt;
                var self = $4718;
                switch (self._) {
                    case 'Maybe.none':
                        var $4722 = _list$4;
                        var _list0$8 = $4722;
                        break;
                    case 'Maybe.some':
                        var $4723 = self.value;
                        var $4724 = List$cons$(Bits$reverse$(_key$3), _list$4);
                        var _list0$8 = $4724;
                        break;
                };
                var _list1$9 = Map$keys$go$($4719, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$keys$go$($4720, (_key$3 + '1'), _list1$9);
                var $4721 = _list2$10;
                var $4716 = $4721;
                break;
        };
        return $4716;
    };
    const Map$keys$go = x0 => x1 => x2 => Map$keys$go$(x0, x1, x2);

    function Map$keys$(_xs$2) {
        var $4725 = List$reverse$(Map$keys$go$(_xs$2, Bits$e, List$nil));
        return $4725;
    };
    const Map$keys = x0 => Map$keys$(x0);

    function Fm$Synth$many$(_names$1, _defs$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $4727 = Monad$pure$(IO$monad)(_defs$2);
                var $4726 = $4727;
                break;
            case 'List.cons':
                var $4728 = self.head;
                var $4729 = self.tail;
                var $4730 = Monad$bind$(IO$monad)(Fm$Synth$one$($4728, _defs$2))((_defs$5 => {
                    var $4731 = Fm$Synth$many$($4729, _defs$5);
                    return $4731;
                }));
                var $4726 = $4730;
                break;
        };
        return $4726;
    };
    const Fm$Synth$many = x0 => x1 => Fm$Synth$many$(x0, x1);

    function Fm$Synth$file$(_file$1, _defs$2) {
        var $4732 = Monad$bind$(IO$monad)(IO$get_file$(_file$1))((_code$3 => {
            var _read$4 = Fm$Defs$read$(_file$1, _code$3, _defs$2);
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $4734 = self.value;
                    var $4735 = Monad$pure$(IO$monad)(Either$left$($4734));
                    var $4733 = $4735;
                    break;
                case 'Either.right':
                    var $4736 = self.value;
                    var _file_defs$6 = $4736;
                    var _file_keys$7 = Map$keys$(_file_defs$6);
                    var _file_nams$8 = List$mapped$(_file_keys$7, Fm$Name$from_bits);
                    var $4737 = Monad$bind$(IO$monad)(Fm$Synth$many$(_file_nams$8, _file_defs$6))((_defs$9 => {
                        var $4738 = Monad$pure$(IO$monad)(Either$right$(Pair$new$(_file_nams$8, _defs$9)));
                        return $4738;
                    }));
                    var $4733 = $4737;
                    break;
            };
            return $4733;
        }));
        return $4732;
    };
    const Fm$Synth$file = x0 => x1 => Fm$Synth$file$(x0, x1);

    function Fm$checker$io$file$(_file$1) {
        var $4739 = Monad$bind$(IO$monad)(Fm$Synth$file$(_file$1, Map$new))((_loaded$2 => {
            var self = _loaded$2;
            switch (self._) {
                case 'Either.left':
                    var $4741 = self.value;
                    var $4742 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("On \'", List$cons$(_file$1, List$cons$("\':", List$nil))))))((_$4 => {
                        var $4743 = IO$print$($4741);
                        return $4743;
                    }));
                    var $4740 = $4742;
                    break;
                case 'Either.right':
                    var $4744 = self.value;
                    var self = $4744;
                    switch (self._) {
                        case 'Pair.new':
                            var $4746 = self.fst;
                            var $4747 = self.snd;
                            var _nams$6 = $4746;
                            var _defs$7 = $4747;
                            var $4748 = IO$print$(Fm$Defs$report$(_defs$7, _nams$6));
                            var $4745 = $4748;
                            break;
                    };
                    var $4740 = $4745;
                    break;
            };
            return $4740;
        }));
        return $4739;
    };
    const Fm$checker$io$file = x0 => Fm$checker$io$file$(x0);

    function Fm$Term$read$(_code$1) {
        var self = Fm$Parser$term(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4750 = self.idx;
                var $4751 = self.code;
                var $4752 = self.err;
                var $4753 = Maybe$none;
                var $4749 = $4753;
                break;
            case 'Parser.Reply.value':
                var $4754 = self.idx;
                var $4755 = self.code;
                var $4756 = self.val;
                var $4757 = Maybe$some$($4756);
                var $4749 = $4757;
                break;
        };
        return $4749;
    };
    const Fm$Term$read = x0 => Fm$Term$read$(x0);
    const Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        var __$4 = Fm$Term$read;
        var $4758 = Fm$checker$io$file$("Main.fm");
        return $4758;
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
        'U16.to_bits': U16$to_bits,
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