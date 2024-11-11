import {
    computePitchFromCents,
    computeScaledVectorFromDecimal,
    computeScaledVectorFromVector,
    computeScaledVectorFromQuotient,
    IDENTIFYING_ACCIDENTAL_CHARS,
    IDENTIFYING_CENTS_CHARS,
    IDENTIFYING_COMMA_NAME_CHARS,
    IDENTIFYING_VECTOR_CHARS,
    IDENTIFYING_QUOTIENT_CHARS,
    Io,
    isUndefined,
    Maybe,
    NUMERIC_CHARS,
    parseCents,
    parseDecimal,
    parseVector,
    parseQuotient,
    ScaledVector,
    Rational,
    Decimal,
} from "@sagittal/general"
import {
    computeCommaFromCommaName,
    computeJiPitchFromAccidental,
    parseAccidental,
    parseCommaName,
} from "@sagittal/system"
import { PitchFormat } from "./types"

const parsePitch = (pitchIo: Io, pitchFormat?: PitchFormat): ScaledVector<Rational> => {
    let pitch: Maybe<ScaledVector<Rational>> = undefined

    if (pitchIo.match(NUMERIC_CHARS)) {
        if (pitchFormat === PitchFormat.COMMA_NAME || pitchIo.match(IDENTIFYING_COMMA_NAME_CHARS)) {
            const commaNameQuotientAndSizeCategoryName = parseCommaName(pitchIo)
            pitch = computeCommaFromCommaName(commaNameQuotientAndSizeCategoryName)
        } else if (pitchFormat === PitchFormat.QUOTIENT || pitchIo.match(IDENTIFYING_QUOTIENT_CHARS)) {
            const quotient = parseQuotient(pitchIo)
            pitch = computeScaledVectorFromQuotient(quotient) as ScaledVector<Rational>
        } else if (pitchFormat === PitchFormat.VECTOR || pitchIo.match(IDENTIFYING_VECTOR_CHARS)) {
            const vector = parseVector(pitchIo)
            pitch = computeScaledVectorFromVector(vector)
        } else if (pitchFormat === PitchFormat.CENTS || pitchIo.match(IDENTIFYING_CENTS_CHARS)) {
            const cents = parseCents(pitchIo)
            pitch = computePitchFromCents(cents) as ScaledVector<Rational>
        } else {
            const decimal = parseDecimal(pitchIo) as Decimal<Rational>
            pitch = computeScaledVectorFromDecimal(decimal) as ScaledVector<Rational>
        }
    } else if (pitchFormat === PitchFormat.ACCIDENTAL || pitchIo.match(IDENTIFYING_ACCIDENTAL_CHARS)) {
        const accidental = parseAccidental(pitchIo)

        pitch = computeJiPitchFromAccidental(accidental)
    } else if (pitchFormat === PitchFormat.VECTOR || pitchIo.match(IDENTIFYING_VECTOR_CHARS)) {
        const vector = parseVector(pitchIo)
        pitch = computeScaledVectorFromVector(vector)
    }

    if (isUndefined(pitch)) throw new Error(`Could not identify format of pitch ${pitchIo}`)

    return pitch
}

export { parsePitch }
