import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return(
    <>
      <div className="flex flex-col min-h-screen justify-center items-center ">
        <h1 className="font-bold text-center text-2xl">Hello World</h1>
        <Button variant="outline" className="bg-blue-400 text-black text-center underline"><Link href={"/documents/69"}>Click Me</Link></Button>
      </div>
    </>
  )
};