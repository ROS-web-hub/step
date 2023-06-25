import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";


export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-md custom-grey">
      <a className="navbar-brand px-3 step-logo" href="#">Step Addition</a>
    </nav>
  );
};
