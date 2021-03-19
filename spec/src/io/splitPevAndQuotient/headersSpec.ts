import {Row} from "@sagittal/general"
import {formatPrimeHeaders} from "../../../../src/io/splitPevAndQuotient"

describe("formatPrimeHeaders", (): void => {
    it("aligns the headers for the prime headers of pevs", (): void => {
        const headerRows = [
            ["comma", "quotient", "", "", "pev", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "2", "3", "⟩", "slope"],
        ] as Array<Row<{header: true}>>

        const actual = formatPrimeHeaders(headerRows)

        const expected = [
            ["comma", "quotient", "", "", "pev", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "  2    ", "  3    ", "⟩", "slope"],
        ] as Array<Row<{header: true}>>
        expect(actual).toEqual(expected)
    })
})
