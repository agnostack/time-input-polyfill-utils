export type Hrs24 = 'hrs24'
export type Hrs12 = 'hrs12'
export type minutes = 'minutes'
export type Md = 'mode' // can't call it "Mode" because "Mode" type = "AM" | "PM"

export type Segment = Hrs12 | minutes | Md
