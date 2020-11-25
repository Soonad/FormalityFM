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
                    var $89 = self.eras;
                    var $90 = self.name;
                    var $91 = self.term;
                    return Fm$Term$all($89)("")($90)($91)((_s$11 => (_x$12 => _t$7)));
            }
        })())));
        return Monad$bind(Parser$monad)(Fm$Parser$stop(_init$1))((_orig$7 => Monad$pure(Parser$monad)((() => {
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
                    return Fm$Term$ori(_orig$7)(Fm$Term$all($95)(_self$2)($97)($98)($99));
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
                case 'Fm.Term.ori':
                    var $126 = self.orig;
                    var $127 = self.expr;
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
                var $128 = self.head;
                var $129 = self.tail;
                return Fm$Term$lam($128)((_x$5 => Fm$Parser$make_lambda($129)(_body$2)));
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
    var Bits$nil = '';
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
                var $130 = self.head;
                var $131 = self.tail;
                return List$cons(_f$4($130))(List$mapped($131)(_f$4));
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
                        var $132 = (self - 1n);
                        return Nat$apply($132)(_f$3)(_f$3(_x$4));
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
                var $133 = self.pred;
                return Word$1($133);
            case 'Word.1':
                var $134 = self.pred;
                return Word$0(Word$inc($134));
        }
    })());
    var U16$inc = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $135 = u16_to_word(self);
                return U16$new(Word$inc($135));
        }
    })());
    var Word$zero = (_size$1 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $136 = (self - 1n);
                return Word$0(Word$zero($136));
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
                var $137 = self.fst;
                var $138 = self.snd;
                return Monad$bind(Parser$monad)(Parser$text($137))((_$4 => Monad$pure(Parser$monad)($138)));
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
                                    var $139 = self.val;
                                    var $140 = self.lft;
                                    var $141 = self.rgt;
                                    return $139;
                            }
                        })();
                    case '0':
                        var $142 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $143 = self.val;
                                    var $144 = self.lft;
                                    var $145 = self.rgt;
                                    return Map$get($142)($144);
                            }
                        })();
                    case '1':
                        var $146 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $147 = self.val;
                                    var $148 = self.lft;
                                    var $149 = self.rgt;
                                    return Map$get($146)($149);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Word$subber = (_a$2 => (_b$3 => (_c$4 => (() => {
        var self = _a$2;
        switch (self._) {
            case 'Word.nil':
                return (_b$5 => Word$nil);
            case 'Word.0':
                var $150 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $151 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($151)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($151)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $152 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($152)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($152)(Bool$true));
                                }
                            })());
                    }
                })()($150));
            case 'Word.1':
                var $153 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $154 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($154)(Bool$false));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($154)(Bool$false));
                                }
                            })());
                        case 'Word.1':
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
                    }
                })()($153));
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
                var $156 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $157 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($157)(Bool$false));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($157)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $158 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($158)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($158)(Bool$false));
                                }
                            })());
                    }
                })()($156));
            case 'Word.1':
                var $159 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $160 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($160)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($160)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $161 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($161)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($161)(Bool$true));
                                }
                            })());
                    }
                })()($159));
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
                var $162 = self.pred;
                return Bits$0(Word$to_bits($162));
            case 'Word.1':
                var $163 = self.pred;
                return Bits$1(Word$to_bits($163));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $164 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.nil':
                            return Word$0(Word$trim($164)(Word$nil));
                        case 'Word.0':
                            var $165 = self.pred;
                            return Word$0(Word$trim($164)($165));
                        case 'Word.1':
                            var $166 = self.pred;
                            return Word$1(Word$trim($164)($166));
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
                        var $167 = self.slice(0, -1);
                        return Bits$reverse$tco($167)(Bits$0(_r$2));
                    case '1':
                        var $168 = self.slice(0, -1);
                        return Bits$reverse$tco($168)(Bits$1(_r$2));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Bits$reverse = (_a$1 => Bits$reverse$tco(_a$1)(Bits$nil));
    var Fm$Name$to_bits = a0 => (fm_name_to_bits(a0));
    var Fm$get = (_name$2 => (_map$3 => Map$get((fm_name_to_bits(_name$2)))(_map$3)));
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
                var $169 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$ref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$nat($169);
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
                var $170 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($170));
            case '1':
                var $171 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($171));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $172 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$ref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$app(_term$3)(Fm$Term$nat(16n));
                    var _term$5 = Fm$Term$app(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($172)));
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
                var $173 = self.charCodeAt(0);
                var $174 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$chr($173);
                    var _term$5 = Fm$Term$ref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$app(_term$5)(_char$4);
                    var _term$7 = Fm$Term$app(_term$6)(Fm$Term$str($174));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $175 = self.name;
                var $176 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $177 = self.name;
                return (() => {
                    var self = Fm$get($177)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($177);
                        case 'Maybe.some':
                            var $178 = self.value;
                            return (() => {
                                var self = $178;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $179 = self.file;
                                        var $180 = self.name;
                                        var $181 = self.term;
                                        var $182 = self.type;
                                        var $183 = self.stat;
                                        return Fm$Term$reduce($181)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$1;
            case 'Fm.Term.all':
                var $184 = self.eras;
                var $185 = self.self;
                var $186 = self.name;
                var $187 = self.xtyp;
                var $188 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $189 = self.name;
                var $190 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $191 = self.func;
                var $192 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$reduce($191)(_defs$2);
                    return (() => {
                        var self = _func$5;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $193 = self.name;
                                var $194 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $195 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                return _term$1;
                            case 'Fm.Term.all':
                                var $196 = self.eras;
                                var $197 = self.self;
                                var $198 = self.name;
                                var $199 = self.xtyp;
                                var $200 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $201 = self.name;
                                var $202 = self.body;
                                return Fm$Term$reduce($202($192))(_defs$2);
                            case 'Fm.Term.app':
                                var $203 = self.func;
                                var $204 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $205 = self.name;
                                var $206 = self.expr;
                                var $207 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $208 = self.name;
                                var $209 = self.expr;
                                var $210 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $211 = self.done;
                                var $212 = self.term;
                                var $213 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $214 = self.name;
                                var $215 = self.dref;
                                var $216 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $217 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $218 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $219 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $220 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $221 = self.path;
                                var $222 = self.expr;
                                var $223 = self.name;
                                var $224 = self.with;
                                var $225 = self.cses;
                                var $226 = self.moti;
                                return _term$1;
                            case 'Fm.Term.ori':
                                var $227 = self.orig;
                                var $228 = self.expr;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $229 = self.name;
                var $230 = self.expr;
                var $231 = self.body;
                return Fm$Term$reduce($231($230))(_defs$2);
            case 'Fm.Term.def':
                var $232 = self.name;
                var $233 = self.expr;
                var $234 = self.body;
                return Fm$Term$reduce($234($233))(_defs$2);
            case 'Fm.Term.ann':
                var $235 = self.done;
                var $236 = self.term;
                var $237 = self.type;
                return Fm$Term$reduce($236)(_defs$2);
            case 'Fm.Term.gol':
                var $238 = self.name;
                var $239 = self.dref;
                var $240 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $241 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $242 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($242))(_defs$2);
            case 'Fm.Term.chr':
                var $243 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($243))(_defs$2);
            case 'Fm.Term.str':
                var $244 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($244))(_defs$2);
            case 'Fm.Term.cse':
                var $245 = self.path;
                var $246 = self.expr;
                var $247 = self.name;
                var $248 = self.with;
                var $249 = self.cses;
                var $250 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $251 = self.orig;
                var $252 = self.expr;
                return Fm$Term$reduce($252)(_defs$2);
        }
    })()));
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
                            var $253 = self.val;
                            var $254 = self.lft;
                            var $255 = self.rgt;
                            return Map$tie(Maybe$some(_val$3))($254)($255);
                    }
                })();
            case '0':
                var $256 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$set($256)(_val$3)(Map$new))(Map$new);
                        case 'Map.tie':
                            var $257 = self.val;
                            var $258 = self.lft;
                            var $259 = self.rgt;
                            return Map$tie($257)(Map$set($256)(_val$3)($258))($259);
                    }
                })();
            case '1':
                var $260 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$new)(Map$set($260)(_val$3)(Map$new));
                        case 'Map.tie':
                            var $261 = self.val;
                            var $262 = self.lft;
                            var $263 = self.rgt;
                            return Map$tie($261)($262)(Map$set($260)(_val$3)($263));
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
                var $264 = self.head;
                var $265 = self.tail;
                return (() => {
                    var self = $264;
                    switch (self._) {
                        case 'Pair.new':
                            var $266 = self.fst;
                            var $267 = self.snd;
                            return Map$set(_f$3($266))($267)(Map$from_list(_f$3)($265));
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
                                var $268 = self.name;
                                var $269 = self.indx;
                                return $268;
                            case 'Fm.Term.ref':
                                var $270 = self.name;
                                return $270;
                            case 'Fm.Term.typ':
                                return Fm$Name$read("self");
                            case 'Fm.Term.all':
                                var $271 = self.eras;
                                var $272 = self.self;
                                var $273 = self.name;
                                var $274 = self.xtyp;
                                var $275 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.lam':
                                var $276 = self.name;
                                var $277 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.app':
                                var $278 = self.func;
                                var $279 = self.argm;
                                return Fm$Name$read("self");
                            case 'Fm.Term.let':
                                var $280 = self.name;
                                var $281 = self.expr;
                                var $282 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.def':
                                var $283 = self.name;
                                var $284 = self.expr;
                                var $285 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ann':
                                var $286 = self.done;
                                var $287 = self.term;
                                var $288 = self.type;
                                return Fm$Name$read("self");
                            case 'Fm.Term.gol':
                                var $289 = self.name;
                                var $290 = self.dref;
                                var $291 = self.verb;
                                return Fm$Name$read("self");
                            case 'Fm.Term.hol':
                                var $292 = self.path;
                                return Fm$Name$read("self");
                            case 'Fm.Term.nat':
                                var $293 = self.natx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.chr':
                                var $294 = self.chrx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.str':
                                var $295 = self.strx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.cse':
                                var $296 = self.path;
                                var $297 = self.expr;
                                var $298 = self.name;
                                var $299 = self.with;
                                var $300 = self.cses;
                                var $301 = self.moti;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ori':
                                var $302 = self.orig;
                                var $303 = self.expr;
                                return Fm$Name$read("self");
                        }
                    })();
                case 'Maybe.some':
                    var $304 = self.value;
                    return $304;
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
                            var $305 = self.value;
                            return $305;
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
                var $306 = self.charCodeAt(0);
                var $307 = self.slice(1);
                return (() => {
                    var _sidx$5 = Nat$succ(_idx$1);
                    return (() => {
                        var self = ($306 === 48);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Parser$Reply$value(_sidx$5)($307)(0n);
                            case 'false':
                                return (() => {
                                    var self = ($306 === 49);
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return Parser$Reply$value(_sidx$5)($307)(1n);
                                        case 'false':
                                            return (() => {
                                                var self = ($306 === 50);
                                                switch (self ? 'true' : 'false') {
                                                    case 'true':
                                                        return Parser$Reply$value(_sidx$5)($307)(2n);
                                                    case 'false':
                                                        return (() => {
                                                            var self = ($306 === 51);
                                                            switch (self ? 'true' : 'false') {
                                                                case 'true':
                                                                    return Parser$Reply$value(_sidx$5)($307)(3n);
                                                                case 'false':
                                                                    return (() => {
                                                                        var self = ($306 === 52);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return Parser$Reply$value(_sidx$5)($307)(4n);
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var self = ($306 === 53);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Parser$Reply$value(_sidx$5)($307)(5n);
                                                                                        case 'false':
                                                                                            return (() => {
                                                                                                var self = ($306 === 54);
                                                                                                switch (self ? 'true' : 'false') {
                                                                                                    case 'true':
                                                                                                        return Parser$Reply$value(_sidx$5)($307)(6n);
                                                                                                    case 'false':
                                                                                                        return (() => {
                                                                                                            var self = ($306 === 55);
                                                                                                            switch (self ? 'true' : 'false') {
                                                                                                                case 'true':
                                                                                                                    return Parser$Reply$value(_sidx$5)($307)(7n);
                                                                                                                case 'false':
                                                                                                                    return (() => {
                                                                                                                        var self = ($306 === 56);
                                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                                            case 'true':
                                                                                                                                return Parser$Reply$value(_sidx$5)($307)(8n);
                                                                                                                            case 'false':
                                                                                                                                return (() => {
                                                                                                                                    var self = ($306 === 57);
                                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                                        case 'true':
                                                                                                                                            return Parser$Reply$value(_sidx$5)($307)(9n);
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
                        var $308 = self.head;
                        var $309 = self.tail;
                        return Nat$from_base$go(_b$1)($309)((_b$1 * _p$3))((($308 * _p$3) + _res$4));
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
                        var $310 = self.head;
                        var $311 = self.tail;
                        return List$reverse$go($311)(List$cons($310)(_res$3));
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
                var $312 = self.slice(0, -1);
                return $312;
            case '1':
                var $313 = self.slice(0, -1);
                return $313;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$1(Bits$nil);
            case '0':
                var $314 = self.slice(0, -1);
                return Bits$1($314);
            case '1':
                var $315 = self.slice(0, -1);
                return Bits$0(Bits$inc($315));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $316 = self.value;
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
                            var $317 = self.idx;
                            var $318 = self.code;
                            var $319 = self.err;
                            return Parser$Reply$value(_idx$3)(_code$4)(_term$2);
                        case 'Parser.Reply.value':
                            var $320 = self.idx;
                            var $321 = self.code;
                            var $322 = self.val;
                            return Fm$Parser$suffix(_init$1)($322)($320)($321);
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
                var $323 = self.fst;
                var $324 = self.snd;
                return Fm$Binder$new(_eras$1)($323)($324);
        }
    })()))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $325 = self.head;
                var $326 = self.tail;
                return List$cons($325)(List$concat($326)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $327 = self.head;
                var $328 = self.tail;
                return List$concat($327)(List$flatten($328));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $329 = self.head;
                var $330 = self.tail;
                return (() => {
                    var self = $329;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $331 = self.eras;
                            var $332 = self.name;
                            var $333 = self.term;
                            return Fm$Term$all($331)("")($332)($333)((_s$8 => (_x$9 => Fm$Parser$make_forall($330)(_body$2))));
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
                        var $334 = self.head;
                        var $335 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($334);
                                case 'succ':
                                    var $336 = (self - 1n);
                                    return List$at($336)($335);
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
                var $337 = self.fst;
                var $338 = self.snd;
                return $338;
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
                        var $339 = self.head;
                        var $340 = self.tail;
                        return (() => {
                            var self = $339;
                            switch (self._) {
                                case 'Pair.new':
                                    var $341 = self.fst;
                                    var $342 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($341);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($342);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($340);
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
                        var $343 = self.head;
                        var $344 = self.tail;
                        return List$length$go($344)(Nat$succ(_n$3));
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
                var $345 = self.name;
                var $346 = self.indx;
                return (() => {
                    var self = List$at_last($346)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($345)($346);
                        case 'Maybe.some':
                            var $347 = self.value;
                            return Pair$snd($347);
                    }
                })();
            case 'Fm.Term.ref':
                var $348 = self.name;
                return (() => {
                    var self = Fm$Context$find($348)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($348);
                        case 'Maybe.some':
                            var $349 = self.value;
                            return $349;
                    }
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $350 = self.eras;
                var $351 = self.self;
                var $352 = self.name;
                var $353 = self.xtyp;
                var $354 = self.body;
                return (() => {
                    var _vlen$9 = List$length(_vars$1);
                    return Fm$Term$all($350)($351)($352)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($353))((_s$10 => (_x$11 => Fm$Term$bind(List$cons(Pair$new($352)(_x$11))(List$cons(Pair$new($351)(_s$10))(_vars$1)))(Fm$Path$1(_path$2))($354(Fm$Term$var($351)(_vlen$9))(Fm$Term$var($352)(Nat$succ(_vlen$9)))))))
                })();
            case 'Fm.Term.lam':
                var $355 = self.name;
                var $356 = self.body;
                return (() => {
                    var _vlen$6 = List$length(_vars$1);
                    return Fm$Term$lam($355)((_x$7 => Fm$Term$bind(List$cons(Pair$new($355)(_x$7))(_vars$1))(Fm$Path$0(_path$2))($356(Fm$Term$var($355)(_vlen$6)))))
                })();
            case 'Fm.Term.app':
                var $357 = self.func;
                var $358 = self.argm;
                return Fm$Term$app(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($357))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($358));
            case 'Fm.Term.let':
                var $359 = self.name;
                var $360 = self.expr;
                var $361 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$let($359)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($360))((_x$8 => Fm$Term$bind(List$cons(Pair$new($359)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($361(Fm$Term$var($359)(_vlen$7)))))
                })();
            case 'Fm.Term.def':
                var $362 = self.name;
                var $363 = self.expr;
                var $364 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$def($362)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($363))((_x$8 => Fm$Term$bind(List$cons(Pair$new($362)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($364(Fm$Term$var($362)(_vlen$7)))))
                })();
            case 'Fm.Term.ann':
                var $365 = self.done;
                var $366 = self.term;
                var $367 = self.type;
                return Fm$Term$ann($365)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($366))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($367));
            case 'Fm.Term.gol':
                var $368 = self.name;
                var $369 = self.dref;
                var $370 = self.verb;
                return Fm$Term$gol($368)($369)($370);
            case 'Fm.Term.hol':
                var $371 = self.path;
                return Fm$Term$hol(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $372 = self.natx;
                return Fm$Term$nat($372);
            case 'Fm.Term.chr':
                var $373 = self.chrx;
                return Fm$Term$chr($373);
            case 'Fm.Term.str':
                var $374 = self.strx;
                return Fm$Term$str($374);
            case 'Fm.Term.cse':
                var $375 = self.path;
                var $376 = self.expr;
                var $377 = self.name;
                var $378 = self.with;
                var $379 = self.cses;
                var $380 = self.moti;
                return (() => {
                    var _expr$10 = Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($376);
                    var _name$11 = $377;
                    var _wyth$12 = $378;
                    var _cses$13 = $379;
                    var _moti$14 = $380;
                    return Fm$Term$cse(Fm$Path$to_bits(_path$2))(_expr$10)(_name$11)(_wyth$12)(_cses$13)(_moti$14)
                })();
            case 'Fm.Term.ori':
                var $381 = self.orig;
                var $382 = self.expr;
                return Fm$Term$ori($381)(Fm$Term$bind(_vars$1)(_path$2)($382));
        }
    })())));
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$Parser$file$def = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$3 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$4 => (() => {
        var _args$5 = List$flatten(_args$4);
        return Monad$bind(Parser$monad)(Fm$Parser$text(":"))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$7 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$8 => (() => {
            var _type$9 = Fm$Parser$make_forall(_args$5)(_type$7);
            var _term$10 = Fm$Parser$make_lambda(List$mapped(_args$5)((_x$10 => (() => {
                var self = _x$10;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $383 = self.eras;
                        var $384 = self.name;
                        var $385 = self.term;
                        return $384;
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
                var $386 = self.value;
                return $386;
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
                            var $387 = self.name;
                            var $388 = self.pars;
                            var $389 = self.inds;
                            var $390 = self.ctrs;
                            return (() => {
                                var _slf$8 = Fm$Term$ref(_name$2);
                                var _slf$9 = (list_for($388)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$app(_slf$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $391 = self.eras;
                                            var $392 = self.name;
                                            var $393 = self.term;
                                            return $392;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($389)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$app(_slf$11)(Fm$Term$ref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $394 = self.eras;
                                            var $395 = self.name;
                                            var $396 = self.term;
                                            return $395;
                                    }
                                })()))))));
                                return Fm$Term$all(Bool$false)("")("")(_slf$10)((_s$11 => (_x$12 => Fm$Term$typ)))
                            })();
                    }
                })();
            case 'List.cons':
                var $397 = self.head;
                var $398 = self.tail;
                return (() => {
                    var self = $397;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $399 = self.eras;
                            var $400 = self.name;
                            var $401 = self.term;
                            return Fm$Term$all($399)("")($400)($401)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($398))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $402 = self.name;
                var $403 = self.pars;
                var $404 = self.inds;
                var $405 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($402)($404);
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
                            var $406 = self.name;
                            var $407 = self.pars;
                            var $408 = self.inds;
                            var $409 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $410 = self.name;
                                        var $411 = self.args;
                                        var $412 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$ref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($412)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$app(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $413 = self.eras;
                                                        var $414 = self.name;
                                                        var $415 = self.term;
                                                        return $415;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($406)(List$cons(Fm$Name$read("."))(List$cons($410)(List$nil))));
                                            var _slf$14 = Fm$Term$ref(_ctr$13);
                                            var _slf$15 = (list_for($407)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$app(_slf$16)(Fm$Term$ref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $416 = self.eras;
                                                        var $417 = self.name;
                                                        var $418 = self.term;
                                                        return $417;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($411)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$app(_slf$17)(Fm$Term$ref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $419 = self.eras;
                                                        var $420 = self.name;
                                                        var $421 = self.term;
                                                        return $420;
                                                }
                                            })()))))));
                                            return Fm$Term$app(_ret$12)(_slf$16)
                                        })();
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $422 = self.head;
                var $423 = self.tail;
                return (() => {
                    var self = $422;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $424 = self.eras;
                            var $425 = self.name;
                            var $426 = self.term;
                            return (() => {
                                var _eras$9 = $424;
                                var _name$10 = $425;
                                var _xtyp$11 = $426;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($423);
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
                var $427 = self.name;
                var $428 = self.args;
                var $429 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($428);
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
                            var $430 = self.name;
                            var $431 = self.pars;
                            var $432 = self.inds;
                            var $433 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$ref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($432)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$app(_ret$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $434 = self.eras;
                                            var $435 = self.name;
                                            var $436 = self.term;
                                            return $435;
                                    }
                                })()))))));
                                return Fm$Term$app(_ret$9)(Fm$Term$ref((_name$2 + ".Self")))
                            })();
                    }
                })();
            case 'List.cons':
                var $437 = self.head;
                var $438 = self.tail;
                return (() => {
                    var self = $437;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $439 = self.name;
                            var $440 = self.args;
                            var $441 = self.inds;
                            return Fm$Term$all(Bool$false)("")($439)(Fm$Datatype$build_term$constructor(_type$1)($437))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($438))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $442 = self.name;
                var $443 = self.pars;
                var $444 = self.inds;
                var $445 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($442)($445);
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
                            var $446 = self.head;
                            var $447 = self.tail;
                            return (() => {
                                var self = $446;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $448 = self.eras;
                                        var $449 = self.name;
                                        var $450 = self.term;
                                        return Fm$Term$lam($449)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($447)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $451 = self.head;
                var $452 = self.tail;
                return (() => {
                    var self = $451;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $453 = self.eras;
                            var $454 = self.name;
                            var $455 = self.term;
                            return Fm$Term$lam($454)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($452)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $456 = self.name;
                var $457 = self.pars;
                var $458 = self.inds;
                var $459 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($456)($457)($458);
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
                            var $460 = self.head;
                            var $461 = self.tail;
                            return (() => {
                                var self = $460;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $462 = self.eras;
                                        var $463 = self.name;
                                        var $464 = self.term;
                                        return Fm$Term$all(Bool$false)("")($463)($464)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($461))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $465 = self.head;
                var $466 = self.tail;
                return (() => {
                    var self = $465;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $467 = self.eras;
                            var $468 = self.name;
                            var $469 = self.term;
                            return Fm$Term$all(Bool$false)("")($468)($469)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($466)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $470 = self.name;
                var $471 = self.pars;
                var $472 = self.inds;
                var $473 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($470)($471)($472);
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
                            var $474 = self.name;
                            var $475 = self.args;
                            var $476 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$ref($474);
                                var _ret$8 = (list_for($475)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$app(_ret$9)(Fm$Term$ref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $477 = self.eras;
                                            var $478 = self.name;
                                            var $479 = self.term;
                                            return $478;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $480 = self.head;
                var $481 = self.tail;
                return (() => {
                    var self = $480;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $482 = self.name;
                            var $483 = self.args;
                            var $484 = self.inds;
                            return Fm$Term$lam($482)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($481)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $485 = self.name;
                var $486 = self.pars;
                var $487 = self.inds;
                var $488 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($488);
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
                            var $489 = self.head;
                            var $490 = self.tail;
                            return (() => {
                                var self = $489;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $491 = self.eras;
                                        var $492 = self.name;
                                        var $493 = self.term;
                                        return Fm$Term$lam($492)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($490)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $494 = self.head;
                var $495 = self.tail;
                return (() => {
                    var self = $494;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $496 = self.eras;
                            var $497 = self.name;
                            var $498 = self.term;
                            return Fm$Term$lam($497)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($495)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $499 = self.name;
                var $500 = self.pars;
                var $501 = self.inds;
                var $502 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $503 = self.name;
                            var $504 = self.args;
                            var $505 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($499)($500)($504);
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
                                                    return (() => {
                                                        var _type$13 = Fm$Term$ref(_name$3);
                                                        var _type$14 = (list_for($507)(_type$13)((_var$14 => (_type$15 => Fm$Term$app(_type$15)(Fm$Term$ref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $513 = self.eras;
                                                                    var $514 = self.name;
                                                                    var $515 = self.term;
                                                                    return $514;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($512)(_type$14)((_var$15 => (_type$16 => Fm$Term$app(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $516 = self.eras;
                                                                    var $517 = self.name;
                                                                    var $518 = self.term;
                                                                    return $518;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $519 = self.head;
                            var $520 = self.tail;
                            return (() => {
                                var self = $519;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $521 = self.eras;
                                        var $522 = self.name;
                                        var $523 = self.term;
                                        return Fm$Term$all($521)("")($522)($523)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($520))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $524 = self.head;
                var $525 = self.tail;
                return (() => {
                    var self = $524;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $526 = self.eras;
                            var $527 = self.name;
                            var $528 = self.term;
                            return Fm$Term$all($526)("")($527)($528)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($525)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $529 = self.name;
                var $530 = self.pars;
                var $531 = self.inds;
                var $532 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $533 = self.name;
                            var $534 = self.args;
                            var $535 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($529)($530)($534);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$adt = (_file$1 => (_defs$2 => Monad$bind(Parser$monad)(Fm$Parser$datatype)((_adt$3 => (() => {
        var self = _adt$3;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $536 = self.name;
                var $537 = self.pars;
                var $538 = self.inds;
                var $539 = self.ctrs;
                return (() => {
                    var _term$8 = Fm$Datatype$build_term(_adt$3);
                    var _term$9 = Fm$Term$bind(List$nil)((_x$9 => Bits$1(_x$9)))(_term$8);
                    var _type$10 = Fm$Datatype$build_type(_adt$3);
                    var _type$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$0(_x$11)))(_type$10);
                    var _defs$12 = Fm$set($536)(Fm$Def$new(_file$1)($536)(_term$9)(_type$11)(Fm$Status$init))(_defs$2);
                    var _defs$13 = List$fold($539)(_defs$12)((_ctr$13 => (_defs$14 => (() => {
                        var _typ_name$15 = $536;
                        var _ctr_name$16 = String$flatten(List$cons(_typ_name$15)(List$cons(Fm$Name$read("."))(List$cons((() => {
                            var self = _ctr$13;
                            switch (self._) {
                                case 'Fm.Constructor.new':
                                    var $540 = self.name;
                                    var $541 = self.args;
                                    var $542 = self.inds;
                                    return $540;
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
                var $543 = self.charCodeAt(0);
                var $544 = self.slice(1);
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
                var $545 = self.head;
                var $546 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($545)(List$cons(String$join$go(_sep$1)($546)(Bool$false))(List$nil))));
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
                var $547 = self.value;
                return _f$5($547);
        }
    })())));
    var Nat$is_zero = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Bool$true;
            case 'succ':
                var $548 = (self - 1n);
                return Bool$false;
        }
    })());
    var Nat$double = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $549 = (self - 1n);
                return Nat$succ(Nat$succ(Nat$double($549)));
        }
    })());
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $550 = (self - 1n);
                return $550;
        }
    })());
    var List$take = (_n$2 => (_xs$3 => (() => {
        var self = _xs$3;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $551 = self.head;
                var $552 = self.tail;
                return (() => {
                    var self = _n$2;
                    switch (self === 0n ? 'zero' : 'succ') {
                        case 'zero':
                            return List$nil;
                        case 'succ':
                            var $553 = (self - 1n);
                            return List$cons($551)(List$take($553)($552));
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
                        var $554 = self.charCodeAt(0);
                        var $555 = self.slice(1);
                        return String$reverse$go($555)(String$cons($554)(_res$2));
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
                var $556 = (self - 1n);
                return (() => {
                    var self = _str$3;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return String$cons(_chr$2)(String$pad_right($556)(_chr$2)(""));
                        case 'cons':
                            var $557 = self.charCodeAt(0);
                            var $558 = self.slice(1);
                            return String$cons($557)(String$pad_right($556)(_chr$2)($558));
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
                        var $559 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($559));
                                case 'succ':
                                    var $560 = (self - 1n);
                                    return Nat$sub_rem($560)($559);
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
                        var $561 = self.value;
                        return Nat$div_mod$go($561)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $562 = self.value;
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
                        var $563 = self.fst;
                        var $564 = self.snd;
                        return (() => {
                            var self = $563;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($564)(_res$3);
                                case 'succ':
                                    var $565 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($563)(List$cons($564)(_res$3));
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
                                var $566 = self.value;
                                return $566;
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
                        var $567 = self.charCodeAt(0);
                        var $568 = self.slice(1);
                        return (() => {
                            var self = ($567 === 10);
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
                                                                                var $569 = self.value;
                                                                                return Maybe$some(Nat$pred($569));
                                                                        }
                                                                    })();
                                                                case 'succ':
                                                                    var $570 = (self - 1n);
                                                                    return _lft$6;
                                                            }
                                                        })();
                                                        var _ix0$15 = Nat$pred(_ix0$2);
                                                        var _ix1$16 = Nat$pred(_ix1$3);
                                                        var _col$17 = 0n;
                                                        var _row$18 = Nat$succ(_row$5);
                                                        var _res$19 = List$take(_siz$13)(List$cons(String$reverse(_lin$7))(_res$8));
                                                        var _lin$20 = String$reverse(String$flatten(List$cons(String$pad_left(4n)(32)(Nat$show(_row$18)))(List$cons(" | ")(List$nil))));
                                                        return Fm$highlight$tc($568)(_ix0$15)(_ix1$16)(_col$17)(_row$18)(_lft$14)(_lin$20)(_res$19)
                                                    })();
                                            }
                                        })()
                                    })();
                                case 'false':
                                    return (() => {
                                        var _chr$11 = String$cons($567)(String$nil);
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
                                        return Fm$highlight$tc($568)(_ix0$13)(_ix1$14)(_col$15)(_row$5)(_lft$6)(_lin$16)(_res$8)
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
                var $571 = self.idx;
                var $572 = self.code;
                var $573 = self.err;
                return (() => {
                    var _err$7 = $573;
                    var _hig$8 = Fm$highlight(_code$2)($571)(Nat$succ($571));
                    var _str$9 = String$flatten(List$cons(_err$7)(List$cons("\u{a}")(List$cons(_hig$8)(List$nil))));
                    return Either$left(_str$9)
                })();
            case 'Parser.Reply.value':
                var $574 = self.idx;
                var $575 = self.code;
                var $576 = self.val;
                return Either$right($576);
        }
    })())));
    var Fm$exec = (_files$1 => (_report$2 => (() => {
        var _reads$3 = Pair$new("")(Map$new);
        var _reads$4 = (list_for(_files$1)(_reads$3)((_file$4 => (_reads$5 => (() => {
            var self = _reads$5;
            switch (self._) {
                case 'Pair.new':
                    var $577 = self.fst;
                    var $578 = self.snd;
                    return (() => {
                        var self = _file$4;
                        switch (self._) {
                            case 'Fm.File.new':
                                var $579 = self.name;
                                var $580 = self.code;
                                return (() => {
                                    var self = _reads$5;
                                    switch (self._) {
                                        case 'Pair.new':
                                            var $581 = self.fst;
                                            var $582 = self.snd;
                                            return (() => {
                                                var self = Fm$Defs$read($579)($580)($582);
                                                switch (self._) {
                                                    case 'Either.left':
                                                        var $583 = self.value;
                                                        return Pair$new(String$flatten(List$cons($581)(List$cons("On ")(List$cons($579)(List$cons(":\u{a}")(List$cons($583)(List$cons("\u{a}")(List$nil))))))))($582);
                                                    case 'Either.right':
                                                        var $584 = self.value;
                                                        return Pair$new($581)($584);
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
                    var $585 = self.fst;
                    var $586 = self.snd;
                    return (() => {
                        var _errs$7 = $585;
                        var _defs$8 = $586;
                        return (() => {
                            var self = _errs$7;
                            switch (self.length === 0 ? 'nil' : 'cons') {
                                case 'nil':
                                    return _report$2(_defs$8);
                                case 'cons':
                                    var $587 = self.charCodeAt(0);
                                    var $588 = self.slice(1);
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
                var $589 = self.val;
                var $590 = self.lft;
                var $591 = self.rgt;
                return (() => {
                    var _list0$7 = (() => {
                        var self = $589;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$3;
                            case 'Maybe.some':
                                var $592 = self.value;
                                return List$cons($592)(_list$3);
                        }
                    })();
                    var _list1$8 = Map$values$go($590)(_list0$7);
                    var _list2$9 = Map$values$go($591)(_list1$8);
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
                var $593 = self.slice(0, -1);
                return (2n * Bits$to_nat($593));
            case '1':
                var $594 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($594)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $595 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($595)));
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
                var $596 = self.charCodeAt(0);
                var $597 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($596);
                    var _tail$5 = Fm$escape($597);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $598 = self.name;
                var $599 = self.indx;
                return Fm$Name$show($598);
            case 'Fm.Term.ref':
                var $600 = self.name;
                return Fm$Name$show($600);
            case 'Fm.Term.typ':
                return "*";
            case 'Fm.Term.all':
                var $601 = self.eras;
                var $602 = self.self;
                var $603 = self.name;
                var $604 = self.xtyp;
                var $605 = self.body;
                return (() => {
                    var _eras$7 = $601;
                    var _init$8 = (() => {
                        var self = _eras$7;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$9 = Fm$Name$show($602);
                    var _name$10 = Fm$Name$show($603);
                    var _xtyp$11 = Fm$Term$core($604);
                    var _body$12 = Fm$Term$core($605(Fm$Term$var($602)(0n))(Fm$Term$var($603)(0n)));
                    return String$flatten(List$cons(_init$8)(List$cons(_self$9)(List$cons("(")(List$cons(_name$10)(List$cons(":")(List$cons(_xtyp$11)(List$cons(") ")(List$cons(_body$12)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $606 = self.name;
                var $607 = self.body;
                return (() => {
                    var _name$4 = Fm$Name$show($606);
                    var _body$5 = Fm$Term$core($607(Fm$Term$var($606)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$4)(List$cons(" ")(List$cons(_body$5)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $608 = self.func;
                var $609 = self.argm;
                return (() => {
                    var _func$4 = Fm$Term$core($608);
                    var _argm$5 = Fm$Term$core($609);
                    return String$flatten(List$cons("(")(List$cons(_func$4)(List$cons(" ")(List$cons(_argm$5)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $610 = self.name;
                var $611 = self.expr;
                var $612 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($610);
                    var _expr$6 = Fm$Term$core($611);
                    var _body$7 = Fm$Term$core($612(Fm$Term$var($610)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $613 = self.name;
                var $614 = self.expr;
                var $615 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($613);
                    var _expr$6 = Fm$Term$core($614);
                    var _body$7 = Fm$Term$core($615(Fm$Term$var($613)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $616 = self.done;
                var $617 = self.term;
                var $618 = self.type;
                return (() => {
                    var _term$5 = Fm$Term$core($617);
                    var _type$6 = Fm$Term$core($618);
                    return String$flatten(List$cons("{")(List$cons(_term$5)(List$cons(":")(List$cons(_type$6)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $619 = self.name;
                var $620 = self.dref;
                var $621 = self.verb;
                return "<GOL>";
            case 'Fm.Term.hol':
                var $622 = self.path;
                return "<HOL>";
            case 'Fm.Term.nat':
                var $623 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($623))(List$nil)));
            case 'Fm.Term.chr':
                var $624 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($624))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $625 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($625))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $626 = self.path;
                var $627 = self.expr;
                var $628 = self.name;
                var $629 = self.with;
                var $630 = self.cses;
                var $631 = self.moti;
                return "<CSE>";
            case 'Fm.Term.ori':
                var $632 = self.orig;
                var $633 = self.expr;
                return Fm$Term$core($633);
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$values(_defs$1))(_result$2)((_defn$3 => (_result$4 => (() => {
            var self = _defn$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $634 = self.file;
                    var $635 = self.name;
                    var $636 = self.term;
                    var $637 = self.type;
                    var $638 = self.stat;
                    return (() => {
                        var self = $638;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _result$4;
                            case 'Fm.Status.wait':
                                return _result$4;
                            case 'Fm.Status.done':
                                return (() => {
                                    var _name$10 = $635;
                                    var _term$11 = Fm$Term$core($636);
                                    var _type$12 = Fm$Term$core($637);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$10)(List$cons(" : ")(List$cons(_type$12)(List$cons(" = ")(List$cons(_term$11)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                            case 'Fm.Status.fail':
                                var $639 = self.errors;
                                return _result$4;
                        }
                    })();
            }
        })()))));
        return _result$3
    })());
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
                var $640 = self.value;
                var $641 = self.errors;
                return (() => {
                    var self = $640;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($641);
                        case 'Maybe.some':
                            var $642 = self.value;
                            return (() => {
                                var self = _f$4($642);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $643 = self.value;
                                        var $644 = self.errors;
                                        return Fm$Check$result($643)(List$concat($641)($644));
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
                var $645 = self.value;
                return Maybe$some(_f$4($645));
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
                var $646 = self.head;
                var $647 = self.tail;
                return (() => {
                    var self = $646;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $648 = self.file;
                            var $649 = self.name;
                            var $650 = self.term;
                            var $651 = self.type;
                            var $652 = self.stat;
                            return Fm$Term$all(Bool$false)("")($649)($651)((_s$10 => (_x$11 => Fm$Term$desugar_cse$motive($647)(_moti$2))));
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
                var $653 = self.charCodeAt(0);
                var $654 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $655 = self.name;
                var $656 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $657 = self.head;
                            var $658 = self.tail;
                            return (() => {
                                var self = $657;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $659 = self.file;
                                        var $660 = self.name;
                                        var $661 = self.term;
                                        var $662 = self.type;
                                        var $663 = self.stat;
                                        return Fm$Term$lam($660)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($658)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $664 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $665 = self.head;
                            var $666 = self.tail;
                            return (() => {
                                var self = $665;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $667 = self.file;
                                        var $668 = self.name;
                                        var $669 = self.term;
                                        var $670 = self.type;
                                        var $671 = self.stat;
                                        return Fm$Term$lam($668)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($666)(_type$3)(_body$4)(_defs$5)));
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
                            var $672 = self.head;
                            var $673 = self.tail;
                            return (() => {
                                var self = $672;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $674 = self.file;
                                        var $675 = self.name;
                                        var $676 = self.term;
                                        var $677 = self.type;
                                        var $678 = self.stat;
                                        return Fm$Term$lam($675)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($673)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $679 = self.eras;
                var $680 = self.self;
                var $681 = self.name;
                var $682 = self.xtyp;
                var $683 = self.body;
                return Fm$Term$lam((() => {
                    var self = String$is_empty($681);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return _name$1;
                        case 'false':
                            return String$flatten(List$cons(_name$1)(List$cons(".")(List$cons($681)(List$nil))));
                    }
                })())((_x$11 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($683(Fm$Term$var($680)(0n))(Fm$Term$var($681)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $684 = self.name;
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
                                        var $688 = self.file;
                                        var $689 = self.name;
                                        var $690 = self.term;
                                        var $691 = self.type;
                                        var $692 = self.stat;
                                        return Fm$Term$lam($689)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($687)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $693 = self.func;
                var $694 = self.argm;
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
                                        var $697 = self.file;
                                        var $698 = self.name;
                                        var $699 = self.term;
                                        var $700 = self.type;
                                        var $701 = self.stat;
                                        return Fm$Term$lam($698)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($696)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $702 = self.name;
                var $703 = self.expr;
                var $704 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $705 = self.head;
                            var $706 = self.tail;
                            return (() => {
                                var self = $705;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $707 = self.file;
                                        var $708 = self.name;
                                        var $709 = self.term;
                                        var $710 = self.type;
                                        var $711 = self.stat;
                                        return Fm$Term$lam($708)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($706)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $712 = self.name;
                var $713 = self.expr;
                var $714 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $715 = self.head;
                            var $716 = self.tail;
                            return (() => {
                                var self = $715;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $717 = self.file;
                                        var $718 = self.name;
                                        var $719 = self.term;
                                        var $720 = self.type;
                                        var $721 = self.stat;
                                        return Fm$Term$lam($718)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($716)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $722 = self.done;
                var $723 = self.term;
                var $724 = self.type;
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
                                        var $727 = self.file;
                                        var $728 = self.name;
                                        var $729 = self.term;
                                        var $730 = self.type;
                                        var $731 = self.stat;
                                        return Fm$Term$lam($728)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($726)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $732 = self.name;
                var $733 = self.dref;
                var $734 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $735 = self.head;
                            var $736 = self.tail;
                            return (() => {
                                var self = $735;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $737 = self.file;
                                        var $738 = self.name;
                                        var $739 = self.term;
                                        var $740 = self.type;
                                        var $741 = self.stat;
                                        return Fm$Term$lam($738)((_x$16 => Fm$Term$desugar_cse$argument(_name$1)($736)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $742 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $743 = self.head;
                            var $744 = self.tail;
                            return (() => {
                                var self = $743;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $745 = self.file;
                                        var $746 = self.name;
                                        var $747 = self.term;
                                        var $748 = self.type;
                                        var $749 = self.stat;
                                        return Fm$Term$lam($746)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($744)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $750 = self.natx;
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
                                        var $754 = self.name;
                                        var $755 = self.term;
                                        var $756 = self.type;
                                        var $757 = self.stat;
                                        return Fm$Term$lam($754)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($752)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $758 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $759 = self.head;
                            var $760 = self.tail;
                            return (() => {
                                var self = $759;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $761 = self.file;
                                        var $762 = self.name;
                                        var $763 = self.term;
                                        var $764 = self.type;
                                        var $765 = self.stat;
                                        return Fm$Term$lam($762)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($760)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $766 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $767 = self.head;
                            var $768 = self.tail;
                            return (() => {
                                var self = $767;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $769 = self.file;
                                        var $770 = self.name;
                                        var $771 = self.term;
                                        var $772 = self.type;
                                        var $773 = self.stat;
                                        return Fm$Term$lam($770)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($768)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $774 = self.path;
                var $775 = self.expr;
                var $776 = self.name;
                var $777 = self.with;
                var $778 = self.cses;
                var $779 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $780 = self.head;
                            var $781 = self.tail;
                            return (() => {
                                var self = $780;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $782 = self.file;
                                        var $783 = self.name;
                                        var $784 = self.term;
                                        var $785 = self.type;
                                        var $786 = self.stat;
                                        return Fm$Term$lam($783)((_x$19 => Fm$Term$desugar_cse$argument(_name$1)($781)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ori':
                var $787 = self.orig;
                var $788 = self.expr;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $789 = self.head;
                            var $790 = self.tail;
                            return (() => {
                                var self = $789;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $791 = self.file;
                                        var $792 = self.name;
                                        var $793 = self.term;
                                        var $794 = self.type;
                                        var $795 = self.stat;
                                        return Fm$Term$lam($792)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($790)(_type$3)(_body$4)(_defs$5)));
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
                var $796 = self.value;
                return Maybe$some($796);
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
                        var $797 = self.name;
                        var $798 = self.indx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $799 = self.file;
                                        var $800 = self.name;
                                        var $801 = self.term;
                                        var $802 = self.type;
                                        var $803 = self.stat;
                                        return $801;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.ref':
                        var $804 = self.name;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $805 = self.file;
                                        var $806 = self.name;
                                        var $807 = self.term;
                                        var $808 = self.type;
                                        var $809 = self.stat;
                                        return $807;
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
                                        var $810 = self.file;
                                        var $811 = self.name;
                                        var $812 = self.term;
                                        var $813 = self.type;
                                        var $814 = self.stat;
                                        return $812;
                                }
                            })())))));
                            return _expr$8
                        })();
                    case 'Fm.Term.all':
                        var $815 = self.eras;
                        var $816 = self.self;
                        var $817 = self.name;
                        var $818 = self.xtyp;
                        var $819 = self.body;
                        return (() => {
                            var _got$13 = Maybe$or(Fm$get($817)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => (() => {
                                                var self = _defn$14;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $820 = self.file;
                                                        var $821 = self.name;
                                                        var $822 = self.term;
                                                        var $823 = self.type;
                                                        var $824 = self.stat;
                                                        return Fm$Term$app(_expr$15)($822);
                                                }
                                            })()))));
                                            return _expr$14
                                        })();
                                    case 'Maybe.some':
                                        var $825 = self.value;
                                        return (() => {
                                            var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($818)($825)(_defs$6);
                                            var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                                            var _type$17 = $819(Fm$Term$var($816)(0n))(Fm$Term$var($817)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_wyth$3)(_cses$4)(_type$17)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $826 = self.name;
                        var $827 = self.body;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $828 = self.file;
                                        var $829 = self.name;
                                        var $830 = self.term;
                                        var $831 = self.type;
                                        var $832 = self.stat;
                                        return $830;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.app':
                        var $833 = self.func;
                        var $834 = self.argm;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $835 = self.file;
                                        var $836 = self.name;
                                        var $837 = self.term;
                                        var $838 = self.type;
                                        var $839 = self.stat;
                                        return $837;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.let':
                        var $840 = self.name;
                        var $841 = self.expr;
                        var $842 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $843 = self.file;
                                        var $844 = self.name;
                                        var $845 = self.term;
                                        var $846 = self.type;
                                        var $847 = self.stat;
                                        return $845;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.def':
                        var $848 = self.name;
                        var $849 = self.expr;
                        var $850 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $851 = self.file;
                                        var $852 = self.name;
                                        var $853 = self.term;
                                        var $854 = self.type;
                                        var $855 = self.stat;
                                        return $853;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ann':
                        var $856 = self.done;
                        var $857 = self.term;
                        var $858 = self.type;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $859 = self.file;
                                        var $860 = self.name;
                                        var $861 = self.term;
                                        var $862 = self.type;
                                        var $863 = self.stat;
                                        return $861;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.gol':
                        var $864 = self.name;
                        var $865 = self.dref;
                        var $866 = self.verb;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_defn$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _defn$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $867 = self.file;
                                        var $868 = self.name;
                                        var $869 = self.term;
                                        var $870 = self.type;
                                        var $871 = self.stat;
                                        return $869;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.hol':
                        var $872 = self.path;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $873 = self.file;
                                        var $874 = self.name;
                                        var $875 = self.term;
                                        var $876 = self.type;
                                        var $877 = self.stat;
                                        return $875;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.nat':
                        var $878 = self.natx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $879 = self.file;
                                        var $880 = self.name;
                                        var $881 = self.term;
                                        var $882 = self.type;
                                        var $883 = self.stat;
                                        return $881;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.chr':
                        var $884 = self.chrx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $885 = self.file;
                                        var $886 = self.name;
                                        var $887 = self.term;
                                        var $888 = self.type;
                                        var $889 = self.stat;
                                        return $887;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.str':
                        var $890 = self.strx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_defn$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _defn$9;
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
                            return _expr$9
                        })();
                    case 'Fm.Term.cse':
                        var $896 = self.path;
                        var $897 = self.expr;
                        var $898 = self.name;
                        var $899 = self.with;
                        var $900 = self.cses;
                        var $901 = self.moti;
                        return (() => {
                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_defn$14 => (_expr$15 => Fm$Term$app(_expr$15)((() => {
                                var self = _defn$14;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $902 = self.file;
                                        var $903 = self.name;
                                        var $904 = self.term;
                                        var $905 = self.type;
                                        var $906 = self.stat;
                                        return $904;
                                }
                            })())))));
                            return _expr$14
                        })();
                    case 'Fm.Term.ori':
                        var $907 = self.orig;
                        var $908 = self.expr;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_defn$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _defn$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $909 = self.file;
                                        var $910 = self.name;
                                        var $911 = self.term;
                                        var $912 = self.type;
                                        var $913 = self.stat;
                                        return $911;
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
                var $914 = self.name;
                var $915 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $916 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $917 = self.eras;
                var $918 = self.self;
                var $919 = self.name;
                var $920 = self.xtyp;
                var $921 = self.body;
                return (() => {
                    var _moti$14 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($920)(_moti$14)(_defs$7);
                    var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                    var _type$17 = $921(Fm$Term$var($918)(0n))(Fm$Term$var($919)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_with$3)(_cses$4)(_type$17)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $922 = self.name;
                var $923 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $924 = self.func;
                var $925 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $926 = self.name;
                var $927 = self.expr;
                var $928 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $929 = self.name;
                var $930 = self.expr;
                var $931 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $932 = self.done;
                var $933 = self.term;
                var $934 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $935 = self.name;
                var $936 = self.dref;
                var $937 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $938 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $939 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $940 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $941 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $942 = self.path;
                var $943 = self.expr;
                var $944 = self.name;
                var $945 = self.with;
                var $946 = self.cses;
                var $947 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $948 = self.orig;
                var $949 = self.expr;
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
                var $950 = self.value;
                return $950(Bits$nil);
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
                var $951 = self.name;
                var $952 = self.indx;
                return (() => {
                    var self = ($952 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $952 <= 0n ? 0n : _depth$2 - $952)))));
                                return Bits$0(Bits$0(Bits$1(_name$7(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits($952)));
                                return Bits$0(Bits$1(Bits$0(_name$7(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $953 = self.name;
                return (() => {
                    var _name$6 = a1 => (a1 + Fm$Term$serialize$name($953));
                    return Bits$0(Bits$0(Bits$0(_name$6(_x$4))))
                })();
            case 'Fm.Term.typ':
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $954 = self.eras;
                var $955 = self.self;
                var $956 = self.name;
                var $957 = self.xtyp;
                var $958 = self.body;
                return (() => {
                    var _eras$10 = (() => {
                        var self = $954;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$11 = a1 => (a1 + (fm_name_to_bits($955)));
                    var _xtyp$12 = Fm$Term$serialize($957)(_depth$2)(_init$3);
                    var _body$13 = Fm$Term$serialize($958(Fm$Term$var($955)(_depth$2))(Fm$Term$var($956)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $959 = self.name;
                var $960 = self.body;
                return (() => {
                    var _body$7 = Fm$Term$serialize($960(Fm$Term$var($959)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$7(_x$4))))
                })();
            case 'Fm.Term.app':
                var $961 = self.func;
                var $962 = self.argm;
                return (() => {
                    var _func$7 = Fm$Term$serialize($961)(_depth$2)(_init$3);
                    var _argm$8 = Fm$Term$serialize($962)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$7(_argm$8(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $963 = self.name;
                var $964 = self.expr;
                var $965 = self.body;
                return (() => {
                    var _expr$8 = Fm$Term$serialize($964)(_depth$2)(_init$3);
                    var _body$9 = Fm$Term$serialize($965(Fm$Term$var($963)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$8(_body$9(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $966 = self.name;
                var $967 = self.expr;
                var $968 = self.body;
                return Fm$Term$serialize($968($967))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $969 = self.done;
                var $970 = self.term;
                var $971 = self.type;
                return Fm$Term$serialize($970)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $972 = self.name;
                var $973 = self.dref;
                var $974 = self.verb;
                return (() => {
                    var _name$8 = a1 => (a1 + (fm_name_to_bits($972)));
                    return Bits$0(Bits$0(Bits$0(_name$8(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $975 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $976 = self.natx;
                return Fm$Term$serialize(Fm$Term$unroll_nat($976))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.chr':
                var $977 = self.chrx;
                return Fm$Term$serialize(Fm$Term$unroll_chr($977))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.str':
                var $978 = self.strx;
                return Fm$Term$serialize(Fm$Term$unroll_str($978))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $979 = self.path;
                var $980 = self.expr;
                var $981 = self.name;
                var $982 = self.with;
                var $983 = self.cses;
                var $984 = self.moti;
                return _x$4;
            case 'Fm.Term.ori':
                var $985 = self.orig;
                var $986 = self.expr;
                return Fm$Term$serialize($986)(_depth$2)(_init$3)(_x$4);
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
                                    var $987 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $988 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '0':
                        var $989 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $990 = self.slice(0, -1);
                                    return Bits$eql($989)($990);
                                case '1':
                                    var $991 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '1':
                        var $992 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $993 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $994 = self.slice(0, -1);
                                    return Bits$eql($992)($994);
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
                var $995 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $996 = self.name;
                var $997 = self.indx;
                return Fm$Term$var($996)($997);
            case 'Fm.Term.ref':
                var $998 = self.name;
                return Fm$Term$ref($998);
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $999 = self.eras;
                var $1000 = self.self;
                var $1001 = self.name;
                var $1002 = self.xtyp;
                var $1003 = self.body;
                return Fm$Term$all($999)($1000)($1001)(Fm$Term$normalize($1002)(_defs$2))((_s$8 => (_x$9 => Fm$Term$normalize($1003(_s$8)(_x$9))(_defs$2))));
            case 'Fm.Term.lam':
                var $1004 = self.name;
                var $1005 = self.body;
                return Fm$Term$lam($1004)((_x$5 => Fm$Term$normalize($1005(_x$5))(_defs$2)));
            case 'Fm.Term.app':
                var $1006 = self.func;
                var $1007 = self.argm;
                return Fm$Term$app(Fm$Term$normalize($1006)(_defs$2))(Fm$Term$normalize($1007)(_defs$2));
            case 'Fm.Term.let':
                var $1008 = self.name;
                var $1009 = self.expr;
                var $1010 = self.body;
                return Fm$Term$let($1008)(Fm$Term$normalize($1009)(_defs$2))((_x$6 => Fm$Term$normalize($1010(_x$6))(_defs$2)));
            case 'Fm.Term.def':
                var $1011 = self.name;
                var $1012 = self.expr;
                var $1013 = self.body;
                return Fm$Term$def($1011)(Fm$Term$normalize($1012)(_defs$2))((_x$6 => Fm$Term$normalize($1013(_x$6))(_defs$2)));
            case 'Fm.Term.ann':
                var $1014 = self.done;
                var $1015 = self.term;
                var $1016 = self.type;
                return Fm$Term$ann($1014)(Fm$Term$normalize($1015)(_defs$2))(Fm$Term$normalize($1016)(_defs$2));
            case 'Fm.Term.gol':
                var $1017 = self.name;
                var $1018 = self.dref;
                var $1019 = self.verb;
                return Fm$Term$gol($1017)($1018)($1019);
            case 'Fm.Term.hol':
                var $1020 = self.path;
                return Fm$Term$hol($1020);
            case 'Fm.Term.nat':
                var $1021 = self.natx;
                return Fm$Term$nat($1021);
            case 'Fm.Term.chr':
                var $1022 = self.chrx;
                return Fm$Term$chr($1022);
            case 'Fm.Term.str':
                var $1023 = self.strx;
                return Fm$Term$str($1023);
            case 'Fm.Term.cse':
                var $1024 = self.path;
                var $1025 = self.expr;
                var $1026 = self.name;
                var $1027 = self.with;
                var $1028 = self.cses;
                var $1029 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $1030 = self.orig;
                var $1031 = self.expr;
                return Fm$Term$normalize($1031)(_defs$2);
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
                                                                var $1032 = self.name;
                                                                var $1033 = self.indx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1034 = self.name;
                                                                            var $1035 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1036 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1037 = self.eras;
                                                                            var $1038 = self.self;
                                                                            var $1039 = self.name;
                                                                            var $1040 = self.xtyp;
                                                                            var $1041 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1042 = self.name;
                                                                            var $1043 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1044 = self.func;
                                                                            var $1045 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1046 = self.name;
                                                                            var $1047 = self.expr;
                                                                            var $1048 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1049 = self.name;
                                                                            var $1050 = self.expr;
                                                                            var $1051 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1052 = self.done;
                                                                            var $1053 = self.term;
                                                                            var $1054 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1055 = self.name;
                                                                            var $1056 = self.dref;
                                                                            var $1057 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1058 = self.path;
                                                                            return Fm$Term$equal$patch($1058)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1059 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1060 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1061 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1062 = self.path;
                                                                            var $1063 = self.expr;
                                                                            var $1064 = self.name;
                                                                            var $1065 = self.with;
                                                                            var $1066 = self.cses;
                                                                            var $1067 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1068 = self.orig;
                                                                            var $1069 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ref':
                                                                var $1070 = self.name;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1071 = self.name;
                                                                            var $1072 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1073 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1074 = self.eras;
                                                                            var $1075 = self.self;
                                                                            var $1076 = self.name;
                                                                            var $1077 = self.xtyp;
                                                                            var $1078 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1079 = self.name;
                                                                            var $1080 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1081 = self.func;
                                                                            var $1082 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1083 = self.name;
                                                                            var $1084 = self.expr;
                                                                            var $1085 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1086 = self.name;
                                                                            var $1087 = self.expr;
                                                                            var $1088 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1089 = self.done;
                                                                            var $1090 = self.term;
                                                                            var $1091 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1092 = self.name;
                                                                            var $1093 = self.dref;
                                                                            var $1094 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1095 = self.path;
                                                                            return Fm$Term$equal$patch($1095)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1096 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1097 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1098 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1099 = self.path;
                                                                            var $1100 = self.expr;
                                                                            var $1101 = self.name;
                                                                            var $1102 = self.with;
                                                                            var $1103 = self.cses;
                                                                            var $1104 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1105 = self.orig;
                                                                            var $1106 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.typ':
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1107 = self.name;
                                                                            var $1108 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1109 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1110 = self.eras;
                                                                            var $1111 = self.self;
                                                                            var $1112 = self.name;
                                                                            var $1113 = self.xtyp;
                                                                            var $1114 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1115 = self.name;
                                                                            var $1116 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1117 = self.func;
                                                                            var $1118 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1119 = self.name;
                                                                            var $1120 = self.expr;
                                                                            var $1121 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1122 = self.name;
                                                                            var $1123 = self.expr;
                                                                            var $1124 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1125 = self.done;
                                                                            var $1126 = self.term;
                                                                            var $1127 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1128 = self.name;
                                                                            var $1129 = self.dref;
                                                                            var $1130 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1131 = self.path;
                                                                            return Fm$Term$equal$patch($1131)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1132 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1133 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1134 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1135 = self.path;
                                                                            var $1136 = self.expr;
                                                                            var $1137 = self.name;
                                                                            var $1138 = self.with;
                                                                            var $1139 = self.cses;
                                                                            var $1140 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1141 = self.orig;
                                                                            var $1142 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.all':
                                                                var $1143 = self.eras;
                                                                var $1144 = self.self;
                                                                var $1145 = self.name;
                                                                var $1146 = self.xtyp;
                                                                var $1147 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1148 = self.name;
                                                                            var $1149 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1150 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1151 = self.eras;
                                                                            var $1152 = self.self;
                                                                            var $1153 = self.name;
                                                                            var $1154 = self.xtyp;
                                                                            var $1155 = self.body;
                                                                            return (() => {
                                                                                var _seen$23 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$24 = $1147(Fm$Term$var($1144)(_lv$4))(Fm$Term$var($1145)(Nat$succ(_lv$4)));
                                                                                var _b1_body$25 = $1155(Fm$Term$var($1152)(_lv$4))(Fm$Term$var($1153)(Nat$succ(_lv$4)));
                                                                                var _eq_self$26 = ($1144 === $1152);
                                                                                var _eq_eras$27 = Bool$eql($1143)($1151);
                                                                                return (() => {
                                                                                    var self = (_eq_self$26 && _eq_eras$27);
                                                                                    switch (self ? 'true' : 'false') {
                                                                                        case 'true':
                                                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1146)($1154)(_defs$3)(_lv$4)(_seen$23))((_eq_type$28 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$24)(_b1_body$25)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$23))((_eq_body$29 => Monad$pure(Fm$Check$monad)((_eq_type$28 && _eq_body$29))))));
                                                                                        case 'false':
                                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                                    }
                                                                                })()
                                                                            })();
                                                                        case 'Fm.Term.lam':
                                                                            var $1156 = self.name;
                                                                            var $1157 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1158 = self.func;
                                                                            var $1159 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1160 = self.name;
                                                                            var $1161 = self.expr;
                                                                            var $1162 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1163 = self.name;
                                                                            var $1164 = self.expr;
                                                                            var $1165 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1166 = self.done;
                                                                            var $1167 = self.term;
                                                                            var $1168 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1169 = self.name;
                                                                            var $1170 = self.dref;
                                                                            var $1171 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1172 = self.path;
                                                                            return Fm$Term$equal$patch($1172)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1173 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1174 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1175 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1176 = self.path;
                                                                            var $1177 = self.expr;
                                                                            var $1178 = self.name;
                                                                            var $1179 = self.with;
                                                                            var $1180 = self.cses;
                                                                            var $1181 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1182 = self.orig;
                                                                            var $1183 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.lam':
                                                                var $1184 = self.name;
                                                                var $1185 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1186 = self.name;
                                                                            var $1187 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1188 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1189 = self.eras;
                                                                            var $1190 = self.self;
                                                                            var $1191 = self.name;
                                                                            var $1192 = self.xtyp;
                                                                            var $1193 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1194 = self.name;
                                                                            var $1195 = self.body;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$18 = $1185(Fm$Term$var($1184)(_lv$4));
                                                                                var _b1_body$19 = $1195(Fm$Term$var($1194)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$20 => Monad$pure(Fm$Check$monad)(_eq_body$20)))
                                                                            })();
                                                                        case 'Fm.Term.app':
                                                                            var $1196 = self.func;
                                                                            var $1197 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1198 = self.name;
                                                                            var $1199 = self.expr;
                                                                            var $1200 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1201 = self.name;
                                                                            var $1202 = self.expr;
                                                                            var $1203 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1204 = self.done;
                                                                            var $1205 = self.term;
                                                                            var $1206 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1207 = self.name;
                                                                            var $1208 = self.dref;
                                                                            var $1209 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1210 = self.path;
                                                                            return Fm$Term$equal$patch($1210)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1211 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1212 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1213 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1214 = self.path;
                                                                            var $1215 = self.expr;
                                                                            var $1216 = self.name;
                                                                            var $1217 = self.with;
                                                                            var $1218 = self.cses;
                                                                            var $1219 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1220 = self.orig;
                                                                            var $1221 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.app':
                                                                var $1222 = self.func;
                                                                var $1223 = self.argm;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1224 = self.name;
                                                                            var $1225 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1226 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1227 = self.eras;
                                                                            var $1228 = self.self;
                                                                            var $1229 = self.name;
                                                                            var $1230 = self.xtyp;
                                                                            var $1231 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1232 = self.name;
                                                                            var $1233 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1234 = self.func;
                                                                            var $1235 = self.argm;
                                                                            return (() => {
                                                                                var _seen$17 = Set$set(_id$12)(_seen$5);
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1222)($1234)(_defs$3)(_lv$4)(_seen$17))((_eq_func$18 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1223)($1235)(_defs$3)(_lv$4)(_seen$17))((_eq_argm$19 => Monad$pure(Fm$Check$monad)((_eq_func$18 && _eq_argm$19))))))
                                                                            })();
                                                                        case 'Fm.Term.let':
                                                                            var $1236 = self.name;
                                                                            var $1237 = self.expr;
                                                                            var $1238 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1239 = self.name;
                                                                            var $1240 = self.expr;
                                                                            var $1241 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1242 = self.done;
                                                                            var $1243 = self.term;
                                                                            var $1244 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1245 = self.name;
                                                                            var $1246 = self.dref;
                                                                            var $1247 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1248 = self.path;
                                                                            return Fm$Term$equal$patch($1248)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1249 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1250 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1251 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1252 = self.path;
                                                                            var $1253 = self.expr;
                                                                            var $1254 = self.name;
                                                                            var $1255 = self.with;
                                                                            var $1256 = self.cses;
                                                                            var $1257 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1258 = self.orig;
                                                                            var $1259 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.let':
                                                                var $1260 = self.name;
                                                                var $1261 = self.expr;
                                                                var $1262 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1263 = self.name;
                                                                            var $1264 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1265 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1266 = self.eras;
                                                                            var $1267 = self.self;
                                                                            var $1268 = self.name;
                                                                            var $1269 = self.xtyp;
                                                                            var $1270 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1271 = self.name;
                                                                            var $1272 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1273 = self.func;
                                                                            var $1274 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1275 = self.name;
                                                                            var $1276 = self.expr;
                                                                            var $1277 = self.body;
                                                                            return (() => {
                                                                                var _seen$19 = Set$set(_id$12)(_seen$5);
                                                                                var _a1_body$20 = $1262(Fm$Term$var($1260)(_lv$4));
                                                                                var _b1_body$21 = $1277(Fm$Term$var($1275)(_lv$4));
                                                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1261)($1276)(_defs$3)(_lv$4)(_seen$19))((_eq_expr$22 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$20)(_b1_body$21)(_defs$3)(Nat$succ(_lv$4))(_seen$19))((_eq_body$23 => Monad$pure(Fm$Check$monad)((_eq_expr$22 && _eq_body$23))))))
                                                                            })();
                                                                        case 'Fm.Term.def':
                                                                            var $1278 = self.name;
                                                                            var $1279 = self.expr;
                                                                            var $1280 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1281 = self.done;
                                                                            var $1282 = self.term;
                                                                            var $1283 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1284 = self.name;
                                                                            var $1285 = self.dref;
                                                                            var $1286 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1287 = self.path;
                                                                            return Fm$Term$equal$patch($1287)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1288 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1289 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1290 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1291 = self.path;
                                                                            var $1292 = self.expr;
                                                                            var $1293 = self.name;
                                                                            var $1294 = self.with;
                                                                            var $1295 = self.cses;
                                                                            var $1296 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1297 = self.orig;
                                                                            var $1298 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.def':
                                                                var $1299 = self.name;
                                                                var $1300 = self.expr;
                                                                var $1301 = self.body;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1302 = self.name;
                                                                            var $1303 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1304 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1305 = self.eras;
                                                                            var $1306 = self.self;
                                                                            var $1307 = self.name;
                                                                            var $1308 = self.xtyp;
                                                                            var $1309 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1310 = self.name;
                                                                            var $1311 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1312 = self.func;
                                                                            var $1313 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1314 = self.name;
                                                                            var $1315 = self.expr;
                                                                            var $1316 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1317 = self.name;
                                                                            var $1318 = self.expr;
                                                                            var $1319 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1320 = self.done;
                                                                            var $1321 = self.term;
                                                                            var $1322 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1323 = self.name;
                                                                            var $1324 = self.dref;
                                                                            var $1325 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1326 = self.path;
                                                                            return Fm$Term$equal$patch($1326)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1327 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1328 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1329 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1330 = self.path;
                                                                            var $1331 = self.expr;
                                                                            var $1332 = self.name;
                                                                            var $1333 = self.with;
                                                                            var $1334 = self.cses;
                                                                            var $1335 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1336 = self.orig;
                                                                            var $1337 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ann':
                                                                var $1338 = self.done;
                                                                var $1339 = self.term;
                                                                var $1340 = self.type;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1341 = self.name;
                                                                            var $1342 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1343 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1344 = self.eras;
                                                                            var $1345 = self.self;
                                                                            var $1346 = self.name;
                                                                            var $1347 = self.xtyp;
                                                                            var $1348 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1349 = self.name;
                                                                            var $1350 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1351 = self.func;
                                                                            var $1352 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1353 = self.name;
                                                                            var $1354 = self.expr;
                                                                            var $1355 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1356 = self.name;
                                                                            var $1357 = self.expr;
                                                                            var $1358 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1359 = self.done;
                                                                            var $1360 = self.term;
                                                                            var $1361 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1362 = self.name;
                                                                            var $1363 = self.dref;
                                                                            var $1364 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1365 = self.path;
                                                                            return Fm$Term$equal$patch($1365)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1366 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1367 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1368 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1369 = self.path;
                                                                            var $1370 = self.expr;
                                                                            var $1371 = self.name;
                                                                            var $1372 = self.with;
                                                                            var $1373 = self.cses;
                                                                            var $1374 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1375 = self.orig;
                                                                            var $1376 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.gol':
                                                                var $1377 = self.name;
                                                                var $1378 = self.dref;
                                                                var $1379 = self.verb;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1380 = self.name;
                                                                            var $1381 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1382 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1383 = self.eras;
                                                                            var $1384 = self.self;
                                                                            var $1385 = self.name;
                                                                            var $1386 = self.xtyp;
                                                                            var $1387 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1388 = self.name;
                                                                            var $1389 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1390 = self.func;
                                                                            var $1391 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1392 = self.name;
                                                                            var $1393 = self.expr;
                                                                            var $1394 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1395 = self.name;
                                                                            var $1396 = self.expr;
                                                                            var $1397 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1398 = self.done;
                                                                            var $1399 = self.term;
                                                                            var $1400 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1401 = self.name;
                                                                            var $1402 = self.dref;
                                                                            var $1403 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1404 = self.path;
                                                                            return Fm$Term$equal$patch($1404)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1405 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1406 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1407 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1408 = self.path;
                                                                            var $1409 = self.expr;
                                                                            var $1410 = self.name;
                                                                            var $1411 = self.with;
                                                                            var $1412 = self.cses;
                                                                            var $1413 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1414 = self.orig;
                                                                            var $1415 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.hol':
                                                                var $1416 = self.path;
                                                                return Fm$Term$equal$patch($1416)(_b$2);
                                                            case 'Fm.Term.nat':
                                                                var $1417 = self.natx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1418 = self.name;
                                                                            var $1419 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1420 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1421 = self.eras;
                                                                            var $1422 = self.self;
                                                                            var $1423 = self.name;
                                                                            var $1424 = self.xtyp;
                                                                            var $1425 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1426 = self.name;
                                                                            var $1427 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1428 = self.func;
                                                                            var $1429 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1430 = self.name;
                                                                            var $1431 = self.expr;
                                                                            var $1432 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1433 = self.name;
                                                                            var $1434 = self.expr;
                                                                            var $1435 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1436 = self.done;
                                                                            var $1437 = self.term;
                                                                            var $1438 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1439 = self.name;
                                                                            var $1440 = self.dref;
                                                                            var $1441 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1442 = self.path;
                                                                            return Fm$Term$equal$patch($1442)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1443 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1444 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1445 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1446 = self.path;
                                                                            var $1447 = self.expr;
                                                                            var $1448 = self.name;
                                                                            var $1449 = self.with;
                                                                            var $1450 = self.cses;
                                                                            var $1451 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1452 = self.orig;
                                                                            var $1453 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.chr':
                                                                var $1454 = self.chrx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1455 = self.name;
                                                                            var $1456 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1457 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1458 = self.eras;
                                                                            var $1459 = self.self;
                                                                            var $1460 = self.name;
                                                                            var $1461 = self.xtyp;
                                                                            var $1462 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1463 = self.name;
                                                                            var $1464 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1465 = self.func;
                                                                            var $1466 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1467 = self.name;
                                                                            var $1468 = self.expr;
                                                                            var $1469 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1470 = self.name;
                                                                            var $1471 = self.expr;
                                                                            var $1472 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1473 = self.done;
                                                                            var $1474 = self.term;
                                                                            var $1475 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1476 = self.name;
                                                                            var $1477 = self.dref;
                                                                            var $1478 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1479 = self.path;
                                                                            return Fm$Term$equal$patch($1479)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1480 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1481 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1482 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1483 = self.path;
                                                                            var $1484 = self.expr;
                                                                            var $1485 = self.name;
                                                                            var $1486 = self.with;
                                                                            var $1487 = self.cses;
                                                                            var $1488 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1489 = self.orig;
                                                                            var $1490 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.str':
                                                                var $1491 = self.strx;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1492 = self.name;
                                                                            var $1493 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1494 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1495 = self.eras;
                                                                            var $1496 = self.self;
                                                                            var $1497 = self.name;
                                                                            var $1498 = self.xtyp;
                                                                            var $1499 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1500 = self.name;
                                                                            var $1501 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1502 = self.func;
                                                                            var $1503 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1504 = self.name;
                                                                            var $1505 = self.expr;
                                                                            var $1506 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1507 = self.name;
                                                                            var $1508 = self.expr;
                                                                            var $1509 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1510 = self.done;
                                                                            var $1511 = self.term;
                                                                            var $1512 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1513 = self.name;
                                                                            var $1514 = self.dref;
                                                                            var $1515 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1516 = self.path;
                                                                            return Fm$Term$equal$patch($1516)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1517 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1518 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1519 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1520 = self.path;
                                                                            var $1521 = self.expr;
                                                                            var $1522 = self.name;
                                                                            var $1523 = self.with;
                                                                            var $1524 = self.cses;
                                                                            var $1525 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1526 = self.orig;
                                                                            var $1527 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.cse':
                                                                var $1528 = self.path;
                                                                var $1529 = self.expr;
                                                                var $1530 = self.name;
                                                                var $1531 = self.with;
                                                                var $1532 = self.cses;
                                                                var $1533 = self.moti;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1534 = self.name;
                                                                            var $1535 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1536 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1537 = self.eras;
                                                                            var $1538 = self.self;
                                                                            var $1539 = self.name;
                                                                            var $1540 = self.xtyp;
                                                                            var $1541 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1542 = self.name;
                                                                            var $1543 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1544 = self.func;
                                                                            var $1545 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1546 = self.name;
                                                                            var $1547 = self.expr;
                                                                            var $1548 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1549 = self.name;
                                                                            var $1550 = self.expr;
                                                                            var $1551 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1552 = self.done;
                                                                            var $1553 = self.term;
                                                                            var $1554 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1555 = self.name;
                                                                            var $1556 = self.dref;
                                                                            var $1557 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1558 = self.path;
                                                                            return Fm$Term$equal$patch($1558)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1559 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1560 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1561 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1562 = self.path;
                                                                            var $1563 = self.expr;
                                                                            var $1564 = self.name;
                                                                            var $1565 = self.with;
                                                                            var $1566 = self.cses;
                                                                            var $1567 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1568 = self.orig;
                                                                            var $1569 = self.expr;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                    }
                                                                })();
                                                            case 'Fm.Term.ori':
                                                                var $1570 = self.orig;
                                                                var $1571 = self.expr;
                                                                return (() => {
                                                                    var self = _b1$9;
                                                                    switch (self._) {
                                                                        case 'Fm.Term.var':
                                                                            var $1572 = self.name;
                                                                            var $1573 = self.indx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ref':
                                                                            var $1574 = self.name;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.typ':
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.all':
                                                                            var $1575 = self.eras;
                                                                            var $1576 = self.self;
                                                                            var $1577 = self.name;
                                                                            var $1578 = self.xtyp;
                                                                            var $1579 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.lam':
                                                                            var $1580 = self.name;
                                                                            var $1581 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.app':
                                                                            var $1582 = self.func;
                                                                            var $1583 = self.argm;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.let':
                                                                            var $1584 = self.name;
                                                                            var $1585 = self.expr;
                                                                            var $1586 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.def':
                                                                            var $1587 = self.name;
                                                                            var $1588 = self.expr;
                                                                            var $1589 = self.body;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ann':
                                                                            var $1590 = self.done;
                                                                            var $1591 = self.term;
                                                                            var $1592 = self.type;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.gol':
                                                                            var $1593 = self.name;
                                                                            var $1594 = self.dref;
                                                                            var $1595 = self.verb;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.hol':
                                                                            var $1596 = self.path;
                                                                            return Fm$Term$equal$patch($1596)(_a$1);
                                                                        case 'Fm.Term.nat':
                                                                            var $1597 = self.natx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.chr':
                                                                            var $1598 = self.chrx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.str':
                                                                            var $1599 = self.strx;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.cse':
                                                                            var $1600 = self.path;
                                                                            var $1601 = self.expr;
                                                                            var $1602 = self.name;
                                                                            var $1603 = self.with;
                                                                            var $1604 = self.cses;
                                                                            var $1605 = self.moti;
                                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                                        case 'Fm.Term.ori':
                                                                            var $1606 = self.orig;
                                                                            var $1607 = self.expr;
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
                var $1608 = self.name;
                var $1609 = self.indx;
                return (() => {
                    var self = List$at_last($1609)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1608))(List$nil));
                        case 'Maybe.some':
                            var $1610 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1610;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1611 = self.fst;
                                        var $1612 = self.snd;
                                        return $1612;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1613 = self.name;
                return (() => {
                    var self = Fm$get($1613)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference(_orig$6)($1613))(List$nil));
                        case 'Maybe.some':
                            var $1614 = self.value;
                            return (() => {
                                var self = $1614;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1615 = self.file;
                                        var $1616 = self.name;
                                        var $1617 = self.term;
                                        var $1618 = self.type;
                                        var $1619 = self.stat;
                                        return (() => {
                                            var _ref_name$14 = $1616;
                                            var _ref_type$15 = $1618;
                                            var _ref_term$16 = $1617;
                                            var _ref_stat$17 = $1619;
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
                                                        var $1620 = self.errors;
                                                        return Fm$Check$result(Maybe$some(_ref_type$15))(List$cons(Fm$Error$indirect(_ref_name$14))(List$nil));
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
                var $1621 = self.eras;
                var $1622 = self.self;
                var $1623 = self.name;
                var $1624 = self.xtyp;
                var $1625 = self.body;
                return (() => {
                    var _ctx_size$12 = List$length(_ctx$4);
                    var _self_var$13 = Fm$Term$var($1622)(_ctx_size$12);
                    var _body_var$14 = Fm$Term$var($1623)(Nat$succ(_ctx_size$12));
                    var _body_ctx$15 = List$cons(Pair$new($1623)($1624))(List$cons(Pair$new($1622)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1624)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_$16 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1625(_self_var$13)(_body_var$14))(Maybe$some(Fm$Term$typ))(_defs$3)(_body_ctx$15)(Fm$MPath$1(_path$5))(_orig$6))((_$17 => Monad$pure(Fm$Check$monad)(Fm$Term$typ)))))
                })();
            case 'Fm.Term.lam':
                var $1626 = self.name;
                var $1627 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1628 = self.value;
                            return (() => {
                                var _typv$10 = Fm$Term$reduce($1628)(_defs$3);
                                return (() => {
                                    var self = _typv$10;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1629 = self.name;
                                            var $1630 = self.indx;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1631 = self.name;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1632 = self.eras;
                                            var $1633 = self.self;
                                            var $1634 = self.name;
                                            var $1635 = self.xtyp;
                                            var $1636 = self.body;
                                            return (() => {
                                                var _ctx_size$16 = List$length(_ctx$4);
                                                var _self_var$17 = _term$1;
                                                var _body_var$18 = Fm$Term$var($1626)(_ctx_size$16);
                                                var _body_typ$19 = $1636(_self_var$17)(_body_var$18);
                                                var _body_ctx$20 = List$cons(Pair$new($1626)($1635))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1627(_body_var$18))(Maybe$some(_body_typ$19))(_defs$3)(_body_ctx$20)(Fm$MPath$0(_path$5))(_orig$6))((_$21 => Monad$pure(Fm$Check$monad)($1628)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1637 = self.name;
                                            var $1638 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1639 = self.func;
                                            var $1640 = self.argm;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1641 = self.name;
                                            var $1642 = self.expr;
                                            var $1643 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1644 = self.name;
                                            var $1645 = self.expr;
                                            var $1646 = self.body;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1647 = self.done;
                                            var $1648 = self.term;
                                            var $1649 = self.type;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1650 = self.name;
                                            var $1651 = self.dref;
                                            var $1652 = self.verb;
                                            return (() => {
                                                var _expected$14 = Either$left("Function");
                                                var _detected$15 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1653 = self.path;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1654 = self.natx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1655 = self.chrx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1656 = self.strx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1657 = self.path;
                                            var $1658 = self.expr;
                                            var $1659 = self.name;
                                            var $1660 = self.with;
                                            var $1661 = self.cses;
                                            var $1662 = self.moti;
                                            return (() => {
                                                var _expected$17 = Either$left("Function");
                                                var _detected$18 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ori':
                                            var $1663 = self.orig;
                                            var $1664 = self.expr;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1628);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1665 = self.func;
                var $1666 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1665)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_func_typ$9 => (() => {
                    var _func_typ$10 = Fm$Term$reduce(_func_typ$9)(_defs$3);
                    return (() => {
                        var self = _func_typ$10;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1667 = self.name;
                                var $1668 = self.indx;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1669 = self.name;
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
                                var $1670 = self.eras;
                                var $1671 = self.self;
                                var $1672 = self.name;
                                var $1673 = self.xtyp;
                                var $1674 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1666)(Maybe$some($1673))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5))(_orig$6))((_$16 => Monad$pure(Fm$Check$monad)($1674($1665)($1666))));
                            case 'Fm.Term.lam':
                                var $1675 = self.name;
                                var $1676 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1677 = self.func;
                                var $1678 = self.argm;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $1679 = self.name;
                                var $1680 = self.expr;
                                var $1681 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $1682 = self.name;
                                var $1683 = self.expr;
                                var $1684 = self.body;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $1685 = self.done;
                                var $1686 = self.term;
                                var $1687 = self.type;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $1688 = self.name;
                                var $1689 = self.dref;
                                var $1690 = self.verb;
                                return (() => {
                                    var _expected$14 = Either$left("Function");
                                    var _detected$15 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$14)(_detected$15)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $1691 = self.path;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $1692 = self.natx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $1693 = self.chrx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $1694 = self.strx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $1695 = self.path;
                                var $1696 = self.expr;
                                var $1697 = self.name;
                                var $1698 = self.with;
                                var $1699 = self.cses;
                                var $1700 = self.moti;
                                return (() => {
                                    var _expected$17 = Either$left("Function");
                                    var _detected$18 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$17)(_detected$18)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ori':
                                var $1701 = self.orig;
                                var $1702 = self.expr;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$10);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $1703 = self.name;
                var $1704 = self.expr;
                var $1705 = self.body;
                return (() => {
                    var _ctx_size$10 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1704)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_expr_typ$11 => (() => {
                        var _body_val$12 = $1705(Fm$Term$var($1703)(_ctx_size$10));
                        var _body_ctx$13 = List$cons(Pair$new($1703)(_expr_typ$11))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$12)(_type$2)(_defs$3)(_body_ctx$13)(Fm$MPath$1(_path$5))(_orig$6))((_body_typ$14 => Monad$pure(Fm$Check$monad)(_body_typ$14)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $1706 = self.name;
                var $1707 = self.expr;
                var $1708 = self.body;
                return Fm$Term$check($1708($1707))(_type$2)(_defs$3)(_ctx$4)(_path$5)(_orig$6);
            case 'Fm.Term.ann':
                var $1709 = self.done;
                var $1710 = self.term;
                var $1711 = self.type;
                return (() => {
                    var self = $1709;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1711);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($1710)(Maybe$some($1711))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_$10 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1711)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5))(_orig$6))((_$11 => Monad$pure(Fm$Check$monad)($1711)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $1712 = self.name;
                var $1713 = self.dref;
                var $1714 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($1712)($1713)($1714)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $1715 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $1716 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Nat"));
            case 'Fm.Term.chr':
                var $1717 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Char"));
            case 'Fm.Term.str':
                var $1718 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("String"));
            case 'Fm.Term.cse':
                var $1719 = self.path;
                var $1720 = self.expr;
                var $1721 = self.name;
                var $1722 = self.with;
                var $1723 = self.cses;
                var $1724 = self.moti;
                return (() => {
                    var _expr$13 = $1720;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$13)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5))(_orig$6))((_etyp$14 => (() => {
                        var _dsug$15 = Fm$Term$desugar_cse($1720)($1721)($1722)($1723)($1724)(_etyp$14)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$15;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_orig$6)(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $1725 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($1725))(List$nil));
                            }
                        })()
                    })()))
                })();
            case 'Fm.Term.ori':
                var $1726 = self.orig;
                var $1727 = self.expr;
                return Fm$Term$check($1727)(_type$2)(_defs$3)(_ctx$4)(_path$5)(Maybe$some($1726));
        }
    })())((_infr$7 => (() => {
        var self = _type$2;
        switch (self._) {
            case 'Maybe.none':
                return Fm$Check$result(Maybe$some(_infr$7))(List$nil);
            case 'Maybe.some':
                var $1728 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1728)(_infr$7)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$9 => (() => {
                    var self = _eqls$9;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1728);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_orig$6)(Either$right($1728))(Either$right(_infr$7))(_ctx$4))(List$nil));
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
                var $1729 = self.head;
                var $1730 = self.tail;
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
                var $1731 = self.name;
                var $1732 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1733 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1734 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $1735 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1736 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1737 = self.slice(0, -1);
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
                            var $1738 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1739 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $1740 = self.eras;
                var $1741 = self.self;
                var $1742 = self.name;
                var $1743 = self.xtyp;
                var $1744 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1745 = self.slice(0, -1);
                            return Fm$Term$all($1740)($1741)($1742)(Fm$Term$patch_at($1745)($1743)(_fn$3))($1744);
                        case '1':
                            var $1746 = self.slice(0, -1);
                            return Fm$Term$all($1740)($1741)($1742)($1743)((_s$10 => (_x$11 => Fm$Term$patch_at($1746)($1744(_s$10)(_x$11))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $1747 = self.name;
                var $1748 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1749 = self.slice(0, -1);
                            return Fm$Term$lam($1747)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1748(_x$7))(_fn$3)));
                        case '1':
                            var $1750 = self.slice(0, -1);
                            return Fm$Term$lam($1747)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1748(_x$7))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $1751 = self.func;
                var $1752 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1753 = self.slice(0, -1);
                            return Fm$Term$app(Fm$Term$patch_at($1753)($1751)(_fn$3))($1752);
                        case '1':
                            var $1754 = self.slice(0, -1);
                            return Fm$Term$app($1751)(Fm$Term$patch_at($1754)($1752)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $1755 = self.name;
                var $1756 = self.expr;
                var $1757 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1758 = self.slice(0, -1);
                            return Fm$Term$let($1755)(Fm$Term$patch_at($1758)($1756)(_fn$3))($1757);
                        case '1':
                            var $1759 = self.slice(0, -1);
                            return Fm$Term$let($1755)($1756)((_x$8 => Fm$Term$patch_at($1759)($1757(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $1760 = self.name;
                var $1761 = self.expr;
                var $1762 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1763 = self.slice(0, -1);
                            return Fm$Term$def($1760)(Fm$Term$patch_at($1763)($1761)(_fn$3))($1762);
                        case '1':
                            var $1764 = self.slice(0, -1);
                            return Fm$Term$def($1760)($1761)((_x$8 => Fm$Term$patch_at($1764)($1762(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $1765 = self.done;
                var $1766 = self.term;
                var $1767 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1768 = self.slice(0, -1);
                            return Fm$Term$ann($1765)(Fm$Term$patch_at(_path$1)($1766)(_fn$3))($1767);
                        case '1':
                            var $1769 = self.slice(0, -1);
                            return Fm$Term$ann($1765)(Fm$Term$patch_at(_path$1)($1766)(_fn$3))($1767);
                    }
                })();
            case 'Fm.Term.gol':
                var $1770 = self.name;
                var $1771 = self.dref;
                var $1772 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1773 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1774 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $1775 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1776 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1777 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $1778 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1779 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1780 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $1781 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1782 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1783 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $1784 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1785 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1786 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $1787 = self.path;
                var $1788 = self.expr;
                var $1789 = self.name;
                var $1790 = self.with;
                var $1791 = self.cses;
                var $1792 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1793 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1794 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ori':
                var $1795 = self.orig;
                var $1796 = self.expr;
                return Fm$Term$patch_at(_path$1)($1796)(_fn$3);
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
                        var $1797 = self.head;
                        var $1798 = self.tail;
                        return (() => {
                            var self = $1797;
                            switch (self._) {
                                case 'Fm.Error.type_mismatch':
                                    var $1799 = self.origin;
                                    var $1800 = self.expected;
                                    var $1801 = self.detected;
                                    var $1802 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($1798)(_fixd$7);
                                case 'Fm.Error.show_goal':
                                    var $1803 = self.name;
                                    var $1804 = self.dref;
                                    var $1805 = self.verb;
                                    var $1806 = self.goal;
                                    var $1807 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($1798)(_fixd$7);
                                case 'Fm.Error.waiting':
                                    var $1808 = self.name;
                                    return (() => {
                                        var _defs$11 = Fm$Synth$one($1808)(_defs$5);
                                        return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$11)($1798)(Bool$true)
                                    })();
                                case 'Fm.Error.indirect':
                                    var $1809 = self.name;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($1798)(_fixd$7);
                                case 'Fm.Error.patch':
                                    var $1810 = self.path;
                                    var $1811 = self.term;
                                    return (() => {
                                        var self = $1810;
                                        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                            case 'nil':
                                                return Maybe$none;
                                            case '0':
                                                var $1812 = self.slice(0, -1);
                                                return (() => {
                                                    var _term$13 = Fm$Term$patch_at($1812)(_term$3)((_x$13 => $1811));
                                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$13)(_type$4)(_defs$5)($1798)(Bool$true)
                                                })();
                                            case '1':
                                                var $1813 = self.slice(0, -1);
                                                return (() => {
                                                    var _type$13 = Fm$Term$patch_at($1813)(_type$4)((_x$13 => $1811));
                                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$13)(_defs$5)($1798)(Bool$true)
                                                })();
                                        }
                                    })();
                                case 'Fm.Error.undefined_reference':
                                    var $1814 = self.origin;
                                    var $1815 = self.name;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($1798)(_fixd$7);
                                case 'Fm.Error.cant_infer':
                                    var $1816 = self.origin;
                                    var $1817 = self.term;
                                    var $1818 = self.context;
                                    return Fm$Synth$fix(_file$1)(_name$2)(_term$3)(_type$4)(_defs$5)($1798)(_fixd$7);
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
                        var $1819 = self.value;
                        return (() => {
                            var self = $1819;
                            switch (self._) {
                                case 'Fm.Def.new':
                                    var $1820 = self.file;
                                    var $1821 = self.name;
                                    var $1822 = self.term;
                                    var $1823 = self.type;
                                    var $1824 = self.stat;
                                    return (() => {
                                        var _file$9 = $1820;
                                        var _name$10 = $1821;
                                        var _term$11 = $1822;
                                        var _type$12 = $1823;
                                        var _stat$13 = $1824;
                                        return (() => {
                                            var self = _stat$13;
                                            switch (self._) {
                                                case 'Fm.Status.init':
                                                    return (() => {
                                                        var _defs$14 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(Fm$Status$wait))(_defs$2);
                                                        var _checked$15 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$12)(Maybe$some(Fm$Term$typ))(_defs$14)(List$nil)(Fm$MPath$1(Fm$MPath$nil))(Maybe$none))((_chk_type$15 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$11)(Maybe$some(_type$12))(_defs$14)(List$nil)(Fm$MPath$0(Fm$MPath$nil))(Maybe$none))((_chk_term$16 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                                                        return (() => {
                                                            var self = _checked$15;
                                                            switch (self._) {
                                                                case 'Fm.Check.result':
                                                                    var $1825 = self.value;
                                                                    var $1826 = self.errors;
                                                                    return (() => {
                                                                        var self = List$is_empty($1826);
                                                                        switch (self ? 'true' : 'false') {
                                                                            case 'true':
                                                                                return (() => {
                                                                                    var _defs$18 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(Fm$Status$done))(_defs$14);
                                                                                    return _defs$18
                                                                                })();
                                                                            case 'false':
                                                                                return (() => {
                                                                                    var _fixed$18 = Fm$Synth$fix(_file$9)(_name$10)(_term$11)(_type$12)(_defs$14)($1826)(Bool$false);
                                                                                    return (() => {
                                                                                        var self = _fixed$18;
                                                                                        switch (self._) {
                                                                                            case 'Maybe.none':
                                                                                                return (() => {
                                                                                                    var _stat$19 = Fm$Status$fail($1826);
                                                                                                    var _defs$20 = Fm$set(_name$10)(Fm$Def$new(_file$9)(_name$10)(_term$11)(_type$12)(_stat$19))(_defs$14);
                                                                                                    return _defs$20
                                                                                                })();
                                                                                            case 'Maybe.some':
                                                                                                var $1827 = self.value;
                                                                                                return Fm$Synth$one(_name$10)($1827);
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
                                                    var $1828 = self.errors;
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
        var _defs$2 = (list_for(Map$values(_defs$1))(_defs$1)((_defn$2 => (_defs$3 => (() => {
            var self = _defn$2;
            switch (self._) {
                case 'Fm.Def.new':
                    var $1829 = self.file;
                    var $1830 = self.name;
                    var $1831 = self.term;
                    var $1832 = self.type;
                    var $1833 = self.stat;
                    return Fm$Synth$one($1830)(_defs$3);
            }
        })()))));
        return _defs$2
    })());
    var Fm$to_core_all = (_files$1 => Fm$exec(_files$1)((_defs$2 => Fm$Defs$core(Fm$Synth$all(_defs$2)))));
    var Fm$Synth$file = (_file$1 => (_defs$2 => (() => {
        var _defs$3 = (list_for(Map$values(_defs$2))(_defs$2)((_defn$3 => (_defs$4 => (() => {
            var self = _defn$3;
            switch (self._) {
                case 'Fm.Def.new':
                    var $1834 = self.file;
                    var $1835 = self.name;
                    var $1836 = self.term;
                    var $1837 = self.type;
                    var $1838 = self.stat;
                    return (() => {
                        var self = ($1834 === _file$1);
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Fm$Synth$one($1835)(_defs$4);
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
                var $1839 = self.head;
                var $1840 = self.tail;
                return (() => {
                    var _keep$5 = (() => {
                        var self = $1839;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $1841 = self.origin;
                                var $1842 = self.expected;
                                var $1843 = self.detected;
                                var $1844 = self.context;
                                return (!_got$2);
                            case 'Fm.Error.show_goal':
                                var $1845 = self.name;
                                var $1846 = self.dref;
                                var $1847 = self.verb;
                                var $1848 = self.goal;
                                var $1849 = self.context;
                                return Bool$true;
                            case 'Fm.Error.waiting':
                                var $1850 = self.name;
                                return Bool$false;
                            case 'Fm.Error.indirect':
                                var $1851 = self.name;
                                return Bool$false;
                            case 'Fm.Error.patch':
                                var $1852 = self.path;
                                var $1853 = self.term;
                                return Bool$false;
                            case 'Fm.Error.undefined_reference':
                                var $1854 = self.origin;
                                var $1855 = self.name;
                                return (!_got$2);
                            case 'Fm.Error.cant_infer':
                                var $1856 = self.origin;
                                var $1857 = self.term;
                                var $1858 = self.context;
                                return (!_got$2);
                        }
                    })();
                    var _got$6 = (() => {
                        var self = $1839;
                        switch (self._) {
                            case 'Fm.Error.type_mismatch':
                                var $1859 = self.origin;
                                var $1860 = self.expected;
                                var $1861 = self.detected;
                                var $1862 = self.context;
                                return Bool$true;
                            case 'Fm.Error.show_goal':
                                var $1863 = self.name;
                                var $1864 = self.dref;
                                var $1865 = self.verb;
                                var $1866 = self.goal;
                                var $1867 = self.context;
                                return _got$2;
                            case 'Fm.Error.waiting':
                                var $1868 = self.name;
                                return _got$2;
                            case 'Fm.Error.indirect':
                                var $1869 = self.name;
                                return _got$2;
                            case 'Fm.Error.patch':
                                var $1870 = self.path;
                                var $1871 = self.term;
                                return _got$2;
                            case 'Fm.Error.undefined_reference':
                                var $1872 = self.origin;
                                var $1873 = self.name;
                                return Bool$true;
                            case 'Fm.Error.cant_infer':
                                var $1874 = self.origin;
                                var $1875 = self.term;
                                var $1876 = self.context;
                                return _got$2;
                        }
                    })();
                    var _tail$7 = Fm$Error$relevant($1840)(_got$6);
                    return (() => {
                        var self = _keep$5;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return List$cons($1839)(_tail$7);
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
                var $1877 = self.value;
                return _f$4($1877);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1878 = self.name;
                var $1879 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1880 = self.name;
                return (() => {
                    var self = ($1880 === "Nat.zero");
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
                var $1881 = self.eras;
                var $1882 = self.self;
                var $1883 = self.name;
                var $1884 = self.xtyp;
                var $1885 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $1886 = self.name;
                var $1887 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1888 = self.func;
                var $1889 = self.argm;
                return (() => {
                    var self = $1888;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $1890 = self.name;
                            var $1891 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $1892 = self.name;
                            return (() => {
                                var self = ($1892 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($1889))((_pred$5 => Monad$pure(Maybe$monad)(Nat$succ(_pred$5))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $1893 = self.eras;
                            var $1894 = self.self;
                            var $1895 = self.name;
                            var $1896 = self.xtyp;
                            var $1897 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $1898 = self.name;
                            var $1899 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $1900 = self.func;
                            var $1901 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $1902 = self.name;
                            var $1903 = self.expr;
                            var $1904 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $1905 = self.name;
                            var $1906 = self.expr;
                            var $1907 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $1908 = self.done;
                            var $1909 = self.term;
                            var $1910 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $1911 = self.name;
                            var $1912 = self.dref;
                            var $1913 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $1914 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $1915 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $1916 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $1917 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $1918 = self.path;
                            var $1919 = self.expr;
                            var $1920 = self.name;
                            var $1921 = self.with;
                            var $1922 = self.cses;
                            var $1923 = self.moti;
                            return Maybe$none;
                        case 'Fm.Term.ori':
                            var $1924 = self.orig;
                            var $1925 = self.expr;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $1926 = self.name;
                var $1927 = self.expr;
                var $1928 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1929 = self.name;
                var $1930 = self.expr;
                var $1931 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1932 = self.done;
                var $1933 = self.term;
                var $1934 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1935 = self.name;
                var $1936 = self.dref;
                var $1937 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1938 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1939 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1940 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1941 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1942 = self.path;
                var $1943 = self.expr;
                var $1944 = self.name;
                var $1945 = self.with;
                var $1946 = self.cses;
                var $1947 = self.moti;
                return Maybe$none;
            case 'Fm.Term.ori':
                var $1948 = self.orig;
                var $1949 = self.expr;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var Fm$Term$show$is_ref = (_term$1 => (_name$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1950 = self.name;
                var $1951 = self.indx;
                return Bool$false;
            case 'Fm.Term.ref':
                var $1952 = self.name;
                return (_name$2 === $1952);
            case 'Fm.Term.typ':
                return Bool$false;
            case 'Fm.Term.all':
                var $1953 = self.eras;
                var $1954 = self.self;
                var $1955 = self.name;
                var $1956 = self.xtyp;
                var $1957 = self.body;
                return Bool$false;
            case 'Fm.Term.lam':
                var $1958 = self.name;
                var $1959 = self.body;
                return Bool$false;
            case 'Fm.Term.app':
                var $1960 = self.func;
                var $1961 = self.argm;
                return Bool$false;
            case 'Fm.Term.let':
                var $1962 = self.name;
                var $1963 = self.expr;
                var $1964 = self.body;
                return Bool$false;
            case 'Fm.Term.def':
                var $1965 = self.name;
                var $1966 = self.expr;
                var $1967 = self.body;
                return Bool$false;
            case 'Fm.Term.ann':
                var $1968 = self.done;
                var $1969 = self.term;
                var $1970 = self.type;
                return Bool$false;
            case 'Fm.Term.gol':
                var $1971 = self.name;
                var $1972 = self.dref;
                var $1973 = self.verb;
                return Bool$false;
            case 'Fm.Term.hol':
                var $1974 = self.path;
                return Bool$false;
            case 'Fm.Term.nat':
                var $1975 = self.natx;
                return Bool$false;
            case 'Fm.Term.chr':
                var $1976 = self.chrx;
                return Bool$false;
            case 'Fm.Term.str':
                var $1977 = self.strx;
                return Bool$false;
            case 'Fm.Term.cse':
                var $1978 = self.path;
                var $1979 = self.expr;
                var $1980 = self.name;
                var $1981 = self.with;
                var $1982 = self.cses;
                var $1983 = self.moti;
                return Bool$false;
            case 'Fm.Term.ori':
                var $1984 = self.orig;
                var $1985 = self.expr;
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
                        var $1986 = self.name;
                        var $1987 = self.indx;
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
                                                        var $1988 = self.charCodeAt(0);
                                                        var $1989 = self.slice(1);
                                                        return ($1988 === 40);
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
                        var $1990 = self.name;
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
                                                        var $1991 = self.charCodeAt(0);
                                                        var $1992 = self.slice(1);
                                                        return ($1991 === 40);
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
                                                        var $1993 = self.charCodeAt(0);
                                                        var $1994 = self.slice(1);
                                                        return ($1993 === 40);
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
                        var $1995 = self.eras;
                        var $1996 = self.self;
                        var $1997 = self.name;
                        var $1998 = self.xtyp;
                        var $1999 = self.body;
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
                                                        var $2000 = self.charCodeAt(0);
                                                        var $2001 = self.slice(1);
                                                        return ($2000 === 40);
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
                        var $2002 = self.name;
                        var $2003 = self.body;
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
                                                        var $2004 = self.charCodeAt(0);
                                                        var $2005 = self.slice(1);
                                                        return ($2004 === 40);
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
                        var $2006 = self.func;
                        var $2007 = self.argm;
                        return (() => {
                            var _argm$6 = Fm$Term$show$go($2007)(Fm$MPath$1(_path$2));
                            return Fm$Term$show$app($2006)(Fm$MPath$0(_path$2))(List$cons(_argm$6)(_args$3))
                        })();
                    case 'Fm.Term.let':
                        var $2008 = self.name;
                        var $2009 = self.expr;
                        var $2010 = self.body;
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
                                                        var $2011 = self.charCodeAt(0);
                                                        var $2012 = self.slice(1);
                                                        return ($2011 === 40);
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
                        var $2013 = self.name;
                        var $2014 = self.expr;
                        var $2015 = self.body;
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
                                                        var $2016 = self.charCodeAt(0);
                                                        var $2017 = self.slice(1);
                                                        return ($2016 === 40);
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
                        var $2018 = self.done;
                        var $2019 = self.term;
                        var $2020 = self.type;
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
                                                        var $2021 = self.charCodeAt(0);
                                                        var $2022 = self.slice(1);
                                                        return ($2021 === 40);
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
                        var $2023 = self.name;
                        var $2024 = self.dref;
                        var $2025 = self.verb;
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
                                                        var $2026 = self.charCodeAt(0);
                                                        var $2027 = self.slice(1);
                                                        return ($2026 === 40);
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
                        var $2028 = self.path;
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
                                                        var $2029 = self.charCodeAt(0);
                                                        var $2030 = self.slice(1);
                                                        return ($2029 === 40);
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
                        var $2031 = self.natx;
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
                                                        var $2032 = self.charCodeAt(0);
                                                        var $2033 = self.slice(1);
                                                        return ($2032 === 40);
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
                        var $2034 = self.chrx;
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
                                                        var $2035 = self.charCodeAt(0);
                                                        var $2036 = self.slice(1);
                                                        return ($2035 === 40);
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
                        var $2037 = self.strx;
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
                                                        var $2038 = self.charCodeAt(0);
                                                        var $2039 = self.slice(1);
                                                        return ($2038 === 40);
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
                        var $2040 = self.path;
                        var $2041 = self.expr;
                        var $2042 = self.name;
                        var $2043 = self.with;
                        var $2044 = self.cses;
                        var $2045 = self.moti;
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
                                                        var $2046 = self.charCodeAt(0);
                                                        var $2047 = self.slice(1);
                                                        return ($2046 === 40);
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
                        var $2048 = self.orig;
                        var $2049 = self.expr;
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
                                                        var $2050 = self.charCodeAt(0);
                                                        var $2051 = self.slice(1);
                                                        return ($2050 === 40);
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
                var $2052 = self.val;
                var $2053 = self.lft;
                var $2054 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $2052;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $2055 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($2055))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($2053)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($2054)(Bits$1(_key$3))(_list1$9);
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
                var $2056 = self.slice(0, -1);
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
                            var $2057 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2056)($2057)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $2058 = self.slice(0, -1);
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
                            var $2059 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($2058)($2059)(_chunk$7)
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
                var $2060 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($2060)(Bits$nil));
                        case '0':
                            var $2061 = self.slice(0, -1);
                            return Word$0(Word$from_bits($2060)($2061));
                        case '1':
                            var $2062 = self.slice(0, -1);
                            return Word$1(Word$from_bits($2060)($2062));
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
                var $2063 = self.fst;
                var $2064 = self.snd;
                return $2063;
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
                            var $2065 = self.name;
                            var $2066 = self.indx;
                            return Fm$Name$show($2065);
                        case 'Fm.Term.ref':
                            var $2067 = self.name;
                            return (() => {
                                var _name$4 = Fm$Name$show($2067);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$4;
                                        case 'Maybe.some':
                                            var $2068 = self.value;
                                            return (() => {
                                                var _path_val$6 = (Bits$1(Bits$nil) + Fm$Path$to_bits($2068));
                                                var _path_str$7 = Nat$show(Bits$to_nat(_path_val$6));
                                                return String$flatten(List$cons(_name$4)(List$cons(Fm$color("2")(("-" + _path_str$7)))(List$nil)))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            return "Type";
                        case 'Fm.Term.all':
                            var $2069 = self.eras;
                            var $2070 = self.self;
                            var $2071 = self.name;
                            var $2072 = self.xtyp;
                            var $2073 = self.body;
                            return (() => {
                                var _eras$8 = $2069;
                                var _self$9 = Fm$Name$show($2070);
                                var _name$10 = Fm$Name$show($2071);
                                var _type$11 = Fm$Term$show$go($2072)(Fm$MPath$0(_path$2));
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
                                var _body$14 = Fm$Term$show$go($2073(Fm$Term$var($2070)(0n))(Fm$Term$var($2071)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$9)(List$cons(_open$12)(List$cons(_name$10)(List$cons(":")(List$cons(_type$11)(List$cons(_clos$13)(List$cons(" ")(List$cons(_body$14)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $2074 = self.name;
                            var $2075 = self.body;
                            return (() => {
                                var _name$5 = Fm$Name$show($2074);
                                var _body$6 = Fm$Term$show$go($2075(Fm$Term$var($2074)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$5)(List$cons(") ")(List$cons(_body$6)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $2076 = self.func;
                            var $2077 = self.argm;
                            return Fm$Term$show$app(_term$1)(_path$2)(List$nil);
                        case 'Fm.Term.let':
                            var $2078 = self.name;
                            var $2079 = self.expr;
                            var $2080 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2078);
                                var _expr$7 = Fm$Term$show$go($2079)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($2080(Fm$Term$var($2078)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $2081 = self.name;
                            var $2082 = self.expr;
                            var $2083 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($2081);
                                var _expr$7 = Fm$Term$show$go($2082)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($2083(Fm$Term$var($2081)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $2084 = self.done;
                            var $2085 = self.term;
                            var $2086 = self.type;
                            return (() => {
                                var _term$6 = Fm$Term$show$go($2085)(Fm$MPath$0(_path$2));
                                var _type$7 = Fm$Term$show$go($2086)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$6)(List$cons("::")(List$cons(_type$7)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $2087 = self.name;
                            var $2088 = self.dref;
                            var $2089 = self.verb;
                            return (() => {
                                var _name$6 = Fm$Name$show($2087);
                                return String$flatten(List$cons("?")(List$cons(_name$6)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $2090 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $2091 = self.natx;
                            return String$flatten(List$cons(Nat$show($2091))(List$nil));
                        case 'Fm.Term.chr':
                            var $2092 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($2092))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $2093 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($2093))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $2094 = self.path;
                            var $2095 = self.expr;
                            var $2096 = self.name;
                            var $2097 = self.with;
                            var $2098 = self.cses;
                            var $2099 = self.moti;
                            return (() => {
                                var _expr$9 = Fm$Term$show$go($2095)(Fm$MPath$0(_path$2));
                                var _name$10 = Fm$Name$show($2096);
                                var _wyth$11 = String$join("")(List$mapped($2097)((_defn$11 => (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $2100 = self.file;
                                            var $2101 = self.name;
                                            var $2102 = self.term;
                                            var $2103 = self.type;
                                            var $2104 = self.stat;
                                            return (() => {
                                                var _name$17 = Fm$Name$show($2101);
                                                var _type$18 = Fm$Term$show$go($2103)(Maybe$none);
                                                var _term$19 = Fm$Term$show$go($2102)(Maybe$none);
                                                return String$flatten(List$cons(_name$17)(List$cons(": ")(List$cons(_type$18)(List$cons(" = ")(List$cons(_term$19)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$12 = Map$to_list($2098);
                                var _cses$13 = String$join("")(List$mapped(_cses$12)((_x$13 => (() => {
                                    var _name$14 = Fm$Name$from_bits(Pair$fst(_x$13));
                                    var _term$15 = Fm$Term$show$go(Pair$snd(_x$13))(Maybe$none);
                                    return String$flatten(List$cons(_name$14)(List$cons(": ")(List$cons(_term$15)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$14 = Fm$Term$show$go($2099)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$9)(List$cons(" as ")(List$cons(_name$10)(List$cons(_wyth$11)(List$cons(" { ")(List$cons(_cses$13)(List$cons("} : ")(List$cons(_moti$14)(List$nil))))))))))
                            })();
                        case 'Fm.Term.ori':
                            var $2105 = self.orig;
                            var $2106 = self.expr;
                            return Fm$Term$show$go($2106)(_path$2);
                    }
                })();
            case 'Maybe.some':
                var $2107 = self.value;
                return $2107;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $2108 = self.head;
                var $2109 = self.tail;
                return (() => {
                    var self = $2108;
                    switch (self._) {
                        case 'Pair.new':
                            var $2110 = self.fst;
                            var $2111 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($2110);
                                var _type$7 = Fm$Term$show($2111);
                                var _rest$8 = Fm$Context$show($2109);
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
                var $2112 = self.name;
                var $2113 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $2114 = self.name;
                return (() => {
                    var self = Fm$get($2114)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($2114);
                        case 'Maybe.some':
                            var $2115 = self.value;
                            return (() => {
                                var self = $2115;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $2116 = self.file;
                                        var $2117 = self.name;
                                        var $2118 = self.term;
                                        var $2119 = self.type;
                                        var $2120 = self.stat;
                                        return $2118;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$4;
            case 'Fm.Term.all':
                var $2121 = self.eras;
                var $2122 = self.self;
                var $2123 = self.name;
                var $2124 = self.xtyp;
                var $2125 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $2126 = self.name;
                var $2127 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $2128 = self.func;
                var $2129 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $2130 = self.name;
                var $2131 = self.expr;
                var $2132 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $2133 = self.name;
                var $2134 = self.expr;
                var $2135 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $2136 = self.done;
                var $2137 = self.term;
                var $2138 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $2139 = self.name;
                var $2140 = self.dref;
                var $2141 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $2142 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $2143 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $2144 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $2145 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $2146 = self.path;
                var $2147 = self.expr;
                var $2148 = self.name;
                var $2149 = self.with;
                var $2150 = self.cses;
                var $2151 = self.moti;
                return _term$4;
            case 'Fm.Term.ori':
                var $2152 = self.orig;
                var $2153 = self.expr;
                return _term$4;
        }
    })())))));
    var Bool$or = a0 => a1 => (a0 || a1);
    var Fm$Term$expand_ct = (_term$1 => (_defs$2 => (_arity$3 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $2154 = self.name;
                var $2155 = self.indx;
                return Fm$Term$var($2154)($2155);
            case 'Fm.Term.ref':
                var $2156 = self.name;
                return (() => {
                    var _expand$5 = Bool$false;
                    var _expand$6 = ((($2156 === "Nat.succ") && (_arity$3 > 1n)) || _expand$5);
                    var _expand$7 = ((($2156 === "Nat.zero") && (_arity$3 > 0n)) || _expand$6);
                    var _expand$8 = ((($2156 === "Bool.true") && (_arity$3 > 0n)) || _expand$7);
                    var _expand$9 = ((($2156 === "Bool.false") && (_arity$3 > 0n)) || _expand$8);
                    return (() => {
                        var self = _expand$9;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return (() => {
                                    var self = Fm$get($2156)(_defs$2);
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return Fm$Term$ref($2156);
                                        case 'Maybe.some':
                                            var $2157 = self.value;
                                            return (() => {
                                                var self = $2157;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $2158 = self.file;
                                                        var $2159 = self.name;
                                                        var $2160 = self.term;
                                                        var $2161 = self.type;
                                                        var $2162 = self.stat;
                                                        return $2160;
                                                }
                                            })();
                                    }
                                })();
                            case 'false':
                                return Fm$Term$ref($2156);
                        }
                    })()
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $2163 = self.eras;
                var $2164 = self.self;
                var $2165 = self.name;
                var $2166 = self.xtyp;
                var $2167 = self.body;
                return Fm$Term$all($2163)($2164)($2165)(Fm$Term$expand_ct($2166)(_defs$2)(0n))((_s$9 => (_x$10 => Fm$Term$expand_ct($2167(_s$9)(_x$10))(_defs$2)(0n))));
            case 'Fm.Term.lam':
                var $2168 = self.name;
                var $2169 = self.body;
                return Fm$Term$lam($2168)((_x$6 => Fm$Term$expand_ct($2169(_x$6))(_defs$2)(0n)));
            case 'Fm.Term.app':
                var $2170 = self.func;
                var $2171 = self.argm;
                return Fm$Term$app(Fm$Term$expand_ct($2170)(_defs$2)(Nat$succ(_arity$3)))(Fm$Term$expand_ct($2171)(_defs$2)(0n));
            case 'Fm.Term.let':
                var $2172 = self.name;
                var $2173 = self.expr;
                var $2174 = self.body;
                return Fm$Term$let($2172)(Fm$Term$expand_ct($2173)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2174(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.def':
                var $2175 = self.name;
                var $2176 = self.expr;
                var $2177 = self.body;
                return Fm$Term$def($2175)(Fm$Term$expand_ct($2176)(_defs$2)(0n))((_x$7 => Fm$Term$expand_ct($2177(_x$7))(_defs$2)(0n)));
            case 'Fm.Term.ann':
                var $2178 = self.done;
                var $2179 = self.term;
                var $2180 = self.type;
                return Fm$Term$ann($2178)(Fm$Term$expand_ct($2179)(_defs$2)(0n))(Fm$Term$expand_ct($2180)(_defs$2)(0n));
            case 'Fm.Term.gol':
                var $2181 = self.name;
                var $2182 = self.dref;
                var $2183 = self.verb;
                return Fm$Term$gol($2181)($2182)($2183);
            case 'Fm.Term.hol':
                var $2184 = self.path;
                return Fm$Term$hol($2184);
            case 'Fm.Term.nat':
                var $2185 = self.natx;
                return Fm$Term$nat($2185);
            case 'Fm.Term.chr':
                var $2186 = self.chrx;
                return Fm$Term$chr($2186);
            case 'Fm.Term.str':
                var $2187 = self.strx;
                return Fm$Term$str($2187);
            case 'Fm.Term.cse':
                var $2188 = self.path;
                var $2189 = self.expr;
                var $2190 = self.name;
                var $2191 = self.with;
                var $2192 = self.cses;
                var $2193 = self.moti;
                return _term$1;
            case 'Fm.Term.ori':
                var $2194 = self.orig;
                var $2195 = self.expr;
                return Fm$Term$ori($2194)($2195);
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
                var $2196 = self.origin;
                var $2197 = self.expected;
                var $2198 = self.detected;
                var $2199 = self.context;
                return (() => {
                    var _expected$7 = (() => {
                        var self = $2197;
                        switch (self._) {
                            case 'Either.left':
                                var $2200 = self.value;
                                return $2200;
                            case 'Either.right':
                                var $2201 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2201)(Map$new));
                        }
                    })();
                    var _detected$8 = (() => {
                        var self = $2198;
                        switch (self._) {
                            case 'Either.left':
                                var $2202 = self.value;
                                return $2202;
                            case 'Either.right':
                                var $2203 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($2203)(Map$new));
                        }
                    })();
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$7)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$8)(List$cons("\u{a}")(List$cons((() => {
                        var self = $2199;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2204 = self.head;
                                var $2205 = self.tail;
                                return String$flatten(List$cons("With context:\u{a}")(List$cons(Fm$Context$show($2199))(List$nil)));
                        }
                    })())(List$nil)))))))))
                })();
            case 'Fm.Error.show_goal':
                var $2206 = self.name;
                var $2207 = self.dref;
                var $2208 = self.verb;
                var $2209 = self.goal;
                var $2210 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($2206))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $2209;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $2211 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($2207)($2211)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $2208;
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
                        var self = $2210;
                        switch (self._) {
                            case 'List.nil':
                                return "";
                            case 'List.cons':
                                var $2212 = self.head;
                                var $2213 = self.tail;
                                return String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($2210))(List$nil)));
                        }
                    })();
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.waiting':
                var $2214 = self.name;
                return String$flatten(List$cons("Waiting for \'")(List$cons($2214)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.indirect':
                var $2215 = self.name;
                return String$flatten(List$cons("Error on dependency \'")(List$cons($2215)(List$cons("\'.")(List$nil))));
            case 'Fm.Error.patch':
                var $2216 = self.path;
                var $2217 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($2217))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $2218 = self.origin;
                var $2219 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($2219))(List$cons("\u{a}")(List$nil))));
            case 'Fm.Error.cant_infer':
                var $2220 = self.origin;
                var $2221 = self.term;
                var $2222 = self.context;
                return (() => {
                    var _term$6 = Fm$Term$show($2221);
                    var _context$7 = Fm$Context$show($2222);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$6)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$7)(List$nil))))))
                })();
        }
    })()));
    var Fm$Error$origin = (_error$1 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $2223 = self.origin;
                var $2224 = self.expected;
                var $2225 = self.detected;
                var $2226 = self.context;
                return $2223;
            case 'Fm.Error.show_goal':
                var $2227 = self.name;
                var $2228 = self.dref;
                var $2229 = self.verb;
                var $2230 = self.goal;
                var $2231 = self.context;
                return Maybe$none;
            case 'Fm.Error.waiting':
                var $2232 = self.name;
                return Maybe$none;
            case 'Fm.Error.indirect':
                var $2233 = self.name;
                return Maybe$none;
            case 'Fm.Error.patch':
                var $2234 = self.path;
                var $2235 = self.term;
                return Maybe$none;
            case 'Fm.Error.undefined_reference':
                var $2236 = self.origin;
                var $2237 = self.name;
                return $2236;
            case 'Fm.Error.cant_infer':
                var $2238 = self.origin;
                var $2239 = self.term;
                var $2240 = self.context;
                return $2238;
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
                        var $2241 = self.head;
                        var $2242 = self.tail;
                        return (() => {
                            var self = $2241;
                            switch (self._) {
                                case 'Fm.File.new':
                                    var $2243 = self.name;
                                    var $2244 = self.code;
                                    return (() => {
                                        var self = ($2243 === _file$1);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return $2244;
                                            case 'false':
                                                return Fm$Defs$report$get_file_code(_file$1)($2242);
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
        var _errors$4 = (list_for(Map$values(_defs$2))(_errors$3)((_defn$4 => (_errors$5 => (() => {
            var self = _defn$4;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2245 = self.file;
                    var $2246 = self.name;
                    var $2247 = self.term;
                    var $2248 = self.type;
                    var $2249 = self.stat;
                    return (() => {
                        var self = $2249;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _errors$5;
                            case 'Fm.Status.wait':
                                return _errors$5;
                            case 'Fm.Status.done':
                                return _errors$5;
                            case 'Fm.Status.fail':
                                var $2250 = self.errors;
                                return (() => {
                                    var self = $2250;
                                    switch (self._) {
                                        case 'List.nil':
                                            return _errors$5;
                                        case 'List.cons':
                                            var $2251 = self.head;
                                            var $2252 = self.tail;
                                            return (() => {
                                                var _name_str$14 = Fm$Name$show($2246);
                                                var _relevant_errors$15 = Fm$Error$relevant($2250)(Bool$false);
                                                var _errors$16 = (list_for(_relevant_errors$15)(_errors$5)((_error$16 => (_errors$17 => String$flatten(List$cons(_errors$17)(List$cons("On ")(List$cons(_name_str$14)(List$cons(":\u{a}")(List$cons(Fm$Error$show(_error$16)(_defs$2))(List$cons((() => {
                                                    var self = Fm$Error$origin(_error$16);
                                                    switch (self._) {
                                                        case 'Maybe.none':
                                                            return "";
                                                        case 'Maybe.some':
                                                            var $2253 = self.value;
                                                            return (() => {
                                                                var self = $2253;
                                                                switch (self._) {
                                                                    case 'Fm.Origin.new':
                                                                        var $2254 = self.file;
                                                                        var $2255 = self.from;
                                                                        var $2256 = self.upto;
                                                                        return (() => {
                                                                            var _code$22 = Fm$Defs$report$get_file_code($2245)(_files$1);
                                                                            var _code$23 = Fm$highlight(_code$22)($2255)($2256);
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
        var _types$6 = (list_for(Map$values(_defs$2))(_types$5)((_defn$6 => (_types$7 => (() => {
            var self = _defn$6;
            switch (self._) {
                case 'Fm.Def.new':
                    var $2257 = self.file;
                    var $2258 = self.name;
                    var $2259 = self.term;
                    var $2260 = self.type;
                    var $2261 = self.stat;
                    return (() => {
                        var self = $2261;
                        switch (self._) {
                            case 'Fm.Status.init':
                                return _types$7;
                            case 'Fm.Status.wait':
                                return _types$7;
                            case 'Fm.Status.done':
                                return String$flatten(List$cons(_types$7)(List$cons($2258)(List$cons(": ")(List$cons(Fm$Term$show($2260))(List$cons("\u{a}")(List$nil))))));
                            case 'Fm.Status.fail':
                                var $2262 = self.errors;
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
                    var $2263 = self.charCodeAt(0);
                    var $2264 = self.slice(1);
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
        'Bits.nil': Bits$nil,
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
        'Map.get': Map$get,
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
        'Fm.get': Fm$get,
        'Fm.Term.nat': Fm$Term$nat,
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.unroll_str': Fm$Term$unroll_str,
        'Fm.Term.reduce': Fm$Term$reduce,
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