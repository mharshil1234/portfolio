"use client";

import { useSyncExternalStore } from "react";

/**
 * Intro state is stored as a class on <html>:
 *  - set before first paint by an inline script when the intro was already seen this session
 *    (or the visitor prefers reduced motion),
 *  - set by the intro itself when it finishes or is skipped.
 */
const DONE_CLASS = "intro-skip";
const EVENT = "intro:done";
export const INTRO_SEEN_KEY = "intro-seen";

export function isIntroDone() {
    return document.documentElement.classList.contains(DONE_CLASS);
}

export function markIntroDone() {
    try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
        // storage blocked: intro will simply play again next load
    }
    document.documentElement.classList.add(DONE_CLASS);
    window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
    window.addEventListener(EVENT, cb);
    return () => window.removeEventListener(EVENT, cb);
}

/** True once the landing intro has finished (or was skipped / already seen). */
export function useIntroDone() {
    return useSyncExternalStore(subscribe, isIntroDone, () => false);
}

/** Runs before paint: skip the intro if already seen this session or motion is reduced. */
export const introBootScript = `try{if(sessionStorage.getItem('${INTRO_SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('${DONE_CLASS}')}catch(e){}`;
