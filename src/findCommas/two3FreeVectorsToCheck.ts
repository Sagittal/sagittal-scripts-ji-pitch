import {
    computeExtensionBase,
    computeRationalVectorCopfr,
    computeRationalVectorSopfr,
    computeTrimmedArray,
    Copfr,
    ExtensionBaseType,
    Extrema,
    FIVE_PRIME_INDEX,
    isUndefined,
    Max,
    Maybe,
    Vector,
    Prime,
    shallowClone,
    Sopfr,
    PrimeCount,
    Range,
    Rational,
    Rough,
} from "@sagittal/general"
import { computePrimeCountExtremasGivenMaxN2D3P9 } from "@sagittal/system"
import { TWO_3_FREE_VECTOR_BASE } from "./constants"
import { computePrimeCountRange } from "./primeCountRange"
import { compute23FreePrimesToCheck } from "./two3FreePrimesToCheck"
import { FindCommasOptions } from "./types"

const compute23FreeRationalVectorsToCheck = ({
    maxPrimeLimit,
    max23FreeSopfr,
    max23FreeCopfr,
    maxN2D3P9,
}: Partial<FindCommasOptions> = {}): Vector<Rational & Rough<5>>[] => {
    if (isUndefined(max23FreeSopfr) && isUndefined(maxN2D3P9)) {
        if (isUndefined(maxPrimeLimit)) {
            if (isUndefined(max23FreeCopfr)) {
                throw new Error("The primes must be constrained somehow.")
            } else {
                throw new Error("The size of the primes must be constrained somehow.")
            }
        } else if (isUndefined(max23FreeCopfr)) {
            throw new Error("The count of the primes must be constrained somehow.")
        }
    }

    const primeCountExtremasGivenMaxN2D3P9: Maybe<Extrema<{ of: PrimeCount }>[]> =
        maxN2D3P9 && computePrimeCountExtremasGivenMaxN2D3P9(maxN2D3P9, { mirrored: true })

    const two3FreePrimesToCheck = compute23FreePrimesToCheck({
        maxPrimeLimit,
        max23FreeSopfr,
        primeCountExtremasGivenMaxN2D3P9,
    })

    let two3FreeRationalVectorsToCheck: Vector<Rational & Rough<5>>[] = [shallowClone(TWO_3_FREE_VECTOR_BASE)]
    two3FreePrimesToCheck.forEach((two3FreePrimeToCheck: Prime, index: number): void => {
        const extended23FreeVectorsToCheck: Vector<Rational & Rough<5>>[] = computeExtensionBase(
            ExtensionBaseType.ARRAY,
        ) as Vector<Rational & Rough<5>>[]

        const primeCountExtremaGivenMaxN2D3P9: Maybe<Extrema<{ of: PrimeCount }>> =
            primeCountExtremasGivenMaxN2D3P9 && primeCountExtremasGivenMaxN2D3P9[index + FIVE_PRIME_INDEX]

        two3FreeRationalVectorsToCheck.forEach((two3FreeVectorToCheck: Vector): void => {
            const two3FreeSopfr = computeRationalVectorSopfr(two3FreeVectorToCheck)
            const two3FreeCopfr = computeRationalVectorCopfr(two3FreeVectorToCheck)

            const adjustedMax23FreeSopfr =
                max23FreeSopfr && ((max23FreeSopfr - two3FreeSopfr) as Max<Sopfr<Rough<5>>>)
            const adjustedMaxTwo3FreeCopfr =
                max23FreeCopfr && ((max23FreeCopfr - two3FreeCopfr) as Max<Copfr<Rough<5>>>)

            const primeCountRange: Range<PrimeCount> = computePrimeCountRange(two3FreePrimeToCheck, {
                max23FreeSopfr: adjustedMax23FreeSopfr,
                max23FreeCopfr: adjustedMaxTwo3FreeCopfr,
                primeCountExtremaGivenMaxN2D3P9,
            })
            primeCountRange.forEach((potentialNextTerm: PrimeCount): void => {
                extended23FreeVectorsToCheck.push(
                    two3FreeVectorToCheck.concat([potentialNextTerm] as Vector) as Vector<
                        Rational & Rough<5>
                    >,
                )
            })
        })

        two3FreeRationalVectorsToCheck = extended23FreeVectorsToCheck
    })

    return two3FreeRationalVectorsToCheck.map(computeTrimmedArray)
}

export { compute23FreeRationalVectorsToCheck }
