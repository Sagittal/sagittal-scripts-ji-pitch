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
import { JiPitchAnalysis } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../globals"
import { JI_PITCH_FIELD_TITLES } from "../fieldTitles"
import { computeJiPitchHeaderRows } from "../headerRows"
import { computeOrderedTableAndAlignment } from "../orderedFields"
import { computeJiPitchRow } from "../row"
import {
    computeMaxVectorLength,
    computeSplitVectorAndQuotientTableAlignment,
} from "../splitVectorAndQuotient"
import { JI_PITCH_TABLE_TITLE } from "../tableTitles"

const computeJiPitchOutput = (jiPitchAnalysis: JiPitchAnalysis): Io => {
    const maxVectorLength = computeMaxVectorLength([jiPitchAnalysis])
    const jiPitchHeaderRows = computeJiPitchHeaderRows(maxVectorLength)
    const headerRowCount = count(jiPitchHeaderRows)
    let tableAlignment = computeSplitVectorAndQuotientTableAlignment(jiPitchHeaderRows)

    let jiPitchTable: Table<JiPitchAnalysis> = [
        ...jiPitchHeaderRows,
        computeJiPitchRow(jiPitchAnalysis, maxVectorLength),
    ]

    if (!isUndefined(jiPitchScriptGroupSettings.orderedFields)) {
        const { table: orderedJiPitchTable, tableAlignment: orderedTableAlignment } =
            computeOrderedTableAndAlignment(
                { table: jiPitchTable, tableAlignment },
                { maxVectorLength, fieldTitles: JI_PITCH_FIELD_TITLES },
            )
        jiPitchTable = orderedJiPitchTable
        tableAlignment = orderedTableAlignment
    }

    if (isEmpty(computeExampleElement(jiPitchTable))) return BLANK

    return sumTexts(
        JI_PITCH_TABLE_TITLE,
        formatTableFromScript(jiPitchTable, { headerRowCount, tableAlignment }),
    )
}

export { computeJiPitchOutput }
