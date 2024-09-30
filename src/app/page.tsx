'use client'

import { ContinueButton } from "@/components/ContinueButton";
import { Loader } from "@/components/Loader";
import useFormStore from "@/stores/form.store";
import { useEffect, useState } from "react";


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const count = useFormStore( state => state.count )
  const increment = useFormStore( state => state.increment )

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <>
      <aside>[MENU]</aside>
      <article style={{flex:1, display:"flex", flexDirection:"column", maxWidth: "410px"}}>
        <div>{count}</div>
        <input type="text" />
        <ContinueButton onClick={increment} />
      </article>
    </>
  );
}
