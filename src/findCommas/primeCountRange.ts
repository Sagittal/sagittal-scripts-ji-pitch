import {
    add,
    computeRange,
    Copfr,
    Decimal,
    Extrema,
    integerDivide,
    Max,
    max,
    Min,
    min,
    ONE,
    Prime,
    Range,
    Sopfr,
    PrimeCount,
} from "@sagittal/general"
import { PrimeCountRangeOptions } from "./types"

const computePrimeCountRange = (prime: Prime, options: PrimeCountRangeOptions = {}): Range<PrimeCount> => {
    const {
        max23FreeSopfr = Infinity as Sopfr<{ rough: 5 }>,
        max23FreeCopfr = Infinity as Copfr<{ rough: 5 }>,
        primeCountExtremaGivenMaxN2D3P9,
    } = options

    if (max23FreeSopfr === Infinity && max23FreeCopfr === Infinity && !primeCountExtremaGivenMaxN2D3P9) {
        throw new Error("The range must be constrained somehow.")
    }

    const [minPrimeCountGivenMaxN2D3P9, maxPrimeCountGivenMaxN2D3P9]: Extrema<{
        of: PrimeCount
    }> =
        primeCountExtremaGivenMaxN2D3P9 ||
        ([-Infinity, Infinity] as Extrema<{
            of: PrimeCount
        }>)

    const maxPrimeCountGivenMaxSopfr: Max<PrimeCount> = integerDivide(
        max23FreeSopfr,
        prime,
    ) as number as Max<PrimeCount>
    const maxPrimeCountGivenMaxCopfr: Max<PrimeCount> = max23FreeCopfr as number as Max<PrimeCount>

    const minPrimeCountGivenMaxSopfr: Min<PrimeCount> = -maxPrimeCountGivenMaxSopfr as Min<PrimeCount>
    const minPrimeCountGivenMaxCopfr: Min<PrimeCount> = -max23FreeCopfr as Min<PrimeCount>

    const maxPrimeCount: Min<Max<PrimeCount>> = min(
        maxPrimeCountGivenMaxSopfr,
        maxPrimeCountGivenMaxN2D3P9,
        maxPrimeCountGivenMaxCopfr,
    )

    const minPrimeCount: Max<Min<PrimeCount>> = max(
        minPrimeCountGivenMaxSopfr,
        minPrimeCountGivenMaxN2D3P9,
        minPrimeCountGivenMaxCopfr,
    )

    return computeRange(
        minPrimeCount as PrimeCount as Decimal<{ integer: true }> & PrimeCount,
        add(maxPrimeCount, ONE as number) as Decimal<{ integer: true }> & PrimeCount,
    )
}

export { computePrimeCountRange }