export const enums = {
    file: {
      type: {
        video: 'v',
        image: 'i',
        audio: 'a',
      }
    },
    users: {
      classView: {
        profile: 'P',
        relation: 'R',
        auth: 'A',
      },
    },
    Companies: {
      Default: 'DF',
      PartTime: 'TP',
    },
    Status: {
      Danger: 'D',
      Warning: 'W',
      Safe: 'S',
      Offiline: 'I'
    },
    Devices: {
      Status: {
        Factory: 'F',
        Offline: 'O',
        Active: 'A',
        Disabled: 'D',
      }
    },
    Claims: {
      Status: {
        Initial: 'I',
        InProgress: 'P',
        Concluded: 'C',
        // Reopened: 'R',
      }
    },
    MeasuringPoints: {
      Type: {
        PartTime: 'P',
        Online: 'O',
      }
    },
    Readings: {
      Measurings: {
        Type: {
          Acceleration: `A`,
          Velocity: `V`,
          Temperature: `T`,
        }
      },
      Status: {
        Analyzed: 'A',
        FailurePending: 'FP',
      }
    }
  }