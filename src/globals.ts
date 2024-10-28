import { Comma, Count, Name, RecordKey, Generator } from "@sagittal/general"
import { DEFAULT_JI_PITCH_SCRIPTS_SETTINGS } from "./constants"
import { JiPitchScriptGroupSettings } from "./types"

const jiPitchScriptGroupSettings: JiPitchScriptGroupSettings = JSON.parse(
    JSON.stringify(DEFAULT_JI_PITCH_SCRIPTS_SETTINGS),
)

const metacommaNameToMetacommaMap: Record<RecordKey<Name<Comma>>, Comma> = {}
const inconsistentMetacommas: Record<RecordKey<Name<Comma>>, Count<Generator>> = {}

export { jiPitchScriptGroupSettings, metacommaNameToMetacommaMap, inconsistentMetacommas }
