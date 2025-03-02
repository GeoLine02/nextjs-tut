import NavLink from "./NavLink";

const Navigation = () => {
  return (
    <nav>
      <NavLink href="/" label="Home" />
      <div>
        <NavLink href="/register" label="Register" />

        <NavLink href="/dashboard" label="Dashboard" />
        <NavLink href="/login" label="Login" />
      </div>
    </nav>
  );
};

export default Navigation;
