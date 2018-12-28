export class Face {

    public data: Array<Array<cell | string>> = [ [],[],[] ];

    constructor(dataString?: string) {
        if (dataString === undefined) {
            this.data[0].push(cell.U, cell.U, cell.U);
            this.data[1].push(cell.U, cell.U, cell.U);
            this.data[2].push(cell.U, cell.U, cell.U);
        } else {
            let inputData = dataString.split('');
            this.data[0].push(inputData[0], inputData[1], inputData[2]);
            this.data[1].push(inputData[3], inputData[4], inputData[5]);
            this.data[2].push(inputData[6], inputData[7], inputData[8]);
        }
    }


}

export enum cell {
    U = 'U',
    R = 'R',
    F = 'F',
    D = 'D',
    L = 'L',
    B = 'B'
}
