import {
    Abs,
    Copfr,
    Decimal,
    Max,
    Vector,
    Prime,
    Sopfr,
    ScaledVector,
    Rational,
    Rough,
} from "@sagittal/general"
import { ApotomeSlope, Ate, computeAas, JiPitchAnalysis, N2D3P9 } from "@sagittal/system"
import { computeFindNotatingCommasOptions, DEFAULT_FIND_COMMAS_OPTIONS } from "../../../src/findCommas"
import { jiPitchAnalysisFixture, two3FreeClassAnalysisFixture } from "../../helpers/src/fixtures"

describe("computeFindNotatingCommasOptions", (): void => {
    const n2d3p9 = (DEFAULT_FIND_COMMAS_OPTIONS.maxN2D3P9 + 100) as N2D3P9
    const ate = (DEFAULT_FIND_COMMAS_OPTIONS.maxAte + 10) as Ate
    const vector = [0, ate] as Vector
    const pitch = { vector } as ScaledVector<Rational>
    const aas = computeAas(pitch)
    const decimal = 847300834270 as Decimal<Rational> // 47548.9¢
    const two3FreePrimeLimit = 8191 as Max<Prime<Rough<5>>>
    const two3FreeCopfr = 1000 as Copfr<Rough<5>>
    const two3FreeSopfr = 100 as Sopfr<Rough<5>>
    const jiPitchAnalysis: JiPitchAnalysis = {
        ...jiPitchAnalysisFixture,
        ate,
        aas,
        two3FreeClassAnalysis: {
            ...two3FreeClassAnalysisFixture,
            n2d3p9,
            two3FreePrimeLimit,
            two3FreeCopfr,
            two3FreeSopfr,
        },
        decimal,
        pitch,
    }

    it("adjusts the max N2D3P9 if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.maxN2D3P9).toBe(n2d3p9 as Max<N2D3P9>)
    })

    it("adjusts the max AAS if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.maxAas).toBeCloseToTyped(3483.308958 as Max<Abs<ApotomeSlope>>)
    })

    it("adjusts the max ATE if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.maxAte).toBe(ate as Max<Ate>)
    })

    it("adjusts the max prime limit if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.maxPrimeLimit).toBe(two3FreePrimeLimit as Max<Max<Prime>>)
    })

    it("adjusts the max CoPFR if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.max23FreeCopfr).toBe(two3FreeCopfr as Max<Copfr<Rough<5>>>)
    })

    it("adjusts the max SoPFR if the JI pitch has greater than the current options", (): void => {
        const actual = computeFindNotatingCommasOptions(jiPitchAnalysis)

        expect(actual.max23FreeSopfr).toBe(two3FreeSopfr as Max<Sopfr<Rough<5>>>)
    })
})
