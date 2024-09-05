// import * as core from '@sequelize/core';
import {
    Attribute,
    AutoIncrement,
    Default,
    NotNull,
    PrimaryKey,
    Table,
    Unique,
} from '@sequelize/core/decorators-legacy';
import { PartialBy } from '@sequelize/utils';
import {DataTypes, Model } from '@sequelize/core';


export interface UserAttributes {
    id: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    refreshToken: string,
    confirmationCodeEmail: string,
    confirmationCodePhone: string,
    statusSocial: string,
    role: string,
    isActiveEmail: boolean,
    isActivePhone: boolean
}

export type UserCreationAttributes = PartialBy<
  UserAttributes,
  'id'
  | 'username'
  | 'email'
  | 'password'
  | 'phone'
  | 'refreshToken'
  | 'confirmationCodeEmail'
  | 'confirmationCodePhone'
  | 'statusSocial'
  | 'role'
  | 'isActiveEmail'
  | 'isActivePhone'
>;

@Table({ tableName: 'user', underscored: true })
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare username: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare refreshToken: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare email: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Unique
    declare phone: number;

    @Attribute(DataTypes.STRING)
    declare confirmationCodeEmail: string;

    @Attribute(DataTypes.STRING)
    declare confirmationCodePhone: string;

    @Attribute(DataTypes.STRING)
    @Default('POVERTY')
    @NotNull
    declare statusSocial: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Default('USER')
    declare role: string;

    @Attribute(DataTypes.BOOLEAN)
    @Default(false)
    declare isActiveEmail: boolean;

    @Attribute(DataTypes.STRING)
    @Default(false)
    declare isActivePhone: boolean

}

// export  {
//     User
// }
