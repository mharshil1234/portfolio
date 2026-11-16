"use client";

import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa";
import { sendEmail } from "@/lib/actions/send-email";
import { socials } from "@/data/content";
import { Magnetic, RevealHeading, Stagger } from "@/components/ui/motion";
import { Toast, type ToastState } from "@/components/ui/Toast";

const EMPTY = { name: "", email: "", message: "" };

function Field({
    name,
    label,
    value,
    onChange,
    type = "text",
    multiline = false,
}: {
    name: keyof typeof EMPTY;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    multiline?: boolean;
}) {
    const cls =
        "peer w-full resize-none border-b border-white/20 bg-transparent pb-3 pt-7 text-lg text-white outline-none transition-colors placeholder-transparent focus:border-white";
    return (
        <div className="group relative">
            {multiline ? (
                <textarea id={name} name={name} value={value} onChange={onChange} required rows={4} placeholder={label} className={cls} />
            ) : (
                <input id={name} name={name} type={type} value={value} onChange={onChange} required placeholder={label} className={cls} />
            )}
            <label
                htmlFor={name}
                className="pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-white/50 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-orange-300"
            >
                {label}
            </label>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-orange-400 to-cyan-300 transition-transform duration-500 peer-focus:scale-x-100" />
        </div>
    );
}

export function Contact() {
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);
    const closeToast = useCallback(() => setToast(null), []);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);
        const res = await sendEmail(form);
        if (res.success) {
            setToast({ type: "success", message: res.message });
            setForm(EMPTY);
        } else {
            setToast({ type: "error", message: res.error });
        }
        setLoading(false);
    };

    return (
        <section id="contact" className="relative z-10 px-6 py-32 sm:py-40">
            <Toast toast={toast} onClose={closeToast} />

            <div className="mx-auto max-w-7xl">
                <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-emerald-300">05 — Contact</p>
                <RevealHeading text="Let's build" className="text-[14vw] font-black leading-[0.85] tracking-[-0.04em] md:text-[9rem]" />
                <RevealHeading
                    text="something cool."
                    delay={0.15}
                    className="text-[14vw] text-orange-400 font-black leading-[0.85] tracking-[-0.04em] md:text-[9rem]"
                />

                <div className="mt-20 grid gap-16 md:grid-cols-[3fr_2fr]">
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid gap-8 sm:grid-cols-2">
                            <Field name="name" label="Your name" value={form.name} onChange={onChange} />
                            <Field name="email" label="Email" type="email" value={form.email} onChange={onChange} />
                        </div>
                        <Field name="message" label="Tell me about your idea" value={form.message} onChange={onChange} multiline />
                        <Magnetic>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-4 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        Send message
                                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </Magnetic>
                    </form>

                    <Stagger className="flex flex-col justify-end">
                        <p className="reveal mb-6 text-white/60">Or find me around the internet:</p>
                        <ul className="divide-y divide-white/10 border-y border-white/10">
                            {socials.map((s) => (
                                <li key={s.label} className="reveal">
                                    <a
                                        href={s.href}
                                        target={s.href.startsWith("http") ? "_blank" : undefined}
                                        rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="group flex items-center justify-between py-5"
                                    >
                                        <span>
                                            <span className="block text-2xl font-bold transition-transform duration-300 group-hover:translate-x-2">
                                                {s.label}
                                            </span>
                                            <span className="block text-sm text-white/50">{s.handle}</span>
                                        </span>
                                        <FaArrowRight className="-rotate-45 text-white/40 transition-all duration-300 group-hover:rotate-0 group-hover:text-white" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Stagger>
                </div>
            </div>
        </section>
    );
}
