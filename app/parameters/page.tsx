"use client";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import MyLabel from "../components/MyLabel";
import { Parameter } from "@prisma/client";
import { useRouter } from "next/navigation";

const inputStyle =
  "rounded-lg py-1 px-2 max-lg:p-1 mb-1  bg-secondary outline-0 border border-hov w-full";

const ParametersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [val, setVal] = useState("");
  const [parameters, setParameters] = useState([]);

  const router = useRouter();

  const handleValue = async (name: string) => {
    const updatedParam = {
      name: name,
      value: val,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedParam),
    };
    //console.log("updatedParam", updatedParam);

    try {
      const res = await fetch(`/api/parameters/${name}`, options);
      //   const data = await res.json();
      //   return data;

      if (res.ok) {
        router.refresh();
        setRefresh(!refresh);
      }
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`/api/parameters`, {
        cache: "no-store",
      });
      const data = await res.json();
      //console.log("PARAM:  ", data.results);
      setParameters(data.results);
    };

    fetchClient();
  }, [refresh]);

  return (
    <div className="w-full mx-auto  ">
      <div className=" rounded-lg p-2 mt-2 bg-primary">
        <div className="flex items-center gap-2">
          <Title title="Paramètres" back={true} size="lg:text-xl" />{" "}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">
            {
              "Cette transaction permet de configurer les paramètres de l'application"
            }
          </p>
        </div>

        <form className="border border-hov rounded-lg mt-5 flex flex-col justify-start items-center md:max-w-[800px]">
          <div className="text-lg w-full p-2 ">
            {parameters &&
              parameters.map((p: Parameter) => (
                <div key={p.name} className="w-full py-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <MyLabel title={p.name} />

                    <input
                      className={inputStyle}
                      name="Valeur"
                      type="text"
                      onChange={(e) => setVal(e.target.value)}
                      placeholder="Valeur..."
                      defaultValue={p.value as string}
                    />
                  </div>
                  <div className="flex justify-end">
                    <MyLabel title={p.value as string} />
                    <button
                      onClick={() => handleValue(p.name)}
                      type="button"
                      className=" bg-teal-800 hover:bg-teal-600 text-white text-lg rounded-lg px-2"
                    >
                      Sauver
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParametersPage;
