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
    const paper = useRef<HTMLDivElement>(null);
    const bottomRod = useRef<HTMLDivElement>(null);
    const sent = useRef<HTMLDivElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    /**
     * Roll the letter up into its top rod (message still written on it), stamp a SENT seal
     * with a confirmation line, then unroll a fresh, empty sheet. Resolves when finished.
     */
    const playDelivered = () =>
        new Promise<void>((resolve) => {
            const h = paper.current!.offsetHeight;
            const roll = { duration: 0.8, ease: "power3.inOut" };
            gsap.timeline({ onComplete: resolve })
                .fromTo(paper.current, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", ...roll })
                .to(bottomRod.current, { y: -h, ...roll }, 0)
                .add(() => setForm(EMPTY))
                .fromTo(sent.current, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" })
                .fromTo(
                    sent.current!.querySelector(".hanko"),
                    { scale: 2.4, opacity: 0, rotate: -24 },
                    { scale: 1, opacity: 1, rotate: -8, duration: 0.25, ease: "power4.in" },
                    "<0.1",
                )
                .to(sent.current, { autoAlpha: 0, duration: 0.3 }, "+=1.8")
                .to(paper.current, { clipPath: "inset(0% 0% 0% 0%)", ...roll, duration: 0.9 })
                .to(bottomRod.current, { y: 0, ...roll, duration: 0.9 }, "<")
                .set([paper.current, bottomRod.current], { clearProps: "clipPath,transform" });
        });

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);
        const res = await sendEmail(form);
        if (res.success) {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                setToast({ type: "success", message: "Message sent! I'll get back to you soon." });
                setForm(EMPTY);
            } else {
                await playDelivered();
            }
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
                    className="text-5xl font-black leading-[0.95] tracking-tight text-orange-400 sm:text-6xl lg:text-7xl"
                />

                <div className="mt-20 grid gap-16 lg:grid-cols-[3fr_2fr]">
                    {/* The letter */}
                    <div className="relative">
                        <div className="rod-h relative z-10 -mx-2 h-3 rounded-full" />

                        {/* Confirmation shown under the rolled-up letter */}
                        <div
                            ref={sent}
                            role="status"
                            className="invisible absolute inset-x-0 top-10 flex items-center justify-center gap-5 opacity-0"
                        >
                            <Hanko size={72} rotate={-8}>
                                SENT
                            </Hanko>
                            <div>
                                <p className="text-2xl font-black">Message sent.</p>
                                <p className="text-white/60">I&apos;ll get back to you soon.</p>
                            </div>
                        </div>

                        <div ref={paper} className="paper relative px-7 pb-10 pt-8 text-ink sm:px-10">
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
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        <div ref={bottomRod} className="rod-h relative z-10 -mx-2 h-3 rounded-full" />
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
