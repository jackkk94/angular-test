export interface GSV {
    msgCount:number,
    msgNumber:number,
    satellitesCount:number,
    data:Array<GSVData>
}

export interface GSVData{
    id:number,
    elevation:number,
    azimuth:number,
    snr:number
}

