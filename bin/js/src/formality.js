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

    function Pair$(_A$1, _B$2) {
        var $389 = null;
        return $389;
    };
    const Pair = x0 => x1 => Pair$(x0, x1);

    function Parser$until1$(_cond$2, _parser$3) {
        var $390 = Monad$bind$(Parser$monad)(_parser$3)((_head$4 => {
            var $391 = Monad$bind$(Parser$monad)(Parser$until$(_cond$2, _parser$3))((_tail$5 => {
                var $392 = Monad$pure$(Parser$monad)(List$cons$(_head$4, _tail$5));
                return $392;
            }));
            return $391;
        }));
        return $390;
    };
    const Parser$until1 = x0 => x1 => Parser$until1$(x0, x1);

    function Parser$maybe$(_parse$2, _idx$3, _code$4) {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $394 = self.idx;
                var $395 = self.code;
                var $396 = self.err;
                var $397 = Parser$Reply$value$(_idx$3, _code$4, Maybe$none);
                var $393 = $397;
                break;
            case 'Parser.Reply.value':
                var $398 = self.idx;
                var $399 = self.code;
                var $400 = self.val;
                var $401 = Parser$Reply$value$($398, $399, Maybe$some$($400));
                var $393 = $401;
                break;
        };
        return $393;
    };
    const Parser$maybe = x0 => x1 => x2 => Parser$maybe$(x0, x1, x2);

    function Fm$Parser$item$(_parser$2) {
        var $402 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
            var $403 = Monad$bind$(Parser$monad)(_parser$2)((_value$4 => {
                var $404 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$5 => {
                    var $405 = Monad$pure$(Parser$monad)(_value$4);
                    return $405;
                }));
                return $404;
            }));
            return $403;
        }));
        return $402;
    };
    const Fm$Parser$item = x0 => Fm$Parser$item$(x0);
    const Fm$Parser$name = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $406 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$letter))((_chrs$2 => {
            var $407 = Monad$pure$(Parser$monad)(List$fold$(_chrs$2, String$nil, String$cons));
            return $407;
        }));
        return $406;
    }));

    function Parser$get_code$(_idx$1, _code$2) {
        var $408 = Parser$Reply$value$(_idx$1, _code$2, _code$2);
        return $408;
    };
    const Parser$get_code = x0 => x1 => Parser$get_code$(x0, x1);

    function Parser$get_index$(_idx$1, _code$2) {
        var $409 = Parser$Reply$value$(_idx$1, _code$2, _idx$1);
        return $409;
    };
    const Parser$get_index = x0 => x1 => Parser$get_index$(x0, x1);
    const Fm$Parser$init = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$1 => {
        var $410 = Monad$bind$(Parser$monad)(Parser$get_index)((_from$2 => {
            var $411 = Monad$pure$(Parser$monad)(_from$2);
            return $411;
        }));
        return $410;
    }));

    function Fm$Origin$new$(_file$1, _from$2, _upto$3) {
        var $412 = ({
            _: 'Fm.Origin.new',
            'file': _file$1,
            'from': _from$2,
            'upto': _upto$3
        });
        return $412;
    };
    const Fm$Origin$new = x0 => x1 => x2 => Fm$Origin$new$(x0, x1, x2);

    function Fm$Parser$stop$(_from$1) {
        var $413 = Monad$bind$(Parser$monad)(Parser$get_index)((_upto$2 => {
            var _orig$3 = Fm$Origin$new$("", _from$1, _upto$2);
            var $414 = Monad$pure$(Parser$monad)(_orig$3);
            return $414;
        }));
        return $413;
    };
    const Fm$Parser$stop = x0 => Fm$Parser$stop$(x0);

    function Fm$Term$ori$(_orig$1, _expr$2) {
        var $415 = ({
            _: 'Fm.Term.ori',
            'orig': _orig$1,
            'expr': _expr$2
        });
        return $415;
    };
    const Fm$Term$ori = x0 => x1 => Fm$Term$ori$(x0, x1);
    const Fm$Term$typ = ({
        _: 'Fm.Term.typ'
    });
    const Fm$Parser$type = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $416 = Monad$bind$(Parser$monad)(Fm$Parser$text$("Type"))((_$2 => {
            var $417 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $418 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$typ));
                return $418;
            }));
            return $417;
        }));
        return $416;
    }));

    function Fm$Term$all$(_eras$1, _self$2, _name$3, _xtyp$4, _body$5) {
        var $419 = ({
            _: 'Fm.Term.all',
            'eras': _eras$1,
            'self': _self$2,
            'name': _name$3,
            'xtyp': _xtyp$4,
            'body': _body$5
        });
        return $419;
    };
    const Fm$Term$all = x0 => x1 => x2 => x3 => x4 => Fm$Term$all$(x0, x1, x2, x3, x4);
    const Fm$Parser$forall = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $420 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_self$2 => {
            var $421 = Monad$bind$(Parser$monad)(Fm$Parser$binder)((_bind$3 => {
                var $422 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$("->")))((_$4 => {
                    var $423 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$5 => {
                        var _term$6 = List$fold$(_bind$3, _body$5, (_x$6 => _t$7 => {
                            var self = _x$6;
                            switch (self._) {
                                case 'Fm.Binder.new':
                                    var $426 = self.eras;
                                    var $427 = self.name;
                                    var $428 = self.term;
                                    var $429 = Fm$Term$all$($426, "", $427, $428, (_s$11 => _x$12 => {
                                        var $430 = _t$7;
                                        return $430;
                                    }));
                                    var $425 = $429;
                                    break;
                            };
                            return $425;
                        }));
                        var $424 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                            var $431 = Monad$pure$(Parser$monad)((() => {
                                var self = _term$6;
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $432 = self.name;
                                        var $433 = self.indx;
                                        var $434 = _term$6;
                                        return $434;
                                    case 'Fm.Term.ref':
                                        var $435 = self.name;
                                        var $436 = _term$6;
                                        return $436;
                                    case 'Fm.Term.typ':
                                        var $437 = _term$6;
                                        return $437;
                                    case 'Fm.Term.all':
                                        var $438 = self.eras;
                                        var $439 = self.self;
                                        var $440 = self.name;
                                        var $441 = self.xtyp;
                                        var $442 = self.body;
                                        var $443 = Fm$Term$ori$(_orig$7, Fm$Term$all$($438, _self$2, $440, $441, $442));
                                        return $443;
                                    case 'Fm.Term.lam':
                                        var $444 = self.name;
                                        var $445 = self.body;
                                        var $446 = _term$6;
                                        return $446;
                                    case 'Fm.Term.app':
                                        var $447 = self.func;
                                        var $448 = self.argm;
                                        var $449 = _term$6;
                                        return $449;
                                    case 'Fm.Term.let':
                                        var $450 = self.name;
                                        var $451 = self.expr;
                                        var $452 = self.body;
                                        var $453 = _term$6;
                                        return $453;
                                    case 'Fm.Term.def':
                                        var $454 = self.name;
                                        var $455 = self.expr;
                                        var $456 = self.body;
                                        var $457 = _term$6;
                                        return $457;
                                    case 'Fm.Term.ann':
                                        var $458 = self.done;
                                        var $459 = self.term;
                                        var $460 = self.type;
                                        var $461 = _term$6;
                                        return $461;
                                    case 'Fm.Term.gol':
                                        var $462 = self.name;
                                        var $463 = self.dref;
                                        var $464 = self.verb;
                                        var $465 = _term$6;
                                        return $465;
                                    case 'Fm.Term.hol':
                                        var $466 = self.path;
                                        var $467 = _term$6;
                                        return $467;
                                    case 'Fm.Term.nat':
                                        var $468 = self.natx;
                                        var $469 = _term$6;
                                        return $469;
                                    case 'Fm.Term.chr':
                                        var $470 = self.chrx;
                                        var $471 = _term$6;
                                        return $471;
                                    case 'Fm.Term.str':
                                        var $472 = self.strx;
                                        var $473 = _term$6;
                                        return $473;
                                    case 'Fm.Term.cse':
                                        var $474 = self.path;
                                        var $475 = self.expr;
                                        var $476 = self.name;
                                        var $477 = self.with;
                                        var $478 = self.cses;
                                        var $479 = self.moti;
                                        var $480 = _term$6;
                                        return $480;
                                    case 'Fm.Term.ori':
                                        var $481 = self.orig;
                                        var $482 = self.expr;
                                        var $483 = _term$6;
                                        return $483;
                                };
                            })());
                            return $431;
                        }));
                        return $424;
                    }));
                    return $423;
                }));
                return $422;
            }));
            return $421;
        }));
        return $420;
    }));

    function Fm$Term$lam$(_name$1, _body$2) {
        var $484 = ({
            _: 'Fm.Term.lam',
            'name': _name$1,
            'body': _body$2
        });
        return $484;
    };
    const Fm$Term$lam = x0 => x1 => Fm$Term$lam$(x0, x1);

    function Fm$Parser$make_lambda$(_names$1, _body$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $486 = _body$2;
                var $485 = $486;
                break;
            case 'List.cons':
                var $487 = self.head;
                var $488 = self.tail;
                var $489 = Fm$Term$lam$($487, (_x$5 => {
                    var $490 = Fm$Parser$make_lambda$($488, _body$2);
                    return $490;
                }));
                var $485 = $489;
                break;
        };
        return $485;
    };
    const Fm$Parser$make_lambda = x0 => x1 => Fm$Parser$make_lambda$(x0, x1);
    const Fm$Parser$lambda = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $491 = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$2 => {
            var $492 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $493 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $494 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $495 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $495;
                    }));
                    return $494;
                }));
                return $493;
            }));
            return $492;
        }));
        return $491;
    }));
    const Fm$Parser$lambda$erased = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $496 = Monad$bind$(Parser$monad)(Fm$Parser$text$("<"))((_$2 => {
            var $497 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(">"), Fm$Parser$item$(Fm$Parser$name1)))((_name$3 => {
                var $498 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                    var $499 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _expr$6 = Fm$Parser$make_lambda$(_name$3, _body$4);
                        var $500 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                        return $500;
                    }));
                    return $499;
                }));
                return $498;
            }));
            return $497;
        }));
        return $496;
    }));
    const Fm$Parser$lambda$nameless = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $501 = Monad$bind$(Parser$monad)(Fm$Parser$text$("()"))((_$2 => {
            var $502 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$3 => {
                var $503 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var _expr$5 = Fm$Term$lam$("", (_x$5 => {
                        var $505 = _body$3;
                        return $505;
                    }));
                    var $504 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, _expr$5));
                    return $504;
                }));
                return $503;
            }));
            return $502;
        }));
        return $501;
    }));
    const Fm$Parser$parenthesis = Monad$bind$(Parser$monad)(Fm$Parser$text$("("))((_$1 => {
        var $506 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$2 => {
            var $507 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$3 => {
                var $508 = Monad$pure$(Parser$monad)(_term$2);
                return $508;
            }));
            return $507;
        }));
        return $506;
    }));

    function Fm$Term$ref$(_name$1) {
        var $509 = ({
            _: 'Fm.Term.ref',
            'name': _name$1
        });
        return $509;
    };
    const Fm$Term$ref = x0 => Fm$Term$ref$(x0);

    function Fm$Term$app$(_func$1, _argm$2) {
        var $510 = ({
            _: 'Fm.Term.app',
            'func': _func$1,
            'argm': _argm$2
        });
        return $510;
    };
    const Fm$Term$app = x0 => x1 => Fm$Term$app$(x0, x1);

    function Fm$Term$hol$(_path$1) {
        var $511 = ({
            _: 'Fm.Term.hol',
            'path': _path$1
        });
        return $511;
    };
    const Fm$Term$hol = x0 => Fm$Term$hol$(x0);

    function Fm$Term$let$(_name$1, _expr$2, _body$3) {
        var $512 = ({
            _: 'Fm.Term.let',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $512;
    };
    const Fm$Term$let = x0 => x1 => x2 => Fm$Term$let$(x0, x1, x2);
    const Fm$Parser$letforin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $513 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $514 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $515 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $516 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$5 => {
                        var $517 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$6 => {
                            var $518 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$7 => {
                                var $519 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$8 => {
                                    var $520 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$9 => {
                                        var $521 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$10 => {
                                            var $522 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$11 => {
                                                var $523 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$12 => {
                                                    var $524 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$13 => {
                                                        var _term$14 = Fm$Term$ref$("List.for");
                                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$hol$(Bits$e));
                                                        var _term$16 = Fm$Term$app$(_term$15, _list$8);
                                                        var _term$17 = Fm$Term$app$(_term$16, Fm$Term$hol$(Bits$e));
                                                        var _term$18 = Fm$Term$app$(_term$17, Fm$Term$ref$(_name$3));
                                                        var _lamb$19 = Fm$Term$lam$(_elem$6, (_i$19 => {
                                                            var $526 = Fm$Term$lam$(_name$3, (_x$20 => {
                                                                var $527 = _loop$10;
                                                                return $527;
                                                            }));
                                                            return $526;
                                                        }));
                                                        var _term$20 = Fm$Term$app$(_term$18, _lamb$19);
                                                        var _term$21 = Fm$Term$let$(_name$3, _term$20, (_x$21 => {
                                                            var $528 = _body$12;
                                                            return $528;
                                                        }));
                                                        var $525 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$13, _term$21));
                                                        return $525;
                                                    }));
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
    const Fm$Parser$let = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $529 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $530 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $531 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $532 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $533 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $534 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $535 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $536 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$let$(_name$3, _expr$5, (_x$9 => {
                                        var $537 = _body$7;
                                        return $537;
                                    }))));
                                    return $536;
                                }));
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
    const Fm$Parser$get = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $538 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$2 => {
            var $539 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $540 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_nam0$4 => {
                    var $541 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$5 => {
                        var $542 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_nam1$6 => {
                            var $543 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$7 => {
                                var $544 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$8 => {
                                    var $545 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$9 => {
                                        var $546 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$10 => {
                                            var $547 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$11 => {
                                                var $548 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                                    var _term$13 = _expr$9;
                                                    var _term$14 = Fm$Term$app$(_term$13, Fm$Term$lam$("x", (_x$14 => {
                                                        var $550 = Fm$Term$hol$(Bits$e);
                                                        return $550;
                                                    })));
                                                    var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_nam0$4, (_x$15 => {
                                                        var $551 = Fm$Term$lam$(_nam1$6, (_y$16 => {
                                                            var $552 = _body$11;
                                                            return $552;
                                                        }));
                                                        return $551;
                                                    })));
                                                    var $549 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, _term$15));
                                                    return $549;
                                                }));
                                                return $548;
                                            }));
                                            return $547;
                                        }));
                                        return $546;
                                    }));
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

    function Fm$Term$def$(_name$1, _expr$2, _body$3) {
        var $553 = ({
            _: 'Fm.Term.def',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $553;
    };
    const Fm$Term$def = x0 => x1 => x2 => Fm$Term$def$(x0, x1, x2);
    const Fm$Parser$def = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $554 = Monad$bind$(Parser$monad)(Fm$Parser$text$("def "))((_$2 => {
            var $555 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $556 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $557 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $558 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $559 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $560 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $561 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$def$(_name$3, _expr$5, (_x$9 => {
                                        var $562 = _body$7;
                                        return $562;
                                    }))));
                                    return $561;
                                }));
                                return $560;
                            }));
                            return $559;
                        }));
                        return $558;
                    }));
                    return $557;
                }));
                return $556;
            }));
            return $555;
        }));
        return $554;
    }));
    const Fm$Parser$if = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $563 = Monad$bind$(Parser$monad)(Fm$Parser$text$("if "))((_$2 => {
            var $564 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cond$3 => {
                var $565 = Monad$bind$(Parser$monad)(Fm$Parser$text$("then"))((_$4 => {
                    var $566 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tcse$5 => {
                        var $567 = Monad$bind$(Parser$monad)(Fm$Parser$text$("else"))((_$6 => {
                            var $568 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_fcse$7 => {
                                var $569 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = _cond$3;
                                    var _term$10 = Fm$Term$app$(_term$9, Fm$Term$lam$("", (_x$10 => {
                                        var $571 = Fm$Term$hol$(Bits$e);
                                        return $571;
                                    })));
                                    var _term$11 = Fm$Term$app$(_term$10, _tcse$5);
                                    var _term$12 = Fm$Term$app$(_term$11, _fcse$7);
                                    var $570 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$12));
                                    return $570;
                                }));
                                return $569;
                            }));
                            return $568;
                        }));
                        return $567;
                    }));
                    return $566;
                }));
                return $565;
            }));
            return $564;
        }));
        return $563;
    }));

    function List$mapped$(_as$2, _f$4) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $573 = List$nil;
                var $572 = $573;
                break;
            case 'List.cons':
                var $574 = self.head;
                var $575 = self.tail;
                var $576 = List$cons$(_f$4($574), List$mapped$($575, _f$4));
                var $572 = $576;
                break;
        };
        return $572;
    };
    const List$mapped = x0 => x1 => List$mapped$(x0, x1);

    function Pair$new$(_fst$3, _snd$4) {
        var $577 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $577;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);
    const Fm$backslash = 92;
    const Fm$escapes = List$cons$(Pair$new$("\\b", 8), List$cons$(Pair$new$("\\f", 12), List$cons$(Pair$new$("\\n", 10), List$cons$(Pair$new$("\\r", 13), List$cons$(Pair$new$("\\t", 9), List$cons$(Pair$new$("\\v", 11), List$cons$(Pair$new$(String$cons$(Fm$backslash, String$cons$(Fm$backslash, String$nil)), Fm$backslash), List$cons$(Pair$new$("\\\"", 34), List$cons$(Pair$new$("\\0", 0), List$cons$(Pair$new$("\\\'", 39), List$nil))))))))));
    const Fm$Parser$char$single = Parser$first_of$(List$cons$(Parser$first_of$(List$mapped$(Fm$escapes, (_esc$1 => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $579 = self.fst;
                var $580 = self.snd;
                var $581 = Monad$bind$(Parser$monad)(Parser$text($579))((_$4 => {
                    var $582 = Monad$pure$(Parser$monad)($580);
                    return $582;
                }));
                var $578 = $581;
                break;
        };
        return $578;
    }))), List$cons$(Parser$one, List$nil)));

    function Fm$Term$chr$(_chrx$1) {
        var $583 = ({
            _: 'Fm.Term.chr',
            'chrx': _chrx$1
        });
        return $583;
    };
    const Fm$Term$chr = x0 => Fm$Term$chr$(x0);
    const Fm$Parser$char = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $584 = Monad$bind$(Parser$monad)(Fm$Parser$text$("\'"))((_$2 => {
            var $585 = Monad$bind$(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => {
                var $586 = Monad$bind$(Parser$monad)(Parser$text("\'"))((_$4 => {
                    var $587 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var $588 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$chr$(_chrx$3)));
                        return $588;
                    }));
                    return $587;
                }));
                return $586;
            }));
            return $585;
        }));
        return $584;
    }));

    function Fm$Term$str$(_strx$1) {
        var $589 = ({
            _: 'Fm.Term.str',
            'strx': _strx$1
        });
        return $589;
    };
    const Fm$Term$str = x0 => Fm$Term$str$(x0);
    const Fm$Parser$string = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var _quot$2 = String$cons$(34, String$nil);
        var $590 = Monad$bind$(Parser$monad)(Fm$Parser$text$(_quot$2))((_$3 => {
            var $591 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text(_quot$2), Fm$Parser$char$single))((_chrs$4 => {
                var _strx$5 = List$fold$(_chrs$4, String$nil, String$cons);
                var $592 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                    var $593 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$str$(_strx$5)));
                    return $593;
                }));
                return $592;
            }));
            return $591;
        }));
        return $590;
    }));
    const Fm$Parser$pair = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $594 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $595 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val0$3 => {
                var $596 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $597 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$5 => {
                        var $598 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $599 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Pair.new");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, _val0$3);
                                var _term$12 = Fm$Term$app$(_term$11, _val1$5);
                                var $600 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$12));
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
    const Fm$Parser$sigma$type = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $601 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $602 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$3 => {
                var $603 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$4 => {
                    var $604 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_typ0$5 => {
                        var $605 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $606 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_typ1$7 => {
                                var $607 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = Fm$Term$ref$("Sigma");
                                    var _term$10 = Fm$Term$app$(_term$9, _typ0$5);
                                    var _term$11 = Fm$Term$app$(_term$10, Fm$Term$lam$("x", (_x$11 => {
                                        var $609 = _typ1$7;
                                        return $609;
                                    })));
                                    var $608 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$11));
                                    return $608;
                                }));
                                return $607;
                            }));
                            return $606;
                        }));
                        return $605;
                    }));
                    return $604;
                }));
                return $603;
            }));
            return $602;
        }));
        return $601;
    }));
    const Fm$Parser$some = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $610 = Monad$bind$(Parser$monad)(Fm$Parser$text$("some("))((_$2 => {
            var $611 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $612 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$4 => {
                    var $613 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var _term$6 = Fm$Term$ref$("Maybe.some");
                        var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                        var _term$8 = Fm$Term$app$(_term$7, _expr$3);
                        var $614 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$8));
                        return $614;
                    }));
                    return $613;
                }));
                return $612;
            }));
            return $611;
        }));
        return $610;
    }));
    const Fm$Parser$apply = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $615 = Monad$bind$(Parser$monad)(Fm$Parser$text$("apply("))((_$2 => {
            var $616 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_func$3 => {
                var $617 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $618 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_equa$5 => {
                        var $619 = Monad$bind$(Parser$monad)(Fm$Parser$text$(")"))((_$6 => {
                            var $620 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Equal.apply");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, Fm$Term$hol$(Bits$e));
                                var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                var _term$13 = Fm$Term$app$(_term$12, _func$3);
                                var _term$14 = Fm$Term$app$(_term$13, _equa$5);
                                var $621 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$14));
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

    function Fm$Name$read$(_str$1) {
        var $622 = _str$1;
        return $622;
    };
    const Fm$Name$read = x0 => Fm$Name$read$(x0);
    const Fm$Parser$list = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $623 = Monad$bind$(Parser$monad)(Fm$Parser$text$("["))((_$2 => {
            var $624 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("]"), Fm$Parser$item$(Fm$Parser$term)))((_vals$3 => {
                var $625 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $626 = Monad$pure$(Parser$monad)(List$fold$(_vals$3, Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("List.nil")), Fm$Term$hol$(Bits$e)), (_x$5 => _xs$6 => {
                        var _term$7 = Fm$Term$ref$(Fm$Name$read$("List.cons"));
                        var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                        var _term$9 = Fm$Term$app$(_term$8, _x$5);
                        var _term$10 = Fm$Term$app$(_term$9, _xs$6);
                        var $627 = Fm$Term$ori$(_orig$4, _term$10);
                        return $627;
                    })));
                    return $626;
                }));
                return $625;
            }));
            return $624;
        }));
        return $623;
    }));
    const Fm$Parser$log = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $628 = Monad$bind$(Parser$monad)(Fm$Parser$text$("log("))((_$2 => {
            var $629 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_strs$3 => {
                var $630 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cont$4 => {
                    var _term$5 = Fm$Term$ref$("Debug.log");
                    var _term$6 = Fm$Term$app$(_term$5, Fm$Term$hol$(Bits$e));
                    var _args$7 = List$fold$(_strs$3, Fm$Term$ref$("String.nil"), (_x$7 => _xs$8 => {
                        var _arg$9 = Fm$Term$ref$("String.concat");
                        var _arg$10 = Fm$Term$app$(_arg$9, _x$7);
                        var _arg$11 = Fm$Term$app$(_arg$10, _xs$8);
                        var $632 = _arg$11;
                        return $632;
                    }));
                    var _term$8 = Fm$Term$app$(_term$6, _args$7);
                    var _term$9 = Fm$Term$app$(_term$8, Fm$Term$lam$("x", (_x$9 => {
                        var $633 = _cont$4;
                        return $633;
                    })));
                    var $631 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $634 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $634;
                    }));
                    return $631;
                }));
                return $630;
            }));
            return $629;
        }));
        return $628;
    }));
    const Fm$Parser$forin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $635 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $636 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $637 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$4 => {
                    var $638 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$5 => {
                        var $639 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$6 => {
                            var $640 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$7 => {
                                var $641 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$8 => {
                                    var $642 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$9 => {
                                        var $643 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                                            var _term$11 = Fm$Term$ref$("List.for");
                                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                            var _term$13 = Fm$Term$app$(_term$12, _list$5);
                                            var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                            var _term$15 = Fm$Term$app$(_term$14, Fm$Term$ref$(_name$7));
                                            var _lamb$16 = Fm$Term$lam$(_elem$3, (_i$16 => {
                                                var $645 = Fm$Term$lam$(_name$7, (_x$17 => {
                                                    var $646 = _loop$9;
                                                    return $646;
                                                }));
                                                return $645;
                                            }));
                                            var _term$17 = Fm$Term$app$(_term$15, _lamb$16);
                                            var _term$18 = Fm$Term$let$(_name$7, _term$17, (_x$18 => {
                                                var $647 = Fm$Term$ref$(_name$7);
                                                return $647;
                                            }));
                                            var $644 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$18));
                                            return $644;
                                        }));
                                        return $643;
                                    }));
                                    return $642;
                                }));
                                return $641;
                            }));
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
        return $635;
    }));

    function Fm$Parser$do$statements$(_monad_name$1) {
        var $648 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $649 = Monad$bind$(Parser$monad)(Fm$Parser$text$("var "))((_$3 => {
                var $650 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $651 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $652 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $653 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$7 => {
                                var $654 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $655 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var _term$10 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                                        var _term$11 = Fm$Term$app$(_term$10, Fm$Term$ref$((_monad_name$1 + ".monad")));
                                        var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                        var _term$13 = Fm$Term$app$(_term$12, Fm$Term$hol$(Bits$e));
                                        var _term$14 = Fm$Term$app$(_term$13, _expr$6);
                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_name$4, (_x$15 => {
                                            var $657 = _body$8;
                                            return $657;
                                        })));
                                        var $656 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$15));
                                        return $656;
                                    }));
                                    return $655;
                                }));
                                return $654;
                            }));
                            return $653;
                        }));
                        return $652;
                    }));
                    return $651;
                }));
                return $650;
            }));
            return $649;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $658 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$3 => {
                var $659 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $660 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $661 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $662 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$7 => {
                                var $663 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $664 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var $665 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, Fm$Term$let$(_name$4, _expr$6, (_x$10 => {
                                            var $666 = _body$8;
                                            return $666;
                                        }))));
                                        return $665;
                                    }));
                                    return $664;
                                }));
                                return $663;
                            }));
                            return $662;
                        }));
                        return $661;
                    }));
                    return $660;
                }));
                return $659;
            }));
            return $658;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $667 = Monad$bind$(Parser$monad)(Fm$Parser$text$("return "))((_$3 => {
                var $668 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $669 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$5 => {
                        var $670 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.pure"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, _expr$4);
                            var $671 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$10));
                            return $671;
                        }));
                        return $670;
                    }));
                    return $669;
                }));
                return $668;
            }));
            return $667;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $672 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $673 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$4 => {
                    var $674 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$5 => {
                        var $675 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                            var _term$11 = Fm$Term$app$(_term$10, _expr$3);
                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$lam$("", (_x$12 => {
                                var $677 = _body$5;
                                return $677;
                            })));
                            var $676 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$12));
                            return $676;
                        }));
                        return $675;
                    }));
                    return $674;
                }));
                return $673;
            }));
            return $672;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$2 => {
            var $678 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$3 => {
                var $679 = Monad$pure$(Parser$monad)(_expr$2);
                return $679;
            }));
            return $678;
        })), List$nil))))));
        return $648;
    };
    const Fm$Parser$do$statements = x0 => Fm$Parser$do$statements$(x0);
    const Fm$Parser$do = Monad$bind$(Parser$monad)(Fm$Parser$text$("do "))((_$1 => {
        var $680 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $681 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $682 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_name$2))((_term$4 => {
                    var $683 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$5 => {
                        var $684 = Monad$pure$(Parser$monad)(_term$4);
                        return $684;
                    }));
                    return $683;
                }));
                return $682;
            }));
            return $681;
        }));
        return $680;
    }));

    function Fm$Term$nat$(_natx$1) {
        var $685 = ({
            _: 'Fm.Term.nat',
            'natx': _natx$1
        });
        return $685;
    };
    const Fm$Term$nat = x0 => Fm$Term$nat$(x0);

    function Fm$Term$unroll_nat$(_natx$1) {
        var self = _natx$1;
        if (self === 0n) {
            var $687 = Fm$Term$ref$(Fm$Name$read$("Nat.zero"));
            var $686 = $687;
        } else {
            var $688 = (self - 1n);
            var _func$3 = Fm$Term$ref$(Fm$Name$read$("Nat.succ"));
            var _argm$4 = Fm$Term$nat$($688);
            var $689 = Fm$Term$app$(_func$3, _argm$4);
            var $686 = $689;
        };
        return $686;
    };
    const Fm$Term$unroll_nat = x0 => Fm$Term$unroll_nat$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Fm$Term$unroll_chr$bits$(_bits$1) {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $691 = Fm$Term$ref$(Fm$Name$read$("Bits.e"));
                var $690 = $691;
                break;
            case 'o':
                var $692 = self.slice(0, -1);
                var $693 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.o")), Fm$Term$unroll_chr$bits$($692));
                var $690 = $693;
                break;
            case 'i':
                var $694 = self.slice(0, -1);
                var $695 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.i")), Fm$Term$unroll_chr$bits$($694));
                var $690 = $695;
                break;
        };
        return $690;
    };
    const Fm$Term$unroll_chr$bits = x0 => Fm$Term$unroll_chr$bits$(x0);

    function Fm$Term$unroll_chr$(_chrx$1) {
        var _bits$2 = (u16_to_bits(_chrx$1));
        var _term$3 = Fm$Term$ref$(Fm$Name$read$("Word.from_bits"));
        var _term$4 = Fm$Term$app$(_term$3, Fm$Term$nat$(16n));
        var _term$5 = Fm$Term$app$(_term$4, Fm$Term$unroll_chr$bits$(_bits$2));
        var _term$6 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("U16.new")), _term$5);
        var $696 = _term$6;
        return $696;
    };
    const Fm$Term$unroll_chr = x0 => Fm$Term$unroll_chr$(x0);

    function Fm$Term$unroll_str$(_strx$1) {
        var self = _strx$1;
        if (self.length === 0) {
            var $698 = Fm$Term$ref$(Fm$Name$read$("String.nil"));
            var $697 = $698;
        } else {
            var $699 = self.charCodeAt(0);
            var $700 = self.slice(1);
            var _char$4 = Fm$Term$chr$($699);
            var _term$5 = Fm$Term$ref$(Fm$Name$read$("String.cons"));
            var _term$6 = Fm$Term$app$(_term$5, _char$4);
            var _term$7 = Fm$Term$app$(_term$6, Fm$Term$str$($700));
            var $701 = _term$7;
            var $697 = $701;
        };
        return $697;
    };
    const Fm$Term$unroll_str = x0 => Fm$Term$unroll_str$(x0);

    function Fm$Term$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $703 = self.name;
                var $704 = self.indx;
                var $705 = _term$1;
                var $702 = $705;
                break;
            case 'Fm.Term.ref':
                var $706 = self.name;
                var self = Fm$get$($706, _defs$2);
                switch (self._) {
                    case 'Maybe.none':
                        var $708 = Fm$Term$ref$($706);
                        var $707 = $708;
                        break;
                    case 'Maybe.some':
                        var $709 = self.value;
                        var self = $709;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $711 = self.file;
                                var $712 = self.code;
                                var $713 = self.name;
                                var $714 = self.term;
                                var $715 = self.type;
                                var $716 = self.stat;
                                var $717 = Fm$Term$reduce$($714, _defs$2);
                                var $710 = $717;
                                break;
                        };
                        var $707 = $710;
                        break;
                };
                var $702 = $707;
                break;
            case 'Fm.Term.typ':
                var $718 = _term$1;
                var $702 = $718;
                break;
            case 'Fm.Term.all':
                var $719 = self.eras;
                var $720 = self.self;
                var $721 = self.name;
                var $722 = self.xtyp;
                var $723 = self.body;
                var $724 = _term$1;
                var $702 = $724;
                break;
            case 'Fm.Term.lam':
                var $725 = self.name;
                var $726 = self.body;
                var $727 = _term$1;
                var $702 = $727;
                break;
            case 'Fm.Term.app':
                var $728 = self.func;
                var $729 = self.argm;
                var _func$5 = Fm$Term$reduce$($728, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $731 = self.name;
                        var $732 = self.indx;
                        var $733 = _term$1;
                        var $730 = $733;
                        break;
                    case 'Fm.Term.ref':
                        var $734 = self.name;
                        var $735 = _term$1;
                        var $730 = $735;
                        break;
                    case 'Fm.Term.typ':
                        var $736 = _term$1;
                        var $730 = $736;
                        break;
                    case 'Fm.Term.all':
                        var $737 = self.eras;
                        var $738 = self.self;
                        var $739 = self.name;
                        var $740 = self.xtyp;
                        var $741 = self.body;
                        var $742 = _term$1;
                        var $730 = $742;
                        break;
                    case 'Fm.Term.lam':
                        var $743 = self.name;
                        var $744 = self.body;
                        var $745 = Fm$Term$reduce$($744($729), _defs$2);
                        var $730 = $745;
                        break;
                    case 'Fm.Term.app':
                        var $746 = self.func;
                        var $747 = self.argm;
                        var $748 = _term$1;
                        var $730 = $748;
                        break;
                    case 'Fm.Term.let':
                        var $749 = self.name;
                        var $750 = self.expr;
                        var $751 = self.body;
                        var $752 = _term$1;
                        var $730 = $752;
                        break;
                    case 'Fm.Term.def':
                        var $753 = self.name;
                        var $754 = self.expr;
                        var $755 = self.body;
                        var $756 = _term$1;
                        var $730 = $756;
                        break;
                    case 'Fm.Term.ann':
                        var $757 = self.done;
                        var $758 = self.term;
                        var $759 = self.type;
                        var $760 = _term$1;
                        var $730 = $760;
                        break;
                    case 'Fm.Term.gol':
                        var $761 = self.name;
                        var $762 = self.dref;
                        var $763 = self.verb;
                        var $764 = _term$1;
                        var $730 = $764;
                        break;
                    case 'Fm.Term.hol':
                        var $765 = self.path;
                        var $766 = _term$1;
                        var $730 = $766;
                        break;
                    case 'Fm.Term.nat':
                        var $767 = self.natx;
                        var $768 = _term$1;
                        var $730 = $768;
                        break;
                    case 'Fm.Term.chr':
                        var $769 = self.chrx;
                        var $770 = _term$1;
                        var $730 = $770;
                        break;
                    case 'Fm.Term.str':
                        var $771 = self.strx;
                        var $772 = _term$1;
                        var $730 = $772;
                        break;
                    case 'Fm.Term.cse':
                        var $773 = self.path;
                        var $774 = self.expr;
                        var $775 = self.name;
                        var $776 = self.with;
                        var $777 = self.cses;
                        var $778 = self.moti;
                        var $779 = _term$1;
                        var $730 = $779;
                        break;
                    case 'Fm.Term.ori':
                        var $780 = self.orig;
                        var $781 = self.expr;
                        var $782 = _term$1;
                        var $730 = $782;
                        break;
                };
                var $702 = $730;
                break;
            case 'Fm.Term.let':
                var $783 = self.name;
                var $784 = self.expr;
                var $785 = self.body;
                var $786 = Fm$Term$reduce$($785($784), _defs$2);
                var $702 = $786;
                break;
            case 'Fm.Term.def':
                var $787 = self.name;
                var $788 = self.expr;
                var $789 = self.body;
                var $790 = Fm$Term$reduce$($789($788), _defs$2);
                var $702 = $790;
                break;
            case 'Fm.Term.ann':
                var $791 = self.done;
                var $792 = self.term;
                var $793 = self.type;
                var $794 = Fm$Term$reduce$($792, _defs$2);
                var $702 = $794;
                break;
            case 'Fm.Term.gol':
                var $795 = self.name;
                var $796 = self.dref;
                var $797 = self.verb;
                var $798 = _term$1;
                var $702 = $798;
                break;
            case 'Fm.Term.hol':
                var $799 = self.path;
                var $800 = _term$1;
                var $702 = $800;
                break;
            case 'Fm.Term.nat':
                var $801 = self.natx;
                var $802 = Fm$Term$reduce$(Fm$Term$unroll_nat$($801), _defs$2);
                var $702 = $802;
                break;
            case 'Fm.Term.chr':
                var $803 = self.chrx;
                var $804 = Fm$Term$reduce$(Fm$Term$unroll_chr$($803), _defs$2);
                var $702 = $804;
                break;
            case 'Fm.Term.str':
                var $805 = self.strx;
                var $806 = Fm$Term$reduce$(Fm$Term$unroll_str$($805), _defs$2);
                var $702 = $806;
                break;
            case 'Fm.Term.cse':
                var $807 = self.path;
                var $808 = self.expr;
                var $809 = self.name;
                var $810 = self.with;
                var $811 = self.cses;
                var $812 = self.moti;
                var $813 = _term$1;
                var $702 = $813;
                break;
            case 'Fm.Term.ori':
                var $814 = self.orig;
                var $815 = self.expr;
                var $816 = Fm$Term$reduce$($815, _defs$2);
                var $702 = $816;
                break;
        };
        return $702;
    };
    const Fm$Term$reduce = x0 => x1 => Fm$Term$reduce$(x0, x1);
    const Map$new = ({
        _: 'Map.new'
    });

    function Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$6) {
        var $817 = ({
            _: 'Fm.Def.new',
            'file': _file$1,
            'code': _code$2,
            'name': _name$3,
            'term': _term$4,
            'type': _type$5,
            'stat': _stat$6
        });
        return $817;
    };
    const Fm$Def$new = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Def$new$(x0, x1, x2, x3, x4, x5);
    const Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    const Fm$Parser$case$with = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$1 => {
        var $818 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $819 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$3 => {
                var $820 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                    var $821 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $822 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$6 => {
                            var $823 = Monad$pure$(Parser$monad)(Fm$Def$new$("", "", _name$2, _term$6, _type$4, Fm$Status$init));
                            return $823;
                        }));
                        return $822;
                    }));
                    return $821;
                }));
                return $820;
            }));
            return $819;
        }));
        return $818;
    }));
    const Fm$Parser$case$case = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$1 => {
        var $824 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $825 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$3 => {
                var $826 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$4 => {
                    var $827 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _term$3));
                    return $827;
                }));
                return $826;
            }));
            return $825;
        }));
        return $824;
    }));

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $828 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $828;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $831 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $830 = $831;
                        break;
                    case 'Map.tie':
                        var $832 = self.val;
                        var $833 = self.lft;
                        var $834 = self.rgt;
                        var $835 = Map$tie$(Maybe$some$(_val$3), $833, $834);
                        var $830 = $835;
                        break;
                };
                var $829 = $830;
                break;
            case 'o':
                var $836 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $838 = Map$tie$(Maybe$none, Map$set$($836, _val$3, Map$new), Map$new);
                        var $837 = $838;
                        break;
                    case 'Map.tie':
                        var $839 = self.val;
                        var $840 = self.lft;
                        var $841 = self.rgt;
                        var $842 = Map$tie$($839, Map$set$($836, _val$3, $840), $841);
                        var $837 = $842;
                        break;
                };
                var $829 = $837;
                break;
            case 'i':
                var $843 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $845 = Map$tie$(Maybe$none, Map$new, Map$set$($843, _val$3, Map$new));
                        var $844 = $845;
                        break;
                    case 'Map.tie':
                        var $846 = self.val;
                        var $847 = self.lft;
                        var $848 = self.rgt;
                        var $849 = Map$tie$($846, $847, Map$set$($843, _val$3, $848));
                        var $844 = $849;
                        break;
                };
                var $829 = $844;
                break;
        };
        return $829;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);

    function Map$from_list$(_f$3, _xs$4) {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                var $851 = Map$new;
                var $850 = $851;
                break;
            case 'List.cons':
                var $852 = self.head;
                var $853 = self.tail;
                var self = $852;
                switch (self._) {
                    case 'Pair.new':
                        var $855 = self.fst;
                        var $856 = self.snd;
                        var $857 = Map$set$(_f$3($855), $856, Map$from_list$(_f$3, $853));
                        var $854 = $857;
                        break;
                };
                var $850 = $854;
                break;
        };
        return $850;
    };
    const Map$from_list = x0 => x1 => Map$from_list$(x0, x1);

    function Fm$Term$cse$(_path$1, _expr$2, _name$3, _with$4, _cses$5, _moti$6) {
        var $858 = ({
            _: 'Fm.Term.cse',
            'path': _path$1,
            'expr': _expr$2,
            'name': _name$3,
            'with': _with$4,
            'cses': _cses$5,
            'moti': _moti$6
        });
        return $858;
    };
    const Fm$Term$cse = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$cse$(x0, x1, x2, x3, x4, x5);
    const Fm$Parser$case = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $859 = Monad$bind$(Parser$monad)(Fm$Parser$text$("case "))((_$2 => {
            var $860 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $861 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $862 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $863 = Fm$Parser$name1;
                        return $863;
                    }))))((_name$5 => {
                        var self = _name$5;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = Fm$Term$reduce$(_expr$4, Map$new);
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $866 = self.name;
                                        var $867 = self.indx;
                                        var $868 = $866;
                                        var $865 = $868;
                                        break;
                                    case 'Fm.Term.ref':
                                        var $869 = self.name;
                                        var $870 = $869;
                                        var $865 = $870;
                                        break;
                                    case 'Fm.Term.typ':
                                        var $871 = Fm$Name$read$("self");
                                        var $865 = $871;
                                        break;
                                    case 'Fm.Term.all':
                                        var $872 = self.eras;
                                        var $873 = self.self;
                                        var $874 = self.name;
                                        var $875 = self.xtyp;
                                        var $876 = self.body;
                                        var $877 = Fm$Name$read$("self");
                                        var $865 = $877;
                                        break;
                                    case 'Fm.Term.lam':
                                        var $878 = self.name;
                                        var $879 = self.body;
                                        var $880 = Fm$Name$read$("self");
                                        var $865 = $880;
                                        break;
                                    case 'Fm.Term.app':
                                        var $881 = self.func;
                                        var $882 = self.argm;
                                        var $883 = Fm$Name$read$("self");
                                        var $865 = $883;
                                        break;
                                    case 'Fm.Term.let':
                                        var $884 = self.name;
                                        var $885 = self.expr;
                                        var $886 = self.body;
                                        var $887 = Fm$Name$read$("self");
                                        var $865 = $887;
                                        break;
                                    case 'Fm.Term.def':
                                        var $888 = self.name;
                                        var $889 = self.expr;
                                        var $890 = self.body;
                                        var $891 = Fm$Name$read$("self");
                                        var $865 = $891;
                                        break;
                                    case 'Fm.Term.ann':
                                        var $892 = self.done;
                                        var $893 = self.term;
                                        var $894 = self.type;
                                        var $895 = Fm$Name$read$("self");
                                        var $865 = $895;
                                        break;
                                    case 'Fm.Term.gol':
                                        var $896 = self.name;
                                        var $897 = self.dref;
                                        var $898 = self.verb;
                                        var $899 = Fm$Name$read$("self");
                                        var $865 = $899;
                                        break;
                                    case 'Fm.Term.hol':
                                        var $900 = self.path;
                                        var $901 = Fm$Name$read$("self");
                                        var $865 = $901;
                                        break;
                                    case 'Fm.Term.nat':
                                        var $902 = self.natx;
                                        var $903 = Fm$Name$read$("self");
                                        var $865 = $903;
                                        break;
                                    case 'Fm.Term.chr':
                                        var $904 = self.chrx;
                                        var $905 = Fm$Name$read$("self");
                                        var $865 = $905;
                                        break;
                                    case 'Fm.Term.str':
                                        var $906 = self.strx;
                                        var $907 = Fm$Name$read$("self");
                                        var $865 = $907;
                                        break;
                                    case 'Fm.Term.cse':
                                        var $908 = self.path;
                                        var $909 = self.expr;
                                        var $910 = self.name;
                                        var $911 = self.with;
                                        var $912 = self.cses;
                                        var $913 = self.moti;
                                        var $914 = Fm$Name$read$("self");
                                        var $865 = $914;
                                        break;
                                    case 'Fm.Term.ori':
                                        var $915 = self.orig;
                                        var $916 = self.expr;
                                        var $917 = Fm$Name$read$("self");
                                        var $865 = $917;
                                        break;
                                };
                                var _name$6 = $865;
                                break;
                            case 'Maybe.some':
                                var $918 = self.value;
                                var $919 = $918;
                                var _name$6 = $919;
                                break;
                        };
                        var $864 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$case$with))((_wyth$7 => {
                            var $920 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$8 => {
                                var $921 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$case$case))((_cses$9 => {
                                    var _cses$10 = Map$from_list$(Fm$Name$to_bits, _cses$9);
                                    var $922 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$11 => {
                                        var $923 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$12 => {
                                            var $924 = Monad$pure$(Parser$monad)(Maybe$some$(_term$12));
                                            return $924;
                                        }));
                                        return $923;
                                    })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("!"))((_$11 => {
                                        var $925 = Monad$pure$(Parser$monad)(Maybe$none);
                                        return $925;
                                    })), List$cons$(Monad$pure$(Parser$monad)(Maybe$some$(Fm$Term$hol$(Bits$e))), List$nil)))))((_moti$11 => {
                                        var $926 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                            var $927 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$6, _wyth$7, _cses$10, _moti$11)));
                                            return $927;
                                        }));
                                        return $926;
                                    }));
                                    return $922;
                                }));
                                return $921;
                            }));
                            return $920;
                        }));
                        return $864;
                    }));
                    return $862;
                }));
                return $861;
            }));
            return $860;
        }));
        return $859;
    }));
    const Fm$Parser$open = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $928 = Monad$bind$(Parser$monad)(Fm$Parser$text$("open "))((_$2 => {
            var $929 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $930 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $931 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $932 = Fm$Parser$name1;
                        return $932;
                    }))))((_name$5 => {
                        var $933 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var self = _name$5;
                            switch (self._) {
                                case 'Maybe.none':
                                    var self = Fm$Term$reduce$(_expr$4, Map$new);
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $936 = self.name;
                                            var $937 = self.indx;
                                            var $938 = $936;
                                            var $935 = $938;
                                            break;
                                        case 'Fm.Term.ref':
                                            var $939 = self.name;
                                            var $940 = $939;
                                            var $935 = $940;
                                            break;
                                        case 'Fm.Term.typ':
                                            var $941 = Fm$Name$read$("self");
                                            var $935 = $941;
                                            break;
                                        case 'Fm.Term.all':
                                            var $942 = self.eras;
                                            var $943 = self.self;
                                            var $944 = self.name;
                                            var $945 = self.xtyp;
                                            var $946 = self.body;
                                            var $947 = Fm$Name$read$("self");
                                            var $935 = $947;
                                            break;
                                        case 'Fm.Term.lam':
                                            var $948 = self.name;
                                            var $949 = self.body;
                                            var $950 = Fm$Name$read$("self");
                                            var $935 = $950;
                                            break;
                                        case 'Fm.Term.app':
                                            var $951 = self.func;
                                            var $952 = self.argm;
                                            var $953 = Fm$Name$read$("self");
                                            var $935 = $953;
                                            break;
                                        case 'Fm.Term.let':
                                            var $954 = self.name;
                                            var $955 = self.expr;
                                            var $956 = self.body;
                                            var $957 = Fm$Name$read$("self");
                                            var $935 = $957;
                                            break;
                                        case 'Fm.Term.def':
                                            var $958 = self.name;
                                            var $959 = self.expr;
                                            var $960 = self.body;
                                            var $961 = Fm$Name$read$("self");
                                            var $935 = $961;
                                            break;
                                        case 'Fm.Term.ann':
                                            var $962 = self.done;
                                            var $963 = self.term;
                                            var $964 = self.type;
                                            var $965 = Fm$Name$read$("self");
                                            var $935 = $965;
                                            break;
                                        case 'Fm.Term.gol':
                                            var $966 = self.name;
                                            var $967 = self.dref;
                                            var $968 = self.verb;
                                            var $969 = Fm$Name$read$("self");
                                            var $935 = $969;
                                            break;
                                        case 'Fm.Term.hol':
                                            var $970 = self.path;
                                            var $971 = Fm$Name$read$("self");
                                            var $935 = $971;
                                            break;
                                        case 'Fm.Term.nat':
                                            var $972 = self.natx;
                                            var $973 = Fm$Name$read$("self");
                                            var $935 = $973;
                                            break;
                                        case 'Fm.Term.chr':
                                            var $974 = self.chrx;
                                            var $975 = Fm$Name$read$("self");
                                            var $935 = $975;
                                            break;
                                        case 'Fm.Term.str':
                                            var $976 = self.strx;
                                            var $977 = Fm$Name$read$("self");
                                            var $935 = $977;
                                            break;
                                        case 'Fm.Term.cse':
                                            var $978 = self.path;
                                            var $979 = self.expr;
                                            var $980 = self.name;
                                            var $981 = self.with;
                                            var $982 = self.cses;
                                            var $983 = self.moti;
                                            var $984 = Fm$Name$read$("self");
                                            var $935 = $984;
                                            break;
                                        case 'Fm.Term.ori':
                                            var $985 = self.orig;
                                            var $986 = self.expr;
                                            var $987 = Fm$Name$read$("self");
                                            var $935 = $987;
                                            break;
                                    };
                                    var _name$7 = $935;
                                    break;
                                case 'Maybe.some':
                                    var $988 = self.value;
                                    var $989 = $988;
                                    var _name$7 = $989;
                                    break;
                            };
                            var _wyth$8 = List$nil;
                            var $934 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_rest$9 => {
                                var _cses$10 = Map$from_list$(Fm$Name$to_bits, List$cons$(Pair$new$("_", _rest$9), List$nil));
                                var _moti$11 = Maybe$some$(Fm$Term$hol$(Bits$e));
                                var $990 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                    var $991 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$7, _wyth$8, _cses$10, _moti$11)));
                                    return $991;
                                }));
                                return $990;
                            }));
                            return $934;
                        }));
                        return $933;
                    }));
                    return $931;
                }));
                return $930;
            }));
            return $929;
        }));
        return $928;
    }));

    function Parser$digit$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $993 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
            var $992 = $993;
        } else {
            var $994 = self.charCodeAt(0);
            var $995 = self.slice(1);
            var _sidx$5 = Nat$succ$(_idx$1);
            var self = ($994 === 48);
            if (self) {
                var $997 = Parser$Reply$value$(_sidx$5, $995, 0n);
                var $996 = $997;
            } else {
                var self = ($994 === 49);
                if (self) {
                    var $999 = Parser$Reply$value$(_sidx$5, $995, 1n);
                    var $998 = $999;
                } else {
                    var self = ($994 === 50);
                    if (self) {
                        var $1001 = Parser$Reply$value$(_sidx$5, $995, 2n);
                        var $1000 = $1001;
                    } else {
                        var self = ($994 === 51);
                        if (self) {
                            var $1003 = Parser$Reply$value$(_sidx$5, $995, 3n);
                            var $1002 = $1003;
                        } else {
                            var self = ($994 === 52);
                            if (self) {
                                var $1005 = Parser$Reply$value$(_sidx$5, $995, 4n);
                                var $1004 = $1005;
                            } else {
                                var self = ($994 === 53);
                                if (self) {
                                    var $1007 = Parser$Reply$value$(_sidx$5, $995, 5n);
                                    var $1006 = $1007;
                                } else {
                                    var self = ($994 === 54);
                                    if (self) {
                                        var $1009 = Parser$Reply$value$(_sidx$5, $995, 6n);
                                        var $1008 = $1009;
                                    } else {
                                        var self = ($994 === 55);
                                        if (self) {
                                            var $1011 = Parser$Reply$value$(_sidx$5, $995, 7n);
                                            var $1010 = $1011;
                                        } else {
                                            var self = ($994 === 56);
                                            if (self) {
                                                var $1013 = Parser$Reply$value$(_sidx$5, $995, 8n);
                                                var $1012 = $1013;
                                            } else {
                                                var self = ($994 === 57);
                                                if (self) {
                                                    var $1015 = Parser$Reply$value$(_sidx$5, $995, 9n);
                                                    var $1014 = $1015;
                                                } else {
                                                    var $1016 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
                                                    var $1014 = $1016;
                                                };
                                                var $1012 = $1014;
                                            };
                                            var $1010 = $1012;
                                        };
                                        var $1008 = $1010;
                                    };
                                    var $1006 = $1008;
                                };
                                var $1004 = $1006;
                            };
                            var $1002 = $1004;
                        };
                        var $1000 = $1002;
                    };
                    var $998 = $1000;
                };
                var $996 = $998;
            };
            var $992 = $996;
        };
        return $992;
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
                        var $1017 = _res$4;
                        return $1017;
                    case 'List.cons':
                        var $1018 = self.head;
                        var $1019 = self.tail;
                        var $1020 = Nat$from_base$go$(_b$1, $1019, (_b$1 * _p$3), (($1018 * _p$3) + _res$4));
                        return $1020;
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
                        var $1021 = _res$3;
                        return $1021;
                    case 'List.cons':
                        var $1022 = self.head;
                        var $1023 = self.tail;
                        var $1024 = List$reverse$go$($1023, List$cons$($1022, _res$3));
                        return $1024;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $1025 = List$reverse$go$(_xs$2, List$nil);
        return $1025;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Nat$from_base$(_base$1, _ds$2) {
        var $1026 = Nat$from_base$go$(_base$1, List$reverse$(_ds$2), 1n, 0n);
        return $1026;
    };
    const Nat$from_base = x0 => x1 => Nat$from_base$(x0, x1);
    const Parser$nat = Monad$bind$(Parser$monad)(Parser$many1$(Parser$digit))((_digits$1 => {
        var $1027 = Monad$pure$(Parser$monad)(Nat$from_base$(10n, _digits$1));
        return $1027;
    }));

    function Bits$tail$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $1029 = Bits$e;
                var $1028 = $1029;
                break;
            case 'o':
                var $1030 = self.slice(0, -1);
                var $1031 = $1030;
                var $1028 = $1031;
                break;
            case 'i':
                var $1032 = self.slice(0, -1);
                var $1033 = $1032;
                var $1028 = $1033;
                break;
        };
        return $1028;
    };
    const Bits$tail = x0 => Bits$tail$(x0);

    function Bits$inc$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $1035 = (Bits$e + '1');
                var $1034 = $1035;
                break;
            case 'o':
                var $1036 = self.slice(0, -1);
                var $1037 = ($1036 + '1');
                var $1034 = $1037;
                break;
            case 'i':
                var $1038 = self.slice(0, -1);
                var $1039 = (Bits$inc$($1038) + '0');
                var $1034 = $1039;
                break;
        };
        return $1034;
    };
    const Bits$inc = x0 => Bits$inc$(x0);
    const Nat$to_bits = a0 => (nat_to_bits(a0));

    function Maybe$to_bool$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1041 = Bool$false;
                var $1040 = $1041;
                break;
            case 'Maybe.some':
                var $1042 = self.value;
                var $1043 = Bool$true;
                var $1040 = $1043;
                break;
        };
        return $1040;
    };
    const Maybe$to_bool = x0 => Maybe$to_bool$(x0);

    function Fm$Term$gol$(_name$1, _dref$2, _verb$3) {
        var $1044 = ({
            _: 'Fm.Term.gol',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3
        });
        return $1044;
    };
    const Fm$Term$gol = x0 => x1 => x2 => Fm$Term$gol$(x0, x1, x2);
    const Fm$Parser$goal = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1045 = Monad$bind$(Parser$monad)(Fm$Parser$text$("?"))((_$2 => {
            var $1046 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $1047 = Monad$bind$(Parser$monad)(Parser$many$(Monad$bind$(Parser$monad)(Fm$Parser$text$("-"))((_$4 => {
                    var $1048 = Monad$bind$(Parser$monad)(Parser$nat)((_nat$5 => {
                        var _bits$6 = Bits$reverse$(Bits$tail$(Bits$reverse$((nat_to_bits(_nat$5)))));
                        var $1049 = Monad$pure$(Parser$monad)(_bits$6);
                        return $1049;
                    }));
                    return $1048;
                }))))((_dref$4 => {
                    var $1050 = Monad$bind$(Parser$monad)(Monad$bind$(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => {
                        var $1051 = Monad$pure$(Parser$monad)(Maybe$to_bool$(_verb$5));
                        return $1051;
                    })))((_verb$5 => {
                        var $1052 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                            var $1053 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$gol$(_name$3, _dref$4, _verb$5)));
                            return $1053;
                        }));
                        return $1052;
                    }));
                    return $1050;
                }));
                return $1047;
            }));
            return $1046;
        }));
        return $1045;
    }));
    const Fm$Parser$hole = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1054 = Monad$bind$(Parser$monad)(Fm$Parser$text$("_"))((_$2 => {
            var $1055 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $1056 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$hol$(Bits$e)));
                return $1056;
            }));
            return $1055;
        }));
        return $1054;
    }));
    const Fm$Parser$nat = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1057 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $1058 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $1059 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $1060 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, Fm$Term$nat$(_natx$3)));
                    return $1060;
                }));
                return $1059;
            }));
            return $1058;
        }));
        return $1057;
    }));
    const String$eql = a0 => a1 => (a0 === a1);

    function Parser$fail$(_error$2, _idx$3, _code$4) {
        var $1061 = Parser$Reply$error$(_idx$3, _code$4, _error$2);
        return $1061;
    };
    const Parser$fail = x0 => x1 => x2 => Parser$fail$(x0, x1, x2);
    const Fm$Parser$reference = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $1062 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var self = (_name$2 === "case");
            if (self) {
                var $1064 = Parser$fail("Reserved keyword.");
                var $1063 = $1064;
            } else {
                var self = (_name$2 === "do");
                if (self) {
                    var $1066 = Parser$fail("Reserved keyword.");
                    var $1065 = $1066;
                } else {
                    var self = (_name$2 === "if");
                    if (self) {
                        var $1068 = Parser$fail("Reserved keyword.");
                        var $1067 = $1068;
                    } else {
                        var self = (_name$2 === "let");
                        if (self) {
                            var $1070 = Parser$fail("Reserved keyword.");
                            var $1069 = $1070;
                        } else {
                            var self = (_name$2 === "def");
                            if (self) {
                                var $1072 = Parser$fail("Reserved keyword.");
                                var $1071 = $1072;
                            } else {
                                var self = (_name$2 === "true");
                                if (self) {
                                    var $1074 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Bool.true"));
                                    var $1073 = $1074;
                                } else {
                                    var self = (_name$2 === "false");
                                    if (self) {
                                        var $1076 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Bool.false"));
                                        var $1075 = $1076;
                                    } else {
                                        var self = (_name$2 === "unit");
                                        if (self) {
                                            var $1078 = Monad$pure$(Parser$monad)(Fm$Term$ref$("Unit.new"));
                                            var $1077 = $1078;
                                        } else {
                                            var self = (_name$2 === "none");
                                            if (self) {
                                                var _term$3 = Fm$Term$ref$("Maybe.none");
                                                var _term$4 = Fm$Term$app$(_term$3, Fm$Term$hol$(Bits$e));
                                                var $1080 = Monad$pure$(Parser$monad)(_term$4);
                                                var $1079 = $1080;
                                            } else {
                                                var self = (_name$2 === "refl");
                                                if (self) {
                                                    var _term$3 = Fm$Term$ref$("Equal.refl");
                                                    var _term$4 = Fm$Term$app$(_term$3, Fm$Term$hol$(Bits$e));
                                                    var _term$5 = Fm$Term$app$(_term$4, Fm$Term$hol$(Bits$e));
                                                    var $1082 = Monad$pure$(Parser$monad)(_term$5);
                                                    var $1081 = $1082;
                                                } else {
                                                    var $1083 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                                                        var $1084 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$ref$(_name$2)));
                                                        return $1084;
                                                    }));
                                                    var $1081 = $1083;
                                                };
                                                var $1079 = $1081;
                                            };
                                            var $1077 = $1079;
                                        };
                                        var $1075 = $1077;
                                    };
                                    var $1073 = $1075;
                                };
                                var $1071 = $1073;
                            };
                            var $1069 = $1071;
                        };
                        var $1067 = $1069;
                    };
                    var $1065 = $1067;
                };
                var $1063 = $1065;
            };
            return $1063;
        }));
        return $1062;
    }));
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function Fm$Parser$application$(_init$1, _func$2) {
        var $1085 = Monad$bind$(Parser$monad)(Parser$text("("))((_$3 => {
            var $1086 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_args$4 => {
                var $1087 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _expr$6 = (() => {
                        var $1090 = _func$2;
                        var $1091 = _args$4;
                        let _f$7 = $1090;
                        let _x$6;
                        while ($1091._ === 'List.cons') {
                            _x$6 = $1091.head;
                            var $1090 = Fm$Term$app$(_f$7, _x$6);
                            _f$7 = $1090;
                            $1091 = $1091.tail;
                        }
                        return _f$7;
                    })();
                    var $1088 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                    return $1088;
                }));
                return $1087;
            }));
            return $1086;
        }));
        return $1085;
    };
    const Fm$Parser$application = x0 => x1 => Fm$Parser$application$(x0, x1);
    const Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$nil))));

    function Parser$spaces_text$(_text$1) {
        var $1092 = Monad$bind$(Parser$monad)(Parser$spaces)((_$2 => {
            var $1093 = Parser$text(_text$1);
            return $1093;
        }));
        return $1092;
    };
    const Parser$spaces_text = x0 => Parser$spaces_text$(x0);

    function Fm$Parser$application$erased$(_init$1, _func$2) {
        var $1094 = Monad$bind$(Parser$monad)(Parser$get_index)((_init$3 => {
            var $1095 = Monad$bind$(Parser$monad)(Parser$text("<"))((_$4 => {
                var $1096 = Monad$bind$(Parser$monad)(Parser$until1$(Parser$spaces_text$(">"), Fm$Parser$item$(Fm$Parser$term)))((_args$5 => {
                    var $1097 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$3))((_orig$6 => {
                        var _expr$7 = (() => {
                            var $1100 = _func$2;
                            var $1101 = _args$5;
                            let _f$8 = $1100;
                            let _x$7;
                            while ($1101._ === 'List.cons') {
                                _x$7 = $1101.head;
                                var $1100 = Fm$Term$app$(_f$8, _x$7);
                                _f$8 = $1100;
                                $1101 = $1101.tail;
                            }
                            return _f$8;
                        })();
                        var $1098 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _expr$7));
                        return $1098;
                    }));
                    return $1097;
                }));
                return $1096;
            }));
            return $1095;
        }));
        return $1094;
    };
    const Fm$Parser$application$erased = x0 => x1 => Fm$Parser$application$erased$(x0, x1);

    function Fm$Parser$arrow$(_init$1, _xtyp$2) {
        var $1102 = Monad$bind$(Parser$monad)(Fm$Parser$text$("->"))((_$3 => {
            var $1103 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                var $1104 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $1105 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$all$(Bool$false, "", "", _xtyp$2, (_s$6 => _x$7 => {
                        var $1106 = _body$4;
                        return $1106;
                    }))));
                    return $1105;
                }));
                return $1104;
            }));
            return $1103;
        }));
        return $1102;
    };
    const Fm$Parser$arrow = x0 => x1 => Fm$Parser$arrow$(x0, x1);

    function Fm$Parser$cons$(_init$1, _head$2) {
        var $1107 = Monad$bind$(Parser$monad)(Fm$Parser$text$("&"))((_$3 => {
            var $1108 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tail$4 => {
                var $1109 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("List.cons");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _head$2);
                    var _term$9 = Fm$Term$app$(_term$8, _tail$4);
                    var $1110 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $1111 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $1111;
                    }));
                    return $1110;
                }));
                return $1109;
            }));
            return $1108;
        }));
        return $1107;
    };
    const Fm$Parser$cons = x0 => x1 => Fm$Parser$cons$(x0, x1);

    function Fm$Parser$concat$(_init$1, _lst0$2) {
        var $1112 = Monad$bind$(Parser$monad)(Fm$Parser$text$("++"))((_$3 => {
            var $1113 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_lst1$4 => {
                var $1114 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("List.concat");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _lst0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _lst1$4);
                    var $1115 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                        var $1116 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$9));
                        return $1116;
                    }));
                    return $1115;
                }));
                return $1114;
            }));
            return $1113;
        }));
        return $1112;
    };
    const Fm$Parser$concat = x0 => x1 => Fm$Parser$concat$(x0, x1);

    function Fm$Parser$string_concat$(_init$1, _str0$2) {
        var $1117 = Monad$bind$(Parser$monad)(Fm$Parser$text$("|"))((_$3 => {
            var $1118 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_str1$4 => {
                var $1119 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("String.concat");
                    var _term$7 = Fm$Term$app$(_term$6, _str0$2);
                    var _term$8 = Fm$Term$app$(_term$7, _str1$4);
                    var $1120 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$9 => {
                        var $1121 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$8));
                        return $1121;
                    }));
                    return $1120;
                }));
                return $1119;
            }));
            return $1118;
        }));
        return $1117;
    };
    const Fm$Parser$string_concat = x0 => x1 => Fm$Parser$string_concat$(x0, x1);

    function Fm$Parser$sigma$(_init$1, _val0$2) {
        var $1122 = Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$3 => {
            var $1123 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $1124 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Sigma.new");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                    var _term$9 = Fm$Term$app$(_term$8, _val0$2);
                    var _term$10 = Fm$Term$app$(_term$9, _val1$4);
                    var $1125 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$10));
                    return $1125;
                }));
                return $1124;
            }));
            return $1123;
        }));
        return $1122;
    };
    const Fm$Parser$sigma = x0 => x1 => Fm$Parser$sigma$(x0, x1);

    function Fm$Parser$equality$(_init$1, _val0$2) {
        var $1126 = Monad$bind$(Parser$monad)(Fm$Parser$text$("=="))((_$3 => {
            var $1127 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $1128 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Equal");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _val0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val1$4);
                    var $1129 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$9));
                    return $1129;
                }));
                return $1128;
            }));
            return $1127;
        }));
        return $1126;
    };
    const Fm$Parser$equality = x0 => x1 => Fm$Parser$equality$(x0, x1);

    function Fm$Term$ann$(_done$1, _term$2, _type$3) {
        var $1130 = ({
            _: 'Fm.Term.ann',
            'done': _done$1,
            'term': _term$2,
            'type': _type$3
        });
        return $1130;
    };
    const Fm$Term$ann = x0 => x1 => x2 => Fm$Term$ann$(x0, x1, x2);

    function Fm$Parser$annotation$(_init$1, _term$2) {
        var $1131 = Monad$bind$(Parser$monad)(Fm$Parser$text$("::"))((_$3 => {
            var $1132 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                var $1133 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $1134 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$ann$(Bool$false, _term$2, _type$4)));
                    return $1134;
                }));
                return $1133;
            }));
            return $1132;
        }));
        return $1131;
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
                var _suffix_parser$5 = Parser$first_of$(List$cons$(Fm$Parser$application$(_init$1, _term$2), List$cons$(Fm$Parser$application$erased$(_init$1, _term$2), List$cons$(Fm$Parser$arrow$(_init$1, _term$2), List$cons$(Fm$Parser$cons$(_init$1, _term$2), List$cons$(Fm$Parser$concat$(_init$1, _term$2), List$cons$(Fm$Parser$string_concat$(_init$1, _term$2), List$cons$(Fm$Parser$sigma$(_init$1, _term$2), List$cons$(Fm$Parser$equality$(_init$1, _term$2), List$cons$(Fm$Parser$annotation$(_init$1, _term$2), List$nil))))))))));
                var self = _suffix_parser$5(_idx$3)(_code$4);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1136 = self.idx;
                        var $1137 = self.code;
                        var $1138 = self.err;
                        var $1139 = Parser$Reply$value$(_idx$3, _code$4, _term$2);
                        var $1135 = $1139;
                        break;
                    case 'Parser.Reply.value':
                        var $1140 = self.idx;
                        var $1141 = self.code;
                        var $1142 = self.val;
                        var $1143 = Fm$Parser$suffix$(_init$1, $1142, $1140, $1141);
                        var $1135 = $1143;
                        break;
                };
                return $1135;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Parser$suffix = x0 => x1 => x2 => x3 => Fm$Parser$suffix$(x0, x1, x2, x3);
    const Fm$Parser$term = Monad$bind$(Parser$monad)(Parser$get_code)((_code$1 => {
        var $1144 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $1145 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$type, List$cons$(Fm$Parser$forall, List$cons$(Fm$Parser$lambda, List$cons$(Fm$Parser$lambda$erased, List$cons$(Fm$Parser$lambda$nameless, List$cons$(Fm$Parser$parenthesis, List$cons$(Fm$Parser$letforin, List$cons$(Fm$Parser$let, List$cons$(Fm$Parser$get, List$cons$(Fm$Parser$def, List$cons$(Fm$Parser$if, List$cons$(Fm$Parser$char, List$cons$(Fm$Parser$string, List$cons$(Fm$Parser$pair, List$cons$(Fm$Parser$sigma$type, List$cons$(Fm$Parser$some, List$cons$(Fm$Parser$apply, List$cons$(Fm$Parser$list, List$cons$(Fm$Parser$log, List$cons$(Fm$Parser$forin, List$cons$(Fm$Parser$do, List$cons$(Fm$Parser$case, List$cons$(Fm$Parser$open, List$cons$(Fm$Parser$goal, List$cons$(Fm$Parser$hole, List$cons$(Fm$Parser$nat, List$cons$(Fm$Parser$reference, List$nil)))))))))))))))))))))))))))))((_term$3 => {
                var $1146 = Fm$Parser$suffix(_init$2)(_term$3);
                return $1146;
            }));
            return $1145;
        }));
        return $1144;
    }));
    const Fm$Parser$name_term = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$1 => {
        var $1147 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $1148 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$3 => {
                var $1149 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _type$3));
                return $1149;
            }));
            return $1148;
        }));
        return $1147;
    }));

    function Fm$Binder$new$(_eras$1, _name$2, _term$3) {
        var $1150 = ({
            _: 'Fm.Binder.new',
            'eras': _eras$1,
            'name': _name$2,
            'term': _term$3
        });
        return $1150;
    };
    const Fm$Binder$new = x0 => x1 => x2 => Fm$Binder$new$(x0, x1, x2);

    function Fm$Parser$binder$homo$(_eras$1) {
        var $1151 = Monad$bind$(Parser$monad)(Fm$Parser$text$((() => {
            var self = _eras$1;
            if (self) {
                var $1152 = "<";
                return $1152;
            } else {
                var $1153 = "(";
                return $1153;
            };
        })()))((_$2 => {
            var $1154 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$((() => {
                var self = _eras$1;
                if (self) {
                    var $1155 = ">";
                    return $1155;
                } else {
                    var $1156 = ")";
                    return $1156;
                };
            })()), Fm$Parser$item$(Fm$Parser$name_term)))((_bind$3 => {
                var $1157 = Monad$pure$(Parser$monad)(List$mapped$(_bind$3, (_pair$4 => {
                    var self = _pair$4;
                    switch (self._) {
                        case 'Pair.new':
                            var $1159 = self.fst;
                            var $1160 = self.snd;
                            var $1161 = Fm$Binder$new$(_eras$1, $1159, $1160);
                            var $1158 = $1161;
                            break;
                    };
                    return $1158;
                })));
                return $1157;
            }));
            return $1154;
        }));
        return $1151;
    };
    const Fm$Parser$binder$homo = x0 => Fm$Parser$binder$homo$(x0);

    function List$concat$(_as$2, _bs$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $1163 = _bs$3;
                var $1162 = $1163;
                break;
            case 'List.cons':
                var $1164 = self.head;
                var $1165 = self.tail;
                var $1166 = List$cons$($1164, List$concat$($1165, _bs$3));
                var $1162 = $1166;
                break;
        };
        return $1162;
    };
    const List$concat = x0 => x1 => List$concat$(x0, x1);

    function List$flatten$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1168 = List$nil;
                var $1167 = $1168;
                break;
            case 'List.cons':
                var $1169 = self.head;
                var $1170 = self.tail;
                var $1171 = List$concat$($1169, List$flatten$($1170));
                var $1167 = $1171;
                break;
        };
        return $1167;
    };
    const List$flatten = x0 => List$flatten$(x0);
    const Fm$Parser$binder = Monad$bind$(Parser$monad)(Parser$many1$(Parser$first_of$(List$cons$(Fm$Parser$binder$homo$(Bool$true), List$cons$(Fm$Parser$binder$homo$(Bool$false), List$nil)))))((_lists$1 => {
        var $1172 = Monad$pure$(Parser$monad)(List$flatten$(_lists$1));
        return $1172;
    }));

    function Fm$Parser$make_forall$(_binds$1, _body$2) {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                var $1174 = _body$2;
                var $1173 = $1174;
                break;
            case 'List.cons':
                var $1175 = self.head;
                var $1176 = self.tail;
                var self = $1175;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1178 = self.eras;
                        var $1179 = self.name;
                        var $1180 = self.term;
                        var $1181 = Fm$Term$all$($1178, "", $1179, $1180, (_s$8 => _x$9 => {
                            var $1182 = Fm$Parser$make_forall$($1176, _body$2);
                            return $1182;
                        }));
                        var $1177 = $1181;
                        break;
                };
                var $1173 = $1177;
                break;
        };
        return $1173;
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
                        var $1183 = Maybe$none;
                        return $1183;
                    case 'List.cons':
                        var $1184 = self.head;
                        var $1185 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $1187 = Maybe$some$($1184);
                            var $1186 = $1187;
                        } else {
                            var $1188 = (self - 1n);
                            var $1189 = List$at$($1188, $1185);
                            var $1186 = $1189;
                        };
                        return $1186;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function List$at_last$(_index$2, _list$3) {
        var $1190 = List$at$(_index$2, List$reverse$(_list$3));
        return $1190;
    };
    const List$at_last = x0 => x1 => List$at_last$(x0, x1);

    function Fm$Term$var$(_name$1, _indx$2) {
        var $1191 = ({
            _: 'Fm.Term.var',
            'name': _name$1,
            'indx': _indx$2
        });
        return $1191;
    };
    const Fm$Term$var = x0 => x1 => Fm$Term$var$(x0, x1);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $1193 = self.fst;
                var $1194 = self.snd;
                var $1195 = $1194;
                var $1192 = $1195;
                break;
        };
        return $1192;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Fm$Name$eql$(_a$1, _b$2) {
        var $1196 = (_a$1 === _b$2);
        return $1196;
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
                        var $1197 = Maybe$none;
                        return $1197;
                    case 'List.cons':
                        var $1198 = self.head;
                        var $1199 = self.tail;
                        var self = $1198;
                        switch (self._) {
                            case 'Pair.new':
                                var $1201 = self.fst;
                                var $1202 = self.snd;
                                var self = Fm$Name$eql$(_name$1, $1201);
                                if (self) {
                                    var $1204 = Maybe$some$($1202);
                                    var $1203 = $1204;
                                } else {
                                    var $1205 = Fm$Context$find$(_name$1, $1199);
                                    var $1203 = $1205;
                                };
                                var $1200 = $1203;
                                break;
                        };
                        return $1200;
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
                        var $1206 = _n$3;
                        return $1206;
                    case 'List.cons':
                        var $1207 = self.head;
                        var $1208 = self.tail;
                        var $1209 = List$length$go$($1208, Nat$succ$(_n$3));
                        return $1209;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$length$go = x0 => x1 => List$length$go$(x0, x1);

    function List$length$(_xs$2) {
        var $1210 = List$length$go$(_xs$2, 0n);
        return $1210;
    };
    const List$length = x0 => List$length$(x0);

    function Fm$Path$o$(_path$1, _x$2) {
        var $1211 = _path$1((_x$2 + '0'));
        return $1211;
    };
    const Fm$Path$o = x0 => x1 => Fm$Path$o$(x0, x1);

    function Fm$Path$i$(_path$1, _x$2) {
        var $1212 = _path$1((_x$2 + '1'));
        return $1212;
    };
    const Fm$Path$i = x0 => x1 => Fm$Path$i$(x0, x1);

    function Fm$Path$to_bits$(_path$1) {
        var $1213 = _path$1(Bits$e);
        return $1213;
    };
    const Fm$Path$to_bits = x0 => Fm$Path$to_bits$(x0);

    function Fm$Term$bind$(_vars$1, _path$2, _term$3) {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $1215 = self.name;
                var $1216 = self.indx;
                var self = List$at_last$($1216, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1218 = Fm$Term$var$($1215, $1216);
                        var $1217 = $1218;
                        break;
                    case 'Maybe.some':
                        var $1219 = self.value;
                        var $1220 = Pair$snd$($1219);
                        var $1217 = $1220;
                        break;
                };
                var $1214 = $1217;
                break;
            case 'Fm.Term.ref':
                var $1221 = self.name;
                var self = Fm$Context$find$($1221, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1223 = Fm$Term$ref$($1221);
                        var $1222 = $1223;
                        break;
                    case 'Maybe.some':
                        var $1224 = self.value;
                        var $1225 = $1224;
                        var $1222 = $1225;
                        break;
                };
                var $1214 = $1222;
                break;
            case 'Fm.Term.typ':
                var $1226 = Fm$Term$typ;
                var $1214 = $1226;
                break;
            case 'Fm.Term.all':
                var $1227 = self.eras;
                var $1228 = self.self;
                var $1229 = self.name;
                var $1230 = self.xtyp;
                var $1231 = self.body;
                var _vlen$9 = List$length$(_vars$1);
                var $1232 = Fm$Term$all$($1227, $1228, $1229, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1230), (_s$10 => _x$11 => {
                    var $1233 = Fm$Term$bind$(List$cons$(Pair$new$($1229, _x$11), List$cons$(Pair$new$($1228, _s$10), _vars$1)), Fm$Path$i(_path$2), $1231(Fm$Term$var$($1228, _vlen$9))(Fm$Term$var$($1229, Nat$succ$(_vlen$9))));
                    return $1233;
                }));
                var $1214 = $1232;
                break;
            case 'Fm.Term.lam':
                var $1234 = self.name;
                var $1235 = self.body;
                var _vlen$6 = List$length$(_vars$1);
                var $1236 = Fm$Term$lam$($1234, (_x$7 => {
                    var $1237 = Fm$Term$bind$(List$cons$(Pair$new$($1234, _x$7), _vars$1), Fm$Path$o(_path$2), $1235(Fm$Term$var$($1234, _vlen$6)));
                    return $1237;
                }));
                var $1214 = $1236;
                break;
            case 'Fm.Term.app':
                var $1238 = self.func;
                var $1239 = self.argm;
                var $1240 = Fm$Term$app$(Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1238), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1239));
                var $1214 = $1240;
                break;
            case 'Fm.Term.let':
                var $1241 = self.name;
                var $1242 = self.expr;
                var $1243 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1244 = Fm$Term$let$($1241, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1242), (_x$8 => {
                    var $1245 = Fm$Term$bind$(List$cons$(Pair$new$($1241, _x$8), _vars$1), Fm$Path$i(_path$2), $1243(Fm$Term$var$($1241, _vlen$7)));
                    return $1245;
                }));
                var $1214 = $1244;
                break;
            case 'Fm.Term.def':
                var $1246 = self.name;
                var $1247 = self.expr;
                var $1248 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1249 = Fm$Term$def$($1246, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1247), (_x$8 => {
                    var $1250 = Fm$Term$bind$(List$cons$(Pair$new$($1246, _x$8), _vars$1), Fm$Path$i(_path$2), $1248(Fm$Term$var$($1246, _vlen$7)));
                    return $1250;
                }));
                var $1214 = $1249;
                break;
            case 'Fm.Term.ann':
                var $1251 = self.done;
                var $1252 = self.term;
                var $1253 = self.type;
                var $1254 = Fm$Term$ann$($1251, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1252), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1253));
                var $1214 = $1254;
                break;
            case 'Fm.Term.gol':
                var $1255 = self.name;
                var $1256 = self.dref;
                var $1257 = self.verb;
                var $1258 = Fm$Term$gol$($1255, $1256, $1257);
                var $1214 = $1258;
                break;
            case 'Fm.Term.hol':
                var $1259 = self.path;
                var $1260 = Fm$Term$hol$(Fm$Path$to_bits$(_path$2));
                var $1214 = $1260;
                break;
            case 'Fm.Term.nat':
                var $1261 = self.natx;
                var $1262 = Fm$Term$nat$($1261);
                var $1214 = $1262;
                break;
            case 'Fm.Term.chr':
                var $1263 = self.chrx;
                var $1264 = Fm$Term$chr$($1263);
                var $1214 = $1264;
                break;
            case 'Fm.Term.str':
                var $1265 = self.strx;
                var $1266 = Fm$Term$str$($1265);
                var $1214 = $1266;
                break;
            case 'Fm.Term.cse':
                var $1267 = self.path;
                var $1268 = self.expr;
                var $1269 = self.name;
                var $1270 = self.with;
                var $1271 = self.cses;
                var $1272 = self.moti;
                var _expr$10 = Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1268);
                var _name$11 = $1269;
                var _wyth$12 = $1270;
                var _cses$13 = $1271;
                var _moti$14 = $1272;
                var $1273 = Fm$Term$cse$(Fm$Path$to_bits$(_path$2), _expr$10, _name$11, _wyth$12, _cses$13, _moti$14);
                var $1214 = $1273;
                break;
            case 'Fm.Term.ori':
                var $1274 = self.orig;
                var $1275 = self.expr;
                var $1276 = Fm$Term$ori$($1274, Fm$Term$bind$(_vars$1, _path$2, $1275));
                var $1214 = $1276;
                break;
        };
        return $1214;
    };
    const Fm$Term$bind = x0 => x1 => x2 => Fm$Term$bind$(x0, x1, x2);
    const Fm$Status$done = ({
        _: 'Fm.Status.done'
    });

    function Fm$set$(_name$2, _val$3, _map$4) {
        var $1277 = Map$set$((fm_name_to_bits(_name$2)), _val$3, _map$4);
        return $1277;
    };
    const Fm$set = x0 => x1 => x2 => Fm$set$(x0, x1, x2);

    function Fm$define$(_file$1, _code$2, _name$3, _term$4, _type$5, _done$6, _defs$7) {
        var self = _done$6;
        if (self) {
            var $1279 = Fm$Status$done;
            var _stat$8 = $1279;
        } else {
            var $1280 = Fm$Status$init;
            var _stat$8 = $1280;
        };
        var $1278 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$8), _defs$7);
        return $1278;
    };
    const Fm$define = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$define$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Parser$file$def$(_file$1, _code$2, _defs$3) {
        var $1281 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
            var $1282 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$binder))((_args$5 => {
                var _args$6 = List$flatten$(_args$5);
                var $1283 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$7 => {
                    var $1284 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$8 => {
                        var $1285 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$9 => {
                            var _type$10 = Fm$Parser$make_forall$(_args$6, _type$8);
                            var _term$11 = Fm$Parser$make_lambda$(List$mapped$(_args$6, (_x$11 => {
                                var self = _x$11;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $1288 = self.eras;
                                        var $1289 = self.name;
                                        var $1290 = self.term;
                                        var $1291 = $1289;
                                        var $1287 = $1291;
                                        break;
                                };
                                return $1287;
                            })), _term$9);
                            var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                                var $1292 = (_x$12 + '1');
                                return $1292;
                            }), _type$10);
                            var _term$13 = Fm$Term$bind$(List$nil, (_x$13 => {
                                var $1293 = (_x$13 + '0');
                                return $1293;
                            }), _term$11);
                            var _defs$14 = Fm$define$(_file$1, _code$2, _name$4, _term$13, _type$12, Bool$false, _defs$3);
                            var $1286 = Monad$pure$(Parser$monad)(_defs$14);
                            return $1286;
                        }));
                        return $1285;
                    }));
                    return $1284;
                }));
                return $1283;
            }));
            return $1282;
        }));
        return $1281;
    };
    const Fm$Parser$file$def = x0 => x1 => x2 => Fm$Parser$file$def$(x0, x1, x2);

    function Maybe$default$(_a$2, _m$3) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $1295 = _a$2;
                var $1294 = $1295;
                break;
            case 'Maybe.some':
                var $1296 = self.value;
                var $1297 = $1296;
                var $1294 = $1297;
                break;
        };
        return $1294;
    };
    const Maybe$default = x0 => x1 => Maybe$default$(x0, x1);

    function Fm$Constructor$new$(_name$1, _args$2, _inds$3) {
        var $1298 = ({
            _: 'Fm.Constructor.new',
            'name': _name$1,
            'args': _args$2,
            'inds': _inds$3
        });
        return $1298;
    };
    const Fm$Constructor$new = x0 => x1 => x2 => Fm$Constructor$new$(x0, x1, x2);

    function Fm$Parser$constructor$(_namespace$1) {
        var $1299 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1300 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => {
                var $1301 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1302 = Fm$Parser$binder;
                    return $1302;
                }))))((_inds$4 => {
                    var _args$5 = Maybe$default$(List$nil, _args$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1303 = Monad$pure$(Parser$monad)(Fm$Constructor$new$(_name$2, _args$5, _inds$6));
                    return $1303;
                }));
                return $1301;
            }));
            return $1300;
        }));
        return $1299;
    };
    const Fm$Parser$constructor = x0 => Fm$Parser$constructor$(x0);

    function Fm$Datatype$new$(_name$1, _pars$2, _inds$3, _ctrs$4) {
        var $1304 = ({
            _: 'Fm.Datatype.new',
            'name': _name$1,
            'pars': _pars$2,
            'inds': _inds$3,
            'ctrs': _ctrs$4
        });
        return $1304;
    };
    const Fm$Datatype$new = x0 => x1 => x2 => x3 => Fm$Datatype$new$(x0, x1, x2, x3);
    const Fm$Parser$datatype = Monad$bind$(Parser$monad)(Fm$Parser$text$("type "))((_$1 => {
        var $1305 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1306 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => {
                var $1307 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1308 = Fm$Parser$binder;
                    return $1308;
                }))))((_inds$4 => {
                    var _pars$5 = Maybe$default$(List$nil, _pars$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1309 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$7 => {
                        var $1310 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$item$(Fm$Parser$constructor$(_name$2))))((_ctrs$8 => {
                            var $1311 = Monad$pure$(Parser$monad)(Fm$Datatype$new$(_name$2, _pars$5, _inds$6, _ctrs$8));
                            return $1311;
                        }));
                        return $1310;
                    }));
                    return $1309;
                }));
                return $1307;
            }));
            return $1306;
        }));
        return $1305;
    }));

    function Fm$Datatype$build_term$motive$go$(_type$1, _name$2, _inds$3) {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1314 = self.name;
                        var $1315 = self.pars;
                        var $1316 = self.inds;
                        var $1317 = self.ctrs;
                        var _slf$8 = Fm$Term$ref$(_name$2);
                        var _slf$9 = (() => {
                            var $1320 = _slf$8;
                            var $1321 = $1315;
                            let _slf$10 = $1320;
                            let _var$9;
                            while ($1321._ === 'List.cons') {
                                _var$9 = $1321.head;
                                var $1320 = Fm$Term$app$(_slf$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1322 = self.eras;
                                            var $1323 = self.name;
                                            var $1324 = self.term;
                                            var $1325 = $1323;
                                            return $1325;
                                    };
                                })()));
                                _slf$10 = $1320;
                                $1321 = $1321.tail;
                            }
                            return _slf$10;
                        })();
                        var _slf$10 = (() => {
                            var $1327 = _slf$9;
                            var $1328 = $1316;
                            let _slf$11 = $1327;
                            let _var$10;
                            while ($1328._ === 'List.cons') {
                                _var$10 = $1328.head;
                                var $1327 = Fm$Term$app$(_slf$11, Fm$Term$ref$((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1329 = self.eras;
                                            var $1330 = self.name;
                                            var $1331 = self.term;
                                            var $1332 = $1330;
                                            return $1332;
                                    };
                                })()));
                                _slf$11 = $1327;
                                $1328 = $1328.tail;
                            }
                            return _slf$11;
                        })();
                        var $1318 = Fm$Term$all$(Bool$false, "", "", _slf$10, (_s$11 => _x$12 => {
                            var $1333 = Fm$Term$typ;
                            return $1333;
                        }));
                        var $1313 = $1318;
                        break;
                };
                var $1312 = $1313;
                break;
            case 'List.cons':
                var $1334 = self.head;
                var $1335 = self.tail;
                var self = $1334;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1337 = self.eras;
                        var $1338 = self.name;
                        var $1339 = self.term;
                        var $1340 = Fm$Term$all$($1337, "", $1338, $1339, (_s$9 => _x$10 => {
                            var $1341 = Fm$Datatype$build_term$motive$go$(_type$1, _name$2, $1335);
                            return $1341;
                        }));
                        var $1336 = $1340;
                        break;
                };
                var $1312 = $1336;
                break;
        };
        return $1312;
    };
    const Fm$Datatype$build_term$motive$go = x0 => x1 => x2 => Fm$Datatype$build_term$motive$go$(x0, x1, x2);

    function Fm$Datatype$build_term$motive$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1343 = self.name;
                var $1344 = self.pars;
                var $1345 = self.inds;
                var $1346 = self.ctrs;
                var $1347 = Fm$Datatype$build_term$motive$go$(_type$1, $1343, $1345);
                var $1342 = $1347;
                break;
        };
        return $1342;
    };
    const Fm$Datatype$build_term$motive = x0 => Fm$Datatype$build_term$motive$(x0);

    function Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, _args$3) {
        var self = _args$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1350 = self.name;
                        var $1351 = self.pars;
                        var $1352 = self.inds;
                        var $1353 = self.ctrs;
                        var self = _ctor$2;
                        switch (self._) {
                            case 'Fm.Constructor.new':
                                var $1355 = self.name;
                                var $1356 = self.args;
                                var $1357 = self.inds;
                                var _ret$11 = Fm$Term$ref$(Fm$Name$read$("P"));
                                var _ret$12 = (() => {
                                    var $1360 = _ret$11;
                                    var $1361 = $1357;
                                    let _ret$13 = $1360;
                                    let _var$12;
                                    while ($1361._ === 'List.cons') {
                                        _var$12 = $1361.head;
                                        var $1360 = Fm$Term$app$(_ret$13, (() => {
                                            var self = _var$12;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1362 = self.eras;
                                                    var $1363 = self.name;
                                                    var $1364 = self.term;
                                                    var $1365 = $1364;
                                                    return $1365;
                                            };
                                        })());
                                        _ret$13 = $1360;
                                        $1361 = $1361.tail;
                                    }
                                    return _ret$13;
                                })();
                                var _ctr$13 = String$flatten$(List$cons$($1350, List$cons$(Fm$Name$read$("."), List$cons$($1355, List$nil))));
                                var _slf$14 = Fm$Term$ref$(_ctr$13);
                                var _slf$15 = (() => {
                                    var $1367 = _slf$14;
                                    var $1368 = $1351;
                                    let _slf$16 = $1367;
                                    let _var$15;
                                    while ($1368._ === 'List.cons') {
                                        _var$15 = $1368.head;
                                        var $1367 = Fm$Term$app$(_slf$16, Fm$Term$ref$((() => {
                                            var self = _var$15;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1369 = self.eras;
                                                    var $1370 = self.name;
                                                    var $1371 = self.term;
                                                    var $1372 = $1370;
                                                    return $1372;
                                            };
                                        })()));
                                        _slf$16 = $1367;
                                        $1368 = $1368.tail;
                                    }
                                    return _slf$16;
                                })();
                                var _slf$16 = (() => {
                                    var $1374 = _slf$15;
                                    var $1375 = $1356;
                                    let _slf$17 = $1374;
                                    let _var$16;
                                    while ($1375._ === 'List.cons') {
                                        _var$16 = $1375.head;
                                        var $1374 = Fm$Term$app$(_slf$17, Fm$Term$ref$((() => {
                                            var self = _var$16;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1376 = self.eras;
                                                    var $1377 = self.name;
                                                    var $1378 = self.term;
                                                    var $1379 = $1377;
                                                    return $1379;
                                            };
                                        })()));
                                        _slf$17 = $1374;
                                        $1375 = $1375.tail;
                                    }
                                    return _slf$17;
                                })();
                                var $1358 = Fm$Term$app$(_ret$12, _slf$16);
                                var $1354 = $1358;
                                break;
                        };
                        var $1349 = $1354;
                        break;
                };
                var $1348 = $1349;
                break;
            case 'List.cons':
                var $1380 = self.head;
                var $1381 = self.tail;
                var self = $1380;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1383 = self.eras;
                        var $1384 = self.name;
                        var $1385 = self.term;
                        var _eras$9 = $1383;
                        var _name$10 = $1384;
                        var _xtyp$11 = $1385;
                        var _body$12 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1381);
                        var $1386 = Fm$Term$all$(_eras$9, "", _name$10, _xtyp$11, (_s$13 => _x$14 => {
                            var $1387 = _body$12;
                            return $1387;
                        }));
                        var $1382 = $1386;
                        break;
                };
                var $1348 = $1382;
                break;
        };
        return $1348;
    };
    const Fm$Datatype$build_term$constructor$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructor$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructor$(_type$1, _ctor$2) {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $1389 = self.name;
                var $1390 = self.args;
                var $1391 = self.inds;
                var $1392 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1390);
                var $1388 = $1392;
                break;
        };
        return $1388;
    };
    const Fm$Datatype$build_term$constructor = x0 => x1 => Fm$Datatype$build_term$constructor$(x0, x1);

    function Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1395 = self.name;
                        var $1396 = self.pars;
                        var $1397 = self.inds;
                        var $1398 = self.ctrs;
                        var _ret$8 = Fm$Term$ref$(Fm$Name$read$("P"));
                        var _ret$9 = (() => {
                            var $1401 = _ret$8;
                            var $1402 = $1397;
                            let _ret$10 = $1401;
                            let _var$9;
                            while ($1402._ === 'List.cons') {
                                _var$9 = $1402.head;
                                var $1401 = Fm$Term$app$(_ret$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1403 = self.eras;
                                            var $1404 = self.name;
                                            var $1405 = self.term;
                                            var $1406 = $1404;
                                            return $1406;
                                    };
                                })()));
                                _ret$10 = $1401;
                                $1402 = $1402.tail;
                            }
                            return _ret$10;
                        })();
                        var $1399 = Fm$Term$app$(_ret$9, Fm$Term$ref$((_name$2 + ".Self")));
                        var $1394 = $1399;
                        break;
                };
                var $1393 = $1394;
                break;
            case 'List.cons':
                var $1407 = self.head;
                var $1408 = self.tail;
                var self = $1407;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1410 = self.name;
                        var $1411 = self.args;
                        var $1412 = self.inds;
                        var $1413 = Fm$Term$all$(Bool$false, "", $1410, Fm$Datatype$build_term$constructor$(_type$1, $1407), (_s$9 => _x$10 => {
                            var $1414 = Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, $1408);
                            return $1414;
                        }));
                        var $1409 = $1413;
                        break;
                };
                var $1393 = $1409;
                break;
        };
        return $1393;
    };
    const Fm$Datatype$build_term$constructors$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructors$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructors$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1416 = self.name;
                var $1417 = self.pars;
                var $1418 = self.inds;
                var $1419 = self.ctrs;
                var $1420 = Fm$Datatype$build_term$constructors$go$(_type$1, $1416, $1419);
                var $1415 = $1420;
                break;
        };
        return $1415;
    };
    const Fm$Datatype$build_term$constructors = x0 => Fm$Datatype$build_term$constructors$(x0);

    function Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1423 = Fm$Term$all$(Bool$true, (_name$2 + ".Self"), Fm$Name$read$("P"), Fm$Datatype$build_term$motive$(_type$1), (_s$5 => _x$6 => {
                            var $1424 = Fm$Datatype$build_term$constructors$(_type$1);
                            return $1424;
                        }));
                        var $1422 = $1423;
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
                                var $1431 = Fm$Term$lam$($1429, (_x$10 => {
                                    var $1432 = Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, $1426);
                                    return $1432;
                                }));
                                var $1427 = $1431;
                                break;
                        };
                        var $1422 = $1427;
                        break;
                };
                var $1421 = $1422;
                break;
            case 'List.cons':
                var $1433 = self.head;
                var $1434 = self.tail;
                var self = $1433;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1436 = self.eras;
                        var $1437 = self.name;
                        var $1438 = self.term;
                        var $1439 = Fm$Term$lam$($1437, (_x$10 => {
                            var $1440 = Fm$Datatype$build_term$go$(_type$1, _name$2, $1434, _inds$4);
                            return $1440;
                        }));
                        var $1435 = $1439;
                        break;
                };
                var $1421 = $1435;
                break;
        };
        return $1421;
    };
    const Fm$Datatype$build_term$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_term$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_term$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1442 = self.name;
                var $1443 = self.pars;
                var $1444 = self.inds;
                var $1445 = self.ctrs;
                var $1446 = Fm$Datatype$build_term$go$(_type$1, $1442, $1443, $1444);
                var $1441 = $1446;
                break;
        };
        return $1441;
    };
    const Fm$Datatype$build_term = x0 => Fm$Datatype$build_term$(x0);

    function Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1449 = Fm$Term$typ;
                        var $1448 = $1449;
                        break;
                    case 'List.cons':
                        var $1450 = self.head;
                        var $1451 = self.tail;
                        var self = $1450;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1453 = self.eras;
                                var $1454 = self.name;
                                var $1455 = self.term;
                                var $1456 = Fm$Term$all$(Bool$false, "", $1454, $1455, (_s$10 => _x$11 => {
                                    var $1457 = Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, $1451);
                                    return $1457;
                                }));
                                var $1452 = $1456;
                                break;
                        };
                        var $1448 = $1452;
                        break;
                };
                var $1447 = $1448;
                break;
            case 'List.cons':
                var $1458 = self.head;
                var $1459 = self.tail;
                var self = $1458;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1461 = self.eras;
                        var $1462 = self.name;
                        var $1463 = self.term;
                        var $1464 = Fm$Term$all$(Bool$false, "", $1462, $1463, (_s$10 => _x$11 => {
                            var $1465 = Fm$Datatype$build_type$go$(_type$1, _name$2, $1459, _inds$4);
                            return $1465;
                        }));
                        var $1460 = $1464;
                        break;
                };
                var $1447 = $1460;
                break;
        };
        return $1447;
    };
    const Fm$Datatype$build_type$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_type$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_type$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1467 = self.name;
                var $1468 = self.pars;
                var $1469 = self.inds;
                var $1470 = self.ctrs;
                var $1471 = Fm$Datatype$build_type$go$(_type$1, $1467, $1468, $1469);
                var $1466 = $1471;
                break;
        };
        return $1466;
    };
    const Fm$Datatype$build_type = x0 => Fm$Datatype$build_type$(x0);

    function Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1474 = self.name;
                        var $1475 = self.args;
                        var $1476 = self.inds;
                        var _ret$7 = Fm$Term$ref$($1474);
                        var _ret$8 = (() => {
                            var $1479 = _ret$7;
                            var $1480 = $1475;
                            let _ret$9 = $1479;
                            let _arg$8;
                            while ($1480._ === 'List.cons') {
                                _arg$8 = $1480.head;
                                var $1479 = Fm$Term$app$(_ret$9, Fm$Term$ref$((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1481 = self.eras;
                                            var $1482 = self.name;
                                            var $1483 = self.term;
                                            var $1484 = $1482;
                                            return $1484;
                                    };
                                })()));
                                _ret$9 = $1479;
                                $1480 = $1480.tail;
                            }
                            return _ret$9;
                        })();
                        var $1477 = _ret$8;
                        var $1473 = $1477;
                        break;
                };
                var $1472 = $1473;
                break;
            case 'List.cons':
                var $1485 = self.head;
                var $1486 = self.tail;
                var self = $1485;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1488 = self.name;
                        var $1489 = self.args;
                        var $1490 = self.inds;
                        var $1491 = Fm$Term$lam$($1488, (_x$9 => {
                            var $1492 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1486);
                            return $1492;
                        }));
                        var $1487 = $1491;
                        break;
                };
                var $1472 = $1487;
                break;
        };
        return $1472;
    };
    const Fm$Constructor$build_term$opt$go = x0 => x1 => x2 => Fm$Constructor$build_term$opt$go$(x0, x1, x2);

    function Fm$Constructor$build_term$opt$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1494 = self.name;
                var $1495 = self.pars;
                var $1496 = self.inds;
                var $1497 = self.ctrs;
                var $1498 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1497);
                var $1493 = $1498;
                break;
        };
        return $1493;
    };
    const Fm$Constructor$build_term$opt = x0 => x1 => Fm$Constructor$build_term$opt$(x0, x1);

    function Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var $1501 = Fm$Term$lam$(Fm$Name$read$("P"), (_x$6 => {
                            var $1502 = Fm$Constructor$build_term$opt$(_type$1, _ctor$2);
                            return $1502;
                        }));
                        var $1500 = $1501;
                        break;
                    case 'List.cons':
                        var $1503 = self.head;
                        var $1504 = self.tail;
                        var self = $1503;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1506 = self.eras;
                                var $1507 = self.name;
                                var $1508 = self.term;
                                var $1509 = Fm$Term$lam$($1507, (_x$11 => {
                                    var $1510 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, $1504);
                                    return $1510;
                                }));
                                var $1505 = $1509;
                                break;
                        };
                        var $1500 = $1505;
                        break;
                };
                var $1499 = $1500;
                break;
            case 'List.cons':
                var $1511 = self.head;
                var $1512 = self.tail;
                var self = $1511;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1514 = self.eras;
                        var $1515 = self.name;
                        var $1516 = self.term;
                        var $1517 = Fm$Term$lam$($1515, (_x$11 => {
                            var $1518 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, $1512, _args$5);
                            return $1518;
                        }));
                        var $1513 = $1517;
                        break;
                };
                var $1499 = $1513;
                break;
        };
        return $1499;
    };
    const Fm$Constructor$build_term$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_term$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_term$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1520 = self.name;
                var $1521 = self.pars;
                var $1522 = self.inds;
                var $1523 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1525 = self.name;
                        var $1526 = self.args;
                        var $1527 = self.inds;
                        var $1528 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, $1520, $1521, $1526);
                        var $1524 = $1528;
                        break;
                };
                var $1519 = $1524;
                break;
        };
        return $1519;
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
                                var $1532 = self.name;
                                var $1533 = self.pars;
                                var $1534 = self.inds;
                                var $1535 = self.ctrs;
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $1537 = self.name;
                                        var $1538 = self.args;
                                        var $1539 = self.inds;
                                        var _type$13 = Fm$Term$ref$(_name$3);
                                        var _type$14 = (() => {
                                            var $1542 = _type$13;
                                            var $1543 = $1533;
                                            let _type$15 = $1542;
                                            let _var$14;
                                            while ($1543._ === 'List.cons') {
                                                _var$14 = $1543.head;
                                                var $1542 = Fm$Term$app$(_type$15, Fm$Term$ref$((() => {
                                                    var self = _var$14;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1544 = self.eras;
                                                            var $1545 = self.name;
                                                            var $1546 = self.term;
                                                            var $1547 = $1545;
                                                            return $1547;
                                                    };
                                                })()));
                                                _type$15 = $1542;
                                                $1543 = $1543.tail;
                                            }
                                            return _type$15;
                                        })();
                                        var _type$15 = (() => {
                                            var $1549 = _type$14;
                                            var $1550 = $1539;
                                            let _type$16 = $1549;
                                            let _var$15;
                                            while ($1550._ === 'List.cons') {
                                                _var$15 = $1550.head;
                                                var $1549 = Fm$Term$app$(_type$16, (() => {
                                                    var self = _var$15;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1551 = self.eras;
                                                            var $1552 = self.name;
                                                            var $1553 = self.term;
                                                            var $1554 = $1553;
                                                            return $1554;
                                                    };
                                                })());
                                                _type$16 = $1549;
                                                $1550 = $1550.tail;
                                            }
                                            return _type$16;
                                        })();
                                        var $1540 = _type$15;
                                        var $1536 = $1540;
                                        break;
                                };
                                var $1531 = $1536;
                                break;
                        };
                        var $1530 = $1531;
                        break;
                    case 'List.cons':
                        var $1555 = self.head;
                        var $1556 = self.tail;
                        var self = $1555;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1558 = self.eras;
                                var $1559 = self.name;
                                var $1560 = self.term;
                                var $1561 = Fm$Term$all$($1558, "", $1559, $1560, (_s$11 => _x$12 => {
                                    var $1562 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, $1556);
                                    return $1562;
                                }));
                                var $1557 = $1561;
                                break;
                        };
                        var $1530 = $1557;
                        break;
                };
                var $1529 = $1530;
                break;
            case 'List.cons':
                var $1563 = self.head;
                var $1564 = self.tail;
                var self = $1563;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1566 = self.eras;
                        var $1567 = self.name;
                        var $1568 = self.term;
                        var $1569 = Fm$Term$all$($1566, "", $1567, $1568, (_s$11 => _x$12 => {
                            var $1570 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, $1564, _args$5);
                            return $1570;
                        }));
                        var $1565 = $1569;
                        break;
                };
                var $1529 = $1565;
                break;
        };
        return $1529;
    };
    const Fm$Constructor$build_type$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_type$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_type$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1572 = self.name;
                var $1573 = self.pars;
                var $1574 = self.inds;
                var $1575 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1577 = self.name;
                        var $1578 = self.args;
                        var $1579 = self.inds;
                        var $1580 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, $1572, $1573, $1578);
                        var $1576 = $1580;
                        break;
                };
                var $1571 = $1576;
                break;
        };
        return $1571;
    };
    const Fm$Constructor$build_type = x0 => x1 => Fm$Constructor$build_type$(x0, x1);

    function Fm$Parser$file$adt$(_file$1, _code$2, _defs$3) {
        var $1581 = Monad$bind$(Parser$monad)(Fm$Parser$datatype)((_adt$4 => {
            var self = _adt$4;
            switch (self._) {
                case 'Fm.Datatype.new':
                    var $1583 = self.name;
                    var $1584 = self.pars;
                    var $1585 = self.inds;
                    var $1586 = self.ctrs;
                    var _term$9 = Fm$Datatype$build_term$(_adt$4);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $1588 = (_x$10 + '1');
                        return $1588;
                    }), _term$9);
                    var _type$11 = Fm$Datatype$build_type$(_adt$4);
                    var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                        var $1589 = (_x$12 + '0');
                        return $1589;
                    }), _type$11);
                    var _defs$13 = Fm$define$(_file$1, _code$2, $1583, _term$10, _type$12, Bool$false, _defs$3);
                    var _defs$14 = List$fold$($1586, _defs$13, (_ctr$14 => _defs$15 => {
                        var _typ_name$16 = $1583;
                        var _ctr_name$17 = String$flatten$(List$cons$(_typ_name$16, List$cons$(Fm$Name$read$("."), List$cons$((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $1591 = self.name;
                                    var $1592 = self.args;
                                    var $1593 = self.inds;
                                    var $1594 = $1591;
                                    return $1594;
                            };
                        })(), List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term$(_adt$4, _ctr$14);
                        var _ctr_term$19 = Fm$Term$bind$(List$nil, (_x$19 => {
                            var $1595 = (_x$19 + '1');
                            return $1595;
                        }), _ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type$(_adt$4, _ctr$14);
                        var _ctr_type$21 = Fm$Term$bind$(List$nil, (_x$21 => {
                            var $1596 = (_x$21 + '0');
                            return $1596;
                        }), _ctr_type$20);
                        var $1590 = Fm$define$(_file$1, _code$2, _ctr_name$17, _ctr_term$19, _ctr_type$21, Bool$false, _defs$15);
                        return $1590;
                    }));
                    var $1587 = Monad$pure$(Parser$monad)(_defs$14);
                    var $1582 = $1587;
                    break;
            };
            return $1582;
        }));
        return $1581;
    };
    const Fm$Parser$file$adt = x0 => x1 => x2 => Fm$Parser$file$adt$(x0, x1, x2);

    function Parser$eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $1598 = Parser$Reply$value$(_idx$1, _code$2, Unit$new);
            var $1597 = $1598;
        } else {
            var $1599 = self.charCodeAt(0);
            var $1600 = self.slice(1);
            var $1601 = Parser$Reply$error$(_idx$1, _code$2, "Expected end-of-file.");
            var $1597 = $1601;
        };
        return $1597;
    };
    const Parser$eof = x0 => x1 => Parser$eof$(x0, x1);

    function Fm$Parser$file$end$(_file$1, _code$2, _defs$3) {
        var $1602 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$4 => {
            var $1603 = Monad$bind$(Parser$monad)(Parser$eof)((_$5 => {
                var $1604 = Monad$pure$(Parser$monad)(_defs$3);
                return $1604;
            }));
            return $1603;
        }));
        return $1602;
    };
    const Fm$Parser$file$end = x0 => x1 => x2 => Fm$Parser$file$end$(x0, x1, x2);

    function Fm$Parser$file$(_file$1, _code$2, _defs$3) {
        var $1605 = Monad$bind$(Parser$monad)(Parser$is_eof)((_stop$4 => {
            var self = _stop$4;
            if (self) {
                var $1607 = Monad$pure$(Parser$monad)(_defs$3);
                var $1606 = $1607;
            } else {
                var $1608 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("#"))((_$5 => {
                    var $1609 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_file$6 => {
                        var $1610 = Fm$Parser$file$(_file$6, _code$2, _defs$3);
                        return $1610;
                    }));
                    return $1609;
                })), List$cons$(Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$file$def$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$adt$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$end$(_file$1, _code$2, _defs$3), List$nil)))))((_defs$5 => {
                    var $1611 = Fm$Parser$file$(_file$1, _code$2, _defs$5);
                    return $1611;
                })), List$nil)));
                var $1606 = $1608;
            };
            return $1606;
        }));
        return $1605;
    };
    const Fm$Parser$file = x0 => x1 => x2 => Fm$Parser$file$(x0, x1, x2);

    function Either$(_A$1, _B$2) {
        var $1612 = null;
        return $1612;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function String$join$go$(_sep$1, _list$2, _fst$3) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $1614 = "";
                var $1613 = $1614;
                break;
            case 'List.cons':
                var $1615 = self.head;
                var $1616 = self.tail;
                var $1617 = String$flatten$(List$cons$((() => {
                    var self = _fst$3;
                    if (self) {
                        var $1618 = "";
                        return $1618;
                    } else {
                        var $1619 = _sep$1;
                        return $1619;
                    };
                })(), List$cons$($1615, List$cons$(String$join$go$(_sep$1, $1616, Bool$false), List$nil))));
                var $1613 = $1617;
                break;
        };
        return $1613;
    };
    const String$join$go = x0 => x1 => x2 => String$join$go$(x0, x1, x2);

    function String$join$(_sep$1, _list$2) {
        var $1620 = String$join$go$(_sep$1, _list$2, Bool$true);
        return $1620;
    };
    const String$join = x0 => x1 => String$join$(x0, x1);

    function Fm$highlight$end$(_col$1, _row$2, _res$3) {
        var $1621 = String$join$("\u{a}", _res$3);
        return $1621;
    };
    const Fm$highlight$end = x0 => x1 => x2 => Fm$highlight$end$(x0, x1, x2);

    function Maybe$extract$(_m$2, _a$4, _f$5) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1623 = _a$4;
                var $1622 = $1623;
                break;
            case 'Maybe.some':
                var $1624 = self.value;
                var $1625 = _f$5($1624);
                var $1622 = $1625;
                break;
        };
        return $1622;
    };
    const Maybe$extract = x0 => x1 => x2 => Maybe$extract$(x0, x1, x2);

    function Nat$is_zero$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1627 = Bool$true;
            var $1626 = $1627;
        } else {
            var $1628 = (self - 1n);
            var $1629 = Bool$false;
            var $1626 = $1629;
        };
        return $1626;
    };
    const Nat$is_zero = x0 => Nat$is_zero$(x0);

    function Nat$double$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1631 = Nat$zero;
            var $1630 = $1631;
        } else {
            var $1632 = (self - 1n);
            var $1633 = Nat$succ$(Nat$succ$(Nat$double$($1632)));
            var $1630 = $1633;
        };
        return $1630;
    };
    const Nat$double = x0 => Nat$double$(x0);

    function Nat$pred$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1635 = Nat$zero;
            var $1634 = $1635;
        } else {
            var $1636 = (self - 1n);
            var $1637 = $1636;
            var $1634 = $1637;
        };
        return $1634;
    };
    const Nat$pred = x0 => Nat$pred$(x0);

    function List$take$(_n$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                var $1639 = List$nil;
                var $1638 = $1639;
                break;
            case 'List.cons':
                var $1640 = self.head;
                var $1641 = self.tail;
                var self = _n$2;
                if (self === 0n) {
                    var $1643 = List$nil;
                    var $1642 = $1643;
                } else {
                    var $1644 = (self - 1n);
                    var $1645 = List$cons$($1640, List$take$($1644, $1641));
                    var $1642 = $1645;
                };
                var $1638 = $1642;
                break;
        };
        return $1638;
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
                    var $1646 = _res$2;
                    return $1646;
                } else {
                    var $1647 = self.charCodeAt(0);
                    var $1648 = self.slice(1);
                    var $1649 = String$reverse$go$($1648, String$cons$($1647, _res$2));
                    return $1649;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$reverse$go = x0 => x1 => String$reverse$go$(x0, x1);

    function String$reverse$(_xs$1) {
        var $1650 = String$reverse$go$(_xs$1, String$nil);
        return $1650;
    };
    const String$reverse = x0 => String$reverse$(x0);

    function String$pad_right$(_size$1, _chr$2, _str$3) {
        var self = _size$1;
        if (self === 0n) {
            var $1652 = _str$3;
            var $1651 = $1652;
        } else {
            var $1653 = (self - 1n);
            var self = _str$3;
            if (self.length === 0) {
                var $1655 = String$cons$(_chr$2, String$pad_right$($1653, _chr$2, ""));
                var $1654 = $1655;
            } else {
                var $1656 = self.charCodeAt(0);
                var $1657 = self.slice(1);
                var $1658 = String$cons$($1656, String$pad_right$($1653, _chr$2, $1657));
                var $1654 = $1658;
            };
            var $1651 = $1654;
        };
        return $1651;
    };
    const String$pad_right = x0 => x1 => x2 => String$pad_right$(x0, x1, x2);

    function String$pad_left$(_size$1, _chr$2, _str$3) {
        var $1659 = String$reverse$(String$pad_right$(_size$1, _chr$2, String$reverse$(_str$3)));
        return $1659;
    };
    const String$pad_left = x0 => x1 => x2 => String$pad_left$(x0, x1, x2);

    function Either$left$(_value$3) {
        var $1660 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $1660;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $1661 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $1661;
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
                    var $1662 = Either$left$(_n$1);
                    return $1662;
                } else {
                    var $1663 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $1665 = Either$right$(Nat$succ$($1663));
                        var $1664 = $1665;
                    } else {
                        var $1666 = (self - 1n);
                        var $1667 = Nat$sub_rem$($1666, $1663);
                        var $1664 = $1667;
                    };
                    return $1664;
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
                        var $1668 = self.value;
                        var $1669 = Nat$div_mod$go$($1668, _m$2, Nat$succ$(_d$3));
                        return $1669;
                    case 'Either.right':
                        var $1670 = self.value;
                        var $1671 = Pair$new$(_d$3, _n$1);
                        return $1671;
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
                        var $1672 = self.fst;
                        var $1673 = self.snd;
                        var self = $1672;
                        if (self === 0n) {
                            var $1675 = List$cons$($1673, _res$3);
                            var $1674 = $1675;
                        } else {
                            var $1676 = (self - 1n);
                            var $1677 = Nat$to_base$go$(_base$1, $1672, List$cons$($1673, _res$3));
                            var $1674 = $1677;
                        };
                        return $1674;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $1678 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $1678;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);

    function Nat$mod$(_n$1, _m$2) {
        var $1679 = Pair$snd$((({
            _: 'Pair.new',
            'fst': _n$1 / _m$2,
            'snd': _n$1 % _m$2
        })));
        return $1679;
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
                    var $1682 = 35;
                    var $1681 = $1682;
                    break;
                case 'Maybe.some':
                    var $1683 = self.value;
                    var $1684 = $1683;
                    var $1681 = $1684;
                    break;
            };
            var $1680 = $1681;
        } else {
            var $1685 = 35;
            var $1680 = $1685;
        };
        return $1680;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $1686 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $1687 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $1687;
        }));
        return $1686;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function Nat$show$(_n$1) {
        var $1688 = Nat$to_string_base$(10n, _n$1);
        return $1688;
    };
    const Nat$show = x0 => Nat$show$(x0);
    const Bool$not = a0 => (!a0);

    function Fm$color$(_col$1, _str$2) {
        var $1689 = String$cons$(27, String$cons$(91, (_col$1 + String$cons$(109, (_str$2 + String$cons$(27, String$cons$(91, String$cons$(48, String$cons$(109, String$nil)))))))));
        return $1689;
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
                    var $1690 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                    return $1690;
                } else {
                    var $1691 = self.charCodeAt(0);
                    var $1692 = self.slice(1);
                    var self = ($1691 === 10);
                    if (self) {
                        var _stp$11 = Maybe$extract$(_lft$6, Bool$false, Nat$is_zero);
                        var self = _stp$11;
                        if (self) {
                            var $1695 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                            var $1694 = $1695;
                        } else {
                            var _spa$12 = 3n;
                            var _siz$13 = Nat$succ$(Nat$double$(_spa$12));
                            var self = _ix1$3;
                            if (self === 0n) {
                                var self = _lft$6;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $1698 = Maybe$some$(_spa$12);
                                        var $1697 = $1698;
                                        break;
                                    case 'Maybe.some':
                                        var $1699 = self.value;
                                        var $1700 = Maybe$some$(Nat$pred$($1699));
                                        var $1697 = $1700;
                                        break;
                                };
                                var _lft$14 = $1697;
                            } else {
                                var $1701 = (self - 1n);
                                var $1702 = _lft$6;
                                var _lft$14 = $1702;
                            };
                            var _ix0$15 = Nat$pred$(_ix0$2);
                            var _ix1$16 = Nat$pred$(_ix1$3);
                            var _col$17 = 0n;
                            var _row$18 = Nat$succ$(_row$5);
                            var _res$19 = List$take$(_siz$13, List$cons$(String$reverse$(_lin$7), _res$8));
                            var _lin$20 = String$reverse$(String$flatten$(List$cons$(String$pad_left$(4n, 32, Nat$show$(_row$18)), List$cons$(" | ", List$nil))));
                            var $1696 = Fm$highlight$tc$($1692, _ix0$15, _ix1$16, _col$17, _row$18, _lft$14, _lin$20, _res$19);
                            var $1694 = $1696;
                        };
                        var $1693 = $1694;
                    } else {
                        var _chr$11 = String$cons$($1691, String$nil);
                        var self = (Nat$is_zero$(_ix0$2) && (!Nat$is_zero$(_ix1$3)));
                        if (self) {
                            var $1704 = String$reverse$(Fm$color$("31", Fm$color$("4", _chr$11)));
                            var _chr$12 = $1704;
                        } else {
                            var $1705 = _chr$11;
                            var _chr$12 = $1705;
                        };
                        var _ix0$13 = Nat$pred$(_ix0$2);
                        var _ix1$14 = Nat$pred$(_ix1$3);
                        var _col$15 = Nat$succ$(_col$4);
                        var _lin$16 = String$flatten$(List$cons$(_chr$12, List$cons$(_lin$7, List$nil)));
                        var $1703 = Fm$highlight$tc$($1692, _ix0$13, _ix1$14, _col$15, _row$5, _lft$6, _lin$16, _res$8);
                        var $1693 = $1703;
                    };
                    return $1693;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$highlight$tc = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$highlight$tc$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$highlight$(_code$1, _idx0$2, _idx1$3) {
        var $1706 = Fm$highlight$tc$(_code$1, _idx0$2, _idx1$3, 0n, 1n, Maybe$none, String$reverse$("   1 | "), List$nil);
        return $1706;
    };
    const Fm$highlight = x0 => x1 => x2 => Fm$highlight$(x0, x1, x2);

    function Fm$Defs$read$(_file$1, _code$2, _defs$3) {
        var self = Fm$Parser$file$(_file$1, _code$2, _defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1708 = self.idx;
                var $1709 = self.code;
                var $1710 = self.err;
                var _err$7 = $1710;
                var _hig$8 = Fm$highlight$(_code$2, $1708, Nat$succ$($1708));
                var _str$9 = String$flatten$(List$cons$(_err$7, List$cons$("\u{a}", List$cons$(_hig$8, List$nil))));
                var $1711 = Either$left$(_str$9);
                var $1707 = $1711;
                break;
            case 'Parser.Reply.value':
                var $1712 = self.idx;
                var $1713 = self.code;
                var $1714 = self.val;
                var $1715 = Either$right$($1714);
                var $1707 = $1715;
                break;
        };
        return $1707;
    };
    const Fm$Defs$read = x0 => x1 => x2 => Fm$Defs$read$(x0, x1, x2);

    function Fm$Synth$load$(_name$1, _defs$2) {
        var _file$3 = Fm$Synth$file_of$(_name$1);
        var $1716 = Monad$bind$(IO$monad)(IO$get_file$(_file$3))((_code$4 => {
            var _read$5 = Fm$Defs$read$(_file$3, _code$4, _defs$2);
            var self = _read$5;
            switch (self._) {
                case 'Either.left':
                    var $1718 = self.value;
                    var $1719 = Monad$pure$(IO$monad)(Maybe$none);
                    var $1717 = $1719;
                    break;
                case 'Either.right':
                    var $1720 = self.value;
                    var _defs$7 = $1720;
                    var self = Fm$get$(_name$1, _defs$7);
                    switch (self._) {
                        case 'Maybe.none':
                            var $1722 = Monad$pure$(IO$monad)(Maybe$none);
                            var $1721 = $1722;
                            break;
                        case 'Maybe.some':
                            var $1723 = self.value;
                            var $1724 = Monad$pure$(IO$monad)(Maybe$some$(_defs$7));
                            var $1721 = $1724;
                            break;
                    };
                    var $1717 = $1721;
                    break;
            };
            return $1717;
        }));
        return $1716;
    };
    const Fm$Synth$load = x0 => x1 => Fm$Synth$load$(x0, x1);

    function IO$print$(_text$1) {
        var $1725 = IO$ask$("print", _text$1, (_skip$2 => {
            var $1726 = IO$end$(Unit$new);
            return $1726;
        }));
        return $1725;
    };
    const IO$print = x0 => IO$print$(x0);
    const Fm$Status$wait = ({
        _: 'Fm.Status.wait'
    });

    function Fm$Check$(_V$1) {
        var $1727 = null;
        return $1727;
    };
    const Fm$Check = x0 => Fm$Check$(x0);

    function Fm$Check$result$(_value$2, _errors$3) {
        var $1728 = ({
            _: 'Fm.Check.result',
            'value': _value$2,
            'errors': _errors$3
        });
        return $1728;
    };
    const Fm$Check$result = x0 => x1 => Fm$Check$result$(x0, x1);

    function Fm$Check$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'Fm.Check.result':
                var $1730 = self.value;
                var $1731 = self.errors;
                var self = $1730;
                switch (self._) {
                    case 'Maybe.none':
                        var $1733 = Fm$Check$result$(Maybe$none, $1731);
                        var $1732 = $1733;
                        break;
                    case 'Maybe.some':
                        var $1734 = self.value;
                        var self = _f$4($1734);
                        switch (self._) {
                            case 'Fm.Check.result':
                                var $1736 = self.value;
                                var $1737 = self.errors;
                                var $1738 = Fm$Check$result$($1736, List$concat$($1731, $1737));
                                var $1735 = $1738;
                                break;
                        };
                        var $1732 = $1735;
                        break;
                };
                var $1729 = $1732;
                break;
        };
        return $1729;
    };
    const Fm$Check$bind = x0 => x1 => Fm$Check$bind$(x0, x1);

    function Fm$Check$pure$(_value$2) {
        var $1739 = Fm$Check$result$(Maybe$some$(_value$2), List$nil);
        return $1739;
    };
    const Fm$Check$pure = x0 => Fm$Check$pure$(x0);
    const Fm$Check$monad = Monad$new$(Fm$Check$bind, Fm$Check$pure);

    function Fm$Error$undefined_reference$(_origin$1, _name$2) {
        var $1740 = ({
            _: 'Fm.Error.undefined_reference',
            'origin': _origin$1,
            'name': _name$2
        });
        return $1740;
    };
    const Fm$Error$undefined_reference = x0 => x1 => Fm$Error$undefined_reference$(x0, x1);

    function Fm$Error$waiting$(_name$1) {
        var $1741 = ({
            _: 'Fm.Error.waiting',
            'name': _name$1
        });
        return $1741;
    };
    const Fm$Error$waiting = x0 => Fm$Error$waiting$(x0);

    function Fm$Error$indirect$(_name$1) {
        var $1742 = ({
            _: 'Fm.Error.indirect',
            'name': _name$1
        });
        return $1742;
    };
    const Fm$Error$indirect = x0 => Fm$Error$indirect$(x0);

    function Maybe$mapped$(_m$2, _f$4) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1744 = Maybe$none;
                var $1743 = $1744;
                break;
            case 'Maybe.some':
                var $1745 = self.value;
                var $1746 = Maybe$some$(_f$4($1745));
                var $1743 = $1746;
                break;
        };
        return $1743;
    };
    const Maybe$mapped = x0 => x1 => Maybe$mapped$(x0, x1);

    function Fm$MPath$o$(_path$1) {
        var $1747 = Maybe$mapped$(_path$1, Fm$Path$o);
        return $1747;
    };
    const Fm$MPath$o = x0 => Fm$MPath$o$(x0);

    function Fm$MPath$i$(_path$1) {
        var $1748 = Maybe$mapped$(_path$1, Fm$Path$i);
        return $1748;
    };
    const Fm$MPath$i = x0 => Fm$MPath$i$(x0);

    function Fm$Error$cant_infer$(_origin$1, _term$2, _context$3) {
        var $1749 = ({
            _: 'Fm.Error.cant_infer',
            'origin': _origin$1,
            'term': _term$2,
            'context': _context$3
        });
        return $1749;
    };
    const Fm$Error$cant_infer = x0 => x1 => x2 => Fm$Error$cant_infer$(x0, x1, x2);

    function Fm$Error$type_mismatch$(_origin$1, _expected$2, _detected$3, _context$4) {
        var $1750 = ({
            _: 'Fm.Error.type_mismatch',
            'origin': _origin$1,
            'expected': _expected$2,
            'detected': _detected$3,
            'context': _context$4
        });
        return $1750;
    };
    const Fm$Error$type_mismatch = x0 => x1 => x2 => x3 => Fm$Error$type_mismatch$(x0, x1, x2, x3);

    function Fm$Error$show_goal$(_name$1, _dref$2, _verb$3, _goal$4, _context$5) {
        var $1751 = ({
            _: 'Fm.Error.show_goal',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3,
            'goal': _goal$4,
            'context': _context$5
        });
        return $1751;
    };
    const Fm$Error$show_goal = x0 => x1 => x2 => x3 => x4 => Fm$Error$show_goal$(x0, x1, x2, x3, x4);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1753 = List$nil;
                var $1752 = $1753;
                break;
            case 'List.cons':
                var $1754 = self.head;
                var $1755 = self.tail;
                var $1756 = $1755;
                var $1752 = $1756;
                break;
        };
        return $1752;
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
                        var $1757 = self.name;
                        var $1758 = self.indx;
                        var $1759 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1759;
                    case 'Fm.Term.ref':
                        var $1760 = self.name;
                        var $1761 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1761;
                    case 'Fm.Term.typ':
                        var $1762 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1762;
                    case 'Fm.Term.all':
                        var $1763 = self.eras;
                        var $1764 = self.self;
                        var $1765 = self.name;
                        var $1766 = self.xtyp;
                        var $1767 = self.body;
                        var $1768 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1768;
                    case 'Fm.Term.lam':
                        var $1769 = self.name;
                        var $1770 = self.body;
                        var $1771 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1771;
                    case 'Fm.Term.app':
                        var $1772 = self.func;
                        var $1773 = self.argm;
                        var $1774 = Fm$SmartMotive$vals$cont$(_expr$1, $1772, List$cons$($1773, _args$3), _defs$4);
                        return $1774;
                    case 'Fm.Term.let':
                        var $1775 = self.name;
                        var $1776 = self.expr;
                        var $1777 = self.body;
                        var $1778 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1778;
                    case 'Fm.Term.def':
                        var $1779 = self.name;
                        var $1780 = self.expr;
                        var $1781 = self.body;
                        var $1782 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1782;
                    case 'Fm.Term.ann':
                        var $1783 = self.done;
                        var $1784 = self.term;
                        var $1785 = self.type;
                        var $1786 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1786;
                    case 'Fm.Term.gol':
                        var $1787 = self.name;
                        var $1788 = self.dref;
                        var $1789 = self.verb;
                        var $1790 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1790;
                    case 'Fm.Term.hol':
                        var $1791 = self.path;
                        var $1792 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1792;
                    case 'Fm.Term.nat':
                        var $1793 = self.natx;
                        var $1794 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1794;
                    case 'Fm.Term.chr':
                        var $1795 = self.chrx;
                        var $1796 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1796;
                    case 'Fm.Term.str':
                        var $1797 = self.strx;
                        var $1798 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1798;
                    case 'Fm.Term.cse':
                        var $1799 = self.path;
                        var $1800 = self.expr;
                        var $1801 = self.name;
                        var $1802 = self.with;
                        var $1803 = self.cses;
                        var $1804 = self.moti;
                        var $1805 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1805;
                    case 'Fm.Term.ori':
                        var $1806 = self.orig;
                        var $1807 = self.expr;
                        var $1808 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1808;
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
                        var $1809 = self.name;
                        var $1810 = self.indx;
                        var $1811 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1811;
                    case 'Fm.Term.ref':
                        var $1812 = self.name;
                        var $1813 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1813;
                    case 'Fm.Term.typ':
                        var $1814 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1814;
                    case 'Fm.Term.all':
                        var $1815 = self.eras;
                        var $1816 = self.self;
                        var $1817 = self.name;
                        var $1818 = self.xtyp;
                        var $1819 = self.body;
                        var $1820 = Fm$SmartMotive$vals$(_expr$1, $1819(Fm$Term$typ)(Fm$Term$typ), _defs$3);
                        return $1820;
                    case 'Fm.Term.lam':
                        var $1821 = self.name;
                        var $1822 = self.body;
                        var $1823 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1823;
                    case 'Fm.Term.app':
                        var $1824 = self.func;
                        var $1825 = self.argm;
                        var $1826 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1826;
                    case 'Fm.Term.let':
                        var $1827 = self.name;
                        var $1828 = self.expr;
                        var $1829 = self.body;
                        var $1830 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1830;
                    case 'Fm.Term.def':
                        var $1831 = self.name;
                        var $1832 = self.expr;
                        var $1833 = self.body;
                        var $1834 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1834;
                    case 'Fm.Term.ann':
                        var $1835 = self.done;
                        var $1836 = self.term;
                        var $1837 = self.type;
                        var $1838 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1838;
                    case 'Fm.Term.gol':
                        var $1839 = self.name;
                        var $1840 = self.dref;
                        var $1841 = self.verb;
                        var $1842 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1842;
                    case 'Fm.Term.hol':
                        var $1843 = self.path;
                        var $1844 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1844;
                    case 'Fm.Term.nat':
                        var $1845 = self.natx;
                        var $1846 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1846;
                    case 'Fm.Term.chr':
                        var $1847 = self.chrx;
                        var $1848 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1848;
                    case 'Fm.Term.str':
                        var $1849 = self.strx;
                        var $1850 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1850;
                    case 'Fm.Term.cse':
                        var $1851 = self.path;
                        var $1852 = self.expr;
                        var $1853 = self.name;
                        var $1854 = self.with;
                        var $1855 = self.cses;
                        var $1856 = self.moti;
                        var $1857 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1857;
                    case 'Fm.Term.ori':
                        var $1858 = self.orig;
                        var $1859 = self.expr;
                        var $1860 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1860;
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
                        var $1861 = self.name;
                        var $1862 = self.indx;
                        var $1863 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1863;
                    case 'Fm.Term.ref':
                        var $1864 = self.name;
                        var $1865 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1865;
                    case 'Fm.Term.typ':
                        var $1866 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1866;
                    case 'Fm.Term.all':
                        var $1867 = self.eras;
                        var $1868 = self.self;
                        var $1869 = self.name;
                        var $1870 = self.xtyp;
                        var $1871 = self.body;
                        var $1872 = Fm$SmartMotive$nams$cont$(_name$1, $1871(Fm$Term$ref$($1868))(Fm$Term$ref$($1869)), List$cons$(String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($1869, List$nil)))), _binds$3), _defs$4);
                        return $1872;
                    case 'Fm.Term.lam':
                        var $1873 = self.name;
                        var $1874 = self.body;
                        var $1875 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1875;
                    case 'Fm.Term.app':
                        var $1876 = self.func;
                        var $1877 = self.argm;
                        var $1878 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1878;
                    case 'Fm.Term.let':
                        var $1879 = self.name;
                        var $1880 = self.expr;
                        var $1881 = self.body;
                        var $1882 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1882;
                    case 'Fm.Term.def':
                        var $1883 = self.name;
                        var $1884 = self.expr;
                        var $1885 = self.body;
                        var $1886 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1886;
                    case 'Fm.Term.ann':
                        var $1887 = self.done;
                        var $1888 = self.term;
                        var $1889 = self.type;
                        var $1890 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1890;
                    case 'Fm.Term.gol':
                        var $1891 = self.name;
                        var $1892 = self.dref;
                        var $1893 = self.verb;
                        var $1894 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1894;
                    case 'Fm.Term.hol':
                        var $1895 = self.path;
                        var $1896 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1896;
                    case 'Fm.Term.nat':
                        var $1897 = self.natx;
                        var $1898 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1898;
                    case 'Fm.Term.chr':
                        var $1899 = self.chrx;
                        var $1900 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1900;
                    case 'Fm.Term.str':
                        var $1901 = self.strx;
                        var $1902 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1902;
                    case 'Fm.Term.cse':
                        var $1903 = self.path;
                        var $1904 = self.expr;
                        var $1905 = self.name;
                        var $1906 = self.with;
                        var $1907 = self.cses;
                        var $1908 = self.moti;
                        var $1909 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1909;
                    case 'Fm.Term.ori':
                        var $1910 = self.orig;
                        var $1911 = self.expr;
                        var $1912 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1912;
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
                var $1914 = self.name;
                var $1915 = self.indx;
                var $1916 = List$nil;
                var $1913 = $1916;
                break;
            case 'Fm.Term.ref':
                var $1917 = self.name;
                var $1918 = List$nil;
                var $1913 = $1918;
                break;
            case 'Fm.Term.typ':
                var $1919 = List$nil;
                var $1913 = $1919;
                break;
            case 'Fm.Term.all':
                var $1920 = self.eras;
                var $1921 = self.self;
                var $1922 = self.name;
                var $1923 = self.xtyp;
                var $1924 = self.body;
                var $1925 = Fm$SmartMotive$nams$cont$(_name$1, $1923, List$nil, _defs$3);
                var $1913 = $1925;
                break;
            case 'Fm.Term.lam':
                var $1926 = self.name;
                var $1927 = self.body;
                var $1928 = List$nil;
                var $1913 = $1928;
                break;
            case 'Fm.Term.app':
                var $1929 = self.func;
                var $1930 = self.argm;
                var $1931 = List$nil;
                var $1913 = $1931;
                break;
            case 'Fm.Term.let':
                var $1932 = self.name;
                var $1933 = self.expr;
                var $1934 = self.body;
                var $1935 = List$nil;
                var $1913 = $1935;
                break;
            case 'Fm.Term.def':
                var $1936 = self.name;
                var $1937 = self.expr;
                var $1938 = self.body;
                var $1939 = List$nil;
                var $1913 = $1939;
                break;
            case 'Fm.Term.ann':
                var $1940 = self.done;
                var $1941 = self.term;
                var $1942 = self.type;
                var $1943 = List$nil;
                var $1913 = $1943;
                break;
            case 'Fm.Term.gol':
                var $1944 = self.name;
                var $1945 = self.dref;
                var $1946 = self.verb;
                var $1947 = List$nil;
                var $1913 = $1947;
                break;
            case 'Fm.Term.hol':
                var $1948 = self.path;
                var $1949 = List$nil;
                var $1913 = $1949;
                break;
            case 'Fm.Term.nat':
                var $1950 = self.natx;
                var $1951 = List$nil;
                var $1913 = $1951;
                break;
            case 'Fm.Term.chr':
                var $1952 = self.chrx;
                var $1953 = List$nil;
                var $1913 = $1953;
                break;
            case 'Fm.Term.str':
                var $1954 = self.strx;
                var $1955 = List$nil;
                var $1913 = $1955;
                break;
            case 'Fm.Term.cse':
                var $1956 = self.path;
                var $1957 = self.expr;
                var $1958 = self.name;
                var $1959 = self.with;
                var $1960 = self.cses;
                var $1961 = self.moti;
                var $1962 = List$nil;
                var $1913 = $1962;
                break;
            case 'Fm.Term.ori':
                var $1963 = self.orig;
                var $1964 = self.expr;
                var $1965 = List$nil;
                var $1913 = $1965;
                break;
        };
        return $1913;
    };
    const Fm$SmartMotive$nams = x0 => x1 => x2 => Fm$SmartMotive$nams$(x0, x1, x2);

    function List$zip$(_as$3, _bs$4) {
        var self = _as$3;
        switch (self._) {
            case 'List.nil':
                var $1967 = List$nil;
                var $1966 = $1967;
                break;
            case 'List.cons':
                var $1968 = self.head;
                var $1969 = self.tail;
                var self = _bs$4;
                switch (self._) {
                    case 'List.nil':
                        var $1971 = List$nil;
                        var $1970 = $1971;
                        break;
                    case 'List.cons':
                        var $1972 = self.head;
                        var $1973 = self.tail;
                        var $1974 = List$cons$(Pair$new$($1968, $1972), List$zip$($1969, $1973));
                        var $1970 = $1974;
                        break;
                };
                var $1966 = $1970;
                break;
        };
        return $1966;
    };
    const List$zip = x0 => x1 => List$zip$(x0, x1);

    function Cmp$as_gte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $1976 = Bool$false;
                var $1975 = $1976;
                break;
            case 'Cmp.eql':
                var $1977 = Bool$true;
                var $1975 = $1977;
                break;
            case 'Cmp.gtn':
                var $1978 = Bool$true;
                var $1975 = $1978;
                break;
        };
        return $1975;
    };
    const Cmp$as_gte = x0 => Cmp$as_gte$(x0);
    const Nat$gte = a0 => a1 => (a0 >= a1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function Fm$Term$serialize$name$(_name$1) {
        var $1979 = (fm_name_to_bits(_name$1));
        return $1979;
    };
    const Fm$Term$serialize$name = x0 => Fm$Term$serialize$name$(x0);

    function Fm$Term$serialize$(_term$1, _depth$2, _init$3, _x$4) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1981 = self.name;
                var $1982 = self.indx;
                var self = ($1982 >= _init$3);
                if (self) {
                    var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred$((_depth$2 - $1982 <= 0n ? 0n : _depth$2 - $1982)))));
                    var $1984 = (((_name$7(_x$4) + '1') + '0') + '0');
                    var $1983 = $1984;
                } else {
                    var _name$7 = a1 => (a1 + (nat_to_bits($1982)));
                    var $1985 = (((_name$7(_x$4) + '0') + '1') + '0');
                    var $1983 = $1985;
                };
                var $1980 = $1983;
                break;
            case 'Fm.Term.ref':
                var $1986 = self.name;
                var _name$6 = a1 => (a1 + Fm$Term$serialize$name$($1986));
                var $1987 = (((_name$6(_x$4) + '0') + '0') + '0');
                var $1980 = $1987;
                break;
            case 'Fm.Term.typ':
                var $1988 = (((_x$4 + '1') + '1') + '0');
                var $1980 = $1988;
                break;
            case 'Fm.Term.all':
                var $1989 = self.eras;
                var $1990 = self.self;
                var $1991 = self.name;
                var $1992 = self.xtyp;
                var $1993 = self.body;
                var self = $1989;
                if (self) {
                    var $1995 = Bits$i;
                    var _eras$10 = $1995;
                } else {
                    var $1996 = Bits$o;
                    var _eras$10 = $1996;
                };
                var _self$11 = a1 => (a1 + (fm_name_to_bits($1990)));
                var _xtyp$12 = Fm$Term$serialize($1992)(_depth$2)(_init$3);
                var _body$13 = Fm$Term$serialize($1993(Fm$Term$var$($1990, _depth$2))(Fm$Term$var$($1991, Nat$succ$(_depth$2))))(Nat$succ$(Nat$succ$(_depth$2)))(_init$3);
                var $1994 = (((_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))) + '0') + '0') + '1');
                var $1980 = $1994;
                break;
            case 'Fm.Term.lam':
                var $1997 = self.name;
                var $1998 = self.body;
                var _body$7 = Fm$Term$serialize($1998(Fm$Term$var$($1997, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $1999 = (((_body$7(_x$4) + '1') + '0') + '1');
                var $1980 = $1999;
                break;
            case 'Fm.Term.app':
                var $2000 = self.func;
                var $2001 = self.argm;
                var _func$7 = Fm$Term$serialize($2000)(_depth$2)(_init$3);
                var _argm$8 = Fm$Term$serialize($2001)(_depth$2)(_init$3);
                var $2002 = (((_func$7(_argm$8(_x$4)) + '0') + '1') + '1');
                var $1980 = $2002;
                break;
            case 'Fm.Term.let':
                var $2003 = self.name;
                var $2004 = self.expr;
                var $2005 = self.body;
                var _expr$8 = Fm$Term$serialize($2004)(_depth$2)(_init$3);
                var _body$9 = Fm$Term$serialize($2005(Fm$Term$var$($2003, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $2006 = (((_expr$8(_body$9(_x$4)) + '1') + '1') + '1');
                var $1980 = $2006;
                break;
            case 'Fm.Term.def':
                var $2007 = self.name;
                var $2008 = self.expr;
                var $2009 = self.body;
                var $2010 = Fm$Term$serialize$($2009($2008), _depth$2, _init$3, _x$4);
                var $1980 = $2010;
                break;
            case 'Fm.Term.ann':
                var $2011 = self.done;
                var $2012 = self.term;
                var $2013 = self.type;
                var $2014 = Fm$Term$serialize$($2012, _depth$2, _init$3, _x$4);
                var $1980 = $2014;
                break;
            case 'Fm.Term.gol':
                var $2015 = self.name;
                var $2016 = self.dref;
                var $2017 = self.verb;
                var _name$8 = a1 => (a1 + (fm_name_to_bits($2015)));
                var $2018 = (((_name$8(_x$4) + '0') + '0') + '0');
                var $1980 = $2018;
                break;
            case 'Fm.Term.hol':
                var $2019 = self.path;
                var $2020 = _x$4;
                var $1980 = $2020;
                break;
            case 'Fm.Term.nat':
                var $2021 = self.natx;
                var $2022 = Fm$Term$serialize$(Fm$Term$unroll_nat$($2021), _depth$2, _init$3, _x$4);
                var $1980 = $2022;
                break;
            case 'Fm.Term.chr':
                var $2023 = self.chrx;
                var $2024 = Fm$Term$serialize$(Fm$Term$unroll_chr$($2023), _depth$2, _init$3, _x$4);
                var $1980 = $2024;
                break;
            case 'Fm.Term.str':
                var $2025 = self.strx;
                var $2026 = Fm$Term$serialize$(Fm$Term$unroll_str$($2025), _depth$2, _init$3, _x$4);
                var $1980 = $2026;
                break;
            case 'Fm.Term.cse':
                var $2027 = self.path;
                var $2028 = self.expr;
                var $2029 = self.name;
                var $2030 = self.with;
                var $2031 = self.cses;
                var $2032 = self.moti;
                var $2033 = _x$4;
                var $1980 = $2033;
                break;
            case 'Fm.Term.ori':
                var $2034 = self.orig;
                var $2035 = self.expr;
                var $2036 = Fm$Term$serialize$($2035, _depth$2, _init$3, _x$4);
                var $1980 = $2036;
                break;
        };
        return $1980;
    };
    const Fm$Term$serialize = x0 => x1 => x2 => x3 => Fm$Term$serialize$(x0, x1, x2, x3);
    const Bits$eql = a0 => a1 => (a1 === a0);

    function Fm$Term$identical$(_a$1, _b$2, _lv$3) {
        var _ah$4 = Fm$Term$serialize$(_a$1, _lv$3, _lv$3, Bits$e);
        var _bh$5 = Fm$Term$serialize$(_b$2, _lv$3, _lv$3, Bits$e);
        var $2037 = (_bh$5 === _ah$4);
        return $2037;
    };
    const Fm$Term$identical = x0 => x1 => x2 => Fm$Term$identical$(x0, x1, x2);

    function Fm$SmartMotive$replace$(_term$1, _from$2, _to$3, _lv$4) {
        var self = Fm$Term$identical$(_term$1, _from$2, _lv$4);
        if (self) {
            var $2039 = _to$3;
            var $2038 = $2039;
        } else {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $2041 = self.name;
                    var $2042 = self.indx;
                    var $2043 = Fm$Term$var$($2041, $2042);
                    var $2040 = $2043;
                    break;
                case 'Fm.Term.ref':
                    var $2044 = self.name;
                    var $2045 = Fm$Term$ref$($2044);
                    var $2040 = $2045;
                    break;
                case 'Fm.Term.typ':
                    var $2046 = Fm$Term$typ;
                    var $2040 = $2046;
                    break;
                case 'Fm.Term.all':
                    var $2047 = self.eras;
                    var $2048 = self.self;
                    var $2049 = self.name;
                    var $2050 = self.xtyp;
                    var $2051 = self.body;
                    var _xtyp$10 = Fm$SmartMotive$replace$($2050, _from$2, _to$3, _lv$4);
                    var _body$11 = $2051(Fm$Term$ref$($2048))(Fm$Term$ref$($2049));
                    var _body$12 = Fm$SmartMotive$replace$(_body$11, _from$2, _to$3, Nat$succ$(Nat$succ$(_lv$4)));
                    var $2052 = Fm$Term$all$($2047, $2048, $2049, _xtyp$10, (_s$13 => _x$14 => {
                        var $2053 = _body$12;
                        return $2053;
                    }));
                    var $2040 = $2052;
                    break;
                case 'Fm.Term.lam':
                    var $2054 = self.name;
                    var $2055 = self.body;
                    var _body$7 = $2055(Fm$Term$ref$($2054));
                    var _body$8 = Fm$SmartMotive$replace$(_body$7, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2056 = Fm$Term$lam$($2054, (_x$9 => {
                        var $2057 = _body$8;
                        return $2057;
                    }));
                    var $2040 = $2056;
                    break;
                case 'Fm.Term.app':
                    var $2058 = self.func;
                    var $2059 = self.argm;
                    var _func$7 = Fm$SmartMotive$replace$($2058, _from$2, _to$3, _lv$4);
                    var _argm$8 = Fm$SmartMotive$replace$($2059, _from$2, _to$3, _lv$4);
                    var $2060 = Fm$Term$app$(_func$7, _argm$8);
                    var $2040 = $2060;
                    break;
                case 'Fm.Term.let':
                    var $2061 = self.name;
                    var $2062 = self.expr;
                    var $2063 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($2062, _from$2, _to$3, _lv$4);
                    var _body$9 = $2063(Fm$Term$ref$($2061));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2064 = Fm$Term$let$($2061, _expr$8, (_x$11 => {
                        var $2065 = _body$10;
                        return $2065;
                    }));
                    var $2040 = $2064;
                    break;
                case 'Fm.Term.def':
                    var $2066 = self.name;
                    var $2067 = self.expr;
                    var $2068 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($2067, _from$2, _to$3, _lv$4);
                    var _body$9 = $2068(Fm$Term$ref$($2066));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $2069 = Fm$Term$def$($2066, _expr$8, (_x$11 => {
                        var $2070 = _body$10;
                        return $2070;
                    }));
                    var $2040 = $2069;
                    break;
                case 'Fm.Term.ann':
                    var $2071 = self.done;
                    var $2072 = self.term;
                    var $2073 = self.type;
                    var _term$8 = Fm$SmartMotive$replace$($2072, _from$2, _to$3, _lv$4);
                    var _type$9 = Fm$SmartMotive$replace$($2073, _from$2, _to$3, _lv$4);
                    var $2074 = Fm$Term$ann$($2071, _term$8, _type$9);
                    var $2040 = $2074;
                    break;
                case 'Fm.Term.gol':
                    var $2075 = self.name;
                    var $2076 = self.dref;
                    var $2077 = self.verb;
                    var $2078 = _term$1;
                    var $2040 = $2078;
                    break;
                case 'Fm.Term.hol':
                    var $2079 = self.path;
                    var $2080 = _term$1;
                    var $2040 = $2080;
                    break;
                case 'Fm.Term.nat':
                    var $2081 = self.natx;
                    var $2082 = _term$1;
                    var $2040 = $2082;
                    break;
                case 'Fm.Term.chr':
                    var $2083 = self.chrx;
                    var $2084 = _term$1;
                    var $2040 = $2084;
                    break;
                case 'Fm.Term.str':
                    var $2085 = self.strx;
                    var $2086 = _term$1;
                    var $2040 = $2086;
                    break;
                case 'Fm.Term.cse':
                    var $2087 = self.path;
                    var $2088 = self.expr;
                    var $2089 = self.name;
                    var $2090 = self.with;
                    var $2091 = self.cses;
                    var $2092 = self.moti;
                    var $2093 = _term$1;
                    var $2040 = $2093;
                    break;
                case 'Fm.Term.ori':
                    var $2094 = self.orig;
                    var $2095 = self.expr;
                    var $2096 = Fm$SmartMotive$replace$($2095, _from$2, _to$3, _lv$4);
                    var $2040 = $2096;
                    break;
            };
            var $2038 = $2040;
        };
        return $2038;
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
                    var $2099 = self.fst;
                    var $2100 = self.snd;
                    var $2101 = Fm$SmartMotive$replace$(_moti$11, $2100, Fm$Term$ref$($2099), _lv$5);
                    var $2098 = $2101;
                    break;
            };
            return $2098;
        }));
        var $2097 = _moti$10;
        return $2097;
    };
    const Fm$SmartMotive$make = x0 => x1 => x2 => x3 => x4 => x5 => Fm$SmartMotive$make$(x0, x1, x2, x3, x4, x5);

    function Fm$Term$desugar_cse$motive$(_wyth$1, _moti$2) {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                var $2103 = _moti$2;
                var $2102 = $2103;
                break;
            case 'List.cons':
                var $2104 = self.head;
                var $2105 = self.tail;
                var self = $2104;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $2107 = self.file;
                        var $2108 = self.code;
                        var $2109 = self.name;
                        var $2110 = self.term;
                        var $2111 = self.type;
                        var $2112 = self.stat;
                        var $2113 = Fm$Term$all$(Bool$false, "", $2109, $2111, (_s$11 => _x$12 => {
                            var $2114 = Fm$Term$desugar_cse$motive$($2105, _moti$2);
                            return $2114;
                        }));
                        var $2106 = $2113;
                        break;
                };
                var $2102 = $2106;
                break;
        };
        return $2102;
    };
    const Fm$Term$desugar_cse$motive = x0 => x1 => Fm$Term$desugar_cse$motive$(x0, x1);

    function String$is_empty$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $2116 = Bool$true;
            var $2115 = $2116;
        } else {
            var $2117 = self.charCodeAt(0);
            var $2118 = self.slice(1);
            var $2119 = Bool$false;
            var $2115 = $2119;
        };
        return $2115;
    };
    const String$is_empty = x0 => String$is_empty$(x0);

    function Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, _type$3, _body$4, _defs$5) {
        var self = Fm$Term$reduce$(_type$3, _defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $2121 = self.name;
                var $2122 = self.indx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2124 = _body$4;
                        var $2123 = $2124;
                        break;
                    case 'List.cons':
                        var $2125 = self.head;
                        var $2126 = self.tail;
                        var self = $2125;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2128 = self.file;
                                var $2129 = self.code;
                                var $2130 = self.name;
                                var $2131 = self.term;
                                var $2132 = self.type;
                                var $2133 = self.stat;
                                var $2134 = Fm$Term$lam$($2130, (_x$16 => {
                                    var $2135 = Fm$Term$desugar_cse$argument$(_name$1, $2126, _type$3, _body$4, _defs$5);
                                    return $2135;
                                }));
                                var $2127 = $2134;
                                break;
                        };
                        var $2123 = $2127;
                        break;
                };
                var $2120 = $2123;
                break;
            case 'Fm.Term.ref':
                var $2136 = self.name;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2138 = _body$4;
                        var $2137 = $2138;
                        break;
                    case 'List.cons':
                        var $2139 = self.head;
                        var $2140 = self.tail;
                        var self = $2139;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2142 = self.file;
                                var $2143 = self.code;
                                var $2144 = self.name;
                                var $2145 = self.term;
                                var $2146 = self.type;
                                var $2147 = self.stat;
                                var $2148 = Fm$Term$lam$($2144, (_x$15 => {
                                    var $2149 = Fm$Term$desugar_cse$argument$(_name$1, $2140, _type$3, _body$4, _defs$5);
                                    return $2149;
                                }));
                                var $2141 = $2148;
                                break;
                        };
                        var $2137 = $2141;
                        break;
                };
                var $2120 = $2137;
                break;
            case 'Fm.Term.typ':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2151 = _body$4;
                        var $2150 = $2151;
                        break;
                    case 'List.cons':
                        var $2152 = self.head;
                        var $2153 = self.tail;
                        var self = $2152;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2155 = self.file;
                                var $2156 = self.code;
                                var $2157 = self.name;
                                var $2158 = self.term;
                                var $2159 = self.type;
                                var $2160 = self.stat;
                                var $2161 = Fm$Term$lam$($2157, (_x$14 => {
                                    var $2162 = Fm$Term$desugar_cse$argument$(_name$1, $2153, _type$3, _body$4, _defs$5);
                                    return $2162;
                                }));
                                var $2154 = $2161;
                                break;
                        };
                        var $2150 = $2154;
                        break;
                };
                var $2120 = $2150;
                break;
            case 'Fm.Term.all':
                var $2163 = self.eras;
                var $2164 = self.self;
                var $2165 = self.name;
                var $2166 = self.xtyp;
                var $2167 = self.body;
                var $2168 = Fm$Term$lam$((() => {
                    var self = String$is_empty$($2165);
                    if (self) {
                        var $2169 = _name$1;
                        return $2169;
                    } else {
                        var $2170 = String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($2165, List$nil))));
                        return $2170;
                    };
                })(), (_x$11 => {
                    var $2171 = Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, $2167(Fm$Term$var$($2164, 0n))(Fm$Term$var$($2165, 0n)), _body$4, _defs$5);
                    return $2171;
                }));
                var $2120 = $2168;
                break;
            case 'Fm.Term.lam':
                var $2172 = self.name;
                var $2173 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2175 = _body$4;
                        var $2174 = $2175;
                        break;
                    case 'List.cons':
                        var $2176 = self.head;
                        var $2177 = self.tail;
                        var self = $2176;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2179 = self.file;
                                var $2180 = self.code;
                                var $2181 = self.name;
                                var $2182 = self.term;
                                var $2183 = self.type;
                                var $2184 = self.stat;
                                var $2185 = Fm$Term$lam$($2181, (_x$16 => {
                                    var $2186 = Fm$Term$desugar_cse$argument$(_name$1, $2177, _type$3, _body$4, _defs$5);
                                    return $2186;
                                }));
                                var $2178 = $2185;
                                break;
                        };
                        var $2174 = $2178;
                        break;
                };
                var $2120 = $2174;
                break;
            case 'Fm.Term.app':
                var $2187 = self.func;
                var $2188 = self.argm;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2190 = _body$4;
                        var $2189 = $2190;
                        break;
                    case 'List.cons':
                        var $2191 = self.head;
                        var $2192 = self.tail;
                        var self = $2191;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2194 = self.file;
                                var $2195 = self.code;
                                var $2196 = self.name;
                                var $2197 = self.term;
                                var $2198 = self.type;
                                var $2199 = self.stat;
                                var $2200 = Fm$Term$lam$($2196, (_x$16 => {
                                    var $2201 = Fm$Term$desugar_cse$argument$(_name$1, $2192, _type$3, _body$4, _defs$5);
                                    return $2201;
                                }));
                                var $2193 = $2200;
                                break;
                        };
                        var $2189 = $2193;
                        break;
                };
                var $2120 = $2189;
                break;
            case 'Fm.Term.let':
                var $2202 = self.name;
                var $2203 = self.expr;
                var $2204 = self.body;
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
                                var $2216 = Fm$Term$lam$($2212, (_x$17 => {
                                    var $2217 = Fm$Term$desugar_cse$argument$(_name$1, $2208, _type$3, _body$4, _defs$5);
                                    return $2217;
                                }));
                                var $2209 = $2216;
                                break;
                        };
                        var $2205 = $2209;
                        break;
                };
                var $2120 = $2205;
                break;
            case 'Fm.Term.def':
                var $2218 = self.name;
                var $2219 = self.expr;
                var $2220 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2222 = _body$4;
                        var $2221 = $2222;
                        break;
                    case 'List.cons':
                        var $2223 = self.head;
                        var $2224 = self.tail;
                        var self = $2223;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2226 = self.file;
                                var $2227 = self.code;
                                var $2228 = self.name;
                                var $2229 = self.term;
                                var $2230 = self.type;
                                var $2231 = self.stat;
                                var $2232 = Fm$Term$lam$($2228, (_x$17 => {
                                    var $2233 = Fm$Term$desugar_cse$argument$(_name$1, $2224, _type$3, _body$4, _defs$5);
                                    return $2233;
                                }));
                                var $2225 = $2232;
                                break;
                        };
                        var $2221 = $2225;
                        break;
                };
                var $2120 = $2221;
                break;
            case 'Fm.Term.ann':
                var $2234 = self.done;
                var $2235 = self.term;
                var $2236 = self.type;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2238 = _body$4;
                        var $2237 = $2238;
                        break;
                    case 'List.cons':
                        var $2239 = self.head;
                        var $2240 = self.tail;
                        var self = $2239;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2242 = self.file;
                                var $2243 = self.code;
                                var $2244 = self.name;
                                var $2245 = self.term;
                                var $2246 = self.type;
                                var $2247 = self.stat;
                                var $2248 = Fm$Term$lam$($2244, (_x$17 => {
                                    var $2249 = Fm$Term$desugar_cse$argument$(_name$1, $2240, _type$3, _body$4, _defs$5);
                                    return $2249;
                                }));
                                var $2241 = $2248;
                                break;
                        };
                        var $2237 = $2241;
                        break;
                };
                var $2120 = $2237;
                break;
            case 'Fm.Term.gol':
                var $2250 = self.name;
                var $2251 = self.dref;
                var $2252 = self.verb;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2254 = _body$4;
                        var $2253 = $2254;
                        break;
                    case 'List.cons':
                        var $2255 = self.head;
                        var $2256 = self.tail;
                        var self = $2255;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2258 = self.file;
                                var $2259 = self.code;
                                var $2260 = self.name;
                                var $2261 = self.term;
                                var $2262 = self.type;
                                var $2263 = self.stat;
                                var $2264 = Fm$Term$lam$($2260, (_x$17 => {
                                    var $2265 = Fm$Term$desugar_cse$argument$(_name$1, $2256, _type$3, _body$4, _defs$5);
                                    return $2265;
                                }));
                                var $2257 = $2264;
                                break;
                        };
                        var $2253 = $2257;
                        break;
                };
                var $2120 = $2253;
                break;
            case 'Fm.Term.hol':
                var $2266 = self.path;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2268 = _body$4;
                        var $2267 = $2268;
                        break;
                    case 'List.cons':
                        var $2269 = self.head;
                        var $2270 = self.tail;
                        var self = $2269;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2272 = self.file;
                                var $2273 = self.code;
                                var $2274 = self.name;
                                var $2275 = self.term;
                                var $2276 = self.type;
                                var $2277 = self.stat;
                                var $2278 = Fm$Term$lam$($2274, (_x$15 => {
                                    var $2279 = Fm$Term$desugar_cse$argument$(_name$1, $2270, _type$3, _body$4, _defs$5);
                                    return $2279;
                                }));
                                var $2271 = $2278;
                                break;
                        };
                        var $2267 = $2271;
                        break;
                };
                var $2120 = $2267;
                break;
            case 'Fm.Term.nat':
                var $2280 = self.natx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2282 = _body$4;
                        var $2281 = $2282;
                        break;
                    case 'List.cons':
                        var $2283 = self.head;
                        var $2284 = self.tail;
                        var self = $2283;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2286 = self.file;
                                var $2287 = self.code;
                                var $2288 = self.name;
                                var $2289 = self.term;
                                var $2290 = self.type;
                                var $2291 = self.stat;
                                var $2292 = Fm$Term$lam$($2288, (_x$15 => {
                                    var $2293 = Fm$Term$desugar_cse$argument$(_name$1, $2284, _type$3, _body$4, _defs$5);
                                    return $2293;
                                }));
                                var $2285 = $2292;
                                break;
                        };
                        var $2281 = $2285;
                        break;
                };
                var $2120 = $2281;
                break;
            case 'Fm.Term.chr':
                var $2294 = self.chrx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2296 = _body$4;
                        var $2295 = $2296;
                        break;
                    case 'List.cons':
                        var $2297 = self.head;
                        var $2298 = self.tail;
                        var self = $2297;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2300 = self.file;
                                var $2301 = self.code;
                                var $2302 = self.name;
                                var $2303 = self.term;
                                var $2304 = self.type;
                                var $2305 = self.stat;
                                var $2306 = Fm$Term$lam$($2302, (_x$15 => {
                                    var $2307 = Fm$Term$desugar_cse$argument$(_name$1, $2298, _type$3, _body$4, _defs$5);
                                    return $2307;
                                }));
                                var $2299 = $2306;
                                break;
                        };
                        var $2295 = $2299;
                        break;
                };
                var $2120 = $2295;
                break;
            case 'Fm.Term.str':
                var $2308 = self.strx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2310 = _body$4;
                        var $2309 = $2310;
                        break;
                    case 'List.cons':
                        var $2311 = self.head;
                        var $2312 = self.tail;
                        var self = $2311;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2314 = self.file;
                                var $2315 = self.code;
                                var $2316 = self.name;
                                var $2317 = self.term;
                                var $2318 = self.type;
                                var $2319 = self.stat;
                                var $2320 = Fm$Term$lam$($2316, (_x$15 => {
                                    var $2321 = Fm$Term$desugar_cse$argument$(_name$1, $2312, _type$3, _body$4, _defs$5);
                                    return $2321;
                                }));
                                var $2313 = $2320;
                                break;
                        };
                        var $2309 = $2313;
                        break;
                };
                var $2120 = $2309;
                break;
            case 'Fm.Term.cse':
                var $2322 = self.path;
                var $2323 = self.expr;
                var $2324 = self.name;
                var $2325 = self.with;
                var $2326 = self.cses;
                var $2327 = self.moti;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2329 = _body$4;
                        var $2328 = $2329;
                        break;
                    case 'List.cons':
                        var $2330 = self.head;
                        var $2331 = self.tail;
                        var self = $2330;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2333 = self.file;
                                var $2334 = self.code;
                                var $2335 = self.name;
                                var $2336 = self.term;
                                var $2337 = self.type;
                                var $2338 = self.stat;
                                var $2339 = Fm$Term$lam$($2335, (_x$20 => {
                                    var $2340 = Fm$Term$desugar_cse$argument$(_name$1, $2331, _type$3, _body$4, _defs$5);
                                    return $2340;
                                }));
                                var $2332 = $2339;
                                break;
                        };
                        var $2328 = $2332;
                        break;
                };
                var $2120 = $2328;
                break;
            case 'Fm.Term.ori':
                var $2341 = self.orig;
                var $2342 = self.expr;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2344 = _body$4;
                        var $2343 = $2344;
                        break;
                    case 'List.cons':
                        var $2345 = self.head;
                        var $2346 = self.tail;
                        var self = $2345;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2348 = self.file;
                                var $2349 = self.code;
                                var $2350 = self.name;
                                var $2351 = self.term;
                                var $2352 = self.type;
                                var $2353 = self.stat;
                                var $2354 = Fm$Term$lam$($2350, (_x$16 => {
                                    var $2355 = Fm$Term$desugar_cse$argument$(_name$1, $2346, _type$3, _body$4, _defs$5);
                                    return $2355;
                                }));
                                var $2347 = $2354;
                                break;
                        };
                        var $2343 = $2347;
                        break;
                };
                var $2120 = $2343;
                break;
        };
        return $2120;
    };
    const Fm$Term$desugar_cse$argument = x0 => x1 => x2 => x3 => x4 => Fm$Term$desugar_cse$argument$(x0, x1, x2, x3, x4);

    function Maybe$or$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.none':
                var $2357 = _b$3;
                var $2356 = $2357;
                break;
            case 'Maybe.some':
                var $2358 = self.value;
                var $2359 = Maybe$some$($2358);
                var $2356 = $2359;
                break;
        };
        return $2356;
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
                        var $2360 = self.name;
                        var $2361 = self.indx;
                        var _expr$10 = (() => {
                            var $2364 = _expr$1;
                            var $2365 = _wyth$3;
                            let _expr$11 = $2364;
                            let _defn$10;
                            while ($2365._ === 'List.cons') {
                                _defn$10 = $2365.head;
                                var $2364 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2366 = self.file;
                                            var $2367 = self.code;
                                            var $2368 = self.name;
                                            var $2369 = self.term;
                                            var $2370 = self.type;
                                            var $2371 = self.stat;
                                            var $2372 = $2369;
                                            return $2372;
                                    };
                                })());
                                _expr$11 = $2364;
                                $2365 = $2365.tail;
                            }
                            return _expr$11;
                        })();
                        var $2362 = _expr$10;
                        return $2362;
                    case 'Fm.Term.ref':
                        var $2373 = self.name;
                        var _expr$9 = (() => {
                            var $2376 = _expr$1;
                            var $2377 = _wyth$3;
                            let _expr$10 = $2376;
                            let _defn$9;
                            while ($2377._ === 'List.cons') {
                                _defn$9 = $2377.head;
                                var $2376 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2378 = self.file;
                                            var $2379 = self.code;
                                            var $2380 = self.name;
                                            var $2381 = self.term;
                                            var $2382 = self.type;
                                            var $2383 = self.stat;
                                            var $2384 = $2381;
                                            return $2384;
                                    };
                                })());
                                _expr$10 = $2376;
                                $2377 = $2377.tail;
                            }
                            return _expr$10;
                        })();
                        var $2374 = _expr$9;
                        return $2374;
                    case 'Fm.Term.typ':
                        var _expr$8 = (() => {
                            var $2387 = _expr$1;
                            var $2388 = _wyth$3;
                            let _expr$9 = $2387;
                            let _defn$8;
                            while ($2388._ === 'List.cons') {
                                _defn$8 = $2388.head;
                                var $2387 = Fm$Term$app$(_expr$9, (() => {
                                    var self = _defn$8;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2389 = self.file;
                                            var $2390 = self.code;
                                            var $2391 = self.name;
                                            var $2392 = self.term;
                                            var $2393 = self.type;
                                            var $2394 = self.stat;
                                            var $2395 = $2392;
                                            return $2395;
                                    };
                                })());
                                _expr$9 = $2387;
                                $2388 = $2388.tail;
                            }
                            return _expr$9;
                        })();
                        var $2385 = _expr$8;
                        return $2385;
                    case 'Fm.Term.all':
                        var $2396 = self.eras;
                        var $2397 = self.self;
                        var $2398 = self.name;
                        var $2399 = self.xtyp;
                        var $2400 = self.body;
                        var _got$13 = Maybe$or$(Fm$get$($2398, _cses$4), Fm$get$("_", _cses$4));
                        var self = _got$13;
                        switch (self._) {
                            case 'Maybe.none':
                                var _expr$14 = (() => {
                                    var $2404 = _expr$1;
                                    var $2405 = _wyth$3;
                                    let _expr$15 = $2404;
                                    let _defn$14;
                                    while ($2405._ === 'List.cons') {
                                        _defn$14 = $2405.head;
                                        var self = _defn$14;
                                        switch (self._) {
                                            case 'Fm.Def.new':
                                                var $2406 = self.file;
                                                var $2407 = self.code;
                                                var $2408 = self.name;
                                                var $2409 = self.term;
                                                var $2410 = self.type;
                                                var $2411 = self.stat;
                                                var $2412 = Fm$Term$app$(_expr$15, $2409);
                                                var $2404 = $2412;
                                                break;
                                        };
                                        _expr$15 = $2404;
                                        $2405 = $2405.tail;
                                    }
                                    return _expr$15;
                                })();
                                var $2402 = _expr$14;
                                var $2401 = $2402;
                                break;
                            case 'Maybe.some':
                                var $2413 = self.value;
                                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, _wyth$3, $2399, $2413, _defs$6);
                                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                                var _type$17 = $2400(Fm$Term$var$($2397, 0n))(Fm$Term$var$($2398, 0n));
                                var $2414 = Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$6, _ctxt$7);
                                var $2401 = $2414;
                                break;
                        };
                        return $2401;
                    case 'Fm.Term.lam':
                        var $2415 = self.name;
                        var $2416 = self.body;
                        var _expr$10 = (() => {
                            var $2419 = _expr$1;
                            var $2420 = _wyth$3;
                            let _expr$11 = $2419;
                            let _defn$10;
                            while ($2420._ === 'List.cons') {
                                _defn$10 = $2420.head;
                                var $2419 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2421 = self.file;
                                            var $2422 = self.code;
                                            var $2423 = self.name;
                                            var $2424 = self.term;
                                            var $2425 = self.type;
                                            var $2426 = self.stat;
                                            var $2427 = $2424;
                                            return $2427;
                                    };
                                })());
                                _expr$11 = $2419;
                                $2420 = $2420.tail;
                            }
                            return _expr$11;
                        })();
                        var $2417 = _expr$10;
                        return $2417;
                    case 'Fm.Term.app':
                        var $2428 = self.func;
                        var $2429 = self.argm;
                        var _expr$10 = (() => {
                            var $2432 = _expr$1;
                            var $2433 = _wyth$3;
                            let _expr$11 = $2432;
                            let _defn$10;
                            while ($2433._ === 'List.cons') {
                                _defn$10 = $2433.head;
                                var $2432 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2434 = self.file;
                                            var $2435 = self.code;
                                            var $2436 = self.name;
                                            var $2437 = self.term;
                                            var $2438 = self.type;
                                            var $2439 = self.stat;
                                            var $2440 = $2437;
                                            return $2440;
                                    };
                                })());
                                _expr$11 = $2432;
                                $2433 = $2433.tail;
                            }
                            return _expr$11;
                        })();
                        var $2430 = _expr$10;
                        return $2430;
                    case 'Fm.Term.let':
                        var $2441 = self.name;
                        var $2442 = self.expr;
                        var $2443 = self.body;
                        var _expr$11 = (() => {
                            var $2446 = _expr$1;
                            var $2447 = _wyth$3;
                            let _expr$12 = $2446;
                            let _defn$11;
                            while ($2447._ === 'List.cons') {
                                _defn$11 = $2447.head;
                                var $2446 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2448 = self.file;
                                            var $2449 = self.code;
                                            var $2450 = self.name;
                                            var $2451 = self.term;
                                            var $2452 = self.type;
                                            var $2453 = self.stat;
                                            var $2454 = $2451;
                                            return $2454;
                                    };
                                })());
                                _expr$12 = $2446;
                                $2447 = $2447.tail;
                            }
                            return _expr$12;
                        })();
                        var $2444 = _expr$11;
                        return $2444;
                    case 'Fm.Term.def':
                        var $2455 = self.name;
                        var $2456 = self.expr;
                        var $2457 = self.body;
                        var _expr$11 = (() => {
                            var $2460 = _expr$1;
                            var $2461 = _wyth$3;
                            let _expr$12 = $2460;
                            let _defn$11;
                            while ($2461._ === 'List.cons') {
                                _defn$11 = $2461.head;
                                var $2460 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2462 = self.file;
                                            var $2463 = self.code;
                                            var $2464 = self.name;
                                            var $2465 = self.term;
                                            var $2466 = self.type;
                                            var $2467 = self.stat;
                                            var $2468 = $2465;
                                            return $2468;
                                    };
                                })());
                                _expr$12 = $2460;
                                $2461 = $2461.tail;
                            }
                            return _expr$12;
                        })();
                        var $2458 = _expr$11;
                        return $2458;
                    case 'Fm.Term.ann':
                        var $2469 = self.done;
                        var $2470 = self.term;
                        var $2471 = self.type;
                        var _expr$11 = (() => {
                            var $2474 = _expr$1;
                            var $2475 = _wyth$3;
                            let _expr$12 = $2474;
                            let _defn$11;
                            while ($2475._ === 'List.cons') {
                                _defn$11 = $2475.head;
                                var $2474 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2476 = self.file;
                                            var $2477 = self.code;
                                            var $2478 = self.name;
                                            var $2479 = self.term;
                                            var $2480 = self.type;
                                            var $2481 = self.stat;
                                            var $2482 = $2479;
                                            return $2482;
                                    };
                                })());
                                _expr$12 = $2474;
                                $2475 = $2475.tail;
                            }
                            return _expr$12;
                        })();
                        var $2472 = _expr$11;
                        return $2472;
                    case 'Fm.Term.gol':
                        var $2483 = self.name;
                        var $2484 = self.dref;
                        var $2485 = self.verb;
                        var _expr$11 = (() => {
                            var $2488 = _expr$1;
                            var $2489 = _wyth$3;
                            let _expr$12 = $2488;
                            let _defn$11;
                            while ($2489._ === 'List.cons') {
                                _defn$11 = $2489.head;
                                var $2488 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2490 = self.file;
                                            var $2491 = self.code;
                                            var $2492 = self.name;
                                            var $2493 = self.term;
                                            var $2494 = self.type;
                                            var $2495 = self.stat;
                                            var $2496 = $2493;
                                            return $2496;
                                    };
                                })());
                                _expr$12 = $2488;
                                $2489 = $2489.tail;
                            }
                            return _expr$12;
                        })();
                        var $2486 = _expr$11;
                        return $2486;
                    case 'Fm.Term.hol':
                        var $2497 = self.path;
                        var _expr$9 = (() => {
                            var $2500 = _expr$1;
                            var $2501 = _wyth$3;
                            let _expr$10 = $2500;
                            let _defn$9;
                            while ($2501._ === 'List.cons') {
                                _defn$9 = $2501.head;
                                var $2500 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2502 = self.file;
                                            var $2503 = self.code;
                                            var $2504 = self.name;
                                            var $2505 = self.term;
                                            var $2506 = self.type;
                                            var $2507 = self.stat;
                                            var $2508 = $2505;
                                            return $2508;
                                    };
                                })());
                                _expr$10 = $2500;
                                $2501 = $2501.tail;
                            }
                            return _expr$10;
                        })();
                        var $2498 = _expr$9;
                        return $2498;
                    case 'Fm.Term.nat':
                        var $2509 = self.natx;
                        var _expr$9 = (() => {
                            var $2512 = _expr$1;
                            var $2513 = _wyth$3;
                            let _expr$10 = $2512;
                            let _defn$9;
                            while ($2513._ === 'List.cons') {
                                _defn$9 = $2513.head;
                                var $2512 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2514 = self.file;
                                            var $2515 = self.code;
                                            var $2516 = self.name;
                                            var $2517 = self.term;
                                            var $2518 = self.type;
                                            var $2519 = self.stat;
                                            var $2520 = $2517;
                                            return $2520;
                                    };
                                })());
                                _expr$10 = $2512;
                                $2513 = $2513.tail;
                            }
                            return _expr$10;
                        })();
                        var $2510 = _expr$9;
                        return $2510;
                    case 'Fm.Term.chr':
                        var $2521 = self.chrx;
                        var _expr$9 = (() => {
                            var $2524 = _expr$1;
                            var $2525 = _wyth$3;
                            let _expr$10 = $2524;
                            let _defn$9;
                            while ($2525._ === 'List.cons') {
                                _defn$9 = $2525.head;
                                var $2524 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2526 = self.file;
                                            var $2527 = self.code;
                                            var $2528 = self.name;
                                            var $2529 = self.term;
                                            var $2530 = self.type;
                                            var $2531 = self.stat;
                                            var $2532 = $2529;
                                            return $2532;
                                    };
                                })());
                                _expr$10 = $2524;
                                $2525 = $2525.tail;
                            }
                            return _expr$10;
                        })();
                        var $2522 = _expr$9;
                        return $2522;
                    case 'Fm.Term.str':
                        var $2533 = self.strx;
                        var _expr$9 = (() => {
                            var $2536 = _expr$1;
                            var $2537 = _wyth$3;
                            let _expr$10 = $2536;
                            let _defn$9;
                            while ($2537._ === 'List.cons') {
                                _defn$9 = $2537.head;
                                var $2536 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2538 = self.file;
                                            var $2539 = self.code;
                                            var $2540 = self.name;
                                            var $2541 = self.term;
                                            var $2542 = self.type;
                                            var $2543 = self.stat;
                                            var $2544 = $2541;
                                            return $2544;
                                    };
                                })());
                                _expr$10 = $2536;
                                $2537 = $2537.tail;
                            }
                            return _expr$10;
                        })();
                        var $2534 = _expr$9;
                        return $2534;
                    case 'Fm.Term.cse':
                        var $2545 = self.path;
                        var $2546 = self.expr;
                        var $2547 = self.name;
                        var $2548 = self.with;
                        var $2549 = self.cses;
                        var $2550 = self.moti;
                        var _expr$14 = (() => {
                            var $2553 = _expr$1;
                            var $2554 = _wyth$3;
                            let _expr$15 = $2553;
                            let _defn$14;
                            while ($2554._ === 'List.cons') {
                                _defn$14 = $2554.head;
                                var $2553 = Fm$Term$app$(_expr$15, (() => {
                                    var self = _defn$14;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2555 = self.file;
                                            var $2556 = self.code;
                                            var $2557 = self.name;
                                            var $2558 = self.term;
                                            var $2559 = self.type;
                                            var $2560 = self.stat;
                                            var $2561 = $2558;
                                            return $2561;
                                    };
                                })());
                                _expr$15 = $2553;
                                $2554 = $2554.tail;
                            }
                            return _expr$15;
                        })();
                        var $2551 = _expr$14;
                        return $2551;
                    case 'Fm.Term.ori':
                        var $2562 = self.orig;
                        var $2563 = self.expr;
                        var _expr$10 = (() => {
                            var $2566 = _expr$1;
                            var $2567 = _wyth$3;
                            let _expr$11 = $2566;
                            let _defn$10;
                            while ($2567._ === 'List.cons') {
                                _defn$10 = $2567.head;
                                var $2566 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2568 = self.file;
                                            var $2569 = self.code;
                                            var $2570 = self.name;
                                            var $2571 = self.term;
                                            var $2572 = self.type;
                                            var $2573 = self.stat;
                                            var $2574 = $2571;
                                            return $2574;
                                    };
                                })());
                                _expr$11 = $2566;
                                $2567 = $2567.tail;
                            }
                            return _expr$11;
                        })();
                        var $2564 = _expr$10;
                        return $2564;
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
                var $2576 = self.name;
                var $2577 = self.indx;
                var $2578 = Maybe$none;
                var $2575 = $2578;
                break;
            case 'Fm.Term.ref':
                var $2579 = self.name;
                var $2580 = Maybe$none;
                var $2575 = $2580;
                break;
            case 'Fm.Term.typ':
                var $2581 = Maybe$none;
                var $2575 = $2581;
                break;
            case 'Fm.Term.all':
                var $2582 = self.eras;
                var $2583 = self.self;
                var $2584 = self.name;
                var $2585 = self.xtyp;
                var $2586 = self.body;
                var _moti$14 = Fm$Term$desugar_cse$motive$(_with$3, _moti$5);
                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, List$nil, $2585, _moti$14, _defs$7);
                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                var _type$17 = $2586(Fm$Term$var$($2583, 0n))(Fm$Term$var$($2584, 0n));
                var $2587 = Maybe$some$(Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _with$3, _cses$4, _type$17, _defs$7, _ctxt$8));
                var $2575 = $2587;
                break;
            case 'Fm.Term.lam':
                var $2588 = self.name;
                var $2589 = self.body;
                var $2590 = Maybe$none;
                var $2575 = $2590;
                break;
            case 'Fm.Term.app':
                var $2591 = self.func;
                var $2592 = self.argm;
                var $2593 = Maybe$none;
                var $2575 = $2593;
                break;
            case 'Fm.Term.let':
                var $2594 = self.name;
                var $2595 = self.expr;
                var $2596 = self.body;
                var $2597 = Maybe$none;
                var $2575 = $2597;
                break;
            case 'Fm.Term.def':
                var $2598 = self.name;
                var $2599 = self.expr;
                var $2600 = self.body;
                var $2601 = Maybe$none;
                var $2575 = $2601;
                break;
            case 'Fm.Term.ann':
                var $2602 = self.done;
                var $2603 = self.term;
                var $2604 = self.type;
                var $2605 = Maybe$none;
                var $2575 = $2605;
                break;
            case 'Fm.Term.gol':
                var $2606 = self.name;
                var $2607 = self.dref;
                var $2608 = self.verb;
                var $2609 = Maybe$none;
                var $2575 = $2609;
                break;
            case 'Fm.Term.hol':
                var $2610 = self.path;
                var $2611 = Maybe$none;
                var $2575 = $2611;
                break;
            case 'Fm.Term.nat':
                var $2612 = self.natx;
                var $2613 = Maybe$none;
                var $2575 = $2613;
                break;
            case 'Fm.Term.chr':
                var $2614 = self.chrx;
                var $2615 = Maybe$none;
                var $2575 = $2615;
                break;
            case 'Fm.Term.str':
                var $2616 = self.strx;
                var $2617 = Maybe$none;
                var $2575 = $2617;
                break;
            case 'Fm.Term.cse':
                var $2618 = self.path;
                var $2619 = self.expr;
                var $2620 = self.name;
                var $2621 = self.with;
                var $2622 = self.cses;
                var $2623 = self.moti;
                var $2624 = Maybe$none;
                var $2575 = $2624;
                break;
            case 'Fm.Term.ori':
                var $2625 = self.orig;
                var $2626 = self.expr;
                var $2627 = Maybe$none;
                var $2575 = $2627;
                break;
        };
        return $2575;
    };
    const Fm$Term$desugar_cse = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Term$desugar_cse$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Error$patch$(_path$1, _term$2) {
        var $2628 = ({
            _: 'Fm.Error.patch',
            'path': _path$1,
            'term': _term$2
        });
        return $2628;
    };
    const Fm$Error$patch = x0 => x1 => Fm$Error$patch$(x0, x1);

    function Fm$MPath$to_bits$(_path$1) {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.none':
                var $2630 = Bits$e;
                var $2629 = $2630;
                break;
            case 'Maybe.some':
                var $2631 = self.value;
                var $2632 = $2631(Bits$e);
                var $2629 = $2632;
                break;
        };
        return $2629;
    };
    const Fm$MPath$to_bits = x0 => Fm$MPath$to_bits$(x0);

    function Set$has$(_bits$1, _set$2) {
        var self = Map$get$(_bits$1, _set$2);
        switch (self._) {
            case 'Maybe.none':
                var $2634 = Bool$false;
                var $2633 = $2634;
                break;
            case 'Maybe.some':
                var $2635 = self.value;
                var $2636 = Bool$true;
                var $2633 = $2636;
                break;
        };
        return $2633;
    };
    const Set$has = x0 => x1 => Set$has$(x0, x1);

    function Fm$Term$normalize$(_term$1, _defs$2) {
        var self = Fm$Term$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $2638 = self.name;
                var $2639 = self.indx;
                var $2640 = Fm$Term$var$($2638, $2639);
                var $2637 = $2640;
                break;
            case 'Fm.Term.ref':
                var $2641 = self.name;
                var $2642 = Fm$Term$ref$($2641);
                var $2637 = $2642;
                break;
            case 'Fm.Term.typ':
                var $2643 = Fm$Term$typ;
                var $2637 = $2643;
                break;
            case 'Fm.Term.all':
                var $2644 = self.eras;
                var $2645 = self.self;
                var $2646 = self.name;
                var $2647 = self.xtyp;
                var $2648 = self.body;
                var $2649 = Fm$Term$all$($2644, $2645, $2646, Fm$Term$normalize$($2647, _defs$2), (_s$8 => _x$9 => {
                    var $2650 = Fm$Term$normalize$($2648(_s$8)(_x$9), _defs$2);
                    return $2650;
                }));
                var $2637 = $2649;
                break;
            case 'Fm.Term.lam':
                var $2651 = self.name;
                var $2652 = self.body;
                var $2653 = Fm$Term$lam$($2651, (_x$5 => {
                    var $2654 = Fm$Term$normalize$($2652(_x$5), _defs$2);
                    return $2654;
                }));
                var $2637 = $2653;
                break;
            case 'Fm.Term.app':
                var $2655 = self.func;
                var $2656 = self.argm;
                var $2657 = Fm$Term$app$(Fm$Term$normalize$($2655, _defs$2), Fm$Term$normalize$($2656, _defs$2));
                var $2637 = $2657;
                break;
            case 'Fm.Term.let':
                var $2658 = self.name;
                var $2659 = self.expr;
                var $2660 = self.body;
                var $2661 = Fm$Term$let$($2658, Fm$Term$normalize$($2659, _defs$2), (_x$6 => {
                    var $2662 = Fm$Term$normalize$($2660(_x$6), _defs$2);
                    return $2662;
                }));
                var $2637 = $2661;
                break;
            case 'Fm.Term.def':
                var $2663 = self.name;
                var $2664 = self.expr;
                var $2665 = self.body;
                var $2666 = Fm$Term$def$($2663, Fm$Term$normalize$($2664, _defs$2), (_x$6 => {
                    var $2667 = Fm$Term$normalize$($2665(_x$6), _defs$2);
                    return $2667;
                }));
                var $2637 = $2666;
                break;
            case 'Fm.Term.ann':
                var $2668 = self.done;
                var $2669 = self.term;
                var $2670 = self.type;
                var $2671 = Fm$Term$ann$($2668, Fm$Term$normalize$($2669, _defs$2), Fm$Term$normalize$($2670, _defs$2));
                var $2637 = $2671;
                break;
            case 'Fm.Term.gol':
                var $2672 = self.name;
                var $2673 = self.dref;
                var $2674 = self.verb;
                var $2675 = Fm$Term$gol$($2672, $2673, $2674);
                var $2637 = $2675;
                break;
            case 'Fm.Term.hol':
                var $2676 = self.path;
                var $2677 = Fm$Term$hol$($2676);
                var $2637 = $2677;
                break;
            case 'Fm.Term.nat':
                var $2678 = self.natx;
                var $2679 = Fm$Term$nat$($2678);
                var $2637 = $2679;
                break;
            case 'Fm.Term.chr':
                var $2680 = self.chrx;
                var $2681 = Fm$Term$chr$($2680);
                var $2637 = $2681;
                break;
            case 'Fm.Term.str':
                var $2682 = self.strx;
                var $2683 = Fm$Term$str$($2682);
                var $2637 = $2683;
                break;
            case 'Fm.Term.cse':
                var $2684 = self.path;
                var $2685 = self.expr;
                var $2686 = self.name;
                var $2687 = self.with;
                var $2688 = self.cses;
                var $2689 = self.moti;
                var $2690 = _term$1;
                var $2637 = $2690;
                break;
            case 'Fm.Term.ori':
                var $2691 = self.orig;
                var $2692 = self.expr;
                var $2693 = Fm$Term$normalize$($2692, _defs$2);
                var $2637 = $2693;
                break;
        };
        return $2637;
    };
    const Fm$Term$normalize = x0 => x1 => Fm$Term$normalize$(x0, x1);

    function Fm$Term$equal$patch$(_path$2, _term$3, _ret$4) {
        var $2694 = Fm$Check$result$(Maybe$some$(_ret$4), List$cons$(Fm$Error$patch$(_path$2, Fm$Term$normalize$(_term$3, Map$new)), List$nil));
        return $2694;
    };
    const Fm$Term$equal$patch = x0 => x1 => x2 => Fm$Term$equal$patch$(x0, x1, x2);

    function Fm$Term$equal$extra_holes$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2696 = self.name;
                var $2697 = self.indx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2699 = self.name;
                        var $2700 = self.indx;
                        var $2701 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2701;
                        break;
                    case 'Fm.Term.ref':
                        var $2702 = self.name;
                        var $2703 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2703;
                        break;
                    case 'Fm.Term.typ':
                        var $2704 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2704;
                        break;
                    case 'Fm.Term.all':
                        var $2705 = self.eras;
                        var $2706 = self.self;
                        var $2707 = self.name;
                        var $2708 = self.xtyp;
                        var $2709 = self.body;
                        var $2710 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2710;
                        break;
                    case 'Fm.Term.lam':
                        var $2711 = self.name;
                        var $2712 = self.body;
                        var $2713 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2713;
                        break;
                    case 'Fm.Term.app':
                        var $2714 = self.func;
                        var $2715 = self.argm;
                        var $2716 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2716;
                        break;
                    case 'Fm.Term.let':
                        var $2717 = self.name;
                        var $2718 = self.expr;
                        var $2719 = self.body;
                        var $2720 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2720;
                        break;
                    case 'Fm.Term.def':
                        var $2721 = self.name;
                        var $2722 = self.expr;
                        var $2723 = self.body;
                        var $2724 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2724;
                        break;
                    case 'Fm.Term.ann':
                        var $2725 = self.done;
                        var $2726 = self.term;
                        var $2727 = self.type;
                        var $2728 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2728;
                        break;
                    case 'Fm.Term.gol':
                        var $2729 = self.name;
                        var $2730 = self.dref;
                        var $2731 = self.verb;
                        var $2732 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2732;
                        break;
                    case 'Fm.Term.hol':
                        var $2733 = self.path;
                        var $2734 = Fm$Term$equal$patch$($2733, _a$1, Unit$new);
                        var $2698 = $2734;
                        break;
                    case 'Fm.Term.nat':
                        var $2735 = self.natx;
                        var $2736 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2736;
                        break;
                    case 'Fm.Term.chr':
                        var $2737 = self.chrx;
                        var $2738 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2738;
                        break;
                    case 'Fm.Term.str':
                        var $2739 = self.strx;
                        var $2740 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2740;
                        break;
                    case 'Fm.Term.cse':
                        var $2741 = self.path;
                        var $2742 = self.expr;
                        var $2743 = self.name;
                        var $2744 = self.with;
                        var $2745 = self.cses;
                        var $2746 = self.moti;
                        var $2747 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2698 = $2747;
                        break;
                    case 'Fm.Term.ori':
                        var $2748 = self.orig;
                        var $2749 = self.expr;
                        var $2750 = Fm$Term$equal$extra_holes$(_a$1, $2749);
                        var $2698 = $2750;
                        break;
                };
                var $2695 = $2698;
                break;
            case 'Fm.Term.ref':
                var $2751 = self.name;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2753 = self.name;
                        var $2754 = self.indx;
                        var $2755 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2755;
                        break;
                    case 'Fm.Term.ref':
                        var $2756 = self.name;
                        var $2757 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2757;
                        break;
                    case 'Fm.Term.typ':
                        var $2758 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2758;
                        break;
                    case 'Fm.Term.all':
                        var $2759 = self.eras;
                        var $2760 = self.self;
                        var $2761 = self.name;
                        var $2762 = self.xtyp;
                        var $2763 = self.body;
                        var $2764 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2764;
                        break;
                    case 'Fm.Term.lam':
                        var $2765 = self.name;
                        var $2766 = self.body;
                        var $2767 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2767;
                        break;
                    case 'Fm.Term.app':
                        var $2768 = self.func;
                        var $2769 = self.argm;
                        var $2770 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2770;
                        break;
                    case 'Fm.Term.let':
                        var $2771 = self.name;
                        var $2772 = self.expr;
                        var $2773 = self.body;
                        var $2774 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2774;
                        break;
                    case 'Fm.Term.def':
                        var $2775 = self.name;
                        var $2776 = self.expr;
                        var $2777 = self.body;
                        var $2778 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2778;
                        break;
                    case 'Fm.Term.ann':
                        var $2779 = self.done;
                        var $2780 = self.term;
                        var $2781 = self.type;
                        var $2782 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2782;
                        break;
                    case 'Fm.Term.gol':
                        var $2783 = self.name;
                        var $2784 = self.dref;
                        var $2785 = self.verb;
                        var $2786 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2786;
                        break;
                    case 'Fm.Term.hol':
                        var $2787 = self.path;
                        var $2788 = Fm$Term$equal$patch$($2787, _a$1, Unit$new);
                        var $2752 = $2788;
                        break;
                    case 'Fm.Term.nat':
                        var $2789 = self.natx;
                        var $2790 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2790;
                        break;
                    case 'Fm.Term.chr':
                        var $2791 = self.chrx;
                        var $2792 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2792;
                        break;
                    case 'Fm.Term.str':
                        var $2793 = self.strx;
                        var $2794 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2794;
                        break;
                    case 'Fm.Term.cse':
                        var $2795 = self.path;
                        var $2796 = self.expr;
                        var $2797 = self.name;
                        var $2798 = self.with;
                        var $2799 = self.cses;
                        var $2800 = self.moti;
                        var $2801 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2752 = $2801;
                        break;
                    case 'Fm.Term.ori':
                        var $2802 = self.orig;
                        var $2803 = self.expr;
                        var $2804 = Fm$Term$equal$extra_holes$(_a$1, $2803);
                        var $2752 = $2804;
                        break;
                };
                var $2695 = $2752;
                break;
            case 'Fm.Term.typ':
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2806 = self.name;
                        var $2807 = self.indx;
                        var $2808 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2808;
                        break;
                    case 'Fm.Term.ref':
                        var $2809 = self.name;
                        var $2810 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2810;
                        break;
                    case 'Fm.Term.typ':
                        var $2811 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2811;
                        break;
                    case 'Fm.Term.all':
                        var $2812 = self.eras;
                        var $2813 = self.self;
                        var $2814 = self.name;
                        var $2815 = self.xtyp;
                        var $2816 = self.body;
                        var $2817 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2817;
                        break;
                    case 'Fm.Term.lam':
                        var $2818 = self.name;
                        var $2819 = self.body;
                        var $2820 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2820;
                        break;
                    case 'Fm.Term.app':
                        var $2821 = self.func;
                        var $2822 = self.argm;
                        var $2823 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2823;
                        break;
                    case 'Fm.Term.let':
                        var $2824 = self.name;
                        var $2825 = self.expr;
                        var $2826 = self.body;
                        var $2827 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2827;
                        break;
                    case 'Fm.Term.def':
                        var $2828 = self.name;
                        var $2829 = self.expr;
                        var $2830 = self.body;
                        var $2831 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2831;
                        break;
                    case 'Fm.Term.ann':
                        var $2832 = self.done;
                        var $2833 = self.term;
                        var $2834 = self.type;
                        var $2835 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2835;
                        break;
                    case 'Fm.Term.gol':
                        var $2836 = self.name;
                        var $2837 = self.dref;
                        var $2838 = self.verb;
                        var $2839 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2839;
                        break;
                    case 'Fm.Term.hol':
                        var $2840 = self.path;
                        var $2841 = Fm$Term$equal$patch$($2840, _a$1, Unit$new);
                        var $2805 = $2841;
                        break;
                    case 'Fm.Term.nat':
                        var $2842 = self.natx;
                        var $2843 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2843;
                        break;
                    case 'Fm.Term.chr':
                        var $2844 = self.chrx;
                        var $2845 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2845;
                        break;
                    case 'Fm.Term.str':
                        var $2846 = self.strx;
                        var $2847 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2847;
                        break;
                    case 'Fm.Term.cse':
                        var $2848 = self.path;
                        var $2849 = self.expr;
                        var $2850 = self.name;
                        var $2851 = self.with;
                        var $2852 = self.cses;
                        var $2853 = self.moti;
                        var $2854 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2805 = $2854;
                        break;
                    case 'Fm.Term.ori':
                        var $2855 = self.orig;
                        var $2856 = self.expr;
                        var $2857 = Fm$Term$equal$extra_holes$(_a$1, $2856);
                        var $2805 = $2857;
                        break;
                };
                var $2695 = $2805;
                break;
            case 'Fm.Term.all':
                var $2858 = self.eras;
                var $2859 = self.self;
                var $2860 = self.name;
                var $2861 = self.xtyp;
                var $2862 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2864 = self.name;
                        var $2865 = self.indx;
                        var $2866 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2866;
                        break;
                    case 'Fm.Term.ref':
                        var $2867 = self.name;
                        var $2868 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2868;
                        break;
                    case 'Fm.Term.typ':
                        var $2869 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2869;
                        break;
                    case 'Fm.Term.all':
                        var $2870 = self.eras;
                        var $2871 = self.self;
                        var $2872 = self.name;
                        var $2873 = self.xtyp;
                        var $2874 = self.body;
                        var $2875 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2875;
                        break;
                    case 'Fm.Term.lam':
                        var $2876 = self.name;
                        var $2877 = self.body;
                        var $2878 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2878;
                        break;
                    case 'Fm.Term.app':
                        var $2879 = self.func;
                        var $2880 = self.argm;
                        var $2881 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2881;
                        break;
                    case 'Fm.Term.let':
                        var $2882 = self.name;
                        var $2883 = self.expr;
                        var $2884 = self.body;
                        var $2885 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2885;
                        break;
                    case 'Fm.Term.def':
                        var $2886 = self.name;
                        var $2887 = self.expr;
                        var $2888 = self.body;
                        var $2889 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2889;
                        break;
                    case 'Fm.Term.ann':
                        var $2890 = self.done;
                        var $2891 = self.term;
                        var $2892 = self.type;
                        var $2893 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2893;
                        break;
                    case 'Fm.Term.gol':
                        var $2894 = self.name;
                        var $2895 = self.dref;
                        var $2896 = self.verb;
                        var $2897 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2897;
                        break;
                    case 'Fm.Term.hol':
                        var $2898 = self.path;
                        var $2899 = Fm$Term$equal$patch$($2898, _a$1, Unit$new);
                        var $2863 = $2899;
                        break;
                    case 'Fm.Term.nat':
                        var $2900 = self.natx;
                        var $2901 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2901;
                        break;
                    case 'Fm.Term.chr':
                        var $2902 = self.chrx;
                        var $2903 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2903;
                        break;
                    case 'Fm.Term.str':
                        var $2904 = self.strx;
                        var $2905 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2905;
                        break;
                    case 'Fm.Term.cse':
                        var $2906 = self.path;
                        var $2907 = self.expr;
                        var $2908 = self.name;
                        var $2909 = self.with;
                        var $2910 = self.cses;
                        var $2911 = self.moti;
                        var $2912 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2863 = $2912;
                        break;
                    case 'Fm.Term.ori':
                        var $2913 = self.orig;
                        var $2914 = self.expr;
                        var $2915 = Fm$Term$equal$extra_holes$(_a$1, $2914);
                        var $2863 = $2915;
                        break;
                };
                var $2695 = $2863;
                break;
            case 'Fm.Term.lam':
                var $2916 = self.name;
                var $2917 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2919 = self.name;
                        var $2920 = self.indx;
                        var $2921 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2921;
                        break;
                    case 'Fm.Term.ref':
                        var $2922 = self.name;
                        var $2923 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2923;
                        break;
                    case 'Fm.Term.typ':
                        var $2924 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2924;
                        break;
                    case 'Fm.Term.all':
                        var $2925 = self.eras;
                        var $2926 = self.self;
                        var $2927 = self.name;
                        var $2928 = self.xtyp;
                        var $2929 = self.body;
                        var $2930 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2930;
                        break;
                    case 'Fm.Term.lam':
                        var $2931 = self.name;
                        var $2932 = self.body;
                        var $2933 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2933;
                        break;
                    case 'Fm.Term.app':
                        var $2934 = self.func;
                        var $2935 = self.argm;
                        var $2936 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2936;
                        break;
                    case 'Fm.Term.let':
                        var $2937 = self.name;
                        var $2938 = self.expr;
                        var $2939 = self.body;
                        var $2940 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2940;
                        break;
                    case 'Fm.Term.def':
                        var $2941 = self.name;
                        var $2942 = self.expr;
                        var $2943 = self.body;
                        var $2944 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2944;
                        break;
                    case 'Fm.Term.ann':
                        var $2945 = self.done;
                        var $2946 = self.term;
                        var $2947 = self.type;
                        var $2948 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2948;
                        break;
                    case 'Fm.Term.gol':
                        var $2949 = self.name;
                        var $2950 = self.dref;
                        var $2951 = self.verb;
                        var $2952 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2952;
                        break;
                    case 'Fm.Term.hol':
                        var $2953 = self.path;
                        var $2954 = Fm$Term$equal$patch$($2953, _a$1, Unit$new);
                        var $2918 = $2954;
                        break;
                    case 'Fm.Term.nat':
                        var $2955 = self.natx;
                        var $2956 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2956;
                        break;
                    case 'Fm.Term.chr':
                        var $2957 = self.chrx;
                        var $2958 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2958;
                        break;
                    case 'Fm.Term.str':
                        var $2959 = self.strx;
                        var $2960 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2960;
                        break;
                    case 'Fm.Term.cse':
                        var $2961 = self.path;
                        var $2962 = self.expr;
                        var $2963 = self.name;
                        var $2964 = self.with;
                        var $2965 = self.cses;
                        var $2966 = self.moti;
                        var $2967 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2918 = $2967;
                        break;
                    case 'Fm.Term.ori':
                        var $2968 = self.orig;
                        var $2969 = self.expr;
                        var $2970 = Fm$Term$equal$extra_holes$(_a$1, $2969);
                        var $2918 = $2970;
                        break;
                };
                var $2695 = $2918;
                break;
            case 'Fm.Term.app':
                var $2971 = self.func;
                var $2972 = self.argm;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $2974 = self.name;
                        var $2975 = self.indx;
                        var $2976 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2976;
                        break;
                    case 'Fm.Term.ref':
                        var $2977 = self.name;
                        var $2978 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2978;
                        break;
                    case 'Fm.Term.typ':
                        var $2979 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2979;
                        break;
                    case 'Fm.Term.all':
                        var $2980 = self.eras;
                        var $2981 = self.self;
                        var $2982 = self.name;
                        var $2983 = self.xtyp;
                        var $2984 = self.body;
                        var $2985 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2985;
                        break;
                    case 'Fm.Term.lam':
                        var $2986 = self.name;
                        var $2987 = self.body;
                        var $2988 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2988;
                        break;
                    case 'Fm.Term.app':
                        var $2989 = self.func;
                        var $2990 = self.argm;
                        var $2991 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$extra_holes$($2971, $2989))((_$7 => {
                            var $2992 = Fm$Term$equal$extra_holes$($2972, $2990);
                            return $2992;
                        }));
                        var $2973 = $2991;
                        break;
                    case 'Fm.Term.let':
                        var $2993 = self.name;
                        var $2994 = self.expr;
                        var $2995 = self.body;
                        var $2996 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $2996;
                        break;
                    case 'Fm.Term.def':
                        var $2997 = self.name;
                        var $2998 = self.expr;
                        var $2999 = self.body;
                        var $3000 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3000;
                        break;
                    case 'Fm.Term.ann':
                        var $3001 = self.done;
                        var $3002 = self.term;
                        var $3003 = self.type;
                        var $3004 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3004;
                        break;
                    case 'Fm.Term.gol':
                        var $3005 = self.name;
                        var $3006 = self.dref;
                        var $3007 = self.verb;
                        var $3008 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3008;
                        break;
                    case 'Fm.Term.hol':
                        var $3009 = self.path;
                        var $3010 = Fm$Term$equal$patch$($3009, _a$1, Unit$new);
                        var $2973 = $3010;
                        break;
                    case 'Fm.Term.nat':
                        var $3011 = self.natx;
                        var $3012 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3012;
                        break;
                    case 'Fm.Term.chr':
                        var $3013 = self.chrx;
                        var $3014 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3014;
                        break;
                    case 'Fm.Term.str':
                        var $3015 = self.strx;
                        var $3016 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3016;
                        break;
                    case 'Fm.Term.cse':
                        var $3017 = self.path;
                        var $3018 = self.expr;
                        var $3019 = self.name;
                        var $3020 = self.with;
                        var $3021 = self.cses;
                        var $3022 = self.moti;
                        var $3023 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $2973 = $3023;
                        break;
                    case 'Fm.Term.ori':
                        var $3024 = self.orig;
                        var $3025 = self.expr;
                        var $3026 = Fm$Term$equal$extra_holes$(_a$1, $3025);
                        var $2973 = $3026;
                        break;
                };
                var $2695 = $2973;
                break;
            case 'Fm.Term.let':
                var $3027 = self.name;
                var $3028 = self.expr;
                var $3029 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3031 = self.name;
                        var $3032 = self.indx;
                        var $3033 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3033;
                        break;
                    case 'Fm.Term.ref':
                        var $3034 = self.name;
                        var $3035 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3035;
                        break;
                    case 'Fm.Term.typ':
                        var $3036 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3036;
                        break;
                    case 'Fm.Term.all':
                        var $3037 = self.eras;
                        var $3038 = self.self;
                        var $3039 = self.name;
                        var $3040 = self.xtyp;
                        var $3041 = self.body;
                        var $3042 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3042;
                        break;
                    case 'Fm.Term.lam':
                        var $3043 = self.name;
                        var $3044 = self.body;
                        var $3045 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3045;
                        break;
                    case 'Fm.Term.app':
                        var $3046 = self.func;
                        var $3047 = self.argm;
                        var $3048 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3048;
                        break;
                    case 'Fm.Term.let':
                        var $3049 = self.name;
                        var $3050 = self.expr;
                        var $3051 = self.body;
                        var $3052 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3052;
                        break;
                    case 'Fm.Term.def':
                        var $3053 = self.name;
                        var $3054 = self.expr;
                        var $3055 = self.body;
                        var $3056 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3056;
                        break;
                    case 'Fm.Term.ann':
                        var $3057 = self.done;
                        var $3058 = self.term;
                        var $3059 = self.type;
                        var $3060 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3060;
                        break;
                    case 'Fm.Term.gol':
                        var $3061 = self.name;
                        var $3062 = self.dref;
                        var $3063 = self.verb;
                        var $3064 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3064;
                        break;
                    case 'Fm.Term.hol':
                        var $3065 = self.path;
                        var $3066 = Fm$Term$equal$patch$($3065, _a$1, Unit$new);
                        var $3030 = $3066;
                        break;
                    case 'Fm.Term.nat':
                        var $3067 = self.natx;
                        var $3068 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3068;
                        break;
                    case 'Fm.Term.chr':
                        var $3069 = self.chrx;
                        var $3070 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3070;
                        break;
                    case 'Fm.Term.str':
                        var $3071 = self.strx;
                        var $3072 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3072;
                        break;
                    case 'Fm.Term.cse':
                        var $3073 = self.path;
                        var $3074 = self.expr;
                        var $3075 = self.name;
                        var $3076 = self.with;
                        var $3077 = self.cses;
                        var $3078 = self.moti;
                        var $3079 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3030 = $3079;
                        break;
                    case 'Fm.Term.ori':
                        var $3080 = self.orig;
                        var $3081 = self.expr;
                        var $3082 = Fm$Term$equal$extra_holes$(_a$1, $3081);
                        var $3030 = $3082;
                        break;
                };
                var $2695 = $3030;
                break;
            case 'Fm.Term.def':
                var $3083 = self.name;
                var $3084 = self.expr;
                var $3085 = self.body;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3087 = self.name;
                        var $3088 = self.indx;
                        var $3089 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3089;
                        break;
                    case 'Fm.Term.ref':
                        var $3090 = self.name;
                        var $3091 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3091;
                        break;
                    case 'Fm.Term.typ':
                        var $3092 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3092;
                        break;
                    case 'Fm.Term.all':
                        var $3093 = self.eras;
                        var $3094 = self.self;
                        var $3095 = self.name;
                        var $3096 = self.xtyp;
                        var $3097 = self.body;
                        var $3098 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3098;
                        break;
                    case 'Fm.Term.lam':
                        var $3099 = self.name;
                        var $3100 = self.body;
                        var $3101 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3101;
                        break;
                    case 'Fm.Term.app':
                        var $3102 = self.func;
                        var $3103 = self.argm;
                        var $3104 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3104;
                        break;
                    case 'Fm.Term.let':
                        var $3105 = self.name;
                        var $3106 = self.expr;
                        var $3107 = self.body;
                        var $3108 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3108;
                        break;
                    case 'Fm.Term.def':
                        var $3109 = self.name;
                        var $3110 = self.expr;
                        var $3111 = self.body;
                        var $3112 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3112;
                        break;
                    case 'Fm.Term.ann':
                        var $3113 = self.done;
                        var $3114 = self.term;
                        var $3115 = self.type;
                        var $3116 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3116;
                        break;
                    case 'Fm.Term.gol':
                        var $3117 = self.name;
                        var $3118 = self.dref;
                        var $3119 = self.verb;
                        var $3120 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3120;
                        break;
                    case 'Fm.Term.hol':
                        var $3121 = self.path;
                        var $3122 = Fm$Term$equal$patch$($3121, _a$1, Unit$new);
                        var $3086 = $3122;
                        break;
                    case 'Fm.Term.nat':
                        var $3123 = self.natx;
                        var $3124 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3124;
                        break;
                    case 'Fm.Term.chr':
                        var $3125 = self.chrx;
                        var $3126 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3126;
                        break;
                    case 'Fm.Term.str':
                        var $3127 = self.strx;
                        var $3128 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3128;
                        break;
                    case 'Fm.Term.cse':
                        var $3129 = self.path;
                        var $3130 = self.expr;
                        var $3131 = self.name;
                        var $3132 = self.with;
                        var $3133 = self.cses;
                        var $3134 = self.moti;
                        var $3135 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3086 = $3135;
                        break;
                    case 'Fm.Term.ori':
                        var $3136 = self.orig;
                        var $3137 = self.expr;
                        var $3138 = Fm$Term$equal$extra_holes$(_a$1, $3137);
                        var $3086 = $3138;
                        break;
                };
                var $2695 = $3086;
                break;
            case 'Fm.Term.ann':
                var $3139 = self.done;
                var $3140 = self.term;
                var $3141 = self.type;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3143 = self.name;
                        var $3144 = self.indx;
                        var $3145 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3145;
                        break;
                    case 'Fm.Term.ref':
                        var $3146 = self.name;
                        var $3147 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3147;
                        break;
                    case 'Fm.Term.typ':
                        var $3148 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3148;
                        break;
                    case 'Fm.Term.all':
                        var $3149 = self.eras;
                        var $3150 = self.self;
                        var $3151 = self.name;
                        var $3152 = self.xtyp;
                        var $3153 = self.body;
                        var $3154 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3154;
                        break;
                    case 'Fm.Term.lam':
                        var $3155 = self.name;
                        var $3156 = self.body;
                        var $3157 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3157;
                        break;
                    case 'Fm.Term.app':
                        var $3158 = self.func;
                        var $3159 = self.argm;
                        var $3160 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3160;
                        break;
                    case 'Fm.Term.let':
                        var $3161 = self.name;
                        var $3162 = self.expr;
                        var $3163 = self.body;
                        var $3164 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3164;
                        break;
                    case 'Fm.Term.def':
                        var $3165 = self.name;
                        var $3166 = self.expr;
                        var $3167 = self.body;
                        var $3168 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3168;
                        break;
                    case 'Fm.Term.ann':
                        var $3169 = self.done;
                        var $3170 = self.term;
                        var $3171 = self.type;
                        var $3172 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3172;
                        break;
                    case 'Fm.Term.gol':
                        var $3173 = self.name;
                        var $3174 = self.dref;
                        var $3175 = self.verb;
                        var $3176 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3176;
                        break;
                    case 'Fm.Term.hol':
                        var $3177 = self.path;
                        var $3178 = Fm$Term$equal$patch$($3177, _a$1, Unit$new);
                        var $3142 = $3178;
                        break;
                    case 'Fm.Term.nat':
                        var $3179 = self.natx;
                        var $3180 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3180;
                        break;
                    case 'Fm.Term.chr':
                        var $3181 = self.chrx;
                        var $3182 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3182;
                        break;
                    case 'Fm.Term.str':
                        var $3183 = self.strx;
                        var $3184 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3184;
                        break;
                    case 'Fm.Term.cse':
                        var $3185 = self.path;
                        var $3186 = self.expr;
                        var $3187 = self.name;
                        var $3188 = self.with;
                        var $3189 = self.cses;
                        var $3190 = self.moti;
                        var $3191 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3142 = $3191;
                        break;
                    case 'Fm.Term.ori':
                        var $3192 = self.orig;
                        var $3193 = self.expr;
                        var $3194 = Fm$Term$equal$extra_holes$(_a$1, $3193);
                        var $3142 = $3194;
                        break;
                };
                var $2695 = $3142;
                break;
            case 'Fm.Term.gol':
                var $3195 = self.name;
                var $3196 = self.dref;
                var $3197 = self.verb;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3199 = self.name;
                        var $3200 = self.indx;
                        var $3201 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3201;
                        break;
                    case 'Fm.Term.ref':
                        var $3202 = self.name;
                        var $3203 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3203;
                        break;
                    case 'Fm.Term.typ':
                        var $3204 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3204;
                        break;
                    case 'Fm.Term.all':
                        var $3205 = self.eras;
                        var $3206 = self.self;
                        var $3207 = self.name;
                        var $3208 = self.xtyp;
                        var $3209 = self.body;
                        var $3210 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3210;
                        break;
                    case 'Fm.Term.lam':
                        var $3211 = self.name;
                        var $3212 = self.body;
                        var $3213 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3213;
                        break;
                    case 'Fm.Term.app':
                        var $3214 = self.func;
                        var $3215 = self.argm;
                        var $3216 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3216;
                        break;
                    case 'Fm.Term.let':
                        var $3217 = self.name;
                        var $3218 = self.expr;
                        var $3219 = self.body;
                        var $3220 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3220;
                        break;
                    case 'Fm.Term.def':
                        var $3221 = self.name;
                        var $3222 = self.expr;
                        var $3223 = self.body;
                        var $3224 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3224;
                        break;
                    case 'Fm.Term.ann':
                        var $3225 = self.done;
                        var $3226 = self.term;
                        var $3227 = self.type;
                        var $3228 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3228;
                        break;
                    case 'Fm.Term.gol':
                        var $3229 = self.name;
                        var $3230 = self.dref;
                        var $3231 = self.verb;
                        var $3232 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3232;
                        break;
                    case 'Fm.Term.hol':
                        var $3233 = self.path;
                        var $3234 = Fm$Term$equal$patch$($3233, _a$1, Unit$new);
                        var $3198 = $3234;
                        break;
                    case 'Fm.Term.nat':
                        var $3235 = self.natx;
                        var $3236 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3236;
                        break;
                    case 'Fm.Term.chr':
                        var $3237 = self.chrx;
                        var $3238 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3238;
                        break;
                    case 'Fm.Term.str':
                        var $3239 = self.strx;
                        var $3240 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3240;
                        break;
                    case 'Fm.Term.cse':
                        var $3241 = self.path;
                        var $3242 = self.expr;
                        var $3243 = self.name;
                        var $3244 = self.with;
                        var $3245 = self.cses;
                        var $3246 = self.moti;
                        var $3247 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3198 = $3247;
                        break;
                    case 'Fm.Term.ori':
                        var $3248 = self.orig;
                        var $3249 = self.expr;
                        var $3250 = Fm$Term$equal$extra_holes$(_a$1, $3249);
                        var $3198 = $3250;
                        break;
                };
                var $2695 = $3198;
                break;
            case 'Fm.Term.hol':
                var $3251 = self.path;
                var $3252 = Fm$Term$equal$patch$($3251, _b$2, Unit$new);
                var $2695 = $3252;
                break;
            case 'Fm.Term.nat':
                var $3253 = self.natx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3255 = self.name;
                        var $3256 = self.indx;
                        var $3257 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3257;
                        break;
                    case 'Fm.Term.ref':
                        var $3258 = self.name;
                        var $3259 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3259;
                        break;
                    case 'Fm.Term.typ':
                        var $3260 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3260;
                        break;
                    case 'Fm.Term.all':
                        var $3261 = self.eras;
                        var $3262 = self.self;
                        var $3263 = self.name;
                        var $3264 = self.xtyp;
                        var $3265 = self.body;
                        var $3266 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3266;
                        break;
                    case 'Fm.Term.lam':
                        var $3267 = self.name;
                        var $3268 = self.body;
                        var $3269 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3269;
                        break;
                    case 'Fm.Term.app':
                        var $3270 = self.func;
                        var $3271 = self.argm;
                        var $3272 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3272;
                        break;
                    case 'Fm.Term.let':
                        var $3273 = self.name;
                        var $3274 = self.expr;
                        var $3275 = self.body;
                        var $3276 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3276;
                        break;
                    case 'Fm.Term.def':
                        var $3277 = self.name;
                        var $3278 = self.expr;
                        var $3279 = self.body;
                        var $3280 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3280;
                        break;
                    case 'Fm.Term.ann':
                        var $3281 = self.done;
                        var $3282 = self.term;
                        var $3283 = self.type;
                        var $3284 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3284;
                        break;
                    case 'Fm.Term.gol':
                        var $3285 = self.name;
                        var $3286 = self.dref;
                        var $3287 = self.verb;
                        var $3288 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3288;
                        break;
                    case 'Fm.Term.hol':
                        var $3289 = self.path;
                        var $3290 = Fm$Term$equal$patch$($3289, _a$1, Unit$new);
                        var $3254 = $3290;
                        break;
                    case 'Fm.Term.nat':
                        var $3291 = self.natx;
                        var $3292 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3292;
                        break;
                    case 'Fm.Term.chr':
                        var $3293 = self.chrx;
                        var $3294 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3294;
                        break;
                    case 'Fm.Term.str':
                        var $3295 = self.strx;
                        var $3296 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3296;
                        break;
                    case 'Fm.Term.cse':
                        var $3297 = self.path;
                        var $3298 = self.expr;
                        var $3299 = self.name;
                        var $3300 = self.with;
                        var $3301 = self.cses;
                        var $3302 = self.moti;
                        var $3303 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3254 = $3303;
                        break;
                    case 'Fm.Term.ori':
                        var $3304 = self.orig;
                        var $3305 = self.expr;
                        var $3306 = Fm$Term$equal$extra_holes$(_a$1, $3305);
                        var $3254 = $3306;
                        break;
                };
                var $2695 = $3254;
                break;
            case 'Fm.Term.chr':
                var $3307 = self.chrx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3309 = self.name;
                        var $3310 = self.indx;
                        var $3311 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3311;
                        break;
                    case 'Fm.Term.ref':
                        var $3312 = self.name;
                        var $3313 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3313;
                        break;
                    case 'Fm.Term.typ':
                        var $3314 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3314;
                        break;
                    case 'Fm.Term.all':
                        var $3315 = self.eras;
                        var $3316 = self.self;
                        var $3317 = self.name;
                        var $3318 = self.xtyp;
                        var $3319 = self.body;
                        var $3320 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3320;
                        break;
                    case 'Fm.Term.lam':
                        var $3321 = self.name;
                        var $3322 = self.body;
                        var $3323 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3323;
                        break;
                    case 'Fm.Term.app':
                        var $3324 = self.func;
                        var $3325 = self.argm;
                        var $3326 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3326;
                        break;
                    case 'Fm.Term.let':
                        var $3327 = self.name;
                        var $3328 = self.expr;
                        var $3329 = self.body;
                        var $3330 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3330;
                        break;
                    case 'Fm.Term.def':
                        var $3331 = self.name;
                        var $3332 = self.expr;
                        var $3333 = self.body;
                        var $3334 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3334;
                        break;
                    case 'Fm.Term.ann':
                        var $3335 = self.done;
                        var $3336 = self.term;
                        var $3337 = self.type;
                        var $3338 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3338;
                        break;
                    case 'Fm.Term.gol':
                        var $3339 = self.name;
                        var $3340 = self.dref;
                        var $3341 = self.verb;
                        var $3342 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3342;
                        break;
                    case 'Fm.Term.hol':
                        var $3343 = self.path;
                        var $3344 = Fm$Term$equal$patch$($3343, _a$1, Unit$new);
                        var $3308 = $3344;
                        break;
                    case 'Fm.Term.nat':
                        var $3345 = self.natx;
                        var $3346 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3346;
                        break;
                    case 'Fm.Term.chr':
                        var $3347 = self.chrx;
                        var $3348 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3348;
                        break;
                    case 'Fm.Term.str':
                        var $3349 = self.strx;
                        var $3350 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3350;
                        break;
                    case 'Fm.Term.cse':
                        var $3351 = self.path;
                        var $3352 = self.expr;
                        var $3353 = self.name;
                        var $3354 = self.with;
                        var $3355 = self.cses;
                        var $3356 = self.moti;
                        var $3357 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3308 = $3357;
                        break;
                    case 'Fm.Term.ori':
                        var $3358 = self.orig;
                        var $3359 = self.expr;
                        var $3360 = Fm$Term$equal$extra_holes$(_a$1, $3359);
                        var $3308 = $3360;
                        break;
                };
                var $2695 = $3308;
                break;
            case 'Fm.Term.str':
                var $3361 = self.strx;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3363 = self.name;
                        var $3364 = self.indx;
                        var $3365 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3365;
                        break;
                    case 'Fm.Term.ref':
                        var $3366 = self.name;
                        var $3367 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3367;
                        break;
                    case 'Fm.Term.typ':
                        var $3368 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3368;
                        break;
                    case 'Fm.Term.all':
                        var $3369 = self.eras;
                        var $3370 = self.self;
                        var $3371 = self.name;
                        var $3372 = self.xtyp;
                        var $3373 = self.body;
                        var $3374 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3374;
                        break;
                    case 'Fm.Term.lam':
                        var $3375 = self.name;
                        var $3376 = self.body;
                        var $3377 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3377;
                        break;
                    case 'Fm.Term.app':
                        var $3378 = self.func;
                        var $3379 = self.argm;
                        var $3380 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3380;
                        break;
                    case 'Fm.Term.let':
                        var $3381 = self.name;
                        var $3382 = self.expr;
                        var $3383 = self.body;
                        var $3384 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3384;
                        break;
                    case 'Fm.Term.def':
                        var $3385 = self.name;
                        var $3386 = self.expr;
                        var $3387 = self.body;
                        var $3388 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3388;
                        break;
                    case 'Fm.Term.ann':
                        var $3389 = self.done;
                        var $3390 = self.term;
                        var $3391 = self.type;
                        var $3392 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3392;
                        break;
                    case 'Fm.Term.gol':
                        var $3393 = self.name;
                        var $3394 = self.dref;
                        var $3395 = self.verb;
                        var $3396 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3396;
                        break;
                    case 'Fm.Term.hol':
                        var $3397 = self.path;
                        var $3398 = Fm$Term$equal$patch$($3397, _a$1, Unit$new);
                        var $3362 = $3398;
                        break;
                    case 'Fm.Term.nat':
                        var $3399 = self.natx;
                        var $3400 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3400;
                        break;
                    case 'Fm.Term.chr':
                        var $3401 = self.chrx;
                        var $3402 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3402;
                        break;
                    case 'Fm.Term.str':
                        var $3403 = self.strx;
                        var $3404 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3404;
                        break;
                    case 'Fm.Term.cse':
                        var $3405 = self.path;
                        var $3406 = self.expr;
                        var $3407 = self.name;
                        var $3408 = self.with;
                        var $3409 = self.cses;
                        var $3410 = self.moti;
                        var $3411 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3362 = $3411;
                        break;
                    case 'Fm.Term.ori':
                        var $3412 = self.orig;
                        var $3413 = self.expr;
                        var $3414 = Fm$Term$equal$extra_holes$(_a$1, $3413);
                        var $3362 = $3414;
                        break;
                };
                var $2695 = $3362;
                break;
            case 'Fm.Term.cse':
                var $3415 = self.path;
                var $3416 = self.expr;
                var $3417 = self.name;
                var $3418 = self.with;
                var $3419 = self.cses;
                var $3420 = self.moti;
                var self = _b$2;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3422 = self.name;
                        var $3423 = self.indx;
                        var $3424 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3424;
                        break;
                    case 'Fm.Term.ref':
                        var $3425 = self.name;
                        var $3426 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3426;
                        break;
                    case 'Fm.Term.typ':
                        var $3427 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3427;
                        break;
                    case 'Fm.Term.all':
                        var $3428 = self.eras;
                        var $3429 = self.self;
                        var $3430 = self.name;
                        var $3431 = self.xtyp;
                        var $3432 = self.body;
                        var $3433 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3433;
                        break;
                    case 'Fm.Term.lam':
                        var $3434 = self.name;
                        var $3435 = self.body;
                        var $3436 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3436;
                        break;
                    case 'Fm.Term.app':
                        var $3437 = self.func;
                        var $3438 = self.argm;
                        var $3439 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3439;
                        break;
                    case 'Fm.Term.let':
                        var $3440 = self.name;
                        var $3441 = self.expr;
                        var $3442 = self.body;
                        var $3443 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3443;
                        break;
                    case 'Fm.Term.def':
                        var $3444 = self.name;
                        var $3445 = self.expr;
                        var $3446 = self.body;
                        var $3447 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3447;
                        break;
                    case 'Fm.Term.ann':
                        var $3448 = self.done;
                        var $3449 = self.term;
                        var $3450 = self.type;
                        var $3451 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3451;
                        break;
                    case 'Fm.Term.gol':
                        var $3452 = self.name;
                        var $3453 = self.dref;
                        var $3454 = self.verb;
                        var $3455 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3455;
                        break;
                    case 'Fm.Term.hol':
                        var $3456 = self.path;
                        var $3457 = Fm$Term$equal$patch$($3456, _a$1, Unit$new);
                        var $3421 = $3457;
                        break;
                    case 'Fm.Term.nat':
                        var $3458 = self.natx;
                        var $3459 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3459;
                        break;
                    case 'Fm.Term.chr':
                        var $3460 = self.chrx;
                        var $3461 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3461;
                        break;
                    case 'Fm.Term.str':
                        var $3462 = self.strx;
                        var $3463 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3463;
                        break;
                    case 'Fm.Term.cse':
                        var $3464 = self.path;
                        var $3465 = self.expr;
                        var $3466 = self.name;
                        var $3467 = self.with;
                        var $3468 = self.cses;
                        var $3469 = self.moti;
                        var $3470 = Monad$pure$(Fm$Check$monad)(Unit$new);
                        var $3421 = $3470;
                        break;
                    case 'Fm.Term.ori':
                        var $3471 = self.orig;
                        var $3472 = self.expr;
                        var $3473 = Fm$Term$equal$extra_holes$(_a$1, $3472);
                        var $3421 = $3473;
                        break;
                };
                var $2695 = $3421;
                break;
            case 'Fm.Term.ori':
                var $3474 = self.orig;
                var $3475 = self.expr;
                var $3476 = Fm$Term$equal$extra_holes$($3475, _b$2);
                var $2695 = $3476;
                break;
        };
        return $2695;
    };
    const Fm$Term$equal$extra_holes = x0 => x1 => Fm$Term$equal$extra_holes$(x0, x1);

    function Set$set$(_bits$1, _set$2) {
        var $3477 = Map$set$(_bits$1, Unit$new, _set$2);
        return $3477;
    };
    const Set$set = x0 => x1 => Set$set$(x0, x1);

    function Bool$eql$(_a$1, _b$2) {
        var self = _a$1;
        if (self) {
            var $3479 = _b$2;
            var $3478 = $3479;
        } else {
            var $3480 = (!_b$2);
            var $3478 = $3480;
        };
        return $3478;
    };
    const Bool$eql = x0 => x1 => Bool$eql$(x0, x1);

    function Fm$Term$equal$(_a$1, _b$2, _defs$3, _lv$4, _seen$5) {
        var _ah$6 = Fm$Term$serialize$(Fm$Term$reduce$(_a$1, Map$new), _lv$4, _lv$4, Bits$e);
        var _bh$7 = Fm$Term$serialize$(Fm$Term$reduce$(_b$2, Map$new), _lv$4, _lv$4, Bits$e);
        var self = (_bh$7 === _ah$6);
        if (self) {
            var $3482 = Monad$pure$(Fm$Check$monad)(Bool$true);
            var $3481 = $3482;
        } else {
            var _a1$8 = Fm$Term$reduce$(_a$1, _defs$3);
            var _b1$9 = Fm$Term$reduce$(_b$2, _defs$3);
            var _ah$10 = Fm$Term$serialize$(_a1$8, _lv$4, _lv$4, Bits$e);
            var _bh$11 = Fm$Term$serialize$(_b1$9, _lv$4, _lv$4, Bits$e);
            var self = (_bh$11 === _ah$10);
            if (self) {
                var $3484 = Monad$pure$(Fm$Check$monad)(Bool$true);
                var $3483 = $3484;
            } else {
                var _id$12 = (_bh$11 + _ah$10);
                var self = Set$has$(_id$12, _seen$5);
                if (self) {
                    var $3486 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$extra_holes$(_a$1, _b$2))((_$13 => {
                        var $3487 = Monad$pure$(Fm$Check$monad)(Bool$true);
                        return $3487;
                    }));
                    var $3485 = $3486;
                } else {
                    var self = _a1$8;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $3489 = self.name;
                            var $3490 = self.indx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3492 = self.name;
                                    var $3493 = self.indx;
                                    var $3494 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3494;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3495 = self.name;
                                    var $3496 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3496;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3497 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3497;
                                    break;
                                case 'Fm.Term.all':
                                    var $3498 = self.eras;
                                    var $3499 = self.self;
                                    var $3500 = self.name;
                                    var $3501 = self.xtyp;
                                    var $3502 = self.body;
                                    var $3503 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3503;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3504 = self.name;
                                    var $3505 = self.body;
                                    var $3506 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3506;
                                    break;
                                case 'Fm.Term.app':
                                    var $3507 = self.func;
                                    var $3508 = self.argm;
                                    var $3509 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3509;
                                    break;
                                case 'Fm.Term.let':
                                    var $3510 = self.name;
                                    var $3511 = self.expr;
                                    var $3512 = self.body;
                                    var $3513 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3513;
                                    break;
                                case 'Fm.Term.def':
                                    var $3514 = self.name;
                                    var $3515 = self.expr;
                                    var $3516 = self.body;
                                    var $3517 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3517;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3518 = self.done;
                                    var $3519 = self.term;
                                    var $3520 = self.type;
                                    var $3521 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3521;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3522 = self.name;
                                    var $3523 = self.dref;
                                    var $3524 = self.verb;
                                    var $3525 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3525;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3526 = self.path;
                                    var $3527 = Fm$Term$equal$patch$($3526, _a$1, Bool$true);
                                    var $3491 = $3527;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3528 = self.natx;
                                    var $3529 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3529;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3530 = self.chrx;
                                    var $3531 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3531;
                                    break;
                                case 'Fm.Term.str':
                                    var $3532 = self.strx;
                                    var $3533 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3533;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3534 = self.path;
                                    var $3535 = self.expr;
                                    var $3536 = self.name;
                                    var $3537 = self.with;
                                    var $3538 = self.cses;
                                    var $3539 = self.moti;
                                    var $3540 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3540;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3541 = self.orig;
                                    var $3542 = self.expr;
                                    var $3543 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3491 = $3543;
                                    break;
                            };
                            var $3488 = $3491;
                            break;
                        case 'Fm.Term.ref':
                            var $3544 = self.name;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3546 = self.name;
                                    var $3547 = self.indx;
                                    var $3548 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3548;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3549 = self.name;
                                    var $3550 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3550;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3551 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3551;
                                    break;
                                case 'Fm.Term.all':
                                    var $3552 = self.eras;
                                    var $3553 = self.self;
                                    var $3554 = self.name;
                                    var $3555 = self.xtyp;
                                    var $3556 = self.body;
                                    var $3557 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3557;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3558 = self.name;
                                    var $3559 = self.body;
                                    var $3560 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3560;
                                    break;
                                case 'Fm.Term.app':
                                    var $3561 = self.func;
                                    var $3562 = self.argm;
                                    var $3563 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3563;
                                    break;
                                case 'Fm.Term.let':
                                    var $3564 = self.name;
                                    var $3565 = self.expr;
                                    var $3566 = self.body;
                                    var $3567 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3567;
                                    break;
                                case 'Fm.Term.def':
                                    var $3568 = self.name;
                                    var $3569 = self.expr;
                                    var $3570 = self.body;
                                    var $3571 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3571;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3572 = self.done;
                                    var $3573 = self.term;
                                    var $3574 = self.type;
                                    var $3575 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3575;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3576 = self.name;
                                    var $3577 = self.dref;
                                    var $3578 = self.verb;
                                    var $3579 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3579;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3580 = self.path;
                                    var $3581 = Fm$Term$equal$patch$($3580, _a$1, Bool$true);
                                    var $3545 = $3581;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3582 = self.natx;
                                    var $3583 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3583;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3584 = self.chrx;
                                    var $3585 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3585;
                                    break;
                                case 'Fm.Term.str':
                                    var $3586 = self.strx;
                                    var $3587 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3587;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3588 = self.path;
                                    var $3589 = self.expr;
                                    var $3590 = self.name;
                                    var $3591 = self.with;
                                    var $3592 = self.cses;
                                    var $3593 = self.moti;
                                    var $3594 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3594;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3595 = self.orig;
                                    var $3596 = self.expr;
                                    var $3597 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3545 = $3597;
                                    break;
                            };
                            var $3488 = $3545;
                            break;
                        case 'Fm.Term.typ':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3599 = self.name;
                                    var $3600 = self.indx;
                                    var $3601 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3601;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3602 = self.name;
                                    var $3603 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3603;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3604 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3604;
                                    break;
                                case 'Fm.Term.all':
                                    var $3605 = self.eras;
                                    var $3606 = self.self;
                                    var $3607 = self.name;
                                    var $3608 = self.xtyp;
                                    var $3609 = self.body;
                                    var $3610 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3610;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3611 = self.name;
                                    var $3612 = self.body;
                                    var $3613 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3613;
                                    break;
                                case 'Fm.Term.app':
                                    var $3614 = self.func;
                                    var $3615 = self.argm;
                                    var $3616 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3616;
                                    break;
                                case 'Fm.Term.let':
                                    var $3617 = self.name;
                                    var $3618 = self.expr;
                                    var $3619 = self.body;
                                    var $3620 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3620;
                                    break;
                                case 'Fm.Term.def':
                                    var $3621 = self.name;
                                    var $3622 = self.expr;
                                    var $3623 = self.body;
                                    var $3624 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3624;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3625 = self.done;
                                    var $3626 = self.term;
                                    var $3627 = self.type;
                                    var $3628 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3628;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3629 = self.name;
                                    var $3630 = self.dref;
                                    var $3631 = self.verb;
                                    var $3632 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3632;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3633 = self.path;
                                    var $3634 = Fm$Term$equal$patch$($3633, _a$1, Bool$true);
                                    var $3598 = $3634;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3635 = self.natx;
                                    var $3636 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3636;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3637 = self.chrx;
                                    var $3638 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3638;
                                    break;
                                case 'Fm.Term.str':
                                    var $3639 = self.strx;
                                    var $3640 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3640;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3641 = self.path;
                                    var $3642 = self.expr;
                                    var $3643 = self.name;
                                    var $3644 = self.with;
                                    var $3645 = self.cses;
                                    var $3646 = self.moti;
                                    var $3647 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3647;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3648 = self.orig;
                                    var $3649 = self.expr;
                                    var $3650 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3598 = $3650;
                                    break;
                            };
                            var $3488 = $3598;
                            break;
                        case 'Fm.Term.all':
                            var $3651 = self.eras;
                            var $3652 = self.self;
                            var $3653 = self.name;
                            var $3654 = self.xtyp;
                            var $3655 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3657 = self.name;
                                    var $3658 = self.indx;
                                    var $3659 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3659;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3660 = self.name;
                                    var $3661 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3661;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3662 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3662;
                                    break;
                                case 'Fm.Term.all':
                                    var $3663 = self.eras;
                                    var $3664 = self.self;
                                    var $3665 = self.name;
                                    var $3666 = self.xtyp;
                                    var $3667 = self.body;
                                    var _seen$23 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$24 = $3655(Fm$Term$var$($3652, _lv$4))(Fm$Term$var$($3653, Nat$succ$(_lv$4)));
                                    var _b1_body$25 = $3667(Fm$Term$var$($3664, _lv$4))(Fm$Term$var$($3665, Nat$succ$(_lv$4)));
                                    var _eq_self$26 = ($3652 === $3664);
                                    var _eq_eras$27 = Bool$eql$($3651, $3663);
                                    var self = (_eq_self$26 && _eq_eras$27);
                                    if (self) {
                                        var $3669 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3654, $3666, _defs$3, _lv$4, _seen$23))((_eq_type$28 => {
                                            var $3670 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$24, _b1_body$25, _defs$3, Nat$succ$(Nat$succ$(_lv$4)), _seen$23))((_eq_body$29 => {
                                                var $3671 = Monad$pure$(Fm$Check$monad)((_eq_type$28 && _eq_body$29));
                                                return $3671;
                                            }));
                                            return $3670;
                                        }));
                                        var $3668 = $3669;
                                    } else {
                                        var $3672 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                        var $3668 = $3672;
                                    };
                                    var $3656 = $3668;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3673 = self.name;
                                    var $3674 = self.body;
                                    var $3675 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3675;
                                    break;
                                case 'Fm.Term.app':
                                    var $3676 = self.func;
                                    var $3677 = self.argm;
                                    var $3678 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3678;
                                    break;
                                case 'Fm.Term.let':
                                    var $3679 = self.name;
                                    var $3680 = self.expr;
                                    var $3681 = self.body;
                                    var $3682 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3682;
                                    break;
                                case 'Fm.Term.def':
                                    var $3683 = self.name;
                                    var $3684 = self.expr;
                                    var $3685 = self.body;
                                    var $3686 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3686;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3687 = self.done;
                                    var $3688 = self.term;
                                    var $3689 = self.type;
                                    var $3690 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3690;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3691 = self.name;
                                    var $3692 = self.dref;
                                    var $3693 = self.verb;
                                    var $3694 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3694;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3695 = self.path;
                                    var $3696 = Fm$Term$equal$patch$($3695, _a$1, Bool$true);
                                    var $3656 = $3696;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3697 = self.natx;
                                    var $3698 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3698;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3699 = self.chrx;
                                    var $3700 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3700;
                                    break;
                                case 'Fm.Term.str':
                                    var $3701 = self.strx;
                                    var $3702 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3702;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3703 = self.path;
                                    var $3704 = self.expr;
                                    var $3705 = self.name;
                                    var $3706 = self.with;
                                    var $3707 = self.cses;
                                    var $3708 = self.moti;
                                    var $3709 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3709;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3710 = self.orig;
                                    var $3711 = self.expr;
                                    var $3712 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3656 = $3712;
                                    break;
                            };
                            var $3488 = $3656;
                            break;
                        case 'Fm.Term.lam':
                            var $3713 = self.name;
                            var $3714 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3716 = self.name;
                                    var $3717 = self.indx;
                                    var $3718 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3718;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3719 = self.name;
                                    var $3720 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3720;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3721 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3721;
                                    break;
                                case 'Fm.Term.all':
                                    var $3722 = self.eras;
                                    var $3723 = self.self;
                                    var $3724 = self.name;
                                    var $3725 = self.xtyp;
                                    var $3726 = self.body;
                                    var $3727 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3727;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3728 = self.name;
                                    var $3729 = self.body;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$18 = $3714(Fm$Term$var$($3713, _lv$4));
                                    var _b1_body$19 = $3729(Fm$Term$var$($3728, _lv$4));
                                    var $3730 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$18, _b1_body$19, _defs$3, Nat$succ$(_lv$4), _seen$17))((_eq_body$20 => {
                                        var $3731 = Monad$pure$(Fm$Check$monad)(_eq_body$20);
                                        return $3731;
                                    }));
                                    var $3715 = $3730;
                                    break;
                                case 'Fm.Term.app':
                                    var $3732 = self.func;
                                    var $3733 = self.argm;
                                    var $3734 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3734;
                                    break;
                                case 'Fm.Term.let':
                                    var $3735 = self.name;
                                    var $3736 = self.expr;
                                    var $3737 = self.body;
                                    var $3738 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3738;
                                    break;
                                case 'Fm.Term.def':
                                    var $3739 = self.name;
                                    var $3740 = self.expr;
                                    var $3741 = self.body;
                                    var $3742 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3742;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3743 = self.done;
                                    var $3744 = self.term;
                                    var $3745 = self.type;
                                    var $3746 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3746;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3747 = self.name;
                                    var $3748 = self.dref;
                                    var $3749 = self.verb;
                                    var $3750 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3750;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3751 = self.path;
                                    var $3752 = Fm$Term$equal$patch$($3751, _a$1, Bool$true);
                                    var $3715 = $3752;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3753 = self.natx;
                                    var $3754 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3754;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3755 = self.chrx;
                                    var $3756 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3756;
                                    break;
                                case 'Fm.Term.str':
                                    var $3757 = self.strx;
                                    var $3758 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3758;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3759 = self.path;
                                    var $3760 = self.expr;
                                    var $3761 = self.name;
                                    var $3762 = self.with;
                                    var $3763 = self.cses;
                                    var $3764 = self.moti;
                                    var $3765 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3765;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3766 = self.orig;
                                    var $3767 = self.expr;
                                    var $3768 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3715 = $3768;
                                    break;
                            };
                            var $3488 = $3715;
                            break;
                        case 'Fm.Term.app':
                            var $3769 = self.func;
                            var $3770 = self.argm;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3772 = self.name;
                                    var $3773 = self.indx;
                                    var $3774 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3774;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3775 = self.name;
                                    var $3776 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3776;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3777 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3777;
                                    break;
                                case 'Fm.Term.all':
                                    var $3778 = self.eras;
                                    var $3779 = self.self;
                                    var $3780 = self.name;
                                    var $3781 = self.xtyp;
                                    var $3782 = self.body;
                                    var $3783 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3783;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3784 = self.name;
                                    var $3785 = self.body;
                                    var $3786 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3786;
                                    break;
                                case 'Fm.Term.app':
                                    var $3787 = self.func;
                                    var $3788 = self.argm;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var $3789 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3769, $3787, _defs$3, _lv$4, _seen$17))((_eq_func$18 => {
                                        var $3790 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3770, $3788, _defs$3, _lv$4, _seen$17))((_eq_argm$19 => {
                                            var $3791 = Monad$pure$(Fm$Check$monad)((_eq_func$18 && _eq_argm$19));
                                            return $3791;
                                        }));
                                        return $3790;
                                    }));
                                    var $3771 = $3789;
                                    break;
                                case 'Fm.Term.let':
                                    var $3792 = self.name;
                                    var $3793 = self.expr;
                                    var $3794 = self.body;
                                    var $3795 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3795;
                                    break;
                                case 'Fm.Term.def':
                                    var $3796 = self.name;
                                    var $3797 = self.expr;
                                    var $3798 = self.body;
                                    var $3799 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3799;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3800 = self.done;
                                    var $3801 = self.term;
                                    var $3802 = self.type;
                                    var $3803 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3803;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3804 = self.name;
                                    var $3805 = self.dref;
                                    var $3806 = self.verb;
                                    var $3807 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3807;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3808 = self.path;
                                    var $3809 = Fm$Term$equal$patch$($3808, _a$1, Bool$true);
                                    var $3771 = $3809;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3810 = self.natx;
                                    var $3811 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3811;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3812 = self.chrx;
                                    var $3813 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3813;
                                    break;
                                case 'Fm.Term.str':
                                    var $3814 = self.strx;
                                    var $3815 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3815;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3816 = self.path;
                                    var $3817 = self.expr;
                                    var $3818 = self.name;
                                    var $3819 = self.with;
                                    var $3820 = self.cses;
                                    var $3821 = self.moti;
                                    var $3822 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3822;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3823 = self.orig;
                                    var $3824 = self.expr;
                                    var $3825 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3771 = $3825;
                                    break;
                            };
                            var $3488 = $3771;
                            break;
                        case 'Fm.Term.let':
                            var $3826 = self.name;
                            var $3827 = self.expr;
                            var $3828 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3830 = self.name;
                                    var $3831 = self.indx;
                                    var $3832 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3832;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3833 = self.name;
                                    var $3834 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3834;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3835 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3835;
                                    break;
                                case 'Fm.Term.all':
                                    var $3836 = self.eras;
                                    var $3837 = self.self;
                                    var $3838 = self.name;
                                    var $3839 = self.xtyp;
                                    var $3840 = self.body;
                                    var $3841 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3841;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3842 = self.name;
                                    var $3843 = self.body;
                                    var $3844 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3844;
                                    break;
                                case 'Fm.Term.app':
                                    var $3845 = self.func;
                                    var $3846 = self.argm;
                                    var $3847 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3847;
                                    break;
                                case 'Fm.Term.let':
                                    var $3848 = self.name;
                                    var $3849 = self.expr;
                                    var $3850 = self.body;
                                    var _seen$19 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$20 = $3828(Fm$Term$var$($3826, _lv$4));
                                    var _b1_body$21 = $3850(Fm$Term$var$($3848, _lv$4));
                                    var $3851 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3827, $3849, _defs$3, _lv$4, _seen$19))((_eq_expr$22 => {
                                        var $3852 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$20, _b1_body$21, _defs$3, Nat$succ$(_lv$4), _seen$19))((_eq_body$23 => {
                                            var $3853 = Monad$pure$(Fm$Check$monad)((_eq_expr$22 && _eq_body$23));
                                            return $3853;
                                        }));
                                        return $3852;
                                    }));
                                    var $3829 = $3851;
                                    break;
                                case 'Fm.Term.def':
                                    var $3854 = self.name;
                                    var $3855 = self.expr;
                                    var $3856 = self.body;
                                    var $3857 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3857;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3858 = self.done;
                                    var $3859 = self.term;
                                    var $3860 = self.type;
                                    var $3861 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3861;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3862 = self.name;
                                    var $3863 = self.dref;
                                    var $3864 = self.verb;
                                    var $3865 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3865;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3866 = self.path;
                                    var $3867 = Fm$Term$equal$patch$($3866, _a$1, Bool$true);
                                    var $3829 = $3867;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3868 = self.natx;
                                    var $3869 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3869;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3870 = self.chrx;
                                    var $3871 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3871;
                                    break;
                                case 'Fm.Term.str':
                                    var $3872 = self.strx;
                                    var $3873 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3873;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3874 = self.path;
                                    var $3875 = self.expr;
                                    var $3876 = self.name;
                                    var $3877 = self.with;
                                    var $3878 = self.cses;
                                    var $3879 = self.moti;
                                    var $3880 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3880;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3881 = self.orig;
                                    var $3882 = self.expr;
                                    var $3883 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3829 = $3883;
                                    break;
                            };
                            var $3488 = $3829;
                            break;
                        case 'Fm.Term.def':
                            var $3884 = self.name;
                            var $3885 = self.expr;
                            var $3886 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3888 = self.name;
                                    var $3889 = self.indx;
                                    var $3890 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3890;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3891 = self.name;
                                    var $3892 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3892;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3893 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3893;
                                    break;
                                case 'Fm.Term.all':
                                    var $3894 = self.eras;
                                    var $3895 = self.self;
                                    var $3896 = self.name;
                                    var $3897 = self.xtyp;
                                    var $3898 = self.body;
                                    var $3899 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3899;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3900 = self.name;
                                    var $3901 = self.body;
                                    var $3902 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3902;
                                    break;
                                case 'Fm.Term.app':
                                    var $3903 = self.func;
                                    var $3904 = self.argm;
                                    var $3905 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3905;
                                    break;
                                case 'Fm.Term.let':
                                    var $3906 = self.name;
                                    var $3907 = self.expr;
                                    var $3908 = self.body;
                                    var $3909 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3909;
                                    break;
                                case 'Fm.Term.def':
                                    var $3910 = self.name;
                                    var $3911 = self.expr;
                                    var $3912 = self.body;
                                    var $3913 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3913;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3914 = self.done;
                                    var $3915 = self.term;
                                    var $3916 = self.type;
                                    var $3917 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3917;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3918 = self.name;
                                    var $3919 = self.dref;
                                    var $3920 = self.verb;
                                    var $3921 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3921;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3922 = self.path;
                                    var $3923 = Fm$Term$equal$patch$($3922, _a$1, Bool$true);
                                    var $3887 = $3923;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3924 = self.natx;
                                    var $3925 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3925;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3926 = self.chrx;
                                    var $3927 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3927;
                                    break;
                                case 'Fm.Term.str':
                                    var $3928 = self.strx;
                                    var $3929 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3929;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3930 = self.path;
                                    var $3931 = self.expr;
                                    var $3932 = self.name;
                                    var $3933 = self.with;
                                    var $3934 = self.cses;
                                    var $3935 = self.moti;
                                    var $3936 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3936;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3937 = self.orig;
                                    var $3938 = self.expr;
                                    var $3939 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3887 = $3939;
                                    break;
                            };
                            var $3488 = $3887;
                            break;
                        case 'Fm.Term.ann':
                            var $3940 = self.done;
                            var $3941 = self.term;
                            var $3942 = self.type;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3944 = self.name;
                                    var $3945 = self.indx;
                                    var $3946 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3946;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3947 = self.name;
                                    var $3948 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3948;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3949 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3949;
                                    break;
                                case 'Fm.Term.all':
                                    var $3950 = self.eras;
                                    var $3951 = self.self;
                                    var $3952 = self.name;
                                    var $3953 = self.xtyp;
                                    var $3954 = self.body;
                                    var $3955 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3955;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3956 = self.name;
                                    var $3957 = self.body;
                                    var $3958 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3958;
                                    break;
                                case 'Fm.Term.app':
                                    var $3959 = self.func;
                                    var $3960 = self.argm;
                                    var $3961 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3961;
                                    break;
                                case 'Fm.Term.let':
                                    var $3962 = self.name;
                                    var $3963 = self.expr;
                                    var $3964 = self.body;
                                    var $3965 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3965;
                                    break;
                                case 'Fm.Term.def':
                                    var $3966 = self.name;
                                    var $3967 = self.expr;
                                    var $3968 = self.body;
                                    var $3969 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3969;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3970 = self.done;
                                    var $3971 = self.term;
                                    var $3972 = self.type;
                                    var $3973 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3973;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3974 = self.name;
                                    var $3975 = self.dref;
                                    var $3976 = self.verb;
                                    var $3977 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3977;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3978 = self.path;
                                    var $3979 = Fm$Term$equal$patch$($3978, _a$1, Bool$true);
                                    var $3943 = $3979;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3980 = self.natx;
                                    var $3981 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3981;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3982 = self.chrx;
                                    var $3983 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3983;
                                    break;
                                case 'Fm.Term.str':
                                    var $3984 = self.strx;
                                    var $3985 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3985;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3986 = self.path;
                                    var $3987 = self.expr;
                                    var $3988 = self.name;
                                    var $3989 = self.with;
                                    var $3990 = self.cses;
                                    var $3991 = self.moti;
                                    var $3992 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3992;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3993 = self.orig;
                                    var $3994 = self.expr;
                                    var $3995 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3943 = $3995;
                                    break;
                            };
                            var $3488 = $3943;
                            break;
                        case 'Fm.Term.gol':
                            var $3996 = self.name;
                            var $3997 = self.dref;
                            var $3998 = self.verb;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4000 = self.name;
                                    var $4001 = self.indx;
                                    var $4002 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4002;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4003 = self.name;
                                    var $4004 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4004;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4005 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4005;
                                    break;
                                case 'Fm.Term.all':
                                    var $4006 = self.eras;
                                    var $4007 = self.self;
                                    var $4008 = self.name;
                                    var $4009 = self.xtyp;
                                    var $4010 = self.body;
                                    var $4011 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4011;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4012 = self.name;
                                    var $4013 = self.body;
                                    var $4014 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4014;
                                    break;
                                case 'Fm.Term.app':
                                    var $4015 = self.func;
                                    var $4016 = self.argm;
                                    var $4017 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4017;
                                    break;
                                case 'Fm.Term.let':
                                    var $4018 = self.name;
                                    var $4019 = self.expr;
                                    var $4020 = self.body;
                                    var $4021 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4021;
                                    break;
                                case 'Fm.Term.def':
                                    var $4022 = self.name;
                                    var $4023 = self.expr;
                                    var $4024 = self.body;
                                    var $4025 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4025;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4026 = self.done;
                                    var $4027 = self.term;
                                    var $4028 = self.type;
                                    var $4029 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4029;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4030 = self.name;
                                    var $4031 = self.dref;
                                    var $4032 = self.verb;
                                    var $4033 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4033;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4034 = self.path;
                                    var $4035 = Fm$Term$equal$patch$($4034, _a$1, Bool$true);
                                    var $3999 = $4035;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4036 = self.natx;
                                    var $4037 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4037;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4038 = self.chrx;
                                    var $4039 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4039;
                                    break;
                                case 'Fm.Term.str':
                                    var $4040 = self.strx;
                                    var $4041 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4041;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4042 = self.path;
                                    var $4043 = self.expr;
                                    var $4044 = self.name;
                                    var $4045 = self.with;
                                    var $4046 = self.cses;
                                    var $4047 = self.moti;
                                    var $4048 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4048;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4049 = self.orig;
                                    var $4050 = self.expr;
                                    var $4051 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3999 = $4051;
                                    break;
                            };
                            var $3488 = $3999;
                            break;
                        case 'Fm.Term.hol':
                            var $4052 = self.path;
                            var $4053 = Fm$Term$equal$patch$($4052, _b$2, Bool$true);
                            var $3488 = $4053;
                            break;
                        case 'Fm.Term.nat':
                            var $4054 = self.natx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4056 = self.name;
                                    var $4057 = self.indx;
                                    var $4058 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4058;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4059 = self.name;
                                    var $4060 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4060;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4061 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4061;
                                    break;
                                case 'Fm.Term.all':
                                    var $4062 = self.eras;
                                    var $4063 = self.self;
                                    var $4064 = self.name;
                                    var $4065 = self.xtyp;
                                    var $4066 = self.body;
                                    var $4067 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4067;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4068 = self.name;
                                    var $4069 = self.body;
                                    var $4070 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4070;
                                    break;
                                case 'Fm.Term.app':
                                    var $4071 = self.func;
                                    var $4072 = self.argm;
                                    var $4073 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4073;
                                    break;
                                case 'Fm.Term.let':
                                    var $4074 = self.name;
                                    var $4075 = self.expr;
                                    var $4076 = self.body;
                                    var $4077 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4077;
                                    break;
                                case 'Fm.Term.def':
                                    var $4078 = self.name;
                                    var $4079 = self.expr;
                                    var $4080 = self.body;
                                    var $4081 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4081;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4082 = self.done;
                                    var $4083 = self.term;
                                    var $4084 = self.type;
                                    var $4085 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4085;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4086 = self.name;
                                    var $4087 = self.dref;
                                    var $4088 = self.verb;
                                    var $4089 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4089;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4090 = self.path;
                                    var $4091 = Fm$Term$equal$patch$($4090, _a$1, Bool$true);
                                    var $4055 = $4091;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4092 = self.natx;
                                    var $4093 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4093;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4094 = self.chrx;
                                    var $4095 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4095;
                                    break;
                                case 'Fm.Term.str':
                                    var $4096 = self.strx;
                                    var $4097 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4097;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4098 = self.path;
                                    var $4099 = self.expr;
                                    var $4100 = self.name;
                                    var $4101 = self.with;
                                    var $4102 = self.cses;
                                    var $4103 = self.moti;
                                    var $4104 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4104;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4105 = self.orig;
                                    var $4106 = self.expr;
                                    var $4107 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4055 = $4107;
                                    break;
                            };
                            var $3488 = $4055;
                            break;
                        case 'Fm.Term.chr':
                            var $4108 = self.chrx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4110 = self.name;
                                    var $4111 = self.indx;
                                    var $4112 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4112;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4113 = self.name;
                                    var $4114 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4114;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4115 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4115;
                                    break;
                                case 'Fm.Term.all':
                                    var $4116 = self.eras;
                                    var $4117 = self.self;
                                    var $4118 = self.name;
                                    var $4119 = self.xtyp;
                                    var $4120 = self.body;
                                    var $4121 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4121;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4122 = self.name;
                                    var $4123 = self.body;
                                    var $4124 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4124;
                                    break;
                                case 'Fm.Term.app':
                                    var $4125 = self.func;
                                    var $4126 = self.argm;
                                    var $4127 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4127;
                                    break;
                                case 'Fm.Term.let':
                                    var $4128 = self.name;
                                    var $4129 = self.expr;
                                    var $4130 = self.body;
                                    var $4131 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4131;
                                    break;
                                case 'Fm.Term.def':
                                    var $4132 = self.name;
                                    var $4133 = self.expr;
                                    var $4134 = self.body;
                                    var $4135 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4135;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4136 = self.done;
                                    var $4137 = self.term;
                                    var $4138 = self.type;
                                    var $4139 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4139;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4140 = self.name;
                                    var $4141 = self.dref;
                                    var $4142 = self.verb;
                                    var $4143 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4143;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4144 = self.path;
                                    var $4145 = Fm$Term$equal$patch$($4144, _a$1, Bool$true);
                                    var $4109 = $4145;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4146 = self.natx;
                                    var $4147 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4147;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4148 = self.chrx;
                                    var $4149 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4149;
                                    break;
                                case 'Fm.Term.str':
                                    var $4150 = self.strx;
                                    var $4151 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4151;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4152 = self.path;
                                    var $4153 = self.expr;
                                    var $4154 = self.name;
                                    var $4155 = self.with;
                                    var $4156 = self.cses;
                                    var $4157 = self.moti;
                                    var $4158 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4158;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4159 = self.orig;
                                    var $4160 = self.expr;
                                    var $4161 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4109 = $4161;
                                    break;
                            };
                            var $3488 = $4109;
                            break;
                        case 'Fm.Term.str':
                            var $4162 = self.strx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4164 = self.name;
                                    var $4165 = self.indx;
                                    var $4166 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4166;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4167 = self.name;
                                    var $4168 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4168;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4169 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4169;
                                    break;
                                case 'Fm.Term.all':
                                    var $4170 = self.eras;
                                    var $4171 = self.self;
                                    var $4172 = self.name;
                                    var $4173 = self.xtyp;
                                    var $4174 = self.body;
                                    var $4175 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4175;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4176 = self.name;
                                    var $4177 = self.body;
                                    var $4178 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4178;
                                    break;
                                case 'Fm.Term.app':
                                    var $4179 = self.func;
                                    var $4180 = self.argm;
                                    var $4181 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4181;
                                    break;
                                case 'Fm.Term.let':
                                    var $4182 = self.name;
                                    var $4183 = self.expr;
                                    var $4184 = self.body;
                                    var $4185 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4185;
                                    break;
                                case 'Fm.Term.def':
                                    var $4186 = self.name;
                                    var $4187 = self.expr;
                                    var $4188 = self.body;
                                    var $4189 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4189;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4190 = self.done;
                                    var $4191 = self.term;
                                    var $4192 = self.type;
                                    var $4193 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4193;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4194 = self.name;
                                    var $4195 = self.dref;
                                    var $4196 = self.verb;
                                    var $4197 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4197;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4198 = self.path;
                                    var $4199 = Fm$Term$equal$patch$($4198, _a$1, Bool$true);
                                    var $4163 = $4199;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4200 = self.natx;
                                    var $4201 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4201;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4202 = self.chrx;
                                    var $4203 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4203;
                                    break;
                                case 'Fm.Term.str':
                                    var $4204 = self.strx;
                                    var $4205 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4205;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4206 = self.path;
                                    var $4207 = self.expr;
                                    var $4208 = self.name;
                                    var $4209 = self.with;
                                    var $4210 = self.cses;
                                    var $4211 = self.moti;
                                    var $4212 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4212;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4213 = self.orig;
                                    var $4214 = self.expr;
                                    var $4215 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4163 = $4215;
                                    break;
                            };
                            var $3488 = $4163;
                            break;
                        case 'Fm.Term.cse':
                            var $4216 = self.path;
                            var $4217 = self.expr;
                            var $4218 = self.name;
                            var $4219 = self.with;
                            var $4220 = self.cses;
                            var $4221 = self.moti;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4223 = self.name;
                                    var $4224 = self.indx;
                                    var $4225 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4225;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4226 = self.name;
                                    var $4227 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4227;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4228 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4228;
                                    break;
                                case 'Fm.Term.all':
                                    var $4229 = self.eras;
                                    var $4230 = self.self;
                                    var $4231 = self.name;
                                    var $4232 = self.xtyp;
                                    var $4233 = self.body;
                                    var $4234 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4234;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4235 = self.name;
                                    var $4236 = self.body;
                                    var $4237 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4237;
                                    break;
                                case 'Fm.Term.app':
                                    var $4238 = self.func;
                                    var $4239 = self.argm;
                                    var $4240 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4240;
                                    break;
                                case 'Fm.Term.let':
                                    var $4241 = self.name;
                                    var $4242 = self.expr;
                                    var $4243 = self.body;
                                    var $4244 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4244;
                                    break;
                                case 'Fm.Term.def':
                                    var $4245 = self.name;
                                    var $4246 = self.expr;
                                    var $4247 = self.body;
                                    var $4248 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4248;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4249 = self.done;
                                    var $4250 = self.term;
                                    var $4251 = self.type;
                                    var $4252 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4252;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4253 = self.name;
                                    var $4254 = self.dref;
                                    var $4255 = self.verb;
                                    var $4256 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4256;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4257 = self.path;
                                    var $4258 = Fm$Term$equal$patch$($4257, _a$1, Bool$true);
                                    var $4222 = $4258;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4259 = self.natx;
                                    var $4260 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4260;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4261 = self.chrx;
                                    var $4262 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4262;
                                    break;
                                case 'Fm.Term.str':
                                    var $4263 = self.strx;
                                    var $4264 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4264;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4265 = self.path;
                                    var $4266 = self.expr;
                                    var $4267 = self.name;
                                    var $4268 = self.with;
                                    var $4269 = self.cses;
                                    var $4270 = self.moti;
                                    var $4271 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4271;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4272 = self.orig;
                                    var $4273 = self.expr;
                                    var $4274 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4222 = $4274;
                                    break;
                            };
                            var $3488 = $4222;
                            break;
                        case 'Fm.Term.ori':
                            var $4275 = self.orig;
                            var $4276 = self.expr;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4278 = self.name;
                                    var $4279 = self.indx;
                                    var $4280 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4280;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4281 = self.name;
                                    var $4282 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4282;
                                    break;
                                case 'Fm.Term.typ':
                                    var $4283 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4283;
                                    break;
                                case 'Fm.Term.all':
                                    var $4284 = self.eras;
                                    var $4285 = self.self;
                                    var $4286 = self.name;
                                    var $4287 = self.xtyp;
                                    var $4288 = self.body;
                                    var $4289 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4289;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4290 = self.name;
                                    var $4291 = self.body;
                                    var $4292 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4292;
                                    break;
                                case 'Fm.Term.app':
                                    var $4293 = self.func;
                                    var $4294 = self.argm;
                                    var $4295 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4295;
                                    break;
                                case 'Fm.Term.let':
                                    var $4296 = self.name;
                                    var $4297 = self.expr;
                                    var $4298 = self.body;
                                    var $4299 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4299;
                                    break;
                                case 'Fm.Term.def':
                                    var $4300 = self.name;
                                    var $4301 = self.expr;
                                    var $4302 = self.body;
                                    var $4303 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4303;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4304 = self.done;
                                    var $4305 = self.term;
                                    var $4306 = self.type;
                                    var $4307 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4307;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4308 = self.name;
                                    var $4309 = self.dref;
                                    var $4310 = self.verb;
                                    var $4311 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4311;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4312 = self.path;
                                    var $4313 = Fm$Term$equal$patch$($4312, _a$1, Bool$true);
                                    var $4277 = $4313;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4314 = self.natx;
                                    var $4315 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4315;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4316 = self.chrx;
                                    var $4317 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4317;
                                    break;
                                case 'Fm.Term.str':
                                    var $4318 = self.strx;
                                    var $4319 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4319;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4320 = self.path;
                                    var $4321 = self.expr;
                                    var $4322 = self.name;
                                    var $4323 = self.with;
                                    var $4324 = self.cses;
                                    var $4325 = self.moti;
                                    var $4326 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4326;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4327 = self.orig;
                                    var $4328 = self.expr;
                                    var $4329 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $4277 = $4329;
                                    break;
                            };
                            var $3488 = $4277;
                            break;
                    };
                    var $3485 = $3488;
                };
                var $3483 = $3485;
            };
            var $3481 = $3483;
        };
        return $3481;
    };
    const Fm$Term$equal = x0 => x1 => x2 => x3 => x4 => Fm$Term$equal$(x0, x1, x2, x3, x4);
    const Set$new = Map$new;

    function Fm$Term$check$(_term$1, _type$2, _defs$3, _ctx$4, _path$5, _orig$6) {
        var $4330 = Monad$bind$(Fm$Check$monad)((() => {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $4331 = self.name;
                    var $4332 = self.indx;
                    var self = List$at_last$($4332, _ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4334 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $4331), List$nil));
                            var $4333 = $4334;
                            break;
                        case 'Maybe.some':
                            var $4335 = self.value;
                            var $4336 = Monad$pure$(Fm$Check$monad)((() => {
                                var self = $4335;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $4337 = self.fst;
                                        var $4338 = self.snd;
                                        var $4339 = $4338;
                                        return $4339;
                                };
                            })());
                            var $4333 = $4336;
                            break;
                    };
                    return $4333;
                case 'Fm.Term.ref':
                    var $4340 = self.name;
                    var self = Fm$get$($4340, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4342 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $4340), List$nil));
                            var $4341 = $4342;
                            break;
                        case 'Maybe.some':
                            var $4343 = self.value;
                            var self = $4343;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4345 = self.file;
                                    var $4346 = self.code;
                                    var $4347 = self.name;
                                    var $4348 = self.term;
                                    var $4349 = self.type;
                                    var $4350 = self.stat;
                                    var _ref_name$15 = $4347;
                                    var _ref_type$16 = $4349;
                                    var _ref_term$17 = $4348;
                                    var _ref_stat$18 = $4350;
                                    var self = _ref_stat$18;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            var $4352 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$waiting$(_ref_name$15), List$nil));
                                            var $4351 = $4352;
                                            break;
                                        case 'Fm.Status.wait':
                                            var $4353 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $4351 = $4353;
                                            break;
                                        case 'Fm.Status.done':
                                            var $4354 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $4351 = $4354;
                                            break;
                                        case 'Fm.Status.fail':
                                            var $4355 = self.errors;
                                            var $4356 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$indirect$(_ref_name$15), List$nil));
                                            var $4351 = $4356;
                                            break;
                                    };
                                    var $4344 = $4351;
                                    break;
                            };
                            var $4341 = $4344;
                            break;
                    };
                    return $4341;
                case 'Fm.Term.typ':
                    var $4357 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                    return $4357;
                case 'Fm.Term.all':
                    var $4358 = self.eras;
                    var $4359 = self.self;
                    var $4360 = self.name;
                    var $4361 = self.xtyp;
                    var $4362 = self.body;
                    var _ctx_size$12 = List$length$(_ctx$4);
                    var _self_var$13 = Fm$Term$var$($4359, _ctx_size$12);
                    var _body_var$14 = Fm$Term$var$($4360, Nat$succ$(_ctx_size$12));
                    var _body_ctx$15 = List$cons$(Pair$new$($4360, $4361), List$cons$(Pair$new$($4359, _term$1), _ctx$4));
                    var $4363 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4361, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$16 => {
                        var $4364 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4362(_self_var$13)(_body_var$14), Maybe$some$(Fm$Term$typ), _defs$3, _body_ctx$15, Fm$MPath$i$(_path$5), _orig$6))((_$17 => {
                            var $4365 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                            return $4365;
                        }));
                        return $4364;
                    }));
                    return $4363;
                case 'Fm.Term.lam':
                    var $4366 = self.name;
                    var $4367 = self.body;
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            var $4369 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                            var $4368 = $4369;
                            break;
                        case 'Maybe.some':
                            var $4370 = self.value;
                            var _typv$10 = Fm$Term$reduce$($4370, _defs$3);
                            var self = _typv$10;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $4372 = self.name;
                                    var $4373 = self.indx;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($4370);
                                    var $4374 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4371 = $4374;
                                    break;
                                case 'Fm.Term.ref':
                                    var $4375 = self.name;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($4370);
                                    var $4376 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4371 = $4376;
                                    break;
                                case 'Fm.Term.typ':
                                    var _expected$11 = Either$left$("Function");
                                    var _detected$12 = Either$right$($4370);
                                    var $4377 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                    var $4371 = $4377;
                                    break;
                                case 'Fm.Term.all':
                                    var $4378 = self.eras;
                                    var $4379 = self.self;
                                    var $4380 = self.name;
                                    var $4381 = self.xtyp;
                                    var $4382 = self.body;
                                    var _ctx_size$16 = List$length$(_ctx$4);
                                    var _self_var$17 = _term$1;
                                    var _body_var$18 = Fm$Term$var$($4366, _ctx_size$16);
                                    var _body_typ$19 = $4382(_self_var$17)(_body_var$18);
                                    var _body_ctx$20 = List$cons$(Pair$new$($4366, $4381), _ctx$4);
                                    var $4383 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4367(_body_var$18), Maybe$some$(_body_typ$19), _defs$3, _body_ctx$20, Fm$MPath$o$(_path$5), _orig$6))((_$21 => {
                                        var $4384 = Monad$pure$(Fm$Check$monad)($4370);
                                        return $4384;
                                    }));
                                    var $4371 = $4383;
                                    break;
                                case 'Fm.Term.lam':
                                    var $4385 = self.name;
                                    var $4386 = self.body;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($4370);
                                    var $4387 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4371 = $4387;
                                    break;
                                case 'Fm.Term.app':
                                    var $4388 = self.func;
                                    var $4389 = self.argm;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($4370);
                                    var $4390 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4371 = $4390;
                                    break;
                                case 'Fm.Term.let':
                                    var $4391 = self.name;
                                    var $4392 = self.expr;
                                    var $4393 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($4370);
                                    var $4394 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4371 = $4394;
                                    break;
                                case 'Fm.Term.def':
                                    var $4395 = self.name;
                                    var $4396 = self.expr;
                                    var $4397 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($4370);
                                    var $4398 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4371 = $4398;
                                    break;
                                case 'Fm.Term.ann':
                                    var $4399 = self.done;
                                    var $4400 = self.term;
                                    var $4401 = self.type;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($4370);
                                    var $4402 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4371 = $4402;
                                    break;
                                case 'Fm.Term.gol':
                                    var $4403 = self.name;
                                    var $4404 = self.dref;
                                    var $4405 = self.verb;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($4370);
                                    var $4406 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $4371 = $4406;
                                    break;
                                case 'Fm.Term.hol':
                                    var $4407 = self.path;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($4370);
                                    var $4408 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4371 = $4408;
                                    break;
                                case 'Fm.Term.nat':
                                    var $4409 = self.natx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($4370);
                                    var $4410 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4371 = $4410;
                                    break;
                                case 'Fm.Term.chr':
                                    var $4411 = self.chrx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($4370);
                                    var $4412 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4371 = $4412;
                                    break;
                                case 'Fm.Term.str':
                                    var $4413 = self.strx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($4370);
                                    var $4414 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $4371 = $4414;
                                    break;
                                case 'Fm.Term.cse':
                                    var $4415 = self.path;
                                    var $4416 = self.expr;
                                    var $4417 = self.name;
                                    var $4418 = self.with;
                                    var $4419 = self.cses;
                                    var $4420 = self.moti;
                                    var _expected$17 = Either$left$("Function");
                                    var _detected$18 = Either$right$($4370);
                                    var $4421 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                    var $4371 = $4421;
                                    break;
                                case 'Fm.Term.ori':
                                    var $4422 = self.orig;
                                    var $4423 = self.expr;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($4370);
                                    var $4424 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $4371 = $4424;
                                    break;
                            };
                            var $4368 = $4371;
                            break;
                    };
                    return $4368;
                case 'Fm.Term.app':
                    var $4425 = self.func;
                    var $4426 = self.argm;
                    var $4427 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4425, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_func_typ$9 => {
                        var _func_typ$10 = Fm$Term$reduce$(_func_typ$9, _defs$3);
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $4429 = self.name;
                                var $4430 = self.indx;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4431 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4428 = $4431;
                                break;
                            case 'Fm.Term.ref':
                                var $4432 = self.name;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4433 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4428 = $4433;
                                break;
                            case 'Fm.Term.typ':
                                var _expected$11 = Either$left$("Function");
                                var _detected$12 = Either$right$(_func_typ$10);
                                var $4434 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                var $4428 = $4434;
                                break;
                            case 'Fm.Term.all':
                                var $4435 = self.eras;
                                var $4436 = self.self;
                                var $4437 = self.name;
                                var $4438 = self.xtyp;
                                var $4439 = self.body;
                                var $4440 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4426, Maybe$some$($4438), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$16 => {
                                    var $4441 = Monad$pure$(Fm$Check$monad)($4439($4425)($4426));
                                    return $4441;
                                }));
                                var $4428 = $4440;
                                break;
                            case 'Fm.Term.lam':
                                var $4442 = self.name;
                                var $4443 = self.body;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4444 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4428 = $4444;
                                break;
                            case 'Fm.Term.app':
                                var $4445 = self.func;
                                var $4446 = self.argm;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4447 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4428 = $4447;
                                break;
                            case 'Fm.Term.let':
                                var $4448 = self.name;
                                var $4449 = self.expr;
                                var $4450 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4451 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4428 = $4451;
                                break;
                            case 'Fm.Term.def':
                                var $4452 = self.name;
                                var $4453 = self.expr;
                                var $4454 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4455 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4428 = $4455;
                                break;
                            case 'Fm.Term.ann':
                                var $4456 = self.done;
                                var $4457 = self.term;
                                var $4458 = self.type;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4459 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4428 = $4459;
                                break;
                            case 'Fm.Term.gol':
                                var $4460 = self.name;
                                var $4461 = self.dref;
                                var $4462 = self.verb;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $4463 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $4428 = $4463;
                                break;
                            case 'Fm.Term.hol':
                                var $4464 = self.path;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4465 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4428 = $4465;
                                break;
                            case 'Fm.Term.nat':
                                var $4466 = self.natx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4467 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4428 = $4467;
                                break;
                            case 'Fm.Term.chr':
                                var $4468 = self.chrx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4469 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4428 = $4469;
                                break;
                            case 'Fm.Term.str':
                                var $4470 = self.strx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $4471 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $4428 = $4471;
                                break;
                            case 'Fm.Term.cse':
                                var $4472 = self.path;
                                var $4473 = self.expr;
                                var $4474 = self.name;
                                var $4475 = self.with;
                                var $4476 = self.cses;
                                var $4477 = self.moti;
                                var _expected$17 = Either$left$("Function");
                                var _detected$18 = Either$right$(_func_typ$10);
                                var $4478 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                var $4428 = $4478;
                                break;
                            case 'Fm.Term.ori':
                                var $4479 = self.orig;
                                var $4480 = self.expr;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $4481 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $4428 = $4481;
                                break;
                        };
                        return $4428;
                    }));
                    return $4427;
                case 'Fm.Term.let':
                    var $4482 = self.name;
                    var $4483 = self.expr;
                    var $4484 = self.body;
                    var _ctx_size$10 = List$length$(_ctx$4);
                    var $4485 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4483, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_expr_typ$11 => {
                        var _body_val$12 = $4484(Fm$Term$var$($4482, _ctx_size$10));
                        var _body_ctx$13 = List$cons$(Pair$new$($4482, _expr_typ$11), _ctx$4);
                        var $4486 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_body_val$12, _type$2, _defs$3, _body_ctx$13, Fm$MPath$i$(_path$5), _orig$6))((_body_typ$14 => {
                            var $4487 = Monad$pure$(Fm$Check$monad)(_body_typ$14);
                            return $4487;
                        }));
                        return $4486;
                    }));
                    return $4485;
                case 'Fm.Term.def':
                    var $4488 = self.name;
                    var $4489 = self.expr;
                    var $4490 = self.body;
                    var $4491 = Fm$Term$check$($4490($4489), _type$2, _defs$3, _ctx$4, _path$5, _orig$6);
                    return $4491;
                case 'Fm.Term.ann':
                    var $4492 = self.done;
                    var $4493 = self.term;
                    var $4494 = self.type;
                    var self = $4492;
                    if (self) {
                        var $4496 = Monad$pure$(Fm$Check$monad)($4494);
                        var $4495 = $4496;
                    } else {
                        var $4497 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4493, Maybe$some$($4494), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$10 => {
                            var $4498 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($4494, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$11 => {
                                var $4499 = Monad$pure$(Fm$Check$monad)($4494);
                                return $4499;
                            }));
                            return $4498;
                        }));
                        var $4495 = $4497;
                    };
                    return $4495;
                case 'Fm.Term.gol':
                    var $4500 = self.name;
                    var $4501 = self.dref;
                    var $4502 = self.verb;
                    var $4503 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$show_goal$($4500, $4501, $4502, _type$2, _ctx$4), List$nil));
                    return $4503;
                case 'Fm.Term.hol':
                    var $4504 = self.path;
                    var $4505 = Fm$Check$result$(_type$2, List$nil);
                    return $4505;
                case 'Fm.Term.nat':
                    var $4506 = self.natx;
                    var $4507 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Nat"));
                    return $4507;
                case 'Fm.Term.chr':
                    var $4508 = self.chrx;
                    var $4509 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Char"));
                    return $4509;
                case 'Fm.Term.str':
                    var $4510 = self.strx;
                    var $4511 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("String"));
                    return $4511;
                case 'Fm.Term.cse':
                    var $4512 = self.path;
                    var $4513 = self.expr;
                    var $4514 = self.name;
                    var $4515 = self.with;
                    var $4516 = self.cses;
                    var $4517 = self.moti;
                    var _expr$13 = $4513;
                    var $4518 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_expr$13, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_etyp$14 => {
                        var self = $4517;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = _type$2;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4521 = Fm$Term$hol$(Bits$e);
                                        var _moti$15 = $4521;
                                        break;
                                    case 'Maybe.some':
                                        var $4522 = self.value;
                                        var _size$16 = List$length$(_ctx$4);
                                        var _moti$17 = Fm$SmartMotive$make$($4514, $4513, _etyp$14, $4522, _size$16, _defs$3);
                                        var $4523 = _moti$17;
                                        var _moti$15 = $4523;
                                        break;
                                };
                                var $4520 = Maybe$some$(Fm$Term$cse$($4512, $4513, $4514, $4515, $4516, Maybe$some$(_moti$15)));
                                var _dsug$15 = $4520;
                                break;
                            case 'Maybe.some':
                                var $4524 = self.value;
                                var $4525 = Fm$Term$desugar_cse$($4513, $4514, $4515, $4516, $4524, _etyp$14, _defs$3, _ctx$4);
                                var _dsug$15 = $4525;
                                break;
                        };
                        var self = _dsug$15;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4526 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                                var $4519 = $4526;
                                break;
                            case 'Maybe.some':
                                var $4527 = self.value;
                                var $4528 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$patch$(Fm$MPath$to_bits$(_path$5), $4527), List$nil));
                                var $4519 = $4528;
                                break;
                        };
                        return $4519;
                    }));
                    return $4518;
                case 'Fm.Term.ori':
                    var $4529 = self.orig;
                    var $4530 = self.expr;
                    var $4531 = Fm$Term$check$($4530, _type$2, _defs$3, _ctx$4, _path$5, Maybe$some$($4529));
                    return $4531;
            };
        })())((_infr$7 => {
            var self = _type$2;
            switch (self._) {
                case 'Maybe.none':
                    var $4533 = Fm$Check$result$(Maybe$some$(_infr$7), List$nil);
                    var $4532 = $4533;
                    break;
                case 'Maybe.some':
                    var $4534 = self.value;
                    var $4535 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($4534, _infr$7, _defs$3, List$length$(_ctx$4), Set$new))((_eqls$9 => {
                        var self = _eqls$9;
                        if (self) {
                            var $4537 = Monad$pure$(Fm$Check$monad)($4534);
                            var $4536 = $4537;
                        } else {
                            var $4538 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, Either$right$($4534), Either$right$(_infr$7), _ctx$4), List$nil));
                            var $4536 = $4538;
                        };
                        return $4536;
                    }));
                    var $4532 = $4535;
                    break;
            };
            return $4532;
        }));
        return $4330;
    };
    const Fm$Term$check = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$check$(x0, x1, x2, x3, x4, x5);

    function Fm$Path$nil$(_x$1) {
        var $4539 = _x$1;
        return $4539;
    };
    const Fm$Path$nil = x0 => Fm$Path$nil$(x0);
    const Fm$MPath$nil = Maybe$some$(Fm$Path$nil);

    function List$is_empty$(_list$2) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $4541 = Bool$true;
                var $4540 = $4541;
                break;
            case 'List.cons':
                var $4542 = self.head;
                var $4543 = self.tail;
                var $4544 = Bool$false;
                var $4540 = $4544;
                break;
        };
        return $4540;
    };
    const List$is_empty = x0 => List$is_empty$(x0);

    function Fm$Term$patch_at$(_path$1, _term$2, _fn$3) {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $4546 = self.name;
                var $4547 = self.indx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4549 = _fn$3(_term$2);
                        var $4548 = $4549;
                        break;
                    case 'o':
                        var $4550 = self.slice(0, -1);
                        var $4551 = _term$2;
                        var $4548 = $4551;
                        break;
                    case 'i':
                        var $4552 = self.slice(0, -1);
                        var $4553 = _term$2;
                        var $4548 = $4553;
                        break;
                };
                var $4545 = $4548;
                break;
            case 'Fm.Term.ref':
                var $4554 = self.name;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4556 = _fn$3(_term$2);
                        var $4555 = $4556;
                        break;
                    case 'o':
                        var $4557 = self.slice(0, -1);
                        var $4558 = _term$2;
                        var $4555 = $4558;
                        break;
                    case 'i':
                        var $4559 = self.slice(0, -1);
                        var $4560 = _term$2;
                        var $4555 = $4560;
                        break;
                };
                var $4545 = $4555;
                break;
            case 'Fm.Term.typ':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4562 = _fn$3(_term$2);
                        var $4561 = $4562;
                        break;
                    case 'o':
                        var $4563 = self.slice(0, -1);
                        var $4564 = _term$2;
                        var $4561 = $4564;
                        break;
                    case 'i':
                        var $4565 = self.slice(0, -1);
                        var $4566 = _term$2;
                        var $4561 = $4566;
                        break;
                };
                var $4545 = $4561;
                break;
            case 'Fm.Term.all':
                var $4567 = self.eras;
                var $4568 = self.self;
                var $4569 = self.name;
                var $4570 = self.xtyp;
                var $4571 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4573 = _fn$3(_term$2);
                        var $4572 = $4573;
                        break;
                    case 'o':
                        var $4574 = self.slice(0, -1);
                        var $4575 = Fm$Term$all$($4567, $4568, $4569, Fm$Term$patch_at$($4574, $4570, _fn$3), $4571);
                        var $4572 = $4575;
                        break;
                    case 'i':
                        var $4576 = self.slice(0, -1);
                        var $4577 = Fm$Term$all$($4567, $4568, $4569, $4570, (_s$10 => _x$11 => {
                            var $4578 = Fm$Term$patch_at$($4576, $4571(_s$10)(_x$11), _fn$3);
                            return $4578;
                        }));
                        var $4572 = $4577;
                        break;
                };
                var $4545 = $4572;
                break;
            case 'Fm.Term.lam':
                var $4579 = self.name;
                var $4580 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4582 = _fn$3(_term$2);
                        var $4581 = $4582;
                        break;
                    case 'o':
                        var $4583 = self.slice(0, -1);
                        var $4584 = Fm$Term$lam$($4579, (_x$7 => {
                            var $4585 = Fm$Term$patch_at$(Bits$tail$(_path$1), $4580(_x$7), _fn$3);
                            return $4585;
                        }));
                        var $4581 = $4584;
                        break;
                    case 'i':
                        var $4586 = self.slice(0, -1);
                        var $4587 = Fm$Term$lam$($4579, (_x$7 => {
                            var $4588 = Fm$Term$patch_at$(Bits$tail$(_path$1), $4580(_x$7), _fn$3);
                            return $4588;
                        }));
                        var $4581 = $4587;
                        break;
                };
                var $4545 = $4581;
                break;
            case 'Fm.Term.app':
                var $4589 = self.func;
                var $4590 = self.argm;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4592 = _fn$3(_term$2);
                        var $4591 = $4592;
                        break;
                    case 'o':
                        var $4593 = self.slice(0, -1);
                        var $4594 = Fm$Term$app$(Fm$Term$patch_at$($4593, $4589, _fn$3), $4590);
                        var $4591 = $4594;
                        break;
                    case 'i':
                        var $4595 = self.slice(0, -1);
                        var $4596 = Fm$Term$app$($4589, Fm$Term$patch_at$($4595, $4590, _fn$3));
                        var $4591 = $4596;
                        break;
                };
                var $4545 = $4591;
                break;
            case 'Fm.Term.let':
                var $4597 = self.name;
                var $4598 = self.expr;
                var $4599 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4601 = _fn$3(_term$2);
                        var $4600 = $4601;
                        break;
                    case 'o':
                        var $4602 = self.slice(0, -1);
                        var $4603 = Fm$Term$let$($4597, Fm$Term$patch_at$($4602, $4598, _fn$3), $4599);
                        var $4600 = $4603;
                        break;
                    case 'i':
                        var $4604 = self.slice(0, -1);
                        var $4605 = Fm$Term$let$($4597, $4598, (_x$8 => {
                            var $4606 = Fm$Term$patch_at$($4604, $4599(_x$8), _fn$3);
                            return $4606;
                        }));
                        var $4600 = $4605;
                        break;
                };
                var $4545 = $4600;
                break;
            case 'Fm.Term.def':
                var $4607 = self.name;
                var $4608 = self.expr;
                var $4609 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4611 = _fn$3(_term$2);
                        var $4610 = $4611;
                        break;
                    case 'o':
                        var $4612 = self.slice(0, -1);
                        var $4613 = Fm$Term$def$($4607, Fm$Term$patch_at$($4612, $4608, _fn$3), $4609);
                        var $4610 = $4613;
                        break;
                    case 'i':
                        var $4614 = self.slice(0, -1);
                        var $4615 = Fm$Term$def$($4607, $4608, (_x$8 => {
                            var $4616 = Fm$Term$patch_at$($4614, $4609(_x$8), _fn$3);
                            return $4616;
                        }));
                        var $4610 = $4615;
                        break;
                };
                var $4545 = $4610;
                break;
            case 'Fm.Term.ann':
                var $4617 = self.done;
                var $4618 = self.term;
                var $4619 = self.type;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4621 = _fn$3(_term$2);
                        var $4620 = $4621;
                        break;
                    case 'o':
                        var $4622 = self.slice(0, -1);
                        var $4623 = Fm$Term$ann$($4617, Fm$Term$patch_at$(_path$1, $4618, _fn$3), $4619);
                        var $4620 = $4623;
                        break;
                    case 'i':
                        var $4624 = self.slice(0, -1);
                        var $4625 = Fm$Term$ann$($4617, Fm$Term$patch_at$(_path$1, $4618, _fn$3), $4619);
                        var $4620 = $4625;
                        break;
                };
                var $4545 = $4620;
                break;
            case 'Fm.Term.gol':
                var $4626 = self.name;
                var $4627 = self.dref;
                var $4628 = self.verb;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4630 = _fn$3(_term$2);
                        var $4629 = $4630;
                        break;
                    case 'o':
                        var $4631 = self.slice(0, -1);
                        var $4632 = _term$2;
                        var $4629 = $4632;
                        break;
                    case 'i':
                        var $4633 = self.slice(0, -1);
                        var $4634 = _term$2;
                        var $4629 = $4634;
                        break;
                };
                var $4545 = $4629;
                break;
            case 'Fm.Term.hol':
                var $4635 = self.path;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4637 = _fn$3(_term$2);
                        var $4636 = $4637;
                        break;
                    case 'o':
                        var $4638 = self.slice(0, -1);
                        var $4639 = _term$2;
                        var $4636 = $4639;
                        break;
                    case 'i':
                        var $4640 = self.slice(0, -1);
                        var $4641 = _term$2;
                        var $4636 = $4641;
                        break;
                };
                var $4545 = $4636;
                break;
            case 'Fm.Term.nat':
                var $4642 = self.natx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4644 = _fn$3(_term$2);
                        var $4643 = $4644;
                        break;
                    case 'o':
                        var $4645 = self.slice(0, -1);
                        var $4646 = _term$2;
                        var $4643 = $4646;
                        break;
                    case 'i':
                        var $4647 = self.slice(0, -1);
                        var $4648 = _term$2;
                        var $4643 = $4648;
                        break;
                };
                var $4545 = $4643;
                break;
            case 'Fm.Term.chr':
                var $4649 = self.chrx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4651 = _fn$3(_term$2);
                        var $4650 = $4651;
                        break;
                    case 'o':
                        var $4652 = self.slice(0, -1);
                        var $4653 = _term$2;
                        var $4650 = $4653;
                        break;
                    case 'i':
                        var $4654 = self.slice(0, -1);
                        var $4655 = _term$2;
                        var $4650 = $4655;
                        break;
                };
                var $4545 = $4650;
                break;
            case 'Fm.Term.str':
                var $4656 = self.strx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4658 = _fn$3(_term$2);
                        var $4657 = $4658;
                        break;
                    case 'o':
                        var $4659 = self.slice(0, -1);
                        var $4660 = _term$2;
                        var $4657 = $4660;
                        break;
                    case 'i':
                        var $4661 = self.slice(0, -1);
                        var $4662 = _term$2;
                        var $4657 = $4662;
                        break;
                };
                var $4545 = $4657;
                break;
            case 'Fm.Term.cse':
                var $4663 = self.path;
                var $4664 = self.expr;
                var $4665 = self.name;
                var $4666 = self.with;
                var $4667 = self.cses;
                var $4668 = self.moti;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $4670 = _fn$3(_term$2);
                        var $4669 = $4670;
                        break;
                    case 'o':
                        var $4671 = self.slice(0, -1);
                        var $4672 = _term$2;
                        var $4669 = $4672;
                        break;
                    case 'i':
                        var $4673 = self.slice(0, -1);
                        var $4674 = _term$2;
                        var $4669 = $4674;
                        break;
                };
                var $4545 = $4669;
                break;
            case 'Fm.Term.ori':
                var $4675 = self.orig;
                var $4676 = self.expr;
                var $4677 = Fm$Term$patch_at$(_path$1, $4676, _fn$3);
                var $4545 = $4677;
                break;
        };
        return $4545;
    };
    const Fm$Term$patch_at = x0 => x1 => x2 => Fm$Term$patch_at$(x0, x1, x2);

    function Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, _errs$7, _fixd$8) {
        var self = _errs$7;
        switch (self._) {
            case 'List.nil':
                var self = _fixd$8;
                if (self) {
                    var _type$9 = Fm$Term$bind$(List$nil, (_x$9 => {
                        var $4681 = (_x$9 + '1');
                        return $4681;
                    }), _type$5);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $4682 = (_x$10 + '0');
                        return $4682;
                    }), _term$4);
                    var _defs$11 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$10, _type$9, Fm$Status$init), _defs$6);
                    var $4680 = Monad$pure$(IO$monad)(Maybe$some$(_defs$11));
                    var $4679 = $4680;
                } else {
                    var $4683 = Monad$pure$(IO$monad)(Maybe$none);
                    var $4679 = $4683;
                };
                var $4678 = $4679;
                break;
            case 'List.cons':
                var $4684 = self.head;
                var $4685 = self.tail;
                var self = $4684;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4687 = self.origin;
                        var $4688 = self.expected;
                        var $4689 = self.detected;
                        var $4690 = self.context;
                        var $4691 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4685, _fixd$8);
                        var $4686 = $4691;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4692 = self.name;
                        var $4693 = self.dref;
                        var $4694 = self.verb;
                        var $4695 = self.goal;
                        var $4696 = self.context;
                        var $4697 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4685, _fixd$8);
                        var $4686 = $4697;
                        break;
                    case 'Fm.Error.waiting':
                        var $4698 = self.name;
                        var $4699 = Monad$bind$(IO$monad)(Fm$Synth$one$($4698, _defs$6))((_defs$12 => {
                            var $4700 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$12, $4685, Bool$true);
                            return $4700;
                        }));
                        var $4686 = $4699;
                        break;
                    case 'Fm.Error.indirect':
                        var $4701 = self.name;
                        var $4702 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4685, _fixd$8);
                        var $4686 = $4702;
                        break;
                    case 'Fm.Error.patch':
                        var $4703 = self.path;
                        var $4704 = self.term;
                        var self = $4703;
                        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                            case 'e':
                                var $4706 = Monad$pure$(IO$monad)(Maybe$none);
                                var $4705 = $4706;
                                break;
                            case 'o':
                                var $4707 = self.slice(0, -1);
                                var _term$14 = Fm$Term$patch_at$($4707, _term$4, (_x$14 => {
                                    var $4709 = $4704;
                                    return $4709;
                                }));
                                var $4708 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$14, _type$5, _defs$6, $4685, Bool$true);
                                var $4705 = $4708;
                                break;
                            case 'i':
                                var $4710 = self.slice(0, -1);
                                var _type$14 = Fm$Term$patch_at$($4710, _type$5, (_x$14 => {
                                    var $4712 = $4704;
                                    return $4712;
                                }));
                                var $4711 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$14, _defs$6, $4685, Bool$true);
                                var $4705 = $4711;
                                break;
                        };
                        var $4686 = $4705;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4713 = self.origin;
                        var $4714 = self.name;
                        var $4715 = Monad$bind$(IO$monad)(Fm$Synth$one$($4714, _defs$6))((_defs$13 => {
                            var $4716 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$13, $4685, Bool$true);
                            return $4716;
                        }));
                        var $4686 = $4715;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4717 = self.origin;
                        var $4718 = self.term;
                        var $4719 = self.context;
                        var $4720 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $4685, _fixd$8);
                        var $4686 = $4720;
                        break;
                };
                var $4678 = $4686;
                break;
        };
        return $4678;
    };
    const Fm$Synth$fix = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Synth$fix$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Status$fail$(_errors$1) {
        var $4721 = ({
            _: 'Fm.Status.fail',
            'errors': _errors$1
        });
        return $4721;
    };
    const Fm$Status$fail = x0 => Fm$Status$fail$(x0);

    function Fm$Synth$one$(_name$1, _defs$2) {
        var self = Fm$get$(_name$1, _defs$2);
        switch (self._) {
            case 'Maybe.none':
                var $4723 = Monad$bind$(IO$monad)(Fm$Synth$load$(_name$1, _defs$2))((_loaded$3 => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.none':
                            var $4725 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("Undefined: ", List$cons$(_name$1, List$nil)))))((_$4 => {
                                var $4726 = Monad$pure$(IO$monad)(_defs$2);
                                return $4726;
                            }));
                            var $4724 = $4725;
                            break;
                        case 'Maybe.some':
                            var $4727 = self.value;
                            var $4728 = Fm$Synth$one$(_name$1, $4727);
                            var $4724 = $4728;
                            break;
                    };
                    return $4724;
                }));
                var $4722 = $4723;
                break;
            case 'Maybe.some':
                var $4729 = self.value;
                var self = $4729;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $4731 = self.file;
                        var $4732 = self.code;
                        var $4733 = self.name;
                        var $4734 = self.term;
                        var $4735 = self.type;
                        var $4736 = self.stat;
                        var _file$10 = $4731;
                        var _code$11 = $4732;
                        var _name$12 = $4733;
                        var _term$13 = $4734;
                        var _type$14 = $4735;
                        var _stat$15 = $4736;
                        var self = _stat$15;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var _defs$16 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, Fm$Status$wait), _defs$2);
                                var _checked$17 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_type$14, Maybe$some$(Fm$Term$typ), _defs$16, List$nil, Fm$MPath$i$(Fm$MPath$nil), Maybe$none))((_chk_type$17 => {
                                    var $4739 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_term$13, Maybe$some$(_type$14), _defs$16, List$nil, Fm$MPath$o$(Fm$MPath$nil), Maybe$none))((_chk_term$18 => {
                                        var $4740 = Monad$pure$(Fm$Check$monad)(Unit$new);
                                        return $4740;
                                    }));
                                    return $4739;
                                }));
                                var self = _checked$17;
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $4741 = self.value;
                                        var $4742 = self.errors;
                                        var self = List$is_empty$($4742);
                                        if (self) {
                                            var _defs$20 = Fm$define$(_file$10, _code$11, _name$12, _term$13, _type$14, Bool$true, _defs$16);
                                            var $4744 = Monad$pure$(IO$monad)(_defs$20);
                                            var $4743 = $4744;
                                        } else {
                                            var $4745 = Monad$bind$(IO$monad)(Fm$Synth$fix$(_file$10, _code$11, _name$12, _term$13, _type$14, _defs$16, $4742, Bool$false))((_fixed$20 => {
                                                var self = _fixed$20;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        var _stat$21 = Fm$Status$fail$($4742);
                                                        var _defs$22 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, _stat$21), _defs$16);
                                                        var $4747 = Monad$pure$(IO$monad)(_defs$22);
                                                        var $4746 = $4747;
                                                        break;
                                                    case 'Maybe.some':
                                                        var $4748 = self.value;
                                                        var $4749 = Fm$Synth$one$(_name$12, $4748);
                                                        var $4746 = $4749;
                                                        break;
                                                };
                                                return $4746;
                                            }));
                                            var $4743 = $4745;
                                        };
                                        var $4738 = $4743;
                                        break;
                                };
                                var $4737 = $4738;
                                break;
                            case 'Fm.Status.wait':
                                var $4750 = Monad$pure$(IO$monad)(_defs$2);
                                var $4737 = $4750;
                                break;
                            case 'Fm.Status.done':
                                var $4751 = Monad$pure$(IO$monad)(_defs$2);
                                var $4737 = $4751;
                                break;
                            case 'Fm.Status.fail':
                                var $4752 = self.errors;
                                var $4753 = Monad$pure$(IO$monad)(_defs$2);
                                var $4737 = $4753;
                                break;
                        };
                        var $4730 = $4737;
                        break;
                };
                var $4722 = $4730;
                break;
        };
        return $4722;
    };
    const Fm$Synth$one = x0 => x1 => Fm$Synth$one$(x0, x1);

    function Map$values$go$(_xs$2, _list$3) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $4755 = _list$3;
                var $4754 = $4755;
                break;
            case 'Map.tie':
                var $4756 = self.val;
                var $4757 = self.lft;
                var $4758 = self.rgt;
                var self = $4756;
                switch (self._) {
                    case 'Maybe.none':
                        var $4760 = _list$3;
                        var _list0$7 = $4760;
                        break;
                    case 'Maybe.some':
                        var $4761 = self.value;
                        var $4762 = List$cons$($4761, _list$3);
                        var _list0$7 = $4762;
                        break;
                };
                var _list1$8 = Map$values$go$($4757, _list0$7);
                var _list2$9 = Map$values$go$($4758, _list1$8);
                var $4759 = _list2$9;
                var $4754 = $4759;
                break;
        };
        return $4754;
    };
    const Map$values$go = x0 => x1 => Map$values$go$(x0, x1);

    function Map$values$(_xs$2) {
        var $4763 = Map$values$go$(_xs$2, List$nil);
        return $4763;
    };
    const Map$values = x0 => Map$values$(x0);

    function Fm$Name$show$(_name$1) {
        var $4764 = _name$1;
        return $4764;
    };
    const Fm$Name$show = x0 => Fm$Name$show$(x0);

    function Bits$to_nat$(_b$1) {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $4766 = 0n;
                var $4765 = $4766;
                break;
            case 'o':
                var $4767 = self.slice(0, -1);
                var $4768 = (2n * Bits$to_nat$($4767));
                var $4765 = $4768;
                break;
            case 'i':
                var $4769 = self.slice(0, -1);
                var $4770 = Nat$succ$((2n * Bits$to_nat$($4769)));
                var $4765 = $4770;
                break;
        };
        return $4765;
    };
    const Bits$to_nat = x0 => Bits$to_nat$(x0);

    function U16$show_hex$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $4772 = u16_to_word(self);
                var $4773 = Nat$to_string_base$(16n, Bits$to_nat$(Word$to_bits$($4772)));
                var $4771 = $4773;
                break;
        };
        return $4771;
    };
    const U16$show_hex = x0 => U16$show_hex$(x0);

    function Fm$escape$char$(_chr$1) {
        var self = (_chr$1 === Fm$backslash);
        if (self) {
            var $4775 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
            var $4774 = $4775;
        } else {
            var self = (_chr$1 === 34);
            if (self) {
                var $4777 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                var $4776 = $4777;
            } else {
                var self = (_chr$1 === 39);
                if (self) {
                    var $4779 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                    var $4778 = $4779;
                } else {
                    var self = U16$btw$(32, _chr$1, 126);
                    if (self) {
                        var $4781 = String$cons$(_chr$1, String$nil);
                        var $4780 = $4781;
                    } else {
                        var $4782 = String$flatten$(List$cons$(String$cons$(Fm$backslash, String$nil), List$cons$("u{", List$cons$(U16$show_hex$(_chr$1), List$cons$("}", List$cons$(String$nil, List$nil))))));
                        var $4780 = $4782;
                    };
                    var $4778 = $4780;
                };
                var $4776 = $4778;
            };
            var $4774 = $4776;
        };
        return $4774;
    };
    const Fm$escape$char = x0 => Fm$escape$char$(x0);

    function Fm$escape$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $4784 = String$nil;
            var $4783 = $4784;
        } else {
            var $4785 = self.charCodeAt(0);
            var $4786 = self.slice(1);
            var _head$4 = Fm$escape$char$($4785);
            var _tail$5 = Fm$escape$($4786);
            var $4787 = (_head$4 + _tail$5);
            var $4783 = $4787;
        };
        return $4783;
    };
    const Fm$escape = x0 => Fm$escape$(x0);

    function Fm$Term$core$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4789 = self.name;
                var $4790 = self.indx;
                var $4791 = Fm$Name$show$($4789);
                var $4788 = $4791;
                break;
            case 'Fm.Term.ref':
                var $4792 = self.name;
                var $4793 = Fm$Name$show$($4792);
                var $4788 = $4793;
                break;
            case 'Fm.Term.typ':
                var $4794 = "*";
                var $4788 = $4794;
                break;
            case 'Fm.Term.all':
                var $4795 = self.eras;
                var $4796 = self.self;
                var $4797 = self.name;
                var $4798 = self.xtyp;
                var $4799 = self.body;
                var _eras$7 = $4795;
                var self = _eras$7;
                if (self) {
                    var $4801 = "%";
                    var _init$8 = $4801;
                } else {
                    var $4802 = "@";
                    var _init$8 = $4802;
                };
                var _self$9 = Fm$Name$show$($4796);
                var _name$10 = Fm$Name$show$($4797);
                var _xtyp$11 = Fm$Term$core$($4798);
                var _body$12 = Fm$Term$core$($4799(Fm$Term$var$($4796, 0n))(Fm$Term$var$($4797, 0n)));
                var $4800 = String$flatten$(List$cons$(_init$8, List$cons$(_self$9, List$cons$("(", List$cons$(_name$10, List$cons$(":", List$cons$(_xtyp$11, List$cons$(") ", List$cons$(_body$12, List$nil)))))))));
                var $4788 = $4800;
                break;
            case 'Fm.Term.lam':
                var $4803 = self.name;
                var $4804 = self.body;
                var _name$4 = Fm$Name$show$($4803);
                var _body$5 = Fm$Term$core$($4804(Fm$Term$var$($4803, 0n)));
                var $4805 = String$flatten$(List$cons$("#", List$cons$(_name$4, List$cons$(" ", List$cons$(_body$5, List$nil)))));
                var $4788 = $4805;
                break;
            case 'Fm.Term.app':
                var $4806 = self.func;
                var $4807 = self.argm;
                var _func$4 = Fm$Term$core$($4806);
                var _argm$5 = Fm$Term$core$($4807);
                var $4808 = String$flatten$(List$cons$("(", List$cons$(_func$4, List$cons$(" ", List$cons$(_argm$5, List$cons$(")", List$nil))))));
                var $4788 = $4808;
                break;
            case 'Fm.Term.let':
                var $4809 = self.name;
                var $4810 = self.expr;
                var $4811 = self.body;
                var _name$5 = Fm$Name$show$($4809);
                var _expr$6 = Fm$Term$core$($4810);
                var _body$7 = Fm$Term$core$($4811(Fm$Term$var$($4809, 0n)));
                var $4812 = String$flatten$(List$cons$("!", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $4788 = $4812;
                break;
            case 'Fm.Term.def':
                var $4813 = self.name;
                var $4814 = self.expr;
                var $4815 = self.body;
                var _name$5 = Fm$Name$show$($4813);
                var _expr$6 = Fm$Term$core$($4814);
                var _body$7 = Fm$Term$core$($4815(Fm$Term$var$($4813, 0n)));
                var $4816 = String$flatten$(List$cons$("$", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $4788 = $4816;
                break;
            case 'Fm.Term.ann':
                var $4817 = self.done;
                var $4818 = self.term;
                var $4819 = self.type;
                var _term$5 = Fm$Term$core$($4818);
                var _type$6 = Fm$Term$core$($4819);
                var $4820 = String$flatten$(List$cons$("{", List$cons$(_term$5, List$cons$(":", List$cons$(_type$6, List$cons$("}", List$nil))))));
                var $4788 = $4820;
                break;
            case 'Fm.Term.gol':
                var $4821 = self.name;
                var $4822 = self.dref;
                var $4823 = self.verb;
                var $4824 = "<GOL>";
                var $4788 = $4824;
                break;
            case 'Fm.Term.hol':
                var $4825 = self.path;
                var $4826 = "<HOL>";
                var $4788 = $4826;
                break;
            case 'Fm.Term.nat':
                var $4827 = self.natx;
                var $4828 = String$flatten$(List$cons$("+", List$cons$(Nat$show$($4827), List$nil)));
                var $4788 = $4828;
                break;
            case 'Fm.Term.chr':
                var $4829 = self.chrx;
                var $4830 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($4829), List$cons$("\'", List$nil))));
                var $4788 = $4830;
                break;
            case 'Fm.Term.str':
                var $4831 = self.strx;
                var $4832 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($4831), List$cons$("\"", List$nil))));
                var $4788 = $4832;
                break;
            case 'Fm.Term.cse':
                var $4833 = self.path;
                var $4834 = self.expr;
                var $4835 = self.name;
                var $4836 = self.with;
                var $4837 = self.cses;
                var $4838 = self.moti;
                var $4839 = "<CSE>";
                var $4788 = $4839;
                break;
            case 'Fm.Term.ori':
                var $4840 = self.orig;
                var $4841 = self.expr;
                var $4842 = Fm$Term$core$($4841);
                var $4788 = $4842;
                break;
        };
        return $4788;
    };
    const Fm$Term$core = x0 => Fm$Term$core$(x0);

    function Fm$Defs$core$(_defs$1) {
        var _result$2 = "";
        var _result$3 = (() => {
            var $4845 = _result$2;
            var $4846 = Map$values$(_defs$1);
            let _result$4 = $4845;
            let _defn$3;
            while ($4846._ === 'List.cons') {
                _defn$3 = $4846.head;
                var self = _defn$3;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $4847 = self.file;
                        var $4848 = self.code;
                        var $4849 = self.name;
                        var $4850 = self.term;
                        var $4851 = self.type;
                        var $4852 = self.stat;
                        var self = $4852;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var $4854 = _result$4;
                                var $4853 = $4854;
                                break;
                            case 'Fm.Status.wait':
                                var $4855 = _result$4;
                                var $4853 = $4855;
                                break;
                            case 'Fm.Status.done':
                                var _name$11 = $4849;
                                var _term$12 = Fm$Term$core$($4850);
                                var _type$13 = Fm$Term$core$($4851);
                                var $4856 = String$flatten$(List$cons$(_result$4, List$cons$(_name$11, List$cons$(" : ", List$cons$(_type$13, List$cons$(" = ", List$cons$(_term$12, List$cons$(";\u{a}", List$nil))))))));
                                var $4853 = $4856;
                                break;
                            case 'Fm.Status.fail':
                                var $4857 = self.errors;
                                var $4858 = _result$4;
                                var $4853 = $4858;
                                break;
                        };
                        var $4845 = $4853;
                        break;
                };
                _result$4 = $4845;
                $4846 = $4846.tail;
            }
            return _result$4;
        })();
        var $4843 = _result$3;
        return $4843;
    };
    const Fm$Defs$core = x0 => Fm$Defs$core$(x0);

    function Fm$to_core$io$one$(_name$1) {
        var $4859 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $4860 = Monad$pure$(IO$monad)(Fm$Defs$core$(_defs$2));
            return $4860;
        }));
        return $4859;
    };
    const Fm$to_core$io$one = x0 => Fm$to_core$io$one$(x0);

    function Maybe$bind$(_m$3, _f$4) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $4862 = Maybe$none;
                var $4861 = $4862;
                break;
            case 'Maybe.some':
                var $4863 = self.value;
                var $4864 = _f$4($4863);
                var $4861 = $4864;
                break;
        };
        return $4861;
    };
    const Maybe$bind = x0 => x1 => Maybe$bind$(x0, x1);
    const Maybe$monad = Monad$new$(Maybe$bind, Maybe$some);

    function Fm$Term$show$as_nat$go$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4866 = self.name;
                var $4867 = self.indx;
                var $4868 = Maybe$none;
                var $4865 = $4868;
                break;
            case 'Fm.Term.ref':
                var $4869 = self.name;
                var self = ($4869 === "Nat.zero");
                if (self) {
                    var $4871 = Maybe$some$(0n);
                    var $4870 = $4871;
                } else {
                    var $4872 = Maybe$none;
                    var $4870 = $4872;
                };
                var $4865 = $4870;
                break;
            case 'Fm.Term.typ':
                var $4873 = Maybe$none;
                var $4865 = $4873;
                break;
            case 'Fm.Term.all':
                var $4874 = self.eras;
                var $4875 = self.self;
                var $4876 = self.name;
                var $4877 = self.xtyp;
                var $4878 = self.body;
                var $4879 = Maybe$none;
                var $4865 = $4879;
                break;
            case 'Fm.Term.lam':
                var $4880 = self.name;
                var $4881 = self.body;
                var $4882 = Maybe$none;
                var $4865 = $4882;
                break;
            case 'Fm.Term.app':
                var $4883 = self.func;
                var $4884 = self.argm;
                var self = $4883;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $4886 = self.name;
                        var $4887 = self.indx;
                        var $4888 = Maybe$none;
                        var $4885 = $4888;
                        break;
                    case 'Fm.Term.ref':
                        var $4889 = self.name;
                        var self = ($4889 === "Nat.succ");
                        if (self) {
                            var $4891 = Monad$bind$(Maybe$monad)(Fm$Term$show$as_nat$go$($4884))((_pred$5 => {
                                var $4892 = Monad$pure$(Maybe$monad)(Nat$succ$(_pred$5));
                                return $4892;
                            }));
                            var $4890 = $4891;
                        } else {
                            var $4893 = Maybe$none;
                            var $4890 = $4893;
                        };
                        var $4885 = $4890;
                        break;
                    case 'Fm.Term.typ':
                        var $4894 = Maybe$none;
                        var $4885 = $4894;
                        break;
                    case 'Fm.Term.all':
                        var $4895 = self.eras;
                        var $4896 = self.self;
                        var $4897 = self.name;
                        var $4898 = self.xtyp;
                        var $4899 = self.body;
                        var $4900 = Maybe$none;
                        var $4885 = $4900;
                        break;
                    case 'Fm.Term.lam':
                        var $4901 = self.name;
                        var $4902 = self.body;
                        var $4903 = Maybe$none;
                        var $4885 = $4903;
                        break;
                    case 'Fm.Term.app':
                        var $4904 = self.func;
                        var $4905 = self.argm;
                        var $4906 = Maybe$none;
                        var $4885 = $4906;
                        break;
                    case 'Fm.Term.let':
                        var $4907 = self.name;
                        var $4908 = self.expr;
                        var $4909 = self.body;
                        var $4910 = Maybe$none;
                        var $4885 = $4910;
                        break;
                    case 'Fm.Term.def':
                        var $4911 = self.name;
                        var $4912 = self.expr;
                        var $4913 = self.body;
                        var $4914 = Maybe$none;
                        var $4885 = $4914;
                        break;
                    case 'Fm.Term.ann':
                        var $4915 = self.done;
                        var $4916 = self.term;
                        var $4917 = self.type;
                        var $4918 = Maybe$none;
                        var $4885 = $4918;
                        break;
                    case 'Fm.Term.gol':
                        var $4919 = self.name;
                        var $4920 = self.dref;
                        var $4921 = self.verb;
                        var $4922 = Maybe$none;
                        var $4885 = $4922;
                        break;
                    case 'Fm.Term.hol':
                        var $4923 = self.path;
                        var $4924 = Maybe$none;
                        var $4885 = $4924;
                        break;
                    case 'Fm.Term.nat':
                        var $4925 = self.natx;
                        var $4926 = Maybe$none;
                        var $4885 = $4926;
                        break;
                    case 'Fm.Term.chr':
                        var $4927 = self.chrx;
                        var $4928 = Maybe$none;
                        var $4885 = $4928;
                        break;
                    case 'Fm.Term.str':
                        var $4929 = self.strx;
                        var $4930 = Maybe$none;
                        var $4885 = $4930;
                        break;
                    case 'Fm.Term.cse':
                        var $4931 = self.path;
                        var $4932 = self.expr;
                        var $4933 = self.name;
                        var $4934 = self.with;
                        var $4935 = self.cses;
                        var $4936 = self.moti;
                        var $4937 = Maybe$none;
                        var $4885 = $4937;
                        break;
                    case 'Fm.Term.ori':
                        var $4938 = self.orig;
                        var $4939 = self.expr;
                        var $4940 = Maybe$none;
                        var $4885 = $4940;
                        break;
                };
                var $4865 = $4885;
                break;
            case 'Fm.Term.let':
                var $4941 = self.name;
                var $4942 = self.expr;
                var $4943 = self.body;
                var $4944 = Maybe$none;
                var $4865 = $4944;
                break;
            case 'Fm.Term.def':
                var $4945 = self.name;
                var $4946 = self.expr;
                var $4947 = self.body;
                var $4948 = Maybe$none;
                var $4865 = $4948;
                break;
            case 'Fm.Term.ann':
                var $4949 = self.done;
                var $4950 = self.term;
                var $4951 = self.type;
                var $4952 = Maybe$none;
                var $4865 = $4952;
                break;
            case 'Fm.Term.gol':
                var $4953 = self.name;
                var $4954 = self.dref;
                var $4955 = self.verb;
                var $4956 = Maybe$none;
                var $4865 = $4956;
                break;
            case 'Fm.Term.hol':
                var $4957 = self.path;
                var $4958 = Maybe$none;
                var $4865 = $4958;
                break;
            case 'Fm.Term.nat':
                var $4959 = self.natx;
                var $4960 = Maybe$none;
                var $4865 = $4960;
                break;
            case 'Fm.Term.chr':
                var $4961 = self.chrx;
                var $4962 = Maybe$none;
                var $4865 = $4962;
                break;
            case 'Fm.Term.str':
                var $4963 = self.strx;
                var $4964 = Maybe$none;
                var $4865 = $4964;
                break;
            case 'Fm.Term.cse':
                var $4965 = self.path;
                var $4966 = self.expr;
                var $4967 = self.name;
                var $4968 = self.with;
                var $4969 = self.cses;
                var $4970 = self.moti;
                var $4971 = Maybe$none;
                var $4865 = $4971;
                break;
            case 'Fm.Term.ori':
                var $4972 = self.orig;
                var $4973 = self.expr;
                var $4974 = Maybe$none;
                var $4865 = $4974;
                break;
        };
        return $4865;
    };
    const Fm$Term$show$as_nat$go = x0 => Fm$Term$show$as_nat$go$(x0);

    function Fm$Term$show$as_nat$(_term$1) {
        var $4975 = Maybe$mapped$(Fm$Term$show$as_nat$go$(_term$1), Nat$show);
        return $4975;
    };
    const Fm$Term$show$as_nat = x0 => Fm$Term$show$as_nat$(x0);

    function Fm$Term$show$is_ref$(_term$1, _name$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4977 = self.name;
                var $4978 = self.indx;
                var $4979 = Bool$false;
                var $4976 = $4979;
                break;
            case 'Fm.Term.ref':
                var $4980 = self.name;
                var $4981 = (_name$2 === $4980);
                var $4976 = $4981;
                break;
            case 'Fm.Term.typ':
                var $4982 = Bool$false;
                var $4976 = $4982;
                break;
            case 'Fm.Term.all':
                var $4983 = self.eras;
                var $4984 = self.self;
                var $4985 = self.name;
                var $4986 = self.xtyp;
                var $4987 = self.body;
                var $4988 = Bool$false;
                var $4976 = $4988;
                break;
            case 'Fm.Term.lam':
                var $4989 = self.name;
                var $4990 = self.body;
                var $4991 = Bool$false;
                var $4976 = $4991;
                break;
            case 'Fm.Term.app':
                var $4992 = self.func;
                var $4993 = self.argm;
                var $4994 = Bool$false;
                var $4976 = $4994;
                break;
            case 'Fm.Term.let':
                var $4995 = self.name;
                var $4996 = self.expr;
                var $4997 = self.body;
                var $4998 = Bool$false;
                var $4976 = $4998;
                break;
            case 'Fm.Term.def':
                var $4999 = self.name;
                var $5000 = self.expr;
                var $5001 = self.body;
                var $5002 = Bool$false;
                var $4976 = $5002;
                break;
            case 'Fm.Term.ann':
                var $5003 = self.done;
                var $5004 = self.term;
                var $5005 = self.type;
                var $5006 = Bool$false;
                var $4976 = $5006;
                break;
            case 'Fm.Term.gol':
                var $5007 = self.name;
                var $5008 = self.dref;
                var $5009 = self.verb;
                var $5010 = Bool$false;
                var $4976 = $5010;
                break;
            case 'Fm.Term.hol':
                var $5011 = self.path;
                var $5012 = Bool$false;
                var $4976 = $5012;
                break;
            case 'Fm.Term.nat':
                var $5013 = self.natx;
                var $5014 = Bool$false;
                var $4976 = $5014;
                break;
            case 'Fm.Term.chr':
                var $5015 = self.chrx;
                var $5016 = Bool$false;
                var $4976 = $5016;
                break;
            case 'Fm.Term.str':
                var $5017 = self.strx;
                var $5018 = Bool$false;
                var $4976 = $5018;
                break;
            case 'Fm.Term.cse':
                var $5019 = self.path;
                var $5020 = self.expr;
                var $5021 = self.name;
                var $5022 = self.with;
                var $5023 = self.cses;
                var $5024 = self.moti;
                var $5025 = Bool$false;
                var $4976 = $5025;
                break;
            case 'Fm.Term.ori':
                var $5026 = self.orig;
                var $5027 = self.expr;
                var $5028 = Bool$false;
                var $4976 = $5028;
                break;
        };
        return $4976;
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
                        var $5029 = self.name;
                        var $5030 = self.indx;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5032 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5031 = $5032;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5034 = Bool$false;
                                var _wrap$8 = $5034;
                            } else {
                                var $5035 = self.charCodeAt(0);
                                var $5036 = self.slice(1);
                                var $5037 = ($5035 === 40);
                                var _wrap$8 = $5037;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5038 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5038;
                            } else {
                                var $5039 = _func$7;
                                var _func$10 = $5039;
                            };
                            var $5033 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5031 = $5033;
                        };
                        return $5031;
                    case 'Fm.Term.ref':
                        var $5040 = self.name;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5042 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5041 = $5042;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5044 = Bool$false;
                                var _wrap$7 = $5044;
                            } else {
                                var $5045 = self.charCodeAt(0);
                                var $5046 = self.slice(1);
                                var $5047 = ($5045 === 40);
                                var _wrap$7 = $5047;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5048 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5048;
                            } else {
                                var $5049 = _func$6;
                                var _func$9 = $5049;
                            };
                            var $5043 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5041 = $5043;
                        };
                        return $5041;
                    case 'Fm.Term.typ':
                        var _arity$4 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$4 === 3n));
                        if (self) {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$6 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$7 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5051 = String$flatten$(List$cons$(_eq_lft$6, List$cons$(" == ", List$cons$(_eq_rgt$7, List$nil))));
                            var $5050 = $5051;
                        } else {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$5;
                            if (self.length === 0) {
                                var $5053 = Bool$false;
                                var _wrap$6 = $5053;
                            } else {
                                var $5054 = self.charCodeAt(0);
                                var $5055 = self.slice(1);
                                var $5056 = ($5054 === 40);
                                var _wrap$6 = $5056;
                            };
                            var _args$7 = String$join$(",", _args$3);
                            var self = _wrap$6;
                            if (self) {
                                var $5057 = String$flatten$(List$cons$("(", List$cons$(_func$5, List$cons$(")", List$nil))));
                                var _func$8 = $5057;
                            } else {
                                var $5058 = _func$5;
                                var _func$8 = $5058;
                            };
                            var $5052 = String$flatten$(List$cons$(_func$8, List$cons$("(", List$cons$(_args$7, List$cons$(")", List$nil)))));
                            var $5050 = $5052;
                        };
                        return $5050;
                    case 'Fm.Term.all':
                        var $5059 = self.eras;
                        var $5060 = self.self;
                        var $5061 = self.name;
                        var $5062 = self.xtyp;
                        var $5063 = self.body;
                        var _arity$9 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$9 === 3n));
                        if (self) {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$11 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$12 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5065 = String$flatten$(List$cons$(_eq_lft$11, List$cons$(" == ", List$cons$(_eq_rgt$12, List$nil))));
                            var $5064 = $5065;
                        } else {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$10;
                            if (self.length === 0) {
                                var $5067 = Bool$false;
                                var _wrap$11 = $5067;
                            } else {
                                var $5068 = self.charCodeAt(0);
                                var $5069 = self.slice(1);
                                var $5070 = ($5068 === 40);
                                var _wrap$11 = $5070;
                            };
                            var _args$12 = String$join$(",", _args$3);
                            var self = _wrap$11;
                            if (self) {
                                var $5071 = String$flatten$(List$cons$("(", List$cons$(_func$10, List$cons$(")", List$nil))));
                                var _func$13 = $5071;
                            } else {
                                var $5072 = _func$10;
                                var _func$13 = $5072;
                            };
                            var $5066 = String$flatten$(List$cons$(_func$13, List$cons$("(", List$cons$(_args$12, List$cons$(")", List$nil)))));
                            var $5064 = $5066;
                        };
                        return $5064;
                    case 'Fm.Term.lam':
                        var $5073 = self.name;
                        var $5074 = self.body;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5076 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5075 = $5076;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5078 = Bool$false;
                                var _wrap$8 = $5078;
                            } else {
                                var $5079 = self.charCodeAt(0);
                                var $5080 = self.slice(1);
                                var $5081 = ($5079 === 40);
                                var _wrap$8 = $5081;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5082 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5082;
                            } else {
                                var $5083 = _func$7;
                                var _func$10 = $5083;
                            };
                            var $5077 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5075 = $5077;
                        };
                        return $5075;
                    case 'Fm.Term.app':
                        var $5084 = self.func;
                        var $5085 = self.argm;
                        var _argm$6 = Fm$Term$show$go$($5085, Fm$MPath$i$(_path$2));
                        var $5086 = Fm$Term$show$app$($5084, Fm$MPath$o$(_path$2), List$cons$(_argm$6, _args$3));
                        return $5086;
                    case 'Fm.Term.let':
                        var $5087 = self.name;
                        var $5088 = self.expr;
                        var $5089 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5091 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5090 = $5091;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5093 = Bool$false;
                                var _wrap$9 = $5093;
                            } else {
                                var $5094 = self.charCodeAt(0);
                                var $5095 = self.slice(1);
                                var $5096 = ($5094 === 40);
                                var _wrap$9 = $5096;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5097 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5097;
                            } else {
                                var $5098 = _func$8;
                                var _func$11 = $5098;
                            };
                            var $5092 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5090 = $5092;
                        };
                        return $5090;
                    case 'Fm.Term.def':
                        var $5099 = self.name;
                        var $5100 = self.expr;
                        var $5101 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5103 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5102 = $5103;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5105 = Bool$false;
                                var _wrap$9 = $5105;
                            } else {
                                var $5106 = self.charCodeAt(0);
                                var $5107 = self.slice(1);
                                var $5108 = ($5106 === 40);
                                var _wrap$9 = $5108;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5109 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5109;
                            } else {
                                var $5110 = _func$8;
                                var _func$11 = $5110;
                            };
                            var $5104 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5102 = $5104;
                        };
                        return $5102;
                    case 'Fm.Term.ann':
                        var $5111 = self.done;
                        var $5112 = self.term;
                        var $5113 = self.type;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5115 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5114 = $5115;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5117 = Bool$false;
                                var _wrap$9 = $5117;
                            } else {
                                var $5118 = self.charCodeAt(0);
                                var $5119 = self.slice(1);
                                var $5120 = ($5118 === 40);
                                var _wrap$9 = $5120;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5121 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5121;
                            } else {
                                var $5122 = _func$8;
                                var _func$11 = $5122;
                            };
                            var $5116 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5114 = $5116;
                        };
                        return $5114;
                    case 'Fm.Term.gol':
                        var $5123 = self.name;
                        var $5124 = self.dref;
                        var $5125 = self.verb;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5127 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $5126 = $5127;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $5129 = Bool$false;
                                var _wrap$9 = $5129;
                            } else {
                                var $5130 = self.charCodeAt(0);
                                var $5131 = self.slice(1);
                                var $5132 = ($5130 === 40);
                                var _wrap$9 = $5132;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $5133 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $5133;
                            } else {
                                var $5134 = _func$8;
                                var _func$11 = $5134;
                            };
                            var $5128 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $5126 = $5128;
                        };
                        return $5126;
                    case 'Fm.Term.hol':
                        var $5135 = self.path;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5137 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5136 = $5137;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5139 = Bool$false;
                                var _wrap$7 = $5139;
                            } else {
                                var $5140 = self.charCodeAt(0);
                                var $5141 = self.slice(1);
                                var $5142 = ($5140 === 40);
                                var _wrap$7 = $5142;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5143 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5143;
                            } else {
                                var $5144 = _func$6;
                                var _func$9 = $5144;
                            };
                            var $5138 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5136 = $5138;
                        };
                        return $5136;
                    case 'Fm.Term.nat':
                        var $5145 = self.natx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5147 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5146 = $5147;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5149 = Bool$false;
                                var _wrap$7 = $5149;
                            } else {
                                var $5150 = self.charCodeAt(0);
                                var $5151 = self.slice(1);
                                var $5152 = ($5150 === 40);
                                var _wrap$7 = $5152;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5153 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5153;
                            } else {
                                var $5154 = _func$6;
                                var _func$9 = $5154;
                            };
                            var $5148 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5146 = $5148;
                        };
                        return $5146;
                    case 'Fm.Term.chr':
                        var $5155 = self.chrx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5157 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5156 = $5157;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5159 = Bool$false;
                                var _wrap$7 = $5159;
                            } else {
                                var $5160 = self.charCodeAt(0);
                                var $5161 = self.slice(1);
                                var $5162 = ($5160 === 40);
                                var _wrap$7 = $5162;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5163 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5163;
                            } else {
                                var $5164 = _func$6;
                                var _func$9 = $5164;
                            };
                            var $5158 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5156 = $5158;
                        };
                        return $5156;
                    case 'Fm.Term.str':
                        var $5165 = self.strx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5167 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $5166 = $5167;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $5169 = Bool$false;
                                var _wrap$7 = $5169;
                            } else {
                                var $5170 = self.charCodeAt(0);
                                var $5171 = self.slice(1);
                                var $5172 = ($5170 === 40);
                                var _wrap$7 = $5172;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $5173 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $5173;
                            } else {
                                var $5174 = _func$6;
                                var _func$9 = $5174;
                            };
                            var $5168 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $5166 = $5168;
                        };
                        return $5166;
                    case 'Fm.Term.cse':
                        var $5175 = self.path;
                        var $5176 = self.expr;
                        var $5177 = self.name;
                        var $5178 = self.with;
                        var $5179 = self.cses;
                        var $5180 = self.moti;
                        var _arity$10 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$10 === 3n));
                        if (self) {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$12 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$13 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5182 = String$flatten$(List$cons$(_eq_lft$12, List$cons$(" == ", List$cons$(_eq_rgt$13, List$nil))));
                            var $5181 = $5182;
                        } else {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$11;
                            if (self.length === 0) {
                                var $5184 = Bool$false;
                                var _wrap$12 = $5184;
                            } else {
                                var $5185 = self.charCodeAt(0);
                                var $5186 = self.slice(1);
                                var $5187 = ($5185 === 40);
                                var _wrap$12 = $5187;
                            };
                            var _args$13 = String$join$(",", _args$3);
                            var self = _wrap$12;
                            if (self) {
                                var $5188 = String$flatten$(List$cons$("(", List$cons$(_func$11, List$cons$(")", List$nil))));
                                var _func$14 = $5188;
                            } else {
                                var $5189 = _func$11;
                                var _func$14 = $5189;
                            };
                            var $5183 = String$flatten$(List$cons$(_func$14, List$cons$("(", List$cons$(_args$13, List$cons$(")", List$nil)))));
                            var $5181 = $5183;
                        };
                        return $5181;
                    case 'Fm.Term.ori':
                        var $5190 = self.orig;
                        var $5191 = self.expr;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $5193 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $5192 = $5193;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $5195 = Bool$false;
                                var _wrap$8 = $5195;
                            } else {
                                var $5196 = self.charCodeAt(0);
                                var $5197 = self.slice(1);
                                var $5198 = ($5196 === 40);
                                var _wrap$8 = $5198;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $5199 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $5199;
                            } else {
                                var $5200 = _func$7;
                                var _func$10 = $5200;
                            };
                            var $5194 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $5192 = $5194;
                        };
                        return $5192;
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
                var $5202 = _list$4;
                var $5201 = $5202;
                break;
            case 'Map.tie':
                var $5203 = self.val;
                var $5204 = self.lft;
                var $5205 = self.rgt;
                var self = $5203;
                switch (self._) {
                    case 'Maybe.none':
                        var $5207 = _list$4;
                        var _list0$8 = $5207;
                        break;
                    case 'Maybe.some':
                        var $5208 = self.value;
                        var $5209 = List$cons$(Pair$new$(Bits$reverse$(_key$3), $5208), _list$4);
                        var _list0$8 = $5209;
                        break;
                };
                var _list1$9 = Map$to_list$go$($5204, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$to_list$go$($5205, (_key$3 + '1'), _list1$9);
                var $5206 = _list2$10;
                var $5201 = $5206;
                break;
        };
        return $5201;
    };
    const Map$to_list$go = x0 => x1 => x2 => Map$to_list$go$(x0, x1, x2);

    function Map$to_list$(_xs$2) {
        var $5210 = List$reverse$(Map$to_list$go$(_xs$2, Bits$e, List$nil));
        return $5210;
    };
    const Map$to_list = x0 => Map$to_list$(x0);

    function Bits$chunks_of$go$(_len$1, _bits$2, _need$3, _chunk$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $5212 = List$cons$(Bits$reverse$(_chunk$4), List$nil);
                var $5211 = $5212;
                break;
            case 'o':
                var $5213 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5215 = List$cons$(_head$6, _tail$7);
                    var $5214 = $5215;
                } else {
                    var $5216 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '0');
                    var $5217 = Bits$chunks_of$go$(_len$1, $5213, $5216, _chunk$7);
                    var $5214 = $5217;
                };
                var $5211 = $5214;
                break;
            case 'i':
                var $5218 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5220 = List$cons$(_head$6, _tail$7);
                    var $5219 = $5220;
                } else {
                    var $5221 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '1');
                    var $5222 = Bits$chunks_of$go$(_len$1, $5218, $5221, _chunk$7);
                    var $5219 = $5222;
                };
                var $5211 = $5219;
                break;
        };
        return $5211;
    };
    const Bits$chunks_of$go = x0 => x1 => x2 => x3 => Bits$chunks_of$go$(x0, x1, x2, x3);

    function Bits$chunks_of$(_len$1, _bits$2) {
        var $5223 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
        return $5223;
    };
    const Bits$chunks_of = x0 => x1 => Bits$chunks_of$(x0, x1);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $5225 = Word$e;
            var $5224 = $5225;
        } else {
            var $5226 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $5228 = Word$o$(Word$from_bits$($5226, Bits$e));
                    var $5227 = $5228;
                    break;
                case 'o':
                    var $5229 = self.slice(0, -1);
                    var $5230 = Word$o$(Word$from_bits$($5226, $5229));
                    var $5227 = $5230;
                    break;
                case 'i':
                    var $5231 = self.slice(0, -1);
                    var $5232 = Word$i$(Word$from_bits$($5226, $5231));
                    var $5227 = $5232;
                    break;
            };
            var $5224 = $5227;
        };
        return $5224;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);

    function Fm$Name$from_bits$(_bits$1) {
        var _list$2 = Bits$chunks_of$(6n, _bits$1);
        var _name$3 = List$fold$(_list$2, String$nil, (_bts$3 => _name$4 => {
            var _u16$5 = U16$new$(Word$from_bits$(16n, Bits$reverse$(_bts$3)));
            var self = U16$btw$(0, _u16$5, 25);
            if (self) {
                var $5235 = ((_u16$5 + 65) & 0xFFFF);
                var _chr$6 = $5235;
            } else {
                var self = U16$btw$(26, _u16$5, 51);
                if (self) {
                    var $5237 = ((_u16$5 + 71) & 0xFFFF);
                    var $5236 = $5237;
                } else {
                    var self = U16$btw$(52, _u16$5, 61);
                    if (self) {
                        var $5239 = (Math.max(_u16$5 - 4, 0));
                        var $5238 = $5239;
                    } else {
                        var self = (62 === _u16$5);
                        if (self) {
                            var $5241 = 46;
                            var $5240 = $5241;
                        } else {
                            var $5242 = 95;
                            var $5240 = $5242;
                        };
                        var $5238 = $5240;
                    };
                    var $5236 = $5238;
                };
                var _chr$6 = $5236;
            };
            var $5234 = String$cons$(_chr$6, _name$4);
            return $5234;
        }));
        var $5233 = _name$3;
        return $5233;
    };
    const Fm$Name$from_bits = x0 => Fm$Name$from_bits$(x0);

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $5244 = self.fst;
                var $5245 = self.snd;
                var $5246 = $5244;
                var $5243 = $5246;
                break;
        };
        return $5243;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Fm$Term$show$go$(_term$1, _path$2) {
        var self = Fm$Term$show$as_nat$(_term$1);
        switch (self._) {
            case 'Maybe.none':
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $5249 = self.name;
                        var $5250 = self.indx;
                        var $5251 = Fm$Name$show$($5249);
                        var $5248 = $5251;
                        break;
                    case 'Fm.Term.ref':
                        var $5252 = self.name;
                        var _name$4 = Fm$Name$show$($5252);
                        var self = _path$2;
                        switch (self._) {
                            case 'Maybe.none':
                                var $5254 = _name$4;
                                var $5253 = $5254;
                                break;
                            case 'Maybe.some':
                                var $5255 = self.value;
                                var _path_val$6 = ((Bits$e + '1') + Fm$Path$to_bits$($5255));
                                var _path_str$7 = Nat$show$(Bits$to_nat$(_path_val$6));
                                var $5256 = String$flatten$(List$cons$(_name$4, List$cons$(Fm$color$("2", ("-" + _path_str$7)), List$nil)));
                                var $5253 = $5256;
                                break;
                        };
                        var $5248 = $5253;
                        break;
                    case 'Fm.Term.typ':
                        var $5257 = "Type";
                        var $5248 = $5257;
                        break;
                    case 'Fm.Term.all':
                        var $5258 = self.eras;
                        var $5259 = self.self;
                        var $5260 = self.name;
                        var $5261 = self.xtyp;
                        var $5262 = self.body;
                        var _eras$8 = $5258;
                        var _self$9 = Fm$Name$show$($5259);
                        var _name$10 = Fm$Name$show$($5260);
                        var _type$11 = Fm$Term$show$go$($5261, Fm$MPath$o$(_path$2));
                        var self = _eras$8;
                        if (self) {
                            var $5264 = "<";
                            var _open$12 = $5264;
                        } else {
                            var $5265 = "(";
                            var _open$12 = $5265;
                        };
                        var self = _eras$8;
                        if (self) {
                            var $5266 = ">";
                            var _clos$13 = $5266;
                        } else {
                            var $5267 = ")";
                            var _clos$13 = $5267;
                        };
                        var _body$14 = Fm$Term$show$go$($5262(Fm$Term$var$($5259, 0n))(Fm$Term$var$($5260, 0n)), Fm$MPath$i$(_path$2));
                        var $5263 = String$flatten$(List$cons$(_self$9, List$cons$(_open$12, List$cons$(_name$10, List$cons$(":", List$cons$(_type$11, List$cons$(_clos$13, List$cons$(" ", List$cons$(_body$14, List$nil)))))))));
                        var $5248 = $5263;
                        break;
                    case 'Fm.Term.lam':
                        var $5268 = self.name;
                        var $5269 = self.body;
                        var _name$5 = Fm$Name$show$($5268);
                        var _body$6 = Fm$Term$show$go$($5269(Fm$Term$var$($5268, 0n)), Fm$MPath$o$(_path$2));
                        var $5270 = String$flatten$(List$cons$("(", List$cons$(_name$5, List$cons$(") ", List$cons$(_body$6, List$nil)))));
                        var $5248 = $5270;
                        break;
                    case 'Fm.Term.app':
                        var $5271 = self.func;
                        var $5272 = self.argm;
                        var $5273 = Fm$Term$show$app$(_term$1, _path$2, List$nil);
                        var $5248 = $5273;
                        break;
                    case 'Fm.Term.let':
                        var $5274 = self.name;
                        var $5275 = self.expr;
                        var $5276 = self.body;
                        var _name$6 = Fm$Name$show$($5274);
                        var _expr$7 = Fm$Term$show$go$($5275, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($5276(Fm$Term$var$($5274, 0n)), Fm$MPath$i$(_path$2));
                        var $5277 = String$flatten$(List$cons$("let ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5248 = $5277;
                        break;
                    case 'Fm.Term.def':
                        var $5278 = self.name;
                        var $5279 = self.expr;
                        var $5280 = self.body;
                        var _name$6 = Fm$Name$show$($5278);
                        var _expr$7 = Fm$Term$show$go$($5279, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($5280(Fm$Term$var$($5278, 0n)), Fm$MPath$i$(_path$2));
                        var $5281 = String$flatten$(List$cons$("def ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5248 = $5281;
                        break;
                    case 'Fm.Term.ann':
                        var $5282 = self.done;
                        var $5283 = self.term;
                        var $5284 = self.type;
                        var _term$6 = Fm$Term$show$go$($5283, Fm$MPath$o$(_path$2));
                        var _type$7 = Fm$Term$show$go$($5284, Fm$MPath$i$(_path$2));
                        var $5285 = String$flatten$(List$cons$(_term$6, List$cons$("::", List$cons$(_type$7, List$nil))));
                        var $5248 = $5285;
                        break;
                    case 'Fm.Term.gol':
                        var $5286 = self.name;
                        var $5287 = self.dref;
                        var $5288 = self.verb;
                        var _name$6 = Fm$Name$show$($5286);
                        var $5289 = String$flatten$(List$cons$("?", List$cons$(_name$6, List$nil)));
                        var $5248 = $5289;
                        break;
                    case 'Fm.Term.hol':
                        var $5290 = self.path;
                        var $5291 = "_";
                        var $5248 = $5291;
                        break;
                    case 'Fm.Term.nat':
                        var $5292 = self.natx;
                        var $5293 = String$flatten$(List$cons$(Nat$show$($5292), List$nil));
                        var $5248 = $5293;
                        break;
                    case 'Fm.Term.chr':
                        var $5294 = self.chrx;
                        var $5295 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($5294), List$cons$("\'", List$nil))));
                        var $5248 = $5295;
                        break;
                    case 'Fm.Term.str':
                        var $5296 = self.strx;
                        var $5297 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($5296), List$cons$("\"", List$nil))));
                        var $5248 = $5297;
                        break;
                    case 'Fm.Term.cse':
                        var $5298 = self.path;
                        var $5299 = self.expr;
                        var $5300 = self.name;
                        var $5301 = self.with;
                        var $5302 = self.cses;
                        var $5303 = self.moti;
                        var _expr$9 = Fm$Term$show$go$($5299, Fm$MPath$o$(_path$2));
                        var _name$10 = Fm$Name$show$($5300);
                        var _wyth$11 = String$join$("", List$mapped$($5301, (_defn$11 => {
                            var self = _defn$11;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5306 = self.file;
                                    var $5307 = self.code;
                                    var $5308 = self.name;
                                    var $5309 = self.term;
                                    var $5310 = self.type;
                                    var $5311 = self.stat;
                                    var _name$18 = Fm$Name$show$($5308);
                                    var _type$19 = Fm$Term$show$go$($5310, Maybe$none);
                                    var _term$20 = Fm$Term$show$go$($5309, Maybe$none);
                                    var $5312 = String$flatten$(List$cons$(_name$18, List$cons$(": ", List$cons$(_type$19, List$cons$(" = ", List$cons$(_term$20, List$cons$(";", List$nil)))))));
                                    var $5305 = $5312;
                                    break;
                            };
                            return $5305;
                        })));
                        var _cses$12 = Map$to_list$($5302);
                        var _cses$13 = String$join$("", List$mapped$(_cses$12, (_x$13 => {
                            var _name$14 = Fm$Name$from_bits$(Pair$fst$(_x$13));
                            var _term$15 = Fm$Term$show$go$(Pair$snd$(_x$13), Maybe$none);
                            var $5313 = String$flatten$(List$cons$(_name$14, List$cons$(": ", List$cons$(_term$15, List$cons$("; ", List$nil)))));
                            return $5313;
                        })));
                        var self = $5303;
                        switch (self._) {
                            case 'Maybe.none':
                                var $5314 = "";
                                var _moti$14 = $5314;
                                break;
                            case 'Maybe.some':
                                var $5315 = self.value;
                                var $5316 = String$flatten$(List$cons$(": ", List$cons$(Fm$Term$show$go$($5315, Maybe$none), List$nil)));
                                var _moti$14 = $5316;
                                break;
                        };
                        var $5304 = String$flatten$(List$cons$("case ", List$cons$(_expr$9, List$cons$(" as ", List$cons$(_name$10, List$cons$(_wyth$11, List$cons$(" { ", List$cons$(_cses$13, List$cons$("}", List$cons$(_moti$14, List$nil))))))))));
                        var $5248 = $5304;
                        break;
                    case 'Fm.Term.ori':
                        var $5317 = self.orig;
                        var $5318 = self.expr;
                        var $5319 = Fm$Term$show$go$($5318, _path$2);
                        var $5248 = $5319;
                        break;
                };
                var $5247 = $5248;
                break;
            case 'Maybe.some':
                var $5320 = self.value;
                var $5321 = $5320;
                var $5247 = $5321;
                break;
        };
        return $5247;
    };
    const Fm$Term$show$go = x0 => x1 => Fm$Term$show$go$(x0, x1);

    function Fm$Term$show$(_term$1) {
        var $5322 = Fm$Term$show$go$(_term$1, Maybe$none);
        return $5322;
    };
    const Fm$Term$show = x0 => Fm$Term$show$(x0);

    function Fm$Error$relevant$(_errors$1, _got$2) {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                var $5324 = List$nil;
                var $5323 = $5324;
                break;
            case 'List.cons':
                var $5325 = self.head;
                var $5326 = self.tail;
                var self = $5325;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $5328 = self.origin;
                        var $5329 = self.expected;
                        var $5330 = self.detected;
                        var $5331 = self.context;
                        var $5332 = (!_got$2);
                        var _keep$5 = $5332;
                        break;
                    case 'Fm.Error.show_goal':
                        var $5333 = self.name;
                        var $5334 = self.dref;
                        var $5335 = self.verb;
                        var $5336 = self.goal;
                        var $5337 = self.context;
                        var $5338 = Bool$true;
                        var _keep$5 = $5338;
                        break;
                    case 'Fm.Error.waiting':
                        var $5339 = self.name;
                        var $5340 = Bool$false;
                        var _keep$5 = $5340;
                        break;
                    case 'Fm.Error.indirect':
                        var $5341 = self.name;
                        var $5342 = Bool$false;
                        var _keep$5 = $5342;
                        break;
                    case 'Fm.Error.patch':
                        var $5343 = self.path;
                        var $5344 = self.term;
                        var $5345 = Bool$false;
                        var _keep$5 = $5345;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $5346 = self.origin;
                        var $5347 = self.name;
                        var $5348 = (!_got$2);
                        var _keep$5 = $5348;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $5349 = self.origin;
                        var $5350 = self.term;
                        var $5351 = self.context;
                        var $5352 = (!_got$2);
                        var _keep$5 = $5352;
                        break;
                };
                var self = $5325;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $5353 = self.origin;
                        var $5354 = self.expected;
                        var $5355 = self.detected;
                        var $5356 = self.context;
                        var $5357 = Bool$true;
                        var _got$6 = $5357;
                        break;
                    case 'Fm.Error.show_goal':
                        var $5358 = self.name;
                        var $5359 = self.dref;
                        var $5360 = self.verb;
                        var $5361 = self.goal;
                        var $5362 = self.context;
                        var $5363 = _got$2;
                        var _got$6 = $5363;
                        break;
                    case 'Fm.Error.waiting':
                        var $5364 = self.name;
                        var $5365 = _got$2;
                        var _got$6 = $5365;
                        break;
                    case 'Fm.Error.indirect':
                        var $5366 = self.name;
                        var $5367 = _got$2;
                        var _got$6 = $5367;
                        break;
                    case 'Fm.Error.patch':
                        var $5368 = self.path;
                        var $5369 = self.term;
                        var $5370 = _got$2;
                        var _got$6 = $5370;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $5371 = self.origin;
                        var $5372 = self.name;
                        var $5373 = Bool$true;
                        var _got$6 = $5373;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $5374 = self.origin;
                        var $5375 = self.term;
                        var $5376 = self.context;
                        var $5377 = _got$2;
                        var _got$6 = $5377;
                        break;
                };
                var _tail$7 = Fm$Error$relevant$($5326, _got$6);
                var self = _keep$5;
                if (self) {
                    var $5378 = List$cons$($5325, _tail$7);
                    var $5327 = $5378;
                } else {
                    var $5379 = _tail$7;
                    var $5327 = $5379;
                };
                var $5323 = $5327;
                break;
        };
        return $5323;
    };
    const Fm$Error$relevant = x0 => x1 => Fm$Error$relevant$(x0, x1);

    function Fm$Context$show$(_context$1) {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                var $5381 = "";
                var $5380 = $5381;
                break;
            case 'List.cons':
                var $5382 = self.head;
                var $5383 = self.tail;
                var self = $5382;
                switch (self._) {
                    case 'Pair.new':
                        var $5385 = self.fst;
                        var $5386 = self.snd;
                        var _name$6 = Fm$Name$show$($5385);
                        var _type$7 = Fm$Term$show$($5386);
                        var _rest$8 = Fm$Context$show$($5383);
                        var $5387 = String$flatten$(List$cons$(_rest$8, List$cons$("- ", List$cons$(_name$6, List$cons$(": ", List$cons$(_type$7, List$cons$("\u{a}", List$nil)))))));
                        var $5384 = $5387;
                        break;
                };
                var $5380 = $5384;
                break;
        };
        return $5380;
    };
    const Fm$Context$show = x0 => Fm$Context$show$(x0);

    function Fm$Term$expand_at$(_path$1, _term$2, _defs$3) {
        var $5388 = Fm$Term$patch_at$(_path$1, _term$2, (_term$4 => {
            var self = _term$4;
            switch (self._) {
                case 'Fm.Term.var':
                    var $5390 = self.name;
                    var $5391 = self.indx;
                    var $5392 = _term$4;
                    var $5389 = $5392;
                    break;
                case 'Fm.Term.ref':
                    var $5393 = self.name;
                    var self = Fm$get$($5393, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $5395 = Fm$Term$ref$($5393);
                            var $5394 = $5395;
                            break;
                        case 'Maybe.some':
                            var $5396 = self.value;
                            var self = $5396;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5398 = self.file;
                                    var $5399 = self.code;
                                    var $5400 = self.name;
                                    var $5401 = self.term;
                                    var $5402 = self.type;
                                    var $5403 = self.stat;
                                    var $5404 = $5401;
                                    var $5397 = $5404;
                                    break;
                            };
                            var $5394 = $5397;
                            break;
                    };
                    var $5389 = $5394;
                    break;
                case 'Fm.Term.typ':
                    var $5405 = _term$4;
                    var $5389 = $5405;
                    break;
                case 'Fm.Term.all':
                    var $5406 = self.eras;
                    var $5407 = self.self;
                    var $5408 = self.name;
                    var $5409 = self.xtyp;
                    var $5410 = self.body;
                    var $5411 = _term$4;
                    var $5389 = $5411;
                    break;
                case 'Fm.Term.lam':
                    var $5412 = self.name;
                    var $5413 = self.body;
                    var $5414 = _term$4;
                    var $5389 = $5414;
                    break;
                case 'Fm.Term.app':
                    var $5415 = self.func;
                    var $5416 = self.argm;
                    var $5417 = _term$4;
                    var $5389 = $5417;
                    break;
                case 'Fm.Term.let':
                    var $5418 = self.name;
                    var $5419 = self.expr;
                    var $5420 = self.body;
                    var $5421 = _term$4;
                    var $5389 = $5421;
                    break;
                case 'Fm.Term.def':
                    var $5422 = self.name;
                    var $5423 = self.expr;
                    var $5424 = self.body;
                    var $5425 = _term$4;
                    var $5389 = $5425;
                    break;
                case 'Fm.Term.ann':
                    var $5426 = self.done;
                    var $5427 = self.term;
                    var $5428 = self.type;
                    var $5429 = _term$4;
                    var $5389 = $5429;
                    break;
                case 'Fm.Term.gol':
                    var $5430 = self.name;
                    var $5431 = self.dref;
                    var $5432 = self.verb;
                    var $5433 = _term$4;
                    var $5389 = $5433;
                    break;
                case 'Fm.Term.hol':
                    var $5434 = self.path;
                    var $5435 = _term$4;
                    var $5389 = $5435;
                    break;
                case 'Fm.Term.nat':
                    var $5436 = self.natx;
                    var $5437 = _term$4;
                    var $5389 = $5437;
                    break;
                case 'Fm.Term.chr':
                    var $5438 = self.chrx;
                    var $5439 = _term$4;
                    var $5389 = $5439;
                    break;
                case 'Fm.Term.str':
                    var $5440 = self.strx;
                    var $5441 = _term$4;
                    var $5389 = $5441;
                    break;
                case 'Fm.Term.cse':
                    var $5442 = self.path;
                    var $5443 = self.expr;
                    var $5444 = self.name;
                    var $5445 = self.with;
                    var $5446 = self.cses;
                    var $5447 = self.moti;
                    var $5448 = _term$4;
                    var $5389 = $5448;
                    break;
                case 'Fm.Term.ori':
                    var $5449 = self.orig;
                    var $5450 = self.expr;
                    var $5451 = _term$4;
                    var $5389 = $5451;
                    break;
            };
            return $5389;
        }));
        return $5388;
    };
    const Fm$Term$expand_at = x0 => x1 => x2 => Fm$Term$expand_at$(x0, x1, x2);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Fm$Term$expand_ct$(_term$1, _defs$2, _arity$3) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $5453 = self.name;
                var $5454 = self.indx;
                var $5455 = Fm$Term$var$($5453, $5454);
                var $5452 = $5455;
                break;
            case 'Fm.Term.ref':
                var $5456 = self.name;
                var _expand$5 = Bool$false;
                var _expand$6 = ((($5456 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                var _expand$7 = ((($5456 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                var _expand$8 = ((($5456 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                var _expand$9 = ((($5456 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                var self = _expand$9;
                if (self) {
                    var self = Fm$get$($5456, _defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            var $5459 = Fm$Term$ref$($5456);
                            var $5458 = $5459;
                            break;
                        case 'Maybe.some':
                            var $5460 = self.value;
                            var self = $5460;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $5462 = self.file;
                                    var $5463 = self.code;
                                    var $5464 = self.name;
                                    var $5465 = self.term;
                                    var $5466 = self.type;
                                    var $5467 = self.stat;
                                    var $5468 = $5465;
                                    var $5461 = $5468;
                                    break;
                            };
                            var $5458 = $5461;
                            break;
                    };
                    var $5457 = $5458;
                } else {
                    var $5469 = Fm$Term$ref$($5456);
                    var $5457 = $5469;
                };
                var $5452 = $5457;
                break;
            case 'Fm.Term.typ':
                var $5470 = Fm$Term$typ;
                var $5452 = $5470;
                break;
            case 'Fm.Term.all':
                var $5471 = self.eras;
                var $5472 = self.self;
                var $5473 = self.name;
                var $5474 = self.xtyp;
                var $5475 = self.body;
                var $5476 = Fm$Term$all$($5471, $5472, $5473, Fm$Term$expand_ct$($5474, _defs$2, 0n), (_s$9 => _x$10 => {
                    var $5477 = Fm$Term$expand_ct$($5475(_s$9)(_x$10), _defs$2, 0n);
                    return $5477;
                }));
                var $5452 = $5476;
                break;
            case 'Fm.Term.lam':
                var $5478 = self.name;
                var $5479 = self.body;
                var $5480 = Fm$Term$lam$($5478, (_x$6 => {
                    var $5481 = Fm$Term$expand_ct$($5479(_x$6), _defs$2, 0n);
                    return $5481;
                }));
                var $5452 = $5480;
                break;
            case 'Fm.Term.app':
                var $5482 = self.func;
                var $5483 = self.argm;
                var $5484 = Fm$Term$app$(Fm$Term$expand_ct$($5482, _defs$2, Nat$succ$(_arity$3)), Fm$Term$expand_ct$($5483, _defs$2, 0n));
                var $5452 = $5484;
                break;
            case 'Fm.Term.let':
                var $5485 = self.name;
                var $5486 = self.expr;
                var $5487 = self.body;
                var $5488 = Fm$Term$let$($5485, Fm$Term$expand_ct$($5486, _defs$2, 0n), (_x$7 => {
                    var $5489 = Fm$Term$expand_ct$($5487(_x$7), _defs$2, 0n);
                    return $5489;
                }));
                var $5452 = $5488;
                break;
            case 'Fm.Term.def':
                var $5490 = self.name;
                var $5491 = self.expr;
                var $5492 = self.body;
                var $5493 = Fm$Term$def$($5490, Fm$Term$expand_ct$($5491, _defs$2, 0n), (_x$7 => {
                    var $5494 = Fm$Term$expand_ct$($5492(_x$7), _defs$2, 0n);
                    return $5494;
                }));
                var $5452 = $5493;
                break;
            case 'Fm.Term.ann':
                var $5495 = self.done;
                var $5496 = self.term;
                var $5497 = self.type;
                var $5498 = Fm$Term$ann$($5495, Fm$Term$expand_ct$($5496, _defs$2, 0n), Fm$Term$expand_ct$($5497, _defs$2, 0n));
                var $5452 = $5498;
                break;
            case 'Fm.Term.gol':
                var $5499 = self.name;
                var $5500 = self.dref;
                var $5501 = self.verb;
                var $5502 = Fm$Term$gol$($5499, $5500, $5501);
                var $5452 = $5502;
                break;
            case 'Fm.Term.hol':
                var $5503 = self.path;
                var $5504 = Fm$Term$hol$($5503);
                var $5452 = $5504;
                break;
            case 'Fm.Term.nat':
                var $5505 = self.natx;
                var $5506 = Fm$Term$nat$($5505);
                var $5452 = $5506;
                break;
            case 'Fm.Term.chr':
                var $5507 = self.chrx;
                var $5508 = Fm$Term$chr$($5507);
                var $5452 = $5508;
                break;
            case 'Fm.Term.str':
                var $5509 = self.strx;
                var $5510 = Fm$Term$str$($5509);
                var $5452 = $5510;
                break;
            case 'Fm.Term.cse':
                var $5511 = self.path;
                var $5512 = self.expr;
                var $5513 = self.name;
                var $5514 = self.with;
                var $5515 = self.cses;
                var $5516 = self.moti;
                var $5517 = _term$1;
                var $5452 = $5517;
                break;
            case 'Fm.Term.ori':
                var $5518 = self.orig;
                var $5519 = self.expr;
                var $5520 = Fm$Term$ori$($5518, $5519);
                var $5452 = $5520;
                break;
        };
        return $5452;
    };
    const Fm$Term$expand_ct = x0 => x1 => x2 => Fm$Term$expand_ct$(x0, x1, x2);

    function Fm$Term$expand$(_dref$1, _term$2, _defs$3) {
        var _term$4 = Fm$Term$normalize$(_term$2, Map$new);
        var _term$5 = (() => {
            var $5523 = _term$4;
            var $5524 = _dref$1;
            let _term$6 = $5523;
            let _path$5;
            while ($5524._ === 'List.cons') {
                _path$5 = $5524.head;
                var _term$7 = Fm$Term$expand_at$(_path$5, _term$6, _defs$3);
                var _term$8 = Fm$Term$normalize$(_term$7, Map$new);
                var _term$9 = Fm$Term$expand_ct$(_term$8, _defs$3, 0n);
                var _term$10 = Fm$Term$normalize$(_term$9, Map$new);
                var $5523 = _term$10;
                _term$6 = $5523;
                $5524 = $5524.tail;
            }
            return _term$6;
        })();
        var $5521 = _term$5;
        return $5521;
    };
    const Fm$Term$expand = x0 => x1 => x2 => Fm$Term$expand$(x0, x1, x2);

    function Fm$Error$show$(_error$1, _defs$2) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $5526 = self.origin;
                var $5527 = self.expected;
                var $5528 = self.detected;
                var $5529 = self.context;
                var self = $5527;
                switch (self._) {
                    case 'Either.left':
                        var $5531 = self.value;
                        var $5532 = $5531;
                        var _expected$7 = $5532;
                        break;
                    case 'Either.right':
                        var $5533 = self.value;
                        var $5534 = Fm$Term$show$(Fm$Term$normalize$($5533, Map$new));
                        var _expected$7 = $5534;
                        break;
                };
                var self = $5528;
                switch (self._) {
                    case 'Either.left':
                        var $5535 = self.value;
                        var $5536 = $5535;
                        var _detected$8 = $5536;
                        break;
                    case 'Either.right':
                        var $5537 = self.value;
                        var $5538 = Fm$Term$show$(Fm$Term$normalize$($5537, Map$new));
                        var _detected$8 = $5538;
                        break;
                };
                var $5530 = String$flatten$(List$cons$("Type mismatch.\u{a}", List$cons$("- Expected: ", List$cons$(_expected$7, List$cons$("\u{a}", List$cons$("- Detected: ", List$cons$(_detected$8, List$cons$("\u{a}", List$cons$((() => {
                    var self = $5529;
                    switch (self._) {
                        case 'List.nil':
                            var $5539 = "";
                            return $5539;
                        case 'List.cons':
                            var $5540 = self.head;
                            var $5541 = self.tail;
                            var $5542 = String$flatten$(List$cons$("With context:\u{a}", List$cons$(Fm$Context$show$($5529), List$nil)));
                            return $5542;
                    };
                })(), List$nil)))))))));
                var $5525 = $5530;
                break;
            case 'Fm.Error.show_goal':
                var $5543 = self.name;
                var $5544 = self.dref;
                var $5545 = self.verb;
                var $5546 = self.goal;
                var $5547 = self.context;
                var _goal_name$8 = String$flatten$(List$cons$("Goal ?", List$cons$(Fm$Name$show$($5543), List$cons$(":\u{a}", List$nil))));
                var self = $5546;
                switch (self._) {
                    case 'Maybe.none':
                        var $5549 = "";
                        var _with_type$9 = $5549;
                        break;
                    case 'Maybe.some':
                        var $5550 = self.value;
                        var _goal$10 = Fm$Term$expand$($5544, $5550, _defs$2);
                        var $5551 = String$flatten$(List$cons$("With type: ", List$cons$((() => {
                            var self = $5545;
                            if (self) {
                                var $5552 = Fm$Term$show$go$(_goal$10, Maybe$some$((_x$11 => {
                                    var $5553 = _x$11;
                                    return $5553;
                                })));
                                return $5552;
                            } else {
                                var $5554 = Fm$Term$show$(_goal$10);
                                return $5554;
                            };
                        })(), List$cons$("\u{a}", List$nil))));
                        var _with_type$9 = $5551;
                        break;
                };
                var self = $5547;
                switch (self._) {
                    case 'List.nil':
                        var $5555 = "";
                        var _with_ctxt$10 = $5555;
                        break;
                    case 'List.cons':
                        var $5556 = self.head;
                        var $5557 = self.tail;
                        var $5558 = String$flatten$(List$cons$("With ctxt:\u{a}", List$cons$(Fm$Context$show$($5547), List$nil)));
                        var _with_ctxt$10 = $5558;
                        break;
                };
                var $5548 = String$flatten$(List$cons$(_goal_name$8, List$cons$(_with_type$9, List$cons$(_with_ctxt$10, List$nil))));
                var $5525 = $5548;
                break;
            case 'Fm.Error.waiting':
                var $5559 = self.name;
                var $5560 = String$flatten$(List$cons$("Waiting for \'", List$cons$($5559, List$cons$("\'.", List$nil))));
                var $5525 = $5560;
                break;
            case 'Fm.Error.indirect':
                var $5561 = self.name;
                var $5562 = String$flatten$(List$cons$("Error on dependency \'", List$cons$($5561, List$cons$("\'.", List$nil))));
                var $5525 = $5562;
                break;
            case 'Fm.Error.patch':
                var $5563 = self.path;
                var $5564 = self.term;
                var $5565 = String$flatten$(List$cons$("Patching: ", List$cons$(Fm$Term$show$($5564), List$nil)));
                var $5525 = $5565;
                break;
            case 'Fm.Error.undefined_reference':
                var $5566 = self.origin;
                var $5567 = self.name;
                var $5568 = String$flatten$(List$cons$("Undefined reference: ", List$cons$(Fm$Name$show$($5567), List$cons$("\u{a}", List$nil))));
                var $5525 = $5568;
                break;
            case 'Fm.Error.cant_infer':
                var $5569 = self.origin;
                var $5570 = self.term;
                var $5571 = self.context;
                var _term$6 = Fm$Term$show$($5570);
                var _context$7 = Fm$Context$show$($5571);
                var $5572 = String$flatten$(List$cons$("Can\'t infer type of: ", List$cons$(_term$6, List$cons$("\u{a}", List$cons$("With ctxt:\u{a}", List$cons$(_context$7, List$nil))))));
                var $5525 = $5572;
                break;
        };
        return $5525;
    };
    const Fm$Error$show = x0 => x1 => Fm$Error$show$(x0, x1);

    function Fm$Error$origin$(_error$1) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $5574 = self.origin;
                var $5575 = self.expected;
                var $5576 = self.detected;
                var $5577 = self.context;
                var $5578 = $5574;
                var $5573 = $5578;
                break;
            case 'Fm.Error.show_goal':
                var $5579 = self.name;
                var $5580 = self.dref;
                var $5581 = self.verb;
                var $5582 = self.goal;
                var $5583 = self.context;
                var $5584 = Maybe$none;
                var $5573 = $5584;
                break;
            case 'Fm.Error.waiting':
                var $5585 = self.name;
                var $5586 = Maybe$none;
                var $5573 = $5586;
                break;
            case 'Fm.Error.indirect':
                var $5587 = self.name;
                var $5588 = Maybe$none;
                var $5573 = $5588;
                break;
            case 'Fm.Error.patch':
                var $5589 = self.path;
                var $5590 = self.term;
                var $5591 = Maybe$none;
                var $5573 = $5591;
                break;
            case 'Fm.Error.undefined_reference':
                var $5592 = self.origin;
                var $5593 = self.name;
                var $5594 = $5592;
                var $5573 = $5594;
                break;
            case 'Fm.Error.cant_infer':
                var $5595 = self.origin;
                var $5596 = self.term;
                var $5597 = self.context;
                var $5598 = $5595;
                var $5573 = $5598;
                break;
        };
        return $5573;
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
                        var $5599 = String$flatten$(List$cons$(_typs$4, List$cons$("\u{a}", List$cons$((() => {
                            var self = _errs$3;
                            if (self.length === 0) {
                                var $5600 = "All terms check.";
                                return $5600;
                            } else {
                                var $5601 = self.charCodeAt(0);
                                var $5602 = self.slice(1);
                                var $5603 = _errs$3;
                                return $5603;
                            };
                        })(), List$nil))));
                        return $5599;
                    case 'List.cons':
                        var $5604 = self.head;
                        var $5605 = self.tail;
                        var _name$7 = $5604;
                        var self = Fm$get$(_name$7, _defs$1);
                        switch (self._) {
                            case 'Maybe.none':
                                var $5607 = Fm$Defs$report$go$(_defs$1, $5605, _errs$3, _typs$4);
                                var $5606 = $5607;
                                break;
                            case 'Maybe.some':
                                var $5608 = self.value;
                                var self = $5608;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $5610 = self.file;
                                        var $5611 = self.code;
                                        var $5612 = self.name;
                                        var $5613 = self.term;
                                        var $5614 = self.type;
                                        var $5615 = self.stat;
                                        var _typs$15 = String$flatten$(List$cons$(_typs$4, List$cons$(_name$7, List$cons$(": ", List$cons$(Fm$Term$show$($5614), List$cons$("\u{a}", List$nil))))));
                                        var self = $5615;
                                        switch (self._) {
                                            case 'Fm.Status.init':
                                                var $5617 = Fm$Defs$report$go$(_defs$1, $5605, _errs$3, _typs$15);
                                                var $5616 = $5617;
                                                break;
                                            case 'Fm.Status.wait':
                                                var $5618 = Fm$Defs$report$go$(_defs$1, $5605, _errs$3, _typs$15);
                                                var $5616 = $5618;
                                                break;
                                            case 'Fm.Status.done':
                                                var $5619 = Fm$Defs$report$go$(_defs$1, $5605, _errs$3, _typs$15);
                                                var $5616 = $5619;
                                                break;
                                            case 'Fm.Status.fail':
                                                var $5620 = self.errors;
                                                var self = $5620;
                                                switch (self._) {
                                                    case 'List.nil':
                                                        var $5622 = Fm$Defs$report$go$(_defs$1, $5605, _errs$3, _typs$15);
                                                        var $5621 = $5622;
                                                        break;
                                                    case 'List.cons':
                                                        var $5623 = self.head;
                                                        var $5624 = self.tail;
                                                        var _name_str$19 = Fm$Name$show$($5612);
                                                        var _rel_errs$20 = Fm$Error$relevant$($5620, Bool$false);
                                                        var _rel_msgs$21 = List$mapped$(_rel_errs$20, (_err$21 => {
                                                            var $5626 = String$flatten$(List$cons$(Fm$Error$show$(_err$21, _defs$1), List$cons$((() => {
                                                                var self = Fm$Error$origin$(_err$21);
                                                                switch (self._) {
                                                                    case 'Maybe.none':
                                                                        var $5627 = "";
                                                                        return $5627;
                                                                    case 'Maybe.some':
                                                                        var $5628 = self.value;
                                                                        var self = $5628;
                                                                        switch (self._) {
                                                                            case 'Fm.Origin.new':
                                                                                var $5630 = self.file;
                                                                                var $5631 = self.from;
                                                                                var $5632 = self.upto;
                                                                                var $5633 = String$flatten$(List$cons$("Inside \'", List$cons$($5610, List$cons$("\':\u{a}", List$cons$(Fm$highlight$($5611, $5631, $5632), List$cons$("\u{a}", List$nil))))));
                                                                                var $5629 = $5633;
                                                                                break;
                                                                        };
                                                                        return $5629;
                                                                };
                                                            })(), List$nil)));
                                                            return $5626;
                                                        }));
                                                        var _errs$22 = String$flatten$(List$cons$(_errs$3, List$cons$(String$join$("\u{a}", _rel_msgs$21), List$cons$("\u{a}", List$nil))));
                                                        var $5625 = Fm$Defs$report$go$(_defs$1, $5605, _errs$22, _typs$15);
                                                        var $5621 = $5625;
                                                        break;
                                                };
                                                var $5616 = $5621;
                                                break;
                                        };
                                        var $5609 = $5616;
                                        break;
                                };
                                var $5606 = $5609;
                                break;
                        };
                        return $5606;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Defs$report$go = x0 => x1 => x2 => x3 => Fm$Defs$report$go$(x0, x1, x2, x3);

    function Fm$Defs$report$(_defs$1, _list$2) {
        var $5634 = Fm$Defs$report$go$(_defs$1, _list$2, "", "");
        return $5634;
    };
    const Fm$Defs$report = x0 => x1 => Fm$Defs$report$(x0, x1);

    function Fm$checker$io$one$(_name$1) {
        var $5635 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $5636 = IO$print$(Fm$Defs$report$(_defs$2, List$cons$(_name$1, List$nil)));
            return $5636;
        }));
        return $5635;
    };
    const Fm$checker$io$one = x0 => Fm$checker$io$one$(x0);

    function Map$keys$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $5638 = _list$4;
                var $5637 = $5638;
                break;
            case 'Map.tie':
                var $5639 = self.val;
                var $5640 = self.lft;
                var $5641 = self.rgt;
                var self = $5639;
                switch (self._) {
                    case 'Maybe.none':
                        var $5643 = _list$4;
                        var _list0$8 = $5643;
                        break;
                    case 'Maybe.some':
                        var $5644 = self.value;
                        var $5645 = List$cons$(Bits$reverse$(_key$3), _list$4);
                        var _list0$8 = $5645;
                        break;
                };
                var _list1$9 = Map$keys$go$($5640, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$keys$go$($5641, (_key$3 + '1'), _list1$9);
                var $5642 = _list2$10;
                var $5637 = $5642;
                break;
        };
        return $5637;
    };
    const Map$keys$go = x0 => x1 => x2 => Map$keys$go$(x0, x1, x2);

    function Map$keys$(_xs$2) {
        var $5646 = List$reverse$(Map$keys$go$(_xs$2, Bits$e, List$nil));
        return $5646;
    };
    const Map$keys = x0 => Map$keys$(x0);

    function Fm$Synth$many$(_names$1, _defs$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $5648 = Monad$pure$(IO$monad)(_defs$2);
                var $5647 = $5648;
                break;
            case 'List.cons':
                var $5649 = self.head;
                var $5650 = self.tail;
                var $5651 = Monad$bind$(IO$monad)(Fm$Synth$one$($5649, _defs$2))((_defs$5 => {
                    var $5652 = Fm$Synth$many$($5650, _defs$5);
                    return $5652;
                }));
                var $5647 = $5651;
                break;
        };
        return $5647;
    };
    const Fm$Synth$many = x0 => x1 => Fm$Synth$many$(x0, x1);

    function Fm$Synth$file$(_file$1, _defs$2) {
        var $5653 = Monad$bind$(IO$monad)(IO$get_file$(_file$1))((_code$3 => {
            var _read$4 = Fm$Defs$read$(_file$1, _code$3, _defs$2);
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $5655 = self.value;
                    var $5656 = Monad$pure$(IO$monad)(Either$left$($5655));
                    var $5654 = $5656;
                    break;
                case 'Either.right':
                    var $5657 = self.value;
                    var _file_defs$6 = $5657;
                    var _file_keys$7 = Map$keys$(_file_defs$6);
                    var _file_nams$8 = List$mapped$(_file_keys$7, Fm$Name$from_bits);
                    var $5658 = Monad$bind$(IO$monad)(Fm$Synth$many$(_file_nams$8, _file_defs$6))((_defs$9 => {
                        var $5659 = Monad$pure$(IO$monad)(Either$right$(Pair$new$(_file_nams$8, _defs$9)));
                        return $5659;
                    }));
                    var $5654 = $5658;
                    break;
            };
            return $5654;
        }));
        return $5653;
    };
    const Fm$Synth$file = x0 => x1 => Fm$Synth$file$(x0, x1);

    function Fm$checker$io$file$(_file$1) {
        var $5660 = Monad$bind$(IO$monad)(Fm$Synth$file$(_file$1, Map$new))((_loaded$2 => {
            var self = _loaded$2;
            switch (self._) {
                case 'Either.left':
                    var $5662 = self.value;
                    var $5663 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("On \'", List$cons$(_file$1, List$cons$("\':", List$nil))))))((_$4 => {
                        var $5664 = IO$print$($5662);
                        return $5664;
                    }));
                    var $5661 = $5663;
                    break;
                case 'Either.right':
                    var $5665 = self.value;
                    var self = $5665;
                    switch (self._) {
                        case 'Pair.new':
                            var $5667 = self.fst;
                            var $5668 = self.snd;
                            var _nams$6 = $5667;
                            var _defs$7 = $5668;
                            var $5669 = IO$print$(Fm$Defs$report$(_defs$7, _nams$6));
                            var $5666 = $5669;
                            break;
                    };
                    var $5661 = $5666;
                    break;
            };
            return $5661;
        }));
        return $5660;
    };
    const Fm$checker$io$file = x0 => Fm$checker$io$file$(x0);

    function IO$purify$(_io$2) {
        var IO$purify$ = (_io$2) => ({
            ctr: 'TCO',
            arg: [_io$2]
        });
        var IO$purify = _io$2 => IO$purify$(_io$2);
        var arg = [_io$2];
        while (true) {
            let [_io$2] = arg;
            var R = (() => {
                var self = _io$2;
                switch (self._) {
                    case 'IO.end':
                        var $5670 = self.value;
                        var $5671 = $5670;
                        return $5671;
                    case 'IO.ask':
                        var $5672 = self.query;
                        var $5673 = self.param;
                        var $5674 = self.then;
                        var $5675 = IO$purify$($5674(""));
                        return $5675;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const IO$purify = x0 => IO$purify$(x0);

    function Fm$checker$code$(_code$1) {
        var self = Fm$Defs$read$("Main.fm", _code$1, Map$new);
        switch (self._) {
            case 'Either.left':
                var $5677 = self.value;
                var $5678 = $5677;
                var $5676 = $5678;
                break;
            case 'Either.right':
                var $5679 = self.value;
                var $5680 = IO$purify$((() => {
                    var _defs$3 = $5679;
                    var _nams$4 = List$mapped$(Map$keys$(_defs$3), Fm$Name$from_bits);
                    var $5681 = Monad$bind$(IO$monad)(Fm$Synth$many$(_nams$4, _defs$3))((_defs$5 => {
                        var $5682 = Monad$pure$(IO$monad)(Fm$Defs$report$(_defs$5, _nams$4));
                        return $5682;
                    }));
                    return $5681;
                })());
                var $5676 = $5680;
                break;
        };
        return $5676;
    };
    const Fm$checker$code = x0 => Fm$checker$code$(x0);

    function Fm$Term$read$(_code$1) {
        var self = Fm$Parser$term(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $5684 = self.idx;
                var $5685 = self.code;
                var $5686 = self.err;
                var $5687 = Maybe$none;
                var $5683 = $5687;
                break;
            case 'Parser.Reply.value':
                var $5688 = self.idx;
                var $5689 = self.code;
                var $5690 = self.val;
                var $5691 = Maybe$some$($5690);
                var $5683 = $5691;
                break;
        };
        return $5683;
    };
    const Fm$Term$read = x0 => Fm$Term$read$(x0);
    const Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        var __$4 = Fm$checker$code;
        var __$5 = Fm$Term$read;
        var $5692 = Fm$checker$io$file$("Main.fm");
        return $5692;
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
        'Pair': Pair,
        'Parser.until1': Parser$until1,
        'Parser.maybe': Parser$maybe,
        'Fm.Parser.item': Fm$Parser$item,
        'Fm.Parser.name': Fm$Parser$name,
        'Parser.get_code': Parser$get_code,
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
        'Fm.Parser.get': Fm$Parser$get,
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
        'Fm.Parser.sigma.type': Fm$Parser$sigma$type,
        'Fm.Parser.some': Fm$Parser$some,
        'Fm.Parser.apply': Fm$Parser$apply,
        'Fm.Name.read': Fm$Name$read,
        'Fm.Parser.list': Fm$Parser$list,
        'Fm.Parser.log': Fm$Parser$log,
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
        'Fm.Parser.open': Fm$Parser$open,
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
        'Fm.Parser.cons': Fm$Parser$cons,
        'Fm.Parser.concat': Fm$Parser$concat,
        'Fm.Parser.string_concat': Fm$Parser$string_concat,
        'Fm.Parser.sigma': Fm$Parser$sigma,
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
        'Fm.Term.equal.extra_holes': Fm$Term$equal$extra_holes,
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
        'IO.purify': IO$purify,
        'Fm.checker.code': Fm$checker$code,
        'Fm.Term.read': Fm$Term$read,
        'Fm': Fm,
    };
})();