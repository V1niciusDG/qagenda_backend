interface ITenantEntityDTO {
  id?: number;
  key: string;
  value: string;
  lang: 'pt_BR' | 'en_US' | 'es_ES';
  created_at?: Date;
  updated_at?: Date;
}

export { ITenantEntityDTO };
