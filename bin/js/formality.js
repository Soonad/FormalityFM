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
        switch (unit) {
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
    var Monad$bind = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $6 = self.bind;
                var $7 = self.pure;
                return $6;
        }
    })());
    var Parser = (_V$1 => null);
    var Monad$new = (_bind$2 => (_pure$3 => ({
        _: 'Monad.new',
        'bind': _bind$2,
        'pure': _pure$3
    })));
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
                var $8 = self.idx;
                var $9 = self.code;
                var $10 = self.err;
                return Parser$Reply$error($8)($9)($10);
            case 'Parser.Reply.value':
                var $11 = self.idx;
                var $12 = self.code;
                var $13 = self.val;
                return _next$4($13)($11)($12);
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
    var Map = (_A$1 => null);
    var Bool$true = true;
    var Bool$false = false;
    var Parser$is_eof = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$1)(_code$2)(Bool$true);
            case 'cons':
                var $14 = self.charCodeAt(0);
                var $15 = self.slice(1);
                return Parser$Reply$value(_idx$1)(_code$2)(Bool$false);
        }
    })()));
    var Monad$pure = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $16 = self.bind;
                var $17 = self.pure;
                return $17;
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
    var Maybe = (_A$1 => null);
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
    var Cmp$eql = ({
        _: 'Cmp.eql'
    });
    var Cmp$ltn = ({
        _: 'Cmp.ltn'
    });
    var Cmp$gtn = ({
        _: 'Cmp.gtn'
    });
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
                                    var $18 = (self - 1n);
                                    return Cmp$ltn;
                            }
                        })();
                    case 'succ':
                        var $19 = (self - 1n);
                        return (() => {
                            var self = _b$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Cmp$gtn;
                                case 'succ':
                                    var $20 = (self - 1n);
                                    return Nat$cmp($19)($20);
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
                var $21 = self.value;
                return (() => {
                    var self = _b$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return _a$1;
                        case 'Maybe.some':
                            var $22 = self.value;
                            return (() => {
                                var self = $21;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $23 = self.idx;
                                        var $24 = self.code;
                                        var $25 = self.err;
                                        return (() => {
                                            var self = $22;
                                            switch (self._) {
                                                case 'Parser.ErrorAt.new':
                                                    var $26 = self.idx;
                                                    var $27 = self.code;
                                                    var $28 = self.err;
                                                    return (() => {
                                                        var self = ($23 > $26);
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
                                    var $29 = self.value;
                                    return (() => {
                                        var self = $29;
                                        switch (self._) {
                                            case 'Parser.ErrorAt.new':
                                                var $30 = self.idx;
                                                var $31 = self.code;
                                                var $32 = self.err;
                                                return Parser$Reply$error($30)($31)($32);
                                        }
                                    })();
                            }
                        })();
                    case 'List.cons':
                        var $33 = self.head;
                        var $34 = self.tail;
                        return (() => {
                            var _parsed$8 = $33(_idx$4)(_code$5);
                            return (() => {
                                var self = _parsed$8;
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $35 = self.idx;
                                        var $36 = self.code;
                                        var $37 = self.err;
                                        return (() => {
                                            var _neo$12 = Maybe$some(Parser$ErrorAt$new($35)($36)($37));
                                            var _err$13 = Parser$ErrorAt$combine(_neo$12)(_err$3);
                                            return Parser$first_of$go($34)(_err$13)(_idx$4)(_code$5)
                                        })();
                                    case 'Parser.Reply.value':
                                        var $38 = self.idx;
                                        var $39 = self.code;
                                        var $40 = self.val;
                                        return Parser$Reply$value($38)($39)($40);
                                }
                            })()
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Maybe$none = ({
        _: 'Maybe.none'
    });
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
                        var $41 = self.idx;
                        var $42 = self.code;
                        var $43 = self.err;
                        return Parser$Reply$value(_idx$4)(_code$5)(_values$3(List$nil));
                    case 'Parser.Reply.value':
                        var $44 = self.idx;
                        var $45 = self.code;
                        var $46 = self.val;
                        return Parser$many$go(_parse$2)((_xs$9 => _values$3(List$cons($46)(_xs$9))))($44)($45);
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$many = (_parser$2 => Parser$many$go(_parser$2)((_x$3 => _x$3)));
    var Unit$new = 1;
    var String$cons = (_head$1 => (_tail$2 => (String.fromCharCode(_head$1) + _tail$2)));
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
                        var $47 = self.head;
                        var $48 = self.tail;
                        return String$flatten$go($48)((_res$2 + $47));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var String$flatten = (_xs$1 => String$flatten$go(_xs$1)(""));
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
    var Word$cmp$go = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => _c$4);
            case 'Word.0':
                var $49 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $50 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($50)(_c$4));
                        case 'Word.1':
                            var $51 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($51)(Cmp$ltn));
                    }
                })()($49));
            case 'Word.1':
                var $52 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $53 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($53)(Cmp$gtn));
                        case 'Word.1':
                            var $54 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($54)(_c$4));
                    }
                })()($52));
        }
    })()(_b$3))));
    var Word$cmp = (_a$2 => (_b$3 => Word$cmp$go(_a$2)(_b$3)(Cmp$eql)));
    var Word$eql = (_a$2 => (_b$3 => Cmp$as_eql(Word$cmp(_a$2)(_b$3))));
    var Nat$succ = (_pred$1 => 1n + _pred$1);
    var Nat$zero = 0n;
    var U16$eql = a0 => a1 => (a0 === a1);
    var String$nil = '';
    var Parser$text$go = (_text$1 => (_idx$2 => (_code$3 => (() => {
        var self = _text$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$2)(_code$3)(Unit$new);
            case 'cons':
                var $55 = self.charCodeAt(0);
                var $56 = self.slice(1);
                return (() => {
                    var self = _code$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return (() => {
                                var _error$6 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found end of file.")(List$nil))));
                                return Parser$Reply$error(_idx$2)(_code$3)(_error$6)
                            })();
                        case 'cons':
                            var $57 = self.charCodeAt(0);
                            var $58 = self.slice(1);
                            return (() => {
                                var self = ($55 === $57);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Parser$text($56)(Nat$succ(_idx$2))($58);
                                    case 'false':
                                        return (() => {
                                            var _error$8 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found \'")(List$cons(String$cons($57)(String$nil))(List$cons("\'.")(List$nil))))));
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
                var $59 = self.idx;
                var $60 = self.code;
                var $61 = self.err;
                return Parser$Reply$error(_idx$2)(_code$3)($61);
            case 'Parser.Reply.value':
                var $62 = self.idx;
                var $63 = self.code;
                var $64 = self.val;
                return Parser$Reply$value($62)($63)($64);
        }
    })())));
    var Parser$char_if = (_fun$1 => (_idx$2 => (_code$3 => (() => {
        var self = _code$3;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$2)(_code$3)("No parse.");
            case 'cons':
                var $65 = self.charCodeAt(0);
                var $66 = self.slice(1);
                return (() => {
                    var self = _fun$1($65);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value(Nat$succ(_idx$2))($66)($65);
                        case 'false':
                            return Parser$Reply$error(_idx$2)(_code$3)("No parse.");
                    }
                })();
        }
    })())));
    var Bool$not = a0 => (!a0);
    var Fm$Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$cons(Monad$bind(Parser$monad)(Parser$text("//"))((_$1 => Monad$bind(Parser$monad)(Parser$many(Parser$char_if((_chr$2 => (!(_chr$2 === 10))))))((_$2 => Parser$text("\u{a}"))))))(List$nil)))));
    var Bool$and = a0 => a1 => (a0 && a1);
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
    var Word$lte = (_a$2 => (_b$3 => Cmp$as_lte(Word$cmp(_a$2)(_b$3))));
    var U16$lte = a0 => a1 => (a0 <= a1);
    var U16$btw = (_a$1 => (_b$2 => (_c$3 => ((_a$1 <= _b$2) && (_b$2 <= _c$3)))));
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
                var $67 = self.charCodeAt(0);
                var $68 = self.slice(1);
                return (() => {
                    var self = Fm$Name$is_letter($67);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value(Nat$succ(_idx$1))($68)($67);
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
                var $69 = self.head;
                var $70 = self.tail;
                return _cons$5($69)(List$fold($70)(_nil$4)(_cons$5));
        }
    })())));
    var Fm$Parser$name = Monad$bind(Parser$monad)(Parser$many(Fm$Parser$letter))((_chrs$1 => Monad$pure(Parser$monad)(List$fold(_chrs$1)(String$nil)(String$cons))));
    var Parser$many1 = (_parser$2 => Monad$bind(Parser$monad)(_parser$2)((_head$3 => Monad$bind(Parser$monad)(Parser$many(_parser$2))((_tail$4 => Monad$pure(Parser$monad)(List$cons(_head$3)(_tail$4)))))));
    var Fm$Parser$spaces_text = (_text$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Pair = (_A$1 => (_B$2 => null));
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
                            var $71 = self.idx;
                            var $72 = self.code;
                            var $73 = self.err;
                            return (() => {
                                var _reply$11 = _parse$3(_idx$5)(_code$6);
                                return (() => {
                                    var self = _reply$11;
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $74 = self.idx;
                                            var $75 = self.code;
                                            var $76 = self.err;
                                            return Parser$Reply$error($74)($75)($76);
                                        case 'Parser.Reply.value':
                                            var $77 = self.idx;
                                            var $78 = self.code;
                                            var $79 = self.val;
                                            return Parser$until$go(_until$2)(_parse$3)((_xs$15 => _values$4(List$cons($79)(_xs$15))))($77)($78);
                                    }
                                })()
                            })();
                        case 'Parser.Reply.value':
                            var $80 = self.idx;
                            var $81 = self.code;
                            var $82 = self.val;
                            return Parser$Reply$value($80)($81)(_values$4(List$nil));
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$until = (_until$2 => (_parse$3 => Parser$until$go(_until$2)(_parse$3)((_x$4 => _x$4))));
    var Parser$until1 = (_cond$2 => (_parser$3 => Monad$bind(Parser$monad)(_parser$3)((_head$4 => Monad$bind(Parser$monad)(Parser$until(_cond$2)(_parser$3))((_tail$5 => Monad$pure(Parser$monad)(List$cons(_head$4)(_tail$5))))))));
    var Parser$maybe = (_parse$2 => (_idx$3 => (_code$4 => (() => {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $83 = self.idx;
                var $84 = self.code;
                var $85 = self.err;
                return Parser$Reply$value(_idx$3)(_code$4)(Maybe$none);
            case 'Parser.Reply.value':
                var $86 = self.idx;
                var $87 = self.code;
                var $88 = self.val;
                return Parser$Reply$value($86)($87)(Maybe$some($88));
        }
    })())));
    var Fm$Parser$item = (_parser$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$3 => Monad$bind(Parser$monad)(_parser$2)((_value$4 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$spaces_text(",")))((_$5 => Monad$pure(Parser$monad)(_value$4))))))));
    var Fm$Term$typ = ({
        _: 'Fm.Term.typ'
    });
    var Fm$Parser$type = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("Type"))((_$1 => Monad$pure(Parser$monad)(Fm$Term$typ)));
    var Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$nil))));
    var Parser$spaces_text = (_text$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Fm$Term$all = (_eras$1 => (_self$2 => (_name$3 => (_xtyp$4 => (_body$5 => ({
        _: 'Fm.Term.all',
        'eras': _eras$1,
        'self': _self$2,
        'name': _name$3,
        'xtyp': _xtyp$4,
        'body': _body$5
    }))))));
    var Fm$Parser$forall = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_self$2 => Monad$bind(Parser$monad)(Fm$Parser$binder)((_bind$3 => Monad$bind(Parser$monad)(Parser$maybe(Parser$spaces_text("->")))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$5 => (() => {
        var _term$6 = List$fold(_bind$3)(_body$5)((_x$6 => (_t$7 => (() => {
            var self = _x$6;
            switch (self._) {
                case 'Fm.Binder.new':
                    var $89 = self.eras;
                    var $90 = self.name;
                    var $91 = self.term;
                    return Fm$Term$all($89)("")($90)($91)((_s$11 => (_x$12 => _t$7)));
            }
        })())));
        return Monad$pure(Parser$monad)((() => {
            var self = _term$6;
            switch (self._) {
                case 'Fm.Term.var':
                    var $92 = self.name;
                    var $93 = self.indx;
                    return _term$6;
                case 'Fm.Term.ref':
                    var $94 = self.name;
                    return _term$6;
                case 'Fm.Term.typ':
                    return _term$6;
                case 'Fm.Term.all':
                    var $95 = self.eras;
                    var $96 = self.self;
                    var $97 = self.name;
                    var $98 = self.xtyp;
                    var $99 = self.body;
                    return Fm$Term$all($95)(_self$2)($97)($98)($99);
                case 'Fm.Term.lam':
                    var $100 = self.name;
                    var $101 = self.body;
                    return _term$6;
                case 'Fm.Term.app':
                    var $102 = self.func;
                    var $103 = self.argm;
                    return _term$6;
                case 'Fm.Term.let':
                    var $104 = self.name;
                    var $105 = self.expr;
                    var $106 = self.body;
                    return _term$6;
                case 'Fm.Term.def':
                    var $107 = self.name;
                    var $108 = self.expr;
                    var $109 = self.body;
                    return _term$6;
                case 'Fm.Term.ann':
                    var $110 = self.done;
                    var $111 = self.term;
                    var $112 = self.type;
                    return _term$6;
                case 'Fm.Term.gol':
                    var $113 = self.name;
                    var $114 = self.dref;
                    var $115 = self.verb;
                    return _term$6;
                case 'Fm.Term.hol':
                    var $116 = self.path;
                    return _term$6;
                case 'Fm.Term.nat':
                    var $117 = self.natx;
                    return _term$6;
                case 'Fm.Term.chr':
                    var $118 = self.chrx;
                    return _term$6;
                case 'Fm.Term.str':
                    var $119 = self.strx;
                    return _term$6;
                case 'Fm.Term.cse':
                    var $120 = self.path;
                    var $121 = self.expr;
                    var $122 = self.name;
                    var $123 = self.with;
                    var $124 = self.cses;
                    var $125 = self.moti;
                    return _term$6;
            }
        })())
    })()))))))))));
    var Fm$Parser$name1 = Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$letter))((_chrs$1 => Monad$pure(Parser$monad)(List$fold(_chrs$1)(String$nil)(String$cons))));
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
                var $126 = self.head;
                var $127 = self.tail;
                return Fm$Term$lam($126)((_x$5 => Fm$Parser$make_lambda($127)(_body$2)));
        }
    })()));
    var Fm$Parser$lambda = Monad$bind(Parser$monad)(Parser$spaces_text("("))((_$1 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(")"))(Fm$Parser$item(Fm$Parser$name1)))((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$3 => Monad$pure(Parser$monad)(Fm$Parser$make_lambda(_name$2)(_body$3))))))));
    var Fm$Parser$lambda$erased = Monad$bind(Parser$monad)(Parser$spaces_text("<"))((_$1 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(">"))(Fm$Parser$item(Fm$Parser$name1)))((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$3 => Monad$pure(Parser$monad)(Fm$Parser$make_lambda(_name$2)(_body$3))))))));
    var Fm$Parser$parenthesis = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("("))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(")"))((_$3 => Monad$pure(Parser$monad)(_term$2)))))));
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
    var Bits$nil = '';
    var Fm$Term$let = (_name$1 => (_expr$2 => (_body$3 => ({
        _: 'Fm.Term.let',
        'name': _name$1,
        'expr': _expr$2,
        'body': _body$3
    }))));
    var Fm$Parser$letforin = Monad$bind(Parser$monad)(Parser$spaces_text("let "))((_$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Parser$spaces_text("="))((_$4 => Monad$bind(Parser$monad)(Parser$spaces_text("for "))((_$5 => Monad$bind(Parser$monad)(Parser$spaces)((_$6 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$7 => Monad$bind(Parser$monad)(Parser$spaces_text("in"))((_$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$9 => Monad$bind(Parser$monad)(Parser$spaces_text(":"))((_$10 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$11 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$12 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$13 => (() => {
        var _term$14 = Fm$Term$ref("List.for");
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$hol(Bits$nil));
        var _term$16 = Fm$Term$app(_term$15)(_list$9);
        var _term$17 = Fm$Term$app(_term$16)(Fm$Term$hol(Bits$nil));
        var _term$18 = Fm$Term$app(_term$17)(Fm$Term$ref(_name$3));
        var _lamb$19 = Fm$Term$lam(_elem$7)((_i$19 => Fm$Term$lam(_name$3)((_x$20 => _loop$11))));
        var _term$20 = Fm$Term$app(_term$18)(_lamb$19);
        var _term$21 = Fm$Term$let(_name$3)(_term$20)((_x$21 => _body$13));
        return Monad$pure(Parser$monad)(_term$21)
    })()))))))))))))))))))))))))));
    var Fm$Parser$let = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("let "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$spaces_text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$pure(Parser$monad)(Fm$Term$let(_name$3)(_expr$5)((_x$8 => _body$7)))))))))))))))));
    var Fm$Term$def = (_name$1 => (_expr$2 => (_body$3 => ({
        _: 'Fm.Term.def',
        'name': _name$1,
        'expr': _expr$2,
        'body': _body$3
    }))));
    var Fm$Parser$def = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("def "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$spaces_text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$pure(Parser$monad)(Fm$Term$def(_name$3)(_expr$5)((_x$8 => _body$7)))))))))))))))));
    var Fm$Parser$if = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("if "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$term)((_cond$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("then"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_tcse$4 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("else"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_fcse$6 => (() => {
        var _term$7 = _cond$2;
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$lam("")((_x$8 => Fm$Term$hol(Bits$nil))));
        var _term$9 = Fm$Term$app(_term$8)(_tcse$4);
        var _term$10 = Fm$Term$app(_term$9)(_fcse$6);
        return Monad$pure(Parser$monad)(_term$10)
    })()))))))))))));
    var List$mapped = (_as$2 => (_f$4 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $128 = self.head;
                var $129 = self.tail;
                return List$cons(_f$4($128))(List$mapped($129)(_f$4));
        }
    })()));
    var Pair$new = (_fst$3 => (_snd$4 => ({
        _: 'Pair.new',
        'fst': _fst$3,
        'snd': _snd$4
    })));
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
                        var $130 = (self - 1n);
                        return Nat$apply($130)(_f$3)(_f$3(_x$4));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var U16$new = (_value$1 => word_to_u16(_value$1));
    var Word = (_size$1 => null);
    var Word$nil = ({
        _: 'Word.nil'
    });
    var Word$1 = (_pred$2 => ({
        _: 'Word.1',
        'pred': _pred$2
    }));
    var Word$0 = (_pred$2 => ({
        _: 'Word.0',
        'pred': _pred$2
    }));
    var Word$inc = (_word$2 => (() => {
        var self = _word$2;
        switch (self._) {
            case 'Word.nil':
                return Word$nil;
            case 'Word.0':
                var $131 = self.pred;
                return Word$1($131);
            case 'Word.1':
                var $132 = self.pred;
                return Word$0(Word$inc($132));
        }
    })());
    var U16$inc = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $133 = u16_to_word(self);
                return U16$new(Word$inc($133));
        }
    })());
    var Word$zero = (_size$1 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $134 = (self - 1n);
                return Word$0(Word$zero($134));
        }
    })());
    var U16$zero = U16$new(Word$zero(16n));
    var Nat$to_u16 = a0 => (Number(a0));
    var Fm$backslash = 92;
    var Fm$escapes = List$cons(Pair$new("\\b")(8))(List$cons(Pair$new("\\f")(12))(List$cons(Pair$new("\\n")(10))(List$cons(Pair$new("\\r")(13))(List$cons(Pair$new("\\t")(9))(List$cons(Pair$new("\\v")(11))(List$cons(Pair$new(String$cons(Fm$backslash)(String$cons(Fm$backslash)(String$nil)))(Fm$backslash))(List$cons(Pair$new("\\\"")(34))(List$cons(Pair$new("\\0")(0))(List$cons(Pair$new("\\\'")(39))(List$nil))))))))));
    var Parser$one = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Unexpected end of file.");
            case 'cons':
                var $135 = self.charCodeAt(0);
                var $136 = self.slice(1);
                return Parser$Reply$value(Nat$succ(_idx$1))($136)($135);
        }
    })()));
    var Fm$Parser$char$single = Parser$first_of(List$cons(Parser$first_of(List$mapped(Fm$escapes)((_esc$1 => (() => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $137 = self.fst;
                var $138 = self.snd;
                return Monad$bind(Parser$monad)(Parser$text($137))((_$4 => Monad$pure(Parser$monad)($138)));
        }
    })()))))(List$cons(Parser$one)(List$nil)));
    var Fm$Term$chr = (_chrx$1 => ({
        _: 'Fm.Term.chr',
        'chrx': _chrx$1
    }));
    var Fm$Parser$char = Monad$bind(Parser$monad)(Parser$spaces_text("\'"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$char$single)((_chrx$2 => Monad$bind(Parser$monad)(Parser$text("\'"))((_$3 => Monad$pure(Parser$monad)(Fm$Term$chr(_chrx$2))))))));
    var Fm$Term$str = (_strx$1 => ({
        _: 'Fm.Term.str',
        'strx': _strx$1
    }));
    var Fm$Parser$string = (() => {
        var _quot$1 = String$cons(34)(String$nil);
        return Monad$bind(Parser$monad)(Parser$spaces_text(_quot$1))((_$2 => Monad$bind(Parser$monad)(Parser$until(Parser$text(_quot$1))(Fm$Parser$char$single))((_chrs$3 => (() => {
            var _strx$4 = List$fold(_chrs$3)(String$nil)(String$cons);
            return Monad$pure(Parser$monad)(Fm$Term$str(_strx$4))
        })()))))
    })();
    var Fm$Parser$pair = Monad$bind(Parser$monad)(Parser$spaces_text("{"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val0$2 => Monad$bind(Parser$monad)(Parser$spaces_text(","))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$4 => Monad$bind(Parser$monad)(Parser$spaces_text("}"))((_$5 => (() => {
        var _term$6 = Fm$Term$ref("Pair.new");
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$nil));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$hol(Bits$nil));
        var _term$9 = Fm$Term$app(_term$8)(_val0$2);
        var _term$10 = Fm$Term$app(_term$9)(_val1$4);
        return Monad$pure(Parser$monad)(_term$10)
    })()))))))))));
    var Fm$Name$read = (_str$1 => _str$1);
    var Fm$Parser$list = Monad$bind(Parser$monad)(Parser$spaces_text("["))((_$1 => Monad$bind(Parser$monad)(Parser$until(Parser$spaces_text("]"))(Fm$Parser$item(Fm$Parser$term)))((_vals$2 => Monad$pure(Parser$monad)(List$fold(_vals$2)(Fm$Term$app(Fm$Term$ref(Fm$Name$read("List.nil")))(Fm$Term$hol(Bits$nil)))((_x$3 => (_xs$4 => (() => {
        var _term$5 = Fm$Term$ref(Fm$Name$read("List.cons"));
        var _term$6 = Fm$Term$app(_term$5)(Fm$Term$hol(Bits$nil));
        var _term$7 = Fm$Term$app(_term$6)(_x$3);
        var _term$8 = Fm$Term$app(_term$7)(_xs$4);
        return _term$8
    })()))))))));
    var Fm$Parser$forin = Monad$bind(Parser$monad)(Parser$spaces_text("for "))((_$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$3 => Monad$bind(Parser$monad)(Parser$spaces_text("in"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$5 => Monad$bind(Parser$monad)(Parser$spaces_text("with"))((_$6 => Monad$bind(Parser$monad)(Parser$spaces)((_$7 => Monad$bind(Parser$monad)(Parser$spaces)((_$8 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$9 => Monad$bind(Parser$monad)(Parser$spaces_text(":"))((_$10 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$11 => (() => {
        var _term$12 = Fm$Term$ref("List.for");
        var _term$13 = Fm$Term$app(_term$12)(Fm$Term$hol(Bits$nil));
        var _term$14 = Fm$Term$app(_term$13)(_list$5);
        var _term$15 = Fm$Term$app(_term$14)(Fm$Term$hol(Bits$nil));
        var _term$16 = Fm$Term$app(_term$15)(Fm$Term$ref(_name$9));
        var _lamb$17 = Fm$Term$lam(_elem$3)((_i$17 => Fm$Term$lam(_name$9)((_x$18 => _loop$11))));
        var _term$18 = Fm$Term$app(_term$16)(_lamb$17);
        var _term$19 = Fm$Term$let(_name$9)(_term$18)((_x$19 => Fm$Term$ref(_name$9)));
        return Monad$pure(Parser$monad)(_term$19)
    })()))))))))))))))))))))));
    var Fm$Parser$do$statements = (_monad_name$1 => Parser$first_of(List$cons(Monad$bind(Parser$monad)(Parser$spaces_text("var "))((_$2 => Monad$bind(Parser$monad)(Parser$spaces)((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Parser$spaces_text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => (() => {
        var _term$9 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$11 = Fm$Term$app(_term$10)(Fm$Term$hol(Bits$nil));
        var _term$12 = Fm$Term$app(_term$11)(Fm$Term$hol(Bits$nil));
        var _term$13 = Fm$Term$app(_term$12)(_expr$6);
        var _term$14 = Fm$Term$app(_term$13)(Fm$Term$lam(_name$4)((_x$14 => _body$8)));
        return Monad$pure(Parser$monad)(_term$14)
    })())))))))))))))))(List$cons(Monad$bind(Parser$monad)(Parser$spaces_text("let "))((_$2 => Monad$bind(Parser$monad)(Parser$spaces)((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Parser$spaces_text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$pure(Parser$monad)(Fm$Term$let(_name$4)(_expr$6)((_x$9 => _body$8))))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Parser$spaces_text("return "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$3 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$4 => (() => {
        var _term$5 = Fm$Term$app(Fm$Term$ref("Monad.pure"))(Fm$Term$ref(_monad_name$1));
        var _term$6 = Fm$Term$app(_term$5)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$nil));
        var _term$8 = Fm$Term$app(_term$7)(_expr$3);
        return Monad$pure(Parser$monad)(_term$8)
    })())))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$2 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$4 => (() => {
        var _term$5 = Fm$Term$app(Fm$Term$ref("Monad.bind"))(Fm$Term$ref(_monad_name$1));
        var _term$6 = Fm$Term$app(_term$5)(Fm$Term$ref((_monad_name$1 + ".monad")));
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$nil));
        var _term$8 = Fm$Term$app(_term$7)(Fm$Term$hol(Bits$nil));
        var _term$9 = Fm$Term$app(_term$8)(_expr$2);
        var _term$10 = Fm$Term$app(_term$9)(Fm$Term$lam("")((_x$10 => _body$4)));
        return Monad$pure(Parser$monad)(_term$10)
    })())))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$2 => Monad$bind(Parser$monad)(Parser$spaces_text(";"))((_$3 => Monad$pure(Parser$monad)(_expr$2))))))(List$nil)))))));
    var Fm$Parser$do = Monad$bind(Parser$monad)(Parser$spaces_text("do "))((_$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Parser$spaces_text("{"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_name$3))((_term$5 => Monad$bind(Parser$monad)(Parser$spaces_text("}"))((_$6 => Monad$pure(Parser$monad)(_term$5)))))))))))));
    var Fm$Def$new = (_name$1 => (_term$2 => (_type$3 => (_stat$4 => ({
        _: 'Fm.Def.new',
        'name': _name$1,
        'term': _term$2,
        'type': _type$3,
        'stat': _stat$4
    })))));
    var Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    var Fm$Parser$case$with = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("with"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$5 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("="))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$7 => Monad$pure(Parser$monad)(Fm$Def$new(_name$3)(_term$7)(_type$5)(Fm$Status$init))))))))))))))));
    var Fm$Parser$case$case = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$4 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$spaces_text(",")))((_$5 => Monad$pure(Parser$monad)(Pair$new(_name$2)(_term$4))))))))))));
    var Map$new = ({
        _: 'Map.new'
    });
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
                            var $139 = self.val;
                            var $140 = self.lft;
                            var $141 = self.rgt;
                            return Map$tie(Maybe$some(_val$3))($140)($141);
                    }
                })();
            case '0':
                var $142 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$set($142)(_val$3)(Map$new))(Map$new);
                        case 'Map.tie':
                            var $143 = self.val;
                            var $144 = self.lft;
                            var $145 = self.rgt;
                            return Map$tie($143)(Map$set($142)(_val$3)($144))($145);
                    }
                })();
            case '1':
                var $146 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$new)(Map$set($146)(_val$3)(Map$new));
                        case 'Map.tie':
                            var $147 = self.val;
                            var $148 = self.lft;
                            var $149 = self.rgt;
                            return Map$tie($147)($148)(Map$set($146)(_val$3)($149));
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
                var $150 = self.head;
                var $151 = self.tail;
                return (() => {
                    var self = $150;
                    switch (self._) {
                        case 'Pair.new':
                            var $152 = self.fst;
                            var $153 = self.snd;
                            return Map$set(_f$3($152))($153)(Map$from_list(_f$3)($151));
                    }
                })();
        }
    })()));
    var Word$subber = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => Word$nil);
            case 'Word.0':
                var $154 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $155 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($155)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($155)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $156 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($156)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($156)(Bool$true));
                                }
                            })());
                    }
                })()($154));
            case 'Word.1':
                var $157 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $158 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($158)(Bool$false));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($158)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $159 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($159)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($159)(Bool$false));
                                }
                            })());
                    }
                })()($157));
        }
    })()(_b$3))));
    var Word$sub = (_a$2 => (_b$3 => Word$subber(_a$2)(_b$3)(Bool$false)));
    var U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));
    var Word$adder = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => Word$nil);
            case 'Word.0':
                var $160 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $161 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($161)(Bool$false));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($161)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $162 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($162)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($162)(Bool$false));
                                }
                            })());
                    }
                })()($160));
            case 'Word.1':
                var $163 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $164 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($164)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($164)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $165 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($165)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($165)(Bool$true));
                                }
                            })());
                    }
                })()($163));
        }
    })()(_b$3))));
    var Word$add = (_a$2 => (_b$3 => Word$adder(_a$2)(_b$3)(Bool$false)));
    var U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);
    var Bits$0 = (_pred$1 => _pred$1 + '0');
    var Bits$1 = (_pred$1 => _pred$1 + '1');
    var Word$to_bits = (_a$2 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return Bits$nil;
            case 'Word.0':
                var $166 = self.pred;
                return Bits$0(Word$to_bits($166));
            case 'Word.1':
                var $167 = self.pred;
                return Bits$1(Word$to_bits($167));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $168 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.nil':
                            return Word$0(Word$trim($168)(Word$nil));
                        case 'Word.0':
                            var $169 = self.pred;
                            return Word$0(Word$trim($168)($169));
                        case 'Word.1':
                            var $170 = self.pred;
                            return Word$1(Word$trim($168)($170));
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
                        var $171 = self.slice(0, -1);
                        return Bits$reverse$tco($171)(Bits$0(_r$2));
                    case '1':
                        var $172 = self.slice(0, -1);
                        return Bits$reverse$tco($172)(Bits$1(_r$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$reverse = (_a$1 => Bits$reverse$tco(_a$1)(Bits$nil));
    var Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));
    var Fm$Term$cse = (_path$1 => (_expr$2 => (_name$3 => (_with$4 => (_cses$5 => (_moti$6 => ({
        _: 'Fm.Term.cse',
        'path': _path$1,
        'expr': _expr$2,
        'name': _name$3,
        'with': _with$4,
        'cses': _cses$5,
        'moti': _moti$6
    })))))));
    var Fm$Parser$case = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("case "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$3 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$spaces_text("as"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$5 => Fm$Parser$name1))))))((_name$4 => (() => {
        var _name$5 = (() => {
            var self = _name$4;
            switch (self._) {
                case 'Maybe.none':
                    return (() => {
                        var self = _expr$3;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $173 = self.name;
                                var $174 = self.indx;
                                return $173;
                            case 'Fm.Term.ref':
                                var $175 = self.name;
                                return $175;
                            case 'Fm.Term.typ':
                                return Fm$Name$read("self");
                            case 'Fm.Term.all':
                                var $176 = self.eras;
                                var $177 = self.self;
                                var $178 = self.name;
                                var $179 = self.xtyp;
                                var $180 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.lam':
                                var $181 = self.name;
                                var $182 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.app':
                                var $183 = self.func;
                                var $184 = self.argm;
                                return Fm$Name$read("self");
                            case 'Fm.Term.let':
                                var $185 = self.name;
                                var $186 = self.expr;
                                var $187 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.def':
                                var $188 = self.name;
                                var $189 = self.expr;
                                var $190 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ann':
                                var $191 = self.done;
                                var $192 = self.term;
                                var $193 = self.type;
                                return Fm$Name$read("self");
                            case 'Fm.Term.gol':
                                var $194 = self.name;
                                var $195 = self.dref;
                                var $196 = self.verb;
                                return Fm$Name$read("self");
                            case 'Fm.Term.hol':
                                var $197 = self.path;
                                return Fm$Name$read("self");
                            case 'Fm.Term.nat':
                                var $198 = self.natx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.chr':
                                var $199 = self.chrx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.str':
                                var $200 = self.strx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.cse':
                                var $201 = self.path;
                                var $202 = self.expr;
                                var $203 = self.name;
                                var $204 = self.with;
                                var $205 = self.cses;
                                var $206 = self.moti;
                                return Fm$Name$read("self");
                        }
                    })();
                case 'Maybe.some':
                    var $207 = self.value;
                    return $207;
            }
        })();
        return Monad$bind(Parser$monad)(Parser$many(Fm$Parser$case$with))((_with$6 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("{"))((_$7 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$spaces_text("}"))(Fm$Parser$case$case))((_cses$8 => (() => {
            var _cses$9 = Map$from_list(Fm$Name$to_bits)(_cses$8);
            return Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$10 => Fm$Parser$term))))((_moti$10 => (() => {
                var _moti$11 = (() => {
                    var self = _moti$10;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$hol(Bits$nil);
                        case 'Maybe.some':
                            var $208 = self.value;
                            return $208;
                    }
                })();
                return Monad$pure(Parser$monad)(Fm$Term$cse(Bits$nil)(_expr$3)(_name$5)(_with$6)(_cses$9)(_moti$11))
            })()))
        })()))))))
    })()))))))));
    var Parser$digit = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Not a digit.");
            case 'cons':
                var $209 = self.charCodeAt(0);
                var $210 = self.slice(1);
                return (() => {
                    var _sidx$5 = Nat$succ(_idx$1);
                    return (() => {
                        var self = ($209 === 48);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Parser$Reply$value(_sidx$5)($210)(0n);
                            case 'false':
                                return (() => {
                                    var self = ($209 === 49);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return Parser$Reply$value(_sidx$5)($210)(1n);
                                        case 'false':
                                            return (() => {
                                                var self = ($209 === 50);
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return Parser$Reply$value(_sidx$5)($210)(2n);
                                                    case 'false':
                                                        return (() => {
                                                            var self = ($209 === 51);
                                                            switch (self ? 'true' : 'false') {
                                                                case 'true':
                                                                    return Parser$Reply$value(_sidx$5)($210)(3n);
                                                                case 'false':
                                                                    return (() => {
                                                                        var self = ($209 === 52);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return Parser$Reply$value(_sidx$5)($210)(4n);
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var self = ($209 === 53);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Parser$Reply$value(_sidx$5)($210)(5n);
                                                                                        case 'false':
                                                                                            return (() => {
                                                                                                var self = ($209 === 54);
                                                                                                switch (self ? 'true' : 'false') {
                                                                                                    case 'true':
                                                                                                        return Parser$Reply$value(_sidx$5)($210)(6n);
                                                                                                    case 'false':
                                                                                                        return (() => {
                                                                                                            var self = ($209 === 55);
                                                                                                            switch (self ? 'true' : 'false') {
                                                                                                                case 'true':
                                                                                                                    return Parser$Reply$value(_sidx$5)($210)(7n);
                                                                                                                case 'false':
                                                                                                                    return (() => {
                                                                                                                        var self = ($209 === 56);
                                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                                            case 'true':
                                                                                                                                return Parser$Reply$value(_sidx$5)($210)(8n);
                                                                                                                            case 'false':
                                                                                                                                return (() => {
                                                                                                                                    var self = ($209 === 57);
                                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                                        case 'true':
                                                                                                                                            return Parser$Reply$value(_sidx$5)($210)(9n);
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
                        var $211 = self.head;
                        var $212 = self.tail;
                        return Nat$from_base$go(_b$1)($212)((_b$1 * _p$3))((($211 * _p$3) + _res$4));
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
                        var $213 = self.head;
                        var $214 = self.tail;
                        return List$reverse$go($214)(List$cons($213)(_res$3));
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
                var $215 = self.slice(0, -1);
                return $215;
            case '1':
                var $216 = self.slice(0, -1);
                return $216;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$1(Bits$nil);
            case '0':
                var $217 = self.slice(0, -1);
                return Bits$1($217);
            case '1':
                var $218 = self.slice(0, -1);
                return Bits$0(Bits$inc($218));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $219 = self.value;
                return Bool$true;
        }
    })());
    var Fm$Term$gol = (_name$1 => (_dref$2 => (_verb$3 => ({
        _: 'Fm.Term.gol',
        'name': _name$1,
        'dref': _dref$2,
        'verb': _verb$3
    }))));
    var Fm$Parser$goal = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("?"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$2 => Monad$bind(Parser$monad)(Parser$many(Monad$bind(Parser$monad)(Fm$Parser$spaces_text("-"))((_$3 => Monad$bind(Parser$monad)(Parser$nat)((_nat$4 => (() => {
        var _bits$5 = Bits$reverse(Bits$tail(Bits$reverse((nat_to_bits(_nat$4)))));
        return Monad$pure(Parser$monad)(_bits$5)
    })()))))))((_dref$3 => Monad$bind(Parser$monad)(Monad$bind(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$4 => Monad$pure(Parser$monad)(Maybe$to_bool(_verb$4)))))((_verb$4 => Monad$pure(Parser$monad)(Fm$Term$gol(_name$2)(_dref$3)(_verb$4))))))))));
    var Fm$Parser$hole = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("_"))((_$1 => Monad$pure(Parser$monad)(Fm$Term$hol(Bits$nil))));
    var Fm$Term$nat = (_natx$1 => ({
        _: 'Fm.Term.nat',
        'natx': _natx$1
    }));
    var Fm$Parser$nat = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$nat)((_natx$2 => Monad$pure(Parser$monad)(Fm$Term$nat(_natx$2))))));
    var String$eql = a0 => a1 => (a0 === a1);
    var Parser$fail = (_error$2 => (_idx$3 => (_code$4 => Parser$Reply$error(_idx$3)(_code$4)(_error$2))));
    var Fm$Parser$reference = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => (() => {
        var self = (_name$2 === "case");
        switch (self ? 'true' : 'false') {
            case 'true':
                return Parser$fail("Reserved keyword.");
            case 'false':
                return Monad$pure(Parser$monad)(Fm$Term$ref(_name$2));
        }
    })()))));
    var List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));
    var Fm$Parser$application = (_func$1 => Monad$bind(Parser$monad)(Parser$text("("))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(")"))(Fm$Parser$item(Fm$Parser$term)))((_args$3 => Monad$pure(Parser$monad)((list_for(_args$3)(_func$1)((_x$4 => (_f$5 => Fm$Term$app(_f$5)(_x$4)))))))))));
    var Fm$Parser$application$erased = (_func$1 => Monad$bind(Parser$monad)(Parser$text("<"))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(">"))(Fm$Parser$item(Fm$Parser$term)))((_args$3 => Monad$pure(Parser$monad)((list_for(_args$3)(_func$1)((_x$4 => (_f$5 => Fm$Term$app(_f$5)(_x$4)))))))))));
    var Fm$Parser$arrow = (_xtyp$1 => Monad$bind(Parser$monad)(Parser$spaces_text("->"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$3 => Monad$pure(Parser$monad)(Fm$Term$all(Bool$false)("")("")(_xtyp$1)((_s$4 => (_x$5 => _body$3)))))))));
    var Fm$Parser$equality = (_val0$1 => Monad$bind(Parser$monad)(Parser$spaces_text("=="))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$3 => (() => {
        var _term$4 = Fm$Term$ref("Equal");
        var _term$5 = Fm$Term$app(_term$4)(Fm$Term$hol(Bits$nil));
        var _term$6 = Fm$Term$app(_term$5)(_val0$1);
        var _term$7 = Fm$Term$app(_term$6)(_val1$3);
        return Monad$pure(Parser$monad)(_term$7)
    })())))));
    var Fm$Term$ann = (_done$1 => (_term$2 => (_type$3 => ({
        _: 'Fm.Term.ann',
        'done': _done$1,
        'term': _term$2,
        'type': _type$3
    }))));
    var Fm$Parser$annotation = (_term$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("::"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$3 => Monad$pure(Parser$monad)(Fm$Term$ann(Bool$false)(_term$1)(_type$3)))))));
    var Fm$Parser$suffix = _term$1 => _idx$2 => _code$3 => {
        var Fm$Parser$suffix = _term$1 => _idx$2 => _code$3 => ({
            ctr: 'TCO',
            arg: [_term$1, _idx$2, _code$3]
        });
        var arg = [_term$1, _idx$2, _code$3];
        while (true) {
            let [_term$1, _idx$2, _code$3] = arg;
            var R = (() => {
                var _suffix_parser$4 = Parser$first_of(List$cons(Fm$Parser$application(_term$1))(List$cons(Fm$Parser$application$erased(_term$1))(List$cons(Fm$Parser$arrow(_term$1))(List$cons(Fm$Parser$equality(_term$1))(List$cons(Fm$Parser$annotation(_term$1))(List$nil))))));
                return (() => {
                    var self = _suffix_parser$4(_idx$2)(_code$3);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $220 = self.idx;
                            var $221 = self.code;
                            var $222 = self.err;
                            return Parser$Reply$value(_idx$2)(_code$3)(_term$1);
                        case 'Parser.Reply.value':
                            var $223 = self.idx;
                            var $224 = self.code;
                            var $225 = self.val;
                            return Fm$Parser$suffix($225)($223)($224);
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$term = Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$type)(List$cons(Fm$Parser$forall)(List$cons(Fm$Parser$lambda)(List$cons(Fm$Parser$lambda$erased)(List$cons(Fm$Parser$parenthesis)(List$cons(Fm$Parser$letforin)(List$cons(Fm$Parser$let)(List$cons(Fm$Parser$def)(List$cons(Fm$Parser$if)(List$cons(Fm$Parser$char)(List$cons(Fm$Parser$string)(List$cons(Fm$Parser$pair)(List$cons(Fm$Parser$list)(List$cons(Fm$Parser$forin)(List$cons(Fm$Parser$do)(List$cons(Fm$Parser$case)(List$cons(Fm$Parser$goal)(List$cons(Fm$Parser$hole)(List$cons(Fm$Parser$nat)(List$cons(Fm$Parser$reference)(List$nil))))))))))))))))))))))((_term$1 => Fm$Parser$suffix(_term$1)));
    var Fm$Parser$name_term = Monad$bind(Parser$monad)(Fm$Parser$name)((_name$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$3 => Monad$pure(Parser$monad)(Pair$new(_name$1)(_type$3))))))));
    var Fm$Binder$new = (_eras$1 => (_name$2 => (_term$3 => ({
        _: 'Fm.Binder.new',
        'eras': _eras$1,
        'name': _name$2,
        'term': _term$3
    }))));
    var Fm$Parser$binder$homo = (_eras$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text((() => {
        var self = _eras$1;
        switch (self ? 'true' : 'false') {
            case 'true':
                return "<";
            case 'false':
                return "(";
        }
    })()))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$spaces_text((() => {
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
                var $226 = self.fst;
                var $227 = self.snd;
                return Fm$Binder$new(_eras$1)($226)($227);
        }
    })()))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $228 = self.head;
                var $229 = self.tail;
                return List$cons($228)(List$concat($229)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $230 = self.head;
                var $231 = self.tail;
                return List$concat($230)(List$flatten($231));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $232 = self.head;
                var $233 = self.tail;
                return (() => {
                    var self = $232;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $234 = self.eras;
                            var $235 = self.name;
                            var $236 = self.term;
                            return Fm$Term$all($234)("")($235)($236)((_s$8 => (_x$9 => Fm$Parser$make_forall($233)(_body$2))));
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
                        var $237 = self.head;
                        var $238 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($237);
                                case 'succ':
                                    var $239 = (self - 1n);
                                    return List$at($239)($238);
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
                var $240 = self.fst;
                var $241 = self.snd;
                return $241;
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
                        var $242 = self.head;
                        var $243 = self.tail;
                        return (() => {
                            var self = $242;
                            switch (self._) {
                                case 'Pair.new':
                                    var $244 = self.fst;
                                    var $245 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($244);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($245);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($243);
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
                        var $246 = self.head;
                        var $247 = self.tail;
                        return List$length$go($247)(Nat$succ(_n$3));
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
                var $248 = self.name;
                var $249 = self.indx;
                return (() => {
                    var self = List$at_last($249)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($248)($249);
                        case 'Maybe.some':
                            var $250 = self.value;
                            return Pair$snd($250);
                    }
                })();
            case 'Fm.Term.ref':
                var $251 = self.name;
                return (() => {
                    var self = Fm$Context$find($251)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($251);
                        case 'Maybe.some':
                            var $252 = self.value;
                            return $252;
                    }
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $253 = self.eras;
                var $254 = self.self;
                var $255 = self.name;
                var $256 = self.xtyp;
                var $257 = self.body;
                return (() => {
                    var _vlen$9 = List$length(_vars$1);
                    return Fm$Term$all($253)($254)($255)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($256))((_s$10 => (_x$11 => Fm$Term$bind(List$cons(Pair$new($255)(_x$11))(List$cons(Pair$new($254)(_s$10))(_vars$1)))(Fm$Path$1(_path$2))($257(Fm$Term$var($254)(_vlen$9))(Fm$Term$var($255)(Nat$succ(_vlen$9)))))))
                })();
            case 'Fm.Term.lam':
                var $258 = self.name;
                var $259 = self.body;
                return (() => {
                    var _vlen$6 = List$length(_vars$1);
                    return Fm$Term$lam($258)((_x$7 => Fm$Term$bind(List$cons(Pair$new($258)(_x$7))(_vars$1))(Fm$Path$0(_path$2))($259(Fm$Term$var($258)(_vlen$6)))))
                })();
            case 'Fm.Term.app':
                var $260 = self.func;
                var $261 = self.argm;
                return Fm$Term$app(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($260))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($261));
            case 'Fm.Term.let':
                var $262 = self.name;
                var $263 = self.expr;
                var $264 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$let($262)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($263))((_x$8 => Fm$Term$bind(List$cons(Pair$new($262)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($264(Fm$Term$var($262)(_vlen$7)))))
                })();
            case 'Fm.Term.def':
                var $265 = self.name;
                var $266 = self.expr;
                var $267 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$def($265)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($266))((_x$8 => Fm$Term$bind(List$cons(Pair$new($265)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($267(Fm$Term$var($265)(_vlen$7)))))
                })();
            case 'Fm.Term.ann':
                var $268 = self.done;
                var $269 = self.term;
                var $270 = self.type;
                return Fm$Term$ann($268)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($269))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($270));
            case 'Fm.Term.gol':
                var $271 = self.name;
                var $272 = self.dref;
                var $273 = self.verb;
                return Fm$Term$gol($271)($272)($273);
            case 'Fm.Term.hol':
                var $274 = self.path;
                return Fm$Term$hol(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $275 = self.natx;
                return Fm$Term$nat($275);
            case 'Fm.Term.chr':
                var $276 = self.chrx;
                return Fm$Term$chr($276);
            case 'Fm.Term.str':
                var $277 = self.strx;
                return Fm$Term$str($277);
            case 'Fm.Term.cse':
                var $278 = self.path;
                var $279 = self.expr;
                var $280 = self.name;
                var $281 = self.with;
                var $282 = self.cses;
                var $283 = self.moti;
                return (() => {
                    var _expr$10 = Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($279);
                    var _name$11 = $280;
                    var _with$12 = $281;
                    var _cses$13 = $282;
                    var _moti$14 = $283;
                    return Fm$Term$cse(Fm$Path$to_bits(_path$2))(_expr$10)(_name$11)(_with$12)(_cses$13)(_moti$14)
                })();
        }
    })())));
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$Parser$file$def = (_defs$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$4 => (() => {
        var _args$5 = List$flatten(_args$4);
        return Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$8 => (() => {
            var _type$9 = Fm$Parser$make_forall(_args$5)(_type$7);
            var _term$10 = Fm$Parser$make_lambda(List$mapped(_args$5)((_x$10 => (() => {
                var self = _x$10;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $284 = self.eras;
                        var $285 = self.name;
                        var $286 = self.term;
                        return $285;
                }
            })())))(_term$8);
            var _type$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$1(_x$11)))(_type$9);
            var _term$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$0(_x$12)))(_term$10);
            var _defs$13 = Fm$set(_name$3)(Fm$Def$new(_name$3)(_term$12)(_type$11)(Fm$Status$init))(_defs$1);
            return Monad$pure(Parser$monad)(_defs$13)
        })()))))))
    })())))))));
    var Maybe$default = (_a$2 => (_m$3 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return _a$2;
            case 'Maybe.some':
                var $287 = self.value;
                return $287;
        }
    })()));
    var Fm$Constructor$new = (_name$1 => (_args$2 => (_inds$3 => ({
        _: 'Fm.Constructor.new',
        'name': _name$1,
        'args': _args$2,
        'inds': _inds$3
    }))));
    var Fm$Parser$constructor = (_namespace$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_args$3 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$spaces_text("~"))((_$4 => Fm$Parser$binder))))((_inds$4 => (() => {
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
    var Fm$Parser$datatype = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("type "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$binder))((_pars$3 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$spaces_text("~"))((_$4 => Fm$Parser$binder))))((_inds$4 => (() => {
        var _pars$5 = Maybe$default(List$nil)(_pars$3);
        var _inds$6 = Maybe$default(List$nil)(_inds$4);
        return Monad$bind(Parser$monad)(Fm$Parser$spaces_text("{"))((_$7 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$spaces_text("}"))(Fm$Parser$item(Fm$Parser$constructor(_name$2))))((_ctrs$8 => Monad$pure(Parser$monad)(Fm$Datatype$new(_name$2)(_pars$5)(_inds$6)(_ctrs$8))))))
    })()))))))));
    var Fm$Datatype$build_term$motive$go = (_type$1 => (_name$2 => (_inds$3 => (() => {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _type$1;
                    switch (self._) {
                        case 'Fm.Datatype.new':
                            var $288 = self.name;
                            var $289 = self.pars;
                            var $290 = self.inds;
                            var $291 = self.ctrs;
                            return (() => {
                                var _slf$8 = Fm$Term$ref(_name$2);
                                var _slf$9 = (list_for($289)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$app(_slf$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $292 = self.eras;
                                            var $293 = self.name;
                                            var $294 = self.term;
                                            return $293;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($290)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$app(_slf$11)(Fm$Term$ref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $295 = self.eras;
                                            var $296 = self.name;
                                            var $297 = self.term;
                                            return $296;
                                    }
                                })()))))));
                                return Fm$Term$all(Bool$false)("")("")(_slf$10)((_s$11 => (_x$12 => Fm$Term$typ)))
                            })();
                    }
                })();
            case 'List.cons':
                var $298 = self.head;
                var $299 = self.tail;
                return (() => {
                    var self = $298;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $300 = self.eras;
                            var $301 = self.name;
                            var $302 = self.term;
                            return Fm$Term$all($300)("")($301)($302)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($299))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $303 = self.name;
                var $304 = self.pars;
                var $305 = self.inds;
                var $306 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($303)($305);
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
                            var $307 = self.name;
                            var $308 = self.pars;
                            var $309 = self.inds;
                            var $310 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $311 = self.name;
                                        var $312 = self.args;
                                        var $313 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$ref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($313)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$app(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $314 = self.eras;
                                                        var $315 = self.name;
                                                        var $316 = self.term;
                                                        return $316;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($307)(List$cons(Fm$Name$read("."))(List$cons($311)(List$nil))));
                                            var _slf$14 = Fm$Term$ref(_ctr$13);
                                            var _slf$15 = (list_for($308)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$app(_slf$16)(Fm$Term$ref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $317 = self.eras;
                                                        var $318 = self.name;
                                                        var $319 = self.term;
                                                        return $318;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($312)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$app(_slf$17)(Fm$Term$ref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $320 = self.eras;
                                                        var $321 = self.name;
                                                        var $322 = self.term;
                                                        return $321;
                                                }
                                            })()))))));
                                            return Fm$Term$app(_ret$12)(_slf$16)
                                        })();
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $323 = self.head;
                var $324 = self.tail;
                return (() => {
                    var self = $323;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $325 = self.eras;
                            var $326 = self.name;
                            var $327 = self.term;
                            return (() => {
                                var _eras$9 = $325;
                                var _name$10 = $326;
                                var _xtyp$11 = $327;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($324);
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
                var $328 = self.name;
                var $329 = self.args;
                var $330 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($329);
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
                            var $331 = self.name;
                            var $332 = self.pars;
                            var $333 = self.inds;
                            var $334 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$ref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($333)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$app(_ret$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $335 = self.eras;
                                            var $336 = self.name;
                                            var $337 = self.term;
                                            return $336;
                                    }
                                })()))))));
                                return Fm$Term$app(_ret$9)(Fm$Term$ref((_name$2 + ".Self")))
                            })();
                    }
                })();
            case 'List.cons':
                var $338 = self.head;
                var $339 = self.tail;
                return (() => {
                    var self = $338;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $340 = self.name;
                            var $341 = self.args;
                            var $342 = self.inds;
                            return Fm$Term$all(Bool$false)("")($340)(Fm$Datatype$build_term$constructor(_type$1)($338))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($339))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $343 = self.name;
                var $344 = self.pars;
                var $345 = self.inds;
                var $346 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($343)($346);
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
                            var $347 = self.head;
                            var $348 = self.tail;
                            return (() => {
                                var self = $347;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $349 = self.eras;
                                        var $350 = self.name;
                                        var $351 = self.term;
                                        return Fm$Term$lam($350)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($348)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $352 = self.head;
                var $353 = self.tail;
                return (() => {
                    var self = $352;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $354 = self.eras;
                            var $355 = self.name;
                            var $356 = self.term;
                            return Fm$Term$lam($355)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($353)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $357 = self.name;
                var $358 = self.pars;
                var $359 = self.inds;
                var $360 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($357)($358)($359);
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
                            var $361 = self.head;
                            var $362 = self.tail;
                            return (() => {
                                var self = $361;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $363 = self.eras;
                                        var $364 = self.name;
                                        var $365 = self.term;
                                        return Fm$Term$all(Bool$false)("")($364)($365)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($362))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $366 = self.head;
                var $367 = self.tail;
                return (() => {
                    var self = $366;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $368 = self.eras;
                            var $369 = self.name;
                            var $370 = self.term;
                            return Fm$Term$all(Bool$false)("")($369)($370)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($367)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $371 = self.name;
                var $372 = self.pars;
                var $373 = self.inds;
                var $374 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($371)($372)($373);
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
                            var $375 = self.name;
                            var $376 = self.args;
                            var $377 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$ref($375);
                                var _ret$8 = (list_for($376)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$app(_ret$9)(Fm$Term$ref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $378 = self.eras;
                                            var $379 = self.name;
                                            var $380 = self.term;
                                            return $379;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $381 = self.head;
                var $382 = self.tail;
                return (() => {
                    var self = $381;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $383 = self.name;
                            var $384 = self.args;
                            var $385 = self.inds;
                            return Fm$Term$lam($383)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($382)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $386 = self.name;
                var $387 = self.pars;
                var $388 = self.inds;
                var $389 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($389);
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
                            var $390 = self.head;
                            var $391 = self.tail;
                            return (() => {
                                var self = $390;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $392 = self.eras;
                                        var $393 = self.name;
                                        var $394 = self.term;
                                        return Fm$Term$lam($393)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($391)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $395 = self.head;
                var $396 = self.tail;
                return (() => {
                    var self = $395;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $397 = self.eras;
                            var $398 = self.name;
                            var $399 = self.term;
                            return Fm$Term$lam($398)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($396)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $400 = self.name;
                var $401 = self.pars;
                var $402 = self.inds;
                var $403 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $404 = self.name;
                            var $405 = self.args;
                            var $406 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($400)($401)($405);
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
                                        var $407 = self.name;
                                        var $408 = self.pars;
                                        var $409 = self.inds;
                                        var $410 = self.ctrs;
                                        return (() => {
                                            var self = _ctor$2;
                                            switch (self._) {
                                                case 'Fm.Constructor.new':
                                                    var $411 = self.name;
                                                    var $412 = self.args;
                                                    var $413 = self.inds;
                                                    return (() => {
                                                        var _type$13 = Fm$Term$ref(_name$3);
                                                        var _type$14 = (list_for($408)(_type$13)((_var$14 => (_type$15 => Fm$Term$app(_type$15)(Fm$Term$ref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $414 = self.eras;
                                                                    var $415 = self.name;
                                                                    var $416 = self.term;
                                                                    return $415;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($413)(_type$14)((_var$15 => (_type$16 => Fm$Term$app(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $417 = self.eras;
                                                                    var $418 = self.name;
                                                                    var $419 = self.term;
                                                                    return $419;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $420 = self.head;
                            var $421 = self.tail;
                            return (() => {
                                var self = $420;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $422 = self.eras;
                                        var $423 = self.name;
                                        var $424 = self.term;
                                        return Fm$Term$all($422)("")($423)($424)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($421))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $425 = self.head;
                var $426 = self.tail;
                return (() => {
                    var self = $425;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $427 = self.eras;
                            var $428 = self.name;
                            var $429 = self.term;
                            return Fm$Term$all($427)("")($428)($429)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($426)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $430 = self.name;
                var $431 = self.pars;
                var $432 = self.inds;
                var $433 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $434 = self.name;
                            var $435 = self.args;
                            var $436 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($430)($431)($435);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$adt = (_defs$1 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$2 => (() => {
        var self = _adt$2;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $437 = self.name;
                var $438 = self.pars;
                var $439 = self.inds;
                var $440 = self.ctrs;
                return (() => {
                    var _term$7 = Fm$Datatype$build_term(_adt$2);
                    var _term$8 = Fm$Term$bind(List$nil)((_x$8 => Bits$1(_x$8)))(_term$7);
                    var _type$9 = Fm$Datatype$build_type(_adt$2);
                    var _type$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$0(_x$10)))(_type$9);
                    var _defs$11 = Fm$set($437)(Fm$Def$new($437)(_term$8)(_type$10)(Fm$Status$init))(_defs$1);
                    var _defs$12 = List$fold($440)(_defs$11)((_ctr$12 => (_defs$13 => (() => {
                        var _typ_name$14 = $437;
                        var _ctr_name$15 = String$flatten(List$cons(_typ_name$14)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$12;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $441 = self.name;
                                    var $442 = self.args;
                                    var $443 = self.inds;
                                    return $441;
                            }
                        })())(List$nil))));
                        var _ctr_term$16 = Fm$Constructor$build_term(_adt$2)(_ctr$12);
                        var _ctr_term$17 = Fm$Term$bind(List$nil)((_x$17 => Bits$1(_x$17)))(_ctr_term$16);
                        var _ctr_type$18 = Fm$Constructor$build_type(_adt$2)(_ctr$12);
                        var _ctr_type$19 = Fm$Term$bind(List$nil)((_x$19 => Bits$0(_x$19)))(_ctr_type$18);
                        return Fm$set(_ctr_name$15)(Fm$Def$new(_ctr_name$15)(_ctr_term$17)(_ctr_type$19)(Fm$Status$init))(_defs$13)
                    })())));
                    return Monad$pure(Parser$monad)(_defs$12)
                })();
        }
    })())));
    var Parser$eof = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_idx$1)(_code$2)(Unit$new);
            case 'cons':
                var $444 = self.charCodeAt(0);
                var $445 = self.slice(1);
                return Parser$Reply$error(_idx$1)(_code$2)("Expected end-of-file.");
        }
    })()));
    var Fm$Parser$file$end = (_defs$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Parser$eof)((_$3 => Monad$pure(Parser$monad)(_defs$1))))));
    var Fm$Parser$file$go = (_defs$1 => Monad$bind(Parser$monad)(Parser$is_eof)((_stop$2 => (() => {
        var self = _stop$2;
        switch (self ? 'true' : 'false') {
            case 'true':
                return Monad$pure(Parser$monad)(_defs$1);
            case 'false':
                return Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$file$def(_defs$1))(List$cons(Fm$Parser$file$adt(_defs$1))(List$cons(Fm$Parser$file$end(_defs$1))(List$nil)))))((_defs$3 => Fm$Parser$file$go(_defs$3)));
        }
    })())));
    var Fm$Parser$file = Fm$Parser$file$go(Map$new);
    var Either = (_A$1 => (_B$2 => null));
    var String$join$go = (_sep$1 => (_list$2 => (_fst$3 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $446 = self.head;
                var $447 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($446)(List$cons(String$join$go(_sep$1)($447)(Bool$false))(List$nil))));
        }
    })())));
    var String$join = (_sep$1 => (_list$2 => String$join$go(_sep$1)(_list$2)(Bool$true)));
    var Fm$Parser$highlight$end = (_col$1 => (_row$2 => (_res$3 => String$join("\u{a}")(_res$3))));
    var Maybe$extract = (_m$2 => (_a$4 => (_f$5 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return _a$4;
            case 'Maybe.some':
                var $448 = self.value;
                return _f$5($448);
        }
    })())));
    var Nat$is_zero = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Bool$true;
            case 'succ':
                var $449 = (self - 1n);
                return Bool$false;
        }
    })());
    var Nat$double = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $450 = (self - 1n);
                return Nat$succ(Nat$succ(Nat$double($450)));
        }
    })());
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $451 = (self - 1n);
                return $451;
        }
    })());
    var List$take = (_n$2 => (_xs$3 => (() => {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $452 = self.head;
                var $453 = self.tail;
                return (() => {
                    var self = _n$2;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return List$nil;
                        case 'succ':
                            var $454 = (self - 1n);
                            return List$cons($452)(List$take($454)($453));
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
                        var $455 = self.charCodeAt(0);
                        var $456 = self.slice(1);
                        return String$reverse$go($456)(String$cons($455)(_res$2));
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
                var $457 = (self - 1n);
                return (() => {
                    var self = _str$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return String$cons(_chr$2)(String$pad_right($457)(_chr$2)(""));
                        case 'cons':
                            var $458 = self.charCodeAt(0);
                            var $459 = self.slice(1);
                            return String$cons($458)(String$pad_right($457)(_chr$2)($459));
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
                        var $460 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($460));
                                case 'succ':
                                    var $461 = (self - 1n);
                                    return Nat$sub_rem($461)($460);
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
                        var $462 = self.value;
                        return Nat$div_mod$go($462)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $463 = self.value;
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
                        var $464 = self.fst;
                        var $465 = self.snd;
                        return (() => {
                            var self = $464;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($465)(_res$3);
                                case 'succ':
                                    var $466 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($464)(List$cons($465)(_res$3));
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
                                var $467 = self.value;
                                return $467;
                        }
                    })();
                case 'false':
                    return 35;
            }
        })()
    })()));
    var Nat$to_string_base = (_base$1 => (_nat$2 => List$fold(Nat$to_base(_base$1)(_nat$2))(String$nil)((_n$3 => (_str$4 => String$cons(Nat$show_digit(_base$1)(_n$3))(_str$4))))));
    var Nat$show = (_n$1 => Nat$to_string_base(10n)(_n$1));
    var String$color = (_col$1 => (_str$2 => String$cons(27)(String$cons(91)((_col$1 + String$cons(109)((_str$2 + String$cons(27)(String$cons(91)(String$cons(48)(String$cons(109)(String$nil)))))))))));
    var Fm$Parser$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => {
        var Fm$Parser$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => ({
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
                        return Fm$Parser$highlight$end(_col$4)(_row$5)(List$reverse(_res$8));
                    case 'cons':
                        var $468 = self.charCodeAt(0);
                        var $469 = self.slice(1);
                        return (() => {
                            var self = ($468 === 10);
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return (() => {
                                        var _stp$11 = Maybe$extract(_lft$6)(Bool$false)(Nat$is_zero);
                                        return (() => {
                                            var self = _stp$11;
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Fm$Parser$highlight$end(_col$4)(_row$5)(List$reverse(_res$8));
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
                                                                                var $470 = self.value;
                                                                                return Maybe$some(Nat$pred($470));
                                                                        }
                                                                    })();
                                                                case 'succ':
                                                                    var $471 = (self - 1n);
                                                                    return _lft$6;
                                                            }
                                                        })();
                                                        var _ix0$15 = Nat$pred(_ix0$2);
                                                        var _ix1$16 = Nat$pred(_ix1$3);
                                                        var _col$17 = 0n;
                                                        var _row$18 = Nat$succ(_row$5);
                                                        var _res$19 = List$take(_siz$13)(List$cons(String$reverse(_lin$7))(_res$8));
                                                        var _lin$20 = String$reverse(String$flatten(List$cons(String$pad_left(4n)(32)(Nat$show(_row$18)))(List$cons(" | ")(List$nil))));
                                                        return Fm$Parser$highlight$tc($469)(_ix0$15)(_ix1$16)(_col$17)(_row$18)(_lft$14)(_lin$20)(_res$19)
                                                    })();
                                            }
                                        })()
                                    })();
                                case 'false':
                                    return (() => {
                                        var _chr$11 = String$cons($468)(String$nil);
                                        var _chr$12 = (() => {
                                            var self = (Nat$is_zero(_ix0$2) && (!Nat$is_zero(_ix1$3)));
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return String$reverse(String$color("31")(String$color("4")(_chr$11)));
                                                case 'false':
                                                    return _chr$11;
                                            }
                                        })();
                                        var _ix0$13 = Nat$pred(_ix0$2);
                                        var _ix1$14 = Nat$pred(_ix1$3);
                                        var _col$15 = Nat$succ(_col$4);
                                        var _lin$16 = String$flatten(List$cons(_chr$12)(List$cons(_lin$7)(List$nil)));
                                        return Fm$Parser$highlight$tc($469)(_ix0$13)(_ix1$14)(_col$15)(_row$5)(_lft$6)(_lin$16)(_res$8)
                                    })();
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$highlight = (_code$1 => (_idx$2 => Fm$Parser$highlight$tc(_code$1)(_idx$2)(Nat$succ(_idx$2))(0n)(1n)(Maybe$none)("")(List$nil)));
    var Fm$Defs$read = (_code$1 => (() => {
        var self = Fm$Parser$file(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $472 = self.idx;
                var $473 = self.code;
                var $474 = self.err;
                return (() => {
                    var _err$5 = $474;
                    var _hig$6 = Fm$Parser$highlight(_code$1)($472);
                    var _str$7 = String$flatten(List$cons(_err$5)(List$cons("\u{a}")(List$cons(_hig$6)(List$nil))));
                    return Either$left(_str$7)
                })();
            case 'Parser.Reply.value':
                var $475 = self.idx;
                var $476 = self.code;
                var $477 = self.val;
                return Either$right($477);
        }
    })());
    var Fm$exec = (_report$1 => (_code$2 => (() => {
        var self = Fm$Defs$read(_code$2);
        switch (self._) {
            case 'Either.left':
                var $478 = self.value;
                return $478;
            case 'Either.right':
                var $479 = self.value;
                return _report$1($479);
        }
    })()));
    var Map$values$go = (_xs$2 => (_list$3 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$3;
            case 'Map.tie':
                var $480 = self.val;
                var $481 = self.lft;
                var $482 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $480;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $483 = self.value;
                                return List$cons($483)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($481)(_list0$7);
                    var _list2$9 = Map$values$go($482)(_list1$8);
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
                var $484 = self.slice(0, -1);
                return (2n * Bits$to_nat($484));
            case '1':
                var $485 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($485)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $486 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($486)));
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
                var $487 = self.charCodeAt(0);
                var $488 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($487);
                    var _tail$5 = Fm$escape($488);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $489 = self.name;
                var $490 = self.indx;
                return Fm$Name$show($489);
            case 'Fm.Term.ref':
                var $491 = self.name;
                return Fm$Name$show($491);
            case 'Fm.Term.typ':
                return "*";
            case 'Fm.Term.all':
                var $492 = self.eras;
                var $493 = self.self;
                var $494 = self.name;
                var $495 = self.xtyp;
                var $496 = self.body;
                return (() => {
                    var _eras$7 = $492;
                    var _init$8 = (() => {
                        var self = _eras$7;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$9 = Fm$Name$show($493);
                    var _name$10 = Fm$Name$show($494);
                    var _xtyp$11 = Fm$Term$core($495);
                    var _body$12 = Fm$Term$core($496(Fm$Term$var($493)(0n))(Fm$Term$var($494)(0n)));
                    return String$flatten(List$cons(_init$8)(List$cons(_self$9)(List$cons("(")(List$cons(_name$10)(List$cons(":")(List$cons(_xtyp$11)(List$cons(") ")(List$cons(_body$12)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $497 = self.name;
                var $498 = self.body;
                return (() => {
                    var _name$4 = Fm$Name$show($497);
                    var _body$5 = Fm$Term$core($498(Fm$Term$var($497)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$4)(List$cons(" ")(List$cons(_body$5)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $499 = self.func;
                var $500 = self.argm;
                return (() => {
                    var _func$4 = Fm$Term$core($499);
                    var _argm$5 = Fm$Term$core($500);
                    return String$flatten(List$cons("(")(List$cons(_func$4)(List$cons(" ")(List$cons(_argm$5)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $501 = self.name;
                var $502 = self.expr;
                var $503 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($501);
                    var _expr$6 = Fm$Term$core($502);
                    var _body$7 = Fm$Term$core($503(Fm$Term$var($501)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $504 = self.name;
                var $505 = self.expr;
                var $506 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($504);
                    var _expr$6 = Fm$Term$core($505);
                    var _body$7 = Fm$Term$core($506(Fm$Term$var($504)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $507 = self.done;
                var $508 = self.term;
                var $509 = self.type;
                return (() => {
                    var _term$5 = Fm$Term$core($508);
                    var _type$6 = Fm$Term$core($509);
                    return String$flatten(List$cons("{")(List$cons(_term$5)(List$cons(":")(List$cons(_type$6)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $510 = self.name;
                var $511 = self.dref;
                var $512 = self.verb;
                return "<ERROR>";
            case 'Fm.Term.hol':
                var $513 = self.path;
                return "<ERROR>";
            case 'Fm.Term.nat':
                var $514 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($514))(List$nil)));
            case 'Fm.Term.chr':
                var $515 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($515))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $516 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($516))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $517 = self.path;
                var $518 = self.expr;
                var $519 = self.name;
                var $520 = self.with;
                var $521 = self.cses;
                var $522 = self.moti;
                return "<ERROR>";
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $523 = self.name;
                    var $524 = self.term;
                    var $525 = self.type;
                    var $526 = self.stat;
                    return (() => {
                        var self = $526;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$9 = $523;
                                    var _term$10 = Fm$Term$core($524);
                                    var _type$11 = Fm$Term$core($525);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$9)(List$cons(" : ")(List$cons(_type$11)(List$cons(" = ")(List$cons(_term$10)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $527 = self.errors;
                                return _result$4;
                        }
                    })();
            }
        })()))));
        return _result$3
    })());
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
                                    var $528 = self.val;
                                    var $529 = self.lft;
                                    var $530 = self.rgt;
                                    return $528;
                            }
                        })();
                    case '0':
                        var $531 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $532 = self.val;
                                    var $533 = self.lft;
                                    var $534 = self.rgt;
                                    return Map$get($531)($533);
                            }
                        })();
                    case '1':
                        var $535 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $536 = self.val;
                                    var $537 = self.lft;
                                    var $538 = self.rgt;
                                    return Map$get($535)($538);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$get = (_name$2 => (_map$3 => Map$get((fm_name_to_bits(_name$2)))(_map$3)));
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
                var $539 = self.value;
                var $540 = self.errors;
                return (() => {
                    var self = $539;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($540);
                        case 'Maybe.some':
                            var $541 = self.value;
                            return (() => {
                                var self = _f$4($541);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $542 = self.value;
                                        var $543 = self.errors;
                                        return Fm$Check$result($542)(List$concat($540)($543));
                                }
                            })();
                    }
                })();
        }
    })()));
    var Fm$Check$pure = (_value$2 => Fm$Check$result(Maybe$some(_value$2))(List$nil));
    var Fm$Check$monad = Monad$new(Fm$Check$bind)(Fm$Check$pure);
    var Fm$Error$undefined_reference = (_name$1 => ({
        _: 'Fm.Error.undefined_reference',
        'name': _name$1
    }));
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
                var $544 = self.value;
                return Maybe$some(_f$4($544));
        }
    })()));
    var Fm$MPath$0 = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$0));
    var Fm$MPath$1 = (_path$1 => Maybe$mapped(_path$1)(Fm$Path$1));
    var Fm$Error$cant_infer = (_term$1 => (_context$2 => ({
        _: 'Fm.Error.cant_infer',
        'term': _term$1,
        'context': _context$2
    })));
    var Fm$Term$unroll_nat = (_natx$1 => (() => {
        var self = _natx$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Fm$Term$ref(Fm$Name$read("Nat.zero"));
            case 'succ':
                var $545 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$ref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$nat($545);
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
                var $546 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($546));
            case '1':
                var $547 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($547));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $548 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$ref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$app(_term$3)(Fm$Term$nat(16n));
                    var _term$5 = Fm$Term$app(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($548)));
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
                var $549 = self.charCodeAt(0);
                var $550 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$chr($549);
                    var _term$5 = Fm$Term$ref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$app(_term$5)(_char$4);
                    var _term$7 = Fm$Term$app(_term$6)(Fm$Term$str($550));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $551 = self.name;
                var $552 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $553 = self.name;
                return (() => {
                    var self = Fm$get($553)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($553);
                        case 'Maybe.some':
                            var $554 = self.value;
                            return (() => {
                                var self = $554;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $555 = self.name;
                                        var $556 = self.term;
                                        var $557 = self.type;
                                        var $558 = self.stat;
                                        return Fm$Term$reduce($556)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$1;
            case 'Fm.Term.all':
                var $559 = self.eras;
                var $560 = self.self;
                var $561 = self.name;
                var $562 = self.xtyp;
                var $563 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $564 = self.name;
                var $565 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $566 = self.func;
                var $567 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$reduce($566)(_defs$2);
                    return (() => {
                        var self = _func$5;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $568 = self.name;
                                var $569 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $570 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                return _term$1;
                            case 'Fm.Term.all':
                                var $571 = self.eras;
                                var $572 = self.self;
                                var $573 = self.name;
                                var $574 = self.xtyp;
                                var $575 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $576 = self.name;
                                var $577 = self.body;
                                return Fm$Term$reduce($577($567))(_defs$2);
                            case 'Fm.Term.app':
                                var $578 = self.func;
                                var $579 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $580 = self.name;
                                var $581 = self.expr;
                                var $582 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $583 = self.name;
                                var $584 = self.expr;
                                var $585 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $586 = self.done;
                                var $587 = self.term;
                                var $588 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $589 = self.name;
                                var $590 = self.dref;
                                var $591 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $592 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $593 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $594 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $595 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $596 = self.path;
                                var $597 = self.expr;
                                var $598 = self.name;
                                var $599 = self.with;
                                var $600 = self.cses;
                                var $601 = self.moti;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $602 = self.name;
                var $603 = self.expr;
                var $604 = self.body;
                return Fm$Term$reduce($604($603))(_defs$2);
            case 'Fm.Term.def':
                var $605 = self.name;
                var $606 = self.expr;
                var $607 = self.body;
                return Fm$Term$reduce($607($606))(_defs$2);
            case 'Fm.Term.ann':
                var $608 = self.done;
                var $609 = self.term;
                var $610 = self.type;
                return Fm$Term$reduce($609)(_defs$2);
            case 'Fm.Term.gol':
                var $611 = self.name;
                var $612 = self.dref;
                var $613 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $614 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $615 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($615))(_defs$2);
            case 'Fm.Term.chr':
                var $616 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($616))(_defs$2);
            case 'Fm.Term.str':
                var $617 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($617))(_defs$2);
            case 'Fm.Term.cse':
                var $618 = self.path;
                var $619 = self.expr;
                var $620 = self.name;
                var $621 = self.with;
                var $622 = self.cses;
                var $623 = self.moti;
                return _term$1;
        }
    })()));
    var Fm$Error$type_mismatch = (_expected$1 => (_detected$2 => (_context$3 => ({
        _: 'Fm.Error.type_mismatch',
        'expected': _expected$1,
        'detected': _detected$2,
        'context': _context$3
    }))));
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
                var $624 = self.head;
                var $625 = self.tail;
                return (() => {
                    var self = $624;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $626 = self.name;
                            var $627 = self.term;
                            var $628 = self.type;
                            var $629 = self.stat;
                            return Fm$Term$all(Bool$false)("")($626)($628)((_s$9 => (_x$10 => Fm$Term$desugar_cse$motive($625)(_moti$2))));
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
                var $630 = self.charCodeAt(0);
                var $631 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $632 = self.name;
                var $633 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $634 = self.head;
                            var $635 = self.tail;
                            return (() => {
                                var self = $634;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $636 = self.name;
                                        var $637 = self.term;
                                        var $638 = self.type;
                                        var $639 = self.stat;
                                        return Fm$Term$lam($636)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($635)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $640 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $641 = self.head;
                            var $642 = self.tail;
                            return (() => {
                                var self = $641;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $643 = self.name;
                                        var $644 = self.term;
                                        var $645 = self.type;
                                        var $646 = self.stat;
                                        return Fm$Term$lam($643)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($642)(_type$3)(_body$4)(_defs$5)));
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
                            var $647 = self.head;
                            var $648 = self.tail;
                            return (() => {
                                var self = $647;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $649 = self.name;
                                        var $650 = self.term;
                                        var $651 = self.type;
                                        var $652 = self.stat;
                                        return Fm$Term$lam($649)((_x$12 => Fm$Term$desugar_cse$argument(_name$1)($648)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $653 = self.eras;
                var $654 = self.self;
                var $655 = self.name;
                var $656 = self.xtyp;
                var $657 = self.body;
                return Fm$Term$lam((() => {
                    var self = String$is_empty($655);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($655)(List$nil))));
                    }
                })())((_x$11 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($657(Fm$Term$var($654)(0n))(Fm$Term$var($655)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $658 = self.name;
                var $659 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $660 = self.head;
                            var $661 = self.tail;
                            return (() => {
                                var self = $660;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $662 = self.name;
                                        var $663 = self.term;
                                        var $664 = self.type;
                                        var $665 = self.stat;
                                        return Fm$Term$lam($662)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($661)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $666 = self.func;
                var $667 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $668 = self.head;
                            var $669 = self.tail;
                            return (() => {
                                var self = $668;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $670 = self.name;
                                        var $671 = self.term;
                                        var $672 = self.type;
                                        var $673 = self.stat;
                                        return Fm$Term$lam($670)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($669)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $674 = self.name;
                var $675 = self.expr;
                var $676 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $677 = self.head;
                            var $678 = self.tail;
                            return (() => {
                                var self = $677;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $679 = self.name;
                                        var $680 = self.term;
                                        var $681 = self.type;
                                        var $682 = self.stat;
                                        return Fm$Term$lam($679)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($678)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $683 = self.name;
                var $684 = self.expr;
                var $685 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $686 = self.head;
                            var $687 = self.tail;
                            return (() => {
                                var self = $686;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $688 = self.name;
                                        var $689 = self.term;
                                        var $690 = self.type;
                                        var $691 = self.stat;
                                        return Fm$Term$lam($688)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($687)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $692 = self.done;
                var $693 = self.term;
                var $694 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $695 = self.head;
                            var $696 = self.tail;
                            return (() => {
                                var self = $695;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $697 = self.name;
                                        var $698 = self.term;
                                        var $699 = self.type;
                                        var $700 = self.stat;
                                        return Fm$Term$lam($697)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($696)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $701 = self.name;
                var $702 = self.dref;
                var $703 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $704 = self.head;
                            var $705 = self.tail;
                            return (() => {
                                var self = $704;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $706 = self.name;
                                        var $707 = self.term;
                                        var $708 = self.type;
                                        var $709 = self.stat;
                                        return Fm$Term$lam($706)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($705)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $710 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $711 = self.head;
                            var $712 = self.tail;
                            return (() => {
                                var self = $711;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $713 = self.name;
                                        var $714 = self.term;
                                        var $715 = self.type;
                                        var $716 = self.stat;
                                        return Fm$Term$lam($713)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($712)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $717 = self.natx;
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
                                        var $720 = self.name;
                                        var $721 = self.term;
                                        var $722 = self.type;
                                        var $723 = self.stat;
                                        return Fm$Term$lam($720)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($719)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $724 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $725 = self.head;
                            var $726 = self.tail;
                            return (() => {
                                var self = $725;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $727 = self.name;
                                        var $728 = self.term;
                                        var $729 = self.type;
                                        var $730 = self.stat;
                                        return Fm$Term$lam($727)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($726)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $731 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $732 = self.head;
                            var $733 = self.tail;
                            return (() => {
                                var self = $732;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $734 = self.name;
                                        var $735 = self.term;
                                        var $736 = self.type;
                                        var $737 = self.stat;
                                        return Fm$Term$lam($734)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($733)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $738 = self.path;
                var $739 = self.expr;
                var $740 = self.name;
                var $741 = self.with;
                var $742 = self.cses;
                var $743 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $744 = self.head;
                            var $745 = self.tail;
                            return (() => {
                                var self = $744;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $746 = self.name;
                                        var $747 = self.term;
                                        var $748 = self.type;
                                        var $749 = self.stat;
                                        return Fm$Term$lam($746)((_x$18 => Fm$Term$desugar_cse$argument(_name$1)($745)(_type$3)(_body$4)(_defs$5)));
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
                var $750 = self.value;
                return Maybe$some($750);
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
                        var $751 = self.name;
                        var $752 = self.indx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $753 = self.name;
                                        var $754 = self.term;
                                        var $755 = self.type;
                                        var $756 = self.stat;
                                        return $754;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.ref':
                        var $757 = self.name;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $758 = self.name;
                                        var $759 = self.term;
                                        var $760 = self.type;
                                        var $761 = self.stat;
                                        return $759;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.typ':
                        return (() => {
                            var _expr$8 = (list_for(_wyth$3)(_expr$1)((_def$8 => (_expr$9 => Fm$Term$app(_expr$9)((() => {
                                var self = _def$8;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $762 = self.name;
                                        var $763 = self.term;
                                        var $764 = self.type;
                                        var $765 = self.stat;
                                        return $763;
                                }
                            })())))));
                            return _expr$8
                        })();
                    case 'Fm.Term.all':
                        var $766 = self.eras;
                        var $767 = self.self;
                        var $768 = self.name;
                        var $769 = self.xtyp;
                        var $770 = self.body;
                        return (() => {
                            var _got$13 = Maybe$or(Fm$get($768)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_def$14 => (_expr$15 => (() => {
                                                var self = _def$14;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $771 = self.name;
                                                        var $772 = self.term;
                                                        var $773 = self.type;
                                                        var $774 = self.stat;
                                                        return Fm$Term$app(_expr$15)($772);
                                                }
                                            })()))));
                                            return _expr$14
                                        })();
                                    case 'Maybe.some':
                                        var $775 = self.value;
                                        return (() => {
                                            var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($769)($775)(_defs$6);
                                            var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                                            var _type$17 = $770(Fm$Term$var($767)(0n))(Fm$Term$var($768)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_wyth$3)(_cses$4)(_type$17)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $776 = self.name;
                        var $777 = self.body;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $778 = self.name;
                                        var $779 = self.term;
                                        var $780 = self.type;
                                        var $781 = self.stat;
                                        return $779;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.app':
                        var $782 = self.func;
                        var $783 = self.argm;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $784 = self.name;
                                        var $785 = self.term;
                                        var $786 = self.type;
                                        var $787 = self.stat;
                                        return $785;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.let':
                        var $788 = self.name;
                        var $789 = self.expr;
                        var $790 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $791 = self.name;
                                        var $792 = self.term;
                                        var $793 = self.type;
                                        var $794 = self.stat;
                                        return $792;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.def':
                        var $795 = self.name;
                        var $796 = self.expr;
                        var $797 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $798 = self.name;
                                        var $799 = self.term;
                                        var $800 = self.type;
                                        var $801 = self.stat;
                                        return $799;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ann':
                        var $802 = self.done;
                        var $803 = self.term;
                        var $804 = self.type;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $805 = self.name;
                                        var $806 = self.term;
                                        var $807 = self.type;
                                        var $808 = self.stat;
                                        return $806;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.gol':
                        var $809 = self.name;
                        var $810 = self.dref;
                        var $811 = self.verb;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $812 = self.name;
                                        var $813 = self.term;
                                        var $814 = self.type;
                                        var $815 = self.stat;
                                        return $813;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.hol':
                        var $816 = self.path;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $817 = self.name;
                                        var $818 = self.term;
                                        var $819 = self.type;
                                        var $820 = self.stat;
                                        return $818;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.nat':
                        var $821 = self.natx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $822 = self.name;
                                        var $823 = self.term;
                                        var $824 = self.type;
                                        var $825 = self.stat;
                                        return $823;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.chr':
                        var $826 = self.chrx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $827 = self.name;
                                        var $828 = self.term;
                                        var $829 = self.type;
                                        var $830 = self.stat;
                                        return $828;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.str':
                        var $831 = self.strx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $832 = self.name;
                                        var $833 = self.term;
                                        var $834 = self.type;
                                        var $835 = self.stat;
                                        return $833;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.cse':
                        var $836 = self.path;
                        var $837 = self.expr;
                        var $838 = self.name;
                        var $839 = self.with;
                        var $840 = self.cses;
                        var $841 = self.moti;
                        return (() => {
                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_def$14 => (_expr$15 => Fm$Term$app(_expr$15)((() => {
                                var self = _def$14;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $842 = self.name;
                                        var $843 = self.term;
                                        var $844 = self.type;
                                        var $845 = self.stat;
                                        return $843;
                                }
                            })())))));
                            return _expr$14
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
                var $846 = self.name;
                var $847 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $848 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $849 = self.eras;
                var $850 = self.self;
                var $851 = self.name;
                var $852 = self.xtyp;
                var $853 = self.body;
                return (() => {
                    var _moti$14 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($852)(_moti$14)(_defs$7);
                    var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                    var _type$17 = $853(Fm$Term$var($850)(0n))(Fm$Term$var($851)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_with$3)(_cses$4)(_type$17)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $854 = self.name;
                var $855 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $856 = self.func;
                var $857 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $858 = self.name;
                var $859 = self.expr;
                var $860 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $861 = self.name;
                var $862 = self.expr;
                var $863 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $864 = self.done;
                var $865 = self.term;
                var $866 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $867 = self.name;
                var $868 = self.dref;
                var $869 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $870 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $871 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $872 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $873 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $874 = self.path;
                var $875 = self.expr;
                var $876 = self.name;
                var $877 = self.with;
                var $878 = self.cses;
                var $879 = self.moti;
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
                var $880 = self.value;
                return $880(Bits$nil);
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
    var U16$to_word = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $881 = u16_to_word(self);
                return $881;
        }
    })());
    var Fm$Term$serialize$go = (_term$1 => (_depth$2 => (_init$3 => (_x$4 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $882 = self.name;
                var $883 = self.indx;
                return (() => {
                    var self = ($883 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $883 <= 0n ? 0n : _depth$2 - $883)))));
                                return Bits$0(Bits$0(Bits$1(_name$7(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits($883)));
                                return Bits$0(Bits$1(Bits$0(_name$7(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $884 = self.name;
                return (() => {
                    var _name$6 = a1 => (a1 + (fm_name_to_bits($884)));
                    return Bits$0(Bits$0(Bits$0(_name$6(_x$4))))
                })();
            case 'Fm.Term.typ':
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $885 = self.eras;
                var $886 = self.self;
                var $887 = self.name;
                var $888 = self.xtyp;
                var $889 = self.body;
                return (() => {
                    var _eras$10 = (() => {
                        var self = $885;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$11 = a1 => (a1 + (fm_name_to_bits($886)));
                    var _xtyp$12 = Fm$Term$serialize$go($888)(_depth$2)(_init$3);
                    var _body$13 = Fm$Term$serialize$go($889(Fm$Term$var($886)(_depth$2))(Fm$Term$var($887)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $890 = self.name;
                var $891 = self.body;
                return (() => {
                    var _body$7 = Fm$Term$serialize$go($891(Fm$Term$var($890)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$7(_x$4))))
                })();
            case 'Fm.Term.app':
                var $892 = self.func;
                var $893 = self.argm;
                return (() => {
                    var _func$7 = Fm$Term$serialize$go($892)(_depth$2)(_init$3);
                    var _argm$8 = Fm$Term$serialize$go($893)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$7(_argm$8(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $894 = self.name;
                var $895 = self.expr;
                var $896 = self.body;
                return (() => {
                    var _expr$8 = Fm$Term$serialize$go($895)(_depth$2)(_init$3);
                    var _body$9 = Fm$Term$serialize$go($896(Fm$Term$var($894)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$8(_body$9(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $897 = self.name;
                var $898 = self.expr;
                var $899 = self.body;
                return Fm$Term$serialize$go($899($898))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $900 = self.done;
                var $901 = self.term;
                var $902 = self.type;
                return Fm$Term$serialize$go($901)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $903 = self.name;
                var $904 = self.dref;
                var $905 = self.verb;
                return (() => {
                    var _name$8 = a1 => (a1 + (fm_name_to_bits($903)));
                    return Bits$0(Bits$0(Bits$0(_name$8(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $906 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $907 = self.natx;
                return Bits$0(Bits$0(Bits$0((_x$4 + (nat_to_bits($907))))));
            case 'Fm.Term.chr':
                var $908 = self.chrx;
                return Bits$0(Bits$0(Bits$0((_x$4 + Word$to_bits(U16$to_word($908))))));
            case 'Fm.Term.str':
                var $909 = self.strx;
                return Fm$Term$serialize$go(Fm$Term$unroll_str($909))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $910 = self.path;
                var $911 = self.expr;
                var $912 = self.name;
                var $913 = self.with;
                var $914 = self.cses;
                var $915 = self.moti;
                return _x$4;
        }
    })()))));
    var Fm$Term$serialize = (_term$1 => (_depth$2 => Fm$Term$serialize$go(_term$1)(_depth$2)(_depth$2)(Bits$nil)));
    var Bool$or = a0 => a1 => (a0 || a1);
    var Bits$eql = _a$1 => _b$2 => {
        var Bits$eql = _a$1 => _b$2 => ({
            ctr: 'TCO',
            arg: [_a$1, _b$2]
        });
        var arg = [_a$1, _b$2];
        while (true) {
            let [_a$1, _b$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                    case 'nil':
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$true;
                                case '0':
                                    var $916 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $917 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '0':
                        var $918 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $919 = self.slice(0, -1);
                                    return Bits$eql($918)($919);
                                case '1':
                                    var $920 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '1':
                        var $921 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $922 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $923 = self.slice(0, -1);
                                    return Bits$eql($921)($923);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Set$has = (_bits$1 => (_set$2 => (() => {
        var self = Map$get(_bits$1)(_set$2);
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $924 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $925 = self.name;
                var $926 = self.indx;
                return Fm$Term$var($925)($926);
            case 'Fm.Term.ref':
                var $927 = self.name;
                return Fm$Term$ref($927);
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $928 = self.eras;
                var $929 = self.self;
                var $930 = self.name;
                var $931 = self.xtyp;
                var $932 = self.body;
                return Fm$Term$all($928)($929)($930)(Fm$Term$normalize($931)(_defs$2))((_s$8 => (_x$9 => Fm$Term$normalize($932(_s$8)(_x$9))(_defs$2))));
            case 'Fm.Term.lam':
                var $933 = self.name;
                var $934 = self.body;
                return Fm$Term$lam($933)((_x$5 => Fm$Term$normalize($934(_x$5))(_defs$2)));
            case 'Fm.Term.app':
                var $935 = self.func;
                var $936 = self.argm;
                return Fm$Term$app(Fm$Term$normalize($935)(_defs$2))(Fm$Term$normalize($936)(_defs$2));
            case 'Fm.Term.let':
                var $937 = self.name;
                var $938 = self.expr;
                var $939 = self.body;
                return Fm$Term$let($937)(Fm$Term$normalize($938)(_defs$2))((_x$6 => Fm$Term$normalize($939(_x$6))(_defs$2)));
            case 'Fm.Term.def':
                var $940 = self.name;
                var $941 = self.expr;
                var $942 = self.body;
                return Fm$Term$def($940)(Fm$Term$normalize($941)(_defs$2))((_x$6 => Fm$Term$normalize($942(_x$6))(_defs$2)));
            case 'Fm.Term.ann':
                var $943 = self.done;
                var $944 = self.term;
                var $945 = self.type;
                return Fm$Term$ann($943)(Fm$Term$normalize($944)(_defs$2))(Fm$Term$normalize($945)(_defs$2));
            case 'Fm.Term.gol':
                var $946 = self.name;
                var $947 = self.dref;
                var $948 = self.verb;
                return Fm$Term$gol($946)($947)($948);
            case 'Fm.Term.hol':
                var $949 = self.path;
                return Fm$Term$hol($949);
            case 'Fm.Term.nat':
                var $950 = self.natx;
                return Fm$Term$nat($950);
            case 'Fm.Term.chr':
                var $951 = self.chrx;
                return Fm$Term$chr($951);
            case 'Fm.Term.str':
                var $952 = self.strx;
                return Fm$Term$str($952);
            case 'Fm.Term.cse':
                var $953 = self.path;
                var $954 = self.expr;
                var $955 = self.name;
                var $956 = self.with;
                var $957 = self.cses;
                var $958 = self.moti;
                return _term$1;
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
        var _a1$6 = Fm$Term$reduce(_a$1)(_defs$3);
        var _b1$7 = Fm$Term$reduce(_b$2)(_defs$3);
        var _ah$8 = Fm$Term$serialize(_a1$6)(_lv$4);
        var _bh$9 = Fm$Term$serialize(_b1$7)(_lv$4);
        var _id$10 = (_bh$9 + _ah$8);
        return (() => {
            var self = (Bits$eql(_ah$8)(_bh$9) || Set$has(_id$10)(_seen$5));
            switch (self ? 'true' : 'false') {
                case 'true':
                    return Monad$pure(Fm$Check$monad)(Bool$true);
                case 'false':
                    return (() => {
                        var self = _a1$6;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $959 = self.name;
                                var $960 = self.indx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $961 = self.name;
                                            var $962 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $963 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $964 = self.eras;
                                            var $965 = self.self;
                                            var $966 = self.name;
                                            var $967 = self.xtyp;
                                            var $968 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $969 = self.name;
                                            var $970 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $971 = self.func;
                                            var $972 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $973 = self.name;
                                            var $974 = self.expr;
                                            var $975 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $976 = self.name;
                                            var $977 = self.expr;
                                            var $978 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $979 = self.done;
                                            var $980 = self.term;
                                            var $981 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $982 = self.name;
                                            var $983 = self.dref;
                                            var $984 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $985 = self.path;
                                            return Fm$Term$equal$patch($985)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $986 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $987 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $988 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $989 = self.path;
                                            var $990 = self.expr;
                                            var $991 = self.name;
                                            var $992 = self.with;
                                            var $993 = self.cses;
                                            var $994 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ref':
                                var $995 = self.name;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $996 = self.name;
                                            var $997 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $998 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $999 = self.eras;
                                            var $1000 = self.self;
                                            var $1001 = self.name;
                                            var $1002 = self.xtyp;
                                            var $1003 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1004 = self.name;
                                            var $1005 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1006 = self.func;
                                            var $1007 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1008 = self.name;
                                            var $1009 = self.expr;
                                            var $1010 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1011 = self.name;
                                            var $1012 = self.expr;
                                            var $1013 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1014 = self.done;
                                            var $1015 = self.term;
                                            var $1016 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1017 = self.name;
                                            var $1018 = self.dref;
                                            var $1019 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1020 = self.path;
                                            return Fm$Term$equal$patch($1020)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1021 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1022 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1023 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1024 = self.path;
                                            var $1025 = self.expr;
                                            var $1026 = self.name;
                                            var $1027 = self.with;
                                            var $1028 = self.cses;
                                            var $1029 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.typ':
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1030 = self.name;
                                            var $1031 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1032 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1033 = self.eras;
                                            var $1034 = self.self;
                                            var $1035 = self.name;
                                            var $1036 = self.xtyp;
                                            var $1037 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1038 = self.name;
                                            var $1039 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1040 = self.func;
                                            var $1041 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1042 = self.name;
                                            var $1043 = self.expr;
                                            var $1044 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1045 = self.name;
                                            var $1046 = self.expr;
                                            var $1047 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1048 = self.done;
                                            var $1049 = self.term;
                                            var $1050 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1051 = self.name;
                                            var $1052 = self.dref;
                                            var $1053 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1054 = self.path;
                                            return Fm$Term$equal$patch($1054)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1055 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1056 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1057 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1058 = self.path;
                                            var $1059 = self.expr;
                                            var $1060 = self.name;
                                            var $1061 = self.with;
                                            var $1062 = self.cses;
                                            var $1063 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.all':
                                var $1064 = self.eras;
                                var $1065 = self.self;
                                var $1066 = self.name;
                                var $1067 = self.xtyp;
                                var $1068 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1069 = self.name;
                                            var $1070 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1071 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1072 = self.eras;
                                            var $1073 = self.self;
                                            var $1074 = self.name;
                                            var $1075 = self.xtyp;
                                            var $1076 = self.body;
                                            return (() => {
                                                var _seen$21 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$22 = $1068(Fm$Term$var($1065)(_lv$4))(Fm$Term$var($1066)(Nat$succ(_lv$4)));
                                                var _b1_body$23 = $1076(Fm$Term$var($1073)(_lv$4))(Fm$Term$var($1074)(Nat$succ(_lv$4)));
                                                var _eq_self$24 = ($1065 === $1073);
                                                var _eq_eras$25 = Bool$eql($1064)($1072);
                                                return (() => {
                                                    var self = (_eq_self$24 && _eq_eras$25);
                                                    switch (self ? 'true' : 'false') {
                                                        case 'true':
                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1067)($1075)(_defs$3)(_lv$4)(_seen$21))((_eq_type$26 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$22)(_b1_body$23)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$21))((_eq_body$27 => Monad$pure(Fm$Check$monad)((_eq_type$26 && _eq_body$27))))));
                                                        case 'false':
                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                    }
                                                })()
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1077 = self.name;
                                            var $1078 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1079 = self.func;
                                            var $1080 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1081 = self.name;
                                            var $1082 = self.expr;
                                            var $1083 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1084 = self.name;
                                            var $1085 = self.expr;
                                            var $1086 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1087 = self.done;
                                            var $1088 = self.term;
                                            var $1089 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1090 = self.name;
                                            var $1091 = self.dref;
                                            var $1092 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1093 = self.path;
                                            return Fm$Term$equal$patch($1093)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1094 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1095 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1096 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1097 = self.path;
                                            var $1098 = self.expr;
                                            var $1099 = self.name;
                                            var $1100 = self.with;
                                            var $1101 = self.cses;
                                            var $1102 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.lam':
                                var $1103 = self.name;
                                var $1104 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1105 = self.name;
                                            var $1106 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1107 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1108 = self.eras;
                                            var $1109 = self.self;
                                            var $1110 = self.name;
                                            var $1111 = self.xtyp;
                                            var $1112 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1113 = self.name;
                                            var $1114 = self.body;
                                            return (() => {
                                                var _seen$15 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$16 = $1104(Fm$Term$var($1103)(_lv$4));
                                                var _b1_body$17 = $1114(Fm$Term$var($1113)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$16)(_b1_body$17)(_defs$3)(Nat$succ(_lv$4))(_seen$15))((_eq_body$18 => Monad$pure(Fm$Check$monad)(_eq_body$18)))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1115 = self.func;
                                            var $1116 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1117 = self.name;
                                            var $1118 = self.expr;
                                            var $1119 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1120 = self.name;
                                            var $1121 = self.expr;
                                            var $1122 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1123 = self.done;
                                            var $1124 = self.term;
                                            var $1125 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1126 = self.name;
                                            var $1127 = self.dref;
                                            var $1128 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1129 = self.path;
                                            return Fm$Term$equal$patch($1129)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1130 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1131 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1132 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1133 = self.path;
                                            var $1134 = self.expr;
                                            var $1135 = self.name;
                                            var $1136 = self.with;
                                            var $1137 = self.cses;
                                            var $1138 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.app':
                                var $1139 = self.func;
                                var $1140 = self.argm;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1141 = self.name;
                                            var $1142 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1143 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1144 = self.eras;
                                            var $1145 = self.self;
                                            var $1146 = self.name;
                                            var $1147 = self.xtyp;
                                            var $1148 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1149 = self.name;
                                            var $1150 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1151 = self.func;
                                            var $1152 = self.argm;
                                            return (() => {
                                                var _seen$15 = Set$set(_id$10)(_seen$5);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1139)($1151)(_defs$3)(_lv$4)(_seen$15))((_eq_func$16 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1140)($1152)(_defs$3)(_lv$4)(_seen$15))((_eq_argm$17 => Monad$pure(Fm$Check$monad)((_eq_func$16 && _eq_argm$17))))))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1153 = self.name;
                                            var $1154 = self.expr;
                                            var $1155 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1156 = self.name;
                                            var $1157 = self.expr;
                                            var $1158 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1159 = self.done;
                                            var $1160 = self.term;
                                            var $1161 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1162 = self.name;
                                            var $1163 = self.dref;
                                            var $1164 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1165 = self.path;
                                            return Fm$Term$equal$patch($1165)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1166 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1167 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1168 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1169 = self.path;
                                            var $1170 = self.expr;
                                            var $1171 = self.name;
                                            var $1172 = self.with;
                                            var $1173 = self.cses;
                                            var $1174 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.let':
                                var $1175 = self.name;
                                var $1176 = self.expr;
                                var $1177 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1178 = self.name;
                                            var $1179 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1180 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1181 = self.eras;
                                            var $1182 = self.self;
                                            var $1183 = self.name;
                                            var $1184 = self.xtyp;
                                            var $1185 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1186 = self.name;
                                            var $1187 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1188 = self.func;
                                            var $1189 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1190 = self.name;
                                            var $1191 = self.expr;
                                            var $1192 = self.body;
                                            return (() => {
                                                var _seen$17 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$18 = $1177(Fm$Term$var($1175)(_lv$4));
                                                var _b1_body$19 = $1192(Fm$Term$var($1190)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1176)($1191)(_defs$3)(_lv$4)(_seen$17))((_eq_expr$20 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$21 => Monad$pure(Fm$Check$monad)((_eq_expr$20 && _eq_body$21))))))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1193 = self.name;
                                            var $1194 = self.expr;
                                            var $1195 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1196 = self.done;
                                            var $1197 = self.term;
                                            var $1198 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1199 = self.name;
                                            var $1200 = self.dref;
                                            var $1201 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1202 = self.path;
                                            return Fm$Term$equal$patch($1202)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1203 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1204 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1205 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1206 = self.path;
                                            var $1207 = self.expr;
                                            var $1208 = self.name;
                                            var $1209 = self.with;
                                            var $1210 = self.cses;
                                            var $1211 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.def':
                                var $1212 = self.name;
                                var $1213 = self.expr;
                                var $1214 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1215 = self.name;
                                            var $1216 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1217 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1218 = self.eras;
                                            var $1219 = self.self;
                                            var $1220 = self.name;
                                            var $1221 = self.xtyp;
                                            var $1222 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1223 = self.name;
                                            var $1224 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1225 = self.func;
                                            var $1226 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1227 = self.name;
                                            var $1228 = self.expr;
                                            var $1229 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1230 = self.name;
                                            var $1231 = self.expr;
                                            var $1232 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1233 = self.done;
                                            var $1234 = self.term;
                                            var $1235 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1236 = self.name;
                                            var $1237 = self.dref;
                                            var $1238 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1239 = self.path;
                                            return Fm$Term$equal$patch($1239)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1240 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1241 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1242 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1243 = self.path;
                                            var $1244 = self.expr;
                                            var $1245 = self.name;
                                            var $1246 = self.with;
                                            var $1247 = self.cses;
                                            var $1248 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ann':
                                var $1249 = self.done;
                                var $1250 = self.term;
                                var $1251 = self.type;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1252 = self.name;
                                            var $1253 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1254 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1255 = self.eras;
                                            var $1256 = self.self;
                                            var $1257 = self.name;
                                            var $1258 = self.xtyp;
                                            var $1259 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1260 = self.name;
                                            var $1261 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1262 = self.func;
                                            var $1263 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1264 = self.name;
                                            var $1265 = self.expr;
                                            var $1266 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1267 = self.name;
                                            var $1268 = self.expr;
                                            var $1269 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1270 = self.done;
                                            var $1271 = self.term;
                                            var $1272 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1273 = self.name;
                                            var $1274 = self.dref;
                                            var $1275 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1276 = self.path;
                                            return Fm$Term$equal$patch($1276)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1277 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1278 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1279 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1280 = self.path;
                                            var $1281 = self.expr;
                                            var $1282 = self.name;
                                            var $1283 = self.with;
                                            var $1284 = self.cses;
                                            var $1285 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.gol':
                                var $1286 = self.name;
                                var $1287 = self.dref;
                                var $1288 = self.verb;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1289 = self.name;
                                            var $1290 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1291 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1292 = self.eras;
                                            var $1293 = self.self;
                                            var $1294 = self.name;
                                            var $1295 = self.xtyp;
                                            var $1296 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1297 = self.name;
                                            var $1298 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1299 = self.func;
                                            var $1300 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1301 = self.name;
                                            var $1302 = self.expr;
                                            var $1303 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1304 = self.name;
                                            var $1305 = self.expr;
                                            var $1306 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1307 = self.done;
                                            var $1308 = self.term;
                                            var $1309 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1310 = self.name;
                                            var $1311 = self.dref;
                                            var $1312 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1313 = self.path;
                                            return Fm$Term$equal$patch($1313)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1314 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1315 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1316 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1317 = self.path;
                                            var $1318 = self.expr;
                                            var $1319 = self.name;
                                            var $1320 = self.with;
                                            var $1321 = self.cses;
                                            var $1322 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.hol':
                                var $1323 = self.path;
                                return Fm$Term$equal$patch($1323)(_b$2);
                            case 'Fm.Term.nat':
                                var $1324 = self.natx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1325 = self.name;
                                            var $1326 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1327 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1328 = self.eras;
                                            var $1329 = self.self;
                                            var $1330 = self.name;
                                            var $1331 = self.xtyp;
                                            var $1332 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1333 = self.name;
                                            var $1334 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1335 = self.func;
                                            var $1336 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1337 = self.name;
                                            var $1338 = self.expr;
                                            var $1339 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1340 = self.name;
                                            var $1341 = self.expr;
                                            var $1342 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1343 = self.done;
                                            var $1344 = self.term;
                                            var $1345 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1346 = self.name;
                                            var $1347 = self.dref;
                                            var $1348 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1349 = self.path;
                                            return Fm$Term$equal$patch($1349)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1350 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1351 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1352 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1353 = self.path;
                                            var $1354 = self.expr;
                                            var $1355 = self.name;
                                            var $1356 = self.with;
                                            var $1357 = self.cses;
                                            var $1358 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.chr':
                                var $1359 = self.chrx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1360 = self.name;
                                            var $1361 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1362 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1363 = self.eras;
                                            var $1364 = self.self;
                                            var $1365 = self.name;
                                            var $1366 = self.xtyp;
                                            var $1367 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1368 = self.name;
                                            var $1369 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1370 = self.func;
                                            var $1371 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1372 = self.name;
                                            var $1373 = self.expr;
                                            var $1374 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1375 = self.name;
                                            var $1376 = self.expr;
                                            var $1377 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1378 = self.done;
                                            var $1379 = self.term;
                                            var $1380 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1381 = self.name;
                                            var $1382 = self.dref;
                                            var $1383 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1384 = self.path;
                                            return Fm$Term$equal$patch($1384)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1385 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1386 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1387 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1388 = self.path;
                                            var $1389 = self.expr;
                                            var $1390 = self.name;
                                            var $1391 = self.with;
                                            var $1392 = self.cses;
                                            var $1393 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.str':
                                var $1394 = self.strx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1395 = self.name;
                                            var $1396 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1397 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1398 = self.eras;
                                            var $1399 = self.self;
                                            var $1400 = self.name;
                                            var $1401 = self.xtyp;
                                            var $1402 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1403 = self.name;
                                            var $1404 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1405 = self.func;
                                            var $1406 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1407 = self.name;
                                            var $1408 = self.expr;
                                            var $1409 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1410 = self.name;
                                            var $1411 = self.expr;
                                            var $1412 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1413 = self.done;
                                            var $1414 = self.term;
                                            var $1415 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1416 = self.name;
                                            var $1417 = self.dref;
                                            var $1418 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1419 = self.path;
                                            return Fm$Term$equal$patch($1419)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1420 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1421 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1422 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1423 = self.path;
                                            var $1424 = self.expr;
                                            var $1425 = self.name;
                                            var $1426 = self.with;
                                            var $1427 = self.cses;
                                            var $1428 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.cse':
                                var $1429 = self.path;
                                var $1430 = self.expr;
                                var $1431 = self.name;
                                var $1432 = self.with;
                                var $1433 = self.cses;
                                var $1434 = self.moti;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1435 = self.name;
                                            var $1436 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1437 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1438 = self.eras;
                                            var $1439 = self.self;
                                            var $1440 = self.name;
                                            var $1441 = self.xtyp;
                                            var $1442 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1443 = self.name;
                                            var $1444 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1445 = self.func;
                                            var $1446 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1447 = self.name;
                                            var $1448 = self.expr;
                                            var $1449 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1450 = self.name;
                                            var $1451 = self.expr;
                                            var $1452 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1453 = self.done;
                                            var $1454 = self.term;
                                            var $1455 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1456 = self.name;
                                            var $1457 = self.dref;
                                            var $1458 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1459 = self.path;
                                            return Fm$Term$equal$patch($1459)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1460 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1461 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1462 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1463 = self.path;
                                            var $1464 = self.expr;
                                            var $1465 = self.name;
                                            var $1466 = self.with;
                                            var $1467 = self.cses;
                                            var $1468 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                        }
                    })();
            }
        })()
    })())))));
    var Set$new = Map$new;
    var Fm$Term$check = (_term$1 => (_type$2 => (_defs$3 => (_ctx$4 => (_path$5 => Monad$bind(Fm$Check$monad)((() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1469 = self.name;
                var $1470 = self.indx;
                return (() => {
                    var self = List$at_last($1470)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1469))(List$nil));
                        case 'Maybe.some':
                            var $1471 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1471;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1472 = self.fst;
                                        var $1473 = self.snd;
                                        return $1473;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1474 = self.name;
                return (() => {
                    var self = Fm$get($1474)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1474))(List$nil));
                        case 'Maybe.some':
                            var $1475 = self.value;
                            return (() => {
                                var self = $1475;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1476 = self.name;
                                        var $1477 = self.term;
                                        var $1478 = self.type;
                                        var $1479 = self.stat;
                                        return (() => {
                                            var _ref_name$12 = $1476;
                                            var _ref_type$13 = $1478;
                                            var _ref_term$14 = $1477;
                                            var _ref_stat$15 = $1479;
                                            return (() => {
                                                var self = _ref_stat$15;
                                                switch (self._) {
                                                    case 'Fm.Status.init':
                                                        return Fm$Check$result(Maybe$some(_ref_type$13))(List$cons(Fm$Error$waiting(_ref_name$12))(List$nil));
                                                    case 'Fm.Status.wait':
                                                        return Fm$Check$result(Maybe$some(_ref_type$13))(List$nil);
                                                    case 'Fm.Status.done':
                                                        return Fm$Check$result(Maybe$some(_ref_type$13))(List$nil);
                                                    case 'Fm.Status.fail':
                                                        var $1480 = self.errors;
                                                        return Fm$Check$result(Maybe$some(_ref_type$13))(List$cons(Fm$Error$indirect(_ref_name$12))(List$nil));
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
                var $1481 = self.eras;
                var $1482 = self.self;
                var $1483 = self.name;
                var $1484 = self.xtyp;
                var $1485 = self.body;
                return (() => {
                    var _ctx_size$11 = List$length(_ctx$4);
                    var _self_var$12 = Fm$Term$var($1482)(_ctx_size$11);
                    var _body_var$13 = Fm$Term$var($1483)(Nat$succ(_ctx_size$11));
                    var _body_ctx$14 = List$cons(Pair$new($1483)($1484))(List$cons(Pair$new($1482)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1484)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$15 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1485(_self_var$12)(_body_var$13))(Maybe$some(Fm$Term$typ))(_defs$3)(_body_ctx$14)(Fm$MPath$1(_path$5)))((_$16 => Monad$pure(Fm$Check$monad)(Fm$Term$typ)))))
                })();
            case 'Fm.Term.lam':
                var $1486 = self.name;
                var $1487 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1488 = self.value;
                            return (() => {
                                var _typv$9 = Fm$Term$reduce($1488)(_defs$3);
                                return (() => {
                                    var self = _typv$9;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1489 = self.name;
                                            var $1490 = self.indx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1491 = self.name;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            return (() => {
                                                var _expected$10 = Either$left("Function");
                                                var _detected$11 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$10)(_detected$11)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1492 = self.eras;
                                            var $1493 = self.self;
                                            var $1494 = self.name;
                                            var $1495 = self.xtyp;
                                            var $1496 = self.body;
                                            return (() => {
                                                var _ctx_size$15 = List$length(_ctx$4);
                                                var _self_var$16 = _term$1;
                                                var _body_var$17 = Fm$Term$var($1486)(_ctx_size$15);
                                                var _body_typ$18 = $1496(_self_var$16)(_body_var$17);
                                                var _body_ctx$19 = List$cons(Pair$new($1486)($1495))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1487(_body_var$17))(Maybe$some(_body_typ$18))(_defs$3)(_body_ctx$19)(Fm$MPath$0(_path$5)))((_$20 => Monad$pure(Fm$Check$monad)($1488)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1497 = self.name;
                                            var $1498 = self.body;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1499 = self.func;
                                            var $1500 = self.argm;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1501 = self.name;
                                            var $1502 = self.expr;
                                            var $1503 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1504 = self.name;
                                            var $1505 = self.expr;
                                            var $1506 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1507 = self.done;
                                            var $1508 = self.term;
                                            var $1509 = self.type;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1510 = self.name;
                                            var $1511 = self.dref;
                                            var $1512 = self.verb;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1513 = self.path;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1514 = self.natx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1515 = self.chrx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1516 = self.strx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1517 = self.path;
                                            var $1518 = self.expr;
                                            var $1519 = self.name;
                                            var $1520 = self.with;
                                            var $1521 = self.cses;
                                            var $1522 = self.moti;
                                            return (() => {
                                                var _expected$16 = Either$left("Function");
                                                var _detected$17 = Either$right($1488);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$16)(_detected$17)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1523 = self.func;
                var $1524 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1523)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_func_typ$8 => (() => {
                    var _func_typ$9 = Fm$Term$reduce(_func_typ$8)(_defs$3);
                    return (() => {
                        var self = _func_typ$9;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1525 = self.name;
                                var $1526 = self.indx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1527 = self.name;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.typ':
                                return (() => {
                                    var _expected$10 = Either$left("Function");
                                    var _detected$11 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$10)(_detected$11)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.all':
                                var $1528 = self.eras;
                                var $1529 = self.self;
                                var $1530 = self.name;
                                var $1531 = self.xtyp;
                                var $1532 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1524)(Maybe$some($1531))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$15 => Monad$pure(Fm$Check$monad)($1532($1523)($1524))));
                            case 'Fm.Term.lam':
                                var $1533 = self.name;
                                var $1534 = self.body;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1535 = self.func;
                                var $1536 = self.argm;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $1537 = self.name;
                                var $1538 = self.expr;
                                var $1539 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $1540 = self.name;
                                var $1541 = self.expr;
                                var $1542 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $1543 = self.done;
                                var $1544 = self.term;
                                var $1545 = self.type;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $1546 = self.name;
                                var $1547 = self.dref;
                                var $1548 = self.verb;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $1549 = self.path;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $1550 = self.natx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $1551 = self.chrx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $1552 = self.strx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $1553 = self.path;
                                var $1554 = self.expr;
                                var $1555 = self.name;
                                var $1556 = self.with;
                                var $1557 = self.cses;
                                var $1558 = self.moti;
                                return (() => {
                                    var _expected$16 = Either$left("Function");
                                    var _detected$17 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$16)(_detected$17)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $1559 = self.name;
                var $1560 = self.expr;
                var $1561 = self.body;
                return (() => {
                    var _ctx_size$9 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1560)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_expr_typ$10 => (() => {
                        var _body_val$11 = $1561(Fm$Term$var($1559)(_ctx_size$9));
                        var _body_ctx$12 = List$cons(Pair$new($1559)(_expr_typ$10))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$11)(_type$2)(_defs$3)(_body_ctx$12)(Fm$MPath$1(_path$5)))((_body_typ$13 => Monad$pure(Fm$Check$monad)(_body_typ$13)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $1562 = self.name;
                var $1563 = self.expr;
                var $1564 = self.body;
                return Fm$Term$check($1564($1563))(_type$2)(_defs$3)(_ctx$4)(_path$5);
            case 'Fm.Term.ann':
                var $1565 = self.done;
                var $1566 = self.term;
                var $1567 = self.type;
                return (() => {
                    var self = $1565;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1567);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($1566)(Maybe$some($1567))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$9 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1567)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$10 => Monad$pure(Fm$Check$monad)($1567)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $1568 = self.name;
                var $1569 = self.dref;
                var $1570 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($1568)($1569)($1570)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $1571 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $1572 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Nat"));
            case 'Fm.Term.chr':
                var $1573 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Char"));
            case 'Fm.Term.str':
                var $1574 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("String"));
            case 'Fm.Term.cse':
                var $1575 = self.path;
                var $1576 = self.expr;
                var $1577 = self.name;
                var $1578 = self.with;
                var $1579 = self.cses;
                var $1580 = self.moti;
                return (() => {
                    var _expr$12 = $1576;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$12)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_etyp$13 => (() => {
                        var _dsug$14 = Fm$Term$desugar_cse($1576)($1577)($1578)($1579)($1580)(_etyp$13)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$14;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $1581 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($1581))(List$nil));
                            }
                        })()
                    })()))
                })();
        }
    })())((_infr$6 => (() => {
        var self = _type$2;
        switch (self._) {
            case 'Maybe.none':
                return Fm$Check$result(Maybe$some(_infr$6))(List$nil);
            case 'Maybe.some':
                var $1582 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1582)(_infr$6)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$8 => (() => {
                    var self = _eqls$8;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1582);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(Either$right($1582))(Either$right(_infr$6))(_ctx$4))(List$nil));
                    }
                })()));
        }
    })())))))));
    var Fm$Path$nil = (_x$1 => _x$1);
    var Fm$MPath$nil = Maybe$some(Fm$Path$nil);
    var List$is_empty = (_list$2 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return Bool$true;
            case 'List.cons':
                var $1583 = self.head;
                var $1584 = self.tail;
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
                var $1585 = self.name;
                var $1586 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1587 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1588 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $1589 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1590 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1591 = self.slice(0, -1);
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
                            var $1592 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1593 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $1594 = self.eras;
                var $1595 = self.self;
                var $1596 = self.name;
                var $1597 = self.xtyp;
                var $1598 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1599 = self.slice(0, -1);
                            return Fm$Term$all($1594)($1595)($1596)(Fm$Term$patch_at($1599)($1597)(_fn$3))($1598);
                        case '1':
                            var $1600 = self.slice(0, -1);
                            return Fm$Term$all($1594)($1595)($1596)($1597)((_s$10 => (_x$11 => Fm$Term$patch_at($1600)($1598(_s$10)(_x$11))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $1601 = self.name;
                var $1602 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1603 = self.slice(0, -1);
                            return Fm$Term$lam($1601)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1602(_x$7))(_fn$3)));
                        case '1':
                            var $1604 = self.slice(0, -1);
                            return Fm$Term$lam($1601)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1602(_x$7))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $1605 = self.func;
                var $1606 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1607 = self.slice(0, -1);
                            return Fm$Term$app(Fm$Term$patch_at($1607)($1605)(_fn$3))($1606);
                        case '1':
                            var $1608 = self.slice(0, -1);
                            return Fm$Term$app($1605)(Fm$Term$patch_at($1608)($1606)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $1609 = self.name;
                var $1610 = self.expr;
                var $1611 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1612 = self.slice(0, -1);
                            return Fm$Term$let($1609)(Fm$Term$patch_at($1612)($1610)(_fn$3))($1611);
                        case '1':
                            var $1613 = self.slice(0, -1);
                            return Fm$Term$let($1609)($1610)((_x$8 => Fm$Term$patch_at($1613)($1611(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $1614 = self.name;
                var $1615 = self.expr;
                var $1616 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1617 = self.slice(0, -1);
                            return Fm$Term$def($1614)(Fm$Term$patch_at($1617)($1615)(_fn$3))($1616);
                        case '1':
                            var $1618 = self.slice(0, -1);
                            return Fm$Term$def($1614)($1615)((_x$8 => Fm$Term$patch_at($1618)($1616(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $1619 = self.done;
                var $1620 = self.term;
                var $1621 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1622 = self.slice(0, -1);
                            return Fm$Term$ann($1619)(Fm$Term$patch_at(_path$1)($1620)(_fn$3))($1621);
                        case '1':
                            var $1623 = self.slice(0, -1);
                            return Fm$Term$ann($1619)(Fm$Term$patch_at(_path$1)($1620)(_fn$3))($1621);
                    }
                })();
            case 'Fm.Term.gol':
                var $1624 = self.name;
                var $1625 = self.dref;
                var $1626 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1627 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1628 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $1629 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1630 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1631 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $1632 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1633 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1634 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $1635 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1636 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1637 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $1638 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1639 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1640 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $1641 = self.path;
                var $1642 = self.expr;
                var $1643 = self.name;
                var $1644 = self.with;
                var $1645 = self.cses;
                var $1646 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1647 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1648 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
        }
    })())));
    var Fm$Synth$fix = _name$1 => _term$2 => _type$3 => _defs$4 => _errs$5 => _fixd$6 => {
        var Fm$Synth$fix = _name$1 => _term$2 => _type$3 => _defs$4 => _errs$5 => _fixd$6 => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _type$3, _defs$4, _errs$5, _fixd$6]
        });
        var arg = [_name$1, _term$2, _type$3, _defs$4, _errs$5, _fixd$6];
        while (true) {
            let [_name$1, _term$2, _type$3, _defs$4, _errs$5, _fixd$6] = arg;
            var R = (() => {
                var self = _errs$5;
                switch (self._) {
                    case 'List.nil':
                        return (() => {
                            var self = _fixd$6;
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return (() => {
                                        var _type$7 = Fm$Term$bind(List$nil)((_x$7 => Bits$1(_x$7)))(_type$3);
                                        var _term$8 = Fm$Term$bind(List$nil)((_x$8 => Bits$0(_x$8)))(_term$2);
                                        var _defs$9 = Fm$set(_name$1)(Fm$Def$new(_name$1)(_term$8)(_type$7)(Fm$Status$init))(_defs$4);
                                        return Maybe$some(_defs$9)
                                    })();
                                case 'false':
                                    return Maybe$none;
                            }
                        })();
                    case 'List.cons':
                        var $1649 = self.head;
                        var $1650 = self.tail;
                        return (() => {
                            var self = $1649;
                            switch (self._) {
                                case 'Fm.Error.type_mismatch':
                                    var $1651 = self.expected;
                                    var $1652 = self.detected;
                                    var $1653 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($1650)(_fixd$6);
                                case 'Fm.Error.show_goal':
                                    var $1654 = self.name;
                                    var $1655 = self.dref;
                                    var $1656 = self.verb;
                                    var $1657 = self.goal;
                                    var $1658 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($1650)(_fixd$6);
                                case 'Fm.Error.waiting':
                                    var $1659 = self.name;
                                    return (() => {
                                        var _defs$10 = Fm$Synth$one($1659)(_defs$4);
                                        return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$10)($1650)(Bool$true)
                                    })();
                                case 'Fm.Error.indirect':
                                    var $1660 = self.name;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($1650)(_fixd$6);
                                case 'Fm.Error.patch':
                                    var $1661 = self.path;
                                    var $1662 = self.term;
                                    return (() => {
                                        var self = $1661;
                                        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                            case 'nil':
                                                return Maybe$none;
                                            case '0':
                                                var $1663 = self.slice(0, -1);
                                                return (() => {
                                                    var _term$12 = Fm$Term$patch_at($1663)(_term$2)((_x$12 => $1662));
                                                    return Fm$Synth$fix(_name$1)(_term$12)(_type$3)(_defs$4)($1650)(Bool$true)
                                                })();
                                            case '1':
                                                var $1664 = self.slice(0, -1);
                                                return (() => {
                                                    var _type$12 = Fm$Term$patch_at($1664)(_type$3)((_x$12 => $1662));
                                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$12)(_defs$4)($1650)(Bool$true)
                                                })();
                                        }
                                    })();
                                case 'Fm.Error.undefined_reference':
                                    var $1665 = self.name;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($1650)(_fixd$6);
                                case 'Fm.Error.cant_infer':
                                    var $1666 = self.term;
                                    var $1667 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($1650)(_fixd$6);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Status$fail = (_errors$1 => ({
        _: 'Fm.Status.fail',
        'errors': _errors$1
    }));
    var Fm$Synth$one = _name$1 => _defs$2 => {
        var Fm$Synth$one = _name$1 => _defs$2 => ({
            ctr: 'TCO',
            arg: [_name$1, _defs$2]
        });
        var arg = [_name$1, _defs$2];
        while (true) {
            let [_name$1, _defs$2] = arg;
            var R = (() => {
                var self = Fm$get(_name$1)(_defs$2);
                switch (self._) {
                    case 'Maybe.none':
                        return _defs$2;
                    case 'Maybe.some':
                        var $1668 = self.value;
                        return (() => {
                            var self = $1668;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $1669 = self.name;
                                    var $1670 = self.term;
                                    var $1671 = self.type;
                                    var $1672 = self.stat;
                                    return (() => {
                                        var _name$8 = $1669;
                                        var _term$9 = $1670;
                                        var _type$10 = $1671;
                                        var _stat$11 = $1672;
                                        return (() => {
                                            var self = _stat$11;
                                            switch (self._) {
                                                case 'Fm.Status.init':
                                                    return (() => {
                                                        var _defs$12 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(Fm$Status$wait))(_defs$2);
                                                        var _checked$13 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$10)(Maybe$some(Fm$Term$typ))(_defs$12)(List$nil)(Fm$MPath$1(Fm$MPath$nil)))((_chk_type$13 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$9)(Maybe$some(_type$10))(_defs$12)(List$nil)(Fm$MPath$0(Fm$MPath$nil)))((_chk_term$14 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                        return (() => {
                                                            var self = _checked$13;
                                                            switch (self._) {
                                                                case 'Fm.Check.result':
                                                                    var $1673 = self.value;
                                                                    var $1674 = self.errors;
                                                                    return (() => {
                                                                        var self = List$is_empty($1674);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return (() => {
                                                                                    var _defs$16 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(Fm$Status$done))(_defs$12);
                                                                                    return _defs$16
                                                                                })();
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var _fixed$16 = Fm$Synth$fix(_name$8)(_term$9)(_type$10)(_defs$12)($1674)(Bool$false);
                                                                                    return (() => {
                                                                                        var self = _fixed$16;
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return (() => {
                                                                                                    var _stat$17 = Fm$Status$fail($1674);
                                                                                                    var _defs$18 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(_stat$17))(_defs$12);
                                                                                                    return _defs$18
                                                                                                })();
                                                                                            case 'Maybe.some':
                                                                                                var $1675 = self.value;
                                                                                                return Fm$Synth$one(_name$8)($1675);
                                                                                        }
                                                                                    })()
                                                                                })();
                                                                        }
                                                                    })();
                                                            }
                                                        })()
                                                    })();
                                                case 'Fm.Status.wait':
                                                    return _defs$2;
                                                case 'Fm.Status.done':
                                                    return _defs$2;
                                                case 'Fm.Status.fail':
                                                    var $1676 = self.errors;
                                                    return _defs$2;
                                            }
                                        })()
                                    })();
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Synth$all = (_defs$1 => (() => {
        var _defs$2 = (list_for(Map$values(_defs$1))(_defs$1)((_def$2 => (_defs$3 => (() => {
            var self = _def$2;
            switch (self._) {
                case 'Fm.Def.new':
                    var $1677 = self.name;
                    var $1678 = self.term;
                    var $1679 = self.type;
                    var $1680 = self.stat;
                    return (() => {
                        var _name$8 = $1677;
                        var _term$9 = $1678;
                        var _type$10 = $1679;
                        var _stat$11 = $1680;
                        return Fm$Synth$one(_name$8)(_defs$3)
                    })();
            }
        })()))));
        return _defs$2
    })());
    var Fm$to_core_all = (_code$1 => Fm$exec((_defs$2 => Fm$Defs$core(Fm$Synth$all(_defs$2))))(_code$1));
    var Fm$to_core_one = (_code$1 => (_name$2 => Fm$exec((_defs$3 => Fm$Defs$core(Fm$Synth$one(_name$2)(_defs$3))))(_code$1)));
    var Maybe$bind = (_m$3 => (_f$4 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $1681 = self.value;
                return _f$4($1681);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1682 = self.name;
                var $1683 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1684 = self.name;
                return (() => {
                    var self = ($1684 === "Nat.zero");
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
                var $1685 = self.eras;
                var $1686 = self.self;
                var $1687 = self.name;
                var $1688 = self.xtyp;
                var $1689 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $1690 = self.name;
                var $1691 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1692 = self.func;
                var $1693 = self.argm;
                return (() => {
                    var self = $1692;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $1694 = self.name;
                            var $1695 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $1696 = self.name;
                            return (() => {
                                var self = ($1696 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($1693))((_pred$5 => Monad$pure(Maybe$monad)(Nat$succ(_pred$5))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $1697 = self.eras;
                            var $1698 = self.self;
                            var $1699 = self.name;
                            var $1700 = self.xtyp;
                            var $1701 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $1702 = self.name;
                            var $1703 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $1704 = self.func;
                            var $1705 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $1706 = self.name;
                            var $1707 = self.expr;
                            var $1708 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $1709 = self.name;
                            var $1710 = self.expr;
                            var $1711 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $1712 = self.done;
                            var $1713 = self.term;
                            var $1714 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $1715 = self.name;
                            var $1716 = self.dref;
                            var $1717 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $1718 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $1719 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $1720 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $1721 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $1722 = self.path;
                            var $1723 = self.expr;
                            var $1724 = self.name;
                            var $1725 = self.with;
                            var $1726 = self.cses;
                            var $1727 = self.moti;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $1728 = self.name;
                var $1729 = self.expr;
                var $1730 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1731 = self.name;
                var $1732 = self.expr;
                var $1733 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1734 = self.done;
                var $1735 = self.term;
                var $1736 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1737 = self.name;
                var $1738 = self.dref;
                var $1739 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1740 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1741 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1742 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1743 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1744 = self.path;
                var $1745 = self.expr;
                var $1746 = self.name;
                var $1747 = self.with;
                var $1748 = self.cses;
                var $1749 = self.moti;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1750 = self.name;
                var $1751 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $1752 = self.name;
                return (_name$2 === $1752);
            case 'Fm.Term.typ':
                return Bool$false;
            case 'Fm.Term.all':
                var $1753 = self.eras;
                var $1754 = self.self;
                var $1755 = self.name;
                var $1756 = self.xtyp;
                var $1757 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $1758 = self.name;
                var $1759 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $1760 = self.func;
                var $1761 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $1762 = self.name;
                var $1763 = self.expr;
                var $1764 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $1765 = self.name;
                var $1766 = self.expr;
                var $1767 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $1768 = self.done;
                var $1769 = self.term;
                var $1770 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $1771 = self.name;
                var $1772 = self.dref;
                var $1773 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $1774 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $1775 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $1776 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $1777 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $1778 = self.path;
                var $1779 = self.expr;
                var $1780 = self.name;
                var $1781 = self.with;
                var $1782 = self.cses;
                var $1783 = self.moti;
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
                        var $1784 = self.name;
                        var $1785 = self.indx;
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
                                                        var $1786 = self.charCodeAt(0);
                                                        var $1787 = self.slice(1);
                                                        return ($1786 === 40);
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
                        var $1788 = self.name;
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
                                                        var $1789 = self.charCodeAt(0);
                                                        var $1790 = self.slice(1);
                                                        return ($1789 === 40);
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
                                                        var $1791 = self.charCodeAt(0);
                                                        var $1792 = self.slice(1);
                                                        return ($1791 === 40);
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
                        var $1793 = self.eras;
                        var $1794 = self.self;
                        var $1795 = self.name;
                        var $1796 = self.xtyp;
                        var $1797 = self.body;
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
                                                        var $1798 = self.charCodeAt(0);
                                                        var $1799 = self.slice(1);
                                                        return ($1798 === 40);
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
                        var $1800 = self.name;
                        var $1801 = self.body;
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
                                                        var $1802 = self.charCodeAt(0);
                                                        var $1803 = self.slice(1);
                                                        return ($1802 === 40);
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
                        var $1804 = self.func;
                        var $1805 = self.argm;
                        return (() => {
                            var _argm$6 = Fm$Term$show$go($1805)(Fm$MPath$1(_path$2));
                            return Fm$Term$show$app($1804)(Fm$MPath$0(_path$2))(List$cons(_argm$6)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $1806 = self.name;
                        var $1807 = self.expr;
                        var $1808 = self.body;
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
                                                        var $1809 = self.charCodeAt(0);
                                                        var $1810 = self.slice(1);
                                                        return ($1809 === 40);
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
                        var $1811 = self.name;
                        var $1812 = self.expr;
                        var $1813 = self.body;
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
                                                        var $1814 = self.charCodeAt(0);
                                                        var $1815 = self.slice(1);
                                                        return ($1814 === 40);
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
                        var $1816 = self.done;
                        var $1817 = self.term;
                        var $1818 = self.type;
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
                                                        var $1819 = self.charCodeAt(0);
                                                        var $1820 = self.slice(1);
                                                        return ($1819 === 40);
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
                        var $1821 = self.name;
                        var $1822 = self.dref;
                        var $1823 = self.verb;
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
                                                        var $1824 = self.charCodeAt(0);
                                                        var $1825 = self.slice(1);
                                                        return ($1824 === 40);
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
                        var $1826 = self.path;
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
                                                        var $1827 = self.charCodeAt(0);
                                                        var $1828 = self.slice(1);
                                                        return ($1827 === 40);
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
                        var $1829 = self.natx;
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
                                                        var $1830 = self.charCodeAt(0);
                                                        var $1831 = self.slice(1);
                                                        return ($1830 === 40);
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
                        var $1832 = self.chrx;
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
                                                        var $1833 = self.charCodeAt(0);
                                                        var $1834 = self.slice(1);
                                                        return ($1833 === 40);
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
                        var $1835 = self.strx;
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
                                                        var $1836 = self.charCodeAt(0);
                                                        var $1837 = self.slice(1);
                                                        return ($1836 === 40);
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
                        var $1838 = self.path;
                        var $1839 = self.expr;
                        var $1840 = self.name;
                        var $1841 = self.with;
                        var $1842 = self.cses;
                        var $1843 = self.moti;
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
                                                        var $1844 = self.charCodeAt(0);
                                                        var $1845 = self.slice(1);
                                                        return ($1844 === 40);
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
                var $1846 = self.val;
                var $1847 = self.lft;
                var $1848 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $1846;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $1849 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($1849))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($1847)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($1848)(Bits$1(_key$3))(_list1$9);
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
                var $1850 = self.slice(0, -1);
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
                            var $1851 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($1850)($1851)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $1852 = self.slice(0, -1);
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
                            var $1853 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($1852)($1853)(_chunk$7)
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
                var $1854 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($1854)(Bits$nil));
                        case '0':
                            var $1855 = self.slice(0, -1);
                            return Word$0(Word$from_bits($1854)($1855));
                        case '1':
                            var $1856 = self.slice(0, -1);
                            return Word$1(Word$from_bits($1854)($1856));
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
                var $1857 = self.fst;
                var $1858 = self.snd;
                return $1857;
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
                            var $1859 = self.name;
                            var $1860 = self.indx;
                            return Fm$Name$show($1859);
                        case 'Fm.Term.ref':
                            var $1861 = self.name;
                            return (() => {
                                var _name$4 = Fm$Name$show($1861);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$4;
                                        case 'Maybe.some':
                                            var $1862 = self.value;
                                            return (() => {
                                                var _path_val$6 = (Bits$1(Bits$nil) + Fm$Path$to_bits($1862));
                                                var _path_str$7 = Nat$show(Bits$to_nat(_path_val$6));
                                                return String$flatten(List$cons(_name$4)(List$cons(String$color("2")(("-" + _path_str$7)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            return "Type";
                        case 'Fm.Term.all':
                            var $1863 = self.eras;
                            var $1864 = self.self;
                            var $1865 = self.name;
                            var $1866 = self.xtyp;
                            var $1867 = self.body;
                            return (() => {
                                var _eras$8 = $1863;
                                var _self$9 = Fm$Name$show($1864);
                                var _name$10 = Fm$Name$show($1865);
                                var _type$11 = Fm$Term$show$go($1866)(Fm$MPath$0(_path$2));
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
                                var _body$14 = Fm$Term$show$go($1867(Fm$Term$var($1864)(0n))(Fm$Term$var($1865)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$9)(List$cons(_open$12)(List$cons(_name$10)(List$cons(":")(List$cons(_type$11)(List$cons(_clos$13)(List$cons(" ")(List$cons(_body$14)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $1868 = self.name;
                            var $1869 = self.body;
                            return (() => {
                                var _name$5 = Fm$Name$show($1868);
                                var _body$6 = Fm$Term$show$go($1869(Fm$Term$var($1868)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$5)(List$cons(") ")(List$cons(_body$6)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $1870 = self.func;
                            var $1871 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $1872 = self.name;
                            var $1873 = self.expr;
                            var $1874 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($1872);
                                var _expr$7 = Fm$Term$show$go($1873)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($1874(Fm$Term$var($1872)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $1875 = self.name;
                            var $1876 = self.expr;
                            var $1877 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($1875);
                                var _expr$7 = Fm$Term$show$go($1876)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($1877(Fm$Term$var($1875)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $1878 = self.done;
                            var $1879 = self.term;
                            var $1880 = self.type;
                            return (() => {
                                var _term$6 = Fm$Term$show$go($1879)(Fm$MPath$0(_path$2));
                                var _type$7 = Fm$Term$show$go($1880)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$6)(List$cons("::")(List$cons(_type$7)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $1881 = self.name;
                            var $1882 = self.dref;
                            var $1883 = self.verb;
                            return (() => {
                                var _name$6 = Fm$Name$show($1881);
                                return String$flatten(List$cons("?")(List$cons(_name$6)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $1884 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $1885 = self.natx;
                            return String$flatten(List$cons(Nat$show($1885))(List$nil));
                        case 'Fm.Term.chr':
                            var $1886 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($1886))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $1887 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($1887))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $1888 = self.path;
                            var $1889 = self.expr;
                            var $1890 = self.name;
                            var $1891 = self.with;
                            var $1892 = self.cses;
                            var $1893 = self.moti;
                            return (() => {
                                var _expr$9 = Fm$Term$show$go($1889)(Fm$MPath$0(_path$2));
                                var _name$10 = Fm$Name$show($1890);
                                var _with$11 = String$join("")(List$mapped($1891)((_def$11 => (() => {
                                    var self = _def$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $1894 = self.name;
                                            var $1895 = self.term;
                                            var $1896 = self.type;
                                            var $1897 = self.stat;
                                            return (() => {
                                                var _name$16 = Fm$Name$show($1894);
                                                var _type$17 = Fm$Term$show$go($1896)(Maybe$none);
                                                var _term$18 = Fm$Term$show$go($1895)(Maybe$none);
                                                return String$flatten(List$cons(_name$16)(List$cons(": ")(List$cons(_type$17)(List$cons(" = ")(List$cons(_term$18)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$12 = Map$to_list($1892);
                                var _cses$13 = String$join("")(List$mapped(_cses$12)((_x$13 => (() => {
                                    var _name$14 = Fm$Name$from_bits(Pair$fst(_x$13));
                                    var _term$15 = Fm$Term$show$go(Pair$snd(_x$13))(Maybe$none);
                                    return String$flatten(List$cons(_name$14)(List$cons(": ")(List$cons(_term$15)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$14 = Fm$Term$show$go($1893)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$9)(List$cons(" as ")(List$cons(_name$10)(List$cons(_with$11)(List$cons(" { ")(List$cons(_cses$13)(List$cons("} : ")(List$cons(_moti$14)(List$nil))))))))))
                            })();
                    }
                })();
            case 'Maybe.some':
                var $1898 = self.value;
                return $1898;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $1899 = self.head;
                var $1900 = self.tail;
                return (() => {
                    var self = $1899;
                    switch (self._) {
                        case 'Pair.new':
                            var $1901 = self.fst;
                            var $1902 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($1901);
                                var _type$7 = Fm$Term$show($1902);
                                var _rest$8 = Fm$Context$show($1900);
                                return String$flatten(List$cons(_rest$8)(List$cons((() => {
                                    var self = String$is_empty(_rest$8);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return "";
                                        case 'false':
                                            return "\u{a}";
                                    }
                                })())(List$cons("- ")(List$cons(_name$6)(List$cons(": ")(List$cons(_type$7)(List$nil)))))))
                            })();
                    }
                })();
        }
    })());
    var Fm$Term$expand_at = (_path$1 => (_term$2 => (_defs$3 => Fm$Term$patch_at(_path$1)(_term$2)((_term$4 => (() => {
        var self = _term$4;
        switch (self._) {
            case 'Fm.Term.var':
                var $1903 = self.name;
                var $1904 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $1905 = self.name;
                return (() => {
                    var self = Fm$get($1905)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($1905);
                        case 'Maybe.some':
                            var $1906 = self.value;
                            return (() => {
                                var self = $1906;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1907 = self.name;
                                        var $1908 = self.term;
                                        var $1909 = self.type;
                                        var $1910 = self.stat;
                                        return $1908;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$4;
            case 'Fm.Term.all':
                var $1911 = self.eras;
                var $1912 = self.self;
                var $1913 = self.name;
                var $1914 = self.xtyp;
                var $1915 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $1916 = self.name;
                var $1917 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $1918 = self.func;
                var $1919 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $1920 = self.name;
                var $1921 = self.expr;
                var $1922 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $1923 = self.name;
                var $1924 = self.expr;
                var $1925 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $1926 = self.done;
                var $1927 = self.term;
                var $1928 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $1929 = self.name;
                var $1930 = self.dref;
                var $1931 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $1932 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $1933 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $1934 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $1935 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $1936 = self.path;
                var $1937 = self.expr;
                var $1938 = self.name;
                var $1939 = self.with;
                var $1940 = self.cses;
                var $1941 = self.moti;
                return _term$4;
        }
    })())))));
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1942 = self.name;
                var $1943 = self.indx;
                return Fm$Term$var($1942)($1943);
            case 'Fm.Term.ref':
                var $1944 = self.name;
                return (() => {
                    var _expand$5 = Bool$false;
                    var _expand$6 = ((($1944 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                    var _expand$7 = ((($1944 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                    var _expand$8 = ((($1944 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($1944 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                    return (() => {
                        var self = _expand$9;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($1944)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($1944);
                                        case 'Maybe.some':
                                            var $1945 = self.value;
                                            return (() => {
                                                var self = $1945;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $1946 = self.name;
                                                        var $1947 = self.term;
                                                        var $1948 = self.type;
                                                        var $1949 = self.stat;
                                                        return $1947;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($1944);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $1950 = self.eras;
                var $1951 = self.self;
                var $1952 = self.name;
                var $1953 = self.xtyp;
                var $1954 = self.body;
                return Fm$Term$all($1950)($1951)($1952)(Fm$Term$expand_ct($1953)(_defs$2)(0n))((_s$9 => (_x$10 => Fm$Term$expand_ct($1954(_s$9)(_x$10))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $1955 = self.name;
                var $1956 = self.body;
                return Fm$Term$lam($1955)((_x$6 => Fm$Term$expand_ct($1956(_x$6))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $1957 = self.func;
                var $1958 = self.argm;
                return Fm$Term$app(Fm$Term$expand_ct($1957)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($1958)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $1959 = self.name;
                var $1960 = self.expr;
                var $1961 = self.body;
                return Fm$Term$let($1959)(Fm$Term$expand_ct($1960)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($1961(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $1962 = self.name;
                var $1963 = self.expr;
                var $1964 = self.body;
                return Fm$Term$def($1962)(Fm$Term$expand_ct($1963)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($1964(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $1965 = self.done;
                var $1966 = self.term;
                var $1967 = self.type;
                return Fm$Term$ann($1965)(Fm$Term$expand_ct($1966)(_defs$2)(0n))(Fm$Term$expand_ct($1967)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $1968 = self.name;
                var $1969 = self.dref;
                var $1970 = self.verb;
                return Fm$Term$gol($1968)($1969)($1970);
            case 'Fm.Term.hol':
                var $1971 = self.path;
                return Fm$Term$hol($1971);
            case 'Fm.Term.nat':
                var $1972 = self.natx;
                return Fm$Term$nat($1972);
            case 'Fm.Term.chr':
                var $1973 = self.chrx;
                return Fm$Term$chr($1973);
            case 'Fm.Term.str':
                var $1974 = self.strx;
                return Fm$Term$str($1974);
            case 'Fm.Term.cse':
                var $1975 = self.path;
                var $1976 = self.expr;
                var $1977 = self.name;
                var $1978 = self.with;
                var $1979 = self.cses;
                var $1980 = self.moti;
                return _term$1;
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
                var $1981 = self.expected;
                var $1982 = self.detected;
                var $1983 = self.context;
                return (() => {
                    var _expected$6 = (() => {
                        var self = $1981;
                        switch (self._) {
                            case 'Either.left':
                                var $1984 = self.value;
                                return $1984;
                            case 'Either.right':
                                var $1985 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($1985)(Map$new));
                        }
                    })();
                    var _detected$7 = (() => {
                        var self = $1982;
                        switch (self._) {
                            case 'Either.left':
                                var $1986 = self.value;
                                return $1986;
                            case 'Either.right':
                                var $1987 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($1987)(Map$new));
                        }
                    })();
                    var _context$8 = Fm$Context$show($1983);
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$6)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$7)(List$cons("\u{a}")(List$cons("With context:\u{a}")(List$cons(_context$8)(List$nil))))))))))
                })();
            case 'Fm.Error.show_goal':
                var $1988 = self.name;
                var $1989 = self.dref;
                var $1990 = self.verb;
                var $1991 = self.goal;
                var $1992 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($1988))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $1991;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $1993 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($1989)($1993)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $1990;
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
                        var self = $1992;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $1994 = self.head;
                                var $1995 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($1992))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $1996 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($1996)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $1997 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($1997)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $1998 = self.path;
                var $1999 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($1999))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2000 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2000))(List$nil)));
            case 'Fm.Error.cant_infer':
                var $2001 = self.term;
                var $2002 = self.context;
                return (() => {
                    var _term$5 = Fm$Term$show($2001);
                    var _context$6 = Fm$Context$show($2002);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$5)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$6)(List$nil))))))
                })();
        }
    })()));
    var Fm$Defs$report = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2003 = self.name;
                    var $2004 = self.term;
                    var $2005 = self.type;
                    var $2006 = self.stat;
                    return (() => {
                        var _name$9 = $2003;
                        var _term$10 = $2004;
                        var _type$11 = $2005;
                        var _stat$12 = $2006;
                        return (() => {
                            var self = _stat$12;
                            switch (self._) {
                                case 'Fm.Status.init':
                                    return _result$4;
                                case 'Fm.Status.wait':
                                    return _result$4;
                                case 'Fm.Status.done':
                                    return _result$4;
                                case 'Fm.Status.fail':
                                    var $2007 = self.errors;
                                    return (() => {
                                        var self = $2007;
                                        switch (self._) {
                                            case 'List.nil':
                                                return _result$4;
                                            case 'List.cons':
                                                var $2008 = self.head;
                                                var $2009 = self.tail;
                                                return (() => {
                                                    var _name_str$16 = Fm$Name$show(_name$9);
                                                    var _type_str$17 = "<error>";
                                                    var _result$18 = (list_for($2007)(_result$4)((_error$18 => (_result$19 => String$flatten(List$cons(_result$19)(List$cons("On ")(List$cons(_name_str$16)(List$cons(":\u{a}")(List$cons(Fm$Error$show(_error$18)(_defs$1))(List$cons("\u{a}\u{a}")(List$nil)))))))))));
                                                    return _result$18
                                                })();
                                        }
                                    })();
                            }
                        })()
                    })();
            }
        })()))));
        return (() => {
            var self = _result$3;
            switch (self.length === 0 ? 'nil' : 'cons') {
                case 'nil':
                    return "All terms check.";
                case 'cons':
                    var $2010 = self.charCodeAt(0);
                    var $2011 = self.slice(1);
                    return _result$3;
            }
        })()
    })());
    var Fm$check_all = (_code$1 => Fm$exec((_defs$2 => Fm$Defs$report(Fm$Synth$all(_defs$2))))(_code$1));
    var Fm$check_one = (_code$1 => (_name$2 => Fm$exec((_defs$3 => Fm$Defs$report(Fm$Synth$one(_name$2)(_defs$3))))(_code$1)));
    var Fm$exports = (() => {
        var __$1 = Fm$to_core_all;
        var __$2 = Fm$to_core_one;
        var __$3 = Fm$check_all;
        var __$4 = Fm$check_one;
        return Unit$new
    })();
    return {
        'Monad.bind': Monad$bind,
        'Parser': Parser,
        'Monad.new': Monad$new,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser.bind': Parser$bind,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.pure': Parser$pure,
        'Parser.monad': Parser$monad,
        'Map': Map,
        'Bool.true': Bool$true,
        'Bool.false': Bool$false,
        'Parser.is_eof': Parser$is_eof,
        'Monad.pure': Monad$pure,
        'Maybe.some': Maybe$some,
        'Parser.ErrorAt.new': Parser$ErrorAt$new,
        'Maybe': Maybe,
        'Cmp.as_gtn': Cmp$as_gtn,
        'Cmp.eql': Cmp$eql,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Nat.cmp': Nat$cmp,
        'Nat.gtn': Nat$gtn,
        'Parser.ErrorAt.combine': Parser$ErrorAt$combine,
        'Parser.first_of.go': Parser$first_of$go,
        'Maybe.none': Maybe$none,
        'Parser.first_of': Parser$first_of,
        'List.cons': List$cons,
        'List': List,
        'List.nil': List$nil,
        'Parser.many.go': Parser$many$go,
        'Parser.many': Parser$many,
        'Unit.new': Unit$new,
        'String.cons': String$cons,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'Cmp.as_eql': Cmp$as_eql,
        'Word.cmp.go': Word$cmp$go,
        'Word.cmp': Word$cmp,
        'Word.eql': Word$eql,
        'Nat.succ': Nat$succ,
        'Nat.zero': Nat$zero,
        'U16.eql': U16$eql,
        'String.nil': String$nil,
        'Parser.text.go': Parser$text$go,
        'Parser.text': Parser$text,
        'Parser.char_if': Parser$char_if,
        'Bool.not': Bool$not,
        'Fm.Parser.spaces': Fm$Parser$spaces,
        'Bool.and': Bool$and,
        'Cmp.as_lte': Cmp$as_lte,
        'Word.lte': Word$lte,
        'U16.lte': U16$lte,
        'U16.btw': U16$btw,
        'Fm.Name.is_letter': Fm$Name$is_letter,
        'Fm.Parser.letter': Fm$Parser$letter,
        'List.fold': List$fold,
        'Fm.Parser.name': Fm$Parser$name,
        'Parser.many1': Parser$many1,
        'Fm.Parser.spaces_text': Fm$Parser$spaces_text,
        'Pair': Pair,
        'Parser.until.go': Parser$until$go,
        'Parser.until': Parser$until,
        'Parser.until1': Parser$until1,
        'Parser.maybe': Parser$maybe,
        'Fm.Parser.item': Fm$Parser$item,
        'Fm.Term.typ': Fm$Term$typ,
        'Fm.Parser.type': Fm$Parser$type,
        'Parser.spaces': Parser$spaces,
        'Parser.spaces_text': Parser$spaces_text,
        'Fm.Term.all': Fm$Term$all,
        'Fm.Parser.forall': Fm$Parser$forall,
        'Fm.Parser.name1': Fm$Parser$name1,
        'Fm.Term.lam': Fm$Term$lam,
        'Fm.Parser.make_lambda': Fm$Parser$make_lambda,
        'Fm.Parser.lambda': Fm$Parser$lambda,
        'Fm.Parser.lambda.erased': Fm$Parser$lambda$erased,
        'Fm.Parser.parenthesis': Fm$Parser$parenthesis,
        'Fm.Term.ref': Fm$Term$ref,
        'Fm.Term.app': Fm$Term$app,
        'Fm.Term.hol': Fm$Term$hol,
        'Bits.nil': Bits$nil,
        'Fm.Term.let': Fm$Term$let,
        'Fm.Parser.letforin': Fm$Parser$letforin,
        'Fm.Parser.let': Fm$Parser$let,
        'Fm.Term.def': Fm$Term$def,
        'Fm.Parser.def': Fm$Parser$def,
        'Fm.Parser.if': Fm$Parser$if,
        'List.mapped': List$mapped,
        'Pair.new': Pair$new,
        'Nat.apply': Nat$apply,
        'U16.new': U16$new,
        'Word': Word,
        'Word.nil': Word$nil,
        'Word.1': Word$1,
        'Word.0': Word$0,
        'Word.inc': Word$inc,
        'U16.inc': U16$inc,
        'Word.zero': Word$zero,
        'U16.zero': U16$zero,
        'Nat.to_u16': Nat$to_u16,
        'Fm.backslash': Fm$backslash,
        'Fm.escapes': Fm$escapes,
        'Parser.one': Parser$one,
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
        'Fm.Def.new': Fm$Def$new,
        'Fm.Status.init': Fm$Status$init,
        'Fm.Parser.case.with': Fm$Parser$case$with,
        'Fm.Parser.case.case': Fm$Parser$case$case,
        'Map.new': Map$new,
        'Map.tie': Map$tie,
        'Map.set': Map$set,
        'Map.from_list': Map$from_list,
        'Word.subber': Word$subber,
        'Word.sub': Word$sub,
        'U16.sub': U16$sub,
        'Word.adder': Word$adder,
        'Word.add': Word$add,
        'U16.add': U16$add,
        'Bits.0': Bits$0,
        'Bits.1': Bits$1,
        'Word.to_bits': Word$to_bits,
        'Word.trim': Word$trim,
        'Bits.concat': Bits$concat,
        'Bits.reverse.tco': Bits$reverse$tco,
        'Bits.reverse': Bits$reverse,
        'Fm.Name.to_bits': Fm$Name$to_bits,
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
        'Fm.Term.nat': Fm$Term$nat,
        'Fm.Parser.nat': Fm$Parser$nat,
        'String.eql': String$eql,
        'Parser.fail': Parser$fail,
        'Fm.Parser.reference': Fm$Parser$reference,
        'List.for': List$for,
        'Fm.Parser.application': Fm$Parser$application,
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
        'Fm.Parser.file.go': Fm$Parser$file$go,
        'Fm.Parser.file': Fm$Parser$file,
        'Either': Either,
        'String.join.go': String$join$go,
        'String.join': String$join,
        'Fm.Parser.highlight.end': Fm$Parser$highlight$end,
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
        'String.color': String$color,
        'Fm.Parser.highlight.tc': Fm$Parser$highlight$tc,
        'Fm.Parser.highlight': Fm$Parser$highlight,
        'Fm.Defs.read': Fm$Defs$read,
        'Fm.exec': Fm$exec,
        'Map.values.go': Map$values$go,
        'Map.values': Map$values,
        'Fm.Name.show': Fm$Name$show,
        'Bits.to_nat': Bits$to_nat,
        'U16.show_hex': U16$show_hex,
        'Fm.escape.char': Fm$escape$char,
        'Fm.escape': Fm$escape,
        'Fm.Term.core': Fm$Term$core,
        'Fm.Defs.core': Fm$Defs$core,
        'Map.get': Map$get,
        'Fm.get': Fm$get,
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
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.unroll_str': Fm$Term$unroll_str,
        'Fm.Term.reduce': Fm$Term$reduce,
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
        'U16.to_word': U16$to_word,
        'Fm.Term.serialize.go': Fm$Term$serialize$go,
        'Fm.Term.serialize': Fm$Term$serialize,
        'Bool.or': Bool$or,
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
        'Fm.Synth.all': Fm$Synth$all,
        'Fm.to_core_all': Fm$to_core_all,
        'Fm.to_core_one': Fm$to_core_one,
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
        'Fm.Context.show': Fm$Context$show,
        'Fm.Term.expand_at': Fm$Term$expand_at,
        'Fm.Term.expand_ct': Fm$Term$expand_ct,
        'Fm.Term.expand': Fm$Term$expand,
        'Fm.Error.show': Fm$Error$show,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.check_all': Fm$check_all,
        'Fm.check_one': Fm$check_one,
        'Fm.exports': Fm$exports,
    };
})();