enum PitchFormat {
    PEV = "pev",
    QUOTIENT = "quotient",
    COMMA_NAME = "commaName",
    CENTS = "cents",
    INTEGER = "integer",
    ACCIDENTAL = "symbol",
    UNKNOWN = "unknown",
}

enum JiPitchScriptFlag {
    PEV = "m",
    QUOTIENT = "q",
    COMMA_NAME = "n",
    ACCIDENTAL = "a",
    INTEGER = "i",
}

export {
    PitchFormat,
    JiPitchScriptFlag,
}
