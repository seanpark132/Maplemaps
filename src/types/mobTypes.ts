export type MobData = {
  mob_id: number;
  raw: Raw;
};

export type Raw = {
  meta: Meta;
  name: string;
};

export type Meta = {
  level: number;
  maxHP?: number | MaxHP;
  exp?: number;
};

export type MaxHP = {
  $numberLong: string;
};
