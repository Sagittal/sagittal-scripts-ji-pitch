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
import { CommaAnalysis, CommaClassId } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../globals"
import { COMMA_FIELD_TITLES } from "../fieldTitles"
import { computeNotatingCommasHeaderRows } from "../headerRows"
import { computeOrderedTableAndAlignment } from "../orderedFields"
import { computeNotatingCommasRow } from "../row"
import {
    computeMaxVectorLength,
    computeSplitVectorAndQuotientTableAlignment,
} from "../splitVectorAndQuotient"
import { NOTATING_COMMAS_TABLE_TITLE } from "../tableTitles"
import { NO_RESULTS } from "./constants"

const computeNotatingCommasOutput = (
    notatingCommaAnalyses: CommaAnalysis[],
    maybeCommaClassIds: Array<Maybe<CommaClassId>>,
): Io => {
    if (isEmpty(notatingCommaAnalyses)) return sumTexts(NOTATING_COMMAS_TABLE_TITLE, NO_RESULTS)

    const maxVectorLength = computeMaxVectorLength(notatingCommaAnalyses)
    const notatingCommasHeaderRows = computeNotatingCommasHeaderRows(maxVectorLength)
    const headerRowCount = count(notatingCommasHeaderRows)
    let tableAlignment = computeSplitVectorAndQuotientTableAlignment(notatingCommasHeaderRows)

    let notatingCommasTable = [
        ...notatingCommasHeaderRows,
        ...notatingCommaAnalyses.map(
            (notatingCommaAnalysis: CommaAnalysis, index: number): Row<{ of: CommaAnalysis }> => {
                return computeNotatingCommasRow(
                    notatingCommaAnalysis,
                    maybeCommaClassIds[index],
                    maxVectorLength,
                )
            },
        ),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const { table: orderedNotatingCommasTable, tableAlignment: orderedTableAlignment } =
            computeOrderedTableAndAlignment(
                { table: notatingCommasTable, tableAlignment },
                { maxVectorLength, fieldTitles: COMMA_FIELD_TITLES },
            )
        notatingCommasTable = orderedNotatingCommasTable
        tableAlignment = orderedTableAlignment
    }

    if (isEmpty(computeExampleElement(notatingCommasTable))) return BLANK

    return sumTexts(
        NOTATING_COMMAS_TABLE_TITLE,
        formatTableFromScript(notatingCommasTable, { headerRowCount, tableAlignment }),
    )
}

export { computeNotatingCommasOutput }
