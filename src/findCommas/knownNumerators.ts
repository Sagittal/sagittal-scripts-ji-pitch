import {
    computeRationalVectorCopfr,
    computeRationalVectorFromRationalQuotient,
    computeRationalVectorSmoothness,
    computeRationalVectorSopfr,
    EMPTY_VECTOR,
    invertVector,
    isUndefined,
    Rational,
    Rough,
    Vector,
} from "@sagittal/general"
import {
    computeKnownRationalQuotients,
    MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
} from "@sagittal/system"
import { FindCommasOptions } from "./types"

const compute23FreeRationalVectorsToCheckFromKnownLowN2D3P9Numerators = (
    options: Partial<FindCommasOptions> = {},
): Vector<Rational & Rough<5>>[] => {
    const {
        maxPrimeLimit,
        max23FreeSopfr,
        max23FreeCopfr,
        maxN2D3P9 = MAX_N2D3P9_FOR_WHICH_POSSIBLE_NUMERATORS_ARE_KNOWN,
    } = options

    const vectorsToCheck: Vector<Rational & Rough<5>>[] = [
        EMPTY_VECTOR as Vector<Rational & Rough<5>>,
    ] as Vector<Rational & Rough<5>>[]
    computeKnownRationalQuotients(maxN2D3P9)
        .map(computeRationalVectorFromRationalQuotient)
        .forEach((rationalVector: Vector<Rational & Rough<5>>): void => {
            vectorsToCheck.push(rationalVector)
            vectorsToCheck.push(invertVector(rationalVector))
        })

    return vectorsToCheck.filter((vectorToCheck: Vector<Rational & Rough<5>>): boolean => {
        if (!isUndefined(max23FreeSopfr) && computeRationalVectorSopfr(vectorToCheck) > max23FreeSopfr) {
            return false
        }
        if (!isUndefined(max23FreeCopfr) && computeRationalVectorCopfr(vectorToCheck) > max23FreeCopfr) {
            return false
        }
        return !(
            !isUndefined(maxPrimeLimit) && computeRationalVectorSmoothness(vectorToCheck) > maxPrimeLimit
        )
    })
}

export { compute23FreeRationalVectorsToCheckFromKnownLowN2D3P9Numerators }
