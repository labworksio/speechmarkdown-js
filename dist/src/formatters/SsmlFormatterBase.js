"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FormatterBase_1 = require("./FormatterBase");
var SsmlFormatterBase = /** @class */ (function (_super) {
    __extends(SsmlFormatterBase, _super);
    function SsmlFormatterBase(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.sectionTags = [];
        _this.modifierKeyMappings = {
            'chars': 'characters',
            'bleep': 'expletive',
            'phone': 'telephone',
            'vol': 'volume',
        };
        _this.ssmlTagSortOrder = [
            'emphasis',
            'say-as',
            'prosody',
            'amazon:effect',
            'voice',
            'lang',
            'sub',
            'phoneme',
        ];
        _this.modifierKeyToSsmlTagMappings = {
            'emphasis': 'emphasis',
            'address': 'say-as',
            'number': 'say-as',
            'characters': 'say-as',
            'expletive': 'say-as',
            'fraction': 'say-as',
            'interjection': 'say-as',
            'ordinal': 'say-as',
            'telephone': 'say-as',
            'unit': 'say-as',
            'time': 'say-as',
            'date': 'say-as',
            'whisper': null,
            'sub': 'sub',
            'ipa': 'phoneme',
            'rate': 'prosody',
            'pitch': 'prosody',
            'volume': 'prosody',
            'lang': null,
            'voice': null,
        };
        return _this;
    }
    SsmlFormatterBase.prototype.format = function (ast) {
        var lines = this.formatFromAst(ast, []);
        return lines.join('');
    };
    SsmlFormatterBase.prototype.addSectionStartTag = function (tagsSortedAsc, so, lines) {
        this.sectionTags = tagsSortedAsc.slice().reverse();
        for (var index = 0; index < tagsSortedAsc.length; index++) {
            var tag = tagsSortedAsc[index];
            var attrs = so.tags[tag].attrs;
            lines.push('\n');
            lines.push(this.startTag(tag, attrs, false));
        }
    };
    SsmlFormatterBase.prototype.addSectionEndTag = function (lines) {
        if (this.sectionTags.length > 0) {
            // add previous end tag(s)
            for (var index = 0; index < this.sectionTags.length; index++) {
                var tag = this.sectionTags[index];
                lines.push(this.endTag(tag, false));
                lines.push('\n');
            }
        }
    };
    // Adds tagged content
    SsmlFormatterBase.prototype.addTag = function (tag, ast, newLine, newLineAfterEnd, attr, lines) {
        lines.push(this.startTag(tag, attr, newLine));
        this.processAst(ast, lines);
        lines.push(this.endTag(tag, newLine));
        if (newLineAfterEnd) {
            lines.push('\n');
        }
        return lines;
    };
    SsmlFormatterBase.prototype.addSpeakTag = function (ast, newLine, newLineAfterEnd, attr, lines) {
        // lines.push(this.startTag('speak', attr, newLine));
        this.processAst(ast, lines);
        this.addSectionEndTag(lines);
        // lines.push(this.endTag('speak', newLine));
        if (newLineAfterEnd) {
            lines.push('\n');
        }
        return lines;
    };
    SsmlFormatterBase.prototype.addComment = function (commentText, lines) {
        lines.push("<!-- " + commentText + " -->\n");
        return lines;
    };
    // Returns the SSML for a start tag
    SsmlFormatterBase.prototype.startTag = function (tag, attr, newLine) {
        if (newLine === void 0) { newLine = false; }
        var attrStr = '';
        if (attr) {
            attrStr = ' ' + Object.keys(attr).map(function (k) {
                return k + '="' + attr[k] + '"';
            }).join(' ');
        }
        return '<' + tag + attrStr + '>' + (newLine ? '\n' : '');
    };
    // Returns the SSML for an end tag
    SsmlFormatterBase.prototype.endTag = function (tag, newLine) {
        if (newLine === void 0) { newLine = false; }
        return (newLine ? '\n' : '') + '</' + tag + '>';
        // return '</' + tag + '>';
    };
    SsmlFormatterBase.prototype.voidTag = function (tag, attr) {
        var attrStr = '';
        if (attr) {
            attrStr = ' ' + Object.keys(attr).map(function (k) {
                return k + '="' + attr[k] + '"';
            }).join(' ');
        }
        return '<' + tag + attrStr + '/>';
    };
    SsmlFormatterBase.prototype.addTagWithAttrs = function (lines, text, tag, attrs) {
        if (text) {
            lines.push(this.startTag(tag, attrs));
            lines.push(text);
            lines.push(this.endTag(tag, false));
        }
        else {
            lines.push(this.voidTag(tag, attrs));
        }
        return lines;
    };
    SsmlFormatterBase.prototype.getTagWithAttrs = function (text, tag, attrs) {
        var lines = [];
        if (text) {
            lines.push(this.startTag(tag, attrs));
            lines.push(text);
            lines.push(this.endTag(tag, false));
        }
        else {
            lines.push(this.voidTag(tag, attrs));
        }
        return lines.join('');
    };
    SsmlFormatterBase.prototype.sentenceCase = function (text) {
        return text.replace(/[a-z]/i, function (letter) {
            return letter.toUpperCase();
        }).trim();
    };
    return SsmlFormatterBase;
}(FormatterBase_1.FormatterBase));
exports.SsmlFormatterBase = SsmlFormatterBase;
//# sourceMappingURL=SsmlFormatterBase.js.map