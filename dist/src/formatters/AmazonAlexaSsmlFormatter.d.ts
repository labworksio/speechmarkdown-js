import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';
export declare class AmazonAlexaSsmlFormatter extends SsmlFormatterBase {
    options: SpeechOptions;
    private validVoices;
    constructor(options: SpeechOptions);
    private getTextModifierObject;
    private getSectionObject;
    protected formatFromAst(ast: any, lines?: string[]): string[];
}
