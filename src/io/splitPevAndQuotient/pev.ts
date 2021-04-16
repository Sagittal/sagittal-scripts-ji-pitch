import {
    Count,
    Decimal,
    Exponent,
    formatIntegerDecimal,
    formatPev,
    Formatted,
    Io,
    Max,
    parseInteger,
    Pev,
    Prime,
} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"

const formatSplitPev = (
    pev: Pev,
    maxPevLength: Max<Count<Exponent<Prime>>>,
): Array<Formatted<JiPitchAnalysis>> => {
    const formattedPev = formatPev(pev)

    let splitFormattedPev = formattedPev.split(/\s+/)
    splitFormattedPev.shift()             // Remove the "["
    splitFormattedPev.pop()               // Remove the "⟩"
    splitFormattedPev = splitFormattedPev.map((formattedPrimeExponent: string): Formatted<Decimal> => {
        return formatIntegerDecimal(parseInteger(formattedPrimeExponent as Io), {align: true})
    })
    splitFormattedPev.unshift("[")  // Put back the "["
    while (splitFormattedPev.length < maxPevLength + 1) { // +1 for the [
        splitFormattedPev.push("")
    }
    splitFormattedPev.push("⟩")           // Put back the "⟩"

    return splitFormattedPev as Array<Formatted> as Array<Formatted<JiPitchAnalysis>>
}

export {
    formatSplitPev,
}
