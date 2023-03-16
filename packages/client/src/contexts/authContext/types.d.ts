interface ILoginPayload extends LoginPayload {}

interface ILogOut {
  redirect?: string;
}

interface IAuthContext {
  token: string | null;
  login: (payload: ILoginPayload) => Promise<void>;
  logOut: (params?: ILogOut) => void;
}
