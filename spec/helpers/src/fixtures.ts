import {
    Abs,
    Cents,
    Comma,
    Copfr,
    Decimal,
    EMPTY_PEV,
    Index,
    Max,
    Pev,
    Name,
    Prime,
    Quotient,
    Spev,
    Sopfr,
    Two3FreeClass,
    two3FreeClassFixture,
} from "@sagittal/general"
import {
    ApotomeSlope,
    Ate,
    CommaAnalysis,
    JiPitchAnalysis,
    N2D3P9,
    PotentiallyCommaAnalysis,
    SizeCategory,
    Two3FreeClassAnalysis,
} from "@sagittal/system"

const two3FreeClassAnalysisFixture: Two3FreeClassAnalysis = {
    two3FreeClass: two3FreeClassFixture,
    name: "" as Name<Two3FreeClass>,
    two3FreePrimeLimit: 1 as Max<Prime<{rough: 5}>>,
    two3FreeCopfr: 0 as Copfr<{rough: 5}>,
    two3FreeSopfr: 0 as Sopfr<{rough: 5}>,
    n2d3p9: 1 as N2D3P9,
}

const jiPitchFixture: Spev<{rational: true}> = {
    pev: EMPTY_PEV,
} as Spev<{rational: true}>

const jiPitchAnalysisFixture: JiPitchAnalysis = {
    pitch: jiPitchFixture,
    cents: 0 as Cents,
    decimal: 1 as Decimal<{rational: true}>,
    pev: [] as unknown[] as Pev<{rational: true}>,
    quotient: [1, 1] as Quotient<{rational: true}>,
    apotomeSlope: 0 as ApotomeSlope,
    aas: 0 as Abs<ApotomeSlope>,
    ate: 0 as Ate,
    two3FreeClassAnalysis: two3FreeClassAnalysisFixture,
}

const commaFixture: Comma = {
    pev: EMPTY_PEV,
} as Comma

const commaAnalysisFixture: CommaAnalysis = {
    ...jiPitchAnalysisFixture,
    pitch: commaFixture,
    name: "" as Name<Comma>,
    sizeCategory: 0 as Index<SizeCategory>,
}

const potentiallyCommaAnalysisFixture: PotentiallyCommaAnalysis = {
    ...jiPitchAnalysisFixture,
    name: undefined,
    sizeCategory: undefined,
}

export {
    jiPitchFixture,
    jiPitchAnalysisFixture,
    two3FreeClassAnalysisFixture,
    commaFixture,
    commaAnalysisFixture,
    potentiallyCommaAnalysisFixture,
}
