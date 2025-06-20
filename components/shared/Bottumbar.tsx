'use client';
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();
  return (

    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const isActive = (pathname.includes(link.route) && link.route.length) || pathname === link.route;
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link ${
                            isActive && 'bg-cyan-600'}`
                            }>
                            <Image src={link.imgURL} 
                                alt={link.label} 
                                width={24} 
                                height={24} 
                            />
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    );
                })}
      </div>
    </section>
   
  );
}

export default Bottombar;