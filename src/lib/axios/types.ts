export  interface LoginTypes{
    email: string;
    password: string;
}

export interface RegisterTypes{
    email: string;
    password: string;
    profile: {
        name: string;
        username: string;
        bio: string;
    }
}
