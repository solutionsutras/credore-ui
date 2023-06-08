import { Button, Dropdown } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

const TopHeader = () => {
  const router = useRouter();
  return (
    <>
      <section
        className="gap-2 flex lg:flex-row flex-col py-5 justify-between items-center lg:px-10 bg-[#daf2f7]"
        id="topHeader"
      >
        <div className="flex gap-3 justify-between items-center">
          <Link href="/dashboard">
            <img
              src={"https://www.credore.xyz/assets/images/Logo.png"}
              alt="logo"
              className="w-48 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Button className="border-1 border-[#f3754c]" color="light">
            About
          </Button>
          <Button
            className="border-1 border-[#325d53]"
            color="light"
            onClick={() => {
              router.push("https://docs.credore.xyz/");
            }}
          >
            Docs
          </Button>
          <Dropdown color="success" label="Profile">
            <Dropdown.Item className="font-bold">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="font-bold">
              <Link href={"/"}>Sign Out</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </section>
      <div className="">
        <hr className="mb-1 w-full h-0.5 opacity-20 bg-[#CCC]" />
      </div>
    </>
  );
};

export default TopHeader;
