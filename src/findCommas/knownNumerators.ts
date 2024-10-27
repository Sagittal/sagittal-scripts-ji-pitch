import {
    computeRationalVectorCopfr,
    computeRationalVectorFromRationalQuotient,
    computeRationalVectorSmoothness,
    computeRationalVectorSopfr,
    EMPTY_VECTOR,
    invertVector,
    isUndefined,
    Vector,
} from "@sagittal/general"
import {
    computeKnownRationalQuotients,
    MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
} from "@sagittal/system"
import { FindCommasOptions } from "./types"

const compute23FreeRationalVectorsToCheckFromKnownLowN2D3P9Numerators = (
    options: Partial<FindCommasOptions> = {},
): Array<Vector<{ rational: true; rough: 5 }>> => {
    const {
        maxPrimeLimit,
        max23FreeSopfr,
        max23FreeCopfr,
        maxN2D3P9 = MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
    } = options

    const vectorsToCheck: Array<Vector<{ rational: true; rough: 5 }>> = [
        EMPTY_VECTOR as Vector<{ rational: true; rough: 5 }>,
    ] as Array<Vector<{ rational: true; rough: 5 }>>
    computeKnownRationalQuotients(maxN2D3P9)
        .map(computeRationalVectorFromRationalQuotient)
        .forEach((rationalVector: Vector<{ rational: true; rough: 5 }>): void => {
            vectorsToCheck.push(rationalVector)
            vectorsToCheck.push(invertVector(rationalVector))
        })

    return vectorsToCheck.filter((vectorToCheck: Vector<{ rational: true; rough: 5 }>): boolean => {
        if (
            !isUndefined(max23FreeSopfr) &&
            computeRationalVectorSopfr(vectorToCheck) > max23FreeSopfr
        ) {
            return false
        }
        if (
            !isUndefined(max23FreeCopfr) &&
            computeRationalVectorCopfr(vectorToCheck) > max23FreeCopfr
        ) {
            return false
        }
        return !(
            !isUndefined(maxPrimeLimit) &&
            computeRationalVectorSmoothness(vectorToCheck) > maxPrimeLimit
        )
    })
}

export { compute23FreeRationalVectorsToCheckFromKnownLowN2D3P9Numerators }
