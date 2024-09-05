import {PartialBy} from '@sequelize/utils';



export interface UserCreate {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly phone?: string
}

export interface UserPatch {

}

export interface UserPut {

}