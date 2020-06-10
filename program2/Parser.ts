import Token from '../program1/Token';
import ListLexer from '../program1/ListLexer';

export default abstract class Parser {
    protected _lookahead: Token
    protected _input: ListLexer
    constructor(input: ListLexer) {
        this._input = input;
        this._lookahead = this._input.nextToken();
    }
    public consume() {
        this._lookahead = this._input.nextToken();
    }
}