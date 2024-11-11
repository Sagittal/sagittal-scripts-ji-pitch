import { count, formatTableFromScript, Io, isUndefined, Maybe, Row, Table } from "@sagittal/general"
import { CommaClassId, JiPitchAnalysis, PotentiallyCommaAnalysis } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../globals"
import { JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES } from "../fieldTitles"
import { computeJiPitchesOrFindCommasHeaderRows } from "../headerRows"
import { computeOrderedTableAndAlignment } from "../orderedFields"
import { computeJiPitchesRow } from "../row"
import {
    computeMaxVectorLength,
    computeSplitVectorAndQuotientTableAlignment,
} from "../splitVectorAndQuotient"

const computeJiPitchesOutput = (
    potentiallyCommaAnalyses: PotentiallyCommaAnalysis[],
    maybeCommaClassIds: Maybe<CommaClassId>[],
): Io => {
    const maxVectorLength = computeMaxVectorLength(potentiallyCommaAnalyses)
    const jiPitchesHeaderRows = computeJiPitchesOrFindCommasHeaderRows(maxVectorLength)
    const headerRowCount = count(jiPitchesHeaderRows)
    let tableAlignment = computeSplitVectorAndQuotientTableAlignment(jiPitchesHeaderRows)

    let jiPitchesTable: Table<JiPitchAnalysis> = [
        ...jiPitchesHeaderRows,
        ...potentiallyCommaAnalyses.map(
            (
                potentiallyCommaAnalysis: PotentiallyCommaAnalysis,
                index: number,
            ): Row<{ of: PotentiallyCommaAnalysis }> => {
                return computeJiPitchesRow(
                    potentiallyCommaAnalysis,
                    maybeCommaClassIds[index],
                    maxVectorLength,
                )
            },
        ),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const { table: orderedJiPitchesTable, tableAlignment: orderedTableAlignment } =
            computeOrderedTableAndAlignment(
                { table: jiPitchesTable, tableAlignment },
                { maxVectorLength, fieldTitles: JI_PITCHES_OR_FIND_COMMAS_FIELD_TITLES },
            )
        jiPitchesTable = orderedJiPitchesTable
        tableAlignment = orderedTableAlignment
    }

    return formatTableFromScript(jiPitchesTable, { headerRowCount, tableAlignment })
}

export { computeJiPitchesOutput }
