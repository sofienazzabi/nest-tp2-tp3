export class Todo {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    status: TodoStatusEnum;
}

export enum TodoStatusEnum {
    'actif' = "En cours",
    'waiting' = "En attente",
    'done' = "Finalisé"
}