import {Count, Exponent, Formatted, Max, Pev, Prime} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"
import {formatSplitPev} from "../../../../src/io/splitPevAndQuotient"

describe("formatSplitPev", (): void => {
    it("splits a pev into a different cell for each prime exponent", (): void => {
        const pev = [3, -2, -1] as Pev<{rational: true}>
        const maxPevLength = 4 as Max<Count<Exponent<Prime>>>

        const actual = formatSplitPev(pev, maxPevLength)

        const expected = [
            "[",
            "  3    ",
            " -2    ",
            " -1    ",
            "",
            "⟩",
        ] as Array<Formatted<JiPitchAnalysis>>
        expect(actual).toEqual(expected)
    })
})
