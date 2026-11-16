"use client";

import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa";
import { sendEmail } from "@/lib/actions/send-email";
import { socials } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { RevealHeading, Stagger } from "@/components/ui/motion";
import { Hanko, SectionHeader, Shuriken } from "@/components/ui/ninja";
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
        "peer w-full resize-none border-b border-ink/25 bg-transparent pb-3 pt-7 text-lg text-ink outline-none transition-colors placeholder-transparent focus:border-ink";
    return (
        <div className="relative">
            {multiline ? (
                <textarea id={name} name={name} value={value} onChange={onChange} required rows={4} placeholder={label} className={cls} />
            ) : (
                <input id={name} name={name} type={type} value={value} onChange={onChange} required placeholder={label} className={cls} />
            )}
            <label
                htmlFor={name}
                className="pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-ink/50 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-seal"
            >
                {label}
            </label>
            <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-seal transition-transform duration-500 peer-focus:scale-x-100" />
        </div>
    );
}

export function Contact() {
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);
    const closeToast = useCallback(() => setToast(null), []);
    const letter = useRef<HTMLDivElement>(null);
    const seal = useRef<HTMLDivElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    /** Stamp the letter with a seal, send it flying, then bring a fresh sheet back. */
    const playDelivered = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.timeline()
            .fromTo(seal.current, { scale: 2.6, opacity: 0, rotate: -24 }, { scale: 1, opacity: 1, rotate: -10, duration: 0.25, ease: "power4.in" })
            .to(letter.current, { keyframes: [{ x: -4 }, { x: 3 }, { x: 0 }], duration: 0.15 })
            .to(letter.current, { y: -60, x: 140, rotate: 8, opacity: 0, duration: 0.6, ease: "power2.in", delay: 0.6 })
            .set(seal.current, { opacity: 0 })
            .fromTo(letter.current, { y: 40, x: 0, rotate: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);
        const res = await sendEmail(form);
        if (res.success) {
            playDelivered();
            setToast({ type: "success", message: "Message sent! I'll get back to you soon." });
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
                <SectionHeader number="05" label="Send a scroll" title="Let's build" accent="#34d399" />
                <RevealHeading
                    text="something cool."
                    delay={0.15}
                    className="text-5xl font-black leading-[0.95] tracking-tight text-orange-400 sm:text-7xl"
                />

                <div className="mt-20 grid gap-16 md:grid-cols-[3fr_2fr]">
                    {/* The letter */}
                    <div ref={letter} className="relative">
                        <div className="rod-h relative z-10 -mx-2 h-3 rounded-full" />
                        <div className="paper relative px-7 pb-10 pt-8 text-ink sm:px-10">
                            <p className="mb-2 text-2xl font-black italic text-ink/80">Dear Harshil,</p>
                            <p className="mb-6 text-sm text-ink/55">Write me a message. I read every one.</p>
                            <form onSubmit={onSubmit} className="space-y-8">
                                <div className="grid gap-8 sm:grid-cols-2">
                                    <Field name="name" label="Your name" value={form.name} onChange={onChange} />
                                    <Field name="email" label="Email" type="email" value={form.email} onChange={onChange} />
                                </div>
                                <Field name="message" label="Tell me about your idea" value={form.message} onChange={onChange} multiline />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group inline-flex items-center gap-3 rounded-sm bg-ink py-2 pl-2 pr-6 font-semibold text-paper transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Hanko size={38} rotate={-4}>
                                        <Shuriken size={20} />
                                    </Hanko>
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/20 border-t-paper" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Delivered seal (stamped on success) */}
                            <div ref={seal} className="pointer-events-none absolute right-8 top-8 opacity-0">
                                <Hanko size={96} rotate={-10}>
                                    SENT
                                </Hanko>
                            </div>
                        </div>
                        <div className="rod-h relative z-10 -mx-2 h-3 rounded-full" />
                    </div>

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
                                        <FaArrowRight className="-rotate-45 text-white/40 transition-all duration-300 group-hover:rotate-0 group-hover:text-orange-400" />
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
