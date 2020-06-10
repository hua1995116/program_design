import ListLexer from '../program1/ListLexer';
import Parser from './Parser';

const lexer = new ListLexer("[a, a=c, b]");
const parser = new Parser(lexer, 2);
parser.list();