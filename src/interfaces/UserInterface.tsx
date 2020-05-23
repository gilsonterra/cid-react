import RoleInterface from './RoleInterface';

export default interface UserInterface {
    id: string, 
    name: string, 
    email: string, 
    is_active: string, 
    created_at: string, 
    updated_at: string, 
    password?: string | undefined,
    roles: RoleInterface[] | []
}