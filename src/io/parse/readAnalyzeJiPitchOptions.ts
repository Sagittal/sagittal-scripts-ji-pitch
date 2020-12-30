import {
    Comma,
    Decimal,
    Io,
    Monzo,
    parseInteger,
    parseMonzo,
    parseQuotient,
    program,
    Quotient,
} from "@sagittal/general"
import {
    Accidental,
    Ascii,
    computeCommaFromCommaName,
    parseAccidental,
    parseCommaName,
} from "@sagittal/system"
import {JiPitchScriptFlag} from "./types"

const readAnalyzeJiPitchOptions = (): void => {
    program
        .option(
            `-${JiPitchScriptFlag.MONZO}, --monzo <monzo>`,
            "monzo",
            (monzoText: string): Monzo => parseMonzo(monzoText as Io),
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
            (accidentalText: string): Accidental => parseAccidental(accidentalText as Ascii),
        )
        .option(
            `-${JiPitchScriptFlag.INTEGER}, --integer <integer>`,
            "integer",
            (integerText: string): Decimal<{integer: true}> => parseInteger(integerText as Io),
        )
}

export {
    readAnalyzeJiPitchOptions,
}
