import Link from "next/link";
import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="w-full flex flex-wrap justify-between items-center p-4">
        <Link href={"/"} className="logo w-32">
          <h3>Hostel</h3>
        </Link>
        <Navlink />
      </div>
    </div>
  );
};

export default Navbar;
