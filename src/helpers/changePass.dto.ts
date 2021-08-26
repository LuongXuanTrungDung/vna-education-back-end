export class ChangePassDTO {
    idUser: string;
    oldPass: string;
    newPass: string;
}

export class SetPassDTO {
    idUser: string;
    newPass: string;
}
