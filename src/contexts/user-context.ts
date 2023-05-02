import { createContext, Dispatch, SetStateAction } from "react";

enum UserRole {
	Admin = 'Admin',
	Student = 'Student',
	HR = 'HR',
}

interface UserContextType {
	id: string;
	setId: (id: string) => void;
	role: UserRole | undefined;
	setRole: Dispatch<SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType>({
	id: "",
	setId(id: string): void {	},
	role: undefined,
	setRole: () => {},

})