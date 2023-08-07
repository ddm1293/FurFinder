import { Typography } from "antd";
import "../../style/Navbar.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <Typography.Link href="mailto: furfinder23@gmail.com">furfinder23@gmail.com</Typography.Link>
      <Typography.Link href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/00_96373_01" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="/settings">About</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Copyright © {currentYear}
      </Typography.Link>
    </div>
  );
}
export default Footer;