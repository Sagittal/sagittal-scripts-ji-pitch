import {
    computeRationalPevCopfr,
    computeRationalPevFromRationalQuotient,
    computeRationalPevSmoothness,
    computeRationalPevSopfr,
    EMPTY_PEV,
    invertPev,
    isUndefined,
    Pev,
} from "@sagittal/general"
import {computeKnownRationalQuotients, MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN} from "@sagittal/system"
import {FindCommasOptions} from "./types"

const compute23FreeRationalPevsToCheckFromKnownLowN2D3P9Numerators = (
    options: Partial<FindCommasOptions> = {},
): Array<Pev<{rational: true, rough: 5}>> => {
    const {
        maxPrimeLimit,
        max23FreeSopfr,
        max23FreeCopfr,
        maxN2D3P9 = MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
    } = options

    const pevsToCheck: Array<Pev<{rational: true, rough: 5}>> = [
        EMPTY_PEV as Pev<{rational: true, rough: 5}>,
    ] as Array<Pev<{rational: true, rough: 5}>>
    computeKnownRationalQuotients(maxN2D3P9)
        .map(computeRationalPevFromRationalQuotient)
        .forEach((rationalPev: Pev<{rational: true, rough: 5}>): void => {
            pevsToCheck.push(rationalPev)
            pevsToCheck.push(invertPev(rationalPev))
        })

    return pevsToCheck.filter((pevToCheck: Pev<{rational: true, rough: 5}>): boolean => {
        if (!isUndefined(max23FreeSopfr) && computeRationalPevSopfr(pevToCheck) > max23FreeSopfr) {
            return false
        }
        if (!isUndefined(max23FreeCopfr) && computeRationalPevCopfr(pevToCheck) > max23FreeCopfr) {
            return false
        }
        return !(!isUndefined(maxPrimeLimit) && computeRationalPevSmoothness(pevToCheck) > maxPrimeLimit)
    })
}

export {
    compute23FreeRationalPevsToCheckFromKnownLowN2D3P9Numerators,
}
