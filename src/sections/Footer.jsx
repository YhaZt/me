import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 pb-28 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>by</span>
            <a href="https://github.com/YhaZt" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">
              YhaZt
            </a>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>React + Vite + Tailwind + ReactBits</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/YhaZt/me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
              <span>Source</span>
            </a>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} YhaZt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
