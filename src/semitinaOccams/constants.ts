import {computeCentsFromPitch, halveSpev} from "@sagittal/general"
import {TINA} from "@sagittal/system"

const SEMITINA = halveSpev(TINA)
const SEMITINA_CENTS = computeCentsFromPitch(SEMITINA)      // ~0.070262¢

export {
    SEMITINA,
    SEMITINA_CENTS,
}
