import { TokenType } from './TokenType';

export default class Token {
    public type: TokenType
    public text: string
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }
    public toString() {
        return  `<'${this.text}', ${TokenType[this.type]}>`
    }
}

