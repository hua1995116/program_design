import Token from '../program1/Token';
import ListLexer from '../program1/ListLexer';
import {TokenType} from '../program1/TokenType';

export default class Parser {
    protected _lookahead: Token[]
    protected _input: ListLexer
    public k: number
    public p = 0
    constructor(input: ListLexer, k: number) {
        this._input = input;
        this.k = k;
        this._lookahead = [];
        for (let i = 1; i <= k; i++) {
            this.consume();
        }
    }
    public consume() {
        // this._lookahead = this._input.nextToken();
        this._lookahead[this.p] = this._input.nextToken();
        this.p = (this.p + 1) % this.k;
    }
    public LT(i: number): Token {
        return this._lookahead[(this.p + i - 1) % this.k];
    }
    public LA(i: number): TokenType {
        return this.LT(i).type;
    }
    public match(x: number) {
        if (this.LA(1) === x) {
            this.consume();
        } else {
            console.log(x, this.LT(1));
            throw new Error('expecting' + this.LT(1));
        }
    }
    public list() {
        this.match(TokenType.LBRACK);
        this.elements();
        this.match(TokenType.RBRACK);
    }
    elements() {
        this.element();
        while (this.LA(1) === TokenType.COMMA) {
            this.match(TokenType.COMMA);
            this.element();
        }
    }
    public element() {
        if (this.LA(1) === TokenType.NAME && this.LA(2) === TokenType.EQUALS) {
            this.match(TokenType.NAME);
            this.match(TokenType.EQUALS);
            this.match(TokenType.NAME);
        } else if (this.LA(1) === TokenType.NAME) {
            this.match(TokenType.NAME);
        } else if (this.LA(1) === TokenType.LBRACK) {
            this.list();
        } else {
            throw new Error('expecting name or list');
        }
    }
}