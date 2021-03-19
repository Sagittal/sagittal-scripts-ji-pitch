import {Comma, computeSpevFromDecimal, Max, Min, Pev, Prime, Spev, Sopfr} from "@sagittal/general"
import {findCommas} from "../../../src/findCommas"

describe("findCommas", (): void => {
    const max23FreeSopfr = 7 as Max<Sopfr<{rough: 5}>>

    it("throws an error if the bounds are on the wrong side of each other, or equal", (): void => {
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        computeSpevFromDecimal(1.02930223664) as Min<Spev>,
                        computeSpevFromDecimal(1.00579294107) as Max<Spev>,
                    ],
                },
            })
        }).toThrowError("Lower bound is not less than upper bound; range was 50.000¢ - 10.000¢.")
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        computeSpevFromDecimal(1.02930223664) as Min<Spev>,
                        computeSpevFromDecimal(1.02930223664) as Max<Spev>,
                    ],
                },
            })
        }).toThrowError("Lower bound is not less than upper bound; range was 50.000¢ - 50.000¢.")
    })

    it("throws an error if the bounds are outside than the abs value of the max size category bound", (): void => {
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        computeSpevFromDecimal(0.84089641525) as Min<Spev>,
                        undefined,
                    ],
                },
            })
        })
            .toThrowError("Search range must be within comma size category bounds (±227.370¢); range was -300.000¢ - [ -11   7 ⟩(1/2).")
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        computeSpevFromDecimal(0.79370052598) as Min<Spev>,
                        computeSpevFromDecimal(0.84089641525) as Max<Spev>,
                    ],
                },
            })
        })
            .toThrowError("Search range must be within comma size category bounds (±227.370¢); range was -400.000¢ - -300.000¢.")
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        computeSpevFromDecimal(1.189207115) as Min<Spev>,
                        computeSpevFromDecimal(1.25992104989) as Max<Spev>,
                    ],
                },
            })
        })
            .toThrowError("Search range must be within comma size category bounds (±227.370¢); range was 300.000¢ - 400.000¢.")
        expect((): void => {
            findCommas({
                max23FreeSopfr,
                zone: {
                    extrema: [
                        undefined,
                        computeSpevFromDecimal(1.189207115) as Max<Spev>,
                    ],
                },
            })
        })
            .toThrowError("Search range must be within comma size category bounds (±227.370¢); range was [  ⟩ - 300.000¢.")
    })

    it("returns commas if the bounds are within the abs value of the max size category bound (and the max N2D3P9 is less than the maximum N2D3P9 for which numerators are known)", (): void => {
        const lowerBound = computeSpevFromDecimal(1.00870198379) as Min<Spev>
        const upperBound = computeSpevFromDecimal(1.0174796921) as Max<Spev>

        const actual = findCommas({zone: {extrema: [lowerBound, upperBound]}, max23FreeSopfr})

        const expected: Comma[] = [
            {pev: [-4, 4, -1]},
            {pev: [6, -2, 0, -1]},
            {pev: [-19, 12]},
            {pev: [-34, 20, 1]},
        ] as Comma[]
        expect(actual).toBeArrayWithDeepEqualContents(expected)
    })

    it("excludes 3-limit commas when the max prime limit is 2", (): void => {
        const maxPrimeLimit = 2 as Max<Max<Prime>>

        const actual = findCommas({maxPrimeLimit})

        const expected: Comma[] = [
            {pev: [] as unknown[] as Pev<{rational: true}>},
        ] as Comma[]
        expect(actual).toBeArrayWithDeepEqualContents(expected)
    })
})
