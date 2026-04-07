export interface Task {
    id:           number;
    title:        string;
    is_completed: boolean;
    deleted_at:   null;
    user:         User;
    user_id?:     number | string;
}

export interface User {
    id:    number;
    name:  string;
    email: string;
}
