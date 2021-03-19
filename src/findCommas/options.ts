import {Abs, Copfr, Exclusive, Extrema, Max, Min, Prime, program, Spev, Sopfr} from "@sagittal/general"
import {ApotomeSlope, Ate, JiPitchAnalysis, N2D3P9} from "@sagittal/system"
import {DEFAULT_FIND_COMMAS_OPTIONS} from "./constants"
import {FindCommasOptions} from "./types"

const computeFindCommasOptions = (
    defaultOverrides: Partial<FindCommasOptions> = {},
): FindCommasOptions => {
    const max23FreeSopfr = program.max23FreeSopfr ||
        defaultOverrides.max23FreeSopfr ||
        DEFAULT_FIND_COMMAS_OPTIONS.max23FreeSopfr
    const max23FreeCopfr = program.max23FreeCopfr ||
        defaultOverrides.max23FreeCopfr ||
        DEFAULT_FIND_COMMAS_OPTIONS.max23FreeCopfr
    const maxPrimeLimit: Max<Max<Prime>> = program.maxPrimeLimit ||
        defaultOverrides.maxPrimeLimit ||
        DEFAULT_FIND_COMMAS_OPTIONS.maxPrimeLimit
    const maxN2D3P9: Max<N2D3P9> = program.maxN2d3p9 ||
        defaultOverrides.maxN2D3P9 ||
        DEFAULT_FIND_COMMAS_OPTIONS.maxN2D3P9
    const maxAas: Max<Abs<ApotomeSlope>> = program.maxAas ||
        defaultOverrides.maxAas ||
        DEFAULT_FIND_COMMAS_OPTIONS.maxAas
    const maxAte: Max<Ate> = program.maxAte ||
        defaultOverrides.maxAte ||
        DEFAULT_FIND_COMMAS_OPTIONS.maxAte

    const lowerBound: Min<Spev> = program.lowerBound ||
        defaultOverrides.zone?.extrema[0] ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone?.extrema[0]
    const upperBound: Max<Spev> = program.upperBound ||
        defaultOverrides.zone?.extrema[1] ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone?.extrema[1]
    const exclusive: Exclusive = program.exclusive ||
        defaultOverrides.zone?.exclusive ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone!.exclusive!
    const zone = {extrema: [lowerBound, upperBound] as Extrema<{of: Spev, open: true}>, exclusive}

    return {max23FreeSopfr, max23FreeCopfr, maxPrimeLimit, maxN2D3P9, zone, maxAas, maxAte}
}

const computeFindNotatingCommasOptions = ({ate, aas, two3FreeClassAnalysis}: JiPitchAnalysis): FindCommasOptions => {
    const findCommasOptions = computeFindCommasOptions()

    if (aas > findCommasOptions.maxAas) {
        findCommasOptions.maxAas = aas as Max<Abs<ApotomeSlope>>
    }

    if (ate > findCommasOptions.maxAte) {
        findCommasOptions.maxAte = ate as Max<Ate>
    }

    const {n2d3p9, two3FreePrimeLimit, two3FreeCopfr, two3FreeSopfr} = two3FreeClassAnalysis
    if (n2d3p9 > findCommasOptions.maxN2D3P9) {
        findCommasOptions.maxN2D3P9 = n2d3p9 as Max<N2D3P9>
    }
    if (two3FreePrimeLimit > findCommasOptions.maxPrimeLimit) {
        findCommasOptions.maxPrimeLimit = two3FreePrimeLimit as Max<Max<Prime>>
    }
    if (two3FreeCopfr > findCommasOptions.max23FreeCopfr) {
        findCommasOptions.max23FreeCopfr = two3FreeCopfr as Max<Copfr<{rough: 5}>>
    }
    if (two3FreeSopfr > findCommasOptions.max23FreeSopfr) {
        findCommasOptions.max23FreeSopfr = two3FreeSopfr as Max<Sopfr<{rough: 5}>>
    }

    return findCommasOptions
}

export {
    computeFindCommasOptions,
    computeFindNotatingCommasOptions,
}
