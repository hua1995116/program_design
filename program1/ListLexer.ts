import Token from './Token';
import { TokenType } from './TokenType';
import Lexer from './Lexer';

export default class ListLexer extends Lexer{
    constructor(input: string) {
        super(input)
    }
    private _isLETTER(): boolean {
        const c = this._char;
        return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    }
    public nextToken() {
        while ( this._char !== TokenType.EOF) {
            switch (this._char) {
                case ' ':
                case '\t':
                case '\n':
                case '\r':
                    this._WS();
                    continue;
                case ',':
                    this.consume();
                    return new Token(TokenType.COMMA, ',');
                case '[':
                    this.consume();
                    return new Token(TokenType.LBRACK, '[');
                case ']':
                    this.consume();
                    return new Token(TokenType.RBRACK, ']');
                case '=':
                    this.consume();
                    return new Token(TokenType.EQUALS, '=');
                default:
                    if (this._isLETTER) {
                        return this._NAME();
                    }
                    throw new Error("invalid character: " + this._char);
            }
        }
        return new Token(TokenType.EOF, '<EOF>')
    }
    private _NAME() {
        let buf = '';
        do {
            buf += this._char;
            this.consume()
        } while (this._isLETTER());
        return new Token(TokenType.NAME, buf);
    }
    private _WS() {
        while (this._char === ' ' || this._char === '\t' || this._char === '\n' || this._char === '\r') {
            this.consume();
        }
    }
}
