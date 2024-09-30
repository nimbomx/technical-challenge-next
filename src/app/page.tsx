'use client'

import { Button } from "@/components/Button";
import useFormStore from "@/stores/form.store";


export default function Home() {
  const count = useFormStore( state => state.count )
  const increment = useFormStore( state => state.increment )
  return (
    <div>
      <div>{count}</div>
      <Button onClick={increment}>Button</Button>
    </div>
  );
}
