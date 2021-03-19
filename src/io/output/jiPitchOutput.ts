import {
    BLANK,
    computeExampleElement,
    count,
    formatTableFromScript,
    Io,
    isEmpty,
    isUndefined,
    sumTexts,
    Table,
} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../globals"
import {JI_PITCH_FIELD_TITLES} from "../fieldTitles"
import {computeJiPitchHeaderRows} from "../headerRows"
import {computeOrderedTableAndAlignment} from "../orderedFields"
import {computeJiPitchRow} from "../row"
import {computeMaxPevLength, computeSplitPevAndQuotientTableAlignment} from "../splitPevAndQuotient"
import {JI_PITCH_TABLE_TITLE} from "../tableTitles"

const computeJiPitchOutput = (
    jiPitchAnalysis: JiPitchAnalysis,
): Io => {
    const maxPevLength = computeMaxPevLength([jiPitchAnalysis])
    const jiPitchHeaderRows = computeJiPitchHeaderRows(maxPevLength)
    const headerRowCount = count(jiPitchHeaderRows)
    let tableAlignment = computeSplitPevAndQuotientTableAlignment(jiPitchHeaderRows)

    let jiPitchTable: Table<JiPitchAnalysis> = [
        ...jiPitchHeaderRows,
        computeJiPitchRow(jiPitchAnalysis, maxPevLength),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const {
            table: orderedJiPitchTable,
            tableAlignment: orderedTableAlignment,
        } = computeOrderedTableAndAlignment(
            {table: jiPitchTable, tableAlignment},
            {maxPevLength, fieldTitles: JI_PITCH_FIELD_TITLES},
        )
        jiPitchTable = orderedJiPitchTable
        tableAlignment = orderedTableAlignment
    }

    if (isEmpty(computeExampleElement(jiPitchTable))) return BLANK

    return sumTexts(
        JI_PITCH_TABLE_TITLE,
        formatTableFromScript(jiPitchTable, {headerRowCount, tableAlignment}),
    )
}

export {
    computeJiPitchOutput,
}
