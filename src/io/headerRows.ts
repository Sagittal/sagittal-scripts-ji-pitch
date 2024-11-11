import { Count, Exponent, Max, Prime, Row, splitFieldTitlesIntoRowsBySpaces } from "@sagittal/general"
import { CommaAnalysis, JiPitchAnalysis, Two3FreeClassAnalysis } from "@sagittal/system"
import { excludeFields } from "./excludeFields"
import {
    COMMA_FIELD_TITLES,
    JI_PITCH_FIELD_TITLES,
    JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES,
    TWO_3_FREE_CLASS_FIELD_TITLES,
} from "./fieldTitles"
import { formatPrimeHeaders, splitVectorAndQuotientFieldTitles } from "./splitVectorAndQuotient"

const computeJiPitchHeaderRows = (
    maxVectorLength: Max<Count<Exponent<Prime>>>,
): Row<{ of: JiPitchAnalysis; header: true }>[] =>
    formatPrimeHeaders(
        splitFieldTitlesIntoRowsBySpaces(
            splitVectorAndQuotientFieldTitles(excludeFields(JI_PITCH_FIELD_TITLES), {
                maxVectorLength,
            }),
        ),
    )

const compute23FreeClassHeaderRows = (): Row<{ of: Two3FreeClassAnalysis; header: true }>[] =>
    splitFieldTitlesIntoRowsBySpaces(
        splitVectorAndQuotientFieldTitles(excludeFields(TWO_3_FREE_CLASS_FIELD_TITLES), {
            recognizeNameTitleAsBeingFor23FreeClass: true,
        }),
    )

const computeNotatingCommasHeaderRows = (
    maxVectorLength: Max<Count<Exponent<Prime>>>,
): Row<{ of: CommaAnalysis; header: true }>[] =>
    formatPrimeHeaders(
        splitFieldTitlesIntoRowsBySpaces(
            splitVectorAndQuotientFieldTitles(excludeFields(COMMA_FIELD_TITLES), {
                maxVectorLength,
            }),
        ),
    )

const computeJiPitchesOrFindCommasHeaderRows = (
    maxVectorLength: Max<Count<Exponent<Prime>>>,
): Row<{ of: CommaAnalysis; header: true }>[] =>
    formatPrimeHeaders(
        splitFieldTitlesIntoRowsBySpaces(
            splitVectorAndQuotientFieldTitles(excludeFields(JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES), {
                maxVectorLength,
            }),
        ),
    )

export {
    computeJiPitchHeaderRows,
    compute23FreeClassHeaderRows,
    computeNotatingCommasHeaderRows,
    computeJiPitchesOrFindCommasHeaderRows,
}
