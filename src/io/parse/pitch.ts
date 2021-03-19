import {
    computePitchFromCents,
    computeSpevFromDecimal,
    computeSpevFromPev,
    computeSpevFromQuotient,
    IDENTIFYING_ACCIDENTAL_CHARS,
    IDENTIFYING_CENTS_CHARS,
    IDENTIFYING_COMMA_NAME_CHARS,
    IDENTIFYING_PEV_CHARS,
    IDENTIFYING_QUOTIENT_CHARS,
    Io,
    isUndefined,
    Maybe,
    NUMERIC_CHARS,
    parseCents,
    parseDecimal,
    parsePev,
    parseQuotient,
    Spev,
} from "@sagittal/general"
import {
    computeCommaFromCommaName,
    computeJiPitchFromAccidental,
    parseAccidental,
    parseCommaName,
} from "@sagittal/system"
import {PitchFormat} from "./types"

const parsePitch = (pitchIo: Io, pitchFormat?: PitchFormat): Spev => {
    let pitch: Maybe<Spev> = undefined

    if (pitchIo.match(NUMERIC_CHARS)) {
        if (pitchFormat === PitchFormat.COMMA_NAME || pitchIo.match(IDENTIFYING_COMMA_NAME_CHARS)) {
            const commaNameQuotientAndSizeCategoryName = parseCommaName(pitchIo)
            pitch = computeCommaFromCommaName(commaNameQuotientAndSizeCategoryName)
        } else if (pitchFormat === PitchFormat.QUOTIENT || pitchIo.match(IDENTIFYING_QUOTIENT_CHARS)) {
            const quotient = parseQuotient(pitchIo)
            pitch = computeSpevFromQuotient(quotient)
        } else if (pitchFormat === PitchFormat.PEV || pitchIo.match(IDENTIFYING_PEV_CHARS)) {
            const pev = parsePev(pitchIo)
            pitch = computeSpevFromPev(pev)
        } else if (pitchFormat === PitchFormat.CENTS || pitchIo.match(IDENTIFYING_CENTS_CHARS)) {
            const cents = parseCents(pitchIo)
            pitch = computePitchFromCents(cents)
        } else {
            const decimal = parseDecimal(pitchIo)
            pitch = computeSpevFromDecimal(decimal)
        }
    } else if (pitchFormat === PitchFormat.ACCIDENTAL || pitchIo.match(IDENTIFYING_ACCIDENTAL_CHARS)) {
        const accidental = parseAccidental(pitchIo)

        pitch = computeJiPitchFromAccidental(accidental)
    } else if (pitchFormat === PitchFormat.PEV || pitchIo.match(IDENTIFYING_PEV_CHARS)) {
        const pev = parsePev(pitchIo)
        pitch = computeSpevFromPev(pev)
    }

    if (isUndefined(pitch)) throw new Error(`Could not identify format of pitch ${pitchIo}`)

    return pitch
}

export {
    parsePitch,
}
