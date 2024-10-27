enum PitchFormat {
    VECTOR = "vector",
    QUOTIENT = "quotient",
    COMMA_NAME = "commaName",
    CENTS = "cents",
    INTEGER = "integer",
    ACCIDENTAL = "symbol",
    UNKNOWN = "unknown",
}

enum JiPitchScriptFlag {
    VECTOR = "m",
    QUOTIENT = "q",
    COMMA_NAME = "n",
    ACCIDENTAL = "a",
    INTEGER = "i",
}

export { PitchFormat, JiPitchScriptFlag }
