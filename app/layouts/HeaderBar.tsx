import Avatar from "../assets/avatar.png";


export default function HeaderBar() {

    // const style = 

    return (
        <div className="flex justify-end items-center h-1/12 shrink-0 px-6 border-b border-[#c0c6d0] dark:border-blue-600">
            <div className="flex gap-2 items-center">
                <span>UBS Centro</span>
                <img src={Avatar} alt="" />
            </div>
        </div>
    )
}