import { Rational, Rough, Vector } from "@sagittal/general"
import {
    DEFAULT_EXCLUSIVE,
    DEFAULT_LOWER_BOUND,
    DEFAULT_MAX_2_3_FREE_COPFR,
    DEFAULT_MAX_2_3_FREE_SOPFR,
    DEFAULT_MAX_AAS,
    DEFAULT_MAX_ATE,
    DEFAULT_MAX_N2D3P9,
    DEFAULT_MAX_PRIME_LIMIT,
    DEFAULT_UPPER_BOUND,
    DEFAULT_FACTORING_MODE,
    DEFAULT_ABBREVIATED,
    DEFAULT_ASCII,
    OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE,
} from "@sagittal/system"
import { FindCommasOptions } from "./types"

const DEFAULT_FIND_COMMAS_OPTIONS: FindCommasOptions = {
    max23FreeSopfr: DEFAULT_MAX_2_3_FREE_SOPFR,
    max23FreeCopfr: DEFAULT_MAX_2_3_FREE_COPFR,
    maxPrimeLimit: DEFAULT_MAX_PRIME_LIMIT,
    maxN2D3P9: DEFAULT_MAX_N2D3P9,
    zone: { extrema: [DEFAULT_LOWER_BOUND, DEFAULT_UPPER_BOUND], exclusive: DEFAULT_EXCLUSIVE },
    maxAas: DEFAULT_MAX_AAS,
    maxAte: DEFAULT_MAX_ATE,
    directedWord: OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE.directedWord!,
    directedNumbers: OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE.directedNumbers!,
    factoringMode: DEFAULT_FACTORING_MODE,
    abbreviated: DEFAULT_ABBREVIATED,
    ascii: DEFAULT_ASCII,
}

const TWO_3_FREE_VECTOR_BASE = [0, 0] as Vector<Rational & Rough<5>>

export { DEFAULT_FIND_COMMAS_OPTIONS, TWO_3_FREE_VECTOR_BASE }
