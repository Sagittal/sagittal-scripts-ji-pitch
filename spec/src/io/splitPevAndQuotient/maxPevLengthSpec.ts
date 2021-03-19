import {Count, EMPTY_PEV, Exponent, Max, Pev, Prime} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"
import {computeMaxPevLength} from "../../../../src/io/splitPevAndQuotient"
import {jiPitchAnalysisFixture} from "../../../helpers/src/fixtures"

describe("computeMaxPevLength", (): void => {
    it("returns the length of the longest pev for each of the JI pitch analyses", (): void => {
        const jiPitchAnalyses = [
            {...jiPitchAnalysisFixture, pev: EMPTY_PEV},
            {...jiPitchAnalysisFixture, pev: [0, 3, 1, 0, 0, -1] as Pev<{rational: true}>},
            {...jiPitchAnalysisFixture, pev: [5, -4, -1] as Pev<{rational: true}>},
        ] as JiPitchAnalysis[]

        const actual = computeMaxPevLength(jiPitchAnalyses)

        const expected = 6 as Max<Count<Exponent<Prime>>>
        expect(actual).toBe(expected)
    })
})
