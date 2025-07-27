//Using in UserController.ts
export interface UserArgs {
    input: {
        fullname: string;
        phone?: string;
        email: string;
        password: string;
        googleId?: string;
    }
}

//Using in UserServices.ts
export interface ParamsIF {
    fullname: string;
    phone?: string;
    email: string;
    Bpassword: string;
    googleId?: string;
}

export type ConFn<T> = (_:any, args:T) => Promise<any>;