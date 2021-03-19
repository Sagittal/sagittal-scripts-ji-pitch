import {
    BLANK,
    computeExampleElement,
    count,
    formatTableFromScript,
    Io,
    isEmpty,
    isUndefined,
    Maybe,
    Row,
    sumTexts,
} from "@sagittal/general"
import {CommaAnalysis, CommaClassId} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../globals"
import {COMMA_FIELD_TITLES} from "../fieldTitles"
import {computeNotatingCommasHeaderRows} from "../headerRows"
import {computeOrderedTableAndAlignment} from "../orderedFields"
import {computeNotatingCommasRow} from "../row"
import {computeMaxPevLength, computeSplitPevAndQuotientTableAlignment} from "../splitPevAndQuotient"
import {NOTATING_COMMAS_TABLE_TITLE} from "../tableTitles"
import {NO_RESULTS} from "./constants"

const computeNotatingCommasOutput = (
    notatingCommaAnalyses: CommaAnalysis[],
    maybeCommaClassIds: Array<Maybe<CommaClassId>>,
): Io => {
    if (isEmpty(notatingCommaAnalyses)) return sumTexts(NOTATING_COMMAS_TABLE_TITLE, NO_RESULTS)

    const maxPevLength = computeMaxPevLength(notatingCommaAnalyses)
    const notatingCommasHeaderRows = computeNotatingCommasHeaderRows(maxPevLength)
    const headerRowCount = count(notatingCommasHeaderRows)
    let tableAlignment = computeSplitPevAndQuotientTableAlignment(notatingCommasHeaderRows)

    let notatingCommasTable = [
        ...notatingCommasHeaderRows,
        ...notatingCommaAnalyses
            .map((notatingCommaAnalysis: CommaAnalysis, index: number): Row<{of: CommaAnalysis}> => {
                return computeNotatingCommasRow(notatingCommaAnalysis, maybeCommaClassIds[index], maxPevLength)
            }),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const {
            table: orderedNotatingCommasTable,
            tableAlignment: orderedTableAlignment,
        } = computeOrderedTableAndAlignment(
            {table: notatingCommasTable, tableAlignment},
            {maxPevLength, fieldTitles: COMMA_FIELD_TITLES},
        )
        notatingCommasTable = orderedNotatingCommasTable
        tableAlignment = orderedTableAlignment
    }

    if (isEmpty(computeExampleElement(notatingCommasTable))) return BLANK

    return sumTexts(
        NOTATING_COMMAS_TABLE_TITLE,
        formatTableFromScript(notatingCommasTable, {headerRowCount, tableAlignment}),
    )
}

export {
    computeNotatingCommasOutput,
}
