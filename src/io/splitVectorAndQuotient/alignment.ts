import { Alignment, Cell, finalElement, isEmpty, Maybe, Row, TableAlignment } from "@sagittal/general"
import {
    INVISIBLE_VECTOR_CLOSING_ANGLE_BRACKET_COLUMN_TITLE,
    INVISIBLE_VECTOR_OPENING_SQUARE_BRACKET_COLUMN_TITLE,
} from "./constants"

const computeSplitVectorAndQuotientTableAlignment = <T>(
    headerRows: Row<{ of: T; header: true }>[],
): TableAlignment => {
    if (isEmpty(headerRows)) return undefined

    const finalHeaderRow = finalElement(headerRows)

    let insideQuotientOrVector = false

    return finalHeaderRow.map((headerCell: Cell<{ of: T; header: true }>): Maybe<Alignment> => {
        if (headerCell === INVISIBLE_VECTOR_OPENING_SQUARE_BRACKET_COLUMN_TITLE || headerCell === "n") {
            insideQuotientOrVector = true
            return Alignment.RIGHT
        } else if (headerCell === "d" || headerCell === INVISIBLE_VECTOR_CLOSING_ANGLE_BRACKET_COLUMN_TITLE) {
            insideQuotientOrVector = false
            return Alignment.LEFT
        } else if (insideQuotientOrVector) {
            return Alignment.CENTER
        } else {
            return undefined
        }
    })
}

export { computeSplitVectorAndQuotientTableAlignment }
