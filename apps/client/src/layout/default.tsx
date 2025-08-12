import { NavBar } from "../components"

function DefaultLayout({ id, children, className }: { id?: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={className} id={id} >
            <NavBar />
            {children}
        </div>
    )
}

export default DefaultLayout
