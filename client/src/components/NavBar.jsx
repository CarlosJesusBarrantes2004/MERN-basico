import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="container mx-auto py-3 flex justify-between">
      <Link to={"/"} className="link">
        Home
      </Link>
      <Link to={"/new"} className="link">
        New task
      </Link>
    </nav>
  );
};

export default NavBar;
