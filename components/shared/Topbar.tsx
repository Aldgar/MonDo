import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
function Topbar() {
    return (
      
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
            <Image src="/KImage.png" alt="Mondo" width={80} height={24}/>
            <p className="text-heading3-bold text-light-1 max-xs:hidden"><span>Mon</span><span className="text-cyan-400">Do</span></p>
            </Link>
            <div className="flex items-center gap1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flext cursor-pointer">
                                <Image src={"/assets/logout.svg"} alt={"logout"} width={24} height={24} />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher 
                appearance={{
                    baseTheme: dark,
                    elements: {
                        organizationSwitcherTrigger: "py-4 px-4"
                    }
                }}
                />
            </div>
        </nav>
    );
  }
  
  export default Topbar;