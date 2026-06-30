'use client';

import React, { forwardRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Toast } from './Toast';

import { sendEmail } from '@/lib/actions/send-email';

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const col: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const colRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

function RippleButton({
    loading,
    children,
}: {
    loading: boolean;
    children: React.ReactNode;
}) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };

    const handleHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
        if (loading) return;
        e.currentTarget.style.backgroundColor = isEnter ? '#2F363D' : '#24292F';
    };

    return (
        <button
            type="submit"
            disabled={loading}
            onClick={handleClick}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            className="relative overflow-hidden w-full px-5 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:cursor-not-allowed hover:cursor-pointer"
            style={{ backgroundColor: '#24292F', border: '1px solid #3A4048', color: 'white' }}
        >
            {ripples.map((r) => (
                <span
                    key={r.id}
                    className="absolute rounded-full bg-white/30 animate-ripple"
                    style={{
                        left: r.x - 10,
                        top: r.y - 10,
                        width: 20,
                        height: 20,
                    }}
                />
            ))}
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                </span>
            ) : (
                children
            )}
        </button>
    );
}

const ContactMe = forwardRef<HTMLElement>((_, ref) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [toastState, setToastState] = useState<{
        isOpen: boolean;
        type: 'success' | 'error' | null;
        message: string;
    }>({ isOpen: false, type: null, message: '' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setToastState({ isOpen: false, type: null, message: '' });

        const result = await sendEmail(formData);

        if (result.success) {
            setToastState({ isOpen: true, type: 'success', message: result.message as string });
            setFormData({ name: '', email: '', message: '' });
        } else {
            setToastState({ isOpen: true, type: 'error', message: result.error as string });
        }

        setLoading(false);
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' as const },
        { name: 'email', label: 'Email', type: 'email' as const },
    ];

    return (
        <section
            ref={ref}
            className="w-full min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-600/3 rounded-full blur-3xl" />
            </div>

            <Toast
                isOpen={toastState.isOpen}
                type={toastState.type as 'success' | 'error'}
                message={toastState.message}
                onClose={() => setToastState({ isOpen: false, type: null, message: '' })}
                duration={4000}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="relative mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl font-bold text-center"
                    >
                        <span className="text-white">Contact Me</span>
                        <span className="block mx-auto mt-2 w-12 h-0.5 bg-purple-500/60 rounded-full" />
                    </motion.h2>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <motion.div variants={col} className="h-full">
                        <form onSubmit={handleSubmit} className="h-full flex flex-col space-y-6">
                            {fields.map((field) => {
                                const isFocused = focused === field.name;
                                const hasValue = formData[field.name as keyof typeof formData].length > 0;
                                return (
                                    <div key={field.name} className="relative">
                                        <motion.label
                                            htmlFor={field.name}
                                            animate={{
                                                y: isFocused || hasValue ? -32 : 0,
                                                scale: isFocused || hasValue ? 0.8 : 1,
                                                color: isFocused ? '#a855f7' : 'rgba(255,255,255,0.5)',
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-4 top-3 text-sm pointer-events-none origin-left"
                                        >
                                            {field.label}
                                        </motion.label>
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={handleChange}
                                            onFocus={() => setFocused(field.name)}
                                            onBlur={() => setFocused(null)}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white outline-none transition-all duration-300"
                                            style={{
                                                borderColor: isFocused
                                                    ? 'rgba(168,85,247,0.3)'
                                                    : 'rgba(255,255,255,0.06)',
                                                boxShadow: isFocused
                                                    ? '0 0 0 1px rgba(168,85,247,0.1), 0 0 12px rgba(168,85,247,0.03)'
                                                    : 'none',
                                            }}
                                        />
                                    </div>
                                );
                            })}

                            <div className="relative flex flex-col flex-1">
                                <motion.label
                                    htmlFor="message"
                                    animate={{
                                                y: focused === 'message' || formData.message.length > 0 ? -32 : 0,
                                                scale: focused === 'message' || formData.message.length > 0 ? 0.8 : 1,
                                        color: focused === 'message' ? '#a855f7' : 'rgba(255,255,255,0.5)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-4 top-3 text-sm pointer-events-none origin-left"
                                >
                                    Message
                                </motion.label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white outline-none transition-all duration-300 flex-1 resize-none"
                                    style={{
                                        borderColor: focused === 'message'
                                            ? 'rgba(168,85,247,0.3)'
                                            : 'rgba(255,255,255,0.06)',
                                        boxShadow: focused === 'message'
                                            ? '0 0 0 1px rgba(168,85,247,0.1), 0 0 12px rgba(168,85,247,0.03)'
                                            : 'none',
                                    }}
                                />
                            </div>

                            <RippleButton loading={loading}>
                                Send Message
                            </RippleButton>
                        </form>
                    </motion.div>

                    <motion.div variants={colRight} className="flex flex-col justify-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                            <p className="text-gray-300 mb-6">
                                Feel free to reach out to me through any of the following channels. I'd love to
                                hear from you!
                            </p>
                        </motion.div>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: <HiOutlineMail                                 className="text-2xl text-purple-400/70 flex-shrink-0" />,
                                    title: 'Email',
                                    value: 'mharshil1234@gmail.com',
                                    href: 'mailto:mharshil1234@gmail.com',
                                    borderHover: 'hover:border-purple-600/50',
                                    shadowHover: 'hover:shadow-purple-900/30',
                                },
                                {
                                    icon: <FaLinkedin className="text-2xl text-blue-400 flex-shrink-0" />,
                                    title: 'LinkedIn',
                                    value: 'linkedin.com/in/harshil-maheshwari/',
                                    href: 'https://www.linkedin.com/in/harshil-maheshwari/',
                                    borderHover: 'hover:border-blue-600',
                                    shadowHover: 'hover:shadow-blue-900/50',
                                },
                                {
                                    icon: <FaGithub className="text-2xl text-gray-300 flex-shrink-0" />,
                                    title: 'GitHub',
                                    value: 'github.com/mharshil1234',
                                    href: 'https://github.com/mharshil1234',
                                    borderHover: 'hover:border-gray-600',
                                    shadowHover: 'hover:shadow-gray-800/50',
                                },
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                                    whileHover={{ x: 8 }}
                                    className={`flex items-center space-x-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/[0.06] ${item.borderHover} transition-all duration-300 ${item.shadowHover} hover:shadow-lg group`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <div>
                                        <p className="font-semibold text-white">{item.title}</p>
                                        <p className="text-gray-400 group-hover:text-purple-400/70 transition-colors text-sm">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

ContactMe.displayName = 'ContactMe';

export { ContactMe };
