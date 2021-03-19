import {
    computeRationalPevFromRationalDecimal,
    computeRationalPevFromRationalQuotient,
    formatPitch,
    Io,
    isSpevRational,
    program,
    Spev,
} from "@sagittal/general"
import {computeJiPitchFromAccidental} from "@sagittal/system"
import {parsePitch} from "./pitch"
import {PitchFormat} from "./types"

const parseJiPitch = (jiPitchIo: Io, pitchFormat: PitchFormat = PitchFormat.UNKNOWN): Spev<{rational: true}> => {
    let jiPitch: Spev<{rational: true}>

    if (pitchFormat === PitchFormat.UNKNOWN) {
        const pitch = parsePitch(jiPitchIo, pitchFormat)

        if (isSpevRational(pitch)) {
            jiPitch = pitch
        } else {
            throw new Error(`JI pitches must be rational. This pitch was ${formatPitch(pitch)}`)
        }
    } else if (pitchFormat === PitchFormat.PEV) {
        jiPitch = {pev: program.pev} as Spev<{rational: true}>
    } else if (pitchFormat === PitchFormat.QUOTIENT) {
        jiPitch = {pev: computeRationalPevFromRationalQuotient(program.quotient)} as Spev<{rational: true}>
    } else if (pitchFormat === PitchFormat.COMMA_NAME) {
        jiPitch = program.commaName
    } else if (pitchFormat === PitchFormat.ACCIDENTAL) {
        jiPitch = computeJiPitchFromAccidental(program.accidental)
    } else if (pitchFormat === PitchFormat.INTEGER) {
        jiPitch = {pev: computeRationalPevFromRationalDecimal(program.integer)} as Spev<{rational: true}>
    } else {
        throw new Error(`Unknown pitch format: ${pitchFormat}`)
    }

    return jiPitch
}

export {
    parseJiPitch,
}
