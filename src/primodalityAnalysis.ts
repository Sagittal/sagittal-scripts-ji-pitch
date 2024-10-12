import {
    computeQuotientFromPev,
    computeRange,
    computeRationalPevFromRationalQuotient,
    computeRationalPevSopfr,
    Decimal,
    Denominator,
    Numerator,
    Pev,
    Quotient,
    saveLog,
    subtractPevs,
} from "@sagittal/general"

const wholeThing = (p: Decimal<{ integer: true }> & Denominator): void => {
    const primodalityNumerators: Array<Decimal<{ integer: true }> & Numerator> =
        computeRange(
            (p + 1) as Decimal<{ integer: true }> & Numerator,
            (2 * p + 1) as Decimal<{ integer: true }> & Numerator,
        )

    const primodalityQuotients: Array<Quotient<{ rational: true }>> =
        primodalityNumerators.map(
            (
                primodalityNumerator: Decimal<{ integer: true }> & Numerator,
            ): Quotient<{ rational: true }> => {
                return [primodalityNumerator, p] as Quotient<{ rational: true }>
            },
        )

    const primodalityPevs: Array<Pev<{ rational: true }>> =
        primodalityQuotients.map(computeRationalPevFromRationalQuotient)

    const primodalityIntervalPevs: Array<Pev<{ rational: true }>> = []
    for (let i = 0; i < primodalityPevs.length; i++) {
        for (let j = i + 1; j < primodalityPevs.length; j++) {
            const basePev = primodalityPevs[i]
            const targetPev = primodalityPevs[j]
            const primodalityDyad = subtractPevs(targetPev, basePev)

            primodalityIntervalPevs.push(primodalityDyad)
        }
    }

    let totalMetric = 0
    primodalityIntervalPevs.forEach(
        (primodalityIntervalPev: Pev<{ rational: true }>): void => {
            const quotient = computeQuotientFromPev(primodalityIntervalPev)
            const sopfr = computeRationalPevSopfr(primodalityIntervalPev)
            totalMetric += sopfr
        },
    )
    saveLog(`${p}: ${totalMetric / primodalityIntervalPevs.length}`)
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
