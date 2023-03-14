import Icon from '@/components/icon'
interface HeaderProps {}
export default function Header(props: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-12 w-full items-center justify-start border-b-[1px] border-slate-300 bg-white px-4 shadow-md">
      <Icon src={'/icons/food.svg'} alt={'food-icon'} className="mr-4" />
      <span className="mr-4 hidden md:block">Food Station</span>
      {/* <input className="h-8 flex-1 rounded-md border-[1px] border-slate-300" /> */}
    </div>
  )
}
