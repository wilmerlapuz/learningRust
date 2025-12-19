import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { CodeTheme } from "./theme";

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
    const validLang = !!(lang && hljs.getLanguage(lang));
    const highlighted = validLang
        ? hljs.highlight(text, { language: lang }).value
        : hljs.highlightAuto(text).value;

    return `
    <div class="${CodeTheme.Container}">
        <div class="${CodeTheme.Header.Container}">
            <div class="${CodeTheme.Header.Dots.Wrapper}">
                <div class="${CodeTheme.Header.Dots.Red}"></div>
                <div class="${CodeTheme.Header.Dots.Yellow}"></div>
                <div class="${CodeTheme.Header.Dots.Green}"></div>
            </div>
            <div class="${CodeTheme.Header.LanguageLabel}">
                ${lang || "text"}
            </div>
        </div>
        <div class="${CodeTheme.Content.Wrapper}">
            <pre class="${CodeTheme.Content.Pre}"><code class="hljs ${validLang ? "language-" + lang : ""} ${CodeTheme.Content.CodeBlock}" style="background: transparent;">${highlighted}</code></pre>
        </div>
    </div>`;
};

renderer.codespan = ({ text }: { text: string }) => {
    try {
        const highlighted = hljs.highlight(text, {
            language: "rust",
        }).value;
        return `<code class="${CodeTheme.Inline.Chip}">${highlighted}</code>`;
    } catch (e) {
        return `<code class="${CodeTheme.Inline.Simple}">${text}</code>`;
    }
};

marked.use({ renderer });

export { marked };
