import {BLANK, Copfr, Io, Max, Monzo, NEWLINE, Prime, Sopfr, Two3FreeClass} from "@sagittal/general"
import {N2D3P9} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../../../src/globals"
import {compute23FreeClassOutput} from "../../../../src/io"
import {JiPitchScriptGroupField} from "../../../../src/types"
import {two3FreeClassAnalysisFixture} from "../../../helpers/src/fixtures"

describe("compute23FreeClassOutput", (): void => {
    const two3FreeClassAnalysis = {
        ...two3FreeClassAnalysisFixture,
        two3FreeClass: {
            monzo: [0, 0, 1] as Monzo<{rational: true}>,
        } as Two3FreeClass,
        two3FreePrimeLimit: 14 as Max<Prime<{rough: 5}>>,
        two3FreeCopfr: 2 as Copfr<{rough: 5}>,
        two3FreeSopfr: 13 as Sopfr<{rough: 5}>,
        n2d3p9: 18.4567 as N2D3P9,
    }

    it("formats it in a multi-line output with titles for each line", (): void => {
        const actual = compute23FreeClassOutput(two3FreeClassAnalysis)

        const expected =
            "   --- 2,3-free class ---" + NEWLINE +
            "" + NEWLINE +
            "prime  \tname\t \t \t   \t       \t       \t       " + NEWLINE +
            "limit  \t   n\t/\td\t₂,₃\tCoPFR  \tSoPFR  \tN2D3P9 ".underline + NEWLINE +
            " 14    \t   5\t/\t1\t₂,₃\t  2    \t 13    \t 18.457" + NEWLINE as Io
        expect(actual).toEqual(expected)
    })

    it("can reorder columns", (): void => {
        jiPitchScriptGroupSettings.orderedFields =
            ["two3FreeCopfr", "two3FreeClassName", "two3FreePrimeLimit"] as JiPitchScriptGroupField[]

        const actual = compute23FreeClassOutput(two3FreeClassAnalysis)

        const expected =
            "   --- 2,3-free class ---" + NEWLINE +
            "" + NEWLINE +
            "       \tname\t \t \t   \tprime  " + NEWLINE +
            "CoPFR  \t   n\t/\td\t₂,₃\tlimit  ".underline + NEWLINE +
            "  2    \t   5\t/\t1\t₂,₃\t 14    " + NEWLINE as Io
        expect(actual).toEqual(expected)
    })

    it("returns blank (not the title) when all columns are excluded", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [
            "two3FreeCopfr",
            "two3FreeClassName",
            "two3FreeClassName",
            "two3FreePrimeLimit",
            "two3FreeSopfr",
            "n2d3p9",
        ] as JiPitchScriptGroupField[]

        const actual = compute23FreeClassOutput(two3FreeClassAnalysis)

        expect(actual).toEqual(BLANK)
    })
})
