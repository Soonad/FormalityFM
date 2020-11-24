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
                            var $65 = self.idx;
                            var $66 = self.code;
                            var $67 = self.err;
                            return (() => {
                                var _reply$11 = _parse$3(_idx$5)(_code$6);
                                return (() => {
                                    var self = _reply$11;
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $68 = self.idx;
                                            var $69 = self.code;
                                            var $70 = self.err;
                                            return Parser$Reply$error($68)($69)($70);
                                        case 'Parser.Reply.value':
                                            var $71 = self.idx;
                                            var $72 = self.code;
                                            var $73 = self.val;
                                            return Parser$until$go(_until$2)(_parse$3)((_xs$15 => _values$4(List$cons($73)(_xs$15))))($71)($72);
                                    }
                                })()
                            })();
                        case 'Parser.Reply.value':
                            var $74 = self.idx;
                            var $75 = self.code;
                            var $76 = self.val;
                            return Parser$Reply$value($74)($75)(_values$4(List$nil));
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
                var $77 = self.charCodeAt(0);
                var $78 = self.slice(1);
                return Parser$Reply$value(Nat$succ(_idx$1))($78)($77);
        }
    })()));
    var Fm$Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$cons(Monad$bind(Parser$monad)(Parser$text("//"))((_$1 => Monad$bind(Parser$monad)(Parser$until(Parser$text("\u{a}"))(Parser$one))((_$2 => Monad$pure(Parser$monad)(Unit$new))))))(List$nil)))));
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
                var $79 = self.charCodeAt(0);
                var $80 = self.slice(1);
                return (() => {
                    var self = Fm$Name$is_letter($79);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value(Nat$succ(_idx$1))($80)($79);
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
                var $81 = self.head;
                var $82 = self.tail;
                return _cons$5($81)(List$fold($82)(_nil$4)(_cons$5));
        }
    })())));
    var Fm$Parser$name = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
    var Parser$many1 = (_parser$2 => Monad$bind(Parser$monad)(_parser$2)((_head$3 => Monad$bind(Parser$monad)(Parser$many(_parser$2))((_tail$4 => Monad$pure(Parser$monad)(List$cons(_head$3)(_tail$4)))))));
    var Fm$Parser$text = (_text$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Pair = (_A$1 => (_B$2 => null));
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
        var _orig$3 = Maybe$some(Fm$Origin$new("")(_from$1)(_upto$2));
        return Monad$pure(Parser$monad)(_orig$3)
    })())));
    var Fm$Term$typ = (_orig$1 => ({
        _: 'Fm.Term.typ',
        'orig': _orig$1
    }));
    var Fm$Parser$type = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("Type"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$typ(_orig$3))))))));
    var Fm$Term$all = (_orig$1 => (_eras$2 => (_self$3 => (_name$4 => (_xtyp$5 => (_body$6 => ({
        _: 'Fm.Term.all',
        'orig': _orig$1,
        'eras': _eras$2,
        'self': _self$3,
        'name': _name$4,
        'xtyp': _xtyp$5,
        'body': _body$6
    })))))));
    var Fm$Term$xall = Fm$Term$all(Maybe$none);
    var Fm$Parser$forall = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_self$2 => Monad$bind(Parser$monad)(Fm$Parser$binder)((_bind$3 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text("->")))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$5 => (() => {
        var _term$6 = List$fold(_bind$3)(_body$5)((_x$6 => (_t$7 => (() => {
            var self = _x$6;
            switch (self._) {
                case 'Fm.Binder.new':
                    var $89 = self.eras;
                    var $90 = self.name;
                    var $91 = self.term;
                    return Fm$Term$xall($89)("")($90)($91)((_s$11 => (_x$12 => _t$7)));
            }
        })())));
        return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$7 => Monad$pure(Parser$monad)((() => {
            var self = _term$6;
            switch (self._) {
                case 'Fm.Term.var':
                    var $92 = self.orig;
                    var $93 = self.name;
                    var $94 = self.indx;
                    return _term$6;
                case 'Fm.Term.ref':
                    var $95 = self.orig;
                    var $96 = self.name;
                    return _term$6;
                case 'Fm.Term.typ':
                    var $97 = self.orig;
                    return _term$6;
                case 'Fm.Term.all':
                    var $98 = self.orig;
                    var $99 = self.eras;
                    var $100 = self.self;
                    var $101 = self.name;
                    var $102 = self.xtyp;
                    var $103 = self.body;
                    return Fm$Term$all(_orig$7)($99)(_self$2)($101)($102)($103);
                case 'Fm.Term.lam':
                    var $104 = self.orig;
                    var $105 = self.name;
                    var $106 = self.body;
                    return _term$6;
                case 'Fm.Term.app':
                    var $107 = self.orig;
                    var $108 = self.func;
                    var $109 = self.argm;
                    return _term$6;
                case 'Fm.Term.let':
                    var $110 = self.orig;
                    var $111 = self.name;
                    var $112 = self.expr;
                    var $113 = self.body;
                    return _term$6;
                case 'Fm.Term.def':
                    var $114 = self.orig;
                    var $115 = self.name;
                    var $116 = self.expr;
                    var $117 = self.body;
                    return _term$6;
                case 'Fm.Term.ann':
                    var $118 = self.orig;
                    var $119 = self.done;
                    var $120 = self.term;
                    var $121 = self.type;
                    return _term$6;
                case 'Fm.Term.gol':
                    var $122 = self.orig;
                    var $123 = self.name;
                    var $124 = self.dref;
                    var $125 = self.verb;
                    return _term$6;
                case 'Fm.Term.hol':
                    var $126 = self.orig;
                    var $127 = self.path;
                    return _term$6;
                case 'Fm.Term.nat':
                    var $128 = self.orig;
                    var $129 = self.natx;
                    return _term$6;
                case 'Fm.Term.chr':
                    var $130 = self.orig;
                    var $131 = self.chrx;
                    return _term$6;
                case 'Fm.Term.str':
                    var $132 = self.orig;
                    var $133 = self.strx;
                    return _term$6;
                case 'Fm.Term.cse':
                    var $134 = self.orig;
                    var $135 = self.path;
                    var $136 = self.expr;
                    var $137 = self.name;
                    var $138 = self.with;
                    var $139 = self.cses;
                    var $140 = self.moti;
                    return _term$6;
            }
        })())))
    })()))))))))));
    var Fm$Parser$name1 = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
    var Fm$Term$lam = (_orig$1 => (_name$2 => (_body$3 => ({
        _: 'Fm.Term.lam',
        'orig': _orig$1,
        'name': _name$2,
        'body': _body$3
    }))));
    var Fm$Parser$make_lambda = (_orig$1 => (_names$2 => (_body$3 => (() => {
        var self = _names$2;
        switch (self._) {
            case 'List.nil':
                return _body$3;
            case 'List.cons':
                var $141 = self.head;
                var $142 = self.tail;
                return Fm$Term$lam(_orig$1)($141)((_x$6 => Fm$Parser$make_lambda(_orig$1)($142)(_body$3)));
        }
    })())));
    var Fm$Parser$lambda = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("("))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(")"))(Fm$Parser$item(Fm$Parser$name1)))((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _expr$6 = Fm$Parser$make_lambda(_orig$5)(_name$3)(_body$4);
        return Monad$pure(Parser$monad)(_expr$6)
    })()))))))))));
    var Fm$Parser$lambda$erased = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("<"))((_$2 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(">"))(Fm$Parser$item(Fm$Parser$name1)))((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => (() => {
        var _expr$6 = Fm$Parser$make_lambda(_orig$5)(_name$3)(_body$4);
        return Monad$pure(Parser$monad)(_expr$6)
    })()))))))))));
    var Fm$Parser$parenthesis = Monad$bind(Parser$monad)(Fm$Parser$text("("))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$2 => Monad$bind(Parser$monad)(Fm$Parser$text(")"))((_$3 => Monad$pure(Parser$monad)(_term$2)))))));
    var Fm$Term$ref = (_orig$1 => (_name$2 => ({
        _: 'Fm.Term.ref',
        'orig': _orig$1,
        'name': _name$2
    })));
    var Fm$Term$xref = Fm$Term$ref(Maybe$none);
    var Fm$Term$app = (_orig$1 => (_func$2 => (_argm$3 => ({
        _: 'Fm.Term.app',
        'orig': _orig$1,
        'func': _func$2,
        'argm': _argm$3
    }))));
    var Fm$Term$xapp = Fm$Term$app(Maybe$none);
    var Fm$Term$hol = (_orig$1 => (_path$2 => ({
        _: 'Fm.Term.hol',
        'orig': _orig$1,
        'path': _path$2
    })));
    var Fm$Term$xhol = Fm$Term$hol(Maybe$none);
    var Bits$nil = '';
    var Fm$Term$xlam = Fm$Term$lam(Maybe$none);
    var Fm$Term$let = (_orig$1 => (_name$2 => (_expr$3 => (_body$4 => ({
        _: 'Fm.Term.let',
        'orig': _orig$1,
        'name': _name$2,
        'expr': _expr$3,
        'body': _body$4
    })))));
    var Fm$Parser$letforin = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$text("for "))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$6 => Monad$bind(Parser$monad)(Fm$Parser$text("in"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$8 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$9 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$10 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$11 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$12 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$13 => (() => {
        var _term$14 = Fm$Term$xref("List.for");
        var _term$15 = Fm$Term$xapp(_term$14)(Fm$Term$xhol(Bits$nil));
        var _term$16 = Fm$Term$xapp(_term$15)(_list$8);
        var _term$17 = Fm$Term$xapp(_term$16)(Fm$Term$xhol(Bits$nil));
        var _term$18 = Fm$Term$xapp(_term$17)(Fm$Term$xref(_name$3));
        var _lamb$19 = Fm$Term$xlam(_elem$6)((_i$19 => Fm$Term$xlam(_name$3)((_x$20 => _loop$10))));
        var _term$20 = Fm$Term$xapp(_term$18)(_lamb$19);
        var _term$21 = Fm$Term$let(_orig$13)(_name$3)(_term$20)((_x$21 => _body$12));
        return Monad$pure(Parser$monad)(_term$21)
    })()))))))))))))))))))))))))));
    var Fm$Parser$let = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => Monad$pure(Parser$monad)(Fm$Term$let(_orig$8)(_name$3)(_expr$5)((_x$9 => _body$7)))))))))))))))))));
    var Fm$Term$def = (_orig$1 => (_name$2 => (_expr$3 => (_body$4 => ({
        _: 'Fm.Term.def',
        'orig': _orig$1,
        'name': _name$2,
        'expr': _expr$3,
        'body': _body$4
    })))));
    var Fm$Parser$def = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("def "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$5 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(";")))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => Monad$pure(Parser$monad)(Fm$Term$def(_orig$8)(_name$3)(_expr$5)((_x$9 => _body$7)))))))))))))))))));
    var Fm$Parser$if = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("if "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_cond$3 => Monad$bind(Parser$monad)(Fm$Parser$text("then"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_tcse$5 => Monad$bind(Parser$monad)(Fm$Parser$text("else"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_fcse$7 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$8 => (() => {
        var _term$9 = _cond$3;
        var _term$10 = Fm$Term$xapp(_term$9)(Fm$Term$xlam("")((_x$10 => Fm$Term$xhol(Bits$nil))));
        var _term$11 = Fm$Term$xapp(_term$10)(_tcse$5);
        var _term$12 = Fm$Term$app(_orig$8)(_term$11)(_fcse$7);
        return Monad$pure(Parser$monad)(_term$12)
    })()))))))))))))))));
    var List$mapped = (_as$2 => (_f$4 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $143 = self.head;
                var $144 = self.tail;
                return List$cons(_f$4($143))(List$mapped($144)(_f$4));
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
                        var $145 = (self - 1n);
                        return Nat$apply($145)(_f$3)(_f$3(_x$4));
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
                var $146 = self.pred;
                return Word$1($146);
            case 'Word.1':
                var $147 = self.pred;
                return Word$0(Word$inc($147));
        }
    })());
    var U16$inc = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $148 = u16_to_word(self);
                return U16$new(Word$inc($148));
        }
    })());
    var Word$zero = (_size$1 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $149 = (self - 1n);
                return Word$0(Word$zero($149));
        }
    })());
    var U16$zero = U16$new(Word$zero(16n));
    var Nat$to_u16 = a0 => (Number(a0));
    var Fm$backslash = 92;
    var Fm$escapes = List$cons(Pair$new("\\b")(8))(List$cons(Pair$new("\\f")(12))(List$cons(Pair$new("\\n")(10))(List$cons(Pair$new("\\r")(13))(List$cons(Pair$new("\\t")(9))(List$cons(Pair$new("\\v")(11))(List$cons(Pair$new(String$cons(Fm$backslash)(String$cons(Fm$backslash)(String$nil)))(Fm$backslash))(List$cons(Pair$new("\\\"")(34))(List$cons(Pair$new("\\0")(0))(List$cons(Pair$new("\\\'")(39))(List$nil))))))))));
    var Fm$Parser$char$single = Parser$first_of(List$cons(Parser$first_of(List$mapped(Fm$escapes)((_esc$1 => (() => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $150 = self.fst;
                var $151 = self.snd;
                return Monad$bind(Parser$monad)(Parser$text($150))((_$4 => Monad$pure(Parser$monad)($151)));
        }
    })()))))(List$cons(Parser$one)(List$nil)));
    var Fm$Term$chr = (_orig$1 => (_chrx$2 => ({
        _: 'Fm.Term.chr',
        'orig': _orig$1,
        'chrx': _chrx$2
    })));
    var Fm$Parser$char = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("\'"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$char$single)((_chrx$3 => Monad$bind(Parser$monad)(Parser$text("\'"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$5 => Monad$pure(Parser$monad)(Fm$Term$chr(_orig$5)(_chrx$3))))))))))));
    var Fm$Term$str = (_orig$1 => (_strx$2 => ({
        _: 'Fm.Term.str',
        'orig': _orig$1,
        'strx': _strx$2
    })));
    var Fm$Parser$string = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => (() => {
        var _quot$2 = String$cons(34)(String$nil);
        return Monad$bind(Parser$monad)(Fm$Parser$text(_quot$2))((_$3 => Monad$bind(Parser$monad)(Parser$until(Parser$text(_quot$2))(Fm$Parser$char$single))((_chrs$4 => (() => {
            var _strx$5 = List$fold(_chrs$4)(String$nil)(String$cons);
            return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$6 => Monad$pure(Parser$monad)(Fm$Term$str(_orig$6)(_strx$5))))
        })()))))
    })()));
    var Fm$Parser$pair = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val0$3 => Monad$bind(Parser$monad)(Fm$Parser$text(","))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$5 => Monad$bind(Parser$monad)(Fm$Parser$text("}"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$7 => (() => {
        var _term$8 = Fm$Term$xref("Pair.new");
        var _term$9 = Fm$Term$xapp(_term$8)(Fm$Term$xhol(Bits$nil));
        var _term$10 = Fm$Term$xapp(_term$9)(Fm$Term$xhol(Bits$nil));
        var _term$11 = Fm$Term$xapp(_term$10)(_val0$3);
        var _term$12 = Fm$Term$app(_orig$7)(_term$11)(_val1$5);
        return Monad$pure(Parser$monad)(_term$12)
    })()))))))))))))));
    var Fm$Name$read = (_str$1 => _str$1);
    var Fm$Parser$list = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("["))((_$2 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("]"))(Fm$Parser$item(Fm$Parser$term)))((_vals$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => Monad$pure(Parser$monad)(List$fold(_vals$3)(Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("List.nil")))(Fm$Term$xhol(Bits$nil)))((_x$5 => (_xs$6 => (() => {
        var _term$7 = Fm$Term$xref(Fm$Name$read("List.cons"));
        var _term$8 = Fm$Term$xapp(_term$7)(Fm$Term$xhol(Bits$nil));
        var _term$9 = Fm$Term$xapp(_term$8)(_x$5);
        var _term$10 = Fm$Term$app(_orig$4)(_term$9)(_xs$6);
        return _term$10
    })()))))))))))));
    var Fm$Parser$forin = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("for "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_elem$3 => Monad$bind(Parser$monad)(Fm$Parser$text("in"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_list$5 => Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$7 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$8 => Monad$bind(Parser$monad)(Fm$Parser$term)((_loop$9 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$10 => (() => {
        var _term$11 = Fm$Term$xref("List.for");
        var _term$12 = Fm$Term$xapp(_term$11)(Fm$Term$xhol(Bits$nil));
        var _term$13 = Fm$Term$xapp(_term$12)(_list$5);
        var _term$14 = Fm$Term$xapp(_term$13)(Fm$Term$xhol(Bits$nil));
        var _term$15 = Fm$Term$xapp(_term$14)(Fm$Term$xref(_name$7));
        var _lamb$16 = Fm$Term$xlam(_elem$3)((_i$16 => Fm$Term$xlam(_name$7)((_x$17 => _loop$9))));
        var _term$17 = Fm$Term$xapp(_term$15)(_lamb$16);
        var _term$18 = Fm$Term$let(_orig$10)(_name$7)(_term$17)((_x$18 => Fm$Term$xref(_name$7)));
        return Monad$pure(Parser$monad)(_term$18)
    })()))))))))))))))))))));
    var Fm$Parser$do$statements = (_monad_name$1 => Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("var "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => (() => {
        var _term$10 = Fm$Term$xapp(Fm$Term$xref("Monad.bind"))(Fm$Term$xref(_monad_name$1));
        var _term$11 = Fm$Term$xapp(_term$10)(Fm$Term$xref((_monad_name$1 + ".monad")));
        var _term$12 = Fm$Term$xapp(_term$11)(Fm$Term$xhol(Bits$nil));
        var _term$13 = Fm$Term$xapp(_term$12)(Fm$Term$xhol(Bits$nil));
        var _term$14 = Fm$Term$xapp(_term$13)(_expr$6);
        var _term$15 = Fm$Term$app(_orig$9)(_term$14)(Fm$Term$xlam(_name$4)((_x$15 => _body$8)));
        return Monad$pure(Parser$monad)(_term$15)
    })())))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("let "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$6 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$7 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$8 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$9 => Monad$pure(Parser$monad)(Fm$Term$let(_orig$9)(_name$4)(_expr$6)((_x$10 => _body$8))))))))))))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("return "))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$4 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$xapp(Fm$Term$xref("Monad.pure"))(Fm$Term$xref(_monad_name$1));
        var _term$8 = Fm$Term$xapp(_term$7)(Fm$Term$xref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$xapp(_term$8)(Fm$Term$xhol(Bits$nil));
        var _term$10 = Fm$Term$app(_orig$6)(_term$9)(_expr$4);
        return Monad$pure(Parser$monad)(_term$10)
    })())))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$3 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_monad_name$1))((_body$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$6 => (() => {
        var _term$7 = Fm$Term$xapp(Fm$Term$xref("Monad.bind"))(Fm$Term$xref(_monad_name$1));
        var _term$8 = Fm$Term$xapp(_term$7)(Fm$Term$xref((_monad_name$1 + ".monad")));
        var _term$9 = Fm$Term$xapp(_term$8)(Fm$Term$xhol(Bits$nil));
        var _term$10 = Fm$Term$xapp(_term$9)(Fm$Term$xhol(Bits$nil));
        var _term$11 = Fm$Term$xapp(_term$10)(_expr$3);
        var _term$12 = Fm$Term$app(_orig$6)(_term$11)(Fm$Term$xlam("")((_x$12 => _body$5)));
        return Monad$pure(Parser$monad)(_term$12)
    })())))))))))))(List$cons(Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$2 => Monad$bind(Parser$monad)(Fm$Parser$text(";"))((_$3 => Monad$pure(Parser$monad)(_expr$2))))))(List$nil)))))));
    var Fm$Parser$do = Monad$bind(Parser$monad)(Fm$Parser$text("do "))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$do$statements(_name$2))((_term$4 => Monad$bind(Parser$monad)(Fm$Parser$text("}"))((_$5 => Monad$pure(Parser$monad)(_term$4)))))))))));
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
    var Fm$Parser$case$with = Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$6 => Monad$pure(Parser$monad)(Fm$Def$new(_name$2)(_term$6)(_type$4)(Fm$Status$init))))))))))))));
    var Fm$Parser$case$case = Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$1 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$3 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$text(",")))((_$4 => Monad$pure(Parser$monad)(Pair$new(_name$1)(_term$3))))))))));
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
                            var $152 = self.val;
                            var $153 = self.lft;
                            var $154 = self.rgt;
                            return Map$tie(Maybe$some(_val$3))($153)($154);
                    }
                })();
            case '0':
                var $155 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$set($155)(_val$3)(Map$new))(Map$new);
                        case 'Map.tie':
                            var $156 = self.val;
                            var $157 = self.lft;
                            var $158 = self.rgt;
                            return Map$tie($156)(Map$set($155)(_val$3)($157))($158);
                    }
                })();
            case '1':
                var $159 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$new)(Map$set($159)(_val$3)(Map$new));
                        case 'Map.tie':
                            var $160 = self.val;
                            var $161 = self.lft;
                            var $162 = self.rgt;
                            return Map$tie($160)($161)(Map$set($159)(_val$3)($162));
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
                var $163 = self.head;
                var $164 = self.tail;
                return (() => {
                    var self = $163;
                    switch (self._) {
                        case 'Pair.new':
                            var $165 = self.fst;
                            var $166 = self.snd;
                            return Map$set(_f$3($165))($166)(Map$from_list(_f$3)($164));
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
                var $167 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $168 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($168)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($168)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $169 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($169)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($169)(Bool$true));
                                }
                            })());
                    }
                })()($167));
            case 'Word.1':
                var $170 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $171 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($171)(Bool$false));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($171)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $172 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($172)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($172)(Bool$false));
                                }
                            })());
                    }
                })()($170));
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
                var $173 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $174 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($174)(Bool$false));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($174)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $175 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($175)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($175)(Bool$false));
                                }
                            })());
                    }
                })()($173));
            case 'Word.1':
                var $176 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $177 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($177)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($177)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $178 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($178)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($178)(Bool$true));
                                }
                            })());
                    }
                })()($176));
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
                var $179 = self.pred;
                return Bits$0(Word$to_bits($179));
            case 'Word.1':
                var $180 = self.pred;
                return Bits$1(Word$to_bits($180));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $181 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.nil':
                            return Word$0(Word$trim($181)(Word$nil));
                        case 'Word.0':
                            var $182 = self.pred;
                            return Word$0(Word$trim($181)($182));
                        case 'Word.1':
                            var $183 = self.pred;
                            return Word$1(Word$trim($181)($183));
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
                        var $184 = self.slice(0, -1);
                        return Bits$reverse$tco($184)(Bits$0(_r$2));
                    case '1':
                        var $185 = self.slice(0, -1);
                        return Bits$reverse$tco($185)(Bits$1(_r$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$reverse = (_a$1 => Bits$reverse$tco(_a$1)(Bits$nil));
    var Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));
    var Fm$Term$cse = (_orig$1 => (_path$2 => (_expr$3 => (_name$4 => (_with$5 => (_cses$6 => (_moti$7 => ({
        _: 'Fm.Term.cse',
        'orig': _orig$1,
        'path': _path$2,
        'expr': _expr$3,
        'name': _name$4,
        'with': _with$5,
        'cses': _cses$6,
        'moti': _moti$7
    }))))))));
    var Fm$Parser$case = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("case "))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_expr$4 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text("as"))((_$5 => Fm$Parser$name1))))((_name$5 => (() => {
        var _name$6 = (() => {
            var self = _name$5;
            switch (self._) {
                case 'Maybe.none':
                    return (() => {
                        var self = _expr$4;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $186 = self.orig;
                                var $187 = self.name;
                                var $188 = self.indx;
                                return $187;
                            case 'Fm.Term.ref':
                                var $189 = self.orig;
                                var $190 = self.name;
                                return $190;
                            case 'Fm.Term.typ':
                                var $191 = self.orig;
                                return Fm$Name$read("self");
                            case 'Fm.Term.all':
                                var $192 = self.orig;
                                var $193 = self.eras;
                                var $194 = self.self;
                                var $195 = self.name;
                                var $196 = self.xtyp;
                                var $197 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.lam':
                                var $198 = self.orig;
                                var $199 = self.name;
                                var $200 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.app':
                                var $201 = self.orig;
                                var $202 = self.func;
                                var $203 = self.argm;
                                return Fm$Name$read("self");
                            case 'Fm.Term.let':
                                var $204 = self.orig;
                                var $205 = self.name;
                                var $206 = self.expr;
                                var $207 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.def':
                                var $208 = self.orig;
                                var $209 = self.name;
                                var $210 = self.expr;
                                var $211 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ann':
                                var $212 = self.orig;
                                var $213 = self.done;
                                var $214 = self.term;
                                var $215 = self.type;
                                return Fm$Name$read("self");
                            case 'Fm.Term.gol':
                                var $216 = self.orig;
                                var $217 = self.name;
                                var $218 = self.dref;
                                var $219 = self.verb;
                                return Fm$Name$read("self");
                            case 'Fm.Term.hol':
                                var $220 = self.orig;
                                var $221 = self.path;
                                return Fm$Name$read("self");
                            case 'Fm.Term.nat':
                                var $222 = self.orig;
                                var $223 = self.natx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.chr':
                                var $224 = self.orig;
                                var $225 = self.chrx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.str':
                                var $226 = self.orig;
                                var $227 = self.strx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.cse':
                                var $228 = self.orig;
                                var $229 = self.path;
                                var $230 = self.expr;
                                var $231 = self.name;
                                var $232 = self.with;
                                var $233 = self.cses;
                                var $234 = self.moti;
                                return Fm$Name$read("self");
                        }
                    })();
                case 'Maybe.some':
                    var $235 = self.value;
                    return $235;
            }
        })();
        return Monad$bind(Parser$monad)(Parser$many(Fm$Parser$case$with))((_with$7 => Monad$bind(Parser$monad)(Fm$Parser$text("{"))((_$8 => Monad$bind(Parser$monad)(Parser$until(Fm$Parser$text("}"))(Fm$Parser$case$case))((_cses$9 => (() => {
            var _cses$10 = Map$from_list(Fm$Name$to_bits)(_cses$9);
            return Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$11 => Fm$Parser$term))))((_moti$11 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$12 => (() => {
                var _moti$13 = (() => {
                    var self = _moti$11;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$xhol(Bits$nil);
                        case 'Maybe.some':
                            var $236 = self.value;
                            return $236;
                    }
                })();
                return Monad$pure(Parser$monad)(Fm$Term$cse(_orig$12)(Bits$nil)(_expr$4)(_name$6)(_with$7)(_cses$10)(_moti$13))
            })()))))
        })()))))))
    })()))))))))));
    var Parser$digit = (_idx$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_idx$1)(_code$2)("Not a digit.");
            case 'cons':
                var $237 = self.charCodeAt(0);
                var $238 = self.slice(1);
                return (() => {
                    var _sidx$5 = Nat$succ(_idx$1);
                    return (() => {
                        var self = ($237 === 48);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Parser$Reply$value(_sidx$5)($238)(0n);
                            case 'false':
                                return (() => {
                                    var self = ($237 === 49);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return Parser$Reply$value(_sidx$5)($238)(1n);
                                        case 'false':
                                            return (() => {
                                                var self = ($237 === 50);
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return Parser$Reply$value(_sidx$5)($238)(2n);
                                                    case 'false':
                                                        return (() => {
                                                            var self = ($237 === 51);
                                                            switch (self ? 'true' : 'false') {
                                                                case 'true':
                                                                    return Parser$Reply$value(_sidx$5)($238)(3n);
                                                                case 'false':
                                                                    return (() => {
                                                                        var self = ($237 === 52);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return Parser$Reply$value(_sidx$5)($238)(4n);
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var self = ($237 === 53);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Parser$Reply$value(_sidx$5)($238)(5n);
                                                                                        case 'false':
                                                                                            return (() => {
                                                                                                var self = ($237 === 54);
                                                                                                switch (self ? 'true' : 'false') {
                                                                                                    case 'true':
                                                                                                        return Parser$Reply$value(_sidx$5)($238)(6n);
                                                                                                    case 'false':
                                                                                                        return (() => {
                                                                                                            var self = ($237 === 55);
                                                                                                            switch (self ? 'true' : 'false') {
                                                                                                                case 'true':
                                                                                                                    return Parser$Reply$value(_sidx$5)($238)(7n);
                                                                                                                case 'false':
                                                                                                                    return (() => {
                                                                                                                        var self = ($237 === 56);
                                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                                            case 'true':
                                                                                                                                return Parser$Reply$value(_sidx$5)($238)(8n);
                                                                                                                            case 'false':
                                                                                                                                return (() => {
                                                                                                                                    var self = ($237 === 57);
                                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                                        case 'true':
                                                                                                                                            return Parser$Reply$value(_sidx$5)($238)(9n);
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
                        var $239 = self.head;
                        var $240 = self.tail;
                        return Nat$from_base$go(_b$1)($240)((_b$1 * _p$3))((($239 * _p$3) + _res$4));
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
                        var $241 = self.head;
                        var $242 = self.tail;
                        return List$reverse$go($242)(List$cons($241)(_res$3));
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
                var $243 = self.slice(0, -1);
                return $243;
            case '1':
                var $244 = self.slice(0, -1);
                return $244;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$1(Bits$nil);
            case '0':
                var $245 = self.slice(0, -1);
                return Bits$1($245);
            case '1':
                var $246 = self.slice(0, -1);
                return Bits$0(Bits$inc($246));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $247 = self.value;
                return Bool$true;
        }
    })());
    var Fm$Term$gol = (_orig$1 => (_name$2 => (_dref$3 => (_verb$4 => ({
        _: 'Fm.Term.gol',
        'orig': _orig$1,
        'name': _name$2,
        'dref': _dref$3,
        'verb': _verb$4
    })))));
    var Fm$Parser$goal = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("?"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Parser$many(Monad$bind(Parser$monad)(Fm$Parser$text("-"))((_$4 => Monad$bind(Parser$monad)(Parser$nat)((_nat$5 => (() => {
        var _bits$6 = Bits$reverse(Bits$tail(Bits$reverse((nat_to_bits(_nat$5)))));
        return Monad$pure(Parser$monad)(_bits$6)
    })()))))))((_dref$4 => Monad$bind(Parser$monad)(Monad$bind(Parser$monad)(Parser$maybe(Parser$text("-")))((_verb$5 => Monad$pure(Parser$monad)(Maybe$to_bool(_verb$5)))))((_verb$5 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$6 => Monad$pure(Parser$monad)(Fm$Term$gol(_orig$6)(_name$3)(_dref$4)(_verb$5))))))))))))));
    var Fm$Parser$hole = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$text("_"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$hol(_orig$3)(Bits$nil))))))));
    var Fm$Term$nat = (_orig$1 => (_natx$2 => ({
        _: 'Fm.Term.nat',
        'orig': _orig$1,
        'natx': _natx$2
    })));
    var Fm$Parser$nat = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Parser$nat)((_natx$3 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$4 => Monad$pure(Parser$monad)(Fm$Term$nat(_orig$4)(_natx$3))))))))));
    var String$eql = a0 => a1 => (a0 === a1);
    var Parser$fail = (_error$2 => (_idx$3 => (_code$4 => Parser$Reply$error(_idx$3)(_code$4)(_error$2))));
    var Fm$Parser$reference = Monad$bind(Parser$monad)(Fm$Parser$init)((_init$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => (() => {
        var self = (_name$2 === "case");
        switch (self ? 'true' : 'false') {
            case 'true':
                return Parser$fail("Reserved keyword.");
            case 'false':
                return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$3 => Monad$pure(Parser$monad)(Fm$Term$ref(_orig$3)(_name$2))));
        }
    })()))));
    var List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));
    var Fm$Parser$application = (_func$1 => Monad$bind(Parser$monad)(Parser$get_index)((_init$2 => Monad$bind(Parser$monad)(Parser$text("("))((_$3 => Monad$bind(Parser$monad)(Parser$until1(Fm$Parser$text(")"))(Fm$Parser$item(Fm$Parser$term)))((_args$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$5 => (() => {
        var _expr$6 = (list_for(_args$4)(_func$1)((_x$6 => (_f$7 => Fm$Term$app(_orig$5)(_f$7)(_x$6)))));
        return Monad$pure(Parser$monad)(_expr$6)
    })())))))))));
    var Parser$spaces = Parser$many(Parser$first_of(List$cons(Parser$text(" "))(List$cons(Parser$text("\u{a}"))(List$nil))));
    var Parser$spaces_text = (_text$1 => Monad$bind(Parser$monad)(Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Fm$Parser$application$erased = (_func$1 => Monad$bind(Parser$monad)(Parser$get_index)((_init$2 => Monad$bind(Parser$monad)(Parser$text("<"))((_$3 => Monad$bind(Parser$monad)(Parser$until1(Parser$spaces_text(">"))(Fm$Parser$item(Fm$Parser$term)))((_args$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$5 => (() => {
        var _expr$6 = (list_for(_args$4)(_func$1)((_x$6 => (_f$7 => Fm$Term$app(_orig$5)(_f$7)(_x$6)))));
        return Monad$pure(Parser$monad)(_expr$6)
    })())))))))));
    var Fm$Parser$arrow = (_xtyp$1 => Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("->"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$5 => Monad$pure(Parser$monad)(Fm$Term$all(_orig$5)(Bool$false)("")("")(_xtyp$1)((_s$6 => (_x$7 => _body$4)))))))))))));
    var Fm$Parser$equality = (_val0$1 => Monad$bind(Parser$monad)(Fm$Parser$init)((_init$2 => Monad$bind(Parser$monad)(Fm$Parser$text("=="))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_val1$4 => Monad$bind(Parser$monad)(Fm$Parser$stop(_init$2))((_orig$5 => (() => {
        var _term$6 = Fm$Term$xref("Equal");
        var _term$7 = Fm$Term$xapp(_term$6)(Fm$Term$xhol(Bits$nil));
        var _term$8 = Fm$Term$xapp(_term$7)(_val0$1);
        var _term$9 = Fm$Term$app(_orig$5)(_term$8)(_val1$4);
        return Monad$pure(Parser$monad)(_term$9)
    })())))))))));
    var Fm$Term$ann = (_orig$1 => (_done$2 => (_term$3 => (_type$4 => ({
        _: 'Fm.Term.ann',
        'orig': _orig$1,
        'done': _done$2,
        'term': _term$3,
        'type': _type$4
    })))));
    var Fm$Term$xann = Fm$Term$ann(Maybe$none);
    var Fm$Parser$annotation = (_term$1 => Monad$bind(Parser$monad)(Fm$Parser$text("::"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$3 => Monad$pure(Parser$monad)(Fm$Term$xann(Bool$false)(_term$1)(_type$3)))))));
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
                            var $248 = self.idx;
                            var $249 = self.code;
                            var $250 = self.err;
                            return Parser$Reply$value(_idx$2)(_code$3)(_term$1);
                        case 'Parser.Reply.value':
                            var $251 = self.idx;
                            var $252 = self.code;
                            var $253 = self.val;
                            return Fm$Parser$suffix($253)($251)($252);
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$term = Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$type)(List$cons(Fm$Parser$forall)(List$cons(Fm$Parser$lambda)(List$cons(Fm$Parser$lambda$erased)(List$cons(Fm$Parser$parenthesis)(List$cons(Fm$Parser$letforin)(List$cons(Fm$Parser$let)(List$cons(Fm$Parser$def)(List$cons(Fm$Parser$if)(List$cons(Fm$Parser$char)(List$cons(Fm$Parser$string)(List$cons(Fm$Parser$pair)(List$cons(Fm$Parser$list)(List$cons(Fm$Parser$forin)(List$cons(Fm$Parser$do)(List$cons(Fm$Parser$case)(List$cons(Fm$Parser$goal)(List$cons(Fm$Parser$hole)(List$cons(Fm$Parser$nat)(List$cons(Fm$Parser$reference)(List$nil))))))))))))))))))))))((_term$1 => Fm$Parser$suffix(_term$1)));
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
                var $254 = self.fst;
                var $255 = self.snd;
                return Fm$Binder$new(_eras$1)($254)($255);
        }
    })()))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $256 = self.head;
                var $257 = self.tail;
                return List$cons($256)(List$concat($257)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $258 = self.head;
                var $259 = self.tail;
                return List$concat($258)(List$flatten($259));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $260 = self.head;
                var $261 = self.tail;
                return (() => {
                    var self = $260;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $262 = self.eras;
                            var $263 = self.name;
                            var $264 = self.term;
                            return Fm$Term$xall($262)("")($263)($264)((_s$8 => (_x$9 => Fm$Parser$make_forall($261)(_body$2))));
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
                        var $265 = self.head;
                        var $266 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($265);
                                case 'succ':
                                    var $267 = (self - 1n);
                                    return List$at($267)($266);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$at_last = (_index$2 => (_list$3 => List$at(_index$2)(List$reverse(_list$3))));
    var Fm$Term$var = (_orig$1 => (_name$2 => (_indx$3 => ({
        _: 'Fm.Term.var',
        'orig': _orig$1,
        'name': _name$2,
        'indx': _indx$3
    }))));
    var Pair$snd = (_pair$3 => (() => {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $268 = self.fst;
                var $269 = self.snd;
                return $269;
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
                        var $270 = self.head;
                        var $271 = self.tail;
                        return (() => {
                            var self = $270;
                            switch (self._) {
                                case 'Pair.new':
                                    var $272 = self.fst;
                                    var $273 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($272);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($273);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($271);
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
                        var $274 = self.head;
                        var $275 = self.tail;
                        return List$length$go($275)(Nat$succ(_n$3));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var List$length = (_xs$2 => List$length$go(_xs$2)(0n));
    var Fm$Path$0 = (_path$1 => (_x$2 => _path$1(Bits$0(_x$2))));
    var Fm$Path$1 = (_path$1 => (_x$2 => _path$1(Bits$1(_x$2))));
    var Fm$Term$xvar = Fm$Term$var(Maybe$none);
    var Fm$Path$to_bits = (_path$1 => _path$1(Bits$nil));
    var Fm$Term$bind = (_vars$1 => (_path$2 => (_term$3 => (() => {
        var self = _term$3;
        switch (self._) {
            case 'Fm.Term.var':
                var $276 = self.orig;
                var $277 = self.name;
                var $278 = self.indx;
                return (() => {
                    var self = List$at_last($278)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($276)($277)($278);
                        case 'Maybe.some':
                            var $279 = self.value;
                            return Pair$snd($279);
                    }
                })();
            case 'Fm.Term.ref':
                var $280 = self.orig;
                var $281 = self.name;
                return (() => {
                    var self = Fm$Context$find($281)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($280)($281);
                        case 'Maybe.some':
                            var $282 = self.value;
                            return $282;
                    }
                })();
            case 'Fm.Term.typ':
                var $283 = self.orig;
                return Fm$Term$typ($283);
            case 'Fm.Term.all':
                var $284 = self.orig;
                var $285 = self.eras;
                var $286 = self.self;
                var $287 = self.name;
                var $288 = self.xtyp;
                var $289 = self.body;
                return (() => {
                    var _vlen$10 = List$length(_vars$1);
                    return Fm$Term$all($284)($285)($286)($287)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($288))((_s$11 => (_x$12 => Fm$Term$bind(List$cons(Pair$new($287)(_x$12))(List$cons(Pair$new($286)(_s$11))(_vars$1)))(Fm$Path$1(_path$2))($289(Fm$Term$xvar($286)(_vlen$10))(Fm$Term$xvar($287)(Nat$succ(_vlen$10)))))))
                })();
            case 'Fm.Term.lam':
                var $290 = self.orig;
                var $291 = self.name;
                var $292 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$lam($290)($291)((_x$8 => Fm$Term$bind(List$cons(Pair$new($291)(_x$8))(_vars$1))(Fm$Path$0(_path$2))($292(Fm$Term$xvar($291)(_vlen$7)))))
                })();
            case 'Fm.Term.app':
                var $293 = self.orig;
                var $294 = self.func;
                var $295 = self.argm;
                return Fm$Term$app($293)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($294))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($295));
            case 'Fm.Term.let':
                var $296 = self.orig;
                var $297 = self.name;
                var $298 = self.expr;
                var $299 = self.body;
                return (() => {
                    var _vlen$8 = List$length(_vars$1);
                    return Fm$Term$let($296)($297)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($298))((_x$9 => Fm$Term$bind(List$cons(Pair$new($297)(_x$9))(_vars$1))(Fm$Path$1(_path$2))($299(Fm$Term$xvar($297)(_vlen$8)))))
                })();
            case 'Fm.Term.def':
                var $300 = self.orig;
                var $301 = self.name;
                var $302 = self.expr;
                var $303 = self.body;
                return (() => {
                    var _vlen$8 = List$length(_vars$1);
                    return Fm$Term$def($300)($301)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($302))((_x$9 => Fm$Term$bind(List$cons(Pair$new($301)(_x$9))(_vars$1))(Fm$Path$1(_path$2))($303(Fm$Term$xvar($301)(_vlen$8)))))
                })();
            case 'Fm.Term.ann':
                var $304 = self.orig;
                var $305 = self.done;
                var $306 = self.term;
                var $307 = self.type;
                return Fm$Term$ann($304)($305)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($306))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($307));
            case 'Fm.Term.gol':
                var $308 = self.orig;
                var $309 = self.name;
                var $310 = self.dref;
                var $311 = self.verb;
                return Fm$Term$gol($308)($309)($310)($311);
            case 'Fm.Term.hol':
                var $312 = self.orig;
                var $313 = self.path;
                return Fm$Term$hol($312)(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $314 = self.orig;
                var $315 = self.natx;
                return Fm$Term$nat($314)($315);
            case 'Fm.Term.chr':
                var $316 = self.orig;
                var $317 = self.chrx;
                return Fm$Term$chr($316)($317);
            case 'Fm.Term.str':
                var $318 = self.orig;
                var $319 = self.strx;
                return Fm$Term$str($318)($319);
            case 'Fm.Term.cse':
                var $320 = self.orig;
                var $321 = self.path;
                var $322 = self.expr;
                var $323 = self.name;
                var $324 = self.with;
                var $325 = self.cses;
                var $326 = self.moti;
                return (() => {
                    var _expr$11 = Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($322);
                    var _name$12 = $323;
                    var _with$13 = $324;
                    var _cses$14 = $325;
                    var _moti$15 = $326;
                    return Fm$Term$cse($320)(Fm$Path$to_bits(_path$2))(_expr$11)(_name$12)(_with$13)(_cses$14)(_moti$15)
                })();
        }
    })())));
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$Parser$file$def = (_defs$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$2 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$3 => (() => {
        var _args$4 = List$flatten(_args$3);
        return Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$7 => (() => {
            var _type$8 = Fm$Parser$make_forall(_args$4)(_type$6);
            var _term$9 = Fm$Parser$make_lambda(Maybe$none)(List$mapped(_args$4)((_x$9 => (() => {
                var self = _x$9;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $327 = self.eras;
                        var $328 = self.name;
                        var $329 = self.term;
                        return $328;
                }
            })())))(_term$7);
            var _type$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$1(_x$10)))(_type$8);
            var _term$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$0(_x$11)))(_term$9);
            var _defs$12 = Fm$set(_name$2)(Fm$Def$new(_name$2)(_term$11)(_type$10)(Fm$Status$init))(_defs$1);
            return Monad$pure(Parser$monad)(_defs$12)
        })()))))))
    })())))));
    var Maybe$default = (_a$2 => (_m$3 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return _a$2;
            case 'Maybe.some':
                var $330 = self.value;
                return $330;
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
    var Fm$Term$xtyp = Fm$Term$typ(Maybe$none);
    var Fm$Datatype$build_term$motive$go = (_type$1 => (_name$2 => (_inds$3 => (() => {
        var self = _inds$3;
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
                                var _slf$8 = Fm$Term$xref(_name$2);
                                var _slf$9 = (list_for($332)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$xapp(_slf$10)(Fm$Term$xref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $335 = self.eras;
                                            var $336 = self.name;
                                            var $337 = self.term;
                                            return $336;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($333)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$xapp(_slf$11)(Fm$Term$xref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $338 = self.eras;
                                            var $339 = self.name;
                                            var $340 = self.term;
                                            return $339;
                                    }
                                })()))))));
                                return Fm$Term$xall(Bool$false)("")("")(_slf$10)((_s$11 => (_x$12 => Fm$Term$xtyp)))
                            })();
                    }
                })();
            case 'List.cons':
                var $341 = self.head;
                var $342 = self.tail;
                return (() => {
                    var self = $341;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $343 = self.eras;
                            var $344 = self.name;
                            var $345 = self.term;
                            return Fm$Term$xall($343)("")($344)($345)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($342))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $346 = self.name;
                var $347 = self.pars;
                var $348 = self.inds;
                var $349 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($346)($348);
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
                            var $350 = self.name;
                            var $351 = self.pars;
                            var $352 = self.inds;
                            var $353 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $354 = self.name;
                                        var $355 = self.args;
                                        var $356 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$xref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($356)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$xapp(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $357 = self.eras;
                                                        var $358 = self.name;
                                                        var $359 = self.term;
                                                        return $359;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($350)(List$cons(Fm$Name$read("."))(List$cons($354)(List$nil))));
                                            var _slf$14 = Fm$Term$xref(_ctr$13);
                                            var _slf$15 = (list_for($351)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$xapp(_slf$16)(Fm$Term$xref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $360 = self.eras;
                                                        var $361 = self.name;
                                                        var $362 = self.term;
                                                        return $361;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($355)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$xapp(_slf$17)(Fm$Term$xref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $363 = self.eras;
                                                        var $364 = self.name;
                                                        var $365 = self.term;
                                                        return $364;
                                                }
                                            })()))))));
                                            return Fm$Term$xapp(_ret$12)(_slf$16)
                                        })();
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
                            return (() => {
                                var _eras$9 = $368;
                                var _name$10 = $369;
                                var _xtyp$11 = $370;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($367);
                                return Fm$Term$xall(_eras$9)("")(_name$10)(_xtyp$11)((_s$13 => (_x$14 => _body$12)))
                            })();
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructor = (_type$1 => (_ctor$2 => (() => {
        var self = _ctor$2;
        switch (self._) {
            case 'Fm.Constructor.new':
                var $371 = self.name;
                var $372 = self.args;
                var $373 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($372);
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
                            var $374 = self.name;
                            var $375 = self.pars;
                            var $376 = self.inds;
                            var $377 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$xref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($376)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$xapp(_ret$10)(Fm$Term$xref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $378 = self.eras;
                                            var $379 = self.name;
                                            var $380 = self.term;
                                            return $379;
                                    }
                                })()))))));
                                return Fm$Term$xapp(_ret$9)(Fm$Term$xref((_name$2 + ".Self")))
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
                            return Fm$Term$xall(Bool$false)("")($383)(Fm$Datatype$build_term$constructor(_type$1)($381))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($382))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $386 = self.name;
                var $387 = self.pars;
                var $388 = self.inds;
                var $389 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($386)($389);
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
                            return Fm$Term$xall(Bool$true)((_name$2 + ".Self"))(Fm$Name$read("P"))(Fm$Datatype$build_term$motive(_type$1))((_s$5 => (_x$6 => Fm$Datatype$build_term$constructors(_type$1))));
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
                                        return Fm$Term$xlam($393)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($391)));
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
                            return Fm$Term$xlam($398)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($396)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $400 = self.name;
                var $401 = self.pars;
                var $402 = self.inds;
                var $403 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($400)($401)($402);
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
                            return Fm$Term$xtyp;
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
                                        return Fm$Term$xall(Bool$false)("")($407)($408)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($405))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $409 = self.head;
                var $410 = self.tail;
                return (() => {
                    var self = $409;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $411 = self.eras;
                            var $412 = self.name;
                            var $413 = self.term;
                            return Fm$Term$xall(Bool$false)("")($412)($413)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($410)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $414 = self.name;
                var $415 = self.pars;
                var $416 = self.inds;
                var $417 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($414)($415)($416);
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
                            var $418 = self.name;
                            var $419 = self.args;
                            var $420 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$xref($418);
                                var _ret$8 = (list_for($419)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$xapp(_ret$9)(Fm$Term$xref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $421 = self.eras;
                                            var $422 = self.name;
                                            var $423 = self.term;
                                            return $422;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $424 = self.head;
                var $425 = self.tail;
                return (() => {
                    var self = $424;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $426 = self.name;
                            var $427 = self.args;
                            var $428 = self.inds;
                            return Fm$Term$xlam($426)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($425)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $429 = self.name;
                var $430 = self.pars;
                var $431 = self.inds;
                var $432 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($432);
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
                            return Fm$Term$xlam(Fm$Name$read("P"))((_x$6 => Fm$Constructor$build_term$opt(_type$1)(_ctor$2)));
                        case 'List.cons':
                            var $433 = self.head;
                            var $434 = self.tail;
                            return (() => {
                                var self = $433;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $435 = self.eras;
                                        var $436 = self.name;
                                        var $437 = self.term;
                                        return Fm$Term$xlam($436)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($434)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $438 = self.head;
                var $439 = self.tail;
                return (() => {
                    var self = $438;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $440 = self.eras;
                            var $441 = self.name;
                            var $442 = self.term;
                            return Fm$Term$xlam($441)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($439)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $443 = self.name;
                var $444 = self.pars;
                var $445 = self.inds;
                var $446 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $447 = self.name;
                            var $448 = self.args;
                            var $449 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($443)($444)($448);
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
                                        var $450 = self.name;
                                        var $451 = self.pars;
                                        var $452 = self.inds;
                                        var $453 = self.ctrs;
                                        return (() => {
                                            var self = _ctor$2;
                                            switch (self._) {
                                                case 'Fm.Constructor.new':
                                                    var $454 = self.name;
                                                    var $455 = self.args;
                                                    var $456 = self.inds;
                                                    return (() => {
                                                        var _type$13 = Fm$Term$xref(_name$3);
                                                        var _type$14 = (list_for($451)(_type$13)((_var$14 => (_type$15 => Fm$Term$xapp(_type$15)(Fm$Term$xref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $457 = self.eras;
                                                                    var $458 = self.name;
                                                                    var $459 = self.term;
                                                                    return $458;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($456)(_type$14)((_var$15 => (_type$16 => Fm$Term$xapp(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $460 = self.eras;
                                                                    var $461 = self.name;
                                                                    var $462 = self.term;
                                                                    return $462;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $463 = self.head;
                            var $464 = self.tail;
                            return (() => {
                                var self = $463;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $465 = self.eras;
                                        var $466 = self.name;
                                        var $467 = self.term;
                                        return Fm$Term$xall($465)("")($466)($467)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($464))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $468 = self.head;
                var $469 = self.tail;
                return (() => {
                    var self = $468;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $470 = self.eras;
                            var $471 = self.name;
                            var $472 = self.term;
                            return Fm$Term$xall($470)("")($471)($472)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($469)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $473 = self.name;
                var $474 = self.pars;
                var $475 = self.inds;
                var $476 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $477 = self.name;
                            var $478 = self.args;
                            var $479 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($473)($474)($478);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$adt = (_defs$1 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$2 => (() => {
        var self = _adt$2;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $480 = self.name;
                var $481 = self.pars;
                var $482 = self.inds;
                var $483 = self.ctrs;
                return (() => {
                    var _term$7 = Fm$Datatype$build_term(_adt$2);
                    var _term$8 = Fm$Term$bind(List$nil)((_x$8 => Bits$1(_x$8)))(_term$7);
                    var _type$9 = Fm$Datatype$build_type(_adt$2);
                    var _type$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$0(_x$10)))(_type$9);
                    var _defs$11 = Fm$set($480)(Fm$Def$new($480)(_term$8)(_type$10)(Fm$Status$init))(_defs$1);
                    var _defs$12 = List$fold($483)(_defs$11)((_ctr$12 => (_defs$13 => (() => {
                        var _typ_name$14 = $480;
                        var _ctr_name$15 = String$flatten(List$cons(_typ_name$14)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$12;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $484 = self.name;
                                    var $485 = self.args;
                                    var $486 = self.inds;
                                    return $484;
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
                var $487 = self.charCodeAt(0);
                var $488 = self.slice(1);
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
                var $489 = self.head;
                var $490 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($489)(List$cons(String$join$go(_sep$1)($490)(Bool$false))(List$nil))));
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
                var $491 = self.value;
                return _f$5($491);
        }
    })())));
    var Nat$is_zero = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Bool$true;
            case 'succ':
                var $492 = (self - 1n);
                return Bool$false;
        }
    })());
    var Nat$double = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $493 = (self - 1n);
                return Nat$succ(Nat$succ(Nat$double($493)));
        }
    })());
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $494 = (self - 1n);
                return $494;
        }
    })());
    var List$take = (_n$2 => (_xs$3 => (() => {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $495 = self.head;
                var $496 = self.tail;
                return (() => {
                    var self = _n$2;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return List$nil;
                        case 'succ':
                            var $497 = (self - 1n);
                            return List$cons($495)(List$take($497)($496));
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
                        var $498 = self.charCodeAt(0);
                        var $499 = self.slice(1);
                        return String$reverse$go($499)(String$cons($498)(_res$2));
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
                var $500 = (self - 1n);
                return (() => {
                    var self = _str$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return String$cons(_chr$2)(String$pad_right($500)(_chr$2)(""));
                        case 'cons':
                            var $501 = self.charCodeAt(0);
                            var $502 = self.slice(1);
                            return String$cons($501)(String$pad_right($500)(_chr$2)($502));
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
                        var $503 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($503));
                                case 'succ':
                                    var $504 = (self - 1n);
                                    return Nat$sub_rem($504)($503);
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
                        var $505 = self.value;
                        return Nat$div_mod$go($505)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $506 = self.value;
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
                        var $507 = self.fst;
                        var $508 = self.snd;
                        return (() => {
                            var self = $507;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($508)(_res$3);
                                case 'succ':
                                    var $509 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($507)(List$cons($508)(_res$3));
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
                                var $510 = self.value;
                                return $510;
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
    var String$color = (_col$1 => (_str$2 => String$cons(27)(String$cons(91)((_col$1 + String$cons(109)((_str$2 + String$cons(27)(String$cons(91)(String$cons(48)(String$cons(109)(String$nil)))))))))));
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
                        var $511 = self.charCodeAt(0);
                        var $512 = self.slice(1);
                        return (() => {
                            var self = ($511 === 10);
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
                                                                                var $513 = self.value;
                                                                                return Maybe$some(Nat$pred($513));
                                                                        }
                                                                    })();
                                                                case 'succ':
                                                                    var $514 = (self - 1n);
                                                                    return _lft$6;
                                                            }
                                                        })();
                                                        var _ix0$15 = Nat$pred(_ix0$2);
                                                        var _ix1$16 = Nat$pred(_ix1$3);
                                                        var _col$17 = 0n;
                                                        var _row$18 = Nat$succ(_row$5);
                                                        var _res$19 = List$take(_siz$13)(List$cons(String$reverse(_lin$7))(_res$8));
                                                        var _lin$20 = String$reverse(String$flatten(List$cons(String$pad_left(4n)(32)(Nat$show(_row$18)))(List$cons(" | ")(List$nil))));
                                                        return Fm$highlight$tc($512)(_ix0$15)(_ix1$16)(_col$17)(_row$18)(_lft$14)(_lin$20)(_res$19)
                                                    })();
                                            }
                                        })()
                                    })();
                                case 'false':
                                    return (() => {
                                        var _chr$11 = String$cons($511)(String$nil);
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
                                        return Fm$highlight$tc($512)(_ix0$13)(_ix1$14)(_col$15)(_row$5)(_lft$6)(_lin$16)(_res$8)
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
    var Fm$Defs$read = (_code$1 => (() => {
        var self = Fm$Parser$file(0n)(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $515 = self.idx;
                var $516 = self.code;
                var $517 = self.err;
                return (() => {
                    var _err$5 = $517;
                    var _hig$6 = Fm$highlight(_code$1)($515)(Nat$succ($515));
                    var _str$7 = String$flatten(List$cons(_err$5)(List$cons("\u{a}")(List$cons(_hig$6)(List$nil))));
                    return Either$left(_str$7)
                })();
            case 'Parser.Reply.value':
                var $518 = self.idx;
                var $519 = self.code;
                var $520 = self.val;
                return Either$right($520);
        }
    })());
    var Fm$exec = (_report$1 => (_code$2 => (() => {
        var self = Fm$Defs$read(_code$2);
        switch (self._) {
            case 'Either.left':
                var $521 = self.value;
                return $521;
            case 'Either.right':
                var $522 = self.value;
                return _report$1($522);
        }
    })()));
    var Map$values$go = (_xs$2 => (_list$3 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$3;
            case 'Map.tie':
                var $523 = self.val;
                var $524 = self.lft;
                var $525 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $523;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $526 = self.value;
                                return List$cons($526)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($524)(_list0$7);
                    var _list2$9 = Map$values$go($525)(_list1$8);
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
                var $527 = self.slice(0, -1);
                return (2n * Bits$to_nat($527));
            case '1':
                var $528 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($528)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $529 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($529)));
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
                var $530 = self.charCodeAt(0);
                var $531 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($530);
                    var _tail$5 = Fm$escape($531);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $532 = self.orig;
                var $533 = self.name;
                var $534 = self.indx;
                return Fm$Name$show($533);
            case 'Fm.Term.ref':
                var $535 = self.orig;
                var $536 = self.name;
                return Fm$Name$show($536);
            case 'Fm.Term.typ':
                var $537 = self.orig;
                return "*";
            case 'Fm.Term.all':
                var $538 = self.orig;
                var $539 = self.eras;
                var $540 = self.self;
                var $541 = self.name;
                var $542 = self.xtyp;
                var $543 = self.body;
                return (() => {
                    var _eras$8 = $539;
                    var _init$9 = (() => {
                        var self = _eras$8;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$10 = Fm$Name$show($540);
                    var _name$11 = Fm$Name$show($541);
                    var _xtyp$12 = Fm$Term$core($542);
                    var _body$13 = Fm$Term$core($543(Fm$Term$xvar($540)(0n))(Fm$Term$xvar($541)(0n)));
                    return String$flatten(List$cons(_init$9)(List$cons(_self$10)(List$cons("(")(List$cons(_name$11)(List$cons(":")(List$cons(_xtyp$12)(List$cons(") ")(List$cons(_body$13)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $544 = self.orig;
                var $545 = self.name;
                var $546 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($545);
                    var _body$6 = Fm$Term$core($546(Fm$Term$xvar($545)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$5)(List$cons(" ")(List$cons(_body$6)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $547 = self.orig;
                var $548 = self.func;
                var $549 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$core($548);
                    var _argm$6 = Fm$Term$core($549);
                    return String$flatten(List$cons("(")(List$cons(_func$5)(List$cons(" ")(List$cons(_argm$6)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $550 = self.orig;
                var $551 = self.name;
                var $552 = self.expr;
                var $553 = self.body;
                return (() => {
                    var _name$6 = Fm$Name$show($551);
                    var _expr$7 = Fm$Term$core($552);
                    var _body$8 = Fm$Term$core($553(Fm$Term$xvar($551)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $554 = self.orig;
                var $555 = self.name;
                var $556 = self.expr;
                var $557 = self.body;
                return (() => {
                    var _name$6 = Fm$Name$show($555);
                    var _expr$7 = Fm$Term$core($556);
                    var _body$8 = Fm$Term$core($557(Fm$Term$xvar($555)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $558 = self.orig;
                var $559 = self.done;
                var $560 = self.term;
                var $561 = self.type;
                return (() => {
                    var _term$6 = Fm$Term$core($560);
                    var _type$7 = Fm$Term$core($561);
                    return String$flatten(List$cons("{")(List$cons(_term$6)(List$cons(":")(List$cons(_type$7)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $562 = self.orig;
                var $563 = self.name;
                var $564 = self.dref;
                var $565 = self.verb;
                return "<ERROR>";
            case 'Fm.Term.hol':
                var $566 = self.orig;
                var $567 = self.path;
                return "<ERROR>";
            case 'Fm.Term.nat':
                var $568 = self.orig;
                var $569 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($569))(List$nil)));
            case 'Fm.Term.chr':
                var $570 = self.orig;
                var $571 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($571))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $572 = self.orig;
                var $573 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($573))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $574 = self.orig;
                var $575 = self.path;
                var $576 = self.expr;
                var $577 = self.name;
                var $578 = self.with;
                var $579 = self.cses;
                var $580 = self.moti;
                return "<ERROR>";
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $581 = self.name;
                    var $582 = self.term;
                    var $583 = self.type;
                    var $584 = self.stat;
                    return (() => {
                        var self = $584;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$9 = $581;
                                    var _term$10 = Fm$Term$core($582);
                                    var _type$11 = Fm$Term$core($583);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$9)(List$cons(" : ")(List$cons(_type$11)(List$cons(" = ")(List$cons(_term$10)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $585 = self.errors;
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
                                    var $586 = self.val;
                                    var $587 = self.lft;
                                    var $588 = self.rgt;
                                    return $586;
                            }
                        })();
                    case '0':
                        var $589 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $590 = self.val;
                                    var $591 = self.lft;
                                    var $592 = self.rgt;
                                    return Map$get($589)($591);
                            }
                        })();
                    case '1':
                        var $593 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $594 = self.val;
                                    var $595 = self.lft;
                                    var $596 = self.rgt;
                                    return Map$get($593)($596);
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
                var $597 = self.value;
                var $598 = self.errors;
                return (() => {
                    var self = $597;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($598);
                        case 'Maybe.some':
                            var $599 = self.value;
                            return (() => {
                                var self = _f$4($599);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $600 = self.value;
                                        var $601 = self.errors;
                                        return Fm$Check$result($600)(List$concat($598)($601));
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
                var $602 = self.value;
                return Maybe$some(_f$4($602));
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
    var Fm$Term$xnat = Fm$Term$nat(Maybe$none);
    var Fm$Term$unroll_nat = (_natx$1 => (() => {
        var self = _natx$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Fm$Term$xref(Fm$Name$read("Nat.zero"));
            case 'succ':
                var $603 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$xref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$xnat($603);
                    return Fm$Term$xapp(_func$3)(_argm$4)
                })();
        }
    })());
    var Fm$Term$unroll_chr$bits = (_bits$1 => (() => {
        var self = _bits$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Fm$Term$xref(Fm$Name$read("Bits.nil"));
            case '0':
                var $604 = self.slice(0, -1);
                return Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($604));
            case '1':
                var $605 = self.slice(0, -1);
                return Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($605));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $606 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$xref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$xapp(_term$3)(Fm$Term$xnat(16n));
                    var _term$5 = Fm$Term$xapp(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($606)));
                    var _term$6 = Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("U16.new")))(_term$5);
                    return _term$6
                })();
        }
    })());
    var Fm$Term$xchr = Fm$Term$chr(Maybe$none);
    var Fm$Term$xstr = Fm$Term$str(Maybe$none);
    var Fm$Term$unroll_str = (_strx$1 => (() => {
        var self = _strx$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Fm$Term$xref(Fm$Name$read("String.nil"));
            case 'cons':
                var $607 = self.charCodeAt(0);
                var $608 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$xchr($607);
                    var _term$5 = Fm$Term$xref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$xapp(_term$5)(_char$4);
                    var _term$7 = Fm$Term$xapp(_term$6)(Fm$Term$xstr($608));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $609 = self.orig;
                var $610 = self.name;
                var $611 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $612 = self.orig;
                var $613 = self.name;
                return (() => {
                    var self = Fm$get($613)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($612)($613);
                        case 'Maybe.some':
                            var $614 = self.value;
                            return (() => {
                                var self = $614;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $615 = self.name;
                                        var $616 = self.term;
                                        var $617 = self.type;
                                        var $618 = self.stat;
                                        return Fm$Term$reduce($616)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $619 = self.orig;
                return _term$1;
            case 'Fm.Term.all':
                var $620 = self.orig;
                var $621 = self.eras;
                var $622 = self.self;
                var $623 = self.name;
                var $624 = self.xtyp;
                var $625 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $626 = self.orig;
                var $627 = self.name;
                var $628 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $629 = self.orig;
                var $630 = self.func;
                var $631 = self.argm;
                return (() => {
                    var _func$6 = Fm$Term$reduce($630)(_defs$2);
                    return (() => {
                        var self = _func$6;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $632 = self.orig;
                                var $633 = self.name;
                                var $634 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $635 = self.orig;
                                var $636 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                var $637 = self.orig;
                                return _term$1;
                            case 'Fm.Term.all':
                                var $638 = self.orig;
                                var $639 = self.eras;
                                var $640 = self.self;
                                var $641 = self.name;
                                var $642 = self.xtyp;
                                var $643 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $644 = self.orig;
                                var $645 = self.name;
                                var $646 = self.body;
                                return Fm$Term$reduce($646($631))(_defs$2);
                            case 'Fm.Term.app':
                                var $647 = self.orig;
                                var $648 = self.func;
                                var $649 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $650 = self.orig;
                                var $651 = self.name;
                                var $652 = self.expr;
                                var $653 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $654 = self.orig;
                                var $655 = self.name;
                                var $656 = self.expr;
                                var $657 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $658 = self.orig;
                                var $659 = self.done;
                                var $660 = self.term;
                                var $661 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $662 = self.orig;
                                var $663 = self.name;
                                var $664 = self.dref;
                                var $665 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $666 = self.orig;
                                var $667 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $668 = self.orig;
                                var $669 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $670 = self.orig;
                                var $671 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $672 = self.orig;
                                var $673 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $674 = self.orig;
                                var $675 = self.path;
                                var $676 = self.expr;
                                var $677 = self.name;
                                var $678 = self.with;
                                var $679 = self.cses;
                                var $680 = self.moti;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $681 = self.orig;
                var $682 = self.name;
                var $683 = self.expr;
                var $684 = self.body;
                return Fm$Term$reduce($684($683))(_defs$2);
            case 'Fm.Term.def':
                var $685 = self.orig;
                var $686 = self.name;
                var $687 = self.expr;
                var $688 = self.body;
                return Fm$Term$reduce($688($687))(_defs$2);
            case 'Fm.Term.ann':
                var $689 = self.orig;
                var $690 = self.done;
                var $691 = self.term;
                var $692 = self.type;
                return Fm$Term$reduce($691)(_defs$2);
            case 'Fm.Term.gol':
                var $693 = self.orig;
                var $694 = self.name;
                var $695 = self.dref;
                var $696 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $697 = self.orig;
                var $698 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $699 = self.orig;
                var $700 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($700))(_defs$2);
            case 'Fm.Term.chr':
                var $701 = self.orig;
                var $702 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($702))(_defs$2);
            case 'Fm.Term.str':
                var $703 = self.orig;
                var $704 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($704))(_defs$2);
            case 'Fm.Term.cse':
                var $705 = self.orig;
                var $706 = self.path;
                var $707 = self.expr;
                var $708 = self.name;
                var $709 = self.with;
                var $710 = self.cses;
                var $711 = self.moti;
                return _term$1;
        }
    })()));
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
                var $712 = self.head;
                var $713 = self.tail;
                return (() => {
                    var self = $712;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $714 = self.name;
                            var $715 = self.term;
                            var $716 = self.type;
                            var $717 = self.stat;
                            return Fm$Term$xall(Bool$false)("")($714)($716)((_s$9 => (_x$10 => Fm$Term$desugar_cse$motive($713)(_moti$2))));
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
                var $718 = self.charCodeAt(0);
                var $719 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $720 = self.orig;
                var $721 = self.name;
                var $722 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $723 = self.head;
                            var $724 = self.tail;
                            return (() => {
                                var self = $723;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $725 = self.name;
                                        var $726 = self.term;
                                        var $727 = self.type;
                                        var $728 = self.stat;
                                        return Fm$Term$xlam($725)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($724)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $729 = self.orig;
                var $730 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $731 = self.head;
                            var $732 = self.tail;
                            return (() => {
                                var self = $731;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $733 = self.name;
                                        var $734 = self.term;
                                        var $735 = self.type;
                                        var $736 = self.stat;
                                        return Fm$Term$xlam($733)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($732)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $737 = self.orig;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $738 = self.head;
                            var $739 = self.tail;
                            return (() => {
                                var self = $738;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $740 = self.name;
                                        var $741 = self.term;
                                        var $742 = self.type;
                                        var $743 = self.stat;
                                        return Fm$Term$xlam($740)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($739)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $744 = self.orig;
                var $745 = self.eras;
                var $746 = self.self;
                var $747 = self.name;
                var $748 = self.xtyp;
                var $749 = self.body;
                return Fm$Term$xlam((() => {
                    var self = String$is_empty($747);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($747)(List$nil))));
                    }
                })())((_x$12 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($749(Fm$Term$xvar($746)(0n))(Fm$Term$xvar($747)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $750 = self.orig;
                var $751 = self.name;
                var $752 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $753 = self.head;
                            var $754 = self.tail;
                            return (() => {
                                var self = $753;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $755 = self.name;
                                        var $756 = self.term;
                                        var $757 = self.type;
                                        var $758 = self.stat;
                                        return Fm$Term$xlam($755)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($754)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $759 = self.orig;
                var $760 = self.func;
                var $761 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $762 = self.head;
                            var $763 = self.tail;
                            return (() => {
                                var self = $762;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $764 = self.name;
                                        var $765 = self.term;
                                        var $766 = self.type;
                                        var $767 = self.stat;
                                        return Fm$Term$xlam($764)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($763)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $768 = self.orig;
                var $769 = self.name;
                var $770 = self.expr;
                var $771 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $772 = self.head;
                            var $773 = self.tail;
                            return (() => {
                                var self = $772;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $774 = self.name;
                                        var $775 = self.term;
                                        var $776 = self.type;
                                        var $777 = self.stat;
                                        return Fm$Term$xlam($774)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($773)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $778 = self.orig;
                var $779 = self.name;
                var $780 = self.expr;
                var $781 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $782 = self.head;
                            var $783 = self.tail;
                            return (() => {
                                var self = $782;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $784 = self.name;
                                        var $785 = self.term;
                                        var $786 = self.type;
                                        var $787 = self.stat;
                                        return Fm$Term$xlam($784)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($783)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $788 = self.orig;
                var $789 = self.done;
                var $790 = self.term;
                var $791 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $792 = self.head;
                            var $793 = self.tail;
                            return (() => {
                                var self = $792;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $794 = self.name;
                                        var $795 = self.term;
                                        var $796 = self.type;
                                        var $797 = self.stat;
                                        return Fm$Term$xlam($794)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($793)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $798 = self.orig;
                var $799 = self.name;
                var $800 = self.dref;
                var $801 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $802 = self.head;
                            var $803 = self.tail;
                            return (() => {
                                var self = $802;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $804 = self.name;
                                        var $805 = self.term;
                                        var $806 = self.type;
                                        var $807 = self.stat;
                                        return Fm$Term$xlam($804)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($803)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $808 = self.orig;
                var $809 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $810 = self.head;
                            var $811 = self.tail;
                            return (() => {
                                var self = $810;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $812 = self.name;
                                        var $813 = self.term;
                                        var $814 = self.type;
                                        var $815 = self.stat;
                                        return Fm$Term$xlam($812)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($811)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $816 = self.orig;
                var $817 = self.natx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $818 = self.head;
                            var $819 = self.tail;
                            return (() => {
                                var self = $818;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $820 = self.name;
                                        var $821 = self.term;
                                        var $822 = self.type;
                                        var $823 = self.stat;
                                        return Fm$Term$xlam($820)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($819)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $824 = self.orig;
                var $825 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $826 = self.head;
                            var $827 = self.tail;
                            return (() => {
                                var self = $826;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $828 = self.name;
                                        var $829 = self.term;
                                        var $830 = self.type;
                                        var $831 = self.stat;
                                        return Fm$Term$xlam($828)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($827)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $832 = self.orig;
                var $833 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $834 = self.head;
                            var $835 = self.tail;
                            return (() => {
                                var self = $834;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $836 = self.name;
                                        var $837 = self.term;
                                        var $838 = self.type;
                                        var $839 = self.stat;
                                        return Fm$Term$xlam($836)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($835)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $840 = self.orig;
                var $841 = self.path;
                var $842 = self.expr;
                var $843 = self.name;
                var $844 = self.with;
                var $845 = self.cses;
                var $846 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $847 = self.head;
                            var $848 = self.tail;
                            return (() => {
                                var self = $847;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $849 = self.name;
                                        var $850 = self.term;
                                        var $851 = self.type;
                                        var $852 = self.stat;
                                        return Fm$Term$xlam($849)((_x$19 => Fm$Term$desugar_cse$argument(_name$1)($848)(_type$3)(_body$4)(_defs$5)));
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
                var $853 = self.value;
                return Maybe$some($853);
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
                        var $854 = self.orig;
                        var $855 = self.name;
                        var $856 = self.indx;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $857 = self.name;
                                        var $858 = self.term;
                                        var $859 = self.type;
                                        var $860 = self.stat;
                                        return $858;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ref':
                        var $861 = self.orig;
                        var $862 = self.name;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $863 = self.name;
                                        var $864 = self.term;
                                        var $865 = self.type;
                                        var $866 = self.stat;
                                        return $864;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.typ':
                        var $867 = self.orig;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$xapp(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $868 = self.name;
                                        var $869 = self.term;
                                        var $870 = self.type;
                                        var $871 = self.stat;
                                        return $869;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.all':
                        var $872 = self.orig;
                        var $873 = self.eras;
                        var $874 = self.self;
                        var $875 = self.name;
                        var $876 = self.xtyp;
                        var $877 = self.body;
                        return (() => {
                            var _got$14 = Maybe$or(Fm$get($875)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$14;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$15 = (list_for(_wyth$3)(_expr$1)((_def$15 => (_expr$16 => (() => {
                                                var self = _def$15;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $878 = self.name;
                                                        var $879 = self.term;
                                                        var $880 = self.type;
                                                        var $881 = self.stat;
                                                        return Fm$Term$xapp(_expr$16)($879);
                                                }
                                            })()))));
                                            return _expr$15
                                        })();
                                    case 'Maybe.some':
                                        var $882 = self.value;
                                        return (() => {
                                            var _argm$16 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($876)($882)(_defs$6);
                                            var _expr$17 = Fm$Term$xapp(_expr$1)(_argm$16);
                                            var _type$18 = $877(Fm$Term$xvar($874)(0n))(Fm$Term$xvar($875)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$17)(_name$2)(_wyth$3)(_cses$4)(_type$18)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $883 = self.orig;
                        var $884 = self.name;
                        var $885 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $886 = self.name;
                                        var $887 = self.term;
                                        var $888 = self.type;
                                        var $889 = self.stat;
                                        return $887;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.app':
                        var $890 = self.orig;
                        var $891 = self.func;
                        var $892 = self.argm;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $893 = self.name;
                                        var $894 = self.term;
                                        var $895 = self.type;
                                        var $896 = self.stat;
                                        return $894;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.let':
                        var $897 = self.orig;
                        var $898 = self.name;
                        var $899 = self.expr;
                        var $900 = self.body;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $901 = self.name;
                                        var $902 = self.term;
                                        var $903 = self.type;
                                        var $904 = self.stat;
                                        return $902;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.def':
                        var $905 = self.orig;
                        var $906 = self.name;
                        var $907 = self.expr;
                        var $908 = self.body;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $909 = self.name;
                                        var $910 = self.term;
                                        var $911 = self.type;
                                        var $912 = self.stat;
                                        return $910;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.ann':
                        var $913 = self.orig;
                        var $914 = self.done;
                        var $915 = self.term;
                        var $916 = self.type;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $917 = self.name;
                                        var $918 = self.term;
                                        var $919 = self.type;
                                        var $920 = self.stat;
                                        return $918;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.gol':
                        var $921 = self.orig;
                        var $922 = self.name;
                        var $923 = self.dref;
                        var $924 = self.verb;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $925 = self.name;
                                        var $926 = self.term;
                                        var $927 = self.type;
                                        var $928 = self.stat;
                                        return $926;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.hol':
                        var $929 = self.orig;
                        var $930 = self.path;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $931 = self.name;
                                        var $932 = self.term;
                                        var $933 = self.type;
                                        var $934 = self.stat;
                                        return $932;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.nat':
                        var $935 = self.orig;
                        var $936 = self.natx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $937 = self.name;
                                        var $938 = self.term;
                                        var $939 = self.type;
                                        var $940 = self.stat;
                                        return $938;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.chr':
                        var $941 = self.orig;
                        var $942 = self.chrx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $943 = self.name;
                                        var $944 = self.term;
                                        var $945 = self.type;
                                        var $946 = self.stat;
                                        return $944;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.str':
                        var $947 = self.orig;
                        var $948 = self.strx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $949 = self.name;
                                        var $950 = self.term;
                                        var $951 = self.type;
                                        var $952 = self.stat;
                                        return $950;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.cse':
                        var $953 = self.orig;
                        var $954 = self.path;
                        var $955 = self.expr;
                        var $956 = self.name;
                        var $957 = self.with;
                        var $958 = self.cses;
                        var $959 = self.moti;
                        return (() => {
                            var _expr$15 = (list_for(_wyth$3)(_expr$1)((_def$15 => (_expr$16 => Fm$Term$xapp(_expr$16)((() => {
                                var self = _def$15;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $960 = self.name;
                                        var $961 = self.term;
                                        var $962 = self.type;
                                        var $963 = self.stat;
                                        return $961;
                                }
                            })())))));
                            return _expr$15
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
                var $964 = self.orig;
                var $965 = self.name;
                var $966 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $967 = self.orig;
                var $968 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                var $969 = self.orig;
                return Maybe$none;
            case 'Fm.Term.all':
                var $970 = self.orig;
                var $971 = self.eras;
                var $972 = self.self;
                var $973 = self.name;
                var $974 = self.xtyp;
                var $975 = self.body;
                return (() => {
                    var _moti$15 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$16 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($974)(_moti$15)(_defs$7);
                    var _expr$17 = Fm$Term$xapp(_expr$1)(_argm$16);
                    var _type$18 = $975(Fm$Term$xvar($972)(0n))(Fm$Term$xvar($973)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$17)(_name$2)(_with$3)(_cses$4)(_type$18)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $976 = self.orig;
                var $977 = self.name;
                var $978 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $979 = self.orig;
                var $980 = self.func;
                var $981 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $982 = self.orig;
                var $983 = self.name;
                var $984 = self.expr;
                var $985 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $986 = self.orig;
                var $987 = self.name;
                var $988 = self.expr;
                var $989 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $990 = self.orig;
                var $991 = self.done;
                var $992 = self.term;
                var $993 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $994 = self.orig;
                var $995 = self.name;
                var $996 = self.dref;
                var $997 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $998 = self.orig;
                var $999 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1000 = self.orig;
                var $1001 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1002 = self.orig;
                var $1003 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1004 = self.orig;
                var $1005 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1006 = self.orig;
                var $1007 = self.path;
                var $1008 = self.expr;
                var $1009 = self.name;
                var $1010 = self.with;
                var $1011 = self.cses;
                var $1012 = self.moti;
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
                var $1013 = self.value;
                return $1013(Bits$nil);
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
                var $1014 = u16_to_word(self);
                return $1014;
        }
    })());
    var Fm$Term$serialize$go = (_term$1 => (_depth$2 => (_init$3 => (_x$4 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1015 = self.orig;
                var $1016 = self.name;
                var $1017 = self.indx;
                return (() => {
                    var self = ($1017 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$8 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $1017 <= 0n ? 0n : _depth$2 - $1017)))));
                                return Bits$0(Bits$0(Bits$1(_name$8(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$8 = a1 => (a1 + (nat_to_bits($1017)));
                                return Bits$0(Bits$1(Bits$0(_name$8(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $1018 = self.orig;
                var $1019 = self.name;
                return (() => {
                    var _name$7 = a1 => (a1 + (fm_name_to_bits($1019)));
                    return Bits$0(Bits$0(Bits$0(_name$7(_x$4))))
                })();
            case 'Fm.Term.typ':
                var $1020 = self.orig;
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $1021 = self.orig;
                var $1022 = self.eras;
                var $1023 = self.self;
                var $1024 = self.name;
                var $1025 = self.xtyp;
                var $1026 = self.body;
                return (() => {
                    var _eras$11 = (() => {
                        var self = $1022;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$12 = a1 => (a1 + (fm_name_to_bits($1023)));
                    var _xtyp$13 = Fm$Term$serialize$go($1025)(_depth$2)(_init$3);
                    var _body$14 = Fm$Term$serialize$go($1026(Fm$Term$xvar($1023)(_depth$2))(Fm$Term$xvar($1024)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$11(_self$12(_xtyp$13(_body$14(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $1027 = self.orig;
                var $1028 = self.name;
                var $1029 = self.body;
                return (() => {
                    var _body$8 = Fm$Term$serialize$go($1029(Fm$Term$xvar($1028)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$8(_x$4))))
                })();
            case 'Fm.Term.app':
                var $1030 = self.orig;
                var $1031 = self.func;
                var $1032 = self.argm;
                return (() => {
                    var _func$8 = Fm$Term$serialize$go($1031)(_depth$2)(_init$3);
                    var _argm$9 = Fm$Term$serialize$go($1032)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$8(_argm$9(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $1033 = self.orig;
                var $1034 = self.name;
                var $1035 = self.expr;
                var $1036 = self.body;
                return (() => {
                    var _expr$9 = Fm$Term$serialize$go($1035)(_depth$2)(_init$3);
                    var _body$10 = Fm$Term$serialize$go($1036(Fm$Term$xvar($1034)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$9(_body$10(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $1037 = self.orig;
                var $1038 = self.name;
                var $1039 = self.expr;
                var $1040 = self.body;
                return Fm$Term$serialize$go($1040($1039))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $1041 = self.orig;
                var $1042 = self.done;
                var $1043 = self.term;
                var $1044 = self.type;
                return Fm$Term$serialize$go($1043)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $1045 = self.orig;
                var $1046 = self.name;
                var $1047 = self.dref;
                var $1048 = self.verb;
                return (() => {
                    var _name$9 = a1 => (a1 + (fm_name_to_bits($1046)));
                    return Bits$0(Bits$0(Bits$0(_name$9(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $1049 = self.orig;
                var $1050 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $1051 = self.orig;
                var $1052 = self.natx;
                return Bits$0(Bits$0(Bits$0((_x$4 + (nat_to_bits($1052))))));
            case 'Fm.Term.chr':
                var $1053 = self.orig;
                var $1054 = self.chrx;
                return Bits$0(Bits$0(Bits$0((_x$4 + Word$to_bits(U16$to_word($1054))))));
            case 'Fm.Term.str':
                var $1055 = self.orig;
                var $1056 = self.strx;
                return Fm$Term$serialize$go(Fm$Term$unroll_str($1056))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $1057 = self.orig;
                var $1058 = self.path;
                var $1059 = self.expr;
                var $1060 = self.name;
                var $1061 = self.with;
                var $1062 = self.cses;
                var $1063 = self.moti;
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
                                    var $1064 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $1065 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '0':
                        var $1066 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $1067 = self.slice(0, -1);
                                    return Bits$eql($1066)($1067);
                                case '1':
                                    var $1068 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '1':
                        var $1069 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $1070 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $1071 = self.slice(0, -1);
                                    return Bits$eql($1069)($1071);
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
                var $1072 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $1073 = self.orig;
                var $1074 = self.name;
                var $1075 = self.indx;
                return Fm$Term$var($1073)($1074)($1075);
            case 'Fm.Term.ref':
                var $1076 = self.orig;
                var $1077 = self.name;
                return Fm$Term$ref($1076)($1077);
            case 'Fm.Term.typ':
                var $1078 = self.orig;
                return Fm$Term$typ($1078);
            case 'Fm.Term.all':
                var $1079 = self.orig;
                var $1080 = self.eras;
                var $1081 = self.self;
                var $1082 = self.name;
                var $1083 = self.xtyp;
                var $1084 = self.body;
                return Fm$Term$all($1079)($1080)($1081)($1082)(Fm$Term$normalize($1083)(_defs$2))((_s$9 => (_x$10 => Fm$Term$normalize($1084(_s$9)(_x$10))(_defs$2))));
            case 'Fm.Term.lam':
                var $1085 = self.orig;
                var $1086 = self.name;
                var $1087 = self.body;
                return Fm$Term$lam($1085)($1086)((_x$6 => Fm$Term$normalize($1087(_x$6))(_defs$2)));
            case 'Fm.Term.app':
                var $1088 = self.orig;
                var $1089 = self.func;
                var $1090 = self.argm;
                return Fm$Term$app($1088)(Fm$Term$normalize($1089)(_defs$2))(Fm$Term$normalize($1090)(_defs$2));
            case 'Fm.Term.let':
                var $1091 = self.orig;
                var $1092 = self.name;
                var $1093 = self.expr;
                var $1094 = self.body;
                return Fm$Term$let($1091)($1092)(Fm$Term$normalize($1093)(_defs$2))((_x$7 => Fm$Term$normalize($1094(_x$7))(_defs$2)));
            case 'Fm.Term.def':
                var $1095 = self.orig;
                var $1096 = self.name;
                var $1097 = self.expr;
                var $1098 = self.body;
                return Fm$Term$def($1095)($1096)(Fm$Term$normalize($1097)(_defs$2))((_x$7 => Fm$Term$normalize($1098(_x$7))(_defs$2)));
            case 'Fm.Term.ann':
                var $1099 = self.orig;
                var $1100 = self.done;
                var $1101 = self.term;
                var $1102 = self.type;
                return Fm$Term$ann($1099)($1100)(Fm$Term$normalize($1101)(_defs$2))(Fm$Term$normalize($1102)(_defs$2));
            case 'Fm.Term.gol':
                var $1103 = self.orig;
                var $1104 = self.name;
                var $1105 = self.dref;
                var $1106 = self.verb;
                return Fm$Term$gol($1103)($1104)($1105)($1106);
            case 'Fm.Term.hol':
                var $1107 = self.orig;
                var $1108 = self.path;
                return Fm$Term$hol($1107)($1108);
            case 'Fm.Term.nat':
                var $1109 = self.orig;
                var $1110 = self.natx;
                return Fm$Term$nat($1109)($1110);
            case 'Fm.Term.chr':
                var $1111 = self.orig;
                var $1112 = self.chrx;
                return Fm$Term$chr($1111)($1112);
            case 'Fm.Term.str':
                var $1113 = self.orig;
                var $1114 = self.strx;
                return Fm$Term$str($1113)($1114);
            case 'Fm.Term.cse':
                var $1115 = self.orig;
                var $1116 = self.path;
                var $1117 = self.expr;
                var $1118 = self.name;
                var $1119 = self.with;
                var $1120 = self.cses;
                var $1121 = self.moti;
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
                                var $1122 = self.orig;
                                var $1123 = self.name;
                                var $1124 = self.indx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1125 = self.orig;
                                            var $1126 = self.name;
                                            var $1127 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1128 = self.orig;
                                            var $1129 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1130 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1131 = self.orig;
                                            var $1132 = self.eras;
                                            var $1133 = self.self;
                                            var $1134 = self.name;
                                            var $1135 = self.xtyp;
                                            var $1136 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1137 = self.orig;
                                            var $1138 = self.name;
                                            var $1139 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1140 = self.orig;
                                            var $1141 = self.func;
                                            var $1142 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1143 = self.orig;
                                            var $1144 = self.name;
                                            var $1145 = self.expr;
                                            var $1146 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1147 = self.orig;
                                            var $1148 = self.name;
                                            var $1149 = self.expr;
                                            var $1150 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1151 = self.orig;
                                            var $1152 = self.done;
                                            var $1153 = self.term;
                                            var $1154 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1155 = self.orig;
                                            var $1156 = self.name;
                                            var $1157 = self.dref;
                                            var $1158 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1159 = self.orig;
                                            var $1160 = self.path;
                                            return Fm$Term$equal$patch($1160)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1161 = self.orig;
                                            var $1162 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1163 = self.orig;
                                            var $1164 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1165 = self.orig;
                                            var $1166 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1167 = self.orig;
                                            var $1168 = self.path;
                                            var $1169 = self.expr;
                                            var $1170 = self.name;
                                            var $1171 = self.with;
                                            var $1172 = self.cses;
                                            var $1173 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ref':
                                var $1174 = self.orig;
                                var $1175 = self.name;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1176 = self.orig;
                                            var $1177 = self.name;
                                            var $1178 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1179 = self.orig;
                                            var $1180 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1181 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1182 = self.orig;
                                            var $1183 = self.eras;
                                            var $1184 = self.self;
                                            var $1185 = self.name;
                                            var $1186 = self.xtyp;
                                            var $1187 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1188 = self.orig;
                                            var $1189 = self.name;
                                            var $1190 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1191 = self.orig;
                                            var $1192 = self.func;
                                            var $1193 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1194 = self.orig;
                                            var $1195 = self.name;
                                            var $1196 = self.expr;
                                            var $1197 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1198 = self.orig;
                                            var $1199 = self.name;
                                            var $1200 = self.expr;
                                            var $1201 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1202 = self.orig;
                                            var $1203 = self.done;
                                            var $1204 = self.term;
                                            var $1205 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1206 = self.orig;
                                            var $1207 = self.name;
                                            var $1208 = self.dref;
                                            var $1209 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1210 = self.orig;
                                            var $1211 = self.path;
                                            return Fm$Term$equal$patch($1211)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1212 = self.orig;
                                            var $1213 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1214 = self.orig;
                                            var $1215 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1216 = self.orig;
                                            var $1217 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1218 = self.orig;
                                            var $1219 = self.path;
                                            var $1220 = self.expr;
                                            var $1221 = self.name;
                                            var $1222 = self.with;
                                            var $1223 = self.cses;
                                            var $1224 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.typ':
                                var $1225 = self.orig;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1226 = self.orig;
                                            var $1227 = self.name;
                                            var $1228 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1229 = self.orig;
                                            var $1230 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1231 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1232 = self.orig;
                                            var $1233 = self.eras;
                                            var $1234 = self.self;
                                            var $1235 = self.name;
                                            var $1236 = self.xtyp;
                                            var $1237 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1238 = self.orig;
                                            var $1239 = self.name;
                                            var $1240 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1241 = self.orig;
                                            var $1242 = self.func;
                                            var $1243 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1244 = self.orig;
                                            var $1245 = self.name;
                                            var $1246 = self.expr;
                                            var $1247 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1248 = self.orig;
                                            var $1249 = self.name;
                                            var $1250 = self.expr;
                                            var $1251 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1252 = self.orig;
                                            var $1253 = self.done;
                                            var $1254 = self.term;
                                            var $1255 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1256 = self.orig;
                                            var $1257 = self.name;
                                            var $1258 = self.dref;
                                            var $1259 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1260 = self.orig;
                                            var $1261 = self.path;
                                            return Fm$Term$equal$patch($1261)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1262 = self.orig;
                                            var $1263 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1264 = self.orig;
                                            var $1265 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1266 = self.orig;
                                            var $1267 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1268 = self.orig;
                                            var $1269 = self.path;
                                            var $1270 = self.expr;
                                            var $1271 = self.name;
                                            var $1272 = self.with;
                                            var $1273 = self.cses;
                                            var $1274 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.all':
                                var $1275 = self.orig;
                                var $1276 = self.eras;
                                var $1277 = self.self;
                                var $1278 = self.name;
                                var $1279 = self.xtyp;
                                var $1280 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1281 = self.orig;
                                            var $1282 = self.name;
                                            var $1283 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1284 = self.orig;
                                            var $1285 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1286 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1287 = self.orig;
                                            var $1288 = self.eras;
                                            var $1289 = self.self;
                                            var $1290 = self.name;
                                            var $1291 = self.xtyp;
                                            var $1292 = self.body;
                                            return (() => {
                                                var _seen$23 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$24 = $1280(Fm$Term$xvar($1277)(_lv$4))(Fm$Term$xvar($1278)(Nat$succ(_lv$4)));
                                                var _b1_body$25 = $1292(Fm$Term$xvar($1289)(_lv$4))(Fm$Term$xvar($1290)(Nat$succ(_lv$4)));
                                                var _eq_self$26 = ($1277 === $1289);
                                                var _eq_eras$27 = Bool$eql($1276)($1288);
                                                return (() => {
                                                    var self = (_eq_self$26 && _eq_eras$27);
                                                    switch (self ? 'true' : 'false') {
                                                        case 'true':
                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1279)($1291)(_defs$3)(_lv$4)(_seen$23))((_eq_type$28 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$24)(_b1_body$25)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$23))((_eq_body$29 => Monad$pure(Fm$Check$monad)((_eq_type$28 && _eq_body$29))))));
                                                        case 'false':
                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                    }
                                                })()
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1293 = self.orig;
                                            var $1294 = self.name;
                                            var $1295 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1296 = self.orig;
                                            var $1297 = self.func;
                                            var $1298 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1299 = self.orig;
                                            var $1300 = self.name;
                                            var $1301 = self.expr;
                                            var $1302 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1303 = self.orig;
                                            var $1304 = self.name;
                                            var $1305 = self.expr;
                                            var $1306 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1307 = self.orig;
                                            var $1308 = self.done;
                                            var $1309 = self.term;
                                            var $1310 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1311 = self.orig;
                                            var $1312 = self.name;
                                            var $1313 = self.dref;
                                            var $1314 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1315 = self.orig;
                                            var $1316 = self.path;
                                            return Fm$Term$equal$patch($1316)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1317 = self.orig;
                                            var $1318 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1319 = self.orig;
                                            var $1320 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1321 = self.orig;
                                            var $1322 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1323 = self.orig;
                                            var $1324 = self.path;
                                            var $1325 = self.expr;
                                            var $1326 = self.name;
                                            var $1327 = self.with;
                                            var $1328 = self.cses;
                                            var $1329 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.lam':
                                var $1330 = self.orig;
                                var $1331 = self.name;
                                var $1332 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1333 = self.orig;
                                            var $1334 = self.name;
                                            var $1335 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1336 = self.orig;
                                            var $1337 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1338 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1339 = self.orig;
                                            var $1340 = self.eras;
                                            var $1341 = self.self;
                                            var $1342 = self.name;
                                            var $1343 = self.xtyp;
                                            var $1344 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1345 = self.orig;
                                            var $1346 = self.name;
                                            var $1347 = self.body;
                                            return (() => {
                                                var _seen$17 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$18 = $1332(Fm$Term$xvar($1331)(_lv$4));
                                                var _b1_body$19 = $1347(Fm$Term$xvar($1346)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$20 => Monad$pure(Fm$Check$monad)(_eq_body$20)))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1348 = self.orig;
                                            var $1349 = self.func;
                                            var $1350 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1351 = self.orig;
                                            var $1352 = self.name;
                                            var $1353 = self.expr;
                                            var $1354 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1355 = self.orig;
                                            var $1356 = self.name;
                                            var $1357 = self.expr;
                                            var $1358 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1359 = self.orig;
                                            var $1360 = self.done;
                                            var $1361 = self.term;
                                            var $1362 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1363 = self.orig;
                                            var $1364 = self.name;
                                            var $1365 = self.dref;
                                            var $1366 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1367 = self.orig;
                                            var $1368 = self.path;
                                            return Fm$Term$equal$patch($1368)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1369 = self.orig;
                                            var $1370 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1371 = self.orig;
                                            var $1372 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1373 = self.orig;
                                            var $1374 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1375 = self.orig;
                                            var $1376 = self.path;
                                            var $1377 = self.expr;
                                            var $1378 = self.name;
                                            var $1379 = self.with;
                                            var $1380 = self.cses;
                                            var $1381 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.app':
                                var $1382 = self.orig;
                                var $1383 = self.func;
                                var $1384 = self.argm;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1385 = self.orig;
                                            var $1386 = self.name;
                                            var $1387 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1388 = self.orig;
                                            var $1389 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1390 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1391 = self.orig;
                                            var $1392 = self.eras;
                                            var $1393 = self.self;
                                            var $1394 = self.name;
                                            var $1395 = self.xtyp;
                                            var $1396 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1397 = self.orig;
                                            var $1398 = self.name;
                                            var $1399 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1400 = self.orig;
                                            var $1401 = self.func;
                                            var $1402 = self.argm;
                                            return (() => {
                                                var _seen$17 = Set$set(_id$10)(_seen$5);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1383)($1401)(_defs$3)(_lv$4)(_seen$17))((_eq_func$18 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1384)($1402)(_defs$3)(_lv$4)(_seen$17))((_eq_argm$19 => Monad$pure(Fm$Check$monad)((_eq_func$18 && _eq_argm$19))))))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1403 = self.orig;
                                            var $1404 = self.name;
                                            var $1405 = self.expr;
                                            var $1406 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1407 = self.orig;
                                            var $1408 = self.name;
                                            var $1409 = self.expr;
                                            var $1410 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1411 = self.orig;
                                            var $1412 = self.done;
                                            var $1413 = self.term;
                                            var $1414 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1415 = self.orig;
                                            var $1416 = self.name;
                                            var $1417 = self.dref;
                                            var $1418 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1419 = self.orig;
                                            var $1420 = self.path;
                                            return Fm$Term$equal$patch($1420)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1421 = self.orig;
                                            var $1422 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1423 = self.orig;
                                            var $1424 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1425 = self.orig;
                                            var $1426 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1427 = self.orig;
                                            var $1428 = self.path;
                                            var $1429 = self.expr;
                                            var $1430 = self.name;
                                            var $1431 = self.with;
                                            var $1432 = self.cses;
                                            var $1433 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.let':
                                var $1434 = self.orig;
                                var $1435 = self.name;
                                var $1436 = self.expr;
                                var $1437 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1438 = self.orig;
                                            var $1439 = self.name;
                                            var $1440 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1441 = self.orig;
                                            var $1442 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1443 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1444 = self.orig;
                                            var $1445 = self.eras;
                                            var $1446 = self.self;
                                            var $1447 = self.name;
                                            var $1448 = self.xtyp;
                                            var $1449 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1450 = self.orig;
                                            var $1451 = self.name;
                                            var $1452 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1453 = self.orig;
                                            var $1454 = self.func;
                                            var $1455 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1456 = self.orig;
                                            var $1457 = self.name;
                                            var $1458 = self.expr;
                                            var $1459 = self.body;
                                            return (() => {
                                                var _seen$19 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$20 = $1437(Fm$Term$xvar($1435)(_lv$4));
                                                var _b1_body$21 = $1459(Fm$Term$xvar($1457)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1436)($1458)(_defs$3)(_lv$4)(_seen$19))((_eq_expr$22 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$20)(_b1_body$21)(_defs$3)(Nat$succ(_lv$4))(_seen$19))((_eq_body$23 => Monad$pure(Fm$Check$monad)((_eq_expr$22 && _eq_body$23))))))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1460 = self.orig;
                                            var $1461 = self.name;
                                            var $1462 = self.expr;
                                            var $1463 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1464 = self.orig;
                                            var $1465 = self.done;
                                            var $1466 = self.term;
                                            var $1467 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1468 = self.orig;
                                            var $1469 = self.name;
                                            var $1470 = self.dref;
                                            var $1471 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1472 = self.orig;
                                            var $1473 = self.path;
                                            return Fm$Term$equal$patch($1473)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1474 = self.orig;
                                            var $1475 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1476 = self.orig;
                                            var $1477 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1478 = self.orig;
                                            var $1479 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1480 = self.orig;
                                            var $1481 = self.path;
                                            var $1482 = self.expr;
                                            var $1483 = self.name;
                                            var $1484 = self.with;
                                            var $1485 = self.cses;
                                            var $1486 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.def':
                                var $1487 = self.orig;
                                var $1488 = self.name;
                                var $1489 = self.expr;
                                var $1490 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1491 = self.orig;
                                            var $1492 = self.name;
                                            var $1493 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1494 = self.orig;
                                            var $1495 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1496 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1497 = self.orig;
                                            var $1498 = self.eras;
                                            var $1499 = self.self;
                                            var $1500 = self.name;
                                            var $1501 = self.xtyp;
                                            var $1502 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1503 = self.orig;
                                            var $1504 = self.name;
                                            var $1505 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1506 = self.orig;
                                            var $1507 = self.func;
                                            var $1508 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1509 = self.orig;
                                            var $1510 = self.name;
                                            var $1511 = self.expr;
                                            var $1512 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1513 = self.orig;
                                            var $1514 = self.name;
                                            var $1515 = self.expr;
                                            var $1516 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1517 = self.orig;
                                            var $1518 = self.done;
                                            var $1519 = self.term;
                                            var $1520 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1521 = self.orig;
                                            var $1522 = self.name;
                                            var $1523 = self.dref;
                                            var $1524 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1525 = self.orig;
                                            var $1526 = self.path;
                                            return Fm$Term$equal$patch($1526)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1527 = self.orig;
                                            var $1528 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1529 = self.orig;
                                            var $1530 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1531 = self.orig;
                                            var $1532 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1533 = self.orig;
                                            var $1534 = self.path;
                                            var $1535 = self.expr;
                                            var $1536 = self.name;
                                            var $1537 = self.with;
                                            var $1538 = self.cses;
                                            var $1539 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ann':
                                var $1540 = self.orig;
                                var $1541 = self.done;
                                var $1542 = self.term;
                                var $1543 = self.type;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1544 = self.orig;
                                            var $1545 = self.name;
                                            var $1546 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1547 = self.orig;
                                            var $1548 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1549 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1550 = self.orig;
                                            var $1551 = self.eras;
                                            var $1552 = self.self;
                                            var $1553 = self.name;
                                            var $1554 = self.xtyp;
                                            var $1555 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1556 = self.orig;
                                            var $1557 = self.name;
                                            var $1558 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1559 = self.orig;
                                            var $1560 = self.func;
                                            var $1561 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1562 = self.orig;
                                            var $1563 = self.name;
                                            var $1564 = self.expr;
                                            var $1565 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1566 = self.orig;
                                            var $1567 = self.name;
                                            var $1568 = self.expr;
                                            var $1569 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1570 = self.orig;
                                            var $1571 = self.done;
                                            var $1572 = self.term;
                                            var $1573 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1574 = self.orig;
                                            var $1575 = self.name;
                                            var $1576 = self.dref;
                                            var $1577 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1578 = self.orig;
                                            var $1579 = self.path;
                                            return Fm$Term$equal$patch($1579)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1580 = self.orig;
                                            var $1581 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1582 = self.orig;
                                            var $1583 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1584 = self.orig;
                                            var $1585 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1586 = self.orig;
                                            var $1587 = self.path;
                                            var $1588 = self.expr;
                                            var $1589 = self.name;
                                            var $1590 = self.with;
                                            var $1591 = self.cses;
                                            var $1592 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.gol':
                                var $1593 = self.orig;
                                var $1594 = self.name;
                                var $1595 = self.dref;
                                var $1596 = self.verb;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1597 = self.orig;
                                            var $1598 = self.name;
                                            var $1599 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1600 = self.orig;
                                            var $1601 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1602 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1603 = self.orig;
                                            var $1604 = self.eras;
                                            var $1605 = self.self;
                                            var $1606 = self.name;
                                            var $1607 = self.xtyp;
                                            var $1608 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1609 = self.orig;
                                            var $1610 = self.name;
                                            var $1611 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1612 = self.orig;
                                            var $1613 = self.func;
                                            var $1614 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1615 = self.orig;
                                            var $1616 = self.name;
                                            var $1617 = self.expr;
                                            var $1618 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1619 = self.orig;
                                            var $1620 = self.name;
                                            var $1621 = self.expr;
                                            var $1622 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1623 = self.orig;
                                            var $1624 = self.done;
                                            var $1625 = self.term;
                                            var $1626 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1627 = self.orig;
                                            var $1628 = self.name;
                                            var $1629 = self.dref;
                                            var $1630 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1631 = self.orig;
                                            var $1632 = self.path;
                                            return Fm$Term$equal$patch($1632)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1633 = self.orig;
                                            var $1634 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1635 = self.orig;
                                            var $1636 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1637 = self.orig;
                                            var $1638 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1639 = self.orig;
                                            var $1640 = self.path;
                                            var $1641 = self.expr;
                                            var $1642 = self.name;
                                            var $1643 = self.with;
                                            var $1644 = self.cses;
                                            var $1645 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.hol':
                                var $1646 = self.orig;
                                var $1647 = self.path;
                                return Fm$Term$equal$patch($1647)(_b$2);
                            case 'Fm.Term.nat':
                                var $1648 = self.orig;
                                var $1649 = self.natx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1650 = self.orig;
                                            var $1651 = self.name;
                                            var $1652 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1653 = self.orig;
                                            var $1654 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1655 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1656 = self.orig;
                                            var $1657 = self.eras;
                                            var $1658 = self.self;
                                            var $1659 = self.name;
                                            var $1660 = self.xtyp;
                                            var $1661 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1662 = self.orig;
                                            var $1663 = self.name;
                                            var $1664 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1665 = self.orig;
                                            var $1666 = self.func;
                                            var $1667 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1668 = self.orig;
                                            var $1669 = self.name;
                                            var $1670 = self.expr;
                                            var $1671 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1672 = self.orig;
                                            var $1673 = self.name;
                                            var $1674 = self.expr;
                                            var $1675 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1676 = self.orig;
                                            var $1677 = self.done;
                                            var $1678 = self.term;
                                            var $1679 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1680 = self.orig;
                                            var $1681 = self.name;
                                            var $1682 = self.dref;
                                            var $1683 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1684 = self.orig;
                                            var $1685 = self.path;
                                            return Fm$Term$equal$patch($1685)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1686 = self.orig;
                                            var $1687 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1688 = self.orig;
                                            var $1689 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1690 = self.orig;
                                            var $1691 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1692 = self.orig;
                                            var $1693 = self.path;
                                            var $1694 = self.expr;
                                            var $1695 = self.name;
                                            var $1696 = self.with;
                                            var $1697 = self.cses;
                                            var $1698 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.chr':
                                var $1699 = self.orig;
                                var $1700 = self.chrx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1701 = self.orig;
                                            var $1702 = self.name;
                                            var $1703 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1704 = self.orig;
                                            var $1705 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1706 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1707 = self.orig;
                                            var $1708 = self.eras;
                                            var $1709 = self.self;
                                            var $1710 = self.name;
                                            var $1711 = self.xtyp;
                                            var $1712 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1713 = self.orig;
                                            var $1714 = self.name;
                                            var $1715 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1716 = self.orig;
                                            var $1717 = self.func;
                                            var $1718 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1719 = self.orig;
                                            var $1720 = self.name;
                                            var $1721 = self.expr;
                                            var $1722 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1723 = self.orig;
                                            var $1724 = self.name;
                                            var $1725 = self.expr;
                                            var $1726 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1727 = self.orig;
                                            var $1728 = self.done;
                                            var $1729 = self.term;
                                            var $1730 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1731 = self.orig;
                                            var $1732 = self.name;
                                            var $1733 = self.dref;
                                            var $1734 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1735 = self.orig;
                                            var $1736 = self.path;
                                            return Fm$Term$equal$patch($1736)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1737 = self.orig;
                                            var $1738 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1739 = self.orig;
                                            var $1740 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1741 = self.orig;
                                            var $1742 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1743 = self.orig;
                                            var $1744 = self.path;
                                            var $1745 = self.expr;
                                            var $1746 = self.name;
                                            var $1747 = self.with;
                                            var $1748 = self.cses;
                                            var $1749 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.str':
                                var $1750 = self.orig;
                                var $1751 = self.strx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1752 = self.orig;
                                            var $1753 = self.name;
                                            var $1754 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1755 = self.orig;
                                            var $1756 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1757 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1758 = self.orig;
                                            var $1759 = self.eras;
                                            var $1760 = self.self;
                                            var $1761 = self.name;
                                            var $1762 = self.xtyp;
                                            var $1763 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1764 = self.orig;
                                            var $1765 = self.name;
                                            var $1766 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1767 = self.orig;
                                            var $1768 = self.func;
                                            var $1769 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1770 = self.orig;
                                            var $1771 = self.name;
                                            var $1772 = self.expr;
                                            var $1773 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1774 = self.orig;
                                            var $1775 = self.name;
                                            var $1776 = self.expr;
                                            var $1777 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1778 = self.orig;
                                            var $1779 = self.done;
                                            var $1780 = self.term;
                                            var $1781 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1782 = self.orig;
                                            var $1783 = self.name;
                                            var $1784 = self.dref;
                                            var $1785 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1786 = self.orig;
                                            var $1787 = self.path;
                                            return Fm$Term$equal$patch($1787)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1788 = self.orig;
                                            var $1789 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1790 = self.orig;
                                            var $1791 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1792 = self.orig;
                                            var $1793 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1794 = self.orig;
                                            var $1795 = self.path;
                                            var $1796 = self.expr;
                                            var $1797 = self.name;
                                            var $1798 = self.with;
                                            var $1799 = self.cses;
                                            var $1800 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.cse':
                                var $1801 = self.orig;
                                var $1802 = self.path;
                                var $1803 = self.expr;
                                var $1804 = self.name;
                                var $1805 = self.with;
                                var $1806 = self.cses;
                                var $1807 = self.moti;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1808 = self.orig;
                                            var $1809 = self.name;
                                            var $1810 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1811 = self.orig;
                                            var $1812 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            var $1813 = self.orig;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1814 = self.orig;
                                            var $1815 = self.eras;
                                            var $1816 = self.self;
                                            var $1817 = self.name;
                                            var $1818 = self.xtyp;
                                            var $1819 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1820 = self.orig;
                                            var $1821 = self.name;
                                            var $1822 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1823 = self.orig;
                                            var $1824 = self.func;
                                            var $1825 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1826 = self.orig;
                                            var $1827 = self.name;
                                            var $1828 = self.expr;
                                            var $1829 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1830 = self.orig;
                                            var $1831 = self.name;
                                            var $1832 = self.expr;
                                            var $1833 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1834 = self.orig;
                                            var $1835 = self.done;
                                            var $1836 = self.term;
                                            var $1837 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1838 = self.orig;
                                            var $1839 = self.name;
                                            var $1840 = self.dref;
                                            var $1841 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1842 = self.orig;
                                            var $1843 = self.path;
                                            return Fm$Term$equal$patch($1843)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1844 = self.orig;
                                            var $1845 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1846 = self.orig;
                                            var $1847 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1848 = self.orig;
                                            var $1849 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1850 = self.orig;
                                            var $1851 = self.path;
                                            var $1852 = self.expr;
                                            var $1853 = self.name;
                                            var $1854 = self.with;
                                            var $1855 = self.cses;
                                            var $1856 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                        }
                    })();
            }
        })()
    })())))));
    var Set$new = Map$new;
    var Fm$Term$origin = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1857 = self.orig;
                var $1858 = self.name;
                var $1859 = self.indx;
                return $1857;
            case 'Fm.Term.ref':
                var $1860 = self.orig;
                var $1861 = self.name;
                return $1860;
            case 'Fm.Term.typ':
                var $1862 = self.orig;
                return $1862;
            case 'Fm.Term.all':
                var $1863 = self.orig;
                var $1864 = self.eras;
                var $1865 = self.self;
                var $1866 = self.name;
                var $1867 = self.xtyp;
                var $1868 = self.body;
                return $1863;
            case 'Fm.Term.lam':
                var $1869 = self.orig;
                var $1870 = self.name;
                var $1871 = self.body;
                return $1869;
            case 'Fm.Term.app':
                var $1872 = self.orig;
                var $1873 = self.func;
                var $1874 = self.argm;
                return $1872;
            case 'Fm.Term.let':
                var $1875 = self.orig;
                var $1876 = self.name;
                var $1877 = self.expr;
                var $1878 = self.body;
                return $1875;
            case 'Fm.Term.def':
                var $1879 = self.orig;
                var $1880 = self.name;
                var $1881 = self.expr;
                var $1882 = self.body;
                return $1879;
            case 'Fm.Term.ann':
                var $1883 = self.orig;
                var $1884 = self.done;
                var $1885 = self.term;
                var $1886 = self.type;
                return $1883;
            case 'Fm.Term.gol':
                var $1887 = self.orig;
                var $1888 = self.name;
                var $1889 = self.dref;
                var $1890 = self.verb;
                return $1887;
            case 'Fm.Term.hol':
                var $1891 = self.orig;
                var $1892 = self.path;
                return $1891;
            case 'Fm.Term.nat':
                var $1893 = self.orig;
                var $1894 = self.natx;
                return $1893;
            case 'Fm.Term.chr':
                var $1895 = self.orig;
                var $1896 = self.chrx;
                return $1895;
            case 'Fm.Term.str':
                var $1897 = self.orig;
                var $1898 = self.strx;
                return $1897;
            case 'Fm.Term.cse':
                var $1899 = self.orig;
                var $1900 = self.path;
                var $1901 = self.expr;
                var $1902 = self.name;
                var $1903 = self.with;
                var $1904 = self.cses;
                var $1905 = self.moti;
                return $1899;
        }
    })());
    var Fm$Term$check = (_term$1 => (_type$2 => (_defs$3 => (_ctx$4 => (_path$5 => Monad$bind(Fm$Check$monad)((() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1906 = self.orig;
                var $1907 = self.name;
                var $1908 = self.indx;
                return (() => {
                    var self = List$at_last($1908)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1906)($1907))(List$nil));
                        case 'Maybe.some':
                            var $1909 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1909;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1910 = self.fst;
                                        var $1911 = self.snd;
                                        return $1911;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1912 = self.orig;
                var $1913 = self.name;
                return (() => {
                    var self = Fm$get($1913)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1912)($1913))(List$nil));
                        case 'Maybe.some':
                            var $1914 = self.value;
                            return (() => {
                                var self = $1914;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1915 = self.name;
                                        var $1916 = self.term;
                                        var $1917 = self.type;
                                        var $1918 = self.stat;
                                        return (() => {
                                            var _ref_name$13 = $1915;
                                            var _ref_type$14 = $1917;
                                            var _ref_term$15 = $1916;
                                            var _ref_stat$16 = $1918;
                                            return (() => {
                                                var self = _ref_stat$16;
                                                switch (self._) {
                                                    case 'Fm.Status.init':
                                                        return Fm$Check$result(Maybe$some(_ref_type$14))(List$cons(Fm$Error$waiting(_ref_name$13))(List$nil));
                                                    case 'Fm.Status.wait':
                                                        return Fm$Check$result(Maybe$some(_ref_type$14))(List$nil);
                                                    case 'Fm.Status.done':
                                                        return Fm$Check$result(Maybe$some(_ref_type$14))(List$nil);
                                                    case 'Fm.Status.fail':
                                                        var $1919 = self.errors;
                                                        return Fm$Check$result(Maybe$some(_ref_type$14))(List$cons(Fm$Error$indirect(_ref_name$13))(List$nil));
                                                }
                                            })()
                                        })();
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $1920 = self.orig;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xtyp);
            case 'Fm.Term.all':
                var $1921 = self.orig;
                var $1922 = self.eras;
                var $1923 = self.self;
                var $1924 = self.name;
                var $1925 = self.xtyp;
                var $1926 = self.body;
                return (() => {
                    var _ctx_size$12 = List$length(_ctx$4);
                    var _self_var$13 = Fm$Term$xvar($1923)(_ctx_size$12);
                    var _body_var$14 = Fm$Term$xvar($1924)(Nat$succ(_ctx_size$12));
                    var _body_ctx$15 = List$cons(Pair$new($1924)($1925))(List$cons(Pair$new($1923)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1925)(Maybe$some(Fm$Term$xtyp))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$16 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1926(_self_var$13)(_body_var$14))(Maybe$some(Fm$Term$xtyp))(_defs$3)(_body_ctx$15)(Fm$MPath$1(_path$5)))((_$17 => Monad$pure(Fm$Check$monad)(Fm$Term$xtyp)))))
                })();
            case 'Fm.Term.lam':
                var $1927 = self.orig;
                var $1928 = self.name;
                var $1929 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer($1927)(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1930 = self.value;
                            return (() => {
                                var _typv$10 = Fm$Term$reduce($1930)(_defs$3);
                                return (() => {
                                    var self = _typv$10;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1931 = self.orig;
                                            var $1932 = self.name;
                                            var $1933 = self.indx;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1934 = self.orig;
                                            var $1935 = self.name;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            var $1936 = self.orig;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1937 = self.orig;
                                            var $1938 = self.eras;
                                            var $1939 = self.self;
                                            var $1940 = self.name;
                                            var $1941 = self.xtyp;
                                            var $1942 = self.body;
                                            return (() => {
                                                var _ctx_size$17 = List$length(_ctx$4);
                                                var _self_var$18 = _term$1;
                                                var _body_var$19 = Fm$Term$xvar($1928)(_ctx_size$17);
                                                var _body_typ$20 = $1942(_self_var$18)(_body_var$19);
                                                var _body_ctx$21 = List$cons(Pair$new($1928)($1941))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1929(_body_var$19))(Maybe$some(_body_typ$20))(_defs$3)(_body_ctx$21)(Fm$MPath$0(_path$5)))((_$22 => Monad$pure(Fm$Check$monad)($1930)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1943 = self.orig;
                                            var $1944 = self.name;
                                            var $1945 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1946 = self.orig;
                                            var $1947 = self.func;
                                            var $1948 = self.argm;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1949 = self.orig;
                                            var $1950 = self.name;
                                            var $1951 = self.expr;
                                            var $1952 = self.body;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1953 = self.orig;
                                            var $1954 = self.name;
                                            var $1955 = self.expr;
                                            var $1956 = self.body;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1957 = self.orig;
                                            var $1958 = self.done;
                                            var $1959 = self.term;
                                            var $1960 = self.type;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1961 = self.orig;
                                            var $1962 = self.name;
                                            var $1963 = self.dref;
                                            var $1964 = self.verb;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1965 = self.orig;
                                            var $1966 = self.path;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1967 = self.orig;
                                            var $1968 = self.natx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1969 = self.orig;
                                            var $1970 = self.chrx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1971 = self.orig;
                                            var $1972 = self.strx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1973 = self.orig;
                                            var $1974 = self.path;
                                            var $1975 = self.expr;
                                            var $1976 = self.name;
                                            var $1977 = self.with;
                                            var $1978 = self.cses;
                                            var $1979 = self.moti;
                                            return (() => {
                                                var _expected$18 = Either$left("Function");
                                                var _detected$19 = Either$right($1930);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1927)(_expected$18)(_detected$19)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1980 = self.orig;
                var $1981 = self.func;
                var $1982 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1981)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_func_typ$9 => (() => {
                    var _func_typ$10 = Fm$Term$reduce(_func_typ$9)(_defs$3);
                    return (() => {
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1983 = self.orig;
                                var $1984 = self.name;
                                var $1985 = self.indx;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1986 = self.orig;
                                var $1987 = self.name;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.typ':
                                var $1988 = self.orig;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.all':
                                var $1989 = self.orig;
                                var $1990 = self.eras;
                                var $1991 = self.self;
                                var $1992 = self.name;
                                var $1993 = self.xtyp;
                                var $1994 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1982)(Maybe$some($1993))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$17 => Monad$pure(Fm$Check$monad)($1994($1981)($1982))));
                            case 'Fm.Term.lam':
                                var $1995 = self.orig;
                                var $1996 = self.name;
                                var $1997 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1998 = self.orig;
                                var $1999 = self.func;
                                var $2000 = self.argm;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $2001 = self.orig;
                                var $2002 = self.name;
                                var $2003 = self.expr;
                                var $2004 = self.body;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $2005 = self.orig;
                                var $2006 = self.name;
                                var $2007 = self.expr;
                                var $2008 = self.body;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $2009 = self.orig;
                                var $2010 = self.done;
                                var $2011 = self.term;
                                var $2012 = self.type;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $2013 = self.orig;
                                var $2014 = self.name;
                                var $2015 = self.dref;
                                var $2016 = self.verb;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $2017 = self.orig;
                                var $2018 = self.path;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $2019 = self.orig;
                                var $2020 = self.natx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $2021 = self.orig;
                                var $2022 = self.chrx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $2023 = self.orig;
                                var $2024 = self.strx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $2025 = self.orig;
                                var $2026 = self.path;
                                var $2027 = self.expr;
                                var $2028 = self.name;
                                var $2029 = self.with;
                                var $2030 = self.cses;
                                var $2031 = self.moti;
                                return (() => {
                                    var _expected$18 = Either$left("Function");
                                    var _detected$19 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1980)(_expected$18)(_detected$19)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $2032 = self.orig;
                var $2033 = self.name;
                var $2034 = self.expr;
                var $2035 = self.body;
                return (() => {
                    var _ctx_size$10 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($2034)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_expr_typ$11 => (() => {
                        var _body_val$12 = $2035(Fm$Term$xvar($2033)(_ctx_size$10));
                        var _body_ctx$13 = List$cons(Pair$new($2033)(_expr_typ$11))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$12)(_type$2)(_defs$3)(_body_ctx$13)(Fm$MPath$1(_path$5)))((_body_typ$14 => Monad$pure(Fm$Check$monad)(_body_typ$14)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $2036 = self.orig;
                var $2037 = self.name;
                var $2038 = self.expr;
                var $2039 = self.body;
                return Fm$Term$check($2039($2038))(_type$2)(_defs$3)(_ctx$4)(_path$5);
            case 'Fm.Term.ann':
                var $2040 = self.orig;
                var $2041 = self.done;
                var $2042 = self.term;
                var $2043 = self.type;
                return (() => {
                    var self = $2041;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($2043);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($2042)(Maybe$some($2043))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$10 => Monad$bind(Fm$Check$monad)(Fm$Term$check($2043)(Maybe$some(Fm$Term$xtyp))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$11 => Monad$pure(Fm$Check$monad)($2043)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $2044 = self.orig;
                var $2045 = self.name;
                var $2046 = self.dref;
                var $2047 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($2045)($2046)($2047)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $2048 = self.orig;
                var $2049 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $2050 = self.orig;
                var $2051 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("Nat"));
            case 'Fm.Term.chr':
                var $2052 = self.orig;
                var $2053 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("Char"));
            case 'Fm.Term.str':
                var $2054 = self.orig;
                var $2055 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("String"));
            case 'Fm.Term.cse':
                var $2056 = self.orig;
                var $2057 = self.path;
                var $2058 = self.expr;
                var $2059 = self.name;
                var $2060 = self.with;
                var $2061 = self.cses;
                var $2062 = self.moti;
                return (() => {
                    var _expr$13 = $2058;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$13)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_etyp$14 => (() => {
                        var _dsug$15 = Fm$Term$desugar_cse($2058)($2059)($2060)($2061)($2062)(_etyp$14)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$15;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer($2056)(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $2063 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($2063))(List$nil));
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
                var $2064 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($2064)(_infr$6)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$8 => (() => {
                    var self = _eqls$8;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($2064);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(Fm$Term$origin(_term$1))(Either$right($2064))(Either$right(_infr$6))(_ctx$4))(List$nil));
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
                var $2065 = self.head;
                var $2066 = self.tail;
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
                var $2067 = self.orig;
                var $2068 = self.name;
                var $2069 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2070 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2071 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $2072 = self.orig;
                var $2073 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2074 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2075 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.typ':
                var $2076 = self.orig;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2077 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2078 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $2079 = self.orig;
                var $2080 = self.eras;
                var $2081 = self.self;
                var $2082 = self.name;
                var $2083 = self.xtyp;
                var $2084 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2085 = self.slice(0, -1);
                            return Fm$Term$all($2079)($2080)($2081)($2082)(Fm$Term$patch_at($2085)($2083)(_fn$3))($2084);
                        case '1':
                            var $2086 = self.slice(0, -1);
                            return Fm$Term$all($2079)($2080)($2081)($2082)($2083)((_s$11 => (_x$12 => Fm$Term$patch_at($2086)($2084(_s$11)(_x$12))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $2087 = self.orig;
                var $2088 = self.name;
                var $2089 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2090 = self.slice(0, -1);
                            return Fm$Term$lam($2087)($2088)((_x$8 => Fm$Term$patch_at(Bits$tail(_path$1))($2089(_x$8))(_fn$3)));
                        case '1':
                            var $2091 = self.slice(0, -1);
                            return Fm$Term$lam($2087)($2088)((_x$8 => Fm$Term$patch_at(Bits$tail(_path$1))($2089(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $2092 = self.orig;
                var $2093 = self.func;
                var $2094 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2095 = self.slice(0, -1);
                            return Fm$Term$app($2092)(Fm$Term$patch_at($2095)($2093)(_fn$3))($2094);
                        case '1':
                            var $2096 = self.slice(0, -1);
                            return Fm$Term$app($2092)($2093)(Fm$Term$patch_at($2096)($2094)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $2097 = self.orig;
                var $2098 = self.name;
                var $2099 = self.expr;
                var $2100 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2101 = self.slice(0, -1);
                            return Fm$Term$let($2097)($2098)(Fm$Term$patch_at($2101)($2099)(_fn$3))($2100);
                        case '1':
                            var $2102 = self.slice(0, -1);
                            return Fm$Term$let($2097)($2098)($2099)((_x$9 => Fm$Term$patch_at($2102)($2100(_x$9))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $2103 = self.orig;
                var $2104 = self.name;
                var $2105 = self.expr;
                var $2106 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2107 = self.slice(0, -1);
                            return Fm$Term$def($2103)($2104)(Fm$Term$patch_at($2107)($2105)(_fn$3))($2106);
                        case '1':
                            var $2108 = self.slice(0, -1);
                            return Fm$Term$def($2103)($2104)($2105)((_x$9 => Fm$Term$patch_at($2108)($2106(_x$9))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $2109 = self.orig;
                var $2110 = self.done;
                var $2111 = self.term;
                var $2112 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2113 = self.slice(0, -1);
                            return Fm$Term$ann($2109)($2110)(Fm$Term$patch_at(_path$1)($2111)(_fn$3))($2112);
                        case '1':
                            var $2114 = self.slice(0, -1);
                            return Fm$Term$ann($2109)($2110)(Fm$Term$patch_at(_path$1)($2111)(_fn$3))($2112);
                    }
                })();
            case 'Fm.Term.gol':
                var $2115 = self.orig;
                var $2116 = self.name;
                var $2117 = self.dref;
                var $2118 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2119 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2120 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $2121 = self.orig;
                var $2122 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2123 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2124 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $2125 = self.orig;
                var $2126 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2127 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2128 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $2129 = self.orig;
                var $2130 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2131 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2132 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $2133 = self.orig;
                var $2134 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2135 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2136 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $2137 = self.orig;
                var $2138 = self.path;
                var $2139 = self.expr;
                var $2140 = self.name;
                var $2141 = self.with;
                var $2142 = self.cses;
                var $2143 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2144 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2145 = self.slice(0, -1);
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
                        var $2146 = self.head;
                        var $2147 = self.tail;
                        return (() => {
                            var self = $2146;
                            switch (self._) {
                                case 'Fm.Error.type_mismatch':
                                    var $2148 = self.origin;
                                    var $2149 = self.expected;
                                    var $2150 = self.detected;
                                    var $2151 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($2147)(_fixd$6);
                                case 'Fm.Error.show_goal':
                                    var $2152 = self.name;
                                    var $2153 = self.dref;
                                    var $2154 = self.verb;
                                    var $2155 = self.goal;
                                    var $2156 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($2147)(_fixd$6);
                                case 'Fm.Error.waiting':
                                    var $2157 = self.name;
                                    return (() => {
                                        var _defs$10 = Fm$Synth$one($2157)(_defs$4);
                                        return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$10)($2147)(Bool$true)
                                    })();
                                case 'Fm.Error.indirect':
                                    var $2158 = self.name;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($2147)(_fixd$6);
                                case 'Fm.Error.patch':
                                    var $2159 = self.path;
                                    var $2160 = self.term;
                                    return (() => {
                                        var self = $2159;
                                        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                            case 'nil':
                                                return Maybe$none;
                                            case '0':
                                                var $2161 = self.slice(0, -1);
                                                return (() => {
                                                    var _term$12 = Fm$Term$patch_at($2161)(_term$2)((_x$12 => $2160));
                                                    return Fm$Synth$fix(_name$1)(_term$12)(_type$3)(_defs$4)($2147)(Bool$true)
                                                })();
                                            case '1':
                                                var $2162 = self.slice(0, -1);
                                                return (() => {
                                                    var _type$12 = Fm$Term$patch_at($2162)(_type$3)((_x$12 => $2160));
                                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$12)(_defs$4)($2147)(Bool$true)
                                                })();
                                        }
                                    })();
                                case 'Fm.Error.undefined_reference':
                                    var $2163 = self.origin;
                                    var $2164 = self.name;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($2147)(_fixd$6);
                                case 'Fm.Error.cant_infer':
                                    var $2165 = self.origin;
                                    var $2166 = self.term;
                                    var $2167 = self.context;
                                    return Fm$Synth$fix(_name$1)(_term$2)(_type$3)(_defs$4)($2147)(_fixd$6);
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
                        var $2168 = self.value;
                        return (() => {
                            var self = $2168;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $2169 = self.name;
                                    var $2170 = self.term;
                                    var $2171 = self.type;
                                    var $2172 = self.stat;
                                    return (() => {
                                        var _name$8 = $2169;
                                        var _term$9 = $2170;
                                        var _type$10 = $2171;
                                        var _stat$11 = $2172;
                                        return (() => {
                                            var self = _stat$11;
                                            switch (self._) {
                                                case 'Fm.Status.init':
                                                    return (() => {
                                                        var _defs$12 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(Fm$Status$wait))(_defs$2);
                                                        var _checked$13 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$10)(Maybe$some(Fm$Term$xtyp))(_defs$12)(List$nil)(Fm$MPath$1(Fm$MPath$nil)))((_chk_type$13 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$9)(Maybe$some(_type$10))(_defs$12)(List$nil)(Fm$MPath$0(Fm$MPath$nil)))((_chk_term$14 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                        return (() => {
                                                            var self = _checked$13;
                                                            switch (self._) {
                                                                case 'Fm.Check.result':
                                                                    var $2173 = self.value;
                                                                    var $2174 = self.errors;
                                                                    return (() => {
                                                                        var self = List$is_empty($2174);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return (() => {
                                                                                    var _defs$16 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(Fm$Status$done))(_defs$12);
                                                                                    return _defs$16
                                                                                })();
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var _fixed$16 = Fm$Synth$fix(_name$8)(_term$9)(_type$10)(_defs$12)($2174)(Bool$false);
                                                                                    return (() => {
                                                                                        var self = _fixed$16;
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return (() => {
                                                                                                    var _stat$17 = Fm$Status$fail($2174);
                                                                                                    var _defs$18 = Fm$set(_name$8)(Fm$Def$new(_name$8)(_term$9)(_type$10)(_stat$17))(_defs$12);
                                                                                                    return _defs$18
                                                                                                })();
                                                                                            case 'Maybe.some':
                                                                                                var $2175 = self.value;
                                                                                                return Fm$Synth$one(_name$8)($2175);
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
                                                    var $2176 = self.errors;
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
                    var $2177 = self.name;
                    var $2178 = self.term;
                    var $2179 = self.type;
                    var $2180 = self.stat;
                    return (() => {
                        var _name$8 = $2177;
                        var _term$9 = $2178;
                        var _type$10 = $2179;
                        var _stat$11 = $2180;
                        return Fm$Synth$one(_name$8)(_defs$3)
                    })();
            }
        })()))));
        return _defs$2
    })());
    var Fm$to_core_all = (_code$1 => Fm$exec((_defs$2 => Fm$Defs$core(Fm$Synth$all(_defs$2))))(_code$1));
    var Fm$to_core_one = (_code$1 => (_name$2 => Fm$exec((_defs$3 => Fm$Defs$core(Fm$Synth$one(_name$2)(_defs$3))))(_code$1)));
    var Fm$Error$relevant = (_errors$1 => (_got$2 => (() => {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $2181 = self.head;
                var $2182 = self.tail;
                return (() => {
                    var _keep$5 = (() => {
                        var self = $2181;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2183 = self.origin;
                                var $2184 = self.expected;
                                var $2185 = self.detected;
                                var $2186 = self.context;
                                return (!_got$2);
                            case 'Fm.Error.show_goal':
                                var $2187 = self.name;
                                var $2188 = self.dref;
                                var $2189 = self.verb;
                                var $2190 = self.goal;
                                var $2191 = self.context;
                                return Bool$true;
                            case 'Fm.Error.waiting':
                                var $2192 = self.name;
                                return Bool$false;
                            case 'Fm.Error.indirect':
                                var $2193 = self.name;
                                return Bool$false;
                            case 'Fm.Error.patch':
                                var $2194 = self.path;
                                var $2195 = self.term;
                                return Bool$false;
                            case 'Fm.Error.undefined_reference':
                                var $2196 = self.origin;
                                var $2197 = self.name;
                                return (!_got$2);
                            case 'Fm.Error.cant_infer':
                                var $2198 = self.origin;
                                var $2199 = self.term;
                                var $2200 = self.context;
                                return (!_got$2);
                        }
                    })();
                    var _got$6 = (() => {
                        var self = $2181;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2201 = self.origin;
                                var $2202 = self.expected;
                                var $2203 = self.detected;
                                var $2204 = self.context;
                                return Bool$true;
                            case 'Fm.Error.show_goal':
                                var $2205 = self.name;
                                var $2206 = self.dref;
                                var $2207 = self.verb;
                                var $2208 = self.goal;
                                var $2209 = self.context;
                                return _got$2;
                            case 'Fm.Error.waiting':
                                var $2210 = self.name;
                                return _got$2;
                            case 'Fm.Error.indirect':
                                var $2211 = self.name;
                                return _got$2;
                            case 'Fm.Error.patch':
                                var $2212 = self.path;
                                var $2213 = self.term;
                                return _got$2;
                            case 'Fm.Error.undefined_reference':
                                var $2214 = self.origin;
                                var $2215 = self.name;
                                return Bool$true;
                            case 'Fm.Error.cant_infer':
                                var $2216 = self.origin;
                                var $2217 = self.term;
                                var $2218 = self.context;
                                return _got$2;
                        }
                    })();
                    var _tail$7 = Fm$Error$relevant($2182)(_got$6);
                    return (() => {
                        var self = _keep$5;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return List$cons($2181)(_tail$7);
                            case 'false':
                                return _tail$7;
                        }
                    })()
                })();
        }
    })()));
    var Maybe$bind = (_m$3 => (_f$4 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $2219 = self.value;
                return _f$4($2219);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2220 = self.orig;
                var $2221 = self.name;
                var $2222 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $2223 = self.orig;
                var $2224 = self.name;
                return (() => {
                    var self = ($2224 === "Nat.zero");
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Maybe$some(0n);
                        case 'false':
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.typ':
                var $2225 = self.orig;
                return Maybe$none;
            case 'Fm.Term.all':
                var $2226 = self.orig;
                var $2227 = self.eras;
                var $2228 = self.self;
                var $2229 = self.name;
                var $2230 = self.xtyp;
                var $2231 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $2232 = self.orig;
                var $2233 = self.name;
                var $2234 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $2235 = self.orig;
                var $2236 = self.func;
                var $2237 = self.argm;
                return (() => {
                    var self = $2236;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2238 = self.orig;
                            var $2239 = self.name;
                            var $2240 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $2241 = self.orig;
                            var $2242 = self.name;
                            return (() => {
                                var self = ($2242 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($2237))((_pred$7 => Monad$pure(Maybe$monad)(Nat$succ(_pred$7))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            var $2243 = self.orig;
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $2244 = self.orig;
                            var $2245 = self.eras;
                            var $2246 = self.self;
                            var $2247 = self.name;
                            var $2248 = self.xtyp;
                            var $2249 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $2250 = self.orig;
                            var $2251 = self.name;
                            var $2252 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $2253 = self.orig;
                            var $2254 = self.func;
                            var $2255 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $2256 = self.orig;
                            var $2257 = self.name;
                            var $2258 = self.expr;
                            var $2259 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $2260 = self.orig;
                            var $2261 = self.name;
                            var $2262 = self.expr;
                            var $2263 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $2264 = self.orig;
                            var $2265 = self.done;
                            var $2266 = self.term;
                            var $2267 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $2268 = self.orig;
                            var $2269 = self.name;
                            var $2270 = self.dref;
                            var $2271 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $2272 = self.orig;
                            var $2273 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $2274 = self.orig;
                            var $2275 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $2276 = self.orig;
                            var $2277 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $2278 = self.orig;
                            var $2279 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $2280 = self.orig;
                            var $2281 = self.path;
                            var $2282 = self.expr;
                            var $2283 = self.name;
                            var $2284 = self.with;
                            var $2285 = self.cses;
                            var $2286 = self.moti;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $2287 = self.orig;
                var $2288 = self.name;
                var $2289 = self.expr;
                var $2290 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $2291 = self.orig;
                var $2292 = self.name;
                var $2293 = self.expr;
                var $2294 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $2295 = self.orig;
                var $2296 = self.done;
                var $2297 = self.term;
                var $2298 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $2299 = self.orig;
                var $2300 = self.name;
                var $2301 = self.dref;
                var $2302 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $2303 = self.orig;
                var $2304 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $2305 = self.orig;
                var $2306 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $2307 = self.orig;
                var $2308 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $2309 = self.orig;
                var $2310 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $2311 = self.orig;
                var $2312 = self.path;
                var $2313 = self.expr;
                var $2314 = self.name;
                var $2315 = self.with;
                var $2316 = self.cses;
                var $2317 = self.moti;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2318 = self.orig;
                var $2319 = self.name;
                var $2320 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $2321 = self.orig;
                var $2322 = self.name;
                return (_name$2 === $2322);
            case 'Fm.Term.typ':
                var $2323 = self.orig;
                return Bool$false;
            case 'Fm.Term.all':
                var $2324 = self.orig;
                var $2325 = self.eras;
                var $2326 = self.self;
                var $2327 = self.name;
                var $2328 = self.xtyp;
                var $2329 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $2330 = self.orig;
                var $2331 = self.name;
                var $2332 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $2333 = self.orig;
                var $2334 = self.func;
                var $2335 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $2336 = self.orig;
                var $2337 = self.name;
                var $2338 = self.expr;
                var $2339 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $2340 = self.orig;
                var $2341 = self.name;
                var $2342 = self.expr;
                var $2343 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $2344 = self.orig;
                var $2345 = self.done;
                var $2346 = self.term;
                var $2347 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $2348 = self.orig;
                var $2349 = self.name;
                var $2350 = self.dref;
                var $2351 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $2352 = self.orig;
                var $2353 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $2354 = self.orig;
                var $2355 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $2356 = self.orig;
                var $2357 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $2358 = self.orig;
                var $2359 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $2360 = self.orig;
                var $2361 = self.path;
                var $2362 = self.expr;
                var $2363 = self.name;
                var $2364 = self.with;
                var $2365 = self.cses;
                var $2366 = self.moti;
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
                        var $2367 = self.orig;
                        var $2368 = self.name;
                        var $2369 = self.indx;
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
                                                        var $2370 = self.charCodeAt(0);
                                                        var $2371 = self.slice(1);
                                                        return ($2370 === 40);
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
                    case 'Fm.Term.ref':
                        var $2372 = self.orig;
                        var $2373 = self.name;
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
                                                        var $2374 = self.charCodeAt(0);
                                                        var $2375 = self.slice(1);
                                                        return ($2374 === 40);
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
                    case 'Fm.Term.typ':
                        var $2376 = self.orig;
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
                                                        var $2377 = self.charCodeAt(0);
                                                        var $2378 = self.slice(1);
                                                        return ($2377 === 40);
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
                    case 'Fm.Term.all':
                        var $2379 = self.orig;
                        var $2380 = self.eras;
                        var $2381 = self.self;
                        var $2382 = self.name;
                        var $2383 = self.xtyp;
                        var $2384 = self.body;
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
                                                        var $2385 = self.charCodeAt(0);
                                                        var $2386 = self.slice(1);
                                                        return ($2385 === 40);
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
                    case 'Fm.Term.lam':
                        var $2387 = self.orig;
                        var $2388 = self.name;
                        var $2389 = self.body;
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
                                                        var $2390 = self.charCodeAt(0);
                                                        var $2391 = self.slice(1);
                                                        return ($2390 === 40);
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
                    case 'Fm.Term.app':
                        var $2392 = self.orig;
                        var $2393 = self.func;
                        var $2394 = self.argm;
                        return (() => {
                            var _argm$7 = Fm$Term$show$go($2394)(Fm$MPath$1(_path$2));
                            return Fm$Term$show$app($2393)(Fm$MPath$0(_path$2))(List$cons(_argm$7)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $2395 = self.orig;
                        var $2396 = self.name;
                        var $2397 = self.expr;
                        var $2398 = self.body;
                        return (() => {
                            var _arity$8 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$8 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$10 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$11 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$10)(List$cons(" == ")(List$cons(_eq_rgt$11)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$10 = (() => {
                                                var self = _func$9;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2399 = self.charCodeAt(0);
                                                        var $2400 = self.slice(1);
                                                        return ($2399 === 40);
                                                }
                                            })();
                                            var _args$11 = String$join(",")(_args$3);
                                            var _func$12 = (() => {
                                                var self = _wrap$10;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$9)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$9;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$12)(List$cons("(")(List$cons(_args$11)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.def':
                        var $2401 = self.orig;
                        var $2402 = self.name;
                        var $2403 = self.expr;
                        var $2404 = self.body;
                        return (() => {
                            var _arity$8 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$8 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$10 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$11 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$10)(List$cons(" == ")(List$cons(_eq_rgt$11)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$10 = (() => {
                                                var self = _func$9;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2405 = self.charCodeAt(0);
                                                        var $2406 = self.slice(1);
                                                        return ($2405 === 40);
                                                }
                                            })();
                                            var _args$11 = String$join(",")(_args$3);
                                            var _func$12 = (() => {
                                                var self = _wrap$10;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$9)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$9;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$12)(List$cons("(")(List$cons(_args$11)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.ann':
                        var $2407 = self.orig;
                        var $2408 = self.done;
                        var $2409 = self.term;
                        var $2410 = self.type;
                        return (() => {
                            var _arity$8 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$8 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$10 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$11 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$10)(List$cons(" == ")(List$cons(_eq_rgt$11)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$10 = (() => {
                                                var self = _func$9;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2411 = self.charCodeAt(0);
                                                        var $2412 = self.slice(1);
                                                        return ($2411 === 40);
                                                }
                                            })();
                                            var _args$11 = String$join(",")(_args$3);
                                            var _func$12 = (() => {
                                                var self = _wrap$10;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$9)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$9;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$12)(List$cons("(")(List$cons(_args$11)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.gol':
                        var $2413 = self.orig;
                        var $2414 = self.name;
                        var $2415 = self.dref;
                        var $2416 = self.verb;
                        return (() => {
                            var _arity$8 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$8 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$10 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$11 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$10)(List$cons(" == ")(List$cons(_eq_rgt$11)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$9 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$10 = (() => {
                                                var self = _func$9;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2417 = self.charCodeAt(0);
                                                        var $2418 = self.slice(1);
                                                        return ($2417 === 40);
                                                }
                                            })();
                                            var _args$11 = String$join(",")(_args$3);
                                            var _func$12 = (() => {
                                                var self = _wrap$10;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$9)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$9;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$12)(List$cons("(")(List$cons(_args$11)(List$cons(")")(List$nil)))))
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.hol':
                        var $2419 = self.orig;
                        var $2420 = self.path;
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
                                                        var $2421 = self.charCodeAt(0);
                                                        var $2422 = self.slice(1);
                                                        return ($2421 === 40);
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
                    case 'Fm.Term.nat':
                        var $2423 = self.orig;
                        var $2424 = self.natx;
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
                                                        var $2425 = self.charCodeAt(0);
                                                        var $2426 = self.slice(1);
                                                        return ($2425 === 40);
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
                    case 'Fm.Term.chr':
                        var $2427 = self.orig;
                        var $2428 = self.chrx;
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
                                                        var $2429 = self.charCodeAt(0);
                                                        var $2430 = self.slice(1);
                                                        return ($2429 === 40);
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
                    case 'Fm.Term.str':
                        var $2431 = self.orig;
                        var $2432 = self.strx;
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
                                                        var $2433 = self.charCodeAt(0);
                                                        var $2434 = self.slice(1);
                                                        return ($2433 === 40);
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
                    case 'Fm.Term.cse':
                        var $2435 = self.orig;
                        var $2436 = self.path;
                        var $2437 = self.expr;
                        var $2438 = self.name;
                        var $2439 = self.with;
                        var $2440 = self.cses;
                        var $2441 = self.moti;
                        return (() => {
                            var _arity$11 = List$length(_args$3);
                            return (() => {
                                var self = (Fm$Term$show$is_ref(_term$1)("Equal") && (_arity$11 === 3n));
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return (() => {
                                            var _func$12 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _eq_lft$13 = Maybe$default("?")(List$at(1n)(_args$3));
                                            var _eq_rgt$14 = Maybe$default("?")(List$at(2n)(_args$3));
                                            return String$flatten(List$cons(_eq_lft$13)(List$cons(" == ")(List$cons(_eq_rgt$14)(List$nil))))
                                        })();
                                    case 'false':
                                        return (() => {
                                            var _func$12 = Fm$Term$show$go(_term$1)(_path$2);
                                            var _wrap$13 = (() => {
                                                var self = _func$12;
                                                switch (self.length === 0 ? 'nil' : 'cons') {
                                                    case 'nil':
                                                        return Bool$false;
                                                    case 'cons':
                                                        var $2442 = self.charCodeAt(0);
                                                        var $2443 = self.slice(1);
                                                        return ($2442 === 40);
                                                }
                                            })();
                                            var _args$14 = String$join(",")(_args$3);
                                            var _func$15 = (() => {
                                                var self = _wrap$13;
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return String$flatten(List$cons("(")(List$cons(_func$12)(List$cons(")")(List$nil))));
                                                    case 'false':
                                                        return _func$12;
                                                }
                                            })();
                                            return String$flatten(List$cons(_func$15)(List$cons("(")(List$cons(_args$14)(List$cons(")")(List$nil)))))
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
                var $2444 = self.val;
                var $2445 = self.lft;
                var $2446 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2444;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2447 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($2447))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($2445)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($2446)(Bits$1(_key$3))(_list1$9);
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
                var $2448 = self.slice(0, -1);
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
                            var $2449 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2448)($2449)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $2450 = self.slice(0, -1);
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
                            var $2451 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2450)($2451)(_chunk$7)
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
                var $2452 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($2452)(Bits$nil));
                        case '0':
                            var $2453 = self.slice(0, -1);
                            return Word$0(Word$from_bits($2452)($2453));
                        case '1':
                            var $2454 = self.slice(0, -1);
                            return Word$1(Word$from_bits($2452)($2454));
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
                var $2455 = self.fst;
                var $2456 = self.snd;
                return $2455;
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
                            var $2457 = self.orig;
                            var $2458 = self.name;
                            var $2459 = self.indx;
                            return Fm$Name$show($2458);
                        case 'Fm.Term.ref':
                            var $2460 = self.orig;
                            var $2461 = self.name;
                            return (() => {
                                var _name$5 = Fm$Name$show($2461);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$5;
                                        case 'Maybe.some':
                                            var $2462 = self.value;
                                            return (() => {
                                                var _path_val$7 = (Bits$1(Bits$nil) + Fm$Path$to_bits($2462));
                                                var _path_str$8 = Nat$show(Bits$to_nat(_path_val$7));
                                                return String$flatten(List$cons(_name$5)(List$cons(String$color("2")(("-" + _path_str$8)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            var $2463 = self.orig;
                            return "Type";
                        case 'Fm.Term.all':
                            var $2464 = self.orig;
                            var $2465 = self.eras;
                            var $2466 = self.self;
                            var $2467 = self.name;
                            var $2468 = self.xtyp;
                            var $2469 = self.body;
                            return (() => {
                                var _eras$9 = $2465;
                                var _self$10 = Fm$Name$show($2466);
                                var _name$11 = Fm$Name$show($2467);
                                var _type$12 = Fm$Term$show$go($2468)(Fm$MPath$0(_path$2));
                                var _open$13 = (() => {
                                    var self = _eras$9;
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return "<";
                                        case 'false':
                                            return "(";
                                    }
                                })();
                                var _clos$14 = (() => {
                                    var self = _eras$9;
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return ">";
                                        case 'false':
                                            return ")";
                                    }
                                })();
                                var _body$15 = Fm$Term$show$go($2469(Fm$Term$xvar($2466)(0n))(Fm$Term$xvar($2467)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$10)(List$cons(_open$13)(List$cons(_name$11)(List$cons(":")(List$cons(_type$12)(List$cons(_clos$14)(List$cons(" ")(List$cons(_body$15)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $2470 = self.orig;
                            var $2471 = self.name;
                            var $2472 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2471);
                                var _body$7 = Fm$Term$show$go($2472(Fm$Term$xvar($2471)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$6)(List$cons(") ")(List$cons(_body$7)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $2473 = self.orig;
                            var $2474 = self.func;
                            var $2475 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $2476 = self.orig;
                            var $2477 = self.name;
                            var $2478 = self.expr;
                            var $2479 = self.body;
                            return (() => {
                                var _name$7 = Fm$Name$show($2477);
                                var _expr$8 = Fm$Term$show$go($2478)(Fm$MPath$0(_path$2));
                                var _body$9 = Fm$Term$show$go($2479(Fm$Term$xvar($2477)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$7)(List$cons(" = ")(List$cons(_expr$8)(List$cons("; ")(List$cons(_body$9)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $2480 = self.orig;
                            var $2481 = self.name;
                            var $2482 = self.expr;
                            var $2483 = self.body;
                            return (() => {
                                var _name$7 = Fm$Name$show($2481);
                                var _expr$8 = Fm$Term$show$go($2482)(Fm$MPath$0(_path$2));
                                var _body$9 = Fm$Term$show$go($2483(Fm$Term$xvar($2481)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$7)(List$cons(" = ")(List$cons(_expr$8)(List$cons("; ")(List$cons(_body$9)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $2484 = self.orig;
                            var $2485 = self.done;
                            var $2486 = self.term;
                            var $2487 = self.type;
                            return (() => {
                                var _term$7 = Fm$Term$show$go($2486)(Fm$MPath$0(_path$2));
                                var _type$8 = Fm$Term$show$go($2487)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$7)(List$cons("::")(List$cons(_type$8)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $2488 = self.orig;
                            var $2489 = self.name;
                            var $2490 = self.dref;
                            var $2491 = self.verb;
                            return (() => {
                                var _name$7 = Fm$Name$show($2489);
                                return String$flatten(List$cons("?")(List$cons(_name$7)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $2492 = self.orig;
                            var $2493 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $2494 = self.orig;
                            var $2495 = self.natx;
                            return String$flatten(List$cons(Nat$show($2495))(List$nil));
                        case 'Fm.Term.chr':
                            var $2496 = self.orig;
                            var $2497 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2497))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $2498 = self.orig;
                            var $2499 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($2499))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $2500 = self.orig;
                            var $2501 = self.path;
                            var $2502 = self.expr;
                            var $2503 = self.name;
                            var $2504 = self.with;
                            var $2505 = self.cses;
                            var $2506 = self.moti;
                            return (() => {
                                var _expr$10 = Fm$Term$show$go($2502)(Fm$MPath$0(_path$2));
                                var _name$11 = Fm$Name$show($2503);
                                var _with$12 = String$join("")(List$mapped($2504)((_def$12 => (() => {
                                    var self = _def$12;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2507 = self.name;
                                            var $2508 = self.term;
                                            var $2509 = self.type;
                                            var $2510 = self.stat;
                                            return (() => {
                                                var _name$17 = Fm$Name$show($2507);
                                                var _type$18 = Fm$Term$show$go($2509)(Maybe$none);
                                                var _term$19 = Fm$Term$show$go($2508)(Maybe$none);
                                                return String$flatten(List$cons(_name$17)(List$cons(": ")(List$cons(_type$18)(List$cons(" = ")(List$cons(_term$19)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$13 = Map$to_list($2505);
                                var _cses$14 = String$join("")(List$mapped(_cses$13)((_x$14 => (() => {
                                    var _name$15 = Fm$Name$from_bits(Pair$fst(_x$14));
                                    var _term$16 = Fm$Term$show$go(Pair$snd(_x$14))(Maybe$none);
                                    return String$flatten(List$cons(_name$15)(List$cons(": ")(List$cons(_term$16)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$15 = Fm$Term$show$go($2506)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$10)(List$cons(" as ")(List$cons(_name$11)(List$cons(_with$12)(List$cons(" { ")(List$cons(_cses$14)(List$cons("} : ")(List$cons(_moti$15)(List$nil))))))))))
                            })();
                    }
                })();
            case 'Maybe.some':
                var $2511 = self.value;
                return $2511;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $2512 = self.head;
                var $2513 = self.tail;
                return (() => {
                    var self = $2512;
                    switch (self._) {
                        case 'Pair.new':
                            var $2514 = self.fst;
                            var $2515 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($2514);
                                var _type$7 = Fm$Term$show($2515);
                                var _rest$8 = Fm$Context$show($2513);
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
                var $2516 = self.orig;
                var $2517 = self.name;
                var $2518 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $2519 = self.orig;
                var $2520 = self.name;
                return (() => {
                    var self = Fm$get($2520)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($2519)($2520);
                        case 'Maybe.some':
                            var $2521 = self.value;
                            return (() => {
                                var self = $2521;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $2522 = self.name;
                                        var $2523 = self.term;
                                        var $2524 = self.type;
                                        var $2525 = self.stat;
                                        return $2523;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $2526 = self.orig;
                return _term$4;
            case 'Fm.Term.all':
                var $2527 = self.orig;
                var $2528 = self.eras;
                var $2529 = self.self;
                var $2530 = self.name;
                var $2531 = self.xtyp;
                var $2532 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $2533 = self.orig;
                var $2534 = self.name;
                var $2535 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $2536 = self.orig;
                var $2537 = self.func;
                var $2538 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $2539 = self.orig;
                var $2540 = self.name;
                var $2541 = self.expr;
                var $2542 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $2543 = self.orig;
                var $2544 = self.name;
                var $2545 = self.expr;
                var $2546 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $2547 = self.orig;
                var $2548 = self.done;
                var $2549 = self.term;
                var $2550 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $2551 = self.orig;
                var $2552 = self.name;
                var $2553 = self.dref;
                var $2554 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $2555 = self.orig;
                var $2556 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $2557 = self.orig;
                var $2558 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $2559 = self.orig;
                var $2560 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $2561 = self.orig;
                var $2562 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $2563 = self.orig;
                var $2564 = self.path;
                var $2565 = self.expr;
                var $2566 = self.name;
                var $2567 = self.with;
                var $2568 = self.cses;
                var $2569 = self.moti;
                return _term$4;
        }
    })())))));
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2570 = self.orig;
                var $2571 = self.name;
                var $2572 = self.indx;
                return Fm$Term$var($2570)($2571)($2572);
            case 'Fm.Term.ref':
                var $2573 = self.orig;
                var $2574 = self.name;
                return (() => {
                    var _expand$6 = Bool$false;
                    var _expand$7 = ((($2574 === "Nat.succ") && (_arity$3 > 1n)) || _expand$6);
                    var _expand$8 = ((($2574 === "Nat.zero") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($2574 === "Bool.true") && (_arity$3 > 0n)) || _expand$8);
                    var _expand$10 = ((($2574 === "Bool.false") && (_arity$3 > 0n)) || _expand$9);
                    return (() => {
                        var self = _expand$10;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($2574)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($2573)($2574);
                                        case 'Maybe.some':
                                            var $2575 = self.value;
                                            return (() => {
                                                var self = $2575;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $2576 = self.name;
                                                        var $2577 = self.term;
                                                        var $2578 = self.type;
                                                        var $2579 = self.stat;
                                                        return $2577;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($2573)($2574);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                var $2580 = self.orig;
                return Fm$Term$typ($2580);
            case 'Fm.Term.all':
                var $2581 = self.orig;
                var $2582 = self.eras;
                var $2583 = self.self;
                var $2584 = self.name;
                var $2585 = self.xtyp;
                var $2586 = self.body;
                return Fm$Term$all($2581)($2582)($2583)($2584)(Fm$Term$expand_ct($2585)(_defs$2)(0n))((_s$10 => (_x$11 => Fm$Term$expand_ct($2586(_s$10)(_x$11))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $2587 = self.orig;
                var $2588 = self.name;
                var $2589 = self.body;
                return Fm$Term$lam($2587)($2588)((_x$7 => Fm$Term$expand_ct($2589(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $2590 = self.orig;
                var $2591 = self.func;
                var $2592 = self.argm;
                return Fm$Term$app($2590)(Fm$Term$expand_ct($2591)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($2592)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $2593 = self.orig;
                var $2594 = self.name;
                var $2595 = self.expr;
                var $2596 = self.body;
                return Fm$Term$let($2593)($2594)(Fm$Term$expand_ct($2595)(_defs$2)(0n))((_x$8 => Fm$Term$expand_ct($2596(_x$8))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $2597 = self.orig;
                var $2598 = self.name;
                var $2599 = self.expr;
                var $2600 = self.body;
                return Fm$Term$def($2597)($2598)(Fm$Term$expand_ct($2599)(_defs$2)(0n))((_x$8 => Fm$Term$expand_ct($2600(_x$8))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $2601 = self.orig;
                var $2602 = self.done;
                var $2603 = self.term;
                var $2604 = self.type;
                return Fm$Term$ann($2601)($2602)(Fm$Term$expand_ct($2603)(_defs$2)(0n))(Fm$Term$expand_ct($2604)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $2605 = self.orig;
                var $2606 = self.name;
                var $2607 = self.dref;
                var $2608 = self.verb;
                return Fm$Term$gol($2605)($2606)($2607)($2608);
            case 'Fm.Term.hol':
                var $2609 = self.orig;
                var $2610 = self.path;
                return Fm$Term$hol($2609)($2610);
            case 'Fm.Term.nat':
                var $2611 = self.orig;
                var $2612 = self.natx;
                return Fm$Term$nat($2611)($2612);
            case 'Fm.Term.chr':
                var $2613 = self.orig;
                var $2614 = self.chrx;
                return Fm$Term$chr($2613)($2614);
            case 'Fm.Term.str':
                var $2615 = self.orig;
                var $2616 = self.strx;
                return Fm$Term$str($2615)($2616);
            case 'Fm.Term.cse':
                var $2617 = self.orig;
                var $2618 = self.path;
                var $2619 = self.expr;
                var $2620 = self.name;
                var $2621 = self.with;
                var $2622 = self.cses;
                var $2623 = self.moti;
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
                var $2624 = self.origin;
                var $2625 = self.expected;
                var $2626 = self.detected;
                var $2627 = self.context;
                return (() => {
                    var _expected$7 = (() => {
                        var self = $2625;
                        switch (self._) {
                            case 'Either.left':
                                var $2628 = self.value;
                                return $2628;
                            case 'Either.right':
                                var $2629 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2629)(Map$new));
                        }
                    })();
                    var _detected$8 = (() => {
                        var self = $2626;
                        switch (self._) {
                            case 'Either.left':
                                var $2630 = self.value;
                                return $2630;
                            case 'Either.right':
                                var $2631 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2631)(Map$new));
                        }
                    })();
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$7)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$8)(List$cons("\u{a}")(List$cons((() => {
                        var self = $2627;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2632 = self.head;
                                var $2633 = self.tail;
                                return String$flatten(List$cons("With context:\u{a}")(List$cons(Fm$Context$show($2627))(List$nil)));
                        }
                    })())(List$nil)))))))))
                })();
            case 'Fm.Error.show_goal':
                var $2634 = self.name;
                var $2635 = self.dref;
                var $2636 = self.verb;
                var $2637 = self.goal;
                var $2638 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($2634))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $2637;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $2639 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($2635)($2639)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $2636;
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
                        var self = $2638;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2640 = self.head;
                                var $2641 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($2638))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $2642 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($2642)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $2643 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($2643)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $2644 = self.path;
                var $2645 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($2645))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2646 = self.origin;
                var $2647 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2647))(List$cons("\u{a}")(List$nil))));
            case 'Fm.Error.cant_infer':
                var $2648 = self.origin;
                var $2649 = self.term;
                var $2650 = self.context;
                return (() => {
                    var _term$6 = Fm$Term$show($2649);
                    var _context$7 = Fm$Context$show($2650);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$6)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$7)(List$nil))))))
                })();
        }
    })()));
    var Fm$Error$origin = (_error$1 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2651 = self.origin;
                var $2652 = self.expected;
                var $2653 = self.detected;
                var $2654 = self.context;
                return $2651;
            case 'Fm.Error.show_goal':
                var $2655 = self.name;
                var $2656 = self.dref;
                var $2657 = self.verb;
                var $2658 = self.goal;
                var $2659 = self.context;
                return Maybe$none;
            case 'Fm.Error.waiting':
                var $2660 = self.name;
                return Maybe$none;
            case 'Fm.Error.indirect':
                var $2661 = self.name;
                return Maybe$none;
            case 'Fm.Error.patch':
                var $2662 = self.path;
                var $2663 = self.term;
                return Maybe$none;
            case 'Fm.Error.undefined_reference':
                var $2664 = self.origin;
                var $2665 = self.name;
                return $2664;
            case 'Fm.Error.cant_infer':
                var $2666 = self.origin;
                var $2667 = self.term;
                var $2668 = self.context;
                return $2666;
        }
    })());
    var Fm$Defs$report = (_code$1 => (_defs$2 => (() => {
        var _result$3 = "";
        var _result$4 = (list_for(Map$values(_defs$2))(_result$3)((_def$4 => (_result$5 => (() => {
            var self = _def$4;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2669 = self.name;
                    var $2670 = self.term;
                    var $2671 = self.type;
                    var $2672 = self.stat;
                    return (() => {
                        var _name$10 = $2669;
                        var _term$11 = $2670;
                        var _type$12 = $2671;
                        var _stat$13 = $2672;
                        return (() => {
                            var self = _stat$13;
                            switch (self._) {
                                case 'Fm.Status.init':
                                    return _result$5;
                                case 'Fm.Status.wait':
                                    return _result$5;
                                case 'Fm.Status.done':
                                    return _result$5;
                                case 'Fm.Status.fail':
                                    var $2673 = self.errors;
                                    return (() => {
                                        var self = $2673;
                                        switch (self._) {
                                            case 'List.nil':
                                                return _result$5;
                                            case 'List.cons':
                                                var $2674 = self.head;
                                                var $2675 = self.tail;
                                                return (() => {
                                                    var _name_str$17 = Fm$Name$show(_name$10);
                                                    var _type_str$18 = "<error>";
                                                    var _errors$19 = Fm$Error$relevant($2673)(Bool$false);
                                                    var _result$20 = (list_for(_errors$19)(_result$5)((_error$20 => (_result$21 => String$flatten(List$cons(_result$21)(List$cons("On ")(List$cons(_name_str$17)(List$cons(":\u{a}")(List$cons(Fm$Error$show(_error$20)(_defs$2))(List$cons((() => {
                                                        var self = Fm$Error$origin(_error$20);
                                                        switch (self._) {
                                                            case 'Maybe.none':
                                                                return "";
                                                            case 'Maybe.some':
                                                                var $2676 = self.value;
                                                                return (() => {
                                                                    var self = $2676;
                                                                    switch (self._) {
                                                                        case 'Fm.Origin.new':
                                                                            var $2677 = self.file;
                                                                            var $2678 = self.from;
                                                                            var $2679 = self.upto;
                                                                            return (() => {
                                                                                var _highlighted$26 = Fm$highlight(_code$1)($2678)($2679);
                                                                                return String$flatten(List$cons("On code:\u{a}")(List$cons(_highlighted$26)(List$cons("\u{a}")(List$nil))))
                                                                            })();
                                                                    }
                                                                })();
                                                        }
                                                    })())(List$cons("\u{a}")(List$nil))))))))))));
                                                    return _result$20
                                                })();
                                        }
                                    })();
                            }
                        })()
                    })();
            }
        })()))));
        return (() => {
            var self = _result$4;
            switch (self.length === 0 ? 'nil' : 'cons') {
                case 'nil':
                    return "All terms check.";
                case 'cons':
                    var $2680 = self.charCodeAt(0);
                    var $2681 = self.slice(1);
                    return _result$4;
            }
        })()
    })()));
    var Fm$check_all = (_code$1 => Fm$exec((_defs$2 => Fm$Defs$report(_code$1)(Fm$Synth$all(_defs$2))))(_code$1));
    var Fm$check_one = (_code$1 => (_name$2 => Fm$exec((_defs$3 => Fm$Defs$report(_code$1)(Fm$Synth$one(_name$2)(_defs$3))))(_code$1)));
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
        'Parser.until.go': Parser$until$go,
        'Parser.until': Parser$until,
        'Parser.one': Parser$one,
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
        'Fm.Parser.text': Fm$Parser$text,
        'Pair': Pair,
        'Parser.until1': Parser$until1,
        'Parser.maybe': Parser$maybe,
        'Fm.Parser.item': Fm$Parser$item,
        'Parser.get_index': Parser$get_index,
        'Fm.Parser.init': Fm$Parser$init,
        'Fm.Origin.new': Fm$Origin$new,
        'Fm.Parser.stop': Fm$Parser$stop,
        'Fm.Term.typ': Fm$Term$typ,
        'Fm.Parser.type': Fm$Parser$type,
        'Fm.Term.all': Fm$Term$all,
        'Fm.Term.xall': Fm$Term$xall,
        'Fm.Parser.forall': Fm$Parser$forall,
        'Fm.Parser.name1': Fm$Parser$name1,
        'Fm.Term.lam': Fm$Term$lam,
        'Fm.Parser.make_lambda': Fm$Parser$make_lambda,
        'Fm.Parser.lambda': Fm$Parser$lambda,
        'Fm.Parser.lambda.erased': Fm$Parser$lambda$erased,
        'Fm.Parser.parenthesis': Fm$Parser$parenthesis,
        'Fm.Term.ref': Fm$Term$ref,
        'Fm.Term.xref': Fm$Term$xref,
        'Fm.Term.app': Fm$Term$app,
        'Fm.Term.xapp': Fm$Term$xapp,
        'Fm.Term.hol': Fm$Term$hol,
        'Fm.Term.xhol': Fm$Term$xhol,
        'Bits.nil': Bits$nil,
        'Fm.Term.xlam': Fm$Term$xlam,
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
        'Parser.spaces': Parser$spaces,
        'Parser.spaces_text': Parser$spaces_text,
        'Fm.Parser.application.erased': Fm$Parser$application$erased,
        'Fm.Parser.arrow': Fm$Parser$arrow,
        'Fm.Parser.equality': Fm$Parser$equality,
        'Fm.Term.ann': Fm$Term$ann,
        'Fm.Term.xann': Fm$Term$xann,
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
        'Fm.Term.xvar': Fm$Term$xvar,
        'Fm.Path.to_bits': Fm$Path$to_bits,
        'Fm.Term.bind': Fm$Term$bind,
        'Fm.set': Fm$set,
        'Fm.Parser.file.def': Fm$Parser$file$def,
        'Maybe.default': Maybe$default,
        'Fm.Constructor.new': Fm$Constructor$new,
        'Fm.Parser.constructor': Fm$Parser$constructor,
        'Fm.Datatype.new': Fm$Datatype$new,
        'Fm.Parser.datatype': Fm$Parser$datatype,
        'Fm.Term.xtyp': Fm$Term$xtyp,
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
        'String.color': String$color,
        'Fm.highlight.tc': Fm$highlight$tc,
        'Fm.highlight': Fm$highlight,
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
        'Fm.Term.xnat': Fm$Term$xnat,
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.xchr': Fm$Term$xchr,
        'Fm.Term.xstr': Fm$Term$xstr,
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
        'Fm.Term.origin': Fm$Term$origin,
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
        'Fm.Error.relevant': Fm$Error$relevant,
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
        'Fm.Error.origin': Fm$Error$origin,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.check_all': Fm$check_all,
        'Fm.check_one': Fm$check_one,
        'Fm.exports': Fm$exports,
    };
})();