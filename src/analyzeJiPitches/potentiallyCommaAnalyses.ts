import {Filename, Io, isEmpty, readLines, sort, Spev} from "@sagittal/general"
import {analyzePotentiallyComma, PotentiallyCommaAnalysis} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../globals"
import {parsePitch} from "../io"

const computePotentiallyCommaAnalyses = (): PotentiallyCommaAnalysis[] => {
    const jiPitchIos = readLines("src/input/jiPitches.txt" as Filename) as Io[]
    if (isEmpty(jiPitchIos)) throw new Error("No JI pitches found in src/input/jiPitches.txt to analyze.")
    const jiPitches: Array<Spev<{rational: true}>> = jiPitchIos.map((jiPitchIo: Io): Spev<{rational: true}> => {
        return parsePitch(jiPitchIo) as Spev<{rational: true}>
    })
    const potentiallyCommaAnalyses: PotentiallyCommaAnalysis[] =
        jiPitches.map((jiPitch: Spev<{rational: true}>): PotentiallyCommaAnalysis => {
            return analyzePotentiallyComma(jiPitch)
        })
    if (jiPitchScriptGroupSettings.sortBy) {
        sort(potentiallyCommaAnalyses, {by: jiPitchScriptGroupSettings.sortBy})
    }

    return potentiallyCommaAnalyses
}

export {
    computePotentiallyCommaAnalyses,
}
