import {
    computeQuotientFromVector,
    computeRange,
    computeRationalVectorFromRationalQuotient,
    computeRationalVectorSopfr,
    Denominator,
    Numerator,
    Vector,
    Quotient,
    saveLog,
    subtractVectors,
} from "@sagittal/general"

const wholeThing = (p: Denominator): void => {
    const primodalityNumerators: Numerator[] = computeRange((p + 1) as Numerator, (2 * p + 1) as Numerator)

    const primodalityQuotients: Quotient[] = primodalityNumerators.map(
        (primodalityNumerator: Numerator): Quotient => {
            return [primodalityNumerator, p] as Quotient
        },
    )

    const primodalityVectors: Vector[] = primodalityQuotients.map(computeRationalVectorFromRationalQuotient)

    const primodalityIntervalVectors: Vector[] = []
    for (let i = 0; i < primodalityVectors.length; i++) {
        for (let j = i + 1; j < primodalityVectors.length; j++) {
            const baseVector = primodalityVectors[i]
            const targetVector = primodalityVectors[j]
            const primodalityDyad = subtractVectors(targetVector, baseVector)

            primodalityIntervalVectors.push(primodalityDyad)
        }
    }

    let totalMetric = 0
    primodalityIntervalVectors.forEach((primodalityIntervalVector: Vector): void => {
        const quotient = computeQuotientFromVector(primodalityIntervalVector)
        const sopfr = computeRationalVectorSopfr(primodalityIntervalVector)
        totalMetric += sopfr
    })
    saveLog(`${p}: ${totalMetric / primodalityIntervalVectors.length}`)
}

for (let p: Denominator = 2 as Denominator; p < 64; p++) {
    wholeThing(p)
}
