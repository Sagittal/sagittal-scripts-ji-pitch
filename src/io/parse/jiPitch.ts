import {
    Comma,
    computeRationalVectorFromRationalDecimal,
    computeRationalVectorFromRationalQuotient,
    Decimal,
    formatPitch,
    Integer,
    Io,
    isScaledVectorRational,
    program,
    Quotient,
    Rational,
    ScaledVector,
    Vector,
} from "@sagittal/general"
import { Accidental, computeJiPitchFromAccidental } from "@sagittal/system"
import { parsePitch } from "./pitch"
import { PitchFormat } from "./types"

const parseJiPitch = (
    jiPitchIo: Io,
    pitchFormat: PitchFormat = PitchFormat.UNKNOWN,
): ScaledVector<Rational> => {
    let jiPitch: ScaledVector<Rational>

    const programOpts: {
        vector: Vector
        quotient: Quotient
        commaName: Comma
        accidental: Accidental
        integer: Decimal<Integer>
    } = program.opts()

    if (pitchFormat === PitchFormat.UNKNOWN) {
        const pitch = parsePitch(jiPitchIo, pitchFormat)

        if (isScaledVectorRational(pitch)) {
            jiPitch = pitch
        } else {
            throw new Error(`JI pitches must be rational. This pitch was ${formatPitch(pitch)}`)
        }
    } else if (pitchFormat === PitchFormat.VECTOR) {
        jiPitch = { vector: programOpts.vector } as ScaledVector<Rational>
    } else if (pitchFormat === PitchFormat.QUOTIENT) {
        jiPitch = {
            vector: computeRationalVectorFromRationalQuotient(programOpts.quotient),
        } as ScaledVector<Rational>
    } else if (pitchFormat === PitchFormat.COMMA_NAME) {
        jiPitch = programOpts.commaName
    } else if (pitchFormat === PitchFormat.ACCIDENTAL) {
        jiPitch = computeJiPitchFromAccidental(programOpts.accidental)
    } else if (pitchFormat === PitchFormat.INTEGER) {
        jiPitch = {
            vector: computeRationalVectorFromRationalDecimal(programOpts.integer) as Vector,
        } as ScaledVector<Rational>
    } else {
        throw new Error(`Unknown pitch format: ${pitchFormat}`)
    }

    return jiPitch
}

export { parseJiPitch }
