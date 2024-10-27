import {
    computeQuotientFromVector,
    computeRange,
    computeRationalVectorFromRationalQuotient,
    computeRationalVectorSopfr,
    Decimal,
    Denominator,
    Numerator,
    Vector,
    Quotient,
    saveLog,
    subtractVectors,
} from "@sagittal/general"

const wholeThing = (p: Decimal<{ integer: true }> & Denominator): void => {
    const primodalityNumerators: Array<Decimal<{ integer: true }> & Numerator> = computeRange(
        (p + 1) as Decimal<{ integer: true }> & Numerator,
        (2 * p + 1) as Decimal<{ integer: true }> & Numerator,
    )

    const primodalityQuotients: Array<Quotient<{ rational: true }>> = primodalityNumerators.map(
        (
            primodalityNumerator: Decimal<{ integer: true }> & Numerator,
        ): Quotient<{ rational: true }> => {
            return [primodalityNumerator, p] as Quotient<{ rational: true }>
        },
    )

    const primodalityVectors: Array<Vector<{ rational: true }>> = primodalityQuotients.map(
        computeRationalVectorFromRationalQuotient,
    )

    const primodalityIntervalVectors: Array<Vector<{ rational: true }>> = []
    for (let i = 0; i < primodalityVectors.length; i++) {
        for (let j = i + 1; j < primodalityVectors.length; j++) {
            const baseVector = primodalityVectors[i]
            const targetVector = primodalityVectors[j]
            const primodalityDyad = subtractVectors(targetVector, baseVector)

            primodalityIntervalVectors.push(primodalityDyad)
        }
    }

    let totalMetric = 0
    primodalityIntervalVectors.forEach(
        (primodalityIntervalVector: Vector<{ rational: true }>): void => {
            const quotient = computeQuotientFromVector(primodalityIntervalVector)
            const sopfr = computeRationalVectorSopfr(primodalityIntervalVector)
            totalMetric += sopfr
        },
    )
    saveLog(`${p}: ${totalMetric / primodalityIntervalVectors.length}`)
}

for (
    let p: Decimal<{ integer: true }> & Denominator = 2 as Decimal<{
        integer: true
    }> &
        Denominator;
    p < 64;
    p++
) {
    wholeThing(p)
}
