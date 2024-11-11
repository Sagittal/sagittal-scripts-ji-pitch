import { Count, EMPTY_VECTOR, Exponent, Max, Vector, Prime } from "@sagittal/general"
import { JiPitchAnalysis } from "@sagittal/system"
import { computeMaxVectorLength } from "../../../../src/io/splitVectorAndQuotient"
import { jiPitchAnalysisFixture } from "../../../helpers/src/fixtures"

describe("computeMaxVectorLength", (): void => {
    it("returns the length of the longest vector for each of the JI pitch analyses", (): void => {
        const jiPitchAnalyses = [
            { ...jiPitchAnalysisFixture, vector: EMPTY_VECTOR },
            {
                ...jiPitchAnalysisFixture,
                vector: [0, 3, 1, 0, 0, -1] as Vector,
            },
            { ...jiPitchAnalysisFixture, vector: [5, -4, -1] as Vector },
        ] as JiPitchAnalysis[]

        const actual = computeMaxVectorLength(jiPitchAnalyses)

        const expected = 6 as Max<Count<Exponent<Prime>>>
        expect(actual).toBe(expected)
    })
})
