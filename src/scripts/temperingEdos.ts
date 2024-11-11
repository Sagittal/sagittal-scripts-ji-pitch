import {
    mapVector,
    computeRange,
    computeRationalVectorFromRationalScaledVector,
    computeRationalVectorSmoothness,
    computeSimpleMap,
    Filename,
    LogTarget,
    Max,
    Prime,
    saveLog,
    setupScriptAndIo,
    stringify,
    Edo,
} from "@sagittal/general"
import { parseJiPitch, readAnalyzeJiPitchOptions, readJiPitchIoAndFormat } from "../io"

const MAX_EDO = 1000 as Edo

readAnalyzeJiPitchOptions()

setupScriptAndIo("analyzeJiPitch" as Filename)

const [jiPitchIo, pitchFormat] = readJiPitchIoAndFormat()
const jiPitch = parseJiPitch(jiPitchIo, pitchFormat)

const vector = computeRationalVectorFromRationalScaledVector(jiPitch)

const primeLimit = computeRationalVectorSmoothness(vector) as number as Max<Prime>

const temperingEdos = [] as Edo[]

computeRange(1 as Edo, MAX_EDO).forEach((edo: Edo): void => {
    const simpleMap = computeSimpleMap(edo, primeLimit)

    const steps = mapVector(vector, simpleMap)

    if (steps === 0) {
        temperingEdos.push(edo)
    }
})

saveLog(stringify(temperingEdos), LogTarget.FINAL)
