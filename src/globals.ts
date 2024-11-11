import { Comma, Count, Name, RecordKey, EtStep } from "@sagittal/general"
import { DEFAULT_JI_PITCH_SCRIPTS_SETTINGS } from "./constants"
import { JiPitchScriptGroupSettings } from "./types"

const jiPitchScriptGroupSettings: JiPitchScriptGroupSettings = structuredClone(
    DEFAULT_JI_PITCH_SCRIPTS_SETTINGS,
)

const metacommaNameToMetacommaMap: Record<RecordKey<Name<Comma>>, Comma> = {}
const inconsistentMetacommas: Record<RecordKey<Name<Comma>>, Count<EtStep>> = {}

export { jiPitchScriptGroupSettings, metacommaNameToMetacommaMap, inconsistentMetacommas }
