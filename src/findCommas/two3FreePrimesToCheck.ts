import {
    computeLesserPrimeCount,
    computePrimes,
    indexOfFinalElement,
    isUndefined,
    min,
    Prime,
    ZERO_ONE_INDEX_DIFF,
} from "@sagittal/general"
import { Two3FreePrimesToCheckOptions } from "./types"

const compute23FreePrimesToCheck = (options: Two3FreePrimesToCheckOptions): Prime[] => {
    const { maxPrimeLimit, max23FreeSopfr, primeCountExtremasGivenMaxN2D3P9 } = options

    if (
        isUndefined(maxPrimeLimit) &&
        isUndefined(max23FreeSopfr) &&
        isUndefined(primeCountExtremasGivenMaxN2D3P9)
    ) {
        throw new Error("The maximum prime must be constrained somehow.")
    }

    const indexOfMaxPrimeByPrimeLimit = !isUndefined(maxPrimeLimit)
        ? computeLesserPrimeCount(maxPrimeLimit) - ZERO_ONE_INDEX_DIFF
        : Infinity
    const indexOfMaxPrimeBy23FreeSopfr = !isUndefined(max23FreeSopfr)
        ? computeLesserPrimeCount(max23FreeSopfr) - ZERO_ONE_INDEX_DIFF
        : Infinity
    const indexOfMaxPrimeByN2D3P9 = !isUndefined(primeCountExtremasGivenMaxN2D3P9)
        ? indexOfFinalElement(primeCountExtremasGivenMaxN2D3P9)
        : Infinity

    const indexOfMaxPrime = min(
        indexOfMaxPrimeByPrimeLimit,
        indexOfMaxPrimeBy23FreeSopfr,
        indexOfMaxPrimeByN2D3P9,
    )

    return computePrimes().slice(2, indexOfMaxPrime + 1)
}

export { compute23FreePrimesToCheck }
