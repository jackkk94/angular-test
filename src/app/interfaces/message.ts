
export interface Message {
    id: number,
    type: string,
    elevation: number,
    azimuth: number,
    snr: number,
    coords?:Array<number>
}
