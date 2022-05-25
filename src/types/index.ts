export interface TableRow {
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] }>;
}

export interface Path {
  index: number;
  property: string;
}

const a = [
  {
    data: {
      name: "liberi",
      age: 1,
    },
    kids: {
      has_relative: {
        records: [
          {
            data: {
              firstTel: "08202",
              secondTel: "0392",
            },
            kids: {
              has_simcards: {
                records: [
                  {
                    data: {
                      vendor: "MTN",
                      num: "9999999",
                    },
                    kids: {},
                  },
                  {
                    data: {
                      vendor: "Airtel",
                      num: "9999999",
                    },
                    kids: {},
                  },
                ],
              },
            },
          },
          {
            data: {
              firstTel: "08202",
              secondTel: "2343",
            },
            kids: {},
          },
        ],
      },
      has_cars: {
        records: [
          {
            data: {
              model: "Toyota",
              plage: "RAD23",
            },
            kids: {},
          },
          {
            data: {
              model: "BMW",
              plage: "ARA28",
            },
            kids: {},
          },
        ],
      },
    },
  },
  {
    data: {
      name: "verite",
      age: 3,
    },
    kids: {},
  },
];
