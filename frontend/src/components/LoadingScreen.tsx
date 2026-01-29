import { motion } from 'framer-motion';

interface LoadingScreenProps {
    title?: string;
    subtitle?: string;
    showProgress?: boolean;
    duration?: number;
    variant?: 'spinner' | 'dots' | 'bar' | 'pulse';
}

export default function LoadingScreen({
    title = 'Loading',
    subtitle,
    showProgress = false,
    duration = 4000,
    variant = 'spinner'
}: LoadingScreenProps) {
    const variants = {
        spinner: (
            <div className="relative w-16 h-16">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full border-4 border-gray-200 border-t-blue-500 rounded-full"
                />
            </div>
        ),
        dots: (
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                ))}
            </div>
        ),
        bar: (
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                        duration: duration / 1000,
                        ease: 'linear',
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                />
            </div>
        ),
        pulse: (
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"
            />
        ),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6 max-w-md">
                {/* Loader Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {variants[variant]}
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    {subtitle && (
                        <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
                    )}
                </motion.div>

                {/* Progress Bar */}
                {showProgress && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-full max-w-xs"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{
                                        duration: duration / 1000,
                                        ease: 'linear',
                                    }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
