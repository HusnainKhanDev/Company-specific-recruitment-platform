//Using in Controllers/Controller Function type for Controllers
export type ConFn<T> = (_:any, args:T, context:any) => Promise<any>;

// User Interfaces ---------------------------------------------------------------------------------

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
export interface UserParamsIF {
    OnlyName: string;
    phone?: string;
    email: string;
    Bpassword?: string;
    googleId?: string;
    role?: string
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
    password?: string | null | undefined;
    googleId?: string | null | undefined;
    role: string;
}


// Job Feature Interfaces & Types------------------------------------------------------------------

//using in createJob Service
export interface JobParamsIF {
    title: string;
    closingDate: string;
    workSetup: string;
    salary: string;
    description: string;
    requirements: [string],
    jobType: string,
    createdBy: string;
}


//Using in Controllers/JobController.ts
export interface JobArgs {
    input: {
        title: string
        closingDate: string
        workSetup: string
        salary: string
        description: string
        requirements: [string]
        jobType: string
        createdBy: string
    }
}

// JOb Search controller parameters
export interface JobSearchArgs {
    field: string;
    value: string;
}

// Application Interfaces--------------------------------------------------------------------------

//Using in Controllers/ApplicationController.ts
export interface ApplicationArgs {
    input: {
        fullname: string
        email: string
        phone: string
        jobId: string
        candidateId: string
        linkedInProfile: string
        resume: string
        skills: [string]
        companyName: string
        position: string
        startDate: Date
        endDate: Date
    }
}   

export interface ApplicationParamIF {
    fullname: string,
    email: string,
    phone: string,
    jobId: string,
    candidateId: string,
    linkedInProfile: string 
    resume: string
    skills: [string],
    pastJob: {
        companyName: string,
        position: string,
        startDate: Date
        endDate: Date
    }
}