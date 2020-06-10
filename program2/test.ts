import ListParser from './ListParser';
import ListLexer from '../program1/ListLexer';

const lexer = new ListLexer("[a, b]");
const parser = new ListParser(lexer);
parser.list();