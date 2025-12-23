import { useAuthStore } from "@/store/authStore";

export default function LogoutButton() {
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
    };
    return <button onClick={handleLogout}>Logout</button>;
}