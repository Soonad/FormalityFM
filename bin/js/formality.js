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
    var Pair$new = (_fst$3 => (_snd$4 => ({
        _: 'Pair.new',
        'fst': _fst$3,
        'snd': _snd$4
    })));
    var Map = (_A$1 => null);
    var Map$new = ({
        _: 'Map.new'
    });
    var List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));
    var Pair = (_A$1 => (_B$2 => null));
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
    var Fm$Parser$text = (_text$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Parser$many1 = (_parser$2 => Monad$bind(Parser$monad)(_parser$2)((_head$3 => Monad$bind(Parser$monad)(Parser$many(_parser$2))((_tail$4 => Monad$pure(Parser$monad)(List$cons(_head$3)(_tail$4)))))));
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
    var Fm$Parser$name1 = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
    var Fm$Parser$name = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$letter))((_chrs$2 => Monad$pure(Parser$monad)(List$fold(_chrs$2)(String$nil)(String$cons))))));
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
    var Fm$Def$new = (_file$1 => (_name$2 => (_term$3 => (_type$4 => (_stat$5 => ({
        _: 'Fm.Def.new',
        'file': _file$1,
        'name': _name$2,
        'term': _term$3,
        'type': _type$4,
        'stat': _stat$5
    }))))));
    var Fm$Status$init = ({
        _: 'Fm.Status.init'
    });
    var Fm$Parser$case$with = Monad$bind(Parser$monad)(Fm$Parser$text("with"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$4 => Monad$bind(Parser$monad)(Fm$Parser$text("="))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$6 => Monad$pure(Parser$monad)(Fm$Def$new("")(_name$2)(_term$6)(_type$4)(Fm$Status$init))))))))))))));
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
    var Fm$Parser$file$def = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$4 => (() => {
        var _args$5 = List$flatten(_args$4);
        return Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$8 => (() => {
            var _type$9 = Fm$Parser$make_forall(_args$5)(_type$7);
            var _term$10 = Fm$Parser$make_lambda(Maybe$none)(List$mapped(_args$5)((_x$10 => (() => {
                var self = _x$10;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $327 = self.eras;
                        var $328 = self.name;
                        var $329 = self.term;
                        return $328;
                }
            })())))(_term$8);
            var _type$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$1(_x$11)))(_type$9);
            var _term$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$0(_x$12)))(_term$10);
            var _defs$13 = Fm$set(_name$3)(Fm$Def$new(_file$1)(_name$3)(_term$12)(_type$11)(Fm$Status$init))(_defs$2);
            return Monad$pure(Parser$monad)(_defs$13)
        })()))))))
    })()))))));
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
    var Fm$Parser$file$adt = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$3 => (() => {
        var self = _adt$3;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $480 = self.name;
                var $481 = self.pars;
                var $482 = self.inds;
                var $483 = self.ctrs;
                return (() => {
                    var _term$8 = Fm$Datatype$build_term(_adt$3);
                    var _term$9 = Fm$Term$bind(List$nil)((_x$9 => Bits$1(_x$9)))(_term$8);
                    var _type$10 = Fm$Datatype$build_type(_adt$3);
                    var _type$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$0(_x$11)))(_type$10);
                    var _defs$12 = Fm$set($480)(Fm$Def$new(_file$1)($480)(_term$9)(_type$11)(Fm$Status$init))(_defs$2);
                    var _defs$13 = List$fold($483)(_defs$12)((_ctr$13 => (_defs$14 => (() => {
                        var _typ_name$15 = $480;
                        var _ctr_name$16 = String$flatten(List$cons(_typ_name$15)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$13;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $484 = self.name;
                                    var $485 = self.args;
                                    var $486 = self.inds;
                                    return $484;
                            }
                        })())(List$nil))));
                        var _ctr_term$17 = Fm$Constructor$build_term(_adt$3)(_ctr$13);
                        var _ctr_term$18 = Fm$Term$bind(List$nil)((_x$18 => Bits$1(_x$18)))(_ctr_term$17);
                        var _ctr_type$19 = Fm$Constructor$build_type(_adt$3)(_ctr$13);
                        var _ctr_type$20 = Fm$Term$bind(List$nil)((_x$20 => Bits$0(_x$20)))(_ctr_type$19);
                        return Fm$set(_ctr_name$16)(Fm$Def$new(_file$1)(_ctr_name$16)(_ctr_term$18)(_ctr_type$20)(Fm$Status$init))(_defs$14)
                    })())));
                    return Monad$pure(Parser$monad)(_defs$13)
                })();
        }
    })()))));
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
    var Fm$Parser$file$end = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$3 => Monad$bind(Parser$monad)(Parser$eof)((_$4 => Monad$pure(Parser$monad)(_defs$2)))))));
    var Fm$Parser$file = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Parser$is_eof)((_stop$3 => (() => {
        var self = _stop$3;
        switch (self ? 'true' : 'false') {
            case 'true':
                return Monad$pure(Parser$monad)(_defs$2);
            case 'false':
                return Parser$first_of(List$cons(Monad$bind(Parser$monad)(Fm$Parser$text("#"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_file$5 => Fm$Parser$file(_file$5)(_defs$2))))))(List$cons(Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$file$def(_file$1)(_defs$2))(List$cons(Fm$Parser$file$adt(_file$1)(_defs$2))(List$cons(Fm$Parser$file$end(_file$1)(_defs$2))(List$nil)))))((_defs$4 => Fm$Parser$file(_file$1)(_defs$4))))(List$nil)));
        }
    })()))));
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
    var Fm$Defs$read = (_file$1 => (_code$2 => (_defs$3 => (() => {
        var self = Fm$Parser$file(_file$1)(_defs$3)(0n)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $515 = self.idx;
                var $516 = self.code;
                var $517 = self.err;
                return (() => {
                    var _err$7 = $517;
                    var _hig$8 = Fm$highlight(_code$2)($515)(Nat$succ($515));
                    var _str$9 = String$flatten(List$cons(_err$7)(List$cons("\u{a}")(List$cons(_hig$8)(List$nil))));
                    return Either$left(_str$9)
                })();
            case 'Parser.Reply.value':
                var $518 = self.idx;
                var $519 = self.code;
                var $520 = self.val;
                return Either$right($520);
        }
    })())));
    var Fm$exec = (_files$1 => (_report$2 => (() => {
        var _reads$3 = Pair$new("")(Map$new);
        var _reads$4 = (list_for(_files$1)(_reads$3)((_file$4 => (_reads$5 => (() => {
            var self = _reads$5;
            switch (self._) {
                case 'Pair.new':
                    var $521 = self.fst;
                    var $522 = self.snd;
                    return (() => {
                        var self = _file$4;
                        switch (self._) {
                            case 'Fm.File.new':
                                var $523 = self.name;
                                var $524 = self.code;
                                return (() => {
                                    var self = _reads$5;
                                    switch (self._) {
                                        case 'Pair.new':
                                            var $525 = self.fst;
                                            var $526 = self.snd;
                                            return (() => {
                                                var self = Fm$Defs$read($523)($524)($526);
                                                switch (self._) {
                                                    case 'Either.left':
                                                        var $527 = self.value;
                                                        return Pair$new(String$flatten(List$cons($525)(List$cons("On ")(List$cons($523)(List$cons(":\u{a}")(List$cons($527)(List$cons("\u{a}")(List$nil))))))))($526);
                                                    case 'Either.right':
                                                        var $528 = self.value;
                                                        return Pair$new($525)($528);
                                                }
                                            })();
                                    }
                                })();
                        }
                    })();
            }
        })()))));
        return (() => {
            var self = _reads$4;
            switch (self._) {
                case 'Pair.new':
                    var $529 = self.fst;
                    var $530 = self.snd;
                    return (() => {
                        var _errs$7 = $529;
                        var _defs$8 = $530;
                        return (() => {
                            var self = _errs$7;
                            switch (self.length === 0 ? 'nil' : 'cons') {
                                case 'nil':
                                    return _report$2(_defs$8);
                                case 'cons':
                                    var $531 = self.charCodeAt(0);
                                    var $532 = self.slice(1);
                                    return _errs$7;
                            }
                        })()
                    })();
            }
        })()
    })()));
    var Map$values$go = (_xs$2 => (_list$3 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$3;
            case 'Map.tie':
                var $533 = self.val;
                var $534 = self.lft;
                var $535 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $533;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $536 = self.value;
                                return List$cons($536)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($534)(_list0$7);
                    var _list2$9 = Map$values$go($535)(_list1$8);
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
                var $537 = self.slice(0, -1);
                return (2n * Bits$to_nat($537));
            case '1':
                var $538 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($538)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $539 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($539)));
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
                var $540 = self.charCodeAt(0);
                var $541 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($540);
                    var _tail$5 = Fm$escape($541);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $542 = self.orig;
                var $543 = self.name;
                var $544 = self.indx;
                return Fm$Name$show($543);
            case 'Fm.Term.ref':
                var $545 = self.orig;
                var $546 = self.name;
                return Fm$Name$show($546);
            case 'Fm.Term.typ':
                var $547 = self.orig;
                return "*";
            case 'Fm.Term.all':
                var $548 = self.orig;
                var $549 = self.eras;
                var $550 = self.self;
                var $551 = self.name;
                var $552 = self.xtyp;
                var $553 = self.body;
                return (() => {
                    var _eras$8 = $549;
                    var _init$9 = (() => {
                        var self = _eras$8;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$10 = Fm$Name$show($550);
                    var _name$11 = Fm$Name$show($551);
                    var _xtyp$12 = Fm$Term$core($552);
                    var _body$13 = Fm$Term$core($553(Fm$Term$xvar($550)(0n))(Fm$Term$xvar($551)(0n)));
                    return String$flatten(List$cons(_init$9)(List$cons(_self$10)(List$cons("(")(List$cons(_name$11)(List$cons(":")(List$cons(_xtyp$12)(List$cons(") ")(List$cons(_body$13)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $554 = self.orig;
                var $555 = self.name;
                var $556 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($555);
                    var _body$6 = Fm$Term$core($556(Fm$Term$xvar($555)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$5)(List$cons(" ")(List$cons(_body$6)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $557 = self.orig;
                var $558 = self.func;
                var $559 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$core($558);
                    var _argm$6 = Fm$Term$core($559);
                    return String$flatten(List$cons("(")(List$cons(_func$5)(List$cons(" ")(List$cons(_argm$6)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $560 = self.orig;
                var $561 = self.name;
                var $562 = self.expr;
                var $563 = self.body;
                return (() => {
                    var _name$6 = Fm$Name$show($561);
                    var _expr$7 = Fm$Term$core($562);
                    var _body$8 = Fm$Term$core($563(Fm$Term$xvar($561)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $564 = self.orig;
                var $565 = self.name;
                var $566 = self.expr;
                var $567 = self.body;
                return (() => {
                    var _name$6 = Fm$Name$show($565);
                    var _expr$7 = Fm$Term$core($566);
                    var _body$8 = Fm$Term$core($567(Fm$Term$xvar($565)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $568 = self.orig;
                var $569 = self.done;
                var $570 = self.term;
                var $571 = self.type;
                return (() => {
                    var _term$6 = Fm$Term$core($570);
                    var _type$7 = Fm$Term$core($571);
                    return String$flatten(List$cons("{")(List$cons(_term$6)(List$cons(":")(List$cons(_type$7)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $572 = self.orig;
                var $573 = self.name;
                var $574 = self.dref;
                var $575 = self.verb;
                return "<ERROR>";
            case 'Fm.Term.hol':
                var $576 = self.orig;
                var $577 = self.path;
                return "<ERROR>";
            case 'Fm.Term.nat':
                var $578 = self.orig;
                var $579 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($579))(List$nil)));
            case 'Fm.Term.chr':
                var $580 = self.orig;
                var $581 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($581))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $582 = self.orig;
                var $583 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($583))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $584 = self.orig;
                var $585 = self.path;
                var $586 = self.expr;
                var $587 = self.name;
                var $588 = self.with;
                var $589 = self.cses;
                var $590 = self.moti;
                return "<ERROR>";
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $591 = self.file;
                    var $592 = self.name;
                    var $593 = self.term;
                    var $594 = self.type;
                    var $595 = self.stat;
                    return (() => {
                        var self = $595;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$10 = $592;
                                    var _term$11 = Fm$Term$core($593);
                                    var _type$12 = Fm$Term$core($594);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$10)(List$cons(" : ")(List$cons(_type$12)(List$cons(" = ")(List$cons(_term$11)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $596 = self.errors;
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
                                    var $597 = self.val;
                                    var $598 = self.lft;
                                    var $599 = self.rgt;
                                    return $597;
                            }
                        })();
                    case '0':
                        var $600 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $601 = self.val;
                                    var $602 = self.lft;
                                    var $603 = self.rgt;
                                    return Map$get($600)($602);
                            }
                        })();
                    case '1':
                        var $604 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $605 = self.val;
                                    var $606 = self.lft;
                                    var $607 = self.rgt;
                                    return Map$get($604)($607);
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
                var $608 = self.value;
                var $609 = self.errors;
                return (() => {
                    var self = $608;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($609);
                        case 'Maybe.some':
                            var $610 = self.value;
                            return (() => {
                                var self = _f$4($610);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $611 = self.value;
                                        var $612 = self.errors;
                                        return Fm$Check$result($611)(List$concat($609)($612));
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
                var $613 = self.value;
                return Maybe$some(_f$4($613));
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
                var $614 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$xref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$xnat($614);
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
                var $615 = self.slice(0, -1);
                return Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($615));
            case '1':
                var $616 = self.slice(0, -1);
                return Fm$Term$xapp(Fm$Term$xref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($616));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $617 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$xref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$xapp(_term$3)(Fm$Term$xnat(16n));
                    var _term$5 = Fm$Term$xapp(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($617)));
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
                var $618 = self.charCodeAt(0);
                var $619 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$xchr($618);
                    var _term$5 = Fm$Term$xref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$xapp(_term$5)(_char$4);
                    var _term$7 = Fm$Term$xapp(_term$6)(Fm$Term$xstr($619));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $620 = self.orig;
                var $621 = self.name;
                var $622 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $623 = self.orig;
                var $624 = self.name;
                return (() => {
                    var self = Fm$get($624)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($623)($624);
                        case 'Maybe.some':
                            var $625 = self.value;
                            return (() => {
                                var self = $625;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $626 = self.file;
                                        var $627 = self.name;
                                        var $628 = self.term;
                                        var $629 = self.type;
                                        var $630 = self.stat;
                                        return Fm$Term$reduce($628)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $631 = self.orig;
                return _term$1;
            case 'Fm.Term.all':
                var $632 = self.orig;
                var $633 = self.eras;
                var $634 = self.self;
                var $635 = self.name;
                var $636 = self.xtyp;
                var $637 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $638 = self.orig;
                var $639 = self.name;
                var $640 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $641 = self.orig;
                var $642 = self.func;
                var $643 = self.argm;
                return (() => {
                    var _func$6 = Fm$Term$reduce($642)(_defs$2);
                    return (() => {
                        var self = _func$6;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $644 = self.orig;
                                var $645 = self.name;
                                var $646 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $647 = self.orig;
                                var $648 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                var $649 = self.orig;
                                return _term$1;
                            case 'Fm.Term.all':
                                var $650 = self.orig;
                                var $651 = self.eras;
                                var $652 = self.self;
                                var $653 = self.name;
                                var $654 = self.xtyp;
                                var $655 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $656 = self.orig;
                                var $657 = self.name;
                                var $658 = self.body;
                                return Fm$Term$reduce($658($643))(_defs$2);
                            case 'Fm.Term.app':
                                var $659 = self.orig;
                                var $660 = self.func;
                                var $661 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $662 = self.orig;
                                var $663 = self.name;
                                var $664 = self.expr;
                                var $665 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $666 = self.orig;
                                var $667 = self.name;
                                var $668 = self.expr;
                                var $669 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $670 = self.orig;
                                var $671 = self.done;
                                var $672 = self.term;
                                var $673 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $674 = self.orig;
                                var $675 = self.name;
                                var $676 = self.dref;
                                var $677 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $678 = self.orig;
                                var $679 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $680 = self.orig;
                                var $681 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $682 = self.orig;
                                var $683 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $684 = self.orig;
                                var $685 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $686 = self.orig;
                                var $687 = self.path;
                                var $688 = self.expr;
                                var $689 = self.name;
                                var $690 = self.with;
                                var $691 = self.cses;
                                var $692 = self.moti;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $693 = self.orig;
                var $694 = self.name;
                var $695 = self.expr;
                var $696 = self.body;
                return Fm$Term$reduce($696($695))(_defs$2);
            case 'Fm.Term.def':
                var $697 = self.orig;
                var $698 = self.name;
                var $699 = self.expr;
                var $700 = self.body;
                return Fm$Term$reduce($700($699))(_defs$2);
            case 'Fm.Term.ann':
                var $701 = self.orig;
                var $702 = self.done;
                var $703 = self.term;
                var $704 = self.type;
                return Fm$Term$reduce($703)(_defs$2);
            case 'Fm.Term.gol':
                var $705 = self.orig;
                var $706 = self.name;
                var $707 = self.dref;
                var $708 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $709 = self.orig;
                var $710 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $711 = self.orig;
                var $712 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($712))(_defs$2);
            case 'Fm.Term.chr':
                var $713 = self.orig;
                var $714 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($714))(_defs$2);
            case 'Fm.Term.str':
                var $715 = self.orig;
                var $716 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($716))(_defs$2);
            case 'Fm.Term.cse':
                var $717 = self.orig;
                var $718 = self.path;
                var $719 = self.expr;
                var $720 = self.name;
                var $721 = self.with;
                var $722 = self.cses;
                var $723 = self.moti;
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
                var $724 = self.head;
                var $725 = self.tail;
                return (() => {
                    var self = $724;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $726 = self.file;
                            var $727 = self.name;
                            var $728 = self.term;
                            var $729 = self.type;
                            var $730 = self.stat;
                            return Fm$Term$xall(Bool$false)("")($727)($729)((_s$10 => (_x$11 => Fm$Term$desugar_cse$motive($725)(_moti$2))));
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
                var $731 = self.charCodeAt(0);
                var $732 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $733 = self.orig;
                var $734 = self.name;
                var $735 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $736 = self.head;
                            var $737 = self.tail;
                            return (() => {
                                var self = $736;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $738 = self.file;
                                        var $739 = self.name;
                                        var $740 = self.term;
                                        var $741 = self.type;
                                        var $742 = self.stat;
                                        return Fm$Term$xlam($739)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($737)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $743 = self.orig;
                var $744 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $745 = self.head;
                            var $746 = self.tail;
                            return (() => {
                                var self = $745;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $747 = self.file;
                                        var $748 = self.name;
                                        var $749 = self.term;
                                        var $750 = self.type;
                                        var $751 = self.stat;
                                        return Fm$Term$xlam($748)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($746)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $752 = self.orig;
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
                                        var $755 = self.file;
                                        var $756 = self.name;
                                        var $757 = self.term;
                                        var $758 = self.type;
                                        var $759 = self.stat;
                                        return Fm$Term$xlam($756)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($754)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $760 = self.orig;
                var $761 = self.eras;
                var $762 = self.self;
                var $763 = self.name;
                var $764 = self.xtyp;
                var $765 = self.body;
                return Fm$Term$xlam((() => {
                    var self = String$is_empty($763);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($763)(List$nil))));
                    }
                })())((_x$12 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($765(Fm$Term$xvar($762)(0n))(Fm$Term$xvar($763)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $766 = self.orig;
                var $767 = self.name;
                var $768 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $769 = self.head;
                            var $770 = self.tail;
                            return (() => {
                                var self = $769;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $771 = self.file;
                                        var $772 = self.name;
                                        var $773 = self.term;
                                        var $774 = self.type;
                                        var $775 = self.stat;
                                        return Fm$Term$xlam($772)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($770)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $776 = self.orig;
                var $777 = self.func;
                var $778 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $779 = self.head;
                            var $780 = self.tail;
                            return (() => {
                                var self = $779;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $781 = self.file;
                                        var $782 = self.name;
                                        var $783 = self.term;
                                        var $784 = self.type;
                                        var $785 = self.stat;
                                        return Fm$Term$xlam($782)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($780)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $786 = self.orig;
                var $787 = self.name;
                var $788 = self.expr;
                var $789 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $790 = self.head;
                            var $791 = self.tail;
                            return (() => {
                                var self = $790;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $792 = self.file;
                                        var $793 = self.name;
                                        var $794 = self.term;
                                        var $795 = self.type;
                                        var $796 = self.stat;
                                        return Fm$Term$xlam($793)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($791)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $797 = self.orig;
                var $798 = self.name;
                var $799 = self.expr;
                var $800 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $801 = self.head;
                            var $802 = self.tail;
                            return (() => {
                                var self = $801;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $803 = self.file;
                                        var $804 = self.name;
                                        var $805 = self.term;
                                        var $806 = self.type;
                                        var $807 = self.stat;
                                        return Fm$Term$xlam($804)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($802)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $808 = self.orig;
                var $809 = self.done;
                var $810 = self.term;
                var $811 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $812 = self.head;
                            var $813 = self.tail;
                            return (() => {
                                var self = $812;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $814 = self.file;
                                        var $815 = self.name;
                                        var $816 = self.term;
                                        var $817 = self.type;
                                        var $818 = self.stat;
                                        return Fm$Term$xlam($815)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($813)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $819 = self.orig;
                var $820 = self.name;
                var $821 = self.dref;
                var $822 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $823 = self.head;
                            var $824 = self.tail;
                            return (() => {
                                var self = $823;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $825 = self.file;
                                        var $826 = self.name;
                                        var $827 = self.term;
                                        var $828 = self.type;
                                        var $829 = self.stat;
                                        return Fm$Term$xlam($826)((_x$17 => Fm$Term$desugar_cse$argument(_name$1)($824)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $830 = self.orig;
                var $831 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $832 = self.head;
                            var $833 = self.tail;
                            return (() => {
                                var self = $832;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $834 = self.file;
                                        var $835 = self.name;
                                        var $836 = self.term;
                                        var $837 = self.type;
                                        var $838 = self.stat;
                                        return Fm$Term$xlam($835)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($833)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $839 = self.orig;
                var $840 = self.natx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $841 = self.head;
                            var $842 = self.tail;
                            return (() => {
                                var self = $841;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $843 = self.file;
                                        var $844 = self.name;
                                        var $845 = self.term;
                                        var $846 = self.type;
                                        var $847 = self.stat;
                                        return Fm$Term$xlam($844)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($842)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $848 = self.orig;
                var $849 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $850 = self.head;
                            var $851 = self.tail;
                            return (() => {
                                var self = $850;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $852 = self.file;
                                        var $853 = self.name;
                                        var $854 = self.term;
                                        var $855 = self.type;
                                        var $856 = self.stat;
                                        return Fm$Term$xlam($853)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($851)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $857 = self.orig;
                var $858 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $859 = self.head;
                            var $860 = self.tail;
                            return (() => {
                                var self = $859;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $861 = self.file;
                                        var $862 = self.name;
                                        var $863 = self.term;
                                        var $864 = self.type;
                                        var $865 = self.stat;
                                        return Fm$Term$xlam($862)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($860)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $866 = self.orig;
                var $867 = self.path;
                var $868 = self.expr;
                var $869 = self.name;
                var $870 = self.with;
                var $871 = self.cses;
                var $872 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $873 = self.head;
                            var $874 = self.tail;
                            return (() => {
                                var self = $873;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $875 = self.file;
                                        var $876 = self.name;
                                        var $877 = self.term;
                                        var $878 = self.type;
                                        var $879 = self.stat;
                                        return Fm$Term$xlam($876)((_x$20 => Fm$Term$desugar_cse$argument(_name$1)($874)(_type$3)(_body$4)(_defs$5)));
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
                var $880 = self.value;
                return Maybe$some($880);
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
                        var $881 = self.orig;
                        var $882 = self.name;
                        var $883 = self.indx;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $884 = self.file;
                                        var $885 = self.name;
                                        var $886 = self.term;
                                        var $887 = self.type;
                                        var $888 = self.stat;
                                        return $886;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ref':
                        var $889 = self.orig;
                        var $890 = self.name;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $891 = self.file;
                                        var $892 = self.name;
                                        var $893 = self.term;
                                        var $894 = self.type;
                                        var $895 = self.stat;
                                        return $893;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.typ':
                        var $896 = self.orig;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$xapp(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $897 = self.file;
                                        var $898 = self.name;
                                        var $899 = self.term;
                                        var $900 = self.type;
                                        var $901 = self.stat;
                                        return $899;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.all':
                        var $902 = self.orig;
                        var $903 = self.eras;
                        var $904 = self.self;
                        var $905 = self.name;
                        var $906 = self.xtyp;
                        var $907 = self.body;
                        return (() => {
                            var _got$14 = Maybe$or(Fm$get($905)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$14;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$15 = (list_for(_wyth$3)(_expr$1)((_def$15 => (_expr$16 => (() => {
                                                var self = _def$15;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $908 = self.file;
                                                        var $909 = self.name;
                                                        var $910 = self.term;
                                                        var $911 = self.type;
                                                        var $912 = self.stat;
                                                        return Fm$Term$xapp(_expr$16)($910);
                                                }
                                            })()))));
                                            return _expr$15
                                        })();
                                    case 'Maybe.some':
                                        var $913 = self.value;
                                        return (() => {
                                            var _argm$16 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($906)($913)(_defs$6);
                                            var _expr$17 = Fm$Term$xapp(_expr$1)(_argm$16);
                                            var _type$18 = $907(Fm$Term$xvar($904)(0n))(Fm$Term$xvar($905)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$17)(_name$2)(_wyth$3)(_cses$4)(_type$18)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $914 = self.orig;
                        var $915 = self.name;
                        var $916 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $917 = self.file;
                                        var $918 = self.name;
                                        var $919 = self.term;
                                        var $920 = self.type;
                                        var $921 = self.stat;
                                        return $919;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.app':
                        var $922 = self.orig;
                        var $923 = self.func;
                        var $924 = self.argm;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$xapp(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $925 = self.file;
                                        var $926 = self.name;
                                        var $927 = self.term;
                                        var $928 = self.type;
                                        var $929 = self.stat;
                                        return $927;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.let':
                        var $930 = self.orig;
                        var $931 = self.name;
                        var $932 = self.expr;
                        var $933 = self.body;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $934 = self.file;
                                        var $935 = self.name;
                                        var $936 = self.term;
                                        var $937 = self.type;
                                        var $938 = self.stat;
                                        return $936;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.def':
                        var $939 = self.orig;
                        var $940 = self.name;
                        var $941 = self.expr;
                        var $942 = self.body;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $943 = self.file;
                                        var $944 = self.name;
                                        var $945 = self.term;
                                        var $946 = self.type;
                                        var $947 = self.stat;
                                        return $945;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.ann':
                        var $948 = self.orig;
                        var $949 = self.done;
                        var $950 = self.term;
                        var $951 = self.type;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $952 = self.file;
                                        var $953 = self.name;
                                        var $954 = self.term;
                                        var $955 = self.type;
                                        var $956 = self.stat;
                                        return $954;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.gol':
                        var $957 = self.orig;
                        var $958 = self.name;
                        var $959 = self.dref;
                        var $960 = self.verb;
                        return (() => {
                            var _expr$12 = (list_for(_wyth$3)(_expr$1)((_def$12 => (_expr$13 => Fm$Term$xapp(_expr$13)((() => {
                                var self = _def$12;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $961 = self.file;
                                        var $962 = self.name;
                                        var $963 = self.term;
                                        var $964 = self.type;
                                        var $965 = self.stat;
                                        return $963;
                                }
                            })())))));
                            return _expr$12
                        })();
                    case 'Fm.Term.hol':
                        var $966 = self.orig;
                        var $967 = self.path;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $968 = self.file;
                                        var $969 = self.name;
                                        var $970 = self.term;
                                        var $971 = self.type;
                                        var $972 = self.stat;
                                        return $970;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.nat':
                        var $973 = self.orig;
                        var $974 = self.natx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $975 = self.file;
                                        var $976 = self.name;
                                        var $977 = self.term;
                                        var $978 = self.type;
                                        var $979 = self.stat;
                                        return $977;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.chr':
                        var $980 = self.orig;
                        var $981 = self.chrx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $982 = self.file;
                                        var $983 = self.name;
                                        var $984 = self.term;
                                        var $985 = self.type;
                                        var $986 = self.stat;
                                        return $984;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.str':
                        var $987 = self.orig;
                        var $988 = self.strx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$xapp(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $989 = self.file;
                                        var $990 = self.name;
                                        var $991 = self.term;
                                        var $992 = self.type;
                                        var $993 = self.stat;
                                        return $991;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.cse':
                        var $994 = self.orig;
                        var $995 = self.path;
                        var $996 = self.expr;
                        var $997 = self.name;
                        var $998 = self.with;
                        var $999 = self.cses;
                        var $1000 = self.moti;
                        return (() => {
                            var _expr$15 = (list_for(_wyth$3)(_expr$1)((_def$15 => (_expr$16 => Fm$Term$xapp(_expr$16)((() => {
                                var self = _def$15;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1001 = self.file;
                                        var $1002 = self.name;
                                        var $1003 = self.term;
                                        var $1004 = self.type;
                                        var $1005 = self.stat;
                                        return $1003;
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
                var $1006 = self.orig;
                var $1007 = self.name;
                var $1008 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1009 = self.orig;
                var $1010 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                var $1011 = self.orig;
                return Maybe$none;
            case 'Fm.Term.all':
                var $1012 = self.orig;
                var $1013 = self.eras;
                var $1014 = self.self;
                var $1015 = self.name;
                var $1016 = self.xtyp;
                var $1017 = self.body;
                return (() => {
                    var _moti$15 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$16 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($1016)(_moti$15)(_defs$7);
                    var _expr$17 = Fm$Term$xapp(_expr$1)(_argm$16);
                    var _type$18 = $1017(Fm$Term$xvar($1014)(0n))(Fm$Term$xvar($1015)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$17)(_name$2)(_with$3)(_cses$4)(_type$18)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $1018 = self.orig;
                var $1019 = self.name;
                var $1020 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1021 = self.orig;
                var $1022 = self.func;
                var $1023 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $1024 = self.orig;
                var $1025 = self.name;
                var $1026 = self.expr;
                var $1027 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1028 = self.orig;
                var $1029 = self.name;
                var $1030 = self.expr;
                var $1031 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1032 = self.orig;
                var $1033 = self.done;
                var $1034 = self.term;
                var $1035 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1036 = self.orig;
                var $1037 = self.name;
                var $1038 = self.dref;
                var $1039 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1040 = self.orig;
                var $1041 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1042 = self.orig;
                var $1043 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1044 = self.orig;
                var $1045 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1046 = self.orig;
                var $1047 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1048 = self.orig;
                var $1049 = self.path;
                var $1050 = self.expr;
                var $1051 = self.name;
                var $1052 = self.with;
                var $1053 = self.cses;
                var $1054 = self.moti;
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
                var $1055 = self.value;
                return $1055(Bits$nil);
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
                var $1056 = self.orig;
                var $1057 = self.name;
                var $1058 = self.indx;
                return (() => {
                    var self = ($1058 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$8 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $1058 <= 0n ? 0n : _depth$2 - $1058)))));
                                return Bits$0(Bits$0(Bits$1(_name$8(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$8 = a1 => (a1 + (nat_to_bits($1058)));
                                return Bits$0(Bits$1(Bits$0(_name$8(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $1059 = self.orig;
                var $1060 = self.name;
                return (() => {
                    var _name$7 = a1 => (a1 + Fm$Term$serialize$name($1060));
                    return Bits$0(Bits$0(Bits$0(_name$7(_x$4))))
                })();
            case 'Fm.Term.typ':
                var $1061 = self.orig;
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $1062 = self.orig;
                var $1063 = self.eras;
                var $1064 = self.self;
                var $1065 = self.name;
                var $1066 = self.xtyp;
                var $1067 = self.body;
                return (() => {
                    var _eras$11 = (() => {
                        var self = $1063;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$12 = a1 => (a1 + (fm_name_to_bits($1064)));
                    var _xtyp$13 = Fm$Term$serialize($1066)(_depth$2)(_init$3);
                    var _body$14 = Fm$Term$serialize($1067(Fm$Term$xvar($1064)(_depth$2))(Fm$Term$xvar($1065)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$11(_self$12(_xtyp$13(_body$14(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $1068 = self.orig;
                var $1069 = self.name;
                var $1070 = self.body;
                return (() => {
                    var _body$8 = Fm$Term$serialize($1070(Fm$Term$xvar($1069)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$8(_x$4))))
                })();
            case 'Fm.Term.app':
                var $1071 = self.orig;
                var $1072 = self.func;
                var $1073 = self.argm;
                return (() => {
                    var _func$8 = Fm$Term$serialize($1072)(_depth$2)(_init$3);
                    var _argm$9 = Fm$Term$serialize($1073)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$8(_argm$9(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $1074 = self.orig;
                var $1075 = self.name;
                var $1076 = self.expr;
                var $1077 = self.body;
                return (() => {
                    var _expr$9 = Fm$Term$serialize($1076)(_depth$2)(_init$3);
                    var _body$10 = Fm$Term$serialize($1077(Fm$Term$xvar($1075)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$9(_body$10(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $1078 = self.orig;
                var $1079 = self.name;
                var $1080 = self.expr;
                var $1081 = self.body;
                return Fm$Term$serialize($1081($1080))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $1082 = self.orig;
                var $1083 = self.done;
                var $1084 = self.term;
                var $1085 = self.type;
                return Fm$Term$serialize($1084)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $1086 = self.orig;
                var $1087 = self.name;
                var $1088 = self.dref;
                var $1089 = self.verb;
                return (() => {
                    var _name$9 = a1 => (a1 + (fm_name_to_bits($1087)));
                    return Bits$0(Bits$0(Bits$0(_name$9(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $1090 = self.orig;
                var $1091 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $1092 = self.orig;
                var $1093 = self.natx;
                return Fm$Term$serialize(Fm$Term$unroll_nat($1093))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.chr':
                var $1094 = self.orig;
                var $1095 = self.chrx;
                return Fm$Term$serialize(Fm$Term$unroll_chr($1095))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.str':
                var $1096 = self.orig;
                var $1097 = self.strx;
                return Fm$Term$serialize(Fm$Term$unroll_str($1097))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $1098 = self.orig;
                var $1099 = self.path;
                var $1100 = self.expr;
                var $1101 = self.name;
                var $1102 = self.with;
                var $1103 = self.cses;
                var $1104 = self.moti;
                return _x$4;
        }
    })()))));
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
                                    var $1105 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $1106 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '0':
                        var $1107 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $1108 = self.slice(0, -1);
                                    return Bits$eql($1107)($1108);
                                case '1':
                                    var $1109 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '1':
                        var $1110 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $1111 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $1112 = self.slice(0, -1);
                                    return Bits$eql($1110)($1112);
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
                var $1113 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $1114 = self.orig;
                var $1115 = self.name;
                var $1116 = self.indx;
                return Fm$Term$var($1114)($1115)($1116);
            case 'Fm.Term.ref':
                var $1117 = self.orig;
                var $1118 = self.name;
                return Fm$Term$ref($1117)($1118);
            case 'Fm.Term.typ':
                var $1119 = self.orig;
                return Fm$Term$typ($1119);
            case 'Fm.Term.all':
                var $1120 = self.orig;
                var $1121 = self.eras;
                var $1122 = self.self;
                var $1123 = self.name;
                var $1124 = self.xtyp;
                var $1125 = self.body;
                return Fm$Term$all($1120)($1121)($1122)($1123)(Fm$Term$normalize($1124)(_defs$2))((_s$9 => (_x$10 => Fm$Term$normalize($1125(_s$9)(_x$10))(_defs$2))));
            case 'Fm.Term.lam':
                var $1126 = self.orig;
                var $1127 = self.name;
                var $1128 = self.body;
                return Fm$Term$lam($1126)($1127)((_x$6 => Fm$Term$normalize($1128(_x$6))(_defs$2)));
            case 'Fm.Term.app':
                var $1129 = self.orig;
                var $1130 = self.func;
                var $1131 = self.argm;
                return Fm$Term$app($1129)(Fm$Term$normalize($1130)(_defs$2))(Fm$Term$normalize($1131)(_defs$2));
            case 'Fm.Term.let':
                var $1132 = self.orig;
                var $1133 = self.name;
                var $1134 = self.expr;
                var $1135 = self.body;
                return Fm$Term$let($1132)($1133)(Fm$Term$normalize($1134)(_defs$2))((_x$7 => Fm$Term$normalize($1135(_x$7))(_defs$2)));
            case 'Fm.Term.def':
                var $1136 = self.orig;
                var $1137 = self.name;
                var $1138 = self.expr;
                var $1139 = self.body;
                return Fm$Term$def($1136)($1137)(Fm$Term$normalize($1138)(_defs$2))((_x$7 => Fm$Term$normalize($1139(_x$7))(_defs$2)));
            case 'Fm.Term.ann':
                var $1140 = self.orig;
                var $1141 = self.done;
                var $1142 = self.term;
                var $1143 = self.type;
                return Fm$Term$ann($1140)($1141)(Fm$Term$normalize($1142)(_defs$2))(Fm$Term$normalize($1143)(_defs$2));
            case 'Fm.Term.gol':
                var $1144 = self.orig;
                var $1145 = self.name;
                var $1146 = self.dref;
                var $1147 = self.verb;
                return Fm$Term$gol($1144)($1145)($1146)($1147);
            case 'Fm.Term.hol':
                var $1148 = self.orig;
                var $1149 = self.path;
                return Fm$Term$hol($1148)($1149);
            case 'Fm.Term.nat':
                var $1150 = self.orig;
                var $1151 = self.natx;
                return Fm$Term$nat($1150)($1151);
            case 'Fm.Term.chr':
                var $1152 = self.orig;
                var $1153 = self.chrx;
                return Fm$Term$chr($1152)($1153);
            case 'Fm.Term.str':
                var $1154 = self.orig;
                var $1155 = self.strx;
                return Fm$Term$str($1154)($1155);
            case 'Fm.Term.cse':
                var $1156 = self.orig;
                var $1157 = self.path;
                var $1158 = self.expr;
                var $1159 = self.name;
                var $1160 = self.with;
                var $1161 = self.cses;
                var $1162 = self.moti;
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
        var _ah$6 = Fm$Term$serialize(_a$1)(_lv$4)(_lv$4)(Bits$nil);
        var _bh$7 = Fm$Term$serialize(_b$2)(_lv$4)(_lv$4)(Bits$nil);
        return (() => {
            var self = Bits$eql(_ah$6)(_bh$7);
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
                            var self = Bits$eql(_ah$10)(_bh$11);
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
                                                                var $1163 = self.orig;
                                                                var $1164 = self.name;
                                                                var $1165 = self.indx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1166 = self.orig;
                                                                            var $1167 = self.name;
                                                                            var $1168 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1169 = self.orig;
                                                                            var $1170 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1171 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1172 = self.orig;
                                                                            var $1173 = self.eras;
                                                                            var $1174 = self.self;
                                                                            var $1175 = self.name;
                                                                            var $1176 = self.xtyp;
                                                                            var $1177 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1178 = self.orig;
                                                                            var $1179 = self.name;
                                                                            var $1180 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1181 = self.orig;
                                                                            var $1182 = self.func;
                                                                            var $1183 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1184 = self.orig;
                                                                            var $1185 = self.name;
                                                                            var $1186 = self.expr;
                                                                            var $1187 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1188 = self.orig;
                                                                            var $1189 = self.name;
                                                                            var $1190 = self.expr;
                                                                            var $1191 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1192 = self.orig;
                                                                            var $1193 = self.done;
                                                                            var $1194 = self.term;
                                                                            var $1195 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1196 = self.orig;
                                                                            var $1197 = self.name;
                                                                            var $1198 = self.dref;
                                                                            var $1199 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1200 = self.orig;
                                                                            var $1201 = self.path;
                                                                            return Fm$Term$equal$patch($1201)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1202 = self.orig;
                                                                            var $1203 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1204 = self.orig;
                                                                            var $1205 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1206 = self.orig;
                                                                            var $1207 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1208 = self.orig;
                                                                            var $1209 = self.path;
                                                                            var $1210 = self.expr;
                                                                            var $1211 = self.name;
                                                                            var $1212 = self.with;
                                                                            var $1213 = self.cses;
                                                                            var $1214 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ref':
                                                                var $1215 = self.orig;
                                                                var $1216 = self.name;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1217 = self.orig;
                                                                            var $1218 = self.name;
                                                                            var $1219 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1220 = self.orig;
                                                                            var $1221 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1222 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1223 = self.orig;
                                                                            var $1224 = self.eras;
                                                                            var $1225 = self.self;
                                                                            var $1226 = self.name;
                                                                            var $1227 = self.xtyp;
                                                                            var $1228 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1229 = self.orig;
                                                                            var $1230 = self.name;
                                                                            var $1231 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1232 = self.orig;
                                                                            var $1233 = self.func;
                                                                            var $1234 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1235 = self.orig;
                                                                            var $1236 = self.name;
                                                                            var $1237 = self.expr;
                                                                            var $1238 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1239 = self.orig;
                                                                            var $1240 = self.name;
                                                                            var $1241 = self.expr;
                                                                            var $1242 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1243 = self.orig;
                                                                            var $1244 = self.done;
                                                                            var $1245 = self.term;
                                                                            var $1246 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1247 = self.orig;
                                                                            var $1248 = self.name;
                                                                            var $1249 = self.dref;
                                                                            var $1250 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1251 = self.orig;
                                                                            var $1252 = self.path;
                                                                            return Fm$Term$equal$patch($1252)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1253 = self.orig;
                                                                            var $1254 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1255 = self.orig;
                                                                            var $1256 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1257 = self.orig;
                                                                            var $1258 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1259 = self.orig;
                                                                            var $1260 = self.path;
                                                                            var $1261 = self.expr;
                                                                            var $1262 = self.name;
                                                                            var $1263 = self.with;
                                                                            var $1264 = self.cses;
                                                                            var $1265 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.typ':
                                                                var $1266 = self.orig;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1267 = self.orig;
                                                                            var $1268 = self.name;
                                                                            var $1269 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1270 = self.orig;
                                                                            var $1271 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1272 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1273 = self.orig;
                                                                            var $1274 = self.eras;
                                                                            var $1275 = self.self;
                                                                            var $1276 = self.name;
                                                                            var $1277 = self.xtyp;
                                                                            var $1278 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1279 = self.orig;
                                                                            var $1280 = self.name;
                                                                            var $1281 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1282 = self.orig;
                                                                            var $1283 = self.func;
                                                                            var $1284 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1285 = self.orig;
                                                                            var $1286 = self.name;
                                                                            var $1287 = self.expr;
                                                                            var $1288 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1289 = self.orig;
                                                                            var $1290 = self.name;
                                                                            var $1291 = self.expr;
                                                                            var $1292 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1293 = self.orig;
                                                                            var $1294 = self.done;
                                                                            var $1295 = self.term;
                                                                            var $1296 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1297 = self.orig;
                                                                            var $1298 = self.name;
                                                                            var $1299 = self.dref;
                                                                            var $1300 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1301 = self.orig;
                                                                            var $1302 = self.path;
                                                                            return Fm$Term$equal$patch($1302)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1303 = self.orig;
                                                                            var $1304 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1305 = self.orig;
                                                                            var $1306 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1307 = self.orig;
                                                                            var $1308 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1309 = self.orig;
                                                                            var $1310 = self.path;
                                                                            var $1311 = self.expr;
                                                                            var $1312 = self.name;
                                                                            var $1313 = self.with;
                                                                            var $1314 = self.cses;
                                                                            var $1315 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.all':
                                                                var $1316 = self.orig;
                                                                var $1317 = self.eras;
                                                                var $1318 = self.self;
                                                                var $1319 = self.name;
                                                                var $1320 = self.xtyp;
                                                                var $1321 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1322 = self.orig;
                                                                            var $1323 = self.name;
                                                                            var $1324 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1325 = self.orig;
                                                                            var $1326 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1327 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1328 = self.orig;
                                                                            var $1329 = self.eras;
                                                                            var $1330 = self.self;
                                                                            var $1331 = self.name;
                                                                            var $1332 = self.xtyp;
                                                                            var $1333 = self.body;
                                                                            return (() => {
                                                                                var _seen$25 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$26 = $1321(Fm$Term$xvar($1318)(_lv$4))(Fm$Term$xvar($1319)(Nat$succ(_lv$4)));
                                                                                var _b1_body$27 = $1333(Fm$Term$xvar($1330)(_lv$4))(Fm$Term$xvar($1331)(Nat$succ(_lv$4)));
                                                                                var _eq_self$28 = ($1318 === $1330);
                                                                                var _eq_eras$29 = Bool$eql($1317)($1329);
                                                                                return (() => {
                                                                                    var self = (_eq_self$28 && _eq_eras$29);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1320)($1332)(_defs$3)(_lv$4)(_seen$25))((_eq_type$30 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$26)(_b1_body$27)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$25))((_eq_body$31 => Monad$pure(Fm$Check$monad)((_eq_type$30 && _eq_body$31))))));
                                                                                        case 'false':
                                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                                    }
                                                                                })()
                                                                            })();
                                                                        case 'Fm.Term.lam':
                                                                            var $1334 = self.orig;
                                                                            var $1335 = self.name;
                                                                            var $1336 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1337 = self.orig;
                                                                            var $1338 = self.func;
                                                                            var $1339 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1340 = self.orig;
                                                                            var $1341 = self.name;
                                                                            var $1342 = self.expr;
                                                                            var $1343 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1344 = self.orig;
                                                                            var $1345 = self.name;
                                                                            var $1346 = self.expr;
                                                                            var $1347 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1348 = self.orig;
                                                                            var $1349 = self.done;
                                                                            var $1350 = self.term;
                                                                            var $1351 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1352 = self.orig;
                                                                            var $1353 = self.name;
                                                                            var $1354 = self.dref;
                                                                            var $1355 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1356 = self.orig;
                                                                            var $1357 = self.path;
                                                                            return Fm$Term$equal$patch($1357)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1358 = self.orig;
                                                                            var $1359 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1360 = self.orig;
                                                                            var $1361 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1362 = self.orig;
                                                                            var $1363 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1364 = self.orig;
                                                                            var $1365 = self.path;
                                                                            var $1366 = self.expr;
                                                                            var $1367 = self.name;
                                                                            var $1368 = self.with;
                                                                            var $1369 = self.cses;
                                                                            var $1370 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.lam':
                                                                var $1371 = self.orig;
                                                                var $1372 = self.name;
                                                                var $1373 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1374 = self.orig;
                                                                            var $1375 = self.name;
                                                                            var $1376 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1377 = self.orig;
                                                                            var $1378 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1379 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1380 = self.orig;
                                                                            var $1381 = self.eras;
                                                                            var $1382 = self.self;
                                                                            var $1383 = self.name;
                                                                            var $1384 = self.xtyp;
                                                                            var $1385 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1386 = self.orig;
                                                                            var $1387 = self.name;
                                                                            var $1388 = self.body;
                                                                            return (() => {
                                                                                var _seen$19 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$20 = $1373(Fm$Term$xvar($1372)(_lv$4));
                                                                                var _b1_body$21 = $1388(Fm$Term$xvar($1387)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$20)(_b1_body$21)(_defs$3)(Nat$succ(_lv$4))(_seen$19))((_eq_body$22 => Monad$pure(Fm$Check$monad)(_eq_body$22)))
                                                                            })();
                                                                        case 'Fm.Term.app':
                                                                            var $1389 = self.orig;
                                                                            var $1390 = self.func;
                                                                            var $1391 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1392 = self.orig;
                                                                            var $1393 = self.name;
                                                                            var $1394 = self.expr;
                                                                            var $1395 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1396 = self.orig;
                                                                            var $1397 = self.name;
                                                                            var $1398 = self.expr;
                                                                            var $1399 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1400 = self.orig;
                                                                            var $1401 = self.done;
                                                                            var $1402 = self.term;
                                                                            var $1403 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1404 = self.orig;
                                                                            var $1405 = self.name;
                                                                            var $1406 = self.dref;
                                                                            var $1407 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1408 = self.orig;
                                                                            var $1409 = self.path;
                                                                            return Fm$Term$equal$patch($1409)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1410 = self.orig;
                                                                            var $1411 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1412 = self.orig;
                                                                            var $1413 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1414 = self.orig;
                                                                            var $1415 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1416 = self.orig;
                                                                            var $1417 = self.path;
                                                                            var $1418 = self.expr;
                                                                            var $1419 = self.name;
                                                                            var $1420 = self.with;
                                                                            var $1421 = self.cses;
                                                                            var $1422 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.app':
                                                                var $1423 = self.orig;
                                                                var $1424 = self.func;
                                                                var $1425 = self.argm;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1426 = self.orig;
                                                                            var $1427 = self.name;
                                                                            var $1428 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1429 = self.orig;
                                                                            var $1430 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1431 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1432 = self.orig;
                                                                            var $1433 = self.eras;
                                                                            var $1434 = self.self;
                                                                            var $1435 = self.name;
                                                                            var $1436 = self.xtyp;
                                                                            var $1437 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1438 = self.orig;
                                                                            var $1439 = self.name;
                                                                            var $1440 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1441 = self.orig;
                                                                            var $1442 = self.func;
                                                                            var $1443 = self.argm;
                                                                            return (() => {
                                                                                var _seen$19 = Set$set(_id$12)(_seen$5);
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1424)($1442)(_defs$3)(_lv$4)(_seen$19))((_eq_func$20 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1425)($1443)(_defs$3)(_lv$4)(_seen$19))((_eq_argm$21 => Monad$pure(Fm$Check$monad)((_eq_func$20 && _eq_argm$21))))))
                                                                            })();
                                                                        case 'Fm.Term.let':
                                                                            var $1444 = self.orig;
                                                                            var $1445 = self.name;
                                                                            var $1446 = self.expr;
                                                                            var $1447 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1448 = self.orig;
                                                                            var $1449 = self.name;
                                                                            var $1450 = self.expr;
                                                                            var $1451 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1452 = self.orig;
                                                                            var $1453 = self.done;
                                                                            var $1454 = self.term;
                                                                            var $1455 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1456 = self.orig;
                                                                            var $1457 = self.name;
                                                                            var $1458 = self.dref;
                                                                            var $1459 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1460 = self.orig;
                                                                            var $1461 = self.path;
                                                                            return Fm$Term$equal$patch($1461)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1462 = self.orig;
                                                                            var $1463 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1464 = self.orig;
                                                                            var $1465 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1466 = self.orig;
                                                                            var $1467 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1468 = self.orig;
                                                                            var $1469 = self.path;
                                                                            var $1470 = self.expr;
                                                                            var $1471 = self.name;
                                                                            var $1472 = self.with;
                                                                            var $1473 = self.cses;
                                                                            var $1474 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.let':
                                                                var $1475 = self.orig;
                                                                var $1476 = self.name;
                                                                var $1477 = self.expr;
                                                                var $1478 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1479 = self.orig;
                                                                            var $1480 = self.name;
                                                                            var $1481 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1482 = self.orig;
                                                                            var $1483 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1484 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1485 = self.orig;
                                                                            var $1486 = self.eras;
                                                                            var $1487 = self.self;
                                                                            var $1488 = self.name;
                                                                            var $1489 = self.xtyp;
                                                                            var $1490 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1491 = self.orig;
                                                                            var $1492 = self.name;
                                                                            var $1493 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1494 = self.orig;
                                                                            var $1495 = self.func;
                                                                            var $1496 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1497 = self.orig;
                                                                            var $1498 = self.name;
                                                                            var $1499 = self.expr;
                                                                            var $1500 = self.body;
                                                                            return (() => {
                                                                                var _seen$21 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$22 = $1478(Fm$Term$xvar($1476)(_lv$4));
                                                                                var _b1_body$23 = $1500(Fm$Term$xvar($1498)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1477)($1499)(_defs$3)(_lv$4)(_seen$21))((_eq_expr$24 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$22)(_b1_body$23)(_defs$3)(Nat$succ(_lv$4))(_seen$21))((_eq_body$25 => Monad$pure(Fm$Check$monad)((_eq_expr$24 && _eq_body$25))))))
                                                                            })();
                                                                        case 'Fm.Term.def':
                                                                            var $1501 = self.orig;
                                                                            var $1502 = self.name;
                                                                            var $1503 = self.expr;
                                                                            var $1504 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1505 = self.orig;
                                                                            var $1506 = self.done;
                                                                            var $1507 = self.term;
                                                                            var $1508 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1509 = self.orig;
                                                                            var $1510 = self.name;
                                                                            var $1511 = self.dref;
                                                                            var $1512 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1513 = self.orig;
                                                                            var $1514 = self.path;
                                                                            return Fm$Term$equal$patch($1514)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1515 = self.orig;
                                                                            var $1516 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1517 = self.orig;
                                                                            var $1518 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1519 = self.orig;
                                                                            var $1520 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1521 = self.orig;
                                                                            var $1522 = self.path;
                                                                            var $1523 = self.expr;
                                                                            var $1524 = self.name;
                                                                            var $1525 = self.with;
                                                                            var $1526 = self.cses;
                                                                            var $1527 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.def':
                                                                var $1528 = self.orig;
                                                                var $1529 = self.name;
                                                                var $1530 = self.expr;
                                                                var $1531 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1532 = self.orig;
                                                                            var $1533 = self.name;
                                                                            var $1534 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1535 = self.orig;
                                                                            var $1536 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1537 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1538 = self.orig;
                                                                            var $1539 = self.eras;
                                                                            var $1540 = self.self;
                                                                            var $1541 = self.name;
                                                                            var $1542 = self.xtyp;
                                                                            var $1543 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1544 = self.orig;
                                                                            var $1545 = self.name;
                                                                            var $1546 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1547 = self.orig;
                                                                            var $1548 = self.func;
                                                                            var $1549 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1550 = self.orig;
                                                                            var $1551 = self.name;
                                                                            var $1552 = self.expr;
                                                                            var $1553 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1554 = self.orig;
                                                                            var $1555 = self.name;
                                                                            var $1556 = self.expr;
                                                                            var $1557 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1558 = self.orig;
                                                                            var $1559 = self.done;
                                                                            var $1560 = self.term;
                                                                            var $1561 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1562 = self.orig;
                                                                            var $1563 = self.name;
                                                                            var $1564 = self.dref;
                                                                            var $1565 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1566 = self.orig;
                                                                            var $1567 = self.path;
                                                                            return Fm$Term$equal$patch($1567)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1568 = self.orig;
                                                                            var $1569 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1570 = self.orig;
                                                                            var $1571 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1572 = self.orig;
                                                                            var $1573 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1574 = self.orig;
                                                                            var $1575 = self.path;
                                                                            var $1576 = self.expr;
                                                                            var $1577 = self.name;
                                                                            var $1578 = self.with;
                                                                            var $1579 = self.cses;
                                                                            var $1580 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ann':
                                                                var $1581 = self.orig;
                                                                var $1582 = self.done;
                                                                var $1583 = self.term;
                                                                var $1584 = self.type;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1585 = self.orig;
                                                                            var $1586 = self.name;
                                                                            var $1587 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1588 = self.orig;
                                                                            var $1589 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1590 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1591 = self.orig;
                                                                            var $1592 = self.eras;
                                                                            var $1593 = self.self;
                                                                            var $1594 = self.name;
                                                                            var $1595 = self.xtyp;
                                                                            var $1596 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1597 = self.orig;
                                                                            var $1598 = self.name;
                                                                            var $1599 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1600 = self.orig;
                                                                            var $1601 = self.func;
                                                                            var $1602 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1603 = self.orig;
                                                                            var $1604 = self.name;
                                                                            var $1605 = self.expr;
                                                                            var $1606 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1607 = self.orig;
                                                                            var $1608 = self.name;
                                                                            var $1609 = self.expr;
                                                                            var $1610 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1611 = self.orig;
                                                                            var $1612 = self.done;
                                                                            var $1613 = self.term;
                                                                            var $1614 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1615 = self.orig;
                                                                            var $1616 = self.name;
                                                                            var $1617 = self.dref;
                                                                            var $1618 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1619 = self.orig;
                                                                            var $1620 = self.path;
                                                                            return Fm$Term$equal$patch($1620)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1621 = self.orig;
                                                                            var $1622 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1623 = self.orig;
                                                                            var $1624 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1625 = self.orig;
                                                                            var $1626 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1627 = self.orig;
                                                                            var $1628 = self.path;
                                                                            var $1629 = self.expr;
                                                                            var $1630 = self.name;
                                                                            var $1631 = self.with;
                                                                            var $1632 = self.cses;
                                                                            var $1633 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.gol':
                                                                var $1634 = self.orig;
                                                                var $1635 = self.name;
                                                                var $1636 = self.dref;
                                                                var $1637 = self.verb;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1638 = self.orig;
                                                                            var $1639 = self.name;
                                                                            var $1640 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1641 = self.orig;
                                                                            var $1642 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1643 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1644 = self.orig;
                                                                            var $1645 = self.eras;
                                                                            var $1646 = self.self;
                                                                            var $1647 = self.name;
                                                                            var $1648 = self.xtyp;
                                                                            var $1649 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1650 = self.orig;
                                                                            var $1651 = self.name;
                                                                            var $1652 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1653 = self.orig;
                                                                            var $1654 = self.func;
                                                                            var $1655 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1656 = self.orig;
                                                                            var $1657 = self.name;
                                                                            var $1658 = self.expr;
                                                                            var $1659 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1660 = self.orig;
                                                                            var $1661 = self.name;
                                                                            var $1662 = self.expr;
                                                                            var $1663 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1664 = self.orig;
                                                                            var $1665 = self.done;
                                                                            var $1666 = self.term;
                                                                            var $1667 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1668 = self.orig;
                                                                            var $1669 = self.name;
                                                                            var $1670 = self.dref;
                                                                            var $1671 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1672 = self.orig;
                                                                            var $1673 = self.path;
                                                                            return Fm$Term$equal$patch($1673)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1674 = self.orig;
                                                                            var $1675 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1676 = self.orig;
                                                                            var $1677 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1678 = self.orig;
                                                                            var $1679 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1680 = self.orig;
                                                                            var $1681 = self.path;
                                                                            var $1682 = self.expr;
                                                                            var $1683 = self.name;
                                                                            var $1684 = self.with;
                                                                            var $1685 = self.cses;
                                                                            var $1686 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.hol':
                                                                var $1687 = self.orig;
                                                                var $1688 = self.path;
                                                                return Fm$Term$equal$patch($1688)(_b$2);
                                                            case 'Fm.Term.nat':
                                                                var $1689 = self.orig;
                                                                var $1690 = self.natx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1691 = self.orig;
                                                                            var $1692 = self.name;
                                                                            var $1693 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1694 = self.orig;
                                                                            var $1695 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1696 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1697 = self.orig;
                                                                            var $1698 = self.eras;
                                                                            var $1699 = self.self;
                                                                            var $1700 = self.name;
                                                                            var $1701 = self.xtyp;
                                                                            var $1702 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1703 = self.orig;
                                                                            var $1704 = self.name;
                                                                            var $1705 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1706 = self.orig;
                                                                            var $1707 = self.func;
                                                                            var $1708 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1709 = self.orig;
                                                                            var $1710 = self.name;
                                                                            var $1711 = self.expr;
                                                                            var $1712 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1713 = self.orig;
                                                                            var $1714 = self.name;
                                                                            var $1715 = self.expr;
                                                                            var $1716 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1717 = self.orig;
                                                                            var $1718 = self.done;
                                                                            var $1719 = self.term;
                                                                            var $1720 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1721 = self.orig;
                                                                            var $1722 = self.name;
                                                                            var $1723 = self.dref;
                                                                            var $1724 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1725 = self.orig;
                                                                            var $1726 = self.path;
                                                                            return Fm$Term$equal$patch($1726)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1727 = self.orig;
                                                                            var $1728 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1729 = self.orig;
                                                                            var $1730 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1731 = self.orig;
                                                                            var $1732 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1733 = self.orig;
                                                                            var $1734 = self.path;
                                                                            var $1735 = self.expr;
                                                                            var $1736 = self.name;
                                                                            var $1737 = self.with;
                                                                            var $1738 = self.cses;
                                                                            var $1739 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.chr':
                                                                var $1740 = self.orig;
                                                                var $1741 = self.chrx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1742 = self.orig;
                                                                            var $1743 = self.name;
                                                                            var $1744 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1745 = self.orig;
                                                                            var $1746 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1747 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1748 = self.orig;
                                                                            var $1749 = self.eras;
                                                                            var $1750 = self.self;
                                                                            var $1751 = self.name;
                                                                            var $1752 = self.xtyp;
                                                                            var $1753 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1754 = self.orig;
                                                                            var $1755 = self.name;
                                                                            var $1756 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1757 = self.orig;
                                                                            var $1758 = self.func;
                                                                            var $1759 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1760 = self.orig;
                                                                            var $1761 = self.name;
                                                                            var $1762 = self.expr;
                                                                            var $1763 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1764 = self.orig;
                                                                            var $1765 = self.name;
                                                                            var $1766 = self.expr;
                                                                            var $1767 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1768 = self.orig;
                                                                            var $1769 = self.done;
                                                                            var $1770 = self.term;
                                                                            var $1771 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1772 = self.orig;
                                                                            var $1773 = self.name;
                                                                            var $1774 = self.dref;
                                                                            var $1775 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1776 = self.orig;
                                                                            var $1777 = self.path;
                                                                            return Fm$Term$equal$patch($1777)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1778 = self.orig;
                                                                            var $1779 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1780 = self.orig;
                                                                            var $1781 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1782 = self.orig;
                                                                            var $1783 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1784 = self.orig;
                                                                            var $1785 = self.path;
                                                                            var $1786 = self.expr;
                                                                            var $1787 = self.name;
                                                                            var $1788 = self.with;
                                                                            var $1789 = self.cses;
                                                                            var $1790 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.str':
                                                                var $1791 = self.orig;
                                                                var $1792 = self.strx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1793 = self.orig;
                                                                            var $1794 = self.name;
                                                                            var $1795 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1796 = self.orig;
                                                                            var $1797 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1798 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1799 = self.orig;
                                                                            var $1800 = self.eras;
                                                                            var $1801 = self.self;
                                                                            var $1802 = self.name;
                                                                            var $1803 = self.xtyp;
                                                                            var $1804 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1805 = self.orig;
                                                                            var $1806 = self.name;
                                                                            var $1807 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1808 = self.orig;
                                                                            var $1809 = self.func;
                                                                            var $1810 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1811 = self.orig;
                                                                            var $1812 = self.name;
                                                                            var $1813 = self.expr;
                                                                            var $1814 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1815 = self.orig;
                                                                            var $1816 = self.name;
                                                                            var $1817 = self.expr;
                                                                            var $1818 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1819 = self.orig;
                                                                            var $1820 = self.done;
                                                                            var $1821 = self.term;
                                                                            var $1822 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1823 = self.orig;
                                                                            var $1824 = self.name;
                                                                            var $1825 = self.dref;
                                                                            var $1826 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1827 = self.orig;
                                                                            var $1828 = self.path;
                                                                            return Fm$Term$equal$patch($1828)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1829 = self.orig;
                                                                            var $1830 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1831 = self.orig;
                                                                            var $1832 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1833 = self.orig;
                                                                            var $1834 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1835 = self.orig;
                                                                            var $1836 = self.path;
                                                                            var $1837 = self.expr;
                                                                            var $1838 = self.name;
                                                                            var $1839 = self.with;
                                                                            var $1840 = self.cses;
                                                                            var $1841 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.cse':
                                                                var $1842 = self.orig;
                                                                var $1843 = self.path;
                                                                var $1844 = self.expr;
                                                                var $1845 = self.name;
                                                                var $1846 = self.with;
                                                                var $1847 = self.cses;
                                                                var $1848 = self.moti;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1849 = self.orig;
                                                                            var $1850 = self.name;
                                                                            var $1851 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1852 = self.orig;
                                                                            var $1853 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            var $1854 = self.orig;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1855 = self.orig;
                                                                            var $1856 = self.eras;
                                                                            var $1857 = self.self;
                                                                            var $1858 = self.name;
                                                                            var $1859 = self.xtyp;
                                                                            var $1860 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1861 = self.orig;
                                                                            var $1862 = self.name;
                                                                            var $1863 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1864 = self.orig;
                                                                            var $1865 = self.func;
                                                                            var $1866 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1867 = self.orig;
                                                                            var $1868 = self.name;
                                                                            var $1869 = self.expr;
                                                                            var $1870 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1871 = self.orig;
                                                                            var $1872 = self.name;
                                                                            var $1873 = self.expr;
                                                                            var $1874 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1875 = self.orig;
                                                                            var $1876 = self.done;
                                                                            var $1877 = self.term;
                                                                            var $1878 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1879 = self.orig;
                                                                            var $1880 = self.name;
                                                                            var $1881 = self.dref;
                                                                            var $1882 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1883 = self.orig;
                                                                            var $1884 = self.path;
                                                                            return Fm$Term$equal$patch($1884)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1885 = self.orig;
                                                                            var $1886 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1887 = self.orig;
                                                                            var $1888 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1889 = self.orig;
                                                                            var $1890 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1891 = self.orig;
                                                                            var $1892 = self.path;
                                                                            var $1893 = self.expr;
                                                                            var $1894 = self.name;
                                                                            var $1895 = self.with;
                                                                            var $1896 = self.cses;
                                                                            var $1897 = self.moti;
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
    var Fm$Term$origin = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1898 = self.orig;
                var $1899 = self.name;
                var $1900 = self.indx;
                return $1898;
            case 'Fm.Term.ref':
                var $1901 = self.orig;
                var $1902 = self.name;
                return $1901;
            case 'Fm.Term.typ':
                var $1903 = self.orig;
                return $1903;
            case 'Fm.Term.all':
                var $1904 = self.orig;
                var $1905 = self.eras;
                var $1906 = self.self;
                var $1907 = self.name;
                var $1908 = self.xtyp;
                var $1909 = self.body;
                return $1904;
            case 'Fm.Term.lam':
                var $1910 = self.orig;
                var $1911 = self.name;
                var $1912 = self.body;
                return $1910;
            case 'Fm.Term.app':
                var $1913 = self.orig;
                var $1914 = self.func;
                var $1915 = self.argm;
                return $1913;
            case 'Fm.Term.let':
                var $1916 = self.orig;
                var $1917 = self.name;
                var $1918 = self.expr;
                var $1919 = self.body;
                return $1916;
            case 'Fm.Term.def':
                var $1920 = self.orig;
                var $1921 = self.name;
                var $1922 = self.expr;
                var $1923 = self.body;
                return $1920;
            case 'Fm.Term.ann':
                var $1924 = self.orig;
                var $1925 = self.done;
                var $1926 = self.term;
                var $1927 = self.type;
                return $1924;
            case 'Fm.Term.gol':
                var $1928 = self.orig;
                var $1929 = self.name;
                var $1930 = self.dref;
                var $1931 = self.verb;
                return $1928;
            case 'Fm.Term.hol':
                var $1932 = self.orig;
                var $1933 = self.path;
                return $1932;
            case 'Fm.Term.nat':
                var $1934 = self.orig;
                var $1935 = self.natx;
                return $1934;
            case 'Fm.Term.chr':
                var $1936 = self.orig;
                var $1937 = self.chrx;
                return $1936;
            case 'Fm.Term.str':
                var $1938 = self.orig;
                var $1939 = self.strx;
                return $1938;
            case 'Fm.Term.cse':
                var $1940 = self.orig;
                var $1941 = self.path;
                var $1942 = self.expr;
                var $1943 = self.name;
                var $1944 = self.with;
                var $1945 = self.cses;
                var $1946 = self.moti;
                return $1940;
        }
    })());
    var Fm$Term$check = (_term$1 => (_type$2 => (_defs$3 => (_ctx$4 => (_path$5 => Monad$bind(Fm$Check$monad)((() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1947 = self.orig;
                var $1948 = self.name;
                var $1949 = self.indx;
                return (() => {
                    var self = List$at_last($1949)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1947)($1948))(List$nil));
                        case 'Maybe.some':
                            var $1950 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1950;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1951 = self.fst;
                                        var $1952 = self.snd;
                                        return $1952;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1953 = self.orig;
                var $1954 = self.name;
                return (() => {
                    var self = Fm$get($1954)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1953)($1954))(List$nil));
                        case 'Maybe.some':
                            var $1955 = self.value;
                            return (() => {
                                var self = $1955;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1956 = self.file;
                                        var $1957 = self.name;
                                        var $1958 = self.term;
                                        var $1959 = self.type;
                                        var $1960 = self.stat;
                                        return (() => {
                                            var _ref_name$14 = $1957;
                                            var _ref_type$15 = $1959;
                                            var _ref_term$16 = $1958;
                                            var _ref_stat$17 = $1960;
                                            return (() => {
                                                var self = _ref_stat$17;
                                                switch (self._) {
                                                    case 'Fm.Status.init':
                                                        return Fm$Check$result(Maybe$some(_ref_type$15))(List$cons(Fm$Error$waiting(_ref_name$14))(List$nil));
                                                    case 'Fm.Status.wait':
                                                        return Fm$Check$result(Maybe$some(_ref_type$15))(List$nil);
                                                    case 'Fm.Status.done':
                                                        return Fm$Check$result(Maybe$some(_ref_type$15))(List$nil);
                                                    case 'Fm.Status.fail':
                                                        var $1961 = self.errors;
                                                        return Fm$Check$result(Maybe$some(_ref_type$15))(List$cons(Fm$Error$indirect(_ref_name$14))(List$nil));
                                                }
                                            })()
                                        })();
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $1962 = self.orig;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xtyp);
            case 'Fm.Term.all':
                var $1963 = self.orig;
                var $1964 = self.eras;
                var $1965 = self.self;
                var $1966 = self.name;
                var $1967 = self.xtyp;
                var $1968 = self.body;
                return (() => {
                    var _ctx_size$12 = List$length(_ctx$4);
                    var _self_var$13 = Fm$Term$xvar($1965)(_ctx_size$12);
                    var _body_var$14 = Fm$Term$xvar($1966)(Nat$succ(_ctx_size$12));
                    var _body_ctx$15 = List$cons(Pair$new($1966)($1967))(List$cons(Pair$new($1965)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1967)(Maybe$some(Fm$Term$xtyp))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$16 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1968(_self_var$13)(_body_var$14))(Maybe$some(Fm$Term$xtyp))(_defs$3)(_body_ctx$15)(Fm$MPath$1(_path$5)))((_$17 => Monad$pure(Fm$Check$monad)(Fm$Term$xtyp)))))
                })();
            case 'Fm.Term.lam':
                var $1969 = self.orig;
                var $1970 = self.name;
                var $1971 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer($1969)(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1972 = self.value;
                            return (() => {
                                var _typv$10 = Fm$Term$reduce($1972)(_defs$3);
                                return (() => {
                                    var self = _typv$10;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1973 = self.orig;
                                            var $1974 = self.name;
                                            var $1975 = self.indx;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1976 = self.orig;
                                            var $1977 = self.name;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            var $1978 = self.orig;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1979 = self.orig;
                                            var $1980 = self.eras;
                                            var $1981 = self.self;
                                            var $1982 = self.name;
                                            var $1983 = self.xtyp;
                                            var $1984 = self.body;
                                            return (() => {
                                                var _ctx_size$17 = List$length(_ctx$4);
                                                var _self_var$18 = _term$1;
                                                var _body_var$19 = Fm$Term$xvar($1970)(_ctx_size$17);
                                                var _body_typ$20 = $1984(_self_var$18)(_body_var$19);
                                                var _body_ctx$21 = List$cons(Pair$new($1970)($1983))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1971(_body_var$19))(Maybe$some(_body_typ$20))(_defs$3)(_body_ctx$21)(Fm$MPath$0(_path$5)))((_$22 => Monad$pure(Fm$Check$monad)($1972)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1985 = self.orig;
                                            var $1986 = self.name;
                                            var $1987 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1988 = self.orig;
                                            var $1989 = self.func;
                                            var $1990 = self.argm;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1991 = self.orig;
                                            var $1992 = self.name;
                                            var $1993 = self.expr;
                                            var $1994 = self.body;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1995 = self.orig;
                                            var $1996 = self.name;
                                            var $1997 = self.expr;
                                            var $1998 = self.body;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1999 = self.orig;
                                            var $2000 = self.done;
                                            var $2001 = self.term;
                                            var $2002 = self.type;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $2003 = self.orig;
                                            var $2004 = self.name;
                                            var $2005 = self.dref;
                                            var $2006 = self.verb;
                                            return (() => {
                                                var _expected$15 = Either$left("Function");
                                                var _detected$16 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $2007 = self.orig;
                                            var $2008 = self.path;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $2009 = self.orig;
                                            var $2010 = self.natx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $2011 = self.orig;
                                            var $2012 = self.chrx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $2013 = self.orig;
                                            var $2014 = self.strx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $2015 = self.orig;
                                            var $2016 = self.path;
                                            var $2017 = self.expr;
                                            var $2018 = self.name;
                                            var $2019 = self.with;
                                            var $2020 = self.cses;
                                            var $2021 = self.moti;
                                            return (() => {
                                                var _expected$18 = Either$left("Function");
                                                var _detected$19 = Either$right($1972);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($1969)(_expected$18)(_detected$19)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $2022 = self.orig;
                var $2023 = self.func;
                var $2024 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($2023)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_func_typ$9 => (() => {
                    var _func_typ$10 = Fm$Term$reduce(_func_typ$9)(_defs$3);
                    return (() => {
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $2025 = self.orig;
                                var $2026 = self.name;
                                var $2027 = self.indx;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $2028 = self.orig;
                                var $2029 = self.name;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.typ':
                                var $2030 = self.orig;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.all':
                                var $2031 = self.orig;
                                var $2032 = self.eras;
                                var $2033 = self.self;
                                var $2034 = self.name;
                                var $2035 = self.xtyp;
                                var $2036 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($2024)(Maybe$some($2035))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$17 => Monad$pure(Fm$Check$monad)($2036($2023)($2024))));
                            case 'Fm.Term.lam':
                                var $2037 = self.orig;
                                var $2038 = self.name;
                                var $2039 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $2040 = self.orig;
                                var $2041 = self.func;
                                var $2042 = self.argm;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $2043 = self.orig;
                                var $2044 = self.name;
                                var $2045 = self.expr;
                                var $2046 = self.body;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $2047 = self.orig;
                                var $2048 = self.name;
                                var $2049 = self.expr;
                                var $2050 = self.body;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $2051 = self.orig;
                                var $2052 = self.done;
                                var $2053 = self.term;
                                var $2054 = self.type;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $2055 = self.orig;
                                var $2056 = self.name;
                                var $2057 = self.dref;
                                var $2058 = self.verb;
                                return (() => {
                                    var _expected$15 = Either$left("Function");
                                    var _detected$16 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$15)(_detected$16)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $2059 = self.orig;
                                var $2060 = self.path;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $2061 = self.orig;
                                var $2062 = self.natx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $2063 = self.orig;
                                var $2064 = self.chrx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $2065 = self.orig;
                                var $2066 = self.strx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $2067 = self.orig;
                                var $2068 = self.path;
                                var $2069 = self.expr;
                                var $2070 = self.name;
                                var $2071 = self.with;
                                var $2072 = self.cses;
                                var $2073 = self.moti;
                                return (() => {
                                    var _expected$18 = Either$left("Function");
                                    var _detected$19 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch($2022)(_expected$18)(_detected$19)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $2074 = self.orig;
                var $2075 = self.name;
                var $2076 = self.expr;
                var $2077 = self.body;
                return (() => {
                    var _ctx_size$10 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($2076)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_expr_typ$11 => (() => {
                        var _body_val$12 = $2077(Fm$Term$xvar($2075)(_ctx_size$10));
                        var _body_ctx$13 = List$cons(Pair$new($2075)(_expr_typ$11))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$12)(_type$2)(_defs$3)(_body_ctx$13)(Fm$MPath$1(_path$5)))((_body_typ$14 => Monad$pure(Fm$Check$monad)(_body_typ$14)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $2078 = self.orig;
                var $2079 = self.name;
                var $2080 = self.expr;
                var $2081 = self.body;
                return Fm$Term$check($2081($2080))(_type$2)(_defs$3)(_ctx$4)(_path$5);
            case 'Fm.Term.ann':
                var $2082 = self.orig;
                var $2083 = self.done;
                var $2084 = self.term;
                var $2085 = self.type;
                return (() => {
                    var self = $2083;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($2085);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($2084)(Maybe$some($2085))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$10 => Monad$bind(Fm$Check$monad)(Fm$Term$check($2085)(Maybe$some(Fm$Term$xtyp))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$11 => Monad$pure(Fm$Check$monad)($2085)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $2086 = self.orig;
                var $2087 = self.name;
                var $2088 = self.dref;
                var $2089 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($2087)($2088)($2089)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $2090 = self.orig;
                var $2091 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $2092 = self.orig;
                var $2093 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("Nat"));
            case 'Fm.Term.chr':
                var $2094 = self.orig;
                var $2095 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("Char"));
            case 'Fm.Term.str':
                var $2096 = self.orig;
                var $2097 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$xref("String"));
            case 'Fm.Term.cse':
                var $2098 = self.orig;
                var $2099 = self.path;
                var $2100 = self.expr;
                var $2101 = self.name;
                var $2102 = self.with;
                var $2103 = self.cses;
                var $2104 = self.moti;
                return (() => {
                    var _expr$13 = $2100;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$13)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_etyp$14 => (() => {
                        var _dsug$15 = Fm$Term$desugar_cse($2100)($2101)($2102)($2103)($2104)(_etyp$14)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$15;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer($2098)(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $2105 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($2105))(List$nil));
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
                var $2106 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($2106)(_infr$6)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$8 => (() => {
                    var self = _eqls$8;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($2106);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(Fm$Term$origin(_term$1))(Either$right($2106))(Either$right(_infr$6))(_ctx$4))(List$nil));
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
                var $2107 = self.head;
                var $2108 = self.tail;
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
                var $2109 = self.orig;
                var $2110 = self.name;
                var $2111 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2112 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2113 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $2114 = self.orig;
                var $2115 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2116 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2117 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.typ':
                var $2118 = self.orig;
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
            case 'Fm.Term.all':
                var $2121 = self.orig;
                var $2122 = self.eras;
                var $2123 = self.self;
                var $2124 = self.name;
                var $2125 = self.xtyp;
                var $2126 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2127 = self.slice(0, -1);
                            return Fm$Term$all($2121)($2122)($2123)($2124)(Fm$Term$patch_at($2127)($2125)(_fn$3))($2126);
                        case '1':
                            var $2128 = self.slice(0, -1);
                            return Fm$Term$all($2121)($2122)($2123)($2124)($2125)((_s$11 => (_x$12 => Fm$Term$patch_at($2128)($2126(_s$11)(_x$12))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $2129 = self.orig;
                var $2130 = self.name;
                var $2131 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2132 = self.slice(0, -1);
                            return Fm$Term$lam($2129)($2130)((_x$8 => Fm$Term$patch_at(Bits$tail(_path$1))($2131(_x$8))(_fn$3)));
                        case '1':
                            var $2133 = self.slice(0, -1);
                            return Fm$Term$lam($2129)($2130)((_x$8 => Fm$Term$patch_at(Bits$tail(_path$1))($2131(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $2134 = self.orig;
                var $2135 = self.func;
                var $2136 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2137 = self.slice(0, -1);
                            return Fm$Term$app($2134)(Fm$Term$patch_at($2137)($2135)(_fn$3))($2136);
                        case '1':
                            var $2138 = self.slice(0, -1);
                            return Fm$Term$app($2134)($2135)(Fm$Term$patch_at($2138)($2136)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $2139 = self.orig;
                var $2140 = self.name;
                var $2141 = self.expr;
                var $2142 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2143 = self.slice(0, -1);
                            return Fm$Term$let($2139)($2140)(Fm$Term$patch_at($2143)($2141)(_fn$3))($2142);
                        case '1':
                            var $2144 = self.slice(0, -1);
                            return Fm$Term$let($2139)($2140)($2141)((_x$9 => Fm$Term$patch_at($2144)($2142(_x$9))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $2145 = self.orig;
                var $2146 = self.name;
                var $2147 = self.expr;
                var $2148 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2149 = self.slice(0, -1);
                            return Fm$Term$def($2145)($2146)(Fm$Term$patch_at($2149)($2147)(_fn$3))($2148);
                        case '1':
                            var $2150 = self.slice(0, -1);
                            return Fm$Term$def($2145)($2146)($2147)((_x$9 => Fm$Term$patch_at($2150)($2148(_x$9))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $2151 = self.orig;
                var $2152 = self.done;
                var $2153 = self.term;
                var $2154 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2155 = self.slice(0, -1);
                            return Fm$Term$ann($2151)($2152)(Fm$Term$patch_at(_path$1)($2153)(_fn$3))($2154);
                        case '1':
                            var $2156 = self.slice(0, -1);
                            return Fm$Term$ann($2151)($2152)(Fm$Term$patch_at(_path$1)($2153)(_fn$3))($2154);
                    }
                })();
            case 'Fm.Term.gol':
                var $2157 = self.orig;
                var $2158 = self.name;
                var $2159 = self.dref;
                var $2160 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2161 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2162 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $2163 = self.orig;
                var $2164 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2165 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2166 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $2167 = self.orig;
                var $2168 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2169 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2170 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $2171 = self.orig;
                var $2172 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2173 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2174 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $2175 = self.orig;
                var $2176 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2177 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2178 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $2179 = self.orig;
                var $2180 = self.path;
                var $2181 = self.expr;
                var $2182 = self.name;
                var $2183 = self.with;
                var $2184 = self.cses;
                var $2185 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $2186 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $2187 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
        }
    })())));
    var Fm$Synth$fix = _file$1 => _name$2 => _term$3 => _type$4 => _defs$5 => _errs$6 => _fixd$7 => {
        var Fm$Synth$fix = _file$1 => _name$2 => _term$3 => _type$4 => _defs$5 => _errs$6 => _fixd$7 => ({
            ctr: 'TCO',
            arg: [_file$1, _name$2, _term$3, _type$4, _defs$5, _errs$6, _fixd$7]
        });
        var arg = [_file$1, _name$2, _term$3, _type$4, _defs$5, _errs$6, _fixd$7];
        while (true) {
            let [_file$1, _name$2, _term$3, _type$4, _defs$5, _errs$6, _fixd$7] = arg;
            var R = (() => {
                var self = _errs$6;
                switch (self._) {
                    case 'List.nil':
                        return (() => {
                            var self = _fixd$7;
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return (() => {
                                        var _type$8 = Fm$Term$bind(List$nil)((_x$8 => Bits$1(_x$8)))(_type$4);
                                        var _term$9 = Fm$Term$bind(List$nil)((_x$9 => Bits$0(_x$9)))(_term$3);
                                        var _defs$10 = Fm$set(_name$2)(Fm$Def$new(_file$1)(_name$2)(_term$9)(_type$8)(Fm$Status$init))(_defs$5);
                                        return Maybe$some(_defs$10)
                                    })();
                                case 'false':
                                    return Maybe$none;
                            }
                        })();
                    case 'List.cons':
                        var $2188 = self.head;
                        var $2189 = self.tail;
                        return (() => {
                            var self = $2188;
                            switch (self._) {
                                case 'Fm.Error.type_mismatch':
                                    var $2190 = self.origin;
                                    var $2191 = self.expected;
                                    var $2192 = self.detected;
                                    var $2193 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($2189)(_fixd$7);
                                case 'Fm.Error.show_goal':
                                    var $2194 = self.name;
                                    var $2195 = self.dref;
                                    var $2196 = self.verb;
                                    var $2197 = self.goal;
                                    var $2198 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($2189)(_fixd$7);
                                case 'Fm.Error.waiting':
                                    var $2199 = self.name;
                                    return (() => {
                                        var _defs$11 = Fm$Synth$one($2199)(_defs$5);
                                        return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$11)($2189)(Bool$true)
                                    })();
                                case 'Fm.Error.indirect':
                                    var $2200 = self.name;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($2189)(_fixd$7);
                                case 'Fm.Error.patch':
                                    var $2201 = self.path;
                                    var $2202 = self.term;
                                    return (() => {
                                        var self = $2201;
                                        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                            case 'nil':
                                                return Maybe$none;
                                            case '0':
                                                var $2203 = self.slice(0, -1);
                                                return (() => {
                                                    var _term$13 = Fm$Term$patch_at($2203)(_term$3)((_x$13 => $2202));
                                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$13)(_type$4)(_defs$5)($2189)(Bool$true)
                                                })();
                                            case '1':
                                                var $2204 = self.slice(0, -1);
                                                return (() => {
                                                    var _type$13 = Fm$Term$patch_at($2204)(_type$4)((_x$13 => $2202));
                                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$13)(_defs$5)($2189)(Bool$true)
                                                })();
                                        }
                                    })();
                                case 'Fm.Error.undefined_reference':
                                    var $2205 = self.origin;
                                    var $2206 = self.name;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($2189)(_fixd$7);
                                case 'Fm.Error.cant_infer':
                                    var $2207 = self.origin;
                                    var $2208 = self.term;
                                    var $2209 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($2189)(_fixd$7);
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
                        var $2210 = self.value;
                        return (() => {
                            var self = $2210;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $2211 = self.file;
                                    var $2212 = self.name;
                                    var $2213 = self.term;
                                    var $2214 = self.type;
                                    var $2215 = self.stat;
                                    return (() => {
                                        var _file$9 = $2211;
                                        var _name$10 = $2212;
                                        var _term$11 = $2213;
                                        var _type$12 = $2214;
                                        var _stat$13 = $2215;
                                        return (() => {
                                            var self = _stat$13;
                                            switch (self._) {
                                                case 'Fm.Status.init':
                                                    return (() => {
                                                        var _defs$14 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(Fm$Status$wait))(_defs$2);
                                                        var _checked$15 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$12)(Maybe$some(Fm$Term$xtyp))(_defs$14)(List$nil)(Fm$MPath$1(Fm$MPath$nil)))((_chk_type$15 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$11)(Maybe$some(_type$12))(_defs$14)(List$nil)(Fm$MPath$0(Fm$MPath$nil)))((_chk_term$16 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                        return (() => {
                                                            var self = _checked$15;
                                                            switch (self._) {
                                                                case 'Fm.Check.result':
                                                                    var $2216 = self.value;
                                                                    var $2217 = self.errors;
                                                                    return (() => {
                                                                        var self = List$is_empty($2217);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return (() => {
                                                                                    var _defs$18 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(Fm$Status$done))(_defs$14);
                                                                                    return _defs$18
                                                                                })();
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var _fixed$18 = Fm$Synth$fix(_file$9)(_name$10)(_term$11)(_type$12)(_defs$14)($2217)(Bool$false);
                                                                                    return (() => {
                                                                                        var self = _fixed$18;
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return (() => {
                                                                                                    var _stat$19 = Fm$Status$fail($2217);
                                                                                                    var _defs$20 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(_stat$19))(_defs$14);
                                                                                                    return _defs$20
                                                                                                })();
                                                                                            case 'Maybe.some':
                                                                                                var $2218 = self.value;
                                                                                                return Fm$Synth$one(_name$10)($2218);
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
                                                    var $2219 = self.errors;
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
                    var $2220 = self.file;
                    var $2221 = self.name;
                    var $2222 = self.term;
                    var $2223 = self.type;
                    var $2224 = self.stat;
                    return Fm$Synth$one($2221)(_defs$3);
            }
        })()))));
        return _defs$2
    })());
    var Fm$to_core_all = (_files$1 => Fm$exec(_files$1)((_defs$2 => Fm$Defs$core(Fm$Synth$all(_defs$2)))));
    var Fm$Synth$file = (_file$1 => (_defs$2 => (() => {
        var _defs$3 = (list_for(Map$values(_defs$2))(_defs$2)((_def$3 => (_defs$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2225 = self.file;
                    var $2226 = self.name;
                    var $2227 = self.term;
                    var $2228 = self.type;
                    var $2229 = self.stat;
                    return (() => {
                        var self = ($2225 === _file$1);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Fm$Synth$one($2226)(_defs$4);
                            case 'false':
                                return _defs$4;
                        }
                    })();
            }
        })()))));
        return _defs$3
    })()));
    var Fm$to_core_file = (_files$1 => (_file$2 => Fm$exec(_files$1)((_defs$3 => Fm$Defs$core(Fm$Synth$file(_file$2)(_defs$3))))));
    var Fm$to_core_one = (_files$1 => (_name$2 => Fm$exec(_files$1)((_defs$3 => Fm$Defs$core(Fm$Synth$one(_name$2)(_defs$3))))));
    var Fm$Error$relevant = (_errors$1 => (_got$2 => (() => {
        var self = _errors$1;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $2230 = self.head;
                var $2231 = self.tail;
                return (() => {
                    var _keep$5 = (() => {
                        var self = $2230;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2232 = self.origin;
                                var $2233 = self.expected;
                                var $2234 = self.detected;
                                var $2235 = self.context;
                                return (!_got$2);
                            case 'Fm.Error.show_goal':
                                var $2236 = self.name;
                                var $2237 = self.dref;
                                var $2238 = self.verb;
                                var $2239 = self.goal;
                                var $2240 = self.context;
                                return Bool$true;
                            case 'Fm.Error.waiting':
                                var $2241 = self.name;
                                return Bool$false;
                            case 'Fm.Error.indirect':
                                var $2242 = self.name;
                                return Bool$false;
                            case 'Fm.Error.patch':
                                var $2243 = self.path;
                                var $2244 = self.term;
                                return Bool$false;
                            case 'Fm.Error.undefined_reference':
                                var $2245 = self.origin;
                                var $2246 = self.name;
                                return (!_got$2);
                            case 'Fm.Error.cant_infer':
                                var $2247 = self.origin;
                                var $2248 = self.term;
                                var $2249 = self.context;
                                return (!_got$2);
                        }
                    })();
                    var _got$6 = (() => {
                        var self = $2230;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $2250 = self.origin;
                                var $2251 = self.expected;
                                var $2252 = self.detected;
                                var $2253 = self.context;
                                return Bool$true;
                            case 'Fm.Error.show_goal':
                                var $2254 = self.name;
                                var $2255 = self.dref;
                                var $2256 = self.verb;
                                var $2257 = self.goal;
                                var $2258 = self.context;
                                return _got$2;
                            case 'Fm.Error.waiting':
                                var $2259 = self.name;
                                return _got$2;
                            case 'Fm.Error.indirect':
                                var $2260 = self.name;
                                return _got$2;
                            case 'Fm.Error.patch':
                                var $2261 = self.path;
                                var $2262 = self.term;
                                return _got$2;
                            case 'Fm.Error.undefined_reference':
                                var $2263 = self.origin;
                                var $2264 = self.name;
                                return Bool$true;
                            case 'Fm.Error.cant_infer':
                                var $2265 = self.origin;
                                var $2266 = self.term;
                                var $2267 = self.context;
                                return _got$2;
                        }
                    })();
                    var _tail$7 = Fm$Error$relevant($2231)(_got$6);
                    return (() => {
                        var self = _keep$5;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return List$cons($2230)(_tail$7);
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
                var $2268 = self.value;
                return _f$4($2268);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2269 = self.orig;
                var $2270 = self.name;
                var $2271 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $2272 = self.orig;
                var $2273 = self.name;
                return (() => {
                    var self = ($2273 === "Nat.zero");
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Maybe$some(0n);
                        case 'false':
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.typ':
                var $2274 = self.orig;
                return Maybe$none;
            case 'Fm.Term.all':
                var $2275 = self.orig;
                var $2276 = self.eras;
                var $2277 = self.self;
                var $2278 = self.name;
                var $2279 = self.xtyp;
                var $2280 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $2281 = self.orig;
                var $2282 = self.name;
                var $2283 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $2284 = self.orig;
                var $2285 = self.func;
                var $2286 = self.argm;
                return (() => {
                    var self = $2285;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $2287 = self.orig;
                            var $2288 = self.name;
                            var $2289 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $2290 = self.orig;
                            var $2291 = self.name;
                            return (() => {
                                var self = ($2291 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($2286))((_pred$7 => Monad$pure(Maybe$monad)(Nat$succ(_pred$7))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            var $2292 = self.orig;
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $2293 = self.orig;
                            var $2294 = self.eras;
                            var $2295 = self.self;
                            var $2296 = self.name;
                            var $2297 = self.xtyp;
                            var $2298 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $2299 = self.orig;
                            var $2300 = self.name;
                            var $2301 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $2302 = self.orig;
                            var $2303 = self.func;
                            var $2304 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $2305 = self.orig;
                            var $2306 = self.name;
                            var $2307 = self.expr;
                            var $2308 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $2309 = self.orig;
                            var $2310 = self.name;
                            var $2311 = self.expr;
                            var $2312 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $2313 = self.orig;
                            var $2314 = self.done;
                            var $2315 = self.term;
                            var $2316 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $2317 = self.orig;
                            var $2318 = self.name;
                            var $2319 = self.dref;
                            var $2320 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $2321 = self.orig;
                            var $2322 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $2323 = self.orig;
                            var $2324 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $2325 = self.orig;
                            var $2326 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $2327 = self.orig;
                            var $2328 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $2329 = self.orig;
                            var $2330 = self.path;
                            var $2331 = self.expr;
                            var $2332 = self.name;
                            var $2333 = self.with;
                            var $2334 = self.cses;
                            var $2335 = self.moti;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $2336 = self.orig;
                var $2337 = self.name;
                var $2338 = self.expr;
                var $2339 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $2340 = self.orig;
                var $2341 = self.name;
                var $2342 = self.expr;
                var $2343 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $2344 = self.orig;
                var $2345 = self.done;
                var $2346 = self.term;
                var $2347 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $2348 = self.orig;
                var $2349 = self.name;
                var $2350 = self.dref;
                var $2351 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $2352 = self.orig;
                var $2353 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $2354 = self.orig;
                var $2355 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $2356 = self.orig;
                var $2357 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $2358 = self.orig;
                var $2359 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $2360 = self.orig;
                var $2361 = self.path;
                var $2362 = self.expr;
                var $2363 = self.name;
                var $2364 = self.with;
                var $2365 = self.cses;
                var $2366 = self.moti;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2367 = self.orig;
                var $2368 = self.name;
                var $2369 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $2370 = self.orig;
                var $2371 = self.name;
                return (_name$2 === $2371);
            case 'Fm.Term.typ':
                var $2372 = self.orig;
                return Bool$false;
            case 'Fm.Term.all':
                var $2373 = self.orig;
                var $2374 = self.eras;
                var $2375 = self.self;
                var $2376 = self.name;
                var $2377 = self.xtyp;
                var $2378 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $2379 = self.orig;
                var $2380 = self.name;
                var $2381 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $2382 = self.orig;
                var $2383 = self.func;
                var $2384 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $2385 = self.orig;
                var $2386 = self.name;
                var $2387 = self.expr;
                var $2388 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $2389 = self.orig;
                var $2390 = self.name;
                var $2391 = self.expr;
                var $2392 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $2393 = self.orig;
                var $2394 = self.done;
                var $2395 = self.term;
                var $2396 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $2397 = self.orig;
                var $2398 = self.name;
                var $2399 = self.dref;
                var $2400 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $2401 = self.orig;
                var $2402 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $2403 = self.orig;
                var $2404 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $2405 = self.orig;
                var $2406 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $2407 = self.orig;
                var $2408 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $2409 = self.orig;
                var $2410 = self.path;
                var $2411 = self.expr;
                var $2412 = self.name;
                var $2413 = self.with;
                var $2414 = self.cses;
                var $2415 = self.moti;
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
                        var $2416 = self.orig;
                        var $2417 = self.name;
                        var $2418 = self.indx;
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
                                                        var $2419 = self.charCodeAt(0);
                                                        var $2420 = self.slice(1);
                                                        return ($2419 === 40);
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
                        var $2421 = self.orig;
                        var $2422 = self.name;
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
                                                        var $2423 = self.charCodeAt(0);
                                                        var $2424 = self.slice(1);
                                                        return ($2423 === 40);
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
                        var $2425 = self.orig;
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
                                                        var $2426 = self.charCodeAt(0);
                                                        var $2427 = self.slice(1);
                                                        return ($2426 === 40);
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
                        var $2428 = self.orig;
                        var $2429 = self.eras;
                        var $2430 = self.self;
                        var $2431 = self.name;
                        var $2432 = self.xtyp;
                        var $2433 = self.body;
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
                                                        var $2434 = self.charCodeAt(0);
                                                        var $2435 = self.slice(1);
                                                        return ($2434 === 40);
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
                        var $2436 = self.orig;
                        var $2437 = self.name;
                        var $2438 = self.body;
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
                                                        var $2439 = self.charCodeAt(0);
                                                        var $2440 = self.slice(1);
                                                        return ($2439 === 40);
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
                        var $2441 = self.orig;
                        var $2442 = self.func;
                        var $2443 = self.argm;
                        return (() => {
                            var _argm$7 = Fm$Term$show$go($2443)(Fm$MPath$1(_path$2));
                            return Fm$Term$show$app($2442)(Fm$MPath$0(_path$2))(List$cons(_argm$7)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $2444 = self.orig;
                        var $2445 = self.name;
                        var $2446 = self.expr;
                        var $2447 = self.body;
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
                                                        var $2448 = self.charCodeAt(0);
                                                        var $2449 = self.slice(1);
                                                        return ($2448 === 40);
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
                        var $2450 = self.orig;
                        var $2451 = self.name;
                        var $2452 = self.expr;
                        var $2453 = self.body;
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
                                                        var $2454 = self.charCodeAt(0);
                                                        var $2455 = self.slice(1);
                                                        return ($2454 === 40);
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
                        var $2456 = self.orig;
                        var $2457 = self.done;
                        var $2458 = self.term;
                        var $2459 = self.type;
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
                                                        var $2460 = self.charCodeAt(0);
                                                        var $2461 = self.slice(1);
                                                        return ($2460 === 40);
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
                        var $2462 = self.orig;
                        var $2463 = self.name;
                        var $2464 = self.dref;
                        var $2465 = self.verb;
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
                                                        var $2466 = self.charCodeAt(0);
                                                        var $2467 = self.slice(1);
                                                        return ($2466 === 40);
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
                        var $2468 = self.orig;
                        var $2469 = self.path;
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
                                                        var $2470 = self.charCodeAt(0);
                                                        var $2471 = self.slice(1);
                                                        return ($2470 === 40);
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
                        var $2472 = self.orig;
                        var $2473 = self.natx;
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
                                                        var $2474 = self.charCodeAt(0);
                                                        var $2475 = self.slice(1);
                                                        return ($2474 === 40);
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
                        var $2476 = self.orig;
                        var $2477 = self.chrx;
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
                                                        var $2478 = self.charCodeAt(0);
                                                        var $2479 = self.slice(1);
                                                        return ($2478 === 40);
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
                        var $2480 = self.orig;
                        var $2481 = self.strx;
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
                                                        var $2482 = self.charCodeAt(0);
                                                        var $2483 = self.slice(1);
                                                        return ($2482 === 40);
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
                        var $2484 = self.orig;
                        var $2485 = self.path;
                        var $2486 = self.expr;
                        var $2487 = self.name;
                        var $2488 = self.with;
                        var $2489 = self.cses;
                        var $2490 = self.moti;
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
                                                        var $2491 = self.charCodeAt(0);
                                                        var $2492 = self.slice(1);
                                                        return ($2491 === 40);
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
                var $2493 = self.val;
                var $2494 = self.lft;
                var $2495 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2493;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2496 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($2496))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($2494)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($2495)(Bits$1(_key$3))(_list1$9);
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
                var $2497 = self.slice(0, -1);
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
                            var $2498 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2497)($2498)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $2499 = self.slice(0, -1);
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
                            var $2500 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2499)($2500)(_chunk$7)
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
                var $2501 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($2501)(Bits$nil));
                        case '0':
                            var $2502 = self.slice(0, -1);
                            return Word$0(Word$from_bits($2501)($2502));
                        case '1':
                            var $2503 = self.slice(0, -1);
                            return Word$1(Word$from_bits($2501)($2503));
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
                var $2504 = self.fst;
                var $2505 = self.snd;
                return $2504;
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
                            var $2506 = self.orig;
                            var $2507 = self.name;
                            var $2508 = self.indx;
                            return Fm$Name$show($2507);
                        case 'Fm.Term.ref':
                            var $2509 = self.orig;
                            var $2510 = self.name;
                            return (() => {
                                var _name$5 = Fm$Name$show($2510);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$5;
                                        case 'Maybe.some':
                                            var $2511 = self.value;
                                            return (() => {
                                                var _path_val$7 = (Bits$1(Bits$nil) + Fm$Path$to_bits($2511));
                                                var _path_str$8 = Nat$show(Bits$to_nat(_path_val$7));
                                                return String$flatten(List$cons(_name$5)(List$cons(String$color("2")(("-" + _path_str$8)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            var $2512 = self.orig;
                            return "Type";
                        case 'Fm.Term.all':
                            var $2513 = self.orig;
                            var $2514 = self.eras;
                            var $2515 = self.self;
                            var $2516 = self.name;
                            var $2517 = self.xtyp;
                            var $2518 = self.body;
                            return (() => {
                                var _eras$9 = $2514;
                                var _self$10 = Fm$Name$show($2515);
                                var _name$11 = Fm$Name$show($2516);
                                var _type$12 = Fm$Term$show$go($2517)(Fm$MPath$0(_path$2));
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
                                var _body$15 = Fm$Term$show$go($2518(Fm$Term$xvar($2515)(0n))(Fm$Term$xvar($2516)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$10)(List$cons(_open$13)(List$cons(_name$11)(List$cons(":")(List$cons(_type$12)(List$cons(_clos$14)(List$cons(" ")(List$cons(_body$15)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $2519 = self.orig;
                            var $2520 = self.name;
                            var $2521 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2520);
                                var _body$7 = Fm$Term$show$go($2521(Fm$Term$xvar($2520)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$6)(List$cons(") ")(List$cons(_body$7)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $2522 = self.orig;
                            var $2523 = self.func;
                            var $2524 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $2525 = self.orig;
                            var $2526 = self.name;
                            var $2527 = self.expr;
                            var $2528 = self.body;
                            return (() => {
                                var _name$7 = Fm$Name$show($2526);
                                var _expr$8 = Fm$Term$show$go($2527)(Fm$MPath$0(_path$2));
                                var _body$9 = Fm$Term$show$go($2528(Fm$Term$xvar($2526)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$7)(List$cons(" = ")(List$cons(_expr$8)(List$cons("; ")(List$cons(_body$9)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $2529 = self.orig;
                            var $2530 = self.name;
                            var $2531 = self.expr;
                            var $2532 = self.body;
                            return (() => {
                                var _name$7 = Fm$Name$show($2530);
                                var _expr$8 = Fm$Term$show$go($2531)(Fm$MPath$0(_path$2));
                                var _body$9 = Fm$Term$show$go($2532(Fm$Term$xvar($2530)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$7)(List$cons(" = ")(List$cons(_expr$8)(List$cons("; ")(List$cons(_body$9)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $2533 = self.orig;
                            var $2534 = self.done;
                            var $2535 = self.term;
                            var $2536 = self.type;
                            return (() => {
                                var _term$7 = Fm$Term$show$go($2535)(Fm$MPath$0(_path$2));
                                var _type$8 = Fm$Term$show$go($2536)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$7)(List$cons("::")(List$cons(_type$8)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $2537 = self.orig;
                            var $2538 = self.name;
                            var $2539 = self.dref;
                            var $2540 = self.verb;
                            return (() => {
                                var _name$7 = Fm$Name$show($2538);
                                return String$flatten(List$cons("?")(List$cons(_name$7)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $2541 = self.orig;
                            var $2542 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $2543 = self.orig;
                            var $2544 = self.natx;
                            return String$flatten(List$cons(Nat$show($2544))(List$nil));
                        case 'Fm.Term.chr':
                            var $2545 = self.orig;
                            var $2546 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2546))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $2547 = self.orig;
                            var $2548 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($2548))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $2549 = self.orig;
                            var $2550 = self.path;
                            var $2551 = self.expr;
                            var $2552 = self.name;
                            var $2553 = self.with;
                            var $2554 = self.cses;
                            var $2555 = self.moti;
                            return (() => {
                                var _expr$10 = Fm$Term$show$go($2551)(Fm$MPath$0(_path$2));
                                var _name$11 = Fm$Name$show($2552);
                                var _with$12 = String$join("")(List$mapped($2553)((_def$12 => (() => {
                                    var self = _def$12;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2556 = self.file;
                                            var $2557 = self.name;
                                            var $2558 = self.term;
                                            var $2559 = self.type;
                                            var $2560 = self.stat;
                                            return (() => {
                                                var _name$18 = Fm$Name$show($2557);
                                                var _type$19 = Fm$Term$show$go($2559)(Maybe$none);
                                                var _term$20 = Fm$Term$show$go($2558)(Maybe$none);
                                                return String$flatten(List$cons(_name$18)(List$cons(": ")(List$cons(_type$19)(List$cons(" = ")(List$cons(_term$20)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$13 = Map$to_list($2554);
                                var _cses$14 = String$join("")(List$mapped(_cses$13)((_x$14 => (() => {
                                    var _name$15 = Fm$Name$from_bits(Pair$fst(_x$14));
                                    var _term$16 = Fm$Term$show$go(Pair$snd(_x$14))(Maybe$none);
                                    return String$flatten(List$cons(_name$15)(List$cons(": ")(List$cons(_term$16)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$15 = Fm$Term$show$go($2555)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$10)(List$cons(" as ")(List$cons(_name$11)(List$cons(_with$12)(List$cons(" { ")(List$cons(_cses$14)(List$cons("} : ")(List$cons(_moti$15)(List$nil))))))))))
                            })();
                    }
                })();
            case 'Maybe.some':
                var $2561 = self.value;
                return $2561;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $2562 = self.head;
                var $2563 = self.tail;
                return (() => {
                    var self = $2562;
                    switch (self._) {
                        case 'Pair.new':
                            var $2564 = self.fst;
                            var $2565 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($2564);
                                var _type$7 = Fm$Term$show($2565);
                                var _rest$8 = Fm$Context$show($2563);
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
                var $2566 = self.orig;
                var $2567 = self.name;
                var $2568 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $2569 = self.orig;
                var $2570 = self.name;
                return (() => {
                    var self = Fm$get($2570)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($2569)($2570);
                        case 'Maybe.some':
                            var $2571 = self.value;
                            return (() => {
                                var self = $2571;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $2572 = self.file;
                                        var $2573 = self.name;
                                        var $2574 = self.term;
                                        var $2575 = self.type;
                                        var $2576 = self.stat;
                                        return $2574;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                var $2577 = self.orig;
                return _term$4;
            case 'Fm.Term.all':
                var $2578 = self.orig;
                var $2579 = self.eras;
                var $2580 = self.self;
                var $2581 = self.name;
                var $2582 = self.xtyp;
                var $2583 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $2584 = self.orig;
                var $2585 = self.name;
                var $2586 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $2587 = self.orig;
                var $2588 = self.func;
                var $2589 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $2590 = self.orig;
                var $2591 = self.name;
                var $2592 = self.expr;
                var $2593 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $2594 = self.orig;
                var $2595 = self.name;
                var $2596 = self.expr;
                var $2597 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $2598 = self.orig;
                var $2599 = self.done;
                var $2600 = self.term;
                var $2601 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $2602 = self.orig;
                var $2603 = self.name;
                var $2604 = self.dref;
                var $2605 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $2606 = self.orig;
                var $2607 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $2608 = self.orig;
                var $2609 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $2610 = self.orig;
                var $2611 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $2612 = self.orig;
                var $2613 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $2614 = self.orig;
                var $2615 = self.path;
                var $2616 = self.expr;
                var $2617 = self.name;
                var $2618 = self.with;
                var $2619 = self.cses;
                var $2620 = self.moti;
                return _term$4;
        }
    })())))));
    var Bool$or = a0 => a1 => (a0 || a1);
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2621 = self.orig;
                var $2622 = self.name;
                var $2623 = self.indx;
                return Fm$Term$var($2621)($2622)($2623);
            case 'Fm.Term.ref':
                var $2624 = self.orig;
                var $2625 = self.name;
                return (() => {
                    var _expand$6 = Bool$false;
                    var _expand$7 = ((($2625 === "Nat.succ") && (_arity$3 > 1n)) || _expand$6);
                    var _expand$8 = ((($2625 === "Nat.zero") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($2625 === "Bool.true") && (_arity$3 > 0n)) || _expand$8);
                    var _expand$10 = ((($2625 === "Bool.false") && (_arity$3 > 0n)) || _expand$9);
                    return (() => {
                        var self = _expand$10;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($2625)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($2624)($2625);
                                        case 'Maybe.some':
                                            var $2626 = self.value;
                                            return (() => {
                                                var self = $2626;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $2627 = self.file;
                                                        var $2628 = self.name;
                                                        var $2629 = self.term;
                                                        var $2630 = self.type;
                                                        var $2631 = self.stat;
                                                        return $2629;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($2624)($2625);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                var $2632 = self.orig;
                return Fm$Term$typ($2632);
            case 'Fm.Term.all':
                var $2633 = self.orig;
                var $2634 = self.eras;
                var $2635 = self.self;
                var $2636 = self.name;
                var $2637 = self.xtyp;
                var $2638 = self.body;
                return Fm$Term$all($2633)($2634)($2635)($2636)(Fm$Term$expand_ct($2637)(_defs$2)(0n))((_s$10 => (_x$11 => Fm$Term$expand_ct($2638(_s$10)(_x$11))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $2639 = self.orig;
                var $2640 = self.name;
                var $2641 = self.body;
                return Fm$Term$lam($2639)($2640)((_x$7 => Fm$Term$expand_ct($2641(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $2642 = self.orig;
                var $2643 = self.func;
                var $2644 = self.argm;
                return Fm$Term$app($2642)(Fm$Term$expand_ct($2643)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($2644)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $2645 = self.orig;
                var $2646 = self.name;
                var $2647 = self.expr;
                var $2648 = self.body;
                return Fm$Term$let($2645)($2646)(Fm$Term$expand_ct($2647)(_defs$2)(0n))((_x$8 => Fm$Term$expand_ct($2648(_x$8))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $2649 = self.orig;
                var $2650 = self.name;
                var $2651 = self.expr;
                var $2652 = self.body;
                return Fm$Term$def($2649)($2650)(Fm$Term$expand_ct($2651)(_defs$2)(0n))((_x$8 => Fm$Term$expand_ct($2652(_x$8))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $2653 = self.orig;
                var $2654 = self.done;
                var $2655 = self.term;
                var $2656 = self.type;
                return Fm$Term$ann($2653)($2654)(Fm$Term$expand_ct($2655)(_defs$2)(0n))(Fm$Term$expand_ct($2656)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $2657 = self.orig;
                var $2658 = self.name;
                var $2659 = self.dref;
                var $2660 = self.verb;
                return Fm$Term$gol($2657)($2658)($2659)($2660);
            case 'Fm.Term.hol':
                var $2661 = self.orig;
                var $2662 = self.path;
                return Fm$Term$hol($2661)($2662);
            case 'Fm.Term.nat':
                var $2663 = self.orig;
                var $2664 = self.natx;
                return Fm$Term$nat($2663)($2664);
            case 'Fm.Term.chr':
                var $2665 = self.orig;
                var $2666 = self.chrx;
                return Fm$Term$chr($2665)($2666);
            case 'Fm.Term.str':
                var $2667 = self.orig;
                var $2668 = self.strx;
                return Fm$Term$str($2667)($2668);
            case 'Fm.Term.cse':
                var $2669 = self.orig;
                var $2670 = self.path;
                var $2671 = self.expr;
                var $2672 = self.name;
                var $2673 = self.with;
                var $2674 = self.cses;
                var $2675 = self.moti;
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
                var $2676 = self.origin;
                var $2677 = self.expected;
                var $2678 = self.detected;
                var $2679 = self.context;
                return (() => {
                    var _expected$7 = (() => {
                        var self = $2677;
                        switch (self._) {
                            case 'Either.left':
                                var $2680 = self.value;
                                return $2680;
                            case 'Either.right':
                                var $2681 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2681)(Map$new));
                        }
                    })();
                    var _detected$8 = (() => {
                        var self = $2678;
                        switch (self._) {
                            case 'Either.left':
                                var $2682 = self.value;
                                return $2682;
                            case 'Either.right':
                                var $2683 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2683)(Map$new));
                        }
                    })();
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$7)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$8)(List$cons("\u{a}")(List$cons((() => {
                        var self = $2679;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2684 = self.head;
                                var $2685 = self.tail;
                                return String$flatten(List$cons("With context:\u{a}")(List$cons(Fm$Context$show($2679))(List$nil)));
                        }
                    })())(List$nil)))))))))
                })();
            case 'Fm.Error.show_goal':
                var $2686 = self.name;
                var $2687 = self.dref;
                var $2688 = self.verb;
                var $2689 = self.goal;
                var $2690 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($2686))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $2689;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $2691 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($2687)($2691)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $2688;
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
                        var self = $2690;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2692 = self.head;
                                var $2693 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($2690))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $2694 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($2694)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $2695 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($2695)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $2696 = self.path;
                var $2697 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($2697))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2698 = self.origin;
                var $2699 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2699))(List$cons("\u{a}")(List$nil))));
            case 'Fm.Error.cant_infer':
                var $2700 = self.origin;
                var $2701 = self.term;
                var $2702 = self.context;
                return (() => {
                    var _term$6 = Fm$Term$show($2701);
                    var _context$7 = Fm$Context$show($2702);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$6)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$7)(List$nil))))))
                })();
        }
    })()));
    var Fm$Error$origin = (_error$1 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2703 = self.origin;
                var $2704 = self.expected;
                var $2705 = self.detected;
                var $2706 = self.context;
                return $2703;
            case 'Fm.Error.show_goal':
                var $2707 = self.name;
                var $2708 = self.dref;
                var $2709 = self.verb;
                var $2710 = self.goal;
                var $2711 = self.context;
                return Maybe$none;
            case 'Fm.Error.waiting':
                var $2712 = self.name;
                return Maybe$none;
            case 'Fm.Error.indirect':
                var $2713 = self.name;
                return Maybe$none;
            case 'Fm.Error.patch':
                var $2714 = self.path;
                var $2715 = self.term;
                return Maybe$none;
            case 'Fm.Error.undefined_reference':
                var $2716 = self.origin;
                var $2717 = self.name;
                return $2716;
            case 'Fm.Error.cant_infer':
                var $2718 = self.origin;
                var $2719 = self.term;
                var $2720 = self.context;
                return $2718;
        }
    })());
    var Fm$Defs$report$get_file_code = _file$1 => _files$2 => {
        var Fm$Defs$report$get_file_code = _file$1 => _files$2 => ({
            ctr: 'TCO',
            arg: [_file$1, _files$2]
        });
        var arg = [_file$1, _files$2];
        while (true) {
            let [_file$1, _files$2] = arg;
            var R = (() => {
                var self = _files$2;
                switch (self._) {
                    case 'List.nil':
                        return "";
                    case 'List.cons':
                        var $2721 = self.head;
                        var $2722 = self.tail;
                        return (() => {
                            var self = $2721;
                            switch (self._) {
                                case 'Fm.File.new':
                                    var $2723 = self.name;
                                    var $2724 = self.code;
                                    return (() => {
                                        var self = ($2723 === _file$1);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return $2724;
                                            case 'false':
                                                return Fm$Defs$report$get_file_code(_file$1)($2722);
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
    var Fm$Defs$report = (_files$1 => (_defs$2 => (() => {
        var _errors$3 = "";
        var _errors$4 = (list_for(Map$values(_defs$2))(_errors$3)((_def$4 => (_errors$5 => (() => {
            var self = _def$4;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2725 = self.file;
                    var $2726 = self.name;
                    var $2727 = self.term;
                    var $2728 = self.type;
                    var $2729 = self.stat;
                    return (() => {
                        var self = $2729;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _errors$5;
                            case 'Fm.Status.wait':
                                return _errors$5;
                            case 'Fm.Status.done':
                                return _errors$5;
                            case 'Fm.Status.fail':
                                var $2730 = self.errors;
                                return (() => {
                                    var self = $2730;
                                    switch (self._) {
                                        case 'List.nil':
                                            return _errors$5;
                                        case 'List.cons':
                                            var $2731 = self.head;
                                            var $2732 = self.tail;
                                            return (() => {
                                                var _name_str$14 = Fm$Name$show($2726);
                                                var _relevant_errors$15 = Fm$Error$relevant($2730)(Bool$false);
                                                var _errors$16 = (list_for(_relevant_errors$15)(_errors$5)((_error$16 => (_errors$17 => String$flatten(List$cons(_errors$17)(List$cons("On ")(List$cons(_name_str$14)(List$cons(":\u{a}")(List$cons(Fm$Error$show(_error$16)(_defs$2))(List$cons((() => {
                                                    var self = Fm$Error$origin(_error$16);
                                                    switch (self._) {
                                                        case 'Maybe.none':
                                                            return "";
                                                        case 'Maybe.some':
                                                            var $2733 = self.value;
                                                            return (() => {
                                                                var self = $2733;
                                                                switch (self._) {
                                                                    case 'Fm.Origin.new':
                                                                        var $2734 = self.file;
                                                                        var $2735 = self.from;
                                                                        var $2736 = self.upto;
                                                                        return (() => {
                                                                            var _code$22 = Fm$Defs$report$get_file_code($2725)(_files$1);
                                                                            var _code$23 = Fm$highlight(_code$22)($2735)($2736);
                                                                            return String$flatten(List$cons("On code:\u{a}")(List$cons(_code$23)(List$cons("\u{a}")(List$nil))))
                                                                        })();
                                                                }
                                                            })();
                                                    }
                                                })())(List$cons("\u{a}")(List$nil))))))))))));
                                                return _errors$16
                                            })();
                                    }
                                })();
                        }
                    })();
            }
        })()))));
        var _types$5 = "";
        var _types$6 = (list_for(Map$values(_defs$2))(_types$5)((_def$6 => (_types$7 => (() => {
            var self = _def$6;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2737 = self.file;
                    var $2738 = self.name;
                    var $2739 = self.term;
                    var $2740 = self.type;
                    var $2741 = self.stat;
                    return (() => {
                        var self = $2741;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _types$7;
                            case 'Fm.Status.wait':
                                return _types$7;
                            case 'Fm.Status.done':
                                return String$flatten(List$cons(_types$7)(List$cons($2738)(List$cons(": ")(List$cons(Fm$Term$show($2740))(List$cons("\u{a}")(List$nil))))));
                            case 'Fm.Status.fail':
                                var $2742 = self.errors;
                                return _types$7;
                        }
                    })();
            }
        })()))));
        return (() => {
            var self = _errors$4;
            switch (self.length === 0 ? 'nil' : 'cons') {
                case 'nil':
                    return String$flatten(List$cons(_types$6)(List$cons("\u{a}All terms check.")(List$nil)));
                case 'cons':
                    var $2743 = self.charCodeAt(0);
                    var $2744 = self.slice(1);
                    return _errors$4;
            }
        })()
    })()));
    var Fm$check_all = (_files$1 => Fm$exec(_files$1)((_defs$2 => Fm$Defs$report(_files$1)(Fm$Synth$all(_defs$2)))));
    var Fm$check_file = (_files$1 => (_file$2 => Fm$exec(_files$1)((_defs$3 => Fm$Defs$report(_files$1)(Fm$Synth$file(_file$2)(_defs$3))))));
    var Fm$check_one = (_files$1 => (_name$2 => Fm$exec(_files$1)((_defs$3 => Fm$Defs$report(_files$1)(Fm$Synth$one(_name$2)(_defs$3))))));
    var Fm$exports = (() => {
        var __$1 = Fm$to_core_all;
        var __$2 = Fm$to_core_file;
        var __$3 = Fm$to_core_one;
        var __$4 = Fm$check_all;
        var __$5 = Fm$check_file;
        var __$6 = Fm$check_one;
        return Unit$new
    })();
    return {
        'Pair.new': Pair$new,
        'Map': Map,
        'Map.new': Map$new,
        'List.for': List$for,
        'Pair': Pair,
        'Monad.bind': Monad$bind,
        'Parser': Parser,
        'Monad.new': Monad$new,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser.bind': Parser$bind,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.pure': Parser$pure,
        'Parser.monad': Parser$monad,
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
        'Fm.Parser.text': Fm$Parser$text,
        'Parser.many1': Parser$many1,
        'Bool.and': Bool$and,
        'Cmp.as_lte': Cmp$as_lte,
        'Word.lte': Word$lte,
        'U16.lte': U16$lte,
        'U16.btw': U16$btw,
        'Fm.Name.is_letter': Fm$Name$is_letter,
        'Fm.Parser.letter': Fm$Parser$letter,
        'List.fold': List$fold,
        'Fm.Parser.name1': Fm$Parser$name1,
        'Fm.Parser.name': Fm$Parser$name,
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
        'Fm.Synth.file': Fm$Synth$file,
        'Fm.to_core_file': Fm$to_core_file,
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
        'Bool.or': Bool$or,
        'Fm.Term.expand_ct': Fm$Term$expand_ct,
        'Fm.Term.expand': Fm$Term$expand,
        'Fm.Error.show': Fm$Error$show,
        'Fm.Error.origin': Fm$Error$origin,
        'Fm.Defs.report.get_file_code': Fm$Defs$report$get_file_code,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.check_all': Fm$check_all,
        'Fm.check_file': Fm$check_file,
        'Fm.check_one': Fm$check_one,
        'Fm.exports': Fm$exports,
    };
})();