import ListLexer from './ListLexer';
import { TokenType } from './TokenType'

let lexer = new ListLexer('[a, b ]');

let t = lexer.nextToken();

while (t.type !== TokenType.EOF) {
    console.log(t);
    t = lexer.nextToken();
}

console.log(t);