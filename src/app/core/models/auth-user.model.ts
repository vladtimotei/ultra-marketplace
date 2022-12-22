export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  wallet: IUserWallet;
}

interface IUserWallet {
  amount: number;
}
