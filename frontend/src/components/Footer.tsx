import {Link} from "react-router-dom"

const Footer = () => {
  return(
    <div className="bg-blue-800 py-10">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">BookHolidays.com</Link>
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <p className="curso-pointer">Privacy Policy</p>
                <p className="curso-pointer">Terms and Services</p>
            </span>
        </div>
    </div>
  )
}

export default Footer;