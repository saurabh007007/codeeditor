import React, { ReactNode } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface LogoutButtonProps {
    children: ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
    const { logout } = useAuthStore();

    const onLogout = async (): Promise<void> => {
        await logout();
    };

    return (
        <button className="btn btn-primary" onClick={onLogout}>
            {children}
        </button>
    );
};

export default LogoutButton;
