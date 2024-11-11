import {
    add,
    Cents,
    computePitchFromCents,
    Copfr,
    Exclusive,
    Extrema,
    Irrational,
    Max,
    Min,
    Rough,
    ScaledVector,
    subtract,
} from "@sagittal/general"
import { computeCentsFromTinas, Tinas } from "@sagittal/system"
import { Zone } from "@sagittal/system/dist/cjs/ji"

const INFINITE_2_3_FREE_COPFR = Infinity as Max<Copfr<Rough<5>>>

const TINAS_TO_CHECK: Tinas[] = [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
] as Tinas[]
const TINA_COMMAS_PLUS_MINUS_RANGE: Tinas = 0.25 as Tinas

const TINA_COMMAS_LOWER_BOUND = computePitchFromCents(
    computeCentsFromTinas(subtract(TINAS_TO_CHECK[0], TINA_COMMAS_PLUS_MINUS_RANGE)),
) as Min<ScaledVector<Irrational>>
const TINA_COMMAS_UPPER_BOUND = computePitchFromCents(
    computeCentsFromTinas(add(TINAS_TO_CHECK[TINAS_TO_CHECK.length - 1], TINA_COMMAS_PLUS_MINUS_RANGE)),
) as Max<ScaledVector<Irrational>>

const MAX_TINA_SIZES: Cents[] = TINAS_TO_CHECK.map(
    (tina: Tinas): Cents => computeCentsFromTinas(add(tina, TINA_COMMAS_PLUS_MINUS_RANGE)),
)

const TINA_COMMAS_EXTREMA: [Min<ScaledVector<Irrational>>, Max<ScaledVector<Irrational>>] = [
    TINA_COMMAS_LOWER_BOUND,
    TINA_COMMAS_UPPER_BOUND,
]
const TINA_COMMAS_EXCLUSIVE: Exclusive = true
const TINA_COMMAS_ZONE: Zone = {
    extrema: TINA_COMMAS_EXTREMA as unknown as Extrema<{
        of: ScaledVector
        open: true
    }>,
    exclusive: TINA_COMMAS_EXCLUSIVE,
}

export {
    INFINITE_2_3_FREE_COPFR,
    TINAS_TO_CHECK,
    TINA_COMMAS_LOWER_BOUND,
    TINA_COMMAS_UPPER_BOUND,
    TINA_COMMAS_ZONE,
    TINA_COMMAS_PLUS_MINUS_RANGE,
    MAX_TINA_SIZES,
}
