import {
    Abs,
    Cents,
    Comma,
    Copfr,
    Count,
    Exponent,
    Max,
    Name,
    Vector,
    Prime,
    Quotient,
    Row,
    Sopfr,
    Two3FreeClass,
    Rational,
    Rough,
    Super,
} from "@sagittal/general"
import { ApotomeSlope, Ate, CommaAnalysis, CommaClassId, N2D3P9 } from "@sagittal/system"
import { jiPitchScriptGroupSettings } from "../../../../src/globals"
import { computeFindCommasRow } from "../../../../src/io/row"
import { JiPitchesOrFindCommasField } from "../../../../src/types"
import { commaAnalysisFixture, two3FreeClassAnalysisFixture } from "../../../helpers/src/fixtures"

describe("computeFindCommasRow", (): void => {
    // This comma is made up and internally inconsistent.
    const commaAnalysis: CommaAnalysis = {
        ...commaAnalysisFixture,
        cents: 11.2 as Cents,
        vector: [0, -1, 1] as Vector,
        quotient: [5, 4] as Quotient,
        name: "1/5C" as Name<Comma>,
        apotomeSlope: 8.2 as ApotomeSlope,
        aas: 8.2 as Abs<ApotomeSlope>,
        ate: 1 as Ate,
        two3FreeClassAnalysis: {
            ...two3FreeClassAnalysisFixture,
            two3FreePrimeLimit: 14 as Max<Prime<Rough<5>>>,
            two3FreeCopfr: 1 as Copfr<Rough<5>>,
            two3FreeSopfr: 13 as Sopfr<Rough<5>>,
            n2d3p9: 18.4567 as N2D3P9,
            two3FreeClass: {
                vector: [0, 0, 1] as Vector<Rational & Super & Rough<5>>,
            } as Two3FreeClass,
        },
    }
    const commaClassId = CommaClassId._1_V_5_C
    const maxVectorLength = 5 as Max<Count<Exponent<Prime>>>

    it("takes the properties of the comma and puts them in order in a row", (): void => {
        const actual = computeFindCommasRow(commaAnalysis, commaClassId, maxVectorLength)

        /* eslint-disable prettier/prettier */
        const expected = [
            "    /|  ",         // Comma class
            "1/5C",             // Comma name
            "5",                // Quotient numerator
            "/",                // Quotient vinculum
            "4",                // Quotient denominator
            "[",                // Vector [
            "  0    ",          // Vector 2
            " -1    ",          // Vector 3
            "  1    ",          // Vector 5
            "",                 // Vector 7
            "",                 // Vector 11
            "⟩",                // Vector ⟩
            "        11.200¢",  // Cents
            "  8.200",          // Apotome slope
            "  8.200",          // AAS
            "  1    ",          // ATE
            " 14    ",          // 2,3-free prime limit
            "5",                // 2,3-free class name
            "/",                // 2,3-free class name
            "1",                // 2,3-free class name
            "₂,₃",              // 2,3-free class name
            "  1    ",          // 2,3-free CoPFR
            " 13    ",          // 2,3-free SoPFR
            " 18.457",          // N2D3P9
        ] as Row<{ of: CommaAnalysis }>
        /* eslint-enable prettier/prettier */

        expect(actual).toEqual(expected)
    })

    it("can filter the excluded fields", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [
            JiPitchesOrFindCommasField.AAS,
            JiPitchesOrFindCommasField.ATE,
        ]
        const actual = computeFindCommasRow(commaAnalysis, commaClassId, maxVectorLength)

        /* eslint-disable prettier/prettier */
        const expected = [
            "    /|  ",           // Comma class
            "1/5C",             // Comma name
            "u",                // Size category (abbreviation)
            "5",                // Quotient numerator
            "/",                // Quotient vinculum
            "4",                // Quotient denominator
            "[",                // Vector [
            "  0    ",          // Vector 2
            " -1    ",          // Vector 3
            "  1    ",          // Vector 5
            "",                 // Vector 7
            "",                 // Vector 11
            "⟩",                // Vector ⟩
            "        11.200¢",  // Cents
            "  8.200",          // Apotome slope
            " 14    ",          // 2,3-free prime limit
            "5",                // 2,3-free class name
            "/",                // 2,3-free class name
            "1",                // 2,3-free class name
            "₂,₃",              // 2,3-free class name
            "  1    ",          // 2,3-free CoPFR
            " 13    ",          // 2,3-free SoPFR
            " 18.457",          // N2D3P9
        ] as Row<{ of: CommaAnalysis }>
        /* eslint-enable prettier/prettier */

        expect(actual).toEqual(expected)
    })
})
