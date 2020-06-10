import { TokenType } from './TokenType'

export default abstract class Lexer {
    protected _input: string
    protected _index: number
    protected _char: string | TokenType.EOF
    constructor(input: string) {
        this._input = input
        this._index = 0
        this._char = input.charAt(0)
    }
    public consume() {
        this._index++
        if (this._index >= this._input.length) {
            this._char = TokenType.EOF
        } else {
            this._char = this._input.charAt(this._index)
        }
    }
    public match(charToMatch: string) {
        if (this._char === charToMatch) {
            this.consume()
        } else {
            throw new Error(`Expecting ${charToMatch}; found ${this._char}`)
        }
    }
}