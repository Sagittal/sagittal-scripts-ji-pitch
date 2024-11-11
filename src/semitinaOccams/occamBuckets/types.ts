import { Comma, Count, Decimal, Integer } from "@sagittal/general"

type BucketName = Decimal<Integer> & { _TinaBucketBrand: boolean }

type Occam = Count<Comma> & { _OccamBrand: boolean }

export { BucketName, Occam }
