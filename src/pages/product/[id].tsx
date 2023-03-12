import { useRouter } from "next/router";

interface ProductProps {
}
export default function Product(props: ProductProps) {
  const router = useRouter();
  const { id } = router.query


  
  return (
    <div>
      
    </div>
  )
}