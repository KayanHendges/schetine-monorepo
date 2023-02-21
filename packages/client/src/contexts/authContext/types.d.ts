interface ILoginPayload extends LoginParams {}

interface IAuthContext {
  login: (payload: ILoginPayload) => Promise<void>;
}
