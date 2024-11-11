import {
    count,
    formatTableFromScript,
    Io,
    isEmpty,
    isUndefined,
    Maybe,
    Row,
    sumTexts,
    Table,
} from "@sagittal/general"
import { CommaAnalysis, CommaClassId } from "@sagittal/system"
import { DEFAULT_FIND_COMMAS_OPTIONS, FindCommasOptions } from "../../findCommas"
import { jiPitchScriptGroupSettings } from "../../globals"
import { JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES } from "../fieldTitles"
import { computeJiPitchesOrFindCommasHeaderRows } from "../headerRows"
import { computeOrderedTableAndAlignment } from "../orderedFields"
import { computeFindCommasRow } from "../row"
import {
    computeMaxVectorLength,
    computeSplitVectorAndQuotientTableAlignment,
} from "../splitVectorAndQuotient"
import { computeFindCommasTableTitle } from "../tableTitles"
import { NO_RESULTS } from "./constants"

const computeFindCommasOutput = (
    commaAnalyses: CommaAnalysis[],
    maybeCommaClassIds: Maybe<CommaClassId>[],
    findCommasOptions: FindCommasOptions = DEFAULT_FIND_COMMAS_OPTIONS,
): Io => {
    const tableTitle = computeFindCommasTableTitle(findCommasOptions)

    if (isEmpty(commaAnalyses)) return sumTexts(tableTitle, NO_RESULTS)

    const maxVectorLength = computeMaxVectorLength(commaAnalyses)
    const findCommasHeaderRows = computeJiPitchesOrFindCommasHeaderRows(maxVectorLength)
    const headerRowCount = count(findCommasHeaderRows)
    let tableAlignment = computeSplitVectorAndQuotientTableAlignment(findCommasHeaderRows)

    let findCommasTable: Table<CommaAnalysis> = [
        ...findCommasHeaderRows,
        ...commaAnalyses.map((commaAnalysis: CommaAnalysis, index: number): Row<{ of: CommaAnalysis }> => {
            return computeFindCommasRow(commaAnalysis, maybeCommaClassIds[index], maxVectorLength)
        }),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const { table: orderedFindCommasTable, tableAlignment: orderedTableAlignment } =
            computeOrderedTableAndAlignment(
                { table: findCommasTable, tableAlignment },
                { maxVectorLength, fieldTitles: JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES },
            )
        findCommasTable = orderedFindCommasTable
        tableAlignment = orderedTableAlignment
    }

    return sumTexts(tableTitle, formatTableFromScript(findCommasTable, { headerRowCount, tableAlignment }))
}

export { computeFindCommasOutput }
