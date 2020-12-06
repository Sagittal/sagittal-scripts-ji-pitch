import {setAllPropertiesOfObjectOnAnother} from "@sagittal/general"
import {DEFAULT_JI_PITCH_SCRIPTS_SETTINGS} from "../../../src/constants"
import {jiPitchScriptGroupSettings} from "../../../src/globals"

afterEach((): void => {
    setAllPropertiesOfObjectOnAnother({
        objectToChange: jiPitchScriptGroupSettings,
        objectWithProperties: DEFAULT_JI_PITCH_SCRIPTS_SETTINGS,
    })
})
