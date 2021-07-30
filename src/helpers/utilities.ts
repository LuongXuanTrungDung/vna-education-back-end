import { Types } from 'mongoose';

export function bulkObjectID(target: string[]) {
    const result: Types.ObjectId[] = [];
    for (let i = 0; i < target.length; i++) {
        result.push(Types.ObjectId(target[i]));
    }
    return result;
}

export type RoleType = 'HS' | 'PH' | 'GV' | 'QT' | 'HT' | 'QT-HT';

export function assign(dto: any, doc: any) {
    for (const key in dto) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
            doc[key] = dto[key];
        }
    }
}

export function objectify(dto: any, doc: any) {
    for (const key in dto) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
            doc[key] = Object(dto[key]);
        }
    }
}

export function diff(array_1: any[], array_2: any[]) {
    const arr = array_2.concat(array_1);
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (array_1.indexOf(arr[i]) === -1) result.push(arr[i]);
    }
    return result;
}

// by Kannan of Chennai
export function removeDuplicates(arr: any, key: string) {
    const flag = {};
    const unique = [];

    for (let i = 0; i < arr.length; i++) {
        if (!flag[arr[i][key]]) {
            flag[arr[i][key]] = true;
            unique.push(arr[i]);
        }
    }
    return unique;
}
