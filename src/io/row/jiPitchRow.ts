import {
    Count,
    Exponent,
    formatCents,
    formatDecimal,
    formatIntegerDecimal,
    Formatted,
    Max,
    Prime,
    Row,
} from "@sagittal/general"
import {JiPitchAnalysis} from "@sagittal/system"
import {jiPitchScriptGroupSettings} from "../../globals"
import {JiPitchField} from "../../types"
import {formatSplitPev, formatSplitQuotient} from "../splitPevAndQuotient"

const computeJiPitchRow = (
    jiPitchAnalysis: JiPitchAnalysis,
    maxPevLength: Max<Count<Exponent<Prime>>>,
): Row<{of: JiPitchAnalysis}> => {
    const {cents, pev, quotient, apotomeSlope, aas, ate} = jiPitchAnalysis

    const row = [] as unknown[] as Row<{of: JiPitchAnalysis}>

    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.QUOTIENT)) {
        row.push(...formatSplitQuotient(quotient))
    }
    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.PEV)) {
        row.push(...formatSplitPev(pev, maxPevLength))
    }
    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.CENTS)) {
        row.push(formatCents(cents, {align: true}) as Formatted as Formatted<JiPitchAnalysis>)
    }
    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.APOTOME_SLOPE)) {
        row.push(formatDecimal(apotomeSlope, {align: true}) as Formatted as Formatted<JiPitchAnalysis>)
    }
    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.AAS)) {
        row.push(formatDecimal(aas, {align: true}) as Formatted as Formatted<JiPitchAnalysis>)
    }
    if (!jiPitchScriptGroupSettings.excludedFields.includes(JiPitchField.ATE)) {
        row.push(formatIntegerDecimal(ate, {align: true}) as Formatted as Formatted<JiPitchAnalysis>)
    }

    return row
}

export {
    computeJiPitchRow,
}
