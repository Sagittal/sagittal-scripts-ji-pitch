import {Io, program} from "@sagittal/general"
import {PitchFormat} from "./types"

const readJiPitchIoAndFormat = (): [Io, PitchFormat] => {
    const jiPitchIo = program.args[0] as Io

    const programOpts = program.opts()

    if (jiPitchIo) {
        return [jiPitchIo, PitchFormat.UNKNOWN]

        // When provided via specific flags, they are pre-parsed (in readOptions.ts).
    } else if (programOpts.pev) {
        return [programOpts.pev, PitchFormat.PEV]
    } else if (programOpts.quotient) {
        return [programOpts.quotient, PitchFormat.QUOTIENT]
    } else if (programOpts.commaName) {
        return [programOpts.commaName, PitchFormat.COMMA_NAME]
    } else if (programOpts.accidental) {
        return [programOpts.accidental, PitchFormat.ACCIDENTAL]
    } else if (programOpts.integer) {
        return [programOpts.integer, PitchFormat.INTEGER]
    } else {
        throw new Error("Unable to read JI pitch.")
    }
}

export {
    readJiPitchIoAndFormat,
}
