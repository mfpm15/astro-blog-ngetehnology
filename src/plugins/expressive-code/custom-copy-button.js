import { definePlugin } from "@expressive-code/core";

export function pluginCustomCopyButton() {
	return definePlugin({
		name: "Custom Copy Button",
		// @ts-ignore
		baseStyles: ({ _cssVar }) => `
      .copy button {
        position: absolute;
        z-index: 2;
        right: 0.5rem;
        top: 0.5rem;
        padding: 0.1rem 0.5rem;
        font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.75rem;
        font-weight: bold;
        text-transform: uppercase;
        color: oklch(0.75 0.1 var(--hue));
        background: oklch(0.33 0.035 var(--hue));
        border-radius: 0.5rem;
        transition: opacity 0.3s;
        opacity: 0;
      }
      .frame:not(.has-title):not(.is-terminal) {
        @media (hover: none) {
          & .copy button {
            opacity: 1;
            margin-right: 3rem;
          }
          & .copy button:active {
            opacity: 0;
          }
        }
        @media (hover: hover) {
          & .copy button {
            opacity: 1;
          }
          &:hover .copy button {
            opacity: 0;
          }
        }
      }
    `,
	});
}
