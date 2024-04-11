import ThemeToggler from '../components/ThemeToggler';
import useLogout from '../hooks/useLogout';

export default function Home() {
  const { logout } = useLogout();
  return (
    <div>
      <ThemeToggler />
      <a onClick={logout}>Logout</a>
    </div>
  );
}
