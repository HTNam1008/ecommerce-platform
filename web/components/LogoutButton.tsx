import { logoutAction } from "@/app/actions/auth";
import { useAuthStore } from "@/store/authStore";

export default function LogoutButton() {
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        logout();
        await logoutAction();
    };
    return <button onClick={handleLogout}>Logout</button>;
}