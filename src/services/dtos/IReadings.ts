export interface IReadingValue {
    id: number;
    value: number;
  }
  
  export interface IReadings {
    xAxis: string[];          // Datas em formato ISO string
    x: IReadingValue[];
    y: IReadingValue[];
    z: IReadingValue[];
  }