import ReactMarkdown from "react-markdown";

/**
 * Renders admin-authored Markdown safely: raw HTML is not rendered,
 * and only http(s)/mailto links are allowed (react-markdown's default URL filter).
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-ms">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}>
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="my-6 rounded-2xl" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
