
// type SizeDisplay = string;
// type SizeValue = number;

// export type SizeList = Record<SizeValue, SizeDisplay>

// export type Rules = 'default' | {
//     isLocal?: boolean;
//     sizes?: SizeList;
//     isRaw?: boolean;
//   }


// export interface Variety {
//     [name: string]: Rules;
// }
  
// export type Data  = null | {
//     varieties: Variety;
//     controls: {
//         sizes: SizeList
//         isLocal: boolean,
//         isRaw: boolean
//     }
// }


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

// type SizeDisplay = string;
// type SizeValue = number;

// export type SizeList = Record<SizeDisplay, SizeValue>


// // export type SizeList = {
// //   readonly[key: SizeValue]: SizeDisplay;
// // }

// export type Rules = 'default' | {
//   isLocal?: boolean;
//   sizes?: SizeList;
//   isRaw?: boolean;
// }

// export interface Variety {
//   [name: string]: Rules;
// }

// // export type Control {

// // }

// export interface Data {
//     varieties: Variety;
//   }