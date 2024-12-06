export type User = globalThis.Ref<
  {
    name: string;
    cpf: string;
    username: string;
    email: string;
    group: string;
  },
  | {
      name: string;
      cpf: string;
      username: string;
      email: string;
      group: string;
    }
  | {
      name: string;
      cpf: string;
      username: string;
      email: string;
      group: string;
    }
>;
