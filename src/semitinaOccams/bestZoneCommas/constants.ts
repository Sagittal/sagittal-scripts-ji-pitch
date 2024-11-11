import {
    computeRange,
    Decimal,
    Index,
    Integer,
    Max,
    ONE,
    Prime,
    Quotient,
    scaleScaledVector,
    ScaledVector,
    Irrational,
} from "@sagittal/general"
import { SEMITINA } from "../constants"
import { Semitina } from "../types"

const SEMITINA_ZONES: Index<Semitina>[] = computeRange(
    810 as Decimal<Integer>,
) as number[] as Index<Semitina>[]
const SEMITINA_PLUS_MINUS_RANGE = 0.5
const MAX_SIZE_PER_SEMITINA_ZONE: ScaledVector<Irrational>[] = SEMITINA_ZONES.map(
    (semitinaZone: Index<Semitina>): ScaledVector<Irrational> => {
        return scaleScaledVector(SEMITINA, [semitinaZone + SEMITINA_PLUS_MINUS_RANGE, ONE] as Quotient)
    },
)

const MAX_PRIME_LIMIT_OF_ANY_SEMITINA_BUCKET_BEST_COMMA = 233 as Max<Max<Prime>>

export {
    SEMITINA_ZONES,
    SEMITINA_PLUS_MINUS_RANGE,
    MAX_SIZE_PER_SEMITINA_ZONE,
    MAX_PRIME_LIMIT_OF_ANY_SEMITINA_BUCKET_BEST_COMMA,
}
