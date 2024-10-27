import { Comma, sort, ScaledVector } from "@sagittal/general"
import { analyzeComma, CommaAnalysis, findNotatingCommas } from "@sagittal/system"
import { FindCommasOptions } from "../findCommas"
import { jiPitchScriptGroupSettings } from "../globals"

const findNotatingCommaAnalyses = (
    jiPitch: ScaledVector<{ rational: true }>,
    findNotatingCommasOptions: Partial<FindCommasOptions> = {},
): CommaAnalysis[] => {
    const notatingCommas: Comma[] = findNotatingCommas(jiPitch, {
        ...jiPitchScriptGroupSettings,
        ...findNotatingCommasOptions,
    })

    const notatingCommaAnalyses = notatingCommas.map((comma: Comma): CommaAnalysis => {
        return analyzeComma(comma, jiPitchScriptGroupSettings.commaNameOptions)
    })

    if (jiPitchScriptGroupSettings.sortBy) {
        sort(notatingCommaAnalyses, { by: jiPitchScriptGroupSettings.sortBy })
    }

    return notatingCommaAnalyses
}

export { findNotatingCommaAnalyses }
