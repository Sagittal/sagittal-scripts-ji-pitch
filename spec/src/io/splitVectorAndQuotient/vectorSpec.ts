import { Count, Exponent, Formatted, Max, Vector, Prime } from "@sagittal/general"
import { JiPitchAnalysis } from "@sagittal/system"
import { formatSplitVector } from "../../../../src/io/splitVectorAndQuotient"

describe("formatSplitVector", (): void => {
    it("splits a vector into a different cell for each prime count", (): void => {
        const vector = [3, -2, -1] as Vector
        const maxVectorLength = 4 as Max<Count<Exponent<Prime>>>

        const actual = formatSplitVector(vector, maxVectorLength)

        const expected = ["[", "  3    ", " -2    ", " -1    ", "", "⟩"] as Formatted<JiPitchAnalysis>[]
        expect(actual).toEqual(expected)
    })
})
