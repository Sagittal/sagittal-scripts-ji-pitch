import {
    Count,
    Decimal,
    Exponent,
    formatIntegerDecimal,
    formatVector,
    Formatted,
    Io,
    Max,
    parseInteger,
    Vector,
    Prime,
} from "@sagittal/general"
import { JiPitchAnalysis } from "@sagittal/system"

const formatSplitVector = (
    vector: Vector,
    maxVectorLength: Max<Count<Exponent<Prime>>>,
): Array<Formatted<JiPitchAnalysis>> => {
    const formattedVector = formatVector(vector)

    let splitFormattedVector = formattedVector.split(/\s+/)
    splitFormattedVector.shift() // Remove the "["
    splitFormattedVector.pop() // Remove the "⟩"
    splitFormattedVector = splitFormattedVector.map((formattedPrimeCount: string): Formatted<Decimal> => {
        return formatIntegerDecimal(parseInteger(formattedPrimeCount as Io), { align: true })
    })
    splitFormattedVector.unshift("[") // Put back the "["
    while (splitFormattedVector.length < maxVectorLength + 1) {
        // +1 for the [
        splitFormattedVector.push("")
    }
    splitFormattedVector.push("⟩") // Put back the "⟩"

    return splitFormattedVector as Array<Formatted> as Array<Formatted<JiPitchAnalysis>>
}

export { formatSplitVector }
