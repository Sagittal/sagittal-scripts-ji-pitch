import {
    Comma,
    Decimal,
    Integer,
    Io,
    parseInteger,
    parseVector,
    parseQuotient,
    Vector,
    program,
    Quotient,
} from "@sagittal/general"
import {
    Accidental,
    computeCommaFromCommaName,
    parseAccidental,
    parseCommaName,
    Sagitype,
} from "@sagittal/system"
import { JiPitchScriptFlag } from "./types"

const readAnalyzeJiPitchOptions = (): void => {
    program
        .option(
            `-${JiPitchScriptFlag.VECTOR}, --vector <vector>`,
            "vector",
            (vectorText: string): Vector => parseVector(vectorText as Io),
        )
        .option(
            `-${JiPitchScriptFlag.QUOTIENT}, --quotient <quotient>`,
            "quotient",
            (quotientText: string): Quotient => parseQuotient(quotientText as Io),
        )
        .option(
            `-${JiPitchScriptFlag.COMMA_NAME}, --comma-name <commaName>`,
            "comma name",
            (commaNameText: string): Comma => {
                return computeCommaFromCommaName(parseCommaName(commaNameText as Io))
            },
        )
        .option(
            `-${JiPitchScriptFlag.ACCIDENTAL}, --accidental <symbol>`,
            "accidental",
            (accidentalText: string): Accidental => parseAccidental(accidentalText as Sagitype),
        )
        .option(
            `-${JiPitchScriptFlag.INTEGER}, --integer <integer>`,
            "integer",
            (integerText: string): Decimal<Integer> => parseInteger(integerText as Io),
        )
}

export { readAnalyzeJiPitchOptions }
