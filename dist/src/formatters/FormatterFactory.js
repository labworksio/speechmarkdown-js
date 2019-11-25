"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmazonAlexaSsmlFormatter_1 = require("./AmazonAlexaSsmlFormatter");
var GoogleAssistantSsmlFormatter_1 = require("./GoogleAssistantSsmlFormatter");
var TextFormatter_1 = require("./TextFormatter");
function createFormatter(options) {
    switch (options.platform) {
        case 'amazon-alexa':
            return new AmazonAlexaSsmlFormatter_1.AmazonAlexaSsmlFormatter(options);
        case 'google-assistant':
            return new GoogleAssistantSsmlFormatter_1.GoogleAssistantSsmlFormatter(options);
        default:
            return new TextFormatter_1.TextFormatter(options);
    }
}
exports.createFormatter = createFormatter;
function createTextFormatter(options) {
    return new TextFormatter_1.TextFormatter(options);
}
exports.createTextFormatter = createTextFormatter;
//# sourceMappingURL=FormatterFactory.js.map