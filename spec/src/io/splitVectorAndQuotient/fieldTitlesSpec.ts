import { Count, Exponent, Io, ioSettings, Max, Prime, TableFormat } from "@sagittal/general"
import { splitVectorAndQuotientFieldTitles } from "../../../../src/io/splitVectorAndQuotient"

describe("splitVectorAndQuotientFieldTitles", (): void => {
    const fieldTitles = ["quotient", "vector", "cents", "apotome slope"] as Io[]
    const maxVectorLength = 3 as Max<Count<Exponent<Prime>>>

    it("expands the quotient and vector headers to match the data", (): void => {
        const actual = splitVectorAndQuotientFieldTitles(fieldTitles, { maxVectorLength })

        const expected = [
            "quotient n",
            "/",
            "d",
            "vector  ",
            "2",
            "3",
            "5",
            " ",
            "cents",
            "apotome slope",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    it("does not split up quotients on the forum (because there they get LaTeX formatted), and includes instructions to merge cells for the vector title", (): void => {
        ioSettings.tableFormat = TableFormat.FORUM
        const actual = splitVectorAndQuotientFieldTitles(fieldTitles, { maxVectorLength })

        const expected = [
            "quotient",
            "vector  ",
            "⤝ 2",
            "⤝ 3",
            "⤝ 5",
            "⤝  ",
            "cents",
            "apotome slope",
        ] as Io[]
        expect(actual).toEqual(expected)
    })

    describe("also works for 2,3-free class info", (): void => {
        const fieldTitles = ["2,3-free prime limit", "2,3-free class name", "2,3-free class CoPFR"] as Io[]

        it("expands the 2,3-free class name headers to match the split up data", (): void => {
            const actual = splitVectorAndQuotientFieldTitles(fieldTitles, { maxVectorLength })

            const expected = [
                "2,3-free prime limit",
                "2,3-free class n",
                "/",
                "d",
                "₂,₃",
                "2,3-free class CoPFR",
            ] as Io[]
            expect(actual).toEqual(expected)
        })

        it("does not split up 2,3-free classes on the forum (because there they get LaTeX formatted)", (): void => {
            ioSettings.tableFormat = TableFormat.FORUM
            const actual = splitVectorAndQuotientFieldTitles(fieldTitles, { maxVectorLength })

            expect(actual).toEqual(fieldTitles)
        })

        it("uses the LaTeX-formatted sign when for the forum yet splitting is still requested", (): void => {
            ioSettings.tableFormat = TableFormat.FORUM_WITH_SPLIT_QUOTIENTS
            const actual = splitVectorAndQuotientFieldTitles(fieldTitles, { maxVectorLength })

            const expected = [
                "2,3-free prime limit",
                "2,3-free class n",
                "⤝ ⤝ /",
                "⤝ ⤝ d",
                "⤝ ⤝ [latex]_{\\scriptsize{2,3}}[/latex]",
                "2,3-free class CoPFR",
            ] as Io[]
            expect(actual).toEqual(expected)
        })
    })

    describe("also works for the 2,3-free class table as part of the analyze-ji-pitch script", (): void => {
        const fieldTitles = ["prime limit", "name", "CoPFR"] as Io[]
        const recognizeNameTitleAsBeingFor23FreeClass = true

        it("can recognize the 'name' title as being for a 2,3-free class and split it (can't simply always split 'name' because it is also used in the notating commas table for the comma name)", (): void => {
            const actual = splitVectorAndQuotientFieldTitles(fieldTitles, {
                maxVectorLength,
                recognizeNameTitleAsBeingFor23FreeClass,
            })

            const expected = ["prime limit", "name n", "/", "d", "₂,₃", "CoPFR"] as Io[]
            expect(actual).toEqual(expected)
        })
    })
})
