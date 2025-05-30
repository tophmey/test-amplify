
type SizeDisplay = string;
type SizeValue = number;

export type SizeList = Record<SizeValue, SizeDisplay>

export type Rules = 'default' | {
    isLocal?: boolean;
    sizes?: SizeList;
    isRaw?: boolean;
  }


export interface Variety {
    [name: string]: Rules;
}
  
export type Data  =  {
    varieties: Variety;
    controls: {
        sizes: SizeList
        isLocal: boolean,
        isRaw: boolean
    }
}

const defaultValues = Object.freeze({
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
    isLocal: true,
    isRaw: true,
});

const data: Data = {
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
  controls: defaultValues
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
  

// export type SizeList = {
//   readonly[key: SizeValue]: SizeDisplay;
// }
