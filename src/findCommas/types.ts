import { Copfr, Extrema, Max, Prime, PrimeCount, Sopfr } from "@sagittal/general"
import { CommasFrom23FreeVectorOptions } from "@sagittal/system"

interface FindCommasOptions extends Required<CommasFrom23FreeVectorOptions> {
    maxPrimeLimit: Max<Max<Prime>>
    max23FreeCopfr: Max<Copfr<{ rough: 5 }>>
    max23FreeSopfr: Max<Sopfr<{ rough: 5 }>>
}

type PrimeCountRangeOptions = Partial<{
    max23FreeCopfr: Max<Copfr<{ rough: 5 }>>
    max23FreeSopfr: Max<Sopfr<{ rough: 5 }>>
    primeCountExtremaGivenMaxN2D3P9: Extrema<{
        of: PrimeCount
    }>
}>

type Two3FreePrimesToCheckOptions = Partial<{
    maxPrimeLimit: Max<Max<Prime>>
    max23FreeSopfr: Max<Sopfr<{ rough: 5 }>>
    primeCountExtremasGivenMaxN2D3P9: Array<Extrema<{ of: PrimeCount }>>
}>

export { PrimeCountRangeOptions, Two3FreePrimesToCheckOptions, FindCommasOptions }
