import {areSpevsEqual, Comma, computeSuperSpev, formatPitch, isSpevGreater, Pev} from "@sagittal/general"
import {
    computeCommasFrom23FreeRationalPev,
    DEFAULT_LOWER_BOUND,
    DEFAULT_MAX_AAS,
    DEFAULT_MAX_ATE,
    DEFAULT_MAX_N2D3P9,
    DEFAULT_UPPER_BOUND,
    DEFAULT_ZONE,
    MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
    MAX_SIZE_CATEGORY_BOUND,
} from "@sagittal/system"
import {compute23FreeRationalPevsToCheckFromKnownLowN2D3P9Numerators} from "./knownNumerators"
import {compute23FreeRationalPevsToCheck} from "./two3FreePevsToCheck"
import {FindCommasOptions} from "./types"

const findCommas = (options: Partial<FindCommasOptions>): Comma[] => {
    const {
        zone = DEFAULT_ZONE,
        max23FreeSopfr,
        max23FreeCopfr,
        maxAte = DEFAULT_MAX_ATE,
        maxPrimeLimit,
        maxAas = DEFAULT_MAX_AAS,
        maxN2D3P9 = DEFAULT_MAX_N2D3P9,
    } = options

    const {extrema: [lowerBound = DEFAULT_LOWER_BOUND, upperBound = DEFAULT_UPPER_BOUND]} = zone

    if (isSpevGreater(lowerBound, upperBound) || areSpevsEqual(lowerBound, upperBound)) {
        throw new Error(`Lower bound is not less than upper bound; range was ${formatPitch(lowerBound)} - ${formatPitch(upperBound)}.`)
    }

    if (
        isSpevGreater(computeSuperSpev(upperBound), MAX_SIZE_CATEGORY_BOUND.pitch) ||
        isSpevGreater(computeSuperSpev(lowerBound), MAX_SIZE_CATEGORY_BOUND.pitch)
    ) {
        throw new Error(`Search range must be within comma size category bounds (±227.370¢); range was ${formatPitch(lowerBound)} - ${formatPitch(upperBound)}.`)
    }

    let commas: Comma[] = []

    const two3FreeRationalPevsToCheck = maxN2D3P9 > MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN ?
        compute23FreeRationalPevsToCheck({
            maxPrimeLimit,
            max23FreeSopfr,
            max23FreeCopfr,
            maxN2D3P9,
        }) :
        compute23FreeRationalPevsToCheckFromKnownLowN2D3P9Numerators({
            maxPrimeLimit,
            max23FreeSopfr,
            max23FreeCopfr,
            maxN2D3P9,
        })

    two3FreeRationalPevsToCheck.forEach((two3FreeRationalPevToCheck: Pev<{rational: true, rough: 5}>): void => {
        commas = commas.concat(
            computeCommasFrom23FreeRationalPev(
                two3FreeRationalPevToCheck,
                {
                    zone,
                    maxAas,
                    maxAte,
                    maxN2D3P9,
                    maxPrimeLimit,
                },
            ),
        )
    })

    return commas
}

export {
    findCommas,
}
