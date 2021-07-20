import { Types } from 'mongoose';

export function bulkObjectID(target: string[]) {
    const result: Types.ObjectId[] = [];
    for (let i = 0; i < target.length; i++) {
        result.push(Types.ObjectId(target[i]));
    }
    return result;
}

export type RoleType = 'HS' | 'PH' | 'GV' | 'QT' | 'HT' | 'QT-HT';
