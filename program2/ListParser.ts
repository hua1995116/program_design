import Token from '../program1/Token';
import {TokenType} from '../program1/TokenType';
import ListLexer from '../program1/ListLexer';
import Parser from './Parser';

export default class ListParser extends Parser {
    constructor(input: ListLexer) {
        super(input);
    }
    public match(x: number) {
        if (this._lookahead.type === x) {
            this.consume();
        } else {;
            throw new Error("expecting " + x +  "found " + this._lookahead.type);
        }
    }
    public list() {
        this.match(TokenType.LBRACK);
        this.elements();
        this.match(TokenType.RBRACK);
    }
    elements() {
        this.element();
        while (this._lookahead.type === TokenType.COMMA) {
            this.match(TokenType.COMMA);
            this.element();
        }
    }
    element() {
        if (this._lookahead.type === TokenType.NAME) {
            this.match(TokenType.NAME);
        } else if (this._lookahead.type === TokenType.LBRACK) {
            this.list();
        } else {
            throw new Error("expecting name or list; found " + this._lookahead);
        }
    }
}