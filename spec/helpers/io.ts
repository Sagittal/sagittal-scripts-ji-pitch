import {
    clearLogFiles,
    DEFAULT_IO_SETTINGS,
    Filename,
    ioSettings,
    LogTarget,
    setAllPropertiesOfObjectOnAnother,
} from "@sagittal/general"

clearLogFiles("spec" as Filename)

beforeEach((): void => {
    setAllPropertiesOfObjectOnAnother({
        objectToChange: ioSettings,
        objectWithProperties: {
            ...DEFAULT_IO_SETTINGS,
            scriptGroup: "spec",
            logTargets: {[LogTarget.SPEC]: true},
        },
    })
})
