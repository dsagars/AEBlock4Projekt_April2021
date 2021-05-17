import { Message } from './message.model';

export interface User {
    id: string;
    email: string;
    name: string;
    surename?: string;
    photoUrl: string;
    messages?: Message[];
}
