import { Comma, sort, ScaledVector, Rational } from "@sagittal/general"
import {
    analyzeComma,
    CommaAnalysis,
    findNotatingCommas,
    OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE,
} from "@sagittal/system"
import { FindCommasOptions } from "../findCommas"
import { jiPitchScriptGroupSettings } from "../globals"

const findNotatingCommaAnalyses = (
    jiPitch: ScaledVector<Rational>,
    findNotatingCommasOptions: Partial<FindCommasOptions> = {},
): CommaAnalysis[] => {
    const notatingCommas: Comma[] = findNotatingCommas(jiPitch, {
        ...jiPitchScriptGroupSettings,
        ...findNotatingCommasOptions,
    })

    const notatingCommaAnalyses = notatingCommas.map((comma: Comma): CommaAnalysis => {
        return analyzeComma(comma, {
            ...jiPitchScriptGroupSettings.commaNameOptions,
            ...OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE,
        })
    })

    if (jiPitchScriptGroupSettings.sortBy) {
        sort(notatingCommaAnalyses, { by: jiPitchScriptGroupSettings.sortBy })
    }

    return notatingCommaAnalyses
}

export { findNotatingCommaAnalyses }
