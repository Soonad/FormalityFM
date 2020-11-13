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
    var Maybe$default = (_a$2 => (_m$3 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return _a$2;
            case 'Maybe.some':
                var $6 = self.value;
                return $6;
        }
    })()));
    var Map = (_A$1 => null);
    var Map$new = ({
        _: 'Map.new'
    });
    var Monad$bind = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $7 = self.bind;
                var $8 = self.pure;
                return $7;
        }
    })());
    var Parser = (_V$1 => null);
    var Monad$new = (_bind$2 => (_pure$3 => ({
        _: 'Monad.new',
        'bind': _bind$2,
        'pure': _pure$3
    })));
    var Parser$Reply = (_V$1 => null);
    var Parser$Reply$error = (_code$2 => (_err$3 => ({
        _: 'Parser.Reply.error',
        'code': _code$2,
        'err': _err$3
    })));
    var Parser$bind = (_parse$3 => (_next$4 => (_code$5 => (() => {
        var self = _parse$3(_code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $9 = self.code;
                var $10 = self.err;
                return Parser$Reply$error($9)($10);
            case 'Parser.Reply.value':
                var $11 = self.code;
                var $12 = self.val;
                return _next$4($12)($11);
        }
    })())));
    var Parser$Reply$value = (_code$2 => (_val$3 => ({
        _: 'Parser.Reply.value',
        'code': _code$2,
        'val': _val$3
    })));
    var Parser$pure = (_value$2 => (_code$3 => Parser$Reply$value(_code$3)(_value$2)));
    var Parser$monad = Monad$new(Parser$bind)(Parser$pure);
    var Maybe = (_A$1 => null);
    var Maybe$none = ({
        _: 'Maybe.none'
    });
    var Maybe$some = (_value$2 => ({
        _: 'Maybe.some',
        'value': _value$2
    }));
    var Parser$maybe = (_parse$2 => (_code$3 => (() => {
        var self = _parse$2(_code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $13 = self.code;
                var $14 = self.err;
                return Parser$Reply$value(_code$3)(Maybe$none);
            case 'Parser.Reply.value':
                var $15 = self.code;
                var $16 = self.val;
                return Parser$Reply$value($15)(Maybe$some($16));
        }
    })()));
    var List = (_A$1 => null);
    var List$nil = ({
        _: 'List.nil'
    });
    var List$cons = (_head$2 => (_tail$3 => ({
        _: 'List.cons',
        'head': _head$2,
        'tail': _tail$3
    })));
    var Parser$many$go = _parse$2 => _values$3 => _code$4 => {
        var Parser$many$go = _parse$2 => _values$3 => _code$4 => ({
            ctr: 'TCO',
            arg: [_parse$2, _values$3, _code$4]
        });
        var arg = [_parse$2, _values$3, _code$4];
        while (true) {
            let [_parse$2, _values$3, _code$4] = arg;
            var R = (() => {
                var self = _parse$2(_code$4);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $17 = self.code;
                        var $18 = self.err;
                        return Parser$Reply$value(_code$4)(_values$3(List$nil));
                    case 'Parser.Reply.value':
                        var $19 = self.code;
                        var $20 = self.val;
                        return Parser$many$go(_parse$2)((_xs$7 => _values$3(List$cons($20)(_xs$7))))($19);
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Parser$many = (_parser$2 => Parser$many$go(_parser$2)((_x$3 => _x$3)));
    var Parser$first_of = _pars$2 => _code$3 => {
        var Parser$first_of = _pars$2 => _code$3 => ({
            ctr: 'TCO',
            arg: [_pars$2, _code$3]
        });
        var arg = [_pars$2, _code$3];
        while (true) {
            let [_pars$2, _code$3] = arg;
            var R = (() => {
                var self = _pars$2;
                switch (self._) {
                    case 'List.nil':
                        return Parser$Reply$error(_code$3)("No parse.");
                    case 'List.cons':
                        var $21 = self.head;
                        var $22 = self.tail;
                        return (() => {
                            var _parsed$6 = $21(_code$3);
                            return (() => {
                                var self = _parsed$6;
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $23 = self.code;
                                        var $24 = self.err;
                                        return Parser$first_of($22)(_code$3);
                                    case 'Parser.Reply.value':
                                        var $25 = self.code;
                                        var $26 = self.val;
                                        return Parser$Reply$value($25)($26);
                                }
                            })()
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
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
                        var $27 = self.head;
                        var $28 = self.tail;
                        return String$flatten$go($28)((_res$2 + $27));
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var String$flatten = (_xs$1 => String$flatten$go(_xs$1)(""));
    var Bool$false = false;
    var Bool$true = true;
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
                var $29 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $30 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($30)(_c$4));
                        case 'Word.1':
                            var $31 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($31)(Cmp$ltn));
                    }
                })()($29));
            case 'Word.1':
                var $32 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => _c$4);
                        case 'Word.0':
                            var $33 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($33)(Cmp$gtn));
                        case 'Word.1':
                            var $34 = self.pred;
                            return (_a$pred$10 => Word$cmp$go(_a$pred$10)($34)(_c$4));
                    }
                })()($32));
        }
    })()(_b$3))));
    var Cmp$eql = ({
        _: 'Cmp.eql'
    });
    var Word$cmp = (_a$2 => (_b$3 => Word$cmp$go(_a$2)(_b$3)(Cmp$eql)));
    var Word$eql = (_a$2 => (_b$3 => Cmp$as_eql(Word$cmp(_a$2)(_b$3))));
    var Nat$succ = (_pred$1 => 1n + _pred$1);
    var Nat$zero = 0n;
    var U16$eql = a0 => a1 => (a0 === a1);
    var String$nil = '';
    var Parser$text$go = (_text$1 => (_code$2 => (() => {
        var self = _text$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$value(_code$2)(Unit$new);
            case 'cons':
                var $35 = self.charCodeAt(0);
                var $36 = self.slice(1);
                return (() => {
                    var self = _code$2;
                    switch (self.length === 0 ? 'nil' : 'cons') {
                        case 'nil':
                            return (() => {
                                var _error$5 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found end of file.")(List$nil))));
                                return Parser$Reply$error(_code$2)(_error$5)
                            })();
                        case 'cons':
                            var $37 = self.charCodeAt(0);
                            var $38 = self.slice(1);
                            return (() => {
                                var self = ($35 === $37);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Parser$text($36)($38);
                                    case 'false':
                                        return (() => {
                                            var _error$7 = String$flatten(List$cons("Expected \'")(List$cons(_text$1)(List$cons("\', found \'")(List$cons(String$cons($37)(String$nil))(List$cons("\'.")(List$nil))))));
                                            return Parser$Reply$error(_code$2)(_error$7)
                                        })();
                                }
                            })();
                    }
                })();
        }
    })()));
    var Parser$text = (_text$1 => (_code$2 => (() => {
        var self = Parser$text$go(_text$1)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $39 = self.code;
                var $40 = self.err;
                return Parser$Reply$error(_code$2)($40);
            case 'Parser.Reply.value':
                var $41 = self.code;
                var $42 = self.val;
                return Parser$Reply$value($41)($42);
        }
    })()));
    var Parser$char_if = (_fun$1 => (_code$2 => (() => {
        var self = _code$2;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_code$2)("No parse.");
            case 'cons':
                var $43 = self.charCodeAt(0);
                var $44 = self.slice(1);
                return (() => {
                    var self = _fun$1($43);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value($44)($43);
                        case 'false':
                            return Parser$Reply$error(_code$2)("No parse.");
                    }
                })();
        }
    })()));
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
    var Fm$Parser$letter = (_code$1 => (() => {
        var self = _code$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_code$1)("Unexpected eof.");
            case 'cons':
                var $45 = self.charCodeAt(0);
                var $46 = self.slice(1);
                return (() => {
                    var self = Fm$Name$is_letter($45);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value($46)($45);
                        case 'false':
                            return Parser$Reply$error(_code$1)("Expected letter.");
                    }
                })();
        }
    })());
    var Monad$pure = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Monad.new':
                var $47 = self.bind;
                var $48 = self.pure;
                return $48;
        }
    })());
    var List$fold = (_list$2 => (_nil$4 => (_cons$5 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return _nil$4;
            case 'List.cons':
                var $49 = self.head;
                var $50 = self.tail;
                return _cons$5($49)(List$fold($50)(_nil$4)(_cons$5));
        }
    })())));
    var Fm$Parser$name = Monad$bind(Parser$monad)(Parser$many(Fm$Parser$letter))((_chrs$1 => Monad$pure(Parser$monad)(List$fold(_chrs$1)(String$nil)(String$cons))));
    var Parser$many1 = (_parser$2 => Monad$bind(Parser$monad)(_parser$2)((_head$3 => Monad$bind(Parser$monad)(Parser$many(_parser$2))((_tail$4 => Monad$pure(Parser$monad)(List$cons(_head$3)(_tail$4)))))));
    var Fm$Parser$spaces_text = (_text$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Parser$text(_text$1))));
    var Pair = (_A$1 => (_B$2 => null));
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
                    var $51 = self.eras;
                    var $52 = self.name;
                    var $53 = self.term;
                    return Fm$Term$all($51)("")($52)($53)((_s$11 => (_x$12 => _t$7)));
            }
        })())));
        return Monad$pure(Parser$monad)((() => {
            var self = _term$6;
            switch (self._) {
                case 'Fm.Term.var':
                    var $54 = self.name;
                    var $55 = self.indx;
                    return _term$6;
                case 'Fm.Term.ref':
                    var $56 = self.name;
                    return _term$6;
                case 'Fm.Term.typ':
                    return _term$6;
                case 'Fm.Term.all':
                    var $57 = self.eras;
                    var $58 = self.self;
                    var $59 = self.name;
                    var $60 = self.xtyp;
                    var $61 = self.body;
                    return Fm$Term$all($57)(_self$2)($59)($60)($61);
                case 'Fm.Term.lam':
                    var $62 = self.name;
                    var $63 = self.body;
                    return _term$6;
                case 'Fm.Term.app':
                    var $64 = self.func;
                    var $65 = self.argm;
                    return _term$6;
                case 'Fm.Term.let':
                    var $66 = self.name;
                    var $67 = self.expr;
                    var $68 = self.body;
                    return _term$6;
                case 'Fm.Term.def':
                    var $69 = self.name;
                    var $70 = self.expr;
                    var $71 = self.body;
                    return _term$6;
                case 'Fm.Term.ann':
                    var $72 = self.done;
                    var $73 = self.term;
                    var $74 = self.type;
                    return _term$6;
                case 'Fm.Term.gol':
                    var $75 = self.name;
                    var $76 = self.dref;
                    var $77 = self.verb;
                    return _term$6;
                case 'Fm.Term.hol':
                    var $78 = self.path;
                    return _term$6;
                case 'Fm.Term.nat':
                    var $79 = self.natx;
                    return _term$6;
                case 'Fm.Term.chr':
                    var $80 = self.chrx;
                    return _term$6;
                case 'Fm.Term.str':
                    var $81 = self.strx;
                    return _term$6;
                case 'Fm.Term.cse':
                    var $82 = self.path;
                    var $83 = self.expr;
                    var $84 = self.name;
                    var $85 = self.with;
                    var $86 = self.cses;
                    var $87 = self.moti;
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
                var $88 = self.head;
                var $89 = self.tail;
                return Fm$Term$lam($88)((_x$5 => Fm$Parser$make_lambda($89)(_body$2)));
        }
    })()));
    var Fm$Parser$lambda = Monad$bind(Parser$monad)(Parser$first_of(List$cons(Parser$spaces_text("("))(List$cons(Parser$spaces_text("<"))(List$nil))))((_$1 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$item(Fm$Parser$name1)))((_name$2 => Monad$bind(Parser$monad)(Parser$first_of(List$cons(Parser$text(")"))(List$cons(Parser$text(">"))(List$nil))))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$4 => Monad$pure(Parser$monad)(Fm$Parser$make_lambda(_name$2)(_body$4))))))))));
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
                var $90 = self.head;
                var $91 = self.tail;
                return List$cons(_f$4($90))(List$mapped($91)(_f$4));
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
                        var $92 = (self - 1n);
                        return Nat$apply($92)(_f$3)(_f$3(_x$4));
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
                var $93 = self.pred;
                return Word$1($93);
            case 'Word.1':
                var $94 = self.pred;
                return Word$0(Word$inc($94));
        }
    })());
    var U16$inc = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $95 = u16_to_word(self);
                return U16$new(Word$inc($95));
        }
    })());
    var Word$zero = (_size$1 => (() => {
        var self = _size$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $96 = (self - 1n);
                return Word$0(Word$zero($96));
        }
    })());
    var U16$zero = U16$new(Word$zero(16n));
    var Nat$to_u16 = a0 => (Number(a0));
    var Fm$backslash = 92;
    var Fm$escapes = List$cons(Pair$new("\\b")(8))(List$cons(Pair$new("\\f")(12))(List$cons(Pair$new("\\n")(10))(List$cons(Pair$new("\\r")(13))(List$cons(Pair$new("\\t")(9))(List$cons(Pair$new("\\v")(11))(List$cons(Pair$new(String$cons(Fm$backslash)(String$cons(Fm$backslash)(String$nil)))(Fm$backslash))(List$cons(Pair$new("\\\"")(34))(List$cons(Pair$new("\\0")(0))(List$cons(Pair$new("\\\'")(39))(List$nil))))))))));
    var Parser$one = (_code$1 => (() => {
        var self = _code$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_code$1)("Unexpected end of file.");
            case 'cons':
                var $97 = self.charCodeAt(0);
                var $98 = self.slice(1);
                return Parser$Reply$value($98)($97);
        }
    })());
    var Fm$Parser$char$single = Parser$first_of(List$cons(Parser$first_of(List$mapped(Fm$escapes)((_esc$1 => (() => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $99 = self.fst;
                var $100 = self.snd;
                return Monad$bind(Parser$monad)(Parser$text($99))((_$4 => Monad$pure(Parser$monad)($100)));
        }
    })()))))(List$cons(Parser$one)(List$nil)));
    var Fm$Term$chr = (_chrx$1 => ({
        _: 'Fm.Term.chr',
        'chrx': _chrx$1
    }));
    var Fm$Parser$char = Monad$bind(Parser$monad)(Parser$spaces_text("\'"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$char$single)((_chrx$2 => Monad$bind(Parser$monad)(Parser$text("\'"))((_$3 => Monad$pure(Parser$monad)(Fm$Term$chr(_chrx$2))))))));
    var Parser$if_not = (_a$2 => (_b$3 => (_code$4 => (() => {
        var self = _a$2(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $101 = self.code;
                var $102 = self.err;
                return _b$3(_code$4);
            case 'Parser.Reply.value':
                var $103 = self.code;
                var $104 = self.val;
                return Parser$Reply$error(_code$4)("Prevented.");
        }
    })())));
    var Parser$until = (_cond$2 => (_parser$3 => Parser$many(Parser$if_not(_cond$2)(_parser$3))));
    var Fm$Term$str = (_strx$1 => ({
        _: 'Fm.Term.str',
        'strx': _strx$1
    }));
    var Fm$Parser$string = (() => {
        var _quot$1 = String$cons(34)(String$nil);
        return Monad$bind(Parser$monad)(Parser$spaces_text(_quot$1))((_$2 => Monad$bind(Parser$monad)(Parser$until(Parser$text(_quot$1))(Fm$Parser$char$single))((_chrs$3 => Monad$bind(Parser$monad)(Parser$text(_quot$1))((_$4 => (() => {
            var _strx$5 = List$fold(_chrs$3)(String$nil)(String$cons);
            return Monad$pure(Parser$monad)(Fm$Term$str(_strx$5))
        })()))))))
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
    var Fm$Parser$list = Monad$bind(Parser$monad)(Parser$spaces_text("["))((_$1 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$item(Fm$Parser$term)))((_vals$2 => Monad$bind(Parser$monad)(Parser$spaces_text("]"))((_$3 => Monad$pure(Parser$monad)(List$fold(_vals$2)(Fm$Term$app(Fm$Term$ref(Fm$Name$read("List.nil")))(Fm$Term$hol(Bits$nil)))((_x$4 => (_xs$5 => (() => {
        var _term$6 = Fm$Term$ref(Fm$Name$read("List.cons"));
        var _term$7 = Fm$Term$app(_term$6)(Fm$Term$hol(Bits$nil));
        var _term$8 = Fm$Term$app(_term$7)(_x$4);
        var _term$9 = Fm$Term$app(_term$8)(_xs$5);
        return _term$9
    })()))))))))));
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
    var Fm$Def$new = (_name$1 => (_term$2 => (_type$3 => (_done$4 => ({
        _: 'Fm.Def.new',
        'name': _name$1,
        'term': _term$2,
        'type': _type$3,
        'done': _done$4
    })))));
    var Fm$Parser$case$with = Monad$bind(Parser$monad)(Fm$Parser$spaces_text("with"))((_$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$2 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$4 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$5 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("="))((_$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$7 => Monad$pure(Parser$monad)(Fm$Def$new(_name$3)(_term$7)(_type$5)(Bool$false))))))))))))))));
    var Fm$Parser$case$case = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$3 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$4 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$spaces_text(",")))((_$5 => Monad$pure(Parser$monad)(Pair$new(_name$2)(_term$4))))))))))));
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
                            var $105 = self.val;
                            var $106 = self.lft;
                            var $107 = self.rgt;
                            return Map$tie(Maybe$some(_val$3))($106)($107);
                    }
                })();
            case '0':
                var $108 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$set($108)(_val$3)(Map$new))(Map$new);
                        case 'Map.tie':
                            var $109 = self.val;
                            var $110 = self.lft;
                            var $111 = self.rgt;
                            return Map$tie($109)(Map$set($108)(_val$3)($110))($111);
                    }
                })();
            case '1':
                var $112 = self.slice(0, -1);
                return (() => {
                    var self = _map$4;
                    switch (self._) {
                        case 'Map.new':
                            return Map$tie(Maybe$none)(Map$new)(Map$set($112)(_val$3)(Map$new));
                        case 'Map.tie':
                            var $113 = self.val;
                            var $114 = self.lft;
                            var $115 = self.rgt;
                            return Map$tie($113)($114)(Map$set($112)(_val$3)($115));
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
                var $116 = self.head;
                var $117 = self.tail;
                return (() => {
                    var self = $116;
                    switch (self._) {
                        case 'Pair.new':
                            var $118 = self.fst;
                            var $119 = self.snd;
                            return Map$set(_f$3($118))($119)(Map$from_list(_f$3)($117));
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
                var $120 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $121 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($121)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($121)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $122 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($122)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($122)(Bool$true));
                                }
                            })());
                    }
                })()($120));
            case 'Word.1':
                var $123 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $124 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$subber(_a$pred$10)($124)(Bool$false));
                                    case 'false':
                                        return Word$1(Word$subber(_a$pred$10)($124)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $125 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$subber(_a$pred$10)($125)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$subber(_a$pred$10)($125)(Bool$false));
                                }
                            })());
                    }
                })()($123));
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
                var $126 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $127 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($127)(Bool$false));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($127)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $128 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($128)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($128)(Bool$false));
                                }
                            })());
                    }
                })()($126));
            case 'Word.1':
                var $129 = self.pred;
                return (_b$7 => (() => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.nil':
                            return (_a$pred$8 => Word$nil);
                        case 'Word.0':
                            var $130 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$0(Word$adder(_a$pred$10)($130)(Bool$true));
                                    case 'false':
                                        return Word$1(Word$adder(_a$pred$10)($130)(Bool$false));
                                }
                            })());
                        case 'Word.1':
                            var $131 = self.pred;
                            return (_a$pred$10 => (() => {
                                var self = _c$4;
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Word$1(Word$adder(_a$pred$10)($131)(Bool$true));
                                    case 'false':
                                        return Word$0(Word$adder(_a$pred$10)($131)(Bool$true));
                                }
                            })());
                    }
                })()($129));
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
                var $132 = self.pred;
                return Bits$0(Word$to_bits($132));
            case 'Word.1':
                var $133 = self.pred;
                return Bits$1(Word$to_bits($133));
        }
    })());
    var Word$trim = (_new_size$2 => (_word$3 => (() => {
        var self = _new_size$2;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Word$nil;
            case 'succ':
                var $134 = (self - 1n);
                return (() => {
                    var self = _word$3;
                    switch (self._) {
                        case 'Word.nil':
                            return Word$0(Word$trim($134)(Word$nil));
                        case 'Word.0':
                            var $135 = self.pred;
                            return Word$0(Word$trim($134)($135));
                        case 'Word.1':
                            var $136 = self.pred;
                            return Word$1(Word$trim($134)($136));
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
                        var $137 = self.slice(0, -1);
                        return Bits$reverse$tco($137)(Bits$0(_r$2));
                    case '1':
                        var $138 = self.slice(0, -1);
                        return Bits$reverse$tco($138)(Bits$1(_r$2));
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
                                var $139 = self.name;
                                var $140 = self.indx;
                                return $139;
                            case 'Fm.Term.ref':
                                var $141 = self.name;
                                return $141;
                            case 'Fm.Term.typ':
                                return Fm$Name$read("self");
                            case 'Fm.Term.all':
                                var $142 = self.eras;
                                var $143 = self.self;
                                var $144 = self.name;
                                var $145 = self.xtyp;
                                var $146 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.lam':
                                var $147 = self.name;
                                var $148 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.app':
                                var $149 = self.func;
                                var $150 = self.argm;
                                return Fm$Name$read("self");
                            case 'Fm.Term.let':
                                var $151 = self.name;
                                var $152 = self.expr;
                                var $153 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.def':
                                var $154 = self.name;
                                var $155 = self.expr;
                                var $156 = self.body;
                                return Fm$Name$read("self");
                            case 'Fm.Term.ann':
                                var $157 = self.done;
                                var $158 = self.term;
                                var $159 = self.type;
                                return Fm$Name$read("self");
                            case 'Fm.Term.gol':
                                var $160 = self.name;
                                var $161 = self.dref;
                                var $162 = self.verb;
                                return Fm$Name$read("self");
                            case 'Fm.Term.hol':
                                var $163 = self.path;
                                return Fm$Name$read("self");
                            case 'Fm.Term.nat':
                                var $164 = self.natx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.chr':
                                var $165 = self.chrx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.str':
                                var $166 = self.strx;
                                return Fm$Name$read("self");
                            case 'Fm.Term.cse':
                                var $167 = self.path;
                                var $168 = self.expr;
                                var $169 = self.name;
                                var $170 = self.with;
                                var $171 = self.cses;
                                var $172 = self.moti;
                                return Fm$Name$read("self");
                        }
                    })();
                case 'Maybe.some':
                    var $173 = self.value;
                    return $173;
            }
        })();
        return Monad$bind(Parser$monad)(Parser$many(Fm$Parser$case$with))((_with$6 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("{"))((_$7 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$case$case))((_cses$8 => (() => {
            var _cses$9 = Map$from_list(Fm$Name$to_bits)(_cses$8);
            return Monad$bind(Parser$monad)(Fm$Parser$spaces_text("}"))((_$10 => Monad$bind(Parser$monad)(Parser$maybe(Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$11 => Fm$Parser$term))))((_moti$11 => (() => {
                var _moti$12 = (() => {
                    var self = _moti$11;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$hol(Bits$nil);
                        case 'Maybe.some':
                            var $174 = self.value;
                            return $174;
                    }
                })();
                return Monad$pure(Parser$monad)(Fm$Term$cse(Bits$nil)(_expr$3)(_name$5)(_with$6)(_cses$9)(_moti$12))
            })()))))
        })()))))))
    })()))))))));
    var Parser$digit = (_code$1 => (() => {
        var self = _code$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Parser$Reply$error(_code$1)("No parse.");
            case 'cons':
                var $175 = self.charCodeAt(0);
                var $176 = self.slice(1);
                return (() => {
                    var self = ($175 === 48);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Parser$Reply$value($176)(0n);
                        case 'false':
                            return (() => {
                                var self = ($175 === 49);
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Parser$Reply$value($176)(1n);
                                    case 'false':
                                        return (() => {
                                            var self = ($175 === 50);
                                            switch (self ? 'true' : 'false') {
                                                case 'true':
                                                    return Parser$Reply$value($176)(2n);
                                                case 'false':
                                                    return (() => {
                                                        var self = ($175 === 51);
                                                        switch (self ? 'true' : 'false') {
                                                            case 'true':
                                                                return Parser$Reply$value($176)(3n);
                                                            case 'false':
                                                                return (() => {
                                                                    var self = ($175 === 52);
                                                                    switch (self ? 'true' : 'false') {
                                                                        case 'true':
                                                                            return Parser$Reply$value($176)(4n);
                                                                        case 'false':
                                                                            return (() => {
                                                                                var self = ($175 === 53);
                                                                                switch (self ? 'true' : 'false') {
                                                                                    case 'true':
                                                                                        return Parser$Reply$value($176)(5n);
                                                                                    case 'false':
                                                                                        return (() => {
                                                                                            var self = ($175 === 54);
                                                                                            switch (self ? 'true' : 'false') {
                                                                                                case 'true':
                                                                                                    return Parser$Reply$value($176)(6n);
                                                                                                case 'false':
                                                                                                    return (() => {
                                                                                                        var self = ($175 === 55);
                                                                                                        switch (self ? 'true' : 'false') {
                                                                                                            case 'true':
                                                                                                                return Parser$Reply$value($176)(7n);
                                                                                                            case 'false':
                                                                                                                return (() => {
                                                                                                                    var self = ($175 === 56);
                                                                                                                    switch (self ? 'true' : 'false') {
                                                                                                                        case 'true':
                                                                                                                            return Parser$Reply$value($176)(8n);
                                                                                                                        case 'false':
                                                                                                                            return (() => {
                                                                                                                                var self = ($175 === 57);
                                                                                                                                switch (self ? 'true' : 'false') {
                                                                                                                                    case 'true':
                                                                                                                                        return Parser$Reply$value($176)(9n);
                                                                                                                                    case 'false':
                                                                                                                                        return Parser$Reply$error(_code$1)("No parse.");
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
                })();
        }
    })());
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
                        var $177 = self.head;
                        var $178 = self.tail;
                        return Nat$from_base$go(_b$1)($178)((_b$1 * _p$3))((($177 * _p$3) + _res$4));
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
                        var $179 = self.head;
                        var $180 = self.tail;
                        return List$reverse$go($180)(List$cons($179)(_res$3));
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
                var $181 = self.slice(0, -1);
                return $181;
            case '1':
                var $182 = self.slice(0, -1);
                return $182;
        }
    })());
    var Bits$inc = (_a$1 => (() => {
        var self = _a$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return Bits$1(Bits$nil);
            case '0':
                var $183 = self.slice(0, -1);
                return Bits$1($183);
            case '1':
                var $184 = self.slice(0, -1);
                return Bits$0(Bits$inc($184));
        }
    })());
    var Nat$to_bits = a0 => (nat_to_bits(a0));
    var Maybe$to_bool = (_m$2 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Bool$false;
            case 'Maybe.some':
                var $185 = self.value;
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
    var Fm$Parser$reference = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name1)((_name$2 => Monad$pure(Parser$monad)(Fm$Term$ref(_name$2))))));
    var List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));
    var Fm$Parser$application = (_func$1 => Monad$bind(Parser$monad)(Parser$first_of(List$cons(Parser$text("("))(List$cons(Parser$text("<"))(List$nil))))((_$2 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$item(Fm$Parser$term)))((_args$3 => Monad$bind(Parser$monad)(Parser$first_of(List$cons(Parser$spaces_text(")"))(List$cons(Parser$spaces_text(">"))(List$nil))))((_$4 => Monad$pure(Parser$monad)((list_for(_args$3)(_func$1)((_x$5 => (_f$6 => Fm$Term$app(_f$6)(_x$5)))))))))))));
    var Fm$Parser$arrow = (_xtyp$1 => Monad$bind(Parser$monad)(Parser$spaces_text("->"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_body$3 => Monad$pure(Parser$monad)(Fm$Term$all(Bool$false)("")("")(_xtyp$1)((_s$4 => (_x$5 => _body$3)))))))));
    var Fm$Term$ann = (_done$1 => (_term$2 => (_type$3 => ({
        _: 'Fm.Term.ann',
        'done': _done$1,
        'term': _term$2,
        'type': _type$3
    }))));
    var Fm$Parser$annotation = (_term$1 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("::"))((_$2 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$3 => Monad$pure(Parser$monad)(Fm$Term$ann(Bool$false)(_term$1)(_type$3)))))));
    var Fm$Parser$suffix = _term$1 => _code$2 => {
        var Fm$Parser$suffix = _term$1 => _code$2 => ({
            ctr: 'TCO',
            arg: [_term$1, _code$2]
        });
        var arg = [_term$1, _code$2];
        while (true) {
            let [_term$1, _code$2] = arg;
            var R = (() => {
                var _suffix_parser$3 = Parser$first_of(List$cons(Fm$Parser$application(_term$1))(List$cons(Fm$Parser$arrow(_term$1))(List$cons(Fm$Parser$annotation(_term$1))(List$nil))));
                return (() => {
                    var self = _suffix_parser$3(_code$2);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $186 = self.code;
                            var $187 = self.err;
                            return Parser$Reply$value(_code$2)(_term$1);
                        case 'Parser.Reply.value':
                            var $188 = self.code;
                            var $189 = self.val;
                            return Fm$Parser$suffix($189)($188);
                    }
                })()
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$Parser$term = Monad$bind(Parser$monad)(Parser$first_of(List$cons(Fm$Parser$type)(List$cons(Fm$Parser$forall)(List$cons(Fm$Parser$lambda)(List$cons(Fm$Parser$parenthesis)(List$cons(Fm$Parser$letforin)(List$cons(Fm$Parser$let)(List$cons(Fm$Parser$def)(List$cons(Fm$Parser$if)(List$cons(Fm$Parser$char)(List$cons(Fm$Parser$string)(List$cons(Fm$Parser$pair)(List$cons(Fm$Parser$list)(List$cons(Fm$Parser$forin)(List$cons(Fm$Parser$do)(List$cons(Fm$Parser$case)(List$cons(Fm$Parser$goal)(List$cons(Fm$Parser$hole)(List$cons(Fm$Parser$nat)(List$cons(Fm$Parser$reference)(List$nil)))))))))))))))))))))((_term$1 => Fm$Parser$suffix(_term$1)));
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
    })()))((_$2 => Monad$bind(Parser$monad)(Parser$many1(Fm$Parser$item(Fm$Parser$name_term)))((_bind$3 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text((() => {
        var self = _eras$1;
        switch (self ? 'true' : 'false') {
            case 'true':
                return ">";
            case 'false':
                return ")";
        }
    })()))((_$4 => Monad$pure(Parser$monad)(List$mapped(_bind$3)((_pair$5 => (() => {
        var self = _pair$5;
        switch (self._) {
            case 'Pair.new':
                var $190 = self.fst;
                var $191 = self.snd;
                return Fm$Binder$new(_eras$1)($190)($191);
        }
    })()))))))))));
    var List$concat = (_as$2 => (_bs$3 => (() => {
        var self = _as$2;
        switch (self._) {
            case 'List.nil':
                return _bs$3;
            case 'List.cons':
                var $192 = self.head;
                var $193 = self.tail;
                return List$cons($192)(List$concat($193)(_bs$3));
        }
    })()));
    var List$flatten = (_xs$2 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'List.nil':
                return List$nil;
            case 'List.cons':
                var $194 = self.head;
                var $195 = self.tail;
                return List$concat($194)(List$flatten($195));
        }
    })());
    var Fm$Parser$binder = Monad$bind(Parser$monad)(Parser$many1(Parser$first_of(List$cons(Fm$Parser$binder$homo(Bool$true))(List$cons(Fm$Parser$binder$homo(Bool$false))(List$nil)))))((_lists$1 => Monad$pure(Parser$monad)(List$flatten(_lists$1))));
    var Fm$Parser$make_forall = (_binds$1 => (_body$2 => (() => {
        var self = _binds$1;
        switch (self._) {
            case 'List.nil':
                return _body$2;
            case 'List.cons':
                var $196 = self.head;
                var $197 = self.tail;
                return (() => {
                    var self = $196;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $198 = self.eras;
                            var $199 = self.name;
                            var $200 = self.term;
                            return Fm$Term$all($198)("")($199)($200)((_s$8 => (_x$9 => Fm$Parser$make_forall($197)(_body$2))));
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
                        var $201 = self.head;
                        var $202 = self.tail;
                        return (() => {
                            var self = _index$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Maybe$some($201);
                                case 'succ':
                                    var $203 = (self - 1n);
                                    return List$at($203)($202);
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
                var $204 = self.fst;
                var $205 = self.snd;
                return $205;
        }
    })());
    var String$eql = a0 => a1 => (a0 === a1);
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
                        var $206 = self.head;
                        var $207 = self.tail;
                        return (() => {
                            var self = $206;
                            switch (self._) {
                                case 'Pair.new':
                                    var $208 = self.fst;
                                    var $209 = self.snd;
                                    return (() => {
                                        var self = Fm$Name$eql(_name$1)($208);
                                        switch (self ? 'true' : 'false') {
                                            case 'true':
                                                return Maybe$some($209);
                                            case 'false':
                                                return Fm$Context$find(_name$1)($207);
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
                        var $210 = self.head;
                        var $211 = self.tail;
                        return List$length$go($211)(Nat$succ(_n$3));
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
                var $212 = self.name;
                var $213 = self.indx;
                return (() => {
                    var self = List$at_last($213)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$var($212)($213);
                        case 'Maybe.some':
                            var $214 = self.value;
                            return Pair$snd($214);
                    }
                })();
            case 'Fm.Term.ref':
                var $215 = self.name;
                return (() => {
                    var self = Fm$Context$find($215)(_vars$1);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($215);
                        case 'Maybe.some':
                            var $216 = self.value;
                            return $216;
                    }
                })();
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $217 = self.eras;
                var $218 = self.self;
                var $219 = self.name;
                var $220 = self.xtyp;
                var $221 = self.body;
                return (() => {
                    var _vlen$9 = List$length(_vars$1);
                    return Fm$Term$all($217)($218)($219)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($220))((_s$10 => (_x$11 => Fm$Term$bind(List$cons(Pair$new($219)(_x$11))(List$cons(Pair$new($218)(_s$10))(_vars$1)))(Fm$Path$1(_path$2))($221(Fm$Term$var($218)(_vlen$9))(Fm$Term$var($219)(Nat$succ(_vlen$9)))))))
                })();
            case 'Fm.Term.lam':
                var $222 = self.name;
                var $223 = self.body;
                return (() => {
                    var _vlen$6 = List$length(_vars$1);
                    return Fm$Term$lam($222)((_x$7 => Fm$Term$bind(List$cons(Pair$new($222)(_x$7))(_vars$1))(Fm$Path$0(_path$2))($223(Fm$Term$var($222)(_vlen$6)))))
                })();
            case 'Fm.Term.app':
                var $224 = self.func;
                var $225 = self.argm;
                return Fm$Term$app(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($224))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($225));
            case 'Fm.Term.let':
                var $226 = self.name;
                var $227 = self.expr;
                var $228 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$let($226)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($227))((_x$8 => Fm$Term$bind(List$cons(Pair$new($226)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($228(Fm$Term$var($226)(_vlen$7)))))
                })();
            case 'Fm.Term.def':
                var $229 = self.name;
                var $230 = self.expr;
                var $231 = self.body;
                return (() => {
                    var _vlen$7 = List$length(_vars$1);
                    return Fm$Term$def($229)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($230))((_x$8 => Fm$Term$bind(List$cons(Pair$new($229)(_x$8))(_vars$1))(Fm$Path$1(_path$2))($231(Fm$Term$var($229)(_vlen$7)))))
                })();
            case 'Fm.Term.ann':
                var $232 = self.done;
                var $233 = self.term;
                var $234 = self.type;
                return Fm$Term$ann($232)(Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($233))(Fm$Term$bind(_vars$1)(Fm$Path$1(_path$2))($234));
            case 'Fm.Term.gol':
                var $235 = self.name;
                var $236 = self.dref;
                var $237 = self.verb;
                return Fm$Term$gol($235)($236)($237);
            case 'Fm.Term.hol':
                var $238 = self.path;
                return Fm$Term$hol(Fm$Path$to_bits(_path$2));
            case 'Fm.Term.nat':
                var $239 = self.natx;
                return Fm$Term$nat($239);
            case 'Fm.Term.chr':
                var $240 = self.chrx;
                return Fm$Term$chr($240);
            case 'Fm.Term.str':
                var $241 = self.strx;
                return Fm$Term$str($241);
            case 'Fm.Term.cse':
                var $242 = self.path;
                var $243 = self.expr;
                var $244 = self.name;
                var $245 = self.with;
                var $246 = self.cses;
                var $247 = self.moti;
                return (() => {
                    var _expr$10 = Fm$Term$bind(_vars$1)(Fm$Path$0(_path$2))($243);
                    var _name$11 = $244;
                    var _with$12 = $245;
                    var _cses$13 = $246;
                    var _moti$14 = $247;
                    return Fm$Term$cse(Fm$Path$to_bits(_path$2))(_expr$10)(_name$11)(_with$12)(_cses$13)(_moti$14)
                })();
        }
    })())));
    var Fm$Parser$definition = Monad$bind(Parser$monad)(Fm$Parser$spaces)((_$1 => Monad$bind(Parser$monad)(Fm$Parser$name)((_name$2 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$binder))((_args$3 => (() => {
        var _args$4 = List$flatten(_args$3);
        return Monad$bind(Parser$monad)(Fm$Parser$spaces_text(":"))((_$5 => Monad$bind(Parser$monad)(Fm$Parser$term)((_type$6 => Monad$bind(Parser$monad)(Fm$Parser$term)((_term$7 => (() => {
            var _type$8 = Fm$Parser$make_forall(_args$4)(_type$6);
            var _term$9 = Fm$Parser$make_lambda(List$mapped(_args$4)((_x$9 => (() => {
                var self = _x$9;
                switch (self._) {
                    case 'Fm.Binder.new':
                        var $248 = self.eras;
                        var $249 = self.name;
                        var $250 = self.term;
                        return $249;
                }
            })())))(_term$7);
            var _type$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$1(_x$10)))(_type$8);
            var _term$11 = Fm$Term$bind(List$nil)((_x$11 => Bits$0(_x$11)))(_term$9);
            return Monad$pure(Parser$monad)(Fm$Def$new(_name$2)(_term$11)(_type$10)(Bool$false))
        })()))))))
    })()))))));
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
        return Monad$bind(Parser$monad)(Fm$Parser$spaces_text("{"))((_$7 => Monad$bind(Parser$monad)(Parser$many(Fm$Parser$item(Fm$Parser$constructor(_name$2))))((_ctrs$8 => Monad$bind(Parser$monad)(Fm$Parser$spaces_text("}"))((_$9 => Monad$pure(Parser$monad)(Fm$Datatype$new(_name$2)(_pars$5)(_inds$6)(_ctrs$8))))))))
    })()))))))));
    var Fm$Datatype$build_term$motive$go = (_type$1 => (_name$2 => (_inds$3 => (() => {
        var self = _inds$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _type$1;
                    switch (self._) {
                        case 'Fm.Datatype.new':
                            var $251 = self.name;
                            var $252 = self.pars;
                            var $253 = self.inds;
                            var $254 = self.ctrs;
                            return (() => {
                                var _slf$8 = Fm$Term$ref(_name$2);
                                var _slf$9 = (list_for($252)(_slf$8)((_var$9 => (_slf$10 => Fm$Term$app(_slf$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $255 = self.eras;
                                            var $256 = self.name;
                                            var $257 = self.term;
                                            return $256;
                                    }
                                })()))))));
                                var _slf$10 = (list_for($253)(_slf$9)((_var$10 => (_slf$11 => Fm$Term$app(_slf$11)(Fm$Term$ref((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $258 = self.eras;
                                            var $259 = self.name;
                                            var $260 = self.term;
                                            return $259;
                                    }
                                })()))))));
                                return Fm$Term$all(Bool$false)("")(Fm$Name$read("self"))(_slf$10)((_s$11 => (_x$12 => Fm$Term$typ)))
                            })();
                    }
                })();
            case 'List.cons':
                var $261 = self.head;
                var $262 = self.tail;
                return (() => {
                    var self = $261;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $263 = self.eras;
                            var $264 = self.name;
                            var $265 = self.term;
                            return Fm$Term$all($263)("")($264)($265)((_s$9 => (_x$10 => Fm$Datatype$build_term$motive$go(_type$1)(_name$2)($262))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$motive = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $266 = self.name;
                var $267 = self.pars;
                var $268 = self.inds;
                var $269 = self.ctrs;
                return Fm$Datatype$build_term$motive$go(_type$1)($266)($268);
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
                            var $270 = self.name;
                            var $271 = self.pars;
                            var $272 = self.inds;
                            var $273 = self.ctrs;
                            return (() => {
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Fm.Constructor.new':
                                        var $274 = self.name;
                                        var $275 = self.args;
                                        var $276 = self.inds;
                                        return (() => {
                                            var _ret$11 = Fm$Term$ref(Fm$Name$read("P"));
                                            var _ret$12 = (list_for($276)(_ret$11)((_var$12 => (_ret$13 => Fm$Term$app(_ret$13)((() => {
                                                var self = _var$12;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $277 = self.eras;
                                                        var $278 = self.name;
                                                        var $279 = self.term;
                                                        return $279;
                                                }
                                            })())))));
                                            var _ctr$13 = String$flatten(List$cons($270)(List$cons(Fm$Name$read("."))(List$cons($274)(List$nil))));
                                            var _slf$14 = Fm$Term$ref(_ctr$13);
                                            var _slf$15 = (list_for($271)(_slf$14)((_var$15 => (_slf$16 => Fm$Term$app(_slf$16)(Fm$Term$ref((() => {
                                                var self = _var$15;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $280 = self.eras;
                                                        var $281 = self.name;
                                                        var $282 = self.term;
                                                        return $281;
                                                }
                                            })()))))));
                                            var _slf$16 = (list_for($275)(_slf$15)((_var$16 => (_slf$17 => Fm$Term$app(_slf$17)(Fm$Term$ref((() => {
                                                var self = _var$16;
                                                switch (self._) {
                                                    case 'Fm.Binder.new':
                                                        var $283 = self.eras;
                                                        var $284 = self.name;
                                                        var $285 = self.term;
                                                        return $284;
                                                }
                                            })()))))));
                                            return Fm$Term$app(_ret$12)(_slf$16)
                                        })();
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $286 = self.head;
                var $287 = self.tail;
                return (() => {
                    var self = $286;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $288 = self.eras;
                            var $289 = self.name;
                            var $290 = self.term;
                            return (() => {
                                var _eras$9 = $288;
                                var _name$10 = $289;
                                var _xtyp$11 = $290;
                                var _body$12 = Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($287);
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
                var $291 = self.name;
                var $292 = self.args;
                var $293 = self.inds;
                return Fm$Datatype$build_term$constructor$go(_type$1)(_ctor$2)($292);
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
                            var $294 = self.name;
                            var $295 = self.pars;
                            var $296 = self.inds;
                            var $297 = self.ctrs;
                            return (() => {
                                var _ret$8 = Fm$Term$ref(Fm$Name$read("P"));
                                var _ret$9 = (list_for($296)(_ret$8)((_var$9 => (_ret$10 => Fm$Term$app(_ret$10)(Fm$Term$ref((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $298 = self.eras;
                                            var $299 = self.name;
                                            var $300 = self.term;
                                            return $299;
                                    }
                                })()))))));
                                return Fm$Term$app(_ret$9)(Fm$Term$ref((_name$2 + ".Self")))
                            })();
                    }
                })();
            case 'List.cons':
                var $301 = self.head;
                var $302 = self.tail;
                return (() => {
                    var self = $301;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $303 = self.name;
                            var $304 = self.args;
                            var $305 = self.inds;
                            return Fm$Term$all(Bool$false)("")($303)(Fm$Datatype$build_term$constructor(_type$1)($301))((_s$9 => (_x$10 => Fm$Datatype$build_term$constructors$go(_type$1)(_name$2)($302))));
                    }
                })();
        }
    })())));
    var Fm$Datatype$build_term$constructors = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $306 = self.name;
                var $307 = self.pars;
                var $308 = self.inds;
                var $309 = self.ctrs;
                return Fm$Datatype$build_term$constructors$go(_type$1)($306)($309);
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
                            var $310 = self.head;
                            var $311 = self.tail;
                            return (() => {
                                var self = $310;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $312 = self.eras;
                                        var $313 = self.name;
                                        var $314 = self.term;
                                        return Fm$Term$lam($313)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)(_pars$3)($311)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $315 = self.head;
                var $316 = self.tail;
                return (() => {
                    var self = $315;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $317 = self.eras;
                            var $318 = self.name;
                            var $319 = self.term;
                            return Fm$Term$lam($318)((_x$10 => Fm$Datatype$build_term$go(_type$1)(_name$2)($316)(_inds$4)));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_term = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $320 = self.name;
                var $321 = self.pars;
                var $322 = self.inds;
                var $323 = self.ctrs;
                return Fm$Datatype$build_term$go(_type$1)($320)($321)($322);
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
                            var $324 = self.head;
                            var $325 = self.tail;
                            return (() => {
                                var self = $324;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $326 = self.eras;
                                        var $327 = self.name;
                                        var $328 = self.term;
                                        return Fm$Term$all(Bool$false)("")($327)($328)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)(_pars$3)($325))));
                                }
                            })();
                    }
                })();
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
                            return Fm$Term$all(Bool$false)("")($332)($333)((_s$10 => (_x$11 => Fm$Datatype$build_type$go(_type$1)(_name$2)($330)(_inds$4))));
                    }
                })();
        }
    })()))));
    var Fm$Datatype$build_type = (_type$1 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $334 = self.name;
                var $335 = self.pars;
                var $336 = self.inds;
                var $337 = self.ctrs;
                return Fm$Datatype$build_type$go(_type$1)($334)($335)($336);
        }
    })());
    var Fm$set = (_name$2 => (_val$3 => (_map$4 => Map$set((fm_name_to_bits(_name$2)))(_val$3)(_map$4))));
    var Fm$Constructor$build_term$opt$go = (_type$1 => (_ctor$2 => (_ctrs$3 => (() => {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.nil':
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $338 = self.name;
                            var $339 = self.args;
                            var $340 = self.inds;
                            return (() => {
                                var _ret$7 = Fm$Term$ref($338);
                                var _ret$8 = (list_for($339)(_ret$7)((_arg$8 => (_ret$9 => Fm$Term$app(_ret$9)(Fm$Term$ref((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Fm.Binder.new':
                                            var $341 = self.eras;
                                            var $342 = self.name;
                                            var $343 = self.term;
                                            return $342;
                                    }
                                })()))))));
                                return _ret$8
                            })();
                    }
                })();
            case 'List.cons':
                var $344 = self.head;
                var $345 = self.tail;
                return (() => {
                    var self = $344;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $346 = self.name;
                            var $347 = self.args;
                            var $348 = self.inds;
                            return Fm$Term$lam($346)((_x$9 => Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($345)));
                    }
                })();
        }
    })())));
    var Fm$Constructor$build_term$opt = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $349 = self.name;
                var $350 = self.pars;
                var $351 = self.inds;
                var $352 = self.ctrs;
                return Fm$Constructor$build_term$opt$go(_type$1)(_ctor$2)($352);
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
                            var $353 = self.head;
                            var $354 = self.tail;
                            return (() => {
                                var self = $353;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $355 = self.eras;
                                        var $356 = self.name;
                                        var $357 = self.term;
                                        return Fm$Term$lam($356)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($354)));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $358 = self.head;
                var $359 = self.tail;
                return (() => {
                    var self = $358;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $360 = self.eras;
                            var $361 = self.name;
                            var $362 = self.term;
                            return Fm$Term$lam($361)((_x$11 => Fm$Constructor$build_term$go(_type$1)(_ctor$2)(_name$3)($359)(_args$5)));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_term = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $363 = self.name;
                var $364 = self.pars;
                var $365 = self.inds;
                var $366 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $367 = self.name;
                            var $368 = self.args;
                            var $369 = self.inds;
                            return Fm$Constructor$build_term$go(_type$1)(_ctor$2)($363)($364)($368);
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
                                        var $370 = self.name;
                                        var $371 = self.pars;
                                        var $372 = self.inds;
                                        var $373 = self.ctrs;
                                        return (() => {
                                            var self = _ctor$2;
                                            switch (self._) {
                                                case 'Fm.Constructor.new':
                                                    var $374 = self.name;
                                                    var $375 = self.args;
                                                    var $376 = self.inds;
                                                    return (() => {
                                                        var _type$13 = Fm$Term$ref(_name$3);
                                                        var _type$14 = (list_for($371)(_type$13)((_var$14 => (_type$15 => Fm$Term$app(_type$15)(Fm$Term$ref((() => {
                                                            var self = _var$14;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $377 = self.eras;
                                                                    var $378 = self.name;
                                                                    var $379 = self.term;
                                                                    return $378;
                                                            }
                                                        })()))))));
                                                        var _type$15 = (list_for($376)(_type$14)((_var$15 => (_type$16 => Fm$Term$app(_type$16)((() => {
                                                            var self = _var$15;
                                                            switch (self._) {
                                                                case 'Fm.Binder.new':
                                                                    var $380 = self.eras;
                                                                    var $381 = self.name;
                                                                    var $382 = self.term;
                                                                    return $382;
                                                            }
                                                        })())))));
                                                        return _type$15
                                                    })();
                                            }
                                        })();
                                }
                            })();
                        case 'List.cons':
                            var $383 = self.head;
                            var $384 = self.tail;
                            return (() => {
                                var self = $383;
                                switch (self._) {
                                    case 'Fm.Binder.new':
                                        var $385 = self.eras;
                                        var $386 = self.name;
                                        var $387 = self.term;
                                        return Fm$Term$all($385)("")($386)($387)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)(_pars$4)($384))));
                                }
                            })();
                    }
                })();
            case 'List.cons':
                var $388 = self.head;
                var $389 = self.tail;
                return (() => {
                    var self = $388;
                    switch (self._) {
                        case 'Fm.Binder.new':
                            var $390 = self.eras;
                            var $391 = self.name;
                            var $392 = self.term;
                            return Fm$Term$all($390)("")($391)($392)((_s$11 => (_x$12 => Fm$Constructor$build_type$go(_type$1)(_ctor$2)(_name$3)($389)(_args$5))));
                    }
                })();
        }
    })())))));
    var Fm$Constructor$build_type = (_type$1 => (_ctor$2 => (() => {
        var self = _type$1;
        switch (self._) {
            case 'Fm.Datatype.new':
                var $393 = self.name;
                var $394 = self.pars;
                var $395 = self.inds;
                var $396 = self.ctrs;
                return (() => {
                    var self = _ctor$2;
                    switch (self._) {
                        case 'Fm.Constructor.new':
                            var $397 = self.name;
                            var $398 = self.args;
                            var $399 = self.inds;
                            return Fm$Constructor$build_type$go(_type$1)(_ctor$2)($393)($394)($398);
                    }
                })();
        }
    })()));
    var Fm$Parser$file$go = (_defs$1 => Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$definition))((_def$2 => (() => {
        var self = _def$2;
        switch (self._) {
            case 'Maybe.none':
                return Monad$bind(Parser$monad)(Parser$maybe(Fm$Parser$datatype))((_adt$3 => (() => {
                    var self = _adt$3;
                    switch (self._) {
                        case 'Maybe.none':
                            return Monad$pure(Parser$monad)(_defs$1);
                        case 'Maybe.some':
                            var $400 = self.value;
                            return (() => {
                                var self = $400;
                                switch (self._) {
                                    case 'Fm.Datatype.new':
                                        var $401 = self.name;
                                        var $402 = self.pars;
                                        var $403 = self.inds;
                                        var $404 = self.ctrs;
                                        return (() => {
                                            var _term$9 = Fm$Datatype$build_term($400);
                                            var _term$10 = Fm$Term$bind(List$nil)((_x$10 => Bits$1(_x$10)))(_term$9);
                                            var _type$11 = Fm$Datatype$build_type($400);
                                            var _type$12 = Fm$Term$bind(List$nil)((_x$12 => Bits$0(_x$12)))(_type$11);
                                            var _defs$13 = Fm$set($401)(Fm$Def$new($401)(_term$10)(_type$12)(Bool$false))(_defs$1);
                                            var _defs$14 = List$fold($404)(_defs$13)((_ctr$14 => (_defs$15 => (() => {
                                                var _typ_name$16 = $401;
                                                var _ctr_name$17 = String$flatten(List$cons(_typ_name$16)(List$cons(Fm$Name$read("."))(List$cons((() => {
                                                    var self = _ctr$14;
                                                    switch (self._) {
                                                        case 'Fm.Constructor.new':
                                                            var $405 = self.name;
                                                            var $406 = self.args;
                                                            var $407 = self.inds;
                                                            return $405;
                                                    }
                                                })())(List$nil))));
                                                var _ctr_term$18 = Fm$Constructor$build_term($400)(_ctr$14);
                                                var _ctr_term$19 = Fm$Term$bind(List$nil)((_x$19 => Bits$1(_x$19)))(_ctr_term$18);
                                                var _ctr_type$20 = Fm$Constructor$build_type($400)(_ctr$14);
                                                var _ctr_type$21 = Fm$Term$bind(List$nil)((_x$21 => Bits$0(_x$21)))(_ctr_type$20);
                                                return Fm$set(_ctr_name$17)(Fm$Def$new(_ctr_name$17)(_ctr_term$19)(_ctr_type$21)(Bool$false))(_defs$15)
                                            })())));
                                            return Fm$Parser$file$go(_defs$14)
                                        })();
                                }
                            })();
                    }
                })()));
            case 'Maybe.some':
                var $408 = self.value;
                return (() => {
                    var self = $408;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $409 = self.name;
                            var $410 = self.term;
                            var $411 = self.type;
                            var $412 = self.done;
                            return Fm$Parser$file$go(Fm$set($409)($408)(_defs$1));
                    }
                })();
        }
    })())));
    var Fm$Parser$file = Fm$Parser$file$go(Map$new);
    var Fm$Defs$read = (_code$1 => (() => {
        var self = Fm$Parser$file(_code$1);
        switch (self._) {
            case 'Parser.Reply.error':
                var $413 = self.code;
                var $414 = self.err;
                return Maybe$none;
            case 'Parser.Reply.value':
                var $415 = self.code;
                var $416 = self.val;
                return Maybe$some($416);
        }
    })());
    var Map$to_list$go = (_xs$2 => (_key$3 => (_list$4 => (() => {
        var self = _xs$2;
        switch (self._) {
            case 'Map.new':
                return _list$4;
            case 'Map.tie':
                var $417 = self.val;
                var $418 = self.lft;
                var $419 = self.rgt;
                return (() => {
                    var _list0$8 = (() => {
                        var self = $417;
                        switch (self._) {
                            case 'Maybe.none':
                                return _list$4;
                            case 'Maybe.some':
                                var $420 = self.value;
                                return List$cons(Pair$new(Bits$reverse(_key$3))($420))(_list$4);
                        }
                    })();
                    var _list1$9 = Map$to_list$go($418)(Bits$0(_key$3))(_list0$8);
                    var _list2$10 = Map$to_list$go($419)(Bits$1(_key$3))(_list1$9);
                    return _list2$10
                })();
        }
    })())));
    var Map$to_list = (_xs$2 => List$reverse(Map$to_list$go(_xs$2)(Bits$nil)(List$nil)));
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
                var $421 = self.value;
                var $422 = self.errors;
                return (() => {
                    var self = $421;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(Maybe$none)($422);
                        case 'Maybe.some':
                            var $423 = self.value;
                            return (() => {
                                var self = _f$4($423);
                                switch (self._) {
                                    case 'Fm.Check.result':
                                        var $424 = self.value;
                                        var $425 = self.errors;
                                        return Fm$Check$result($424)(List$concat($422)($425));
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
                                    var $426 = self.val;
                                    var $427 = self.lft;
                                    var $428 = self.rgt;
                                    return $426;
                            }
                        })();
                    case '0':
                        var $429 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $430 = self.val;
                                    var $431 = self.lft;
                                    var $432 = self.rgt;
                                    return Map$get($429)($431);
                            }
                        })();
                    case '1':
                        var $433 = self.slice(0, -1);
                        return (() => {
                            var self = _map$3;
                            switch (self._) {
                                case 'Map.new':
                                    return Maybe$none;
                                case 'Map.tie':
                                    var $434 = self.val;
                                    var $435 = self.lft;
                                    var $436 = self.rgt;
                                    return Map$get($433)($436);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$get = (_name$2 => (_map$3 => Map$get((fm_name_to_bits(_name$2)))(_map$3)));
    var Maybe$mapped = (_m$2 => (_f$4 => (() => {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $437 = self.value;
                return Maybe$some(_f$4($437));
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
                var $438 = (self - 1n);
                return (() => {
                    var _func$3 = Fm$Term$ref(Fm$Name$read("Nat.succ"));
                    var _argm$4 = Fm$Term$nat($438);
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
                var $439 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.0")))(Fm$Term$unroll_chr$bits($439));
            case '1':
                var $440 = self.slice(0, -1);
                return Fm$Term$app(Fm$Term$ref(Fm$Name$read("Bits.1")))(Fm$Term$unroll_chr$bits($440));
        }
    })());
    var Fm$Term$unroll_chr = (_chrx$1 => (() => {
        var self = _chrx$1;
        switch ('u16') {
            case 'u16':
                var $441 = u16_to_word(self);
                return (() => {
                    var _term$3 = Fm$Term$ref(Fm$Name$read("Word.from_bits"));
                    var _term$4 = Fm$Term$app(_term$3)(Fm$Term$nat(16n));
                    var _term$5 = Fm$Term$app(_term$4)(Fm$Term$unroll_chr$bits(Word$to_bits($441)));
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
                var $442 = self.charCodeAt(0);
                var $443 = self.slice(1);
                return (() => {
                    var _char$4 = Fm$Term$chr($442);
                    var _term$5 = Fm$Term$ref(Fm$Name$read("String.cons"));
                    var _term$6 = Fm$Term$app(_term$5)(_char$4);
                    var _term$7 = Fm$Term$app(_term$6)(Fm$Term$str($443));
                    return _term$7
                })();
        }
    })());
    var Fm$Term$reduce = (_term$1 => (_defs$2 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $444 = self.name;
                var $445 = self.indx;
                return _term$1;
            case 'Fm.Term.ref':
                var $446 = self.name;
                return (() => {
                    var self = Fm$get($446)(_defs$2);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($446);
                        case 'Maybe.some':
                            var $447 = self.value;
                            return (() => {
                                var self = $447;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $448 = self.name;
                                        var $449 = self.term;
                                        var $450 = self.type;
                                        var $451 = self.done;
                                        return Fm$Term$reduce($449)(_defs$2);
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$1;
            case 'Fm.Term.all':
                var $452 = self.eras;
                var $453 = self.self;
                var $454 = self.name;
                var $455 = self.xtyp;
                var $456 = self.body;
                return _term$1;
            case 'Fm.Term.lam':
                var $457 = self.name;
                var $458 = self.body;
                return _term$1;
            case 'Fm.Term.app':
                var $459 = self.func;
                var $460 = self.argm;
                return (() => {
                    var _func$5 = Fm$Term$reduce($459)(_defs$2);
                    return (() => {
                        var self = _func$5;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $461 = self.name;
                                var $462 = self.indx;
                                return _term$1;
                            case 'Fm.Term.ref':
                                var $463 = self.name;
                                return _term$1;
                            case 'Fm.Term.typ':
                                return _term$1;
                            case 'Fm.Term.all':
                                var $464 = self.eras;
                                var $465 = self.self;
                                var $466 = self.name;
                                var $467 = self.xtyp;
                                var $468 = self.body;
                                return _term$1;
                            case 'Fm.Term.lam':
                                var $469 = self.name;
                                var $470 = self.body;
                                return Fm$Term$reduce($470($460))(_defs$2);
                            case 'Fm.Term.app':
                                var $471 = self.func;
                                var $472 = self.argm;
                                return _term$1;
                            case 'Fm.Term.let':
                                var $473 = self.name;
                                var $474 = self.expr;
                                var $475 = self.body;
                                return _term$1;
                            case 'Fm.Term.def':
                                var $476 = self.name;
                                var $477 = self.expr;
                                var $478 = self.body;
                                return _term$1;
                            case 'Fm.Term.ann':
                                var $479 = self.done;
                                var $480 = self.term;
                                var $481 = self.type;
                                return _term$1;
                            case 'Fm.Term.gol':
                                var $482 = self.name;
                                var $483 = self.dref;
                                var $484 = self.verb;
                                return _term$1;
                            case 'Fm.Term.hol':
                                var $485 = self.path;
                                return _term$1;
                            case 'Fm.Term.nat':
                                var $486 = self.natx;
                                return _term$1;
                            case 'Fm.Term.chr':
                                var $487 = self.chrx;
                                return _term$1;
                            case 'Fm.Term.str':
                                var $488 = self.strx;
                                return _term$1;
                            case 'Fm.Term.cse':
                                var $489 = self.path;
                                var $490 = self.expr;
                                var $491 = self.name;
                                var $492 = self.with;
                                var $493 = self.cses;
                                var $494 = self.moti;
                                return _term$1;
                        }
                    })()
                })();
            case 'Fm.Term.let':
                var $495 = self.name;
                var $496 = self.expr;
                var $497 = self.body;
                return Fm$Term$reduce($497($496))(_defs$2);
            case 'Fm.Term.def':
                var $498 = self.name;
                var $499 = self.expr;
                var $500 = self.body;
                return Fm$Term$reduce($500($499))(_defs$2);
            case 'Fm.Term.ann':
                var $501 = self.done;
                var $502 = self.term;
                var $503 = self.type;
                return Fm$Term$reduce($502)(_defs$2);
            case 'Fm.Term.gol':
                var $504 = self.name;
                var $505 = self.dref;
                var $506 = self.verb;
                return _term$1;
            case 'Fm.Term.hol':
                var $507 = self.path;
                return _term$1;
            case 'Fm.Term.nat':
                var $508 = self.natx;
                return Fm$Term$reduce(Fm$Term$unroll_nat($508))(_defs$2);
            case 'Fm.Term.chr':
                var $509 = self.chrx;
                return Fm$Term$reduce(Fm$Term$unroll_chr($509))(_defs$2);
            case 'Fm.Term.str':
                var $510 = self.strx;
                return Fm$Term$reduce(Fm$Term$unroll_str($510))(_defs$2);
            case 'Fm.Term.cse':
                var $511 = self.path;
                var $512 = self.expr;
                var $513 = self.name;
                var $514 = self.with;
                var $515 = self.cses;
                var $516 = self.moti;
                return _term$1;
        }
    })()));
    var Either$left = (_value$3 => ({
        _: 'Either.left',
        'value': _value$3
    }));
    var Either$right = (_value$3 => ({
        _: 'Either.right',
        'value': _value$3
    }));
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
                var $517 = self.head;
                var $518 = self.tail;
                return (() => {
                    var self = $517;
                    switch (self._) {
                        case 'Fm.Def.new':
                            var $519 = self.name;
                            var $520 = self.term;
                            var $521 = self.type;
                            var $522 = self.done;
                            return Fm$Term$all(Bool$false)("")($519)($521)((_s$9 => (_x$10 => Fm$Term$desugar_cse$motive($518)(_moti$2))));
                    }
                })();
        }
    })()));
    var Fm$Term$desugar_cse$argument = (_name$1 => (_wyth$2 => (_type$3 => (_body$4 => (_defs$5 => (() => {
        var self = Fm$Term$reduce(_type$3)(_defs$5);
        switch (self._) {
            case 'Fm.Term.var':
                var $523 = self.name;
                var $524 = self.indx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $525 = self.head;
                            var $526 = self.tail;
                            return (() => {
                                var self = $525;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $527 = self.name;
                                        var $528 = self.term;
                                        var $529 = self.type;
                                        var $530 = self.done;
                                        return Fm$Term$lam($527)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($526)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $531 = self.name;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $532 = self.head;
                            var $533 = self.tail;
                            return (() => {
                                var self = $532;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $534 = self.name;
                                        var $535 = self.term;
                                        var $536 = self.type;
                                        var $537 = self.done;
                                        return Fm$Term$lam($534)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($533)(_type$3)(_body$4)(_defs$5)));
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
                            var $538 = self.head;
                            var $539 = self.tail;
                            return (() => {
                                var self = $538;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $540 = self.name;
                                        var $541 = self.term;
                                        var $542 = self.type;
                                        var $543 = self.done;
                                        return Fm$Term$lam($540)((_x$12 => Fm$Term$desugar_cse$argument(_name$1)($539)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.all':
                var $544 = self.eras;
                var $545 = self.self;
                var $546 = self.name;
                var $547 = self.xtyp;
                var $548 = self.body;
                return Fm$Term$lam(String$flatten(List$cons(_name$1)(List$cons(Fm$Name$read("."))(List$cons($546)(List$nil)))))((_x$11 => Fm$Term$desugar_cse$argument(_name$1)(_wyth$2)($548(Fm$Term$var($545)(0n))(Fm$Term$var($546)(0n)))(_body$4)(_defs$5)));
            case 'Fm.Term.lam':
                var $549 = self.name;
                var $550 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $551 = self.head;
                            var $552 = self.tail;
                            return (() => {
                                var self = $551;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $553 = self.name;
                                        var $554 = self.term;
                                        var $555 = self.type;
                                        var $556 = self.done;
                                        return Fm$Term$lam($553)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($552)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $557 = self.func;
                var $558 = self.argm;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $559 = self.head;
                            var $560 = self.tail;
                            return (() => {
                                var self = $559;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $561 = self.name;
                                        var $562 = self.term;
                                        var $563 = self.type;
                                        var $564 = self.done;
                                        return Fm$Term$lam($561)((_x$14 => Fm$Term$desugar_cse$argument(_name$1)($560)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.let':
                var $565 = self.name;
                var $566 = self.expr;
                var $567 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $568 = self.head;
                            var $569 = self.tail;
                            return (() => {
                                var self = $568;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $570 = self.name;
                                        var $571 = self.term;
                                        var $572 = self.type;
                                        var $573 = self.done;
                                        return Fm$Term$lam($570)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($569)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.def':
                var $574 = self.name;
                var $575 = self.expr;
                var $576 = self.body;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $577 = self.head;
                            var $578 = self.tail;
                            return (() => {
                                var self = $577;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $579 = self.name;
                                        var $580 = self.term;
                                        var $581 = self.type;
                                        var $582 = self.done;
                                        return Fm$Term$lam($579)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($578)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.ann':
                var $583 = self.done;
                var $584 = self.term;
                var $585 = self.type;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $586 = self.head;
                            var $587 = self.tail;
                            return (() => {
                                var self = $586;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $588 = self.name;
                                        var $589 = self.term;
                                        var $590 = self.type;
                                        var $591 = self.done;
                                        return Fm$Term$lam($588)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($587)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.gol':
                var $592 = self.name;
                var $593 = self.dref;
                var $594 = self.verb;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $595 = self.head;
                            var $596 = self.tail;
                            return (() => {
                                var self = $595;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $597 = self.name;
                                        var $598 = self.term;
                                        var $599 = self.type;
                                        var $600 = self.done;
                                        return Fm$Term$lam($597)((_x$15 => Fm$Term$desugar_cse$argument(_name$1)($596)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.hol':
                var $601 = self.path;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $602 = self.head;
                            var $603 = self.tail;
                            return (() => {
                                var self = $602;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $604 = self.name;
                                        var $605 = self.term;
                                        var $606 = self.type;
                                        var $607 = self.done;
                                        return Fm$Term$lam($604)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($603)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.nat':
                var $608 = self.natx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $609 = self.head;
                            var $610 = self.tail;
                            return (() => {
                                var self = $609;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $611 = self.name;
                                        var $612 = self.term;
                                        var $613 = self.type;
                                        var $614 = self.done;
                                        return Fm$Term$lam($611)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($610)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.chr':
                var $615 = self.chrx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $616 = self.head;
                            var $617 = self.tail;
                            return (() => {
                                var self = $616;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $618 = self.name;
                                        var $619 = self.term;
                                        var $620 = self.type;
                                        var $621 = self.done;
                                        return Fm$Term$lam($618)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($617)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.str':
                var $622 = self.strx;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $623 = self.head;
                            var $624 = self.tail;
                            return (() => {
                                var self = $623;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $625 = self.name;
                                        var $626 = self.term;
                                        var $627 = self.type;
                                        var $628 = self.done;
                                        return Fm$Term$lam($625)((_x$13 => Fm$Term$desugar_cse$argument(_name$1)($624)(_type$3)(_body$4)(_defs$5)));
                                }
                            })();
                    }
                })();
            case 'Fm.Term.cse':
                var $629 = self.path;
                var $630 = self.expr;
                var $631 = self.name;
                var $632 = self.with;
                var $633 = self.cses;
                var $634 = self.moti;
                return (() => {
                    var self = _wyth$2;
                    switch (self._) {
                        case 'List.nil':
                            return _body$4;
                        case 'List.cons':
                            var $635 = self.head;
                            var $636 = self.tail;
                            return (() => {
                                var self = $635;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $637 = self.name;
                                        var $638 = self.term;
                                        var $639 = self.type;
                                        var $640 = self.done;
                                        return Fm$Term$lam($637)((_x$18 => Fm$Term$desugar_cse$argument(_name$1)($636)(_type$3)(_body$4)(_defs$5)));
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
                var $641 = self.value;
                return Maybe$some($641);
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
                        var $642 = self.name;
                        var $643 = self.indx;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $644 = self.name;
                                        var $645 = self.term;
                                        var $646 = self.type;
                                        var $647 = self.done;
                                        return $645;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.ref':
                        var $648 = self.name;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $649 = self.name;
                                        var $650 = self.term;
                                        var $651 = self.type;
                                        var $652 = self.done;
                                        return $650;
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
                                        var $653 = self.name;
                                        var $654 = self.term;
                                        var $655 = self.type;
                                        var $656 = self.done;
                                        return $654;
                                }
                            })())))));
                            return _expr$8
                        })();
                    case 'Fm.Term.all':
                        var $657 = self.eras;
                        var $658 = self.self;
                        var $659 = self.name;
                        var $660 = self.xtyp;
                        var $661 = self.body;
                        return (() => {
                            var _got$13 = Maybe$or(Fm$get($659)(_cses$4))(Fm$get("_")(_cses$4));
                            return (() => {
                                var self = _got$13;
                                switch (self._) {
                                    case 'Maybe.none':
                                        return (() => {
                                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_def$14 => (_expr$15 => (() => {
                                                var self = _def$14;
                                                switch (self._) {
                                                    case 'Fm.Def.new':
                                                        var $662 = self.name;
                                                        var $663 = self.term;
                                                        var $664 = self.type;
                                                        var $665 = self.done;
                                                        return Fm$Term$app(_expr$15)($663);
                                                }
                                            })()))));
                                            return _expr$14
                                        })();
                                    case 'Maybe.some':
                                        var $666 = self.value;
                                        return (() => {
                                            var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(_wyth$3)($660)($666)(_defs$6);
                                            var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                                            var _type$17 = $661(Fm$Term$var($658)(0n))(Fm$Term$var($659)(0n));
                                            return Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_wyth$3)(_cses$4)(_type$17)(_defs$6)(_ctxt$7)
                                        })();
                                }
                            })()
                        })();
                    case 'Fm.Term.lam':
                        var $667 = self.name;
                        var $668 = self.body;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $669 = self.name;
                                        var $670 = self.term;
                                        var $671 = self.type;
                                        var $672 = self.done;
                                        return $670;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.app':
                        var $673 = self.func;
                        var $674 = self.argm;
                        return (() => {
                            var _expr$10 = (list_for(_wyth$3)(_expr$1)((_def$10 => (_expr$11 => Fm$Term$app(_expr$11)((() => {
                                var self = _def$10;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $675 = self.name;
                                        var $676 = self.term;
                                        var $677 = self.type;
                                        var $678 = self.done;
                                        return $676;
                                }
                            })())))));
                            return _expr$10
                        })();
                    case 'Fm.Term.let':
                        var $679 = self.name;
                        var $680 = self.expr;
                        var $681 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $682 = self.name;
                                        var $683 = self.term;
                                        var $684 = self.type;
                                        var $685 = self.done;
                                        return $683;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.def':
                        var $686 = self.name;
                        var $687 = self.expr;
                        var $688 = self.body;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $689 = self.name;
                                        var $690 = self.term;
                                        var $691 = self.type;
                                        var $692 = self.done;
                                        return $690;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.ann':
                        var $693 = self.done;
                        var $694 = self.term;
                        var $695 = self.type;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $696 = self.name;
                                        var $697 = self.term;
                                        var $698 = self.type;
                                        var $699 = self.done;
                                        return $697;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.gol':
                        var $700 = self.name;
                        var $701 = self.dref;
                        var $702 = self.verb;
                        return (() => {
                            var _expr$11 = (list_for(_wyth$3)(_expr$1)((_def$11 => (_expr$12 => Fm$Term$app(_expr$12)((() => {
                                var self = _def$11;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $703 = self.name;
                                        var $704 = self.term;
                                        var $705 = self.type;
                                        var $706 = self.done;
                                        return $704;
                                }
                            })())))));
                            return _expr$11
                        })();
                    case 'Fm.Term.hol':
                        var $707 = self.path;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $708 = self.name;
                                        var $709 = self.term;
                                        var $710 = self.type;
                                        var $711 = self.done;
                                        return $709;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.nat':
                        var $712 = self.natx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $713 = self.name;
                                        var $714 = self.term;
                                        var $715 = self.type;
                                        var $716 = self.done;
                                        return $714;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.chr':
                        var $717 = self.chrx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $718 = self.name;
                                        var $719 = self.term;
                                        var $720 = self.type;
                                        var $721 = self.done;
                                        return $719;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.str':
                        var $722 = self.strx;
                        return (() => {
                            var _expr$9 = (list_for(_wyth$3)(_expr$1)((_def$9 => (_expr$10 => Fm$Term$app(_expr$10)((() => {
                                var self = _def$9;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $723 = self.name;
                                        var $724 = self.term;
                                        var $725 = self.type;
                                        var $726 = self.done;
                                        return $724;
                                }
                            })())))));
                            return _expr$9
                        })();
                    case 'Fm.Term.cse':
                        var $727 = self.path;
                        var $728 = self.expr;
                        var $729 = self.name;
                        var $730 = self.with;
                        var $731 = self.cses;
                        var $732 = self.moti;
                        return (() => {
                            var _expr$14 = (list_for(_wyth$3)(_expr$1)((_def$14 => (_expr$15 => Fm$Term$app(_expr$15)((() => {
                                var self = _def$14;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $733 = self.name;
                                        var $734 = self.term;
                                        var $735 = self.type;
                                        var $736 = self.done;
                                        return $734;
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
                var $737 = self.name;
                var $738 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $739 = self.name;
                return Maybe$none;
            case 'Fm.Term.typ':
                return Maybe$none;
            case 'Fm.Term.all':
                var $740 = self.eras;
                var $741 = self.self;
                var $742 = self.name;
                var $743 = self.xtyp;
                var $744 = self.body;
                return (() => {
                    var _moti$14 = Fm$Term$desugar_cse$motive(_with$3)(_moti$5);
                    var _argm$15 = Fm$Term$desugar_cse$argument(_name$2)(List$nil)($743)(_moti$14)(_defs$7);
                    var _expr$16 = Fm$Term$app(_expr$1)(_argm$15);
                    var _type$17 = $744(Fm$Term$var($741)(0n))(Fm$Term$var($742)(0n));
                    return Maybe$some(Fm$Term$desugar_cse$cases(_expr$16)(_name$2)(_with$3)(_cses$4)(_type$17)(_defs$7)(_ctxt$8))
                })();
            case 'Fm.Term.lam':
                var $745 = self.name;
                var $746 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $747 = self.func;
                var $748 = self.argm;
                return Maybe$none;
            case 'Fm.Term.let':
                var $749 = self.name;
                var $750 = self.expr;
                var $751 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $752 = self.name;
                var $753 = self.expr;
                var $754 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $755 = self.done;
                var $756 = self.term;
                var $757 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $758 = self.name;
                var $759 = self.dref;
                var $760 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $761 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $762 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $763 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $764 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $765 = self.path;
                var $766 = self.expr;
                var $767 = self.name;
                var $768 = self.with;
                var $769 = self.cses;
                var $770 = self.moti;
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
                var $771 = self.value;
                return $771(Bits$nil);
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
                                    var $772 = (self - 1n);
                                    return Cmp$ltn;
                            }
                        })();
                    case 'succ':
                        var $773 = (self - 1n);
                        return (() => {
                            var self = _b$2;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Cmp$gtn;
                                case 'succ':
                                    var $774 = (self - 1n);
                                    return Nat$cmp($773)($774);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Nat$gte = a0 => a1 => (a0 >= a1);
    var Nat$pred = (_n$1 => (() => {
        var self = _n$1;
        switch (self === 0n ? 'zero' : 'succ') {
            case 'zero':
                return Nat$zero;
            case 'succ':
                var $775 = (self - 1n);
                return $775;
        }
    })());
    var Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);
    var U16$to_word = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $776 = u16_to_word(self);
                return $776;
        }
    })());
    var Fm$Term$serialize$go = (_term$1 => (_depth$2 => (_init$3 => (_x$4 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $777 = self.name;
                var $778 = self.indx;
                return (() => {
                    var self = ($778 >= _init$3);
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits(Nat$pred((_depth$2 - $778 <= 0n ? 0n : _depth$2 - $778)))));
                                return Bits$0(Bits$0(Bits$1(_name$7(_x$4))))
                            })();
                        case 'false':
                            return (() => {
                                var _name$7 = a1 => (a1 + (nat_to_bits($778)));
                                return Bits$0(Bits$1(Bits$0(_name$7(_x$4))))
                            })();
                    }
                })();
            case 'Fm.Term.ref':
                var $779 = self.name;
                return (() => {
                    var _name$6 = a1 => (a1 + (fm_name_to_bits($779)));
                    return Bits$0(Bits$0(Bits$0(_name$6(_x$4))))
                })();
            case 'Fm.Term.typ':
                return Bits$0(Bits$1(Bits$1(_x$4)));
            case 'Fm.Term.all':
                var $780 = self.eras;
                var $781 = self.self;
                var $782 = self.name;
                var $783 = self.xtyp;
                var $784 = self.body;
                return (() => {
                    var _eras$10 = (() => {
                        var self = $780;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return Bits$1;
                            case 'false':
                                return Bits$0;
                        }
                    })();
                    var _self$11 = a1 => (a1 + (fm_name_to_bits($781)));
                    var _xtyp$12 = Fm$Term$serialize$go($783)(_depth$2)(_init$3);
                    var _body$13 = Fm$Term$serialize$go($784(Fm$Term$var($781)(_depth$2))(Fm$Term$var($782)(Nat$succ(_depth$2))))(Nat$succ(Nat$succ(_depth$2)))(_init$3);
                    return Bits$1(Bits$0(Bits$0(_eras$10(_self$11(_xtyp$12(_body$13(_x$4)))))))
                })();
            case 'Fm.Term.lam':
                var $785 = self.name;
                var $786 = self.body;
                return (() => {
                    var _body$7 = Fm$Term$serialize$go($786(Fm$Term$var($785)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$0(Bits$1(_body$7(_x$4))))
                })();
            case 'Fm.Term.app':
                var $787 = self.func;
                var $788 = self.argm;
                return (() => {
                    var _func$7 = Fm$Term$serialize$go($787)(_depth$2)(_init$3);
                    var _argm$8 = Fm$Term$serialize$go($788)(_depth$2)(_init$3);
                    return Bits$1(Bits$1(Bits$0(_func$7(_argm$8(_x$4)))))
                })();
            case 'Fm.Term.let':
                var $789 = self.name;
                var $790 = self.expr;
                var $791 = self.body;
                return (() => {
                    var _expr$8 = Fm$Term$serialize$go($790)(_depth$2)(_init$3);
                    var _body$9 = Fm$Term$serialize$go($791(Fm$Term$var($789)(_depth$2)))(Nat$succ(_depth$2))(_init$3);
                    return Bits$1(Bits$1(Bits$1(_expr$8(_body$9(_x$4)))))
                })();
            case 'Fm.Term.def':
                var $792 = self.name;
                var $793 = self.expr;
                var $794 = self.body;
                return Fm$Term$serialize$go($794($793))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.ann':
                var $795 = self.done;
                var $796 = self.term;
                var $797 = self.type;
                return Fm$Term$serialize$go($796)(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.gol':
                var $798 = self.name;
                var $799 = self.dref;
                var $800 = self.verb;
                return (() => {
                    var _name$8 = a1 => (a1 + (fm_name_to_bits($798)));
                    return Bits$0(Bits$0(Bits$0(_name$8(_x$4))))
                })();
            case 'Fm.Term.hol':
                var $801 = self.path;
                return _x$4;
            case 'Fm.Term.nat':
                var $802 = self.natx;
                return Bits$0(Bits$0(Bits$0((_x$4 + (nat_to_bits($802))))));
            case 'Fm.Term.chr':
                var $803 = self.chrx;
                return Bits$0(Bits$0(Bits$0((_x$4 + Word$to_bits(U16$to_word($803))))));
            case 'Fm.Term.str':
                var $804 = self.strx;
                return Fm$Term$serialize$go(Fm$Term$unroll_str($804))(_depth$2)(_init$3)(_x$4);
            case 'Fm.Term.cse':
                var $805 = self.path;
                var $806 = self.expr;
                var $807 = self.name;
                var $808 = self.with;
                var $809 = self.cses;
                var $810 = self.moti;
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
                                    var $811 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $812 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '0':
                        var $813 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $814 = self.slice(0, -1);
                                    return Bits$eql($813)($814);
                                case '1':
                                    var $815 = self.slice(0, -1);
                                    return Bool$false;
                            }
                        })();
                    case '1':
                        var $816 = self.slice(0, -1);
                        return (() => {
                            var self = _b$2;
                            switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                case 'nil':
                                    return Bool$false;
                                case '0':
                                    var $817 = self.slice(0, -1);
                                    return Bool$false;
                                case '1':
                                    var $818 = self.slice(0, -1);
                                    return Bits$eql($816)($818);
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
                var $819 = self.value;
                return Bool$true;
        }
    })()));
    var Fm$Term$normalize = (_term$1 => (_defs$2 => (() => {
        var self = Fm$Term$reduce(_term$1)(_defs$2);
        switch (self._) {
            case 'Fm.Term.var':
                var $820 = self.name;
                var $821 = self.indx;
                return Fm$Term$var($820)($821);
            case 'Fm.Term.ref':
                var $822 = self.name;
                return Fm$Term$ref($822);
            case 'Fm.Term.typ':
                return Fm$Term$typ;
            case 'Fm.Term.all':
                var $823 = self.eras;
                var $824 = self.self;
                var $825 = self.name;
                var $826 = self.xtyp;
                var $827 = self.body;
                return Fm$Term$all($823)($824)($825)(Fm$Term$normalize($826)(_defs$2))((_s$8 => (_x$9 => Fm$Term$normalize($827(_s$8)(_x$9))(_defs$2))));
            case 'Fm.Term.lam':
                var $828 = self.name;
                var $829 = self.body;
                return Fm$Term$lam($828)((_x$5 => Fm$Term$normalize($829(_x$5))(_defs$2)));
            case 'Fm.Term.app':
                var $830 = self.func;
                var $831 = self.argm;
                return Fm$Term$app(Fm$Term$normalize($830)(_defs$2))(Fm$Term$normalize($831)(_defs$2));
            case 'Fm.Term.let':
                var $832 = self.name;
                var $833 = self.expr;
                var $834 = self.body;
                return Fm$Term$let($832)(Fm$Term$normalize($833)(_defs$2))((_x$6 => Fm$Term$normalize($834(_x$6))(_defs$2)));
            case 'Fm.Term.def':
                var $835 = self.name;
                var $836 = self.expr;
                var $837 = self.body;
                return Fm$Term$def($835)(Fm$Term$normalize($836)(_defs$2))((_x$6 => Fm$Term$normalize($837(_x$6))(_defs$2)));
            case 'Fm.Term.ann':
                var $838 = self.done;
                var $839 = self.term;
                var $840 = self.type;
                return Fm$Term$ann($838)(Fm$Term$normalize($839)(_defs$2))(Fm$Term$normalize($840)(_defs$2));
            case 'Fm.Term.gol':
                var $841 = self.name;
                var $842 = self.dref;
                var $843 = self.verb;
                return Fm$Term$gol($841)($842)($843);
            case 'Fm.Term.hol':
                var $844 = self.path;
                return Fm$Term$hol($844);
            case 'Fm.Term.nat':
                var $845 = self.natx;
                return Fm$Term$nat($845);
            case 'Fm.Term.chr':
                var $846 = self.chrx;
                return Fm$Term$chr($846);
            case 'Fm.Term.str':
                var $847 = self.strx;
                return Fm$Term$str($847);
            case 'Fm.Term.cse':
                var $848 = self.path;
                var $849 = self.expr;
                var $850 = self.name;
                var $851 = self.with;
                var $852 = self.cses;
                var $853 = self.moti;
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
                                var $854 = self.name;
                                var $855 = self.indx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $856 = self.name;
                                            var $857 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $858 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $859 = self.eras;
                                            var $860 = self.self;
                                            var $861 = self.name;
                                            var $862 = self.xtyp;
                                            var $863 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $864 = self.name;
                                            var $865 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $866 = self.func;
                                            var $867 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $868 = self.name;
                                            var $869 = self.expr;
                                            var $870 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $871 = self.name;
                                            var $872 = self.expr;
                                            var $873 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $874 = self.done;
                                            var $875 = self.term;
                                            var $876 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $877 = self.name;
                                            var $878 = self.dref;
                                            var $879 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $880 = self.path;
                                            return Fm$Term$equal$patch($880)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $881 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $882 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $883 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $884 = self.path;
                                            var $885 = self.expr;
                                            var $886 = self.name;
                                            var $887 = self.with;
                                            var $888 = self.cses;
                                            var $889 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ref':
                                var $890 = self.name;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $891 = self.name;
                                            var $892 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $893 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $894 = self.eras;
                                            var $895 = self.self;
                                            var $896 = self.name;
                                            var $897 = self.xtyp;
                                            var $898 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $899 = self.name;
                                            var $900 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $901 = self.func;
                                            var $902 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $903 = self.name;
                                            var $904 = self.expr;
                                            var $905 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $906 = self.name;
                                            var $907 = self.expr;
                                            var $908 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $909 = self.done;
                                            var $910 = self.term;
                                            var $911 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $912 = self.name;
                                            var $913 = self.dref;
                                            var $914 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $915 = self.path;
                                            return Fm$Term$equal$patch($915)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $916 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $917 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $918 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $919 = self.path;
                                            var $920 = self.expr;
                                            var $921 = self.name;
                                            var $922 = self.with;
                                            var $923 = self.cses;
                                            var $924 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.typ':
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $925 = self.name;
                                            var $926 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $927 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $928 = self.eras;
                                            var $929 = self.self;
                                            var $930 = self.name;
                                            var $931 = self.xtyp;
                                            var $932 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $933 = self.name;
                                            var $934 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $935 = self.func;
                                            var $936 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $937 = self.name;
                                            var $938 = self.expr;
                                            var $939 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $940 = self.name;
                                            var $941 = self.expr;
                                            var $942 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $943 = self.done;
                                            var $944 = self.term;
                                            var $945 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $946 = self.name;
                                            var $947 = self.dref;
                                            var $948 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $949 = self.path;
                                            return Fm$Term$equal$patch($949)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $950 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $951 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $952 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $953 = self.path;
                                            var $954 = self.expr;
                                            var $955 = self.name;
                                            var $956 = self.with;
                                            var $957 = self.cses;
                                            var $958 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.all':
                                var $959 = self.eras;
                                var $960 = self.self;
                                var $961 = self.name;
                                var $962 = self.xtyp;
                                var $963 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $964 = self.name;
                                            var $965 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $966 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $967 = self.eras;
                                            var $968 = self.self;
                                            var $969 = self.name;
                                            var $970 = self.xtyp;
                                            var $971 = self.body;
                                            return (() => {
                                                var _seen$21 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$22 = $963(Fm$Term$var($960)(_lv$4))(Fm$Term$var($961)(Nat$succ(_lv$4)));
                                                var _b1_body$23 = $971(Fm$Term$var($968)(_lv$4))(Fm$Term$var($969)(Nat$succ(_lv$4)));
                                                var _eq_self$24 = ($960 === $968);
                                                var _eq_eras$25 = Bool$eql($959)($967);
                                                return (() => {
                                                    var self = (_eq_self$24 && _eq_eras$25);
                                                    switch (self ? 'true' : 'false') {
                                                        case 'true':
                                                            return Monad$bind(Fm$Check$monad)(Fm$Term$equal($962)($970)(_defs$3)(_lv$4)(_seen$21))((_eq_type$26 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$22)(_b1_body$23)(_defs$3)(Nat$succ(Nat$succ(_lv$4)))(_seen$21))((_eq_body$27 => Monad$pure(Fm$Check$monad)((_eq_type$26 && _eq_body$27))))));
                                                        case 'false':
                                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                                    }
                                                })()
                                            })();
                                        case 'Fm.Term.lam':
                                            var $972 = self.name;
                                            var $973 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $974 = self.func;
                                            var $975 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $976 = self.name;
                                            var $977 = self.expr;
                                            var $978 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $979 = self.name;
                                            var $980 = self.expr;
                                            var $981 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $982 = self.done;
                                            var $983 = self.term;
                                            var $984 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $985 = self.name;
                                            var $986 = self.dref;
                                            var $987 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $988 = self.path;
                                            return Fm$Term$equal$patch($988)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $989 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $990 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $991 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $992 = self.path;
                                            var $993 = self.expr;
                                            var $994 = self.name;
                                            var $995 = self.with;
                                            var $996 = self.cses;
                                            var $997 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.lam':
                                var $998 = self.name;
                                var $999 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1000 = self.name;
                                            var $1001 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1002 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1003 = self.eras;
                                            var $1004 = self.self;
                                            var $1005 = self.name;
                                            var $1006 = self.xtyp;
                                            var $1007 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1008 = self.name;
                                            var $1009 = self.body;
                                            return (() => {
                                                var _seen$15 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$16 = $999(Fm$Term$var($998)(_lv$4));
                                                var _b1_body$17 = $1009(Fm$Term$var($1008)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$16)(_b1_body$17)(_defs$3)(Nat$succ(_lv$4))(_seen$15))((_eq_body$18 => Monad$pure(Fm$Check$monad)(_eq_body$18)))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1010 = self.func;
                                            var $1011 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1012 = self.name;
                                            var $1013 = self.expr;
                                            var $1014 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1015 = self.name;
                                            var $1016 = self.expr;
                                            var $1017 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1018 = self.done;
                                            var $1019 = self.term;
                                            var $1020 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1021 = self.name;
                                            var $1022 = self.dref;
                                            var $1023 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1024 = self.path;
                                            return Fm$Term$equal$patch($1024)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1025 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1026 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1027 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1028 = self.path;
                                            var $1029 = self.expr;
                                            var $1030 = self.name;
                                            var $1031 = self.with;
                                            var $1032 = self.cses;
                                            var $1033 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.app':
                                var $1034 = self.func;
                                var $1035 = self.argm;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1036 = self.name;
                                            var $1037 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1038 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1039 = self.eras;
                                            var $1040 = self.self;
                                            var $1041 = self.name;
                                            var $1042 = self.xtyp;
                                            var $1043 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1044 = self.name;
                                            var $1045 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1046 = self.func;
                                            var $1047 = self.argm;
                                            return (() => {
                                                var _seen$15 = Set$set(_id$10)(_seen$5);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1034)($1046)(_defs$3)(_lv$4)(_seen$15))((_eq_func$16 => Monad$bind(Fm$Check$monad)(Fm$Term$equal($1035)($1047)(_defs$3)(_lv$4)(_seen$15))((_eq_argm$17 => Monad$pure(Fm$Check$monad)((_eq_func$16 && _eq_argm$17))))))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1048 = self.name;
                                            var $1049 = self.expr;
                                            var $1050 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1051 = self.name;
                                            var $1052 = self.expr;
                                            var $1053 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1054 = self.done;
                                            var $1055 = self.term;
                                            var $1056 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1057 = self.name;
                                            var $1058 = self.dref;
                                            var $1059 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1060 = self.path;
                                            return Fm$Term$equal$patch($1060)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1061 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1062 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1063 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1064 = self.path;
                                            var $1065 = self.expr;
                                            var $1066 = self.name;
                                            var $1067 = self.with;
                                            var $1068 = self.cses;
                                            var $1069 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.let':
                                var $1070 = self.name;
                                var $1071 = self.expr;
                                var $1072 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1073 = self.name;
                                            var $1074 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1075 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1076 = self.eras;
                                            var $1077 = self.self;
                                            var $1078 = self.name;
                                            var $1079 = self.xtyp;
                                            var $1080 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1081 = self.name;
                                            var $1082 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1083 = self.func;
                                            var $1084 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1085 = self.name;
                                            var $1086 = self.expr;
                                            var $1087 = self.body;
                                            return (() => {
                                                var _seen$17 = Set$set(_id$10)(_seen$5);
                                                var _a1_body$18 = $1072(Fm$Term$var($1070)(_lv$4));
                                                var _b1_body$19 = $1087(Fm$Term$var($1085)(_lv$4));
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1071)($1086)(_defs$3)(_lv$4)(_seen$17))((_eq_expr$20 => Monad$bind(Fm$Check$monad)(Fm$Term$equal(_a1_body$18)(_b1_body$19)(_defs$3)(Nat$succ(_lv$4))(_seen$17))((_eq_body$21 => Monad$pure(Fm$Check$monad)((_eq_expr$20 && _eq_body$21))))))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1088 = self.name;
                                            var $1089 = self.expr;
                                            var $1090 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1091 = self.done;
                                            var $1092 = self.term;
                                            var $1093 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1094 = self.name;
                                            var $1095 = self.dref;
                                            var $1096 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1097 = self.path;
                                            return Fm$Term$equal$patch($1097)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1098 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1099 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1100 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1101 = self.path;
                                            var $1102 = self.expr;
                                            var $1103 = self.name;
                                            var $1104 = self.with;
                                            var $1105 = self.cses;
                                            var $1106 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.def':
                                var $1107 = self.name;
                                var $1108 = self.expr;
                                var $1109 = self.body;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1110 = self.name;
                                            var $1111 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1112 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1113 = self.eras;
                                            var $1114 = self.self;
                                            var $1115 = self.name;
                                            var $1116 = self.xtyp;
                                            var $1117 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1118 = self.name;
                                            var $1119 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1120 = self.func;
                                            var $1121 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1122 = self.name;
                                            var $1123 = self.expr;
                                            var $1124 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1125 = self.name;
                                            var $1126 = self.expr;
                                            var $1127 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1128 = self.done;
                                            var $1129 = self.term;
                                            var $1130 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1131 = self.name;
                                            var $1132 = self.dref;
                                            var $1133 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1134 = self.path;
                                            return Fm$Term$equal$patch($1134)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1135 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1136 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1137 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1138 = self.path;
                                            var $1139 = self.expr;
                                            var $1140 = self.name;
                                            var $1141 = self.with;
                                            var $1142 = self.cses;
                                            var $1143 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.ann':
                                var $1144 = self.done;
                                var $1145 = self.term;
                                var $1146 = self.type;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1147 = self.name;
                                            var $1148 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1149 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1150 = self.eras;
                                            var $1151 = self.self;
                                            var $1152 = self.name;
                                            var $1153 = self.xtyp;
                                            var $1154 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1155 = self.name;
                                            var $1156 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1157 = self.func;
                                            var $1158 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1159 = self.name;
                                            var $1160 = self.expr;
                                            var $1161 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1162 = self.name;
                                            var $1163 = self.expr;
                                            var $1164 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1165 = self.done;
                                            var $1166 = self.term;
                                            var $1167 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1168 = self.name;
                                            var $1169 = self.dref;
                                            var $1170 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1171 = self.path;
                                            return Fm$Term$equal$patch($1171)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1172 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1173 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1174 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1175 = self.path;
                                            var $1176 = self.expr;
                                            var $1177 = self.name;
                                            var $1178 = self.with;
                                            var $1179 = self.cses;
                                            var $1180 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.gol':
                                var $1181 = self.name;
                                var $1182 = self.dref;
                                var $1183 = self.verb;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1184 = self.name;
                                            var $1185 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1186 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1187 = self.eras;
                                            var $1188 = self.self;
                                            var $1189 = self.name;
                                            var $1190 = self.xtyp;
                                            var $1191 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1192 = self.name;
                                            var $1193 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1194 = self.func;
                                            var $1195 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1196 = self.name;
                                            var $1197 = self.expr;
                                            var $1198 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1199 = self.name;
                                            var $1200 = self.expr;
                                            var $1201 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1202 = self.done;
                                            var $1203 = self.term;
                                            var $1204 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1205 = self.name;
                                            var $1206 = self.dref;
                                            var $1207 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1208 = self.path;
                                            return Fm$Term$equal$patch($1208)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1209 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1210 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1211 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1212 = self.path;
                                            var $1213 = self.expr;
                                            var $1214 = self.name;
                                            var $1215 = self.with;
                                            var $1216 = self.cses;
                                            var $1217 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.hol':
                                var $1218 = self.path;
                                return Fm$Term$equal$patch($1218)(_b$2);
                            case 'Fm.Term.nat':
                                var $1219 = self.natx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1220 = self.name;
                                            var $1221 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1222 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1223 = self.eras;
                                            var $1224 = self.self;
                                            var $1225 = self.name;
                                            var $1226 = self.xtyp;
                                            var $1227 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1228 = self.name;
                                            var $1229 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1230 = self.func;
                                            var $1231 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1232 = self.name;
                                            var $1233 = self.expr;
                                            var $1234 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1235 = self.name;
                                            var $1236 = self.expr;
                                            var $1237 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1238 = self.done;
                                            var $1239 = self.term;
                                            var $1240 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1241 = self.name;
                                            var $1242 = self.dref;
                                            var $1243 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1244 = self.path;
                                            return Fm$Term$equal$patch($1244)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1245 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1246 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1247 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1248 = self.path;
                                            var $1249 = self.expr;
                                            var $1250 = self.name;
                                            var $1251 = self.with;
                                            var $1252 = self.cses;
                                            var $1253 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.chr':
                                var $1254 = self.chrx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1255 = self.name;
                                            var $1256 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1257 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1258 = self.eras;
                                            var $1259 = self.self;
                                            var $1260 = self.name;
                                            var $1261 = self.xtyp;
                                            var $1262 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1263 = self.name;
                                            var $1264 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1265 = self.func;
                                            var $1266 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1267 = self.name;
                                            var $1268 = self.expr;
                                            var $1269 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1270 = self.name;
                                            var $1271 = self.expr;
                                            var $1272 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1273 = self.done;
                                            var $1274 = self.term;
                                            var $1275 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1276 = self.name;
                                            var $1277 = self.dref;
                                            var $1278 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1279 = self.path;
                                            return Fm$Term$equal$patch($1279)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1280 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1281 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1282 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1283 = self.path;
                                            var $1284 = self.expr;
                                            var $1285 = self.name;
                                            var $1286 = self.with;
                                            var $1287 = self.cses;
                                            var $1288 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.str':
                                var $1289 = self.strx;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1290 = self.name;
                                            var $1291 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1292 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1293 = self.eras;
                                            var $1294 = self.self;
                                            var $1295 = self.name;
                                            var $1296 = self.xtyp;
                                            var $1297 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1298 = self.name;
                                            var $1299 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1300 = self.func;
                                            var $1301 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1302 = self.name;
                                            var $1303 = self.expr;
                                            var $1304 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1305 = self.name;
                                            var $1306 = self.expr;
                                            var $1307 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1308 = self.done;
                                            var $1309 = self.term;
                                            var $1310 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1311 = self.name;
                                            var $1312 = self.dref;
                                            var $1313 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1314 = self.path;
                                            return Fm$Term$equal$patch($1314)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1315 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1316 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1317 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1318 = self.path;
                                            var $1319 = self.expr;
                                            var $1320 = self.name;
                                            var $1321 = self.with;
                                            var $1322 = self.cses;
                                            var $1323 = self.moti;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                    }
                                })();
                            case 'Fm.Term.cse':
                                var $1324 = self.path;
                                var $1325 = self.expr;
                                var $1326 = self.name;
                                var $1327 = self.with;
                                var $1328 = self.cses;
                                var $1329 = self.moti;
                                return (() => {
                                    var self = _b1$7;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1330 = self.name;
                                            var $1331 = self.indx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ref':
                                            var $1332 = self.name;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.typ':
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.all':
                                            var $1333 = self.eras;
                                            var $1334 = self.self;
                                            var $1335 = self.name;
                                            var $1336 = self.xtyp;
                                            var $1337 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.lam':
                                            var $1338 = self.name;
                                            var $1339 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.app':
                                            var $1340 = self.func;
                                            var $1341 = self.argm;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.let':
                                            var $1342 = self.name;
                                            var $1343 = self.expr;
                                            var $1344 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.def':
                                            var $1345 = self.name;
                                            var $1346 = self.expr;
                                            var $1347 = self.body;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.ann':
                                            var $1348 = self.done;
                                            var $1349 = self.term;
                                            var $1350 = self.type;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.gol':
                                            var $1351 = self.name;
                                            var $1352 = self.dref;
                                            var $1353 = self.verb;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.hol':
                                            var $1354 = self.path;
                                            return Fm$Term$equal$patch($1354)(_a$1);
                                        case 'Fm.Term.nat':
                                            var $1355 = self.natx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.chr':
                                            var $1356 = self.chrx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.str':
                                            var $1357 = self.strx;
                                            return Monad$pure(Fm$Check$monad)(Bool$false);
                                        case 'Fm.Term.cse':
                                            var $1358 = self.path;
                                            var $1359 = self.expr;
                                            var $1360 = self.name;
                                            var $1361 = self.with;
                                            var $1362 = self.cses;
                                            var $1363 = self.moti;
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
                var $1364 = self.name;
                var $1365 = self.indx;
                return (() => {
                    var self = List$at_last($1365)(_ctx$4);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1364))(List$nil));
                        case 'Maybe.some':
                            var $1366 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1366;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $1367 = self.fst;
                                        var $1368 = self.snd;
                                        return $1368;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.ref':
                var $1369 = self.name;
                return (() => {
                    var self = Fm$get($1369)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$undefined_reference($1369))(List$nil));
                        case 'Maybe.some':
                            var $1370 = self.value;
                            return Monad$pure(Fm$Check$monad)((() => {
                                var self = $1370;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1371 = self.name;
                                        var $1372 = self.term;
                                        var $1373 = self.type;
                                        var $1374 = self.done;
                                        return $1373;
                                }
                            })());
                    }
                })();
            case 'Fm.Term.typ':
                return Monad$pure(Fm$Check$monad)(Fm$Term$typ);
            case 'Fm.Term.all':
                var $1375 = self.eras;
                var $1376 = self.self;
                var $1377 = self.name;
                var $1378 = self.xtyp;
                var $1379 = self.body;
                return (() => {
                    var _ctx_size$11 = List$length(_ctx$4);
                    var _self_var$12 = Fm$Term$var($1376)(_ctx_size$11);
                    var _body_var$13 = Fm$Term$var($1377)(Nat$succ(_ctx_size$11));
                    var _body_ctx$14 = List$cons(Pair$new($1377)($1378))(List$cons(Pair$new($1376)(_term$1))(_ctx$4));
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1378)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$15 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1379(_self_var$12)(_body_var$13))(Maybe$some(Fm$Term$typ))(_defs$3)(_body_ctx$14)(Fm$MPath$1(_path$5)))((_$16 => Monad$pure(Fm$Check$monad)(Fm$Term$typ)))))
                })();
            case 'Fm.Term.lam':
                var $1380 = self.name;
                var $1381 = self.body;
                return (() => {
                    var self = _type$2;
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_term$1)(_ctx$4))(List$nil));
                        case 'Maybe.some':
                            var $1382 = self.value;
                            return (() => {
                                var _typv$9 = Fm$Term$reduce($1382)(_defs$3);
                                return (() => {
                                    var self = _typv$9;
                                    switch (self._) {
                                        case 'Fm.Term.var':
                                            var $1383 = self.name;
                                            var $1384 = self.indx;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ref':
                                            var $1385 = self.name;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.typ':
                                            return (() => {
                                                var _expected$10 = Either$left("Function");
                                                var _detected$11 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$10)(_detected$11)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.all':
                                            var $1386 = self.eras;
                                            var $1387 = self.self;
                                            var $1388 = self.name;
                                            var $1389 = self.xtyp;
                                            var $1390 = self.body;
                                            return (() => {
                                                var _ctx_size$15 = List$length(_ctx$4);
                                                var _self_var$16 = _term$1;
                                                var _body_var$17 = Fm$Term$var($1380)(_ctx_size$15);
                                                var _body_typ$18 = $1390(_self_var$16)(_body_var$17);
                                                var _body_ctx$19 = List$cons(Pair$new($1380)($1389))(_ctx$4);
                                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1381(_body_var$17))(Maybe$some(_body_typ$18))(_defs$3)(_body_ctx$19)(Fm$MPath$0(_path$5)))((_$20 => Monad$pure(Fm$Check$monad)($1382)))
                                            })();
                                        case 'Fm.Term.lam':
                                            var $1391 = self.name;
                                            var $1392 = self.body;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.app':
                                            var $1393 = self.func;
                                            var $1394 = self.argm;
                                            return (() => {
                                                var _expected$12 = Either$left("Function");
                                                var _detected$13 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.let':
                                            var $1395 = self.name;
                                            var $1396 = self.expr;
                                            var $1397 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.def':
                                            var $1398 = self.name;
                                            var $1399 = self.expr;
                                            var $1400 = self.body;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.ann':
                                            var $1401 = self.done;
                                            var $1402 = self.term;
                                            var $1403 = self.type;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.gol':
                                            var $1404 = self.name;
                                            var $1405 = self.dref;
                                            var $1406 = self.verb;
                                            return (() => {
                                                var _expected$13 = Either$left("Function");
                                                var _detected$14 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.hol':
                                            var $1407 = self.path;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.nat':
                                            var $1408 = self.natx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.chr':
                                            var $1409 = self.chrx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.str':
                                            var $1410 = self.strx;
                                            return (() => {
                                                var _expected$11 = Either$left("Function");
                                                var _detected$12 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                            })();
                                        case 'Fm.Term.cse':
                                            var $1411 = self.path;
                                            var $1412 = self.expr;
                                            var $1413 = self.name;
                                            var $1414 = self.with;
                                            var $1415 = self.cses;
                                            var $1416 = self.moti;
                                            return (() => {
                                                var _expected$16 = Either$left("Function");
                                                var _detected$17 = Either$right($1382);
                                                return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$16)(_detected$17)(_ctx$4))(List$nil))
                                            })();
                                    }
                                })()
                            })();
                    }
                })();
            case 'Fm.Term.app':
                var $1417 = self.func;
                var $1418 = self.argm;
                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1417)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_func_typ$8 => (() => {
                    var _func_typ$9 = Fm$Term$reduce(_func_typ$8)(_defs$3);
                    return (() => {
                        var self = _func_typ$9;
                        switch (self._) {
                            case 'Fm.Term.var':
                                var $1419 = self.name;
                                var $1420 = self.indx;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ref':
                                var $1421 = self.name;
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
                                var $1422 = self.eras;
                                var $1423 = self.self;
                                var $1424 = self.name;
                                var $1425 = self.xtyp;
                                var $1426 = self.body;
                                return Monad$bind(Fm$Check$monad)(Fm$Term$check($1418)(Maybe$some($1425))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$15 => Monad$pure(Fm$Check$monad)($1426($1417)($1418))));
                            case 'Fm.Term.lam':
                                var $1427 = self.name;
                                var $1428 = self.body;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.app':
                                var $1429 = self.func;
                                var $1430 = self.argm;
                                return (() => {
                                    var _expected$12 = Either$left("Function");
                                    var _detected$13 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$12)(_detected$13)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.let':
                                var $1431 = self.name;
                                var $1432 = self.expr;
                                var $1433 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.def':
                                var $1434 = self.name;
                                var $1435 = self.expr;
                                var $1436 = self.body;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.ann':
                                var $1437 = self.done;
                                var $1438 = self.term;
                                var $1439 = self.type;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.gol':
                                var $1440 = self.name;
                                var $1441 = self.dref;
                                var $1442 = self.verb;
                                return (() => {
                                    var _expected$13 = Either$left("Function");
                                    var _detected$14 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$13)(_detected$14)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.hol':
                                var $1443 = self.path;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.nat':
                                var $1444 = self.natx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.chr':
                                var $1445 = self.chrx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.str':
                                var $1446 = self.strx;
                                return (() => {
                                    var _expected$11 = Either$left("Function");
                                    var _detected$12 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$11)(_detected$12)(_ctx$4))(List$nil))
                                })();
                            case 'Fm.Term.cse':
                                var $1447 = self.path;
                                var $1448 = self.expr;
                                var $1449 = self.name;
                                var $1450 = self.with;
                                var $1451 = self.cses;
                                var $1452 = self.moti;
                                return (() => {
                                    var _expected$16 = Either$left("Function");
                                    var _detected$17 = Either$right(_func_typ$9);
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(_expected$16)(_detected$17)(_ctx$4))(List$nil))
                                })();
                        }
                    })()
                })()));
            case 'Fm.Term.let':
                var $1453 = self.name;
                var $1454 = self.expr;
                var $1455 = self.body;
                return (() => {
                    var _ctx_size$9 = List$length(_ctx$4);
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check($1454)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_expr_typ$10 => (() => {
                        var _body_val$11 = $1455(Fm$Term$var($1453)(_ctx_size$9));
                        var _body_ctx$12 = List$cons(Pair$new($1453)(_expr_typ$10))(_ctx$4);
                        return Monad$bind(Fm$Check$monad)(Fm$Term$check(_body_val$11)(_type$2)(_defs$3)(_body_ctx$12)(Fm$MPath$1(_path$5)))((_body_typ$13 => Monad$pure(Fm$Check$monad)(_body_typ$13)))
                    })()))
                })();
            case 'Fm.Term.def':
                var $1456 = self.name;
                var $1457 = self.expr;
                var $1458 = self.body;
                return Fm$Term$check($1458($1457))(_type$2)(_defs$3)(_ctx$4)(_path$5);
            case 'Fm.Term.ann':
                var $1459 = self.done;
                var $1460 = self.term;
                var $1461 = self.type;
                return (() => {
                    var self = $1459;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1461);
                        case 'false':
                            return Monad$bind(Fm$Check$monad)(Fm$Term$check($1460)(Maybe$some($1461))(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_$9 => Monad$bind(Fm$Check$monad)(Fm$Term$check($1461)(Maybe$some(Fm$Term$typ))(_defs$3)(_ctx$4)(Fm$MPath$1(_path$5)))((_$10 => Monad$pure(Fm$Check$monad)($1461)))));
                    }
                })();
            case 'Fm.Term.gol':
                var $1462 = self.name;
                var $1463 = self.dref;
                var $1464 = self.verb;
                return Fm$Check$result(_type$2)(List$cons(Fm$Error$show_goal($1462)($1463)($1464)(_type$2)(_ctx$4))(List$nil));
            case 'Fm.Term.hol':
                var $1465 = self.path;
                return Fm$Check$result(_type$2)(List$nil);
            case 'Fm.Term.nat':
                var $1466 = self.natx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Nat"));
            case 'Fm.Term.chr':
                var $1467 = self.chrx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("Char"));
            case 'Fm.Term.str':
                var $1468 = self.strx;
                return Monad$pure(Fm$Check$monad)(Fm$Term$ref("String"));
            case 'Fm.Term.cse':
                var $1469 = self.path;
                var $1470 = self.expr;
                var $1471 = self.name;
                var $1472 = self.with;
                var $1473 = self.cses;
                var $1474 = self.moti;
                return (() => {
                    var _expr$12 = $1470;
                    return Monad$bind(Fm$Check$monad)(Fm$Term$check(_expr$12)(Maybe$none)(_defs$3)(_ctx$4)(Fm$MPath$0(_path$5)))((_etyp$13 => (() => {
                        var _dsug$14 = Fm$Term$desugar_cse($1470)($1471)($1472)($1473)($1474)(_etyp$13)(_defs$3)(_ctx$4);
                        return (() => {
                            var self = _dsug$14;
                            switch (self._) {
                                case 'Maybe.none':
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$cant_infer(_term$1)(_ctx$4))(List$nil));
                                case 'Maybe.some':
                                    var $1475 = self.value;
                                    return Fm$Check$result(_type$2)(List$cons(Fm$Error$patch(Fm$MPath$to_bits(_path$5))($1475))(List$nil));
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
                var $1476 = self.value;
                return Monad$bind(Fm$Check$monad)(Fm$Term$equal($1476)(_infr$6)(_defs$3)(List$length(_ctx$4))(Set$new))((_eqls$8 => (() => {
                    var self = _eqls$8;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return Monad$pure(Fm$Check$monad)($1476);
                        case 'false':
                            return Fm$Check$result(_type$2)(List$cons(Fm$Error$type_mismatch(Either$right($1476))(Either$right(_infr$6))(_ctx$4))(List$nil));
                    }
                })()));
        }
    })())))))));
    var Fm$Path$nil = (_x$1 => _x$1);
    var Fm$MPath$nil = Maybe$some(Fm$Path$nil);
    var Fm$Term$patch_at = (_path$1 => (_term$2 => (_fn$3 => (() => {
        var self = _term$2;
        switch (self._) {
            case 'Fm.Term.var':
                var $1477 = self.name;
                var $1478 = self.indx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1479 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1480 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.ref':
                var $1481 = self.name;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1482 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1483 = self.slice(0, -1);
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
                            var $1484 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1485 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.all':
                var $1486 = self.eras;
                var $1487 = self.self;
                var $1488 = self.name;
                var $1489 = self.xtyp;
                var $1490 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1491 = self.slice(0, -1);
                            return Fm$Term$all($1486)($1487)($1488)(Fm$Term$patch_at($1491)($1489)(_fn$3))($1490);
                        case '1':
                            var $1492 = self.slice(0, -1);
                            return Fm$Term$all($1486)($1487)($1488)($1489)((_s$10 => (_x$11 => Fm$Term$patch_at($1492)($1490(_s$10)(_x$11))(_fn$3))));
                    }
                })();
            case 'Fm.Term.lam':
                var $1493 = self.name;
                var $1494 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1495 = self.slice(0, -1);
                            return Fm$Term$lam($1493)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1494(_x$7))(_fn$3)));
                        case '1':
                            var $1496 = self.slice(0, -1);
                            return Fm$Term$lam($1493)((_x$7 => Fm$Term$patch_at(Bits$tail(_path$1))($1494(_x$7))(_fn$3)));
                    }
                })();
            case 'Fm.Term.app':
                var $1497 = self.func;
                var $1498 = self.argm;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1499 = self.slice(0, -1);
                            return Fm$Term$app(Fm$Term$patch_at($1499)($1497)(_fn$3))($1498);
                        case '1':
                            var $1500 = self.slice(0, -1);
                            return Fm$Term$app($1497)(Fm$Term$patch_at($1500)($1498)(_fn$3));
                    }
                })();
            case 'Fm.Term.let':
                var $1501 = self.name;
                var $1502 = self.expr;
                var $1503 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1504 = self.slice(0, -1);
                            return Fm$Term$let($1501)(Fm$Term$patch_at($1504)($1502)(_fn$3))($1503);
                        case '1':
                            var $1505 = self.slice(0, -1);
                            return Fm$Term$let($1501)($1502)((_x$8 => Fm$Term$patch_at($1505)($1503(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.def':
                var $1506 = self.name;
                var $1507 = self.expr;
                var $1508 = self.body;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1509 = self.slice(0, -1);
                            return Fm$Term$def($1506)(Fm$Term$patch_at($1509)($1507)(_fn$3))($1508);
                        case '1':
                            var $1510 = self.slice(0, -1);
                            return Fm$Term$def($1506)($1507)((_x$8 => Fm$Term$patch_at($1510)($1508(_x$8))(_fn$3)));
                    }
                })();
            case 'Fm.Term.ann':
                var $1511 = self.done;
                var $1512 = self.term;
                var $1513 = self.type;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1514 = self.slice(0, -1);
                            return Fm$Term$ann($1511)(Fm$Term$patch_at(_path$1)($1512)(_fn$3))($1513);
                        case '1':
                            var $1515 = self.slice(0, -1);
                            return Fm$Term$ann($1511)(Fm$Term$patch_at(_path$1)($1512)(_fn$3))($1513);
                    }
                })();
            case 'Fm.Term.gol':
                var $1516 = self.name;
                var $1517 = self.dref;
                var $1518 = self.verb;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1519 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1520 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.hol':
                var $1521 = self.path;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1522 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1523 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.nat':
                var $1524 = self.natx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1525 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1526 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.chr':
                var $1527 = self.chrx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1528 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1529 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.str':
                var $1530 = self.strx;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1531 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1532 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
            case 'Fm.Term.cse':
                var $1533 = self.path;
                var $1534 = self.expr;
                var $1535 = self.name;
                var $1536 = self.with;
                var $1537 = self.cses;
                var $1538 = self.moti;
                return (() => {
                    var self = _path$1;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return _fn$3(_term$2);
                        case '0':
                            var $1539 = self.slice(0, -1);
                            return _term$2;
                        case '1':
                            var $1540 = self.slice(0, -1);
                            return _term$2;
                    }
                })();
        }
    })())));
    var Fm$synth$fix = _term$1 => _type$2 => _defs$3 => _errs$4 => _fixs$5 => {
        var Fm$synth$fix = _term$1 => _type$2 => _defs$3 => _errs$4 => _fixs$5 => ({
            ctr: 'TCO',
            arg: [_term$1, _type$2, _defs$3, _errs$4, _fixs$5]
        });
        var arg = [_term$1, _type$2, _defs$3, _errs$4, _fixs$5];
        while (true) {
            let [_term$1, _type$2, _defs$3, _errs$4, _fixs$5] = arg;
            var R = (() => {
                var self = _errs$4;
                switch (self._) {
                    case 'List.nil':
                        return (() => {
                            var self = _fixs$5;
                            switch (self ? 'true' : 'false') {
                                case 'true':
                                    return Maybe$some(Pair$new(_term$1)(_type$2));
                                case 'false':
                                    return Maybe$none;
                            }
                        })();
                    case 'List.cons':
                        var $1541 = self.head;
                        var $1542 = self.tail;
                        return (() => {
                            var self = $1541;
                            switch (self._) {
                                case 'Fm.Error.type_mismatch':
                                    var $1543 = self.expected;
                                    var $1544 = self.detected;
                                    var $1545 = self.context;
                                    return Fm$synth$fix(_term$1)(_type$2)(_defs$3)($1542)(_fixs$5);
                                case 'Fm.Error.show_goal':
                                    var $1546 = self.name;
                                    var $1547 = self.dref;
                                    var $1548 = self.verb;
                                    var $1549 = self.goal;
                                    var $1550 = self.context;
                                    return Fm$synth$fix(_term$1)(_type$2)(_defs$3)($1542)(_fixs$5);
                                case 'Fm.Error.patch':
                                    var $1551 = self.path;
                                    var $1552 = self.term;
                                    return (() => {
                                        var self = $1551;
                                        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                                            case 'nil':
                                                return Maybe$none;
                                            case '0':
                                                var $1553 = self.slice(0, -1);
                                                return (() => {
                                                    var _patched_term$11 = Fm$Term$patch_at($1553)(_term$1)((_x$11 => $1552));
                                                    return Fm$synth$fix(_patched_term$11)(_type$2)(_defs$3)($1542)(Bool$true)
                                                })();
                                            case '1':
                                                var $1554 = self.slice(0, -1);
                                                return (() => {
                                                    var _patched_type$11 = Fm$Term$patch_at($1554)(_type$2)((_x$11 => $1552));
                                                    return Fm$synth$fix(_term$1)(_patched_type$11)(_defs$3)($1542)(Bool$true)
                                                })();
                                        }
                                    })();
                                case 'Fm.Error.undefined_reference':
                                    var $1555 = self.name;
                                    return Fm$synth$fix(_term$1)(_type$2)(_defs$3)($1542)(_fixs$5);
                                case 'Fm.Error.cant_infer':
                                    var $1556 = self.term;
                                    var $1557 = self.context;
                                    return Fm$synth$fix(_term$1)(_type$2)(_defs$3)($1542)(_fixs$5);
                            }
                        })();
                }
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$synth$one = _name$1 => _term$2 => _type$3 => _defs$4 => {
        var Fm$synth$one = _name$1 => _term$2 => _type$3 => _defs$4 => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _type$3, _defs$4]
        });
        var arg = [_name$1, _term$2, _type$3, _defs$4];
        while (true) {
            let [_name$1, _term$2, _type$3, _defs$4] = arg;
            var R = (() => {
                var _checked$5 = Monad$bind(Fm$Check$monad)(Fm$Term$check(_type$3)(Maybe$some(Fm$Term$typ))(_defs$4)(List$nil)(Fm$MPath$1(Fm$MPath$nil)))((_chk_type$5 => Monad$bind(Fm$Check$monad)(Fm$Term$check(_term$2)(Maybe$some(_type$3))(_defs$4)(List$nil)(Fm$MPath$0(Fm$MPath$nil)))((_chk_term$6 => Monad$pure(Fm$Check$monad)(Unit$new)))));
                return (() => {
                    var self = _checked$5;
                    switch (self._) {
                        case 'Fm.Check.result':
                            var $1558 = self.value;
                            var $1559 = self.errors;
                            return (() => {
                                var self = $1559;
                                switch (self._) {
                                    case 'List.nil':
                                        return Fm$Def$new(_name$1)(_term$2)(_type$3)(Bool$true);
                                    case 'List.cons':
                                        var $1560 = self.head;
                                        var $1561 = self.tail;
                                        return (() => {
                                            var _fixed$10 = Fm$synth$fix(_term$2)(_type$3)(_defs$4)($1559)(Bool$false);
                                            return (() => {
                                                var self = _fixed$10;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        return Fm$Def$new(_name$1)(_term$2)(_type$3)(Bool$true);
                                                    case 'Maybe.some':
                                                        var $1562 = self.value;
                                                        return (() => {
                                                            var self = $1562;
                                                            switch (self._) {
                                                                case 'Pair.new':
                                                                    var $1563 = self.fst;
                                                                    var $1564 = self.snd;
                                                                    return (() => {
                                                                        var _term$14 = Fm$Term$bind(List$nil)(Fm$Path$0(Fm$Path$nil))($1563);
                                                                        var _type$15 = Fm$Term$bind(List$nil)(Fm$Path$1(Fm$Path$nil))($1564);
                                                                        return Fm$synth$one(_name$1)(_term$14)(_type$15)(_defs$4)
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
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    var Fm$synth = (_defs$1 => (() => {
        var _defs$2 = (list_for(Map$to_list(_defs$1))(_defs$1)((_def$2 => (_defs$3 => (() => {
            var self = _def$2;
            switch (self._) {
                case 'Pair.new':
                    var $1565 = self.fst;
                    var $1566 = self.snd;
                    return (() => {
                        var self = $1566;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $1567 = self.name;
                                var $1568 = self.term;
                                var $1569 = self.type;
                                var $1570 = self.done;
                                return (() => {
                                    var _name$10 = $1567;
                                    var _term$11 = $1568;
                                    var _type$12 = $1569;
                                    var _done$13 = $1570;
                                    var _defn$14 = Fm$synth$one(_name$10)(_term$11)(_type$12)(_defs$3);
                                    return Fm$set(_name$10)(_defn$14)(_defs$3)
                                })();
                        }
                    })();
            }
        })()))));
        return _defs$2
    })());
    var Fm$Name$show = (_name$1 => _name$1);
    var Either = (_A$1 => (_B$2 => null));
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
                        var $1571 = (self - 1n);
                        return (() => {
                            var self = _n$1;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return Either$right(Nat$succ($1571));
                                case 'succ':
                                    var $1572 = (self - 1n);
                                    return Nat$sub_rem($1572)($1571);
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
                        var $1573 = self.value;
                        return Nat$div_mod$go($1573)(_m$2)(Nat$succ(_d$3));
                    case 'Either.right':
                        var $1574 = self.value;
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
                        var $1575 = self.fst;
                        var $1576 = self.snd;
                        return (() => {
                            var self = $1575;
                            switch (self === 0n ? 'zero' : 'succ') {
                                case 'zero':
                                    return List$cons($1576)(_res$3);
                                case 'succ':
                                    var $1577 = (self - 1n);
                                    return Nat$to_base$go(_base$1)($1575)(List$cons($1576)(_res$3));
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
    var Nat$gtn = a0 => a1 => (a0 > a1);
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
                                var $1578 = self.value;
                                return $1578;
                        }
                    })();
                case 'false':
                    return 35;
            }
        })()
    })()));
    var Nat$to_string_base = (_base$1 => (_nat$2 => List$fold(Nat$to_base(_base$1)(_nat$2))(String$nil)((_n$3 => (_str$4 => String$cons(Nat$show_digit(_base$1)(_n$3))(_str$4))))));
    var Nat$show = (_n$1 => Nat$to_string_base(10n)(_n$1));
    var Bits$to_nat = (_b$1 => (() => {
        var self = _b$1;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return 0n;
            case '0':
                var $1579 = self.slice(0, -1);
                return (2n * Bits$to_nat($1579));
            case '1':
                var $1580 = self.slice(0, -1);
                return Nat$succ((2n * Bits$to_nat($1580)));
        }
    })());
    var U16$show_hex = (_a$1 => (() => {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $1581 = u16_to_word(self);
                return Nat$to_string_base(16n)(Bits$to_nat(Word$to_bits($1581)));
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
                var $1582 = self.charCodeAt(0);
                var $1583 = self.slice(1);
                return (() => {
                    var _head$4 = Fm$escape$char($1582);
                    var _tail$5 = Fm$escape($1583);
                    return (_head$4 + _tail$5)
                })();
        }
    })());
    var Fm$Term$core = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1584 = self.name;
                var $1585 = self.indx;
                return Fm$Name$show($1584);
            case 'Fm.Term.ref':
                var $1586 = self.name;
                return Fm$Name$show($1586);
            case 'Fm.Term.typ':
                return "*";
            case 'Fm.Term.all':
                var $1587 = self.eras;
                var $1588 = self.self;
                var $1589 = self.name;
                var $1590 = self.xtyp;
                var $1591 = self.body;
                return (() => {
                    var _eras$7 = $1587;
                    var _init$8 = (() => {
                        var self = _eras$7;
                        switch (self ? 'true' : 'false') {
                            case 'true':
                                return "%";
                            case 'false':
                                return "@";
                        }
                    })();
                    var _self$9 = Fm$Name$show($1588);
                    var _name$10 = Fm$Name$show($1589);
                    var _xtyp$11 = Fm$Term$core($1590);
                    var _body$12 = Fm$Term$core($1591(Fm$Term$var($1588)(0n))(Fm$Term$var($1589)(0n)));
                    return String$flatten(List$cons(_init$8)(List$cons(_self$9)(List$cons("(")(List$cons(_name$10)(List$cons(":")(List$cons(_xtyp$11)(List$cons(") ")(List$cons(_body$12)(List$nil)))))))))
                })();
            case 'Fm.Term.lam':
                var $1592 = self.name;
                var $1593 = self.body;
                return (() => {
                    var _name$4 = Fm$Name$show($1592);
                    var _body$5 = Fm$Term$core($1593(Fm$Term$var($1592)(0n)));
                    return String$flatten(List$cons("#")(List$cons(_name$4)(List$cons(" ")(List$cons(_body$5)(List$nil)))))
                })();
            case 'Fm.Term.app':
                var $1594 = self.func;
                var $1595 = self.argm;
                return (() => {
                    var _func$4 = Fm$Term$core($1594);
                    var _argm$5 = Fm$Term$core($1595);
                    return String$flatten(List$cons("(")(List$cons(_func$4)(List$cons(" ")(List$cons(_argm$5)(List$cons(")")(List$nil))))))
                })();
            case 'Fm.Term.let':
                var $1596 = self.name;
                var $1597 = self.expr;
                var $1598 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($1596);
                    var _expr$6 = Fm$Term$core($1597);
                    var _body$7 = Fm$Term$core($1598(Fm$Term$var($1596)(0n)));
                    return String$flatten(List$cons("!")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.def':
                var $1599 = self.name;
                var $1600 = self.expr;
                var $1601 = self.body;
                return (() => {
                    var _name$5 = Fm$Name$show($1599);
                    var _expr$6 = Fm$Term$core($1600);
                    var _body$7 = Fm$Term$core($1601(Fm$Term$var($1599)(0n)));
                    return String$flatten(List$cons("$")(List$cons(_name$5)(List$cons(" = ")(List$cons(_expr$6)(List$cons("; ")(List$cons(_body$7)(List$nil)))))))
                })();
            case 'Fm.Term.ann':
                var $1602 = self.done;
                var $1603 = self.term;
                var $1604 = self.type;
                return (() => {
                    var _term$5 = Fm$Term$core($1603);
                    var _type$6 = Fm$Term$core($1604);
                    return String$flatten(List$cons("{")(List$cons(_term$5)(List$cons(":")(List$cons(_type$6)(List$cons("}")(List$nil))))))
                })();
            case 'Fm.Term.gol':
                var $1605 = self.name;
                var $1606 = self.dref;
                var $1607 = self.verb;
                return "<ERROR>";
            case 'Fm.Term.hol':
                var $1608 = self.path;
                return "<ERROR>";
            case 'Fm.Term.nat':
                var $1609 = self.natx;
                return String$flatten(List$cons("+")(List$cons(Nat$show($1609))(List$nil)));
            case 'Fm.Term.chr':
                var $1610 = self.chrx;
                return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($1610))(List$cons("\'")(List$nil))));
            case 'Fm.Term.str':
                var $1611 = self.strx;
                return String$flatten(List$cons("\"")(List$cons(Fm$escape($1611))(List$cons("\"")(List$nil))));
            case 'Fm.Term.cse':
                var $1612 = self.path;
                var $1613 = self.expr;
                var $1614 = self.name;
                var $1615 = self.with;
                var $1616 = self.cses;
                var $1617 = self.moti;
                return "<ERROR>";
        }
    })());
    var Fm$Defs$core = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$to_list(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Pair.new':
                    var $1618 = self.fst;
                    var $1619 = self.snd;
                    return (() => {
                        var self = $1619;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $1620 = self.name;
                                var $1621 = self.term;
                                var $1622 = self.type;
                                var $1623 = self.done;
                                return (() => {
                                    var _name$11 = $1620;
                                    var _term$12 = Fm$Term$core($1621);
                                    var _type$13 = Fm$Term$core($1622);
                                    return String$flatten(List$cons(_result$4)(List$cons(_name$11)(List$cons(" : ")(List$cons(_type$13)(List$cons(" = ")(List$cons(_term$12)(List$cons(";\u{a}")(List$nil))))))))
                                })();
                        }
                    })();
            }
        })()))));
        return _result$3
    })());
    var Fm$to_core = (_code$1 => (() => {
        var _defs$2 = Maybe$default(Map$new)(Fm$Defs$read(_code$1));
        var _defs$3 = Fm$synth(_defs$2);
        return Fm$Defs$core(_defs$3)
    })());
    var Debug$log = a0 => a1 => ((console.log(a0), a1()));
    var Maybe$bind = (_m$3 => (_f$4 => (() => {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.none':
                return Maybe$none;
            case 'Maybe.some':
                var $1624 = self.value;
                return _f$4($1624);
        }
    })()));
    var Maybe$monad = Monad$new(Maybe$bind)(Maybe$some);
    var Fm$Term$show$as_nat$go = (_term$1 => (() => {
        var self = _term$1;
        switch (self._) {
            case 'Fm.Term.var':
                var $1625 = self.name;
                var $1626 = self.indx;
                return Maybe$none;
            case 'Fm.Term.ref':
                var $1627 = self.name;
                return (() => {
                    var self = ($1627 === "Nat.zero");
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
                var $1628 = self.eras;
                var $1629 = self.self;
                var $1630 = self.name;
                var $1631 = self.xtyp;
                var $1632 = self.body;
                return Maybe$none;
            case 'Fm.Term.lam':
                var $1633 = self.name;
                var $1634 = self.body;
                return Maybe$none;
            case 'Fm.Term.app':
                var $1635 = self.func;
                var $1636 = self.argm;
                return (() => {
                    var self = $1635;
                    switch (self._) {
                        case 'Fm.Term.var':
                            var $1637 = self.name;
                            var $1638 = self.indx;
                            return Maybe$none;
                        case 'Fm.Term.ref':
                            var $1639 = self.name;
                            return (() => {
                                var self = ($1639 === "Nat.succ");
                                switch (self ? 'true' : 'false') {
                                    case 'true':
                                        return Monad$bind(Maybe$monad)(Fm$Term$show$as_nat$go($1636))((_pred$5 => Monad$pure(Maybe$monad)(Nat$succ(_pred$5))));
                                    case 'false':
                                        return Maybe$none;
                                }
                            })();
                        case 'Fm.Term.typ':
                            return Maybe$none;
                        case 'Fm.Term.all':
                            var $1640 = self.eras;
                            var $1641 = self.self;
                            var $1642 = self.name;
                            var $1643 = self.xtyp;
                            var $1644 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.lam':
                            var $1645 = self.name;
                            var $1646 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.app':
                            var $1647 = self.func;
                            var $1648 = self.argm;
                            return Maybe$none;
                        case 'Fm.Term.let':
                            var $1649 = self.name;
                            var $1650 = self.expr;
                            var $1651 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.def':
                            var $1652 = self.name;
                            var $1653 = self.expr;
                            var $1654 = self.body;
                            return Maybe$none;
                        case 'Fm.Term.ann':
                            var $1655 = self.done;
                            var $1656 = self.term;
                            var $1657 = self.type;
                            return Maybe$none;
                        case 'Fm.Term.gol':
                            var $1658 = self.name;
                            var $1659 = self.dref;
                            var $1660 = self.verb;
                            return Maybe$none;
                        case 'Fm.Term.hol':
                            var $1661 = self.path;
                            return Maybe$none;
                        case 'Fm.Term.nat':
                            var $1662 = self.natx;
                            return Maybe$none;
                        case 'Fm.Term.chr':
                            var $1663 = self.chrx;
                            return Maybe$none;
                        case 'Fm.Term.str':
                            var $1664 = self.strx;
                            return Maybe$none;
                        case 'Fm.Term.cse':
                            var $1665 = self.path;
                            var $1666 = self.expr;
                            var $1667 = self.name;
                            var $1668 = self.with;
                            var $1669 = self.cses;
                            var $1670 = self.moti;
                            return Maybe$none;
                    }
                })();
            case 'Fm.Term.let':
                var $1671 = self.name;
                var $1672 = self.expr;
                var $1673 = self.body;
                return Maybe$none;
            case 'Fm.Term.def':
                var $1674 = self.name;
                var $1675 = self.expr;
                var $1676 = self.body;
                return Maybe$none;
            case 'Fm.Term.ann':
                var $1677 = self.done;
                var $1678 = self.term;
                var $1679 = self.type;
                return Maybe$none;
            case 'Fm.Term.gol':
                var $1680 = self.name;
                var $1681 = self.dref;
                var $1682 = self.verb;
                return Maybe$none;
            case 'Fm.Term.hol':
                var $1683 = self.path;
                return Maybe$none;
            case 'Fm.Term.nat':
                var $1684 = self.natx;
                return Maybe$none;
            case 'Fm.Term.chr':
                var $1685 = self.chrx;
                return Maybe$none;
            case 'Fm.Term.str':
                var $1686 = self.strx;
                return Maybe$none;
            case 'Fm.Term.cse':
                var $1687 = self.path;
                var $1688 = self.expr;
                var $1689 = self.name;
                var $1690 = self.with;
                var $1691 = self.cses;
                var $1692 = self.moti;
                return Maybe$none;
        }
    })());
    var Fm$Term$show$as_nat = (_term$1 => Maybe$mapped(Fm$Term$show$as_nat$go(_term$1))(Nat$show));
    var String$join$go = (_sep$1 => (_list$2 => (_fst$3 => (() => {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $1693 = self.head;
                var $1694 = self.tail;
                return String$flatten(List$cons((() => {
                    var self = _fst$3;
                    switch (self ? 'true' : 'false') {
                        case 'true':
                            return "";
                        case 'false':
                            return _sep$1;
                    }
                })())(List$cons($1693)(List$cons(String$join$go(_sep$1)($1694)(Bool$false))(List$nil))));
        }
    })())));
    var String$join = (_sep$1 => (_list$2 => String$join$go(_sep$1)(_list$2)(Bool$true)));
    var Bits$chunks_of$go = (_len$1 => (_bits$2 => (_need$3 => (_chunk$4 => (() => {
        var self = _bits$2;
        switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
            case 'nil':
                return List$cons(Bits$reverse(_chunk$4))(List$nil);
            case '0':
                var $1695 = self.slice(0, -1);
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
                            var $1696 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$0(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($1695)($1696)(_chunk$7)
                            })();
                    }
                })();
            case '1':
                var $1697 = self.slice(0, -1);
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
                            var $1698 = (self - 1n);
                            return (() => {
                                var _chunk$7 = Bits$1(_chunk$4);
                                return Bits$chunks_of$go(_len$1)($1697)($1698)(_chunk$7)
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
                var $1699 = (self - 1n);
                return (() => {
                    var self = _bits$2;
                    switch (self.length === 0 ? 'nil' : self[self.length - 1] === '0' ? '0' : '1') {
                        case 'nil':
                            return Word$0(Word$from_bits($1699)(Bits$nil));
                        case '0':
                            var $1700 = self.slice(0, -1);
                            return Word$0(Word$from_bits($1699)($1700));
                        case '1':
                            var $1701 = self.slice(0, -1);
                            return Word$1(Word$from_bits($1699)($1701));
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
                var $1702 = self.fst;
                var $1703 = self.snd;
                return $1702;
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
                            var $1704 = self.name;
                            var $1705 = self.indx;
                            return Fm$Name$show($1704);
                        case 'Fm.Term.ref':
                            var $1706 = self.name;
                            return (() => {
                                var _name$4 = Fm$Name$show($1706);
                                return (() => {
                                    var self = _path$2;
                                    switch (self._) {
                                        case 'Maybe.none':
                                            return _name$4;
                                        case 'Maybe.some':
                                            var $1707 = self.value;
                                            return (() => {
                                                var _path_val$6 = (Bits$1(Bits$nil) + Fm$Path$to_bits($1707));
                                                var _path_str$7 = Nat$show(Bits$to_nat(_path_val$6));
                                                return String$flatten(List$cons(_name$4)(List$cons("-")(List$cons(_path_str$7)(List$nil))))
                                            })();
                                    }
                                })()
                            })();
                        case 'Fm.Term.typ':
                            return "Type";
                        case 'Fm.Term.all':
                            var $1708 = self.eras;
                            var $1709 = self.self;
                            var $1710 = self.name;
                            var $1711 = self.xtyp;
                            var $1712 = self.body;
                            return (() => {
                                var _eras$8 = $1708;
                                var _self$9 = Fm$Name$show($1709);
                                var _name$10 = Fm$Name$show($1710);
                                var _type$11 = Fm$Term$show$go($1711)(Fm$MPath$0(_path$2));
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
                                var _body$14 = Fm$Term$show$go($1712(Fm$Term$var($1709)(0n))(Fm$Term$var($1710)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_self$9)(List$cons(_open$12)(List$cons(_name$10)(List$cons(":")(List$cons(_type$11)(List$cons(_clos$13)(List$cons(" ")(List$cons(_body$14)(List$nil)))))))))
                            })();
                        case 'Fm.Term.lam':
                            var $1713 = self.name;
                            var $1714 = self.body;
                            return (() => {
                                var _name$5 = Fm$Name$show($1713);
                                var _body$6 = Fm$Term$show$go($1714(Fm$Term$var($1713)(0n)))(Fm$MPath$0(_path$2));
                                return String$flatten(List$cons("(")(List$cons(_name$5)(List$cons(") ")(List$cons(_body$6)(List$nil)))))
                            })();
                        case 'Fm.Term.app':
                            var $1715 = self.func;
                            var $1716 = self.argm;
                            return (() => {
                                var _func$5 = Fm$Term$show$go($1715)(Fm$MPath$0(_path$2));
                                var _argm$6 = Fm$Term$show$go($1716)(Fm$MPath$1(_path$2));
                                var _wrap$7 = (() => {
                                    var self = _func$5;
                                    switch (self.length === 0 ? 'nil' : 'cons') {
                                        case 'nil':
                                            return Bool$false;
                                        case 'cons':
                                            var $1717 = self.charCodeAt(0);
                                            var $1718 = self.slice(1);
                                            return ($1717 === 40);
                                    }
                                })();
                                return (() => {
                                    var self = _wrap$7;
                                    switch (self ? 'true' : 'false') {
                                        case 'true':
                                            return String$flatten(List$cons("(")(List$cons(_func$5)(List$cons(")")(List$cons("(")(List$cons(_argm$6)(List$cons(")")(List$nil)))))));
                                        case 'false':
                                            return String$flatten(List$cons(_func$5)(List$cons("(")(List$cons(_argm$6)(List$cons(")")(List$nil)))));
                                    }
                                })()
                            })();
                        case 'Fm.Term.let':
                            var $1719 = self.name;
                            var $1720 = self.expr;
                            var $1721 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($1719);
                                var _expr$7 = Fm$Term$show$go($1720)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($1721(Fm$Term$var($1719)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("let ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.def':
                            var $1722 = self.name;
                            var $1723 = self.expr;
                            var $1724 = self.body;
                            return (() => {
                                var _name$6 = Fm$Name$show($1722);
                                var _expr$7 = Fm$Term$show$go($1723)(Fm$MPath$0(_path$2));
                                var _body$8 = Fm$Term$show$go($1724(Fm$Term$var($1722)(0n)))(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons("def ")(List$cons(_name$6)(List$cons(" = ")(List$cons(_expr$7)(List$cons("; ")(List$cons(_body$8)(List$nil)))))))
                            })();
                        case 'Fm.Term.ann':
                            var $1725 = self.done;
                            var $1726 = self.term;
                            var $1727 = self.type;
                            return (() => {
                                var _term$6 = Fm$Term$show$go($1726)(Fm$MPath$0(_path$2));
                                var _type$7 = Fm$Term$show$go($1727)(Fm$MPath$1(_path$2));
                                return String$flatten(List$cons(_term$6)(List$cons("::")(List$cons(_type$7)(List$nil))))
                            })();
                        case 'Fm.Term.gol':
                            var $1728 = self.name;
                            var $1729 = self.dref;
                            var $1730 = self.verb;
                            return (() => {
                                var _name$6 = Fm$Name$show($1728);
                                return String$flatten(List$cons("?")(List$cons(_name$6)(List$nil)))
                            })();
                        case 'Fm.Term.hol':
                            var $1731 = self.path;
                            return "_";
                        case 'Fm.Term.nat':
                            var $1732 = self.natx;
                            return String$flatten(List$cons(Nat$show($1732))(List$nil));
                        case 'Fm.Term.chr':
                            var $1733 = self.chrx;
                            return String$flatten(List$cons("\'")(List$cons(Fm$escape$char($1733))(List$cons("\'")(List$nil))));
                        case 'Fm.Term.str':
                            var $1734 = self.strx;
                            return String$flatten(List$cons("\"")(List$cons(Fm$escape($1734))(List$cons("\"")(List$nil))));
                        case 'Fm.Term.cse':
                            var $1735 = self.path;
                            var $1736 = self.expr;
                            var $1737 = self.name;
                            var $1738 = self.with;
                            var $1739 = self.cses;
                            var $1740 = self.moti;
                            return (() => {
                                var _expr$9 = Fm$Term$show$go($1736)(Fm$MPath$0(_path$2));
                                var _name$10 = Fm$Name$show($1737);
                                var _with$11 = String$join("")(List$mapped($1738)((_def$11 => (() => {
                                    var self = _def$11;
                                    switch (self._) {
                                        case 'Fm.Def.new':
                                            var $1741 = self.name;
                                            var $1742 = self.term;
                                            var $1743 = self.type;
                                            var $1744 = self.done;
                                            return (() => {
                                                var _name$16 = Fm$Name$show($1741);
                                                var _type$17 = Fm$Term$show$go($1743)(Maybe$none);
                                                var _term$18 = Fm$Term$show$go($1742)(Maybe$none);
                                                return String$flatten(List$cons(_name$16)(List$cons(": ")(List$cons(_type$17)(List$cons(" = ")(List$cons(_term$18)(List$cons(";")(List$nil)))))))
                                            })();
                                    }
                                })())));
                                var _cses$12 = Map$to_list($1739);
                                var _cses$13 = String$join("")(List$mapped(_cses$12)((_x$13 => (() => {
                                    var _name$14 = Fm$Name$from_bits(Pair$fst(_x$13));
                                    var _term$15 = Fm$Term$show$go(Pair$snd(_x$13))(Maybe$none);
                                    return String$flatten(List$cons(_name$14)(List$cons(": ")(List$cons(_term$15)(List$cons("; ")(List$nil)))))
                                })())));
                                var _moti$14 = Fm$Term$show$go($1740)(Maybe$none);
                                return String$flatten(List$cons("case ")(List$cons(_expr$9)(List$cons(" as ")(List$cons(_name$10)(List$cons(_with$11)(List$cons(" { ")(List$cons(_cses$13)(List$cons("} : ")(List$cons(_moti$14)(List$nil))))))))))
                            })();
                    }
                })();
            case 'Maybe.some':
                var $1745 = self.value;
                return $1745;
        }
    })()));
    var Fm$Term$show = (_term$1 => Fm$Term$show$go(_term$1)(Maybe$none));
    var String$is_empty = (_str$1 => (() => {
        var self = _str$1;
        switch (self.length === 0 ? 'nil' : 'cons') {
            case 'nil':
                return Bool$true;
            case 'cons':
                var $1746 = self.charCodeAt(0);
                var $1747 = self.slice(1);
                return Bool$false;
        }
    })());
    var Fm$Context$show = (_context$1 => (() => {
        var self = _context$1;
        switch (self._) {
            case 'List.nil':
                return "";
            case 'List.cons':
                var $1748 = self.head;
                var $1749 = self.tail;
                return (() => {
                    var self = $1748;
                    switch (self._) {
                        case 'Pair.new':
                            var $1750 = self.fst;
                            var $1751 = self.snd;
                            return (() => {
                                var _name$6 = Fm$Name$show($1750);
                                var _type$7 = Fm$Term$show($1751);
                                var _rest$8 = Fm$Context$show($1749);
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
                var $1752 = self.name;
                var $1753 = self.indx;
                return _term$4;
            case 'Fm.Term.ref':
                var $1754 = self.name;
                return (() => {
                    var self = Fm$get($1754)(_defs$3);
                    switch (self._) {
                        case 'Maybe.none':
                            return Fm$Term$ref($1754);
                        case 'Maybe.some':
                            var $1755 = self.value;
                            return (() => {
                                var self = $1755;
                                switch (self._) {
                                    case 'Fm.Def.new':
                                        var $1756 = self.name;
                                        var $1757 = self.term;
                                        var $1758 = self.type;
                                        var $1759 = self.done;
                                        return $1757;
                                }
                            })();
                    }
                })();
            case 'Fm.Term.typ':
                return _term$4;
            case 'Fm.Term.all':
                var $1760 = self.eras;
                var $1761 = self.self;
                var $1762 = self.name;
                var $1763 = self.xtyp;
                var $1764 = self.body;
                return _term$4;
            case 'Fm.Term.lam':
                var $1765 = self.name;
                var $1766 = self.body;
                return _term$4;
            case 'Fm.Term.app':
                var $1767 = self.func;
                var $1768 = self.argm;
                return _term$4;
            case 'Fm.Term.let':
                var $1769 = self.name;
                var $1770 = self.expr;
                var $1771 = self.body;
                return _term$4;
            case 'Fm.Term.def':
                var $1772 = self.name;
                var $1773 = self.expr;
                var $1774 = self.body;
                return _term$4;
            case 'Fm.Term.ann':
                var $1775 = self.done;
                var $1776 = self.term;
                var $1777 = self.type;
                return _term$4;
            case 'Fm.Term.gol':
                var $1778 = self.name;
                var $1779 = self.dref;
                var $1780 = self.verb;
                return _term$4;
            case 'Fm.Term.hol':
                var $1781 = self.path;
                return _term$4;
            case 'Fm.Term.nat':
                var $1782 = self.natx;
                return _term$4;
            case 'Fm.Term.chr':
                var $1783 = self.chrx;
                return _term$4;
            case 'Fm.Term.str':
                var $1784 = self.strx;
                return _term$4;
            case 'Fm.Term.cse':
                var $1785 = self.path;
                var $1786 = self.expr;
                var $1787 = self.name;
                var $1788 = self.with;
                var $1789 = self.cses;
                var $1790 = self.moti;
                return _term$4;
        }
    })())))));
    var Fm$Term$expand = (_dref$1 => (_term$2 => (_defs$3 => (() => {
        var _term$4 = Fm$Term$normalize(_term$2)(Map$new);
        var _term$5 = (list_for(_dref$1)(_term$4)((_path$5 => (_term$6 => Fm$Term$normalize(Fm$Term$expand_at(_path$5)(_term$6)(_defs$3))(Map$new)))));
        return _term$5
    })())));
    var Fm$Error$show = (_error$1 => (_defs$2 => (() => {
        var self = _error$1;
        switch (self._) {
            case 'Fm.Error.type_mismatch':
                var $1791 = self.expected;
                var $1792 = self.detected;
                var $1793 = self.context;
                return (() => {
                    var _expected$6 = (() => {
                        var self = $1791;
                        switch (self._) {
                            case 'Either.left':
                                var $1794 = self.value;
                                return $1794;
                            case 'Either.right':
                                var $1795 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($1795)(Map$new));
                        }
                    })();
                    var _detected$7 = (() => {
                        var self = $1792;
                        switch (self._) {
                            case 'Either.left':
                                var $1796 = self.value;
                                return $1796;
                            case 'Either.right':
                                var $1797 = self.value;
                                return Fm$Term$show(Fm$Term$normalize($1797)(Map$new));
                        }
                    })();
                    var _context$8 = Fm$Context$show($1793);
                    return String$flatten(List$cons("Type mismatch.\u{a}")(List$cons("- Expected: ")(List$cons(_expected$6)(List$cons("\u{a}")(List$cons("- Detected: ")(List$cons(_detected$7)(List$cons("\u{a}")(List$cons("With context:\u{a}")(List$cons(_context$8)(List$nil))))))))))
                })();
            case 'Fm.Error.show_goal':
                var $1798 = self.name;
                var $1799 = self.dref;
                var $1800 = self.verb;
                var $1801 = self.goal;
                var $1802 = self.context;
                return (() => {
                    var _goal_name$8 = String$flatten(List$cons("Goal ?")(List$cons(Fm$Name$show($1798))(List$cons(":\u{a}")(List$nil))));
                    var _with_type$9 = (() => {
                        var self = $1801;
                        switch (self._) {
                            case 'Maybe.none':
                                return "";
                            case 'Maybe.some':
                                var $1803 = self.value;
                                return (() => {
                                    var _goal$10 = Fm$Term$expand($1799)($1803)(_defs$2);
                                    return String$flatten(List$cons("With type: ")(List$cons((() => {
                                        var self = $1800;
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
                    var _with_ctxt$10 = String$flatten(List$cons("With ctxt:\u{a}")(List$cons(Fm$Context$show($1802))(List$nil)));
                    return String$flatten(List$cons(_goal_name$8)(List$cons(_with_type$9)(List$cons(_with_ctxt$10)(List$nil))))
                })();
            case 'Fm.Error.patch':
                var $1804 = self.path;
                var $1805 = self.term;
                return String$flatten(List$cons("Patching: ")(List$cons(Fm$Term$show($1805))(List$nil)));
            case 'Fm.Error.undefined_reference':
                var $1806 = self.name;
                return String$flatten(List$cons("Undefined reference: ")(List$cons(Fm$Name$show($1806))(List$nil)));
            case 'Fm.Error.cant_infer':
                var $1807 = self.term;
                var $1808 = self.context;
                return (() => {
                    var _term$5 = Fm$Term$show($1807);
                    var _context$6 = Fm$Context$show($1808);
                    return String$flatten(List$cons("Can\'t infer type of: ")(List$cons(_term$5)(List$cons("\u{a}")(List$cons("With ctxt:\u{a}")(List$cons(_context$6)(List$nil))))))
                })();
        }
    })()));
    var Fm$Defs$report = (_defs$1 => (() => {
        var _result$2 = "";
        var _result$3 = (list_for(Map$to_list(_defs$1))(_result$2)((_def$3 => (_result$4 => (() => {
            var self = _def$3;
            switch (self._) {
                case 'Pair.new':
                    var $1809 = self.fst;
                    var $1810 = self.snd;
                    return (() => {
                        var self = $1810;
                        switch (self._) {
                            case 'Fm.Def.new':
                                var $1811 = self.name;
                                var $1812 = self.term;
                                var $1813 = self.type;
                                var $1814 = self.done;
                                return (() => {
                                    var _name$11 = $1811;
                                    return ((console.log(("check " + _name$11)), (_x$12 => (() => {
                                        var _term$13 = $1812;
                                        var _type$14 = $1813;
                                        var _check$15 = Fm$Term$check(_term$13)(Maybe$some(_type$14))(_defs$1)(List$nil)(Fm$MPath$nil);
                                        return (() => {
                                            var self = _check$15;
                                            switch (self._) {
                                                case 'Fm.Check.result':
                                                    var $1815 = self.value;
                                                    var $1816 = self.errors;
                                                    return (() => {
                                                        var self = $1816;
                                                        switch (self._) {
                                                            case 'List.nil':
                                                                return _result$4;
                                                            case 'List.cons':
                                                                var $1817 = self.head;
                                                                var $1818 = self.tail;
                                                                return (() => {
                                                                    var _name_str$20 = Fm$Name$show(_name$11);
                                                                    var _type_str$21 = "<error>";
                                                                    var _result$22 = (list_for($1816)(_result$4)((_error$22 => (_result$23 => String$flatten(List$cons(_result$23)(List$cons("On ")(List$cons(_name_str$20)(List$cons(":\u{a}")(List$cons(Fm$Error$show(_error$22)(_defs$1))(List$cons("\u{a}")(List$nil)))))))))));
                                                                    return _result$22
                                                                })();
                                                        }
                                                    })();
                                            }
                                        })()
                                    })())()))
                                })();
                        }
                    })();
            }
        })()))));
        return (() => {
            var self = _result$3;
            switch (self.length === 0 ? 'nil' : 'cons') {
                case 'nil':
                    return "All terms check.";
                case 'cons':
                    var $1819 = self.charCodeAt(0);
                    var $1820 = self.slice(1);
                    return _result$3;
            }
        })()
    })());
    var Fm$report = (_code$1 => (() => {
        var _defs$2 = Maybe$default(Map$new)(Fm$Defs$read(_code$1));
        var _defs$3 = Fm$synth(_defs$2);
        return Fm$Defs$report(_defs$3)
    })());
    var Fm$exports = (() => {
        var _Fm$to_core$1 = Fm$to_core;
        var _Fm$report$2 = Fm$report;
        return Unit$new
    })();
    return {
        'Maybe.default': Maybe$default,
        'Map': Map,
        'Map.new': Map$new,
        'Monad.bind': Monad$bind,
        'Parser': Parser,
        'Monad.new': Monad$new,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser.bind': Parser$bind,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.pure': Parser$pure,
        'Parser.monad': Parser$monad,
        'Maybe': Maybe,
        'Maybe.none': Maybe$none,
        'Maybe.some': Maybe$some,
        'Parser.maybe': Parser$maybe,
        'List': List,
        'List.nil': List$nil,
        'List.cons': List$cons,
        'Parser.many.go': Parser$many$go,
        'Parser.many': Parser$many,
        'Parser.first_of': Parser$first_of,
        'Unit.new': Unit$new,
        'String.cons': String$cons,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'Bool.false': Bool$false,
        'Bool.true': Bool$true,
        'Cmp.as_eql': Cmp$as_eql,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Word.cmp.go': Word$cmp$go,
        'Cmp.eql': Cmp$eql,
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
        'Monad.pure': Monad$pure,
        'List.fold': List$fold,
        'Fm.Parser.name': Fm$Parser$name,
        'Parser.many1': Parser$many1,
        'Fm.Parser.spaces_text': Fm$Parser$spaces_text,
        'Pair': Pair,
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
        'Parser.if_not': Parser$if_not,
        'Parser.until': Parser$until,
        'Fm.Term.str': Fm$Term$str,
        'Fm.Parser.string': Fm$Parser$string,
        'Fm.Parser.pair': Fm$Parser$pair,
        'Fm.Name.read': Fm$Name$read,
        'Fm.Parser.list': Fm$Parser$list,
        'Fm.Parser.forin': Fm$Parser$forin,
        'Fm.Parser.do.statements': Fm$Parser$do$statements,
        'Fm.Parser.do': Fm$Parser$do,
        'Fm.Def.new': Fm$Def$new,
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
        'Fm.Parser.reference': Fm$Parser$reference,
        'List.for': List$for,
        'Fm.Parser.application': Fm$Parser$application,
        'Fm.Parser.arrow': Fm$Parser$arrow,
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
        'String.eql': String$eql,
        'Fm.Name.eql': Fm$Name$eql,
        'Fm.Context.find': Fm$Context$find,
        'List.length.go': List$length$go,
        'List.length': List$length,
        'Fm.Path.0': Fm$Path$0,
        'Fm.Path.1': Fm$Path$1,
        'Fm.Path.to_bits': Fm$Path$to_bits,
        'Fm.Term.bind': Fm$Term$bind,
        'Fm.Parser.definition': Fm$Parser$definition,
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
        'Fm.set': Fm$set,
        'Fm.Constructor.build_term.opt.go': Fm$Constructor$build_term$opt$go,
        'Fm.Constructor.build_term.opt': Fm$Constructor$build_term$opt,
        'Fm.Constructor.build_term.go': Fm$Constructor$build_term$go,
        'Fm.Constructor.build_term': Fm$Constructor$build_term,
        'Fm.Constructor.build_type.go': Fm$Constructor$build_type$go,
        'Fm.Constructor.build_type': Fm$Constructor$build_type,
        'Fm.Parser.file.go': Fm$Parser$file$go,
        'Fm.Parser.file': Fm$Parser$file,
        'Fm.Defs.read': Fm$Defs$read,
        'Map.to_list.go': Map$to_list$go,
        'Map.to_list': Map$to_list,
        'Fm.Check': Fm$Check,
        'Fm.Check.result': Fm$Check$result,
        'Fm.Check.bind': Fm$Check$bind,
        'Fm.Check.pure': Fm$Check$pure,
        'Fm.Check.monad': Fm$Check$monad,
        'Fm.Error.undefined_reference': Fm$Error$undefined_reference,
        'Map.get': Map$get,
        'Fm.get': Fm$get,
        'Maybe.mapped': Maybe$mapped,
        'Fm.MPath.0': Fm$MPath$0,
        'Fm.MPath.1': Fm$MPath$1,
        'Fm.Error.cant_infer': Fm$Error$cant_infer,
        'Fm.Term.unroll_nat': Fm$Term$unroll_nat,
        'Fm.Term.unroll_chr.bits': Fm$Term$unroll_chr$bits,
        'Fm.Term.unroll_chr': Fm$Term$unroll_chr,
        'Fm.Term.unroll_str': Fm$Term$unroll_str,
        'Fm.Term.reduce': Fm$Term$reduce,
        'Either.left': Either$left,
        'Either.right': Either$right,
        'Fm.Error.type_mismatch': Fm$Error$type_mismatch,
        'Fm.Error.show_goal': Fm$Error$show_goal,
        'Fm.Term.desugar_cse.motive': Fm$Term$desugar_cse$motive,
        'Fm.Term.desugar_cse.argument': Fm$Term$desugar_cse$argument,
        'Maybe.or': Maybe$or,
        'Fm.Term.desugar_cse.cases': Fm$Term$desugar_cse$cases,
        'Fm.Term.desugar_cse': Fm$Term$desugar_cse,
        'Fm.Error.patch': Fm$Error$patch,
        'Fm.MPath.to_bits': Fm$MPath$to_bits,
        'Cmp.as_gte': Cmp$as_gte,
        'Nat.cmp': Nat$cmp,
        'Nat.gte': Nat$gte,
        'Nat.pred': Nat$pred,
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
        'Fm.Term.patch_at': Fm$Term$patch_at,
        'Fm.synth.fix': Fm$synth$fix,
        'Fm.synth.one': Fm$synth$one,
        'Fm.synth': Fm$synth,
        'Fm.Name.show': Fm$Name$show,
        'Either': Either,
        'Nat.sub_rem': Nat$sub_rem,
        'Nat.div_mod.go': Nat$div_mod$go,
        'Nat.div_mod': Nat$div_mod,
        'Nat.to_base.go': Nat$to_base$go,
        'Nat.to_base': Nat$to_base,
        'Nat.mod': Nat$mod,
        'Cmp.as_gtn': Cmp$as_gtn,
        'Nat.gtn': Nat$gtn,
        'Nat.lte': Nat$lte,
        'Nat.show_digit': Nat$show_digit,
        'Nat.to_string_base': Nat$to_string_base,
        'Nat.show': Nat$show,
        'Bits.to_nat': Bits$to_nat,
        'U16.show_hex': U16$show_hex,
        'Fm.escape.char': Fm$escape$char,
        'Fm.escape': Fm$escape,
        'Fm.Term.core': Fm$Term$core,
        'Fm.Defs.core': Fm$Defs$core,
        'Fm.to_core': Fm$to_core,
        'Debug.log': Debug$log,
        'Maybe.bind': Maybe$bind,
        'Maybe.monad': Maybe$monad,
        'Fm.Term.show.as_nat.go': Fm$Term$show$as_nat$go,
        'Fm.Term.show.as_nat': Fm$Term$show$as_nat,
        'String.join.go': String$join$go,
        'String.join': String$join,
        'Bits.chunks_of.go': Bits$chunks_of$go,
        'Bits.chunks_of': Bits$chunks_of,
        'Word.from_bits': Word$from_bits,
        'Fm.Name.from_bits': Fm$Name$from_bits,
        'Pair.fst': Pair$fst,
        'Fm.Term.show.go': Fm$Term$show$go,
        'Fm.Term.show': Fm$Term$show,
        'String.is_empty': String$is_empty,
        'Fm.Context.show': Fm$Context$show,
        'Fm.Term.expand_at': Fm$Term$expand_at,
        'Fm.Term.expand': Fm$Term$expand,
        'Fm.Error.show': Fm$Error$show,
        'Fm.Defs.report': Fm$Defs$report,
        'Fm.report': Fm$report,
        'Fm.exports': Fm$exports,
    };
})();