import { Abs, Cents, Count, Exponent, Max, Vector, Prime, Quotient, Row } from "@sagittal/general"
import { ApotomeSlope, Ate, JiPitchAnalysis } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../../../src/globals"
import { computeJiPitchRow } from "../../../../src/io/row"
import { JiPitchField } from "../../../../src/types"
import { jiPitchAnalysisFixture, two3FreeClassAnalysisFixture } from "../../../helpers/src/fixtures"

describe("computeJiPitchRow", (): void => {
    const jiPitchAnalysis: JiPitchAnalysis = {
        ...jiPitchAnalysisFixture,
        cents: 11.2 as Cents,
        vector: [0, -1, 1] as Vector<{ rational: true }>,
        quotient: [5, 4] as Quotient<{ rational: true }>,
        apotomeSlope: 8.2 as ApotomeSlope,
        aas: 8.2 as Abs<ApotomeSlope>,
        ate: 1 as Ate,
        two3FreeClassAnalysis: two3FreeClassAnalysisFixture,
    }
    const maxVectorLength = 5 as Max<Count<Exponent<Prime>>>

    it("returns a row of information about the JI pitch", (): void => {
        const actual = computeJiPitchRow(jiPitchAnalysis, maxVectorLength)
        const expected = [
            "5", // Quotient numerator
            "/", // Quotient vinculum
            "4", // Quotient denominator
            "[", // Vector [
            "  0    ", // Vector 2
            " -1    ", // Vector 3
            "  1    ", // Vector 5
            "", // Vector 7
            "", // Vector 11
            "⟩", // Vector ⟩
            "        11.200¢", // Cents
            "  8.200", // Apotome slope
            "  8.200", // AAS
            "  1    ", // ATE
        ] as Row<{ of: JiPitchAnalysis; header: true }>
        expect(actual).toEqual(expected)
    })

    it("can filter the excluded fields", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [
            JiPitchField.APOTOME_SLOPE,
            JiPitchField.QUOTIENT,
        ]
        const actual = computeJiPitchRow(jiPitchAnalysis, maxVectorLength)

        const expected = [
            "[", // Vector [
            "  0    ", // Vector 2
            " -1    ", // Vector 3
            "  1    ", // Vector 5
            "", // Vector 7
            "", // Vector 11
            "⟩", // Vector ⟩
            "        11.200¢", // Cents
            "  8.200", // AAS
            "  1    ", // ATE
        ] as Row<{ of: JiPitchAnalysis; header: true }>
        expect(actual).toEqual(expected)
    })
})
