import {Formatted, ioSettings, Quotient, TableFormat} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"
import {formatSplitQuotient} from "../../../../src/io/splitPevAndQuotient"

describe("formatSplitQuotient", (): void => {
    const quotient = [7, 6] as Quotient<{rational: true}>

    it("splits the quotient into the numerator, vinculum, and denominator", (): void => {
        const actual = formatSplitQuotient(quotient)

        const expected = ["7", "/", "6"] as Array<Formatted<JiPitchAnalysis>>
        expect(actual).toEqual(expected)
    })

    it("when formatting for the forum, leaves the LaTeX-formatted quotient as a single element in an array to be spread      ", (): void => {
        ioSettings.tableFormat = TableFormat.FORUM
        const actual = formatSplitQuotient(quotient)

        const expected = ["[latex]\\frac{7}{6}[/latex]"] as Array<Formatted<JiPitchAnalysis>>
        expect(actual).toEqual(expected)
    })

    it("works for a quotient with a 1 denominator", (): void => {
        const quotient = [7, 1] as Quotient<{rational: true}>

        const actual = formatSplitQuotient(quotient)

        const expected = ["7", "/", "1"] as Array<Formatted<JiPitchAnalysis>>
        expect(actual).toEqual(expected)
    })
})
