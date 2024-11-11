import { Alignment, Row } from "@sagittal/general"
import { computeSplitVectorAndQuotientTableAlignment } from "../../../../src/io/splitVectorAndQuotient"
import {
    INVISIBLE_VECTOR_CLOSING_ANGLE_BRACKET_COLUMN_TITLE,
    INVISIBLE_VECTOR_OPENING_SQUARE_BRACKET_COLUMN_TITLE,
} from "../../../../src/io/splitVectorAndQuotient/constants"

describe("computeSplitVectorAndQuotientTableAlignment", (): void => {
    it("aligns quotients to center on the vinculum, and vectors so that the square bracket is closer to the rest of the materials", (): void => {
        const headerRows = [
            ["comma", "quotient", "", "", "vector", "", "", "", "apotome"],
            [
                "name",
                "n",
                "/",
                "d",
                INVISIBLE_VECTOR_OPENING_SQUARE_BRACKET_COLUMN_TITLE,
                "2",
                "3",
                INVISIBLE_VECTOR_CLOSING_ANGLE_BRACKET_COLUMN_TITLE,
                "slope",
            ],
        ] as Row<{ header: true }>[]

        const actual = computeSplitVectorAndQuotientTableAlignment(headerRows)

        /* eslint-disable prettier/prettier */
        const expected = [
            undefined,          // Comma name
            Alignment.RIGHT,    // Quotient numerator
            Alignment.CENTER,   // Quotient vinculum
            Alignment.LEFT,     // Quotient denominator
            Alignment.RIGHT,    // Vector [
            Alignment.CENTER,   // Vector 2
            Alignment.CENTER,   // Vector 3
            Alignment.LEFT,     // Vector ⟩
            undefined,          // Apotome slope
        ]
        /* eslint-enable prettier/prettier */

        expect(actual).toEqual(expected)
    })

    it("also works for 2,3-free class tables", (): void => {
        const headerRows = [
            ["2,3-free", "2,3-free", "", "", "", "2,3-free"],
            ["prime", "class", "", "", "", "class"],
            ["limit", "n", "/", "d", "₂,₃", "CoPFR"],
        ] as Row<{ header: true }>[]

        const actual = computeSplitVectorAndQuotientTableAlignment(headerRows)

        /* eslint-disable prettier/prettier */
        const expected = [
            undefined,          // 2,3-free prime limit
            Alignment.RIGHT,    // 2,3-free class numinator
            Alignment.CENTER,   // 2,3-free class vinculum
            Alignment.LEFT,     // 2,3-free class diminuator
            undefined,          // 2,3-free class sign
            undefined,          // 2,3-free class CoPFR
        ]
        /* eslint-enable prettier/prettier */

        expect(actual).toEqual(expected)
    })

    it("doesn't crash when there are no header rows", (): void => {
        const headerRows = [] as Row<{ header: true }>[]

        const actual = computeSplitVectorAndQuotientTableAlignment(headerRows)

        expect(actual).toBeUndefined()
    })
})
