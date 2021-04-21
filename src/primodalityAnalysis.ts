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
} from "@sagittal/general"
import {subtractPevs} from "@sagittal/general/dist/cjs/math"

// const P = 32 as Decimal<{integer: true}> & Denominator

const wholeThing = (p: Decimal<{integer: true}> & Denominator): void => {
    const primodalityNumerators: Array<Decimal<{integer: true}> & Numerator> = computeRange(
        p + 1 as Decimal<{integer: true}> & Numerator,
        2 * p + 1 as Decimal<{integer: true}> & Numerator,
    )
    // console.log(primodalityNumerators)

    const primodalityQuotients: Array<Quotient<{rational: true}>> = primodalityNumerators.map(
        (primodalityNumerator: Decimal<{integer: true}> & Numerator): Quotient<{rational: true}> => {
            return [primodalityNumerator, p] as Quotient<{rational: true}>
        })
    // console.log(primodalityQuotients)

    const primodalityPevs: Array<Pev<{rational: true}>> =
        primodalityQuotients.map(computeRationalPevFromRationalQuotient)
    // console.log(primodalityPevs)

    const primodalityIntervalPevs: Array<Pev<{rational: true}>> = []
    for (let i = 0; i < primodalityPevs.length; i++) {
        for (let j = i + 1; j < primodalityPevs.length; j++) {
            // for (let j = i + 1; j < primodalityPevs.length; j++) {
            const basePev = primodalityPevs[i]
            // const targetPev = primodalityPevs[primodalityPevs.length - 1]
            const targetPev = primodalityPevs[j]
            const primodalityDyad = subtractPevs(targetPev, basePev)

            primodalityIntervalPevs.push(primodalityDyad)
        }
        // }
    }

    let totalMetric = 0
    primodalityIntervalPevs.forEach((primodalityIntervalPev: Pev<{rational: true}>): void => {
        const quotient = computeQuotientFromPev(primodalityIntervalPev)
        // const copfr = computeRationalPevCopfr(primodalityIntervalPev)
        const sopfr = computeRationalPevSopfr(primodalityIntervalPev)
        // const n2d3p9 = computeN2D3P9(compute23FreeClass({pev: primodalityIntervalPev}))
        // console.log(quotient, copfr)
        totalMetric += sopfr
    })
    console.log(`${p}: ${totalMetric / primodalityIntervalPevs.length}`)
}

for (let p = 2; p < 64; p++) {
    wholeThing(p)
}
