export default function Landing() {
    return (
        <div className="min-h-screen bg-bg flex flex-col">

            {/* nav */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border relative z-10">
                <div className="flex items-center gap-2 font-mono text-xs tracking-label text-subtle uppercase">
                    <div className="dot-live" />
                    webhook inspector
                </div>
                <div className="flex gap-2">
                    <button className="font-mono text-xs tracking-btn uppercase px-4 py-2 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all">
                        Sign in
                    </button>
                    <button className="font-mono text-xs tracking-btn uppercase px-4 py-2 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all">
                        Get started
                    </button>
                </div>
            </div>

            {/* hero */}
            <section className="flex-1 grid grid-cols-2 items-center gap-0 px-8 py-16 bg-grid relative">

                {/* left */}
                <div className="flex flex-col gap-5 max-w-lg pr-12">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-label uppercase text-accent">
                        <span className="w-5 h-px bg-accent inline-block" />
                        Developer Utility
                    </div>
                    <h1 className="font-mono text-3xl font-medium tracking-tight text-primary leading-tight">
                        Catch every incoming{" "}
                        <span className="text-accent">webhook.</span>
                    </h1>
                    <p className="text-base text-subtle leading-relaxed">
                        Create a personal URL, point any service at it, and inspect every request in real time — headers, body, method, timing. Built for developers who need answers fast.
                    </p>
                    <div className="flex gap-3 items-center">
                        <button className="font-mono text-xs tracking-btn uppercase px-6 py-3 bg-accent text-bg font-medium rounded-sm hover:bg-accent-hover transition-all">
                            Create free account →
                        </button>
                        <button className="font-mono text-xs tracking-btn uppercase px-6 py-3 border border-border-2 text-subtle rounded-sm hover:border-border hover:text-secondary transition-all">
                            Sign in
                        </button>
                    </div>
                </div>

                {/* right */}
                <div className="bg-surface border border-border rounded-md overflow-hidden font-mono text-xs">
                    <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
                        <span className="w-2 h-2 rounded-full bg-method-delete" />
                        <span className="w-2 h-2 rounded-full bg-method-put" />
                        <span className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <div className="p-5 flex flex-col gap-2">
                        <p className="text-dimmed"># incoming request on /hooks/stripe-prod</p>
                        <p>
                            <span className="text-method-post">POST</span>
                            <span className="text-muted"> /hooks/stripe-prod </span>
                            <span className="text-accent">200 OK</span>
                        </p>
                        <p>
                            <span className="text-method-get">content-type</span>
                            <span className="text-muted-2">: </span>
                            <span className="text-string-val">application/json</span>
                        </p>
                        <p>
                            <span className="text-method-get">x-stripe-signature</span>
                            <span className="text-muted-2">: </span>
                            <span className="text-string-val">t=1736...,v1=abc</span>
                        </p>
                        <p>
                            <span className="text-method-get">body</span>
                            <span className="text-muted-2">: </span>
                            <span className="text-string-val">{`{"type":"payment_intent.succeeded"}`}</span>
                        </p>
                        <p className="text-dimmed"># logged to dashboard in 3ms</p>
                        <p className="text-primary">
                            ready<span className="terminal-cursor" />
                        </p>
                    </div>
                </div>

            </section>

            {/* footer */}
            <div className="flex justify-between items-center px-8 py-4 border-t border-border">
                <p className="font-mono text-xs text-dimmed">webhook-inspector — built with Express + React + Typescript @ markdemidovs</p>
                <div className="flex gap-6">
                    <p className="font-mono text-xs text-dimmed">requests captured <span className="text-accent">∞</span></p>
                    <p className="font-mono text-xs text-dimmed">latency <span className="text-accent">&lt;5ms</span></p>
                </div>
            </div>

        </div>
    );
}