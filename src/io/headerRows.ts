import {Count, Exponent, Max, Prime, Row, splitFieldTitlesIntoRowsBySpaces} from "@sagittal/general"
import {CommaAnalysis, JiPitchAnalysis, Two3FreeClassAnalysis} from "@sagittal/system"
import {excludeFields} from "./excludeFields"
import {
    COMMA_FIELD_TITLES,
    JI_PITCH_FIELD_TITLES,
    JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES,
    TWO_3_FREE_CLASS_FIELD_TITLES,
} from "./fieldTitles"
import {formatPrimeHeaders, splitPevAndQuotientFieldTitles} from "./splitPevAndQuotient"

const computeJiPitchHeaderRows = (
    maxPevLength: Max<Count<Exponent<Prime>>>,
): Array<Row<{of: JiPitchAnalysis, header: true}>> =>
    formatPrimeHeaders(
        splitFieldTitlesIntoRowsBySpaces(
            splitPevAndQuotientFieldTitles(
                excludeFields(JI_PITCH_FIELD_TITLES),
                {maxPevLength},
            ),
        ),
    )

const compute23FreeClassHeaderRows = (): Array<Row<{of: Two3FreeClassAnalysis, header: true}>> =>
    splitFieldTitlesIntoRowsBySpaces(
        splitPevAndQuotientFieldTitles(
            excludeFields(TWO_3_FREE_CLASS_FIELD_TITLES),
            {recognizeNameTitleAsBeingFor23FreeClass: true},
        ),
    )

const computeNotatingCommasHeaderRows =
    (maxPevLength: Max<Count<Exponent<Prime>>>): Array<Row<{of: CommaAnalysis, header: true}>> =>
        formatPrimeHeaders(
            splitFieldTitlesIntoRowsBySpaces(
                splitPevAndQuotientFieldTitles(
                    excludeFields(COMMA_FIELD_TITLES),
                    {maxPevLength},
                ),
            ),
        )

const computeJiPitchesOrFindCommasHeaderRows =
    (maxPevLength: Max<Count<Exponent<Prime>>>): Array<Row<{of: CommaAnalysis, header: true}>> =>
        formatPrimeHeaders(
            splitFieldTitlesIntoRowsBySpaces(
                splitPevAndQuotientFieldTitles(
                    excludeFields(JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES),
                    {maxPevLength},
                ),
            ),
        )

export {
    computeJiPitchHeaderRows,
    compute23FreeClassHeaderRows,
    computeNotatingCommasHeaderRows,
    computeJiPitchesOrFindCommasHeaderRows,
}
