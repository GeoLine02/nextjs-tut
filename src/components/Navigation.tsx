import getAuthUsers from "@/lib/getAuthUser";
import NavLink from "./NavLink";

const Navigation = async () => {
  const authUser = await getAuthUsers();

  return (
    <nav>
      <NavLink href="/" label="Home" />
      <div>
        {authUser ? (
          <div className="flex items-center">
            <NavLink href="/dashboard" label="Dashboard" />
          </div>
        ) : (
          <div>
            <NavLink href="/register" label="Register" />
            <NavLink href="/login" label="Login" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
