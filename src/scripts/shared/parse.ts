import {
    BLANK,
    COMMA,
    computeKeyPath,
    computePrimeCount,
    Exclusive,
    Io,
    isString,
    KeyPath,
    parseBoolean,
    SortBy,
    split,
} from "@sagittal/general"
import {JI_PITCH_SCRIPTS_FIELDS} from "../../constants"
import {JiPitchesOrFindCommasField, JiPitchScriptGroupField} from "../../types"

const parseFields = (fieldsIo: Io): JiPitchScriptGroupField[] => {
    const fields = split(fieldsIo, COMMA)

    fields.forEach((field: Io): void => {
        if (
            !JI_PITCH_SCRIPTS_FIELDS.includes(field as JiPitchesOrFindCommasField)
            && !field.match(/monzo\d+/)
            && !field.match(/quotient[ND]/)
            && !field.match(/two3FreeClassName[ND]/)
        ) {
            throw new Error(`Tried to parse field ${field} but it is not a member of the list of possible fields: {${JI_PITCH_SCRIPTS_FIELDS}}, as well as specific terms of some fields e.g. monzo2, quotientN`)
        }
    })

    return fields as JiPitchScriptGroupField[]
}

const parseExclusive = (exclusiveIo: boolean | Io): Exclusive => {
    if (isString(exclusiveIo)) {
        return exclusiveIo.split(COMMA).map(parseBoolean) as Exclusive
    }

    return exclusiveIo
}

const FIELD_TO_KEY_PATH_MAP: Record<JiPitchScriptGroupField, KeyPath> = {
    [JiPitchesOrFindCommasField.QUOTIENT]: computeKeyPath("quotient"),
    [JiPitchesOrFindCommasField.MONZO]: computeKeyPath("monzo"),
    [JiPitchesOrFindCommasField.CENTS]: computeKeyPath("cents"),
    [JiPitchesOrFindCommasField.APOTOME_SLOPE]: computeKeyPath("apotomeSlope"),
    [JiPitchesOrFindCommasField.AAS]: computeKeyPath("aas"),
    [JiPitchesOrFindCommasField.ATE]: computeKeyPath("ate"),
    [JiPitchesOrFindCommasField.TWO_3_FREE_CLASS_NAME]: computeKeyPath("two3FreeClassAnalysis", "name"),
    [JiPitchesOrFindCommasField.TWO_3_FREE_COPFR]: computeKeyPath("two3FreeClassAnalysis", "two3FreeCopfr"),
    [JiPitchesOrFindCommasField.TWO_3_FREE_SOPFR]: computeKeyPath("two3FreeClassAnalysis", "two3FreeSopfr"),
    [JiPitchesOrFindCommasField.TWO_3_FREE_PRIME_LIMIT]: computeKeyPath("two3FreeClassAnalysis", "two3FreePrimeLimit"),
    [JiPitchesOrFindCommasField.N2D3P9]: computeKeyPath("two3FreeClassAnalysis", "n2d3p9"),
    [JiPitchesOrFindCommasField.COMMA_CLASS]: computeKeyPath("commaClass"),
    [JiPitchesOrFindCommasField.NAME]: computeKeyPath("name"),
    [JiPitchesOrFindCommasField.SIZE_CATEGORY]: computeKeyPath("sizeCategory"),
}

const parseSortBy = (sortByIo: Io): SortBy => {
    const fields = parseFields(sortByIo)

    return fields.map((field: JiPitchScriptGroupField): KeyPath => {
        if (field.match(/monzo\d+/)) {
            return computeKeyPath("monzo", computePrimeCount(parseInt(field.replace("monzo", BLANK))) - 1)
        } else if (field.match(/quotient[ND]/)) {
            return computeKeyPath("quotient", field[field.length - 1] === "N" ? 0 : 1)
        } else if (field.match(/two3FreeClassName[ND]/)) {
            return computeKeyPath("two3FreeClassAnalysis", "name", field[field.length - 1] === "N" ? 0 : 1)
        }

        return FIELD_TO_KEY_PATH_MAP[field]
    })
}

export {
    parseFields,
    parseExclusive,
    parseSortBy,
}
