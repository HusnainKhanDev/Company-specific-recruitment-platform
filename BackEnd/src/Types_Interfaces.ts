//Using in CreateNewUser.ts
export interface UserArgs {
    input: {
        fullname: string;
        phone?: string;
        email: string;
        password: string;
        googleId?: string;
    }
}

//Using in UserServices.ts Parameters of InsertNewUser
export interface ParamsIF {
    fullname: string;
    phone?: string;
    email: string;
    Bpassword: string;
    googleId?: string;
}

//using in SingInUser/UserController
export interface SignInUser {
    email: string;
    password: string;
}

//Shape of User in Database /Using in SingInUser/UserController
export interface DBUser {
    _id: any;
    fullname: string;
    phone?: string | null | undefined;
    email: string;
    password: string;
    googleId?: string | null | undefined;
    role: string;
}

//Using in Controllers/UserController.ts
//Function type for Controllers
export type ConFn<T> = (_:any, args:T, context:any) => Promise<any>;