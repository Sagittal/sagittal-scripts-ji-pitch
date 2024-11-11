import { Copfr, Extrema, Max, Prime, PrimeCount, Rough, Sopfr } from "@sagittal/general"
import { CommaNameOptions, CommasFrom23FreeVectorOptions } from "@sagittal/system"

interface FindCommasOptions extends Required<CommasFrom23FreeVectorOptions>, Required<CommaNameOptions> {
    maxPrimeLimit: Max<Max<Prime>>
    max23FreeCopfr: Max<Copfr<Rough<5>>>
    max23FreeSopfr: Max<Sopfr<Rough<5>>>
}

type PrimeCountRangeOptions = Partial<{
    max23FreeCopfr: Max<Copfr<Rough<5>>>
    max23FreeSopfr: Max<Sopfr<Rough<5>>>
    primeCountExtremaGivenMaxN2D3P9: Extrema<{
        of: PrimeCount
    }>
}>

type Two3FreePrimesToCheckOptions = Partial<{
    maxPrimeLimit: Max<Max<Prime>>
    max23FreeSopfr: Max<Sopfr<Rough<5>>>
    primeCountExtremasGivenMaxN2D3P9: Extrema<{ of: PrimeCount }>[]
}>

export { PrimeCountRangeOptions, Two3FreePrimesToCheckOptions, FindCommasOptions }
