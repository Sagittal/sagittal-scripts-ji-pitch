import {
    BLANK,
    format23FreeClass,
    Formatted,
    ioSettings,
    TableFormat,
    Two3FreeClass,
    TWO_3_FREE_CLASS_SIGN,
} from "@sagittal/general"
import {Two3FreeClassAnalysis} from "@sagittal/system"

const formatSplit23FreeClass = (two3FreeClass: Two3FreeClass): Array<Formatted<Two3FreeClassAnalysis>> => {
    const formatted23FreeClass = format23FreeClass(two3FreeClass) as Formatted as Formatted<Two3FreeClassAnalysis>

    if (ioSettings.tableFormat === TableFormat.FORUM) {
        return [formatted23FreeClass] as Array<Formatted> as Array<Formatted<Two3FreeClassAnalysis>>
    } else {
        const sign = ioSettings.tableFormat === TableFormat.FORUM_WITH_SPLIT_QUOTIENTS ?
            "[latex]_{\\scriptsize{2,3}}[/latex]" :
            TWO_3_FREE_CLASS_SIGN
        let [formattedNuminator, formattedDiminuator] = formatted23FreeClass
            .replace("{", BLANK)
            .replace("}", BLANK)
            .replace(TWO_3_FREE_CLASS_SIGN, BLANK)
            .split("/")

        formattedDiminuator = formattedDiminuator || "1" as Formatted<Two3FreeClassAnalysis>

        return [formattedNuminator, "/", formattedDiminuator, sign] as Array<Formatted<Two3FreeClassAnalysis>>
    }
}

export {
    formatSplit23FreeClass,
}
