import {
    computeRationalVectorFromRationalDecimal,
    computeRationalVectorFromRationalQuotient,
    formatPitch,
    Io,
    isScaledVectorRational,
    program,
    ScaledVector,
} from "@sagittal/general"
import { computeJiPitchFromAccidental } from "@sagittal/system"
import { parsePitch } from "./pitch"
import { PitchFormat } from "./types"

const parseJiPitch = (
    jiPitchIo: Io,
    pitchFormat: PitchFormat = PitchFormat.UNKNOWN,
): ScaledVector<{ rational: true }> => {
    let jiPitch: ScaledVector<{ rational: true }>

    const programOpts = program.opts()

    if (pitchFormat === PitchFormat.UNKNOWN) {
        const pitch = parsePitch(jiPitchIo, pitchFormat)

        if (isScaledVectorRational(pitch)) {
            jiPitch = pitch
        } else {
            throw new Error(`JI pitches must be rational. This pitch was ${formatPitch(pitch)}`)
        }
    } else if (pitchFormat === PitchFormat.VECTOR) {
        jiPitch = { vector: programOpts.vector } as ScaledVector<{ rational: true }>
    } else if (pitchFormat === PitchFormat.QUOTIENT) {
        jiPitch = {
            vector: computeRationalVectorFromRationalQuotient(programOpts.quotient),
        } as ScaledVector<{ rational: true }>
    } else if (pitchFormat === PitchFormat.COMMA_NAME) {
        jiPitch = programOpts.commaName
    } else if (pitchFormat === PitchFormat.ACCIDENTAL) {
        jiPitch = computeJiPitchFromAccidental(programOpts.accidental)
    } else if (pitchFormat === PitchFormat.INTEGER) {
        jiPitch = {
            vector: computeRationalVectorFromRationalDecimal(programOpts.integer),
        } as ScaledVector<{ rational: true }>
    } else {
        throw new Error(`Unknown pitch format: ${pitchFormat}`)
    }

    return jiPitch
}

export { parseJiPitch }
