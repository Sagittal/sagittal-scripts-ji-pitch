import {
    Abs,
    Cents,
    Comma,
    Copfr,
    Count,
    Direction,
    Exponent,
    Max,
    Pev,
    Name,
    Prime,
    Quotient,
    Row,
    Sopfr,
    Two3FreeClass,
} from "@sagittal/general"
import {ApotomeSlope, Ate, CommaAnalysis, CommaClassId, N2D3P9} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../../../src/globals"
import {computeFindCommasRow} from "../../../../src/io/row"
import {JiPitchesOrFindCommasField} from "../../../../src/types"
import {commaAnalysisFixture, two3FreeClassAnalysisFixture} from "../../../helpers/src/fixtures"

describe("computeFindCommasRow", (): void => {
    // This comma is made up and internally inconsistent.
    const commaAnalysis: CommaAnalysis = {
        ...commaAnalysisFixture,
        cents: 11.2 as Cents,
        pev: [0, -1, 1] as Pev<{rational: true}>,
        quotient: [5, 4] as Quotient<{rational: true}>,
        name: "1/5C" as Name<Comma>,
        apotomeSlope: 8.2 as ApotomeSlope,
        aas: 8.2 as Abs<ApotomeSlope>,
        ate: 1 as Ate,
        two3FreeClassAnalysis: {
            ...two3FreeClassAnalysisFixture,
            two3FreePrimeLimit: 14 as Max<Prime<{rough: 5}>>,
            two3FreeCopfr: 1 as Copfr<{rough: 5}>,
            two3FreeSopfr: 13 as Sopfr<{rough: 5}>,
            n2d3p9: 18.4567 as N2D3P9,
            two3FreeClass: {
                pev: [0, 0, 1] as Pev<{rational: true, rough: 5, direction: Direction.SUPER}>,
            } as Two3FreeClass,
        },
    }
    const commaClassId = CommaClassId._1_V_5_C
    const maxPevLength = 5 as Max<Count<Exponent<Prime>>>

    it("takes the properties of the comma and puts them in order in a row", (): void => {
        const actual = computeFindCommasRow(commaAnalysis, commaClassId, maxPevLength)

        const expected = [
            "    /|  ",         // Comma class
            "1/5C",             // Comma name
            "5",                // Quotient numerator
            "/",                // Quotient vinculum
            "4",                // Quotient denominator
            "[",                // Pev [
            "  0    ",          // Pev 2
            " -1    ",          // Pev 3
            "  1    ",          // Pev 5
            "",                 // Pev 7
            "",                 // Pev 11
            "⟩",                // Pev ⟩
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
        ] as Row<{of: CommaAnalysis}>
        expect(actual).toEqual(expected)
    })

    it("can filter the excluded fields", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [JiPitchesOrFindCommasField.AAS, JiPitchesOrFindCommasField.ATE]
        const actual = computeFindCommasRow(commaAnalysis, commaClassId, maxPevLength)

        const expected = [
            "    /|  ",         // Comma class
            "1/5C",             // Comma name
            "u",                // Size category (abbreviation)
            "5",                // Quotient numerator
            "/",                // Quotient vinculum
            "4",                // Quotient denominator
            "[",                // Pev [
            "  0    ",          // Pev 2
            " -1    ",          // Pev 3
            "  1    ",          // Pev 5
            "",                 // Pev 7
            "",                 // Pev 11
            "⟩",                // Pev ⟩
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
        ] as Row<{of: CommaAnalysis}>
        expect(actual).toEqual(expected)
    })
})
