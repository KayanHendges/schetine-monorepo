interface ILoginPayload extends LoginPayload {}

interface IAuthContext {
  token: string | null;
  login: (payload: ILoginPayload) => Promise<void>;
}
