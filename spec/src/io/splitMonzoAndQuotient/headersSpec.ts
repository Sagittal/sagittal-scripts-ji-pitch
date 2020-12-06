import {Row} from "@sagittal/general"
import {formatPrimeHeaders} from "../../../../src/io/splitMonzoAndQuotient"

describe("formatPrimeHeaders", (): void => {
    it("aligns the headers for the prime headers of monzos", (): void => {
        const headerRows = [
            ["comma", "quotient", "", "", "monzo", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "2", "3", "⟩", "slope"],
        ] as Array<Row<{header: true}>>

        const actual = formatPrimeHeaders(headerRows)

        const expected = [
            ["comma", "quotient", "", "", "monzo", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "  2    ", "  3    ", "⟩", "slope"],
        ] as Array<Row<{header: true}>>
        expect(actual).toEqual(expected)
    })
})
