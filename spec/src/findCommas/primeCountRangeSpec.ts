import { Copfr, Extrema, Max, Prime, PrimeCount, Rough, Sopfr } from "@sagittal/general"
import { computePrimeCountRange } from "../../../src/findCommas/primeCountRange"

describe("computePrimeCountRange", (): void => {
    it("gives the valid range of the exponent for the given prime, given a max 2,3-free SoPFR and a max 2,3-free CoPFR where the 2,3-free CoPFR is the constraining factor", (): void => {
        const prime = 11 as Prime
        const max23FreeSopfr = 51 as Max<Sopfr<Rough<5>>>
        const max23FreeCopfr = 3 as Max<Copfr<Rough<5>>>

        const actual = computePrimeCountRange(prime, { max23FreeSopfr, max23FreeCopfr })

        const expected = [-3, -2, -1, 0, 1, 2, 3] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given a max 2,3-free SoPFR and a max 2,3-free CoPFR where the 2,3-free SoPFR is the constraining factor", (): void => {
        const prime = 11 as Prime
        const max23FreeSopfr = 30 as Max<Sopfr<Rough<5>>>
        const max23FreeCopfr = 3 as Max<Copfr<Rough<5>>>

        const actual = computePrimeCountRange(prime, { max23FreeSopfr, max23FreeCopfr })

        const expected = [-2, -1, 0, 1, 2] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given a max 2,3-free SoPFR and a max N2D3P9 where the 2,3-free SoPFR is the constraining factor", (): void => {
        const prime = 7 as Prime
        const max23FreeSopfr = 999 as Max<Sopfr<Rough<5>>>
        const primeCountExtremaGivenMaxN2D3P9 = [-2, 4] as Extrema<{
            of: PrimeCount
        }>

        const actual = computePrimeCountRange(prime, {
            max23FreeSopfr,
            primeCountExtremaGivenMaxN2D3P9,
        })

        const expected = [-2, -1, 0, 1, 2, 3, 4] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given a max 2,3-free SoPFR and a max N2D3P9 where the N2D3P9 is the constraining factor", (): void => {
        const prime = 7 as Prime
        const max23FreeSopfr = 14 as Max<Sopfr<Rough<5>>>
        const primeCountExtremaGivenMaxN2D3P9 = [-5, 8] as Extrema<{
            of: PrimeCount
        }>

        const actual = computePrimeCountRange(prime, {
            max23FreeSopfr,
            primeCountExtremaGivenMaxN2D3P9,
        })

        const expected = [-2, -1, 0, 1, 2] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given a max 2,3-free CoPFR and a max N2D3P9 where the 2,3-free CoPFR is the constraining factor", (): void => {
        const prime = 11 as Prime
        const max23FreeCopfr = 3 as Max<Copfr<Rough<5>>>
        const primeCountExtremaGivenMaxN2D3P9 = [-5, 9] as Extrema<{
            of: PrimeCount
        }>

        const actual = computePrimeCountRange(prime, {
            primeCountExtremaGivenMaxN2D3P9,
            max23FreeCopfr,
        })

        const expected = [-3, -2, -1, 0, 1, 2, 3] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given a max 2,3-free CoPFR and a max N2D3P9 where the N2D3P9 is the constraining factor", (): void => {
        const prime = 11 as Prime
        const max23FreeCopfr = 3 as Max<Copfr<Rough<5>>>
        const primeCountExtremaGivenMaxN2D3P9 = [-1, 2] as Extrema<{
            of: PrimeCount
        }>

        const actual = computePrimeCountRange(prime, {
            primeCountExtremaGivenMaxN2D3P9,
            max23FreeCopfr,
        })

        const expected = [-1, 0, 1, 2] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given only a max 2,3-free SoPFR", (): void => {
        const prime = 11 as Prime
        const max23FreeSopfr = 51 as Max<Sopfr<Rough<5>>>

        const actual = computePrimeCountRange(prime, { max23FreeSopfr })

        const expected = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given only a max 2,3-free CoPFR", (): void => {
        const prime = 61 as Prime
        const max23FreeCopfr = 3 as Max<Copfr<Rough<5>>>

        const actual = computePrimeCountRange(prime, { max23FreeCopfr })

        const expected = [-3, -2, -1, 0, 1, 2, 3] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("gives the valid range of the exponent for the given prime, given only a max N2D3P9", (): void => {
        const prime = 7 as Prime
        const primeCountExtremaGivenMaxN2D3P9 = [-2, 4] as Extrema<{
            of: PrimeCount
        }>

        const actual = computePrimeCountRange(prime, { primeCountExtremaGivenMaxN2D3P9 })

        const expected = [-2, -1, 0, 1, 2, 3, 4] as PrimeCount[]
        expect(actual).toEqual(expected)
    })

    it("throws an error if no max is provided", (): void => {
        const prime = 61 as Prime

        expect((): void => {
            computePrimeCountRange(prime)
        }).toThrowError("The range must be constrained somehow.")
    })
})
