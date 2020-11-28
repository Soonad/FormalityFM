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
                                            var $522 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$11 => {
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

    function Fm$Term$def$(_name$1, _expr$2, _body$3) {
        var $538 = ({
            _: 'Fm.Term.def',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $538;
    };
    const Fm$Term$def = x0 => x1 => x2 => Fm$Term$def$(x0, x1, x2);
    const Fm$Parser$def = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $539 = Monad$bind$(Parser$monad)(Fm$Parser$text$("def "))((_$2 => {
            var $540 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $541 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$4 => {
                    var $542 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$5 => {
                        var $543 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(";")))((_$6 => {
                            var $544 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$7 => {
                                var $545 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var $546 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, Fm$Term$def$(_name$3, _expr$5, (_x$9 => {
                                        var $547 = _body$7;
                                        return $547;
                                    }))));
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
    const Fm$Parser$if = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $548 = Monad$bind$(Parser$monad)(Fm$Parser$text$("if "))((_$2 => {
            var $549 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_cond$3 => {
                var $550 = Monad$bind$(Parser$monad)(Fm$Parser$text$("then"))((_$4 => {
                    var $551 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_tcse$5 => {
                        var $552 = Monad$bind$(Parser$monad)(Fm$Parser$text$("else"))((_$6 => {
                            var $553 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_fcse$7 => {
                                var $554 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$8 => {
                                    var _term$9 = _cond$3;
                                    var _term$10 = Fm$Term$app$(_term$9, Fm$Term$lam$("", (_x$10 => {
                                        var $556 = Fm$Term$hol$(Bits$e);
                                        return $556;
                                    })));
                                    var _term$11 = Fm$Term$app$(_term$10, _tcse$5);
                                    var _term$12 = Fm$Term$app$(_term$11, _fcse$7);
                                    var $555 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$8, _term$12));
                                    return $555;
                                }));
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

    function List$mapped$(_as$2, _f$4) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $558 = List$nil;
                var $557 = $558;
                break;
            case 'List.cons':
                var $559 = self.head;
                var $560 = self.tail;
                var $561 = List$cons$(_f$4($559), List$mapped$($560, _f$4));
                var $557 = $561;
                break;
        };
        return $557;
    };
    const List$mapped = x0 => x1 => List$mapped$(x0, x1);

    function Pair$new$(_fst$3, _snd$4) {
        var $562 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $562;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);
    const Fm$backslash = 92;
    const Fm$escapes = List$cons$(Pair$new$("\\b", 8), List$cons$(Pair$new$("\\f", 12), List$cons$(Pair$new$("\\n", 10), List$cons$(Pair$new$("\\r", 13), List$cons$(Pair$new$("\\t", 9), List$cons$(Pair$new$("\\v", 11), List$cons$(Pair$new$(String$cons$(Fm$backslash, String$cons$(Fm$backslash, String$nil)), Fm$backslash), List$cons$(Pair$new$("\\\"", 34), List$cons$(Pair$new$("\\0", 0), List$cons$(Pair$new$("\\\'", 39), List$nil))))))))));
    const Fm$Parser$char$single = Parser$first_of$(List$cons$(Parser$first_of$(List$mapped$(Fm$escapes, (_esc$1 => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $564 = self.fst;
                var $565 = self.snd;
                var $566 = Monad$bind$(Parser$monad)(Parser$text($564))((_$4 => {
                    var $567 = Monad$pure$(Parser$monad)($565);
                    return $567;
                }));
                var $563 = $566;
                break;
        };
        return $563;
    }))), List$cons$(Parser$one, List$nil)));

    function Fm$Term$chr$(_chrx$1) {
        var $568 = ({
            _: 'Fm.Term.chr',
            'chrx': _chrx$1
        });
        return $568;
    };
    const Fm$Term$chr = x0 => Fm$Term$chr$(x0);
    const Fm$Parser$char = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $569 = Monad$bind$(Parser$monad)(Fm$Parser$text$("\'"))((_$2 => {
            var $570 = Monad$bind$(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => {
                var $571 = Monad$bind$(Parser$monad)(Parser$text("\'"))((_$4 => {
                    var $572 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                        var $573 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$chr$(_chrx$3)));
                        return $573;
                    }));
                    return $572;
                }));
                return $571;
            }));
            return $570;
        }));
        return $569;
    }));

    function Fm$Term$str$(_strx$1) {
        var $574 = ({
            _: 'Fm.Term.str',
            'strx': _strx$1
        });
        return $574;
    };
    const Fm$Term$str = x0 => Fm$Term$str$(x0);
    const Fm$Parser$string = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var _quot$2 = String$cons$(34, String$nil);
        var $575 = Monad$bind$(Parser$monad)(Fm$Parser$text$(_quot$2))((_$3 => {
            var $576 = Monad$bind$(Parser$monad)(Parser$until$(Parser$text(_quot$2), Fm$Parser$char$single))((_chrs$4 => {
                var _strx$5 = List$fold$(_chrs$4, String$nil, String$cons);
                var $577 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                    var $578 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$str$(_strx$5)));
                    return $578;
                }));
                return $577;
            }));
            return $576;
        }));
        return $575;
    }));
    const Fm$Parser$pair = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $579 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$2 => {
            var $580 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val0$3 => {
                var $581 = Monad$bind$(Parser$monad)(Fm$Parser$text$(","))((_$4 => {
                    var $582 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$5 => {
                        var $583 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$6 => {
                            var $584 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$7 => {
                                var _term$8 = Fm$Term$ref$("Pair.new");
                                var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                                var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                                var _term$11 = Fm$Term$app$(_term$10, _val0$3);
                                var _term$12 = Fm$Term$app$(_term$11, _val1$5);
                                var $585 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$7, _term$12));
                                return $585;
                            }));
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

    function Fm$Name$read$(_str$1) {
        var $586 = _str$1;
        return $586;
    };
    const Fm$Name$read = x0 => Fm$Name$read$(x0);
    const Fm$Parser$list = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $587 = Monad$bind$(Parser$monad)(Fm$Parser$text$("["))((_$2 => {
            var $588 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("]"), Fm$Parser$item$(Fm$Parser$term)))((_vals$3 => {
                var $589 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $590 = Monad$pure$(Parser$monad)(List$fold$(_vals$3, Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("List.nil")), Fm$Term$hol$(Bits$e)), (_x$5 => _xs$6 => {
                        var _term$7 = Fm$Term$ref$(Fm$Name$read$("List.cons"));
                        var _term$8 = Fm$Term$app$(_term$7, Fm$Term$hol$(Bits$e));
                        var _term$9 = Fm$Term$app$(_term$8, _x$5);
                        var _term$10 = Fm$Term$app$(_term$9, _xs$6);
                        var $591 = Fm$Term$ori$(_orig$4, _term$10);
                        return $591;
                    })));
                    return $590;
                }));
                return $589;
            }));
            return $588;
        }));
        return $587;
    }));
    const Fm$Parser$forin = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $592 = Monad$bind$(Parser$monad)(Fm$Parser$text$("for "))((_$2 => {
            var $593 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_elem$3 => {
                var $594 = Monad$bind$(Parser$monad)(Fm$Parser$text$("in"))((_$4 => {
                    var $595 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_list$5 => {
                        var $596 = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$6 => {
                            var $597 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$7 => {
                                var $598 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$8 => {
                                    var $599 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_loop$9 => {
                                        var $600 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$10 => {
                                            var _term$11 = Fm$Term$ref$("List.for");
                                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                            var _term$13 = Fm$Term$app$(_term$12, _list$5);
                                            var _term$14 = Fm$Term$app$(_term$13, Fm$Term$hol$(Bits$e));
                                            var _term$15 = Fm$Term$app$(_term$14, Fm$Term$ref$(_name$7));
                                            var _lamb$16 = Fm$Term$lam$(_elem$3, (_i$16 => {
                                                var $602 = Fm$Term$lam$(_name$7, (_x$17 => {
                                                    var $603 = _loop$9;
                                                    return $603;
                                                }));
                                                return $602;
                                            }));
                                            var _term$17 = Fm$Term$app$(_term$15, _lamb$16);
                                            var _term$18 = Fm$Term$let$(_name$7, _term$17, (_x$18 => {
                                                var $604 = Fm$Term$ref$(_name$7);
                                                return $604;
                                            }));
                                            var $601 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$10, _term$18));
                                            return $601;
                                        }));
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

    function Fm$Parser$do$statements$(_monad_name$1) {
        var $605 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $606 = Monad$bind$(Parser$monad)(Fm$Parser$text$("var "))((_$3 => {
                var $607 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $608 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $609 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $610 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$7 => {
                                var $611 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $612 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var _term$10 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                                        var _term$11 = Fm$Term$app$(_term$10, Fm$Term$ref$((_monad_name$1 + ".monad")));
                                        var _term$12 = Fm$Term$app$(_term$11, Fm$Term$hol$(Bits$e));
                                        var _term$13 = Fm$Term$app$(_term$12, Fm$Term$hol$(Bits$e));
                                        var _term$14 = Fm$Term$app$(_term$13, _expr$6);
                                        var _term$15 = Fm$Term$app$(_term$14, Fm$Term$lam$(_name$4, (_x$15 => {
                                            var $614 = _body$8;
                                            return $614;
                                        })));
                                        var $613 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, _term$15));
                                        return $613;
                                    }));
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
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $615 = Monad$bind$(Parser$monad)(Fm$Parser$text$("let "))((_$3 => {
                var $616 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
                    var $617 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $618 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$6 => {
                            var $619 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$7 => {
                                var $620 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$8 => {
                                    var $621 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$9 => {
                                        var $622 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$9, Fm$Term$let$(_name$4, _expr$6, (_x$10 => {
                                            var $623 = _body$8;
                                            return $623;
                                        }))));
                                        return $622;
                                    }));
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
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $624 = Monad$bind$(Parser$monad)(Fm$Parser$text$("return "))((_$3 => {
                var $625 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $626 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$5 => {
                        var $627 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.pure"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, _expr$4);
                            var $628 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$10));
                            return $628;
                        }));
                        return $627;
                    }));
                    return $626;
                }));
                return $625;
            }));
            return $624;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $629 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$3 => {
                var $630 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$4 => {
                    var $631 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_monad_name$1))((_body$5 => {
                        var $632 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$2))((_orig$6 => {
                            var _term$7 = Fm$Term$app$(Fm$Term$ref$("Monad.bind"), Fm$Term$ref$(_monad_name$1));
                            var _term$8 = Fm$Term$app$(_term$7, Fm$Term$ref$((_monad_name$1 + ".monad")));
                            var _term$9 = Fm$Term$app$(_term$8, Fm$Term$hol$(Bits$e));
                            var _term$10 = Fm$Term$app$(_term$9, Fm$Term$hol$(Bits$e));
                            var _term$11 = Fm$Term$app$(_term$10, _expr$3);
                            var _term$12 = Fm$Term$app$(_term$11, Fm$Term$lam$("", (_x$12 => {
                                var $634 = _body$5;
                                return $634;
                            })));
                            var $633 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _term$12));
                            return $633;
                        }));
                        return $632;
                    }));
                    return $631;
                }));
                return $630;
            }));
            return $629;
        })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$2 => {
            var $635 = Monad$bind$(Parser$monad)(Fm$Parser$text$(";"))((_$3 => {
                var $636 = Monad$pure$(Parser$monad)(_expr$2);
                return $636;
            }));
            return $635;
        })), List$nil))))));
        return $605;
    };
    const Fm$Parser$do$statements = x0 => Fm$Parser$do$statements$(x0);
    const Fm$Parser$do = Monad$bind$(Parser$monad)(Fm$Parser$text$("do "))((_$1 => {
        var $637 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $638 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$3 => {
                var $639 = Monad$bind$(Parser$monad)(Fm$Parser$do$statements$(_name$2))((_term$4 => {
                    var $640 = Monad$bind$(Parser$monad)(Fm$Parser$text$("}"))((_$5 => {
                        var $641 = Monad$pure$(Parser$monad)(_term$4);
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

    function Fm$Term$nat$(_natx$1) {
        var $642 = ({
            _: 'Fm.Term.nat',
            'natx': _natx$1
        });
        return $642;
    };
    const Fm$Term$nat = x0 => Fm$Term$nat$(x0);

    function Fm$Term$unroll_nat$(_natx$1) {
        var self = _natx$1;
        if (self === 0n) {
            var $644 = Fm$Term$ref$(Fm$Name$read$("Nat.zero"));
            var $643 = $644;
        } else {
            var $645 = (self - 1n);
            var _func$3 = Fm$Term$ref$(Fm$Name$read$("Nat.succ"));
            var _argm$4 = Fm$Term$nat$($645);
            var $646 = Fm$Term$app$(_func$3, _argm$4);
            var $643 = $646;
        };
        return $643;
    };
    const Fm$Term$unroll_nat = x0 => Fm$Term$unroll_nat$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Fm$Term$unroll_chr$bits$(_bits$1) {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $648 = Fm$Term$ref$(Fm$Name$read$("Bits.e"));
                var $647 = $648;
                break;
            case 'o':
                var $649 = self.slice(0, -1);
                var $650 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.o")), Fm$Term$unroll_chr$bits$($649));
                var $647 = $650;
                break;
            case 'i':
                var $651 = self.slice(0, -1);
                var $652 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("Bits.i")), Fm$Term$unroll_chr$bits$($651));
                var $647 = $652;
                break;
        };
        return $647;
    };
    const Fm$Term$unroll_chr$bits = x0 => Fm$Term$unroll_chr$bits$(x0);

    function Fm$Term$unroll_chr$(_chrx$1) {
        var _bits$2 = (u16_to_bits(_chrx$1));
        var _term$3 = Fm$Term$ref$(Fm$Name$read$("Word.from_bits"));
        var _term$4 = Fm$Term$app$(_term$3, Fm$Term$nat$(16n));
        var _term$5 = Fm$Term$app$(_term$4, Fm$Term$unroll_chr$bits$(_bits$2));
        var _term$6 = Fm$Term$app$(Fm$Term$ref$(Fm$Name$read$("U16.new")), _term$5);
        var $653 = _term$6;
        return $653;
    };
    const Fm$Term$unroll_chr = x0 => Fm$Term$unroll_chr$(x0);

    function Fm$Term$unroll_str$(_strx$1) {
        var self = _strx$1;
        if (self.length === 0) {
            var $655 = Fm$Term$ref$(Fm$Name$read$("String.nil"));
            var $654 = $655;
        } else {
            var $656 = self.charCodeAt(0);
            var $657 = self.slice(1);
            var _char$4 = Fm$Term$chr$($656);
            var _term$5 = Fm$Term$ref$(Fm$Name$read$("String.cons"));
            var _term$6 = Fm$Term$app$(_term$5, _char$4);
            var _term$7 = Fm$Term$app$(_term$6, Fm$Term$str$($657));
            var $658 = _term$7;
            var $654 = $658;
        };
        return $654;
    };
    const Fm$Term$unroll_str = x0 => Fm$Term$unroll_str$(x0);

    function Fm$Term$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $660 = self.name;
                var $661 = self.indx;
                var $662 = _term$1;
                var $659 = $662;
                break;
            case 'Fm.Term.ref':
                var $663 = self.name;
                var self = Fm$get$($663, _defs$2);
                switch (self._) {
                    case 'Maybe.none':
                        var $665 = Fm$Term$ref$($663);
                        var $664 = $665;
                        break;
                    case 'Maybe.some':
                        var $666 = self.value;
                        var self = $666;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $668 = self.file;
                                var $669 = self.code;
                                var $670 = self.name;
                                var $671 = self.term;
                                var $672 = self.type;
                                var $673 = self.stat;
                                var $674 = Fm$Term$reduce$($671, _defs$2);
                                var $667 = $674;
                                break;
                        };
                        var $664 = $667;
                        break;
                };
                var $659 = $664;
                break;
            case 'Fm.Term.typ':
                var $675 = _term$1;
                var $659 = $675;
                break;
            case 'Fm.Term.all':
                var $676 = self.eras;
                var $677 = self.self;
                var $678 = self.name;
                var $679 = self.xtyp;
                var $680 = self.body;
                var $681 = _term$1;
                var $659 = $681;
                break;
            case 'Fm.Term.lam':
                var $682 = self.name;
                var $683 = self.body;
                var $684 = _term$1;
                var $659 = $684;
                break;
            case 'Fm.Term.app':
                var $685 = self.func;
                var $686 = self.argm;
                var _func$5 = Fm$Term$reduce$($685, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $688 = self.name;
                        var $689 = self.indx;
                        var $690 = _term$1;
                        var $687 = $690;
                        break;
                    case 'Fm.Term.ref':
                        var $691 = self.name;
                        var $692 = _term$1;
                        var $687 = $692;
                        break;
                    case 'Fm.Term.typ':
                        var $693 = _term$1;
                        var $687 = $693;
                        break;
                    case 'Fm.Term.all':
                        var $694 = self.eras;
                        var $695 = self.self;
                        var $696 = self.name;
                        var $697 = self.xtyp;
                        var $698 = self.body;
                        var $699 = _term$1;
                        var $687 = $699;
                        break;
                    case 'Fm.Term.lam':
                        var $700 = self.name;
                        var $701 = self.body;
                        var $702 = Fm$Term$reduce$($701($686), _defs$2);
                        var $687 = $702;
                        break;
                    case 'Fm.Term.app':
                        var $703 = self.func;
                        var $704 = self.argm;
                        var $705 = _term$1;
                        var $687 = $705;
                        break;
                    case 'Fm.Term.let':
                        var $706 = self.name;
                        var $707 = self.expr;
                        var $708 = self.body;
                        var $709 = _term$1;
                        var $687 = $709;
                        break;
                    case 'Fm.Term.def':
                        var $710 = self.name;
                        var $711 = self.expr;
                        var $712 = self.body;
                        var $713 = _term$1;
                        var $687 = $713;
                        break;
                    case 'Fm.Term.ann':
                        var $714 = self.done;
                        var $715 = self.term;
                        var $716 = self.type;
                        var $717 = _term$1;
                        var $687 = $717;
                        break;
                    case 'Fm.Term.gol':
                        var $718 = self.name;
                        var $719 = self.dref;
                        var $720 = self.verb;
                        var $721 = _term$1;
                        var $687 = $721;
                        break;
                    case 'Fm.Term.hol':
                        var $722 = self.path;
                        var $723 = _term$1;
                        var $687 = $723;
                        break;
                    case 'Fm.Term.nat':
                        var $724 = self.natx;
                        var $725 = _term$1;
                        var $687 = $725;
                        break;
                    case 'Fm.Term.chr':
                        var $726 = self.chrx;
                        var $727 = _term$1;
                        var $687 = $727;
                        break;
                    case 'Fm.Term.str':
                        var $728 = self.strx;
                        var $729 = _term$1;
                        var $687 = $729;
                        break;
                    case 'Fm.Term.cse':
                        var $730 = self.path;
                        var $731 = self.expr;
                        var $732 = self.name;
                        var $733 = self.with;
                        var $734 = self.cses;
                        var $735 = self.moti;
                        var $736 = _term$1;
                        var $687 = $736;
                        break;
                    case 'Fm.Term.ori':
                        var $737 = self.orig;
                        var $738 = self.expr;
                        var $739 = _term$1;
                        var $687 = $739;
                        break;
                };
                var $659 = $687;
                break;
            case 'Fm.Term.let':
                var $740 = self.name;
                var $741 = self.expr;
                var $742 = self.body;
                var $743 = Fm$Term$reduce$($742($741), _defs$2);
                var $659 = $743;
                break;
            case 'Fm.Term.def':
                var $744 = self.name;
                var $745 = self.expr;
                var $746 = self.body;
                var $747 = Fm$Term$reduce$($746($745), _defs$2);
                var $659 = $747;
                break;
            case 'Fm.Term.ann':
                var $748 = self.done;
                var $749 = self.term;
                var $750 = self.type;
                var $751 = Fm$Term$reduce$($749, _defs$2);
                var $659 = $751;
                break;
            case 'Fm.Term.gol':
                var $752 = self.name;
                var $753 = self.dref;
                var $754 = self.verb;
                var $755 = _term$1;
                var $659 = $755;
                break;
            case 'Fm.Term.hol':
                var $756 = self.path;
                var $757 = _term$1;
                var $659 = $757;
                break;
            case 'Fm.Term.nat':
                var $758 = self.natx;
                var $759 = Fm$Term$reduce$(Fm$Term$unroll_nat$($758), _defs$2);
                var $659 = $759;
                break;
            case 'Fm.Term.chr':
                var $760 = self.chrx;
                var $761 = Fm$Term$reduce$(Fm$Term$unroll_chr$($760), _defs$2);
                var $659 = $761;
                break;
            case 'Fm.Term.str':
                var $762 = self.strx;
                var $763 = Fm$Term$reduce$(Fm$Term$unroll_str$($762), _defs$2);
                var $659 = $763;
                break;
            case 'Fm.Term.cse':
                var $764 = self.path;
                var $765 = self.expr;
                var $766 = self.name;
                var $767 = self.with;
                var $768 = self.cses;
                var $769 = self.moti;
                var $770 = _term$1;
                var $659 = $770;
                break;
            case 'Fm.Term.ori':
                var $771 = self.orig;
                var $772 = self.expr;
                var $773 = Fm$Term$reduce$($772, _defs$2);
                var $659 = $773;
                break;
        };
        return $659;
    };
    const Fm$Term$reduce = x0 => x1 => Fm$Term$reduce$(x0, x1);
    const Map$new = ({
        _: 'Map.new'
    });

    function Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$6) {
        var $774 = ({
            _: 'Fm.Def.new',
            'file': _file$1,
            'code': _code$2,
            'name': _name$3,
            'term': _term$4,
            'type': _type$5,
            'stat': _stat$6
        });
        return $774;
    };
    const Fm$Def$new = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Def$new$(x0, x1, x2, x3, x4, x5);
    const Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    const Fm$Parser$case$with = Monad$bind$(Parser$monad)(Fm$Parser$text$("with"))((_$1 => {
        var $775 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $776 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$3 => {
                var $777 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                    var $778 = Monad$bind$(Parser$monad)(Fm$Parser$text$("="))((_$5 => {
                        var $779 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$6 => {
                            var $780 = Monad$pure$(Parser$monad)(Fm$Def$new$("", "", _name$2, _term$6, _type$4, Fm$Status$init));
                            return $780;
                        }));
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
    const Fm$Parser$case$case = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$1 => {
        var $781 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $782 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$3 => {
                var $783 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$text$(",")))((_$4 => {
                    var $784 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _term$3));
                    return $784;
                }));
                return $783;
            }));
            return $782;
        }));
        return $781;
    }));

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $785 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $785;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $788 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $787 = $788;
                        break;
                    case 'Map.tie':
                        var $789 = self.val;
                        var $790 = self.lft;
                        var $791 = self.rgt;
                        var $792 = Map$tie$(Maybe$some$(_val$3), $790, $791);
                        var $787 = $792;
                        break;
                };
                var $786 = $787;
                break;
            case 'o':
                var $793 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $795 = Map$tie$(Maybe$none, Map$set$($793, _val$3, Map$new), Map$new);
                        var $794 = $795;
                        break;
                    case 'Map.tie':
                        var $796 = self.val;
                        var $797 = self.lft;
                        var $798 = self.rgt;
                        var $799 = Map$tie$($796, Map$set$($793, _val$3, $797), $798);
                        var $794 = $799;
                        break;
                };
                var $786 = $794;
                break;
            case 'i':
                var $800 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.new':
                        var $802 = Map$tie$(Maybe$none, Map$new, Map$set$($800, _val$3, Map$new));
                        var $801 = $802;
                        break;
                    case 'Map.tie':
                        var $803 = self.val;
                        var $804 = self.lft;
                        var $805 = self.rgt;
                        var $806 = Map$tie$($803, $804, Map$set$($800, _val$3, $805));
                        var $801 = $806;
                        break;
                };
                var $786 = $801;
                break;
        };
        return $786;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);

    function Map$from_list$(_f$3, _xs$4) {
        var self = _xs$4;
        switch (self._) {
            case 'List.nil':
                var $808 = Map$new;
                var $807 = $808;
                break;
            case 'List.cons':
                var $809 = self.head;
                var $810 = self.tail;
                var self = $809;
                switch (self._) {
                    case 'Pair.new':
                        var $812 = self.fst;
                        var $813 = self.snd;
                        var $814 = Map$set$(_f$3($812), $813, Map$from_list$(_f$3, $810));
                        var $811 = $814;
                        break;
                };
                var $807 = $811;
                break;
        };
        return $807;
    };
    const Map$from_list = x0 => x1 => Map$from_list$(x0, x1);

    function Fm$Term$cse$(_path$1, _expr$2, _name$3, _with$4, _cses$5, _moti$6) {
        var $815 = ({
            _: 'Fm.Term.cse',
            'path': _path$1,
            'expr': _expr$2,
            'name': _name$3,
            'with': _with$4,
            'cses': _cses$5,
            'moti': _moti$6
        });
        return $815;
    };
    const Fm$Term$cse = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$cse$(x0, x1, x2, x3, x4, x5);
    const Fm$Parser$case = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $816 = Monad$bind$(Parser$monad)(Fm$Parser$text$("case "))((_$2 => {
            var $817 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$3 => {
                var $818 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_expr$4 => {
                    var $819 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("as"))((_$5 => {
                        var $820 = Fm$Parser$name1;
                        return $820;
                    }))))((_name$5 => {
                        var self = _name$5;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = Fm$Term$reduce$(_expr$4, Map$new);
                                switch (self._) {
                                    case 'Fm.Term.var':
                                        var $823 = self.name;
                                        var $824 = self.indx;
                                        var $825 = $823;
                                        var $822 = $825;
                                        break;
                                    case 'Fm.Term.ref':
                                        var $826 = self.name;
                                        var $827 = $826;
                                        var $822 = $827;
                                        break;
                                    case 'Fm.Term.typ':
                                        var $828 = Fm$Name$read$("self");
                                        var $822 = $828;
                                        break;
                                    case 'Fm.Term.all':
                                        var $829 = self.eras;
                                        var $830 = self.self;
                                        var $831 = self.name;
                                        var $832 = self.xtyp;
                                        var $833 = self.body;
                                        var $834 = Fm$Name$read$("self");
                                        var $822 = $834;
                                        break;
                                    case 'Fm.Term.lam':
                                        var $835 = self.name;
                                        var $836 = self.body;
                                        var $837 = Fm$Name$read$("self");
                                        var $822 = $837;
                                        break;
                                    case 'Fm.Term.app':
                                        var $838 = self.func;
                                        var $839 = self.argm;
                                        var $840 = Fm$Name$read$("self");
                                        var $822 = $840;
                                        break;
                                    case 'Fm.Term.let':
                                        var $841 = self.name;
                                        var $842 = self.expr;
                                        var $843 = self.body;
                                        var $844 = Fm$Name$read$("self");
                                        var $822 = $844;
                                        break;
                                    case 'Fm.Term.def':
                                        var $845 = self.name;
                                        var $846 = self.expr;
                                        var $847 = self.body;
                                        var $848 = Fm$Name$read$("self");
                                        var $822 = $848;
                                        break;
                                    case 'Fm.Term.ann':
                                        var $849 = self.done;
                                        var $850 = self.term;
                                        var $851 = self.type;
                                        var $852 = Fm$Name$read$("self");
                                        var $822 = $852;
                                        break;
                                    case 'Fm.Term.gol':
                                        var $853 = self.name;
                                        var $854 = self.dref;
                                        var $855 = self.verb;
                                        var $856 = Fm$Name$read$("self");
                                        var $822 = $856;
                                        break;
                                    case 'Fm.Term.hol':
                                        var $857 = self.path;
                                        var $858 = Fm$Name$read$("self");
                                        var $822 = $858;
                                        break;
                                    case 'Fm.Term.nat':
                                        var $859 = self.natx;
                                        var $860 = Fm$Name$read$("self");
                                        var $822 = $860;
                                        break;
                                    case 'Fm.Term.chr':
                                        var $861 = self.chrx;
                                        var $862 = Fm$Name$read$("self");
                                        var $822 = $862;
                                        break;
                                    case 'Fm.Term.str':
                                        var $863 = self.strx;
                                        var $864 = Fm$Name$read$("self");
                                        var $822 = $864;
                                        break;
                                    case 'Fm.Term.cse':
                                        var $865 = self.path;
                                        var $866 = self.expr;
                                        var $867 = self.name;
                                        var $868 = self.with;
                                        var $869 = self.cses;
                                        var $870 = self.moti;
                                        var $871 = Fm$Name$read$("self");
                                        var $822 = $871;
                                        break;
                                    case 'Fm.Term.ori':
                                        var $872 = self.orig;
                                        var $873 = self.expr;
                                        var $874 = Fm$Name$read$("self");
                                        var $822 = $874;
                                        break;
                                };
                                var _name$6 = $822;
                                break;
                            case 'Maybe.some':
                                var $875 = self.value;
                                var $876 = $875;
                                var _name$6 = $876;
                                break;
                        };
                        var $821 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$case$with))((_with$7 => {
                            var $877 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$8 => {
                                var $878 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$case$case))((_cses$9 => {
                                    var _cses$10 = Map$from_list$(Fm$Name$to_bits, _cses$9);
                                    var $879 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$11 => {
                                        var $880 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$12 => {
                                            var $881 = Monad$pure$(Parser$monad)(Maybe$some$(_term$12));
                                            return $881;
                                        }));
                                        return $880;
                                    })), List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("!"))((_$11 => {
                                        var $882 = Monad$pure$(Parser$monad)(Maybe$none);
                                        return $882;
                                    })), List$cons$(Monad$pure$(Parser$monad)(Maybe$some$(Fm$Term$hol$(Bits$e))), List$nil)))))((_moti$11 => {
                                        var $883 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$12 => {
                                            var $884 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$12, Fm$Term$cse$(Bits$e, _expr$4, _name$6, _with$7, _cses$10, _moti$11)));
                                            return $884;
                                        }));
                                        return $883;
                                    }));
                                    return $879;
                                }));
                                return $878;
                            }));
                            return $877;
                        }));
                        return $821;
                    }));
                    return $819;
                }));
                return $818;
            }));
            return $817;
        }));
        return $816;
    }));

    function Parser$digit$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $886 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
            var $885 = $886;
        } else {
            var $887 = self.charCodeAt(0);
            var $888 = self.slice(1);
            var _sidx$5 = Nat$succ$(_idx$1);
            var self = ($887 === 48);
            if (self) {
                var $890 = Parser$Reply$value$(_sidx$5, $888, 0n);
                var $889 = $890;
            } else {
                var self = ($887 === 49);
                if (self) {
                    var $892 = Parser$Reply$value$(_sidx$5, $888, 1n);
                    var $891 = $892;
                } else {
                    var self = ($887 === 50);
                    if (self) {
                        var $894 = Parser$Reply$value$(_sidx$5, $888, 2n);
                        var $893 = $894;
                    } else {
                        var self = ($887 === 51);
                        if (self) {
                            var $896 = Parser$Reply$value$(_sidx$5, $888, 3n);
                            var $895 = $896;
                        } else {
                            var self = ($887 === 52);
                            if (self) {
                                var $898 = Parser$Reply$value$(_sidx$5, $888, 4n);
                                var $897 = $898;
                            } else {
                                var self = ($887 === 53);
                                if (self) {
                                    var $900 = Parser$Reply$value$(_sidx$5, $888, 5n);
                                    var $899 = $900;
                                } else {
                                    var self = ($887 === 54);
                                    if (self) {
                                        var $902 = Parser$Reply$value$(_sidx$5, $888, 6n);
                                        var $901 = $902;
                                    } else {
                                        var self = ($887 === 55);
                                        if (self) {
                                            var $904 = Parser$Reply$value$(_sidx$5, $888, 7n);
                                            var $903 = $904;
                                        } else {
                                            var self = ($887 === 56);
                                            if (self) {
                                                var $906 = Parser$Reply$value$(_sidx$5, $888, 8n);
                                                var $905 = $906;
                                            } else {
                                                var self = ($887 === 57);
                                                if (self) {
                                                    var $908 = Parser$Reply$value$(_sidx$5, $888, 9n);
                                                    var $907 = $908;
                                                } else {
                                                    var $909 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
                                                    var $907 = $909;
                                                };
                                                var $905 = $907;
                                            };
                                            var $903 = $905;
                                        };
                                        var $901 = $903;
                                    };
                                    var $899 = $901;
                                };
                                var $897 = $899;
                            };
                            var $895 = $897;
                        };
                        var $893 = $895;
                    };
                    var $891 = $893;
                };
                var $889 = $891;
            };
            var $885 = $889;
        };
        return $885;
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
                        var $910 = _res$4;
                        return $910;
                    case 'List.cons':
                        var $911 = self.head;
                        var $912 = self.tail;
                        var $913 = Nat$from_base$go$(_b$1, $912, (_b$1 * _p$3), (($911 * _p$3) + _res$4));
                        return $913;
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
                        var $914 = _res$3;
                        return $914;
                    case 'List.cons':
                        var $915 = self.head;
                        var $916 = self.tail;
                        var $917 = List$reverse$go$($916, List$cons$($915, _res$3));
                        return $917;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $918 = List$reverse$go$(_xs$2, List$nil);
        return $918;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Nat$from_base$(_base$1, _ds$2) {
        var $919 = Nat$from_base$go$(_base$1, List$reverse$(_ds$2), 1n, 0n);
        return $919;
    };
    const Nat$from_base = x0 => x1 => Nat$from_base$(x0, x1);
    const Parser$nat = Monad$bind$(Parser$monad)(Parser$many1$(Parser$digit))((_digits$1 => {
        var $920 = Monad$pure$(Parser$monad)(Nat$from_base$(10n, _digits$1));
        return $920;
    }));

    function Bits$tail$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $922 = Bits$e;
                var $921 = $922;
                break;
            case 'o':
                var $923 = self.slice(0, -1);
                var $924 = $923;
                var $921 = $924;
                break;
            case 'i':
                var $925 = self.slice(0, -1);
                var $926 = $925;
                var $921 = $926;
                break;
        };
        return $921;
    };
    const Bits$tail = x0 => Bits$tail$(x0);

    function Bits$inc$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $928 = (Bits$e + '1');
                var $927 = $928;
                break;
            case 'o':
                var $929 = self.slice(0, -1);
                var $930 = ($929 + '1');
                var $927 = $930;
                break;
            case 'i':
                var $931 = self.slice(0, -1);
                var $932 = (Bits$inc$($931) + '0');
                var $927 = $932;
                break;
        };
        return $927;
    };
    const Bits$inc = x0 => Bits$inc$(x0);
    const Nat$to_bits = a0 => (nat_to_bits(a0));

    function Maybe$to_bool$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $934 = Bool$false;
                var $933 = $934;
                break;
            case 'Maybe.some':
                var $935 = self.value;
                var $936 = Bool$true;
                var $933 = $936;
                break;
        };
        return $933;
    };
    const Maybe$to_bool = x0 => Maybe$to_bool$(x0);

    function Fm$Term$gol$(_name$1, _dref$2, _verb$3) {
        var $937 = ({
            _: 'Fm.Term.gol',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3
        });
        return $937;
    };
    const Fm$Term$gol = x0 => x1 => x2 => Fm$Term$gol$(x0, x1, x2);
    const Fm$Parser$goal = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $938 = Monad$bind$(Parser$monad)(Fm$Parser$text$("?"))((_$2 => {
            var $939 = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$3 => {
                var $940 = Monad$bind$(Parser$monad)(Parser$many$(Monad$bind$(Parser$monad)(Fm$Parser$text$("-"))((_$4 => {
                    var $941 = Monad$bind$(Parser$monad)(Parser$nat)((_nat$5 => {
                        var _bits$6 = Bits$reverse$(Bits$tail$(Bits$reverse$((nat_to_bits(_nat$5)))));
                        var $942 = Monad$pure$(Parser$monad)(_bits$6);
                        return $942;
                    }));
                    return $941;
                }))))((_dref$4 => {
                    var $943 = Monad$bind$(Parser$monad)(Monad$bind$(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => {
                        var $944 = Monad$pure$(Parser$monad)(Maybe$to_bool$(_verb$5));
                        return $944;
                    })))((_verb$5 => {
                        var $945 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$6 => {
                            var $946 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, Fm$Term$gol$(_name$3, _dref$4, _verb$5)));
                            return $946;
                        }));
                        return $945;
                    }));
                    return $943;
                }));
                return $940;
            }));
            return $939;
        }));
        return $938;
    }));
    const Fm$Parser$hole = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $947 = Monad$bind$(Parser$monad)(Fm$Parser$text$("_"))((_$2 => {
            var $948 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                var $949 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$hol$(Bits$e)));
                return $949;
            }));
            return $948;
        }));
        return $947;
    }));
    const Fm$Parser$nat = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $950 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$2 => {
            var $951 = Monad$bind$(Parser$monad)(Parser$nat)((_natx$3 => {
                var $952 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$4 => {
                    var $953 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$4, Fm$Term$nat$(_natx$3)));
                    return $953;
                }));
                return $952;
            }));
            return $951;
        }));
        return $950;
    }));
    const String$eql = a0 => a1 => (a0 === a1);

    function Parser$fail$(_error$2, _idx$3, _code$4) {
        var $954 = Parser$Reply$error$(_idx$3, _code$4, _error$2);
        return $954;
    };
    const Parser$fail = x0 => x1 => x2 => Parser$fail$(x0, x1, x2);
    const Fm$Parser$reference = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$1 => {
        var $955 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var self = (_name$2 === "case");
            if (self) {
                var $957 = Parser$fail("Reserved keyword.");
                var $956 = $957;
            } else {
                var self = (_name$2 === "do");
                if (self) {
                    var $959 = Parser$fail("Reserved keyword.");
                    var $958 = $959;
                } else {
                    var self = (_name$2 === "if");
                    if (self) {
                        var $961 = Parser$fail("Reserved keyword.");
                        var $960 = $961;
                    } else {
                        var self = (_name$2 === "let");
                        if (self) {
                            var $963 = Parser$fail("Reserved keyword.");
                            var $962 = $963;
                        } else {
                            var self = (_name$2 === "def");
                            if (self) {
                                var $965 = Parser$fail("Reserved keyword.");
                                var $964 = $965;
                            } else {
                                var $966 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$3 => {
                                    var $967 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$3, Fm$Term$ref$(_name$2)));
                                    return $967;
                                }));
                                var $964 = $966;
                            };
                            var $962 = $964;
                        };
                        var $960 = $962;
                    };
                    var $958 = $960;
                };
                var $956 = $958;
            };
            return $956;
        }));
        return $955;
    }));
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function Fm$Parser$application$(_init$1, _func$2) {
        var $968 = Monad$bind$(Parser$monad)(Parser$text("("))((_$3 => {
            var $969 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$(")"), Fm$Parser$item$(Fm$Parser$term)))((_args$4 => {
                var $970 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _expr$6 = (() => {
                        var $973 = _func$2;
                        var $974 = _args$4;
                        let _f$7 = $973;
                        let _x$6;
                        while ($974._ === 'List.cons') {
                            _x$6 = $974.head;
                            var $973 = Fm$Term$app$(_f$7, _x$6);
                            _f$7 = $973;
                            $974 = $974.tail;
                        }
                        return _f$7;
                    })();
                    var $971 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _expr$6));
                    return $971;
                }));
                return $970;
            }));
            return $969;
        }));
        return $968;
    };
    const Fm$Parser$application = x0 => x1 => Fm$Parser$application$(x0, x1);
    const Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$nil))));

    function Parser$spaces_text$(_text$1) {
        var $975 = Monad$bind$(Parser$monad)(Parser$spaces)((_$2 => {
            var $976 = Parser$text(_text$1);
            return $976;
        }));
        return $975;
    };
    const Parser$spaces_text = x0 => Parser$spaces_text$(x0);

    function Fm$Parser$application$erased$(_init$1, _func$2) {
        var $977 = Monad$bind$(Parser$monad)(Parser$get_index)((_init$3 => {
            var $978 = Monad$bind$(Parser$monad)(Parser$text("<"))((_$4 => {
                var $979 = Monad$bind$(Parser$monad)(Parser$until1$(Parser$spaces_text$(">"), Fm$Parser$item$(Fm$Parser$term)))((_args$5 => {
                    var $980 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$3))((_orig$6 => {
                        var _expr$7 = (() => {
                            var $983 = _func$2;
                            var $984 = _args$5;
                            let _f$8 = $983;
                            let _x$7;
                            while ($984._ === 'List.cons') {
                                _x$7 = $984.head;
                                var $983 = Fm$Term$app$(_f$8, _x$7);
                                _f$8 = $983;
                                $984 = $984.tail;
                            }
                            return _f$8;
                        })();
                        var $981 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$6, _expr$7));
                        return $981;
                    }));
                    return $980;
                }));
                return $979;
            }));
            return $978;
        }));
        return $977;
    };
    const Fm$Parser$application$erased = x0 => x1 => Fm$Parser$application$erased$(x0, x1);

    function Fm$Parser$arrow$(_init$1, _xtyp$2) {
        var $985 = Monad$bind$(Parser$monad)(Fm$Parser$text$("->"))((_$3 => {
            var $986 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_body$4 => {
                var $987 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $988 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$all$(Bool$false, "", "", _xtyp$2, (_s$6 => _x$7 => {
                        var $989 = _body$4;
                        return $989;
                    }))));
                    return $988;
                }));
                return $987;
            }));
            return $986;
        }));
        return $985;
    };
    const Fm$Parser$arrow = x0 => x1 => Fm$Parser$arrow$(x0, x1);

    function Fm$Parser$equality$(_init$1, _val0$2) {
        var $990 = Monad$bind$(Parser$monad)(Fm$Parser$text$("=="))((_$3 => {
            var $991 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_val1$4 => {
                var $992 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var _term$6 = Fm$Term$ref$("Equal");
                    var _term$7 = Fm$Term$app$(_term$6, Fm$Term$hol$(Bits$e));
                    var _term$8 = Fm$Term$app$(_term$7, _val0$2);
                    var _term$9 = Fm$Term$app$(_term$8, _val1$4);
                    var $993 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, _term$9));
                    return $993;
                }));
                return $992;
            }));
            return $991;
        }));
        return $990;
    };
    const Fm$Parser$equality = x0 => x1 => Fm$Parser$equality$(x0, x1);

    function Fm$Term$ann$(_done$1, _term$2, _type$3) {
        var $994 = ({
            _: 'Fm.Term.ann',
            'done': _done$1,
            'term': _term$2,
            'type': _type$3
        });
        return $994;
    };
    const Fm$Term$ann = x0 => x1 => x2 => Fm$Term$ann$(x0, x1, x2);

    function Fm$Parser$annotation$(_init$1, _term$2) {
        var $995 = Monad$bind$(Parser$monad)(Fm$Parser$text$("::"))((_$3 => {
            var $996 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$4 => {
                var $997 = Monad$bind$(Parser$monad)(Fm$Parser$stop$(_init$1))((_orig$5 => {
                    var $998 = Monad$pure$(Parser$monad)(Fm$Term$ori$(_orig$5, Fm$Term$ann$(Bool$false, _term$2, _type$4)));
                    return $998;
                }));
                return $997;
            }));
            return $996;
        }));
        return $995;
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
                        var $1000 = self.idx;
                        var $1001 = self.code;
                        var $1002 = self.err;
                        var $1003 = Parser$Reply$value$(_idx$3, _code$4, _term$2);
                        var $999 = $1003;
                        break;
                    case 'Parser.Reply.value':
                        var $1004 = self.idx;
                        var $1005 = self.code;
                        var $1006 = self.val;
                        var $1007 = Fm$Parser$suffix$(_init$1, $1006, $1004, $1005);
                        var $999 = $1007;
                        break;
                };
                return $999;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Parser$suffix = x0 => x1 => x2 => x3 => Fm$Parser$suffix$(x0, x1, x2, x3);
    const Fm$Parser$term = Monad$bind$(Parser$monad)(Parser$get_code)((_code$1 => {
        var $1008 = Monad$bind$(Parser$monad)(Fm$Parser$init)((_init$2 => {
            var $1009 = Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$type, List$cons$(Fm$Parser$forall, List$cons$(Fm$Parser$lambda, List$cons$(Fm$Parser$lambda$erased, List$cons$(Fm$Parser$lambda$nameless, List$cons$(Fm$Parser$parenthesis, List$cons$(Fm$Parser$letforin, List$cons$(Fm$Parser$let, List$cons$(Fm$Parser$def, List$cons$(Fm$Parser$if, List$cons$(Fm$Parser$char, List$cons$(Fm$Parser$string, List$cons$(Fm$Parser$pair, List$cons$(Fm$Parser$list, List$cons$(Fm$Parser$forin, List$cons$(Fm$Parser$do, List$cons$(Fm$Parser$case, List$cons$(Fm$Parser$goal, List$cons$(Fm$Parser$hole, List$cons$(Fm$Parser$nat, List$cons$(Fm$Parser$reference, List$nil)))))))))))))))))))))))((_term$3 => {
                var $1010 = Fm$Parser$suffix(_init$2)(_term$3);
                return $1010;
            }));
            return $1009;
        }));
        return $1008;
    }));
    const Fm$Parser$name_term = Monad$bind$(Parser$monad)(Fm$Parser$name)((_name$1 => {
        var $1011 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$2 => {
            var $1012 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$3 => {
                var $1013 = Monad$pure$(Parser$monad)(Pair$new$(_name$1, _type$3));
                return $1013;
            }));
            return $1012;
        }));
        return $1011;
    }));

    function Fm$Binder$new$(_eras$1, _name$2, _term$3) {
        var $1014 = ({
            _: 'Fm.Binder.new',
            'eras': _eras$1,
            'name': _name$2,
            'term': _term$3
        });
        return $1014;
    };
    const Fm$Binder$new = x0 => x1 => x2 => Fm$Binder$new$(x0, x1, x2);

    function Fm$Parser$binder$homo$(_eras$1) {
        var $1015 = Monad$bind$(Parser$monad)(Fm$Parser$text$((() => {
            var self = _eras$1;
            if (self) {
                var $1016 = "<";
                return $1016;
            } else {
                var $1017 = "(";
                return $1017;
            };
        })()))((_$2 => {
            var $1018 = Monad$bind$(Parser$monad)(Parser$until1$(Fm$Parser$text$((() => {
                var self = _eras$1;
                if (self) {
                    var $1019 = ">";
                    return $1019;
                } else {
                    var $1020 = ")";
                    return $1020;
                };
            })()), Fm$Parser$item$(Fm$Parser$name_term)))((_bind$3 => {
                var $1021 = Monad$pure$(Parser$monad)(List$mapped$(_bind$3, (_pair$4 => {
                    var self = _pair$4;
                    switch (self._) {
                        case 'Pair.new':
                            var $1023 = self.fst;
                            var $1024 = self.snd;
                            var $1025 = Fm$Binder$new$(_eras$1, $1023, $1024);
                            var $1022 = $1025;
                            break;
                    };
                    return $1022;
                })));
                return $1021;
            }));
            return $1018;
        }));
        return $1015;
    };
    const Fm$Parser$binder$homo = x0 => Fm$Parser$binder$homo$(x0);

    function List$concat$(_as$2, _bs$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                var $1027 = _bs$3;
                var $1026 = $1027;
                break;
            case 'List.cons':
                var $1028 = self.head;
                var $1029 = self.tail;
                var $1030 = List$cons$($1028, List$concat$($1029, _bs$3));
                var $1026 = $1030;
                break;
        };
        return $1026;
    };
    const List$concat = x0 => x1 => List$concat$(x0, x1);

    function List$flatten$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1032 = List$nil;
                var $1031 = $1032;
                break;
            case 'List.cons':
                var $1033 = self.head;
                var $1034 = self.tail;
                var $1035 = List$concat$($1033, List$flatten$($1034));
                var $1031 = $1035;
                break;
        };
        return $1031;
    };
    const List$flatten = x0 => List$flatten$(x0);
    const Fm$Parser$binder = Monad$bind$(Parser$monad)(Parser$many1$(Parser$first_of$(List$cons$(Fm$Parser$binder$homo$(Bool$true), List$cons$(Fm$Parser$binder$homo$(Bool$false), List$nil)))))((_lists$1 => {
        var $1036 = Monad$pure$(Parser$monad)(List$flatten$(_lists$1));
        return $1036;
    }));

    function Fm$Parser$make_forall$(_binds$1, _body$2) {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                var $1038 = _body$2;
                var $1037 = $1038;
                break;
            case 'List.cons':
                var $1039 = self.head;
                var $1040 = self.tail;
                var self = $1039;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1042 = self.eras;
                        var $1043 = self.name;
                        var $1044 = self.term;
                        var $1045 = Fm$Term$all$($1042, "", $1043, $1044, (_s$8 => _x$9 => {
                            var $1046 = Fm$Parser$make_forall$($1040, _body$2);
                            return $1046;
                        }));
                        var $1041 = $1045;
                        break;
                };
                var $1037 = $1041;
                break;
        };
        return $1037;
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
                        var $1047 = Maybe$none;
                        return $1047;
                    case 'List.cons':
                        var $1048 = self.head;
                        var $1049 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $1051 = Maybe$some$($1048);
                            var $1050 = $1051;
                        } else {
                            var $1052 = (self - 1n);
                            var $1053 = List$at$($1052, $1049);
                            var $1050 = $1053;
                        };
                        return $1050;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function List$at_last$(_index$2, _list$3) {
        var $1054 = List$at$(_index$2, List$reverse$(_list$3));
        return $1054;
    };
    const List$at_last = x0 => x1 => List$at_last$(x0, x1);

    function Fm$Term$var$(_name$1, _indx$2) {
        var $1055 = ({
            _: 'Fm.Term.var',
            'name': _name$1,
            'indx': _indx$2
        });
        return $1055;
    };
    const Fm$Term$var = x0 => x1 => Fm$Term$var$(x0, x1);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $1057 = self.fst;
                var $1058 = self.snd;
                var $1059 = $1058;
                var $1056 = $1059;
                break;
        };
        return $1056;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Fm$Name$eql$(_a$1, _b$2) {
        var $1060 = (_a$1 === _b$2);
        return $1060;
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
                        var $1061 = Maybe$none;
                        return $1061;
                    case 'List.cons':
                        var $1062 = self.head;
                        var $1063 = self.tail;
                        var self = $1062;
                        switch (self._) {
                            case 'Pair.new':
                                var $1065 = self.fst;
                                var $1066 = self.snd;
                                var self = Fm$Name$eql$(_name$1, $1065);
                                if (self) {
                                    var $1068 = Maybe$some$($1066);
                                    var $1067 = $1068;
                                } else {
                                    var $1069 = Fm$Context$find$(_name$1, $1063);
                                    var $1067 = $1069;
                                };
                                var $1064 = $1067;
                                break;
                        };
                        return $1064;
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
                        var $1070 = _n$3;
                        return $1070;
                    case 'List.cons':
                        var $1071 = self.head;
                        var $1072 = self.tail;
                        var $1073 = List$length$go$($1072, Nat$succ$(_n$3));
                        return $1073;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$length$go = x0 => x1 => List$length$go$(x0, x1);

    function List$length$(_xs$2) {
        var $1074 = List$length$go$(_xs$2, 0n);
        return $1074;
    };
    const List$length = x0 => List$length$(x0);

    function Fm$Path$o$(_path$1, _x$2) {
        var $1075 = _path$1((_x$2 + '0'));
        return $1075;
    };
    const Fm$Path$o = x0 => x1 => Fm$Path$o$(x0, x1);

    function Fm$Path$i$(_path$1, _x$2) {
        var $1076 = _path$1((_x$2 + '1'));
        return $1076;
    };
    const Fm$Path$i = x0 => x1 => Fm$Path$i$(x0, x1);

    function Fm$Path$to_bits$(_path$1) {
        var $1077 = _path$1(Bits$e);
        return $1077;
    };
    const Fm$Path$to_bits = x0 => Fm$Path$to_bits$(x0);

    function Fm$Term$bind$(_vars$1, _path$2, _term$3) {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $1079 = self.name;
                var $1080 = self.indx;
                var self = List$at_last$($1080, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1082 = Fm$Term$var$($1079, $1080);
                        var $1081 = $1082;
                        break;
                    case 'Maybe.some':
                        var $1083 = self.value;
                        var $1084 = Pair$snd$($1083);
                        var $1081 = $1084;
                        break;
                };
                var $1078 = $1081;
                break;
            case 'Fm.Term.ref':
                var $1085 = self.name;
                var self = Fm$Context$find$($1085, _vars$1);
                switch (self._) {
                    case 'Maybe.none':
                        var $1087 = Fm$Term$ref$($1085);
                        var $1086 = $1087;
                        break;
                    case 'Maybe.some':
                        var $1088 = self.value;
                        var $1089 = $1088;
                        var $1086 = $1089;
                        break;
                };
                var $1078 = $1086;
                break;
            case 'Fm.Term.typ':
                var $1090 = Fm$Term$typ;
                var $1078 = $1090;
                break;
            case 'Fm.Term.all':
                var $1091 = self.eras;
                var $1092 = self.self;
                var $1093 = self.name;
                var $1094 = self.xtyp;
                var $1095 = self.body;
                var _vlen$9 = List$length$(_vars$1);
                var $1096 = Fm$Term$all$($1091, $1092, $1093, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1094), (_s$10 => _x$11 => {
                    var $1097 = Fm$Term$bind$(List$cons$(Pair$new$($1093, _x$11), List$cons$(Pair$new$($1092, _s$10), _vars$1)), Fm$Path$i(_path$2), $1095(Fm$Term$var$($1092, _vlen$9))(Fm$Term$var$($1093, Nat$succ$(_vlen$9))));
                    return $1097;
                }));
                var $1078 = $1096;
                break;
            case 'Fm.Term.lam':
                var $1098 = self.name;
                var $1099 = self.body;
                var _vlen$6 = List$length$(_vars$1);
                var $1100 = Fm$Term$lam$($1098, (_x$7 => {
                    var $1101 = Fm$Term$bind$(List$cons$(Pair$new$($1098, _x$7), _vars$1), Fm$Path$o(_path$2), $1099(Fm$Term$var$($1098, _vlen$6)));
                    return $1101;
                }));
                var $1078 = $1100;
                break;
            case 'Fm.Term.app':
                var $1102 = self.func;
                var $1103 = self.argm;
                var $1104 = Fm$Term$app$(Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1102), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1103));
                var $1078 = $1104;
                break;
            case 'Fm.Term.let':
                var $1105 = self.name;
                var $1106 = self.expr;
                var $1107 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1108 = Fm$Term$let$($1105, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1106), (_x$8 => {
                    var $1109 = Fm$Term$bind$(List$cons$(Pair$new$($1105, _x$8), _vars$1), Fm$Path$i(_path$2), $1107(Fm$Term$var$($1105, _vlen$7)));
                    return $1109;
                }));
                var $1078 = $1108;
                break;
            case 'Fm.Term.def':
                var $1110 = self.name;
                var $1111 = self.expr;
                var $1112 = self.body;
                var _vlen$7 = List$length$(_vars$1);
                var $1113 = Fm$Term$def$($1110, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1111), (_x$8 => {
                    var $1114 = Fm$Term$bind$(List$cons$(Pair$new$($1110, _x$8), _vars$1), Fm$Path$i(_path$2), $1112(Fm$Term$var$($1110, _vlen$7)));
                    return $1114;
                }));
                var $1078 = $1113;
                break;
            case 'Fm.Term.ann':
                var $1115 = self.done;
                var $1116 = self.term;
                var $1117 = self.type;
                var $1118 = Fm$Term$ann$($1115, Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1116), Fm$Term$bind$(_vars$1, Fm$Path$i(_path$2), $1117));
                var $1078 = $1118;
                break;
            case 'Fm.Term.gol':
                var $1119 = self.name;
                var $1120 = self.dref;
                var $1121 = self.verb;
                var $1122 = Fm$Term$gol$($1119, $1120, $1121);
                var $1078 = $1122;
                break;
            case 'Fm.Term.hol':
                var $1123 = self.path;
                var $1124 = Fm$Term$hol$(Fm$Path$to_bits$(_path$2));
                var $1078 = $1124;
                break;
            case 'Fm.Term.nat':
                var $1125 = self.natx;
                var $1126 = Fm$Term$nat$($1125);
                var $1078 = $1126;
                break;
            case 'Fm.Term.chr':
                var $1127 = self.chrx;
                var $1128 = Fm$Term$chr$($1127);
                var $1078 = $1128;
                break;
            case 'Fm.Term.str':
                var $1129 = self.strx;
                var $1130 = Fm$Term$str$($1129);
                var $1078 = $1130;
                break;
            case 'Fm.Term.cse':
                var $1131 = self.path;
                var $1132 = self.expr;
                var $1133 = self.name;
                var $1134 = self.with;
                var $1135 = self.cses;
                var $1136 = self.moti;
                var _expr$10 = Fm$Term$bind$(_vars$1, Fm$Path$o(_path$2), $1132);
                var _name$11 = $1133;
                var _wyth$12 = $1134;
                var _cses$13 = $1135;
                var _moti$14 = $1136;
                var $1137 = Fm$Term$cse$(Fm$Path$to_bits$(_path$2), _expr$10, _name$11, _wyth$12, _cses$13, _moti$14);
                var $1078 = $1137;
                break;
            case 'Fm.Term.ori':
                var $1138 = self.orig;
                var $1139 = self.expr;
                var $1140 = Fm$Term$ori$($1138, Fm$Term$bind$(_vars$1, _path$2, $1139));
                var $1078 = $1140;
                break;
        };
        return $1078;
    };
    const Fm$Term$bind = x0 => x1 => x2 => Fm$Term$bind$(x0, x1, x2);
    const Fm$Status$done = ({
        _: 'Fm.Status.done'
    });

    function Fm$set$(_name$2, _val$3, _map$4) {
        var $1141 = Map$set$((fm_name_to_bits(_name$2)), _val$3, _map$4);
        return $1141;
    };
    const Fm$set = x0 => x1 => x2 => Fm$set$(x0, x1, x2);

    function Fm$define$(_file$1, _code$2, _name$3, _term$4, _type$5, _done$6, _defs$7) {
        var self = _done$6;
        if (self) {
            var $1143 = Fm$Status$done;
            var _stat$8 = $1143;
        } else {
            var $1144 = Fm$Status$init;
            var _stat$8 = $1144;
        };
        var $1142 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$4, _type$5, _stat$8), _defs$7);
        return $1142;
    };
    const Fm$define = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Fm$define$(x0, x1, x2, x3, x4, x5, x6);

    function Fm$Parser$file$def$(_file$1, _code$2, _defs$3) {
        var $1145 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$4 => {
            var $1146 = Monad$bind$(Parser$monad)(Parser$many$(Fm$Parser$binder))((_args$5 => {
                var _args$6 = List$flatten$(_args$5);
                var $1147 = Monad$bind$(Parser$monad)(Fm$Parser$text$(":"))((_$7 => {
                    var $1148 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_type$8 => {
                        var $1149 = Monad$bind$(Parser$monad)(Fm$Parser$term)((_term$9 => {
                            var _type$10 = Fm$Parser$make_forall$(_args$6, _type$8);
                            var _term$11 = Fm$Parser$make_lambda$(List$mapped$(_args$6, (_x$11 => {
                                var self = _x$11;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $1152 = self.eras;
                                        var $1153 = self.name;
                                        var $1154 = self.term;
                                        var $1155 = $1153;
                                        var $1151 = $1155;
                                        break;
                                };
                                return $1151;
                            })), _term$9);
                            var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                                var $1156 = (_x$12 + '1');
                                return $1156;
                            }), _type$10);
                            var _term$13 = Fm$Term$bind$(List$nil, (_x$13 => {
                                var $1157 = (_x$13 + '0');
                                return $1157;
                            }), _term$11);
                            var _defs$14 = Fm$define$(_file$1, _code$2, _name$4, _term$13, _type$12, Bool$false, _defs$3);
                            var $1150 = Monad$pure$(Parser$monad)(_defs$14);
                            return $1150;
                        }));
                        return $1149;
                    }));
                    return $1148;
                }));
                return $1147;
            }));
            return $1146;
        }));
        return $1145;
    };
    const Fm$Parser$file$def = x0 => x1 => x2 => Fm$Parser$file$def$(x0, x1, x2);

    function Maybe$default$(_a$2, _m$3) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $1159 = _a$2;
                var $1158 = $1159;
                break;
            case 'Maybe.some':
                var $1160 = self.value;
                var $1161 = $1160;
                var $1158 = $1161;
                break;
        };
        return $1158;
    };
    const Maybe$default = x0 => x1 => Maybe$default$(x0, x1);

    function Fm$Constructor$new$(_name$1, _args$2, _inds$3) {
        var $1162 = ({
            _: 'Fm.Constructor.new',
            'name': _name$1,
            'args': _args$2,
            'inds': _inds$3
        });
        return $1162;
    };
    const Fm$Constructor$new = x0 => x1 => x2 => Fm$Constructor$new$(x0, x1, x2);

    function Fm$Parser$constructor$(_namespace$1) {
        var $1163 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1164 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => {
                var $1165 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1166 = Fm$Parser$binder;
                    return $1166;
                }))))((_inds$4 => {
                    var _args$5 = Maybe$default$(List$nil, _args$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1167 = Monad$pure$(Parser$monad)(Fm$Constructor$new$(_name$2, _args$5, _inds$6));
                    return $1167;
                }));
                return $1165;
            }));
            return $1164;
        }));
        return $1163;
    };
    const Fm$Parser$constructor = x0 => Fm$Parser$constructor$(x0);

    function Fm$Datatype$new$(_name$1, _pars$2, _inds$3, _ctrs$4) {
        var $1168 = ({
            _: 'Fm.Datatype.new',
            'name': _name$1,
            'pars': _pars$2,
            'inds': _inds$3,
            'ctrs': _ctrs$4
        });
        return $1168;
    };
    const Fm$Datatype$new = x0 => x1 => x2 => x3 => Fm$Datatype$new$(x0, x1, x2, x3);
    const Fm$Parser$datatype = Monad$bind$(Parser$monad)(Fm$Parser$text$("type "))((_$1 => {
        var $1169 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_name$2 => {
            var $1170 = Monad$bind$(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => {
                var $1171 = Monad$bind$(Parser$monad)(Parser$maybe(Monad$bind$(Parser$monad)(Fm$Parser$text$("~"))((_$4 => {
                    var $1172 = Fm$Parser$binder;
                    return $1172;
                }))))((_inds$4 => {
                    var _pars$5 = Maybe$default$(List$nil, _pars$3);
                    var _inds$6 = Maybe$default$(List$nil, _inds$4);
                    var $1173 = Monad$bind$(Parser$monad)(Fm$Parser$text$("{"))((_$7 => {
                        var $1174 = Monad$bind$(Parser$monad)(Parser$until$(Fm$Parser$text$("}"), Fm$Parser$item$(Fm$Parser$constructor$(_name$2))))((_ctrs$8 => {
                            var $1175 = Monad$pure$(Parser$monad)(Fm$Datatype$new$(_name$2, _pars$5, _inds$6, _ctrs$8));
                            return $1175;
                        }));
                        return $1174;
                    }));
                    return $1173;
                }));
                return $1171;
            }));
            return $1170;
        }));
        return $1169;
    }));

    function Fm$Datatype$build_term$motive$go$(_type$1, _name$2, _inds$3) {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1178 = self.name;
                        var $1179 = self.pars;
                        var $1180 = self.inds;
                        var $1181 = self.ctrs;
                        var _slf$8 = Fm$Term$ref$(_name$2);
                        var _slf$9 = (() => {
                            var $1184 = _slf$8;
                            var $1185 = $1179;
                            let _slf$10 = $1184;
                            let _var$9;
                            while ($1185._ === 'List.cons') {
                                _var$9 = $1185.head;
                                var $1184 = Fm$Term$app$(_slf$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1186 = self.eras;
                                            var $1187 = self.name;
                                            var $1188 = self.term;
                                            var $1189 = $1187;
                                            return $1189;
                                    };
                                })()));
                                _slf$10 = $1184;
                                $1185 = $1185.tail;
                            }
                            return _slf$10;
                        })();
                        var _slf$10 = (() => {
                            var $1191 = _slf$9;
                            var $1192 = $1180;
                            let _slf$11 = $1191;
                            let _var$10;
                            while ($1192._ === 'List.cons') {
                                _var$10 = $1192.head;
                                var $1191 = Fm$Term$app$(_slf$11, Fm$Term$ref$((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1193 = self.eras;
                                            var $1194 = self.name;
                                            var $1195 = self.term;
                                            var $1196 = $1194;
                                            return $1196;
                                    };
                                })()));
                                _slf$11 = $1191;
                                $1192 = $1192.tail;
                            }
                            return _slf$11;
                        })();
                        var $1182 = Fm$Term$all$(Bool$false, "", "", _slf$10, (_s$11 => _x$12 => {
                            var $1197 = Fm$Term$typ;
                            return $1197;
                        }));
                        var $1177 = $1182;
                        break;
                };
                var $1176 = $1177;
                break;
            case 'List.cons':
                var $1198 = self.head;
                var $1199 = self.tail;
                var self = $1198;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1201 = self.eras;
                        var $1202 = self.name;
                        var $1203 = self.term;
                        var $1204 = Fm$Term$all$($1201, "", $1202, $1203, (_s$9 => _x$10 => {
                            var $1205 = Fm$Datatype$build_term$motive$go$(_type$1, _name$2, $1199);
                            return $1205;
                        }));
                        var $1200 = $1204;
                        break;
                };
                var $1176 = $1200;
                break;
        };
        return $1176;
    };
    const Fm$Datatype$build_term$motive$go = x0 => x1 => x2 => Fm$Datatype$build_term$motive$go$(x0, x1, x2);

    function Fm$Datatype$build_term$motive$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1207 = self.name;
                var $1208 = self.pars;
                var $1209 = self.inds;
                var $1210 = self.ctrs;
                var $1211 = Fm$Datatype$build_term$motive$go$(_type$1, $1207, $1209);
                var $1206 = $1211;
                break;
        };
        return $1206;
    };
    const Fm$Datatype$build_term$motive = x0 => Fm$Datatype$build_term$motive$(x0);

    function Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, _args$3) {
        var self = _args$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1214 = self.name;
                        var $1215 = self.pars;
                        var $1216 = self.inds;
                        var $1217 = self.ctrs;
                        var self = _ctor$2;
                        switch (self._) {
                            case 'Fm.Constructor.new':
                                var $1219 = self.name;
                                var $1220 = self.args;
                                var $1221 = self.inds;
                                var _ret$11 = Fm$Term$ref$(Fm$Name$read$("P"));
                                var _ret$12 = (() => {
                                    var $1224 = _ret$11;
                                    var $1225 = $1221;
                                    let _ret$13 = $1224;
                                    let _var$12;
                                    while ($1225._ === 'List.cons') {
                                        _var$12 = $1225.head;
                                        var $1224 = Fm$Term$app$(_ret$13, (() => {
                                            var self = _var$12;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1226 = self.eras;
                                                    var $1227 = self.name;
                                                    var $1228 = self.term;
                                                    var $1229 = $1228;
                                                    return $1229;
                                            };
                                        })());
                                        _ret$13 = $1224;
                                        $1225 = $1225.tail;
                                    }
                                    return _ret$13;
                                })();
                                var _ctr$13 = String$flatten$(List$cons$($1214, List$cons$(Fm$Name$read$("."), List$cons$($1219, List$nil))));
                                var _slf$14 = Fm$Term$ref$(_ctr$13);
                                var _slf$15 = (() => {
                                    var $1231 = _slf$14;
                                    var $1232 = $1215;
                                    let _slf$16 = $1231;
                                    let _var$15;
                                    while ($1232._ === 'List.cons') {
                                        _var$15 = $1232.head;
                                        var $1231 = Fm$Term$app$(_slf$16, Fm$Term$ref$((() => {
                                            var self = _var$15;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1233 = self.eras;
                                                    var $1234 = self.name;
                                                    var $1235 = self.term;
                                                    var $1236 = $1234;
                                                    return $1236;
                                            };
                                        })()));
                                        _slf$16 = $1231;
                                        $1232 = $1232.tail;
                                    }
                                    return _slf$16;
                                })();
                                var _slf$16 = (() => {
                                    var $1238 = _slf$15;
                                    var $1239 = $1220;
                                    let _slf$17 = $1238;
                                    let _var$16;
                                    while ($1239._ === 'List.cons') {
                                        _var$16 = $1239.head;
                                        var $1238 = Fm$Term$app$(_slf$17, Fm$Term$ref$((() => {
                                            var self = _var$16;
                                            switch (self._) {
                                                case 'Fm.Binder.new':
                                                    var $1240 = self.eras;
                                                    var $1241 = self.name;
                                                    var $1242 = self.term;
                                                    var $1243 = $1241;
                                                    return $1243;
                                            };
                                        })()));
                                        _slf$17 = $1238;
                                        $1239 = $1239.tail;
                                    }
                                    return _slf$17;
                                })();
                                var $1222 = Fm$Term$app$(_ret$12, _slf$16);
                                var $1218 = $1222;
                                break;
                        };
                        var $1213 = $1218;
                        break;
                };
                var $1212 = $1213;
                break;
            case 'List.cons':
                var $1244 = self.head;
                var $1245 = self.tail;
                var self = $1244;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1247 = self.eras;
                        var $1248 = self.name;
                        var $1249 = self.term;
                        var _eras$9 = $1247;
                        var _name$10 = $1248;
                        var _xtyp$11 = $1249;
                        var _body$12 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1245);
                        var $1250 = Fm$Term$all$(_eras$9, "", _name$10, _xtyp$11, (_s$13 => _x$14 => {
                            var $1251 = _body$12;
                            return $1251;
                        }));
                        var $1246 = $1250;
                        break;
                };
                var $1212 = $1246;
                break;
        };
        return $1212;
    };
    const Fm$Datatype$build_term$constructor$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructor$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructor$(_type$1, _ctor$2) {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $1253 = self.name;
                var $1254 = self.args;
                var $1255 = self.inds;
                var $1256 = Fm$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $1254);
                var $1252 = $1256;
                break;
        };
        return $1252;
    };
    const Fm$Datatype$build_term$constructor = x0 => x1 => Fm$Datatype$build_term$constructor$(x0, x1);

    function Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Fm.Datatype.new':
                        var $1259 = self.name;
                        var $1260 = self.pars;
                        var $1261 = self.inds;
                        var $1262 = self.ctrs;
                        var _ret$8 = Fm$Term$ref$(Fm$Name$read$("P"));
                        var _ret$9 = (() => {
                            var $1265 = _ret$8;
                            var $1266 = $1261;
                            let _ret$10 = $1265;
                            let _var$9;
                            while ($1266._ === 'List.cons') {
                                _var$9 = $1266.head;
                                var $1265 = Fm$Term$app$(_ret$10, Fm$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1267 = self.eras;
                                            var $1268 = self.name;
                                            var $1269 = self.term;
                                            var $1270 = $1268;
                                            return $1270;
                                    };
                                })()));
                                _ret$10 = $1265;
                                $1266 = $1266.tail;
                            }
                            return _ret$10;
                        })();
                        var $1263 = Fm$Term$app$(_ret$9, Fm$Term$ref$((_name$2 + ".Self")));
                        var $1258 = $1263;
                        break;
                };
                var $1257 = $1258;
                break;
            case 'List.cons':
                var $1271 = self.head;
                var $1272 = self.tail;
                var self = $1271;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1274 = self.name;
                        var $1275 = self.args;
                        var $1276 = self.inds;
                        var $1277 = Fm$Term$all$(Bool$false, "", $1274, Fm$Datatype$build_term$constructor$(_type$1, $1271), (_s$9 => _x$10 => {
                            var $1278 = Fm$Datatype$build_term$constructors$go$(_type$1, _name$2, $1272);
                            return $1278;
                        }));
                        var $1273 = $1277;
                        break;
                };
                var $1257 = $1273;
                break;
        };
        return $1257;
    };
    const Fm$Datatype$build_term$constructors$go = x0 => x1 => x2 => Fm$Datatype$build_term$constructors$go$(x0, x1, x2);

    function Fm$Datatype$build_term$constructors$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1280 = self.name;
                var $1281 = self.pars;
                var $1282 = self.inds;
                var $1283 = self.ctrs;
                var $1284 = Fm$Datatype$build_term$constructors$go$(_type$1, $1280, $1283);
                var $1279 = $1284;
                break;
        };
        return $1279;
    };
    const Fm$Datatype$build_term$constructors = x0 => Fm$Datatype$build_term$constructors$(x0);

    function Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1287 = Fm$Term$all$(Bool$true, (_name$2 + ".Self"), Fm$Name$read$("P"), Fm$Datatype$build_term$motive$(_type$1), (_s$5 => _x$6 => {
                            var $1288 = Fm$Datatype$build_term$constructors$(_type$1);
                            return $1288;
                        }));
                        var $1286 = $1287;
                        break;
                    case 'List.cons':
                        var $1289 = self.head;
                        var $1290 = self.tail;
                        var self = $1289;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1292 = self.eras;
                                var $1293 = self.name;
                                var $1294 = self.term;
                                var $1295 = Fm$Term$lam$($1293, (_x$10 => {
                                    var $1296 = Fm$Datatype$build_term$go$(_type$1, _name$2, _pars$3, $1290);
                                    return $1296;
                                }));
                                var $1291 = $1295;
                                break;
                        };
                        var $1286 = $1291;
                        break;
                };
                var $1285 = $1286;
                break;
            case 'List.cons':
                var $1297 = self.head;
                var $1298 = self.tail;
                var self = $1297;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1300 = self.eras;
                        var $1301 = self.name;
                        var $1302 = self.term;
                        var $1303 = Fm$Term$lam$($1301, (_x$10 => {
                            var $1304 = Fm$Datatype$build_term$go$(_type$1, _name$2, $1298, _inds$4);
                            return $1304;
                        }));
                        var $1299 = $1303;
                        break;
                };
                var $1285 = $1299;
                break;
        };
        return $1285;
    };
    const Fm$Datatype$build_term$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_term$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_term$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1306 = self.name;
                var $1307 = self.pars;
                var $1308 = self.inds;
                var $1309 = self.ctrs;
                var $1310 = Fm$Datatype$build_term$go$(_type$1, $1306, $1307, $1308);
                var $1305 = $1310;
                break;
        };
        return $1305;
    };
    const Fm$Datatype$build_term = x0 => Fm$Datatype$build_term$(x0);

    function Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.nil':
                        var $1313 = Fm$Term$typ;
                        var $1312 = $1313;
                        break;
                    case 'List.cons':
                        var $1314 = self.head;
                        var $1315 = self.tail;
                        var self = $1314;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1317 = self.eras;
                                var $1318 = self.name;
                                var $1319 = self.term;
                                var $1320 = Fm$Term$all$(Bool$false, "", $1318, $1319, (_s$10 => _x$11 => {
                                    var $1321 = Fm$Datatype$build_type$go$(_type$1, _name$2, _pars$3, $1315);
                                    return $1321;
                                }));
                                var $1316 = $1320;
                                break;
                        };
                        var $1312 = $1316;
                        break;
                };
                var $1311 = $1312;
                break;
            case 'List.cons':
                var $1322 = self.head;
                var $1323 = self.tail;
                var self = $1322;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1325 = self.eras;
                        var $1326 = self.name;
                        var $1327 = self.term;
                        var $1328 = Fm$Term$all$(Bool$false, "", $1326, $1327, (_s$10 => _x$11 => {
                            var $1329 = Fm$Datatype$build_type$go$(_type$1, _name$2, $1323, _inds$4);
                            return $1329;
                        }));
                        var $1324 = $1328;
                        break;
                };
                var $1311 = $1324;
                break;
        };
        return $1311;
    };
    const Fm$Datatype$build_type$go = x0 => x1 => x2 => x3 => Fm$Datatype$build_type$go$(x0, x1, x2, x3);

    function Fm$Datatype$build_type$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1331 = self.name;
                var $1332 = self.pars;
                var $1333 = self.inds;
                var $1334 = self.ctrs;
                var $1335 = Fm$Datatype$build_type$go$(_type$1, $1331, $1332, $1333);
                var $1330 = $1335;
                break;
        };
        return $1330;
    };
    const Fm$Datatype$build_type = x0 => Fm$Datatype$build_type$(x0);

    function Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1338 = self.name;
                        var $1339 = self.args;
                        var $1340 = self.inds;
                        var _ret$7 = Fm$Term$ref$($1338);
                        var _ret$8 = (() => {
                            var $1343 = _ret$7;
                            var $1344 = $1339;
                            let _ret$9 = $1343;
                            let _arg$8;
                            while ($1344._ === 'List.cons') {
                                _arg$8 = $1344.head;
                                var $1343 = Fm$Term$app$(_ret$9, Fm$Term$ref$((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $1345 = self.eras;
                                            var $1346 = self.name;
                                            var $1347 = self.term;
                                            var $1348 = $1346;
                                            return $1348;
                                    };
                                })()));
                                _ret$9 = $1343;
                                $1344 = $1344.tail;
                            }
                            return _ret$9;
                        })();
                        var $1341 = _ret$8;
                        var $1337 = $1341;
                        break;
                };
                var $1336 = $1337;
                break;
            case 'List.cons':
                var $1349 = self.head;
                var $1350 = self.tail;
                var self = $1349;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1352 = self.name;
                        var $1353 = self.args;
                        var $1354 = self.inds;
                        var $1355 = Fm$Term$lam$($1352, (_x$9 => {
                            var $1356 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1350);
                            return $1356;
                        }));
                        var $1351 = $1355;
                        break;
                };
                var $1336 = $1351;
                break;
        };
        return $1336;
    };
    const Fm$Constructor$build_term$opt$go = x0 => x1 => x2 => Fm$Constructor$build_term$opt$go$(x0, x1, x2);

    function Fm$Constructor$build_term$opt$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1358 = self.name;
                var $1359 = self.pars;
                var $1360 = self.inds;
                var $1361 = self.ctrs;
                var $1362 = Fm$Constructor$build_term$opt$go$(_type$1, _ctor$2, $1361);
                var $1357 = $1362;
                break;
        };
        return $1357;
    };
    const Fm$Constructor$build_term$opt = x0 => x1 => Fm$Constructor$build_term$opt$(x0, x1);

    function Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.nil':
                        var $1365 = Fm$Term$lam$(Fm$Name$read$("P"), (_x$6 => {
                            var $1366 = Fm$Constructor$build_term$opt$(_type$1, _ctor$2);
                            return $1366;
                        }));
                        var $1364 = $1365;
                        break;
                    case 'List.cons':
                        var $1367 = self.head;
                        var $1368 = self.tail;
                        var self = $1367;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1370 = self.eras;
                                var $1371 = self.name;
                                var $1372 = self.term;
                                var $1373 = Fm$Term$lam$($1371, (_x$11 => {
                                    var $1374 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, $1368);
                                    return $1374;
                                }));
                                var $1369 = $1373;
                                break;
                        };
                        var $1364 = $1369;
                        break;
                };
                var $1363 = $1364;
                break;
            case 'List.cons':
                var $1375 = self.head;
                var $1376 = self.tail;
                var self = $1375;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1378 = self.eras;
                        var $1379 = self.name;
                        var $1380 = self.term;
                        var $1381 = Fm$Term$lam$($1379, (_x$11 => {
                            var $1382 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, $1376, _args$5);
                            return $1382;
                        }));
                        var $1377 = $1381;
                        break;
                };
                var $1363 = $1377;
                break;
        };
        return $1363;
    };
    const Fm$Constructor$build_term$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_term$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_term$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1384 = self.name;
                var $1385 = self.pars;
                var $1386 = self.inds;
                var $1387 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1389 = self.name;
                        var $1390 = self.args;
                        var $1391 = self.inds;
                        var $1392 = Fm$Constructor$build_term$go$(_type$1, _ctor$2, $1384, $1385, $1390);
                        var $1388 = $1392;
                        break;
                };
                var $1383 = $1388;
                break;
        };
        return $1383;
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
                                var $1396 = self.name;
                                var $1397 = self.pars;
                                var $1398 = self.inds;
                                var $1399 = self.ctrs;
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $1401 = self.name;
                                        var $1402 = self.args;
                                        var $1403 = self.inds;
                                        var _type$13 = Fm$Term$ref$(_name$3);
                                        var _type$14 = (() => {
                                            var $1406 = _type$13;
                                            var $1407 = $1397;
                                            let _type$15 = $1406;
                                            let _var$14;
                                            while ($1407._ === 'List.cons') {
                                                _var$14 = $1407.head;
                                                var $1406 = Fm$Term$app$(_type$15, Fm$Term$ref$((() => {
                                                    var self = _var$14;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1408 = self.eras;
                                                            var $1409 = self.name;
                                                            var $1410 = self.term;
                                                            var $1411 = $1409;
                                                            return $1411;
                                                    };
                                                })()));
                                                _type$15 = $1406;
                                                $1407 = $1407.tail;
                                            }
                                            return _type$15;
                                        })();
                                        var _type$15 = (() => {
                                            var $1413 = _type$14;
                                            var $1414 = $1403;
                                            let _type$16 = $1413;
                                            let _var$15;
                                            while ($1414._ === 'List.cons') {
                                                _var$15 = $1414.head;
                                                var $1413 = Fm$Term$app$(_type$16, (() => {
                                                    var self = _var$15;
                                                    switch (self._) {
                                                        case 'Fm.Binder.new':
                                                            var $1415 = self.eras;
                                                            var $1416 = self.name;
                                                            var $1417 = self.term;
                                                            var $1418 = $1417;
                                                            return $1418;
                                                    };
                                                })());
                                                _type$16 = $1413;
                                                $1414 = $1414.tail;
                                            }
                                            return _type$16;
                                        })();
                                        var $1404 = _type$15;
                                        var $1400 = $1404;
                                        break;
                                };
                                var $1395 = $1400;
                                break;
                        };
                        var $1394 = $1395;
                        break;
                    case 'List.cons':
                        var $1419 = self.head;
                        var $1420 = self.tail;
                        var self = $1419;
                        switch (self._) {
                            case 'Fm.Binder.new':
                                var $1422 = self.eras;
                                var $1423 = self.name;
                                var $1424 = self.term;
                                var $1425 = Fm$Term$all$($1422, "", $1423, $1424, (_s$11 => _x$12 => {
                                    var $1426 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, $1420);
                                    return $1426;
                                }));
                                var $1421 = $1425;
                                break;
                        };
                        var $1394 = $1421;
                        break;
                };
                var $1393 = $1394;
                break;
            case 'List.cons':
                var $1427 = self.head;
                var $1428 = self.tail;
                var self = $1427;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $1430 = self.eras;
                        var $1431 = self.name;
                        var $1432 = self.term;
                        var $1433 = Fm$Term$all$($1430, "", $1431, $1432, (_s$11 => _x$12 => {
                            var $1434 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, $1428, _args$5);
                            return $1434;
                        }));
                        var $1429 = $1433;
                        break;
                };
                var $1393 = $1429;
                break;
        };
        return $1393;
    };
    const Fm$Constructor$build_type$go = x0 => x1 => x2 => x3 => x4 => Fm$Constructor$build_type$go$(x0, x1, x2, x3, x4);

    function Fm$Constructor$build_type$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $1436 = self.name;
                var $1437 = self.pars;
                var $1438 = self.inds;
                var $1439 = self.ctrs;
                var self = _ctor$2;
                switch (self._) {
                    case 'Fm.Constructor.new':
                        var $1441 = self.name;
                        var $1442 = self.args;
                        var $1443 = self.inds;
                        var $1444 = Fm$Constructor$build_type$go$(_type$1, _ctor$2, $1436, $1437, $1442);
                        var $1440 = $1444;
                        break;
                };
                var $1435 = $1440;
                break;
        };
        return $1435;
    };
    const Fm$Constructor$build_type = x0 => x1 => Fm$Constructor$build_type$(x0, x1);

    function Fm$Parser$file$adt$(_file$1, _code$2, _defs$3) {
        var $1445 = Monad$bind$(Parser$monad)(Fm$Parser$datatype)((_adt$4 => {
            var self = _adt$4;
            switch (self._) {
                case 'Fm.Datatype.new':
                    var $1447 = self.name;
                    var $1448 = self.pars;
                    var $1449 = self.inds;
                    var $1450 = self.ctrs;
                    var _term$9 = Fm$Datatype$build_term$(_adt$4);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $1452 = (_x$10 + '1');
                        return $1452;
                    }), _term$9);
                    var _type$11 = Fm$Datatype$build_type$(_adt$4);
                    var _type$12 = Fm$Term$bind$(List$nil, (_x$12 => {
                        var $1453 = (_x$12 + '0');
                        return $1453;
                    }), _type$11);
                    var _defs$13 = Fm$define$(_file$1, _code$2, $1447, _term$10, _type$12, Bool$false, _defs$3);
                    var _defs$14 = List$fold$($1450, _defs$13, (_ctr$14 => _defs$15 => {
                        var _typ_name$16 = $1447;
                        var _ctr_name$17 = String$flatten$(List$cons$(_typ_name$16, List$cons$(Fm$Name$read$("."), List$cons$((() => {
                            var self = _ctr$14;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $1455 = self.name;
                                    var $1456 = self.args;
                                    var $1457 = self.inds;
                                    var $1458 = $1455;
                                    return $1458;
                            };
                        })(), List$nil))));
                        var _ctr_term$18 = Fm$Constructor$build_term$(_adt$4, _ctr$14);
                        var _ctr_term$19 = Fm$Term$bind$(List$nil, (_x$19 => {
                            var $1459 = (_x$19 + '1');
                            return $1459;
                        }), _ctr_term$18);
                        var _ctr_type$20 = Fm$Constructor$build_type$(_adt$4, _ctr$14);
                        var _ctr_type$21 = Fm$Term$bind$(List$nil, (_x$21 => {
                            var $1460 = (_x$21 + '0');
                            return $1460;
                        }), _ctr_type$20);
                        var $1454 = Fm$define$(_file$1, _code$2, _ctr_name$17, _ctr_term$19, _ctr_type$21, Bool$false, _defs$15);
                        return $1454;
                    }));
                    var $1451 = Monad$pure$(Parser$monad)(_defs$14);
                    var $1446 = $1451;
                    break;
            };
            return $1446;
        }));
        return $1445;
    };
    const Fm$Parser$file$adt = x0 => x1 => x2 => Fm$Parser$file$adt$(x0, x1, x2);

    function Parser$eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $1462 = Parser$Reply$value$(_idx$1, _code$2, Unit$new);
            var $1461 = $1462;
        } else {
            var $1463 = self.charCodeAt(0);
            var $1464 = self.slice(1);
            var $1465 = Parser$Reply$error$(_idx$1, _code$2, "Expected end-of-file.");
            var $1461 = $1465;
        };
        return $1461;
    };
    const Parser$eof = x0 => x1 => Parser$eof$(x0, x1);

    function Fm$Parser$file$end$(_file$1, _code$2, _defs$3) {
        var $1466 = Monad$bind$(Parser$monad)(Fm$Parser$spaces)((_$4 => {
            var $1467 = Monad$bind$(Parser$monad)(Parser$eof)((_$5 => {
                var $1468 = Monad$pure$(Parser$monad)(_defs$3);
                return $1468;
            }));
            return $1467;
        }));
        return $1466;
    };
    const Fm$Parser$file$end = x0 => x1 => x2 => Fm$Parser$file$end$(x0, x1, x2);

    function Fm$Parser$file$(_file$1, _code$2, _defs$3) {
        var $1469 = Monad$bind$(Parser$monad)(Parser$is_eof)((_stop$4 => {
            var self = _stop$4;
            if (self) {
                var $1471 = Monad$pure$(Parser$monad)(_defs$3);
                var $1470 = $1471;
            } else {
                var $1472 = Parser$first_of$(List$cons$(Monad$bind$(Parser$monad)(Fm$Parser$text$("#"))((_$5 => {
                    var $1473 = Monad$bind$(Parser$monad)(Fm$Parser$name1)((_file$6 => {
                        var $1474 = Fm$Parser$file$(_file$6, _code$2, _defs$3);
                        return $1474;
                    }));
                    return $1473;
                })), List$cons$(Monad$bind$(Parser$monad)(Parser$first_of$(List$cons$(Fm$Parser$file$def$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$adt$(_file$1, _code$2, _defs$3), List$cons$(Fm$Parser$file$end$(_file$1, _code$2, _defs$3), List$nil)))))((_defs$5 => {
                    var $1475 = Fm$Parser$file$(_file$1, _code$2, _defs$5);
                    return $1475;
                })), List$nil)));
                var $1470 = $1472;
            };
            return $1470;
        }));
        return $1469;
    };
    const Fm$Parser$file = x0 => x1 => x2 => Fm$Parser$file$(x0, x1, x2);

    function Either$(_A$1, _B$2) {
        var $1476 = null;
        return $1476;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function String$join$go$(_sep$1, _list$2, _fst$3) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $1478 = "";
                var $1477 = $1478;
                break;
            case 'List.cons':
                var $1479 = self.head;
                var $1480 = self.tail;
                var $1481 = String$flatten$(List$cons$((() => {
                    var self = _fst$3;
                    if (self) {
                        var $1482 = "";
                        return $1482;
                    } else {
                        var $1483 = _sep$1;
                        return $1483;
                    };
                })(), List$cons$($1479, List$cons$(String$join$go$(_sep$1, $1480, Bool$false), List$nil))));
                var $1477 = $1481;
                break;
        };
        return $1477;
    };
    const String$join$go = x0 => x1 => x2 => String$join$go$(x0, x1, x2);

    function String$join$(_sep$1, _list$2) {
        var $1484 = String$join$go$(_sep$1, _list$2, Bool$true);
        return $1484;
    };
    const String$join = x0 => x1 => String$join$(x0, x1);

    function Fm$highlight$end$(_col$1, _row$2, _res$3) {
        var $1485 = String$join$("\u{a}", _res$3);
        return $1485;
    };
    const Fm$highlight$end = x0 => x1 => x2 => Fm$highlight$end$(x0, x1, x2);

    function Maybe$extract$(_m$2, _a$4, _f$5) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1487 = _a$4;
                var $1486 = $1487;
                break;
            case 'Maybe.some':
                var $1488 = self.value;
                var $1489 = _f$5($1488);
                var $1486 = $1489;
                break;
        };
        return $1486;
    };
    const Maybe$extract = x0 => x1 => x2 => Maybe$extract$(x0, x1, x2);

    function Nat$is_zero$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1491 = Bool$true;
            var $1490 = $1491;
        } else {
            var $1492 = (self - 1n);
            var $1493 = Bool$false;
            var $1490 = $1493;
        };
        return $1490;
    };
    const Nat$is_zero = x0 => Nat$is_zero$(x0);

    function Nat$double$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1495 = Nat$zero;
            var $1494 = $1495;
        } else {
            var $1496 = (self - 1n);
            var $1497 = Nat$succ$(Nat$succ$(Nat$double$($1496)));
            var $1494 = $1497;
        };
        return $1494;
    };
    const Nat$double = x0 => Nat$double$(x0);

    function Nat$pred$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $1499 = Nat$zero;
            var $1498 = $1499;
        } else {
            var $1500 = (self - 1n);
            var $1501 = $1500;
            var $1498 = $1501;
        };
        return $1498;
    };
    const Nat$pred = x0 => Nat$pred$(x0);

    function List$take$(_n$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                var $1503 = List$nil;
                var $1502 = $1503;
                break;
            case 'List.cons':
                var $1504 = self.head;
                var $1505 = self.tail;
                var self = _n$2;
                if (self === 0n) {
                    var $1507 = List$nil;
                    var $1506 = $1507;
                } else {
                    var $1508 = (self - 1n);
                    var $1509 = List$cons$($1504, List$take$($1508, $1505));
                    var $1506 = $1509;
                };
                var $1502 = $1506;
                break;
        };
        return $1502;
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
                    var $1510 = _res$2;
                    return $1510;
                } else {
                    var $1511 = self.charCodeAt(0);
                    var $1512 = self.slice(1);
                    var $1513 = String$reverse$go$($1512, String$cons$($1511, _res$2));
                    return $1513;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$reverse$go = x0 => x1 => String$reverse$go$(x0, x1);

    function String$reverse$(_xs$1) {
        var $1514 = String$reverse$go$(_xs$1, String$nil);
        return $1514;
    };
    const String$reverse = x0 => String$reverse$(x0);

    function String$pad_right$(_size$1, _chr$2, _str$3) {
        var self = _size$1;
        if (self === 0n) {
            var $1516 = _str$3;
            var $1515 = $1516;
        } else {
            var $1517 = (self - 1n);
            var self = _str$3;
            if (self.length === 0) {
                var $1519 = String$cons$(_chr$2, String$pad_right$($1517, _chr$2, ""));
                var $1518 = $1519;
            } else {
                var $1520 = self.charCodeAt(0);
                var $1521 = self.slice(1);
                var $1522 = String$cons$($1520, String$pad_right$($1517, _chr$2, $1521));
                var $1518 = $1522;
            };
            var $1515 = $1518;
        };
        return $1515;
    };
    const String$pad_right = x0 => x1 => x2 => String$pad_right$(x0, x1, x2);

    function String$pad_left$(_size$1, _chr$2, _str$3) {
        var $1523 = String$reverse$(String$pad_right$(_size$1, _chr$2, String$reverse$(_str$3)));
        return $1523;
    };
    const String$pad_left = x0 => x1 => x2 => String$pad_left$(x0, x1, x2);

    function Either$left$(_value$3) {
        var $1524 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $1524;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $1525 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $1525;
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
                    var $1526 = Either$left$(_n$1);
                    return $1526;
                } else {
                    var $1527 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $1529 = Either$right$(Nat$succ$($1527));
                        var $1528 = $1529;
                    } else {
                        var $1530 = (self - 1n);
                        var $1531 = Nat$sub_rem$($1530, $1527);
                        var $1528 = $1531;
                    };
                    return $1528;
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
                        var $1532 = self.value;
                        var $1533 = Nat$div_mod$go$($1532, _m$2, Nat$succ$(_d$3));
                        return $1533;
                    case 'Either.right':
                        var $1534 = self.value;
                        var $1535 = Pair$new$(_d$3, _n$1);
                        return $1535;
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
                        var $1536 = self.fst;
                        var $1537 = self.snd;
                        var self = $1536;
                        if (self === 0n) {
                            var $1539 = List$cons$($1537, _res$3);
                            var $1538 = $1539;
                        } else {
                            var $1540 = (self - 1n);
                            var $1541 = Nat$to_base$go$(_base$1, $1536, List$cons$($1537, _res$3));
                            var $1538 = $1541;
                        };
                        return $1538;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $1542 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $1542;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);

    function Nat$mod$(_n$1, _m$2) {
        var $1543 = Pair$snd$((({
            _: 'Pair.new',
            'fst': _n$1 / _m$2,
            'snd': _n$1 % _m$2
        })));
        return $1543;
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
                    var $1546 = 35;
                    var $1545 = $1546;
                    break;
                case 'Maybe.some':
                    var $1547 = self.value;
                    var $1548 = $1547;
                    var $1545 = $1548;
                    break;
            };
            var $1544 = $1545;
        } else {
            var $1549 = 35;
            var $1544 = $1549;
        };
        return $1544;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $1550 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $1551 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $1551;
        }));
        return $1550;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function Nat$show$(_n$1) {
        var $1552 = Nat$to_string_base$(10n, _n$1);
        return $1552;
    };
    const Nat$show = x0 => Nat$show$(x0);
    const Bool$not = a0 => (!a0);

    function Fm$color$(_col$1, _str$2) {
        var $1553 = String$cons$(27, String$cons$(91, (_col$1 + String$cons$(109, (_str$2 + String$cons$(27, String$cons$(91, String$cons$(48, String$cons$(109, String$nil)))))))));
        return $1553;
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
                    var $1554 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                    return $1554;
                } else {
                    var $1555 = self.charCodeAt(0);
                    var $1556 = self.slice(1);
                    var self = ($1555 === 10);
                    if (self) {
                        var _stp$11 = Maybe$extract$(_lft$6, Bool$false, Nat$is_zero);
                        var self = _stp$11;
                        if (self) {
                            var $1559 = Fm$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                            var $1558 = $1559;
                        } else {
                            var _spa$12 = 3n;
                            var _siz$13 = Nat$succ$(Nat$double$(_spa$12));
                            var self = _ix1$3;
                            if (self === 0n) {
                                var self = _lft$6;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $1562 = Maybe$some$(_spa$12);
                                        var $1561 = $1562;
                                        break;
                                    case 'Maybe.some':
                                        var $1563 = self.value;
                                        var $1564 = Maybe$some$(Nat$pred$($1563));
                                        var $1561 = $1564;
                                        break;
                                };
                                var _lft$14 = $1561;
                            } else {
                                var $1565 = (self - 1n);
                                var $1566 = _lft$6;
                                var _lft$14 = $1566;
                            };
                            var _ix0$15 = Nat$pred$(_ix0$2);
                            var _ix1$16 = Nat$pred$(_ix1$3);
                            var _col$17 = 0n;
                            var _row$18 = Nat$succ$(_row$5);
                            var _res$19 = List$take$(_siz$13, List$cons$(String$reverse$(_lin$7), _res$8));
                            var _lin$20 = String$reverse$(String$flatten$(List$cons$(String$pad_left$(4n, 32, Nat$show$(_row$18)), List$cons$(" | ", List$nil))));
                            var $1560 = Fm$highlight$tc$($1556, _ix0$15, _ix1$16, _col$17, _row$18, _lft$14, _lin$20, _res$19);
                            var $1558 = $1560;
                        };
                        var $1557 = $1558;
                    } else {
                        var _chr$11 = String$cons$($1555, String$nil);
                        var self = (Nat$is_zero$(_ix0$2) && (!Nat$is_zero$(_ix1$3)));
                        if (self) {
                            var $1568 = String$reverse$(Fm$color$("31", Fm$color$("4", _chr$11)));
                            var _chr$12 = $1568;
                        } else {
                            var $1569 = _chr$11;
                            var _chr$12 = $1569;
                        };
                        var _ix0$13 = Nat$pred$(_ix0$2);
                        var _ix1$14 = Nat$pred$(_ix1$3);
                        var _col$15 = Nat$succ$(_col$4);
                        var _lin$16 = String$flatten$(List$cons$(_chr$12, List$cons$(_lin$7, List$nil)));
                        var $1567 = Fm$highlight$tc$($1556, _ix0$13, _ix1$14, _col$15, _row$5, _lft$6, _lin$16, _res$8);
                        var $1557 = $1567;
                    };
                    return $1557;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$highlight$tc = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$highlight$tc$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$highlight$(_code$1, _idx0$2, _idx1$3) {
        var $1570 = Fm$highlight$tc$(_code$1, _idx0$2, _idx1$3, 0n, 1n, Maybe$none, String$reverse$("   1 | "), List$nil);
        return $1570;
    };
    const Fm$highlight = x0 => x1 => x2 => Fm$highlight$(x0, x1, x2);

    function Fm$Defs$read$(_file$1, _code$2, _defs$3) {
        var self = Fm$Parser$file$(_file$1, _code$2, _defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1572 = self.idx;
                var $1573 = self.code;
                var $1574 = self.err;
                var _err$7 = $1574;
                var _hig$8 = Fm$highlight$(_code$2, $1572, Nat$succ$($1572));
                var _str$9 = String$flatten$(List$cons$(_err$7, List$cons$("\u{a}", List$cons$(_hig$8, List$nil))));
                var $1575 = Either$left$(_str$9);
                var $1571 = $1575;
                break;
            case 'Parser.Reply.value':
                var $1576 = self.idx;
                var $1577 = self.code;
                var $1578 = self.val;
                var $1579 = Either$right$($1578);
                var $1571 = $1579;
                break;
        };
        return $1571;
    };
    const Fm$Defs$read = x0 => x1 => x2 => Fm$Defs$read$(x0, x1, x2);

    function Fm$Synth$load$(_name$1, _defs$2) {
        var _file$3 = Fm$Synth$file_of$(_name$1);
        var $1580 = Monad$bind$(IO$monad)(IO$get_file$(_file$3))((_code$4 => {
            var _read$5 = Fm$Defs$read$(_file$3, _code$4, _defs$2);
            var self = _read$5;
            switch (self._) {
                case 'Either.left':
                    var $1582 = self.value;
                    var $1583 = Monad$pure$(IO$monad)(Maybe$none);
                    var $1581 = $1583;
                    break;
                case 'Either.right':
                    var $1584 = self.value;
                    var _defs$7 = $1584;
                    var self = Fm$get$(_name$1, _defs$7);
                    switch (self._) {
                        case 'Maybe.none':
                            var $1586 = Monad$pure$(IO$monad)(Maybe$none);
                            var $1585 = $1586;
                            break;
                        case 'Maybe.some':
                            var $1587 = self.value;
                            var $1588 = Monad$pure$(IO$monad)(Maybe$some$(_defs$7));
                            var $1585 = $1588;
                            break;
                    };
                    var $1581 = $1585;
                    break;
            };
            return $1581;
        }));
        return $1580;
    };
    const Fm$Synth$load = x0 => x1 => Fm$Synth$load$(x0, x1);

    function IO$print$(_text$1) {
        var $1589 = IO$ask$("print", _text$1, (_skip$2 => {
            var $1590 = IO$end$(Unit$new);
            return $1590;
        }));
        return $1589;
    };
    const IO$print = x0 => IO$print$(x0);
    const Fm$Status$wait = ({
        _: 'Fm.Status.wait'
    });

    function Fm$Check$(_V$1) {
        var $1591 = null;
        return $1591;
    };
    const Fm$Check = x0 => Fm$Check$(x0);

    function Fm$Check$result$(_value$2, _errors$3) {
        var $1592 = ({
            _: 'Fm.Check.result',
            'value': _value$2,
            'errors': _errors$3
        });
        return $1592;
    };
    const Fm$Check$result = x0 => x1 => Fm$Check$result$(x0, x1);

    function Fm$Check$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'Fm.Check.result':
                var $1594 = self.value;
                var $1595 = self.errors;
                var self = $1594;
                switch (self._) {
                    case 'Maybe.none':
                        var $1597 = Fm$Check$result$(Maybe$none, $1595);
                        var $1596 = $1597;
                        break;
                    case 'Maybe.some':
                        var $1598 = self.value;
                        var self = _f$4($1598);
                        switch (self._) {
                            case 'Fm.Check.result':
                                var $1600 = self.value;
                                var $1601 = self.errors;
                                var $1602 = Fm$Check$result$($1600, List$concat$($1595, $1601));
                                var $1599 = $1602;
                                break;
                        };
                        var $1596 = $1599;
                        break;
                };
                var $1593 = $1596;
                break;
        };
        return $1593;
    };
    const Fm$Check$bind = x0 => x1 => Fm$Check$bind$(x0, x1);

    function Fm$Check$pure$(_value$2) {
        var $1603 = Fm$Check$result$(Maybe$some$(_value$2), List$nil);
        return $1603;
    };
    const Fm$Check$pure = x0 => Fm$Check$pure$(x0);
    const Fm$Check$monad = Monad$new$(Fm$Check$bind, Fm$Check$pure);

    function Fm$Error$undefined_reference$(_origin$1, _name$2) {
        var $1604 = ({
            _: 'Fm.Error.undefined_reference',
            'origin': _origin$1,
            'name': _name$2
        });
        return $1604;
    };
    const Fm$Error$undefined_reference = x0 => x1 => Fm$Error$undefined_reference$(x0, x1);

    function Fm$Error$waiting$(_name$1) {
        var $1605 = ({
            _: 'Fm.Error.waiting',
            'name': _name$1
        });
        return $1605;
    };
    const Fm$Error$waiting = x0 => Fm$Error$waiting$(x0);

    function Fm$Error$indirect$(_name$1) {
        var $1606 = ({
            _: 'Fm.Error.indirect',
            'name': _name$1
        });
        return $1606;
    };
    const Fm$Error$indirect = x0 => Fm$Error$indirect$(x0);

    function Maybe$mapped$(_m$2, _f$4) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $1608 = Maybe$none;
                var $1607 = $1608;
                break;
            case 'Maybe.some':
                var $1609 = self.value;
                var $1610 = Maybe$some$(_f$4($1609));
                var $1607 = $1610;
                break;
        };
        return $1607;
    };
    const Maybe$mapped = x0 => x1 => Maybe$mapped$(x0, x1);

    function Fm$MPath$o$(_path$1) {
        var $1611 = Maybe$mapped$(_path$1, Fm$Path$o);
        return $1611;
    };
    const Fm$MPath$o = x0 => Fm$MPath$o$(x0);

    function Fm$MPath$i$(_path$1) {
        var $1612 = Maybe$mapped$(_path$1, Fm$Path$i);
        return $1612;
    };
    const Fm$MPath$i = x0 => Fm$MPath$i$(x0);

    function Fm$Error$cant_infer$(_origin$1, _term$2, _context$3) {
        var $1613 = ({
            _: 'Fm.Error.cant_infer',
            'origin': _origin$1,
            'term': _term$2,
            'context': _context$3
        });
        return $1613;
    };
    const Fm$Error$cant_infer = x0 => x1 => x2 => Fm$Error$cant_infer$(x0, x1, x2);

    function Fm$Error$type_mismatch$(_origin$1, _expected$2, _detected$3, _context$4) {
        var $1614 = ({
            _: 'Fm.Error.type_mismatch',
            'origin': _origin$1,
            'expected': _expected$2,
            'detected': _detected$3,
            'context': _context$4
        });
        return $1614;
    };
    const Fm$Error$type_mismatch = x0 => x1 => x2 => x3 => Fm$Error$type_mismatch$(x0, x1, x2, x3);

    function Fm$Error$show_goal$(_name$1, _dref$2, _verb$3, _goal$4, _context$5) {
        var $1615 = ({
            _: 'Fm.Error.show_goal',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3,
            'goal': _goal$4,
            'context': _context$5
        });
        return $1615;
    };
    const Fm$Error$show_goal = x0 => x1 => x2 => x3 => x4 => Fm$Error$show_goal$(x0, x1, x2, x3, x4);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                var $1617 = List$nil;
                var $1616 = $1617;
                break;
            case 'List.cons':
                var $1618 = self.head;
                var $1619 = self.tail;
                var $1620 = $1619;
                var $1616 = $1620;
                break;
        };
        return $1616;
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
                        var $1621 = self.name;
                        var $1622 = self.indx;
                        var $1623 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1623;
                    case 'Fm.Term.ref':
                        var $1624 = self.name;
                        var $1625 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1625;
                    case 'Fm.Term.typ':
                        var $1626 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1626;
                    case 'Fm.Term.all':
                        var $1627 = self.eras;
                        var $1628 = self.self;
                        var $1629 = self.name;
                        var $1630 = self.xtyp;
                        var $1631 = self.body;
                        var $1632 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1632;
                    case 'Fm.Term.lam':
                        var $1633 = self.name;
                        var $1634 = self.body;
                        var $1635 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1635;
                    case 'Fm.Term.app':
                        var $1636 = self.func;
                        var $1637 = self.argm;
                        var $1638 = Fm$SmartMotive$vals$cont$(_expr$1, $1636, List$cons$($1637, _args$3), _defs$4);
                        return $1638;
                    case 'Fm.Term.let':
                        var $1639 = self.name;
                        var $1640 = self.expr;
                        var $1641 = self.body;
                        var $1642 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1642;
                    case 'Fm.Term.def':
                        var $1643 = self.name;
                        var $1644 = self.expr;
                        var $1645 = self.body;
                        var $1646 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1646;
                    case 'Fm.Term.ann':
                        var $1647 = self.done;
                        var $1648 = self.term;
                        var $1649 = self.type;
                        var $1650 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1650;
                    case 'Fm.Term.gol':
                        var $1651 = self.name;
                        var $1652 = self.dref;
                        var $1653 = self.verb;
                        var $1654 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1654;
                    case 'Fm.Term.hol':
                        var $1655 = self.path;
                        var $1656 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1656;
                    case 'Fm.Term.nat':
                        var $1657 = self.natx;
                        var $1658 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1658;
                    case 'Fm.Term.chr':
                        var $1659 = self.chrx;
                        var $1660 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1660;
                    case 'Fm.Term.str':
                        var $1661 = self.strx;
                        var $1662 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1662;
                    case 'Fm.Term.cse':
                        var $1663 = self.path;
                        var $1664 = self.expr;
                        var $1665 = self.name;
                        var $1666 = self.with;
                        var $1667 = self.cses;
                        var $1668 = self.moti;
                        var $1669 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1669;
                    case 'Fm.Term.ori':
                        var $1670 = self.orig;
                        var $1671 = self.expr;
                        var $1672 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $1672;
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
                        var $1673 = self.name;
                        var $1674 = self.indx;
                        var $1675 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1675;
                    case 'Fm.Term.ref':
                        var $1676 = self.name;
                        var $1677 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1677;
                    case 'Fm.Term.typ':
                        var $1678 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1678;
                    case 'Fm.Term.all':
                        var $1679 = self.eras;
                        var $1680 = self.self;
                        var $1681 = self.name;
                        var $1682 = self.xtyp;
                        var $1683 = self.body;
                        var $1684 = Fm$SmartMotive$vals$(_expr$1, $1683(Fm$Term$typ)(Fm$Term$typ), _defs$3);
                        return $1684;
                    case 'Fm.Term.lam':
                        var $1685 = self.name;
                        var $1686 = self.body;
                        var $1687 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1687;
                    case 'Fm.Term.app':
                        var $1688 = self.func;
                        var $1689 = self.argm;
                        var $1690 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1690;
                    case 'Fm.Term.let':
                        var $1691 = self.name;
                        var $1692 = self.expr;
                        var $1693 = self.body;
                        var $1694 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1694;
                    case 'Fm.Term.def':
                        var $1695 = self.name;
                        var $1696 = self.expr;
                        var $1697 = self.body;
                        var $1698 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1698;
                    case 'Fm.Term.ann':
                        var $1699 = self.done;
                        var $1700 = self.term;
                        var $1701 = self.type;
                        var $1702 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1702;
                    case 'Fm.Term.gol':
                        var $1703 = self.name;
                        var $1704 = self.dref;
                        var $1705 = self.verb;
                        var $1706 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1706;
                    case 'Fm.Term.hol':
                        var $1707 = self.path;
                        var $1708 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1708;
                    case 'Fm.Term.nat':
                        var $1709 = self.natx;
                        var $1710 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1710;
                    case 'Fm.Term.chr':
                        var $1711 = self.chrx;
                        var $1712 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1712;
                    case 'Fm.Term.str':
                        var $1713 = self.strx;
                        var $1714 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1714;
                    case 'Fm.Term.cse':
                        var $1715 = self.path;
                        var $1716 = self.expr;
                        var $1717 = self.name;
                        var $1718 = self.with;
                        var $1719 = self.cses;
                        var $1720 = self.moti;
                        var $1721 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1721;
                    case 'Fm.Term.ori':
                        var $1722 = self.orig;
                        var $1723 = self.expr;
                        var $1724 = Fm$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $1724;
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
                        var $1725 = self.name;
                        var $1726 = self.indx;
                        var $1727 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1727;
                    case 'Fm.Term.ref':
                        var $1728 = self.name;
                        var $1729 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1729;
                    case 'Fm.Term.typ':
                        var $1730 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1730;
                    case 'Fm.Term.all':
                        var $1731 = self.eras;
                        var $1732 = self.self;
                        var $1733 = self.name;
                        var $1734 = self.xtyp;
                        var $1735 = self.body;
                        var $1736 = Fm$SmartMotive$nams$cont$(_name$1, $1735(Fm$Term$ref$($1732))(Fm$Term$ref$($1733)), List$cons$(String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($1733, List$nil)))), _binds$3), _defs$4);
                        return $1736;
                    case 'Fm.Term.lam':
                        var $1737 = self.name;
                        var $1738 = self.body;
                        var $1739 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1739;
                    case 'Fm.Term.app':
                        var $1740 = self.func;
                        var $1741 = self.argm;
                        var $1742 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1742;
                    case 'Fm.Term.let':
                        var $1743 = self.name;
                        var $1744 = self.expr;
                        var $1745 = self.body;
                        var $1746 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1746;
                    case 'Fm.Term.def':
                        var $1747 = self.name;
                        var $1748 = self.expr;
                        var $1749 = self.body;
                        var $1750 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1750;
                    case 'Fm.Term.ann':
                        var $1751 = self.done;
                        var $1752 = self.term;
                        var $1753 = self.type;
                        var $1754 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1754;
                    case 'Fm.Term.gol':
                        var $1755 = self.name;
                        var $1756 = self.dref;
                        var $1757 = self.verb;
                        var $1758 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1758;
                    case 'Fm.Term.hol':
                        var $1759 = self.path;
                        var $1760 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1760;
                    case 'Fm.Term.nat':
                        var $1761 = self.natx;
                        var $1762 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1762;
                    case 'Fm.Term.chr':
                        var $1763 = self.chrx;
                        var $1764 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1764;
                    case 'Fm.Term.str':
                        var $1765 = self.strx;
                        var $1766 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1766;
                    case 'Fm.Term.cse':
                        var $1767 = self.path;
                        var $1768 = self.expr;
                        var $1769 = self.name;
                        var $1770 = self.with;
                        var $1771 = self.cses;
                        var $1772 = self.moti;
                        var $1773 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1773;
                    case 'Fm.Term.ori':
                        var $1774 = self.orig;
                        var $1775 = self.expr;
                        var $1776 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $1776;
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
                var $1778 = self.name;
                var $1779 = self.indx;
                var $1780 = List$nil;
                var $1777 = $1780;
                break;
            case 'Fm.Term.ref':
                var $1781 = self.name;
                var $1782 = List$nil;
                var $1777 = $1782;
                break;
            case 'Fm.Term.typ':
                var $1783 = List$nil;
                var $1777 = $1783;
                break;
            case 'Fm.Term.all':
                var $1784 = self.eras;
                var $1785 = self.self;
                var $1786 = self.name;
                var $1787 = self.xtyp;
                var $1788 = self.body;
                var $1789 = Fm$SmartMotive$nams$cont$(_name$1, $1787, List$nil, _defs$3);
                var $1777 = $1789;
                break;
            case 'Fm.Term.lam':
                var $1790 = self.name;
                var $1791 = self.body;
                var $1792 = List$nil;
                var $1777 = $1792;
                break;
            case 'Fm.Term.app':
                var $1793 = self.func;
                var $1794 = self.argm;
                var $1795 = List$nil;
                var $1777 = $1795;
                break;
            case 'Fm.Term.let':
                var $1796 = self.name;
                var $1797 = self.expr;
                var $1798 = self.body;
                var $1799 = List$nil;
                var $1777 = $1799;
                break;
            case 'Fm.Term.def':
                var $1800 = self.name;
                var $1801 = self.expr;
                var $1802 = self.body;
                var $1803 = List$nil;
                var $1777 = $1803;
                break;
            case 'Fm.Term.ann':
                var $1804 = self.done;
                var $1805 = self.term;
                var $1806 = self.type;
                var $1807 = List$nil;
                var $1777 = $1807;
                break;
            case 'Fm.Term.gol':
                var $1808 = self.name;
                var $1809 = self.dref;
                var $1810 = self.verb;
                var $1811 = List$nil;
                var $1777 = $1811;
                break;
            case 'Fm.Term.hol':
                var $1812 = self.path;
                var $1813 = List$nil;
                var $1777 = $1813;
                break;
            case 'Fm.Term.nat':
                var $1814 = self.natx;
                var $1815 = List$nil;
                var $1777 = $1815;
                break;
            case 'Fm.Term.chr':
                var $1816 = self.chrx;
                var $1817 = List$nil;
                var $1777 = $1817;
                break;
            case 'Fm.Term.str':
                var $1818 = self.strx;
                var $1819 = List$nil;
                var $1777 = $1819;
                break;
            case 'Fm.Term.cse':
                var $1820 = self.path;
                var $1821 = self.expr;
                var $1822 = self.name;
                var $1823 = self.with;
                var $1824 = self.cses;
                var $1825 = self.moti;
                var $1826 = List$nil;
                var $1777 = $1826;
                break;
            case 'Fm.Term.ori':
                var $1827 = self.orig;
                var $1828 = self.expr;
                var $1829 = List$nil;
                var $1777 = $1829;
                break;
        };
        return $1777;
    };
    const Fm$SmartMotive$nams = x0 => x1 => x2 => Fm$SmartMotive$nams$(x0, x1, x2);

    function List$zip$(_as$3, _bs$4) {
        var self = _as$3;
        switch (self._) {
            case 'List.nil':
                var $1831 = List$nil;
                var $1830 = $1831;
                break;
            case 'List.cons':
                var $1832 = self.head;
                var $1833 = self.tail;
                var self = _bs$4;
                switch (self._) {
                    case 'List.nil':
                        var $1835 = List$nil;
                        var $1834 = $1835;
                        break;
                    case 'List.cons':
                        var $1836 = self.head;
                        var $1837 = self.tail;
                        var $1838 = List$cons$(Pair$new$($1832, $1836), List$zip$($1833, $1837));
                        var $1834 = $1838;
                        break;
                };
                var $1830 = $1834;
                break;
        };
        return $1830;
    };
    const List$zip = x0 => x1 => List$zip$(x0, x1);

    function Cmp$as_gte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
                var $1840 = Bool$false;
                var $1839 = $1840;
                break;
            case 'Cmp.eql':
                var $1841 = Bool$true;
                var $1839 = $1841;
                break;
            case 'Cmp.gtn':
                var $1842 = Bool$true;
                var $1839 = $1842;
                break;
        };
        return $1839;
    };
    const Cmp$as_gte = x0 => Cmp$as_gte$(x0);
    const Nat$gte = a0 => a1 => (a0 >= a1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function Fm$Term$serialize$name$(_name$1) {
        var $1843 = (fm_name_to_bits(_name$1));
        return $1843;
    };
    const Fm$Term$serialize$name = x0 => Fm$Term$serialize$name$(x0);

    function Fm$Term$serialize$(_term$1, _depth$2, _init$3, _x$4) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1845 = self.name;
                var $1846 = self.indx;
                var self = ($1846 >= _init$3);
                if (self) {
                    var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred$((_depth$2 - $1846 <= 0n ? 0n : _depth$2 - $1846)))));
                    var $1848 = (((_name$7(_x$4) + '1') + '0') + '0');
                    var $1847 = $1848;
                } else {
                    var _name$7 = a1 => (a1 + (nat_to_bits($1846)));
                    var $1849 = (((_name$7(_x$4) + '0') + '1') + '0');
                    var $1847 = $1849;
                };
                var $1844 = $1847;
                break;
            case 'Fm.Term.ref':
                var $1850 = self.name;
                var _name$6 = a1 => (a1 + Fm$Term$serialize$name$($1850));
                var $1851 = (((_name$6(_x$4) + '0') + '0') + '0');
                var $1844 = $1851;
                break;
            case 'Fm.Term.typ':
                var $1852 = (((_x$4 + '1') + '1') + '0');
                var $1844 = $1852;
                break;
            case 'Fm.Term.all':
                var $1853 = self.eras;
                var $1854 = self.self;
                var $1855 = self.name;
                var $1856 = self.xtyp;
                var $1857 = self.body;
                var self = $1853;
                if (self) {
                    var $1859 = Bits$i;
                    var _eras$10 = $1859;
                } else {
                    var $1860 = Bits$o;
                    var _eras$10 = $1860;
                };
                var _self$11 = a1 => (a1 + (fm_name_to_bits($1854)));
                var _xtyp$12 = Fm$Term$serialize($1856)(_depth$2)(_init$3);
                var _body$13 = Fm$Term$serialize($1857(Fm$Term$var$($1854, _depth$2))(Fm$Term$var$($1855, Nat$succ$(_depth$2))))(Nat$succ$(Nat$succ$(_depth$2)))(_init$3);
                var $1858 = (((_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))) + '0') + '0') + '1');
                var $1844 = $1858;
                break;
            case 'Fm.Term.lam':
                var $1861 = self.name;
                var $1862 = self.body;
                var _body$7 = Fm$Term$serialize($1862(Fm$Term$var$($1861, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $1863 = (((_body$7(_x$4) + '1') + '0') + '1');
                var $1844 = $1863;
                break;
            case 'Fm.Term.app':
                var $1864 = self.func;
                var $1865 = self.argm;
                var _func$7 = Fm$Term$serialize($1864)(_depth$2)(_init$3);
                var _argm$8 = Fm$Term$serialize($1865)(_depth$2)(_init$3);
                var $1866 = (((_func$7(_argm$8(_x$4)) + '0') + '1') + '1');
                var $1844 = $1866;
                break;
            case 'Fm.Term.let':
                var $1867 = self.name;
                var $1868 = self.expr;
                var $1869 = self.body;
                var _expr$8 = Fm$Term$serialize($1868)(_depth$2)(_init$3);
                var _body$9 = Fm$Term$serialize($1869(Fm$Term$var$($1867, _depth$2)))(Nat$succ$(_depth$2))(_init$3);
                var $1870 = (((_expr$8(_body$9(_x$4)) + '1') + '1') + '1');
                var $1844 = $1870;
                break;
            case 'Fm.Term.def':
                var $1871 = self.name;
                var $1872 = self.expr;
                var $1873 = self.body;
                var $1874 = Fm$Term$serialize$($1873($1872), _depth$2, _init$3, _x$4);
                var $1844 = $1874;
                break;
            case 'Fm.Term.ann':
                var $1875 = self.done;
                var $1876 = self.term;
                var $1877 = self.type;
                var $1878 = Fm$Term$serialize$($1876, _depth$2, _init$3, _x$4);
                var $1844 = $1878;
                break;
            case 'Fm.Term.gol':
                var $1879 = self.name;
                var $1880 = self.dref;
                var $1881 = self.verb;
                var _name$8 = a1 => (a1 + (fm_name_to_bits($1879)));
                var $1882 = (((_name$8(_x$4) + '0') + '0') + '0');
                var $1844 = $1882;
                break;
            case 'Fm.Term.hol':
                var $1883 = self.path;
                var $1884 = _x$4;
                var $1844 = $1884;
                break;
            case 'Fm.Term.nat':
                var $1885 = self.natx;
                var $1886 = Fm$Term$serialize$(Fm$Term$unroll_nat$($1885), _depth$2, _init$3, _x$4);
                var $1844 = $1886;
                break;
            case 'Fm.Term.chr':
                var $1887 = self.chrx;
                var $1888 = Fm$Term$serialize$(Fm$Term$unroll_chr$($1887), _depth$2, _init$3, _x$4);
                var $1844 = $1888;
                break;
            case 'Fm.Term.str':
                var $1889 = self.strx;
                var $1890 = Fm$Term$serialize$(Fm$Term$unroll_str$($1889), _depth$2, _init$3, _x$4);
                var $1844 = $1890;
                break;
            case 'Fm.Term.cse':
                var $1891 = self.path;
                var $1892 = self.expr;
                var $1893 = self.name;
                var $1894 = self.with;
                var $1895 = self.cses;
                var $1896 = self.moti;
                var $1897 = _x$4;
                var $1844 = $1897;
                break;
            case 'Fm.Term.ori':
                var $1898 = self.orig;
                var $1899 = self.expr;
                var $1900 = Fm$Term$serialize$($1899, _depth$2, _init$3, _x$4);
                var $1844 = $1900;
                break;
        };
        return $1844;
    };
    const Fm$Term$serialize = x0 => x1 => x2 => x3 => Fm$Term$serialize$(x0, x1, x2, x3);
    const Bits$eql = a0 => a1 => (a1 === a0);

    function Fm$Term$identical$(_a$1, _b$2, _lv$3) {
        var _ah$4 = Fm$Term$serialize$(_a$1, _lv$3, _lv$3, Bits$e);
        var _bh$5 = Fm$Term$serialize$(_b$2, _lv$3, _lv$3, Bits$e);
        var $1901 = (_bh$5 === _ah$4);
        return $1901;
    };
    const Fm$Term$identical = x0 => x1 => x2 => Fm$Term$identical$(x0, x1, x2);

    function Fm$SmartMotive$replace$(_term$1, _from$2, _to$3, _lv$4) {
        var self = Fm$Term$identical$(_term$1, _from$2, _lv$4);
        if (self) {
            var $1903 = _to$3;
            var $1902 = $1903;
        } else {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $1905 = self.name;
                    var $1906 = self.indx;
                    var $1907 = Fm$Term$var$($1905, $1906);
                    var $1904 = $1907;
                    break;
                case 'Fm.Term.ref':
                    var $1908 = self.name;
                    var $1909 = Fm$Term$ref$($1908);
                    var $1904 = $1909;
                    break;
                case 'Fm.Term.typ':
                    var $1910 = Fm$Term$typ;
                    var $1904 = $1910;
                    break;
                case 'Fm.Term.all':
                    var $1911 = self.eras;
                    var $1912 = self.self;
                    var $1913 = self.name;
                    var $1914 = self.xtyp;
                    var $1915 = self.body;
                    var _xtyp$10 = Fm$SmartMotive$replace$($1914, _from$2, _to$3, _lv$4);
                    var _body$11 = $1915(Fm$Term$ref$($1912))(Fm$Term$ref$($1913));
                    var _body$12 = Fm$SmartMotive$replace$(_body$11, _from$2, _to$3, Nat$succ$(Nat$succ$(_lv$4)));
                    var $1916 = Fm$Term$all$($1911, $1912, $1913, _xtyp$10, (_s$13 => _x$14 => {
                        var $1917 = _body$12;
                        return $1917;
                    }));
                    var $1904 = $1916;
                    break;
                case 'Fm.Term.lam':
                    var $1918 = self.name;
                    var $1919 = self.body;
                    var _body$7 = $1919(Fm$Term$ref$($1918));
                    var _body$8 = Fm$SmartMotive$replace$(_body$7, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1920 = Fm$Term$lam$($1918, (_x$9 => {
                        var $1921 = _body$8;
                        return $1921;
                    }));
                    var $1904 = $1920;
                    break;
                case 'Fm.Term.app':
                    var $1922 = self.func;
                    var $1923 = self.argm;
                    var _func$7 = Fm$SmartMotive$replace$($1922, _from$2, _to$3, _lv$4);
                    var _argm$8 = Fm$SmartMotive$replace$($1923, _from$2, _to$3, _lv$4);
                    var $1924 = Fm$Term$app$(_func$7, _argm$8);
                    var $1904 = $1924;
                    break;
                case 'Fm.Term.let':
                    var $1925 = self.name;
                    var $1926 = self.expr;
                    var $1927 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($1926, _from$2, _to$3, _lv$4);
                    var _body$9 = $1927(Fm$Term$ref$($1925));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1928 = Fm$Term$let$($1925, _expr$8, (_x$11 => {
                        var $1929 = _body$10;
                        return $1929;
                    }));
                    var $1904 = $1928;
                    break;
                case 'Fm.Term.def':
                    var $1930 = self.name;
                    var $1931 = self.expr;
                    var $1932 = self.body;
                    var _expr$8 = Fm$SmartMotive$replace$($1931, _from$2, _to$3, _lv$4);
                    var _body$9 = $1932(Fm$Term$ref$($1930));
                    var _body$10 = Fm$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $1933 = Fm$Term$def$($1930, _expr$8, (_x$11 => {
                        var $1934 = _body$10;
                        return $1934;
                    }));
                    var $1904 = $1933;
                    break;
                case 'Fm.Term.ann':
                    var $1935 = self.done;
                    var $1936 = self.term;
                    var $1937 = self.type;
                    var _term$8 = Fm$SmartMotive$replace$($1936, _from$2, _to$3, _lv$4);
                    var _type$9 = Fm$SmartMotive$replace$($1937, _from$2, _to$3, _lv$4);
                    var $1938 = Fm$Term$ann$($1935, _term$8, _type$9);
                    var $1904 = $1938;
                    break;
                case 'Fm.Term.gol':
                    var $1939 = self.name;
                    var $1940 = self.dref;
                    var $1941 = self.verb;
                    var $1942 = _term$1;
                    var $1904 = $1942;
                    break;
                case 'Fm.Term.hol':
                    var $1943 = self.path;
                    var $1944 = _term$1;
                    var $1904 = $1944;
                    break;
                case 'Fm.Term.nat':
                    var $1945 = self.natx;
                    var $1946 = _term$1;
                    var $1904 = $1946;
                    break;
                case 'Fm.Term.chr':
                    var $1947 = self.chrx;
                    var $1948 = _term$1;
                    var $1904 = $1948;
                    break;
                case 'Fm.Term.str':
                    var $1949 = self.strx;
                    var $1950 = _term$1;
                    var $1904 = $1950;
                    break;
                case 'Fm.Term.cse':
                    var $1951 = self.path;
                    var $1952 = self.expr;
                    var $1953 = self.name;
                    var $1954 = self.with;
                    var $1955 = self.cses;
                    var $1956 = self.moti;
                    var $1957 = _term$1;
                    var $1904 = $1957;
                    break;
                case 'Fm.Term.ori':
                    var $1958 = self.orig;
                    var $1959 = self.expr;
                    var $1960 = Fm$SmartMotive$replace$($1959, _from$2, _to$3, _lv$4);
                    var $1904 = $1960;
                    break;
            };
            var $1902 = $1904;
        };
        return $1902;
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
                    var $1963 = self.fst;
                    var $1964 = self.snd;
                    var $1965 = Fm$SmartMotive$replace$(_moti$11, $1964, Fm$Term$ref$($1963), _lv$5);
                    var $1962 = $1965;
                    break;
            };
            return $1962;
        }));
        var $1961 = _moti$10;
        return $1961;
    };
    const Fm$SmartMotive$make = x0 => x1 => x2 => x3 => x4 => x5 => Fm$SmartMotive$make$(x0, x1, x2, x3, x4, x5);

    function Fm$Term$desugar_cse$motive$(_wyth$1, _moti$2) {
        var self = _wyth$1;
        switch (self._) {
            case 'List.nil':
                var $1967 = _moti$2;
                var $1966 = $1967;
                break;
            case 'List.cons':
                var $1968 = self.head;
                var $1969 = self.tail;
                var self = $1968;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $1971 = self.file;
                        var $1972 = self.code;
                        var $1973 = self.name;
                        var $1974 = self.term;
                        var $1975 = self.type;
                        var $1976 = self.stat;
                        var $1977 = Fm$Term$all$(Bool$false, "", $1973, $1975, (_s$11 => _x$12 => {
                            var $1978 = Fm$Term$desugar_cse$motive$($1969, _moti$2);
                            return $1978;
                        }));
                        var $1970 = $1977;
                        break;
                };
                var $1966 = $1970;
                break;
        };
        return $1966;
    };
    const Fm$Term$desugar_cse$motive = x0 => x1 => Fm$Term$desugar_cse$motive$(x0, x1);

    function String$is_empty$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $1980 = Bool$true;
            var $1979 = $1980;
        } else {
            var $1981 = self.charCodeAt(0);
            var $1982 = self.slice(1);
            var $1983 = Bool$false;
            var $1979 = $1983;
        };
        return $1979;
    };
    const String$is_empty = x0 => String$is_empty$(x0);

    function Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, _type$3, _body$4, _defs$5) {
        var self = Fm$Term$reduce$(_type$3, _defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $1985 = self.name;
                var $1986 = self.indx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $1988 = _body$4;
                        var $1987 = $1988;
                        break;
                    case 'List.cons':
                        var $1989 = self.head;
                        var $1990 = self.tail;
                        var self = $1989;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $1992 = self.file;
                                var $1993 = self.code;
                                var $1994 = self.name;
                                var $1995 = self.term;
                                var $1996 = self.type;
                                var $1997 = self.stat;
                                var $1998 = Fm$Term$lam$($1994, (_x$16 => {
                                    var $1999 = Fm$Term$desugar_cse$argument$(_name$1, $1990, _type$3, _body$4, _defs$5);
                                    return $1999;
                                }));
                                var $1991 = $1998;
                                break;
                        };
                        var $1987 = $1991;
                        break;
                };
                var $1984 = $1987;
                break;
            case 'Fm.Term.ref':
                var $2000 = self.name;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2002 = _body$4;
                        var $2001 = $2002;
                        break;
                    case 'List.cons':
                        var $2003 = self.head;
                        var $2004 = self.tail;
                        var self = $2003;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2006 = self.file;
                                var $2007 = self.code;
                                var $2008 = self.name;
                                var $2009 = self.term;
                                var $2010 = self.type;
                                var $2011 = self.stat;
                                var $2012 = Fm$Term$lam$($2008, (_x$15 => {
                                    var $2013 = Fm$Term$desugar_cse$argument$(_name$1, $2004, _type$3, _body$4, _defs$5);
                                    return $2013;
                                }));
                                var $2005 = $2012;
                                break;
                        };
                        var $2001 = $2005;
                        break;
                };
                var $1984 = $2001;
                break;
            case 'Fm.Term.typ':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2015 = _body$4;
                        var $2014 = $2015;
                        break;
                    case 'List.cons':
                        var $2016 = self.head;
                        var $2017 = self.tail;
                        var self = $2016;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2019 = self.file;
                                var $2020 = self.code;
                                var $2021 = self.name;
                                var $2022 = self.term;
                                var $2023 = self.type;
                                var $2024 = self.stat;
                                var $2025 = Fm$Term$lam$($2021, (_x$14 => {
                                    var $2026 = Fm$Term$desugar_cse$argument$(_name$1, $2017, _type$3, _body$4, _defs$5);
                                    return $2026;
                                }));
                                var $2018 = $2025;
                                break;
                        };
                        var $2014 = $2018;
                        break;
                };
                var $1984 = $2014;
                break;
            case 'Fm.Term.all':
                var $2027 = self.eras;
                var $2028 = self.self;
                var $2029 = self.name;
                var $2030 = self.xtyp;
                var $2031 = self.body;
                var $2032 = Fm$Term$lam$((() => {
                    var self = String$is_empty$($2029);
                    if (self) {
                        var $2033 = _name$1;
                        return $2033;
                    } else {
                        var $2034 = String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($2029, List$nil))));
                        return $2034;
                    };
                })(), (_x$11 => {
                    var $2035 = Fm$Term$desugar_cse$argument$(_name$1, _wyth$2, $2031(Fm$Term$var$($2028, 0n))(Fm$Term$var$($2029, 0n)), _body$4, _defs$5);
                    return $2035;
                }));
                var $1984 = $2032;
                break;
            case 'Fm.Term.lam':
                var $2036 = self.name;
                var $2037 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2039 = _body$4;
                        var $2038 = $2039;
                        break;
                    case 'List.cons':
                        var $2040 = self.head;
                        var $2041 = self.tail;
                        var self = $2040;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2043 = self.file;
                                var $2044 = self.code;
                                var $2045 = self.name;
                                var $2046 = self.term;
                                var $2047 = self.type;
                                var $2048 = self.stat;
                                var $2049 = Fm$Term$lam$($2045, (_x$16 => {
                                    var $2050 = Fm$Term$desugar_cse$argument$(_name$1, $2041, _type$3, _body$4, _defs$5);
                                    return $2050;
                                }));
                                var $2042 = $2049;
                                break;
                        };
                        var $2038 = $2042;
                        break;
                };
                var $1984 = $2038;
                break;
            case 'Fm.Term.app':
                var $2051 = self.func;
                var $2052 = self.argm;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2054 = _body$4;
                        var $2053 = $2054;
                        break;
                    case 'List.cons':
                        var $2055 = self.head;
                        var $2056 = self.tail;
                        var self = $2055;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2058 = self.file;
                                var $2059 = self.code;
                                var $2060 = self.name;
                                var $2061 = self.term;
                                var $2062 = self.type;
                                var $2063 = self.stat;
                                var $2064 = Fm$Term$lam$($2060, (_x$16 => {
                                    var $2065 = Fm$Term$desugar_cse$argument$(_name$1, $2056, _type$3, _body$4, _defs$5);
                                    return $2065;
                                }));
                                var $2057 = $2064;
                                break;
                        };
                        var $2053 = $2057;
                        break;
                };
                var $1984 = $2053;
                break;
            case 'Fm.Term.let':
                var $2066 = self.name;
                var $2067 = self.expr;
                var $2068 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2070 = _body$4;
                        var $2069 = $2070;
                        break;
                    case 'List.cons':
                        var $2071 = self.head;
                        var $2072 = self.tail;
                        var self = $2071;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2074 = self.file;
                                var $2075 = self.code;
                                var $2076 = self.name;
                                var $2077 = self.term;
                                var $2078 = self.type;
                                var $2079 = self.stat;
                                var $2080 = Fm$Term$lam$($2076, (_x$17 => {
                                    var $2081 = Fm$Term$desugar_cse$argument$(_name$1, $2072, _type$3, _body$4, _defs$5);
                                    return $2081;
                                }));
                                var $2073 = $2080;
                                break;
                        };
                        var $2069 = $2073;
                        break;
                };
                var $1984 = $2069;
                break;
            case 'Fm.Term.def':
                var $2082 = self.name;
                var $2083 = self.expr;
                var $2084 = self.body;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2086 = _body$4;
                        var $2085 = $2086;
                        break;
                    case 'List.cons':
                        var $2087 = self.head;
                        var $2088 = self.tail;
                        var self = $2087;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2090 = self.file;
                                var $2091 = self.code;
                                var $2092 = self.name;
                                var $2093 = self.term;
                                var $2094 = self.type;
                                var $2095 = self.stat;
                                var $2096 = Fm$Term$lam$($2092, (_x$17 => {
                                    var $2097 = Fm$Term$desugar_cse$argument$(_name$1, $2088, _type$3, _body$4, _defs$5);
                                    return $2097;
                                }));
                                var $2089 = $2096;
                                break;
                        };
                        var $2085 = $2089;
                        break;
                };
                var $1984 = $2085;
                break;
            case 'Fm.Term.ann':
                var $2098 = self.done;
                var $2099 = self.term;
                var $2100 = self.type;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2102 = _body$4;
                        var $2101 = $2102;
                        break;
                    case 'List.cons':
                        var $2103 = self.head;
                        var $2104 = self.tail;
                        var self = $2103;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2106 = self.file;
                                var $2107 = self.code;
                                var $2108 = self.name;
                                var $2109 = self.term;
                                var $2110 = self.type;
                                var $2111 = self.stat;
                                var $2112 = Fm$Term$lam$($2108, (_x$17 => {
                                    var $2113 = Fm$Term$desugar_cse$argument$(_name$1, $2104, _type$3, _body$4, _defs$5);
                                    return $2113;
                                }));
                                var $2105 = $2112;
                                break;
                        };
                        var $2101 = $2105;
                        break;
                };
                var $1984 = $2101;
                break;
            case 'Fm.Term.gol':
                var $2114 = self.name;
                var $2115 = self.dref;
                var $2116 = self.verb;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2118 = _body$4;
                        var $2117 = $2118;
                        break;
                    case 'List.cons':
                        var $2119 = self.head;
                        var $2120 = self.tail;
                        var self = $2119;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2122 = self.file;
                                var $2123 = self.code;
                                var $2124 = self.name;
                                var $2125 = self.term;
                                var $2126 = self.type;
                                var $2127 = self.stat;
                                var $2128 = Fm$Term$lam$($2124, (_x$17 => {
                                    var $2129 = Fm$Term$desugar_cse$argument$(_name$1, $2120, _type$3, _body$4, _defs$5);
                                    return $2129;
                                }));
                                var $2121 = $2128;
                                break;
                        };
                        var $2117 = $2121;
                        break;
                };
                var $1984 = $2117;
                break;
            case 'Fm.Term.hol':
                var $2130 = self.path;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2132 = _body$4;
                        var $2131 = $2132;
                        break;
                    case 'List.cons':
                        var $2133 = self.head;
                        var $2134 = self.tail;
                        var self = $2133;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2136 = self.file;
                                var $2137 = self.code;
                                var $2138 = self.name;
                                var $2139 = self.term;
                                var $2140 = self.type;
                                var $2141 = self.stat;
                                var $2142 = Fm$Term$lam$($2138, (_x$15 => {
                                    var $2143 = Fm$Term$desugar_cse$argument$(_name$1, $2134, _type$3, _body$4, _defs$5);
                                    return $2143;
                                }));
                                var $2135 = $2142;
                                break;
                        };
                        var $2131 = $2135;
                        break;
                };
                var $1984 = $2131;
                break;
            case 'Fm.Term.nat':
                var $2144 = self.natx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2146 = _body$4;
                        var $2145 = $2146;
                        break;
                    case 'List.cons':
                        var $2147 = self.head;
                        var $2148 = self.tail;
                        var self = $2147;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2150 = self.file;
                                var $2151 = self.code;
                                var $2152 = self.name;
                                var $2153 = self.term;
                                var $2154 = self.type;
                                var $2155 = self.stat;
                                var $2156 = Fm$Term$lam$($2152, (_x$15 => {
                                    var $2157 = Fm$Term$desugar_cse$argument$(_name$1, $2148, _type$3, _body$4, _defs$5);
                                    return $2157;
                                }));
                                var $2149 = $2156;
                                break;
                        };
                        var $2145 = $2149;
                        break;
                };
                var $1984 = $2145;
                break;
            case 'Fm.Term.chr':
                var $2158 = self.chrx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2160 = _body$4;
                        var $2159 = $2160;
                        break;
                    case 'List.cons':
                        var $2161 = self.head;
                        var $2162 = self.tail;
                        var self = $2161;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2164 = self.file;
                                var $2165 = self.code;
                                var $2166 = self.name;
                                var $2167 = self.term;
                                var $2168 = self.type;
                                var $2169 = self.stat;
                                var $2170 = Fm$Term$lam$($2166, (_x$15 => {
                                    var $2171 = Fm$Term$desugar_cse$argument$(_name$1, $2162, _type$3, _body$4, _defs$5);
                                    return $2171;
                                }));
                                var $2163 = $2170;
                                break;
                        };
                        var $2159 = $2163;
                        break;
                };
                var $1984 = $2159;
                break;
            case 'Fm.Term.str':
                var $2172 = self.strx;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2174 = _body$4;
                        var $2173 = $2174;
                        break;
                    case 'List.cons':
                        var $2175 = self.head;
                        var $2176 = self.tail;
                        var self = $2175;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2178 = self.file;
                                var $2179 = self.code;
                                var $2180 = self.name;
                                var $2181 = self.term;
                                var $2182 = self.type;
                                var $2183 = self.stat;
                                var $2184 = Fm$Term$lam$($2180, (_x$15 => {
                                    var $2185 = Fm$Term$desugar_cse$argument$(_name$1, $2176, _type$3, _body$4, _defs$5);
                                    return $2185;
                                }));
                                var $2177 = $2184;
                                break;
                        };
                        var $2173 = $2177;
                        break;
                };
                var $1984 = $2173;
                break;
            case 'Fm.Term.cse':
                var $2186 = self.path;
                var $2187 = self.expr;
                var $2188 = self.name;
                var $2189 = self.with;
                var $2190 = self.cses;
                var $2191 = self.moti;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2193 = _body$4;
                        var $2192 = $2193;
                        break;
                    case 'List.cons':
                        var $2194 = self.head;
                        var $2195 = self.tail;
                        var self = $2194;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2197 = self.file;
                                var $2198 = self.code;
                                var $2199 = self.name;
                                var $2200 = self.term;
                                var $2201 = self.type;
                                var $2202 = self.stat;
                                var $2203 = Fm$Term$lam$($2199, (_x$20 => {
                                    var $2204 = Fm$Term$desugar_cse$argument$(_name$1, $2195, _type$3, _body$4, _defs$5);
                                    return $2204;
                                }));
                                var $2196 = $2203;
                                break;
                        };
                        var $2192 = $2196;
                        break;
                };
                var $1984 = $2192;
                break;
            case 'Fm.Term.ori':
                var $2205 = self.orig;
                var $2206 = self.expr;
                var self = _wyth$2;
                switch (self._) {
                    case 'List.nil':
                        var $2208 = _body$4;
                        var $2207 = $2208;
                        break;
                    case 'List.cons':
                        var $2209 = self.head;
                        var $2210 = self.tail;
                        var self = $2209;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $2212 = self.file;
                                var $2213 = self.code;
                                var $2214 = self.name;
                                var $2215 = self.term;
                                var $2216 = self.type;
                                var $2217 = self.stat;
                                var $2218 = Fm$Term$lam$($2214, (_x$16 => {
                                    var $2219 = Fm$Term$desugar_cse$argument$(_name$1, $2210, _type$3, _body$4, _defs$5);
                                    return $2219;
                                }));
                                var $2211 = $2218;
                                break;
                        };
                        var $2207 = $2211;
                        break;
                };
                var $1984 = $2207;
                break;
        };
        return $1984;
    };
    const Fm$Term$desugar_cse$argument = x0 => x1 => x2 => x3 => x4 => Fm$Term$desugar_cse$argument$(x0, x1, x2, x3, x4);

    function Maybe$or$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.none':
                var $2221 = _b$3;
                var $2220 = $2221;
                break;
            case 'Maybe.some':
                var $2222 = self.value;
                var $2223 = Maybe$some$($2222);
                var $2220 = $2223;
                break;
        };
        return $2220;
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
                        var $2224 = self.name;
                        var $2225 = self.indx;
                        var _expr$10 = (() => {
                            var $2228 = _expr$1;
                            var $2229 = _wyth$3;
                            let _expr$11 = $2228;
                            let _defn$10;
                            while ($2229._ === 'List.cons') {
                                _defn$10 = $2229.head;
                                var $2228 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2230 = self.file;
                                            var $2231 = self.code;
                                            var $2232 = self.name;
                                            var $2233 = self.term;
                                            var $2234 = self.type;
                                            var $2235 = self.stat;
                                            var $2236 = $2233;
                                            return $2236;
                                    };
                                })());
                                _expr$11 = $2228;
                                $2229 = $2229.tail;
                            }
                            return _expr$11;
                        })();
                        var $2226 = _expr$10;
                        return $2226;
                    case 'Fm.Term.ref':
                        var $2237 = self.name;
                        var _expr$9 = (() => {
                            var $2240 = _expr$1;
                            var $2241 = _wyth$3;
                            let _expr$10 = $2240;
                            let _defn$9;
                            while ($2241._ === 'List.cons') {
                                _defn$9 = $2241.head;
                                var $2240 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2242 = self.file;
                                            var $2243 = self.code;
                                            var $2244 = self.name;
                                            var $2245 = self.term;
                                            var $2246 = self.type;
                                            var $2247 = self.stat;
                                            var $2248 = $2245;
                                            return $2248;
                                    };
                                })());
                                _expr$10 = $2240;
                                $2241 = $2241.tail;
                            }
                            return _expr$10;
                        })();
                        var $2238 = _expr$9;
                        return $2238;
                    case 'Fm.Term.typ':
                        var _expr$8 = (() => {
                            var $2251 = _expr$1;
                            var $2252 = _wyth$3;
                            let _expr$9 = $2251;
                            let _defn$8;
                            while ($2252._ === 'List.cons') {
                                _defn$8 = $2252.head;
                                var $2251 = Fm$Term$app$(_expr$9, (() => {
                                    var self = _defn$8;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2253 = self.file;
                                            var $2254 = self.code;
                                            var $2255 = self.name;
                                            var $2256 = self.term;
                                            var $2257 = self.type;
                                            var $2258 = self.stat;
                                            var $2259 = $2256;
                                            return $2259;
                                    };
                                })());
                                _expr$9 = $2251;
                                $2252 = $2252.tail;
                            }
                            return _expr$9;
                        })();
                        var $2249 = _expr$8;
                        return $2249;
                    case 'Fm.Term.all':
                        var $2260 = self.eras;
                        var $2261 = self.self;
                        var $2262 = self.name;
                        var $2263 = self.xtyp;
                        var $2264 = self.body;
                        var _got$13 = Maybe$or$(Fm$get$($2262, _cses$4), Fm$get$("_", _cses$4));
                        var self = _got$13;
                        switch (self._) {
                            case 'Maybe.none':
                                var _expr$14 = (() => {
                                    var $2268 = _expr$1;
                                    var $2269 = _wyth$3;
                                    let _expr$15 = $2268;
                                    let _defn$14;
                                    while ($2269._ === 'List.cons') {
                                        _defn$14 = $2269.head;
                                        var self = _defn$14;
                                        switch (self._) {
                                            case 'Fm.Def.new':
                                                var $2270 = self.file;
                                                var $2271 = self.code;
                                                var $2272 = self.name;
                                                var $2273 = self.term;
                                                var $2274 = self.type;
                                                var $2275 = self.stat;
                                                var $2276 = Fm$Term$app$(_expr$15, $2273);
                                                var $2268 = $2276;
                                                break;
                                        };
                                        _expr$15 = $2268;
                                        $2269 = $2269.tail;
                                    }
                                    return _expr$15;
                                })();
                                var $2266 = _expr$14;
                                var $2265 = $2266;
                                break;
                            case 'Maybe.some':
                                var $2277 = self.value;
                                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, _wyth$3, $2263, $2277, _defs$6);
                                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                                var _type$17 = $2264(Fm$Term$var$($2261, 0n))(Fm$Term$var$($2262, 0n));
                                var $2278 = Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$6, _ctxt$7);
                                var $2265 = $2278;
                                break;
                        };
                        return $2265;
                    case 'Fm.Term.lam':
                        var $2279 = self.name;
                        var $2280 = self.body;
                        var _expr$10 = (() => {
                            var $2283 = _expr$1;
                            var $2284 = _wyth$3;
                            let _expr$11 = $2283;
                            let _defn$10;
                            while ($2284._ === 'List.cons') {
                                _defn$10 = $2284.head;
                                var $2283 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2285 = self.file;
                                            var $2286 = self.code;
                                            var $2287 = self.name;
                                            var $2288 = self.term;
                                            var $2289 = self.type;
                                            var $2290 = self.stat;
                                            var $2291 = $2288;
                                            return $2291;
                                    };
                                })());
                                _expr$11 = $2283;
                                $2284 = $2284.tail;
                            }
                            return _expr$11;
                        })();
                        var $2281 = _expr$10;
                        return $2281;
                    case 'Fm.Term.app':
                        var $2292 = self.func;
                        var $2293 = self.argm;
                        var _expr$10 = (() => {
                            var $2296 = _expr$1;
                            var $2297 = _wyth$3;
                            let _expr$11 = $2296;
                            let _defn$10;
                            while ($2297._ === 'List.cons') {
                                _defn$10 = $2297.head;
                                var $2296 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2298 = self.file;
                                            var $2299 = self.code;
                                            var $2300 = self.name;
                                            var $2301 = self.term;
                                            var $2302 = self.type;
                                            var $2303 = self.stat;
                                            var $2304 = $2301;
                                            return $2304;
                                    };
                                })());
                                _expr$11 = $2296;
                                $2297 = $2297.tail;
                            }
                            return _expr$11;
                        })();
                        var $2294 = _expr$10;
                        return $2294;
                    case 'Fm.Term.let':
                        var $2305 = self.name;
                        var $2306 = self.expr;
                        var $2307 = self.body;
                        var _expr$11 = (() => {
                            var $2310 = _expr$1;
                            var $2311 = _wyth$3;
                            let _expr$12 = $2310;
                            let _defn$11;
                            while ($2311._ === 'List.cons') {
                                _defn$11 = $2311.head;
                                var $2310 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2312 = self.file;
                                            var $2313 = self.code;
                                            var $2314 = self.name;
                                            var $2315 = self.term;
                                            var $2316 = self.type;
                                            var $2317 = self.stat;
                                            var $2318 = $2315;
                                            return $2318;
                                    };
                                })());
                                _expr$12 = $2310;
                                $2311 = $2311.tail;
                            }
                            return _expr$12;
                        })();
                        var $2308 = _expr$11;
                        return $2308;
                    case 'Fm.Term.def':
                        var $2319 = self.name;
                        var $2320 = self.expr;
                        var $2321 = self.body;
                        var _expr$11 = (() => {
                            var $2324 = _expr$1;
                            var $2325 = _wyth$3;
                            let _expr$12 = $2324;
                            let _defn$11;
                            while ($2325._ === 'List.cons') {
                                _defn$11 = $2325.head;
                                var $2324 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2326 = self.file;
                                            var $2327 = self.code;
                                            var $2328 = self.name;
                                            var $2329 = self.term;
                                            var $2330 = self.type;
                                            var $2331 = self.stat;
                                            var $2332 = $2329;
                                            return $2332;
                                    };
                                })());
                                _expr$12 = $2324;
                                $2325 = $2325.tail;
                            }
                            return _expr$12;
                        })();
                        var $2322 = _expr$11;
                        return $2322;
                    case 'Fm.Term.ann':
                        var $2333 = self.done;
                        var $2334 = self.term;
                        var $2335 = self.type;
                        var _expr$11 = (() => {
                            var $2338 = _expr$1;
                            var $2339 = _wyth$3;
                            let _expr$12 = $2338;
                            let _defn$11;
                            while ($2339._ === 'List.cons') {
                                _defn$11 = $2339.head;
                                var $2338 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2340 = self.file;
                                            var $2341 = self.code;
                                            var $2342 = self.name;
                                            var $2343 = self.term;
                                            var $2344 = self.type;
                                            var $2345 = self.stat;
                                            var $2346 = $2343;
                                            return $2346;
                                    };
                                })());
                                _expr$12 = $2338;
                                $2339 = $2339.tail;
                            }
                            return _expr$12;
                        })();
                        var $2336 = _expr$11;
                        return $2336;
                    case 'Fm.Term.gol':
                        var $2347 = self.name;
                        var $2348 = self.dref;
                        var $2349 = self.verb;
                        var _expr$11 = (() => {
                            var $2352 = _expr$1;
                            var $2353 = _wyth$3;
                            let _expr$12 = $2352;
                            let _defn$11;
                            while ($2353._ === 'List.cons') {
                                _defn$11 = $2353.head;
                                var $2352 = Fm$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2354 = self.file;
                                            var $2355 = self.code;
                                            var $2356 = self.name;
                                            var $2357 = self.term;
                                            var $2358 = self.type;
                                            var $2359 = self.stat;
                                            var $2360 = $2357;
                                            return $2360;
                                    };
                                })());
                                _expr$12 = $2352;
                                $2353 = $2353.tail;
                            }
                            return _expr$12;
                        })();
                        var $2350 = _expr$11;
                        return $2350;
                    case 'Fm.Term.hol':
                        var $2361 = self.path;
                        var _expr$9 = (() => {
                            var $2364 = _expr$1;
                            var $2365 = _wyth$3;
                            let _expr$10 = $2364;
                            let _defn$9;
                            while ($2365._ === 'List.cons') {
                                _defn$9 = $2365.head;
                                var $2364 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
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
                                _expr$10 = $2364;
                                $2365 = $2365.tail;
                            }
                            return _expr$10;
                        })();
                        var $2362 = _expr$9;
                        return $2362;
                    case 'Fm.Term.nat':
                        var $2373 = self.natx;
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
                    case 'Fm.Term.chr':
                        var $2385 = self.chrx;
                        var _expr$9 = (() => {
                            var $2388 = _expr$1;
                            var $2389 = _wyth$3;
                            let _expr$10 = $2388;
                            let _defn$9;
                            while ($2389._ === 'List.cons') {
                                _defn$9 = $2389.head;
                                var $2388 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2390 = self.file;
                                            var $2391 = self.code;
                                            var $2392 = self.name;
                                            var $2393 = self.term;
                                            var $2394 = self.type;
                                            var $2395 = self.stat;
                                            var $2396 = $2393;
                                            return $2396;
                                    };
                                })());
                                _expr$10 = $2388;
                                $2389 = $2389.tail;
                            }
                            return _expr$10;
                        })();
                        var $2386 = _expr$9;
                        return $2386;
                    case 'Fm.Term.str':
                        var $2397 = self.strx;
                        var _expr$9 = (() => {
                            var $2400 = _expr$1;
                            var $2401 = _wyth$3;
                            let _expr$10 = $2400;
                            let _defn$9;
                            while ($2401._ === 'List.cons') {
                                _defn$9 = $2401.head;
                                var $2400 = Fm$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2402 = self.file;
                                            var $2403 = self.code;
                                            var $2404 = self.name;
                                            var $2405 = self.term;
                                            var $2406 = self.type;
                                            var $2407 = self.stat;
                                            var $2408 = $2405;
                                            return $2408;
                                    };
                                })());
                                _expr$10 = $2400;
                                $2401 = $2401.tail;
                            }
                            return _expr$10;
                        })();
                        var $2398 = _expr$9;
                        return $2398;
                    case 'Fm.Term.cse':
                        var $2409 = self.path;
                        var $2410 = self.expr;
                        var $2411 = self.name;
                        var $2412 = self.with;
                        var $2413 = self.cses;
                        var $2414 = self.moti;
                        var _expr$14 = (() => {
                            var $2417 = _expr$1;
                            var $2418 = _wyth$3;
                            let _expr$15 = $2417;
                            let _defn$14;
                            while ($2418._ === 'List.cons') {
                                _defn$14 = $2418.head;
                                var $2417 = Fm$Term$app$(_expr$15, (() => {
                                    var self = _defn$14;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2419 = self.file;
                                            var $2420 = self.code;
                                            var $2421 = self.name;
                                            var $2422 = self.term;
                                            var $2423 = self.type;
                                            var $2424 = self.stat;
                                            var $2425 = $2422;
                                            return $2425;
                                    };
                                })());
                                _expr$15 = $2417;
                                $2418 = $2418.tail;
                            }
                            return _expr$15;
                        })();
                        var $2415 = _expr$14;
                        return $2415;
                    case 'Fm.Term.ori':
                        var $2426 = self.orig;
                        var $2427 = self.expr;
                        var _expr$10 = (() => {
                            var $2430 = _expr$1;
                            var $2431 = _wyth$3;
                            let _expr$11 = $2430;
                            let _defn$10;
                            while ($2431._ === 'List.cons') {
                                _defn$10 = $2431.head;
                                var $2430 = Fm$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2432 = self.file;
                                            var $2433 = self.code;
                                            var $2434 = self.name;
                                            var $2435 = self.term;
                                            var $2436 = self.type;
                                            var $2437 = self.stat;
                                            var $2438 = $2435;
                                            return $2438;
                                    };
                                })());
                                _expr$11 = $2430;
                                $2431 = $2431.tail;
                            }
                            return _expr$11;
                        })();
                        var $2428 = _expr$10;
                        return $2428;
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
                var $2440 = self.name;
                var $2441 = self.indx;
                var $2442 = Maybe$none;
                var $2439 = $2442;
                break;
            case 'Fm.Term.ref':
                var $2443 = self.name;
                var $2444 = Maybe$none;
                var $2439 = $2444;
                break;
            case 'Fm.Term.typ':
                var $2445 = Maybe$none;
                var $2439 = $2445;
                break;
            case 'Fm.Term.all':
                var $2446 = self.eras;
                var $2447 = self.self;
                var $2448 = self.name;
                var $2449 = self.xtyp;
                var $2450 = self.body;
                var _moti$14 = Fm$Term$desugar_cse$motive$(_with$3, _moti$5);
                var _argm$15 = Fm$Term$desugar_cse$argument$(_name$2, List$nil, $2449, _moti$14, _defs$7);
                var _expr$16 = Fm$Term$app$(_expr$1, _argm$15);
                var _type$17 = $2450(Fm$Term$var$($2447, 0n))(Fm$Term$var$($2448, 0n));
                var $2451 = Maybe$some$(Fm$Term$desugar_cse$cases$(_expr$16, _name$2, _with$3, _cses$4, _type$17, _defs$7, _ctxt$8));
                var $2439 = $2451;
                break;
            case 'Fm.Term.lam':
                var $2452 = self.name;
                var $2453 = self.body;
                var $2454 = Maybe$none;
                var $2439 = $2454;
                break;
            case 'Fm.Term.app':
                var $2455 = self.func;
                var $2456 = self.argm;
                var $2457 = Maybe$none;
                var $2439 = $2457;
                break;
            case 'Fm.Term.let':
                var $2458 = self.name;
                var $2459 = self.expr;
                var $2460 = self.body;
                var $2461 = Maybe$none;
                var $2439 = $2461;
                break;
            case 'Fm.Term.def':
                var $2462 = self.name;
                var $2463 = self.expr;
                var $2464 = self.body;
                var $2465 = Maybe$none;
                var $2439 = $2465;
                break;
            case 'Fm.Term.ann':
                var $2466 = self.done;
                var $2467 = self.term;
                var $2468 = self.type;
                var $2469 = Maybe$none;
                var $2439 = $2469;
                break;
            case 'Fm.Term.gol':
                var $2470 = self.name;
                var $2471 = self.dref;
                var $2472 = self.verb;
                var $2473 = Maybe$none;
                var $2439 = $2473;
                break;
            case 'Fm.Term.hol':
                var $2474 = self.path;
                var $2475 = Maybe$none;
                var $2439 = $2475;
                break;
            case 'Fm.Term.nat':
                var $2476 = self.natx;
                var $2477 = Maybe$none;
                var $2439 = $2477;
                break;
            case 'Fm.Term.chr':
                var $2478 = self.chrx;
                var $2479 = Maybe$none;
                var $2439 = $2479;
                break;
            case 'Fm.Term.str':
                var $2480 = self.strx;
                var $2481 = Maybe$none;
                var $2439 = $2481;
                break;
            case 'Fm.Term.cse':
                var $2482 = self.path;
                var $2483 = self.expr;
                var $2484 = self.name;
                var $2485 = self.with;
                var $2486 = self.cses;
                var $2487 = self.moti;
                var $2488 = Maybe$none;
                var $2439 = $2488;
                break;
            case 'Fm.Term.ori':
                var $2489 = self.orig;
                var $2490 = self.expr;
                var $2491 = Maybe$none;
                var $2439 = $2491;
                break;
        };
        return $2439;
    };
    const Fm$Term$desugar_cse = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Term$desugar_cse$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Error$patch$(_path$1, _term$2) {
        var $2492 = ({
            _: 'Fm.Error.patch',
            'path': _path$1,
            'term': _term$2
        });
        return $2492;
    };
    const Fm$Error$patch = x0 => x1 => Fm$Error$patch$(x0, x1);

    function Fm$MPath$to_bits$(_path$1) {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.none':
                var $2494 = Bits$e;
                var $2493 = $2494;
                break;
            case 'Maybe.some':
                var $2495 = self.value;
                var $2496 = $2495(Bits$e);
                var $2493 = $2496;
                break;
        };
        return $2493;
    };
    const Fm$MPath$to_bits = x0 => Fm$MPath$to_bits$(x0);

    function Set$has$(_bits$1, _set$2) {
        var self = Map$get$(_bits$1, _set$2);
        switch (self._) {
            case 'Maybe.none':
                var $2498 = Bool$false;
                var $2497 = $2498;
                break;
            case 'Maybe.some':
                var $2499 = self.value;
                var $2500 = Bool$true;
                var $2497 = $2500;
                break;
        };
        return $2497;
    };
    const Set$has = x0 => x1 => Set$has$(x0, x1);

    function Fm$Term$normalize$(_term$1, _defs$2) {
        var self = Fm$Term$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $2502 = self.name;
                var $2503 = self.indx;
                var $2504 = Fm$Term$var$($2502, $2503);
                var $2501 = $2504;
                break;
            case 'Fm.Term.ref':
                var $2505 = self.name;
                var $2506 = Fm$Term$ref$($2505);
                var $2501 = $2506;
                break;
            case 'Fm.Term.typ':
                var $2507 = Fm$Term$typ;
                var $2501 = $2507;
                break;
            case 'Fm.Term.all':
                var $2508 = self.eras;
                var $2509 = self.self;
                var $2510 = self.name;
                var $2511 = self.xtyp;
                var $2512 = self.body;
                var $2513 = Fm$Term$all$($2508, $2509, $2510, Fm$Term$normalize$($2511, _defs$2), (_s$8 => _x$9 => {
                    var $2514 = Fm$Term$normalize$($2512(_s$8)(_x$9), _defs$2);
                    return $2514;
                }));
                var $2501 = $2513;
                break;
            case 'Fm.Term.lam':
                var $2515 = self.name;
                var $2516 = self.body;
                var $2517 = Fm$Term$lam$($2515, (_x$5 => {
                    var $2518 = Fm$Term$normalize$($2516(_x$5), _defs$2);
                    return $2518;
                }));
                var $2501 = $2517;
                break;
            case 'Fm.Term.app':
                var $2519 = self.func;
                var $2520 = self.argm;
                var $2521 = Fm$Term$app$(Fm$Term$normalize$($2519, _defs$2), Fm$Term$normalize$($2520, _defs$2));
                var $2501 = $2521;
                break;
            case 'Fm.Term.let':
                var $2522 = self.name;
                var $2523 = self.expr;
                var $2524 = self.body;
                var $2525 = Fm$Term$let$($2522, Fm$Term$normalize$($2523, _defs$2), (_x$6 => {
                    var $2526 = Fm$Term$normalize$($2524(_x$6), _defs$2);
                    return $2526;
                }));
                var $2501 = $2525;
                break;
            case 'Fm.Term.def':
                var $2527 = self.name;
                var $2528 = self.expr;
                var $2529 = self.body;
                var $2530 = Fm$Term$def$($2527, Fm$Term$normalize$($2528, _defs$2), (_x$6 => {
                    var $2531 = Fm$Term$normalize$($2529(_x$6), _defs$2);
                    return $2531;
                }));
                var $2501 = $2530;
                break;
            case 'Fm.Term.ann':
                var $2532 = self.done;
                var $2533 = self.term;
                var $2534 = self.type;
                var $2535 = Fm$Term$ann$($2532, Fm$Term$normalize$($2533, _defs$2), Fm$Term$normalize$($2534, _defs$2));
                var $2501 = $2535;
                break;
            case 'Fm.Term.gol':
                var $2536 = self.name;
                var $2537 = self.dref;
                var $2538 = self.verb;
                var $2539 = Fm$Term$gol$($2536, $2537, $2538);
                var $2501 = $2539;
                break;
            case 'Fm.Term.hol':
                var $2540 = self.path;
                var $2541 = Fm$Term$hol$($2540);
                var $2501 = $2541;
                break;
            case 'Fm.Term.nat':
                var $2542 = self.natx;
                var $2543 = Fm$Term$nat$($2542);
                var $2501 = $2543;
                break;
            case 'Fm.Term.chr':
                var $2544 = self.chrx;
                var $2545 = Fm$Term$chr$($2544);
                var $2501 = $2545;
                break;
            case 'Fm.Term.str':
                var $2546 = self.strx;
                var $2547 = Fm$Term$str$($2546);
                var $2501 = $2547;
                break;
            case 'Fm.Term.cse':
                var $2548 = self.path;
                var $2549 = self.expr;
                var $2550 = self.name;
                var $2551 = self.with;
                var $2552 = self.cses;
                var $2553 = self.moti;
                var $2554 = _term$1;
                var $2501 = $2554;
                break;
            case 'Fm.Term.ori':
                var $2555 = self.orig;
                var $2556 = self.expr;
                var $2557 = Fm$Term$normalize$($2556, _defs$2);
                var $2501 = $2557;
                break;
        };
        return $2501;
    };
    const Fm$Term$normalize = x0 => x1 => Fm$Term$normalize$(x0, x1);

    function Fm$Term$equal$patch$(_path$1, _term$2) {
        var $2558 = Fm$Check$result$(Maybe$some$(Bool$true), List$cons$(Fm$Error$patch$(_path$1, Fm$Term$normalize$(_term$2, Map$new)), List$nil));
        return $2558;
    };
    const Fm$Term$equal$patch = x0 => x1 => Fm$Term$equal$patch$(x0, x1);

    function Set$set$(_bits$1, _set$2) {
        var $2559 = Map$set$(_bits$1, Unit$new, _set$2);
        return $2559;
    };
    const Set$set = x0 => x1 => Set$set$(x0, x1);

    function Bool$eql$(_a$1, _b$2) {
        var self = _a$1;
        if (self) {
            var $2561 = _b$2;
            var $2560 = $2561;
        } else {
            var $2562 = (!_b$2);
            var $2560 = $2562;
        };
        return $2560;
    };
    const Bool$eql = x0 => x1 => Bool$eql$(x0, x1);

    function Fm$Term$equal$(_a$1, _b$2, _defs$3, _lv$4, _seen$5) {
        var _ah$6 = Fm$Term$serialize$(Fm$Term$reduce$(_a$1, Map$new), _lv$4, _lv$4, Bits$e);
        var _bh$7 = Fm$Term$serialize$(Fm$Term$reduce$(_b$2, Map$new), _lv$4, _lv$4, Bits$e);
        var self = (_bh$7 === _ah$6);
        if (self) {
            var $2564 = Monad$pure$(Fm$Check$monad)(Bool$true);
            var $2563 = $2564;
        } else {
            var _a1$8 = Fm$Term$reduce$(_a$1, _defs$3);
            var _b1$9 = Fm$Term$reduce$(_b$2, _defs$3);
            var _ah$10 = Fm$Term$serialize$(_a1$8, _lv$4, _lv$4, Bits$e);
            var _bh$11 = Fm$Term$serialize$(_b1$9, _lv$4, _lv$4, Bits$e);
            var self = (_bh$11 === _ah$10);
            if (self) {
                var $2566 = Monad$pure$(Fm$Check$monad)(Bool$true);
                var $2565 = $2566;
            } else {
                var _id$12 = (_bh$11 + _ah$10);
                var self = Set$has$(_id$12, _seen$5);
                if (self) {
                    var $2568 = Monad$pure$(Fm$Check$monad)(Bool$true);
                    var $2567 = $2568;
                } else {
                    var self = _a1$8;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2570 = self.name;
                            var $2571 = self.indx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2573 = self.name;
                                    var $2574 = self.indx;
                                    var $2575 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2575;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2576 = self.name;
                                    var $2577 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2577;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2578 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2578;
                                    break;
                                case 'Fm.Term.all':
                                    var $2579 = self.eras;
                                    var $2580 = self.self;
                                    var $2581 = self.name;
                                    var $2582 = self.xtyp;
                                    var $2583 = self.body;
                                    var $2584 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2584;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2585 = self.name;
                                    var $2586 = self.body;
                                    var $2587 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2587;
                                    break;
                                case 'Fm.Term.app':
                                    var $2588 = self.func;
                                    var $2589 = self.argm;
                                    var $2590 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2590;
                                    break;
                                case 'Fm.Term.let':
                                    var $2591 = self.name;
                                    var $2592 = self.expr;
                                    var $2593 = self.body;
                                    var $2594 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2594;
                                    break;
                                case 'Fm.Term.def':
                                    var $2595 = self.name;
                                    var $2596 = self.expr;
                                    var $2597 = self.body;
                                    var $2598 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2598;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2599 = self.done;
                                    var $2600 = self.term;
                                    var $2601 = self.type;
                                    var $2602 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2602;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2603 = self.name;
                                    var $2604 = self.dref;
                                    var $2605 = self.verb;
                                    var $2606 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2606;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2607 = self.path;
                                    var $2608 = Fm$Term$equal$patch$($2607, _a$1);
                                    var $2572 = $2608;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2609 = self.natx;
                                    var $2610 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2610;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2611 = self.chrx;
                                    var $2612 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2612;
                                    break;
                                case 'Fm.Term.str':
                                    var $2613 = self.strx;
                                    var $2614 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2614;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2615 = self.path;
                                    var $2616 = self.expr;
                                    var $2617 = self.name;
                                    var $2618 = self.with;
                                    var $2619 = self.cses;
                                    var $2620 = self.moti;
                                    var $2621 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2621;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2622 = self.orig;
                                    var $2623 = self.expr;
                                    var $2624 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2572 = $2624;
                                    break;
                            };
                            var $2569 = $2572;
                            break;
                        case 'Fm.Term.ref':
                            var $2625 = self.name;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2627 = self.name;
                                    var $2628 = self.indx;
                                    var $2629 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2629;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2630 = self.name;
                                    var $2631 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2631;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2632 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2632;
                                    break;
                                case 'Fm.Term.all':
                                    var $2633 = self.eras;
                                    var $2634 = self.self;
                                    var $2635 = self.name;
                                    var $2636 = self.xtyp;
                                    var $2637 = self.body;
                                    var $2638 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2638;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2639 = self.name;
                                    var $2640 = self.body;
                                    var $2641 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2641;
                                    break;
                                case 'Fm.Term.app':
                                    var $2642 = self.func;
                                    var $2643 = self.argm;
                                    var $2644 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2644;
                                    break;
                                case 'Fm.Term.let':
                                    var $2645 = self.name;
                                    var $2646 = self.expr;
                                    var $2647 = self.body;
                                    var $2648 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2648;
                                    break;
                                case 'Fm.Term.def':
                                    var $2649 = self.name;
                                    var $2650 = self.expr;
                                    var $2651 = self.body;
                                    var $2652 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2652;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2653 = self.done;
                                    var $2654 = self.term;
                                    var $2655 = self.type;
                                    var $2656 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2656;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2657 = self.name;
                                    var $2658 = self.dref;
                                    var $2659 = self.verb;
                                    var $2660 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2660;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2661 = self.path;
                                    var $2662 = Fm$Term$equal$patch$($2661, _a$1);
                                    var $2626 = $2662;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2663 = self.natx;
                                    var $2664 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2664;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2665 = self.chrx;
                                    var $2666 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2666;
                                    break;
                                case 'Fm.Term.str':
                                    var $2667 = self.strx;
                                    var $2668 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2668;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2669 = self.path;
                                    var $2670 = self.expr;
                                    var $2671 = self.name;
                                    var $2672 = self.with;
                                    var $2673 = self.cses;
                                    var $2674 = self.moti;
                                    var $2675 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2675;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2676 = self.orig;
                                    var $2677 = self.expr;
                                    var $2678 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2626 = $2678;
                                    break;
                            };
                            var $2569 = $2626;
                            break;
                        case 'Fm.Term.typ':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2680 = self.name;
                                    var $2681 = self.indx;
                                    var $2682 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2682;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2683 = self.name;
                                    var $2684 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2684;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2685 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2685;
                                    break;
                                case 'Fm.Term.all':
                                    var $2686 = self.eras;
                                    var $2687 = self.self;
                                    var $2688 = self.name;
                                    var $2689 = self.xtyp;
                                    var $2690 = self.body;
                                    var $2691 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2691;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2692 = self.name;
                                    var $2693 = self.body;
                                    var $2694 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2694;
                                    break;
                                case 'Fm.Term.app':
                                    var $2695 = self.func;
                                    var $2696 = self.argm;
                                    var $2697 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2697;
                                    break;
                                case 'Fm.Term.let':
                                    var $2698 = self.name;
                                    var $2699 = self.expr;
                                    var $2700 = self.body;
                                    var $2701 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2701;
                                    break;
                                case 'Fm.Term.def':
                                    var $2702 = self.name;
                                    var $2703 = self.expr;
                                    var $2704 = self.body;
                                    var $2705 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2705;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2706 = self.done;
                                    var $2707 = self.term;
                                    var $2708 = self.type;
                                    var $2709 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2709;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2710 = self.name;
                                    var $2711 = self.dref;
                                    var $2712 = self.verb;
                                    var $2713 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2713;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2714 = self.path;
                                    var $2715 = Fm$Term$equal$patch$($2714, _a$1);
                                    var $2679 = $2715;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2716 = self.natx;
                                    var $2717 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2717;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2718 = self.chrx;
                                    var $2719 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2719;
                                    break;
                                case 'Fm.Term.str':
                                    var $2720 = self.strx;
                                    var $2721 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2721;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2722 = self.path;
                                    var $2723 = self.expr;
                                    var $2724 = self.name;
                                    var $2725 = self.with;
                                    var $2726 = self.cses;
                                    var $2727 = self.moti;
                                    var $2728 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2728;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2729 = self.orig;
                                    var $2730 = self.expr;
                                    var $2731 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2679 = $2731;
                                    break;
                            };
                            var $2569 = $2679;
                            break;
                        case 'Fm.Term.all':
                            var $2732 = self.eras;
                            var $2733 = self.self;
                            var $2734 = self.name;
                            var $2735 = self.xtyp;
                            var $2736 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2738 = self.name;
                                    var $2739 = self.indx;
                                    var $2740 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2740;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2741 = self.name;
                                    var $2742 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2742;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2743 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2743;
                                    break;
                                case 'Fm.Term.all':
                                    var $2744 = self.eras;
                                    var $2745 = self.self;
                                    var $2746 = self.name;
                                    var $2747 = self.xtyp;
                                    var $2748 = self.body;
                                    var _seen$23 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$24 = $2736(Fm$Term$var$($2733, _lv$4))(Fm$Term$var$($2734, Nat$succ$(_lv$4)));
                                    var _b1_body$25 = $2748(Fm$Term$var$($2745, _lv$4))(Fm$Term$var$($2746, Nat$succ$(_lv$4)));
                                    var _eq_self$26 = ($2733 === $2745);
                                    var _eq_eras$27 = Bool$eql$($2732, $2744);
                                    var self = (_eq_self$26 && _eq_eras$27);
                                    if (self) {
                                        var $2750 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2735, $2747, _defs$3, _lv$4, _seen$23))((_eq_type$28 => {
                                            var $2751 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$24, _b1_body$25, _defs$3, Nat$succ$(Nat$succ$(_lv$4)), _seen$23))((_eq_body$29 => {
                                                var $2752 = Monad$pure$(Fm$Check$monad)((_eq_type$28 && _eq_body$29));
                                                return $2752;
                                            }));
                                            return $2751;
                                        }));
                                        var $2749 = $2750;
                                    } else {
                                        var $2753 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                        var $2749 = $2753;
                                    };
                                    var $2737 = $2749;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2754 = self.name;
                                    var $2755 = self.body;
                                    var $2756 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2756;
                                    break;
                                case 'Fm.Term.app':
                                    var $2757 = self.func;
                                    var $2758 = self.argm;
                                    var $2759 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2759;
                                    break;
                                case 'Fm.Term.let':
                                    var $2760 = self.name;
                                    var $2761 = self.expr;
                                    var $2762 = self.body;
                                    var $2763 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2763;
                                    break;
                                case 'Fm.Term.def':
                                    var $2764 = self.name;
                                    var $2765 = self.expr;
                                    var $2766 = self.body;
                                    var $2767 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2767;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2768 = self.done;
                                    var $2769 = self.term;
                                    var $2770 = self.type;
                                    var $2771 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2771;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2772 = self.name;
                                    var $2773 = self.dref;
                                    var $2774 = self.verb;
                                    var $2775 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2775;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2776 = self.path;
                                    var $2777 = Fm$Term$equal$patch$($2776, _a$1);
                                    var $2737 = $2777;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2778 = self.natx;
                                    var $2779 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2779;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2780 = self.chrx;
                                    var $2781 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2781;
                                    break;
                                case 'Fm.Term.str':
                                    var $2782 = self.strx;
                                    var $2783 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2783;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2784 = self.path;
                                    var $2785 = self.expr;
                                    var $2786 = self.name;
                                    var $2787 = self.with;
                                    var $2788 = self.cses;
                                    var $2789 = self.moti;
                                    var $2790 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2790;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2791 = self.orig;
                                    var $2792 = self.expr;
                                    var $2793 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2737 = $2793;
                                    break;
                            };
                            var $2569 = $2737;
                            break;
                        case 'Fm.Term.lam':
                            var $2794 = self.name;
                            var $2795 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2797 = self.name;
                                    var $2798 = self.indx;
                                    var $2799 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2799;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2800 = self.name;
                                    var $2801 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2801;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2802 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2802;
                                    break;
                                case 'Fm.Term.all':
                                    var $2803 = self.eras;
                                    var $2804 = self.self;
                                    var $2805 = self.name;
                                    var $2806 = self.xtyp;
                                    var $2807 = self.body;
                                    var $2808 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2808;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2809 = self.name;
                                    var $2810 = self.body;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$18 = $2795(Fm$Term$var$($2794, _lv$4));
                                    var _b1_body$19 = $2810(Fm$Term$var$($2809, _lv$4));
                                    var $2811 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$18, _b1_body$19, _defs$3, Nat$succ$(_lv$4), _seen$17))((_eq_body$20 => {
                                        var $2812 = Monad$pure$(Fm$Check$monad)(_eq_body$20);
                                        return $2812;
                                    }));
                                    var $2796 = $2811;
                                    break;
                                case 'Fm.Term.app':
                                    var $2813 = self.func;
                                    var $2814 = self.argm;
                                    var $2815 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2815;
                                    break;
                                case 'Fm.Term.let':
                                    var $2816 = self.name;
                                    var $2817 = self.expr;
                                    var $2818 = self.body;
                                    var $2819 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2819;
                                    break;
                                case 'Fm.Term.def':
                                    var $2820 = self.name;
                                    var $2821 = self.expr;
                                    var $2822 = self.body;
                                    var $2823 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2823;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2824 = self.done;
                                    var $2825 = self.term;
                                    var $2826 = self.type;
                                    var $2827 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2827;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2828 = self.name;
                                    var $2829 = self.dref;
                                    var $2830 = self.verb;
                                    var $2831 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2831;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2832 = self.path;
                                    var $2833 = Fm$Term$equal$patch$($2832, _a$1);
                                    var $2796 = $2833;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2834 = self.natx;
                                    var $2835 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2835;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2836 = self.chrx;
                                    var $2837 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2837;
                                    break;
                                case 'Fm.Term.str':
                                    var $2838 = self.strx;
                                    var $2839 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2839;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2840 = self.path;
                                    var $2841 = self.expr;
                                    var $2842 = self.name;
                                    var $2843 = self.with;
                                    var $2844 = self.cses;
                                    var $2845 = self.moti;
                                    var $2846 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2846;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2847 = self.orig;
                                    var $2848 = self.expr;
                                    var $2849 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2796 = $2849;
                                    break;
                            };
                            var $2569 = $2796;
                            break;
                        case 'Fm.Term.app':
                            var $2850 = self.func;
                            var $2851 = self.argm;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2853 = self.name;
                                    var $2854 = self.indx;
                                    var $2855 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2855;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2856 = self.name;
                                    var $2857 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2857;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2858 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2858;
                                    break;
                                case 'Fm.Term.all':
                                    var $2859 = self.eras;
                                    var $2860 = self.self;
                                    var $2861 = self.name;
                                    var $2862 = self.xtyp;
                                    var $2863 = self.body;
                                    var $2864 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2864;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2865 = self.name;
                                    var $2866 = self.body;
                                    var $2867 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2867;
                                    break;
                                case 'Fm.Term.app':
                                    var $2868 = self.func;
                                    var $2869 = self.argm;
                                    var _seen$17 = Set$set$(_id$12, _seen$5);
                                    var $2870 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2850, $2868, _defs$3, _lv$4, _seen$17))((_eq_func$18 => {
                                        var $2871 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2851, $2869, _defs$3, _lv$4, _seen$17))((_eq_argm$19 => {
                                            var $2872 = Monad$pure$(Fm$Check$monad)((_eq_func$18 && _eq_argm$19));
                                            return $2872;
                                        }));
                                        return $2871;
                                    }));
                                    var $2852 = $2870;
                                    break;
                                case 'Fm.Term.let':
                                    var $2873 = self.name;
                                    var $2874 = self.expr;
                                    var $2875 = self.body;
                                    var $2876 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2876;
                                    break;
                                case 'Fm.Term.def':
                                    var $2877 = self.name;
                                    var $2878 = self.expr;
                                    var $2879 = self.body;
                                    var $2880 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2880;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2881 = self.done;
                                    var $2882 = self.term;
                                    var $2883 = self.type;
                                    var $2884 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2884;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2885 = self.name;
                                    var $2886 = self.dref;
                                    var $2887 = self.verb;
                                    var $2888 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2888;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2889 = self.path;
                                    var $2890 = Fm$Term$equal$patch$($2889, _a$1);
                                    var $2852 = $2890;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2891 = self.natx;
                                    var $2892 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2892;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2893 = self.chrx;
                                    var $2894 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2894;
                                    break;
                                case 'Fm.Term.str':
                                    var $2895 = self.strx;
                                    var $2896 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2896;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2897 = self.path;
                                    var $2898 = self.expr;
                                    var $2899 = self.name;
                                    var $2900 = self.with;
                                    var $2901 = self.cses;
                                    var $2902 = self.moti;
                                    var $2903 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2903;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2904 = self.orig;
                                    var $2905 = self.expr;
                                    var $2906 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2852 = $2906;
                                    break;
                            };
                            var $2569 = $2852;
                            break;
                        case 'Fm.Term.let':
                            var $2907 = self.name;
                            var $2908 = self.expr;
                            var $2909 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2911 = self.name;
                                    var $2912 = self.indx;
                                    var $2913 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2913;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2914 = self.name;
                                    var $2915 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2915;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2916 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2916;
                                    break;
                                case 'Fm.Term.all':
                                    var $2917 = self.eras;
                                    var $2918 = self.self;
                                    var $2919 = self.name;
                                    var $2920 = self.xtyp;
                                    var $2921 = self.body;
                                    var $2922 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2922;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2923 = self.name;
                                    var $2924 = self.body;
                                    var $2925 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2925;
                                    break;
                                case 'Fm.Term.app':
                                    var $2926 = self.func;
                                    var $2927 = self.argm;
                                    var $2928 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2928;
                                    break;
                                case 'Fm.Term.let':
                                    var $2929 = self.name;
                                    var $2930 = self.expr;
                                    var $2931 = self.body;
                                    var _seen$19 = Set$set$(_id$12, _seen$5);
                                    var _a1_body$20 = $2909(Fm$Term$var$($2907, _lv$4));
                                    var _b1_body$21 = $2931(Fm$Term$var$($2929, _lv$4));
                                    var $2932 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($2908, $2930, _defs$3, _lv$4, _seen$19))((_eq_expr$22 => {
                                        var $2933 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$(_a1_body$20, _b1_body$21, _defs$3, Nat$succ$(_lv$4), _seen$19))((_eq_body$23 => {
                                            var $2934 = Monad$pure$(Fm$Check$monad)((_eq_expr$22 && _eq_body$23));
                                            return $2934;
                                        }));
                                        return $2933;
                                    }));
                                    var $2910 = $2932;
                                    break;
                                case 'Fm.Term.def':
                                    var $2935 = self.name;
                                    var $2936 = self.expr;
                                    var $2937 = self.body;
                                    var $2938 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2938;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2939 = self.done;
                                    var $2940 = self.term;
                                    var $2941 = self.type;
                                    var $2942 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2942;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2943 = self.name;
                                    var $2944 = self.dref;
                                    var $2945 = self.verb;
                                    var $2946 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2946;
                                    break;
                                case 'Fm.Term.hol':
                                    var $2947 = self.path;
                                    var $2948 = Fm$Term$equal$patch$($2947, _a$1);
                                    var $2910 = $2948;
                                    break;
                                case 'Fm.Term.nat':
                                    var $2949 = self.natx;
                                    var $2950 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2950;
                                    break;
                                case 'Fm.Term.chr':
                                    var $2951 = self.chrx;
                                    var $2952 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2952;
                                    break;
                                case 'Fm.Term.str':
                                    var $2953 = self.strx;
                                    var $2954 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2954;
                                    break;
                                case 'Fm.Term.cse':
                                    var $2955 = self.path;
                                    var $2956 = self.expr;
                                    var $2957 = self.name;
                                    var $2958 = self.with;
                                    var $2959 = self.cses;
                                    var $2960 = self.moti;
                                    var $2961 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2961;
                                    break;
                                case 'Fm.Term.ori':
                                    var $2962 = self.orig;
                                    var $2963 = self.expr;
                                    var $2964 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2910 = $2964;
                                    break;
                            };
                            var $2569 = $2910;
                            break;
                        case 'Fm.Term.def':
                            var $2965 = self.name;
                            var $2966 = self.expr;
                            var $2967 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $2969 = self.name;
                                    var $2970 = self.indx;
                                    var $2971 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2971;
                                    break;
                                case 'Fm.Term.ref':
                                    var $2972 = self.name;
                                    var $2973 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2973;
                                    break;
                                case 'Fm.Term.typ':
                                    var $2974 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2974;
                                    break;
                                case 'Fm.Term.all':
                                    var $2975 = self.eras;
                                    var $2976 = self.self;
                                    var $2977 = self.name;
                                    var $2978 = self.xtyp;
                                    var $2979 = self.body;
                                    var $2980 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2980;
                                    break;
                                case 'Fm.Term.lam':
                                    var $2981 = self.name;
                                    var $2982 = self.body;
                                    var $2983 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2983;
                                    break;
                                case 'Fm.Term.app':
                                    var $2984 = self.func;
                                    var $2985 = self.argm;
                                    var $2986 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2986;
                                    break;
                                case 'Fm.Term.let':
                                    var $2987 = self.name;
                                    var $2988 = self.expr;
                                    var $2989 = self.body;
                                    var $2990 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2990;
                                    break;
                                case 'Fm.Term.def':
                                    var $2991 = self.name;
                                    var $2992 = self.expr;
                                    var $2993 = self.body;
                                    var $2994 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2994;
                                    break;
                                case 'Fm.Term.ann':
                                    var $2995 = self.done;
                                    var $2996 = self.term;
                                    var $2997 = self.type;
                                    var $2998 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $2998;
                                    break;
                                case 'Fm.Term.gol':
                                    var $2999 = self.name;
                                    var $3000 = self.dref;
                                    var $3001 = self.verb;
                                    var $3002 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3002;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3003 = self.path;
                                    var $3004 = Fm$Term$equal$patch$($3003, _a$1);
                                    var $2968 = $3004;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3005 = self.natx;
                                    var $3006 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3006;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3007 = self.chrx;
                                    var $3008 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3008;
                                    break;
                                case 'Fm.Term.str':
                                    var $3009 = self.strx;
                                    var $3010 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3010;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3011 = self.path;
                                    var $3012 = self.expr;
                                    var $3013 = self.name;
                                    var $3014 = self.with;
                                    var $3015 = self.cses;
                                    var $3016 = self.moti;
                                    var $3017 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3017;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3018 = self.orig;
                                    var $3019 = self.expr;
                                    var $3020 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $2968 = $3020;
                                    break;
                            };
                            var $2569 = $2968;
                            break;
                        case 'Fm.Term.ann':
                            var $3021 = self.done;
                            var $3022 = self.term;
                            var $3023 = self.type;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3025 = self.name;
                                    var $3026 = self.indx;
                                    var $3027 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3027;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3028 = self.name;
                                    var $3029 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3029;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3030 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3030;
                                    break;
                                case 'Fm.Term.all':
                                    var $3031 = self.eras;
                                    var $3032 = self.self;
                                    var $3033 = self.name;
                                    var $3034 = self.xtyp;
                                    var $3035 = self.body;
                                    var $3036 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3036;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3037 = self.name;
                                    var $3038 = self.body;
                                    var $3039 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3039;
                                    break;
                                case 'Fm.Term.app':
                                    var $3040 = self.func;
                                    var $3041 = self.argm;
                                    var $3042 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3042;
                                    break;
                                case 'Fm.Term.let':
                                    var $3043 = self.name;
                                    var $3044 = self.expr;
                                    var $3045 = self.body;
                                    var $3046 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3046;
                                    break;
                                case 'Fm.Term.def':
                                    var $3047 = self.name;
                                    var $3048 = self.expr;
                                    var $3049 = self.body;
                                    var $3050 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3050;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3051 = self.done;
                                    var $3052 = self.term;
                                    var $3053 = self.type;
                                    var $3054 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3054;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3055 = self.name;
                                    var $3056 = self.dref;
                                    var $3057 = self.verb;
                                    var $3058 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3058;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3059 = self.path;
                                    var $3060 = Fm$Term$equal$patch$($3059, _a$1);
                                    var $3024 = $3060;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3061 = self.natx;
                                    var $3062 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3062;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3063 = self.chrx;
                                    var $3064 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3064;
                                    break;
                                case 'Fm.Term.str':
                                    var $3065 = self.strx;
                                    var $3066 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3066;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3067 = self.path;
                                    var $3068 = self.expr;
                                    var $3069 = self.name;
                                    var $3070 = self.with;
                                    var $3071 = self.cses;
                                    var $3072 = self.moti;
                                    var $3073 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3073;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3074 = self.orig;
                                    var $3075 = self.expr;
                                    var $3076 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3024 = $3076;
                                    break;
                            };
                            var $2569 = $3024;
                            break;
                        case 'Fm.Term.gol':
                            var $3077 = self.name;
                            var $3078 = self.dref;
                            var $3079 = self.verb;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3081 = self.name;
                                    var $3082 = self.indx;
                                    var $3083 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3083;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3084 = self.name;
                                    var $3085 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3085;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3086 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3086;
                                    break;
                                case 'Fm.Term.all':
                                    var $3087 = self.eras;
                                    var $3088 = self.self;
                                    var $3089 = self.name;
                                    var $3090 = self.xtyp;
                                    var $3091 = self.body;
                                    var $3092 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3092;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3093 = self.name;
                                    var $3094 = self.body;
                                    var $3095 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3095;
                                    break;
                                case 'Fm.Term.app':
                                    var $3096 = self.func;
                                    var $3097 = self.argm;
                                    var $3098 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3098;
                                    break;
                                case 'Fm.Term.let':
                                    var $3099 = self.name;
                                    var $3100 = self.expr;
                                    var $3101 = self.body;
                                    var $3102 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3102;
                                    break;
                                case 'Fm.Term.def':
                                    var $3103 = self.name;
                                    var $3104 = self.expr;
                                    var $3105 = self.body;
                                    var $3106 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3106;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3107 = self.done;
                                    var $3108 = self.term;
                                    var $3109 = self.type;
                                    var $3110 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3110;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3111 = self.name;
                                    var $3112 = self.dref;
                                    var $3113 = self.verb;
                                    var $3114 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3114;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3115 = self.path;
                                    var $3116 = Fm$Term$equal$patch$($3115, _a$1);
                                    var $3080 = $3116;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3117 = self.natx;
                                    var $3118 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3118;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3119 = self.chrx;
                                    var $3120 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3120;
                                    break;
                                case 'Fm.Term.str':
                                    var $3121 = self.strx;
                                    var $3122 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3122;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3123 = self.path;
                                    var $3124 = self.expr;
                                    var $3125 = self.name;
                                    var $3126 = self.with;
                                    var $3127 = self.cses;
                                    var $3128 = self.moti;
                                    var $3129 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3129;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3130 = self.orig;
                                    var $3131 = self.expr;
                                    var $3132 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3080 = $3132;
                                    break;
                            };
                            var $2569 = $3080;
                            break;
                        case 'Fm.Term.hol':
                            var $3133 = self.path;
                            var $3134 = Fm$Term$equal$patch$($3133, _b$2);
                            var $2569 = $3134;
                            break;
                        case 'Fm.Term.nat':
                            var $3135 = self.natx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3137 = self.name;
                                    var $3138 = self.indx;
                                    var $3139 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3139;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3140 = self.name;
                                    var $3141 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3141;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3142 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3142;
                                    break;
                                case 'Fm.Term.all':
                                    var $3143 = self.eras;
                                    var $3144 = self.self;
                                    var $3145 = self.name;
                                    var $3146 = self.xtyp;
                                    var $3147 = self.body;
                                    var $3148 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3148;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3149 = self.name;
                                    var $3150 = self.body;
                                    var $3151 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3151;
                                    break;
                                case 'Fm.Term.app':
                                    var $3152 = self.func;
                                    var $3153 = self.argm;
                                    var $3154 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3154;
                                    break;
                                case 'Fm.Term.let':
                                    var $3155 = self.name;
                                    var $3156 = self.expr;
                                    var $3157 = self.body;
                                    var $3158 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3158;
                                    break;
                                case 'Fm.Term.def':
                                    var $3159 = self.name;
                                    var $3160 = self.expr;
                                    var $3161 = self.body;
                                    var $3162 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3162;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3163 = self.done;
                                    var $3164 = self.term;
                                    var $3165 = self.type;
                                    var $3166 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3166;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3167 = self.name;
                                    var $3168 = self.dref;
                                    var $3169 = self.verb;
                                    var $3170 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3170;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3171 = self.path;
                                    var $3172 = Fm$Term$equal$patch$($3171, _a$1);
                                    var $3136 = $3172;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3173 = self.natx;
                                    var $3174 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3174;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3175 = self.chrx;
                                    var $3176 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3176;
                                    break;
                                case 'Fm.Term.str':
                                    var $3177 = self.strx;
                                    var $3178 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3178;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3179 = self.path;
                                    var $3180 = self.expr;
                                    var $3181 = self.name;
                                    var $3182 = self.with;
                                    var $3183 = self.cses;
                                    var $3184 = self.moti;
                                    var $3185 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3185;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3186 = self.orig;
                                    var $3187 = self.expr;
                                    var $3188 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3136 = $3188;
                                    break;
                            };
                            var $2569 = $3136;
                            break;
                        case 'Fm.Term.chr':
                            var $3189 = self.chrx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3191 = self.name;
                                    var $3192 = self.indx;
                                    var $3193 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3193;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3194 = self.name;
                                    var $3195 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3195;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3196 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3196;
                                    break;
                                case 'Fm.Term.all':
                                    var $3197 = self.eras;
                                    var $3198 = self.self;
                                    var $3199 = self.name;
                                    var $3200 = self.xtyp;
                                    var $3201 = self.body;
                                    var $3202 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3202;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3203 = self.name;
                                    var $3204 = self.body;
                                    var $3205 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3205;
                                    break;
                                case 'Fm.Term.app':
                                    var $3206 = self.func;
                                    var $3207 = self.argm;
                                    var $3208 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3208;
                                    break;
                                case 'Fm.Term.let':
                                    var $3209 = self.name;
                                    var $3210 = self.expr;
                                    var $3211 = self.body;
                                    var $3212 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3212;
                                    break;
                                case 'Fm.Term.def':
                                    var $3213 = self.name;
                                    var $3214 = self.expr;
                                    var $3215 = self.body;
                                    var $3216 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3216;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3217 = self.done;
                                    var $3218 = self.term;
                                    var $3219 = self.type;
                                    var $3220 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3220;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3221 = self.name;
                                    var $3222 = self.dref;
                                    var $3223 = self.verb;
                                    var $3224 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3224;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3225 = self.path;
                                    var $3226 = Fm$Term$equal$patch$($3225, _a$1);
                                    var $3190 = $3226;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3227 = self.natx;
                                    var $3228 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3228;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3229 = self.chrx;
                                    var $3230 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3230;
                                    break;
                                case 'Fm.Term.str':
                                    var $3231 = self.strx;
                                    var $3232 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3232;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3233 = self.path;
                                    var $3234 = self.expr;
                                    var $3235 = self.name;
                                    var $3236 = self.with;
                                    var $3237 = self.cses;
                                    var $3238 = self.moti;
                                    var $3239 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3239;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3240 = self.orig;
                                    var $3241 = self.expr;
                                    var $3242 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3190 = $3242;
                                    break;
                            };
                            var $2569 = $3190;
                            break;
                        case 'Fm.Term.str':
                            var $3243 = self.strx;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3245 = self.name;
                                    var $3246 = self.indx;
                                    var $3247 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3247;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3248 = self.name;
                                    var $3249 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3249;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3250 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3250;
                                    break;
                                case 'Fm.Term.all':
                                    var $3251 = self.eras;
                                    var $3252 = self.self;
                                    var $3253 = self.name;
                                    var $3254 = self.xtyp;
                                    var $3255 = self.body;
                                    var $3256 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3256;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3257 = self.name;
                                    var $3258 = self.body;
                                    var $3259 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3259;
                                    break;
                                case 'Fm.Term.app':
                                    var $3260 = self.func;
                                    var $3261 = self.argm;
                                    var $3262 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3262;
                                    break;
                                case 'Fm.Term.let':
                                    var $3263 = self.name;
                                    var $3264 = self.expr;
                                    var $3265 = self.body;
                                    var $3266 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3266;
                                    break;
                                case 'Fm.Term.def':
                                    var $3267 = self.name;
                                    var $3268 = self.expr;
                                    var $3269 = self.body;
                                    var $3270 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3270;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3271 = self.done;
                                    var $3272 = self.term;
                                    var $3273 = self.type;
                                    var $3274 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3274;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3275 = self.name;
                                    var $3276 = self.dref;
                                    var $3277 = self.verb;
                                    var $3278 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3278;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3279 = self.path;
                                    var $3280 = Fm$Term$equal$patch$($3279, _a$1);
                                    var $3244 = $3280;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3281 = self.natx;
                                    var $3282 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3282;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3283 = self.chrx;
                                    var $3284 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3284;
                                    break;
                                case 'Fm.Term.str':
                                    var $3285 = self.strx;
                                    var $3286 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3286;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3287 = self.path;
                                    var $3288 = self.expr;
                                    var $3289 = self.name;
                                    var $3290 = self.with;
                                    var $3291 = self.cses;
                                    var $3292 = self.moti;
                                    var $3293 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3293;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3294 = self.orig;
                                    var $3295 = self.expr;
                                    var $3296 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3244 = $3296;
                                    break;
                            };
                            var $2569 = $3244;
                            break;
                        case 'Fm.Term.cse':
                            var $3297 = self.path;
                            var $3298 = self.expr;
                            var $3299 = self.name;
                            var $3300 = self.with;
                            var $3301 = self.cses;
                            var $3302 = self.moti;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3304 = self.name;
                                    var $3305 = self.indx;
                                    var $3306 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3306;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3307 = self.name;
                                    var $3308 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3308;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3309 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3309;
                                    break;
                                case 'Fm.Term.all':
                                    var $3310 = self.eras;
                                    var $3311 = self.self;
                                    var $3312 = self.name;
                                    var $3313 = self.xtyp;
                                    var $3314 = self.body;
                                    var $3315 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3315;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3316 = self.name;
                                    var $3317 = self.body;
                                    var $3318 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3318;
                                    break;
                                case 'Fm.Term.app':
                                    var $3319 = self.func;
                                    var $3320 = self.argm;
                                    var $3321 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3321;
                                    break;
                                case 'Fm.Term.let':
                                    var $3322 = self.name;
                                    var $3323 = self.expr;
                                    var $3324 = self.body;
                                    var $3325 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3325;
                                    break;
                                case 'Fm.Term.def':
                                    var $3326 = self.name;
                                    var $3327 = self.expr;
                                    var $3328 = self.body;
                                    var $3329 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3329;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3330 = self.done;
                                    var $3331 = self.term;
                                    var $3332 = self.type;
                                    var $3333 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3333;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3334 = self.name;
                                    var $3335 = self.dref;
                                    var $3336 = self.verb;
                                    var $3337 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3337;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3338 = self.path;
                                    var $3339 = Fm$Term$equal$patch$($3338, _a$1);
                                    var $3303 = $3339;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3340 = self.natx;
                                    var $3341 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3341;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3342 = self.chrx;
                                    var $3343 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3343;
                                    break;
                                case 'Fm.Term.str':
                                    var $3344 = self.strx;
                                    var $3345 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3345;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3346 = self.path;
                                    var $3347 = self.expr;
                                    var $3348 = self.name;
                                    var $3349 = self.with;
                                    var $3350 = self.cses;
                                    var $3351 = self.moti;
                                    var $3352 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3352;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3353 = self.orig;
                                    var $3354 = self.expr;
                                    var $3355 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3303 = $3355;
                                    break;
                            };
                            var $2569 = $3303;
                            break;
                        case 'Fm.Term.ori':
                            var $3356 = self.orig;
                            var $3357 = self.expr;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3359 = self.name;
                                    var $3360 = self.indx;
                                    var $3361 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3361;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3362 = self.name;
                                    var $3363 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3363;
                                    break;
                                case 'Fm.Term.typ':
                                    var $3364 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3364;
                                    break;
                                case 'Fm.Term.all':
                                    var $3365 = self.eras;
                                    var $3366 = self.self;
                                    var $3367 = self.name;
                                    var $3368 = self.xtyp;
                                    var $3369 = self.body;
                                    var $3370 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3370;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3371 = self.name;
                                    var $3372 = self.body;
                                    var $3373 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3373;
                                    break;
                                case 'Fm.Term.app':
                                    var $3374 = self.func;
                                    var $3375 = self.argm;
                                    var $3376 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3376;
                                    break;
                                case 'Fm.Term.let':
                                    var $3377 = self.name;
                                    var $3378 = self.expr;
                                    var $3379 = self.body;
                                    var $3380 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3380;
                                    break;
                                case 'Fm.Term.def':
                                    var $3381 = self.name;
                                    var $3382 = self.expr;
                                    var $3383 = self.body;
                                    var $3384 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3384;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3385 = self.done;
                                    var $3386 = self.term;
                                    var $3387 = self.type;
                                    var $3388 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3388;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3389 = self.name;
                                    var $3390 = self.dref;
                                    var $3391 = self.verb;
                                    var $3392 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3392;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3393 = self.path;
                                    var $3394 = Fm$Term$equal$patch$($3393, _a$1);
                                    var $3358 = $3394;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3395 = self.natx;
                                    var $3396 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3396;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3397 = self.chrx;
                                    var $3398 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3398;
                                    break;
                                case 'Fm.Term.str':
                                    var $3399 = self.strx;
                                    var $3400 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3400;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3401 = self.path;
                                    var $3402 = self.expr;
                                    var $3403 = self.name;
                                    var $3404 = self.with;
                                    var $3405 = self.cses;
                                    var $3406 = self.moti;
                                    var $3407 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3407;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3408 = self.orig;
                                    var $3409 = self.expr;
                                    var $3410 = Monad$pure$(Fm$Check$monad)(Bool$false);
                                    var $3358 = $3410;
                                    break;
                            };
                            var $2569 = $3358;
                            break;
                    };
                    var $2567 = $2569;
                };
                var $2565 = $2567;
            };
            var $2563 = $2565;
        };
        return $2563;
    };
    const Fm$Term$equal = x0 => x1 => x2 => x3 => x4 => Fm$Term$equal$(x0, x1, x2, x3, x4);
    const Set$new = Map$new;

    function Fm$Term$check$(_term$1, _type$2, _defs$3, _ctx$4, _path$5, _orig$6) {
        var $3411 = Monad$bind$(Fm$Check$monad)((() => {
            var self = _term$1;
            switch (self._) {
                case 'Fm.Term.var':
                    var $3412 = self.name;
                    var $3413 = self.indx;
                    var self = List$at_last$($3413, _ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            var $3415 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $3412), List$nil));
                            var $3414 = $3415;
                            break;
                        case 'Maybe.some':
                            var $3416 = self.value;
                            var $3417 = Monad$pure$(Fm$Check$monad)((() => {
                                var self = $3416;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $3418 = self.fst;
                                        var $3419 = self.snd;
                                        var $3420 = $3419;
                                        return $3420;
                                };
                            })());
                            var $3414 = $3417;
                            break;
                    };
                    return $3414;
                case 'Fm.Term.ref':
                    var $3421 = self.name;
                    var self = Fm$get$($3421, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $3423 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$undefined_reference$(_orig$6, $3421), List$nil));
                            var $3422 = $3423;
                            break;
                        case 'Maybe.some':
                            var $3424 = self.value;
                            var self = $3424;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $3426 = self.file;
                                    var $3427 = self.code;
                                    var $3428 = self.name;
                                    var $3429 = self.term;
                                    var $3430 = self.type;
                                    var $3431 = self.stat;
                                    var _ref_name$15 = $3428;
                                    var _ref_type$16 = $3430;
                                    var _ref_term$17 = $3429;
                                    var _ref_stat$18 = $3431;
                                    var self = _ref_stat$18;
                                    switch (self._) {
                                        case 'Fm.Status.init':
                                            var $3433 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$waiting$(_ref_name$15), List$nil));
                                            var $3432 = $3433;
                                            break;
                                        case 'Fm.Status.wait':
                                            var $3434 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $3432 = $3434;
                                            break;
                                        case 'Fm.Status.done':
                                            var $3435 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$nil);
                                            var $3432 = $3435;
                                            break;
                                        case 'Fm.Status.fail':
                                            var $3436 = self.errors;
                                            var $3437 = Fm$Check$result$(Maybe$some$(_ref_type$16), List$cons$(Fm$Error$indirect$(_ref_name$15), List$nil));
                                            var $3432 = $3437;
                                            break;
                                    };
                                    var $3425 = $3432;
                                    break;
                            };
                            var $3422 = $3425;
                            break;
                    };
                    return $3422;
                case 'Fm.Term.typ':
                    var $3438 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                    return $3438;
                case 'Fm.Term.all':
                    var $3439 = self.eras;
                    var $3440 = self.self;
                    var $3441 = self.name;
                    var $3442 = self.xtyp;
                    var $3443 = self.body;
                    var _ctx_size$12 = List$length$(_ctx$4);
                    var _self_var$13 = Fm$Term$var$($3440, _ctx_size$12);
                    var _body_var$14 = Fm$Term$var$($3441, Nat$succ$(_ctx_size$12));
                    var _body_ctx$15 = List$cons$(Pair$new$($3441, $3442), List$cons$(Pair$new$($3440, _term$1), _ctx$4));
                    var $3444 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3442, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$16 => {
                        var $3445 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3443(_self_var$13)(_body_var$14), Maybe$some$(Fm$Term$typ), _defs$3, _body_ctx$15, Fm$MPath$i$(_path$5), _orig$6))((_$17 => {
                            var $3446 = Monad$pure$(Fm$Check$monad)(Fm$Term$typ);
                            return $3446;
                        }));
                        return $3445;
                    }));
                    return $3444;
                case 'Fm.Term.lam':
                    var $3447 = self.name;
                    var $3448 = self.body;
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            var $3450 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                            var $3449 = $3450;
                            break;
                        case 'Maybe.some':
                            var $3451 = self.value;
                            var _typv$10 = Fm$Term$reduce$($3451, _defs$3);
                            var self = _typv$10;
                            switch (self._) {
                                case 'Fm.Term.var':
                                    var $3453 = self.name;
                                    var $3454 = self.indx;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3451);
                                    var $3455 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3452 = $3455;
                                    break;
                                case 'Fm.Term.ref':
                                    var $3456 = self.name;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3451);
                                    var $3457 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3452 = $3457;
                                    break;
                                case 'Fm.Term.typ':
                                    var _expected$11 = Either$left$("Function");
                                    var _detected$12 = Either$right$($3451);
                                    var $3458 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                    var $3452 = $3458;
                                    break;
                                case 'Fm.Term.all':
                                    var $3459 = self.eras;
                                    var $3460 = self.self;
                                    var $3461 = self.name;
                                    var $3462 = self.xtyp;
                                    var $3463 = self.body;
                                    var _ctx_size$16 = List$length$(_ctx$4);
                                    var _self_var$17 = _term$1;
                                    var _body_var$18 = Fm$Term$var$($3447, _ctx_size$16);
                                    var _body_typ$19 = $3463(_self_var$17)(_body_var$18);
                                    var _body_ctx$20 = List$cons$(Pair$new$($3447, $3462), _ctx$4);
                                    var $3464 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3448(_body_var$18), Maybe$some$(_body_typ$19), _defs$3, _body_ctx$20, Fm$MPath$o$(_path$5), _orig$6))((_$21 => {
                                        var $3465 = Monad$pure$(Fm$Check$monad)($3451);
                                        return $3465;
                                    }));
                                    var $3452 = $3464;
                                    break;
                                case 'Fm.Term.lam':
                                    var $3466 = self.name;
                                    var $3467 = self.body;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3451);
                                    var $3468 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3452 = $3468;
                                    break;
                                case 'Fm.Term.app':
                                    var $3469 = self.func;
                                    var $3470 = self.argm;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3451);
                                    var $3471 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3452 = $3471;
                                    break;
                                case 'Fm.Term.let':
                                    var $3472 = self.name;
                                    var $3473 = self.expr;
                                    var $3474 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3451);
                                    var $3475 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3452 = $3475;
                                    break;
                                case 'Fm.Term.def':
                                    var $3476 = self.name;
                                    var $3477 = self.expr;
                                    var $3478 = self.body;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3451);
                                    var $3479 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3452 = $3479;
                                    break;
                                case 'Fm.Term.ann':
                                    var $3480 = self.done;
                                    var $3481 = self.term;
                                    var $3482 = self.type;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3451);
                                    var $3483 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3452 = $3483;
                                    break;
                                case 'Fm.Term.gol':
                                    var $3484 = self.name;
                                    var $3485 = self.dref;
                                    var $3486 = self.verb;
                                    var _expected$14 = Either$left$("Function");
                                    var _detected$15 = Either$right$($3451);
                                    var $3487 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                    var $3452 = $3487;
                                    break;
                                case 'Fm.Term.hol':
                                    var $3488 = self.path;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3451);
                                    var $3489 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3452 = $3489;
                                    break;
                                case 'Fm.Term.nat':
                                    var $3490 = self.natx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3451);
                                    var $3491 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3452 = $3491;
                                    break;
                                case 'Fm.Term.chr':
                                    var $3492 = self.chrx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3451);
                                    var $3493 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3452 = $3493;
                                    break;
                                case 'Fm.Term.str':
                                    var $3494 = self.strx;
                                    var _expected$12 = Either$left$("Function");
                                    var _detected$13 = Either$right$($3451);
                                    var $3495 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                    var $3452 = $3495;
                                    break;
                                case 'Fm.Term.cse':
                                    var $3496 = self.path;
                                    var $3497 = self.expr;
                                    var $3498 = self.name;
                                    var $3499 = self.with;
                                    var $3500 = self.cses;
                                    var $3501 = self.moti;
                                    var _expected$17 = Either$left$("Function");
                                    var _detected$18 = Either$right$($3451);
                                    var $3502 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                    var $3452 = $3502;
                                    break;
                                case 'Fm.Term.ori':
                                    var $3503 = self.orig;
                                    var $3504 = self.expr;
                                    var _expected$13 = Either$left$("Function");
                                    var _detected$14 = Either$right$($3451);
                                    var $3505 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                    var $3452 = $3505;
                                    break;
                            };
                            var $3449 = $3452;
                            break;
                    };
                    return $3449;
                case 'Fm.Term.app':
                    var $3506 = self.func;
                    var $3507 = self.argm;
                    var $3508 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3506, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_func_typ$9 => {
                        var _func_typ$10 = Fm$Term$reduce$(_func_typ$9, _defs$3);
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $3510 = self.name;
                                var $3511 = self.indx;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3512 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3509 = $3512;
                                break;
                            case 'Fm.Term.ref':
                                var $3513 = self.name;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3514 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3509 = $3514;
                                break;
                            case 'Fm.Term.typ':
                                var _expected$11 = Either$left$("Function");
                                var _detected$12 = Either$right$(_func_typ$10);
                                var $3515 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                var $3509 = $3515;
                                break;
                            case 'Fm.Term.all':
                                var $3516 = self.eras;
                                var $3517 = self.self;
                                var $3518 = self.name;
                                var $3519 = self.xtyp;
                                var $3520 = self.body;
                                var $3521 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3507, Maybe$some$($3519), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$16 => {
                                    var $3522 = Monad$pure$(Fm$Check$monad)($3520($3506)($3507));
                                    return $3522;
                                }));
                                var $3509 = $3521;
                                break;
                            case 'Fm.Term.lam':
                                var $3523 = self.name;
                                var $3524 = self.body;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3525 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3509 = $3525;
                                break;
                            case 'Fm.Term.app':
                                var $3526 = self.func;
                                var $3527 = self.argm;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3528 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3509 = $3528;
                                break;
                            case 'Fm.Term.let':
                                var $3529 = self.name;
                                var $3530 = self.expr;
                                var $3531 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3532 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3509 = $3532;
                                break;
                            case 'Fm.Term.def':
                                var $3533 = self.name;
                                var $3534 = self.expr;
                                var $3535 = self.body;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3536 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3509 = $3536;
                                break;
                            case 'Fm.Term.ann':
                                var $3537 = self.done;
                                var $3538 = self.term;
                                var $3539 = self.type;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3540 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3509 = $3540;
                                break;
                            case 'Fm.Term.gol':
                                var $3541 = self.name;
                                var $3542 = self.dref;
                                var $3543 = self.verb;
                                var _expected$14 = Either$left$("Function");
                                var _detected$15 = Either$right$(_func_typ$10);
                                var $3544 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $3509 = $3544;
                                break;
                            case 'Fm.Term.hol':
                                var $3545 = self.path;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3546 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3509 = $3546;
                                break;
                            case 'Fm.Term.nat':
                                var $3547 = self.natx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3548 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3509 = $3548;
                                break;
                            case 'Fm.Term.chr':
                                var $3549 = self.chrx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3550 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3509 = $3550;
                                break;
                            case 'Fm.Term.str':
                                var $3551 = self.strx;
                                var _expected$12 = Either$left$("Function");
                                var _detected$13 = Either$right$(_func_typ$10);
                                var $3552 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $3509 = $3552;
                                break;
                            case 'Fm.Term.cse':
                                var $3553 = self.path;
                                var $3554 = self.expr;
                                var $3555 = self.name;
                                var $3556 = self.with;
                                var $3557 = self.cses;
                                var $3558 = self.moti;
                                var _expected$17 = Either$left$("Function");
                                var _detected$18 = Either$right$(_func_typ$10);
                                var $3559 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                var $3509 = $3559;
                                break;
                            case 'Fm.Term.ori':
                                var $3560 = self.orig;
                                var $3561 = self.expr;
                                var _expected$13 = Either$left$("Function");
                                var _detected$14 = Either$right$(_func_typ$10);
                                var $3562 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $3509 = $3562;
                                break;
                        };
                        return $3509;
                    }));
                    return $3508;
                case 'Fm.Term.let':
                    var $3563 = self.name;
                    var $3564 = self.expr;
                    var $3565 = self.body;
                    var _ctx_size$10 = List$length$(_ctx$4);
                    var $3566 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3564, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_expr_typ$11 => {
                        var _body_val$12 = $3565(Fm$Term$var$($3563, _ctx_size$10));
                        var _body_ctx$13 = List$cons$(Pair$new$($3563, _expr_typ$11), _ctx$4);
                        var $3567 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_body_val$12, _type$2, _defs$3, _body_ctx$13, Fm$MPath$i$(_path$5), _orig$6))((_body_typ$14 => {
                            var $3568 = Monad$pure$(Fm$Check$monad)(_body_typ$14);
                            return $3568;
                        }));
                        return $3567;
                    }));
                    return $3566;
                case 'Fm.Term.def':
                    var $3569 = self.name;
                    var $3570 = self.expr;
                    var $3571 = self.body;
                    var $3572 = Fm$Term$check$($3571($3570), _type$2, _defs$3, _ctx$4, _path$5, _orig$6);
                    return $3572;
                case 'Fm.Term.ann':
                    var $3573 = self.done;
                    var $3574 = self.term;
                    var $3575 = self.type;
                    var self = $3573;
                    if (self) {
                        var $3577 = Monad$pure$(Fm$Check$monad)($3575);
                        var $3576 = $3577;
                    } else {
                        var $3578 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3574, Maybe$some$($3575), _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_$10 => {
                            var $3579 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$($3575, Maybe$some$(Fm$Term$typ), _defs$3, _ctx$4, Fm$MPath$i$(_path$5), _orig$6))((_$11 => {
                                var $3580 = Monad$pure$(Fm$Check$monad)($3575);
                                return $3580;
                            }));
                            return $3579;
                        }));
                        var $3576 = $3578;
                    };
                    return $3576;
                case 'Fm.Term.gol':
                    var $3581 = self.name;
                    var $3582 = self.dref;
                    var $3583 = self.verb;
                    var $3584 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$show_goal$($3581, $3582, $3583, _type$2, _ctx$4), List$nil));
                    return $3584;
                case 'Fm.Term.hol':
                    var $3585 = self.path;
                    var $3586 = Fm$Check$result$(_type$2, List$nil);
                    return $3586;
                case 'Fm.Term.nat':
                    var $3587 = self.natx;
                    var $3588 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Nat"));
                    return $3588;
                case 'Fm.Term.chr':
                    var $3589 = self.chrx;
                    var $3590 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("Char"));
                    return $3590;
                case 'Fm.Term.str':
                    var $3591 = self.strx;
                    var $3592 = Monad$pure$(Fm$Check$monad)(Fm$Term$ref$("String"));
                    return $3592;
                case 'Fm.Term.cse':
                    var $3593 = self.path;
                    var $3594 = self.expr;
                    var $3595 = self.name;
                    var $3596 = self.with;
                    var $3597 = self.cses;
                    var $3598 = self.moti;
                    var _expr$13 = $3594;
                    var $3599 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_expr$13, Maybe$none, _defs$3, _ctx$4, Fm$MPath$o$(_path$5), _orig$6))((_etyp$14 => {
                        var self = $3598;
                        switch (self._) {
                            case 'Maybe.none':
                                var self = _type$2;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $3602 = Fm$Term$hol$(Bits$e);
                                        var _moti$15 = $3602;
                                        break;
                                    case 'Maybe.some':
                                        var $3603 = self.value;
                                        var _size$16 = List$length$(_ctx$4);
                                        var _moti$17 = Fm$SmartMotive$make$($3595, $3594, _etyp$14, $3603, _size$16, _defs$3);
                                        var $3604 = _moti$17;
                                        var _moti$15 = $3604;
                                        break;
                                };
                                var $3601 = Maybe$some$(Fm$Term$cse$($3593, $3594, $3595, $3596, $3597, Maybe$some$(_moti$15)));
                                var _dsug$15 = $3601;
                                break;
                            case 'Maybe.some':
                                var $3605 = self.value;
                                var $3606 = Fm$Term$desugar_cse$($3594, $3595, $3596, $3597, $3605, _etyp$14, _defs$3, _ctx$4);
                                var _dsug$15 = $3606;
                                break;
                        };
                        var self = _dsug$15;
                        switch (self._) {
                            case 'Maybe.none':
                                var $3607 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                                var $3600 = $3607;
                                break;
                            case 'Maybe.some':
                                var $3608 = self.value;
                                var $3609 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$patch$(Fm$MPath$to_bits$(_path$5), $3608), List$nil));
                                var $3600 = $3609;
                                break;
                        };
                        return $3600;
                    }));
                    return $3599;
                case 'Fm.Term.ori':
                    var $3610 = self.orig;
                    var $3611 = self.expr;
                    var $3612 = Fm$Term$check$($3611, _type$2, _defs$3, _ctx$4, _path$5, Maybe$some$($3610));
                    return $3612;
            };
        })())((_infr$7 => {
            var self = _type$2;
            switch (self._) {
                case 'Maybe.none':
                    var $3614 = Fm$Check$result$(Maybe$some$(_infr$7), List$nil);
                    var $3613 = $3614;
                    break;
                case 'Maybe.some':
                    var $3615 = self.value;
                    var $3616 = Monad$bind$(Fm$Check$monad)(Fm$Term$equal$($3615, _infr$7, _defs$3, List$length$(_ctx$4), Set$new))((_eqls$9 => {
                        var self = _eqls$9;
                        if (self) {
                            var $3618 = Monad$pure$(Fm$Check$monad)($3615);
                            var $3617 = $3618;
                        } else {
                            var $3619 = Fm$Check$result$(_type$2, List$cons$(Fm$Error$type_mismatch$(_orig$6, Either$right$($3615), Either$right$(_infr$7), _ctx$4), List$nil));
                            var $3617 = $3619;
                        };
                        return $3617;
                    }));
                    var $3613 = $3616;
                    break;
            };
            return $3613;
        }));
        return $3411;
    };
    const Fm$Term$check = x0 => x1 => x2 => x3 => x4 => x5 => Fm$Term$check$(x0, x1, x2, x3, x4, x5);

    function Fm$Path$nil$(_x$1) {
        var $3620 = _x$1;
        return $3620;
    };
    const Fm$Path$nil = x0 => Fm$Path$nil$(x0);
    const Fm$MPath$nil = Maybe$some$(Fm$Path$nil);

    function List$is_empty$(_list$2) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $3622 = Bool$true;
                var $3621 = $3622;
                break;
            case 'List.cons':
                var $3623 = self.head;
                var $3624 = self.tail;
                var $3625 = Bool$false;
                var $3621 = $3625;
                break;
        };
        return $3621;
    };
    const List$is_empty = x0 => List$is_empty$(x0);

    function Fm$Term$patch_at$(_path$1, _term$2, _fn$3) {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $3627 = self.name;
                var $3628 = self.indx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3630 = _fn$3(_term$2);
                        var $3629 = $3630;
                        break;
                    case 'o':
                        var $3631 = self.slice(0, -1);
                        var $3632 = _term$2;
                        var $3629 = $3632;
                        break;
                    case 'i':
                        var $3633 = self.slice(0, -1);
                        var $3634 = _term$2;
                        var $3629 = $3634;
                        break;
                };
                var $3626 = $3629;
                break;
            case 'Fm.Term.ref':
                var $3635 = self.name;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3637 = _fn$3(_term$2);
                        var $3636 = $3637;
                        break;
                    case 'o':
                        var $3638 = self.slice(0, -1);
                        var $3639 = _term$2;
                        var $3636 = $3639;
                        break;
                    case 'i':
                        var $3640 = self.slice(0, -1);
                        var $3641 = _term$2;
                        var $3636 = $3641;
                        break;
                };
                var $3626 = $3636;
                break;
            case 'Fm.Term.typ':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3643 = _fn$3(_term$2);
                        var $3642 = $3643;
                        break;
                    case 'o':
                        var $3644 = self.slice(0, -1);
                        var $3645 = _term$2;
                        var $3642 = $3645;
                        break;
                    case 'i':
                        var $3646 = self.slice(0, -1);
                        var $3647 = _term$2;
                        var $3642 = $3647;
                        break;
                };
                var $3626 = $3642;
                break;
            case 'Fm.Term.all':
                var $3648 = self.eras;
                var $3649 = self.self;
                var $3650 = self.name;
                var $3651 = self.xtyp;
                var $3652 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3654 = _fn$3(_term$2);
                        var $3653 = $3654;
                        break;
                    case 'o':
                        var $3655 = self.slice(0, -1);
                        var $3656 = Fm$Term$all$($3648, $3649, $3650, Fm$Term$patch_at$($3655, $3651, _fn$3), $3652);
                        var $3653 = $3656;
                        break;
                    case 'i':
                        var $3657 = self.slice(0, -1);
                        var $3658 = Fm$Term$all$($3648, $3649, $3650, $3651, (_s$10 => _x$11 => {
                            var $3659 = Fm$Term$patch_at$($3657, $3652(_s$10)(_x$11), _fn$3);
                            return $3659;
                        }));
                        var $3653 = $3658;
                        break;
                };
                var $3626 = $3653;
                break;
            case 'Fm.Term.lam':
                var $3660 = self.name;
                var $3661 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3663 = _fn$3(_term$2);
                        var $3662 = $3663;
                        break;
                    case 'o':
                        var $3664 = self.slice(0, -1);
                        var $3665 = Fm$Term$lam$($3660, (_x$7 => {
                            var $3666 = Fm$Term$patch_at$(Bits$tail$(_path$1), $3661(_x$7), _fn$3);
                            return $3666;
                        }));
                        var $3662 = $3665;
                        break;
                    case 'i':
                        var $3667 = self.slice(0, -1);
                        var $3668 = Fm$Term$lam$($3660, (_x$7 => {
                            var $3669 = Fm$Term$patch_at$(Bits$tail$(_path$1), $3661(_x$7), _fn$3);
                            return $3669;
                        }));
                        var $3662 = $3668;
                        break;
                };
                var $3626 = $3662;
                break;
            case 'Fm.Term.app':
                var $3670 = self.func;
                var $3671 = self.argm;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3673 = _fn$3(_term$2);
                        var $3672 = $3673;
                        break;
                    case 'o':
                        var $3674 = self.slice(0, -1);
                        var $3675 = Fm$Term$app$(Fm$Term$patch_at$($3674, $3670, _fn$3), $3671);
                        var $3672 = $3675;
                        break;
                    case 'i':
                        var $3676 = self.slice(0, -1);
                        var $3677 = Fm$Term$app$($3670, Fm$Term$patch_at$($3676, $3671, _fn$3));
                        var $3672 = $3677;
                        break;
                };
                var $3626 = $3672;
                break;
            case 'Fm.Term.let':
                var $3678 = self.name;
                var $3679 = self.expr;
                var $3680 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3682 = _fn$3(_term$2);
                        var $3681 = $3682;
                        break;
                    case 'o':
                        var $3683 = self.slice(0, -1);
                        var $3684 = Fm$Term$let$($3678, Fm$Term$patch_at$($3683, $3679, _fn$3), $3680);
                        var $3681 = $3684;
                        break;
                    case 'i':
                        var $3685 = self.slice(0, -1);
                        var $3686 = Fm$Term$let$($3678, $3679, (_x$8 => {
                            var $3687 = Fm$Term$patch_at$($3685, $3680(_x$8), _fn$3);
                            return $3687;
                        }));
                        var $3681 = $3686;
                        break;
                };
                var $3626 = $3681;
                break;
            case 'Fm.Term.def':
                var $3688 = self.name;
                var $3689 = self.expr;
                var $3690 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3692 = _fn$3(_term$2);
                        var $3691 = $3692;
                        break;
                    case 'o':
                        var $3693 = self.slice(0, -1);
                        var $3694 = Fm$Term$def$($3688, Fm$Term$patch_at$($3693, $3689, _fn$3), $3690);
                        var $3691 = $3694;
                        break;
                    case 'i':
                        var $3695 = self.slice(0, -1);
                        var $3696 = Fm$Term$def$($3688, $3689, (_x$8 => {
                            var $3697 = Fm$Term$patch_at$($3695, $3690(_x$8), _fn$3);
                            return $3697;
                        }));
                        var $3691 = $3696;
                        break;
                };
                var $3626 = $3691;
                break;
            case 'Fm.Term.ann':
                var $3698 = self.done;
                var $3699 = self.term;
                var $3700 = self.type;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3702 = _fn$3(_term$2);
                        var $3701 = $3702;
                        break;
                    case 'o':
                        var $3703 = self.slice(0, -1);
                        var $3704 = Fm$Term$ann$($3698, Fm$Term$patch_at$(_path$1, $3699, _fn$3), $3700);
                        var $3701 = $3704;
                        break;
                    case 'i':
                        var $3705 = self.slice(0, -1);
                        var $3706 = Fm$Term$ann$($3698, Fm$Term$patch_at$(_path$1, $3699, _fn$3), $3700);
                        var $3701 = $3706;
                        break;
                };
                var $3626 = $3701;
                break;
            case 'Fm.Term.gol':
                var $3707 = self.name;
                var $3708 = self.dref;
                var $3709 = self.verb;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3711 = _fn$3(_term$2);
                        var $3710 = $3711;
                        break;
                    case 'o':
                        var $3712 = self.slice(0, -1);
                        var $3713 = _term$2;
                        var $3710 = $3713;
                        break;
                    case 'i':
                        var $3714 = self.slice(0, -1);
                        var $3715 = _term$2;
                        var $3710 = $3715;
                        break;
                };
                var $3626 = $3710;
                break;
            case 'Fm.Term.hol':
                var $3716 = self.path;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3718 = _fn$3(_term$2);
                        var $3717 = $3718;
                        break;
                    case 'o':
                        var $3719 = self.slice(0, -1);
                        var $3720 = _term$2;
                        var $3717 = $3720;
                        break;
                    case 'i':
                        var $3721 = self.slice(0, -1);
                        var $3722 = _term$2;
                        var $3717 = $3722;
                        break;
                };
                var $3626 = $3717;
                break;
            case 'Fm.Term.nat':
                var $3723 = self.natx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3725 = _fn$3(_term$2);
                        var $3724 = $3725;
                        break;
                    case 'o':
                        var $3726 = self.slice(0, -1);
                        var $3727 = _term$2;
                        var $3724 = $3727;
                        break;
                    case 'i':
                        var $3728 = self.slice(0, -1);
                        var $3729 = _term$2;
                        var $3724 = $3729;
                        break;
                };
                var $3626 = $3724;
                break;
            case 'Fm.Term.chr':
                var $3730 = self.chrx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3732 = _fn$3(_term$2);
                        var $3731 = $3732;
                        break;
                    case 'o':
                        var $3733 = self.slice(0, -1);
                        var $3734 = _term$2;
                        var $3731 = $3734;
                        break;
                    case 'i':
                        var $3735 = self.slice(0, -1);
                        var $3736 = _term$2;
                        var $3731 = $3736;
                        break;
                };
                var $3626 = $3731;
                break;
            case 'Fm.Term.str':
                var $3737 = self.strx;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3739 = _fn$3(_term$2);
                        var $3738 = $3739;
                        break;
                    case 'o':
                        var $3740 = self.slice(0, -1);
                        var $3741 = _term$2;
                        var $3738 = $3741;
                        break;
                    case 'i':
                        var $3742 = self.slice(0, -1);
                        var $3743 = _term$2;
                        var $3738 = $3743;
                        break;
                };
                var $3626 = $3738;
                break;
            case 'Fm.Term.cse':
                var $3744 = self.path;
                var $3745 = self.expr;
                var $3746 = self.name;
                var $3747 = self.with;
                var $3748 = self.cses;
                var $3749 = self.moti;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $3751 = _fn$3(_term$2);
                        var $3750 = $3751;
                        break;
                    case 'o':
                        var $3752 = self.slice(0, -1);
                        var $3753 = _term$2;
                        var $3750 = $3753;
                        break;
                    case 'i':
                        var $3754 = self.slice(0, -1);
                        var $3755 = _term$2;
                        var $3750 = $3755;
                        break;
                };
                var $3626 = $3750;
                break;
            case 'Fm.Term.ori':
                var $3756 = self.orig;
                var $3757 = self.expr;
                var $3758 = Fm$Term$patch_at$(_path$1, $3757, _fn$3);
                var $3626 = $3758;
                break;
        };
        return $3626;
    };
    const Fm$Term$patch_at = x0 => x1 => x2 => Fm$Term$patch_at$(x0, x1, x2);

    function Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, _errs$7, _fixd$8) {
        var self = _errs$7;
        switch (self._) {
            case 'List.nil':
                var self = _fixd$8;
                if (self) {
                    var _type$9 = Fm$Term$bind$(List$nil, (_x$9 => {
                        var $3762 = (_x$9 + '1');
                        return $3762;
                    }), _type$5);
                    var _term$10 = Fm$Term$bind$(List$nil, (_x$10 => {
                        var $3763 = (_x$10 + '0');
                        return $3763;
                    }), _term$4);
                    var _defs$11 = Fm$set$(_name$3, Fm$Def$new$(_file$1, _code$2, _name$3, _term$10, _type$9, Fm$Status$init), _defs$6);
                    var $3761 = Monad$pure$(IO$monad)(Maybe$some$(_defs$11));
                    var $3760 = $3761;
                } else {
                    var $3764 = Monad$pure$(IO$monad)(Maybe$none);
                    var $3760 = $3764;
                };
                var $3759 = $3760;
                break;
            case 'List.cons':
                var $3765 = self.head;
                var $3766 = self.tail;
                var self = $3765;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $3768 = self.origin;
                        var $3769 = self.expected;
                        var $3770 = self.detected;
                        var $3771 = self.context;
                        var $3772 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3766, _fixd$8);
                        var $3767 = $3772;
                        break;
                    case 'Fm.Error.show_goal':
                        var $3773 = self.name;
                        var $3774 = self.dref;
                        var $3775 = self.verb;
                        var $3776 = self.goal;
                        var $3777 = self.context;
                        var $3778 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3766, _fixd$8);
                        var $3767 = $3778;
                        break;
                    case 'Fm.Error.waiting':
                        var $3779 = self.name;
                        var $3780 = Monad$bind$(IO$monad)(Fm$Synth$one$($3779, _defs$6))((_defs$12 => {
                            var $3781 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$12, $3766, Bool$true);
                            return $3781;
                        }));
                        var $3767 = $3780;
                        break;
                    case 'Fm.Error.indirect':
                        var $3782 = self.name;
                        var $3783 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3766, _fixd$8);
                        var $3767 = $3783;
                        break;
                    case 'Fm.Error.patch':
                        var $3784 = self.path;
                        var $3785 = self.term;
                        var self = $3784;
                        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                            case 'e':
                                var $3787 = Monad$pure$(IO$monad)(Maybe$none);
                                var $3786 = $3787;
                                break;
                            case 'o':
                                var $3788 = self.slice(0, -1);
                                var _term$14 = Fm$Term$patch_at$($3788, _term$4, (_x$14 => {
                                    var $3790 = $3785;
                                    return $3790;
                                }));
                                var $3789 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$14, _type$5, _defs$6, $3766, Bool$true);
                                var $3786 = $3789;
                                break;
                            case 'i':
                                var $3791 = self.slice(0, -1);
                                var _type$14 = Fm$Term$patch_at$($3791, _type$5, (_x$14 => {
                                    var $3793 = $3785;
                                    return $3793;
                                }));
                                var $3792 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$14, _defs$6, $3766, Bool$true);
                                var $3786 = $3792;
                                break;
                        };
                        var $3767 = $3786;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $3794 = self.origin;
                        var $3795 = self.name;
                        var $3796 = Monad$bind$(IO$monad)(Fm$Synth$one$($3795, _defs$6))((_defs$13 => {
                            var $3797 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$13, $3766, Bool$true);
                            return $3797;
                        }));
                        var $3767 = $3796;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $3798 = self.origin;
                        var $3799 = self.term;
                        var $3800 = self.context;
                        var $3801 = Fm$Synth$fix$(_file$1, _code$2, _name$3, _term$4, _type$5, _defs$6, $3766, _fixd$8);
                        var $3767 = $3801;
                        break;
                };
                var $3759 = $3767;
                break;
        };
        return $3759;
    };
    const Fm$Synth$fix = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Fm$Synth$fix$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Fm$Status$fail$(_errors$1) {
        var $3802 = ({
            _: 'Fm.Status.fail',
            'errors': _errors$1
        });
        return $3802;
    };
    const Fm$Status$fail = x0 => Fm$Status$fail$(x0);

    function Fm$Synth$one$(_name$1, _defs$2) {
        var self = Fm$get$(_name$1, _defs$2);
        switch (self._) {
            case 'Maybe.none':
                var $3804 = Monad$bind$(IO$monad)(Fm$Synth$load$(_name$1, _defs$2))((_loaded$3 => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.none':
                            var $3806 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("Undefined: ", List$cons$(_name$1, List$nil)))))((_$4 => {
                                var $3807 = Monad$pure$(IO$monad)(_defs$2);
                                return $3807;
                            }));
                            var $3805 = $3806;
                            break;
                        case 'Maybe.some':
                            var $3808 = self.value;
                            var $3809 = Fm$Synth$one$(_name$1, $3808);
                            var $3805 = $3809;
                            break;
                    };
                    return $3805;
                }));
                var $3803 = $3804;
                break;
            case 'Maybe.some':
                var $3810 = self.value;
                var self = $3810;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $3812 = self.file;
                        var $3813 = self.code;
                        var $3814 = self.name;
                        var $3815 = self.term;
                        var $3816 = self.type;
                        var $3817 = self.stat;
                        var _file$10 = $3812;
                        var _code$11 = $3813;
                        var _name$12 = $3814;
                        var _term$13 = $3815;
                        var _type$14 = $3816;
                        var _stat$15 = $3817;
                        var self = _stat$15;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var _defs$16 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, Fm$Status$wait), _defs$2);
                                var _checked$17 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_type$14, Maybe$some$(Fm$Term$typ), _defs$16, List$nil, Fm$MPath$i$(Fm$MPath$nil), Maybe$none))((_chk_type$17 => {
                                    var $3820 = Monad$bind$(Fm$Check$monad)(Fm$Term$check$(_term$13, Maybe$some$(_type$14), _defs$16, List$nil, Fm$MPath$o$(Fm$MPath$nil), Maybe$none))((_chk_term$18 => {
                                        var $3821 = Monad$pure$(Fm$Check$monad)(Unit$new);
                                        return $3821;
                                    }));
                                    return $3820;
                                }));
                                var self = _checked$17;
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $3822 = self.value;
                                        var $3823 = self.errors;
                                        var self = List$is_empty$($3823);
                                        if (self) {
                                            var _defs$20 = Fm$define$(_file$10, _code$11, _name$12, _term$13, _type$14, Bool$true, _defs$16);
                                            var $3825 = Monad$pure$(IO$monad)(_defs$20);
                                            var $3824 = $3825;
                                        } else {
                                            var $3826 = Monad$bind$(IO$monad)(Fm$Synth$fix$(_file$10, _code$11, _name$12, _term$13, _type$14, _defs$16, $3823, Bool$false))((_fixed$20 => {
                                                var self = _fixed$20;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        var _stat$21 = Fm$Status$fail$($3823);
                                                        var _defs$22 = Fm$set$(_name$12, Fm$Def$new$(_file$10, _code$11, _name$12, _term$13, _type$14, _stat$21), _defs$16);
                                                        var $3828 = Monad$pure$(IO$monad)(_defs$22);
                                                        var $3827 = $3828;
                                                        break;
                                                    case 'Maybe.some':
                                                        var $3829 = self.value;
                                                        var $3830 = Fm$Synth$one$(_name$12, $3829);
                                                        var $3827 = $3830;
                                                        break;
                                                };
                                                return $3827;
                                            }));
                                            var $3824 = $3826;
                                        };
                                        var $3819 = $3824;
                                        break;
                                };
                                var $3818 = $3819;
                                break;
                            case 'Fm.Status.wait':
                                var $3831 = Monad$pure$(IO$monad)(_defs$2);
                                var $3818 = $3831;
                                break;
                            case 'Fm.Status.done':
                                var $3832 = Monad$pure$(IO$monad)(_defs$2);
                                var $3818 = $3832;
                                break;
                            case 'Fm.Status.fail':
                                var $3833 = self.errors;
                                var $3834 = Monad$pure$(IO$monad)(_defs$2);
                                var $3818 = $3834;
                                break;
                        };
                        var $3811 = $3818;
                        break;
                };
                var $3803 = $3811;
                break;
        };
        return $3803;
    };
    const Fm$Synth$one = x0 => x1 => Fm$Synth$one$(x0, x1);

    function Map$values$go$(_xs$2, _list$3) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $3836 = _list$3;
                var $3835 = $3836;
                break;
            case 'Map.tie':
                var $3837 = self.val;
                var $3838 = self.lft;
                var $3839 = self.rgt;
                var self = $3837;
                switch (self._) {
                    case 'Maybe.none':
                        var $3841 = _list$3;
                        var _list0$7 = $3841;
                        break;
                    case 'Maybe.some':
                        var $3842 = self.value;
                        var $3843 = List$cons$($3842, _list$3);
                        var _list0$7 = $3843;
                        break;
                };
                var _list1$8 = Map$values$go$($3838, _list0$7);
                var _list2$9 = Map$values$go$($3839, _list1$8);
                var $3840 = _list2$9;
                var $3835 = $3840;
                break;
        };
        return $3835;
    };
    const Map$values$go = x0 => x1 => Map$values$go$(x0, x1);

    function Map$values$(_xs$2) {
        var $3844 = Map$values$go$(_xs$2, List$nil);
        return $3844;
    };
    const Map$values = x0 => Map$values$(x0);

    function Fm$Name$show$(_name$1) {
        var $3845 = _name$1;
        return $3845;
    };
    const Fm$Name$show = x0 => Fm$Name$show$(x0);

    function Bits$to_nat$(_b$1) {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $3847 = 0n;
                var $3846 = $3847;
                break;
            case 'o':
                var $3848 = self.slice(0, -1);
                var $3849 = (2n * Bits$to_nat$($3848));
                var $3846 = $3849;
                break;
            case 'i':
                var $3850 = self.slice(0, -1);
                var $3851 = Nat$succ$((2n * Bits$to_nat$($3850)));
                var $3846 = $3851;
                break;
        };
        return $3846;
    };
    const Bits$to_nat = x0 => Bits$to_nat$(x0);

    function U16$show_hex$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $3853 = u16_to_word(self);
                var $3854 = Nat$to_string_base$(16n, Bits$to_nat$(Word$to_bits$($3853)));
                var $3852 = $3854;
                break;
        };
        return $3852;
    };
    const U16$show_hex = x0 => U16$show_hex$(x0);

    function Fm$escape$char$(_chr$1) {
        var self = (_chr$1 === Fm$backslash);
        if (self) {
            var $3856 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
            var $3855 = $3856;
        } else {
            var self = (_chr$1 === 34);
            if (self) {
                var $3858 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                var $3857 = $3858;
            } else {
                var self = (_chr$1 === 39);
                if (self) {
                    var $3860 = String$cons$(Fm$backslash, String$cons$(_chr$1, String$nil));
                    var $3859 = $3860;
                } else {
                    var self = U16$btw$(32, _chr$1, 126);
                    if (self) {
                        var $3862 = String$cons$(_chr$1, String$nil);
                        var $3861 = $3862;
                    } else {
                        var $3863 = String$flatten$(List$cons$(String$cons$(Fm$backslash, String$nil), List$cons$("u{", List$cons$(U16$show_hex$(_chr$1), List$cons$("}", List$cons$(String$nil, List$nil))))));
                        var $3861 = $3863;
                    };
                    var $3859 = $3861;
                };
                var $3857 = $3859;
            };
            var $3855 = $3857;
        };
        return $3855;
    };
    const Fm$escape$char = x0 => Fm$escape$char$(x0);

    function Fm$escape$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $3865 = String$nil;
            var $3864 = $3865;
        } else {
            var $3866 = self.charCodeAt(0);
            var $3867 = self.slice(1);
            var _head$4 = Fm$escape$char$($3866);
            var _tail$5 = Fm$escape$($3867);
            var $3868 = (_head$4 + _tail$5);
            var $3864 = $3868;
        };
        return $3864;
    };
    const Fm$escape = x0 => Fm$escape$(x0);

    function Fm$Term$core$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $3870 = self.name;
                var $3871 = self.indx;
                var $3872 = Fm$Name$show$($3870);
                var $3869 = $3872;
                break;
            case 'Fm.Term.ref':
                var $3873 = self.name;
                var $3874 = Fm$Name$show$($3873);
                var $3869 = $3874;
                break;
            case 'Fm.Term.typ':
                var $3875 = "*";
                var $3869 = $3875;
                break;
            case 'Fm.Term.all':
                var $3876 = self.eras;
                var $3877 = self.self;
                var $3878 = self.name;
                var $3879 = self.xtyp;
                var $3880 = self.body;
                var _eras$7 = $3876;
                var self = _eras$7;
                if (self) {
                    var $3882 = "%";
                    var _init$8 = $3882;
                } else {
                    var $3883 = "@";
                    var _init$8 = $3883;
                };
                var _self$9 = Fm$Name$show$($3877);
                var _name$10 = Fm$Name$show$($3878);
                var _xtyp$11 = Fm$Term$core$($3879);
                var _body$12 = Fm$Term$core$($3880(Fm$Term$var$($3877, 0n))(Fm$Term$var$($3878, 0n)));
                var $3881 = String$flatten$(List$cons$(_init$8, List$cons$(_self$9, List$cons$("(", List$cons$(_name$10, List$cons$(":", List$cons$(_xtyp$11, List$cons$(") ", List$cons$(_body$12, List$nil)))))))));
                var $3869 = $3881;
                break;
            case 'Fm.Term.lam':
                var $3884 = self.name;
                var $3885 = self.body;
                var _name$4 = Fm$Name$show$($3884);
                var _body$5 = Fm$Term$core$($3885(Fm$Term$var$($3884, 0n)));
                var $3886 = String$flatten$(List$cons$("#", List$cons$(_name$4, List$cons$(" ", List$cons$(_body$5, List$nil)))));
                var $3869 = $3886;
                break;
            case 'Fm.Term.app':
                var $3887 = self.func;
                var $3888 = self.argm;
                var _func$4 = Fm$Term$core$($3887);
                var _argm$5 = Fm$Term$core$($3888);
                var $3889 = String$flatten$(List$cons$("(", List$cons$(_func$4, List$cons$(" ", List$cons$(_argm$5, List$cons$(")", List$nil))))));
                var $3869 = $3889;
                break;
            case 'Fm.Term.let':
                var $3890 = self.name;
                var $3891 = self.expr;
                var $3892 = self.body;
                var _name$5 = Fm$Name$show$($3890);
                var _expr$6 = Fm$Term$core$($3891);
                var _body$7 = Fm$Term$core$($3892(Fm$Term$var$($3890, 0n)));
                var $3893 = String$flatten$(List$cons$("!", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $3869 = $3893;
                break;
            case 'Fm.Term.def':
                var $3894 = self.name;
                var $3895 = self.expr;
                var $3896 = self.body;
                var _name$5 = Fm$Name$show$($3894);
                var _expr$6 = Fm$Term$core$($3895);
                var _body$7 = Fm$Term$core$($3896(Fm$Term$var$($3894, 0n)));
                var $3897 = String$flatten$(List$cons$("$", List$cons$(_name$5, List$cons$(" = ", List$cons$(_expr$6, List$cons$("; ", List$cons$(_body$7, List$nil)))))));
                var $3869 = $3897;
                break;
            case 'Fm.Term.ann':
                var $3898 = self.done;
                var $3899 = self.term;
                var $3900 = self.type;
                var _term$5 = Fm$Term$core$($3899);
                var _type$6 = Fm$Term$core$($3900);
                var $3901 = String$flatten$(List$cons$("{", List$cons$(_term$5, List$cons$(":", List$cons$(_type$6, List$cons$("}", List$nil))))));
                var $3869 = $3901;
                break;
            case 'Fm.Term.gol':
                var $3902 = self.name;
                var $3903 = self.dref;
                var $3904 = self.verb;
                var $3905 = "<GOL>";
                var $3869 = $3905;
                break;
            case 'Fm.Term.hol':
                var $3906 = self.path;
                var $3907 = "<HOL>";
                var $3869 = $3907;
                break;
            case 'Fm.Term.nat':
                var $3908 = self.natx;
                var $3909 = String$flatten$(List$cons$("+", List$cons$(Nat$show$($3908), List$nil)));
                var $3869 = $3909;
                break;
            case 'Fm.Term.chr':
                var $3910 = self.chrx;
                var $3911 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($3910), List$cons$("\'", List$nil))));
                var $3869 = $3911;
                break;
            case 'Fm.Term.str':
                var $3912 = self.strx;
                var $3913 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($3912), List$cons$("\"", List$nil))));
                var $3869 = $3913;
                break;
            case 'Fm.Term.cse':
                var $3914 = self.path;
                var $3915 = self.expr;
                var $3916 = self.name;
                var $3917 = self.with;
                var $3918 = self.cses;
                var $3919 = self.moti;
                var $3920 = "<CSE>";
                var $3869 = $3920;
                break;
            case 'Fm.Term.ori':
                var $3921 = self.orig;
                var $3922 = self.expr;
                var $3923 = Fm$Term$core$($3922);
                var $3869 = $3923;
                break;
        };
        return $3869;
    };
    const Fm$Term$core = x0 => Fm$Term$core$(x0);

    function Fm$Defs$core$(_defs$1) {
        var _result$2 = "";
        var _result$3 = (() => {
            var $3926 = _result$2;
            var $3927 = Map$values$(_defs$1);
            let _result$4 = $3926;
            let _defn$3;
            while ($3927._ === 'List.cons') {
                _defn$3 = $3927.head;
                var self = _defn$3;
                switch (self._) {
                    case 'Fm.Def.new':
                        var $3928 = self.file;
                        var $3929 = self.code;
                        var $3930 = self.name;
                        var $3931 = self.term;
                        var $3932 = self.type;
                        var $3933 = self.stat;
                        var self = $3933;
                        switch (self._) {
                            case 'Fm.Status.init':
                                var $3935 = _result$4;
                                var $3934 = $3935;
                                break;
                            case 'Fm.Status.wait':
                                var $3936 = _result$4;
                                var $3934 = $3936;
                                break;
                            case 'Fm.Status.done':
                                var _name$11 = $3930;
                                var _term$12 = Fm$Term$core$($3931);
                                var _type$13 = Fm$Term$core$($3932);
                                var $3937 = String$flatten$(List$cons$(_result$4, List$cons$(_name$11, List$cons$(" : ", List$cons$(_type$13, List$cons$(" = ", List$cons$(_term$12, List$cons$(";\u{a}", List$nil))))))));
                                var $3934 = $3937;
                                break;
                            case 'Fm.Status.fail':
                                var $3938 = self.errors;
                                var $3939 = _result$4;
                                var $3934 = $3939;
                                break;
                        };
                        var $3926 = $3934;
                        break;
                };
                _result$4 = $3926;
                $3927 = $3927.tail;
            }
            return _result$4;
        })();
        var $3924 = _result$3;
        return $3924;
    };
    const Fm$Defs$core = x0 => Fm$Defs$core$(x0);

    function Fm$to_core$io$one$(_name$1) {
        var $3940 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $3941 = Monad$pure$(IO$monad)(Fm$Defs$core$(_defs$2));
            return $3941;
        }));
        return $3940;
    };
    const Fm$to_core$io$one = x0 => Fm$to_core$io$one$(x0);

    function Maybe$bind$(_m$3, _f$4) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                var $3943 = Maybe$none;
                var $3942 = $3943;
                break;
            case 'Maybe.some':
                var $3944 = self.value;
                var $3945 = _f$4($3944);
                var $3942 = $3945;
                break;
        };
        return $3942;
    };
    const Maybe$bind = x0 => x1 => Maybe$bind$(x0, x1);
    const Maybe$monad = Monad$new$(Maybe$bind, Maybe$some);

    function Fm$Term$show$as_nat$go$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $3947 = self.name;
                var $3948 = self.indx;
                var $3949 = Maybe$none;
                var $3946 = $3949;
                break;
            case 'Fm.Term.ref':
                var $3950 = self.name;
                var self = ($3950 === "Nat.zero");
                if (self) {
                    var $3952 = Maybe$some$(0n);
                    var $3951 = $3952;
                } else {
                    var $3953 = Maybe$none;
                    var $3951 = $3953;
                };
                var $3946 = $3951;
                break;
            case 'Fm.Term.typ':
                var $3954 = Maybe$none;
                var $3946 = $3954;
                break;
            case 'Fm.Term.all':
                var $3955 = self.eras;
                var $3956 = self.self;
                var $3957 = self.name;
                var $3958 = self.xtyp;
                var $3959 = self.body;
                var $3960 = Maybe$none;
                var $3946 = $3960;
                break;
            case 'Fm.Term.lam':
                var $3961 = self.name;
                var $3962 = self.body;
                var $3963 = Maybe$none;
                var $3946 = $3963;
                break;
            case 'Fm.Term.app':
                var $3964 = self.func;
                var $3965 = self.argm;
                var self = $3964;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $3967 = self.name;
                        var $3968 = self.indx;
                        var $3969 = Maybe$none;
                        var $3966 = $3969;
                        break;
                    case 'Fm.Term.ref':
                        var $3970 = self.name;
                        var self = ($3970 === "Nat.succ");
                        if (self) {
                            var $3972 = Monad$bind$(Maybe$monad)(Fm$Term$show$as_nat$go$($3965))((_pred$5 => {
                                var $3973 = Monad$pure$(Maybe$monad)(Nat$succ$(_pred$5));
                                return $3973;
                            }));
                            var $3971 = $3972;
                        } else {
                            var $3974 = Maybe$none;
                            var $3971 = $3974;
                        };
                        var $3966 = $3971;
                        break;
                    case 'Fm.Term.typ':
                        var $3975 = Maybe$none;
                        var $3966 = $3975;
                        break;
                    case 'Fm.Term.all':
                        var $3976 = self.eras;
                        var $3977 = self.self;
                        var $3978 = self.name;
                        var $3979 = self.xtyp;
                        var $3980 = self.body;
                        var $3981 = Maybe$none;
                        var $3966 = $3981;
                        break;
                    case 'Fm.Term.lam':
                        var $3982 = self.name;
                        var $3983 = self.body;
                        var $3984 = Maybe$none;
                        var $3966 = $3984;
                        break;
                    case 'Fm.Term.app':
                        var $3985 = self.func;
                        var $3986 = self.argm;
                        var $3987 = Maybe$none;
                        var $3966 = $3987;
                        break;
                    case 'Fm.Term.let':
                        var $3988 = self.name;
                        var $3989 = self.expr;
                        var $3990 = self.body;
                        var $3991 = Maybe$none;
                        var $3966 = $3991;
                        break;
                    case 'Fm.Term.def':
                        var $3992 = self.name;
                        var $3993 = self.expr;
                        var $3994 = self.body;
                        var $3995 = Maybe$none;
                        var $3966 = $3995;
                        break;
                    case 'Fm.Term.ann':
                        var $3996 = self.done;
                        var $3997 = self.term;
                        var $3998 = self.type;
                        var $3999 = Maybe$none;
                        var $3966 = $3999;
                        break;
                    case 'Fm.Term.gol':
                        var $4000 = self.name;
                        var $4001 = self.dref;
                        var $4002 = self.verb;
                        var $4003 = Maybe$none;
                        var $3966 = $4003;
                        break;
                    case 'Fm.Term.hol':
                        var $4004 = self.path;
                        var $4005 = Maybe$none;
                        var $3966 = $4005;
                        break;
                    case 'Fm.Term.nat':
                        var $4006 = self.natx;
                        var $4007 = Maybe$none;
                        var $3966 = $4007;
                        break;
                    case 'Fm.Term.chr':
                        var $4008 = self.chrx;
                        var $4009 = Maybe$none;
                        var $3966 = $4009;
                        break;
                    case 'Fm.Term.str':
                        var $4010 = self.strx;
                        var $4011 = Maybe$none;
                        var $3966 = $4011;
                        break;
                    case 'Fm.Term.cse':
                        var $4012 = self.path;
                        var $4013 = self.expr;
                        var $4014 = self.name;
                        var $4015 = self.with;
                        var $4016 = self.cses;
                        var $4017 = self.moti;
                        var $4018 = Maybe$none;
                        var $3966 = $4018;
                        break;
                    case 'Fm.Term.ori':
                        var $4019 = self.orig;
                        var $4020 = self.expr;
                        var $4021 = Maybe$none;
                        var $3966 = $4021;
                        break;
                };
                var $3946 = $3966;
                break;
            case 'Fm.Term.let':
                var $4022 = self.name;
                var $4023 = self.expr;
                var $4024 = self.body;
                var $4025 = Maybe$none;
                var $3946 = $4025;
                break;
            case 'Fm.Term.def':
                var $4026 = self.name;
                var $4027 = self.expr;
                var $4028 = self.body;
                var $4029 = Maybe$none;
                var $3946 = $4029;
                break;
            case 'Fm.Term.ann':
                var $4030 = self.done;
                var $4031 = self.term;
                var $4032 = self.type;
                var $4033 = Maybe$none;
                var $3946 = $4033;
                break;
            case 'Fm.Term.gol':
                var $4034 = self.name;
                var $4035 = self.dref;
                var $4036 = self.verb;
                var $4037 = Maybe$none;
                var $3946 = $4037;
                break;
            case 'Fm.Term.hol':
                var $4038 = self.path;
                var $4039 = Maybe$none;
                var $3946 = $4039;
                break;
            case 'Fm.Term.nat':
                var $4040 = self.natx;
                var $4041 = Maybe$none;
                var $3946 = $4041;
                break;
            case 'Fm.Term.chr':
                var $4042 = self.chrx;
                var $4043 = Maybe$none;
                var $3946 = $4043;
                break;
            case 'Fm.Term.str':
                var $4044 = self.strx;
                var $4045 = Maybe$none;
                var $3946 = $4045;
                break;
            case 'Fm.Term.cse':
                var $4046 = self.path;
                var $4047 = self.expr;
                var $4048 = self.name;
                var $4049 = self.with;
                var $4050 = self.cses;
                var $4051 = self.moti;
                var $4052 = Maybe$none;
                var $3946 = $4052;
                break;
            case 'Fm.Term.ori':
                var $4053 = self.orig;
                var $4054 = self.expr;
                var $4055 = Maybe$none;
                var $3946 = $4055;
                break;
        };
        return $3946;
    };
    const Fm$Term$show$as_nat$go = x0 => Fm$Term$show$as_nat$go$(x0);

    function Fm$Term$show$as_nat$(_term$1) {
        var $4056 = Maybe$mapped$(Fm$Term$show$as_nat$go$(_term$1), Nat$show);
        return $4056;
    };
    const Fm$Term$show$as_nat = x0 => Fm$Term$show$as_nat$(x0);

    function Fm$Term$show$is_ref$(_term$1, _name$2) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4058 = self.name;
                var $4059 = self.indx;
                var $4060 = Bool$false;
                var $4057 = $4060;
                break;
            case 'Fm.Term.ref':
                var $4061 = self.name;
                var $4062 = (_name$2 === $4061);
                var $4057 = $4062;
                break;
            case 'Fm.Term.typ':
                var $4063 = Bool$false;
                var $4057 = $4063;
                break;
            case 'Fm.Term.all':
                var $4064 = self.eras;
                var $4065 = self.self;
                var $4066 = self.name;
                var $4067 = self.xtyp;
                var $4068 = self.body;
                var $4069 = Bool$false;
                var $4057 = $4069;
                break;
            case 'Fm.Term.lam':
                var $4070 = self.name;
                var $4071 = self.body;
                var $4072 = Bool$false;
                var $4057 = $4072;
                break;
            case 'Fm.Term.app':
                var $4073 = self.func;
                var $4074 = self.argm;
                var $4075 = Bool$false;
                var $4057 = $4075;
                break;
            case 'Fm.Term.let':
                var $4076 = self.name;
                var $4077 = self.expr;
                var $4078 = self.body;
                var $4079 = Bool$false;
                var $4057 = $4079;
                break;
            case 'Fm.Term.def':
                var $4080 = self.name;
                var $4081 = self.expr;
                var $4082 = self.body;
                var $4083 = Bool$false;
                var $4057 = $4083;
                break;
            case 'Fm.Term.ann':
                var $4084 = self.done;
                var $4085 = self.term;
                var $4086 = self.type;
                var $4087 = Bool$false;
                var $4057 = $4087;
                break;
            case 'Fm.Term.gol':
                var $4088 = self.name;
                var $4089 = self.dref;
                var $4090 = self.verb;
                var $4091 = Bool$false;
                var $4057 = $4091;
                break;
            case 'Fm.Term.hol':
                var $4092 = self.path;
                var $4093 = Bool$false;
                var $4057 = $4093;
                break;
            case 'Fm.Term.nat':
                var $4094 = self.natx;
                var $4095 = Bool$false;
                var $4057 = $4095;
                break;
            case 'Fm.Term.chr':
                var $4096 = self.chrx;
                var $4097 = Bool$false;
                var $4057 = $4097;
                break;
            case 'Fm.Term.str':
                var $4098 = self.strx;
                var $4099 = Bool$false;
                var $4057 = $4099;
                break;
            case 'Fm.Term.cse':
                var $4100 = self.path;
                var $4101 = self.expr;
                var $4102 = self.name;
                var $4103 = self.with;
                var $4104 = self.cses;
                var $4105 = self.moti;
                var $4106 = Bool$false;
                var $4057 = $4106;
                break;
            case 'Fm.Term.ori':
                var $4107 = self.orig;
                var $4108 = self.expr;
                var $4109 = Bool$false;
                var $4057 = $4109;
                break;
        };
        return $4057;
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
                        var $4110 = self.name;
                        var $4111 = self.indx;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4113 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4112 = $4113;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4115 = Bool$false;
                                var _wrap$8 = $4115;
                            } else {
                                var $4116 = self.charCodeAt(0);
                                var $4117 = self.slice(1);
                                var $4118 = ($4116 === 40);
                                var _wrap$8 = $4118;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4119 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4119;
                            } else {
                                var $4120 = _func$7;
                                var _func$10 = $4120;
                            };
                            var $4114 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4112 = $4114;
                        };
                        return $4112;
                    case 'Fm.Term.ref':
                        var $4121 = self.name;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4123 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4122 = $4123;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4125 = Bool$false;
                                var _wrap$7 = $4125;
                            } else {
                                var $4126 = self.charCodeAt(0);
                                var $4127 = self.slice(1);
                                var $4128 = ($4126 === 40);
                                var _wrap$7 = $4128;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4129 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4129;
                            } else {
                                var $4130 = _func$6;
                                var _func$9 = $4130;
                            };
                            var $4124 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4122 = $4124;
                        };
                        return $4122;
                    case 'Fm.Term.typ':
                        var _arity$4 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$4 === 3n));
                        if (self) {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$6 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$7 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4132 = String$flatten$(List$cons$(_eq_lft$6, List$cons$(" == ", List$cons$(_eq_rgt$7, List$nil))));
                            var $4131 = $4132;
                        } else {
                            var _func$5 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$5;
                            if (self.length === 0) {
                                var $4134 = Bool$false;
                                var _wrap$6 = $4134;
                            } else {
                                var $4135 = self.charCodeAt(0);
                                var $4136 = self.slice(1);
                                var $4137 = ($4135 === 40);
                                var _wrap$6 = $4137;
                            };
                            var _args$7 = String$join$(",", _args$3);
                            var self = _wrap$6;
                            if (self) {
                                var $4138 = String$flatten$(List$cons$("(", List$cons$(_func$5, List$cons$(")", List$nil))));
                                var _func$8 = $4138;
                            } else {
                                var $4139 = _func$5;
                                var _func$8 = $4139;
                            };
                            var $4133 = String$flatten$(List$cons$(_func$8, List$cons$("(", List$cons$(_args$7, List$cons$(")", List$nil)))));
                            var $4131 = $4133;
                        };
                        return $4131;
                    case 'Fm.Term.all':
                        var $4140 = self.eras;
                        var $4141 = self.self;
                        var $4142 = self.name;
                        var $4143 = self.xtyp;
                        var $4144 = self.body;
                        var _arity$9 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$9 === 3n));
                        if (self) {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$11 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$12 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4146 = String$flatten$(List$cons$(_eq_lft$11, List$cons$(" == ", List$cons$(_eq_rgt$12, List$nil))));
                            var $4145 = $4146;
                        } else {
                            var _func$10 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$10;
                            if (self.length === 0) {
                                var $4148 = Bool$false;
                                var _wrap$11 = $4148;
                            } else {
                                var $4149 = self.charCodeAt(0);
                                var $4150 = self.slice(1);
                                var $4151 = ($4149 === 40);
                                var _wrap$11 = $4151;
                            };
                            var _args$12 = String$join$(",", _args$3);
                            var self = _wrap$11;
                            if (self) {
                                var $4152 = String$flatten$(List$cons$("(", List$cons$(_func$10, List$cons$(")", List$nil))));
                                var _func$13 = $4152;
                            } else {
                                var $4153 = _func$10;
                                var _func$13 = $4153;
                            };
                            var $4147 = String$flatten$(List$cons$(_func$13, List$cons$("(", List$cons$(_args$12, List$cons$(")", List$nil)))));
                            var $4145 = $4147;
                        };
                        return $4145;
                    case 'Fm.Term.lam':
                        var $4154 = self.name;
                        var $4155 = self.body;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4157 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4156 = $4157;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4159 = Bool$false;
                                var _wrap$8 = $4159;
                            } else {
                                var $4160 = self.charCodeAt(0);
                                var $4161 = self.slice(1);
                                var $4162 = ($4160 === 40);
                                var _wrap$8 = $4162;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4163 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4163;
                            } else {
                                var $4164 = _func$7;
                                var _func$10 = $4164;
                            };
                            var $4158 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4156 = $4158;
                        };
                        return $4156;
                    case 'Fm.Term.app':
                        var $4165 = self.func;
                        var $4166 = self.argm;
                        var _argm$6 = Fm$Term$show$go$($4166, Fm$MPath$i$(_path$2));
                        var $4167 = Fm$Term$show$app$($4165, Fm$MPath$o$(_path$2), List$cons$(_argm$6, _args$3));
                        return $4167;
                    case 'Fm.Term.let':
                        var $4168 = self.name;
                        var $4169 = self.expr;
                        var $4170 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4172 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4171 = $4172;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4174 = Bool$false;
                                var _wrap$9 = $4174;
                            } else {
                                var $4175 = self.charCodeAt(0);
                                var $4176 = self.slice(1);
                                var $4177 = ($4175 === 40);
                                var _wrap$9 = $4177;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4178 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4178;
                            } else {
                                var $4179 = _func$8;
                                var _func$11 = $4179;
                            };
                            var $4173 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4171 = $4173;
                        };
                        return $4171;
                    case 'Fm.Term.def':
                        var $4180 = self.name;
                        var $4181 = self.expr;
                        var $4182 = self.body;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4184 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4183 = $4184;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4186 = Bool$false;
                                var _wrap$9 = $4186;
                            } else {
                                var $4187 = self.charCodeAt(0);
                                var $4188 = self.slice(1);
                                var $4189 = ($4187 === 40);
                                var _wrap$9 = $4189;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4190 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4190;
                            } else {
                                var $4191 = _func$8;
                                var _func$11 = $4191;
                            };
                            var $4185 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4183 = $4185;
                        };
                        return $4183;
                    case 'Fm.Term.ann':
                        var $4192 = self.done;
                        var $4193 = self.term;
                        var $4194 = self.type;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4196 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4195 = $4196;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4198 = Bool$false;
                                var _wrap$9 = $4198;
                            } else {
                                var $4199 = self.charCodeAt(0);
                                var $4200 = self.slice(1);
                                var $4201 = ($4199 === 40);
                                var _wrap$9 = $4201;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4202 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4202;
                            } else {
                                var $4203 = _func$8;
                                var _func$11 = $4203;
                            };
                            var $4197 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4195 = $4197;
                        };
                        return $4195;
                    case 'Fm.Term.gol':
                        var $4204 = self.name;
                        var $4205 = self.dref;
                        var $4206 = self.verb;
                        var _arity$7 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$7 === 3n));
                        if (self) {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$9 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$10 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4208 = String$flatten$(List$cons$(_eq_lft$9, List$cons$(" == ", List$cons$(_eq_rgt$10, List$nil))));
                            var $4207 = $4208;
                        } else {
                            var _func$8 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$8;
                            if (self.length === 0) {
                                var $4210 = Bool$false;
                                var _wrap$9 = $4210;
                            } else {
                                var $4211 = self.charCodeAt(0);
                                var $4212 = self.slice(1);
                                var $4213 = ($4211 === 40);
                                var _wrap$9 = $4213;
                            };
                            var _args$10 = String$join$(",", _args$3);
                            var self = _wrap$9;
                            if (self) {
                                var $4214 = String$flatten$(List$cons$("(", List$cons$(_func$8, List$cons$(")", List$nil))));
                                var _func$11 = $4214;
                            } else {
                                var $4215 = _func$8;
                                var _func$11 = $4215;
                            };
                            var $4209 = String$flatten$(List$cons$(_func$11, List$cons$("(", List$cons$(_args$10, List$cons$(")", List$nil)))));
                            var $4207 = $4209;
                        };
                        return $4207;
                    case 'Fm.Term.hol':
                        var $4216 = self.path;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4218 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4217 = $4218;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4220 = Bool$false;
                                var _wrap$7 = $4220;
                            } else {
                                var $4221 = self.charCodeAt(0);
                                var $4222 = self.slice(1);
                                var $4223 = ($4221 === 40);
                                var _wrap$7 = $4223;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4224 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4224;
                            } else {
                                var $4225 = _func$6;
                                var _func$9 = $4225;
                            };
                            var $4219 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4217 = $4219;
                        };
                        return $4217;
                    case 'Fm.Term.nat':
                        var $4226 = self.natx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4228 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4227 = $4228;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4230 = Bool$false;
                                var _wrap$7 = $4230;
                            } else {
                                var $4231 = self.charCodeAt(0);
                                var $4232 = self.slice(1);
                                var $4233 = ($4231 === 40);
                                var _wrap$7 = $4233;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4234 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4234;
                            } else {
                                var $4235 = _func$6;
                                var _func$9 = $4235;
                            };
                            var $4229 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4227 = $4229;
                        };
                        return $4227;
                    case 'Fm.Term.chr':
                        var $4236 = self.chrx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4238 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4237 = $4238;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4240 = Bool$false;
                                var _wrap$7 = $4240;
                            } else {
                                var $4241 = self.charCodeAt(0);
                                var $4242 = self.slice(1);
                                var $4243 = ($4241 === 40);
                                var _wrap$7 = $4243;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4244 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4244;
                            } else {
                                var $4245 = _func$6;
                                var _func$9 = $4245;
                            };
                            var $4239 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4237 = $4239;
                        };
                        return $4237;
                    case 'Fm.Term.str':
                        var $4246 = self.strx;
                        var _arity$5 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$5 === 3n));
                        if (self) {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$7 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$8 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4248 = String$flatten$(List$cons$(_eq_lft$7, List$cons$(" == ", List$cons$(_eq_rgt$8, List$nil))));
                            var $4247 = $4248;
                        } else {
                            var _func$6 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$6;
                            if (self.length === 0) {
                                var $4250 = Bool$false;
                                var _wrap$7 = $4250;
                            } else {
                                var $4251 = self.charCodeAt(0);
                                var $4252 = self.slice(1);
                                var $4253 = ($4251 === 40);
                                var _wrap$7 = $4253;
                            };
                            var _args$8 = String$join$(",", _args$3);
                            var self = _wrap$7;
                            if (self) {
                                var $4254 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(")", List$nil))));
                                var _func$9 = $4254;
                            } else {
                                var $4255 = _func$6;
                                var _func$9 = $4255;
                            };
                            var $4249 = String$flatten$(List$cons$(_func$9, List$cons$("(", List$cons$(_args$8, List$cons$(")", List$nil)))));
                            var $4247 = $4249;
                        };
                        return $4247;
                    case 'Fm.Term.cse':
                        var $4256 = self.path;
                        var $4257 = self.expr;
                        var $4258 = self.name;
                        var $4259 = self.with;
                        var $4260 = self.cses;
                        var $4261 = self.moti;
                        var _arity$10 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$10 === 3n));
                        if (self) {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$12 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$13 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4263 = String$flatten$(List$cons$(_eq_lft$12, List$cons$(" == ", List$cons$(_eq_rgt$13, List$nil))));
                            var $4262 = $4263;
                        } else {
                            var _func$11 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$11;
                            if (self.length === 0) {
                                var $4265 = Bool$false;
                                var _wrap$12 = $4265;
                            } else {
                                var $4266 = self.charCodeAt(0);
                                var $4267 = self.slice(1);
                                var $4268 = ($4266 === 40);
                                var _wrap$12 = $4268;
                            };
                            var _args$13 = String$join$(",", _args$3);
                            var self = _wrap$12;
                            if (self) {
                                var $4269 = String$flatten$(List$cons$("(", List$cons$(_func$11, List$cons$(")", List$nil))));
                                var _func$14 = $4269;
                            } else {
                                var $4270 = _func$11;
                                var _func$14 = $4270;
                            };
                            var $4264 = String$flatten$(List$cons$(_func$14, List$cons$("(", List$cons$(_args$13, List$cons$(")", List$nil)))));
                            var $4262 = $4264;
                        };
                        return $4262;
                    case 'Fm.Term.ori':
                        var $4271 = self.orig;
                        var $4272 = self.expr;
                        var _arity$6 = List$length$(_args$3);
                        var self = (Fm$Term$show$is_ref$(_term$1, "Equal") && (_arity$6 === 3n));
                        if (self) {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var _eq_lft$8 = Maybe$default$("?", List$at$(1n, _args$3));
                            var _eq_rgt$9 = Maybe$default$("?", List$at$(2n, _args$3));
                            var $4274 = String$flatten$(List$cons$(_eq_lft$8, List$cons$(" == ", List$cons$(_eq_rgt$9, List$nil))));
                            var $4273 = $4274;
                        } else {
                            var _func$7 = Fm$Term$show$go$(_term$1, _path$2);
                            var self = _func$7;
                            if (self.length === 0) {
                                var $4276 = Bool$false;
                                var _wrap$8 = $4276;
                            } else {
                                var $4277 = self.charCodeAt(0);
                                var $4278 = self.slice(1);
                                var $4279 = ($4277 === 40);
                                var _wrap$8 = $4279;
                            };
                            var _args$9 = String$join$(",", _args$3);
                            var self = _wrap$8;
                            if (self) {
                                var $4280 = String$flatten$(List$cons$("(", List$cons$(_func$7, List$cons$(")", List$nil))));
                                var _func$10 = $4280;
                            } else {
                                var $4281 = _func$7;
                                var _func$10 = $4281;
                            };
                            var $4275 = String$flatten$(List$cons$(_func$10, List$cons$("(", List$cons$(_args$9, List$cons$(")", List$nil)))));
                            var $4273 = $4275;
                        };
                        return $4273;
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
                var $4283 = _list$4;
                var $4282 = $4283;
                break;
            case 'Map.tie':
                var $4284 = self.val;
                var $4285 = self.lft;
                var $4286 = self.rgt;
                var self = $4284;
                switch (self._) {
                    case 'Maybe.none':
                        var $4288 = _list$4;
                        var _list0$8 = $4288;
                        break;
                    case 'Maybe.some':
                        var $4289 = self.value;
                        var $4290 = List$cons$(Pair$new$(Bits$reverse$(_key$3), $4289), _list$4);
                        var _list0$8 = $4290;
                        break;
                };
                var _list1$9 = Map$to_list$go$($4285, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$to_list$go$($4286, (_key$3 + '1'), _list1$9);
                var $4287 = _list2$10;
                var $4282 = $4287;
                break;
        };
        return $4282;
    };
    const Map$to_list$go = x0 => x1 => x2 => Map$to_list$go$(x0, x1, x2);

    function Map$to_list$(_xs$2) {
        var $4291 = List$reverse$(Map$to_list$go$(_xs$2, Bits$e, List$nil));
        return $4291;
    };
    const Map$to_list = x0 => Map$to_list$(x0);

    function Bits$chunks_of$go$(_len$1, _bits$2, _need$3, _chunk$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'e':
                var $4293 = List$cons$(Bits$reverse$(_chunk$4), List$nil);
                var $4292 = $4293;
                break;
            case 'o':
                var $4294 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $4296 = List$cons$(_head$6, _tail$7);
                    var $4295 = $4296;
                } else {
                    var $4297 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '0');
                    var $4298 = Bits$chunks_of$go$(_len$1, $4294, $4297, _chunk$7);
                    var $4295 = $4298;
                };
                var $4292 = $4295;
                break;
            case 'i':
                var $4299 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $4301 = List$cons$(_head$6, _tail$7);
                    var $4300 = $4301;
                } else {
                    var $4302 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '1');
                    var $4303 = Bits$chunks_of$go$(_len$1, $4299, $4302, _chunk$7);
                    var $4300 = $4303;
                };
                var $4292 = $4300;
                break;
        };
        return $4292;
    };
    const Bits$chunks_of$go = x0 => x1 => x2 => x3 => Bits$chunks_of$go$(x0, x1, x2, x3);

    function Bits$chunks_of$(_len$1, _bits$2) {
        var $4304 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
        return $4304;
    };
    const Bits$chunks_of = x0 => x1 => Bits$chunks_of$(x0, x1);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $4306 = Word$e;
            var $4305 = $4306;
        } else {
            var $4307 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'e':
                    var $4309 = Word$o$(Word$from_bits$($4307, Bits$e));
                    var $4308 = $4309;
                    break;
                case 'o':
                    var $4310 = self.slice(0, -1);
                    var $4311 = Word$o$(Word$from_bits$($4307, $4310));
                    var $4308 = $4311;
                    break;
                case 'i':
                    var $4312 = self.slice(0, -1);
                    var $4313 = Word$i$(Word$from_bits$($4307, $4312));
                    var $4308 = $4313;
                    break;
            };
            var $4305 = $4308;
        };
        return $4305;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);

    function Fm$Name$from_bits$(_bits$1) {
        var _list$2 = Bits$chunks_of$(6n, _bits$1);
        var _name$3 = List$fold$(_list$2, String$nil, (_bts$3 => _name$4 => {
            var _u16$5 = U16$new$(Word$from_bits$(16n, Bits$reverse$(_bts$3)));
            var self = U16$btw$(0, _u16$5, 25);
            if (self) {
                var $4316 = ((_u16$5 + 65) & 0xFFFF);
                var _chr$6 = $4316;
            } else {
                var self = U16$btw$(26, _u16$5, 51);
                if (self) {
                    var $4318 = ((_u16$5 + 71) & 0xFFFF);
                    var $4317 = $4318;
                } else {
                    var self = U16$btw$(52, _u16$5, 61);
                    if (self) {
                        var $4320 = (Math.max(_u16$5 - 4, 0));
                        var $4319 = $4320;
                    } else {
                        var self = (62 === _u16$5);
                        if (self) {
                            var $4322 = 46;
                            var $4321 = $4322;
                        } else {
                            var $4323 = 95;
                            var $4321 = $4323;
                        };
                        var $4319 = $4321;
                    };
                    var $4317 = $4319;
                };
                var _chr$6 = $4317;
            };
            var $4315 = String$cons$(_chr$6, _name$4);
            return $4315;
        }));
        var $4314 = _name$3;
        return $4314;
    };
    const Fm$Name$from_bits = x0 => Fm$Name$from_bits$(x0);

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $4325 = self.fst;
                var $4326 = self.snd;
                var $4327 = $4325;
                var $4324 = $4327;
                break;
        };
        return $4324;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Fm$Term$show$go$(_term$1, _path$2) {
        var self = Fm$Term$show$as_nat$(_term$1);
        switch (self._) {
            case 'Maybe.none':
                var self = _term$1;
                switch (self._) {
                    case 'Fm.Term.var':
                        var $4330 = self.name;
                        var $4331 = self.indx;
                        var $4332 = Fm$Name$show$($4330);
                        var $4329 = $4332;
                        break;
                    case 'Fm.Term.ref':
                        var $4333 = self.name;
                        var _name$4 = Fm$Name$show$($4333);
                        var self = _path$2;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4335 = _name$4;
                                var $4334 = $4335;
                                break;
                            case 'Maybe.some':
                                var $4336 = self.value;
                                var _path_val$6 = ((Bits$e + '1') + Fm$Path$to_bits$($4336));
                                var _path_str$7 = Nat$show$(Bits$to_nat$(_path_val$6));
                                var $4337 = String$flatten$(List$cons$(_name$4, List$cons$(Fm$color$("2", ("-" + _path_str$7)), List$nil)));
                                var $4334 = $4337;
                                break;
                        };
                        var $4329 = $4334;
                        break;
                    case 'Fm.Term.typ':
                        var $4338 = "Type";
                        var $4329 = $4338;
                        break;
                    case 'Fm.Term.all':
                        var $4339 = self.eras;
                        var $4340 = self.self;
                        var $4341 = self.name;
                        var $4342 = self.xtyp;
                        var $4343 = self.body;
                        var _eras$8 = $4339;
                        var _self$9 = Fm$Name$show$($4340);
                        var _name$10 = Fm$Name$show$($4341);
                        var _type$11 = Fm$Term$show$go$($4342, Fm$MPath$o$(_path$2));
                        var self = _eras$8;
                        if (self) {
                            var $4345 = "<";
                            var _open$12 = $4345;
                        } else {
                            var $4346 = "(";
                            var _open$12 = $4346;
                        };
                        var self = _eras$8;
                        if (self) {
                            var $4347 = ">";
                            var _clos$13 = $4347;
                        } else {
                            var $4348 = ")";
                            var _clos$13 = $4348;
                        };
                        var _body$14 = Fm$Term$show$go$($4343(Fm$Term$var$($4340, 0n))(Fm$Term$var$($4341, 0n)), Fm$MPath$i$(_path$2));
                        var $4344 = String$flatten$(List$cons$(_self$9, List$cons$(_open$12, List$cons$(_name$10, List$cons$(":", List$cons$(_type$11, List$cons$(_clos$13, List$cons$(" ", List$cons$(_body$14, List$nil)))))))));
                        var $4329 = $4344;
                        break;
                    case 'Fm.Term.lam':
                        var $4349 = self.name;
                        var $4350 = self.body;
                        var _name$5 = Fm$Name$show$($4349);
                        var _body$6 = Fm$Term$show$go$($4350(Fm$Term$var$($4349, 0n)), Fm$MPath$o$(_path$2));
                        var $4351 = String$flatten$(List$cons$("(", List$cons$(_name$5, List$cons$(") ", List$cons$(_body$6, List$nil)))));
                        var $4329 = $4351;
                        break;
                    case 'Fm.Term.app':
                        var $4352 = self.func;
                        var $4353 = self.argm;
                        var $4354 = Fm$Term$show$app$(_term$1, _path$2, List$nil);
                        var $4329 = $4354;
                        break;
                    case 'Fm.Term.let':
                        var $4355 = self.name;
                        var $4356 = self.expr;
                        var $4357 = self.body;
                        var _name$6 = Fm$Name$show$($4355);
                        var _expr$7 = Fm$Term$show$go$($4356, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($4357(Fm$Term$var$($4355, 0n)), Fm$MPath$i$(_path$2));
                        var $4358 = String$flatten$(List$cons$("let ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $4329 = $4358;
                        break;
                    case 'Fm.Term.def':
                        var $4359 = self.name;
                        var $4360 = self.expr;
                        var $4361 = self.body;
                        var _name$6 = Fm$Name$show$($4359);
                        var _expr$7 = Fm$Term$show$go$($4360, Fm$MPath$o$(_path$2));
                        var _body$8 = Fm$Term$show$go$($4361(Fm$Term$var$($4359, 0n)), Fm$MPath$i$(_path$2));
                        var $4362 = String$flatten$(List$cons$("def ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $4329 = $4362;
                        break;
                    case 'Fm.Term.ann':
                        var $4363 = self.done;
                        var $4364 = self.term;
                        var $4365 = self.type;
                        var _term$6 = Fm$Term$show$go$($4364, Fm$MPath$o$(_path$2));
                        var _type$7 = Fm$Term$show$go$($4365, Fm$MPath$i$(_path$2));
                        var $4366 = String$flatten$(List$cons$(_term$6, List$cons$("::", List$cons$(_type$7, List$nil))));
                        var $4329 = $4366;
                        break;
                    case 'Fm.Term.gol':
                        var $4367 = self.name;
                        var $4368 = self.dref;
                        var $4369 = self.verb;
                        var _name$6 = Fm$Name$show$($4367);
                        var $4370 = String$flatten$(List$cons$("?", List$cons$(_name$6, List$nil)));
                        var $4329 = $4370;
                        break;
                    case 'Fm.Term.hol':
                        var $4371 = self.path;
                        var $4372 = "_";
                        var $4329 = $4372;
                        break;
                    case 'Fm.Term.nat':
                        var $4373 = self.natx;
                        var $4374 = String$flatten$(List$cons$(Nat$show$($4373), List$nil));
                        var $4329 = $4374;
                        break;
                    case 'Fm.Term.chr':
                        var $4375 = self.chrx;
                        var $4376 = String$flatten$(List$cons$("\'", List$cons$(Fm$escape$char$($4375), List$cons$("\'", List$nil))));
                        var $4329 = $4376;
                        break;
                    case 'Fm.Term.str':
                        var $4377 = self.strx;
                        var $4378 = String$flatten$(List$cons$("\"", List$cons$(Fm$escape$($4377), List$cons$("\"", List$nil))));
                        var $4329 = $4378;
                        break;
                    case 'Fm.Term.cse':
                        var $4379 = self.path;
                        var $4380 = self.expr;
                        var $4381 = self.name;
                        var $4382 = self.with;
                        var $4383 = self.cses;
                        var $4384 = self.moti;
                        var _expr$9 = Fm$Term$show$go$($4380, Fm$MPath$o$(_path$2));
                        var _name$10 = Fm$Name$show$($4381);
                        var _wyth$11 = String$join$("", List$mapped$($4382, (_defn$11 => {
                            var self = _defn$11;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4387 = self.file;
                                    var $4388 = self.code;
                                    var $4389 = self.name;
                                    var $4390 = self.term;
                                    var $4391 = self.type;
                                    var $4392 = self.stat;
                                    var _name$18 = Fm$Name$show$($4389);
                                    var _type$19 = Fm$Term$show$go$($4391, Maybe$none);
                                    var _term$20 = Fm$Term$show$go$($4390, Maybe$none);
                                    var $4393 = String$flatten$(List$cons$(_name$18, List$cons$(": ", List$cons$(_type$19, List$cons$(" = ", List$cons$(_term$20, List$cons$(";", List$nil)))))));
                                    var $4386 = $4393;
                                    break;
                            };
                            return $4386;
                        })));
                        var _cses$12 = Map$to_list$($4383);
                        var _cses$13 = String$join$("", List$mapped$(_cses$12, (_x$13 => {
                            var _name$14 = Fm$Name$from_bits$(Pair$fst$(_x$13));
                            var _term$15 = Fm$Term$show$go$(Pair$snd$(_x$13), Maybe$none);
                            var $4394 = String$flatten$(List$cons$(_name$14, List$cons$(": ", List$cons$(_term$15, List$cons$("; ", List$nil)))));
                            return $4394;
                        })));
                        var self = $4384;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4395 = "";
                                var _moti$14 = $4395;
                                break;
                            case 'Maybe.some':
                                var $4396 = self.value;
                                var $4397 = String$flatten$(List$cons$(": ", List$cons$(Fm$Term$show$go$($4396, Maybe$none), List$nil)));
                                var _moti$14 = $4397;
                                break;
                        };
                        var $4385 = String$flatten$(List$cons$("case ", List$cons$(_expr$9, List$cons$(" as ", List$cons$(_name$10, List$cons$(_wyth$11, List$cons$(" { ", List$cons$(_cses$13, List$cons$("}", List$cons$(_moti$14, List$nil))))))))));
                        var $4329 = $4385;
                        break;
                    case 'Fm.Term.ori':
                        var $4398 = self.orig;
                        var $4399 = self.expr;
                        var $4400 = Fm$Term$show$go$($4399, _path$2);
                        var $4329 = $4400;
                        break;
                };
                var $4328 = $4329;
                break;
            case 'Maybe.some':
                var $4401 = self.value;
                var $4402 = $4401;
                var $4328 = $4402;
                break;
        };
        return $4328;
    };
    const Fm$Term$show$go = x0 => x1 => Fm$Term$show$go$(x0, x1);

    function Fm$Term$show$(_term$1) {
        var $4403 = Fm$Term$show$go$(_term$1, Maybe$none);
        return $4403;
    };
    const Fm$Term$show = x0 => Fm$Term$show$(x0);

    function Fm$Error$relevant$(_errors$1, _got$2) {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                var $4405 = List$nil;
                var $4404 = $4405;
                break;
            case 'List.cons':
                var $4406 = self.head;
                var $4407 = self.tail;
                var self = $4406;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4409 = self.origin;
                        var $4410 = self.expected;
                        var $4411 = self.detected;
                        var $4412 = self.context;
                        var $4413 = (!_got$2);
                        var _keep$5 = $4413;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4414 = self.name;
                        var $4415 = self.dref;
                        var $4416 = self.verb;
                        var $4417 = self.goal;
                        var $4418 = self.context;
                        var $4419 = Bool$true;
                        var _keep$5 = $4419;
                        break;
                    case 'Fm.Error.waiting':
                        var $4420 = self.name;
                        var $4421 = Bool$false;
                        var _keep$5 = $4421;
                        break;
                    case 'Fm.Error.indirect':
                        var $4422 = self.name;
                        var $4423 = Bool$false;
                        var _keep$5 = $4423;
                        break;
                    case 'Fm.Error.patch':
                        var $4424 = self.path;
                        var $4425 = self.term;
                        var $4426 = Bool$false;
                        var _keep$5 = $4426;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4427 = self.origin;
                        var $4428 = self.name;
                        var $4429 = (!_got$2);
                        var _keep$5 = $4429;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4430 = self.origin;
                        var $4431 = self.term;
                        var $4432 = self.context;
                        var $4433 = (!_got$2);
                        var _keep$5 = $4433;
                        break;
                };
                var self = $4406;
                switch (self._) {
                    case 'Fm.Error.type_mismatch':
                        var $4434 = self.origin;
                        var $4435 = self.expected;
                        var $4436 = self.detected;
                        var $4437 = self.context;
                        var $4438 = Bool$true;
                        var _got$6 = $4438;
                        break;
                    case 'Fm.Error.show_goal':
                        var $4439 = self.name;
                        var $4440 = self.dref;
                        var $4441 = self.verb;
                        var $4442 = self.goal;
                        var $4443 = self.context;
                        var $4444 = _got$2;
                        var _got$6 = $4444;
                        break;
                    case 'Fm.Error.waiting':
                        var $4445 = self.name;
                        var $4446 = _got$2;
                        var _got$6 = $4446;
                        break;
                    case 'Fm.Error.indirect':
                        var $4447 = self.name;
                        var $4448 = _got$2;
                        var _got$6 = $4448;
                        break;
                    case 'Fm.Error.patch':
                        var $4449 = self.path;
                        var $4450 = self.term;
                        var $4451 = _got$2;
                        var _got$6 = $4451;
                        break;
                    case 'Fm.Error.undefined_reference':
                        var $4452 = self.origin;
                        var $4453 = self.name;
                        var $4454 = Bool$true;
                        var _got$6 = $4454;
                        break;
                    case 'Fm.Error.cant_infer':
                        var $4455 = self.origin;
                        var $4456 = self.term;
                        var $4457 = self.context;
                        var $4458 = _got$2;
                        var _got$6 = $4458;
                        break;
                };
                var _tail$7 = Fm$Error$relevant$($4407, _got$6);
                var self = _keep$5;
                if (self) {
                    var $4459 = List$cons$($4406, _tail$7);
                    var $4408 = $4459;
                } else {
                    var $4460 = _tail$7;
                    var $4408 = $4460;
                };
                var $4404 = $4408;
                break;
        };
        return $4404;
    };
    const Fm$Error$relevant = x0 => x1 => Fm$Error$relevant$(x0, x1);

    function Fm$Context$show$(_context$1) {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                var $4462 = "";
                var $4461 = $4462;
                break;
            case 'List.cons':
                var $4463 = self.head;
                var $4464 = self.tail;
                var self = $4463;
                switch (self._) {
                    case 'Pair.new':
                        var $4466 = self.fst;
                        var $4467 = self.snd;
                        var _name$6 = Fm$Name$show$($4466);
                        var _type$7 = Fm$Term$show$($4467);
                        var _rest$8 = Fm$Context$show$($4464);
                        var $4468 = String$flatten$(List$cons$(_rest$8, List$cons$("- ", List$cons$(_name$6, List$cons$(": ", List$cons$(_type$7, List$cons$("\u{a}", List$nil)))))));
                        var $4465 = $4468;
                        break;
                };
                var $4461 = $4465;
                break;
        };
        return $4461;
    };
    const Fm$Context$show = x0 => Fm$Context$show$(x0);

    function Fm$Term$expand_at$(_path$1, _term$2, _defs$3) {
        var $4469 = Fm$Term$patch_at$(_path$1, _term$2, (_term$4 => {
            var self = _term$4;
            switch (self._) {
                case 'Fm.Term.var':
                    var $4471 = self.name;
                    var $4472 = self.indx;
                    var $4473 = _term$4;
                    var $4470 = $4473;
                    break;
                case 'Fm.Term.ref':
                    var $4474 = self.name;
                    var self = Fm$get$($4474, _defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4476 = Fm$Term$ref$($4474);
                            var $4475 = $4476;
                            break;
                        case 'Maybe.some':
                            var $4477 = self.value;
                            var self = $4477;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4479 = self.file;
                                    var $4480 = self.code;
                                    var $4481 = self.name;
                                    var $4482 = self.term;
                                    var $4483 = self.type;
                                    var $4484 = self.stat;
                                    var $4485 = $4482;
                                    var $4478 = $4485;
                                    break;
                            };
                            var $4475 = $4478;
                            break;
                    };
                    var $4470 = $4475;
                    break;
                case 'Fm.Term.typ':
                    var $4486 = _term$4;
                    var $4470 = $4486;
                    break;
                case 'Fm.Term.all':
                    var $4487 = self.eras;
                    var $4488 = self.self;
                    var $4489 = self.name;
                    var $4490 = self.xtyp;
                    var $4491 = self.body;
                    var $4492 = _term$4;
                    var $4470 = $4492;
                    break;
                case 'Fm.Term.lam':
                    var $4493 = self.name;
                    var $4494 = self.body;
                    var $4495 = _term$4;
                    var $4470 = $4495;
                    break;
                case 'Fm.Term.app':
                    var $4496 = self.func;
                    var $4497 = self.argm;
                    var $4498 = _term$4;
                    var $4470 = $4498;
                    break;
                case 'Fm.Term.let':
                    var $4499 = self.name;
                    var $4500 = self.expr;
                    var $4501 = self.body;
                    var $4502 = _term$4;
                    var $4470 = $4502;
                    break;
                case 'Fm.Term.def':
                    var $4503 = self.name;
                    var $4504 = self.expr;
                    var $4505 = self.body;
                    var $4506 = _term$4;
                    var $4470 = $4506;
                    break;
                case 'Fm.Term.ann':
                    var $4507 = self.done;
                    var $4508 = self.term;
                    var $4509 = self.type;
                    var $4510 = _term$4;
                    var $4470 = $4510;
                    break;
                case 'Fm.Term.gol':
                    var $4511 = self.name;
                    var $4512 = self.dref;
                    var $4513 = self.verb;
                    var $4514 = _term$4;
                    var $4470 = $4514;
                    break;
                case 'Fm.Term.hol':
                    var $4515 = self.path;
                    var $4516 = _term$4;
                    var $4470 = $4516;
                    break;
                case 'Fm.Term.nat':
                    var $4517 = self.natx;
                    var $4518 = _term$4;
                    var $4470 = $4518;
                    break;
                case 'Fm.Term.chr':
                    var $4519 = self.chrx;
                    var $4520 = _term$4;
                    var $4470 = $4520;
                    break;
                case 'Fm.Term.str':
                    var $4521 = self.strx;
                    var $4522 = _term$4;
                    var $4470 = $4522;
                    break;
                case 'Fm.Term.cse':
                    var $4523 = self.path;
                    var $4524 = self.expr;
                    var $4525 = self.name;
                    var $4526 = self.with;
                    var $4527 = self.cses;
                    var $4528 = self.moti;
                    var $4529 = _term$4;
                    var $4470 = $4529;
                    break;
                case 'Fm.Term.ori':
                    var $4530 = self.orig;
                    var $4531 = self.expr;
                    var $4532 = _term$4;
                    var $4470 = $4532;
                    break;
            };
            return $4470;
        }));
        return $4469;
    };
    const Fm$Term$expand_at = x0 => x1 => x2 => Fm$Term$expand_at$(x0, x1, x2);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Fm$Term$expand_ct$(_term$1, _defs$2, _arity$3) {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $4534 = self.name;
                var $4535 = self.indx;
                var $4536 = Fm$Term$var$($4534, $4535);
                var $4533 = $4536;
                break;
            case 'Fm.Term.ref':
                var $4537 = self.name;
                var _expand$5 = Bool$false;
                var _expand$6 = ((($4537 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                var _expand$7 = ((($4537 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                var _expand$8 = ((($4537 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                var _expand$9 = ((($4537 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                var self = _expand$9;
                if (self) {
                    var self = Fm$get$($4537, _defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            var $4540 = Fm$Term$ref$($4537);
                            var $4539 = $4540;
                            break;
                        case 'Maybe.some':
                            var $4541 = self.value;
                            var self = $4541;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $4543 = self.file;
                                    var $4544 = self.code;
                                    var $4545 = self.name;
                                    var $4546 = self.term;
                                    var $4547 = self.type;
                                    var $4548 = self.stat;
                                    var $4549 = $4546;
                                    var $4542 = $4549;
                                    break;
                            };
                            var $4539 = $4542;
                            break;
                    };
                    var $4538 = $4539;
                } else {
                    var $4550 = Fm$Term$ref$($4537);
                    var $4538 = $4550;
                };
                var $4533 = $4538;
                break;
            case 'Fm.Term.typ':
                var $4551 = Fm$Term$typ;
                var $4533 = $4551;
                break;
            case 'Fm.Term.all':
                var $4552 = self.eras;
                var $4553 = self.self;
                var $4554 = self.name;
                var $4555 = self.xtyp;
                var $4556 = self.body;
                var $4557 = Fm$Term$all$($4552, $4553, $4554, Fm$Term$expand_ct$($4555, _defs$2, 0n), (_s$9 => _x$10 => {
                    var $4558 = Fm$Term$expand_ct$($4556(_s$9)(_x$10), _defs$2, 0n);
                    return $4558;
                }));
                var $4533 = $4557;
                break;
            case 'Fm.Term.lam':
                var $4559 = self.name;
                var $4560 = self.body;
                var $4561 = Fm$Term$lam$($4559, (_x$6 => {
                    var $4562 = Fm$Term$expand_ct$($4560(_x$6), _defs$2, 0n);
                    return $4562;
                }));
                var $4533 = $4561;
                break;
            case 'Fm.Term.app':
                var $4563 = self.func;
                var $4564 = self.argm;
                var $4565 = Fm$Term$app$(Fm$Term$expand_ct$($4563, _defs$2, Nat$succ$(_arity$3)), Fm$Term$expand_ct$($4564, _defs$2, 0n));
                var $4533 = $4565;
                break;
            case 'Fm.Term.let':
                var $4566 = self.name;
                var $4567 = self.expr;
                var $4568 = self.body;
                var $4569 = Fm$Term$let$($4566, Fm$Term$expand_ct$($4567, _defs$2, 0n), (_x$7 => {
                    var $4570 = Fm$Term$expand_ct$($4568(_x$7), _defs$2, 0n);
                    return $4570;
                }));
                var $4533 = $4569;
                break;
            case 'Fm.Term.def':
                var $4571 = self.name;
                var $4572 = self.expr;
                var $4573 = self.body;
                var $4574 = Fm$Term$def$($4571, Fm$Term$expand_ct$($4572, _defs$2, 0n), (_x$7 => {
                    var $4575 = Fm$Term$expand_ct$($4573(_x$7), _defs$2, 0n);
                    return $4575;
                }));
                var $4533 = $4574;
                break;
            case 'Fm.Term.ann':
                var $4576 = self.done;
                var $4577 = self.term;
                var $4578 = self.type;
                var $4579 = Fm$Term$ann$($4576, Fm$Term$expand_ct$($4577, _defs$2, 0n), Fm$Term$expand_ct$($4578, _defs$2, 0n));
                var $4533 = $4579;
                break;
            case 'Fm.Term.gol':
                var $4580 = self.name;
                var $4581 = self.dref;
                var $4582 = self.verb;
                var $4583 = Fm$Term$gol$($4580, $4581, $4582);
                var $4533 = $4583;
                break;
            case 'Fm.Term.hol':
                var $4584 = self.path;
                var $4585 = Fm$Term$hol$($4584);
                var $4533 = $4585;
                break;
            case 'Fm.Term.nat':
                var $4586 = self.natx;
                var $4587 = Fm$Term$nat$($4586);
                var $4533 = $4587;
                break;
            case 'Fm.Term.chr':
                var $4588 = self.chrx;
                var $4589 = Fm$Term$chr$($4588);
                var $4533 = $4589;
                break;
            case 'Fm.Term.str':
                var $4590 = self.strx;
                var $4591 = Fm$Term$str$($4590);
                var $4533 = $4591;
                break;
            case 'Fm.Term.cse':
                var $4592 = self.path;
                var $4593 = self.expr;
                var $4594 = self.name;
                var $4595 = self.with;
                var $4596 = self.cses;
                var $4597 = self.moti;
                var $4598 = _term$1;
                var $4533 = $4598;
                break;
            case 'Fm.Term.ori':
                var $4599 = self.orig;
                var $4600 = self.expr;
                var $4601 = Fm$Term$ori$($4599, $4600);
                var $4533 = $4601;
                break;
        };
        return $4533;
    };
    const Fm$Term$expand_ct = x0 => x1 => x2 => Fm$Term$expand_ct$(x0, x1, x2);

    function Fm$Term$expand$(_dref$1, _term$2, _defs$3) {
        var _term$4 = Fm$Term$normalize$(_term$2, Map$new);
        var _term$5 = (() => {
            var $4604 = _term$4;
            var $4605 = _dref$1;
            let _term$6 = $4604;
            let _path$5;
            while ($4605._ === 'List.cons') {
                _path$5 = $4605.head;
                var _term$7 = Fm$Term$expand_at$(_path$5, _term$6, _defs$3);
                var _term$8 = Fm$Term$normalize$(_term$7, Map$new);
                var _term$9 = Fm$Term$expand_ct$(_term$8, _defs$3, 0n);
                var _term$10 = Fm$Term$normalize$(_term$9, Map$new);
                var $4604 = _term$10;
                _term$6 = $4604;
                $4605 = $4605.tail;
            }
            return _term$6;
        })();
        var $4602 = _term$5;
        return $4602;
    };
    const Fm$Term$expand = x0 => x1 => x2 => Fm$Term$expand$(x0, x1, x2);

    function Fm$Error$show$(_error$1, _defs$2) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $4607 = self.origin;
                var $4608 = self.expected;
                var $4609 = self.detected;
                var $4610 = self.context;
                var self = $4608;
                switch (self._) {
                    case 'Either.left':
                        var $4612 = self.value;
                        var $4613 = $4612;
                        var _expected$7 = $4613;
                        break;
                    case 'Either.right':
                        var $4614 = self.value;
                        var $4615 = Fm$Term$show$(Fm$Term$normalize$($4614, Map$new));
                        var _expected$7 = $4615;
                        break;
                };
                var self = $4609;
                switch (self._) {
                    case 'Either.left':
                        var $4616 = self.value;
                        var $4617 = $4616;
                        var _detected$8 = $4617;
                        break;
                    case 'Either.right':
                        var $4618 = self.value;
                        var $4619 = Fm$Term$show$(Fm$Term$normalize$($4618, Map$new));
                        var _detected$8 = $4619;
                        break;
                };
                var $4611 = String$flatten$(List$cons$("Type mismatch.\u{a}", List$cons$("- Expected: ", List$cons$(_expected$7, List$cons$("\u{a}", List$cons$("- Detected: ", List$cons$(_detected$8, List$cons$("\u{a}", List$cons$((() => {
                    var self = $4610;
                    switch (self._) {
                        case 'List.nil':
                            var $4620 = "";
                            return $4620;
                        case 'List.cons':
                            var $4621 = self.head;
                            var $4622 = self.tail;
                            var $4623 = String$flatten$(List$cons$("With context:\u{a}", List$cons$(Fm$Context$show$($4610), List$nil)));
                            return $4623;
                    };
                })(), List$nil)))))))));
                var $4606 = $4611;
                break;
            case 'Fm.Error.show_goal':
                var $4624 = self.name;
                var $4625 = self.dref;
                var $4626 = self.verb;
                var $4627 = self.goal;
                var $4628 = self.context;
                var _goal_name$8 = String$flatten$(List$cons$("Goal ?", List$cons$(Fm$Name$show$($4624), List$cons$(":\u{a}", List$nil))));
                var self = $4627;
                switch (self._) {
                    case 'Maybe.none':
                        var $4630 = "";
                        var _with_type$9 = $4630;
                        break;
                    case 'Maybe.some':
                        var $4631 = self.value;
                        var _goal$10 = Fm$Term$expand$($4625, $4631, _defs$2);
                        var $4632 = String$flatten$(List$cons$("With type: ", List$cons$((() => {
                            var self = $4626;
                            if (self) {
                                var $4633 = Fm$Term$show$go$(_goal$10, Maybe$some$((_x$11 => {
                                    var $4634 = _x$11;
                                    return $4634;
                                })));
                                return $4633;
                            } else {
                                var $4635 = Fm$Term$show$(_goal$10);
                                return $4635;
                            };
                        })(), List$cons$("\u{a}", List$nil))));
                        var _with_type$9 = $4632;
                        break;
                };
                var self = $4628;
                switch (self._) {
                    case 'List.nil':
                        var $4636 = "";
                        var _with_ctxt$10 = $4636;
                        break;
                    case 'List.cons':
                        var $4637 = self.head;
                        var $4638 = self.tail;
                        var $4639 = String$flatten$(List$cons$("With ctxt:\u{a}", List$cons$(Fm$Context$show$($4628), List$nil)));
                        var _with_ctxt$10 = $4639;
                        break;
                };
                var $4629 = String$flatten$(List$cons$(_goal_name$8, List$cons$(_with_type$9, List$cons$(_with_ctxt$10, List$nil))));
                var $4606 = $4629;
                break;
            case 'Fm.Error.waiting':
                var $4640 = self.name;
                var $4641 = String$flatten$(List$cons$("Waiting for \'", List$cons$($4640, List$cons$("\'.", List$nil))));
                var $4606 = $4641;
                break;
            case 'Fm.Error.indirect':
                var $4642 = self.name;
                var $4643 = String$flatten$(List$cons$("Error on dependency \'", List$cons$($4642, List$cons$("\'.", List$nil))));
                var $4606 = $4643;
                break;
            case 'Fm.Error.patch':
                var $4644 = self.path;
                var $4645 = self.term;
                var $4646 = String$flatten$(List$cons$("Patching: ", List$cons$(Fm$Term$show$($4645), List$nil)));
                var $4606 = $4646;
                break;
            case 'Fm.Error.undefined_reference':
                var $4647 = self.origin;
                var $4648 = self.name;
                var $4649 = String$flatten$(List$cons$("Undefined reference: ", List$cons$(Fm$Name$show$($4648), List$cons$("\u{a}", List$nil))));
                var $4606 = $4649;
                break;
            case 'Fm.Error.cant_infer':
                var $4650 = self.origin;
                var $4651 = self.term;
                var $4652 = self.context;
                var _term$6 = Fm$Term$show$($4651);
                var _context$7 = Fm$Context$show$($4652);
                var $4653 = String$flatten$(List$cons$("Can\'t infer type of: ", List$cons$(_term$6, List$cons$("\u{a}", List$cons$("With ctxt:\u{a}", List$cons$(_context$7, List$nil))))));
                var $4606 = $4653;
                break;
        };
        return $4606;
    };
    const Fm$Error$show = x0 => x1 => Fm$Error$show$(x0, x1);

    function Fm$Error$origin$(_error$1) {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $4655 = self.origin;
                var $4656 = self.expected;
                var $4657 = self.detected;
                var $4658 = self.context;
                var $4659 = $4655;
                var $4654 = $4659;
                break;
            case 'Fm.Error.show_goal':
                var $4660 = self.name;
                var $4661 = self.dref;
                var $4662 = self.verb;
                var $4663 = self.goal;
                var $4664 = self.context;
                var $4665 = Maybe$none;
                var $4654 = $4665;
                break;
            case 'Fm.Error.waiting':
                var $4666 = self.name;
                var $4667 = Maybe$none;
                var $4654 = $4667;
                break;
            case 'Fm.Error.indirect':
                var $4668 = self.name;
                var $4669 = Maybe$none;
                var $4654 = $4669;
                break;
            case 'Fm.Error.patch':
                var $4670 = self.path;
                var $4671 = self.term;
                var $4672 = Maybe$none;
                var $4654 = $4672;
                break;
            case 'Fm.Error.undefined_reference':
                var $4673 = self.origin;
                var $4674 = self.name;
                var $4675 = $4673;
                var $4654 = $4675;
                break;
            case 'Fm.Error.cant_infer':
                var $4676 = self.origin;
                var $4677 = self.term;
                var $4678 = self.context;
                var $4679 = $4676;
                var $4654 = $4679;
                break;
        };
        return $4654;
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
                        var $4680 = String$flatten$(List$cons$(_typs$4, List$cons$("\u{a}", List$cons$((() => {
                            var self = _errs$3;
                            if (self.length === 0) {
                                var $4681 = "All terms check.";
                                return $4681;
                            } else {
                                var $4682 = self.charCodeAt(0);
                                var $4683 = self.slice(1);
                                var $4684 = _errs$3;
                                return $4684;
                            };
                        })(), List$nil))));
                        return $4680;
                    case 'List.cons':
                        var $4685 = self.head;
                        var $4686 = self.tail;
                        var _name$7 = $4685;
                        var self = Fm$get$(_name$7, _defs$1);
                        switch (self._) {
                            case 'Maybe.none':
                                var $4688 = Fm$Defs$report$go$(_defs$1, $4686, _errs$3, _typs$4);
                                var $4687 = $4688;
                                break;
                            case 'Maybe.some':
                                var $4689 = self.value;
                                var self = $4689;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $4691 = self.file;
                                        var $4692 = self.code;
                                        var $4693 = self.name;
                                        var $4694 = self.term;
                                        var $4695 = self.type;
                                        var $4696 = self.stat;
                                        var _typs$15 = String$flatten$(List$cons$(_typs$4, List$cons$(_name$7, List$cons$(": ", List$cons$(Fm$Term$show$($4695), List$cons$("\u{a}", List$nil))))));
                                        var self = $4696;
                                        switch (self._) {
                                            case 'Fm.Status.init':
                                                var $4698 = Fm$Defs$report$go$(_defs$1, $4686, _errs$3, _typs$15);
                                                var $4697 = $4698;
                                                break;
                                            case 'Fm.Status.wait':
                                                var $4699 = Fm$Defs$report$go$(_defs$1, $4686, _errs$3, _typs$15);
                                                var $4697 = $4699;
                                                break;
                                            case 'Fm.Status.done':
                                                var $4700 = Fm$Defs$report$go$(_defs$1, $4686, _errs$3, _typs$15);
                                                var $4697 = $4700;
                                                break;
                                            case 'Fm.Status.fail':
                                                var $4701 = self.errors;
                                                var self = $4701;
                                                switch (self._) {
                                                    case 'List.nil':
                                                        var $4703 = Fm$Defs$report$go$(_defs$1, $4686, _errs$3, _typs$15);
                                                        var $4702 = $4703;
                                                        break;
                                                    case 'List.cons':
                                                        var $4704 = self.head;
                                                        var $4705 = self.tail;
                                                        var _name_str$19 = Fm$Name$show$($4693);
                                                        var _rel_errs$20 = Fm$Error$relevant$($4701, Bool$false);
                                                        var _rel_msgs$21 = List$mapped$(_rel_errs$20, (_err$21 => {
                                                            var $4707 = String$flatten$(List$cons$(Fm$Error$show$(_err$21, _defs$1), List$cons$((() => {
                                                                var self = Fm$Error$origin$(_err$21);
                                                                switch (self._) {
                                                                    case 'Maybe.none':
                                                                        var $4708 = "";
                                                                        return $4708;
                                                                    case 'Maybe.some':
                                                                        var $4709 = self.value;
                                                                        var self = $4709;
                                                                        switch (self._) {
                                                                            case 'Fm.Origin.new':
                                                                                var $4711 = self.file;
                                                                                var $4712 = self.from;
                                                                                var $4713 = self.upto;
                                                                                var $4714 = String$flatten$(List$cons$("Inside \'", List$cons$($4691, List$cons$("\':\u{a}", List$cons$(Fm$highlight$($4692, $4712, $4713), List$cons$("\u{a}", List$nil))))));
                                                                                var $4710 = $4714;
                                                                                break;
                                                                        };
                                                                        return $4710;
                                                                };
                                                            })(), List$nil)));
                                                            return $4707;
                                                        }));
                                                        var _errs$22 = String$flatten$(List$cons$(_errs$3, List$cons$(String$join$("\u{a}", _rel_msgs$21), List$cons$("\u{a}", List$nil))));
                                                        var $4706 = Fm$Defs$report$go$(_defs$1, $4686, _errs$22, _typs$15);
                                                        var $4702 = $4706;
                                                        break;
                                                };
                                                var $4697 = $4702;
                                                break;
                                        };
                                        var $4690 = $4697;
                                        break;
                                };
                                var $4687 = $4690;
                                break;
                        };
                        return $4687;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Fm$Defs$report$go = x0 => x1 => x2 => x3 => Fm$Defs$report$go$(x0, x1, x2, x3);

    function Fm$Defs$report$(_defs$1, _list$2) {
        var $4715 = Fm$Defs$report$go$(_defs$1, _list$2, "", "");
        return $4715;
    };
    const Fm$Defs$report = x0 => x1 => Fm$Defs$report$(x0, x1);

    function Fm$checker$io$one$(_name$1) {
        var $4716 = Monad$bind$(IO$monad)(Fm$Synth$one$(_name$1, Map$new))((_defs$2 => {
            var $4717 = IO$print$(Fm$Defs$report$(_defs$2, List$cons$(_name$1, List$nil)));
            return $4717;
        }));
        return $4716;
    };
    const Fm$checker$io$one = x0 => Fm$checker$io$one$(x0);

    function Map$keys$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                var $4719 = _list$4;
                var $4718 = $4719;
                break;
            case 'Map.tie':
                var $4720 = self.val;
                var $4721 = self.lft;
                var $4722 = self.rgt;
                var self = $4720;
                switch (self._) {
                    case 'Maybe.none':
                        var $4724 = _list$4;
                        var _list0$8 = $4724;
                        break;
                    case 'Maybe.some':
                        var $4725 = self.value;
                        var $4726 = List$cons$(Bits$reverse$(_key$3), _list$4);
                        var _list0$8 = $4726;
                        break;
                };
                var _list1$9 = Map$keys$go$($4721, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$keys$go$($4722, (_key$3 + '1'), _list1$9);
                var $4723 = _list2$10;
                var $4718 = $4723;
                break;
        };
        return $4718;
    };
    const Map$keys$go = x0 => x1 => x2 => Map$keys$go$(x0, x1, x2);

    function Map$keys$(_xs$2) {
        var $4727 = List$reverse$(Map$keys$go$(_xs$2, Bits$e, List$nil));
        return $4727;
    };
    const Map$keys = x0 => Map$keys$(x0);

    function Fm$Synth$many$(_names$1, _defs$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.nil':
                var $4729 = Monad$pure$(IO$monad)(_defs$2);
                var $4728 = $4729;
                break;
            case 'List.cons':
                var $4730 = self.head;
                var $4731 = self.tail;
                var $4732 = Monad$bind$(IO$monad)(Fm$Synth$one$($4730, _defs$2))((_defs$5 => {
                    var $4733 = Fm$Synth$many$($4731, _defs$5);
                    return $4733;
                }));
                var $4728 = $4732;
                break;
        };
        return $4728;
    };
    const Fm$Synth$many = x0 => x1 => Fm$Synth$many$(x0, x1);

    function Fm$Synth$file$(_file$1, _defs$2) {
        var $4734 = Monad$bind$(IO$monad)(IO$get_file$(_file$1))((_code$3 => {
            var _read$4 = Fm$Defs$read$(_file$1, _code$3, _defs$2);
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $4736 = self.value;
                    var $4737 = Monad$pure$(IO$monad)(Either$left$($4736));
                    var $4735 = $4737;
                    break;
                case 'Either.right':
                    var $4738 = self.value;
                    var _file_defs$6 = $4738;
                    var _file_keys$7 = Map$keys$(_file_defs$6);
                    var _file_nams$8 = List$mapped$(_file_keys$7, Fm$Name$from_bits);
                    var $4739 = Monad$bind$(IO$monad)(Fm$Synth$many$(_file_nams$8, _file_defs$6))((_defs$9 => {
                        var $4740 = Monad$pure$(IO$monad)(Either$right$(Pair$new$(_file_nams$8, _defs$9)));
                        return $4740;
                    }));
                    var $4735 = $4739;
                    break;
            };
            return $4735;
        }));
        return $4734;
    };
    const Fm$Synth$file = x0 => x1 => Fm$Synth$file$(x0, x1);

    function Fm$checker$io$file$(_file$1) {
        var $4741 = Monad$bind$(IO$monad)(Fm$Synth$file$(_file$1, Map$new))((_loaded$2 => {
            var self = _loaded$2;
            switch (self._) {
                case 'Either.left':
                    var $4743 = self.value;
                    var $4744 = Monad$bind$(IO$monad)(IO$print$(String$flatten$(List$cons$("On \'", List$cons$(_file$1, List$cons$("\':", List$nil))))))((_$4 => {
                        var $4745 = IO$print$($4743);
                        return $4745;
                    }));
                    var $4742 = $4744;
                    break;
                case 'Either.right':
                    var $4746 = self.value;
                    var self = $4746;
                    switch (self._) {
                        case 'Pair.new':
                            var $4748 = self.fst;
                            var $4749 = self.snd;
                            var _nams$6 = $4748;
                            var _defs$7 = $4749;
                            var $4750 = IO$print$(Fm$Defs$report$(_defs$7, _nams$6));
                            var $4747 = $4750;
                            break;
                    };
                    var $4742 = $4747;
                    break;
            };
            return $4742;
        }));
        return $4741;
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
                        var $4751 = self.value;
                        var $4752 = $4751;
                        return $4752;
                    case 'IO.ask':
                        var $4753 = self.query;
                        var $4754 = self.param;
                        var $4755 = self.then;
                        var $4756 = IO$purify$($4755(""));
                        return $4756;
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
                var $4758 = self.value;
                var $4759 = $4758;
                var $4757 = $4759;
                break;
            case 'Either.right':
                var $4760 = self.value;
                var $4761 = IO$purify$((() => {
                    var _defs$3 = $4760;
                    var _nams$4 = List$mapped$(Map$keys$(_defs$3), Fm$Name$from_bits);
                    var $4762 = Monad$bind$(IO$monad)(Fm$Synth$many$(_nams$4, _defs$3))((_defs$5 => {
                        var $4763 = Monad$pure$(IO$monad)(Fm$Defs$report$(_defs$5, _nams$4));
                        return $4763;
                    }));
                    return $4762;
                })());
                var $4757 = $4761;
                break;
        };
        return $4757;
    };
    const Fm$checker$code = x0 => Fm$checker$code$(x0);

    function Fm$Term$read$(_code$1) {
        var self = Fm$Parser$term(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4765 = self.idx;
                var $4766 = self.code;
                var $4767 = self.err;
                var $4768 = Maybe$none;
                var $4764 = $4768;
                break;
            case 'Parser.Reply.value':
                var $4769 = self.idx;
                var $4770 = self.code;
                var $4771 = self.val;
                var $4772 = Maybe$some$($4771);
                var $4764 = $4772;
                break;
        };
        return $4764;
    };
    const Fm$Term$read = x0 => Fm$Term$read$(x0);
    const Fm = (() => {
        var __$1 = Fm$to_core$io$one;
        var __$2 = Fm$checker$io$one;
        var __$3 = Fm$checker$io$file;
        var __$4 = Fm$checker$code;
        var __$5 = Fm$Term$read;
        var $4773 = Fm$checker$io$file$("Main.fm");
        return $4773;
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
        'IO.purify': IO$purify,
        'Fm.checker.code': Fm$checker$code,
        'Fm.Term.read': Fm$Term$read,
        'Fm': Fm,
    };
})();