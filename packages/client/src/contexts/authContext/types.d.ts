interface ILoginPayload extends LoginPayload {}

interface IAuthContext {
  login: (payload: ILoginPayload) => Promise<void>;
}
