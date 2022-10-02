import {Abs, BLANK, Cents, Comma, Io, ioSettings, Name, NEWLINE, Pev, Quotient, TableFormat} from "@sagittal/general"
import {ApotomeSlope, Ate, CommaAnalysis, CommaClassId} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../../../src/globals"
import {computeNotatingCommasOutput} from "../../../../src/io"
import {JiPitchScriptGroupField} from "../../../../src/types"
import {commaAnalysisFixture, two3FreeClassAnalysisFixture} from "../../../helpers/src/fixtures"

describe("computeNotatingCommasOutput", (): void => {
    const notatingCommaAnalyses: CommaAnalysis[] = [
        {
            ...commaAnalysisFixture,
            name: "11M" as Name<Comma>,
            cents: 45.45 as Cents,
            pev: [0, 0, 1] as Pev<{rational: true}>,
            quotient: [33, 32] as Quotient<{rational: true}>,
            apotomeSlope: -4 as ApotomeSlope,
            aas: 4 as Abs<ApotomeSlope>,
            ate: 0 as Ate,
            two3FreeClassAnalysis: two3FreeClassAnalysisFixture,
        },
        {
            ...commaAnalysisFixture,
            name: "25/49M" as Name<Comma>,
            cents: 33.4 as Cents,
            pev: [1, 0, 2, -2] as Pev<{rational: true}>,
            quotient: [50, 49] as Quotient<{rational: true}>,
            apotomeSlope: -2.154 as ApotomeSlope,
            aas: 2.154 as Abs<ApotomeSlope>,
            ate: 0 as Ate,
            two3FreeClassAnalysis: two3FreeClassAnalysisFixture,
        },
    ]
    const maybeCommaClassIds = [CommaClassId._11_M, undefined]

    it("can format the notating commas for the terminal", (): void => {
        const actual = computeNotatingCommasOutput(notatingCommaAnalyses, maybeCommaClassIds)

        const expected =
            "   --- notating commas ---" + NEWLINE +
            "" + NEWLINE +
            "comma   \t      \tquotient\t \t  \tpev\t       \t       \t       \t       \t \t               \tapotome\t       \t       " + NEWLINE +
            "class   \tname  \t       n\t/\td \t   \t  2    \t  3    \t  5    \t  7    \t \tcents          \tslope  \tAAS    \tATE    ".underline + NEWLINE +
            "    /|\\ \t11M   \t      33\t/\t32\t  [\t  0    \t  0    \t  1    \t       \t⟩\t        45.450¢\t -4.000\t  4.000\t  0    " + NEWLINE +
            "        \t25/49M\t      50\t/\t49\t  [\t  1    \t  0    \t  2    \t -2    \t⟩\t        33.400¢\t -2.154\t  2.154\t  0    " + NEWLINE as Io
        expect(actual).toBe(expected)
    })

    it("can format the notating commas for the forum", (): void => {
        ioSettings.tableFormat = TableFormat.FORUM
        const actual = computeNotatingCommasOutput(notatingCommaAnalyses, maybeCommaClassIds)

        const expected =
            "   --- notating commas ---" + NEWLINE +
            "" + NEWLINE +
            "[table]" + NEWLINE +
            "[tr][th]comma[/th][th][/th][th][/th][th=6]pev[/th][th][/th][th]apotome[/th][th][/th][th][/th][/tr]" + NEWLINE +
            "[tr][th]class[/th][th]name[/th][th]quotient[/th][thr] [/thr][th]  2    [/th][th]  3    [/th][th]  5    [/th][th]  7    [/th][thl] [/thl][th]cents[/th][th]slope[/th][th]AAS[/th][th]ATE[/th][/tr]" + NEWLINE +
            "[tr][td]:/|\\:[/td][td]11M[/td][td][latex]\\frac{33}{32}[/latex][/td][tdr][[/tdr][tdc]  0    [/tdc][tdc]  0    [/tdc][tdc]  1    [/tdc][tdc][/tdc][td]⟩[/td][td] 45.450¢[/td][td] -4.000[/td][td]  4.000[/td][td]  0    [/td][/tr]" + NEWLINE +
            "[tr][td][/td][td]25/49M[/td][td][latex]\\frac{50}{49}[/latex][/td][tdr][[/tdr][tdc]  1    [/tdc][tdc]  0    [/tdc][tdc]  2    [/tdc][tdc] -2    [/tdc][td]⟩[/td][td] 33.400¢[/td][td] -2.154[/td][td]  2.154[/td][td]  0    [/td][/tr]" + NEWLINE +
            "[/table]" + NEWLINE as Io
        expect(actual).toBe(expected)
    })

    it("can reorder fields", (): void => {
        jiPitchScriptGroupSettings.orderedFields = ["pev", "ate", "quotient", "cents"] as JiPitchScriptGroupField[]
        jiPitchScriptGroupSettings.excludedFields = [] // This happens automatically when ordering fields

        const actual = computeNotatingCommasOutput(notatingCommaAnalyses, maybeCommaClassIds)

        const expected =
            "   --- notating commas ---" + NEWLINE +
            "" + NEWLINE +
            "pev\t       \t       \t       \t       \t \t       \tquotient\t \t  \t               " + NEWLINE +
            "   \t  2    \t  3    \t  5    \t  7    \t \tATE    \t       n\t/\td \tcents          ".underline + NEWLINE +
            "  [\t  0    \t  0    \t  1    \t       \t⟩\t  0    \t      33\t/\t32\t        45.450¢" + NEWLINE +
            "  [\t  1    \t  0    \t  2    \t -2    \t⟩\t  0    \t      50\t/\t49\t        33.400¢" + NEWLINE as Io
        expect(actual).toBe(expected)
    })

    it("does not create an empty table if there are no results", (): void => {
        const actual = computeNotatingCommasOutput([], maybeCommaClassIds)

        const expected =
            "   --- notating commas ---" + NEWLINE +
            "" + NEWLINE +
            "(no results)" + NEWLINE as Io
        expect(actual).toBe(expected)
    })

    it("returns blank (not the title) when all columns are excluded", (): void => {
        jiPitchScriptGroupSettings.excludedFields = [
            "quotient",
            "pev",
            "cents",
            "apotomeSlope",
            "aas",
            "ate",
            "commaClass",
            "name",
            "sizeCategory",
        ] as JiPitchScriptGroupField[]

        const actual = computeNotatingCommasOutput(notatingCommaAnalyses, maybeCommaClassIds)

        expect(actual).toEqual(BLANK)
    })
})
