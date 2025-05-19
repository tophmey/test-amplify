const data = {
  varieties: {
    Blueberry: "default",
    Buckwheat: "default",
    Clover: "default",
    Cranberry: "default",
    "Orange Blossom": { isLocal: false },
    Wildflower: "default",
    Tupelo: {
      isLocal: false,
      sizes: {
        8: "8 oz",
        16: "1 lb",
      }
    },
  },
  controls: {
    sizes: {
      8: "8 oz",
      12: "12 oz",
      16: "1 lb",
      32: "2 lb",
      40: "2.5 lb",
      48: "3 lb",
      64: "4 lb",
      80: "5 lb",
    },
    isLocal: "boolean",
    isRaw: "boolean",
  },
};

export { data };

// enum Size {
//     '8 oz' = 8,
//     '12 oz' = 12,
//     '1 lb' = 16,
//     '2 lb' = 32
// }

// const Sizes = {
//     ['8 oz']: 8,
//     ['12 oz']: 12,
//     ['1 lb']: 16,
//     ['2 lb']: 3,
// } as const;

// type SizeDisplay = keyof typeof Sizes;

type SizeDisplay = number;
type SizeValue = string;

export type SizeList = Record<SizeDisplay, SizeValue>


// export type SizeList = {
//   readonly[key: SizeValue]: SizeDisplay;
// }

export type Rules = 'default' | {
  isLocal?: boolean;
  sizes?: SizeList;
  isRaw?: boolean;
}

export interface Variety {
  [name: string]: Rules;
}

// export type Control {

// }

export interface Data {
    varieties: Variety;
  }