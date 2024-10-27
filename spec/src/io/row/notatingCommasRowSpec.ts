import {
    Abs,
    Cents,
    Comma,
    Copfr,
    Count,
    Direction,
    Exponent,
    Max,
    Name,
    Vector,
    Prime,
    Quotient,
    Row,
    Sopfr,
    Two3FreeClass,
} from "@sagittal/general"
import { ApotomeSlope, Ate, CommaAnalysis, CommaClassId, N2D3P9 } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../../../src/globals"
import { computeNotatingCommasRow } from "../../../../src/io/row"
import { CommaField } from "../../../../src/types"
import { commaAnalysisFixture, two3FreeClassAnalysisFixture } from "../../../helpers/src/fixtures"

describe("computeNotatingCommasRow", (): void => {
    // This comma is made up and internally inconsistent.
    const commaAnalysis: CommaAnalysis = {
        ...commaAnalysisFixture,
        name: "1/5C" as Name<Comma>,
        cents: 11.2 as Cents,
        vector: [0, -1, 1] as Vector<{ rational: true }>,
        quotient: [5, 4] as Quotient<{ rational: true }>,
        apotomeSlope: 8.2 as ApotomeSlope,
        aas: 8.2 as Abs<ApotomeSlope>,
        ate: 1 as Ate,
        two3FreeClassAnalysis: {
            ...two3FreeClassAnalysisFixture,
            two3FreePrimeLimit: 14 as Max<Prime<{ rough: 5 }>>,
            two3FreeCopfr: 1 as Copfr<{ rough: 5 }>,
            two3FreeSopfr: 13 as Sopfr<{ rough: 5 }>,
            n2d3p9: 18.4567 as N2D3P9,
            two3FreeClass: {
                vector: [0, 0, 1] as Vector<{
                    rational: true
                    rough: 5
                    direction: Direction.SUPER
                }>,
            } as Two3FreeClass,
        },
    }
    const commaClassId = CommaClassId._1_V_5_C
    const maxVectorLength = 5 as Max<Count<Exponent<Prime>>>

    it("takes the properties of the comma and puts them in order in a row", (): void => {
        const actual = computeNotatingCommasRow(commaAnalysis, commaClassId, maxVectorLength)

        const expected = [
            "    /|  ", // Comma class
            "1/5C", // Comma name
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
        ] as Row<{ of: CommaAnalysis }>
        expect(actual).toEqual(expected)
    })

    it("can filter the excluded fields", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [CommaField.CENTS, CommaField.VECTOR]

        const actual = computeNotatingCommasRow(commaAnalysis, commaClassId, maxVectorLength)

        const expected = [
            "    /|  ", // Comma class
            "1/5C", // Comma name
            "u", // Size category (abbreviation)
            "5", // Quotient numerator
            "/", // Quotient vinculum
            "4", // Quotient denominator
            "  8.200", // Apotome slope
            "  8.200", // AAS
            "  1    ", // ATE
        ] as Row<{ of: CommaAnalysis }>
        expect(actual).toEqual(expected)
    })

    it("can handle the situation where the row's vector is shorter than the longest vector", (): void => {
        const actual = computeNotatingCommasRow(commaAnalysis, commaClassId, maxVectorLength)

        const expected = [
            "    /|  ", // Comma class
            "1/5C", // Comma name
            "5", // Quotient denominator
            "/", // Quotient vinculum
            "4", // Quotient numerator
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
        ] as Row<{ of: CommaAnalysis }>
        expect(actual).toEqual(expected)
    })
})
