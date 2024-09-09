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
import { DataTypes, Model } from '@sequelize/core';

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  refreshTokens?: string[];
  confirmationCodeEmail?: string;
  confirmationCodePhone: string;
  role?: string;
  isActiveEmail?: boolean;
  isActivePhone: boolean;
}

export type UserCreationAttributes = PartialBy<
  UserAttributes,
  'id' | 'phone' | 'confirmationCodePhone' | 'isActivePhone'
>;

@Table({ tableName: 'user', underscored: true })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Attribute({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @Attribute({ type: DataTypes.STRING, allowNull: false, unique: true })
  declare username: string;

  @Attribute({ type: DataTypes.STRING, unique: true, allowNull: false })
  declare password: string;

  @Attribute({ type: DataTypes.STRING, unique: true, allowNull: false })
  declare email: string;

  @Attribute({ type: DataTypes.INTEGER, allowNull: false, unique: true })
  declare phone: number;

  @Attribute(DataTypes.STRING)
  declare confirmationCodeEmail: string;

  @Attribute(DataTypes.STRING)
  declare confirmationCodePhone: string;

  @Attribute({ type: DataTypes.STRING, defaultValue: 'USER', allowNull: false })
  declare role: string;

  @Attribute({ type: DataTypes.BOOLEAN, defaultValue: false })
  declare isActiveEmail: boolean;

  @Attribute({ type: DataTypes.STRING, defaultValue: false })
  declare isActivePhone: boolean;

  @Attribute({ type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: null })
  declare refreshTokens: string[];
}
