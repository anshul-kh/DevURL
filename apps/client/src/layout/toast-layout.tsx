import { Toaster } from 'react-hot-toast'

export function ToastLayout() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#ffffff",
                    color: "#1f2937", // gray-800
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    fontSize: "0.875rem",
                    boxShadow:
                        "0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.1)", 
                },
                success: {
                    style: {
                        background: "#dcfce7", // green-100
                        color: "#166534", // green-800
                    },
                },
                error: {
                    style: {
                        background: "#fee2e2", // red-100
                        color: "#991b1b", // red-800
                    },
                },
            }}
            containerStyle={{
                top: "1rem",
                right: "1rem",
                position: "fixed",
                zIndex: 9999,
            }}
        />
    )
}
