import {Comma, Scamon, sort} from "@sagittal/general"
import {analyzeComma, CommaAnalysis, findNotatingCommas} from "@sagittal/system"
import {FindCommasOptions} from "../findCommas"
import {jiPitchScriptGroupSettings} from "../globals"

// TODO: `npm run analyze-ji-pitch 8192/8191` doesn't return itself in the notating comma analyses list
//  Right, actually, this table should never be empty, because it should always at least contain the JI pitch itself.

const findNotatingCommaAnalyses = (
    jiPitch: Scamon<{rational: true}>,
    findNotatingCommasOptions: Partial<FindCommasOptions> = {},
): CommaAnalysis[] => {
    const notatingCommas: Comma[] = findNotatingCommas(
        jiPitch,
        {...jiPitchScriptGroupSettings, ...findNotatingCommasOptions},
    )

    const notatingCommaAnalyses = notatingCommas.map((comma: Comma): CommaAnalysis => {
        return analyzeComma(comma, jiPitchScriptGroupSettings.commaNameOptions)
    })

    if (jiPitchScriptGroupSettings.sortBy) {
        sort(notatingCommaAnalyses, {by: jiPitchScriptGroupSettings.sortBy})
    }

    return notatingCommaAnalyses
}

export {
    findNotatingCommaAnalyses,
}
