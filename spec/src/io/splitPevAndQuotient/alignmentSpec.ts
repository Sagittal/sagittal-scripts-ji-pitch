import {Alignment, Row} from "@sagittal/general"
import {computeSplitPevAndQuotientTableAlignment} from "../../../../src/io/splitPevAndQuotient"
import {
    INVISIBLE_PEV_CLOSING_ANGLE_BRACKET_COLUMN_TITLE,
    INVISIBLE_PEV_OPENING_SQUARE_BRACKET_COLUMN_TITLE,
} from "../../../../src/io/splitPevAndQuotient/constants"

describe("computeSplitPevAndQuotientTableAlignment", (): void => {
    it("aligns quotients to center on the vinculum, and pevs so that the square bracket is closer to the rest of the materials", (): void => {
        const headerRows = [
            ["comma", "quotient", "", "", "pev", "", "", "", "apotome"],
            ["name", "n", "/", "d", INVISIBLE_PEV_OPENING_SQUARE_BRACKET_COLUMN_TITLE, "2", "3", INVISIBLE_PEV_CLOSING_ANGLE_BRACKET_COLUMN_TITLE, "slope"],
        ] as Array<Row<{header: true}>>

        const actual = computeSplitPevAndQuotientTableAlignment(headerRows)

        const expected = [
            undefined,          // Comma name
            Alignment.RIGHT,    // Quotient numerator
            Alignment.CENTER,   // Quotient vinculum
            Alignment.LEFT,     // Quotient denominator
            Alignment.RIGHT,    // Pev [
            Alignment.CENTER,   // Pev 2
            Alignment.CENTER,   // Pev 3
            Alignment.LEFT,     // Pev ⟩
            undefined,          // Apotome slope
        ]
        expect(actual).toEqual(expected)
    })

    it("also works for 2,3-free class tables", (): void => {
        const headerRows = [
            ["2,3-free", "2,3-free", "", "", "", "2,3-free"],
            ["prime", "class", "", "", "", "class"],
            ["limit", "n", "/", "d", "₂,₃", "CoPFR"],
        ] as Array<Row<{header: true}>>

        const actual = computeSplitPevAndQuotientTableAlignment(headerRows)

        const expected = [
            undefined,          // 2,3-free prime limit
            Alignment.RIGHT,    // 2,3-free class numinator
            Alignment.CENTER,   // 2,3-free class vinculum
            Alignment.LEFT,     // 2,3-free class diminuator
            undefined,          // 2,3-free class sign
            undefined,          // 2,3-free class CoPFR
        ]
        expect(actual).toEqual(expected)
    })

    it("doesn't crash when there are no header rows", (): void => {
        const headerRows = [] as Array<Row<{header: true}>>

        const actual = computeSplitPevAndQuotientTableAlignment(headerRows)

        expect(actual).toBeUndefined()
    })
})
