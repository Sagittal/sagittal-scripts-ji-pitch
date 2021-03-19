import {Alignment, Cell, finalElement, isEmpty, Maybe, Row, TableAlignment} from "@sagittal/general"
import {
    INVISIBLE_PEV_CLOSING_ANGLE_BRACKET_COLUMN_TITLE,
    INVISIBLE_PEV_OPENING_SQUARE_BRACKET_COLUMN_TITLE,
} from "./constants"

const computeSplitPevAndQuotientTableAlignment = <T>(
    headerRows: Array<Row<{of: T, header: true}>>,
): TableAlignment => {
    if (isEmpty(headerRows)) return undefined

    const finalHeaderRow = finalElement(headerRows)

    let insideQuotientOrPev = false

    return finalHeaderRow.map((headerCell: Cell<{of: T, header: true}>): Maybe<Alignment> => {
        if (headerCell === INVISIBLE_PEV_OPENING_SQUARE_BRACKET_COLUMN_TITLE || headerCell === "n") {
            insideQuotientOrPev = true
            return Alignment.RIGHT
        } else if (headerCell === "d" || headerCell === INVISIBLE_PEV_CLOSING_ANGLE_BRACKET_COLUMN_TITLE) {
            insideQuotientOrPev = false
            return Alignment.LEFT
        } else if (insideQuotientOrPev) {
            return Alignment.CENTER
        } else {
            return undefined
        }
    })
}

export {
    computeSplitPevAndQuotientTableAlignment,
}
