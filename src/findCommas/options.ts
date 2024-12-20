import {
    Abs,
    Copfr,
    Exclusive,
    Extrema,
    Max,
    Min,
    Prime,
    program,
    Sopfr,
    ScaledVector,
    Rough,
} from "@sagittal/general"
import {
    ApotomeSlope,
    Ate,
    DirectedNumbers,
    DirectedWord,
    FactoringMode,
    JiPitchAnalysis,
    N2D3P9,
} from "@sagittal/system"
import { DEFAULT_FIND_COMMAS_OPTIONS } from "./constants"
import { FindCommasOptions } from "./types"

const computeFindCommasOptions = (defaultOverrides: Partial<FindCommasOptions> = {}): FindCommasOptions => {
    const programOpts: {
        max23FreeSopfr: Max<Sopfr<Rough<5>>>
        max23FreeCopfr: Max<Copfr<Rough<5>>>
        maxPrimeLimit: Max<Max<Prime>>
        maxN2d3p9: Max<N2D3P9>
        maxAas: Max<Abs<ApotomeSlope>>
        maxAte: Max<Ate>
        lowerBound: Min<ScaledVector>
        upperBound: Max<ScaledVector>
        exclusive: Exclusive
        directedNumbers: DirectedNumbers
        directedWord: DirectedWord
        factoringMode: FactoringMode
        abbreviated: boolean
        ascii: boolean
    } = program.opts()

    const max23FreeSopfr =
        programOpts.max23FreeSopfr ||
        defaultOverrides.max23FreeSopfr ||
        DEFAULT_FIND_COMMAS_OPTIONS.max23FreeSopfr
    const max23FreeCopfr =
        programOpts.max23FreeCopfr ||
        defaultOverrides.max23FreeCopfr ||
        DEFAULT_FIND_COMMAS_OPTIONS.max23FreeCopfr
    const maxPrimeLimit: Max<Max<Prime>> =
        programOpts.maxPrimeLimit ||
        defaultOverrides.maxPrimeLimit ||
        DEFAULT_FIND_COMMAS_OPTIONS.maxPrimeLimit
    const maxN2D3P9: Max<N2D3P9> =
        programOpts.maxN2d3p9 || defaultOverrides.maxN2D3P9 || DEFAULT_FIND_COMMAS_OPTIONS.maxN2D3P9
    const maxAas: Max<Abs<ApotomeSlope>> =
        programOpts.maxAas || defaultOverrides.maxAas || DEFAULT_FIND_COMMAS_OPTIONS.maxAas
    const maxAte: Max<Ate> =
        programOpts.maxAte || defaultOverrides.maxAte || DEFAULT_FIND_COMMAS_OPTIONS.maxAte

    const lowerBound: Min<ScaledVector> =
        programOpts.lowerBound ||
        defaultOverrides.zone?.extrema[0] ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone?.extrema[0]
    const upperBound: Max<ScaledVector> =
        programOpts.upperBound ||
        defaultOverrides.zone?.extrema[1] ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone?.extrema[1]
    const exclusive: Exclusive =
        programOpts.exclusive ||
        defaultOverrides.zone?.exclusive ||
        DEFAULT_FIND_COMMAS_OPTIONS.zone.exclusive!
    const zone = {
        extrema: [lowerBound, upperBound] as Extrema<{ of: ScaledVector; open: true }>,
        exclusive,
    }

    const directedNumbers: DirectedNumbers =
        programOpts.directedNumbers ||
        defaultOverrides.directedNumbers ||
        DEFAULT_FIND_COMMAS_OPTIONS.directedNumbers
    const directedWord: DirectedWord =
        programOpts.directedWord || defaultOverrides.directedWord || DEFAULT_FIND_COMMAS_OPTIONS.directedWord
    const factoringMode: FactoringMode =
        programOpts.factoringMode ||
        defaultOverrides.factoringMode ||
        DEFAULT_FIND_COMMAS_OPTIONS.factoringMode
    const abbreviated: boolean =
        programOpts.abbreviated || defaultOverrides.abbreviated || DEFAULT_FIND_COMMAS_OPTIONS.abbreviated
    const ascii: boolean = programOpts.ascii || defaultOverrides.ascii || DEFAULT_FIND_COMMAS_OPTIONS.ascii

    return {
        max23FreeSopfr,
        max23FreeCopfr,
        maxPrimeLimit,
        maxN2D3P9,
        zone,
        maxAas,
        maxAte,
        directedNumbers,
        directedWord,
        factoringMode,
        abbreviated,
        ascii,
    }
}

const computeFindNotatingCommasOptions = ({
    ate,
    aas,
    two3FreeClassAnalysis,
}: JiPitchAnalysis): FindCommasOptions => {
    const findCommasOptions = computeFindCommasOptions()

    if (aas > findCommasOptions.maxAas) {
        findCommasOptions.maxAas = aas as Max<Abs<ApotomeSlope>>
    }

    if (ate > findCommasOptions.maxAte) {
        findCommasOptions.maxAte = ate as Max<Ate>
    }

    const { n2d3p9, two3FreePrimeLimit, two3FreeCopfr, two3FreeSopfr } = two3FreeClassAnalysis
    if (n2d3p9 > findCommasOptions.maxN2D3P9) {
        findCommasOptions.maxN2D3P9 = n2d3p9 as Max<N2D3P9>
    }
    if (two3FreePrimeLimit > findCommasOptions.maxPrimeLimit) {
        findCommasOptions.maxPrimeLimit = two3FreePrimeLimit as Max<Max<Prime>>
    }
    if (two3FreeCopfr > findCommasOptions.max23FreeCopfr) {
        findCommasOptions.max23FreeCopfr = two3FreeCopfr as Max<Copfr<Rough<5>>>
    }
    if (two3FreeSopfr > findCommasOptions.max23FreeSopfr) {
        findCommasOptions.max23FreeSopfr = two3FreeSopfr as Max<Sopfr<Rough<5>>>
    }

    return findCommasOptions
}

export { computeFindCommasOptions, computeFindNotatingCommasOptions }
