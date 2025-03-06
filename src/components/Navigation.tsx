import getAuthUsers from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logOut } from "@/actions/auth";

const Navigation = async () => {
  const authUser = await getAuthUsers();

  return (
    <nav>
      <NavLink href="/" label="Home" />
      <div>
        {authUser ? (
          <div className="flex items-center">
            <NavLink href="/dashboard" label="Dashboard" />
            <form action={logOut}>
              <button className="nav-link">Log out</button>
            </form>
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
