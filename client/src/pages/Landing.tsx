export default function Landing() {
    return (<>
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">

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
    </>)
}