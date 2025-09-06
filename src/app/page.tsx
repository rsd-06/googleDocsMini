import { Button } from "@/components/ui/button";

export default function Home() {
  return(
    <>
      <div className="flex min-h-screen justify-center items-center ">
        <h1 className="font-bold text-center text-2xl">Hello World</h1>
        <Button variant="outline" className="">Click Me</Button>
      </div>
    </>
  )
};