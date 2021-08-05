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

export function arrange(date: string) {
    const dat = date.trim().split('-').reverse().join('-');
    return new Date(dat);
}

export function weekdaySort(a: string, b: string) {
    const weekDays = [
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
        'Chủ Nhật',
    ];
    let aVal = 0,
        bVal = 0;

    for (let i = 0; i < weekDays.length; i++) {
        if (a === weekDays[i]) aVal = i;
        if (b === weekDays[i]) bVal = i;
    }
    return aVal - bVal;
}
