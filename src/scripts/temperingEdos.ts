import {
    computePevMapping,
    computeRange,
    computeRationalPevFromRationalSpev,
    computeRationalPevSmoothness,
    computeStandardMapping,
    Ed,
    Filename,
    LogTarget,
    Max,
    OCTAVE_WINDOW,
    saveLog,
    setupScriptAndIo,
    stringify,
    Window,
} from "@sagittal/general"
import {Prime} from "@sagittal/general/dist/cjs/math/rational"
import {parseJiPitch, readAnalyzeJiPitchOptions, readJiPitchIoAndFormat} from "../io"

const MAX_EDO = 1000 as Ed<{of: Window<{of: 2}>}>

readAnalyzeJiPitchOptions()

setupScriptAndIo("analyzeJiPitch" as Filename)

const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()
const jiPitch = parseJiPitch(jiPitchIo, pitchFormat)

const pev = computeRationalPevFromRationalSpev(jiPitch)

const primeLimit = computeRationalPevSmoothness(pev) as number as Max<Max<Prime>>

const temperingEdos = [] as Array<Ed<{of: Window<{of: 2}>}>>

computeRange(1 as Ed<{of: Window<{of: 2}>}>, MAX_EDO)
    .forEach((edo: Ed<{of: Window<{of: 2}>}>): void => {
        const mapping = computeStandardMapping({
            ed: edo,
            window: OCTAVE_WINDOW,
            primeLimit,
        })

        const steps = computePevMapping(pev, mapping)

        if (steps === 0) {
            temperingEdos.push(edo)
        }
    })

saveLog(stringify(temperingEdos), LogTarget.FINAL)
