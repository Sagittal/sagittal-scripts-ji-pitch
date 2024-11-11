import { Row } from "@sagittal/general"
import { formatPrimeHeaders } from "../../../../src/io/splitVectorAndQuotient"

describe("formatPrimeHeaders", (): void => {
    it("aligns the headers for the prime headers of vectors", (): void => {
        const headerRows = [
            ["comma", "quotient", "", "", "vector", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "2", "3", "⟩", "slope"],
        ] as Row<{ header: true }>[]

        const actual = formatPrimeHeaders(headerRows)

        const expected = [
            ["comma", "quotient", "", "", "vector", "", "", "", "apotome"],
            ["name", "n", "/", "d", "[", "  2    ", "  3    ", "⟩", "slope"],
        ] as Row<{ header: true }>[]
        expect(actual).toEqual(expected)
    })
})
