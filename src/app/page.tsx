'use client'

import { Loader } from "@/components/atoms/Loader";
import { Nav } from "@/components/molecules/Nav";
import { BusinessStructure } from "@/components/organisms/BusinessStructure";
import { ContactPerson } from "@/components/organisms/ContactPerson";
import { ReviewNSubmit } from "@/components/organisms/ReviewNSubmit";
import useFormStore from "@/stores/form.store";
import { ReactNode, useEffect, useState } from "react";


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const step = useFormStore( state => state.step )


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader>Loading...</Loader>;
  }
  let formStep:ReactNode 
  switch (step) {
    case 0:
      formStep = <BusinessStructure />;
      break;
    case 1:
      formStep =  <ContactPerson />
      break;
    case 2:
      formStep =  <ReviewNSubmit />
      break;
    default:
      formStep =  <div>Error</div>
      break;
  }
  return (
    <>
      <aside>
        <Nav />
      </aside>
      <article>
        {formStep}
      </article>
    </>
  );
}
