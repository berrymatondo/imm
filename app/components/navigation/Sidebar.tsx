"use client";
import React from "react";
import {
  MdBuild,
  MdDashboard,
  MdEdit,
  MdGrade,
  MdHouse,
  MdLogout,
  MdMoney,
  MdOutlinePhonelinkSetup,
  MdPeople,
  MdPerson,
  MdTask,
} from "react-icons/md";
import Image from "next/image";
import MenuLink from "./MenuLink";
import Connect from "../connexion/Connect";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Disconnect from "../connexion/Disconnect";
import { GiPayMoney } from "react-icons/gi";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import MyLabel from "../MyLabel";
import Link from "next/link";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/",
        icon: (
          <span className="text-yellow-400">
            <MdDashboard size={20} />
          </span>
        ),
      },
      {
        title: "Clients",
        path: "/clients",
        icon: (
          <span className="text-green-400">
            <MdPeople size={20} />
          </span>
        ),
      },
      {
        title: "Immobiliers",
        path: "/immos",
        icon: (
          <span className="text-orange-400">
            <MdHouse size={20} />
          </span>
        ),
      },
      {
        title: "Assurances",
        path: "/assus",
        icon: (
          <span className="text-purple-400">
            <GiPayMoney size={20} />
          </span>
        ),
      },
      {
        title: "Actions",
        path: "/actions",
        icon: (
          <span className="text-blue-400">
            <MdTask size={20} />
          </span>
        ),
      },
    ],
  },

  {
    title: "Administration",
    list: [
      {
        title: "Nouvel utilisateur",
        path: "/auth/register",
        icon: (
          <span className="text-teal-400">
            <MdPerson size={20} />
          </span>
        ),
      },
      {
        title: "Editer un utilisateur",
        path: "/auth/user",
        icon: (
          <span className="text-yellow-400">
            <MdEdit size={20} />
          </span>
        ),
      },
      ,
      {
        title: "Nouveau client",
        path: "/rgpd/clients/new",
        icon: (
          <span className="text-green-400">
            <MdPeople size={20} />
          </span>
        ),
      },
      {
        title: "Paramètres",
        path: "/parameters",
        icon: (
          <span className="text-purple-400">
            <MdOutlinePhonelinkSetup size={20} />
          </span>
        ),
      },
    ],
  },
];

const Sidebar = () => {
  //const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  const val: any = session?.user;
  const router = useRouter();

  const pathname = usePathname();

  //console.log("PAth:=", pathname);

  /*   if (pathname.includes("rgpd")) {
    //console.log("REROU");

    return;
  }
 */
  if (!session) {
    //console.log("REROU");

    return;
  }

  return (
    <div className="sticky top-10">
      <Connect session={session} />

      <div className="flex flex-col text-md italic mb-4">
        <MyLabel title="Liens utiles" />
        <Link
          href="https://www.demetris.be/simulationpublic/kpLeencapaciteitExpress.html#taal=1"
          target="_blank"
          className="mt-2 hover:text-yellow-400 hover: cursor-pointer pl-8"
        >
          {"Simulation Capacité d'emprunt"}
        </Link>
        <Link
          href="https://www.demetris.be/simulationpublic/KpwoonkredietSimulatieExpress.html#taal=1"
          target="_blank"
          className="mt-4 hover:text-yellow-400 hover: cursor-pointer pl-8"
        >
          Simulation Mensualité
        </Link>
      </div>
      <ul>
        {menuItems.map((cat: any) => (
          <li key={cat.title}>
            <span className="text-third font-semibold text-sm my-2">
              {cat.title}
            </span>
            {cat.list.map((item: any) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <Disconnect />
    </div>
  );
};

export default Sidebar;
