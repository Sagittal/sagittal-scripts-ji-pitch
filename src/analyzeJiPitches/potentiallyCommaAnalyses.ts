import { Filename, Io, isEmpty, readLines, sort, ScaledVector, Rational } from "@sagittal/general"
import {
    analyzePotentiallyComma,
    OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE,
    PotentiallyCommaAnalysis,
} from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../globals"
import { parsePitch } from "../io"

const computePotentiallyCommaAnalyses = (): PotentiallyCommaAnalysis[] => {
    const jiPitchIos = readLines("src/input/jiPitches.txt" as Filename)
    if (isEmpty(jiPitchIos)) throw new Error("No JI pitches found in src/input/jiPitches.txt to analyze.")
    const jiPitches: ScaledVector<Rational>[] = jiPitchIos.map((jiPitchIo: Io): ScaledVector<Rational> => {
        return parsePitch(jiPitchIo)
    })
    const potentiallyCommaAnalyses: PotentiallyCommaAnalysis[] = jiPitches.map(
        (jiPitch: ScaledVector<Rational>): PotentiallyCommaAnalysis => {
            return analyzePotentiallyComma(jiPitch, OUTDATED_COMMA_NAME_OPTIONS_PREFERENCE)
        },
    )
    if (jiPitchScriptGroupSettings.sortBy) {
        sort(potentiallyCommaAnalyses, { by: jiPitchScriptGroupSettings.sortBy })
    }

    return potentiallyCommaAnalyses
}

export { computePotentiallyCommaAnalyses }
