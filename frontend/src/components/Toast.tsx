import { useEffect } from "react"

type ToastProps = {
    message: string,
    type: "SUCCESS" | "ERROR";
    onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
    // Automatically close the toast after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer); // Clean up the timer if the component unmounts
        }
    }, [onClose]);

    // Apply styles based on the type of the toast (success or error)
    const styles = type === "SUCCESS" 
    ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
    : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
     
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message} {/* Display the message */}
                </span>
            </div>
        </div>
    )
}

export default Toast;
