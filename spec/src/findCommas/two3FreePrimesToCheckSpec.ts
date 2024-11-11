import { Extrema, Max, Prime, PrimeCount, Rough, Sopfr } from "@sagittal/general"
import { compute23FreePrimesToCheck } from "../../../src/findCommas/two3FreePrimesToCheck"

describe("compute23FreePrimesToCheck", (): void => {
    it("when none of max prime limit, max SoPFR, nor max N2D3P9 are provided, errors", (): void => {
        expect((): void => {
            compute23FreePrimesToCheck({})
        }).toThrowError("The maximum prime must be constrained somehow.")
    })

    describe("when only the prime limit is provided", (): void => {
        it("if it is not a prime (for whatever reason), the final prime less than it is the max prime", (): void => {
            const maxPrimeLimit = 20 as Max<Max<Prime>>

            const actual = compute23FreePrimesToCheck({ maxPrimeLimit })

            const expected = [5, 7, 11, 13, 17, 19] as Prime[]
            expect(actual).toEqual(expected)
        })

        it("if it is a prime, that becomes the maximum prime to check", (): void => {
            const maxPrimeLimit = 19 as Max<Max<Prime>>

            const actual = compute23FreePrimesToCheck({ maxPrimeLimit })

            const expected = [5, 7, 11, 13, 17, 19] as Prime[]
            expect(actual).toEqual(expected)
        })
    })

    describe("when only SoPFR is provided", (): void => {
        it("if it is not a prime, the final prime less than it is the max prime", (): void => {
            const max23FreeSopfr = 20 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({ max23FreeSopfr })

            const expected = [5, 7, 11, 13, 17, 19] as Prime[]
            expect(actual).toEqual(expected)
        })

        it("if it is a prime, then it is the max prime", (): void => {
            const max23FreeSopfr = 19 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({ max23FreeSopfr })

            const expected = [5, 7, 11, 13, 17, 19] as Prime[]
            expect(actual).toEqual(expected)
        })
    })

    describe("when both prime limit and SoPFR are provided", (): void => {
        it("if the prime limit is less than the SoPFR, prime limit should be the max prime", (): void => {
            const maxPrimeLimit = 13 as Max<Max<Prime>>
            const max23FreeSopfr = 19 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({ maxPrimeLimit, max23FreeSopfr })

            const expected = [5, 7, 11, 13] as Prime[]
            expect(actual).toEqual(expected)
        })

        it("if the SoPFR is less than the prime limit, SoPFR should be the max prime", (): void => {
            const maxPrimeLimit = 23 as Max<Max<Prime>>
            const max23FreeSopfr = 17 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({ maxPrimeLimit, max23FreeSopfr })

            const expected = [5, 7, 11, 13, 17] as Prime[]
            expect(actual).toEqual(expected)
        })
    })

    describe("N2D3P9, in the form of prime count extremas", (): void => {
        const primeCountExtremasGivenMaxN2D3P9 = [
            [0, 0], // 2
            [0, 0], // 3
            [-2, 6], // 5
            [-2, 4], // 7
            [-1, 2], // 11
            [-1, 1], // 13
            [0, 1], // 17
        ] as Extrema<{ of: PrimeCount }>[]

        it("when only N2D3P9 is provided, its final element is the max prime", (): void => {
            const actual = compute23FreePrimesToCheck({ primeCountExtremasGivenMaxN2D3P9 })

            const expected = [5, 7, 11, 13, 17] as Prime[]
            expect(actual).toEqual(expected)
        })

        it("when N2D3P9 is provided, as well as other constraints, but it is less, it wins", (): void => {
            const maxPrimeLimit = 23 as Max<Max<Prime>>
            const max23FreeSopfr = 19 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({
                primeCountExtremasGivenMaxN2D3P9,
                max23FreeSopfr,
                maxPrimeLimit,
            })

            const expected = [5, 7, 11, 13, 17] as Prime[]
            expect(actual).toEqual(expected)
        })

        it("when N2D3P9 is provided, as well as other constraints, but it is more, the others win", (): void => {
            const maxPrimeLimit = 11 as Max<Max<Prime>>
            const max23FreeSopfr = 17 as Max<Sopfr<Rough<5>>>

            const actual = compute23FreePrimesToCheck({
                primeCountExtremasGivenMaxN2D3P9,
                max23FreeSopfr,
                maxPrimeLimit,
            })

            const expected = [5, 7, 11] as Prime[]
            expect(actual).toEqual(expected)
        })
    })
})
